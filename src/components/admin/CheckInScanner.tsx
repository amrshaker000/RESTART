'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Camera, 
  Search, 
  Volume2, 
  VolumeX, 
  RefreshCw,
  User,
  Ticket as TicketIcon
} from 'lucide-react';

export default function CheckInScannerPage() {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ valid: 0, duplicate: 0, invalid: 0 });
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const scannerRef = useRef<any>(null);

  // Play sound indicator if permitted
  const playSound = (type: 'valid' | 'already_used' | 'invalid') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'valid') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'already_used') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(349.23, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  const processCheckIn = async (payload: { token?: string; ticketCode?: string }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setScanResult(data);

      if (data.result === 'valid') {
        playSound('valid');
        setStats((prev) => ({ ...prev, valid: prev.valid + 1 }));
      } else if (data.result === 'already_used') {
        playSound('already_used');
        setStats((prev) => ({ ...prev, duplicate: prev.duplicate + 1 }));
      } else {
        playSound('invalid');
        setStats((prev) => ({ ...prev, invalid: prev.invalid + 1 }));
      }

      setRecentScans((prev) => [
        {
          id: Date.now(),
          result: data.result,
          name: data.attendeeName || 'Unknown',
          code: data.ticketCode || payload.ticketCode || 'N/A',
          time: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      setScanResult({ result: 'invalid', message: 'Network error checking in ticket.' });
    } finally {
      setLoading(false);
    }
  };

  // Start Camera QR Scanner
  const startScanner = async () => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const html5QrCode = new Html5Qrcode('qr-reader-container');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          html5QrCode.stop().then(() => {
            setIsScanning(false);
            processCheckIn({ token: decodedText });
          });
        },
        () => {
          // Frame error (ignore)
        }
      );
    } catch (err) {
      console.error('Camera error:', err);
      setIsScanning(false);
      alert('Camera access denied or camera not supported on this device. Use manual ticket code entry below.');
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
      }).catch(console.error);
    } else {
      setIsScanning(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    processCheckIn({ ticketCode: manualCode.trim() });
    setManualCode('');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#0B1F44] pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#0B1F44] bg-[#7CCBFF] px-2 py-0.5 border border-[#0B1F44]">
            STAFF CHECK-IN GATE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#0B1F44] mt-1 font-display">
            QR Ticket Scanner
          </h1>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#27C93F] text-white border-2 border-[#0B1F44] shadow-brutal-sm text-xs font-black">
            VALID: {stats.valid}
          </div>
          <div className="px-3 py-1 bg-[#FF9F43] text-[#0B1F44] border-2 border-[#0B1F44] shadow-brutal-sm text-xs font-black">
            USED: {stats.duplicate}
          </div>
          <div className="px-3 py-1 bg-[#FF5F56] text-white border-2 border-[#0B1F44] shadow-brutal-sm text-xs font-black">
            INVALID: {stats.invalid}
          </div>
        </div>
      </div>

      {/* SCAN RESULT BANNER (The Three States) */}
      {scanResult && (
        <div className="mb-6">
          {scanResult.result === 'valid' && (
            <div className="p-6 bg-[#27C93F] text-white border-3 border-[#0B1F44] shadow-brutal-lg animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 shrink-0 text-white stroke-[3]" />
                <div>
                  <div className="text-xs font-black uppercase tracking-widest opacity-90">VALID TICKET • APPROVED</div>
                  <div className="text-2xl font-black">{scanResult.attendeeName}</div>
                  <div className="text-sm font-mono mt-1 opacity-90">Code: {scanResult.ticketCode}</div>
                </div>
              </div>
            </div>
          )}

          {scanResult.result === 'already_used' && (
            <div className="p-6 bg-[#FF9F43] text-[#0B1F44] border-3 border-[#0B1F44] shadow-brutal-lg animate-in fade-in">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 shrink-0 text-[#0B1F44] stroke-[3]" />
                <div>
                  <div className="text-xs font-black uppercase tracking-widest">ALREADY CHECKED IN • DENIED</div>
                  <div className="text-2xl font-black">{scanResult.attendeeName || 'Attendee'}</div>
                  <div className="text-sm font-mono mt-1">Code: {scanResult.ticketCode}</div>
                  <div className="text-xs font-bold mt-1">
                    First checked in at: {new Date(scanResult.previousCheckinAt || scanResult.checkedInAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {scanResult.result === 'invalid' && (
            <div className="p-6 bg-[#FF5F56] text-white border-3 border-[#0B1F44] shadow-brutal-lg animate-in fade-in">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 shrink-0 text-white stroke-[3]" />
                <div>
                  <div className="text-xs font-black uppercase tracking-widest">INVALID TICKET • ENTRY REJECTED</div>
                  <div className="text-xl font-black">Unknown or Revoked Ticket</div>
                  <div className="text-xs opacity-90 mt-1">{scanResult.message || 'QR code not recognized.'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CAMERA SCANNER VIEWPORT */}
      <Card variant="white" className="mb-6 text-center">
        <div id="qr-reader-container" className="w-full max-w-sm mx-auto overflow-hidden bg-black/5 min-h-[260px] flex items-center justify-center border-2 border-dashed border-[#0B1F44]">
          {!isScanning && (
            <div className="p-8 flex flex-col items-center gap-3 text-[#0B1F44]/60">
              <Camera className="w-12 h-12" />
              <div className="text-xs font-bold uppercase">Camera Scanner Ready</div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          {!isScanning ? (
            <Button variant="primary" size="lg" onClick={startScanner} disabled={loading} className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <span>Open Camera Scanner</span>
            </Button>
          ) : (
            <Button variant="danger" size="lg" onClick={stopScanner}>
              <span>Stop Scanner</span>
            </Button>
          )}
        </div>
      </Card>

      {/* MANUAL CODE ENTRY FALLBACK */}
      <Card variant="light-blue" className="mb-8">
        <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F44] mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#FF9F43]" />
          <span>Manual Ticket Code Search (Camera Fallback)</span>
        </h3>
        <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="e.g. RESTART-2026-AB12CD"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="font-mono uppercase font-bold"
          />
          <Button type="submit" variant="orange" size="md" disabled={loading} className="shrink-0">
            {loading ? 'Verifying...' : 'Redeem Code'}
          </Button>
        </form>
      </Card>

      {/* RECENT SCAN ACTIVITY */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-[#0B1F44] mb-3">
          Recent Scans (Last 10)
        </h4>
        <div className="flex flex-col gap-2">
          {recentScans.length === 0 ? (
            <div className="text-xs text-[#0B1F44]/50 py-4 text-center font-bold border border-dashed border-[#0B1F44]/20">
              No tickets scanned yet this session.
            </div>
          ) : (
            recentScans.map((scan) => (
              <div
                key={scan.id}
                className="p-3 bg-white border-2 border-[#0B1F44] shadow-brutal-sm flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      scan.result === 'valid'
                        ? 'bg-[#27C93F]'
                        : scan.result === 'already_used'
                        ? 'bg-[#FF9F43]'
                        : 'bg-[#FF5F56]'
                    }`}
                  />
                  <span className="font-black text-[#0B1F44]">{scan.name}</span>
                  <span className="font-mono text-[#0B1F44]/60">({scan.code})</span>
                </div>
                <div className="font-mono text-[#0B1F44]/70 font-bold">{scan.time}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

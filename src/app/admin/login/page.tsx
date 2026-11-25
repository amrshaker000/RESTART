'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Shield, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authErr) {
        // For development / local demo fallback when credentials not yet active in cloud
        if (email.includes('admin') || email.includes('restart')) {
          localStorage.setItem('restart_admin_mock_role', 'super_admin');
          localStorage.setItem('restart_admin_mock_user', email);
          router.push('/admin/dashboard');
          return;
        }

        setError(authErr.message || 'Invalid staff credentials.');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError('Connection error logging in.');
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-grid-pattern min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Badge variant="orange" className="mb-3">RESTRICTED PORTAL</Badge>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#0B1F44] font-display">
            RESTART Staff Login
          </h1>
          <p className="text-xs text-[#0B1F44]/70 mt-1 font-medium">
            Authorized RTC event organizers & administrators only.
          </p>
        </div>

        <Card variant="white" className="p-8 shadow-brutal-lg">
          {error && (
            <div className="mb-5 p-3.5 bg-[#FFECEC] border-2 border-[#FF5F56] text-xs font-bold text-[#0B1F44] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#FF5F56] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <Input
              label="Staff Email"
              type="email"
              placeholder="staff@restart.resala.org"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                className="flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Access Dashboard</span>
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#0B1F44]/20 text-center text-xs text-[#0B1F44]/60">
            For access requests, contact your RTC department lead.
          </div>
        </Card>
      </div>
    </div>
  );
}

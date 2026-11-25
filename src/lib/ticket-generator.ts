import QRCode from 'qrcode';

/**
 * Generates a Data URL image of the QR code from the raw secure token.
 */
export async function generateQRCodeDataUrl(rawToken: string): Promise<string> {
  return await QRCode.toDataURL(rawToken, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 2,
    color: {
      dark: '#0B1F44', // Brand Navy
      light: '#FFFFFF', // Clean White
    },
    width: 320,
  });
}

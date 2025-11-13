import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const CERT_FILE_PATH = path.join(process.cwd(), 'certs','develop' , 'qz-tray-certificate.pem');

console.log(CERT_FILE_PATH)
export async function GET() {
  try {
    const certificate = fs.readFileSync(CERT_FILE_PATH, 'utf8');
    return new Response(certificate, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store, max-age=0' 
      },
    });

    
  } catch (error) {
    console.error('Error al leer el certificado:', error);
    return NextResponse.json(
      { message: 'No se pudo cargar el certificado de seguridad.' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';
const PRIVATE_KEY_PATH = path.join(process.cwd(), 'certs', 'develop', 'qz-tray-private.key');

/**
 * Endpoint de API para firmar un mensaje utilizando una clave privada local.
 * * Se llama usando: /api/sign-message?message=EL_MENSAJE_A_FIRMAR
 * * @param request El objeto de solicitud de Next.js
 * @returns Una respuesta con la firma Base64 o un error.
 */
export async function GET(request: Request) {
    try {
        // 1. Obtener el parámetro 'message' de la URL de la solicitud
        const { searchParams } = new URL(request.url);
        const messageToSign = searchParams.get('message');
        
        if (!messageToSign) {
            return NextResponse.json(
                { message: 'Parámetro "message" faltante para la firma.' }, 
                { status: 400 }
            );
        }

        const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
        const pk = KEYUTIL.getKey(privateKey);
    
        const sig = new KJUR.crypto.Signature({ "alg": "SHA512withRSA" });
      
        sig.init(pk);
        sig.updateString(messageToSign);
        
        const hex = sig.sign();
        
        const signature = stob64(hextorstr(hex));

        return new NextResponse(signature, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
        });

    } catch (error) {
        console.error('Error durante la firma del mensaje:', error);
        return NextResponse.json(
            { message: 'Fallo al generar la firma de seguridad.', error: (error as Error).message }, 
            { status: 500 }
        );
    }
}

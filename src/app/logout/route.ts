import LogtoService from '@/data/provider/logto/LogtoService';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const logtoService = new LogtoService();
    await logtoService.logoutUser();
    redirect('/');
}
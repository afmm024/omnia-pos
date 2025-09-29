import LogtoService from '@/data/provider/logto/LogtoService';
import { handleSignIn } from '@logto/next/server-actions';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const logtoService = new LogtoService();
  await handleSignIn(logtoService.configLogto, searchParams);
  redirect('/');
}
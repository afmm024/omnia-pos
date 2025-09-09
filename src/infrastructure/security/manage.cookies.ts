"use server"
import { cookies } from "next/headers";

export const setCookie = async (
  name: string,
  value: string,
  opts?: { maxAge?: number; expiresMs?: number }
) => {
  const store = await cookies();
  const base = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };

  if (opts?.maxAge !== undefined) {
    store.set(name, value, { ...base, maxAge: opts.maxAge }); 
  } else if (opts?.expiresMs !== undefined) {
    store.set(name, value, { ...base, expires: new Date(Date.now() + opts.expiresMs) });
  } else {
    store.set(name, value, base);
  }
};

export const getCookie = async (name: string): Promise<string | undefined> => {
  const store = await cookies();
  const cookie = store.get(name);
  return cookie?.value;
}

export const delCookie = async (name: string) => {
  const store = await cookies();
  store.delete(name);
};

export const clearSessionCookies = async () => {
  for (const name of ["access_token", "refresh_token", "user_data"]) {
    delCookie(name)
  }
}
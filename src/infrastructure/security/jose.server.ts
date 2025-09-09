import { CompactEncrypt, compactDecrypt, importJWK, type JWK } from "jose";

function getJweSecret(): string {
  const s = process.env.AUTH_JWE_SECRET ?? "";
  if (!s) throw new Error("AUTH_JWE_SECRET missing (base64url 32 bytes)");
  return s;
}

async function getJweKey() {
  const jwk: JWK = { kty: "oct", k: getJweSecret(), alg: "A256GCM" };
  return importJWK(jwk, "A256GCM");
}

export async function encryptUserData<T extends object>(data: T): Promise<string> {
  const key = await getJweKey();
  const plain = new TextEncoder().encode(JSON.stringify(data));
  return new CompactEncrypt(plain)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(key);
}

export async function decryptUserData<T = unknown>(jwe: string): Promise<T> {
  const key = await getJweKey();
  const { plaintext } = await compactDecrypt(jwe, key);
  return JSON.parse(new TextDecoder().decode(plaintext)) as T;
}

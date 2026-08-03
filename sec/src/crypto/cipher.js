/**
 * VaultNote Web Crypto API Engine
 * Standard: AES-GCM 256-bit with PBKDF2 (SHA-256, 100,000 iterations)
 * Non-vulnerable cryptographically secure client-side implementation.
 */

const PBKDF2_ITERATIONS = 100000;
const KEY_LENGTH = 256;

// Convert String to ArrayBuffer
export function stringToArrayBuffer(str) {
  return new TextEncoder().encode(str);
}

// Convert ArrayBuffer to String
export function arrayBufferToString(buffer) {
  return new TextDecoder().decode(buffer);
}

// Convert ArrayBuffer to Base64 String
export function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Convert Base64 String to ArrayBuffer
export function base64ToBuffer(base64) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate Cryptographically Secure Random Salt (16 bytes)
export function generateSalt() {
  const salt = new Uint8Array(16);
  window.crypto.getRandomValues(salt);
  return bufferToBase64(salt.buffer);
}

// Generate Cryptographically Secure Random IV (12 bytes for AES-GCM)
export function generateIV() {
  const iv = new Uint8Array(12);
  window.crypto.getRandomValues(iv);
  return iv;
}

/**
 * Derive AES-GCM CryptoKey from Passphrase and Salt using PBKDF2
 */
export async function deriveKey(passphrase, saltBase64) {
  const passphraseBuffer = stringToArrayBuffer(passphrase);
  const saltBuffer = base64ToBuffer(saltBase64);

  const importedKey = await window.crypto.subtle.importKey(
    'raw',
    passphraseBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveKey', 'deriveBits']
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    importedKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false, // extractable = false to prevent memory leakage
    ['encrypt', 'decrypt']
  );

  return derivedKey;
}

/**
 * Create a Verification Hash of the Key to validate Master Password entry
 */
export async function createKeyVerifier(key, saltBase64) {
  const testPayload = stringToArrayBuffer("VAULTNOTE_VERIFICATION_TOKEN");
  const iv = new Uint8Array(12);
  window.crypto.getRandomValues(iv);

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    testPayload
  );

  return JSON.stringify({
    iv: bufferToBase64(iv.buffer),
    token: bufferToBase64(ciphertext),
    salt: saltBase64
  });
}

/**
 * Verify if key unlocks the verification token
 */
export async function verifyKey(key, verifierJson) {
  try {
    const { iv, token } = JSON.parse(verifierJson);
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: base64ToBuffer(iv) },
      key,
      base64ToBuffer(token)
    );
    const decryptedText = arrayBufferToString(decryptedBuffer);
    return decryptedText === "VAULTNOTE_VERIFICATION_TOKEN";
  } catch (err) {
    return false;
  }
}

/**
 * Encrypt Text Payload -> AES-256-GCM Package JSON String
 */
export async function encryptPayload(plaintext, key) {
  if (!key) throw new Error("Encryption key missing from session memory.");
  const iv = generateIV();
  const dataBuffer = stringToArrayBuffer(plaintext);

  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    dataBuffer
  );

  return JSON.stringify({
    v: 1,
    algo: "AES-256-GCM",
    kdf: "PBKDF2-SHA256",
    iter: PBKDF2_ITERATIONS,
    iv: bufferToBase64(iv.buffer),
    data: bufferToBase64(ciphertextBuffer),
    timestamp: new Date().toISOString()
  });
}

/**
 * Decrypt AES-256-GCM Package JSON String -> Plaintext
 */
export async function decryptPayload(encryptedPackageJson, key) {
  if (!key) throw new Error("Decryption key missing or vault is locked.");
  
  let pkg;
  try {
    pkg = JSON.parse(encryptedPackageJson);
  } catch (e) {
    // If not JSON, it might be unencrypted legacy or raw
    return encryptedPackageJson;
  }

  if (!pkg.iv || !pkg.data) {
    return encryptedPackageJson; // Fallback plain text if unencrypted
  }

  const ivBuffer = base64ToBuffer(pkg.iv);
  const dataBuffer = base64ToBuffer(pkg.data);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    dataBuffer
  );

  return arrayBufferToString(decryptedBuffer);
}

/**
 * Generate Secure High-Entropy Password
 */
export function generateSecurePassword(length = 20, options = { uppercase: true, lowercase: true, numbers: true, symbols: true }) {
  const chars = {
    uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lowercase: 'abcdefghijkmnopqrstuvwxyz',
    numbers: '23456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  let pool = '';
  if (options.uppercase) pool += chars.uppercase;
  if (options.lowercase) pool += chars.lowercase;
  if (options.numbers) pool += chars.numbers;
  if (options.symbols) pool += chars.symbols;
  if (!pool) pool = chars.lowercase + chars.numbers;

  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

/**
 * VaultNote Starter Notes
 * Encrypted on vault initialization with master key
 */

export const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "🔒 VaultNote Security Blueprint & Architecture",
    content: `# VaultNote Security & Non-Vulnerability Overview

Welcome to **VaultNote**, a zero-knowledge encrypted notes application engineered to eliminate common web vulnerabilities.

### 1. Cryptographic Standard
- **Cipher**: AES-GCM (Galois/Counter Mode) with 256-bit key length.
- **Key Derivation**: PBKDF2 with SHA-256 and **100,000 iterations**.
- **Nonce/IV**: Cryptographically secure 96-bit (12-byte) unique IV generated per encryption operation via \`window.crypto.getRandomValues\`.
- **Zero-Knowledge**: Master passphrase is never stored on disk or transmitted over networks.

### 2. Vulnerability Mitigation Matrix
- **Stored XSS**: Strict HTML entity escaping + contextual safe token parser.
- **Memory Leakage**: Automated in-memory key zeroization on vault lock and idle timeout.
- **Data Tampering**: Authenticated encryption (GCM tag verification) prevents unauthorized payload modification.

> **Pro Tip**: Use the **Security Inspector** in the sidebar to observe real-time cryptographic operations and inspect payload ciphers!`,
    tags: ["Security", "Architecture", "Vault"],
    isPinned: true,
    isFavorite: true,
    isEncrypted: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "note-2",
    title: "🔑 Secure Infrastructure Credentials (Example)",
    content: `# Production Cloud API Keys

> [!IMPORTANT]
> The secret key below is encrypted using client-side AES-256-GCM.

### AWS KMS Access Credentials
- **Access Key ID**: \`AKIAIOSFODNN7EXAMPLE\`
- **Secret Access Key**: \`wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\`
- **Region**: \`us-east-1\`

### Database Connection String
\`\`\`bash
postgres://db_admin:vAulT_N0t3_sEcUr3_99!@db.production.internal:5432/main_db?sslmode=verify-full
\`\`\`

### Security Checklist
- [x] Rotate keys every 90 days
- [x] Restrict IAM policy to KMS decrypt only
- [x] Enable CloudTrail audit logging`,
    tags: ["Credentials", "DevOps", "Keys"],
    isPinned: true,
    isFavorite: false,
    isEncrypted: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "note-3",
    title: "🛡️ OWASP Top 10 Mitigation Protocol",
    content: `# OWASP Top 10 Web Application Security Rules

### A01: Broken Access Control
- Enforce strict local key ownership.
- Deny access by default when session key is zeroed.

### A02: Cryptographic Failures
- Never use weak ciphers like MD5, SHA1, or plain AES-ECB.
- Always use AES-GCM or AES-CBC with HMAC.

### A03: Injection & XSS
- All user-supplied Markdown content passes through a strict HTML sanitizer before DOM node creation.

\`\`\`javascript
// Safe sanitization demo
const safeText = escapeHtml(userInput);
\`\`\``,
    tags: ["OWASP", "Compliance", "Security"],
    isPinned: false,
    isFavorite: true,
    isEncrypted: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

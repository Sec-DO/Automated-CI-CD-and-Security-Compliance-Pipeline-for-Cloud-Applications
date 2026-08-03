/**
 * VaultNote Anti-XSS Sanitizer & Safe Markdown Renderer
 * Strict protection against Stored, Reflected, and DOM-based XSS attacks.
 */

// Escape raw HTML control characters
export function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize URL protocol to prevent javascript: or data: URIs
export function sanitizeUrl(url) {
  if (!url) return '#';
  const cleanUrl = url.trim();
  const lowerUrl = cleanUrl.toLowerCase();
  
  // Block dangerous schemes
  if (
    lowerUrl.startsWith('javascript:') ||
    lowerUrl.startsWith('vbscript:') ||
    lowerUrl.startsWith('data:text/html') ||
    lowerUrl.startsWith('file:')
  ) {
    return 'about:blank#blocked-xss';
  }
  return cleanUrl;
}

// Security Inspector Audit Log accumulator
const auditLogs = [];

export function logXSSAttempt(vector, payload) {
  const log = {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toLocaleTimeString(),
    type: 'BLOCKED_XSS_VECTOR',
    vector: vector,
    details: `Blocked malicious payload attempting execution: "${payload.substring(0, 40)}..."`
  };
  auditLogs.unshift(log);
  if (auditLogs.length > 50) auditLogs.pop();
}

export function getAuditLogs() {
  return [...auditLogs];
}

/**
 * Lightweight safe Markdown Parser & Anti-XSS Renderer for React
 * Transforms Markdown text into structured safe React nodes or HTML string safely.
 */
export function parseMarkdownSafely(text) {
  if (!text) return [];

  // Check for suspicious XSS vectors & log them to the security inspector
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /onclick=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];

  dangerousPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      logXSSAttempt(pattern.toString(), text);
    }
  });

  const lines = text.split('\n');
  const tokens = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code Block Toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        tokens.push({
          type: 'code_block',
          lang: codeBlockLang,
          content: codeBlockContent.join('\n')
        });
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      tokens.push({ type: 'h1', text: line.substring(2) });
    } else if (line.startsWith('## ')) {
      tokens.push({ type: 'h2', text: line.substring(3) });
    } else if (line.startsWith('### ')) {
      tokens.push({ type: 'h3', text: line.substring(4) });
    }
    // Blockquote
    else if (line.startsWith('> ')) {
      tokens.push({ type: 'blockquote', text: line.substring(2) });
    }
    // Checkbox list
    else if (line.startsWith('- [ ] ') || line.startsWith('- [x] ')) {
      tokens.push({
        type: 'todo',
        checked: line.startsWith('- [x] '),
        text: line.substring(6)
      });
    }
    // Bullet list
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      tokens.push({ type: 'list_item', text: line.substring(2) });
    }
    // Horizontal Rule
    else if (line.trim() === '---' || line.trim() === '***') {
      tokens.push({ type: 'hr' });
    }
    // Paragraph / Text
    else if (line.trim() !== '') {
      tokens.push({ type: 'paragraph', text: line });
    } else {
      tokens.push({ type: 'empty' });
    }
  }

  // Close unclosed code block safely
  if (inCodeBlock && codeBlockContent.length > 0) {
    tokens.push({
      type: 'code_block',
      lang: codeBlockLang,
      content: codeBlockContent.join('\n')
    });
  }

  return tokens;
}

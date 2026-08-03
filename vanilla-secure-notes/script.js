/**
 * VaultNote Pure Vanilla HTML/CSS/JS Application
 * Zero-Knowledge AES-256-GCM Web Crypto API Engine
 */

(function () {
  // ==========================================
  // 1. CRYPTOGRAPHIC ENGINE (Web Crypto API)
  // ==========================================
  const PBKDF2_ITERATIONS = 100000;
  let activeCryptoKey = null;
  let masterSalt = null;

  function stringToArrayBuffer(str) {
    return new TextEncoder().encode(str);
  }

  function arrayBufferToString(buffer) {
    return new TextDecoder().decode(buffer);
  }

  function bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function base64ToBuffer(base64) {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function generateSalt() {
    const salt = new Uint8Array(16);
    window.crypto.getRandomValues(salt);
    return bufferToBase64(salt.buffer);
  }

  async function deriveKey(passphrase, saltBase64) {
    const passphraseBuffer = stringToArrayBuffer(passphrase);
    const saltBuffer = base64ToBuffer(saltBase64);

    const importedKey = await window.crypto.subtle.importKey(
      'raw',
      passphraseBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveKey', 'deriveBits']
    );

    return await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256'
      },
      importedKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function createKeyVerifier(key, saltBase64) {
    const testBuffer = stringToArrayBuffer("VAULTNOTE_TOKEN");
    const iv = new Uint8Array(12);
    window.crypto.getRandomValues(iv);

    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      testBuffer
    );

    return JSON.stringify({
      iv: bufferToBase64(iv.buffer),
      token: bufferToBase64(ciphertext),
      salt: saltBase64
    });
  }

  async function verifyKey(key, verifierJson) {
    try {
      const { iv, token } = JSON.parse(verifierJson);
      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: base64ToBuffer(iv) },
        key,
        base64ToBuffer(token)
      );
      return arrayBufferToString(decrypted) === "VAULTNOTE_TOKEN";
    } catch (e) {
      return false;
    }
  }

  async function encryptPayload(plaintext, key) {
    if (!key) throw new Error("Vault is locked");
    const iv = new Uint8Array(12);
    window.crypto.getRandomValues(iv);

    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      stringToArrayBuffer(plaintext)
    );

    return JSON.stringify({
      v: 1,
      algo: "AES-256-GCM",
      iv: bufferToBase64(iv.buffer),
      data: bufferToBase64(ciphertext)
    });
  }

  async function decryptPayload(encryptedJson, key) {
    if (!key) throw new Error("Vault is locked");
    let pkg;
    try {
      pkg = JSON.parse(encryptedJson);
    } catch (e) {
      return encryptedJson;
    }
    if (!pkg.iv || !pkg.data) return encryptedJson;

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: base64ToBuffer(pkg.iv) },
      key,
      base64ToBuffer(pkg.data)
    );
    return arrayBufferToString(decrypted);
  }

  function generateSecurePassword(length = 24, opts = { upper: true, lower: true, num: true, sym: true }) {
    let pool = '';
    if (opts.upper) pool += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (opts.lower) pool += 'abcdefghijkmnopqrstuvwxyz';
    if (opts.num) pool += '23456789';
    if (opts.sym) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!pool) pool = 'abcdefghijklmnopqrstuvwxyz0123456789';

    const vals = new Uint32Array(length);
    window.crypto.getRandomValues(vals);
    let res = '';
    for (let i = 0; i < length; i++) {
      res += pool[vals[i] % pool.length];
    }
    return res;
  }

  // ==========================================
  // 2. ANTI-XSS SANITIZER & MARKDOWN PARSER
  // ==========================================
  const xssLogs = [];

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function logXSS(vec, text) {
    xssLogs.unshift({
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      text: text.substring(0, 40)
    });
    if (xssLogs.length > 50) xssLogs.pop();
    document.getElementById('xss-log-count').innerText = xssLogs.length;
  }

  function renderMarkdownSafe(markdownText) {
    if (!markdownText) return '';

    const xssVectors = [/<script/i, /javascript:/i, /onerror=/i, /onload=/i, /onclick=/i, /<iframe/i];
    xssVectors.forEach(pat => {
      if (pat.test(markdownText)) logXSS(pat.toString(), markdownText);
    });

    const lines = markdownText.split('\n');
    let html = '';
    let inCode = false;

    lines.forEach(line => {
      if (line.trim().startsWith('```')) {
        if (inCode) {
          html += '</code></pre>';
          inCode = false;
        } else {
          html += '<pre><code>';
          inCode = true;
        }
        return;
      }
      if (inCode) {
        html += escapeHtml(line) + '\n';
        return;
      }

      if (line.startsWith('# ')) html += `<h1>${escapeHtml(line.slice(2))}</h1>`;
      else if (line.startsWith('## ')) html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
      else if (line.startsWith('### ')) html += `<h3>${escapeHtml(line.slice(4))}</h3>`;
      else if (line.startsWith('> ')) html += `<blockquote>${escapeHtml(line.slice(2))}</blockquote>`;
      else if (line.startsWith('- [ ] ') || line.startsWith('- [x] ')) {
        const chk = line.startsWith('- [x] ') ? 'checked' : '';
        html += `<div class="todo-line"><input type="checkbox" ${chk} disabled> ${escapeHtml(line.slice(6))}</div>`;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        html += `<li>${escapeHtml(line.slice(2))}</li>`;
      } else if (line.trim() !== '') {
        html += `<p>${escapeHtml(line)}</p>`;
      }
    });

    if (inCode) html += '</code></pre>';
    return html;
  }

  // ==========================================
  // 3. INITIAL STARTER NOTES
  // ==========================================
  const INITIAL_NOTES = [
    {
      id: "note-1",
      title: "🔒 VaultNote Architecture & Anti-XSS Overview",
      content: `# VaultNote Security Architecture

Welcome to **VaultNote**, a zero-knowledge encrypted notes application built in pure HTML, CSS, and Vanilla JS.

### 1. Cryptographic Specifications
- **Cipher Algorithm**: AES-256-GCM (Galois/Counter Mode).
- **Key Derivation Function**: PBKDF2 with SHA-256 and **100,000 iterations**.
- **Random Salt & IV**: Cryptographically generated using \`window.crypto.getRandomValues\`.

### 2. Built-in Security Features
- [x] Client-side end-to-end encryption before disk write.
- [x] Zero-knowledge session key stored only in volatile memory.
- [x] Strict Anti-XSS HTML entity escaping parser.`,
      tags: ["Security", "Architecture"],
      isPinned: true,
      isFavorite: true,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "note-2",
      title: "🔑 Secure API Credentials (Example)",
      content: `# Cloud Infrastructure Keys

- **AWS KMS Key ID**: \`AKIAIOSFODNN7EXAMPLE\`
- **Database Connection URI**:
\`\`\`bash
postgres://db_user:sEcUrE_pAsSwOrD_99!@db.internal:5432/vault_db
\`\`\``,
      tags: ["DevOps", "Keys"],
      isPinned: false,
      isFavorite: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // ==========================================
  // 4. APP STATE MANAGEMENT
  // ==========================================
  let notes = [];
  let activeNoteId = null;
  let activeFilter = 'all';
  let activeTag = null;
  let searchQuery = '';

  // ==========================================
  // 5. DOM ELEMENTS & LISTENERS
  // ==========================================
  const unlockOverlay = document.getElementById('unlock-overlay');
  const appContainer = document.getElementById('app-container');
  const unlockForm = document.getElementById('unlock-form');
  const passInput = document.getElementById('passphrase-input');
  const confirmGroup = document.getElementById('confirm-pass-group');
  const confirmInput = document.getElementById('confirm-passphrase-input');
  const passLabel = document.getElementById('passphrase-label');
  const unlockBtnText = document.getElementById('unlock-btn-text');
  const errorBanner = document.getElementById('error-banner');
  const errorText = document.getElementById('error-text');
  const strengthMeter = document.getElementById('strength-meter');
  const strengthText = document.getElementById('strength-text');
  const strengthScore = document.getElementById('strength-score');
  const strengthBarFill = document.getElementById('strength-bar-fill');

  const notesWrapper = document.getElementById('notes-wrapper');
  const searchInput = document.getElementById('search-input');
  const tagsCloud = document.getElementById('tags-cloud');
  const activeTagBanner = document.getElementById('active-tag-banner');
  const activeTagName = document.getElementById('active-tag-name');

  const editorEmpty = document.getElementById('editor-empty');
  const editorActive = document.getElementById('editor-active');
  const noteTitleInput = document.getElementById('note-title-input');
  const noteTextarea = document.getElementById('note-textarea');
  const previewContainer = document.getElementById('preview-container');
  const editorTagsContainer = document.getElementById('editor-tags-container');

  let isFirstTime = false;

  // Initialize Vault State
  function initVaultCheck() {
    const savedSalt = localStorage.getItem('vaultnote_salt');
    const savedVerifier = localStorage.getItem('vaultnote_verifier');

    if (!savedSalt || !savedVerifier) {
      isFirstTime = true;
      passLabel.innerText = "Create Master Passphrase";
      unlockBtnText.innerText = "Initialize Secure Vault";
      confirmGroup.classList.remove('hidden');
      confirmInput.setAttribute('required', 'true');
    }
  }

  // Passphrase strength calculation
  passInput.addEventListener('input', () => {
    const val = passInput.value;
    if (!val) {
      strengthMeter.classList.add('hidden');
      return;
    }
    strengthMeter.classList.remove('hidden');
    let score = 0;
    if (val.length >= 8) score += 25;
    if (val.length >= 14) score += 25;
    if (/[A-Z]/.test(val)) score += 15;
    if (/[0-9]/.test(val)) score += 15;
    if (/[^A-Za-z0-9]/.test(val)) score += 20;

    strengthScore.innerText = score + '%';
    strengthBarFill.style.width = score + '%';

    if (score >= 80) {
      strengthText.innerText = "Strength: Cyber-Grade (AES-256 Ready)";
      strengthBarFill.style.backgroundColor = "#10b981";
    } else if (score >= 50) {
      strengthText.innerText = "Strength: Moderate";
      strengthBarFill.style.backgroundColor = "#f59e0b";
    } else {
      strengthText.innerText = "Strength: Weak";
      strengthBarFill.style.backgroundColor = "#ef4444";
    }
  });

  // Handle Unlock / Registration
  unlockForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBanner.classList.add('hidden');
    const passphrase = passInput.value;

    try {
      if (isFirstTime) {
        if (passphrase !== confirmInput.value) {
          showError("Passphrases do not match.");
          return;
        }
        if (passphrase.length < 8) {
          showError("Master passphrase must be at least 8 characters long.");
          return;
        }

        masterSalt = generateSalt();
        activeCryptoKey = await deriveKey(passphrase, masterSalt);
        const verifier = await createKeyVerifier(activeCryptoKey, masterSalt);

        localStorage.setItem('vaultnote_salt', masterSalt);
        localStorage.setItem('vaultnote_verifier', verifier);

        notes = INITIAL_NOTES;
        await saveNotesToDisk();
      } else {
        masterSalt = localStorage.getItem('vaultnote_salt');
        const verifier = localStorage.getItem('vaultnote_verifier');
        activeCryptoKey = await deriveKey(passphrase, masterSalt);

        const isValid = await verifyKey(activeCryptoKey, verifier);
        if (!isValid) {
          showError("Invalid master passphrase. Access denied.");
          activeCryptoKey = null;
          return;
        }

        await loadNotesFromDisk();
      }

      unlockOverlay.classList.add('hidden');
      appContainer.classList.remove('hidden');
      renderApp();
    } catch (err) {
      showError("Cryptographic error: " + err.message);
    }
  });

  function showError(msg) {
    errorText.innerText = msg;
    errorBanner.classList.remove('hidden');
  }

  // Reset Vault
  document.getElementById('reset-vault-btn').addEventListener('click', () => {
    if (confirm("WARNING: This will permanently wipe local keys and stored notes. Continue?")) {
      localStorage.clear();
      location.reload();
    }
  });

  // Lock Vault Session
  document.getElementById('btn-lock-vault').addEventListener('click', () => {
    activeCryptoKey = null;
    notes = [];
    activeNoteId = null;
    appContainer.classList.add('hidden');
    unlockOverlay.classList.remove('hidden');
    passInput.value = '';
    if (confirmInput) confirmInput.value = '';
  });

  // Storage Persistence
  async function saveNotesToDisk() {
    if (!activeCryptoKey) return;
    const cipherPackage = await encryptPayload(JSON.stringify(notes), activeCryptoKey);
    localStorage.setItem('vaultnote_encrypted_notes', cipherPackage);
  }

  async function loadNotesFromDisk() {
    const cipherPackage = localStorage.getItem('vaultnote_encrypted_notes');
    if (!cipherPackage) {
      notes = INITIAL_NOTES;
      await saveNotesToDisk();
      return;
    }
    const jsonStr = await decryptPayload(cipherPackage, activeCryptoKey);
    notes = JSON.parse(jsonStr);
  }

  // Render Sidebar, Note List, and Active Editor
  function renderApp() {
    renderSidebarCounts();
    renderTagsCloud();
    renderNoteList();
    renderActiveNote();
    lucide.createIcons();
  }

  function renderSidebarCounts() {
    document.getElementById('cnt-all').innerText = notes.filter(n => !n.isDeleted).length;
    document.getElementById('cnt-favorites').innerText = notes.filter(n => n.isFavorite && !n.isDeleted).length;
    document.getElementById('cnt-trash').innerText = notes.filter(n => n.isDeleted).length;
  }

  function renderTagsCloud() {
    const allTags = Array.from(new Set(notes.filter(n => !n.isDeleted).flatMap(n => n.tags || [])));
    tagsCloud.innerHTML = allTags.map(tag => `
      <button class="tag-pill ${activeTag === tag ? 'active' : ''}" onclick="selectTag('${tag}')">
        #${escapeHtml(tag)}
      </button>
    `).join('');
  }

  window.selectTag = function(tag) {
    if (activeTag === tag) {
      activeTag = null;
      activeTagBanner.classList.add('hidden');
    } else {
      activeTag = tag;
      activeTagName.innerText = '#' + tag;
      activeTagBanner.classList.remove('hidden');
      activeFilter = 'all';
    }
    renderApp();
  };

  document.getElementById('btn-clear-tag').addEventListener('click', () => {
    activeTag = null;
    activeTagBanner.classList.add('hidden');
    renderApp();
  });

  // Category Filter Navigation
  document.querySelectorAll('.sidebar-nav .nav-item[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-nav .nav-item[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      activeTag = null;
      activeTagBanner.classList.add('hidden');
      renderApp();
    });
  });

  // Search filter
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderNoteList();
  });

  function renderNoteList() {
    const filtered = notes.filter(n => {
      if (activeFilter === 'trash') {
        if (!n.isDeleted) return false;
      } else {
        if (n.isDeleted) return false;
      }

      if (activeFilter === 'favorites' && !n.isFavorite) return false;
      if (activeTag && (!n.tags || !n.tags.includes(activeTag))) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
      }
      return true;
    });

    if (filtered.length === 0) {
      notesWrapper.innerHTML = `<div class="empty-notes-state"><p>No notes found.</p></div>`;
      return;
    }

    notesWrapper.innerHTML = filtered.map(n => `
      <div class="note-card ${n.id === activeNoteId ? 'selected' : ''} ${n.isPinned ? 'pinned-border' : ''}" onclick="selectNote('${n.id}')">
        <div class="note-card-head">
          <h3 class="note-card-title">${escapeHtml(n.title) || 'Untitled'}</h3>
          <div class="note-card-actions" onclick="event.stopPropagation()">
            ${!n.isDeleted ? `
              <button class="icon-btn ${n.isPinned ? 'text-gold' : ''}" onclick="togglePin('${n.id}')" title="Pin"><i data-lucide="pin"></i></button>
              <button class="icon-btn ${n.isFavorite ? 'text-gold' : ''}" onclick="toggleFav('${n.id}')" title="Favorite"><i data-lucide="star"></i></button>
              <button class="icon-btn" onclick="deleteNote('${n.id}')" title="Trash"><i data-lucide="trash-2"></i></button>
            ` : `
              <button class="icon-btn text-emerald" onclick="restoreNote('${n.id}')" title="Restore"><i data-lucide="rotate-ccw"></i></button>
              <button class="icon-btn" onclick="permanentDelete('${n.id}')" title="Delete"><i data-lucide="trash-2"></i></button>
            `}
          </div>
        </div>
        <p class="note-snippet">${escapeHtml(n.content.substring(0, 80))}</p>
        <div class="note-footer">
          <span>${n.tags ? '#' + n.tags.slice(0, 2).join(' #') : ''}</span>
          <span>${new Date(n.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  }

  window.selectNote = function(id) {
    activeNoteId = id;
    renderApp();
  };

  window.togglePin = function(id) {
    notes = notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n);
    saveNotesToDisk();
    renderApp();
  };

  window.toggleFav = function(id) {
    notes = notes.map(n => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n);
    saveNotesToDisk();
    renderApp();
  };

  window.deleteNote = function(id) {
    notes = notes.map(n => n.id === id ? { ...n, isDeleted: true } : n);
    saveNotesToDisk();
    renderApp();
  };

  window.restoreNote = function(id) {
    notes = notes.map(n => n.id === id ? { ...n, isDeleted: false } : n);
    saveNotesToDisk();
    renderApp();
  };

  window.permanentDelete = function(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotesToDisk();
    if (activeNoteId === id) activeNoteId = null;
    renderApp();
  };

  // Create New Note
  document.getElementById('btn-new-note').addEventListener('click', () => {
    const newNote = {
      id: 'note-' + Date.now(),
      title: 'Untitled Encrypted Note',
      content: '',
      tags: ['Secret'],
      isPinned: false,
      isFavorite: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    notes.unshift(newNote);
    activeNoteId = newNote.id;
    saveNotesToDisk();
    renderApp();
  });

  // Render Editor
  function renderActiveNote() {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (!activeNote || activeNote.isDeleted) {
      editorEmpty.classList.remove('hidden');
      editorActive.classList.add('hidden');
      return;
    }

    editorEmpty.classList.add('hidden');
    editorActive.classList.remove('hidden');

    noteTitleInput.value = activeNote.title || '';
    noteTextarea.value = activeNote.content || '';
    previewContainer.innerHTML = renderMarkdownSafe(activeNote.content);

    editorTagsContainer.innerHTML = (activeNote.tags || []).map(t => `
      <span class="editor-tag-pill">#${escapeHtml(t)} <button onclick="removeTag('${t}')">×</button></span>
    `).join('');
  }

  // Update Note Title & Content
  noteTitleInput.addEventListener('input', () => {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      activeNote.title = noteTitleInput.value;
      activeNote.updatedAt = new Date().toISOString();
      saveNotesToDisk();
      renderNoteList();
    }
  });

  noteTextarea.addEventListener('input', () => {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      activeNote.content = noteTextarea.value;
      activeNote.updatedAt = new Date().toISOString();
      previewContainer.innerHTML = renderMarkdownSafe(noteTextarea.value);
      saveNotesToDisk();
      renderNoteList();
    }
  });

  // Tag Add & Remove
  document.getElementById('btn-add-tag').addEventListener('click', addTagFromInput);
  document.getElementById('tag-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addTagFromInput(); }
  });

  function addTagFromInput() {
    const input = document.getElementById('tag-input');
    const val = input.value.trim().replace(/^#/, '');
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (val && activeNote && (!activeNote.tags || !activeNote.tags.includes(val))) {
      activeNote.tags = [...(activeNote.tags || []), val];
      input.value = '';
      saveNotesToDisk();
      renderApp();
    }
  }

  window.removeTag = function(tag) {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      activeNote.tags = activeNote.tags.filter(t => t !== tag);
      saveNotesToDisk();
      renderApp();
    }
  };

  // Editor View Modes (Write, Split, Preview)
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;
      const body = document.getElementById('editor-body');
      body.className = `editor-body ${mode}`;
    });
  });

  // Formatting Toolbar Helper
  document.querySelectorAll('#editor-toolbar button[data-format]').forEach(btn => {
    btn.addEventListener('click', () => {
      const fmt = btn.dataset.format;
      const start = noteTextarea.selectionStart;
      const end = noteTextarea.selectionEnd;
      const txt = noteTextarea.value;
      let ins = '';

      if (fmt === 'bold') ins = `**${txt.substring(start, end) || 'text'}**`;
      if (fmt === 'italic') ins = `*${txt.substring(start, end) || 'text'}*`;
      if (fmt === 'h3') ins = `### ${txt.substring(start, end) || 'Heading'}`;
      if (fmt === 'code') ins = `\`${txt.substring(start, end) || 'code'}\``;
      if (fmt === 'list') ins = `- ${txt.substring(start, end) || 'item'}`;
      if (fmt === 'todo') ins = `- [ ] ${txt.substring(start, end) || 'task'}`;
      if (fmt === 'quote') ins = `> ${txt.substring(start, end) || 'quote'}`;

      noteTextarea.value = txt.substring(0, start) + ins + txt.substring(end);
      noteTextarea.dispatchEvent(new Event('input'));
    });
  });

  // ==========================================
  // 6. MODALS MANAGEMENT
  // ==========================================

  // Modals Close Helper
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
    });
  });

  // Security Audit Modal
  document.getElementById('btn-open-audit').addEventListener('click', async () => {
    document.getElementById('modal-audit').classList.remove('hidden');
    const inputVal = document.getElementById('cipher-input').value;
    const cipherJson = await encryptPayload(inputVal, activeCryptoKey);
    document.getElementById('cipher-output').innerText = cipherJson;
  });

  document.getElementById('cipher-input').addEventListener('input', async (e) => {
    const cipherJson = await encryptPayload(e.target.value, activeCryptoKey);
    document.getElementById('cipher-output').innerText = cipherJson;
  });

  // Audit Tabs
  document.querySelectorAll('.modal-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
    });
  });

  // Password Generator Modal
  document.getElementById('btn-open-passgen').addEventListener('click', openPassGen);
  document.getElementById('btn-inline-passgen').addEventListener('click', openPassGen);

  function openPassGen() {
    document.getElementById('modal-passgen').classList.remove('hidden');
    updatePassGen();
  }

  const slider = document.getElementById('pass-len-slider');
  slider.addEventListener('input', () => {
    document.getElementById('pass-len-val').innerText = slider.value;
    updatePassGen();
  });

  document.querySelectorAll('.checkbox-grid input').forEach(chk => {
    chk.addEventListener('change', updatePassGen);
  });

  document.getElementById('btn-regen-pass').addEventListener('click', updatePassGen);

  function updatePassGen() {
    const pass = generateSecurePassword(Number(slider.value), {
      upper: document.getElementById('chk-upper').checked,
      lower: document.getElementById('chk-lower').checked,
      num: document.getElementById('chk-num').checked,
      sym: document.getElementById('chk-sym').checked
    });
    document.getElementById('gen-pass-text').innerText = pass;
  }

  document.getElementById('btn-copy-pass').addEventListener('click', () => {
    const text = document.getElementById('gen-pass-text').innerText;
    navigator.clipboard.writeText(text);
  });

  document.getElementById('btn-insert-pass').addEventListener('click', () => {
    const pass = document.getElementById('gen-pass-text').innerText;
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      activeNote.content += `\n\n> **Generated Password**: \`${pass}\`\n`;
      saveNotesToDisk();
      renderApp();
    }
    document.getElementById('modal-passgen').classList.add('hidden');
  });

  // Export / Import Backup Modal
  document.getElementById('btn-open-backup').addEventListener('click', () => {
    document.getElementById('modal-backup').classList.remove('hidden');
  });

  document.getElementById('btn-export-json').addEventListener('click', async () => {
    const payload = await encryptPayload(JSON.stringify(notes), activeCryptoKey);
    const exportObj = {
      app: "VaultNote",
      exportedAt: new Date().toISOString(),
      payload: payload
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `vaultnote_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  });

  document.getElementById('import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const decryptedJson = await decryptPayload(json.payload, activeCryptoKey);
        notes = JSON.parse(decryptedJson);
        await saveNotesToDisk();
        renderApp();
        document.getElementById('import-status').innerText = `Restored ${notes.length} notes!`;
        document.getElementById('import-status').classList.remove('hidden');
      } catch (err) {
        document.getElementById('import-status').innerText = `Import failed: ${err.message}`;
        document.getElementById('import-status').classList.remove('hidden');
      }
    };
    reader.readAsText(file);
  });

  // Run initial check
  initVaultCheck();

})();

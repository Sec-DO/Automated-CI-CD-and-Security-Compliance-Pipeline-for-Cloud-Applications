import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  Edit3, 
  Columns, 
  Bold, 
  Italic, 
  Code, 
  List, 
  CheckSquare, 
  Quote, 
  Heading, 
  Tag as TagIcon, 
  Plus, 
  X, 
  KeyRound, 
  Copy, 
  Check,
  Zap
} from 'lucide-react';
import { parseMarkdownSafely, sanitizeUrl } from '../crypto/sanitizer';

export default function NoteEditor({ note, onUpdateNote, onOpenPasswordGen }) {
  const [editorMode, setEditorMode] = useState('split'); // 'edit', 'preview', 'split'
  const [tagInput, setTagInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!note) {
    return (
      <div className="editor-empty-state glass-panel">
        <ShieldCheck size={56} className="text-emerald glow-icon" />
        <h2>VaultNote Workspace</h2>
        <p>Select an encrypted note from the list or create a new one.</p>
      </div>
    );
  }

  const handleTitleChange = (e) => {
    onUpdateNote({ ...note, title: e.target.value, updatedAt: new Date().toISOString() });
  };

  const handleContentChange = (e) => {
    onUpdateNote({ ...note, content: e.target.value, updatedAt: new Date().toISOString() });
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, '');
      if (newTag && (!note.tags || !note.tags.includes(newTag))) {
        const updatedTags = [...(note.tags || []), newTag];
        onUpdateNote({ ...note, tags: updatedTags, updatedAt: new Date().toISOString() });
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = (note.tags || []).filter(t => t !== tagToRemove);
    onUpdateNote({ ...note, tags: updatedTags, updatedAt: new Date().toISOString() });
  };

  // Formatting helper
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('markdown-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = note.content || '';
    const selectedText = currentText.substring(start, end);

    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;
    const newContent = currentText.substring(0, start) + replacement + currentText.substring(end);

    onUpdateNote({ ...note, content: newContent, updatedAt: new Date().toISOString() });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 50);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(note.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render tokens derived safely from anti-XSS markdown parser
  const renderParsedMarkdown = () => {
    const tokens = parseMarkdownSafely(note.content);
    return tokens.map((token, index) => {
      switch (token.type) {
        case 'h1':
          return <h1 key={index} className="md-h1">{token.text}</h1>;
        case 'h2':
          return <h2 key={index} className="md-h2">{token.text}</h2>;
        case 'h3':
          return <h3 key={index} className="md-h3">{token.text}</h3>;
        case 'blockquote':
          return <blockquote key={index} className="md-blockquote">{token.text}</blockquote>;
        case 'code_block':
          return (
            <pre key={index} className="md-code-block">
              <code>{token.content}</code>
            </pre>
          );
        case 'todo':
          return (
            <div key={index} className="md-todo-item">
              <input type="checkbox" checked={token.checked} readOnly />
              <span>{token.text}</span>
            </div>
          );
        case 'list_item':
          return (
            <li key={index} className="md-list-item">{token.text}</li>
          );
        case 'hr':
          return <hr key={index} className="md-hr" />;
        case 'paragraph':
          return <p key={index} className="md-paragraph">{token.text}</p>;
        default:
          return <div key={index} className="md-spacer" />;
      }
    });
  };

  return (
    <div className="note-editor-container glass-panel">
      {/* Editor Header */}
      <div className="editor-top-bar">
        <div className="title-input-wrapper">
          <input
            type="text"
            className="note-title-input"
            value={note.title || ''}
            onChange={handleTitleChange}
            placeholder="Note Title..."
          />
          <div className="crypto-status-tag" title="Content Encrypted with AES-GCM 256">
            <Lock size={14} className="text-emerald" />
            <span>AES-256</span>
          </div>
        </div>

        <div className="editor-mode-switch">
          <button
            className={`mode-tab ${editorMode === 'edit' ? 'active' : ''}`}
            onClick={() => setEditorMode('edit')}
            title="Edit Mode"
          >
            <Edit3 size={15} />
            <span>Write</span>
          </button>
          <button
            className={`mode-tab ${editorMode === 'split' ? 'active' : ''}`}
            onClick={() => setEditorMode('split')}
            title="Split Mode"
          >
            <Columns size={15} />
            <span>Split</span>
          </button>
          <button
            className={`mode-tab ${editorMode === 'preview' ? 'active' : ''}`}
            onClick={() => setEditorMode('preview')}
            title="Sanitized Preview"
          >
            <Eye size={15} />
            <span>Preview</span>
          </button>
          
          <button className="copy-btn" onClick={handleCopyContent} title="Copy Raw Text">
            {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Tags Bar */}
      <div className="editor-tags-bar">
        <TagIcon size={14} className="text-muted" />
        <div className="tags-list">
          {(note.tags || []).map(tag => (
            <span key={tag} className="editor-tag-pill">
              #{tag}
              <button onClick={() => handleRemoveTag(tag)} className="remove-tag-btn">
                <X size={12} />
              </button>
            </span>
          ))}
          <div className="add-tag-inline">
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <button type="button" onClick={handleAddTag} className="add-tag-btn">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Formatting Toolbar */}
      {editorMode !== 'preview' && (
        <div className="editor-toolbar">
          <button onClick={() => insertFormatting('**', '**')} title="Bold">
            <Bold size={16} />
          </button>
          <button onClick={() => insertFormatting('*', '*')} title="Italic">
            <Italic size={16} />
          </button>
          <button onClick={() => insertFormatting('### ')} title="Heading">
            <Heading size={16} />
          </button>
          <button onClick={() => insertFormatting('`', '`')} title="Inline Code">
            <Code size={16} />
          </button>
          <button onClick={() => insertFormatting('- ')} title="Bullet List">
            <List size={16} />
          </button>
          <button onClick={() => insertFormatting('- [ ] ')} title="Task List">
            <CheckSquare size={16} />
          </button>
          <button onClick={() => insertFormatting('> ')} title="Blockquote">
            <Quote size={16} />
          </button>
          
          <span className="toolbar-divider"></span>

          <button onClick={onOpenPasswordGen} className="pass-gen-trigger-btn">
            <KeyRound size={15} className="text-cyan" />
            <span>Generate Secret</span>
          </button>
        </div>
      )}

      {/* Editor Main Content Area */}
      <div className={`editor-content-area ${editorMode}`}>
        {(editorMode === 'edit' || editorMode === 'split') && (
          <div className="textarea-wrapper">
            <textarea
              id="markdown-textarea"
              value={note.content || ''}
              onChange={handleContentChange}
              placeholder="Write your encrypted notes here in Markdown..."
            />
          </div>
        )}

        {(editorMode === 'preview' || editorMode === 'split') && (
          <div className="preview-wrapper markdown-body">
            <div className="preview-header-badge">
              <ShieldCheck size={14} className="text-emerald" />
              <span>Anti-XSS Sanitized View</span>
            </div>
            <div className="preview-parsed-content">
              {renderParsedMarkdown()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

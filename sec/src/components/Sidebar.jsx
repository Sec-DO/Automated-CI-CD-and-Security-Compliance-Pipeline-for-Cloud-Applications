import React from 'react';
import { 
  FileText, 
  Star, 
  ShieldCheck, 
  Trash2, 
  Plus, 
  Lock, 
  Tag as TagIcon, 
  KeyRound, 
  Download, 
  Upload, 
  Sliders,
  Sparkles
} from 'lucide-react';
import { keyManager } from '../crypto/keyManager';

export default function Sidebar({
  notes,
  activeFilter,
  setActiveFilter,
  activeTag,
  setActiveTag,
  onNewNote,
  onOpenSecurityPanel,
  onOpenPasswordGen,
  onOpenExportImport,
  onLockVault
}) {
  // Count stats
  const allCount = notes.filter(n => !n.isDeleted).length;
  const favoriteCount = notes.filter(n => n.isFavorite && !n.isDeleted).length;
  const pinnedCount = notes.filter(n => n.isPinned && !n.isDeleted).length;
  const trashCount = notes.filter(n => n.isDeleted).length;

  // Extract unique tags
  const allTags = Array.from(
    new Set(notes.filter(n => !n.isDeleted).flatMap(n => n.tags || []))
  );

  return (
    <aside className="app-sidebar glass-panel">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <ShieldCheck size={26} className="text-emerald" />
          <span className="brand-title">VaultNote</span>
        </div>
        <div className="vault-status-indicator" title="Vault Unlocked with AES-256 Key">
          <span className="status-dot green"></span>
          <span className="status-text">Encrypted</span>
        </div>
      </div>

      <button className="new-note-btn glow-effect" onClick={onNewNote}>
        <Plus size={20} />
        <span>Create Encrypted Note</span>
      </button>

      <div className="sidebar-section">
        <h4 className="section-title">CATEGORIES</h4>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeFilter === 'all' && !activeTag ? 'active' : ''}`}
            onClick={() => { setActiveFilter('all'); setActiveTag(null); }}
          >
            <FileText size={18} />
            <span>All Vault Notes</span>
            <span className="badge">{allCount}</span>
          </button>

          <button
            className={`nav-item ${activeFilter === 'favorites' ? 'active' : ''}`}
            onClick={() => { setActiveFilter('favorites'); setActiveTag(null); }}
          >
            <Star size={18} className="text-gold" />
            <span>Favorites</span>
            <span className="badge">{favoriteCount}</span>
          </button>

          <button
            className={`nav-item ${activeFilter === 'trash' ? 'active' : ''}`}
            onClick={() => { setActiveFilter('trash'); setActiveTag(null); }}
          >
            <Trash2 size={18} />
            <span>Trash Bin</span>
            <span className="badge">{trashCount}</span>
          </button>
        </nav>
      </div>

      {/* Tags Section */}
      {allTags.length > 0 && (
        <div className="sidebar-section">
          <h4 className="section-title">TAGS</h4>
          <div className="tag-cloud">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-pill ${activeTag === tag ? 'active' : ''}`}
                onClick={() => {
                  if (activeTag === tag) {
                    setActiveTag(null);
                  } else {
                    setActiveTag(tag);
                    setActiveFilter('all');
                  }
                }}
              >
                <TagIcon size={12} />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Security Tools */}
      <div className="sidebar-section">
        <h4 className="section-title">SECURITY TOOLS</h4>
        <nav className="sidebar-nav">
          <button className="nav-item text-cyan" onClick={onOpenSecurityPanel}>
            <ShieldCheck size={18} />
            <span>Security Audit & Inspector</span>
          </button>
          <button className="nav-item" onClick={onOpenPasswordGen}>
            <KeyRound size={18} />
            <span>Password Generator</span>
          </button>
          <button className="nav-item" onClick={onOpenExportImport}>
            <Download size={18} />
            <span>Backup / Encrypted Export</span>
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="lock-vault-btn" onClick={onLockVault}>
          <Lock size={16} />
          <span>Lock Vault Session</span>
        </button>
      </div>
    </aside>
  );
}

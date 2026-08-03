import React, { useState } from 'react';
import { 
  Search, 
  Pin, 
  Star, 
  Trash2, 
  Tag as TagIcon, 
  Lock, 
  Calendar, 
  Grid, 
  List as ListIcon, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function NoteList({
  notes,
  activeNoteId,
  onSelectNote,
  onTogglePin,
  onToggleFavorite,
  onDeleteNote,
  onRestoreNote,
  onPermanentDelete,
  activeFilter,
  activeTag,
  searchQuery,
  setSearchQuery
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('updated'); // 'updated', 'created', 'title'

  // Filter notes
  const filteredNotes = notes.filter(note => {
    // Trash filter check
    if (activeFilter === 'trash') {
      if (!note.isDeleted) return false;
    } else {
      if (note.isDeleted) return false;
    }

    // Favorites filter
    if (activeFilter === 'favorites' && !note.isFavorite) return false;

    // Tag filter
    if (activeTag && (!note.tags || !note.tags.includes(activeTag))) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchContent = note.content.toLowerCase().includes(q);
      const matchTags = note.tags && note.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchTags;
    }

    return true;
  });

  // Separate pinned vs unpinned (if not in trash)
  const pinnedNotes = filteredNotes.filter(n => n.isPinned && activeFilter !== 'trash');
  const regularNotes = filteredNotes.filter(n => !n.isPinned || activeFilter === 'trash');

  const renderNoteCard = (note) => {
    const isSelected = note.id === activeNoteId;
    const dateFormatted = new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Snippet preview without raw markdown clutter
    const previewSnippet = note.content
      ? note.content
          .replace(/^#+\s+/gm, '')
          .replace(/```[\s\S]*?```/g, '[Code Block]')
          .replace(/`([^`]+)`/g, '$1')
          .substring(0, 90) + (note.content.length > 90 ? '...' : '')
      : 'Empty note...';

    return (
      <div
        key={note.id}
        className={`note-card ${isSelected ? 'selected' : ''} ${note.isPinned ? 'pinned-border' : ''}`}
        onClick={() => onSelectNote(note.id)}
      >
        <div className="note-card-header">
          <h3 className="note-title">{note.title || 'Untitled Note'}</h3>
          <div className="note-card-actions" onClick={(e) => e.stopPropagation()}>
            {!note.isDeleted ? (
              <>
                <button
                  className={`icon-btn ${note.isPinned ? 'active-pin' : ''}`}
                  onClick={() => onTogglePin(note.id)}
                  title={note.isPinned ? 'Unpin Note' : 'Pin Note'}
                >
                  <Pin size={15} />
                </button>
                <button
                  className={`icon-btn ${note.isFavorite ? 'active-star' : ''}`}
                  onClick={() => onToggleFavorite(note.id)}
                  title={note.isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                >
                  <Star size={15} />
                </button>
                <button
                  className="icon-btn danger-hover"
                  onClick={() => onDeleteNote(note.id)}
                  title="Move to Trash"
                >
                  <Trash2 size={15} />
                </button>
              </>
            ) : (
              <>
                <button
                  className="icon-btn text-emerald"
                  onClick={() => onRestoreNote(note.id)}
                  title="Restore Note"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  className="icon-btn danger-hover"
                  onClick={() => onPermanentDelete(note.id)}
                  title="Permanently Delete"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        </div>

        <p className="note-snippet">{previewSnippet}</p>

        <div className="note-card-footer">
          <div className="note-tags">
            {note.tags && note.tags.slice(0, 3).map(tag => (
              <span key={tag} className="mini-tag">
                #{tag}
              </span>
            ))}
          </div>
          <div className="note-date">
            <Calendar size={12} />
            <span>{dateFormatted}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="note-list-container glass-panel">
      {/* Search Header */}
      <div className="list-header">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search encrypted notes or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        <div className="list-controls">
          <div className="view-mode-toggle">
            <button
              className={`mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <ListIcon size={16} />
            </button>
            <button
              className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter indicator */}
      {activeTag && (
        <div className="active-tag-banner">
          <span>Filtering by tag: <strong>#{activeTag}</strong></span>
        </div>
      )}

      {/* Note Cards List */}
      <div className={`note-cards-wrapper ${viewMode}`}>
        {filteredNotes.length === 0 ? (
          <div className="empty-notes-state">
            <Lock size={40} className="text-muted" />
            <p>No notes found in this view.</p>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <div className="pinned-section">
                <div className="section-label">
                  <Pin size={14} className="text-gold" />
                  <span>PINNED NOTES</span>
                </div>
                {pinnedNotes.map(renderNoteCard)}
              </div>
            )}

            {regularNotes.length > 0 && (
              <div className="regular-section">
                {pinnedNotes.length > 0 && (
                  <div className="section-label">
                    <span>OTHER NOTES</span>
                  </div>
                )}
                {regularNotes.map(renderNoteCard)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import UnlockScreen from './components/UnlockScreen';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import SecurityPanel from './components/SecurityPanel';
import PasswordGen from './components/PasswordGen';
import ExportImportModal from './components/ExportImportModal';

import { keyManager } from './crypto/keyManager';
import { encryptPayload, decryptPayload } from './crypto/cipher';
import { INITIAL_NOTES } from './mock/sampleData';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(keyManager.isUnlocked());
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  const [showPasswordGen, setShowPasswordGen] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);

  // Subscribe to KeyManager lock/unlock state
  useEffect(() => {
    const unsubscribe = keyManager.subscribe(({ isUnlocked }) => {
      setIsUnlocked(isUnlocked);
      if (!isUnlocked) {
        setNotes([]);
        setActiveNoteId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load & Decrypt Notes upon Unlock
  const loadVaultNotes = async (isNewVault = false) => {
    try {
      const key = keyManager.getKey();
      const storedEncryptedNotes = localStorage.getItem('vaultnote_encrypted_notes');

      if (!storedEncryptedNotes) {
        // First initialization: seed with encrypted starter notes
        setNotes(INITIAL_NOTES);
        if (INITIAL_NOTES.length > 0) setActiveNoteId(INITIAL_NOTES[0].id);

        const cipherPackage = await encryptPayload(JSON.stringify(INITIAL_NOTES), key);
        localStorage.setItem('vaultnote_encrypted_notes', cipherPackage);
      } else {
        const decryptedJson = await decryptPayload(storedEncryptedNotes, key);
        const parsedNotes = JSON.parse(decryptedJson);
        setNotes(parsedNotes);
        if (parsedNotes.length > 0) setActiveNoteId(parsedNotes[0].id);
      }
    } catch (err) {
      console.error("Failed to decrypt vault notes:", err);
    }
  };

  // Save & Encrypt Notes on Mutation
  const saveVaultNotes = async (updatedNotes) => {
    setNotes(updatedNotes);
    const key = keyManager.getKey();
    if (!key) return;

    try {
      const cipherPackage = await encryptPayload(JSON.stringify(updatedNotes), key);
      localStorage.setItem('vaultnote_encrypted_notes', cipherPackage);
    } catch (err) {
      console.error("Failed to encrypt and persist notes:", err);
    }
  };

  const handleVaultUnlocked = (isNewVault) => {
    setIsUnlocked(true);
    loadVaultNotes(isNewVault);
  };

  const handleLockVault = () => {
    keyManager.lockVault();
  };

  // CRUD Operations
  const handleNewNote = () => {
    const newNote = {
      id: "note-" + Date.now(),
      title: "Untitled Note",
      content: "",
      tags: ["Secret"],
      isPinned: false,
      isFavorite: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newNote, ...notes];
    saveVaultNotes(updated);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote) => {
    const updated = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    saveVaultNotes(updated);
  };

  const handleTogglePin = (id) => {
    const updated = notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n);
    saveVaultNotes(updated);
  };

  const handleToggleFavorite = (id) => {
    const updated = notes.map(n => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n);
    saveVaultNotes(updated);
  };

  const handleDeleteNote = (id) => {
    const updated = notes.map(n => n.id === id ? { ...n, isDeleted: true } : n);
    saveVaultNotes(updated);
  };

  const handleRestoreNote = (id) => {
    const updated = notes.map(n => n.id === id ? { ...n, isDeleted: false } : n);
    saveVaultNotes(updated);
  };

  const handlePermanentDelete = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveVaultNotes(updated);
    if (activeNoteId === id) {
      const remaining = updated.filter(n => !n.isDeleted);
      setActiveNoteId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleImportNotes = (importedNotes) => {
    saveVaultNotes(importedNotes);
    if (importedNotes.length > 0) setActiveNoteId(importedNotes[0].id);
  };

  const handleInsertPasswordIntoActiveNote = (password) => {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (!activeNote) return;

    const newContent = (activeNote.content || '') + `\n\n> **Secret Password**: \`${password}\`\n`;
    handleUpdateNote({ ...activeNote, content: newContent, updatedAt: new Date().toISOString() });
  };

  if (!isUnlocked) {
    return <UnlockScreen onUnlocked={handleVaultUnlocked} />;
  }

  const activeNote = notes.find(n => n.id === activeNoteId);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        notes={notes}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        onNewNote={handleNewNote}
        onOpenSecurityPanel={() => setShowSecurityPanel(true)}
        onOpenPasswordGen={() => setShowPasswordGen(true)}
        onOpenExportImport={() => setShowExportImport(true)}
        onLockVault={handleLockVault}
      />

      {/* Main Grid View */}
      <main className="app-main-layout">
        <NoteList
          notes={notes}
          activeNoteId={activeNoteId}
          onSelectNote={setActiveNoteId}
          onTogglePin={handleTogglePin}
          onToggleFavorite={handleToggleFavorite}
          onDeleteNote={handleDeleteNote}
          onRestoreNote={handleRestoreNote}
          onPermanentDelete={handlePermanentDelete}
          activeFilter={activeFilter}
          activeTag={activeTag}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <NoteEditor
          note={activeNote}
          onUpdateNote={handleUpdateNote}
          onOpenPasswordGen={() => setShowPasswordGen(true)}
        />
      </main>

      {/* Security Inspector Modal */}
      {showSecurityPanel && (
        <SecurityPanel onClose={() => setShowSecurityPanel(false)} />
      )}

      {/* Password Generator Modal */}
      {showPasswordGen && (
        <PasswordGen
          onClose={() => setShowPasswordGen(false)}
          onInsertPassword={handleInsertPasswordIntoActiveNote}
        />
      )}

      {/* Export/Import Modal */}
      {showExportImport && (
        <ExportImportModal
          notes={notes}
          onImportNotes={handleImportNotes}
          onClose={() => setShowExportImport(false)}
        />
      )}
    </div>
  );
}

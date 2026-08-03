import React, { useState } from 'react';
import { Download, Upload, ShieldCheck, X, FileJson, AlertCircle, CheckCircle } from 'lucide-react';
import { keyManager } from '../crypto/keyManager';
import { encryptPayload, decryptPayload } from '../crypto/cipher';

export default function ExportImportModal({ notes, onImportNotes, onClose }) {
  const [activeTab, setActiveTab] = useState('export');
  const [importStatus, setImportStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleExportBackup = async () => {
    try {
      const key = keyManager.getKey();
      const exportObject = {
        app: "VaultNote",
        version: "1.0.0",
        exportedAt: new Date().toISOString(),
        notesCount: notes.length,
        payload: await encryptPayload(JSON.stringify(notes), key)
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `vaultnote_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      setErrorMsg('Export failed: ' + err.message);
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!json.app || json.app !== 'VaultNote' || !json.payload) {
          throw new Error('Invalid VaultNote backup file format.');
        }

        const key = keyManager.getKey();
        const decryptedJson = await decryptPayload(json.payload, key);
        const importedNotes = JSON.parse(decryptedJson);

        if (Array.isArray(importedNotes)) {
          onImportNotes(importedNotes);
          setImportStatus(`Successfully restored ${importedNotes.length} encrypted notes!`);
          setErrorMsg('');
        } else {
          throw new Error('Corrupted notes list in backup file.');
        }
      } catch (err) {
        setErrorMsg('Import error: ' + err.message);
        setImportStatus('');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-backdrop">
      <div className="export-import-modal glass-panel">
        <div className="modal-header">
          <div className="header-title">
            <FileJson size={24} className="text-emerald" />
            <h3>Encrypted Vault Backup & Restore</h3>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            <Download size={16} />
            <span>Export Backup</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            <Upload size={16} />
            <span>Restore Backup</span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'export' ? (
            <div className="export-section">
              <p>
                Download a 256-bit AES-GCM encrypted JSON package of your entire notes vault ({notes.length} notes).
              </p>
              <button className="primary-btn glow-effect" onClick={handleExportBackup}>
                <Download size={18} />
                <span>Download Encrypted .json Backup</span>
              </button>
            </div>
          ) : (
            <div className="import-section">
              <p>
                Select a previously exported <code>vaultnote_backup_*.json</code> file to restore your encrypted notes vault.
              </p>

              <label className="file-dropzone">
                <Upload size={32} className="text-cyan" />
                <span>Choose .json Backup File</span>
                <input type="file" accept=".json" onChange={handleImportFile} />
              </label>

              {importStatus && (
                <div className="status-banner success">
                  <CheckCircle size={18} />
                  <span>{importStatus}</span>
                </div>
              )}

              {errorMsg && (
                <div className="status-banner danger">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { KeyRound, Copy, Check, RefreshCw, X, ShieldAlert } from 'lucide-react';
import { generateSecurePassword } from '../crypto/cipher';

export default function PasswordGen({ onClose, onInsertPassword }) {
  const [length, setLength] = useState(24);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState(() => generateSecurePassword(24, options));
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setPassword(generateSecurePassword(length, options));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    if (onInsertPassword) {
      onInsertPassword(password);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="password-gen-modal glass-panel">
        <div className="modal-header">
          <div className="header-title">
            <KeyRound size={24} className="text-cyan" />
            <h3>High-Entropy Password Generator</h3>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="pass-display-box">
            <span className="generated-password">{password}</span>
            <div className="pass-actions">
              <button className="icon-btn" onClick={handleGenerate} title="Regenerate">
                <RefreshCw size={18} />
              </button>
              <button className="icon-btn" onClick={handleCopy} title="Copy to Clipboard">
                {copied ? <Check size={18} className="text-emerald" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="gen-controls">
            <div className="control-row">
              <label>Password Length: <strong>{length} characters</strong></label>
              <input
                type="range"
                min="12"
                max="64"
                value={length}
                onChange={(e) => {
                  setLength(Number(e.target.value));
                  setPassword(generateSecurePassword(Number(e.target.value), options));
                }}
              />
            </div>

            <div className="options-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => {
                    const newOpts = { ...options, uppercase: e.target.checked };
                    setOptions(newOpts);
                    setPassword(generateSecurePassword(length, newOpts));
                  }}
                />
                <span>Uppercase (A-Z)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => {
                    const newOpts = { ...options, lowercase: e.target.checked };
                    setOptions(newOpts);
                    setPassword(generateSecurePassword(length, newOpts));
                  }}
                />
                <span>Lowercase (a-z)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) => {
                    const newOpts = { ...options, numbers: e.target.checked };
                    setOptions(newOpts);
                    setPassword(generateSecurePassword(length, newOpts));
                  }}
                />
                <span>Numbers (0-9)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={(e) => {
                    const newOpts = { ...options, symbols: e.target.checked };
                    setOptions(newOpts);
                    setPassword(generateSecurePassword(length, newOpts));
                  }}
                />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            {onInsertPassword && (
              <button className="primary-btn glow-effect" onClick={handleInsert}>
                Insert into Active Note
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

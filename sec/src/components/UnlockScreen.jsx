import React, { useState, useEffect } from 'react';
import { Shield, Lock, Key, AlertTriangle, CheckCircle, RefreshCw, Eye, EyeOff, Sparkles, Terminal } from 'lucide-react';
import { deriveKey, generateSalt, createKeyVerifier, verifyKey } from '../crypto/cipher';
import { keyManager } from '../crypto/keyManager';

export default function UnlockScreen({ onUnlocked }) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [passStrength, setPassStrength] = useState({ score: 0, label: 'Very Weak', color: '#ef4444' });

  useEffect(() => {
    const savedSalt = localStorage.getItem('vaultnote_salt');
    const savedVerifier = localStorage.getItem('vaultnote_verifier');
    if (!savedSalt || !savedVerifier) {
      setIsFirstTime(true);
    }
  }, []);

  // Compute password entropy & strength
  useEffect(() => {
    if (!passphrase) {
      setPassStrength({ score: 0, label: 'Empty', color: '#6b7280' });
      return;
    }
    let score = 0;
    if (passphrase.length >= 8) score += 25;
    if (passphrase.length >= 14) score += 25;
    if (/[A-Z]/.test(passphrase)) score += 15;
    if (/[0-9]/.test(passphrase)) score += 15;
    if (/[^A-Za-z0-9]/.test(passphrase)) score += 20;

    let label = 'Weak';
    let color = '#ef4444';
    if (score >= 80) {
      label = 'Cyber-Grade (AES-256 Ready)';
      color = '#10b981';
    } else if (score >= 60) {
      label = 'Strong';
      color = '#3b82f6';
    } else if (score >= 40) {
      label = 'Moderate';
      color = '#f59e0b';
    }
    setPassStrength({ score, label, color });
  }, [passphrase]);

  // Handle Vault Unlock or Initialization
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!passphrase) {
      setErrorMsg('Please enter a master passphrase.');
      return;
    }

    setLoading(true);

    try {
      if (isFirstTime) {
        if (passphrase !== confirmPassphrase) {
          setErrorMsg('Passphrases do not match.');
          setLoading(false);
          return;
        }
        if (passphrase.length < 8) {
          setErrorMsg('Master passphrase must be at least 8 characters long.');
          setLoading(false);
          return;
        }

        // Initialize Vault
        const salt = generateSalt();
        const key = await deriveKey(passphrase, salt);
        const verifier = await createKeyVerifier(key, salt);

        localStorage.setItem('vaultnote_salt', salt);
        localStorage.setItem('vaultnote_verifier', verifier);

        keyManager.unlockVault(key, salt, verifier);
        onUnlocked(true);
      } else {
        // Unlock Existing Vault
        const salt = localStorage.getItem('vaultnote_salt');
        const verifier = localStorage.getItem('vaultnote_verifier');

        const key = await deriveKey(passphrase, salt);
        const isValid = await verifyKey(key, verifier);

        if (isValid) {
          keyManager.unlockVault(key, salt, verifier);
          onUnlocked(false);
        } else {
          setErrorMsg('Invalid master passphrase. Access denied.');
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Cryptographic processing error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetVaultPrompt = () => {
    if (window.confirm("WARNING: Resetting the vault will erase local master keys and un-decryptable stored notes. Are you sure?")) {
      localStorage.removeItem('vaultnote_salt');
      localStorage.removeItem('vaultnote_verifier');
      localStorage.removeItem('vaultnote_encrypted_notes');
      keyManager.wipeVaultMemory();
      setIsFirstTime(true);
      setPassphrase('');
      setConfirmPassphrase('');
      setErrorMsg('');
    }
  };

  return (
    <div className="unlock-overlay">
      <div className="unlock-card glass-panel">
        <div className="unlock-header">
          <div className="shield-icon-container">
            <Shield className="shield-icon text-emerald" size={48} />
            <span className="shield-pulse"></span>
          </div>
          <h2>VaultNote</h2>
          <p className="subtitle">Zero-Knowledge Encrypted Workspace</p>
        </div>

        <div className="crypto-badge-pill">
          <Terminal size={14} className="text-cyan" />
          <span>AES-256-GCM • PBKDF2 100K Iterations • Anti-XSS</span>
        </div>

        <form onSubmit={handleSubmit} className="unlock-form">
          <div className="form-group">
            <label>
              {isFirstTime ? 'Create Master Passphrase' : 'Enter Master Passphrase'}
            </label>
            <div className="password-input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder={isFirstTime ? 'Choose a strong master passphrase...' : 'Master Passphrase...'}
                autoFocus
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          {passphrase && (
            <div className="strength-meter">
              <div className="strength-label" style={{ color: passStrength.color }}>
                <span>Strength: {passStrength.label}</span>
                <span>{passStrength.score}%</span>
              </div>
              <div className="strength-bar-bg">
                <div
                  className="strength-bar-fill"
                  style={{ width: `${passStrength.score}%`, backgroundColor: passStrength.color }}
                ></div>
              </div>
            </div>
          )}

          {isFirstTime && (
            <div className="form-group">
              <label>Confirm Master Passphrase</label>
              <div className="password-input-wrapper">
                <Key size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassphrase}
                  onChange={(e) => setConfirmPassphrase(e.target.value)}
                  placeholder="Repeat master passphrase..."
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="error-banner">
              <AlertTriangle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button type="submit" className="unlock-btn" disabled={loading}>
            {loading ? (
              <>
                <RefreshCw size={18} className="spin-icon" />
                <span>Deriving AES Key (PBKDF2)...</span>
              </>
            ) : isFirstTime ? (
              <>
                <Sparkles size={18} />
                <span>Initialize Secure Vault</span>
              </>
            ) : (
              <>
                <Lock size={18} />
                <span>Unlock Vault</span>
              </>
            )}
          </button>
        </form>

        {!isFirstTime && (
          <div className="unlock-footer">
            <button type="button" className="reset-link" onClick={handleResetVaultPrompt}>
              Forgot Passphrase / Reset Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

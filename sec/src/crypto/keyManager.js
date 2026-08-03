/**
 * VaultNote In-Memory Key & Session Lifecycle Manager
 * Handles zero-knowledge session keys, memory zeroization, and auto-lock timers.
 */

let activeCryptoKey = null;
let masterSalt = null;
let vaultVerifier = null;
let isUnlocked = false;
let autoLockMinutes = 5;
let inactivityTimer = null;
let listeners = [];

export const keyManager = {
  // Initialize vault session
  unlockVault(key, salt, verifier) {
    activeCryptoKey = key;
    masterSalt = salt;
    vaultVerifier = verifier;
    isUnlocked = true;
    this.resetInactivityTimer();
    this.notifyListeners();
  },

  // Lock vault and zeroize key from memory
  lockVault() {
    activeCryptoKey = null;
    isUnlocked = false;
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = null;
    this.notifyListeners();
  },

  // Completely erase vault (for master reset or wipe)
  wipeVaultMemory() {
    activeCryptoKey = null;
    masterSalt = null;
    vaultVerifier = null;
    isUnlocked = false;
    if (inactivityTimer) clearTimeout(inactivityTimer);
    this.notifyListeners();
  },

  getKey() {
    return activeCryptoKey;
  },

  getSalt() {
    return masterSalt;
  },

  getVerifier() {
    return vaultVerifier;
  },

  isUnlocked() {
    return isUnlocked && activeCryptoKey !== null;
  },

  setAutoLockMinutes(mins) {
    autoLockMinutes = mins;
    this.resetInactivityTimer();
  },

  getAutoLockMinutes() {
    return autoLockMinutes;
  },

  resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (!isUnlocked || autoLockMinutes <= 0) return;

    inactivityTimer = setTimeout(() => {
      console.warn("VaultNote: Auto-lock triggered due to user inactivity.");
      this.lockVault();
    }, autoLockMinutes * 60 * 1000);
  },

  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  notifyListeners() {
    listeners.forEach(fn => fn({ isUnlocked: this.isUnlocked(), key: activeCryptoKey }));
  }
};

// Global activity listener to reset auto-lock timer
if (typeof window !== 'undefined') {
  const resetTimerOnUserAction = () => {
    if (keyManager.isUnlocked()) {
      keyManager.resetInactivityTimer();
    }
  };
  window.addEventListener('mousemove', resetTimerOnUserAction, { passive: true });
  window.addEventListener('keydown', resetTimerOnUserAction, { passive: true });
  window.addEventListener('touchstart', resetTimerOnUserAction, { passive: true });
}

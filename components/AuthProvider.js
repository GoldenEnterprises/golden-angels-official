'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const ADMIN_EMAIL = 'goldenenterprises.ceo@gmail.com';
const ADMIN_PASSWORD = 'Golden$777';
const STORAGE_KEY = 'ga_auth_user';
const USERS_KEY = 'ga_users';
const CODES_KEY = 'ga_investor_codes';
const PROFILES_KEY = 'ga_profiles';
const SOCIAL_KEY = 'ga_social';

function getStore(key, fallback = {}) {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}
function setStore(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const users = getStore(USERS_KEY);
    let seeded = false;

    // Seed admin
    if (!users[ADMIN_EMAIL]) {
      users[ADMIN_EMAIL] = { uid: 'admin-001', email: ADMIN_EMAIL, password: ADMIN_PASSWORD, displayName: 'Mr. Golden', role: 'admin', type: 'individual', createdAt: new Date().toISOString() };
      seeded = true;
    }
    // Seed regular user
    if (!users['gamegod7heaven@gmail.com']) {
      users['gamegod7heaven@gmail.com'] = { uid: 'user-002', email: 'gamegod7heaven@gmail.com', password: 'GameGod777', displayName: 'Game God', role: 'member', type: 'individual', createdAt: new Date().toISOString() };
      seeded = true;
    }
    // Seed Golden A.I. account
    if (!users['goldenenterprises.ceo.trimmier@gmail.com']) {
      users['goldenenterprises.ceo.trimmier@gmail.com'] = { uid: 'user-003', email: 'goldenenterprises.ceo.trimmier@gmail.com', password: 'GoldenAI777', displayName: 'Golden A.I.', role: 'startup', type: 'company', createdAt: new Date().toISOString() };
      seeded = true;
    }
    if (seeded) setStore(USERS_KEY, users);

    // Seed investor codes
    const codes = getStore(CODES_KEY);
    // Seed default codes
    const defaultCodes = ['726483','915274','483061','301777','111777'];
    let codeSeeded = false;
    defaultCodes.forEach(c => {
      if (!codes[c]) {
        codes[c] = { active: true, createdBy: ADMIN_EMAIL, createdAt: new Date().toISOString(), type: c === '111777' ? 'admin' : 'investor' };
        codeSeeded = true;
      }
    });
    if (codeSeeded) setStore(CODES_KEY, codes);

    // Seed profiles
    const profiles = getStore(PROFILES_KEY);
    if (!profiles['admin-001']) {
      profiles['admin-001'] = { bio: 'CEO of Golden Enterprises', banner: '', avatar: '', company: 'Golden Enterprises', location: 'Global', website: 'goldenangels.com' };
      profiles['user-002'] = { bio: 'Gamer turned investor', banner: '', avatar: '', company: '', location: '', website: '' };
      profiles['user-003'] = { bio: 'Amplified Intelligence. Next-gen AI platform empowering creators and everyday people.', banner: '', avatar: '/golden-ai-emblem.jpg', company: 'Golden A.I.', location: 'Global', website: 'goldenai.com' };
      setStore(PROFILES_KEY, profiles);
    }

    // Restore session
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u) => { setUser(u); localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); };

  const loginWithEmail = async (email, password) => {
    setAuthError(null);
    const users = getStore(USERS_KEY);
    const match = users[email];
    if (!match) { setAuthError('No account found with this email.'); throw new Error('No account'); }
    if (match.password !== password) { setAuthError('Incorrect password.'); throw new Error('Wrong password'); }
    persist({ uid: match.uid, email: match.email, displayName: match.displayName, role: match.role, type: match.type, photoURL: null });
  };

  const signupWithEmail = async (data) => {
    setAuthError(null);
    const { name, email, password, type, company, goals, industry, investmentRange } = data;
    const users = getStore(USERS_KEY);
    if (users[email]) { setAuthError('An account with this email already exists.'); throw new Error('Exists'); }
    if (!password || password.length < 6) { setAuthError('Password must be at least 6 characters.'); throw new Error('Weak'); }
    const uid = 'user-' + Date.now();
    const newUser = { uid, email, password, displayName: name || email.split('@')[0], role: email === ADMIN_EMAIL ? 'admin' : 'member', type: type || 'individual', company: company || '', goals: goals || '', industry: industry || '', investmentRange: investmentRange || '', createdAt: new Date().toISOString() };
    users[email] = newUser;
    setStore(USERS_KEY, users);

    // Create profile
    const profiles = getStore(PROFILES_KEY);
    profiles[uid] = { bio: '', banner: '', avatar: '', company: company || '', location: '', website: '', industry: industry || '' };
    setStore(PROFILES_KEY, profiles);

    persist({ uid, email, displayName: newUser.displayName, role: newUser.role, type, photoURL: null });
  };

  const loginWithGoogle = async () => {
    setAuthError(null);
    const email = 'angel.investor@gmail.com';
    const users = getStore(USERS_KEY);
    if (!users[email]) {
      users[email] = { uid: 'google-' + Date.now(), email, password: '', displayName: 'Angel Investor', role: 'member', type: 'individual', createdAt: new Date().toISOString() };
      setStore(USERS_KEY, users);
    }
    const u = users[email];
    persist({ uid: u.uid, email: u.email, displayName: u.displayName, role: u.role, type: u.type || 'individual', photoURL: null });
  };

  const validateInvestorCode = async (code) => {
    setAuthError(null);
    const codes = getStore(CODES_KEY);
    const key = code.trim();
    if (codes[key] && codes[key].active) {
      const newRole = codes[key].type === 'admin' ? 'admin' : 'investor';
      if (user) {
        const updated = { ...user, role: newRole };
        persist(updated);
        const users = getStore(USERS_KEY);
        if (users[user.email]) { users[user.email].role = newRole; setStore(USERS_KEY, users); }
      }
      return true;
    }
    setAuthError('Invalid investor code.');
    return false;
  };

  const logout = async () => { setUser(null); localStorage.removeItem(STORAGE_KEY); };

  // Admin methods
  const getAllUsers = () => Object.values(getStore(USERS_KEY)).map(u => ({ id: u.uid, email: u.email, displayName: u.displayName, role: u.role, type: u.type, createdAt: u.createdAt }));
  const updateUserRole = (email, newRole) => {
    const users = getStore(USERS_KEY);
    if (users[email]) { users[email].role = newRole; setStore(USERS_KEY, users); }
    if (user && user.email === email) persist({ ...user, role: newRole });
  };
  const getAllCodes = () => Object.entries(getStore(CODES_KEY)).map(([id, d]) => ({ id, ...d }));
  const createCode = (code) => { const codes = getStore(CODES_KEY); codes[code.trim().toUpperCase()] = { active: true, createdBy: user?.email || 'admin', createdAt: new Date().toISOString() }; setStore(CODES_KEY, codes); };
  const deleteCode = (id) => { const codes = getStore(CODES_KEY); delete codes[id]; setStore(CODES_KEY, codes); };

  // Profile methods
  const getProfile = (uid) => (getStore(PROFILES_KEY))[uid] || {};
  const updateProfile = (uid, data) => { const p = getStore(PROFILES_KEY); p[uid] = { ...(p[uid] || {}), ...data }; setStore(PROFILES_KEY, p); };

  // Social methods
  const getSocial = (uid) => {
    const s = getStore(SOCIAL_KEY);
    return s[uid] || { favorites: [], friends: [], watchlist: [], bookmarks: [], posts: [] };
  };
  const updateSocial = (uid, data) => { const s = getStore(SOCIAL_KEY); s[uid] = { ...(s[uid] || { favorites: [], friends: [], watchlist: [], bookmarks: [], posts: [] }), ...data }; setStore(SOCIAL_KEY, s); };
  const addPost = (uid, post) => {
    const s = getStore(SOCIAL_KEY);
    if (!s[uid]) s[uid] = { favorites: [], friends: [], watchlist: [], bookmarks: [], posts: [] };
    s[uid].posts = [{ id: Date.now(), ...post, createdAt: new Date().toISOString() }, ...s[uid].posts];
    setStore(SOCIAL_KEY, s);
  };
  const toggleSocialItem = (uid, listName, itemId) => {
    const s = getStore(SOCIAL_KEY);
    if (!s[uid]) s[uid] = { favorites: [], friends: [], watchlist: [], bookmarks: [], posts: [] };
    const list = s[uid][listName] || [];
    s[uid][listName] = list.includes(itemId) ? list.filter(i => i !== itemId) : [...list, itemId];
    setStore(SOCIAL_KEY, s);
    return s[uid][listName];
  };

  return (
    <AuthContext.Provider value={{
      user, loading, authError, setAuthError,
      loginWithEmail, signupWithEmail, loginWithGoogle, validateInvestorCode, logout,
      getAllUsers, updateUserRole, getAllCodes, createCode, deleteCode,
      getProfile, updateProfile,
      getSocial, updateSocial, addPost, toggleSocialItem,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

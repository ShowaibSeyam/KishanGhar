import { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from '../firebase';
import { authAPI, saveToken, removeToken } from '../services/api';

const AuthContext = createContext();

const ADMIN_EMAILS = ['seyamseam@gmail.com'];
const isUserAdmin = (email) => ADMIN_EMAILS.includes((email || '').toLowerCase().trim());

// Helper: map Firebase user → app user object
const mapFirebaseUser = (firebaseUser) => {
  if (!firebaseUser) return null;
  const role = isUserAdmin(firebaseUser.email) ? 'admin' : 'farmer';
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || (role === 'admin' ? 'Admin' : 'Farmer'),
    email: firebaseUser.email,
    phone: firebaseUser.phoneNumber || '',
    avatar: firebaseUser.photoURL || null,
    role,
    emailVerified: firebaseUser.emailVerified,
    provider: firebaseUser.providerData?.[0]?.providerId || 'email',
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to Firebase auth state changes & sync with MongoDB
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Initial user mapped from Firebase
      const baseUser = mapFirebaseUser(firebaseUser);
      setUser(baseUser);

      // Now sync with MongoDB to fetch saved phone, location, farmSize, avatar & role!
      try {
        const res = await authAPI.socialSync({
          firebaseUid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          provider: firebaseUser.providerData?.[0]?.providerId || 'google.com',
          avatar: firebaseUser.photoURL,
        });
        if (res.user) {
          saveToken(res.token);
          const finalRole = isUserAdmin(res.user.email) ? 'admin' : (res.user.role || 'farmer');
          setUser({ ...res.user, role: finalRole });
        }
      } catch (err) {
        console.warn('MongoDB profile sync error:', err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  // Directly update user state when edited in profile
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const finalRole = isUserAdmin(updatedFields?.email || prev.email) ? 'admin' : (updatedFields?.role || prev.role);
      return { ...prev, ...updatedFields, role: finalRole };
    });
  };

  // ─── Email / Password Login ───────────────────────────────────
  const login = async (email, password) => {
    setError(null);
    try {
      // 1. Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // 2. Backend login → get JWT
      const res = await authAPI.login({ email, password });
      saveToken(res.token);
      const finalRole = isUserAdmin(res.user.email) ? 'admin' : res.user.role;
      const finalUser = { ...res.user, role: finalRole };
      setUser(finalUser);
      return { success: true, user: finalUser };
    } catch (err) {
      const msg = err.code ? getErrorMessage(err.code) : (err.message || 'Login failed.');
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // ─── Email / Password Register ────────────────────────────────
  const register = async (data) => {
    setError(null);
    try {
      // 1. Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(result.user, { displayName: data.name || 'Farmer' });
      // 2. Backend register → get JWT + save to MongoDB
      const res = await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        location: data.location,
        farmSize: data.farmSize,
      });
      saveToken(res.token);
      const finalRole = isUserAdmin(res.user.email) ? 'admin' : res.user.role;
      const finalUser = { ...res.user, role: finalRole };
      setUser(finalUser);
      return { success: true, user: finalUser };
    } catch (err) {
      const msg = err.code ? getErrorMessage(err.code) : (err.message || 'Registration failed.');
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // ─── Google Login ─────────────────────────────────────────────
  const loginWithGoogle = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      // Sync with MongoDB
      const res = await authAPI.socialSync({
        firebaseUid: fbUser.uid,
        name: fbUser.displayName,
        email: fbUser.email,
        provider: 'google.com',
        avatar: fbUser.photoURL,
      });
      saveToken(res.token);
      const finalRole = isUserAdmin(res.user.email) ? 'admin' : res.user.role;
      const finalUser = { ...res.user, role: finalRole };
      setUser(finalUser);
      return { success: true, user: finalUser };
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        return { success: false, error: null };
      }
      const msg = err.code ? getErrorMessage(err.code) : (err.message || 'Google login failed.');
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // ─── Facebook Login ───────────────────────────────────────────
  const loginWithFacebook = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const fbUser = result.user;
      // Sync with MongoDB
      const res = await authAPI.socialSync({
        firebaseUid: fbUser.uid,
        name: fbUser.displayName,
        email: fbUser.email,
        provider: 'facebook.com',
        avatar: fbUser.photoURL,
      });
      saveToken(res.token);
      const finalRole = isUserAdmin(res.user.email) ? 'admin' : res.user.role;
      const finalUser = { ...res.user, role: finalRole };
      setUser(finalUser);
      return { success: true, user: finalUser };
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        return { success: false, error: null };
      }
      const msg = err.code ? getErrorMessage(err.code) : (err.message || 'Facebook login failed.');
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // ─── Logout ───────────────────────────────────────────────────
  const logout = async () => {
    await signOut(auth);
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        clearError,
        updateUser,
        isAdmin: user?.role === 'admin' || isUserAdmin(user?.email),
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle,
        loginWithFacebook,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ─── Firebase error code → user-friendly message ─────────────────
function getErrorMessage(code) {
  const messages = {
    'auth/user-not-found': 'এই email দিয়ে কোনো account নেই।',
    'auth/wrong-password': 'Password ভুল হয়েছে।',
    'auth/invalid-credential': 'Email বা Password ভুল।',
    'auth/email-already-in-use': 'এই email দিয়ে আগেই account আছে।',
    'auth/weak-password': 'Password কমপক্ষে ৬ অক্ষর হতে হবে।',
    'auth/invalid-email': 'সঠিক email address দিন।',
    'auth/too-many-requests': 'অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।',
    'auth/network-request-failed': 'Internet connection চেক করুন।',
    'auth/account-exists-with-different-credential':
      'এই email অন্য method (Google/Facebook) দিয়ে registered।',
    'auth/popup-blocked':
      'Browser popup block করেছে। Browser settings থেকে allow করুন।',
  };
  return messages[code] || 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।';
}

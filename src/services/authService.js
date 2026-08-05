import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

export const DEMO_USER = {
  uid: "hafiz-kurniawan-demo-uid-2026",
  displayName: "Hafiz Kurniawan",
  email: "hafiz.kurniawan@student.umy.ac.id",
  photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  prodi: "Teknologi Informasi",
  semester: 6
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.warn("Google Auth popup failed/canceled, falling back to Demo Mode:", error.message);
    return { success: true, user: DEMO_USER, isDemo: true };
  }
};

export const loginDemoMode = () => {
  localStorage.setItem('kating_user', JSON.stringify(DEMO_USER));
  return DEMO_USER;
};

export const logoutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.log("Firebase signOut error ignored in demo mode:", e);
  }
  localStorage.removeItem('kating_user');
};

export const getCurrentSessionUser = () => {
  const saved = localStorage.getItem('kating_user');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const subscribeAuthChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        displayName: user.displayName || "Mahasiswa Kating",
        email: user.email,
        photoURL: user.photoURL || DEMO_USER.photoURL,
        prodi: "Teknologi Informasi",
        semester: 6
      };
      localStorage.setItem('kating_user', JSON.stringify(userData));
      callback(userData);
    } else {
      const savedUser = getCurrentSessionUser();
      callback(savedUser);
    }
  });
};

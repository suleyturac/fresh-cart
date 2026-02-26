import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const load = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "userFavorites", user.uid));
        if (snap.exists()) {
          setFavorites(snap.data().productIds || []);
        }
      } catch (err) {
        console.warn("Failed to load favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (!user) return;
      const updated = favorites.includes(productId)
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];
      setFavorites(updated);
      try {
        await setDoc(doc(db, "userFavorites", user.uid), { productIds: updated });
      } catch (err) {
        console.warn("Failed to save favorites:", err);
      }
    },
    [user, favorites]
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

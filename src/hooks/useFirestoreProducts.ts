import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/data/products";
import { products as fallbackProducts, categories as fallbackCategories, sellers as fallbackSellers } from "@/data/products";

export function useFirestoreProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(query(collection(db, "products"), orderBy("name")));
        if (!snap.empty) {
          const data = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];
          setProducts(data);
        }
        // If empty, keep fallback data
      } catch (err: any) {
        console.warn("Firestore products fetch failed, using fallback:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive categories and sellers from products
  const categories = products.length > 0
    ? [...new Set(products.map((p) => p.category))].map((name) => {
        const icons: Record<string, string> = {
          Beverages: "🥤", Bread: "🍞", Dairy: "🥛", "Fresh Pressed Juice": "🧃",
          Fruits: "🍎", Grocery: "🛒", Meat: "🥩", "Paper Goods": "📦",
          Pastry: "🥐", Vegetables: "🥦",
        };
        return { name, icon: icons[name] || "📦" };
      })
    : fallbackCategories;

  const sellers = products.length > 0
    ? [...new Set(products.map((p) => p.seller))]
    : fallbackSellers;

  return { products, categories, sellers, loading, error };
}

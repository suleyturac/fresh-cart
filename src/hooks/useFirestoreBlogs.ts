import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost, blogPosts as fallbackBlogs } from "@/data/blogPosts";

export function useFirestoreBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snap = await getDocs(query(collection(db, "blogPosts"), orderBy("date", "desc")));
        if (!snap.empty) {
          const data = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as BlogPost[];
          setBlogs(data);
        }
      } catch (err: any) {
        console.warn("Firestore blogs fetch failed, using fallback:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return { blogs, loading };
}

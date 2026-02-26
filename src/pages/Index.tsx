import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import ProductRow from "@/components/ProductRow";
import CartPanel from "@/components/CartPanel";
import { useFirestoreProducts } from "@/hooks/useFirestoreProducts";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { products, categories, sellers, loading } = useFirestoreProducts();
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name-asc");
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSellerToggle = (seller: string) => {
    setSelectedSellers((prev) =>
      prev.includes(seller) ? prev.filter((s) => s !== seller) : [...prev, seller]
    );
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (cat: string | null) => {
    setSelectedCategory(cat);
    setShowFavorites(false);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (showFavorites && !favorites.includes(p.id)) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedSellers.length > 0 && !selectedSellers.includes(p.seller)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-desc": return b.name.localeCompare(a.name);
        case "price-asc": return a.totalPrice - b.totalPrice;
        case "price-desc": return b.totalPrice - a.totalPrice;
        default: return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [searchQuery, selectedCategory, selectedSellers, products, sortBy, showFavorites, favorites]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        onCartClick={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        selectedSellers={selectedSellers}
        onSellerToggle={handleSellerToggle}
        categories={categories}
        sellers={sellers}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        products={products}
        onShowFavorites={handleShowFavorites}
        showFavoritesActive={showFavorites}
      />

      <main className="pt-14 md:pl-60">
        <div className="p-4 border-b flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading products..." : (
              <>Showing <span className="font-medium text-foreground">{filtered.length}</span> products
              {showFavorites && <span> in <span className="font-medium text-foreground">Favorites</span></span>}
              {selectedCategory && <span> in <span className="font-medium text-foreground">{selectedCategory}</span></span>}</>
            )}
          </p>
        </div>

        <div>
          {filtered.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No products found</p>
          )}
        </div>
      </main>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;

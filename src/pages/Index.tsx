import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import ProductRow from "@/components/ProductRow";
import CartPanel from "@/components/CartPanel";
import { products } from "@/data/products";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleSellerToggle = (seller: string) => {
    setSelectedSellers((prev) =>
      prev.includes(seller) ? prev.filter((s) => s !== seller) : [...prev, seller]
    );
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedSellers.length > 0 && !selectedSellers.includes(p.seller)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedSellers]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar onCartClick={() => setCartOpen(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        selectedSellers={selectedSellers}
        onSellerToggle={handleSellerToggle}
      />

      <main className="pt-14 md:pl-60">
        <div className="p-4 border-b flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filtered.length}</span> products
            {selectedCategory && <span> in <span className="font-medium text-foreground">{selectedCategory}</span></span>}
          </p>
          <p className="text-xs text-muted-foreground">Sort by: Favorites</p>
        </div>

        <div>
          {filtered.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No products found</p>
          )}
        </div>
      </main>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;

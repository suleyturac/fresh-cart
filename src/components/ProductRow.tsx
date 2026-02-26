import { useState } from "react";
import { Plus, Minus, Star, Check, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductDetailModal from "@/components/ProductDetailModal";

interface ProductRowProps {
  product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const amount = qty > 0 ? qty : 1;
    addToCart(product, amount);
    setQty(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-3 sm:px-4 border-b hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover bg-muted"
            loading="lazy"
          />
          {user && isFavorite(product.id) && (
            <Heart className="absolute -top-1 -right-1 h-3.5 w-3.5 fill-red-500 text-red-500" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground leading-tight truncate">{product.name}</h3>
          <div className="flex items-center gap-2 sm:gap-3 mt-1 text-xs text-muted-foreground">
            <span>SKU <span className="font-medium text-foreground">{product.sku}</span></span>
            <span className="hidden sm:inline">UOM <span className="font-medium text-foreground">{product.uomQty} {product.uom}</span></span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
          <Star className="h-3 w-3" />
          <span>{product.seller}</span>
        </div>

        <div className="text-right flex-shrink-0 w-20 sm:w-28">
          <div className="text-xs text-muted-foreground hidden sm:block">
            ${product.pricePerUnit.toFixed(2)} / {product.uom}
          </div>
          <div className="text-sm sm:text-base font-semibold text-foreground">
            ${product.totalPrice.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {user && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
              className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
            >
              <Heart className={`h-4 w-4 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          )}
          <div className="flex items-center border rounded">
            <button
              onClick={(e) => { e.stopPropagation(); setQty(Math.max(1, qty - 1)); }}
              className="p-1 sm:p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              onClick={(e) => e.stopPropagation()}
              className="w-8 sm:w-10 text-center text-sm bg-transparent border-x py-1 focus:outline-none"
              min={1}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setQty(qty + 1); }}
              className="p-1 sm:p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className={`rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 ${
              added
                ? "bg-green-500 text-white scale-110"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {showDetail && (
        <ProductDetailModal
          product={product}
          onClose={() => setShowDetail(false)}
          isFavorite={isFavorite(product.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
};

export default ProductRow;

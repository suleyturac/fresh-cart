import { useState } from "react";
import { Plus, Minus, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductRowProps {
  product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
  const [qty, setQty] = useState(0);
  const { addToCart } = useCart();

  const handleAdd = () => {
    const amount = qty > 0 ? qty : 1;
    addToCart(product, amount);
    setQty(0);
  };

  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b hover:bg-muted/30 transition-colors">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 rounded object-cover flex-shrink-0 bg-muted"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1">
          <Star className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0 mt-1" />
          <h3 className="text-sm font-medium text-foreground leading-tight">{product.name}</h3>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span>SKU <span className="font-medium text-foreground">{product.sku}</span></span>
          <span>UOM <span className="font-medium text-foreground">{product.uomQty} {product.uom}</span></span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
        <Star className="h-3 w-3" />
        <span>{product.seller}</span>
      </div>

      <div className="text-right flex-shrink-0 w-28">
        <div className="text-xs text-muted-foreground">
          ${product.pricePerUnit.toFixed(2)} / {product.uom}
        </div>
        <div className="text-base font-semibold text-foreground">
          ${product.totalPrice.toFixed(2)}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center border rounded">
          <button
            onClick={() => setQty(Math.max(0, qty - 1))}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-10 text-center text-sm bg-transparent border-x py-1 focus:outline-none"
            min={0}
          />
          <button
            onClick={() => setQty(qty + 1)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductRow;

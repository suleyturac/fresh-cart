import { X, Plus, Minus, Heart, Clock, Truck } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

const ProductDetailModal = ({ product, onClose, isFavorite, onToggleFavorite }: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [qty, setQty] = useState(1);

  // Calculate delivery: order by 2PM EST = next business day
  const now = new Date();
  const estOffset = -5;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const estNow = new Date(utc + 3600000 * estOffset);
  const cutoffHour = 14; // 2 PM
  const isBeforeCutoff = estNow.getHours() < cutoffHour;

  const getNextBusinessDay = (from: Date, skip: number): Date => {
    const d = new Date(from);
    let added = 0;
    while (added < skip) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) added++;
    }
    return d;
  };

  const deliveryDate = getNextBusinessDay(estNow, isBeforeCutoff ? 1 : 2);
  const deliveryStr = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const cutoffStr = isBeforeCutoff
    ? `Order in the next ${cutoffHour - estNow.getHours()}h ${60 - estNow.getMinutes()}m for next-day delivery`
    : "Order now for delivery on " + deliveryStr;

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name} added to cart`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-1 rounded-full bg-background/80 hover:bg-background text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-muted">
            <img
              src={product.image.replace("w=120&h=120", "w=600&h=600")}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category} · {product.seller}</p>
              <h2 className="text-xl font-bold text-foreground mt-1">{product.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</p>
            </div>

            <div className="border rounded-md p-3 bg-secondary/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unit Price</span>
                <span className="font-medium">${product.pricePerUnit.toFixed(2)} / {product.uom}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Pack Size</span>
                <span className="font-medium">{product.uomQty} {product.uom}</span>
              </div>
              <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">${product.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className={isBeforeCutoff ? "text-green-600 font-medium" : "text-muted-foreground"}>
                  {cutoffStr}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">Delivery: {deliveryStr}</span>
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center gap-3 mt-auto pt-2">
              <div className="flex items-center border rounded">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button onClick={handleAdd} className="flex-1">
                Add to Cart · ${(product.totalPrice * qty).toFixed(2)}
              </Button>
            </div>

            {user && onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`flex items-center justify-center gap-2 text-sm py-2 rounded-md border transition-colors ${
                  isFavorite
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

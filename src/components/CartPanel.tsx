import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

const CartPanel = ({ open, onClose }: CartPanelProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", address: "", city: "", state: "", zip: "",
  });

  // Calculate delivery date
  const getDeliveryDate = (): string => {
    const now = new Date();
    const estOffset = -5;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const est = new Date(utc + 3600000 * estOffset);
    const cutoff = 14;
    const skip = est.getHours() < cutoff ? 1 : 2;
    const d = new Date(est);
    let added = 0;
    while (added < skip) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) added++;
    }
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.zip) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const orderData = {
        userId: user?.uid || "guest",
        userEmail: user?.email || form.email,
        status: "new",
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          sku: i.product.sku,
          quantity: i.quantity,
          totalPrice: i.product.totalPrice,
        })),
        total: totalPrice,
        deliveryDate: getDeliveryDate(),
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        businessName: form.businessName,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order submitted successfully! We'll contact you shortly.");
      clearCart();
      setShowCheckout(false);
      onClose();
    } catch (err: any) {
      console.error("Order submission failed:", err);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />
      <div className="ml-auto relative w-full max-w-lg bg-card shadow-xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {showCheckout ? "Checkout" : `Cart (${totalItems} items)`}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!showCheckout ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 rounded-md border bg-background">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">${item.product.totalPrice.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-1 border rounded">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold w-16 text-right">
                      ${(item.product.totalPrice * item.quantity).toFixed(2)}
                    </p>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-medium">$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-base border-t pt-3">
                  <span>Total (Estimated)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button onClick={() => setShowCheckout(true)} className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">First Name *</label>
                <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Last Name *</label>
                <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email *</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Phone *</label>
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Business Name (optional)</label>
              <Input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Address *</label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">City *</label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Zip Code *</label>
                <Input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">State *</label>
              <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Estimated Delivery</span>
                <span className="font-medium text-foreground">{new Date(getDeliveryDate()).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Order"}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => setShowCheckout(false)}>
                Back to Cart
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CartPanel;

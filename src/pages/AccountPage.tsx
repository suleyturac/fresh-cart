import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, XCircle, CheckCircle, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface OrderItem {
  name: string;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: string;
  createdAt: any;
  status: "new" | "shipped" | "complete";
  items: OrderItem[];
  total: number;
  deliveryDate: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const statusConfig = {
  new: { label: "New", icon: Clock, color: "text-blue-600 bg-blue-50" },
  shipped: { label: "Shipped", icon: Truck, color: "text-amber-600 bg-amber-50" },
  complete: { label: "Complete", icon: CheckCircle, color: "text-green-600 bg-green-50" },
};

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))
        );
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)));
      } catch (err) {
        console.warn("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const canCancel = (order: Order) => {
    if (order.status !== "new") return false;
    if (!order.deliveryDate) return false;
    const delivery = new Date(order.deliveryDate);
    const now = new Date();
    const diffMs = delivery.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 1;
  };

  const handleCancel = async (orderId: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: "cancelled" });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" as any } : o))
      );
      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 bg-card border-b flex items-center px-4 gap-3">
        <Link to="/order">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Link>
        <Link to="/">
          <img src={logo} alt="Curbside Produce" className="h-12 w-auto" />
        </Link>
        <span className="ml-auto text-sm text-muted-foreground">{user.email}</span>
      </header>

      <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-card rounded-lg border p-6">
          <h1 className="text-xl font-bold text-foreground">Account Details</h1>
          <div className="mt-4 space-y-2 text-sm">
            <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{user.email}</span></p>
            <p><span className="text-muted-foreground">Member since:</span> <span className="font-medium">{user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</span></p>
          </div>
          <Button variant="outline" size="sm" className="mt-4" onClick={async () => { await logout(); navigate("/"); }}>
            Sign Out
          </Button>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Order History</h2>
          </div>

          {loading ? (
            <p className="text-muted-foreground text-sm">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">No orders yet. <Link to="/order" className="text-primary hover:underline">Start shopping</Link></p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const sc = statusConfig[order.status] || statusConfig.new;
                const Icon = sc.icon;
                return (
                  <div key={order.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${sc.color}`}>
                          <Icon className="h-3 w-3" />
                          {sc.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ""}
                        </span>
                      </div>
                      <span className="font-semibold text-sm">${order.total?.toFixed(2)}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      {order.items?.slice(0, 3).map((item, i) => (
                        <p key={i} className="text-muted-foreground">
                          {item.quantity}x {item.name} — ${(item.totalPrice * item.quantity).toFixed(2)}
                        </p>
                      ))}
                      {order.items?.length > 3 && (
                        <p className="text-xs text-muted-foreground">+{order.items.length - 3} more items</p>
                      )}
                    </div>
                    {order.deliveryDate && (
                      <p className="text-xs text-muted-foreground mt-2">Delivery: {order.deliveryDate}</p>
                    )}
                    {canCancel(order) && (
                      <Button variant="outline" size="sm" className="mt-2 text-destructive border-destructive/30" onClick={() => handleCancel(order.id)}>
                        <XCircle className="h-3 w-3 mr-1" /> Cancel Order
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountPage;

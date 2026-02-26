import { useState, useEffect } from "react";
import { Search, Menu, LogOut, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onMobileMenuToggle?: () => void;
}

const TopBar = ({ onCartClick, searchQuery, onSearchChange, onMobileMenuToggle }: TopBarProps) => {
  const { totalItems, totalPrice } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bouncing, setBouncing] = useState(false);
  const [prevItems, setPrevItems] = useState(totalItems);

  useEffect(() => {
    if (totalItems > prevItems) {
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 400);
      setPrevItems(totalItems);
      return () => clearTimeout(timer);
    }
    setPrevItems(totalItems);
  }, [totalItems, prevItems]);

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b flex items-center px-4 gap-3">
      <button className="md:hidden text-foreground mr-1" onClick={onMobileMenuToggle}>
        <Menu className="h-5 w-5" />
      </button>

      <Link to="/">
        <img src={logo} alt="Curbside Produce" className="h-12 w-auto object-contain" />
      </Link>

      <div className="flex-1 max-w-lg relative ml-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary border-0"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="h-4 w-4" />
              <span className="truncate max-w-[120px]">{user.email}</span>
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/account")}>
                My Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/account")}>
                Order History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login" className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline">
            <User className="h-4 w-4" /> Sign In
          </Link>
        )}
        <button
          onClick={onCartClick}
          className={`relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity ${bouncing ? "cart-bounce" : ""}`}
        >
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
          <span className="hidden sm:inline">${totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;

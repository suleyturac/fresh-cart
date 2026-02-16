import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface TopBarProps {
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const TopBar = ({ onCartClick, searchQuery, onSearchChange }: TopBarProps) => {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b flex items-center px-4 gap-4">
      <img src={logo} alt="Fresh Market Wholesale" className="h-10 w-10 rounded object-contain" />
      <span className="font-semibold text-foreground hidden sm:block">Fresh Market</span>

      <div className="flex-1 max-w-lg relative ml-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary border-0"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
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

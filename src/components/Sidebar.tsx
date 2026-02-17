interface CategoryItem {
  name: string;
  icon: string;
}

interface SidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (cat: string | null) => void;
  selectedSellers: string[];
  onSellerToggle: (seller: string) => void;
  categories: CategoryItem[];
  sellers: string[];
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({ selectedCategory, onCategorySelect, selectedSellers, onSellerToggle, categories, sellers, mobileOpen, onMobileClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 md:hidden" onClick={onMobileClose} />
      )}
      <aside className={`fixed left-0 top-14 bottom-0 w-60 bg-sidebar border-r overflow-y-auto z-40 transition-transform duration-200 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
        <div className="p-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
              <button
                onClick={() => onCategorySelect(null)}
                className="text-xs text-primary hover:underline"
              >
                All
              </button>
            </div>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => {
                      onCategorySelect(cat.name === selectedCategory ? null : cat.name);
                      onMobileClose?.();
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors ${
                      cat.name === selectedCategory
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sellers</h3>
            </div>
            <ul className="space-y-1">
              {sellers.map((seller) => (
                <li key={seller}>
                  <label className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground cursor-pointer hover:bg-sidebar-accent/50 rounded">
                    <input
                      type="checkbox"
                      checked={selectedSellers.includes(seller)}
                      onChange={() => onSellerToggle(seller)}
                      className="accent-primary rounded"
                    />
                    <span className="truncate">{seller}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

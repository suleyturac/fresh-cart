import { Link } from "react-router-dom";
import { ArrowRight, Truck, Clock, ShieldCheck, Leaf, Phone, MapPin, Mail, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";
import heroChef from "@/assets/hero-chef.jpg";
import deliveryTruck from "@/assets/delivery-truck.jpg";
import produceSpread from "@/assets/produce-spread.jpg";
import restaurantDining from "@/assets/restaurant-dining.jpg";
import supermarketProduce from "@/assets/supermarket-produce.jpg";
import warehouseProduce from "@/assets/warehouse-produce.jpg";
import { useFirestoreBlogs } from "@/hooks/useFirestoreBlogs";

const LandingPage = () => {
  const { blogs } = useFirestoreBlogs();
  const featuredBlogs = blogs.slice(0, 3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/">
            <img src={logo} alt="Curbside Distribution - NYC Wholesale Produce" className="h-12 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Products We Offer</a>
            <a href="#delivery" className="hover:text-foreground transition-colors">How We Deliver</a>
            <a href="#industries" className="hover:text-foreground transition-colors">Industries</a>
            <a href="#blog" className="hover:text-foreground transition-colors">Tips & Ideas</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/order">
              <Button variant="outline" className="font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Browse Products
              </Button>
            </Link>
            <Link to="/login">
              <Button className="font-semibold">
                Become a Customer
              </Button>
            </Link>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t p-4 space-y-3">
            <a href="#services" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Products We Offer</a>
            <a href="#delivery" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>How We Deliver</a>
            <a href="#industries" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Industries</a>
            <a href="#blog" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Tips & Ideas</a>
            <Link to="/order" className="block"><Button variant="outline" className="w-full font-semibold border-primary text-primary">Browse Products</Button></Link>
            <Link to="/login" className="block"><Button className="w-full font-semibold">Become a Customer</Button></Link>
          </div>
        )}
      </nav>

      {/* Hero Section — Full-bleed image with bold text overlay */}
      <header className="relative pt-16">
        <div className="relative h-[70vh] min-h-[500px]">
          <img src={heroChef} alt="Professional chef preparing fresh wholesale produce in restaurant kitchen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 uppercase tracking-tight">
                  More Ways to<br />Help You<br /><span className="text-primary">Make It</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                  With top produce portfolios, same-day delivery, and all-around flexibility, we're ready to be your partner in the food business.
                </p>
                <Link to="/login">
                  <Button size="lg" className="text-base font-semibold px-8 py-6 rounded-full">
                    Become a Customer <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Bar */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium">
          <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Same-Day Delivery</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Order by 6 AM, Delivered by Noon</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Quality Guaranteed</span>
          <span className="flex items-center gap-2"><Leaf className="h-4 w-4" /> Organic Options Available</span>
        </div>
      </section>

      {/* Delivery Section — Colored bg with image cards (US Foods inspired) */}
      <section id="delivery" className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.95] mb-4">
                More<br />Quality
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                An unmatched portfolio of quality wholesale produce for restaurants and supermarkets that consistently delivers on expectations across the NYC metro area.
              </p>
              <Link to="/order">
                <Button variant="secondary" className="rounded-full font-semibold px-6">
                  Products We Offer <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <img src={deliveryTruck} alt="Scheduled wholesale produce delivery truck NYC" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                <h3 className="text-white font-bold">Scheduled <ChevronRight className="inline h-4 w-4" /></h3>
                <p className="text-white/70 text-sm">Premium products delivered with consistency to restaurants across all five boroughs.</p>
              </div>
              <div className="space-y-3">
                <img src={warehouseProduce} alt="Daily wholesale produce distribution warehouse" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                <h3 className="text-white font-bold">Daily <ChevronRight className="inline h-4 w-4" /></h3>
                <p className="text-white/70 text-sm">Flexible delivery customized to meet your specific needs across the tri-state area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section — Image-heavy cards */}
      <section id="industries" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground italic mb-3">
              More solutions, across every industry
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our centralized systems allow us to serve a variety of businesses with tools and resources — allowing you to maximize coverage and enable flexibility as you grow.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Restaurants", img: restaurantDining, desc: "Fresh wholesale produce for NYC restaurants with same-day delivery and competitive bulk pricing." },
              { title: "Supermarkets", img: supermarketProduce, desc: "Consistent supply of wholesale fruits and vegetables for grocery stores across the tri-state area." },
              { title: "Catering", img: heroChef, desc: "Bulk produce supply for catering companies and event venues throughout the NY metro area." },
              { title: "Hospitality", img: produceSpread, desc: "Farm-fresh produce for hotels, banquet halls, and hospitality businesses in New York City." },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-3">
                  <img src={item.img} alt={`${item.title} - wholesale produce supply NYC`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <h3 className="font-bold text-foreground flex items-center gap-1">
                  {item.title} <ChevronRight className="h-4 w-4" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Why Us */}
      <section id="services" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why NYC's Top Restaurants Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              As a leading produce wholesaler for restaurants and supermarkets in the tri-state area, we deliver fresh bulk fruits and vegetables at competitive wholesale pricing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🚛", title: "Tri-State Area Delivery", desc: "Wholesale fruits and vegetables delivery across Bronx, Queens, Brooklyn, Manhattan, Long Island, and New Jersey." },
              { icon: "💰", title: "Competitive Bulk Pricing", desc: "We source directly from Hunts Point Produce Market and local farms to keep costs low for your business." },
              { icon: "🌿", title: "Farm-Fresh Quality", desc: "Direct farm-to-restaurant produce with 500+ items daily including organic and ethnic specialty options." },
              { icon: "⚡", title: "Same-Day Delivery", desc: "Manhattan restaurant fruit and vegetable supplier with same-day delivery. Order by 6 AM for noon delivery." },
              { icon: "📦", title: "Cash & Carry Available", desc: "Visit our cash and carry produce market or use our convenient online ordering platform." },
              { icon: "🤝", title: "Dedicated Account Managers", desc: "Every commercial produce supplier client gets a dedicated account manager for personalized service." },
            ].map((item) => (
              <div key={item.title} className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={warehouseProduce} alt="Wholesale produce warehouse NYC metro area" className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Serving the Entire NY Metro Area
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed text-muted-foreground">
                As a premier New York City restaurant produce distributor, we deliver fresh vegetables and fruits to businesses across the tri-state area.
              </p>
              <ul className="space-y-4">
                {[
                  "Manhattan — All neighborhoods, Financial District to Harlem",
                  "Brooklyn — Williamsburg, DUMBO, Bay Ridge & more",
                  "Queens — Astoria, Flushing, Jamaica & wholesale markets",
                  "Bronx — Hunts Point area & surrounding neighborhoods",
                  "Long Island — Nassau & western Suffolk County",
                  "New Jersey — Newark, Jersey City & NJ metro area",
                ].map((area) => (
                  <li key={area} className="flex items-start gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Industry Insights</h2>
              <p className="text-muted-foreground text-lg">Resources for NYC restaurant owners and supermarket buyers</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
              View All Articles <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBlogs.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="md:hidden mt-8 flex items-center justify-center gap-2 text-primary font-semibold">
            View All Articles <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Order Fresh Wholesale Produce?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of NYC restaurants, supermarkets, and grocery stores who trust Curbside Distribution for their bulk fresh produce supply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-6 rounded-full">
                Start Ordering Online <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+17185551234">
              <Button size="lg" variant="outline" className="text-base font-semibold px-8 py-6 rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Phone className="h-5 w-5 mr-2" /> Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={logo} alt="Curbside Distribution" className="h-12 w-auto object-contain mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                NYC metro area's trusted wholesale produce distributor. Fresh fruits and vegetables for restaurants, supermarkets, and food service businesses.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Service Areas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Manhattan</li>
                <li>Brooklyn & Queens</li>
                <li>Bronx (Hunts Point)</li>
                <li>Long Island</li>
                <li>New Jersey Metro</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/order" className="text-muted-foreground hover:text-foreground transition-colors">Order Online</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog & Resources</Link></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Our Services</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (718) 555-1234</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> orders@curbsidedist.com</li>
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Hunts Point, Bronx, NY 10474</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Curbside Distribution. NYC Wholesale Produce Distributor serving the tri-state area.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

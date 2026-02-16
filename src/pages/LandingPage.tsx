import { Link } from "react-router-dom";
import { ArrowRight, Truck, Clock, ShieldCheck, Leaf, Phone, MapPin, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-produce.jpg";
import { blogPosts } from "@/data/blogPosts";

const LandingPage = () => {
  const featuredBlogs = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Curbside Distribution - NYC Wholesale Produce" className="h-10 w-10 rounded object-contain" />
            <span className="font-bold text-lg text-foreground">Curbside Distribution</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#coverage" className="hover:text-foreground transition-colors">Coverage</a>
            <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <Link to="/order">
            <Button className="font-semibold">
              Order Now <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 pt-16">
          <img src={heroImage} alt="Fresh wholesale produce - fruits and vegetables" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-primary-foreground/80 font-medium text-sm uppercase tracking-widest mb-4">
              NYC Metro Area's Trusted Produce Wholesaler
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Fresh Wholesale{" "}
              <span className="text-primary">Fruits & Vegetables</span>{" "}
              for NYC Restaurants
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed">
              Bulk produce distribution serving restaurants, supermarkets, and grocery stores across Manhattan, Brooklyn, Queens, Bronx, Long Island, and New Jersey. Same-day delivery with competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button size="lg" className="text-base font-semibold px-8 py-6">
                  Start Ordering <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+17185551234">
                <Button size="lg" variant="outline" className="text-base font-semibold px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Phone className="h-5 w-5 mr-2" /> Call (718) 555-1234
                </Button>
              </a>
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

      {/* Services / Why Us */}
      <section id="services" className="py-20 bg-background">
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
              {
                icon: "🚛",
                title: "Tri-State Area Delivery",
                desc: "Wholesale fruits and vegetables delivery across Bronx, Queens, Brooklyn, Manhattan, Long Island, and New Jersey. Reliable logistics for supermarkets and restaurants.",
              },
              {
                icon: "💰",
                title: "Competitive Bulk Pricing",
                desc: "Restaurant supply produce distributor with NYC's most competitive pricing. We source directly from Hunts Point Produce Market and local farms to keep costs low.",
              },
              {
                icon: "🌿",
                title: "Farm-Fresh Quality",
                desc: "Direct farm-to-restaurant produce suppliers servicing New York. From organic wholesale to ethnic specialty produce, we stock 500+ items daily.",
              },
              {
                icon: "⚡",
                title: "Same-Day Manhattan Delivery",
                desc: "Manhattan restaurant fruit and vegetable supplier with same-day delivery. Order by 6 AM for noon delivery across all five boroughs.",
              },
              {
                icon: "📦",
                title: "Cash & Carry Available",
                desc: "Visit our cash and carry produce market for NYC restaurant owners. Hand-pick your produce or use our convenient online ordering platform.",
              },
              {
                icon: "🤝",
                title: "Dedicated Account Managers",
                desc: "Every commercial produce supplier client in the NYC food service industry gets a dedicated account manager for personalized service.",
              },
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
      <section id="coverage" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Serving the Entire NY Metro Area
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                As a premier New York City restaurant produce distributor, we deliver fresh vegetables and fruits to businesses across the tri-state area. From Hunts Point in the Bronx to Long Island supermarkets, we've got you covered.
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
            <div className="bg-card border rounded-lg p-8 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Get a Quote Today</h3>
              <p className="text-muted-foreground">Tell us about your business and we'll set up your wholesale produce account with competitive pricing tailored to your volume.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Business Name" className="w-full border rounded-md px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <input type="email" placeholder="Email Address" className="w-full border rounded-md px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <input type="tel" placeholder="Phone Number" className="w-full border rounded-md px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <select className="w-full border rounded-md px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Business Type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="supermarket">Supermarket / Grocery Store</option>
                  <option value="catering">Catering Company</option>
                  <option value="other">Other Food Service</option>
                </select>
                <Button className="w-full py-6 text-base font-semibold">Request Quote</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="py-20 bg-background">
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
              <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-6">
                Start Ordering Online <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+17185551234">
              <Button size="lg" variant="outline" className="text-base font-semibold px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
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
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Curbside Distribution" className="h-10 w-10 rounded object-contain" />
                <span className="font-bold text-foreground">Curbside Distribution</span>
              </div>
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

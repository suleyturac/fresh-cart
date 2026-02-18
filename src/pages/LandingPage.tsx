import { Link } from "react-router-dom";
import { ArrowRight, Truck, Clock, ShieldCheck, Leaf, Phone, MapPin, Mail, ChevronRight, Menu, X, Instagram } from "lucide-react";
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
            <img src={logo} alt="Curbside Produce - NYC Wholesale Produce Distributor" className="h-14 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Why Choose Us</a>
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
            <a href="#services" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#delivery" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>How We Deliver</a>
            <a href="#industries" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Industries</a>
            <a href="#blog" className="block text-sm text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Tips & Ideas</a>
            <Link to="/order" className="block"><Button variant="outline" className="w-full font-semibold border-primary text-primary">Browse Products</Button></Link>
            <Link to="/login" className="block"><Button className="w-full font-semibold">Become a Customer</Button></Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16">
        <div className="relative h-[70vh] min-h-[500px]">
          <img src={heroChef} alt="Professional chef preparing fresh wholesale produce in restaurant kitchen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 uppercase tracking-tight">
                  Wholesale Produce<br />Distributor in<br /><span className="text-primary">NYC Metro Area</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                  Fresh wholesale fruits &amp; vegetables for restaurants, supermarkets &amp; grocery stores. Same-day delivery across all five boroughs, Long Island &amp; New Jersey.
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

      {/* Delivery Section — "More Quality" */}
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

      {/* Why Choose Us — Restyled like Delivery section with blue bg + image cards */}
      <section id="services" className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.95] mb-4">
                Why NYC's Top<br />Restaurants<br />Choose Us
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                As a leading produce wholesaler for restaurants and supermarkets in the tri-state area, we deliver fresh bulk fruits and vegetables at competitive wholesale pricing.
              </p>
              <Link to="/order">
                <Button variant="secondary" className="rounded-full font-semibold px-6">
                  Start Ordering <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <img src={produceSpread} alt="Fresh wholesale produce spread for NYC restaurants" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                <h3 className="text-white font-bold">Tri-State Delivery <ChevronRight className="inline h-4 w-4" /></h3>
                <p className="text-white/70 text-sm">Wholesale fruits and vegetables delivery across Bronx, Queens, Brooklyn, Manhattan, Long Island, and New Jersey.</p>
              </div>
              <div className="space-y-3">
                <img src={restaurantDining} alt="Competitive bulk pricing for restaurant produce" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                <h3 className="text-white font-bold">Bulk Pricing <ChevronRight className="inline h-4 w-4" /></h3>
                <p className="text-white/70 text-sm">Direct from Hunts Point Produce Market and local farms. Same-day delivery, 500+ items daily including organic options.</p>
              </div>
              <div className="space-y-3">
                <img src={supermarketProduce} alt="Cash and carry produce market NYC" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                <h3 className="text-white font-bold">Cash & Carry <ChevronRight className="inline h-4 w-4" /></h3>
                <p className="text-white/70 text-sm">Visit our cash and carry produce market or use our convenient online ordering platform.</p>
              </div>
              <div className="space-y-3">
                <img src={heroChef} alt="Dedicated account managers for commercial produce" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                <h3 className="text-white font-bold">Dedicated Support <ChevronRight className="inline h-4 w-4" /></h3>
                <p className="text-white/70 text-sm">Every client gets a dedicated account manager for personalized service and competitive pricing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
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

      {/* Coverage Area */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={warehouseProduce} alt="Wholesale produce warehouse NYC metro area" className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Serving the Entire NY Metro Area
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                As a premier New York City restaurant produce distributor, we deliver fresh vegetables and fruits to businesses across the tri-state area.
              </p>
              <ul className="space-y-4">
                {[
                  { area: "Manhattan — All neighborhoods, Financial District to Harlem", link: "/wholesale-produce-manhattan" },
                  { area: "Brooklyn — Williamsburg, DUMBO, Bay Ridge & more", link: "/wholesale-produce-brooklyn" },
                  { area: "Queens — Astoria, Flushing, Jamaica & wholesale markets", link: "/wholesale-produce-queens" },
                  { area: "Bronx — Hunts Point area & surrounding neighborhoods", link: "/wholesale-produce-bronx" },
                  { area: "Long Island — Nassau & western Suffolk County", link: "/wholesale-produce-long-island" },
                  { area: "New Jersey — Newark, Jersey City & NJ metro area", link: "/wholesale-produce-brooklyn" },
                ].map((item) => (
                  <li key={item.area}>
                    <Link to={item.link} className="flex items-start gap-3 text-foreground hover:text-primary transition-colors">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>{item.area}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do you deliver wholesale produce in Manhattan?", a: "Yes, Curbside Produce delivers fresh wholesale fruits and vegetables throughout Manhattan, from the Financial District to Harlem, with same-day delivery available." },
              { q: "What areas do you serve in the NYC metro area?", a: "We serve all five boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island), Long Island (Nassau & western Suffolk County), and New Jersey (Newark, Jersey City & surrounding areas)." },
              { q: "Do you offer organic produce at wholesale prices?", a: "Yes, we carry a wide selection of certified organic fruits and vegetables sourced from farms in upstate New York, New Jersey, Pennsylvania, and Long Island at competitive wholesale pricing." },
              { q: "What is your minimum order for restaurants?", a: "We work with restaurants of all sizes. Contact us at suley@curbsideproduce.com or call (347) 388-0225 to discuss your needs and get started." },
              { q: "Can I visit your cash and carry produce market?", a: "Yes! Restaurant owners and food service professionals are welcome to visit our location for cash and carry purchasing. Call ahead for hours and availability." },
            ].map((faq) => (
              <div key={faq.q} className="border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
            Join hundreds of NYC restaurants, supermarkets, and grocery stores who trust Curbside Produce for their bulk fresh produce supply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-6 rounded-full">
                Start Ordering Online <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+13473880225">
              <Button size="lg" variant="outline" className="text-base font-semibold px-8 py-6 rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Phone className="h-5 w-5 mr-2" /> (347) 388-0225
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
              <img src={logo} alt="Curbside Produce" className="h-14 w-auto object-contain mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                NYC metro area's trusted wholesale produce distributor. Fresh fruits and vegetables for restaurants, supermarkets, and food service businesses.
              </p>
              <a href="https://instagram.com/curbsidedistribution" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline">
                <Instagram className="h-4 w-4" /> @curbsidedistribution
              </a>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Service Areas</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/wholesale-produce-manhattan" className="text-muted-foreground hover:text-foreground transition-colors">Manhattan</Link></li>
                <li><Link to="/wholesale-produce-brooklyn" className="text-muted-foreground hover:text-foreground transition-colors">Brooklyn</Link></li>
                <li><Link to="/wholesale-produce-queens" className="text-muted-foreground hover:text-foreground transition-colors">Queens</Link></li>
                <li><Link to="/wholesale-produce-bronx" className="text-muted-foreground hover:text-foreground transition-colors">Bronx (Hunts Point)</Link></li>
                <li><Link to="/wholesale-produce-long-island" className="text-muted-foreground hover:text-foreground transition-colors">Long Island</Link></li>
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
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> <a href="tel:+13473880225">(347) 388-0225</a></li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> <a href="mailto:suley@curbsideproduce.com">suley@curbsideproduce.com</a></li>
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Hunts Point, Bronx, NY 10474</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Curbside Produce. Wholesale Produce Distributor serving NYC metro area, Long Island &amp; New Jersey.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

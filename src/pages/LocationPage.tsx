import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, ChevronRight, Truck, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import warehouseProduce from "@/assets/warehouse-produce.jpg";
import produceSpread from "@/assets/produce-spread.jpg";

interface LocationData {
  slug: string;
  borough: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  neighborhoods: string[];
  content: string[];
  faqs: { q: string; a: string }[];
}

const locations: LocationData[] = [
  {
    slug: "wholesale-produce-manhattan",
    borough: "Manhattan",
    h1: "Wholesale Produce Distributor in Manhattan, NYC",
    metaTitle: "Wholesale Produce Manhattan | Fresh Fruits & Vegetables Distributor",
    metaDescription: "Curbside Produce delivers fresh wholesale fruits and vegetables to Manhattan restaurants and supermarkets. Same-day delivery, competitive bulk pricing.",
    intro: "Curbside Produce is Manhattan's trusted wholesale produce distributor, serving restaurants, supermarkets, and food service businesses across every neighborhood. From the Financial District to Harlem, we deliver farm-fresh fruits and vegetables with same-day service and competitive bulk pricing.",
    neighborhoods: ["Financial District", "Midtown", "Upper East Side", "Upper West Side", "Harlem", "Chelsea", "SoHo", "Tribeca", "East Village", "West Village", "Hell's Kitchen", "Murray Hill"],
    content: [
      "Manhattan's restaurant scene is one of the most competitive in the world. Having a reliable wholesale produce supplier can make the difference between a thriving kitchen and costly delays. Curbside Produce understands the unique challenges Manhattan restaurateurs face — limited storage, high volume, and the demand for only the freshest ingredients.",
      "Our same-day delivery service means Manhattan restaurants can order fresh wholesale fruits and vegetables by 6 AM and receive their delivery by noon. This eliminates the need for large cold storage facilities, which is critical in Manhattan where space is at a premium.",
      "We source directly from the Hunts Point Produce Market in the Bronx, local farms across New York State, and trusted importers to ensure year-round availability of both conventional and organic produce. Our Manhattan customers enjoy access to over 500 items daily, including ethnic specialty produce for the city's diverse culinary landscape.",
      "Whether you run a fine dining establishment in Tribeca, a fast-casual spot in Midtown, or a neighborhood supermarket on the Upper West Side, Curbside Produce provides the consistent quality and competitive pricing your business needs. Every Manhattan account gets a dedicated manager who understands your menu and ordering patterns.",
      "Our bulk pricing structure is designed specifically for Manhattan's food service industry. We offer flexible case sizes, split orders, and volume discounts that help restaurants and grocery stores maintain healthy margins while serving the freshest produce to their customers.",
    ],
    faqs: [
      { q: "Do you deliver wholesale produce throughout Manhattan?", a: "Yes, Curbside Produce delivers to all Manhattan neighborhoods from the Financial District to Harlem, including Midtown, Chelsea, SoHo, and the Upper East and West Sides." },
      { q: "What is your delivery schedule for Manhattan?", a: "We offer same-day delivery for Manhattan orders placed by 6 AM. Deliveries are completed by noon, ensuring your kitchen has fresh produce for the day's service." },
      { q: "Do you offer organic produce for Manhattan restaurants?", a: "Yes, we carry a full selection of certified organic fruits and vegetables at wholesale prices, sourced from farms in upstate New York, New Jersey, and Pennsylvania." },
    ],
  },
  {
    slug: "wholesale-produce-brooklyn",
    borough: "Brooklyn",
    h1: "Wholesale Produce Distributor in Brooklyn, NYC",
    metaTitle: "Wholesale Produce Brooklyn | Restaurant & Supermarket Supply",
    metaDescription: "Fresh wholesale fruits and vegetables for Brooklyn restaurants and supermarkets. Curbside Produce offers same-day delivery and competitive bulk pricing across all Brooklyn neighborhoods.",
    intro: "Curbside Produce serves Brooklyn's vibrant food scene with reliable wholesale produce distribution. From Williamsburg's trendy restaurants to Bay Ridge's neighborhood supermarkets, we deliver fresh bulk fruits and vegetables across every Brooklyn neighborhood with same-day service.",
    neighborhoods: ["Williamsburg", "DUMBO", "Park Slope", "Bay Ridge", "Bushwick", "Crown Heights", "Flatbush", "Sunset Park", "Bensonhurst", "Bedford-Stuyvesant", "Greenpoint", "Brooklyn Heights"],
    content: [
      "Brooklyn's food scene has exploded in recent years, with world-class restaurants, artisanal grocery stores, and diverse supermarkets opening across every neighborhood. Curbside Produce has grown alongside Brooklyn's culinary revolution, providing the wholesale produce foundation that Brooklyn's food businesses depend on.",
      "Our Brooklyn delivery routes cover the entire borough, from the waterfront restaurants of DUMBO and Williamsburg to the bustling markets of Sunset Park and Bensonhurst. We understand that Brooklyn's food businesses are as diverse as the borough itself, which is why we stock over 500 items including specialty ethnic produce.",
      "Brooklyn restaurants benefit from our same-day delivery service. Place your wholesale produce order by 6 AM, and your fresh fruits and vegetables arrive by noon. This is especially valuable for Brooklyn's growing farm-to-table dining scene, where freshness isn't just preferred — it's expected.",
      "For Brooklyn supermarkets and grocery stores, we offer consistent multi-day supply schedules, standardized grading, and electronic ordering systems. Our competitive bulk pricing helps Brooklyn grocers maintain margins while keeping shelves stocked with the freshest seasonal produce.",
      "Curbside Produce sources directly from Hunts Point Produce Market and regional farms to bring Brooklyn the best wholesale fruits and vegetables available. Our dedicated Brooklyn account managers work with each business to optimize ordering, reduce waste, and maximize value.",
    ],
    faqs: [
      { q: "What Brooklyn neighborhoods do you deliver to?", a: "We deliver to all Brooklyn neighborhoods including Williamsburg, DUMBO, Park Slope, Bay Ridge, Bushwick, Crown Heights, Flatbush, Sunset Park, Bensonhurst, and more." },
      { q: "Do you supply supermarkets in Brooklyn?", a: "Yes, we supply supermarkets and grocery stores throughout Brooklyn with consistent wholesale produce deliveries, competitive pricing, and flexible ordering." },
    ],
  },
  {
    slug: "wholesale-produce-queens",
    borough: "Queens",
    h1: "Wholesale Produce Distributor in Queens, NYC",
    metaTitle: "Wholesale Produce Queens | Fresh Fruits & Vegetables Supplier",
    metaDescription: "Curbside Produce supplies fresh wholesale fruits and vegetables to Queens restaurants and supermarkets. Ethnic specialty produce, competitive pricing, same-day delivery.",
    intro: "Queens is the most ethnically diverse urban area in the world, and its food scene reflects that diversity. Curbside Produce is Queens' go-to wholesale produce distributor, providing the widest selection of conventional, organic, and ethnic specialty fruits and vegetables to restaurants and supermarkets across the borough.",
    neighborhoods: ["Astoria", "Flushing", "Jamaica", "Long Island City", "Jackson Heights", "Elmhurst", "Forest Hills", "Rego Park", "Woodside", "Sunnyside", "Bayside", "Fresh Meadows"],
    content: [
      "Queens demands a wholesale produce distributor that understands diversity. From the Korean and Chinese restaurants of Flushing to the South Asian markets of Jackson Heights and the Greek tavernas of Astoria, Queens' food businesses need access to specialty produce that generic wholesalers simply cannot provide.",
      "Curbside Produce stocks over 500 items daily to serve Queens' diverse culinary landscape. Our inventory includes Caribbean tropical fruits, Asian leafy greens like bok choy and gai lan, Latin American chili peppers and plantains, and much more — all at competitive wholesale pricing.",
      "Our Queens delivery routes ensure same-day service to every neighborhood in the borough. Whether you're a restaurant in Long Island City or a supermarket in Jamaica, you can count on fresh wholesale produce delivered by noon when you order by 6 AM.",
      "Queens' wholesale produce market is highly competitive, and Curbside Produce helps food businesses stay ahead with reliable supply, consistent quality, and pricing that protects margins. We source from Hunts Point, international importers, and local farms to ensure year-round availability.",
      "Every Queens business we serve gets a dedicated account manager who understands the unique produce needs of your cuisine and clientele. We work with you to build custom order lists, manage seasonal transitions, and find the best value across our extensive product catalog.",
    ],
    faqs: [
      { q: "Do you carry ethnic specialty produce for Queens restaurants?", a: "Yes, we stock over 500 items including Caribbean tropical fruits, Asian vegetables, Latin American produce, and specialty items from around the world." },
      { q: "Do you deliver to Flushing and Jackson Heights?", a: "Yes, we deliver to all Queens neighborhoods including Flushing, Jackson Heights, Astoria, Long Island City, Jamaica, Elmhurst, and more." },
    ],
  },
  {
    slug: "wholesale-produce-bronx",
    borough: "Bronx",
    h1: "Wholesale Produce Distributor in the Bronx, NYC",
    metaTitle: "Wholesale Produce Bronx | Hunts Point Market Distributor",
    metaDescription: "Curbside Produce operates near Hunts Point Produce Market, delivering fresh wholesale fruits and vegetables to Bronx restaurants and supermarkets at competitive prices.",
    intro: "Located near the world-famous Hunts Point Produce Market, Curbside Produce is the Bronx's premier wholesale produce distributor. We leverage our proximity to Hunts Point to source the freshest fruits and vegetables at the most competitive prices for Bronx restaurants, supermarkets, and food service businesses.",
    neighborhoods: ["Hunts Point", "Fordham", "Tremont", "Pelham Bay", "Morris Park", "Kingsbridge", "Riverdale", "Mott Haven", "South Bronx", "Parkchester", "Throgs Neck", "Castle Hill"],
    content: [
      "The Bronx is home to Hunts Point Produce Market, the largest wholesale produce market in the world, handling over 2.5 billion pounds of produce annually. Curbside Produce leverages our proximity to Hunts Point to provide Bronx businesses with the freshest wholesale fruits and vegetables at unbeatable prices.",
      "For Bronx restaurants that don't have time for early morning trips to Hunts Point, Curbside Produce handles the sourcing, quality selection, and delivery. We arrive at the market when the best produce is available and deliver it directly to your door, saving you time and ensuring top-quality ingredients.",
      "Bronx supermarkets and grocery stores rely on Curbside Produce for consistent, high-volume wholesale produce supply. Our Bronx delivery routes are optimized for efficiency, and our competitive pricing reflects the cost advantages of operating near the market.",
      "The Bronx's diverse communities demand a wide variety of produce. From Caribbean fruits and vegetables popular in neighborhoods like Tremont and Parkchester to the organic options favored by Riverdale customers, Curbside Produce stocks it all at wholesale prices.",
      "Our Bronx customers benefit from the shortest delivery times in our network, given our proximity to Hunts Point. Same-day delivery is standard, and rush orders can often be accommodated. Contact us to learn how Curbside Produce can become your Bronx wholesale produce partner.",
    ],
    faqs: [
      { q: "Are you located near Hunts Point Produce Market?", a: "Yes, Curbside Produce operates near Hunts Point Produce Market in the Bronx, giving us direct access to the freshest wholesale produce at the most competitive prices." },
      { q: "Do you deliver throughout the entire Bronx?", a: "Yes, we deliver to all Bronx neighborhoods including Hunts Point, Fordham, Tremont, Pelham Bay, Riverdale, Mott Haven, and more." },
    ],
  },
  {
    slug: "wholesale-produce-long-island",
    borough: "Long Island",
    h1: "Wholesale Produce Distributor for Long Island, NY",
    metaTitle: "Wholesale Produce Long Island | Fresh Fruits & Vegetables Delivery",
    metaDescription: "Curbside Produce delivers fresh wholesale fruits and vegetables to Long Island restaurants and supermarkets. Serving Nassau and western Suffolk County with competitive pricing.",
    intro: "Curbside Produce extends our wholesale produce distribution to Long Island, serving restaurants, supermarkets, and food service businesses across Nassau County and western Suffolk County. Fresh bulk fruits and vegetables delivered from the city's premier wholesale markets to your Long Island business.",
    neighborhoods: ["Nassau County", "Western Suffolk County", "Hempstead", "Garden City", "Great Neck", "Manhasset", "Huntington", "Babylon", "Freeport", "Massapequa", "Hicksville", "Syosset"],
    content: [
      "Long Island's restaurant and supermarket scene continues to grow, and with it comes increased demand for reliable wholesale produce distribution. Curbside Produce bridges the gap between the city's wholesale markets and Long Island's food businesses, delivering fresh fruits and vegetables at competitive bulk pricing.",
      "Our Long Island delivery routes cover Nassau County and western Suffolk County, reaching restaurants and supermarkets from Great Neck to Huntington. Long Island food businesses get the same quality and selection available to NYC restaurants, without the need to travel to Hunts Point.",
      "Long Island supermarket chains and independent grocers benefit from our consistent multi-day delivery schedules and competitive wholesale pricing. We understand the unique challenges of suburban retail — larger store footprints, family-oriented product mix, and seasonal demand fluctuations.",
      "For Long Island restaurants, our same-day delivery service means you can order fresh wholesale produce in the morning and receive it in time for dinner service. Our catalog includes over 500 items, from conventional staples to organic and specialty produce.",
      "Curbside Produce's Long Island customers receive dedicated account management, flexible ordering options, and the purchasing power of a major NYC-area distributor. Contact us to start receiving fresh wholesale produce at your Long Island location.",
    ],
    faqs: [
      { q: "Do you deliver wholesale produce to Long Island?", a: "Yes, we deliver to Nassau County and western Suffolk County, including Hempstead, Garden City, Great Neck, Huntington, Babylon, and surrounding areas." },
      { q: "What is the delivery schedule for Long Island?", a: "We offer regular delivery schedules for Long Island businesses. Contact us to set up a schedule that works for your restaurant or supermarket." },
    ],
  },
];

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);

  if (!location) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/">
            <img src={logo} alt="Curbside Produce" className="h-14 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/order" className="text-sm font-semibold text-primary hover:underline">Order Now</Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-64 md:h-80">
          <img src={warehouseProduce} alt={`Wholesale produce distribution ${location.borough}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight">{location.h1}</h1>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-primary text-primary-foreground py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Same-Day Delivery</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 500+ Items Daily</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Quality Guaranteed</span>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{location.intro}</p>

            {/* Neighborhoods */}
            <div className="bg-secondary rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold text-foreground mb-4">{location.borough} Neighborhoods We Serve</h2>
              <div className="flex flex-wrap gap-2">
                {location.neighborhoods.map((n) => (
                  <span key={n} className="bg-card border px-3 py-1.5 rounded text-sm text-foreground">{n}</span>
                ))}
              </div>
            </div>

            {/* Content */}
            {location.content.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">{para}</p>
            ))}

            {/* Image break */}
            <div className="my-12">
              <img src={produceSpread} alt={`Fresh produce for ${location.borough} restaurants`} className="w-full rounded-lg aspect-video object-cover" loading="lazy" />
            </div>

            {/* FAQs */}
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions — {location.borough}</h2>
            <div className="space-y-4 mb-12">
              {location.faqs.map((faq) => (
                <div key={faq.q} className="border rounded-lg p-5">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-foreground mb-3">Need Wholesale Produce in {location.borough}?</h2>
              <p className="text-primary-foreground/80 mb-6">Get competitive wholesale pricing with same-day delivery. Call (347) 388-0225 or email suley@curbsideproduce.com.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/order">
                  <Button variant="secondary" size="lg" className="font-semibold">Start Ordering Now</Button>
                </Link>
                <a href="tel:+13473880225">
                  <Button variant="outline" size="lg" className="font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Phone className="h-4 w-4 mr-2" /> Call Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Curbside Produce. Wholesale Produce Distributor — NYC Metro Area.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/order" className="hover:text-foreground">Order</Link>
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LocationPage;

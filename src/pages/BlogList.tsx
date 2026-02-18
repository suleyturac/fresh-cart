import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { useFirestoreBlogs } from "@/hooks/useFirestoreBlogs";

const BlogList = () => {
  const { blogs, loading } = useFirestoreBlogs();

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
        <section className="bg-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Wholesale Produce Industry Blog
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl">
              Insights, guides, and tips for restaurant owners, supermarket buyers, and food service professionals in the NYC metro area.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-center text-muted-foreground py-12">Loading articles...</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((post) => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h2 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Read More <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogList;

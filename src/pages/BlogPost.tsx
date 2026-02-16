import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Curbside Distribution" className="h-10 w-10 rounded object-contain" />
            <span className="font-bold text-lg text-foreground">Curbside Distribution</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Articles</Link>
            <Link to="/order" className="text-sm font-semibold text-primary hover:underline">Order Now</Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <div className="relative h-64 md:h-96">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Articles
            </Link>
            <span className="block text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded w-fit mb-3">{post.category}</span>
            <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground">{post.title}</h1>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 border-b pb-6">
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>
          <div className="prose prose-lg max-w-none text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-muted-foreground [&_strong]:text-foreground [&_ul]:space-y-2 [&_ol]:space-y-2">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return <h2 key={i}>{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.includes("\n-") || paragraph.startsWith("-")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("-"));
                return (
                  <ul key={i} className="list-disc pl-6">
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                const items = paragraph.split("\n").filter((l) => l.match(/^\d/));
                return (
                  <ol key={i} className="list-decimal pl-6">
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ol>
                );
              }
              return <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
            })}
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-lg p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-3">Need a Reliable Produce Supplier?</h3>
            <p className="text-primary-foreground/80 mb-6">Get competitive wholesale pricing with same-day delivery across the NYC metro area.</p>
            <Link to="/order">
              <Button variant="secondary" size="lg" className="font-semibold">Start Ordering Now</Button>
            </Link>
          </div>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link to={`/blog/${rp.slug}`} key={rp.id} className="group flex gap-4 bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img src={rp.image} alt={rp.title} className="w-24 h-24 rounded object-cover shrink-0" loading="lazy" />
                    <div>
                      <span className="text-xs text-primary font-semibold">{rp.category}</span>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm mt-1">{rp.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{rp.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogPost;

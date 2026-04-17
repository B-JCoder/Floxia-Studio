import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getPosts, getCategories } from "@/lib/wordpress";
import { format } from "date-fns";
import { ArrowRight, Calendar, User, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | Floxia Studio",
  description: "Explore the latest trends in web design, AI automation, and digital strategy from the experts at Floxia Studio.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(100), // Fetch a good number for the main list
    getCategories()
  ]);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-foreground/[0.01] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/20" />
              Insights & Updates
            </div>
            <h1 className="text-5xl md:text-8xl font-display tracking-tight leading-[0.9] mb-8">
              The Digital <br />
              <span className="text-stroke">Knowledge</span> Base
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Deep dives into the technology, design, and strategy that 
              drives the most ambitious brands in the digital era.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-24">
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-foreground/10">
                  {featuredPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <img
                      src={featuredPost._embedded["wp:featuredmedia"][0].source_url}
                      alt={featuredPost.title.rendered}
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-foreground/5 flex items-center justify-center font-display text-4xl opacity-10">FS</div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-6 uppercase tracking-[0.2em]">
                    <span className="bg-foreground text-background px-3 py-1 rounded-full font-bold">Featured</span>
                    <span>{format(new Date(featuredPost.date), "MMMM d, yyyy")}</span>
                  </div>
                  <h2 
                    className="text-3xl md:text-5xl font-display mb-6 group-hover:text-muted-foreground transition-colors leading-[1.1]"
                    dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                  />
                  <div 
                    className="text-lg text-muted-foreground mb-10 line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                  />
                  <div className="flex items-center gap-2 font-semibold uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Featured Article
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Categories / Filter Placeholder */}
          <div className="flex flex-wrap gap-3 mb-16 pb-8 border-b border-foreground/5">
            <span className="px-6 py-2 rounded-full bg-foreground text-background text-sm font-semibold">All Posts</span>
            {categories.map((cat: any) => (
              <span 
                key={cat.id}
                className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium hover:bg-foreground/10 transition-colors cursor-pointer"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {regularPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8 border border-foreground/5 bg-foreground/5">
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-2xl opacity-10">FS</div>
                  )}
                  <div className="absolute top-6 right-6 translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white text-black p-4 rounded-full shadow-2xl">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
                    <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                    {post._embedded?.["wp:term"]?.[0]?.[0] && (
                      <span className="text-foreground/40">{post._embedded["wp:term"][0][0].name}</span>
                    )}
                  </div>
                  <h3 
                    className="text-2xl font-display mb-4 leading-tight group-hover:text-muted-foreground transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div 
                    className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:text-muted-foreground transition-colors">
                    View Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {regularPosts.length === 0 && !featuredPost && (
            <div className="py-24 text-center">
              <h2 className="text-3xl font-display mb-4">No insights yet.</h2>
              <p className="text-muted-foreground">We're busy crafting some amazing stories. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

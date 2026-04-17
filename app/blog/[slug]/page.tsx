import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getPostBySlug, getPosts } from "@/lib/wordpress";
import { format } from "date-fns";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SocialShare } from "@/components/blog/social-share";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Floxia Studio",
    };
  }

  return {
    title: `${post.title.rendered.replace(/<[^>]*>?/gm, "")} | Floxia Studio`,
    description: post.excerpt.rendered.replace(/<[^>]*>?/gm, ""),
    openGraph: {
      title: post.title.rendered.replace(/<[^>]*>?/gm, ""),
      description: post.excerpt.rendered.replace(/<[^>]*>?/gm, ""),
      type: "article",
      publishedTime: post.date,
      images: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? [post._embedded["wp:featuredmedia"][0].source_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const allPosts = await getPosts(4);
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  const postUrl = `https://floxiastudio.com/blog/${slug}`;
  const postTitle = post.title.rendered.replace(/<[^>]*>?/gm, "");

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background">
      <Navigation />

      <article className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumbs / Back */}
          <div className="mb-12 flex items-center justify-between">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground/50">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <span>/</span>
              <span className="text-foreground/40 truncate max-w-[200px]">{postTitle}</span>
            </div>
          </div>

          <div className="max-w-[1000px] mx-auto">
            {/* Post Header */}
            <header className="mb-16 text-center">
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
                {post._embedded?.["wp:term"]?.[0]?.[0] && (
                  <span className="bg-foreground/5 py-1 px-4 rounded-full border border-foreground/5 text-foreground">
                    {post._embedded["wp:term"][0][0].name}
                  </span>
                )}
              </div>
              
              <h1 
                className="text-4xl md:text-7xl font-display leading-[1] mb-12 tracking-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              {/* Author Preview */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-display">F</div>
                <div className="text-left">
                  <p className="text-sm font-bold">Floxia Team</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Agency Insights</p>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-foreground/10 shadow-2xl">
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={postTitle}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Post Layout */}
            <div className="flex flex-col lg:flex-row gap-16 relative">
              {/* Sidebar Share (Sticky) */}
              <aside className="hidden lg:block w-16">
                <div className="sticky top-32">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40 [writing-mode:vertical-lr] mb-8">Share Story</p>
                  <SocialShare postUrl={postUrl} postTitle={postTitle} layout="vertical" />
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 max-w-none">
                <div 
                  className="prose prose-invert prose-xl 
                    [&>p]:text-foreground/70 [&>p]:leading-[1.8] [&>p]:mb-10
                    [&>h2]:text-4xl [&>h2]:font-display [&>h2]:mt-20 [&>h2]:mb-8 [&>h2]:tracking-tight
                    [&>h3]:text-3xl [&>h3]:font-display [&>h3]:mt-12 [&>h3]:mb-6
                    [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-10 [&>ul>li]:relative [&>ul>li]:pl-8 [&>ul>li]:mb-4
                    [&>ul>li:before]:content-[''] [&>ul>li:before]:absolute [&>ul>li:before]:left-0 [&>ul>li:before]:top-[0.7em] [&>ul>li:before]:w-2 [&>ul>li:before]:h-2 [&>ul>li:before]:rounded-full [&>ul>li:before]:bg-foreground/20
                    [&>blockquote]:border-l-4 [&>blockquote]:border-foreground [&>blockquote]:pl-10 [&>blockquote]:italic [&>blockquote]:text-2xl [&>blockquote]:font-display [&>blockquote]:text-foreground [&>blockquote]:my-16 [&>blockquote]:bg-foreground/[0.02] [&>blockquote]:py-10 [&>blockquote]:pr-10 [&>blockquote]:rounded-r-2xl
                    [&>img]:rounded-3xl [&>img]:border [&>img]:border-foreground/10 [&>img]:shadow-2xl [&>img]:my-16
                    [&>a]:text-foreground [&>a]:underline [&>a]:underline-offset-8 [&>a]:decoration-foreground/20 [&>a]:hover:decoration-foreground [&>a]:transition-all"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* Mobile Share */}
                <div className="lg:hidden mt-20 pt-12 border-t border-foreground/5">
                  <h4 className="text-sm font-semibold uppercase tracking-widest mb-8 text-center">Share this insight</h4>
                  <SocialShare postUrl={postUrl} postTitle={postTitle} layout="horizontal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-foreground/[0.02] border-t border-foreground/5">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-3xl md:text-5xl font-display">Keep <span className="text-stroke">Reading</span></h2>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                All Stories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link 
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-foreground/10">
                    {rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                      <img
                        src={rp._embedded["wp:featuredmedia"][0].source_url}
                        alt={rp.title.rendered}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-foreground/5 flex items-center justify-center font-display opacity-10">FS</div>
                    )}
                  </div>
                  <h3 
                    className="text-xl font-display group-hover:text-muted-foreground transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: rp.title.rendered }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </main>
  );
}

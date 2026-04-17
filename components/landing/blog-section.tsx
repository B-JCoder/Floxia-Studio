"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { WPPost, getPosts } from "@/lib/wordpress";
import { format } from "date-fns";

export function BlogSection() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts(3);
      setPosts(data);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-8 w-48 bg-foreground/5 animate-pulse rounded-md mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-foreground/5 animate-pulse rounded-2xl" />
                <div className="h-6 w-3/4 bg-foreground/5 animate-pulse rounded-md" />
                <div className="h-4 w-full bg-foreground/5 animate-pulse rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-foreground/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <span className="w-8 h-px bg-foreground/20" />
              Our Blog
            </div>
            <h2 className="text-4xl md:text-6xl font-display tracking-tight leading-[0.95]">
              Insights from the <br />
              <span className="text-stroke">Digital Frontier</span>
            </h2>
          </div>
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-foreground/5">
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
                    <span className="font-display text-2xl opacity-10">FS</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white text-black p-3 rounded-full shadow-xl">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
                  <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                  {post._embedded?.["wp:term"]?.[0]?.[0] && (
                    <span className="text-foreground/40 uppercase tracking-widest">
                      {post._embedded["wp:term"][0][0].name}
                    </span>
                  )}
                </div>
                <h3 
                  className="text-xl md:text-2xl font-display mb-4 leading-tight group-hover:text-muted-foreground transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div 
                  className="text-muted-foreground text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

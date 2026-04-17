"use client";

import { Twitter, Linkedin, Facebook, Link2 } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  postUrl: string;
  postTitle: string;
  layout?: "vertical" | "horizontal";
}

export function SocialShare({ postUrl, postTitle, layout = "vertical" }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    { name: "Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}` },
    { name: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}` },
    { name: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}` },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${layout === "vertical" ? "flex-col gap-6" : "flex-row justify-center gap-6"}`}>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group relative"
          title={`Share on ${link.name}`}
        >
          <link.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute -top-10 bg-foreground text-background text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-bold">
            {link.name}
          </span>
        </a>
      ))}
      <button 
        onClick={copyToClipboard}
        className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group relative"
        title="Copy Link"
      >
        <Link2 className={`w-5 h-5 transition-transform ${copied ? "scale-0" : "scale-100"}`} />
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase transition-transform ${copied ? "scale-100" : "scale-0"}`}>
          Ok!
        </span>
        <span className="absolute -top-10 bg-foreground text-background text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-bold whitespace-nowrap">
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </button>
    </div>
  );
}

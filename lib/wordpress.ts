const WP_URL = "https://purple-eland-908811.hostingersite.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

export async function getPosts(limit = 10): Promise<WPPost[]> {
  try {
    const res = await fetch(`${WP_URL}/posts?_embed&per_page=${limit}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch posts:", res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch post by slug:", res.statusText);
      return null;
    }

    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${WP_URL}/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch categories:", res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

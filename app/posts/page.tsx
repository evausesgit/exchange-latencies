"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.blobs || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/posts/${data.name}`);
    }
  };

  const deletePost = async (name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;

    await fetch(`/api/posts/${name}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to map
        </Link>
      </div>

      <form onSubmit={createPost} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Post name..."
          className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          New Post
        </button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">
          No posts yet. Create one above!
        </p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.name}
              className="flex items-center justify-between px-4 py-3 rounded-md border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <Link
                  href={`/posts/${post.name}`}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {post.name}
                </Link>
                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                  <span>
                    {new Date(post.updated_at).toLocaleDateString()}
                  </span>
                  <span>{(post.content || "").length} chars</span>
                </div>
              </div>
              <button
                onClick={() => deletePost(post.name)}
                className="ml-4 px-3 py-1 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

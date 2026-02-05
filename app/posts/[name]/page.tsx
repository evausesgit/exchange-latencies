"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/ui/rich-text-editor";

export default function PostEditorPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const hasChanges = content !== savedContent;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${name}`);
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || "");
        setSavedContent(data.content || "");
      }
      setLoading(false);
    };

    fetchPost();
  }, [name]);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/posts/${name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSavedContent(content);
    setSaving(false);
  };

  const cancel = () => {
    router.push("/posts");
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Posts
          </Link>
          <h1 className="text-2xl font-bold">{name}</h1>
          {hasChanges && (
            <span className="text-sm text-amber-500 font-medium">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={cancel}
            className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving || !hasChanges}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="border border-border rounded-md overflow-hidden">
        <RichTextEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
}

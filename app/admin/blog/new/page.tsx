
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BlogEditor from "@/components/admin/BlogEditor";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  Send,
} from "lucide-react";

export default function NewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(
    "Hibir Specialty Dental Clinic"
  );

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFeaturedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function createPost(status: "draft" | "published") {
    setError("");

    if (!title.trim()) {
      setError("Please enter a blog title.");
      return;
    }

    if (!slug.trim()) {
      setError("Please enter a URL slug.");
      return;
    }

    if (!content.trim() || content === "<p></p>") {
      setError("Please write some blog content.");
      return;
    }

    setSaving(true);

    try {
      // 1. Check authentication
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/admin/login");
        return;
      }

      // 2. Check administrator access
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !admin) {
        setError("You do not have administrator access.");
        return;
      }

      // 3. Upload the featured image, if selected
      let imageUrl: string | null = null;

      if (featuredImage) {
        const extension =
          featuredImage.name.split(".").pop() || "jpg";

        const fileName = `${crypto.randomUUID()}.${extension}`;
        const filePath = `blog/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, featuredImage, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          setError(`Image upload failed: ${uploadError.message}`);
          return;
        }

        const { data } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // 4. Create the blog post
      const { data: newPost, error: insertError } = await supabase
        .from("blog_posts")
        .insert(({
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim() || null,
          content,
          featured_image: imageUrl,
          category: category.trim() || null,
          author: author.trim() || "Hibir Specialty Dental Clinic",
          status,
          published_at:
            status === "published"
              ? new Date().toISOString()
              : null,
        } as never))
        .select("id")
        .single();

      if (insertError) {
        console.error(insertError);
        setError(
          `Failed to create blog post: ${insertError.message}`
        );
        return;
      }

      // 5. Redirect after successful creation
      // 5. Redirect after successful creation
if (!insertError) {
  router.push("/admin/blog");
  router.refresh();
}
    } catch (error) {
      console.error(error);
      setError(
        "Something went wrong while creating the blog post."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/admin/blog"
              className="text-xl font-bold text-slate-900"
            >
              Hibir Admin
            </Link>

            <p className="mt-1 text-xs text-slate-500">
              Create New Blog Post
            </p>
          </div>

          <Link
            href="/admin/blog"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Blog Post
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Write and publish a new Hibir Specialty Dental Clinic article.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title and slug */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Blog Title *
              </label>

              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold focus:border-amber-500 focus:outline-none"
              />

              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  URL Slug *
                </label>

                <div className="flex">
                  <span className="rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-3 py-3 text-xs text-slate-500">
                    /blog/
                  </span>

                  <input
                    value={slug}
                    onChange={(e) =>
                      setSlug(generateSlug(e.target.value))
                    }
                    placeholder="your-blog-title"
                    className="min-w-0 flex-1 rounded-r-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Excerpt */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Short Description
              </label>

              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={4}
                placeholder="Write a short description for the article..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
              />
            </section>

            {/* Rich text editor */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <label className="mb-3 block text-xs font-bold text-slate-700">
                Blog Content *
              </label>

              <BlogEditor value={content} onChange={setContent} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Featured image */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-bold text-slate-900">
                Featured Image
              </h2>

              <label className="block cursor-pointer">
                <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Featured image preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="mx-auto mb-2 h-8 w-8 text-slate-300" />

                      <p className="text-xs font-semibold text-slate-500">
                        Upload Image
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        JPG, PNG or WebP
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </section>

            {/* Post settings */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-bold text-slate-900">
                Post Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Category
                  </label>

                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Dental Health"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Author
                  </label>

                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Publish actions */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-bold text-slate-900">
                Publish
              </h2>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => createPost("draft")}
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => createPost("published")}
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold disabled:opacity-60"
                  style={{
                    backgroundColor: "#ff9900",
                    color: "#0f172a",
                  }}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Publish Post
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

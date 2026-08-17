"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BlogEditor from "@/components/admin/BlogEditor";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  Send,
  Trash2,
} from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string | null;
  author: string | null;
  status: "draft" | "published";
  published_at: string | null;
};

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();

  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(
    "Hibir Specialty Dental Clinic"
  );

  const [status, setStatus] = useState<
    "draft" | "published"
  >("draft");

  const [publishedAt, setPublishedAt] = useState<
    string | null
  >(null);

  const [featuredImage, setFeaturedImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(
    null
  );

  const [imagePreview, setImagePreview] = useState("");

  const [error, setError] = useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // ========================================
  // LOAD POST
  // ========================================

  async function loadPost() {
    setLoading(true);
    setError("");

    try {
      // Check authentication

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/admin/login");
        return;
      }

      // Check admin

      const { data: admin, error: adminError } =
        await supabase
          .from("admin_users")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

      if (adminError || !admin) {
        await supabase.auth.signOut();

        router.replace("/admin/login");

        return;
      }

      // Get blog post

      const { data, error: postError } =
        await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .single();

      if (postError || !data) {
        console.error(postError);

        setError(
          "Blog post could not be found."
        );

        setLoading(false);

        return;
      }

      const post = data as BlogPost;

      setTitle(post.title || "");
      setSlug(post.slug || "");
      setExcerpt(post.excerpt || "");
      setContent(post.content || "");
      setCategory(post.category || "");

      setAuthor(
        post.author ||
          "Hibir Specialty Dental Clinic"
      );

      setStatus(post.status || "draft");

      setPublishedAt(
        post.published_at || null
      );

      setFeaturedImage(
        post.featured_image || ""
      );

      setImagePreview(
        post.featured_image || ""
      );

      setLoading(false);

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while loading the post."
      );

      setLoading(false);
    }
  }

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  // ========================================
  // IMAGE
  // ========================================

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setNewImage(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  }

  // ========================================
  // SAVE POST
  // ========================================

  async function savePost(
    newStatus?: "draft" | "published"
  ) {
    setError("");

    if (!title.trim()) {
      setError("Please enter a blog title.");
      return;
    }

    if (!slug.trim()) {
      setError("Please enter a URL slug.");
      return;
    }

    if (
      !content.trim() ||
      content === "<p></p>"
    ) {
      setError("Please write some blog content.");
      return;
    }

    setSaving(true);

    try {
      // --------------------------------
      // Authentication
      // --------------------------------

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/admin/login");
        return;
      }

      // --------------------------------
      // Admin check
      // --------------------------------

      const { data: admin, error: adminError } =
        await supabase
          .from("admin_users")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

      if (adminError || !admin) {
        setError(
          "You do not have administrator access."
        );

        setSaving(false);

        return;
      }

      // --------------------------------
      // Image
      // --------------------------------

      let imageUrl =
        featuredImage || null;

      if (newImage) {
        const extension =
          newImage.name.split(".").pop() ||
          "jpg";

        const fileName = `${crypto.randomUUID()}.${extension}`;

        const filePath = `blog/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("blog-images")
            .upload(
              filePath,
              newImage,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

        if (uploadError) {
          setError(
            `Image upload failed: ${uploadError.message}`
          );

          setSaving(false);

          return;
        }

        const { data } =
          supabase.storage
            .from("blog-images")
            .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // --------------------------------
      // Determine status
      // --------------------------------

      const finalStatus =
        newStatus || status;

      // --------------------------------
      // Update
      // --------------------------------

      const updateData = {
        title: title.trim(),

        slug: slug.trim(),

        excerpt:
          excerpt.trim() || null,

        content,

        featured_image: imageUrl,

        category:
          category.trim() || null,

        author:
          author.trim() ||
          "Hibir Specialty Dental Clinic",

        status: finalStatus,

        published_at:
          finalStatus === "published"
            ? publishedAt ||
              new Date().toISOString()
            : null,

        updated_at:
          new Date().toISOString(),
      };

      const { error: updateError } =
        await supabase
          .from("blog_posts")
          .update(updateData)
          .eq("id", postId);

      if (updateError) {
        console.error(updateError);

        setError(
          `Failed to update post: ${updateError.message}`
        );

        setSaving(false);

        return;
      }

      // --------------------------------
      // Success
      // --------------------------------

      router.push("/admin/blog");

      router.refresh();

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while saving the post."
      );

      setSaving(false);
    }
  }

  // ========================================
  // DELETE
  // ========================================

  async function deletePost() {
    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this blog post?"
      );

    if (!confirmed) return;

    setSaving(true);
    setError("");

    try {
      const { error: deleteError } =
        await supabase
          .from("blog_posts")
          .delete()
          .eq("id", postId);

      if (deleteError) {
        setError(
          `Failed to delete post: ${deleteError.message}`
        );

        setSaving(false);

        return;
      }

      router.push("/admin/blog");

      router.refresh();

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while deleting the post."
      );

      setSaving(false);
    }
  }

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">

        <Loader2 className="w-7 h-7 animate-spin text-amber-500" />

      </main>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <Link
              href="/admin/blog"
              className="text-xl font-bold text-slate-900"
            >
              Hibir Admin
            </Link>

            <p className="text-xs text-slate-500 mt-1">
              Edit Blog Post
            </p>

          </div>

          <Link
            href="/admin/blog"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
          >

            <ArrowLeft className="w-4 h-4" />

            Back to Blog

          </Link>

        </div>

      </header>

      {/* Main */}

      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-8">

          <h1 className="text-2xl font-bold text-slate-900">
            Edit Blog Post
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Update your Hibir dental article.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ================================= */}
          {/* MAIN */}
          {/* ================================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* Title */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <label className="block text-xs font-bold text-slate-700 mb-2">
                Blog Title *
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-lg font-semibold focus:outline-none focus:border-amber-500"
              />

              {/* Slug */}

              <div className="mt-5">

                <label className="block text-xs font-bold text-slate-700 mb-2">
                  URL Slug *
                </label>

                <div className="flex">

                  <span className="px-3 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500">
                    /blog/
                  </span>

                  <input
                    value={slug}
                    onChange={(e) =>
                      setSlug(
                        generateSlug(
                          e.target.value
                        )
                      )
                    }
                    className="flex-1 px-4 py-3 rounded-r-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  />

                </div>

              </div>

            </section>

            {/* Excerpt */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <label className="block text-xs font-bold text-slate-700 mb-2">
                Short Description
              </label>

              <textarea
                value={excerpt}
                onChange={(e) =>
                  setExcerpt(
                    e.target.value
                  )
                }
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm resize-none focus:outline-none focus:border-amber-500"
              />

            </section>

            {/* Rich Text Editor */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <label className="block text-xs font-bold text-slate-700 mb-3">
                Blog Content *
              </label>

              <BlogEditor
                value={content}
                onChange={setContent}
              />

            </section>

          </div>

          {/* ================================= */}
          {/* SIDEBAR */}
          {/* ================================= */}

          <aside className="space-y-6">

            {/* Image */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <h2 className="text-sm font-bold text-slate-900 mb-4">
                Featured Image
              </h2>

              <label className="block cursor-pointer">

                <div className="aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">

                      <ImagePlus className="w-8 h-8 text-slate-300 mx-auto mb-2" />

                      <p className="text-xs font-semibold text-slate-500">
                        Upload Image
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

            {/* Settings */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <h2 className="text-sm font-bold text-slate-900 mb-4">
                Post Settings
              </h2>

              <div className="space-y-4">

                {/* Category */}

                <div>

                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Category
                  </label>

                  <input
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  />

                </div>

                {/* Author */}

                <div>

                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Author
                  </label>

                  <input
                    value={author}
                    onChange={(e) =>
                      setAuthor(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  />

                </div>

              </div>

            </section>

            {/* Status */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <h2 className="text-sm font-bold text-slate-900 mb-4">
                Post Status
              </h2>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "draft"
                      | "published"
                  )
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              >

                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

              </select>

            </section>

            {/* Actions */}

            <section className="bg-white rounded-3xl border border-slate-200 p-6">

              <h2 className="text-sm font-bold text-slate-900 mb-4">
                Actions
              </h2>

              <div className="space-y-3">

                {/* Save Draft */}

                <button
                  type="button"
                  onClick={() =>
                    savePost("draft")
                  }
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                >

                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}

                  Save Draft

                </button>

                {/* Publish */}

                <button
                  type="button"
                  onClick={() =>
                    savePost("published")
                  }
                  disabled={saving}
                  className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{
                    backgroundColor: "#ff9900",
                    color: "#0f172a",
                  }}
                >

                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}

                  Publish Changes

                </button>

                {/* Delete */}

                <button
                  type="button"
                  onClick={deletePost}
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold flex items-center justify-center gap-2 hover:bg-rose-100 disabled:opacity-60"
                >

                  <Trash2 className="w-4 h-4" />

                  Delete Post

                </button>

              </div>

            </section>

          </aside>

        </div>

      </div>

    </main>
  );
}
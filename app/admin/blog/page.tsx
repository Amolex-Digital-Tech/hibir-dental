"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Search,
  FileText,
  Pencil,
  Trash2,
  ExternalLink,
  LogOut,
  Loader2,
  CheckCircle2,
  Clock3,
  BookOpen,
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
  created_at: string;
  updated_at: string;
};

export default function AdminBlogPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  async function checkAdminAndLoadPosts() {
    setLoading(true);

    // Check logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.replace("/admin/login");
      return;
    }

    // Check admin access
    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    // Load posts
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load blog posts:", error);
    } else {
      setPosts(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    checkAdminAndLoadPosts();
  }, []);

  async function deletePost(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post? This cannot be undone."
    );

    if (!confirmed) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete failed:", error);
      alert(`Failed to delete post: ${error.message}`);
      setDeletingId(null);
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== id));

    setDeletingId(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function formatDate(date: string | null) {
    if (!date) return "Not published";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const publishedCount = posts.filter(
    (post) => post.status === "published"
  ).length;

  const draftCount = posts.filter(
    (post) => post.status === "draft"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <Link
              href="/admin/appointments"
              className="text-xl font-bold text-slate-900"
            >
              Hibir Admin
            </Link>

            <p className="text-xs text-slate-500 mt-1">
              Blog Management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/appointments"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Appointments
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Blog Posts
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create and manage Hibir Specialty Dental Clinic articles.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md"
            style={{
              backgroundColor: "#ff9900",
              color: "#0f172a",
            }}
          >
            <Plus className="w-4 h-4" />
            Create New Post
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Total Posts
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {posts.length}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Published
                </p>

                <p className="text-2xl font-bold text-emerald-600 mt-2">
                  {publishedCount}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Drafts
                </p>

                <p className="text-2xl font-bold text-amber-600 mt-2">
                  {draftCount}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blog posts..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setStatusFilter("published")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  statusFilter === "published"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Published
              </button>

              <button
                onClick={() => setStatusFilter("draft")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  statusFilter === "draft"
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Drafts
              </button>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">
              {statusFilter === "all"
                ? "All Blog Posts"
                : statusFilter === "published"
                ? "Published Posts"
                : "Draft Posts"}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-24 px-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-slate-400" />
              </div>

              <h3 className="font-bold text-slate-800">
                No blog posts found
              </h3>

              <p className="text-sm text-slate-500 mt-1 mb-5">
                {posts.length === 0
                  ? "Create your first Hibir blog post."
                  : "Try changing your search or filter."}
              </p>

              {posts.length === 0 && (
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: "#ff9900",
                    color: "#0f172a",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Create First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-5">
                    {/* Image */}
                    <div className="w-full lg:w-48 h-32 shrink-0 rounded-2xl bg-slate-100 overflow-hidden">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-2.5 py-1 rounded-full border text-[10px] font-bold capitalize ${
                            post.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {post.status}
                        </span>

                        {post.category && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                            {post.category}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-400">
                        <span>
                          Created {formatDate(post.created_at)}
                        </span>

                        {post.status === "published" && (
                          <span>
                            Published {formatDate(post.published_at)}
                          </span>
                        )}

                        {post.author && (
                          <span>
                            By {post.author}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </Link>

                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View
                          </Link>
                        )}

                        <button
                          onClick={() => deletePost(post.id)}
                          disabled={deletingId === post.id}
                          className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 disabled:opacity-60"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}

                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
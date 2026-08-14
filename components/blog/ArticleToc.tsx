"use client";

import { List } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface ArticleTocProps {
  items: TocItem[];
}

export function ArticleToc({ items }: ArticleTocProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <List className="h-4 w-4" />
        </div>

        <h2 className="text-sm font-bold text-slate-900">
          In This Article
        </h2>
      </div>

      <nav aria-label="Table of contents">
        <ol className="space-y-1">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex gap-3 rounded-lg px-3 py-2 text-sm leading-5 text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
              >
                <span className="shrink-0 text-xs font-semibold text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

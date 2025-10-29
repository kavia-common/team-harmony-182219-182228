"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { selectSavedRecommendations } from "@/state/selectors";
import { Button } from "@/components/ui/Button";

/**
 * PUBLIC_INTERFACE
 * SavedList
 * Renders saved recommendations from global state with the ability to remove items.
 * - If empty, shows a friendly empty state with CTA to explore recommendations.
 */
export default function SavedList() {
  const saved = useAppSelector(selectSavedRecommendations);
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch({ type: "recs/toggleSaved", payload: { id } });
  };

  if (!saved || saved.length === 0) {
    return (
      <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-gray-50 flex items-center justify-center mb-3">
            <span className="text-[#2563EB] text-xl">★</span>
          </div>
          <h3 className="text-lg font-semibold text-[#111827]">No saved picks yet</h3>
          <p className="text-gray-600 mt-1">
            Explore recommendations and save your favorites for quick access.
          </p>
          <Link href="/recommendations" className="inline-block mt-4">
            <Button className="bg-[#2563EB] hover:bg-blue-600 text-white">
              Discover activities
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#111827]">Saved picks</h3>
        <span className="text-sm text-gray-500">{saved.length} saved</span>
      </div>
      <ul className="divide-y divide-gray-100">
        {saved.map((item) => (
          <li key={item.id} className="py-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[#111827] font-medium truncate">{item.title}</p>
                {item.difficulty && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100">
                    {item.difficulty}
                  </span>
                )}
              </div>
              {item.tags?.length ? (
                <p className="text-sm text-gray-500 mt-0.5">{item.tags.join(", ")}</p>
              ) : null}
              {item.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <Button
                className="text-[#EF4444] border border-red-200 hover:bg-red-50 bg-white"
                onClick={() => handleRemove(item.id)}
                aria-label={`Remove ${item.title}`}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <Link href="/recommendations" className="text-sm text-[#2563EB] hover:underline">
          Add more picks
        </Link>
      </div>
    </div>
  );
}

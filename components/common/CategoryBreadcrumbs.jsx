import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CategoryBreadcrumbs({ breadcrumbs, className }) {
  const allBreadcrumbs = [
    breadcrumbs[breadcrumbs.length - 1]
  ];

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 font-semibold text-gray-300",
        className
      )}
    >
      {allBreadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center gap-3">
          <h1 className="text-primary1 text-5xl font-extrabold">
            {breadcrumb.label
              ?.replaceAll("%20", " ")
              ?.replaceAll("%E2%80%99", "'")
              ?.replaceAll("%E2%80%93", "-")}
          </h1>
        </span>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Breadcrumbs({ breadcrumbs, className }) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-start  lg:justify-center py-2 font-semibold text-gray-300",
        className
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronsRight className="w-5" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-white">
              {breadcrumb.label
                ?.replaceAll("%20", " ")
                ?.replaceAll("%E2%80%99", "'")
                ?.replaceAll("%E2%80%93", "-")}
            </span>
          ) : (
            <Link
              title={breadcrumb.label
                ?.replaceAll(" ", "-")
                ?.replaceAll("%20", "-")
                ?.replaceAll("%E2%80%99", "'")
                ?.replaceAll("%E2%80%93", "-")}
              href={breadcrumb.url}
              className="transition-all"
            >
              {breadcrumb.label
                ?.replaceAll("%20", " ")
                ?.replaceAll("%E2%80%99", "'")}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";

import { Nav } from "@/components/nav";
import { removeLocaleFromPath } from "@/lib/i18n";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return <Nav className="max-sm:hidden" items={items} activeId={removeLocaleFromPath(pathname)} />;
}

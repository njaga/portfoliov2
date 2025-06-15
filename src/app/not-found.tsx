import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { NdiagaMark } from "@/components/ndiaga-mark";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <NdiagaMark className="h-28 w-28 text-muted-foreground" />

      <h1 className="mt-8 mb-6 text-8xl font-medium">404</h1>

      <Button variant="link" asChild>
        <Link href="/">
          Go to Home
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}

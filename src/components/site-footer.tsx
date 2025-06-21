import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

import { NdiagaMark } from "./ndiaga-mark";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 pb-[env(safe-area-inset-bottom,0px)] md:max-w-3xl">
        <p className="mb-1 text-center font-mono text-sm text-balance text-muted-foreground">
          Crafted with passion in Dakar, Senegal 🇸🇳
        </p>

        <p className="mb-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="link"
            href="https://www.linkedin.com/in/ndiagandiaye"
            target="_blank"
            rel="noopener"
          >
            Ndiaga Ndiaye
          </a>
          . The source code is available on{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>

        <div className="flex justify-center pb-5">
          <NdiagaMark className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground" />
        </div>
      </div>
    </footer>
  );
}

"use client";

import { ChevronUpIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollTop({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 400);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            className={cn(
              "[--bottom:1rem] lg:[--bottom:2rem]",
              "fixed right-4 bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] z-50 size-10 lg:right-8",
              className
            )}
            variant="secondary"
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            {...props}
          >
            <ChevronUpIcon className="size-6" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

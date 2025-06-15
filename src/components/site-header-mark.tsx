"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { NdiagaMark } from "./ndiaga-mark";

export function SiteHeaderMark() {
  const pathname = usePathname();
  return pathname === "/" ? <NdiagaMarkMotion /> : <NdiagaMark />;
}

function NdiagaMarkMotion() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const distanceRef = useRef(160);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= distanceRef.current);
  });

  useEffect(() => {
    const coverMark = document.getElementById("js-cover-mark");
    if (!coverMark) return;

    distanceRef.current = calcDistance(coverMark);

    const resizeObserver = new ResizeObserver(() => {
      distanceRef.current = calcDistance(coverMark);
    });
    resizeObserver.observe(coverMark);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1066.68 1460.56"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 8,
      }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <style>
          {`
            .cls-1 {
              fill: currentColor;
              font-family: 'Rubik Glitch', monospace;
              font-size: 1262.37px;
            }
          `}
        </style>
      </defs>
      <g id="Calque_1-2" data-name="Calque_1">
        <text className="cls-1" transform="translate(76.99 1073)">
          <tspan x="0" y="0">N</tspan>
        </text>
      </g>
    </motion.svg>
  );
}

const calcDistance = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;
  const headerHeight = 56;
  return scrollTop + rect.top + rect.height - headerHeight;
};

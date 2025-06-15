import {
  IBM_Plex_Mono as FontMono,
  IBM_Plex_Sans as FontSans,
  Rubik_Glitch as FontGlitch,
} from "next/font/google";

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--cd-font-sans",
});

export const fontMono = FontMono({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--cd-font-mono",
});

export const fontGlitch = FontGlitch({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  variable: "--nd-font-glitch",
});

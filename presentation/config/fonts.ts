import { Fira_Code as FontMono, Inter as FontSans, Urbanist as FontUrbanist } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontUrbanist = FontUrbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});


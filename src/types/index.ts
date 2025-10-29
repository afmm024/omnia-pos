import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ChartData {
  date: string;
  [key: string]: number | string;
}

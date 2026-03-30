/** biome-ignore-all lint/a11y/noSvgWithoutTitle: no title */

import type { JSX } from 'solid-js';

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

export function PrusaXlBedSvg(props: Props) {
  return (
    <svg
      viewBox="0 0 360 360"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="359"
        height="359"
        rx="14"
        fill="#2f3337"
        stroke="#5a6168"
        stroke-width="1"
      />
      <rect
        x="8"
        y="8"
        width="344"
        height="344"
        rx="10"
        fill="#3b4045"
      />
      <g
        stroke="#a3adb8"
        stroke-width="1.5"
        opacity="0.35"
      >
        <path d="M90 8v344M180 8v344M270 8v344" />
        <path d="M8 90h344M8 180h344M8 270h344" />
      </g>
      <circle
        cx="180"
        cy="180"
        r="4"
        fill="#d1d5db"
        opacity="0.7"
      />
    </svg>
  );
}

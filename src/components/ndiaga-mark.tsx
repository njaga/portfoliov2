export function NdiagaMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      id="Calque_2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1066.68 1460.56"
      {...props}
    >
      <defs>
        <style>
          {`
            .cls-1 {
              fill: currentColor;
              font-family: var(--font-glitch);
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
    </svg>
  );
}

export function NdiagaWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 400"
      {...props}
    >
      <text
        x="50"
        y="250"
        fill="currentColor"
        fontSize="180"
        fontFamily="var(--font-glitch)"
        fontWeight="bold"
      >
        Ndiaga Ndiaye
      </text>
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg id="Calque_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1066.68 1460.56">
    <defs>
      <style>
        .cls-1 {
          fill: ${color};
          font-family: 'Rubik Glitch', monospace;
          font-size: 1262.37px;
        }
      </style>
    </defs>
    <g id="Calque_1-2" data-name="Calque_1">
      <text class="cls-1" transform="translate(76.99 1073)">
        <tspan x="0" y="0">N</tspan>
      </text>
    </g>
  </svg>`;
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 400">
    <text x="50" y="250" fill="${color}" font-size="180" font-family="'Rubik Glitch', monospace" font-weight="bold">
      Ndiaga Ndiaye
    </text>
  </svg>`;
} 
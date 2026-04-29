import type { PortfolioPoint } from "@/lib/types";

export function PortfolioChart({ data }: { data: PortfolioPoint[] }) {
  const min = Math.min(...data.map((point) => point.value));
  const max = Math.max(...data.map((point) => point.value));
  const spread = Math.max(max - min, 1);
  const points = data
    .map((point, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const y = 86 - ((point.value - min) / spread) * 70;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,100 ${points} 100,100`;

  return (
    <div className="h-72 min-h-72 min-w-0 rounded-2xl bg-white/5 p-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="portfolio-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3EF7B4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3EF7B4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={area} fill="url(#portfolio-fill)" stroke="none" />
        <polyline points={points} fill="none" stroke="#3EF7B4" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-3 flex justify-between text-xs text-slate-500">
        {data.map((point) => <span key={point.date}>{point.date}</span>)}
      </div>
    </div>
  );
}

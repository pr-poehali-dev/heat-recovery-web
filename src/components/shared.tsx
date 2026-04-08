import { useState, useEffect, useRef } from "react";

export const heroImage =
  "https://cdn.poehali.dev/projects/4eb27b1f-1b0b-4958-a370-ddd973be8be9/files/72a72a08-40c6-4d7a-be33-dde8c7cf2ff3.jpg";

export const sections = [
  { id: "hero", label: "Главная" },
  { id: "how-it-works", label: "Как работает" },
  { id: "calculator", label: "Калькулятор" },
  { id: "results", label: "Результаты" },
  { id: "about", label: "О ТЭЦ" },
];

export function AnimatedNumber({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">
          {label}
        </span>
        <span className="text-[var(--c-green)] font-mono font-bold text-lg">
          {value.toLocaleString("ru-RU")} {unit}
        </span>
      </div>
      <div className="relative h-2 bg-[var(--c-grid)] rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--c-blue)] to-[var(--c-green)] rounded-full transition-all"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

export function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-[var(--c-blue)]" />
        <span className="text-[var(--c-blue)] text-xs font-mono uppercase tracking-widest">
          {tag}
        </span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-[var(--c-muted)] max-w-2xl leading-relaxed">{subtitle}</p>
    </div>
  );
}

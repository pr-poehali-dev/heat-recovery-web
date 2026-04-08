import Icon from "@/components/ui/icon";
import { heroImage, sections } from "@/components/shared";

interface HeroSectionProps {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function HeroSection({
  activeSection,
  menuOpen,
  setMenuOpen,
  scrollTo,
}: HeroSectionProps) {
  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{
                background: "var(--c-blue-dim)",
                border: "1px solid var(--c-blue)",
              }}
            >
              <Icon name="Zap" size={14} className="text-[var(--c-blue)]" />
            </div>
            <span className="font-display text-sm uppercase tracking-widest text-white">
              ТЭЦ Альметьевск
            </span>
            <span className="hidden sm:block text-[var(--c-muted)] text-xs font-mono ml-1">
              / Тепловые насосы
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeSection === s.id
                    ? "text-[var(--c-green)] border border-[var(--c-green-dim)] bg-[var(--c-green-dim)]"
                    : "text-[var(--c-muted)] hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            className="lg:hidden text-[var(--c-muted)] hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-[var(--c-border)] bg-[var(--c-bg)]/95 px-6 py-3 flex flex-col gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-left px-3 py-2 text-sm font-mono uppercase tracking-wider text-[var(--c-muted)] hover:text-white"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-14">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="ТЭЦ Альметьевск"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-bg)] via-[var(--c-bg)]/80 to-[var(--c-bg)]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--c-green-dim)] bg-[var(--c-green-dim)] mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--c-green)] animate-pulse" />
              <span className="text-[var(--c-green)] text-xs font-mono uppercase tracking-widest">
                Система работает · Онлайн
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none uppercase tracking-tight">
              Тепловые
              <br />
              <span className="text-gradient">насосы</span>
              <br />
              на ТЭЦ
            </h1>
            <p className="text-[var(--c-muted)] text-lg leading-relaxed mb-8 max-w-xl">
              Утилизация сбросного тепла ТЭЦ Альметьевска — снижение затрат на
              теплоснабжение до 40% и сокращение выбросов CO₂
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("calculator")}
                className="px-6 py-3 rounded font-mono text-sm uppercase tracking-wider text-[var(--c-bg)] font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, var(--c-blue), var(--c-green))",
                }}
              >
                Рассчитать экономию
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="px-6 py-3 rounded font-mono text-sm uppercase tracking-wider text-white border border-[var(--c-border)] hover:border-[var(--c-blue)] transition-all duration-200"
              >
                Как это работает
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { val: "3.8×", label: "COP", desc: "Эффективность насоса" },
              { val: "89 млн", label: "₽ / год", desc: "Экономия в 2024" },
              { val: "241 ГВт·ч", label: "тепла", desc: "Утилизировано" },
              { val: "62 300 т", label: "CO₂", desc: "Выбросов сэкономлено" },
            ].map((k, i) => (
              <div key={i} className="card-panel p-4">
                <div
                  className="text-xl font-display font-bold mb-0.5"
                  style={{
                    color: i % 2 === 0 ? "var(--c-green)" : "var(--c-blue)",
                  }}
                >
                  {k.val}
                </div>
                <div className="text-xs font-mono text-[var(--c-muted)] uppercase tracking-wider">
                  {k.label}
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-1 opacity-70">{k.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

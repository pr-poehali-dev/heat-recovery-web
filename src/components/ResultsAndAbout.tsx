import Icon from "@/components/ui/icon";
import { AnimatedNumber, SectionHeader } from "@/components/shared";

function Results() {
  const data = [
    { year: "2020", saving: 12 },
    { year: "2021", saving: 28 },
    { year: "2022", saving: 45 },
    { year: "2023", saving: 67 },
    { year: "2024", saving: 89 },
  ];
  const maxSaving = Math.max(...data.map((d) => d.saving));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 bg-[var(--c-green)]" />
          <h3 className="font-display text-xl text-white uppercase tracking-widest">
            Экономия по годам, млн ₽
          </h3>
        </div>
        <div className="flex items-end gap-3 h-48">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[var(--c-green)] font-mono text-xs font-bold">{d.saving}</span>
              <div
                className="w-full rounded-t transition-all duration-700"
                style={{
                  height: `${(d.saving / maxSaving) * 100}%`,
                  background: `linear-gradient(to top, var(--c-blue), var(--c-green))`,
                }}
              />
              <span className="text-[var(--c-muted)] font-mono text-xs">{d.year}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="card-panel p-5 flex-1 flex flex-col justify-center">
          <div className="text-4xl font-display text-[var(--c-green)] font-bold mb-1">
            <AnimatedNumber target={89} suffix=" млн" />
          </div>
          <div className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">
            ₽ Экономия за 2024
          </div>
        </div>
        <div className="card-panel p-5 flex-1 flex flex-col justify-center">
          <div className="text-4xl font-display text-[var(--c-cyan)] font-bold mb-1">
            <AnimatedNumber target={241} suffix=" ГВт·ч" />
          </div>
          <div className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">
            Тепло утилизировано
          </div>
        </div>
        <div className="card-panel p-5 flex-1 flex flex-col justify-center">
          <div className="text-3xl font-display text-[var(--c-blue)] font-bold mb-1">
            <AnimatedNumber target={62300} suffix=" т" />
          </div>
          <div className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">
            CO₂ не выброшено
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  const facts = [
    { icon: "Factory", label: "Тип объекта", value: "Теплоэлектроцентраль (ТЭЦ)" },
    { icon: "MapPin", label: "Расположение", value: "г. Альметьевск, Республика Татарстан" },
    { icon: "Zap", label: "Электрическая мощность", value: "120 МВт" },
    { icon: "Flame", label: "Тепловая мощность", value: "380 Гкал/ч" },
    { icon: "Users", label: "Теплоснабжение", value: "Более 180 000 жителей" },
    { icon: "Calendar", label: "Год запуска ТН", value: "2020" },
    { icon: "TrendingUp", label: "Мощность насосов", value: "12 МВт (1-я очередь)" },
    { icon: "Leaf", label: "Снижение выбросов CO₂", value: "До 35% от базового уровня" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {facts.map((f, i) => (
        <div
          key={i}
          className="card-panel p-5 group hover:border-[var(--c-blue)] transition-colors duration-300"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
            style={{ background: "var(--c-blue-dim)", border: "1px solid var(--c-blue-dim)" }}
          >
            <Icon name={f.icon} fallback="Circle" size={20} className="text-[var(--c-blue)]" />
          </div>
          <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-1">
            {f.label}
          </div>
          <div className="text-white font-semibold text-sm leading-snug">{f.value}</div>
        </div>
      ))}
    </div>
  );
}

export default function ResultsAndAbout() {
  return (
    <>
      {/* RESULTS */}
      <section id="results" className="relative z-10 py-24 border-t border-[var(--c-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Данные по применению"
            title="Результаты эксплуатации"
            subtitle="Накопленная статистика за 5 лет применения тепловых насосов на ТЭЦ Альметьевска"
          />
          <Results />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-24 border-t border-[var(--c-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Информация об объекте"
            title="ТЭЦ Альметьевска"
            subtitle="Основные характеристики теплоэлектроцентрали и проекта внедрения тепловых насосов"
          />
          <About />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[var(--c-border)] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: "var(--c-blue-dim)", border: "1px solid var(--c-blue)" }}
            >
              <Icon name="Zap" size={12} className="text-[var(--c-blue)]" />
            </div>
            <span className="text-xs font-mono text-[var(--c-muted)] uppercase tracking-widest">
              ТЭЦ Альметьевск · Тепловые насосы · 2026
            </span>
          </div>
          <div className="text-xs font-mono text-[var(--c-muted)] opacity-50">
            Все данные носят информационный характер
          </div>
        </div>
      </footer>
    </>
  );
}

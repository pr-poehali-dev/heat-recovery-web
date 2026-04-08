import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const heroImage = "https://cdn.poehali.dev/projects/4eb27b1f-1b0b-4958-a370-ddd973be8be9/files/72a72a08-40c6-4d7a-be33-dde8c7cf2ff3.jpg";

const sections = [
  { id: "hero", label: "Главная" },
  { id: "how-it-works", label: "Как работает" },
  { id: "calculator", label: "Калькулятор" },
  { id: "results", label: "Результаты" },
  { id: "about", label: "О ТЭЦ" },
];

function AnimatedNumber({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value.toLocaleString("ru-RU")}{suffix}</span>;
}

function SliderInput({ label, value, onChange, min, max, step, unit }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">{label}</span>
        <span className="text-[var(--c-green)] font-mono font-bold text-lg">{value.toLocaleString("ru-RU")} {unit}</span>
      </div>
      <div className="relative h-2 bg-[var(--c-grid)] rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--c-blue)] to-[var(--c-green)] rounded-full transition-all"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

function Calculator() {
  const [heatLoad, setHeatLoad] = useState(500);
  const [gasPrice, setGasPrice] = useState(7.5);
  const [electricPrice, setElectricPrice] = useState(4.8);
  const [hours, setHours] = useState(5000);

  const cop = 3.8;
  const gasThermal = 8.5;
  const gasConsumption = (heatLoad * hours) / gasThermal;
  const gasCost = gasConsumption * gasPrice;
  const electricConsumption = (heatLoad / cop) * hours;
  const electricCost = electricConsumption * electricPrice;
  const annualSaving = gasCost - electricCost;
  const co2Saved = Math.round(gasConsumption * 2.04);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 bg-[var(--c-blue)]" />
          <h3 className="font-display text-xl text-white uppercase tracking-widest">Параметры объекта</h3>
        </div>
        <SliderInput label="Тепловая мощность" value={heatLoad} onChange={setHeatLoad} min={50} max={5000} step={50} unit="кВт" />
        <SliderInput label="Цена газа" value={gasPrice} onChange={setGasPrice} min={3} max={20} step={0.1} unit="₽/м³" />
        <SliderInput label="Цена электричества" value={electricPrice} onChange={setElectricPrice} min={2} max={12} step={0.1} unit="₽/кВт·ч" />
        <SliderInput label="Часов работы в год" value={hours} onChange={setHours} min={1000} max={8760} step={100} unit="ч" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="card-panel p-6 border-[var(--c-green)] flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-[var(--c-green)]" />
            <h3 className="font-display text-xl text-white uppercase tracking-widest">Результат расчёта</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--c-surface)] rounded-lg p-4 border border-[var(--c-border)]">
              <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-1">Затраты на газ</div>
              <div className="text-2xl font-display text-red-400 font-bold">{Math.round(gasCost / 1000).toLocaleString("ru-RU")}</div>
              <div className="text-xs text-[var(--c-muted)] font-mono">тыс. ₽ / год</div>
            </div>
            <div className="bg-[var(--c-surface)] rounded-lg p-4 border border-[var(--c-border)]">
              <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-1">Затраты на насос</div>
              <div className="text-2xl font-display text-[var(--c-green)] font-bold">{Math.round(electricCost / 1000).toLocaleString("ru-RU")}</div>
              <div className="text-xs text-[var(--c-muted)] font-mono">тыс. ₽ / год</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[var(--c-green-dim)] to-[var(--c-blue-dim)] rounded-lg p-5 border border-[var(--c-green-dim)]">
            <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-widest mb-1">Годовая экономия</div>
            <div className="text-4xl font-display text-[var(--c-green)] font-bold">
              {annualSaving > 0
                ? `${Math.round(annualSaving / 1000).toLocaleString("ru-RU")} тыс. ₽`
                : "Пересмотрите параметры"}
            </div>
            {annualSaving > 0 && (
              <div className="text-sm text-[var(--c-muted)] mt-1 font-mono">
                ≈ {Math.round(annualSaving / 12000).toLocaleString("ru-RU")} тыс. ₽ / месяц
              </div>
            )}
          </div>
        </div>
        <div className="card-panel p-5 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-display text-[var(--c-blue)] font-bold">{cop}x</div>
            <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1">COP теплового насоса</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-[var(--c-green)] font-bold">{co2Saved.toLocaleString("ru-RU")}</div>
            <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1">кг CO₂ / год сэкономлено</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: "Waves",
      color: "var(--c-blue)",
      num: "01",
      title: "Источник тепла",
      desc: "Сбросное тепло ТЭЦ — техническая вода с температурой 20–40°C после конденсаторов турбин. Ранее это тепло терялось в атмосферу.",
    },
    {
      icon: "ArrowUpDown",
      color: "var(--c-cyan)",
      num: "02",
      title: "Испаритель",
      desc: "Хладагент в испарителе поглощает тепло из сбросной воды и испаряется при низкой температуре, накапливая тепловую энергию.",
    },
    {
      icon: "Zap",
      color: "var(--c-green)",
      num: "03",
      title: "Компрессор",
      desc: "Электрокомпрессор повышает давление и температуру хладагента. На 1 кВт электроэнергии приходится 3–4 кВт тепловой мощности (COP 3.8).",
    },
    {
      icon: "Thermometer",
      color: "var(--c-green)",
      num: "04",
      title: "Конденсатор",
      desc: "Хладагент отдаёт тепло теплоносителю сети. Температура теплоносителя поднимается до 65–80°C для подачи потребителям.",
    },
    {
      icon: "Building2",
      color: "var(--c-blue)",
      num: "05",
      title: "Потребители",
      desc: "Тепло поступает в жилые дома, предприятия и социальные объекты Альметьевска по существующей тепловой сети.",
    },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="card-panel p-5 flex gap-5 items-start hover:border-[var(--c-cyan)] transition-colors duration-300">
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm"
            style={{ background: `${step.color}20`, border: `1px solid ${step.color}50`, color: step.color }}
          >
            {step.num}
          </div>
          <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${step.color}15` }}>
            <Icon name={step.icon} fallback="Circle" size={20} style={{ color: step.color }} />
          </div>
          <div>
            <h4 className="font-display text-white text-base mb-1 uppercase tracking-wider">{step.title}</h4>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Results() {
  const data = [
    { year: "2020", saving: 12 },
    { year: "2021", saving: 28 },
    { year: "2022", saving: 45 },
    { year: "2023", saving: 67 },
    { year: "2024", saving: 89 },
  ];
  const maxSaving = Math.max(...data.map(d => d.saving));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 bg-[var(--c-green)]" />
          <h3 className="font-display text-xl text-white uppercase tracking-widest">Экономия по годам, млн ₽</h3>
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
          <div className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">₽ Экономия за 2024</div>
        </div>
        <div className="card-panel p-5 flex-1 flex flex-col justify-center">
          <div className="text-4xl font-display text-[var(--c-cyan)] font-bold mb-1">
            <AnimatedNumber target={241} suffix=" ГВт·ч" />
          </div>
          <div className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">Тепло утилизировано</div>
        </div>
        <div className="card-panel p-5 flex-1 flex flex-col justify-center">
          <div className="text-3xl font-display text-[var(--c-blue)] font-bold mb-1">
            <AnimatedNumber target={62300} suffix=" т" />
          </div>
          <div className="text-sm text-[var(--c-muted)] font-mono uppercase tracking-wider">CO₂ не выброшено</div>
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
        <div key={i} className="card-panel p-5 group hover:border-[var(--c-blue)] transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: "var(--c-blue-dim)", border: "1px solid var(--c-blue-dim)" }}>
            <Icon name={f.icon} fallback="Circle" size={20} className="text-[var(--c-blue)]" />
          </div>
          <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-1">{f.label}</div>
          <div className="text-white font-semibold text-sm leading-snug">{f.value}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-[var(--c-blue)]" />
        <span className="text-[var(--c-blue)] text-xs font-mono uppercase tracking-widest">{tag}</span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-tight mb-3">{title}</h2>
      <p className="text-[var(--c-muted)] max-w-2xl leading-relaxed">{subtitle}</p>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-white font-body">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/80 via-transparent to-[var(--c-bg)]/80" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "var(--c-blue-dim)", border: "1px solid var(--c-blue)" }}>
              <Icon name="Zap" size={14} className="text-[var(--c-blue)]" />
            </div>
            <span className="font-display text-sm uppercase tracking-widest text-white">ТЭЦ Альметьевск</span>
            <span className="hidden sm:block text-[var(--c-muted)] text-xs font-mono ml-1">/ Тепловые насосы</span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {sections.map(s => (
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
          <button className="lg:hidden text-[var(--c-muted)] hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-[var(--c-border)] bg-[var(--c-bg)]/95 px-6 py-3 flex flex-col gap-1">
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="text-left px-3 py-2 text-sm font-mono uppercase tracking-wider text-[var(--c-muted)] hover:text-white">
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-14">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="ТЭЦ Альметьевск" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-bg)] via-[var(--c-bg)]/80 to-[var(--c-bg)]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--c-green-dim)] bg-[var(--c-green-dim)] mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--c-green)] animate-pulse" />
              <span className="text-[var(--c-green)] text-xs font-mono uppercase tracking-widest">Система работает · Онлайн</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none uppercase tracking-tight">
              Тепловые<br />
              <span className="text-gradient">насосы</span><br />
              на ТЭЦ
            </h1>
            <p className="text-[var(--c-muted)] text-lg leading-relaxed mb-8 max-w-xl">
              Утилизация сбросного тепла ТЭЦ Альметьевска — снижение затрат на теплоснабжение до 40% и сокращение выбросов CO₂
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("calculator")}
                className="px-6 py-3 rounded font-mono text-sm uppercase tracking-wider text-[var(--c-bg)] font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--c-blue), var(--c-green))" }}
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
                <div className="text-xl font-display font-bold mb-0.5" style={{ color: i % 2 === 0 ? "var(--c-green)" : "var(--c-blue)" }}>
                  {k.val}
                </div>
                <div className="text-xs font-mono text-[var(--c-muted)] uppercase tracking-wider">{k.label}</div>
                <div className="text-xs text-[var(--c-muted)] mt-1 opacity-70">{k.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-[var(--c-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Принцип работы"
            title="Как работает тепловой насос"
            subtitle="Цикл трансформации низкопотенциального сбросного тепла в высококачественную тепловую энергию для потребителей"
          />
          <div className="card-panel p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 text-center">
              {[
                { label: "Сбросное тепло", val: "2.8 кВт", color: "var(--c-blue)", icon: "Waves" },
                null,
                { label: "Электроэнергия", val: "1 кВт", color: "var(--c-cyan)", icon: "Zap" },
                null,
                { label: "Тепло для потребителей", val: "3.8 кВт", color: "var(--c-green)", icon: "Thermometer" },
              ].map((item, i) =>
                item ? (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${item.color}20`, border: `2px solid ${item.color}` }}>
                      <Icon name={item.icon} fallback="Circle" size={24} style={{ color: item.color }} />
                    </div>
                    <div className="font-mono font-bold text-lg" style={{ color: item.color }}>{item.val}</div>
                    <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wide">{item.label}</div>
                  </div>
                ) : (
                  <div key={i} className="text-3xl font-display text-[var(--c-muted)] px-2 hidden md:block">+</div>
                )
              )}
              <div className="text-3xl font-display text-[var(--c-muted)] px-2 hidden md:block">=</div>
            </div>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="relative z-10 py-24 border-t border-[var(--c-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Калькулятор экономии"
            title="Рассчитайте выгоду для вашего объекта"
            subtitle="Введите параметры и получите оценку годовой экономии при использовании теплового насоса вместо газового котла"
          />
          <Calculator />
          <p className="text-center text-xs text-[var(--c-muted)] font-mono mt-6 opacity-60">
            * Расчёт является ориентировочным. Для точного ТЭО обратитесь к специалистам.
          </p>
        </div>
      </section>

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
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "var(--c-blue-dim)", border: "1px solid var(--c-blue)" }}>
              <Icon name="Zap" size={12} className="text-[var(--c-blue)]" />
            </div>
            <span className="text-xs font-mono text-[var(--c-muted)] uppercase tracking-widest">ТЭЦ Альметьевск · Тепловые насосы · 2026</span>
          </div>
          <div className="text-xs font-mono text-[var(--c-muted)] opacity-50">
            Все данные носят информационный характер
          </div>
        </div>
      </footer>
    </div>
  );
}
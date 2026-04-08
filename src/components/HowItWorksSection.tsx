import Icon from "@/components/ui/icon";
import { SectionHeader } from "@/components/shared";

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
        <div
          key={i}
          className="card-panel p-5 flex gap-5 items-start hover:border-[var(--c-cyan)] transition-colors duration-300"
        >
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm"
            style={{
              background: `${step.color}20`,
              border: `1px solid ${step.color}50`,
              color: step.color,
            }}
          >
            {step.num}
          </div>
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${step.color}15` }}
          >
            <Icon name={step.icon} fallback="Circle" size={20} style={{ color: step.color }} />
          </div>
          <div>
            <h4 className="font-display text-white text-base mb-1 uppercase tracking-wider">
              {step.title}
            </h4>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
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
              {
                label: "Тепло для потребителей",
                val: "3.8 кВт",
                color: "var(--c-green)",
                icon: "Thermometer",
              },
            ].map((item, i) =>
              item ? (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: `${item.color}20`,
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    <Icon
                      name={item.icon}
                      fallback="Circle"
                      size={24}
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="font-mono font-bold text-lg" style={{ color: item.color }}>
                    {item.val}
                  </div>
                  <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="text-3xl font-display text-[var(--c-muted)] px-2 hidden md:block"
                >
                  +
                </div>
              )
            )}
            <div className="text-3xl font-display text-[var(--c-muted)] px-2 hidden md:block">
              =
            </div>
          </div>
        </div>
        <HowItWorks />
      </div>
    </section>
  );
}

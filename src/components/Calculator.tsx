import { useState } from "react";
import { SliderInput, SectionHeader } from "@/components/shared";

export default function CalculatorSection() {
  const [heatLoad, setHeatLoad] = useState(500);
  const [gasPrice, setGasPrice] = useState(7.5);
  const [electricPrice, setElectricPrice] = useState(4.8);
  const [hours, setHours] = useState(5000);

  const cop = 3.8;
  // 1 м³ газа = ~10 кВт·ч тепловой энергии, КПД котла ~90%
  const gasKwhPerM3 = 9.0;
  const gasConsumptionM3 = (heatLoad * hours) / gasKwhPerM3;
  const gasCost = gasConsumptionM3 * gasPrice;
  const electricConsumption = (heatLoad / cop) * hours;
  const electricCost = electricConsumption * electricPrice;
  const annualSaving = gasCost - electricCost;
  const gasConsumption = gasConsumptionM3;
  const co2Saved = Math.round(gasConsumption * 2.04);

  return (
    <section id="calculator" className="relative z-10 py-24 border-t border-[var(--c-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Калькулятор экономии"
          title="Рассчитайте выгоду для вашего объекта"
          subtitle="Введите параметры и получите оценку годовой экономии при использовании теплового насоса вместо газового котла"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-panel p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-[var(--c-blue)]" />
              <h3 className="font-display text-xl text-white uppercase tracking-widest">
                Параметры объекта
              </h3>
            </div>
            <SliderInput
              label="Тепловая мощность"
              value={heatLoad}
              onChange={setHeatLoad}
              min={50}
              max={5000}
              step={50}
              unit="кВт"
            />
            <SliderInput
              label="Цена газа"
              value={gasPrice}
              onChange={setGasPrice}
              min={3}
              max={20}
              step={0.1}
              unit="₽/м³"
            />
            <SliderInput
              label="Цена электричества"
              value={electricPrice}
              onChange={setElectricPrice}
              min={2}
              max={12}
              step={0.1}
              unit="₽/кВт·ч"
            />
            <SliderInput
              label="Часов работы в год"
              value={hours}
              onChange={setHours}
              min={1000}
              max={8760}
              step={100}
              unit="ч"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="card-panel p-6 border-[var(--c-green)] flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-6 bg-[var(--c-green)]" />
                <h3 className="font-display text-xl text-white uppercase tracking-widest">
                  Результат расчёта
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--c-surface)] rounded-lg p-4 border border-[var(--c-border)]">
                  <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-1">
                    Затраты на газ
                  </div>
                  <div className="text-2xl font-display text-red-400 font-bold">
                    {Math.round(gasCost / 1000).toLocaleString("ru-RU")}
                  </div>
                  <div className="text-xs text-[var(--c-muted)] font-mono">тыс. ₽ / год</div>
                </div>
                <div className="bg-[var(--c-surface)] rounded-lg p-4 border border-[var(--c-border)]">
                  <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-1">
                    Затраты на насос
                  </div>
                  <div className="text-2xl font-display text-[var(--c-green)] font-bold">
                    {Math.round(electricCost / 1000).toLocaleString("ru-RU")}
                  </div>
                  <div className="text-xs text-[var(--c-muted)] font-mono">тыс. ₽ / год</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[var(--c-green-dim)] to-[var(--c-blue-dim)] rounded-lg p-5 border border-[var(--c-green-dim)]">
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-widest mb-1">
                  Годовая экономия
                </div>
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
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1">
                  COP теплового насоса
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display text-[var(--c-green)] font-bold">
                  {co2Saved.toLocaleString("ru-RU")}
                </div>
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1">
                  кг CO₂ / год сэкономлено
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--c-muted)] font-mono mt-6 opacity-60">
          * Расчёт является ориентировочным. Для точного ТЭО обратитесь к специалистам.
        </p>
      </div>
    </section>
  );
}
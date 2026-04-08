import { useState } from "react";
import { SliderInput, SectionHeader } from "@/components/shared";

export default function CalculatorSection() {
  // Параметры объекта
  const [heatLoad, setHeatLoad] = useState(500);       // кВт — тепловая мощность
  const [hoursPerYear, setHoursPerYear] = useState(4000); // ч/год — число часов работы
  const [gasPrice, setGasPrice] = useState(8);          // ₽/м³
  const [electricPrice, setElectricPrice] = useState(5); // ₽/кВт·ч

  // Константы
  const COP = 3.8;          // Коэффициент преобразования теплового насоса
  const GAS_KWH_PER_M3 = 10.0; // кВт·ч тепла из 1 м³ газа (теплотворность ~10 кВт·ч/м³)
  const BOILER_EFF = 0.92;  // КПД газового котла

  // Суммарная потребность в тепле за год, кВт·ч
  const totalHeatKwh = heatLoad * hoursPerYear;

  // === Газовый котёл ===
  // Сколько м³ газа нужно с учётом КПД котла
  const gasM3 = totalHeatKwh / (GAS_KWH_PER_M3 * BOILER_EFF);
  const gasCostRub = gasM3 * gasPrice;

  // === Тепловой насос ===
  // Электроэнергия = тепло / COP
  const hpElectricKwh = totalHeatKwh / COP;
  const hpCostRub = hpElectricKwh * electricPrice;

  // === Результаты ===
  const annualSaving = gasCostRub - hpCostRub;
  const co2SavedKg = Math.round(gasM3 * 2.04); // ~2.04 кг CO₂ на м³ газа
  const paybackYears = annualSaving > 0 ? (heatLoad * 15000) / annualSaving : null; // ~15 000 ₽/кВт — ориент. стоимость ТН

  const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");

  return (
    <section id="calculator" className="relative z-10 py-24 border-t border-[var(--c-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Калькулятор экономии"
          title="Рассчитайте выгоду для вашего объекта"
          subtitle="Сравниваем стоимость теплоснабжения от газового котла и теплового насоса на одинаковое количество тепла"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
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
              label="Часов работы в год"
              value={hoursPerYear}
              onChange={setHoursPerYear}
              min={500}
              max={8760}
              step={100}
              unit="ч"
            />
            <SliderInput
              label="Цена газа"
              value={gasPrice}
              onChange={setGasPrice}
              min={4}
              max={30}
              step={0.5}
              unit="₽/м³"
            />
            <SliderInput
              label="Цена электричества"
              value={electricPrice}
              onChange={setElectricPrice}
              min={2}
              max={15}
              step={0.5}
              unit="₽/кВт·ч"
            />

            {/* Методика */}
            <div className="mt-4 p-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)]">
              <div className="text-xs text-[var(--c-muted)] font-mono leading-relaxed">
                <span className="text-[var(--c-blue)]">Методика:</span> сравниваем одинаковое количество
                тепла — <span className="text-white">{fmt(totalHeatKwh)} кВт·ч/год</span>.
                Газовый котёл: КПД {Math.round(BOILER_EFF * 100)}%, расход{" "}
                <span className="text-white">{fmt(gasM3)} м³/год</span>.
                Тепловой насос: COP {COP}, потребляет{" "}
                <span className="text-white">{fmt(hpElectricKwh)} кВт·ч/год</span>.
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            {/* Cost comparison */}
            <div className="card-panel p-6 flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-6 bg-[var(--c-green)]" />
                <h3 className="font-display text-xl text-white uppercase tracking-widest">
                  Сравнение затрат
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-[var(--c-bg)] rounded-lg p-4 border border-[var(--c-border)]">
                  <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-2">
                    Газовый котёл
                  </div>
                  <div className="text-2xl font-display text-red-400 font-bold">
                    {fmt(gasCostRub / 1000)}
                  </div>
                  <div className="text-xs text-[var(--c-muted)] font-mono mt-0.5">тыс. ₽ / год</div>
                </div>
                <div className="bg-[var(--c-bg)] rounded-lg p-4 border border-[var(--c-border)]">
                  <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-wider mb-2">
                    Тепловой насос
                  </div>
                  <div className="text-2xl font-display text-[var(--c-green)] font-bold">
                    {fmt(hpCostRub / 1000)}
                  </div>
                  <div className="text-xs text-[var(--c-muted)] font-mono mt-0.5">тыс. ₽ / год</div>
                </div>
              </div>

              {/* Saving highlight */}
              <div
                className="rounded-lg p-5 border"
                style={{
                  background:
                    annualSaving > 0
                      ? "linear-gradient(135deg, var(--c-green-dim), var(--c-blue-dim))"
                      : "var(--c-bg)",
                  borderColor: annualSaving > 0 ? "var(--c-green-dim)" : "var(--c-border)",
                }}
              >
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase tracking-widest mb-1">
                  Годовая экономия
                </div>
                {annualSaving > 0 ? (
                  <>
                    <div className="text-4xl font-display text-[var(--c-green)] font-bold">
                      {fmt(annualSaving / 1000)} тыс. ₽
                    </div>
                    <div className="text-sm text-[var(--c-muted)] font-mono mt-1">
                      ≈ {fmt(annualSaving / 12000)} тыс. ₽ / месяц
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-display text-red-400 font-bold">
                      Насос дороже котла
                    </div>
                    <div className="text-xs text-[var(--c-muted)] font-mono mt-1">
                      Повысьте цену газа или снизьте цену электричества
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Extra metrics */}
            <div className="card-panel p-5 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-display text-[var(--c-blue)] font-bold">{COP}×</div>
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1 leading-tight">
                  COP насоса
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-display text-[var(--c-green)] font-bold">
                  {fmt(co2SavedKg / 1000)} т
                </div>
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1 leading-tight">
                  CO₂ / год
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-display text-[var(--c-cyan)] font-bold">
                  {paybackYears && annualSaving > 0 ? `${paybackYears.toFixed(1)} л` : "—"}
                </div>
                <div className="text-xs text-[var(--c-muted)] font-mono uppercase mt-1 leading-tight">
                  Окупаемость
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--c-muted)] font-mono mt-6 opacity-60">
          * Расчёт ориентировочный. Теплотворность газа: {GAS_KWH_PER_M3} кВт·ч/м³, КПД котла: {Math.round(BOILER_EFF * 100)}%, COP насоса: {COP}.
        </p>
      </div>
    </section>
  );
}

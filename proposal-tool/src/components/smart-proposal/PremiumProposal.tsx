import { motion } from 'framer-motion';
import {
  Zap, Sun, DollarSign, Calendar, BarChart3, Settings,
  TrendingUp, Leaf, Lightbulb, ClipboardList, Scale,
  Battery, Shield, Gauge, Cable,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SavingsChart } from '../charts/SavingsChart';
import { ProductionChart } from '../charts/ProductionChart';
import { CostBreakdownChart } from '../charts/CostBreakdownChart';
import { PremiumCoverPage } from './PremiumCoverPage';
import { AINarrative } from './AINarrative';
import { ComparisonChart } from './ComparisonChart';
import { IrrGauge } from './IrrGauge';
import { PaybackTimeline } from './PaybackTimeline';
import { ProposalActions } from './ProposalActions';
import { formatUsd, formatArs, formatNumber } from '../../utils/calculations';
import { generateFallbackNarrative } from '../../data/narrativeTemplates';
import type { SmartProposal } from '../../types';
import type { ReactNode } from 'react';

interface PremiumProposalProps {
  proposal: SmartProposal;
  onRestart: () => void;
  onDownloadPdf: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function PremiumProposal({ proposal, onRestart, onDownloadPdf }: PremiumProposalProps) {
  const { system, production, financial, environmental, province, customerInput } = proposal;
  const narrative = proposal.aiNarrative || generateFallbackNarrative(proposal);

  return (
    <div id="premium-proposal">
      {/* 1. Cover Page */}
      <PremiumCoverPage
        customerName={customerInput.customerName || ''}
        systemSize={system.systemSizeKwp}
        date={new Date(proposal.createdAt).toLocaleDateString('es-AR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        province={province.name}
      />

      {/* Content sections */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 2. AI Narrative */}
        <AINarrative narrative={narrative} />

        {/* 3. Key Metrics Row */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              iconBg="bg-sky-500/10"
              iconColor="text-sky-400"
              label="Sistema"
              value={`${system.systemSizeKwp} kWp`}
              sub={`${system.panelCount} paneles`}
              valueColor="text-sky-400"
              delay={0.2}
            />
            <MetricCard
              icon={<Sun className="w-5 h-5" />}
              iconBg="bg-amber-500/10"
              iconColor="text-amber-400"
              label="Produccion anual"
              value={`${formatNumber(production.annualProductionKwh)} kWh`}
              sub={`${production.coveragePercentage}% de tu consumo`}
              valueColor="text-amber-400"
              delay={0.3}
            />
            <MetricCard
              icon={<DollarSign className="w-5 h-5" />}
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-400"
              label="Ahorro anual"
              value={formatUsd(financial.annualSavingsUsd)}
              sub={formatArs(financial.annualSavingsArs) + '/ano'}
              valueColor="text-emerald-400"
              delay={0.4}
            />
            <MetricCard
              icon={<Calendar className="w-5 h-5" />}
              iconBg="bg-purple-500/10"
              iconColor="text-purple-400"
              label="Recupero"
              value={`${financial.paybackYears} anos`}
              sub={`ROI: ${financial.roi25Years}%`}
              valueColor="text-purple-400"
              delay={0.5}
            />
          </div>
        </motion.div>

        {/* 4. Section 1: Current Consumption */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <SectionHeader number={1} icon={<BarChart3 className="w-5 h-5 text-sky-400" />} title="Tu consumo actual" subtitle="Asi usas energia hoy" />
          <GlassCard variant="strong" className="mb-10">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-slate-400">Factura mensual</p>
                <p className="text-2xl font-bold text-white">{formatArs(customerInput.monthlyBillArs)}</p>
                <p className="text-xs text-slate-500">&asymp; {formatUsd(Math.round(customerInput.monthlyBillArs / proposal.exchangeRate))}/mes</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Consumo mensual</p>
                <p className="text-2xl font-bold text-amber-400">{formatNumber(customerInput.monthlyConsumptionKwh || 0)} kWh</p>
                <p className="text-xs text-slate-500">{formatNumber((customerInput.monthlyConsumptionKwh || 0) * 12)} kWh/ano</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Tarifa promedio</p>
                <p className="text-2xl font-bold text-red-400">
                  {formatArs(Math.round(province.residentialTariff.energyCharge))}/kWh
                </p>
                <p className="text-xs text-slate-500">Tendencia: en aumento</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <p className="text-sm text-slate-300">
                <span className="text-red-400 font-semibold">Las tarifas electricas en Argentina subieron mas del 300% en 2024.</span>{' '}
                Con la eliminacion progresiva de subsidios, se espera que sigan aumentando.
                Cada ano que pasa sin solar, pagas mas por la misma electricidad.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* 5. Comparison Chart */}
        <ComparisonChart
          currentBill={customerInput.monthlyBillArs}
          solarBill={Math.round(customerInput.monthlyBillArs * (1 - production.coveragePercentage / 100))}
          monthlySavings={financial.monthlySavingsArs}
        />

        {/* 6. Section 2: Recommended System */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
          <SectionHeader number={2} icon={<Settings className="w-5 h-5 text-amber-400" />} title="Sistema recomendado" subtitle="Disenado especificamente para tu propiedad" />
          <GlassCard variant="strong" className="mb-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Panels */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                    <Battery className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Paneles Solares</p>
                    <p className="text-xs text-slate-400">Monocristalino PERC</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <InfoRow label="Marca" value={system.panels.brand} />
                  <InfoRow label="Modelo" value={system.panels.model} />
                  <InfoRow label="Potencia" value={`${system.panels.wattage} Wp`} />
                  <InfoRow label="Eficiencia" value={`${system.panels.efficiency}%`} />
                  <InfoRow label="Cantidad" value={`${system.panelCount} paneles`} highlight />
                  <InfoRow label="Garantia producto" value={`${system.panels.warranty.product} anos`} />
                  <InfoRow label="Garantia rendimiento" value={`${system.panels.warranty.performance} anos`} />
                </div>
              </div>

              {/* Inverter */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Inversor</p>
                    <p className="text-xs text-slate-400">DC a AC para tu hogar</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <InfoRow label="Marca" value={system.inverter.brand} />
                  <InfoRow label="Modelo" value={system.inverter.model} />
                  <InfoRow label="Potencia" value={`${system.inverter.powerKw} kW`} />
                  <InfoRow label="Tipo" value={system.inverter.type === 'string' ? 'String' : system.inverter.type === 'hybrid' ? 'Hibrido' : 'Micro'} />
                  <InfoRow label="Fases" value={system.inverter.phases === 1 ? 'Monofasico' : 'Trifasico'} />
                  <InfoRow label="Cantidad" value={`${system.inverterCount}`} highlight />
                  <InfoRow label="Garantia" value={`${system.inverter.warranty} anos`} />
                </div>
              </div>
            </div>

            {/* System summary */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-sky-500/5 to-amber-500/5 border border-sky-500/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400">Potencia total</p>
                  <p className="text-xl font-bold text-sky-400">{system.systemSizeKwp} kWp</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Superficie</p>
                  <p className="text-xl font-bold text-white">{system.roofAreaM2} m&sup2;</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Montaje</p>
                  <p className="text-xl font-bold text-white">
                    {system.mountingType === 'flush' ? 'Sobre techo' : system.mountingType === 'tilted' ? 'Inclinado' : 'Balastrado'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Protecciones</p>
                  <p className="text-xl font-bold text-emerald-400">{system.protections.length} incluidas</p>
                </div>
              </div>
            </div>

            {/* Protections list */}
            <div className="mt-4 flex flex-wrap gap-2">
              {system.protections.map((p, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 text-xs text-slate-400 border border-zinc-700/30">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  {p}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* 7. Section 3: Energy Production */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
          <SectionHeader number={3} icon={<Sun className="w-5 h-5 text-amber-400" />} title="Produccion de energia" subtitle="Generacion estimada mes a mes" />
          <GlassCard variant="strong" className="mb-10">
            <ProductionChart
              monthlyProduction={production.monthlyProductionKwh}
              monthlyConsumption={customerInput.monthlyConsumptionKwh || 0}
            />
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs text-slate-400">Rendimiento</p>
                <p className="text-xl font-bold text-amber-400">{production.specificYield} kWh/kWp</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-sky-500/5 border border-sky-500/10">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-sky-400" />
                  <p className="text-xs text-slate-400">Performance Ratio</p>
                </div>
                <p className="text-xl font-bold text-sky-400">{(production.performanceRatio * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs text-slate-400">Cobertura</p>
                <p className="text-xl font-bold text-emerald-400">{production.coveragePercentage}%</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              * Basado en datos de radiacion solar de {province.name} ({province.solarIrradiation} kWh/m&sup2;/dia).
              Degradacion: {production.degradationRate}%/ano. Variacion estimada: &plusmn;10%.
            </p>
          </GlassCard>
        </motion.div>

        {/* 8. Section 4: Financial Analysis */}
        <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
          <SectionHeader number={4} icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} title="Analisis financiero" subtitle="Tu inversion y retorno a 25 anos" />

          {/* Investment */}
          <GlassCard variant="accent" className="mb-6">
            <div className="text-center mb-6">
              <p className="text-sm text-slate-400 uppercase tracking-wider">Inversion total</p>
              <p className="text-4xl font-bold text-white mt-2">{formatUsd(financial.totalInvestmentUsd)}</p>
              <p className="text-lg text-slate-400 mt-1">{formatArs(financial.totalInvestmentArs)}</p>
              <p className="text-xs text-slate-500 mt-1">TC: 1 USD = {formatArs(proposal.exchangeRate)}</p>
            </div>
            <CostBreakdownChart breakdown={financial.costBreakdown} />
          </GlassCard>

          {/* Savings projection */}
          <GlassCard variant="strong" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Proyeccion de ahorro a 25 anos</h3>
            <SavingsChart
              data={financial.yearlyProjection}
              investmentUsd={financial.totalInvestmentUsd}
              paybackYears={financial.paybackYears}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <FinancialCard label="Ahorro ano 1" value={formatUsd(financial.annualSavingsUsd)} color="text-emerald-400" />
              <FinancialCard label="Recupero" value={`${financial.paybackYears} anos`} color="text-amber-400" />
              <FinancialCard label="TIR (IRR)" value={`${financial.irr}%`} color="text-sky-400" />
              <FinancialCard label="VAN (NPV)" value={formatUsd(financial.npv)} color="text-purple-400" />
            </div>
          </GlassCard>

          {/* IRR Gauge */}
          <GlassCard variant="strong" className="mb-6">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              <IrrGauge irr={financial.irr} />
              <div className="text-center md:text-start">
                <p className="text-sm text-slate-400 mb-1">En 25 anos, ahorro total de</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                  {formatUsd(financial.yearlyProjection[24]?.cumulativeSavings || 0)}
                </p>
                <p className="text-slate-400 mt-2">
                  Sobre una inversion de {formatUsd(financial.totalInvestmentUsd)}
                </p>
                <p className="text-emerald-400 font-bold mt-1">
                  ROI {financial.roi25Years}%
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  LCOE: {formatUsd(financial.lcoe).replace('US$', '')} USD/kWh
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Payback Timeline */}
          <PaybackTimeline
            paybackYears={financial.paybackYears}
            totalInvestmentUsd={financial.totalInvestmentUsd}
            totalSavings25Years={financial.yearlyProjection[24]?.cumulativeSavings || 0}
          />

          <div className="mb-10" />
        </motion.div>

        {/* 9. Section 5: Environmental Impact */}
        <motion.div {...fadeUp} transition={{ delay: 0.6 }}>
          <SectionHeader number={5} icon={<Leaf className="w-5 h-5 text-emerald-400" />} title="Impacto ambiental" subtitle="Tu contribucion al planeta" />
          <GlassCard variant="strong" className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Leaf className="w-6 h-6 text-emerald-400" />, label: 'CO\u2082 evitado/ano', value: `${formatNumber(environmental.annualCo2AvoidedKg)} kg`, sub: 'de emisiones' },
                { icon: <Sun className="w-6 h-6 text-emerald-400" />, label: 'Equivalente a plantar', value: `${formatNumber(environmental.treesEquivalent)}`, sub: 'arboles' },
                { icon: <Gauge className="w-6 h-6 text-emerald-400" />, label: 'Autos fuera de ruta', value: `${environmental.carsOffRoad}`, sub: 'vehiculos/ano' },
                { icon: <TrendingUp className="w-6 h-6 text-emerald-400" />, label: 'En 25 anos', value: `${formatNumber(Math.round(environmental.lifetime25YearsCo2Kg / 1000))} ton`, sub: 'CO\u2082 evitadas' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{item.label}</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{item.value}</p>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* 10. Section 6: How it works */}
        <motion.div {...fadeUp} transition={{ delay: 0.7 }}>
          <SectionHeader number={6} icon={<Lightbulb className="w-5 h-5 text-amber-400" />} title="Como funciona?" subtitle="Una explicacion simple del sistema" />
          <GlassCard variant="strong" className="mb-10">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  icon: <Sun className="w-5 h-5 text-amber-400" />,
                  iconBg: 'bg-amber-500/10',
                  title: 'Los paneles captan la luz del sol',
                  desc: 'Los paneles solares convierten la luz solar en electricidad DC. Funcionan incluso en dias nublados.',
                },
                {
                  step: 2,
                  icon: <Zap className="w-5 h-5 text-sky-400" />,
                  iconBg: 'bg-sky-500/10',
                  title: 'El inversor convierte la energia',
                  desc: 'Transforma corriente continua (DC) en corriente alterna (AC) para tus electrodomesticos.',
                },
                {
                  step: 3,
                  icon: <Battery className="w-5 h-5 text-emerald-400" />,
                  iconBg: 'bg-emerald-500/10',
                  title: 'Tu hogar usa la energia',
                  desc: 'Heladera, aire acondicionado, luces — todo funciona con tu propia energia limpia.',
                },
                {
                  step: 4,
                  icon: <Cable className="w-5 h-5 text-purple-400" />,
                  iconBg: 'bg-purple-500/10',
                  title: 'El excedente va a la red',
                  desc: province.hasNetMetering
                    ? `En ${province.name}, el excedente se inyecta a la red con credito en tu factura (${province.netMeteringType === 'net_metering' ? 'Net Metering' : 'Net Billing'}).`
                    : `En ${province.name}, la regulacion esta en proceso. El sistema se optimiza para autoconsumo.`,
                },
                {
                  step: 5,
                  icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
                  iconBg: 'bg-emerald-500/10',
                  title: 'Tu factura baja',
                  desc: `Cubris el ${production.coveragePercentage}% de tu consumo. Nueva factura: ~${formatArs(Math.round(customerInput.monthlyBillArs * (1 - production.coveragePercentage / 100)))}/mes.`,
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* 11. Section 7: Installation Process */}
        <motion.div {...fadeUp} transition={{ delay: 0.8 }}>
          <SectionHeader number={7} icon={<ClipboardList className="w-5 h-5 text-sky-400" />} title="Proceso de instalacion" subtitle="De la propuesta al encendido" />
          <GlassCard variant="strong" className="mb-10">
            <div className="relative">
              <div className="absolute start-[21px] top-8 bottom-8 w-px bg-gradient-to-b from-sky-500/40 via-amber-500/40 to-emerald-500/40" />
              <div className="space-y-7">
                {[
                  { week: 'Semana 1', title: 'Visita tecnica', desc: 'Un ingeniero evalua el techo, toma medidas y verifica la instalacion electrica.' },
                  { week: 'Semana 2', title: 'Diseno e ingenieria', desc: 'Disenamos el sistema con software especializado, optimizando cada panel.' },
                  { week: 'Semana 2-3', title: 'Tramites y permisos', desc: `Gestionamos permisos ante ${province.utility} y la autoridad regulatoria.` },
                  { week: 'Semana 3-4', title: 'Instalacion', desc: 'Paneles, inversor, cableado y protecciones. Duracion: 1-3 dias.' },
                  { week: 'Semana 4-5', title: 'Conexion a red', desc: 'Medidor bidireccional y puesta en marcha del sistema.' },
                  { week: 'Semana 5+', title: 'Generando energia', desc: 'Sistema operativo. Monitoreo desde celular y empezas a ahorrar.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex-shrink-0 w-[42px] h-[42px] rounded-full bg-zinc-800 border-2 border-sky-500/30 flex items-center justify-center text-xs font-bold text-sky-400 z-10">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-xs text-sky-400/80 font-semibold">{item.week}</p>
                      <p className="font-semibold text-white mt-0.5">{item.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* 12. Section 8: Regulatory Framework */}
        <motion.div {...fadeUp} transition={{ delay: 0.9 }}>
          <SectionHeader number={8} icon={<Scale className="w-5 h-5 text-purple-400" />} title="Marco regulatorio" subtitle="Respaldo legal de tu inversion" />
          <GlassCard variant="strong" className="mb-10">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <Scale className="w-4 h-4 text-sky-400" />
                  <p className="font-semibold text-sky-400">Ley 27.424 — Generacion Distribuida</p>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  Argentina aprobo en 2017 la ley que permite a hogares y comercios
                  generar energia y vender el excedente a la red. Reglamentada por Decreto 986/2018.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <p className="font-semibold text-amber-400">Beneficios fiscales</p>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  Credito fiscal hasta 50% del costo de equipos.
                  Deduccion de impuesto a las ganancias.
                  Algunas provincias eximen del impuesto inmobiliario.
                </p>
              </div>
              <div className={`p-4 rounded-xl ${province.hasNetMetering ? 'bg-emerald-500/5 border border-emerald-500/10' : 'bg-zinc-800/50 border border-zinc-700/20'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className={`w-4 h-4 ${province.hasNetMetering ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <p className={`font-semibold ${province.hasNetMetering ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {province.name}: {province.hasNetMetering ? 'Net Metering habilitado' : 'En implementacion'}
                  </p>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  {province.hasNetMetering
                    ? `${province.utility} acepta inyeccion de excedentes (${province.netMeteringType === 'net_metering' ? 'compensacion 1:1' : 'precio mayorista'}).`
                    : `La provincia trabaja en la adhesion a la Ley 27.424. Sistema optimizado para autoconsumo.`
                  }
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* 13. CTA */}
        <motion.div {...fadeUp} transition={{ delay: 1 }} className="text-center mb-16">
          <GlassCard variant="accent" className="p-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Listo para empezar?
            </h2>
            <p className="text-slate-400 text-lg mb-6">
              Contactanos para agendar la visita tecnica sin cargo
            </p>
            <p className="text-xs text-slate-500 mt-6">
              Propuesta valida hasta {proposal.validUntil} — Precios sujetos a tipo de cambio — Propuesta no vinculante
            </p>
          </GlassCard>
        </motion.div>

        {/* 14. Sticky Action Bar */}
        <ProposalActions
          customerName={customerInput.customerName || ''}
          systemSize={system.systemSizeKwp}
          onDownloadPdf={onDownloadPdf}
          onNewProposal={onRestart}
        />
      </div>
    </div>
  );
}

// === Local helper components ===

function SectionHeader({ number, icon, title, subtitle }: { number: number; icon: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/40 flex items-center justify-center">
          {icon}
        </div>
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-sky-500 text-[10px] font-bold text-white flex items-center justify-center">
          {number}
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

function MetricCard({
  icon, iconBg, iconColor, label, value, sub, valueColor, delay,
}: {
  icon: ReactNode; iconBg: string; iconColor: string;
  label: string; value: string; sub: string; valueColor: string; delay: number;
}) {
  return (
    <GlassCard
      variant="strong"
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center mx-auto mb-2 ${iconColor}`}>
        {icon}
      </div>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </GlassCard>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-zinc-700/20">
      <span className="text-slate-400">{label}</span>
      <span className={highlight ? 'font-bold text-sky-400' : 'text-white font-medium'}>{value}</span>
    </div>
  );
}

function FinancialCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/20">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { SavingsChart } from '../charts/SavingsChart';
import { ProductionChart } from '../charts/ProductionChart';
import { CostBreakdownChart } from '../charts/CostBreakdownChart';
import { formatUsd, formatArs, formatNumber } from '../../utils/calculations';
import type { Proposal } from '../../types';

interface ProposalViewProps {
  proposal: Proposal;
  onRestart: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function ProposalView({ proposal, onRestart }: ProposalViewProps) {
  const { system, production, financial, environmental, province, customerInput } = proposal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* === HEADER === */}
      <motion.div {...fadeUp} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <span>☀️</span> Propuesta Solar Personalizada
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Tu futuro con energía solar
        </h1>
        {customerInput.customerName && (
          <p className="text-xl text-dark-400">
            Preparada para <span className="text-solar-300 font-semibold">{customerInput.customerName}</span>
          </p>
        )}
        <p className="text-dark-500 mt-2">
          {province.name} · Generada el {new Date(proposal.createdAt).toLocaleDateString('es-AR')} · Válida 30 días
        </p>
      </motion.div>

      {/* === KEY METRICS === */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: '⚡',
              label: 'Sistema',
              value: `${system.systemSizeKwp} kWp`,
              sub: `${system.panelCount} paneles`,
              color: 'text-solar-400',
            },
            {
              icon: '☀️',
              label: 'Producción anual',
              value: `${formatNumber(production.annualProductionKwh)} kWh`,
              sub: `${production.coveragePercentage}% de tu consumo`,
              color: 'text-amber-400',
            },
            {
              icon: '💰',
              label: 'Ahorro anual',
              value: formatUsd(financial.annualSavingsUsd),
              sub: formatArs(financial.annualSavingsArs) + '/año',
              color: 'text-emerald-400',
            },
            {
              icon: '📅',
              label: 'Recupero',
              value: `${financial.paybackYears} años`,
              sub: `ROI: ${financial.roi25Years}%`,
              color: 'text-purple-400',
            },
          ].map((metric, i) => (
            <GlassCard
              key={i}
              variant="strong"
              glow
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span className="text-3xl">{metric.icon}</span>
              <p className="text-xs text-dark-400 mt-2 uppercase tracking-wider">{metric.label}</p>
              <p className={`text-2xl font-bold mt-1 ${metric.color}`}>{metric.value}</p>
              <p className="text-xs text-dark-500 mt-1">{metric.sub}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* === SECTION 1: Tu Consumo Actual === */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
        <SectionHeader
          number={1}
          icon="📊"
          title="Tu consumo actual"
          subtitle="Así usás energía hoy"
        />
        <GlassCard variant="strong" className="mb-10">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-dark-400">Factura mensual</p>
              <p className="text-2xl font-bold text-white">{formatArs(customerInput.monthlyBillArs)}</p>
              <p className="text-xs text-dark-500">≈ {formatUsd(Math.round(customerInput.monthlyBillArs / proposal.exchangeRate))}/mes</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-dark-400">Consumo mensual</p>
              <p className="text-2xl font-bold text-amber-400">{formatNumber(customerInput.monthlyConsumptionKwh || 0)} kWh</p>
              <p className="text-xs text-dark-500">{formatNumber((customerInput.monthlyConsumptionKwh || 0) * 12)} kWh/año</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-dark-400">Tarifa promedio</p>
              <p className="text-2xl font-bold text-red-400">
                {formatArs(Math.round(province.residentialTariff.energyCharge))}/kWh
              </p>
              <p className="text-xs text-dark-500">Tendencia: ↗️ en aumento</p>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <p className="text-sm text-dark-300">
              <span className="text-red-400 font-semibold">📈 Las tarifas eléctricas en Argentina subieron más del 300% en 2024.</span>{' '}
              Con la eliminación progresiva de subsidios, se espera que sigan aumentando.
              Cada año que pasa sin solar, pagás más por la misma electricidad.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* === SECTION 2: Sistema Recomendado === */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
        <SectionHeader
          number={2}
          icon="🔧"
          title="Sistema recomendado"
          subtitle="Diseñado específicamente para tu propiedad"
        />
        <GlassCard variant="strong" className="mb-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Panels */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-solar-500/10 flex items-center justify-center">
                  <span className="text-xl">🔲</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Paneles Solares</p>
                  <p className="text-xs text-dark-400">Tecnología fotovoltaica monocristalina</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <InfoRow label="Marca" value={system.panels.brand} />
                <InfoRow label="Modelo" value={system.panels.model} />
                <InfoRow label="Potencia por panel" value={`${system.panels.wattage} Wp`} />
                <InfoRow label="Eficiencia" value={`${system.panels.efficiency}%`} />
                <InfoRow label="Cantidad" value={`${system.panelCount} paneles`} highlight />
                <InfoRow label="Garantía producto" value={`${system.panels.warranty.product} años`} />
                <InfoRow label="Garantía rendimiento" value={`${system.panels.warranty.performance} años (≥80%)`} />
              </div>
            </div>

            {/* Inverter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Inversor</p>
                  <p className="text-xs text-dark-400">Convierte energía DC a AC para tu hogar</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <InfoRow label="Marca" value={system.inverter.brand} />
                <InfoRow label="Modelo" value={system.inverter.model} />
                <InfoRow label="Potencia" value={`${system.inverter.powerKw} kW`} />
                <InfoRow label="Tipo" value={system.inverter.type === 'string' ? 'String' : system.inverter.type === 'hybrid' ? 'Híbrido' : 'Microinversor'} />
                <InfoRow label="Fases" value={system.inverter.phases === 1 ? 'Monofásico' : 'Trifásico'} />
                <InfoRow label="Cantidad" value={`${system.inverterCount}`} highlight />
                <InfoRow label="Garantía" value={`${system.inverter.warranty} años`} />
              </div>
            </div>
          </div>

          {/* System summary */}
          <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-solar-500/5 to-amber-500/5 border border-solar-500/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs text-dark-400">Potencia total</p>
                <p className="text-xl font-bold text-solar-300">{system.systemSizeKwp} kWp</p>
              </div>
              <div>
                <p className="text-xs text-dark-400">Superficie de techo</p>
                <p className="text-xl font-bold text-white">{system.roofAreaM2} m²</p>
              </div>
              <div>
                <p className="text-xs text-dark-400">Tipo de montaje</p>
                <p className="text-xl font-bold text-white">
                  {system.mountingType === 'flush' ? 'Sobre techo' : system.mountingType === 'tilted' ? 'Inclinado' : 'Balastrado'}
                </p>
              </div>
              <div>
                <p className="text-xs text-dark-400">Protecciones</p>
                <p className="text-xl font-bold text-emerald-400">{system.protections.length} incluidas</p>
              </div>
            </div>
          </div>

          {/* Protections list */}
          <div className="mt-4 flex flex-wrap gap-2">
            {system.protections.map((p, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-dark-800/50 text-xs text-dark-400 border border-dark-700/20">
                ✓ {p}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* === SECTION 3: Producción de Energía === */}
      <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
        <SectionHeader
          number={3}
          icon="☀️"
          title="Producción de energía"
          subtitle="Tu sistema generará esta energía mes a mes"
        />
        <GlassCard variant="strong" className="mb-10">
          <ProductionChart
            monthlyProduction={production.monthlyProductionKwh}
            monthlyConsumption={customerInput.monthlyConsumptionKwh || 0}
          />
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 rounded-xl bg-amber-500/5">
              <p className="text-xs text-dark-400">Rendimiento específico</p>
              <p className="text-xl font-bold text-amber-400">{production.specificYield} kWh/kWp</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-solar-500/5">
              <p className="text-xs text-dark-400">Performance Ratio</p>
              <p className="text-xl font-bold text-solar-300">{(production.performanceRatio * 100).toFixed(0)}%</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-emerald-500/5">
              <p className="text-xs text-dark-400">Cobertura de consumo</p>
              <p className="text-xl font-bold text-emerald-400">{production.coveragePercentage}%</p>
            </div>
          </div>
          <p className="text-xs text-dark-500 mt-4">
            * Producción estimada basada en datos de radiación solar de {province.name} ({province.solarIrradiation} kWh/m²/día).
            Degradación anual: {production.degradationRate}%. Los valores reales pueden variar ±10% según condiciones climáticas.
          </p>
        </GlassCard>
      </motion.div>

      {/* === SECTION 4: Análisis Financiero === */}
      <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
        <SectionHeader
          number={4}
          icon="💰"
          title="Análisis financiero"
          subtitle="Tu inversión y retorno a 25 años"
        />

        {/* Investment */}
        <GlassCard variant="accent" glow className="mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-dark-400 uppercase tracking-wider">Inversión total</p>
            <p className="text-4xl font-bold text-white mt-2">{formatUsd(financial.totalInvestmentUsd)}</p>
            <p className="text-lg text-dark-400 mt-1">{formatArs(financial.totalInvestmentArs)}</p>
            <p className="text-xs text-dark-500 mt-1">TC: 1 USD = {formatArs(proposal.exchangeRate)}</p>
          </div>
          <CostBreakdownChart breakdown={financial.costBreakdown} />
        </GlassCard>

        {/* Savings projection */}
        <GlassCard variant="strong" className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Proyección de ahorro a 25 años</h3>
          <SavingsChart
            data={financial.yearlyProjection}
            investmentUsd={financial.totalInvestmentUsd}
            paybackYears={financial.paybackYears}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <MetricCard label="Ahorro año 1" value={formatUsd(financial.annualSavingsUsd)} color="text-emerald-400" />
            <MetricCard label="Período de recupero" value={`${financial.paybackYears} años`} color="text-amber-400" />
            <MetricCard label="TIR (IRR)" value={`${financial.irr}%`} color="text-solar-300" />
            <MetricCard label="VAN (NPV)" value={formatUsd(financial.npv)} color="text-purple-400" />
          </div>
        </GlassCard>

        {/* ROI Highlight */}
        <GlassCard variant="highlight" className="mb-10">
          <div className="text-center">
            <p className="text-sm text-dark-400">En 25 años, tu sistema generará un ahorro total de</p>
            <p className="text-5xl font-bold gradient-text mt-2">
              {formatUsd(financial.yearlyProjection[24]?.cumulativeSavings || 0)}
            </p>
            <p className="text-lg text-dark-400 mt-2">
              Sobre una inversión de {formatUsd(financial.totalInvestmentUsd)} → <span className="text-emerald-400 font-bold">ROI {financial.roi25Years}%</span>
            </p>
            <p className="text-sm text-dark-500 mt-2">
              LCOE: {formatUsd(financial.lcoe).replace('US$', '')} USD/kWh — más barato que la red eléctrica
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* === SECTION 5: Impacto Ambiental === */}
      <motion.div {...fadeUp} transition={{ delay: 0.6 }}>
        <SectionHeader
          number={5}
          icon="🌱"
          title="Impacto ambiental"
          subtitle="Tu contribución al planeta"
        />
        <GlassCard variant="strong" className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏭', label: 'CO₂ evitado/año', value: `${formatNumber(environmental.annualCo2AvoidedKg)} kg`, sub: 'de emisiones' },
              { icon: '🌳', label: 'Equivalente a plantar', value: `${formatNumber(environmental.treesEquivalent)}`, sub: 'árboles' },
              { icon: '🚗', label: 'Autos fuera de ruta', value: `${environmental.carsOffRoad}`, sub: 'vehículos/año' },
              { icon: '🌍', label: 'En 25 años', value: `${formatNumber(Math.round(environmental.lifetime25YearsCo2Kg / 1000))} ton`, sub: 'CO₂ evitadas' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <span className="text-4xl">{item.icon}</span>
                <p className="text-xs text-dark-400 mt-2 uppercase tracking-wider">{item.label}</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{item.value}</p>
                <p className="text-xs text-dark-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* === SECTION 6: Cómo funciona === */}
      <motion.div {...fadeUp} transition={{ delay: 0.7 }}>
        <SectionHeader
          number={6}
          icon="💡"
          title="¿Cómo funciona la energía solar?"
          subtitle="Una explicación simple"
        />
        <GlassCard variant="strong" className="mb-10">
          <div className="space-y-6">
            {[
              {
                step: 1,
                icon: '☀️',
                title: 'Los paneles captan la luz del sol',
                desc: 'Los paneles solares en tu techo convierten la luz solar en electricidad (corriente continua DC). Funcionan incluso en días nublados, aunque con menor rendimiento.',
              },
              {
                step: 2,
                icon: '⚡',
                title: 'El inversor convierte la energía',
                desc: 'El inversor transforma la corriente continua (DC) del panel en corriente alterna (AC), que es la que usan todos tus electrodomésticos.',
              },
              {
                step: 3,
                icon: '🏠',
                title: 'Tu hogar usa la energía',
                desc: 'La electricidad solar alimenta primero tu casa. Heladera, aire acondicionado, luces — todo funciona con tu propia energía limpia.',
              },
              {
                step: 4,
                icon: '🔄',
                title: 'El excedente va a la red',
                desc: province.hasNetMetering
                  ? `En ${province.name}, el excedente se inyecta a la red y obtenés un crédito en tu factura (${province.netMeteringType === 'net_metering' ? 'Net Metering' : 'Net Billing'}).`
                  : `En ${province.name}, la regulación de inyección está en proceso. Por ahora, el sistema se diseña para autoconsumo máximo.`,
              },
              {
                step: 5,
                icon: '📉',
                title: 'Tu factura baja dramáticamente',
                desc: `Con este sistema, vas a cubrir el ${production.coveragePercentage}% de tu consumo. Tu nueva factura mensual sería aproximadamente ${formatArs(Math.round(customerInput.monthlyBillArs * (1 - production.coveragePercentage / 100)))}.`,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-solar-500/10 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-dark-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* === SECTION 7: Proceso de instalación === */}
      <motion.div {...fadeUp} transition={{ delay: 0.8 }}>
        <SectionHeader
          number={7}
          icon="📋"
          title="Proceso de instalación"
          subtitle="De la propuesta al encendido"
        />
        <GlassCard variant="strong" className="mb-10">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-solar-500 via-amber-500 to-emerald-500" />

            <div className="space-y-8">
              {[
                { week: 'Semana 1', title: 'Visita técnica', desc: 'Un ingeniero visita tu propiedad para evaluar el techo, tomar medidas y verificar la instalación eléctrica.' },
                { week: 'Semana 2', title: 'Diseño e ingeniería', desc: 'Diseñamos el sistema con software especializado, optimizando la ubicación de cada panel.' },
                { week: 'Semana 2-3', title: 'Trámites y permisos', desc: `Gestionamos todos los permisos ante ${province.utility} y la autoridad regulatoria local.` },
                { week: 'Semana 3-4', title: 'Instalación', desc: 'Nuestro equipo instala paneles, inversor, cableado y protecciones. Duración: 1-3 días según el tamaño.' },
                { week: 'Semana 4-5', title: 'Conexión a red', desc: 'Se conecta el sistema a la red, se instala el medidor bidireccional y se realiza la puesta en marcha.' },
                { week: 'Semana 5+', title: '¡Generando energía! ☀️', desc: 'Tu sistema está operativo. Monitoreás la producción desde tu celular y empezás a ahorrar.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-800 border-2 border-solar-500/30 flex items-center justify-center text-xs font-bold text-solar-300 z-10">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs text-solar-400 font-semibold">{item.week}</p>
                    <p className="font-semibold text-white mt-0.5">{item.title}</p>
                    <p className="text-sm text-dark-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* === SECTION 8: Regulación === */}
      <motion.div {...fadeUp} transition={{ delay: 0.9 }}>
        <SectionHeader
          number={8}
          icon="⚖️"
          title="Marco regulatorio"
          subtitle="Respaldo legal de tu inversión"
        />
        <GlassCard variant="strong" className="mb-10">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-solar-500/5 border border-solar-500/10">
              <p className="font-semibold text-solar-300">Ley 27.424 — Generación Distribuida</p>
              <p className="text-sm text-dark-400 mt-1">
                Argentina aprobó en 2017 la ley de generación distribuida que permite a hogares y comercios
                generar su propia energía y vender el excedente a la red. Reglamentada en 2018 por el Decreto 986/2018.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="font-semibold text-amber-300">Beneficios fiscales</p>
              <p className="text-sm text-dark-400 mt-1">
                • Certificado de crédito fiscal por hasta 50% del costo de equipos<br />
                • Deducción del impuesto a las ganancias<br />
                • Algunas provincias eximen del impuesto inmobiliario a propiedades con paneles solares
              </p>
            </div>
            <div className={`p-4 rounded-xl ${province.hasNetMetering ? 'bg-emerald-500/5 border border-emerald-500/10' : 'bg-dark-800/50 border border-dark-700/20'}`}>
              <p className={`font-semibold ${province.hasNetMetering ? 'text-emerald-300' : 'text-dark-300'}`}>
                {province.name}: {province.hasNetMetering ? 'Net Metering habilitado ✓' : 'En proceso de implementación'}
              </p>
              <p className="text-sm text-dark-400 mt-1">
                {province.hasNetMetering
                  ? `La distribuidora ${province.utility} acepta la inyección de excedentes bajo el esquema de ${province.netMeteringType === 'net_metering' ? 'Net Metering (compensación 1:1)' : 'Net Billing (precio mayorista)'}.`
                  : `La provincia está trabajando en la adhesión a la Ley 27.424. Mientras tanto, el sistema se optimiza para máximo autoconsumo.`
                }
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* === CTA === */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 1 }}
        className="text-center mb-16"
      >
        <GlassCard variant="accent" glow className="p-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            ¿Listo para empezar?
          </h2>
          <p className="text-dark-400 text-lg mb-6">
            Contactanos para agendar la visita técnica sin cargo
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="amber" size="lg" icon={<span>📞</span>}>
              Contactar ahora
            </Button>
            <Button variant="secondary" size="lg" icon={<span>📄</span>}>
              Descargar PDF
            </Button>
            <Button variant="ghost" size="lg" onClick={onRestart} icon={<span>🔄</span>}>
              Nueva propuesta
            </Button>
          </div>
          <p className="text-xs text-dark-500 mt-6">
            Propuesta válida hasta {proposal.validUntil} · Precios sujetos a tipo de cambio · Propuesta no vinculante
          </p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// === Helper components ===

function SectionHeader({ number, icon, title, subtitle }: { number: number; icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl animated-border p-[1px]">
        <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-xs text-dark-500 uppercase tracking-widest">Sección {number}</p>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm text-dark-400">{subtitle}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-dark-700/20">
      <span className="text-dark-400">{label}</span>
      <span className={highlight ? 'font-bold text-solar-300' : 'text-white font-medium'}>{value}</span>
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center p-3 rounded-xl bg-dark-800/30">
      <p className="text-xs text-dark-400">{label}</p>
      <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

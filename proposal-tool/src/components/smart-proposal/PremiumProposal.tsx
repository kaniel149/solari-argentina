import { motion } from 'framer-motion';
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
            {[
              {
                icon: '\u26a1',
                label: 'Sistema',
                value: `${system.systemSizeKwp} kWp`,
                sub: `${system.panelCount} paneles`,
                color: 'text-solar-400',
              },
              {
                icon: '\u2600\ufe0f',
                label: 'Produccion anual',
                value: `${formatNumber(production.annualProductionKwh)} kWh`,
                sub: `${production.coveragePercentage}% de tu consumo`,
                color: 'text-amber-400',
              },
              {
                icon: '\ud83d\udcb0',
                label: 'Ahorro anual',
                value: formatUsd(financial.annualSavingsUsd),
                sub: formatArs(financial.annualSavingsArs) + '/ano',
                color: 'text-emerald-400',
              },
              {
                icon: '\ud83d\udcc5',
                label: 'Recupero',
                value: `${financial.paybackYears} anos`,
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

        {/* 4. Section 1: Current Consumption */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <ProposalSectionHeader number={1} icon="\ud83d\udcca" title="Tu consumo actual" subtitle="Asi usas energia hoy" />
          <GlassCard variant="strong" className="mb-10">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-dark-400">Factura mensual</p>
                <p className="text-2xl font-bold text-white">{formatArs(customerInput.monthlyBillArs)}</p>
                <p className="text-xs text-dark-500">&asymp; {formatUsd(Math.round(customerInput.monthlyBillArs / proposal.exchangeRate))}/mes</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-dark-400">Consumo mensual</p>
                <p className="text-2xl font-bold text-amber-400">{formatNumber(customerInput.monthlyConsumptionKwh || 0)} kWh</p>
                <p className="text-xs text-dark-500">{formatNumber((customerInput.monthlyConsumptionKwh || 0) * 12)} kWh/ano</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-dark-400">Tarifa promedio</p>
                <p className="text-2xl font-bold text-red-400">
                  {formatArs(Math.round(province.residentialTariff.energyCharge))}/kWh
                </p>
                <p className="text-xs text-dark-500">Tendencia: en aumento</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <p className="text-sm text-dark-300">
                <span className="text-red-400 font-semibold">Las tarifas electricas en Argentina subieron mas del 300% en 2024.</span>{' '}
                Con la eliminacion progresiva de subsidios, se espera que sigan aumentando.
                Cada ano que pasa sin solar, pagas mas por la misma electricidad.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* 5. Comparison Chart (NEW) */}
        <ComparisonChart
          currentBill={customerInput.monthlyBillArs}
          solarBill={Math.round(customerInput.monthlyBillArs * (1 - production.coveragePercentage / 100))}
          monthlySavings={financial.monthlySavingsArs}
        />

        {/* 6. Section 2: Recommended System */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
          <ProposalSectionHeader number={2} icon="\ud83d\udd27" title="Sistema recomendado" subtitle="Disenado especificamente para tu propiedad" />
          <GlassCard variant="strong" className="mb-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Panels */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-solar-500/10 flex items-center justify-center">
                    <span className="text-xl">{'\ud83d\udd32'}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Paneles Solares</p>
                    <p className="text-xs text-dark-400">Tecnologia fotovoltaica monocristalina</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <InfoRow label="Marca" value={system.panels.brand} />
                  <InfoRow label="Modelo" value={system.panels.model} />
                  <InfoRow label="Potencia por panel" value={`${system.panels.wattage} Wp`} />
                  <InfoRow label="Eficiencia" value={`${system.panels.efficiency}%`} />
                  <InfoRow label="Cantidad" value={`${system.panelCount} paneles`} highlight />
                  <InfoRow label="Garantia producto" value={`${system.panels.warranty.product} anos`} />
                  <InfoRow label="Garantia rendimiento" value={`${system.panels.warranty.performance} anos (>=80%)`} />
                </div>
              </div>

              {/* Inverter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <span className="text-xl">{'\u26a1'}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Inversor</p>
                    <p className="text-xs text-dark-400">Convierte energia DC a AC para tu hogar</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <InfoRow label="Marca" value={system.inverter.brand} />
                  <InfoRow label="Modelo" value={system.inverter.model} />
                  <InfoRow label="Potencia" value={`${system.inverter.powerKw} kW`} />
                  <InfoRow label="Tipo" value={system.inverter.type === 'string' ? 'String' : system.inverter.type === 'hybrid' ? 'Hibrido' : 'Microinversor'} />
                  <InfoRow label="Fases" value={system.inverter.phases === 1 ? 'Monofasico' : 'Trifasico'} />
                  <InfoRow label="Cantidad" value={`${system.inverterCount}`} highlight />
                  <InfoRow label="Garantia" value={`${system.inverter.warranty} anos`} />
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
                  <p className="text-xl font-bold text-white">{system.roofAreaM2} m2</p>
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
                  {'\u2713'} {p}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* 7. Section 3: Energy Production */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
          <ProposalSectionHeader number={3} icon="\u2600\ufe0f" title="Produccion de energia" subtitle="Tu sistema generara esta energia mes a mes" />
          <GlassCard variant="strong" className="mb-10">
            <ProductionChart
              monthlyProduction={production.monthlyProductionKwh}
              monthlyConsumption={customerInput.monthlyConsumptionKwh || 0}
            />
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 rounded-xl bg-amber-500/5">
                <p className="text-xs text-dark-400">Rendimiento especifico</p>
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
              * Produccion estimada basada en datos de radiacion solar de {province.name} ({province.solarIrradiation} kWh/m2/dia).
              Degradacion anual: {production.degradationRate}%. Los valores reales pueden variar +/-10% segun condiciones climaticas.
            </p>
          </GlassCard>
        </motion.div>

        {/* 8. Section 4: Financial Analysis + IRR Gauge + Payback Timeline */}
        <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
          <ProposalSectionHeader number={4} icon="\ud83d\udcb0" title="Analisis financiero" subtitle="Tu inversion y retorno a 25 anos" />

          {/* Investment */}
          <GlassCard variant="accent" glow className="mb-6">
            <div className="text-center mb-6">
              <p className="text-sm text-dark-400 uppercase tracking-wider">Inversion total</p>
              <p className="text-4xl font-bold text-white mt-2">{formatUsd(financial.totalInvestmentUsd)}</p>
              <p className="text-lg text-dark-400 mt-1">{formatArs(financial.totalInvestmentArs)}</p>
              <p className="text-xs text-dark-500 mt-1">TC: 1 USD = {formatArs(proposal.exchangeRate)}</p>
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
              <FinancialMetricCard label="Ahorro ano 1" value={formatUsd(financial.annualSavingsUsd)} color="text-emerald-400" />
              <FinancialMetricCard label="Periodo de recupero" value={`${financial.paybackYears} anos`} color="text-amber-400" />
              <FinancialMetricCard label="TIR (IRR)" value={`${financial.irr}%`} color="text-solar-300" />
              <FinancialMetricCard label="VAN (NPV)" value={formatUsd(financial.npv)} color="text-purple-400" />
            </div>
          </GlassCard>

          {/* IRR Gauge */}
          <GlassCard variant="strong" className="mb-6">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              <IrrGauge irr={financial.irr} />
              <div className="text-center md:text-start">
                <p className="text-sm text-dark-400 mb-1">En 25 anos, tu sistema generara un ahorro total de</p>
                <p className="text-4xl font-bold gradient-text">
                  {formatUsd(financial.yearlyProjection[24]?.cumulativeSavings || 0)}
                </p>
                <p className="text-dark-400 mt-2">
                  Sobre una inversion de {formatUsd(financial.totalInvestmentUsd)}
                </p>
                <p className="text-emerald-400 font-bold mt-1">
                  ROI {financial.roi25Years}%
                </p>
                <p className="text-sm text-dark-500 mt-2">
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
          <ProposalSectionHeader number={5} icon="\ud83c\udf31" title="Impacto ambiental" subtitle="Tu contribucion al planeta" />
          <GlassCard variant="strong" className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '\ud83c\udfed', label: 'CO2 evitado/ano', value: `${formatNumber(environmental.annualCo2AvoidedKg)} kg`, sub: 'de emisiones' },
                { icon: '\ud83c\udf33', label: 'Equivalente a plantar', value: `${formatNumber(environmental.treesEquivalent)}`, sub: 'arboles' },
                { icon: '\ud83d\ude97', label: 'Autos fuera de ruta', value: `${environmental.carsOffRoad}`, sub: 'vehiculos/ano' },
                { icon: '\ud83c\udf0d', label: 'En 25 anos', value: `${formatNumber(Math.round(environmental.lifetime25YearsCo2Kg / 1000))} ton`, sub: 'CO2 evitadas' },
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

        {/* 10. Section 6: How it works */}
        <motion.div {...fadeUp} transition={{ delay: 0.7 }}>
          <ProposalSectionHeader number={6} icon="\ud83d\udca1" title="Como funciona la energia solar?" subtitle="Una explicacion simple" />
          <GlassCard variant="strong" className="mb-10">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  icon: '\u2600\ufe0f',
                  title: 'Los paneles captan la luz del sol',
                  desc: 'Los paneles solares en tu techo convierten la luz solar en electricidad (corriente continua DC). Funcionan incluso en dias nublados, aunque con menor rendimiento.',
                },
                {
                  step: 2,
                  icon: '\u26a1',
                  title: 'El inversor convierte la energia',
                  desc: 'El inversor transforma la corriente continua (DC) del panel en corriente alterna (AC), que es la que usan todos tus electrodomesticos.',
                },
                {
                  step: 3,
                  icon: '\ud83c\udfe0',
                  title: 'Tu hogar usa la energia',
                  desc: 'La electricidad solar alimenta primero tu casa. Heladera, aire acondicionado, luces - todo funciona con tu propia energia limpia.',
                },
                {
                  step: 4,
                  icon: '\ud83d\udd04',
                  title: 'El excedente va a la red',
                  desc: province.hasNetMetering
                    ? `En ${province.name}, el excedente se inyecta a la red y obtenes un credito en tu factura (${province.netMeteringType === 'net_metering' ? 'Net Metering' : 'Net Billing'}).`
                    : `En ${province.name}, la regulacion de inyeccion esta en proceso. Por ahora, el sistema se disena para autoconsumo maximo.`,
                },
                {
                  step: 5,
                  icon: '\ud83d\udcc9',
                  title: 'Tu factura baja dramaticamente',
                  desc: `Con este sistema, vas a cubrir el ${production.coveragePercentage}% de tu consumo. Tu nueva factura mensual seria aproximadamente ${formatArs(Math.round(customerInput.monthlyBillArs * (1 - production.coveragePercentage / 100)))}.`,
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

        {/* 11. Section 7: Installation Process */}
        <motion.div {...fadeUp} transition={{ delay: 0.8 }}>
          <ProposalSectionHeader number={7} icon="\ud83d\udccb" title="Proceso de instalacion" subtitle="De la propuesta al encendido" />
          <GlassCard variant="strong" className="mb-10">
            <div className="relative">
              <div className="absolute start-6 top-8 bottom-8 w-px bg-gradient-to-b from-solar-500 via-amber-500 to-emerald-500" />
              <div className="space-y-8">
                {[
                  { week: 'Semana 1', title: 'Visita tecnica', desc: 'Un ingeniero visita tu propiedad para evaluar el techo, tomar medidas y verificar la instalacion electrica.' },
                  { week: 'Semana 2', title: 'Diseno e ingenieria', desc: 'Disenamos el sistema con software especializado, optimizando la ubicacion de cada panel.' },
                  { week: 'Semana 2-3', title: 'Tramites y permisos', desc: `Gestionamos todos los permisos ante ${province.utility} y la autoridad regulatoria local.` },
                  { week: 'Semana 3-4', title: 'Instalacion', desc: 'Nuestro equipo instala paneles, inversor, cableado y protecciones. Duracion: 1-3 dias segun el tamano.' },
                  { week: 'Semana 4-5', title: 'Conexion a red', desc: 'Se conecta el sistema a la red, se instala el medidor bidireccional y se realiza la puesta en marcha.' },
                  { week: 'Semana 5+', title: 'Generando energia!', desc: 'Tu sistema esta operativo. Monitoreas la produccion desde tu celular y empezas a ahorrar.' },
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

        {/* 12. Section 8: Regulatory Framework */}
        <motion.div {...fadeUp} transition={{ delay: 0.9 }}>
          <ProposalSectionHeader number={8} icon="\u2696\ufe0f" title="Marco regulatorio" subtitle="Respaldo legal de tu inversion" />
          <GlassCard variant="strong" className="mb-10">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-solar-500/5 border border-solar-500/10">
                <p className="font-semibold text-solar-300">Ley 27.424 - Generacion Distribuida</p>
                <p className="text-sm text-dark-400 mt-1">
                  Argentina aprobo en 2017 la ley de generacion distribuida que permite a hogares y comercios
                  generar su propia energia y vender el excedente a la red. Reglamentada en 2018 por el Decreto 986/2018.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="font-semibold text-amber-300">Beneficios fiscales</p>
                <p className="text-sm text-dark-400 mt-1">
                  Certificado de credito fiscal por hasta 50% del costo de equipos.
                  Deduccion del impuesto a las ganancias.
                  Algunas provincias eximen del impuesto inmobiliario a propiedades con paneles solares.
                </p>
              </div>
              <div className={`p-4 rounded-xl ${province.hasNetMetering ? 'bg-emerald-500/5 border border-emerald-500/10' : 'bg-dark-800/50 border border-dark-700/20'}`}>
                <p className={`font-semibold ${province.hasNetMetering ? 'text-emerald-300' : 'text-dark-300'}`}>
                  {province.name}: {province.hasNetMetering ? 'Net Metering habilitado' : 'En proceso de implementacion'}
                </p>
                <p className="text-sm text-dark-400 mt-1">
                  {province.hasNetMetering
                    ? `La distribuidora ${province.utility} acepta la inyeccion de excedentes bajo el esquema de ${province.netMeteringType === 'net_metering' ? 'Net Metering (compensacion 1:1)' : 'Net Billing (precio mayorista)'}.`
                    : `La provincia esta trabajando en la adhesion a la Ley 27.424. Mientras tanto, el sistema se optimiza para maximo autoconsumo.`
                  }
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* 13. CTA */}
        <motion.div {...fadeUp} transition={{ delay: 1 }} className="text-center mb-16">
          <GlassCard variant="accent" glow className="p-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Listo para empezar?
            </h2>
            <p className="text-dark-400 text-lg mb-6">
              Contactanos para agendar la visita tecnica sin cargo
            </p>
            <p className="text-xs text-dark-500 mt-6">
              Propuesta valida hasta {proposal.validUntil} - Precios sujetos a tipo de cambio - Propuesta no vinculante
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

function ProposalSectionHeader({ number, icon, title, subtitle }: { number: number; icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl animated-border p-[1px]">
        <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-xs text-dark-500 uppercase tracking-widest">Seccion {number}</p>
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

function FinancialMetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center p-3 rounded-xl bg-dark-800/30">
      <p className="text-xs text-dark-400">{label}</p>
      <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

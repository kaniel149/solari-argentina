#!/usr/bin/env python3
"""
Solari Group — Pitch Deck PDF for Ruben (Argentina Partner)
Professional dark-themed PDF showcasing Navitas Israel, Solar OS, Solaris Panama
to position Solari Argentina as part of a global expansion.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, Color
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import os
from datetime import datetime

# === BRAND COLORS ===
DARK_950 = HexColor('#020617')
DARK_900 = HexColor('#0f172a')
DARK_800 = HexColor('#1e293b')
DARK_700 = HexColor('#334155')
DARK_600 = HexColor('#475569')
DARK_500 = HexColor('#64748b')
DARK_400 = HexColor('#94a3b8')
DARK_300 = HexColor('#cbd5e1')
DARK_200 = HexColor('#e2e8f0')
DARK_100 = HexColor('#f1f5f9')

SOLAR_500 = HexColor('#0ea5e9')
SOLAR_400 = HexColor('#38bdf8')
SOLAR_600 = HexColor('#0284c7')
SOLAR_700 = HexColor('#0369a1')

AMBER_500 = HexColor('#f59e0b')
AMBER_400 = HexColor('#fbbf24')
AMBER_600 = HexColor('#d97706')

EMERALD_500 = HexColor('#10b981')
EMERALD_400 = HexColor('#34d399')

WHITE = white
LIGHT_TEXT = HexColor('#e2e8f0')
MUTED_TEXT = HexColor('#94a3b8')

W, H = A4  # 595.28 x 841.89 points

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'Solari-Group-Pitch-2026.pdf')


def draw_bg(c, dark=True):
    """Draw dark gradient background"""
    if dark:
        # Gradient from dark-950 to dark-900
        steps = 40
        for i in range(steps):
            ratio = i / steps
            r = 0.008 + ratio * 0.05
            g = 0.024 + ratio * 0.06
            b = 0.09 + ratio * 0.08
            c.setFillColor(Color(r, g, b))
            y = H - (H / steps) * (i + 1)
            c.rect(0, y, W, H / steps + 1, fill=1, stroke=0)
    # Subtle top glow
    c.setFillColor(Color(0.055, 0.647, 0.914, 0.03))
    c.circle(W / 2, H + 100, 400, fill=1, stroke=0)


def draw_solar_icon(c, x, y, size=30):
    """Draw a simple sun/solar icon"""
    c.setFillColor(AMBER_500)
    c.circle(x, y, size * 0.35, fill=1, stroke=0)
    # Rays
    import math
    c.setStrokeColor(AMBER_400)
    c.setLineWidth(1.5)
    for angle in range(0, 360, 45):
        rad = math.radians(angle)
        x1 = x + math.cos(rad) * size * 0.5
        y1 = y + math.sin(rad) * size * 0.5
        x2 = x + math.cos(rad) * size * 0.7
        y2 = y + math.sin(rad) * size * 0.7
        c.line(x1, y1, x2, y2)


def draw_accent_line(c, x, y, width, color=SOLAR_500):
    """Draw a gradient accent line"""
    c.setStrokeColor(color)
    c.setLineWidth(2)
    c.line(x, y, x + width, y)


def draw_stat_box(c, x, y, number, label, color=SOLAR_400):
    """Draw a stat metric box"""
    # Box background
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.6))
    c.roundRect(x, y, 120, 70, 8, fill=1, stroke=0)
    # Border
    c.setStrokeColor(Color(0.22, 0.74, 0.97, 0.15))
    c.setLineWidth(0.5)
    c.roundRect(x, y, 120, 70, 8, fill=0, stroke=1)
    # Number
    c.setFillColor(color)
    c.setFont('Helvetica-Bold', 24)
    c.drawCentredString(x + 60, y + 38, str(number))
    # Label
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 9)
    c.drawCentredString(x + 60, y + 14, label)


def draw_feature_row(c, x, y, icon_char, title, desc, color=SOLAR_400):
    """Draw a feature row with icon"""
    # Icon circle
    c.setFillColor(Color(color.red, color.green, color.blue, 0.15))
    c.circle(x + 10, y + 6, 10, fill=1, stroke=0)
    c.setFillColor(color)
    c.setFont('Helvetica-Bold', 12)
    c.drawCentredString(x + 10, y + 2, icon_char)
    # Title
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(x + 28, y + 8, title)
    # Description
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 9)
    c.drawString(x + 28, y - 6, desc)


def draw_timeline_dot(c, x, y, label, sublabel, active=False):
    """Draw a timeline dot with label"""
    color = SOLAR_400 if active else DARK_600
    c.setFillColor(color)
    c.circle(x, y, 6, fill=1, stroke=0)
    if active:
        c.setFillColor(Color(0.22, 0.74, 0.97, 0.3))
        c.circle(x, y, 10, fill=1, stroke=0)
        c.setFillColor(SOLAR_400)
        c.circle(x, y, 6, fill=1, stroke=0)
    c.setFillColor(WHITE if active else MUTED_TEXT)
    c.setFont('Helvetica-Bold', 10)
    c.drawCentredString(x, y - 20, label)
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 8)
    c.drawCentredString(x, y - 32, sublabel)


# ============================================================
# PAGE 1: COVER
# ============================================================
def page_cover(c):
    draw_bg(c)

    # Large solar glow
    c.setFillColor(Color(0.055, 0.647, 0.914, 0.05))
    c.circle(W / 2, H * 0.6, 250, fill=1, stroke=0)
    c.setFillColor(Color(0.961, 0.62, 0.043, 0.04))
    c.circle(W / 2, H * 0.6, 180, fill=1, stroke=0)

    draw_solar_icon(c, W / 2, H * 0.68, size=50)

    # Title
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 42)
    c.drawCentredString(W / 2, H * 0.52, 'SOLARI GROUP')

    # Subtitle
    c.setFillColor(SOLAR_400)
    c.setFont('Helvetica', 16)
    c.drawCentredString(W / 2, H * 0.52 - 30, 'Global Solar Technology & Operations')

    # Accent line
    draw_accent_line(c, W / 2 - 60, H * 0.52 - 50, 120, SOLAR_500)

    # Tagline
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 13)
    c.drawCentredString(W / 2, H * 0.52 - 75, 'Israel  \u2022  Panama  \u2022  Argentina')

    # Bottom stats row
    y_stats = H * 0.18
    draw_stat_box(c, W / 2 - 200, y_stats, '50+', 'Empresas Solares', SOLAR_400)
    draw_stat_box(c, W / 2 - 63, y_stats, '3', 'Mercados', AMBER_400)
    draw_stat_box(c, W / 2 + 75, y_stats, '34', 'Funciones CRM', EMERALD_400)

    # Date
    c.setFillColor(DARK_500)
    c.setFont('Helvetica', 9)
    c.drawCentredString(W / 2, 40, f'Febrero 2026  \u2022  Confidencial')

    c.showPage()


# ============================================================
# PAGE 2: ABOUT — WHO WE ARE
# ============================================================
def page_about(c):
    draw_bg(c)

    y = H - 70
    # Section number
    c.setFillColor(SOLAR_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '01')
    draw_accent_line(c, 70, y + 4, 30, SOLAR_500)

    # Title
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Qui\u00e9nes Somos')

    # Subtitle
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 12)
    y -= 60
    lines = [
        'Solari Group es una empresa de tecnolog\u00eda solar con presencia en Israel,',
        u'Panam\u00e1 y Argentina. Desarrollamos plataformas SaaS, herramientas de IA',
        u'y soluciones CRM espec\u00edficas para la industria solar.',
    ]
    for line in lines:
        c.drawString(50, y, line)
        y -= 17

    y -= 20

    # Founder box
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.6))
    c.roundRect(50, y - 100, W - 100, 105, 10, fill=1, stroke=0)
    c.setStrokeColor(Color(0.22, 0.74, 0.97, 0.1))
    c.setLineWidth(0.5)
    c.roundRect(50, y - 100, W - 100, 105, 10, fill=0, stroke=1)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(75, y - 20, 'Kaniel Tord \u2014 Founder & CTO')
    c.setFillColor(SOLAR_400)
    c.setFont('Helvetica', 10)
    c.drawString(75, y - 38, 'KANIEL TORD LLC  \u2022  Florida, USA')
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 10)
    texts = [
        u'\u2022 Fund\u00f3 Navitas \u2014 CRM solar l\u00edder en Israel (50+ empresas)',
        u'\u2022 Ingeniero Full-Stack: React, TypeScript, AI, Supabase',
        u'\u2022 Experiencia en 4 pa\u00edses: Israel, Tailandia, Panam\u00e1, Argentina',
    ]
    ty = y - 56
    for t in texts:
        c.drawString(75, ty, t)
        ty -= 15

    y -= 140

    # Vision
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, u'Visi\u00f3n Global')
    y -= 5
    draw_accent_line(c, 50, y, 60, AMBER_500)
    y -= 25
    c.setFillColor(LIGHT_TEXT)
    c.setFont('Helvetica', 11)
    vision_lines = [
        u'Construir la plataforma tecnol\u00f3gica solar m\u00e1s completa de',
        u'Latinoam\u00e9rica, conectando mercados con software inteligente,',
        u'IA y datos en tiempo real.',
    ]
    for line in vision_lines:
        c.drawString(50, y, line)
        y -= 16

    y -= 30

    # Timeline
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, u'Hoja de Ruta')
    y -= 5
    draw_accent_line(c, 50, y, 60, AMBER_500)
    y -= 50

    # Timeline line
    c.setStrokeColor(DARK_700)
    c.setLineWidth(1.5)
    c.line(100, y, W - 100, y)

    positions = [
        (130, '2020', 'Navitas Israel', True),
        (235, '2024', 'Solar OS SaaS', True),
        (340, '2025', u'Solaris Panam\u00e1', True),
        (445, '2026', 'Solari Argentina', False),
    ]

    for px, year, label, active in positions:
        draw_timeline_dot(c, px, y, year, label, active)

    # Arrow at end
    c.setFillColor(SOLAR_400)
    c.setFont('Helvetica', 14)
    c.drawString(W - 90, y - 3, '\u2192')

    y -= 80

    # Bottom quote
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.4))
    c.roundRect(50, y - 55, W - 100, 55, 8, fill=1, stroke=0)
    c.setFillColor(AMBER_400)
    c.setFont('Helvetica-Bold', 22)
    c.drawString(60, y - 12, '\u201c')
    c.setFillColor(LIGHT_TEXT)
    c.setFont('Helvetica-Oblique', 11)
    c.drawString(78, y - 15, u'Argentina es el pr\u00f3ximo gran mercado solar de Latinoam\u00e9rica.')
    c.drawString(78, y - 32, u'Con la tecnolog\u00eda correcta, podemos liderar esa transici\u00f3n.\u201d')

    c.showPage()


# ============================================================
# PAGE 3: NAVITAS ISRAEL — TRACK RECORD
# ============================================================
def page_navitas(c):
    draw_bg(c)

    y = H - 70
    c.setFillColor(SOLAR_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '02')
    draw_accent_line(c, 70, y + 4, 30, SOLAR_500)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Navitas Israel \u2014 Track Record')

    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 11)
    c.drawString(50, y - 58, u'El CRM solar l\u00edder en Israel, utilizado por 50+ empresas desde 2020.')

    y -= 100

    # Stats row
    stats = [
        ('50+', 'Empresas', SOLAR_400),
        ('34', u'P\u00e1ginas CRM', AMBER_400),
        ('100+', 'Componentes', EMERALD_400),
        ('73', 'Servicios', SOLAR_400),
    ]
    x_start = 50
    for i, (num, label, color) in enumerate(stats):
        draw_stat_box(c, x_start + i * 127, y - 70, num, label, color)

    y -= 160

    # Features list
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, 'Funcionalidades Principales')
    draw_accent_line(c, 50, y - 5, 60, AMBER_500)
    y -= 35

    features = [
        ('\u26a1', u'Gesti\u00f3n de Proyectos', 'Pipeline completo: propuestas, contratos, instalaciones, mantenimiento', SOLAR_400),
        ('\u2600', 'Monitoreo en Tiempo Real', u'SolarEdge + Huawei + Sungrow \u2014 detecci\u00f3n de 5 tipos de fallas', AMBER_400),
        ('\u2696', 'Licencias Regulatorias', u'Gesti\u00f3n IEC + seguimiento SLA + alertas autom\u00e1ticas', EMERALD_400),
        ('\U0001f4ca', 'Dashboard Financiero', u'CFO Dashboard: NPV, IRR, ROI, modelos econ\u00f3micos', SOLAR_400),
        ('\U0001f916', 'Agente IA Global', u'Generaci\u00f3n de propuestas + an\u00e1lisis inteligente con Claude AI', AMBER_400),
        ('\U0001f465', u'Colaboraci\u00f3n', u'Multi-usuario, roles, invitaciones, WhatsApp integrado', EMERALD_400),
    ]

    for icon, title, desc, color in features:
        draw_feature_row(c, 50, y, icon, title, desc, color)
        y -= 35

    y -= 20

    # Clients badge
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.6))
    c.roundRect(50, y - 65, W - 100, 65, 10, fill=1, stroke=0)
    c.setStrokeColor(Color(0.067, 0.729, 0.522, 0.2))
    c.setLineWidth(0.5)
    c.roundRect(50, y - 65, W - 100, 65, 10, fill=0, stroke=1)

    c.setFillColor(EMERALD_400)
    c.setFont('Helvetica-Bold', 12)
    c.drawString(75, y - 18, u'\u2713  En Producci\u00f3n desde 2020')
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 10)
    c.drawString(75, y - 36, u'Usado diariamente por empresas solares para gestionar proyectos,')
    c.drawString(75, y - 50, u'monitorear sistemas, generar propuestas y cumplir regulaciones.')

    y -= 90

    # Live URL
    c.setFillColor(DARK_500)
    c.setFont('Helvetica', 9)
    c.drawCentredString(W / 2, y, u'\U0001f310  crm.navitas.co.il  \u2022  Producci\u00f3n')

    c.showPage()


# ============================================================
# PAGE 4: SOLAR OS — SaaS PLATFORM
# ============================================================
def page_solar_os(c):
    draw_bg(c)

    y = H - 70
    c.setFillColor(SOLAR_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '03')
    draw_accent_line(c, 70, y + 4, 30, SOLAR_500)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Solar OS \u2014 Plataforma SaaS')

    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 11)
    c.drawString(50, y - 58, u'Navitas evolucion\u00f3 a Solar OS: un SaaS escalable para cualquier mercado solar.')

    y -= 100

    # SaaS features
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, u'Caracter\u00edsticas SaaS')
    draw_accent_line(c, 50, y - 5, 60, AMBER_500)
    y -= 35

    saas_features = [
        ('\U0001f9d9', 'Onboarding Wizard', u'6 pasos: bienvenida \u2192 empresa \u2192 equipo \u2192 quickstart \u2192 integraciones \u2192 listo', SOLAR_400),
        ('\U0001f3af', 'Guided Tour', u'5 paradas interactivas con spotlight y tooltips en el dashboard', AMBER_400),
        ('\U0001f3c6', 'Sistema de Logros', u'10 features trackeadas, 7 milestones, notificaciones con confetti', EMERALD_400),
        ('\u23f0', 'Trial de 30 d\u00edas', u'Registro abierto \u2192 trial gratuito \u2192 banner de upgrade \u2192 Stripe checkout', SOLAR_400),
        ('\U0001f4e7', 'Email Automatizado', u'Welcome, team invite, trial reminder, weekly digest (Resend API)', AMBER_400),
        ('\U0001f4f1', 'Alertas WhatsApp', u'Notificaciones de fallas en tiempo real v\u00eda WhatsApp', EMERALD_400),
    ]

    for icon, title, desc, color in saas_features:
        draw_feature_row(c, 50, y, icon, title, desc, color)
        y -= 35

    y -= 15

    # Pricing table
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, 'Planes & Precios')
    draw_accent_line(c, 50, y - 5, 60, AMBER_500)
    y -= 35

    plans = [
        ('Starter', u'\u20aa149/mes', '10 proyectos, 1 plataforma, email', SOLAR_400),
        ('Pro', u'\u20aa349/mes', 'Ilimitado, 3 plataformas, IA, prioridad', AMBER_400),
        ('Enterprise', u'\u20aa749/mes', u'Todo + API, integraciones custom, SLA dedicado', EMERALD_400),
    ]

    for i, (name, price, features, color) in enumerate(plans):
        bx = 50 + i * 167
        # Box
        c.setFillColor(Color(0.059, 0.09, 0.165, 0.6))
        c.roundRect(bx, y - 85, 155, 85, 8, fill=1, stroke=0)
        c.setStrokeColor(Color(color.red, color.green, color.blue, 0.2))
        c.setLineWidth(0.5)
        c.roundRect(bx, y - 85, 155, 85, 8, fill=0, stroke=1)
        # Plan name
        c.setFillColor(color)
        c.setFont('Helvetica-Bold', 13)
        c.drawString(bx + 12, y - 18, name)
        # Price
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 18)
        c.drawString(bx + 12, y - 40, price)
        # Features
        c.setFillColor(MUTED_TEXT)
        c.setFont('Helvetica', 8)
        c.drawString(bx + 12, y - 58, features[:35])
        if len(features) > 35:
            c.drawString(bx + 12, y - 70, features[35:])

    y -= 120

    # Revenue model
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.4))
    c.roundRect(50, y - 55, W - 100, 55, 8, fill=1, stroke=0)
    c.setFillColor(AMBER_400)
    c.setFont('Helvetica-Bold', 12)
    c.drawString(75, y - 15, 'Modelo de Ingresos Recurrentes (MRR)')
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 10)
    c.drawString(75, y - 33, u'50 empresas \u00d7 \u20aa349 avg = \u20aa17,450/mes (\u223c$4,800 USD/mes)')
    c.drawString(75, y - 47, u'Objetivo 2026: 200 empresas \u2192 $19,200 USD/mes MRR')

    c.showPage()


# ============================================================
# PAGE 5: SOLARIS PANAMA
# ============================================================
def page_panama(c):
    draw_bg(c)

    y = H - 70
    c.setFillColor(SOLAR_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '04')
    draw_accent_line(c, 70, y + 4, 30, SOLAR_500)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Solaris Panam\u00e1 \u2014 IA para Solar Comercial')

    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 11)
    c.drawString(50, y - 58, u'Plataforma de an\u00e1lisis solar con inteligencia artificial para el mercado paname\u00f1o.')

    y -= 100

    # AI Tools
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, 'Herramientas de IA')
    draw_accent_line(c, 50, y - 5, 60, AMBER_500)
    y -= 40

    tools = [
        (u'\U0001f9ee', u'Calculadora Solar', [
            u'IRR, NPV, LCOE, proyecciones a 25 a\u00f1os',
            u'Datos por defecto de Panam\u00e1 (irradiaci\u00f3n, tarifas, etc.)',
        ], SOLAR_400),
        (u'\U0001f6f0', u'Esc\u00e1ner de Techos', [
            u'Detecci\u00f3n de edificios v\u00eda sat\u00e9lite (Mapbox + Overpass)',
            u'Investigaci\u00f3n de propietarios: 7 fuentes de datos',
            u'Puntuaci\u00f3n de confianza 0-100 por fuente',
        ], AMBER_400),
        (u'\U0001f4c4', u'Generador de Propuestas', [
            'Claude AI genera propuestas de 8 secciones',
            u'Contexto legal de Panam\u00e1 (Ley 417)',
            u'An\u00e1lisis financiero completo + impacto ambiental',
        ], EMERALD_400),
    ]

    for icon, title, descs, color in tools:
        # Box
        box_h = 20 + len(descs) * 16
        c.setFillColor(Color(0.059, 0.09, 0.165, 0.5))
        c.roundRect(50, y - box_h - 10, W - 100, box_h + 10, 8, fill=1, stroke=0)
        c.setStrokeColor(Color(color.red, color.green, color.blue, 0.15))
        c.setLineWidth(0.5)
        c.roundRect(50, y - box_h - 10, W - 100, box_h + 10, 8, fill=0, stroke=1)

        # Icon + Title
        c.setFillColor(color)
        c.setFont('Helvetica-Bold', 13)
        c.drawString(70, y - 5, f'{icon}  {title}')

        # Description lines
        c.setFillColor(MUTED_TEXT)
        c.setFont('Helvetica', 10)
        dy = y - 22
        for desc in descs:
            c.drawString(90, dy, f'\u2022 {desc}')
            dy -= 15

        y -= box_h + 25

    y -= 10

    # Data sources
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(50, y, u'7 Fuentes de Datos para Investigaci\u00f3n')
    y -= 20

    sources = [
        ('ANATI Catastro', u'Registro de tierras de Panam\u00e1'),
        (u'Panam\u00e1 Emprende', 'Registro de negocios'),
        ('OpenCorporates', u'Informaci\u00f3n corporativa'),
        ('Google Places', 'Detalles de negocios'),
        ('Google Solar API', u'Datos de irradiaci\u00f3n solar'),
        ('PVWatts (NREL)', u'Estimaciones de producci\u00f3n'),
        ('Apollo.io', 'Enriquecimiento de contactos'),
    ]

    for i, (name, desc) in enumerate(sources):
        col = i % 2
        row = i // 2
        bx = 50 + col * 250
        by = y - row * 22
        c.setFillColor(SOLAR_400)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(bx, by, f'\u2022 {name}')
        c.setFillColor(MUTED_TEXT)
        c.setFont('Helvetica', 8)
        c.drawString(bx + len(name) * 5.5 + 15, by, f'\u2014 {desc}')

    c.showPage()


# ============================================================
# PAGE 6: ARGENTINA — THE OPPORTUNITY
# ============================================================
def page_argentina(c):
    draw_bg(c)

    y = H - 70
    c.setFillColor(AMBER_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '05')
    draw_accent_line(c, 70, y + 4, 30, AMBER_500)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Solari Argentina \u2014 La Oportunidad')

    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 11)
    c.drawString(50, y - 58, u'El mercado solar argentino creci\u00f3 92% en 2024. Es el momento de entrar.')

    y -= 105

    # Market stats
    stats = [
        ('92%', 'Crecimiento YoY', AMBER_400),
        ('78 MW', 'DG Instalados', SOLAR_400),
        ('2,918', 'Prosumidores', EMERALD_400),
        ('3-5 a\u00f1os', 'Payback', AMBER_400),
    ]
    for i, (num, label, color) in enumerate(stats):
        draw_stat_box(c, 50 + i * 127, y - 70, num, label, color)

    y -= 155

    # Key factors
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, u'\u00bfPor qu\u00e9 Ahora?')
    draw_accent_line(c, 50, y - 5, 60, AMBER_500)
    y -= 35

    factors = [
        ('\u26a1', u'Tarifas +350%', u'Aumento masivo en 2024 hace que solar sea rentable por primera vez', AMBER_400),
        ('\u2696', 'Ley 27.424', u'Marco regulatorio de generaci\u00f3n distribuida + net billing aprobado', SOLAR_400),
        ('\U0001f3ed', u'F\u00e1brica EPSE', u'400 MW/a\u00f1o de capacidad local (San Juan) \u2192 -15% costos en 2026', EMERALD_400),
        ('\U0001f4b0', u'Financiamiento', u'Banco Naci\u00f3n: hasta 50M ARS, 72 meses + IDB $1.14B + World Bank $480M', SOLAR_400),
        ('\U0001f4c8', u'Mercado Temprano', u'Solo 2,918 prosumidores vs Brasil (2M+) \u2014 enorme potencial de crecimiento', AMBER_400),
    ]

    for icon, title, desc, color in factors:
        draw_feature_row(c, 50, y, icon, title, desc, color)
        y -= 38

    y -= 15

    # Cost breakdown
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(50, y, 'Costos de Sistema (Feb 2026)')
    y -= 20

    costs = [
        ('Residencial (5-10 kWp)', '$1,750 USD/kWp', 'Payback: 3-5 a\u00f1os'),
        ('Comercial (50-500 kWp)', '$1,400 USD/kWp', 'Payback: 2.5-4 a\u00f1os'),
        ('Industrial (500+ kWp)', '$1,200 USD/kWp', 'Payback: 2-3 a\u00f1os'),
    ]

    for i, (segment, cost, payback) in enumerate(costs):
        bx = 50 + i * 167
        c.setFillColor(Color(0.059, 0.09, 0.165, 0.5))
        c.roundRect(bx, y - 60, 155, 60, 8, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 10)
        c.drawString(bx + 10, y - 15, segment)
        c.setFillColor(AMBER_400)
        c.setFont('Helvetica-Bold', 16)
        c.drawString(bx + 10, y - 35, cost)
        c.setFillColor(MUTED_TEXT)
        c.setFont('Helvetica', 9)
        c.drawString(bx + 10, y - 52, payback)

    y -= 85

    # Coverage
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(50, y, 'Cobertura de Provincias')
    y -= 18
    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 10)
    c.drawString(50, y, u'Nuestra plataforma cubre 17 provincias con datos espec\u00edficos:')
    y -= 18
    c.setFont('Helvetica', 9)
    provinces = 'Buenos Aires \u2022 CABA \u2022 C\u00f3rdoba \u2022 Mendoza \u2022 Santa Fe \u2022 Tucum\u00e1n \u2022 San Juan \u2022 Salta'
    c.drawString(50, y, provinces)
    y -= 14
    provinces2 = u'Neuqu\u00e9n \u2022 R\u00edo Negro \u2022 San Luis \u2022 Entre R\u00edos \u2022 Jujuy \u2022 La Pampa \u2022 Chaco \u2022 Misiones \u2022 Catamarca'
    c.drawString(50, y, provinces2)

    c.showPage()


# ============================================================
# PAGE 7: WHAT WE BRING — TECHNOLOGY STACK
# ============================================================
def page_technology(c):
    draw_bg(c)

    y = H - 70
    c.setFillColor(SOLAR_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '06')
    draw_accent_line(c, 70, y + 4, 30, SOLAR_500)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Lo que Aportamos')

    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 11)
    c.drawString(50, y - 58, u'Tecnolog\u00eda probada + experiencia operativa + plataforma lista para escalar.')

    y -= 105

    # Two columns
    col_w = (W - 120) / 2

    # Left column — Technology
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.5))
    c.roundRect(50, y - 260, col_w, 260, 10, fill=1, stroke=0)
    c.setStrokeColor(Color(0.22, 0.74, 0.97, 0.15))
    c.setLineWidth(0.5)
    c.roundRect(50, y - 260, col_w, 260, 10, fill=0, stroke=1)

    c.setFillColor(SOLAR_400)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(68, y - 20, u'\u2699\ufe0f  Tecnolog\u00eda')

    tech_items = [
        'React 18 + TypeScript + Vite',
        'Tailwind CSS + Framer Motion',
        'Supabase (PostgreSQL + Auth + RLS)',
        'Vercel Serverless (API + Deploy)',
        'Claude AI (Anthropic) para IA',
        u'Mapbox GL + Google Solar API',
        'Stripe para pagos',
        'Resend para emails',
        u'WhatsApp para notificaciones',
        u'C\u00f3digo modular y escalable',
    ]
    ty = y - 45
    c.setFont('Helvetica', 10)
    for item in tech_items:
        c.setFillColor(EMERALD_400)
        c.drawString(68, ty, '\u2713')
        c.setFillColor(LIGHT_TEXT)
        c.drawString(82, ty, item)
        ty -= 20

    # Right column — Experience
    rx = 50 + col_w + 20
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.5))
    c.roundRect(rx, y - 260, col_w, 260, 10, fill=1, stroke=0)
    c.setStrokeColor(Color(0.961, 0.62, 0.043, 0.15))
    c.setLineWidth(0.5)
    c.roundRect(rx, y - 260, col_w, 260, 10, fill=0, stroke=1)

    c.setFillColor(AMBER_400)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(rx + 18, y - 20, u'\U0001f4bc  Experiencia')

    exp_items = [
        u'6 a\u00f1os en industria solar',
        '50+ empresas como clientes',
        u'3 mercados internacionales',
        u'CRM en producci\u00f3n (5+ a\u00f1os)',
        u'Integraci\u00f3n con 3 fabricantes',
        u'Sistema de monitoreo 24/7',
        u'Pipeline de ventas probado',
        u'Generaci\u00f3n de propuestas con IA',
        u'An\u00e1lisis financiero avanzado',
        u'Red de proveedores LATAM',
    ]
    ty = y - 45
    c.setFont('Helvetica', 10)
    for item in exp_items:
        c.setFillColor(AMBER_400)
        c.drawString(rx + 18, ty, '\u2713')
        c.setFillColor(LIGHT_TEXT)
        c.drawString(rx + 32, ty, item)
        ty -= 20

    y -= 290

    # What Ruben gets
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(50, y, u'Lo que el Socio en Argentina Recibe')
    draw_accent_line(c, 50, y - 5, 60, AMBER_500)
    y -= 35

    partner_benefits = [
        (u'\U0001f4bb', 'Plataforma Completa', u'CRM + herramientas de propuestas + calculadora solar listas para usar', SOLAR_400),
        (u'\U0001f4da', 'Base de Conocimiento', u'15 m\u00f3dulos de academia solar + gu\u00edas de 8 provincias + regulaciones', AMBER_400),
        (u'\U0001f91d', u'Red de Proveedores', u'Cat\u00e1logo de 7 distribuidores argentinos + 20 modelos de equipos', EMERALD_400),
        (u'\U0001f4ca', 'Datos de Mercado', u'17 provincias con irradiaci\u00f3n, tarifas, y utilidades mapeadas', SOLAR_400),
        (u'\U0001f680', u'Marca Internacional', u'Respaldo de Navitas Israel + Solaris Panam\u00e1 para credibilidad', AMBER_400),
    ]

    for icon, title, desc, color in partner_benefits:
        draw_feature_row(c, 50, y, icon, title, desc, color)
        y -= 38

    c.showPage()


# ============================================================
# PAGE 8: NEXT STEPS + CONTACT
# ============================================================
def page_contact(c):
    draw_bg(c)

    y = H - 70
    c.setFillColor(AMBER_500)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(50, y, '07')
    draw_accent_line(c, 70, y + 4, 30, AMBER_500)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 28)
    c.drawString(50, y - 35, u'Pr\u00f3ximos Pasos')

    y -= 100

    steps = [
        ('1', u'Revisi\u00f3n de Plataforma', u'Acceder al repositorio, explorar las 15 secciones de la plataforma, y probar las herramientas de propuestas solares.', SOLAR_400),
        ('2', 'Estudio de Mercado Local', u'Identificar 3-5 provincias prioritarias, validar precios con distribuidores locales, y mapear competidores.', AMBER_400),
        ('3', 'Primeros Clientes Piloto', u'Generar 10 propuestas solares con la plataforma para clientes reales. Validar el proceso de venta end-to-end.', EMERALD_400),
        ('4', u'Adaptaci\u00f3n Local', u'Agregar proveedores locales, ajustar precios, configurar integraciones con utilidades argentinas.', SOLAR_400),
        ('5', 'Lanzamiento Comercial', u'Definir estructura de precios, comenzar adquisici\u00f3n de clientes con las 10 estrategias incluidas en la plataforma.', AMBER_400),
    ]

    for num, title, desc, color in steps:
        # Number circle
        c.setFillColor(Color(color.red, color.green, color.blue, 0.15))
        c.circle(75, y + 3, 15, fill=1, stroke=0)
        c.setFillColor(color)
        c.setFont('Helvetica-Bold', 14)
        c.drawCentredString(75, y - 3, num)

        # Title
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 13)
        c.drawString(100, y + 5, title)

        # Description
        c.setFillColor(MUTED_TEXT)
        c.setFont('Helvetica', 10)
        # Word wrap manually
        words = desc.split()
        line = ''
        dy = y - 13
        for word in words:
            test = line + ' ' + word if line else word
            if len(test) > 75:
                c.drawString(100, dy, line)
                dy -= 14
                line = word
            else:
                line = test
        if line:
            c.drawString(100, dy, line)

        y -= 70

    y -= 10

    # Contact box
    c.setFillColor(Color(0.059, 0.09, 0.165, 0.6))
    c.roundRect(50, y - 130, W - 100, 130, 12, fill=1, stroke=0)
    # Border gradient effect
    c.setStrokeColor(Color(0.22, 0.74, 0.97, 0.2))
    c.setLineWidth(1)
    c.roundRect(50, y - 130, W - 100, 130, 12, fill=0, stroke=1)

    draw_solar_icon(c, W / 2, y - 20, 20)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 18)
    c.drawCentredString(W / 2, y - 52, 'Kaniel Tord')

    c.setFillColor(SOLAR_400)
    c.setFont('Helvetica', 12)
    c.drawCentredString(W / 2, y - 72, 'k@kanielt.com')

    c.setFillColor(MUTED_TEXT)
    c.setFont('Helvetica', 10)
    c.drawCentredString(W / 2, y - 92, 'kanielt.com  \u2022  github.com/kaniel149  \u2022  +972 50 221 3948')

    c.setFillColor(DARK_500)
    c.setFont('Helvetica', 10)
    c.drawCentredString(W / 2, y - 115, 'KANIEL TORD LLC  \u2022  Florida, USA')

    # Bottom
    c.setFillColor(DARK_600)
    c.setFont('Helvetica', 8)
    c.drawCentredString(W / 2, 40, u'Solari Group  \u2022  Febrero 2026  \u2022  Confidencial')
    c.drawCentredString(W / 2, 28, u'github.com/kaniel149/solari-argentina')

    c.showPage()


# ============================================================
# BUILD PDF
# ============================================================
def build():
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    pdf = canvas.Canvas(OUTPUT_PATH, pagesize=A4)
    pdf.setTitle('Solari Group — Pitch Deck 2026')
    pdf.setAuthor('Kaniel Tord')
    pdf.setSubject('Solar Technology & Operations — Israel, Panama, Argentina')

    page_cover(pdf)
    page_about(pdf)
    page_navitas(pdf)
    page_solar_os(pdf)
    page_panama(pdf)
    page_argentina(pdf)
    page_technology(pdf)
    page_contact(pdf)

    pdf.save()
    print(f'\n\u2705 PDF created: {OUTPUT_PATH}')
    print(f'   Pages: 8')
    size = os.path.getsize(OUTPUT_PATH)
    print(f'   Size: {size / 1024:.0f} KB')


if __name__ == '__main__':
    build()

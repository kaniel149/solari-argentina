#!/usr/bin/env python3
"""
Navitas Energy — Premium Corporate Pitch PDF
With real project photos. Generates Spanish + English versions.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, Color
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PIL import Image
import os, io

W, H = A4
M = 45  # margin
IMG_DIR = '/Users/kanieltordjman/Desktop/projects/navitas-proposal-template/public/projects'
LOGO_DIR = '/Users/kanieltordjman/Desktop/projects/navitas-promo/public'
OUT_DIR = os.path.dirname(os.path.abspath(__file__))

# Brand colors
NAVY = HexColor('#0a1628')
DARK = HexColor('#0f1c32')
CARD_BG = Color(0.08, 0.13, 0.22, 0.75)
BLUE = HexColor('#2563eb')
BLUE_L = HexColor('#60a5fa')
AMBER = HexColor('#f59e0b')
AMBER_L = HexColor('#fbbf24')
GREEN = HexColor('#10b981')
GREEN_L = HexColor('#34d399')
TXT = HexColor('#f1f5f9')
TXT2 = HexColor('#94a3b8')
TXT3 = HexColor('#64748b')
BORDER = Color(0.12, 0.19, 0.37, 0.4)
WHITE = white

# Image mapping
IMGS = {
    'kaplan_aerial': f'{IMG_DIR}/IMG_20210215_212655_398.jpg',       # Commercial rooftop aerial
    'workers_install': f'{IMG_DIR}/IMG_20201208_173204_919.jpg',     # Workers installing panels
    'jinko_delivery': f'{IMG_DIR}/IMG_20210503_162815_986.jpg',      # Jinko Solar truck delivery
    'large_array': f'{IMG_DIR}/IMG_20210528_002044_046.jpg',         # Large rooftop solar array
    'branded_worker': f'{IMG_DIR}/IMG_20210425_205320_446.jpg',      # Worker in NAVITAS shirt
    'mounting_struct': f'{IMG_DIR}/IMG_20201210_084219_490.jpg',     # Mounting structure + inverter
    'welding': f'{IMG_DIR}/IMG_20210421_181903_418.jpg',             # Worker welding in NAVITAS shirt
    'iron_dome': f'{IMG_DIR}/IMG_20210512_200645_762.jpg',           # Worker on roof + Iron Dome
    'roof_harness': f'{IMG_DIR}/IMG_20210607_180329_763.jpg',        # Worker with harness on roof
    'branded_rooftop': f'{IMG_DIR}/IMG_20210413_084635_009.jpg',     # NAVITAS worker carrying equipment
    'panels_close': f'{IMG_DIR}/IMG_20210429_190526_702.jpg',
    'project_a': f'{IMG_DIR}/IMG_20210419_161033_203.jpg',
    'project_b': f'{IMG_DIR}/IMG_20210505_190228_959.jpg',
    'project_c': f'{IMG_DIR}/IMG_20210530_203739_514.jpg',
    'project_d': f'{IMG_DIR}/IMG_20210518_163340_821.jpg',
    'project_e': f'{IMG_DIR}/IMG_20210602_160604_001.jpg',
    'logo_white': f'{LOGO_DIR}/navitas-logo-white.png',
}

# ===== TRANSLATIONS =====
LANG = {
    'es': {
        'subtitle': 'Desarrollo Solar & EPC',
        'regions': u'Israel  \u2022  Europa  \u2022  Latinoam\u00e9rica',
        'mw_label': 'MW Desarrollados',
        'panels_label': 'Paneles Instalados',
        'countries_label': u'Pa\u00edses',
        # Page 2
        'p2_title': u'Qui\u00e9nes Somos',
        'p2_sub': u'Empresa de desarrollo y construcci\u00f3n solar con sede en Israel',
        'p2_desc': [
            u'Navitas Energy es una empresa israelí de energía renovable',
            u'especializada en el desarrollo, financiamiento, ingeniería,',
            u'adquisición y construcción (EPC) de plantas solares a gran escala.',
            u'',
            u'Con más de 80 MW desarrollados y 380,000 paneles instalados,',
            u'operamos en Israel y expandimos a Europa del Este y Latinoamérica.',
        ],
        'p2_pipeline': [
            ('Desarrollo', u'Identificación\nde sitios'),
            (u'Ingeniería', u'Diseño\ntécnico'),
            (u'Adquisición', 'Equipos\ntier-1'),
            (u'Construcción', u'Instalación\ny puesta en marcha'),
            ('O&M', 'Monitoreo\ny mantenimiento'),
        ],
        'partners_title': u'Partners Tecnológicos',
        # Page 3
        'p3_title': u'Proyectos en Israel',
        'p3_sub': u'Más de 80 MW desarrollados en techos comerciales e industriales',
        'p3_types': [
            ('Techos Comerciales', u'Fábricas, almacenes, centros comerciales'),
            ('Campos Solares', u'Plantas utility-scale de 1-50 MW'),
            ('Almacenamiento', u'Sistemas híbridos solar + baterías'),
            ('EV Charging', u'Infraestructura de carga para flotas'),
        ],
        # Page 4
        'p4_title': u'Expansión a Europa',
        'p4_sub': u'NAVITAS Europ Energy LTD — Operaciones en Europa del Este',
        'p4_desc': [
            u'Navitas Europ Energy LTD es la división internacional,',
            u'con equipos operando en Europa del Este. Desarrollamos',
            u'proyectos solares a gran escala y almacenamiento.',
        ],
        'p4_points': [
            (u'Mercados', u'Rumanía, Bulgaria, Serbia, Grecia — alta irradiación y regulación favorable'),
            ('Green Deal', u'Subsidios EU, REPowerEU — aceleran adopción solar'),
            ('Partners', u'Alianzas con desarrolladores y contratistas locales'),
            ('Pipeline', u'Plantas utility-scale con almacenamiento integrado'),
        ],
        # Page 5
        'p5_title': u'Panamá — Entrada LATAM',
        'p5_sub': u'Solaris Panamá: análisis solar con IA para mercado C&I',
        'p5_desc': [
            u'Primera operación de Navitas en Latinoamérica.',
            u'Herramientas de IA para identificar y cerrar',
            u'proyectos solares comerciales (Ley 417).',
        ],
        'p5_tools': [
            (u'Escáner de Techos', u'Detección satelital + calificación A-D'),
            (u'Investigación IA', u'7 fuentes de datos + scoring de confianza'),
            (u'Calculadora', u'IRR, NPV, LCOE, proyecciones 25 años'),
            ('Propuestas IA', u'Claude AI genera propuestas de 8 secciones'),
        ],
        # Page 6
        'p6_title': u'Solari Argentina — Su Proyecto Solar',
        'p6_sub': u'Respaldo internacional para su inversión en energía solar',
        'p6_factors': [
            (u'Experiencia Global', u'+80 MW construidos en Israel y Europa respaldan cada proyecto'),
            (u'Equipos Tier-1', u'Paneles Jinko/LONGi, inversores SolarEdge/Huawei — garantía real'),
            (u'EPC Llave en Mano', u'Diseño, ingeniería, instalación y puesta en marcha — todo incluido'),
            (u'Monitoreo 24/7', u'Seguimiento remoto de producción y alertas de fallas en tiempo real'),
            (u'Cumplimiento Legal', u'Gestión completa bajo Ley 27.424 y conexión con su distribuidora'),
        ],
        'p6_segments': [
            ('Residencial', '5-10 kWp', '$1,750/kWp', u'3-5 años'),
            ('Comercial', '50-500 kWp', '$1,400/kWp', u'2.5-4 años'),
            ('Industrial', '500+ kWp', '$1,200/kWp', u'2-3 años'),
        ],
        # Page 7
        'p7_title': 'Liderazgo',
        'p7_sub': u'Fundador y CEO de Navitas Energy',
        'team': [
            ('Kaniel Turgeman', 'CEO & Co-Founder — Navitas Energy LTD',
             [
                 u'Fundó Navitas Energy en Israel a los 23 años.',
                 u'Lideró el desarrollo y construcción de +80 MW en proyectos solares.',
                 u'Expandió operaciones a Europa del Este (Rumanía, Bulgaria, Serbia).',
                 u'Lanzó Solaris Panamá como primera operación LATAM.',
                 u'Desarrolló plataforma de software CRM + IA para gestión solar.',
                 u'Experiencia directa en EPC, financiamiento y regulación en 3 continentes.',
             ]),
        ],
        # Page 8
        'p8_title': 'Estrategia Global',
        'p8_sub': 'Un modelo probado que se replica en nuevos mercados',
        'p8_regions': [
            (u'ISRAEL', u'✅ 80+ MW', GREEN),
            (u'EUROPA', u'🟡 Expandiendo', AMBER),
            (u'PANAMÁ', u'🟡 Desarrollando', BLUE_L),
            (u'ARGENTINA', u'🔵 Próximo', BLUE),
        ],
        'contact_line': u'Israel  •  Europa  •  Panamá  •  Argentina',
        'confidential': 'Confidencial  •  Febrero 2026',
    },
    'en': {
        'subtitle': 'Solar Development & EPC',
        'regions': u'Israel  \u2022  Europe  \u2022  Latin America',
        'mw_label': 'MW Developed',
        'panels_label': 'Panels Installed',
        'countries_label': 'Countries',
        'p2_title': 'Who We Are',
        'p2_sub': 'Solar development and construction company based in Israel',
        'p2_desc': [
            'Navitas Energy is an Israeli renewable energy company',
            'specializing in the development, financing, engineering,',
            'procurement and construction (EPC) of large-scale solar',
            'photovoltaic power plants.',
            '',
            'With over 80 MW developed and 380,000 panels installed,',
            'we operate in Israel and expand across Eastern Europe and LATAM.',
        ],
        'p2_pipeline': [
            ('Development', 'Site identification\n& permits'),
            ('Engineering', 'Technical\ndesign'),
            ('Procurement', 'Tier-1\nequipment'),
            ('Construction', 'Installation\n& commissioning'),
            ('O&M', 'Monitoring\n& maintenance'),
        ],
        'partners_title': 'Technology Partners',
        'p3_title': 'Projects in Israel',
        'p3_sub': 'Over 80 MW developed across commercial and industrial rooftops',
        'p3_types': [
            ('Commercial Rooftops', 'Factories, warehouses, shopping centers'),
            ('Solar Fields', 'Utility-scale plants from 1-50 MW'),
            ('Energy Storage', u'Hybrid solar + battery systems'),
            ('EV Charging', 'Fleet charging infrastructure'),
        ],
        'p4_title': 'European Expansion',
        'p4_sub': 'NAVITAS Europ Energy LTD — Eastern European Operations',
        'p4_desc': [
            'Navitas Europ Energy LTD is the international division,',
            'with professional teams operating across Eastern Europe.',
            'We develop utility-scale solar and storage projects.',
        ],
        'p4_points': [
            ('Markets', u'Romania, Bulgaria, Serbia, Greece — high irradiation & favorable regulation'),
            ('Green Deal', 'EU subsidies, REPowerEU — accelerating solar adoption'),
            ('Partners', 'Alliances with local developers and contractors'),
            ('Pipeline', 'Utility-scale plants with integrated storage'),
        ],
        'p5_title': u'Panama — LATAM Entry',
        'p5_sub': 'Solaris Panama: AI-powered solar analysis for C&I market',
        'p5_desc': [
            "Navitas' first operation in Latin America.",
            'AI tools to identify and close commercial',
            'solar projects under Law 417.',
        ],
        'p5_tools': [
            ('Roof Scanner', 'Satellite detection + A-D grading'),
            ('AI Research', '7 data sources + confidence scoring'),
            ('Calculator', 'IRR, NPV, LCOE, 25-year projections'),
            ('AI Proposals', 'Claude AI generates 8-section proposals'),
        ],
        'p6_title': u'Solari Argentina — Your Solar Project',
        'p6_sub': 'International backing for your solar energy investment',
        'p6_factors': [
            ('Global Experience', '+80 MW built in Israel & Europe backing every project'),
            ('Tier-1 Equipment', 'Jinko/LONGi panels, SolarEdge/Huawei inverters — real warranties'),
            ('Turnkey EPC', 'Design, engineering, installation & commissioning — all included'),
            ('24/7 Monitoring', 'Remote production tracking & real-time fault alerts'),
            ('Legal Compliance', 'Full management under Law 27.424 & utility grid connection'),
        ],
        'p6_segments': [
            ('Residential', '5-10 kWp', '$1,750/kWp', '3-5 years'),
            ('Commercial', '50-500 kWp', '$1,400/kWp', '2.5-4 years'),
            ('Industrial', '500+ kWp', '$1,200/kWp', '2-3 years'),
        ],
        'p7_title': 'Leadership',
        'p7_sub': 'Founder & CEO of Navitas Energy',
        'team': [
            ('Kaniel Turgeman', 'CEO & Co-Founder — Navitas Energy LTD',
             [
                 'Founded Navitas Energy in Israel at age 23.',
                 'Led the development and construction of +80 MW in solar projects.',
                 'Expanded operations to Eastern Europe (Romania, Bulgaria, Serbia).',
                 'Launched Solaris Panama as first LATAM operation.',
                 'Built in-house CRM + AI software platform for solar management.',
                 'Hands-on experience in EPC, financing & regulation across 3 continents.',
             ]),
        ],
        'p8_title': 'Global Strategy',
        'p8_sub': 'A proven model replicated across new markets',
        'p8_regions': [
            ('ISRAEL', u'✅ 80+ MW', GREEN),
            ('EUROPE', u'🟡 Expanding', AMBER),
            (u'PANAMA', u'🟡 Developing', BLUE_L),
            ('ARGENTINA', u'🔵 Next', BLUE),
        ],
        'contact_line': u'Israel  •  Europe  •  Panama  •  Argentina',
        'confidential': 'Confidential  •  February 2026',
    },
}


def load_img(path, max_w=None, max_h=None):
    """Load and optionally resize image for PDF embedding."""
    img = Image.open(path)
    if img.mode == 'RGBA':
        bg_img = Image.new('RGB', img.size, (15, 28, 50))
        bg_img.paste(img, mask=img.split()[3])
        img = bg_img
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    if max_w and max_h:
        img.thumbnail((max_w * 3, max_h * 3), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=88)
    buf.seek(0)
    return ImageReader(buf)


def bg(c):
    steps = 30
    for i in range(steps):
        r = i / steps
        c.setFillColor(Color(0.039 + r * 0.018, 0.086 + r * 0.022, 0.157 + r * 0.025))
        yy = H - (H / steps) * (i + 1)
        c.rect(0, yy, W, H / steps + 1, fill=1, stroke=0)


def dark_overlay(c, x, y, w, h, opacity=0.6):
    c.setFillColor(Color(0.04, 0.08, 0.15, opacity))
    c.rect(x, y, w, h, fill=1, stroke=0)


def card(c, x, y, w, h, border_col=BORDER):
    c.setFillColor(CARD_BG)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=0)
    c.setStrokeColor(border_col)
    c.setLineWidth(0.5)
    c.roundRect(x, y, w, h, 8, fill=0, stroke=1)


def draw_img_card(c, x, y, w, h, img_path, radius=8):
    """Draw image inside a rounded card area."""
    c.saveState()
    p = c.beginPath()
    p.roundRect(x, y, w, h, radius)
    c.clipPath(p, stroke=0)
    img = load_img(img_path, int(w), int(h))
    # Calculate aspect-fill
    iw, ih = Image.open(img_path).size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx = x - (dw - w) / 2
    dy = y - (dh - h) / 2
    c.drawImage(img, dx, dy, dw, dh)
    c.restoreState()


def accent(c, x, y, w, col=BLUE):
    c.setStrokeColor(col)
    c.setLineWidth(2.5)
    c.line(x, y, x + w, y)


def stat(c, x, y, num, label, col=BLUE_L):
    card(c, x, y, 112, 68)
    c.setFillColor(col)
    c.setFont('Helvetica-Bold', 26)
    c.drawCentredString(x + 56, y + 38, str(num))
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 8)
    c.drawCentredString(x + 56, y + 14, label)


def footer(c, text):
    c.setFillColor(TXT3)
    c.setFont('Helvetica', 7)
    c.drawCentredString(W / 2, 22, text)


# ============================================================
# PAGES
# ============================================================

def p1_cover(c, L):
    """Full-bleed hero image cover."""
    # Hero image - full page
    draw_img_card(c, 0, 0, W, H, IMGS['large_array'], radius=0)
    # Dark gradient overlay (bottom heavy)
    for i in range(40):
        r = i / 40
        c.setFillColor(Color(0.04, 0.08, 0.15, r * 0.92))
        c.rect(0, H * (1 - r) * 0.65, W, H * 0.65 / 40 + 1, fill=1, stroke=0)
    # Full dark bottom
    dark_overlay(c, 0, 0, W, H * 0.38, 0.93)

    # NAVITAS
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 44)
    c.drawString(M, H * 0.30, 'NAVITAS')
    c.setFillColor(BLUE_L)
    c.setFont('Helvetica', 15)
    c.drawString(M, H * 0.30 - 24, 'ENERGY LTD')

    # Subtitle
    accent(c, M, H * 0.30 - 42, 50, BLUE)
    c.setFillColor(TXT)
    c.setFont('Helvetica', 14)
    c.drawString(M, H * 0.30 - 62, L['subtitle'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, H * 0.30 - 80, L['regions'])

    # Stats row at bottom
    sy = 55
    stat(c, M, sy, '80+', L['mw_label'], BLUE_L)
    stat(c, M + 125, sy, '380K', L['panels_label'], AMBER_L)
    stat(c, M + 250, sy, '3', L['countries_label'], GREEN_L)

    c.showPage()


def p2_about(c, L):
    """About page with branded worker photo."""
    bg(c)
    y = H - 60

    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '01')
    accent(c, M + 20, y + 4, 25)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p2_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p2_sub'])

    y -= 80

    # Two columns: image left, text right
    img_w = 180
    draw_img_card(c, M, y - 230, img_w, 230, IMGS['branded_worker'])
    # Dark badge on image
    dark_overlay(c, M, y - 230, img_w, 28, 0.7)
    c.setFillColor(AMBER_L)
    c.setFont('Helvetica-Bold', 8)
    c.drawCentredString(M + img_w / 2, y - 222, 'NAVITAS ENERGY LTD')

    # Text right
    tx = M + img_w + 18
    tw = W - tx - M
    c.setFillColor(TXT)
    c.setFont('Helvetica', 10)
    ty = y - 10
    for line in L['p2_desc']:
        if line:
            c.drawString(tx, ty, line)
        ty -= 14

    # Second image
    ty -= 12
    img2_h = 100
    draw_img_card(c, tx, ty - img2_h, tw, img2_h, IMGS['branded_rooftop'])

    y -= 260

    # Vertical integration pipeline
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(M, y, u'EPC Integrado Vertical' if 'Desarrollo' in L['p2_pipeline'][0][0] else 'Vertical EPC Integration')
    accent(c, M, y - 5, 45, AMBER)
    y -= 35

    steps = L['p2_pipeline']
    sw = (W - M * 2) / len(steps)
    for i, (title, desc) in enumerate(steps):
        sx = M + i * sw + sw / 2
        c.setFillColor(BLUE if i < 4 else AMBER)
        c.circle(sx, y, 5, fill=1, stroke=0)
        if i < len(steps) - 1:
            c.setStrokeColor(Color(0.15, 0.39, 0.92, 0.3))
            c.setLineWidth(1)
            c.line(sx + 7, y, sx + sw - 7, y)
        c.setFillColor(TXT)
        c.setFont('Helvetica-Bold', 8)
        c.drawCentredString(sx, y - 15, title)
        c.setFillColor(TXT3)
        c.setFont('Helvetica', 7)
        for j, dl in enumerate(desc.split('\n')):
            c.drawCentredString(sx, y - 26 - j * 10, dl)

    y -= 60

    # Partners
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 12)
    c.drawString(M, y, L['partners_title'])
    accent(c, M, y - 5, 40, BLUE)
    y -= 28

    partners = ['SolarEdge', 'Huawei', 'JA Solar', 'Jinko Solar', 'LONGi', 'Sungrow', 'SMA', 'ABB']
    pw = 55
    for i, name in enumerate(partners):
        bx = M + (i % 4) * (pw + 12)
        by = y - (i // 4) * 30
        card(c, bx, by - 22, pw, 22)
        c.setFillColor(TXT3)
        c.setFont('Helvetica-Bold', 7)
        c.drawCentredString(bx + pw / 2, by - 15, name)

    footer(c, L['confidential'])
    c.showPage()


def p3_israel(c, L):
    """Israel projects with photo grid."""
    bg(c)
    y = H - 60

    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '02')
    accent(c, M + 20, y + 4, 25)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p3_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p3_sub'])

    y -= 75

    # Photo grid — 2x2 large
    gw = (W - M * 2 - 10) / 2
    gh = 135
    photos = [
        (IMGS['workers_install'], u'Instalación de paneles' if 'es' in str(L.get('subtitle','es')) else 'Panel Installation'),
        (IMGS['large_array'], u'Array solar completado' if 'EPC' in L.get('subtitle','') else 'Completed Solar Array'),
        (IMGS['mounting_struct'], u'Estructura de montaje' if 'EPC' in L.get('subtitle','') else 'Mounting Structure'),
        (IMGS['jinko_delivery'], u'Logística Jinko Solar' if 'EPC' in L.get('subtitle','') else 'Jinko Solar Logistics'),
    ]

    for i, (img_path, caption) in enumerate(photos):
        col, row = i % 2, i // 2
        bx = M + col * (gw + 10)
        by = y - (row + 1) * (gh + 8) + gh + 8

        draw_img_card(c, bx, by - gh, gw, gh, img_path)
        # Caption overlay
        dark_overlay(c, bx, by - gh, gw, 22, 0.75)
        c.setFillColor(TXT)
        c.setFont('Helvetica-Bold', 8)
        c.drawString(bx + 8, by - gh + 7, caption)

    y -= (gh + 8) * 2 + 15

    # Stats row
    stats_data = [
        ('80+', 'MW', BLUE_L), ('380K', L['panels_label'], AMBER_L),
        ('50+', L['p3_types'][0][0][:8], GREEN_L), ('6+', u'Años' if 'EPC' in L.get('subtitle','') else 'Years', BLUE_L),
    ]
    for i, (num, label, col) in enumerate(stats_data):
        stat(c, M + i * 122, y - 68, num, label, col)

    y -= 95

    # Project types
    types_colors = [AMBER, BLUE_L, GREEN, BLUE]
    for i, (title, desc) in enumerate(L['p3_types']):
        col = i % 2
        row = i // 2
        bx = M + col * ((W - M * 2 - 10) / 2 + 10)
        bw = (W - M * 2 - 10) / 2
        by = y - row * 38
        card(c, bx, by - 30, bw, 30, types_colors[i])
        c.setFillColor(types_colors[i])
        c.setFont('Helvetica-Bold', 9)
        c.drawString(bx + 10, by - 10, title)
        c.setFillColor(TXT2)
        c.setFont('Helvetica', 8)
        c.drawString(bx + 10, by - 23, desc)

    footer(c, L['confidential'])
    c.showPage()


def p4_europe(c, L):
    """Europe expansion with worker on roof photo."""
    bg(c)
    y = H - 60

    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '03')
    accent(c, M + 20, y + 4, 25)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p4_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p4_sub'])

    y -= 80

    # Hero image — worker with harness on industrial roof
    draw_img_card(c, M, y - 200, W - M * 2, 200, IMGS['roof_harness'])
    # Overlay at bottom of image
    dark_overlay(c, M, y - 200, W - M * 2, 50, 0.8)
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M + 15, y - 172, 'navitas-eur.com')
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 9)
    for i, line in enumerate(L['p4_desc']):
        c.drawString(M + 15, y - 186 - i * 12, line)

    y -= 225

    # Key points
    colors = [BLUE_L, GREEN, AMBER, BLUE_L]
    for i, (title, desc) in enumerate(L['p4_points']):
        card(c, M, y - 38, W - M * 2, 38, colors[i])
        c.setFillColor(colors[i])
        c.setFont('Helvetica-Bold', 10)
        c.drawString(M + 14, y - 12, title)
        c.setFillColor(TXT2)
        c.setFont('Helvetica', 9)
        c.drawString(M + 14, y - 28, desc[:80])
        if len(desc) > 80:
            c.drawString(M + 14, y - 38, desc[80:])
        y -= 48

    # Small photo row at bottom
    y -= 5
    small_w = (W - M * 2 - 10) / 2
    draw_img_card(c, M, y - 90, small_w, 90, IMGS['welding'])
    dark_overlay(c, M, y - 90, small_w, 20, 0.7)
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 8)
    label_fab = u'Fabricación en campo' if 'Desarrollo' in str(L.get('subtitle','es')) else 'Field Fabrication'
    c.drawString(M + 8, y - 83, label_fab)

    draw_img_card(c, M + small_w + 10, y - 90, small_w, 90, IMGS['iron_dome'])
    dark_overlay(c, M + small_w + 10, y - 90, small_w, 20, 0.7)
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 8)
    label_res = u'Resiliencia operativa' if 'Desarrollo' in str(L.get('subtitle','es')) else 'Operational Resilience'
    c.drawString(M + small_w + 18, y - 83, label_res)

    footer(c, L['confidential'])
    c.showPage()


def p5_panama(c, L):
    """Panama LATAM entry."""
    bg(c)
    y = H - 60

    c.setFillColor(AMBER)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '04')
    accent(c, M + 20, y + 4, 25, AMBER)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p5_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p5_sub'])

    y -= 80

    # Description card
    card(c, M, y - 58, W - M * 2, 58)
    c.setFillColor(TXT)
    c.setFont('Helvetica', 10)
    ty = y - 14
    for line in L['p5_desc']:
        c.drawString(M + 16, ty, line)
        ty -= 14

    y -= 80

    # AI Tools grid
    is_es = 'Desarrollo' in str(L.get('subtitle', ''))
    title_tools = 'Herramientas de IA' if is_es else 'AI Tools'
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(M, y, title_tools)
    accent(c, M, y - 5, 45, AMBER)
    y -= 35

    icons = [u'\U0001f6f0', u'\U0001f50d', u'\U0001f9ee', u'\U0001f4c4']
    colors = [AMBER, BLUE_L, GREEN, AMBER]
    for i, (title, desc) in enumerate(L['p5_tools']):
        col, row = i % 2, i // 2
        bx = M + col * ((W - M * 2 - 10) / 2 + 10)
        bw = (W - M * 2 - 10) / 2
        by = y - row * 60

        card(c, bx, by - 50, bw, 50, colors[i])
        c.setFillColor(colors[i])
        c.setFont('Helvetica-Bold', 10)
        c.drawString(bx + 12, by - 15, title)
        c.setFillColor(TXT2)
        c.setFont('Helvetica', 9)
        c.drawString(bx + 12, by - 32, desc)

    y -= 145

    # Photo from projects
    draw_img_card(c, M, y - 180, W - M * 2, 180, IMGS['panels_close'])
    dark_overlay(c, M, y - 180, W - M * 2, 35, 0.8)
    c.setFillColor(AMBER_L)
    c.setFont('Helvetica-Bold', 10)
    val_label = u'Valor Estratégico: Panamá valida el modelo LATAM' if is_es else 'Strategic Value: Panama validates the LATAM model'
    c.drawString(M + 15, y - 165, val_label)
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 9)
    val_desc = u'Argentina es el siguiente paso natural de esta estrategia.' if is_es else 'Argentina is the natural next step in this strategy.'
    c.drawString(M + 15, y - 178, val_desc)

    footer(c, L['confidential'])
    c.showPage()


def p6_argentina(c, L):
    """Argentina opportunity."""
    bg(c)
    y = H - 60

    c.setFillColor(AMBER)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '05')
    accent(c, M + 20, y + 4, 25, AMBER)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p6_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p6_sub'])

    y -= 80

    # Stats
    is_es = u'años' in L['p6_segments'][0][3]
    stats_data = [
        ('80+', 'MW', AMBER_L), ('380K', 'Paneles' if is_es else 'Panels', BLUE_L),
        ('6+', u'Años EPC' if is_es else 'Years EPC', GREEN_L), ('3', u'Continentes' if is_es else 'Continents', AMBER_L),
    ]
    for i, (num, label, col) in enumerate(stats_data):
        stat(c, M + i * 122, y - 68, num, label, col)

    y -= 95

    # Factors
    title_what = u'Lo Que Ofrecemos' if is_es else 'What We Deliver'
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(M, y, title_what)
    accent(c, M, y - 5, 45, AMBER)
    y -= 30

    factor_colors = [AMBER, BLUE_L, GREEN, BLUE_L, AMBER]
    for i, (title, desc) in enumerate(L['p6_factors']):
        c.setFillColor(factor_colors[i])
        c.setFont('Helvetica-Bold', 10)
        c.drawString(M + 5, y, f'\u2022  {title}')
        c.setFillColor(TXT2)
        c.setFont('Helvetica', 9)
        c.drawString(M + 20, y - 14, desc)
        y -= 30

    y -= 10

    # Segments
    title_cost = 'Costos & Retorno' if is_es else 'Costs & Returns'
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(M, y, title_cost)
    accent(c, M, y - 5, 45, BLUE)
    y -= 35

    seg_colors = [AMBER, BLUE_L, GREEN]
    col_w = (W - M * 2 - 20) / 3
    for i, (seg, size, cost, payback) in enumerate(L['p6_segments']):
        bx = M + i * (col_w + 10)
        card(c, bx, y - 70, col_w, 70, seg_colors[i])
        c.setFillColor(seg_colors[i])
        c.setFont('Helvetica-Bold', 11)
        c.drawString(bx + 10, y - 14, seg)
        c.setFillColor(TXT3)
        c.setFont('Helvetica', 8)
        c.drawString(bx + 10, y - 27, size)
        c.setFillColor(TXT)
        c.setFont('Helvetica-Bold', 16)
        c.drawString(bx + 10, y - 46, cost)
        c.setFillColor(TXT2)
        c.setFont('Helvetica', 8)
        c.drawString(bx + 10, y - 60, f'Payback: {payback}')

    y -= 95

    # Bottom photo
    draw_img_card(c, M, y - 110, W - M * 2, 110, IMGS['project_d'])
    dark_overlay(c, M, y - 110, W - M * 2, 25, 0.75)
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 9)
    label_17 = u'Cobertura en 17 provincias con servicio completo' if is_es else 'Coverage across 17 provinces with full service'
    c.drawString(M + 12, y - 100, label_17)

    footer(c, L['confidential'])
    c.showPage()


def p7_team(c, L):
    """Leadership page — Kaniel only, with photos."""
    bg(c)
    y = H - 60

    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '06')
    accent(c, M + 20, y + 4, 25)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p7_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p7_sub'])

    y -= 85

    # Kaniel profile — large card
    name, role, points = L['team'][0]
    card(c, M, y - 210, W - M * 2, 210, BLUE_L)

    # Large initials circle
    c.setFillColor(Color(BLUE_L.red, BLUE_L.green, BLUE_L.blue, 0.15))
    c.circle(M + 45, y - 40, 30, fill=1, stroke=0)
    c.setFillColor(BLUE_L)
    c.setFont('Helvetica-Bold', 24)
    c.drawCentredString(M + 45, y - 48, 'KT')

    # Name & Role
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 18)
    c.drawString(M + 88, y - 26, name)
    c.setFillColor(BLUE_L)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M + 88, y - 44, role)

    # Contact
    c.setFillColor(TXT3)
    c.setFont('Helvetica', 9)
    c.drawString(M + 88, y - 60, 'k@kanielt.com')

    # Bio bullet points
    accent(c, M + 20, y - 80, 40, AMBER)
    by = y - 95
    for point in points:
        c.setFillColor(AMBER_L)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(M + 20, by, u'\u25B8')
        c.setFillColor(TXT)
        c.setFont('Helvetica', 10)
        c.drawString(M + 35, by, point)
        by -= 18

    y -= 235

    # Photo grid — 2 large + 2 small showing real work
    is_es = L['p7_title'] == 'Liderazgo'
    pw_large = (W - M * 2 - 10) / 2
    ph_large = 165

    # Two large photos
    draw_img_card(c, M, y - ph_large, pw_large, ph_large, IMGS['branded_worker'])
    dark_overlay(c, M, y - ph_large, pw_large, 22, 0.75)
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 8)
    cap1 = u'Equipo NAVITAS en campo' if is_es else 'NAVITAS team in the field'
    c.drawString(M + 8, y - ph_large + 7, cap1)

    draw_img_card(c, M + pw_large + 10, y - ph_large, pw_large, ph_large, IMGS['iron_dome'])
    dark_overlay(c, M + pw_large + 10, y - ph_large, pw_large, 22, 0.75)
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 8)
    cap2 = u'Resiliencia operativa — Israel' if is_es else 'Operational resilience — Israel'
    c.drawString(M + pw_large + 18, y - ph_large + 7, cap2)

    y -= ph_large + 12

    # Three small photos at bottom
    pw_small = (W - M * 2 - 16) / 3
    ph_small = 80
    strip = [
        (IMGS['welding'], u'Fabricación' if is_es else 'Fabrication'),
        (IMGS['roof_harness'], u'Seguridad' if is_es else 'Safety'),
        (IMGS['kaplan_aerial'], u'Proyecto completado' if is_es else 'Completed project'),
    ]
    for i, (img, cap) in enumerate(strip):
        bx = M + i * (pw_small + 8)
        draw_img_card(c, bx, y - ph_small, pw_small, ph_small, img)
        dark_overlay(c, bx, y - ph_small, pw_small, 18, 0.75)
        c.setFillColor(TXT)
        c.setFont('Helvetica-Bold', 7)
        c.drawString(bx + 6, y - ph_small + 5, cap)

    footer(c, L['confidential'])
    c.showPage()


def p8_strategy(c, L):
    """Global strategy + contact."""
    bg(c)
    y = H - 60

    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, y, '07')
    accent(c, M + 20, y + 4, 25)

    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 24)
    c.drawString(M, y - 30, L['p8_title'])
    c.setFillColor(TXT2)
    c.setFont('Helvetica', 11)
    c.drawString(M, y - 48, L['p8_sub'])

    y -= 85

    # Region cards 2x2
    col_w = (W - M * 2 - 12) / 2
    for i, (name, status, color) in enumerate(L['p8_regions']):
        col, row = i % 2, i // 2
        bx = M + col * (col_w + 12)
        by = y - row * 75

        card(c, bx, by - 65, col_w, 65, color)
        c.setFillColor(color)
        c.setFont('Helvetica-Bold', 16)
        c.drawString(bx + 14, by - 20, name)
        c.setFillColor(TXT)
        c.setFont('Helvetica', 11)
        c.drawString(bx + 14, by - 40, status)

    y -= 175

    # Model description
    is_es = L['p8_title'].startswith('E')
    model_title = u'Modelo de Expansión' if is_es else 'Expansion Model'
    c.setFillColor(TXT)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(M, y, model_title)
    accent(c, M, y - 5, 45, AMBER)
    y -= 28

    model_points = [
        (u'Tecnología y experiencia EPC de Israel como base' if is_es else 'Israeli EPC technology and experience as foundation'),
        (u'Plataforma de software + IA desarrollada internamente' if is_es else 'In-house software platform + AI tools'),
        (u'Socio local en cada país para ejecución y ventas' if is_es else 'Local partner in each country for execution and sales'),
        (u'Modelo replicable: Israel → Europa → Panamá → Argentina' if is_es else u'Replicable model: Israel → Europe → Panama → Argentina'),
    ]
    for point in model_points:
        c.setFillColor(BLUE_L)
        c.drawString(M + 5, y, u'→')
        c.setFillColor(TXT)
        c.setFont('Helvetica', 10)
        c.drawString(M + 22, y, point)
        y -= 18

    y -= 20

    # Hero photo
    draw_img_card(c, M, y - 105, W - M * 2, 105, IMGS['project_e'])
    dark_overlay(c, M, y - 105, W - M * 2, 105, 0.55)

    # Contact overlay on photo
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 22)
    c.drawCentredString(W / 2, y - 30, 'NAVITAS ENERGY LTD')

    c.setFillColor(BLUE_L)
    c.setFont('Helvetica', 11)
    c.drawCentredString(W / 2, y - 50, u'navitas.co.il  •  navitas-eur.com')

    c.setFillColor(TXT)
    c.setFont('Helvetica', 10)
    c.drawCentredString(W / 2, y - 68, u'Kaniel Turgeman, CEO  •  k@kanielt.com')

    c.setFillColor(TXT2)
    c.setFont('Helvetica', 9)
    c.drawCentredString(W / 2, y - 84, L['contact_line'])

    footer(c, L['confidential'])
    c.showPage()


# ============================================================
# BUILD
# ============================================================
def build_pdf(lang_code):
    L = LANG[lang_code]
    suffix = 'ES' if lang_code == 'es' else 'EN'
    path = os.path.join(OUT_DIR, f'Navitas-Energy-Pitch-{suffix}.pdf')

    pdf = canvas.Canvas(path, pagesize=A4)
    pdf.setTitle(f'Navitas Energy — Corporate Presentation 2026 ({suffix})')
    pdf.setAuthor('Navitas Energy LTD')
    pdf.setSubject(u'Solar Development & EPC — Israel, Europe, LATAM')

    p1_cover(pdf, L)
    p2_about(pdf, L)
    p3_israel(pdf, L)
    p4_europe(pdf, L)
    p5_panama(pdf, L)
    p6_argentina(pdf, L)
    p7_team(pdf, L)
    p8_strategy(pdf, L)

    pdf.save()
    size = os.path.getsize(path)
    print(f'  \u2705 {suffix}: {path} ({size / 1024:.0f} KB, 8 pages)')
    return path


if __name__ == '__main__':
    print('\n\U0001f4c4 Generating Navitas Energy pitch decks...\n')
    es_path = build_pdf('es')
    en_path = build_pdf('en')
    print(f'\n\u2705 Done! Both versions ready.')

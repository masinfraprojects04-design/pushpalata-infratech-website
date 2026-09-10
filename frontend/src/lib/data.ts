import type { ComponentType } from "react";
import {
  Zap,
  Construction,
  Replace,
  Cable,
  Layers,
  Factory,
  Compass,
  Recycle,
  Mountain,
  DraftingCompass,
  ClipboardCheck,
  PlugZap,
  BadgeCheck,
} from "lucide-react";

export type IconType = ComponentType<{ className?: string }>;

export const IMG = {
  hero: "https://images.unsplash.com/photo-1556341984-69c93f636618?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=2000",
  corridor: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600",
  towerSky: "https://images.unsplash.com/photo-1606901900840-f3dba75bcd47?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  pylonField: "https://images.unsplash.com/photo-1534592953981-72dc7163dd51?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  towerBlack: "https://images.unsplash.com/photo-1504250746301-659b6b611c48?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  lattice: "https://images.unsplash.com/photo-1562879138-f22c4ac6c263?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  sunsetPost: "https://images.unsplash.com/photo-1610028290816-5d937a395a49?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  citySunset: "https://images.unsplash.com/photo-1544780631-4a981cb112ba?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  nightYard: "https://images.unsplash.com/photo-1509391111737-9b07f052f6b6?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  substation: "https://images.unsplash.com/photo-1509390673020-a5b2450e33f1?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  transformer: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  lineDirt: "https://images.unsplash.com/photo-1646516447226-e2eb0e6e3f36?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  crew: "https://images.unsplash.com/photo-1768926968986-a88590ce5025?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  crewOrange: "https://images.unsplash.com/photo-1593812725955-6d89f01ded2d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  siteGate: "https://images.unsplash.com/photo-1593812742588-92d10d2f2e1c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
} as const;

export interface Service {
  slug: string;
  title: string;
  short: string;
  icon: IconType;
  img: string;
  intro: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "transmission-line-epc",
    title: "Transmission Line EPC",
    short: "Full EPC execution for transmission-line projects, subject to awarded scope.",
    icon: Zap,
    img: IMG.corridor,
    intro:
      "From November 2025, Pushpalata Infratech has expanded from specialized field execution into integrated EPC delivery for high-voltage transmission lines — currently executing a 35 km 765 kV D/C project in Karnataka.",
    points: [
      "End-to-end execution against awarded scope",
      "Survey, soil investigation and profile engineering coordination",
      "Foundation, erection, stringing, testing and commissioning",
      "Project management, documentation and site coordination",
    ],
  },
  {
    slug: "tower-erection",
    title: "Tower Erection",
    short: "Transmission tower erection across high-voltage line projects and different tower configurations.",
    icon: Construction,
    img: IMG.towerSky,
    intro:
      "The company's historical core strength. Tower erection executed across 765 kV, 400 kV and other high-voltage corridors in Rajasthan, Gujarat and Madhya Pradesh.",
    points: [
      "Lattice tower erection across configurations",
      "Extensions, stubs and tower installation works",
      "Work-at-height controlled erection methodology",
      "Experience across multiple major transmission packages",
    ],
  },
  {
    slug: "re-conductoring",
    title: "Re-Conductoring",
    short: "Execution support for replacement and upgrading of conductors on existing transmission infrastructure.",
    icon: Replace,
    img: IMG.lineDirt,
    intro:
      "Up-rating existing corridors with modern conductors, including HTLS-related stringing and installation works executed for project organizations.",
    points: [
      "Conductor replacement and up-rating support",
      "HTLS conductor stringing and installation",
      "Live-corridor planning and outage coordination support",
      "Project-specific scope as awarded",
    ],
  },
  {
    slug: "stringing",
    title: "Stringing",
    short: "S/C, D/C and bundled conductor stringing including Hexa, Octa, Double, Quad and other configurations, as applicable to project requirements.",
    icon: Cable,
    img: IMG.pylonField,
    intro:
      "Conductor and earth-wire stringing across single and double circuit lines, including bundled configurations up to 765 kV class.",
    points: [
      "S/C and D/C line stringing",
      "Hexa, Octa, Double and Quad bundled conductors",
      "Tension stringing methodology and sagging",
      "HTLS conductor installation experience",
    ],
  },
  {
    slug: "foundation-civil-works",
    title: "Foundation & Civil Works",
    short: "Transmission tower foundations, excavation, reinforcement, concreting, benching, protection works and associated civil activities.",
    icon: Layers,
    img: IMG.lattice,
    intro:
      "Complete tower foundation execution — from excavation and reinforcement through concreting, benching and protection of tower footings.",
    points: [
      "Tower foundations across soil conditions",
      "Excavation, reinforcement and concreting",
      "Benching and protection of tower footings",
      "Associated civil and protection works",
    ],
  },
  {
    slug: "substation-works",
    title: "Substation Works",
    short: "Foundation, structural steel erection, equipment-related civil/erection support, stringing and ICT installation activities according to project scope.",
    icon: Factory,
    img: IMG.substation,
    intro:
      "Substation-related civil and erection support works delivered according to awarded project scope, including GIS substation environments.",
    points: [
      "Substation foundations and civil works",
      "Structural steel erection support",
      "Equipment-related civil and erection support",
      "Stringing and ICT installation per scope",
    ],
  },
  {
    slug: "survey-transmission-engineering",
    title: "Survey & Transmission Engineering",
    short: "Transmission-line survey activities and engineering support including PLS-CADD / PLS Profile-related workflows and project management support.",
    icon: Compass,
    img: IMG.towerBlack,
    intro:
      "Route survey and engineering support feeding the design and execution chain — alignment, profiling and digital documentation workflows.",
    points: [
      "Transmission-line route survey activities",
      "PLS-CADD / PLS Profile-related workflows",
      "Profile engineering and tower scheduling support",
      "Project planning and management support",
    ],
  },
  {
    slug: "dismantling",
    title: "Dismantling",
    short: "Controlled dismantling and associated transmission-line field execution works.",
    icon: Recycle,
    img: IMG.nightYard,
    intro:
      "Safe, controlled dismantling of transmission-line assets and associated field execution works, planned around outage and site constraints.",
    points: [
      "Controlled tower and line dismantling",
      "Conductor and hardware recovery",
      "Safety-planned execution methodology",
      "Associated field execution works",
    ],
  },
];

export type ProjectCategory = "epc" | "current" | "subcontract";

export interface Project {
  id: string;
  name: string;
  location: string;
  period: string;
  role: string;
  voltage?: string;
  lineType?: string;
  scope: string[];
  category: ProjectCategory;
  note?: string;
  img: string;
  highlights: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "narendra-pune-765",
    name: "765 kV D/C New Narendra (GIS) – Pune (GIS) Transmission Line, Package-1",
    location: "Karnataka",
    period: "November 2025 – Present",
    role: "Full EPC / Erection & Civil Works",
    voltage: "765 kV",
    lineType: "Double Circuit",
    scope: [
      "Survey",
      "Soil investigation",
      "Unloading / storage / handling",
      "Tower erection with extensions and stubs",
      "Stringing",
      "Tower installation / earthing",
      "Tower foundation",
      "Benching",
      "Protection of tower footing",
      "Painting",
      "Testing",
      "Commissioning",
      "Transportation / handling of project materials as specified in the awarded scope",
    ],
    category: "epc",
    note: "Current flagship EPC project. Service order effective 11 November 2025. Project reference AP1/0 to AP14/0.",
    img: IMG.corridor,
    highlights: [
      { label: "Approx. Length", value: "35 km" },
      { label: "Voltage", value: "765 kV D/C" },
      { label: "Location", value: "Karnataka" },
      { label: "Execution", value: "Full EPC" },
    ],
  },
  {
    id: "kps2-halvad-765",
    name: "KPS2–Halvad 765 kV Line",
    location: "Gujarat",
    period: "Recent / Ongoing",
    role: "Execution Partner — Tower Erection",
    voltage: "765 kV",
    scope: ["Tower erection"],
    category: "current",
    note: "Client / organization reference: Adani Transmission Ltd. Reported quantity: 9,000 MT completed + running, as of 30 April 2025.",
    img: IMG.substation,
    highlights: [
      { label: "Voltage", value: "765 kV" },
      { label: "Work", value: "Tower Erection" },
      { label: "Reported Qty*", value: "9,000 MT+" },
      { label: "Reference Date", value: "30 Apr 2025" },
    ],
  },
  {
    id: "khavda-lakadia-765",
    name: "765 kV D/C Hexa Khavda PS2 (GIS) – Lakadia (PS) Transmission Line – Part 2",
    location: "Gujarat",
    period: "Recent / Ongoing",
    role: "Execution Partner — Tower Erection",
    voltage: "765 kV",
    lineType: "Double Circuit, Hexa bundle",
    scope: ["Tower erection"],
    category: "current",
    note: "Client / organization reference: Adani Transmission Ltd.",
    img: IMG.lineDirt,
    highlights: [
      { label: "Voltage", value: "765 kV D/C" },
      { label: "Configuration", value: "Hexa Bundle" },
      { label: "Work", value: "Tower Erection" },
      { label: "Location", value: "Gujarat" },
    ],
  },
  {
    id: "dvc-htls",
    name: "DVC HTLS Conductor Project",
    location: "Project corridor as awarded",
    period: "Completed (reference dated 30 April 2025)",
    role: "Execution Partner — Stringing",
    scope: ["Stringing & installation of HTLS conductor"],
    category: "current",
    note: "Contracting organization: LS Cable India Private Limited. Quantity: 1.7 CKM.",
    img: IMG.transformer,
    highlights: [
      { label: "Work", value: "HTLS Stringing" },
      { label: "Quantity", value: "1.7 CKM" },
      { label: "Status", value: "Completed" },
      { label: "Reference Date", value: "30 Apr 2025" },
    ],
  },
  {
    id: "chittorgarh-ajmer-765",
    name: "765 kV D/C Chittorgarh – Ajmer Transmission Line",
    location: "Rajasthan",
    period: "2014 – 2016",
    role: "Subcontractor under KEC International Ltd.",
    voltage: "765 kV",
    lineType: "Double Circuit",
    scope: ["Transmission-line execution according to awarded subcontract scope"],
    category: "subcontract",
    img: IMG.towerSky,
    highlights: [
      { label: "Voltage", value: "765 kV D/C" },
      { label: "Period", value: "2014–2016" },
      { label: "Location", value: "Rajasthan" },
      { label: "Role", value: "Subcontractor" },
    ],
  },
  {
    id: "bhuj-halvad",
    name: "Bhuj – Halvad Transmission Line",
    location: "Gujarat",
    period: "2016 – 2017",
    role: "Subcontractor",
    scope: ["Foundation", "Tower erection"],
    category: "subcontract",
    img: IMG.pylonField,
    highlights: [
      { label: "Period", value: "2016–2017" },
      { label: "Location", value: "Gujarat" },
      { label: "Scope", value: "Foundation + Erection" },
      { label: "Role", value: "Subcontractor" },
    ],
  },
  {
    id: "nigrie-satna-400",
    name: "400 kV D/C Jaypee Nigrie TPP – Satna Transmission Line",
    location: "Madhya Pradesh",
    period: "2017 – 2018",
    role: "Subcontractor",
    voltage: "400 kV",
    lineType: "Double Circuit",
    scope: ["Foundation", "Tower erection", "Stringing"],
    category: "subcontract",
    img: IMG.towerBlack,
    highlights: [
      { label: "Voltage", value: "400 kV D/C" },
      { label: "Period", value: "2017–2018" },
      { label: "Location", value: "Madhya Pradesh" },
      { label: "Scope", value: "Foundation, Erection, Stringing" },
    ],
  },
  {
    id: "satna-maihar-jp",
    name: "Satna – Maihar / JP Group Transmission Works",
    location: "Madhya Pradesh",
    period: "2018 – 2019",
    role: "Subcontractor",
    scope: ["Tower erection"],
    category: "subcontract",
    img: IMG.lattice,
    highlights: [
      { label: "Period", value: "2018–2019" },
      { label: "Location", value: "Madhya Pradesh" },
      { label: "Scope", value: "Tower Erection" },
      { label: "Role", value: "Subcontractor" },
    ],
  },
  {
    id: "vadodara-olpad-765",
    name: "765 kV D/C Vadodara – South Olpad Transmission Line",
    location: "Gujarat",
    period: "2020 – 2021",
    role: "Subcontractor",
    voltage: "765 kV",
    lineType: "Double Circuit",
    scope: ["Tower erection"],
    category: "subcontract",
    img: IMG.sunsetPost,
    highlights: [
      { label: "Voltage", value: "765 kV D/C" },
      { label: "Period", value: "2020–2021" },
      { label: "Location", value: "Gujarat" },
      { label: "Scope", value: "Tower Erection" },
    ],
  },
  {
    id: "rajasthan-rez",
    name: "Rajasthan Renewable Energy Zone Transmission Works",
    location: "Rajasthan",
    period: "2021 – 2022",
    role: "Subcontractor",
    voltage: "765 kV / 400 kV according to package",
    scope: ["Tower erection"],
    category: "subcontract",
    img: IMG.citySunset,
    highlights: [
      { label: "Voltage", value: "765 / 400 kV" },
      { label: "Period", value: "2021–2022" },
      { label: "Location", value: "Rajasthan" },
      { label: "Scope", value: "Tower Erection" },
    ],
  },
  {
    id: "fatehgarh-beawar-765",
    name: "Fatehgarh-3 – Beawar Transmission Line",
    location: "Rajasthan",
    period: "2022 – 2023",
    role: "Subcontractor",
    voltage: "765 kV",
    lineType: "Double Circuit",
    scope: ["Transmission-line execution"],
    category: "subcontract",
    img: IMG.nightYard,
    highlights: [
      { label: "Voltage", value: "765 kV D/C" },
      { label: "Period", value: "2022–2023" },
      { label: "Location", value: "Rajasthan" },
      { label: "Role", value: "Subcontractor" },
    ],
  },
];

export const EPC_STEPS: { icon: IconType; title: string; desc: string }[] = [
  { icon: Compass, title: "Survey", desc: "Route survey, alignment and site data capture for the transmission corridor." },
  { icon: Mountain, title: "Soil Investigation", desc: "Geotechnical investigation informing foundation design and classification." },
  { icon: DraftingCompass, title: "Engineering / Profile", desc: "Profile engineering, tower scheduling and PLS-CADD / PLS Profile workflows." },
  { icon: Layers, title: "Foundation & Civil Works", desc: "Excavation, reinforcement, concreting, benching and protection works." },
  { icon: Construction, title: "Tower Erection", desc: "Tower assembly and erection with extensions and stubs, per design." },
  { icon: Cable, title: "Stringing", desc: "Conductor and earth-wire stringing across applicable bundle configurations." },
  { icon: Zap, title: "Earthing / Associated Works", desc: "Tower earthing and associated line works per specification." },
  { icon: ClipboardCheck, title: "Testing", desc: "Pre-commissioning checks and testing as per project requirements." },
  { icon: BadgeCheck, title: "Commissioning", desc: "Final commissioning support and handover documentation." },
];

export const TIMELINE: { year: string; title: string; desc: string; marker?: boolean }[] = [
  { year: "2014", title: "Company Established", desc: "Pushpalata Infratech Private Limited incorporated on 12 March 2014." },
  { year: "2014–2016", title: "765 kV Chittorgarh–Ajmer", desc: "Subcontract execution under KEC International Ltd., Rajasthan." },
  { year: "2016–2019", title: "Gujarat & Madhya Pradesh Execution", desc: "Foundation, tower erection and stringing across major transmission packages." },
  { year: "2020–2023", title: "High-Voltage Execution Portfolio", desc: "765 kV and 400 kV works across Gujarat, Rajasthan and Madhya Pradesh." },
  { year: "2024–2025", title: "Expanded Execution Portfolio", desc: "KPS2–Halvad, Khavda–Lakadia tower erection and HTLS stringing-related works." },
  { year: "Nov 2025", title: "Transition to Full EPC", desc: "Expansion from specialized field execution into integrated EPC delivery.", marker: true },
  { year: "Current", title: "765 kV New Narendra–Pune", desc: "35 km full EPC project in Karnataka — Package-1, AP1/0 to AP14/0.", marker: true },
];

export const PARTNERS: { name: string; label: string }[] = [
  { name: "KEC International Ltd.", label: "Main Contractor" },
  { name: "Adani Transmission Ltd.", label: "Project Organization" },
  { name: "LS Cable India Pvt. Ltd.", label: "Contracting Organization" },
  { name: "Transrail Lighting", label: "Project Organization" },
];

export const VOLTAGES = ["33 kV", "66 kV", "132 kV", "220 kV", "400 kV", "765 kV"];

export const CONTACT = {
  phone1: "+91 97716 66166",
  phone2: "+91 97717 87713",
  phone1Href: "tel:+919771666166",
  phone2Href: "tel:+919771787713",
  whatsapp: "https://wa.me/919771666166",
  email: "info@pushpalatainfratech.com",
  website: "pushpalatainfratech.com",
  officeBihar: "Sonadhia, 197, Mahadipur, Pasraha, Khagaria, Bihar – 851212, India",
  officeKarnataka: "Laxmi Niwas, Gokul Park, Opposite Yelu Makkal Tayi Temple Road, Vijaypur, Karnataka – 586109",
};

export const CORPORATE = {
  cin: "U45200BR2014PTC022184",
  gstin: "10AAHCP7241G2ZP",
  udyam: "UDYAM-BR-17-0007171",
  epfo: "BRBHA2151190000",
  incorporated: "12 March 2014",
};

export const DIRECTORS = ["Pushplata Devi", "Muni Lal Singh", "Ankaj Kumar Singh"];

export const VALUES = [
  "Safety First",
  "Quality",
  "Integrity",
  "Execution Excellence",
  "Client Commitment",
  "Teamwork",
  "Continuous Improvement",
];

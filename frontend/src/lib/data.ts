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
  stringingDrums: "/media/stringing-drums.jpg",
  stringingTensioner: "/media/stringing-tensioner.jpg",
  stringingPuller: "/media/stringing-puller.jpg",
  stringingTower: "/media/stringing-tower.jpg",
  foundationToolbox: "/media/foundation-toolbox-talk.jpg",
  foundationCement: "/media/foundation-cement-stock.jpg",
  foundationExcavation: "/media/foundation-excavation.jpg",
  foundationCubeTest: "/media/foundation-cube-test.jpg",
  surveyTotalStation: "/media/survey-total-station.jpg",
  foundationConcreting: "/media/foundation-concreting.jpg",
  towerErectedCrew: "/media/tower-erected-crew.jpg",
  towerErectionProgress: "/media/tower-erection-progress.jpg",
  towerInsulatorsSky: "/media/tower-insulators-sky.jpg",
  towerDusk: "/media/tower-dusk-silhouette.jpg",
} as const;

export const TOWER_GALLERY = [
  { img: "/media/tower-erected-crew.jpg", caption: "765 kV tower erected — crew at Loc 13A" },
  { img: "/media/tower-insulators-sky.jpg", caption: "Insulator strings hung, ready for stringing" },
  { img: "/media/tower-erection-progress.jpg", caption: "Tower erection in progress — body extension" },
  { img: "/media/tower-dusk-silhouette.jpg", caption: "Completed tower at dusk" },
];

export const FOUNDATION_GALLERY = [
  { img: "/media/foundation-excavation.jpg", caption: "Foundation pit excavation — JCB 3DX" },
  { img: "/media/foundation-concreting.jpg", caption: "Chimney concreting with stub set" },
  { img: "/media/survey-total-station.jpg", caption: "Total-station survey & tower spotting" },
  { img: "/media/foundation-cement-stock.jpg", caption: "Cement stock verification at site" },
  { img: "/media/foundation-cube-test.jpg", caption: "Concrete cube test — 2000 kN CTM" },
  { img: "/media/foundation-toolbox-talk.jpg", caption: "Morning toolbox talk & PPE check" },
];

export const FIELD_VIDEO = {
  stringing: {
    src: "/media/stringing.mp4",
    webm: "/media/stringing.webm",
    poster: "/media/stringing-poster.jpg",
    title: "Tension Stringing in Progress",
    caption: "Conductor drums, puller-tensioner set-up and stringing through the tower — live from a Pushpalata Infratech site.",
    stills: [
      { img: "/media/stringing-drums.jpg", caption: "Conductor drums staged at site" },
      { img: "/media/stringing-tensioner.jpg", caption: "Puller-tensioner positioned at tower" },
      { img: "/media/stringing-puller.jpg", caption: "Hydraulic tensioner — bull-wheel drive" },
      { img: "/media/stringing-tower.jpg", caption: "Stringing through the lattice tower" },
    ],
  },
} as const;

export interface Service {
  slug: string;
  title: string;
  short: string;
  icon: IconType;
  img: string;
  intro: string;
  points: string[];
  video?: keyof typeof FIELD_VIDEO;
  gallery?: { img: string; caption: string }[];
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
    img: IMG.towerErectedCrew,
    gallery: TOWER_GALLERY,
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
    img: IMG.stringingTensioner,
    video: "stringing",
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
    gallery: FOUNDATION_GALLERY,
    title: "Foundation & Civil Works",
    short: "Transmission tower foundations, excavation, reinforcement, concreting, benching, protection works and associated civil activities.",
    icon: Layers,
    img: IMG.foundationExcavation,
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
    img: IMG.surveyTotalStation,
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
  gallery?: { img: string; caption: string }[];
  highlights: { label: string; value: string }[];
  certificate?: { issuer: string; ref: string; date: string; kind: "Experience Certificate" | "Undertaking" };
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
    img: IMG.towerErectedCrew,
    gallery: [...TOWER_GALLERY, ...FOUNDATION_GALLERY],
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
    note: "Client: Adani Transmission Ltd. PO Nos. 5704002401 (08-10-2024) & 5704003179 (27-03-2025). Tower erection quantity 9,000 MT completed + running (company undertaking dated 30 April 2025, Khavda).",
    img: IMG.towerDusk,
    certificate: { issuer: "Adani Transmission Ltd.", ref: "PO 5704002401 / 5704003179", date: "30 Apr 2025", kind: "Undertaking" },
    highlights: [
      { label: "Voltage", value: "765 kV" },
      { label: "Work", value: "Tower Erection" },
      { label: "Quantity", value: "9,000 MT+" },
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
    note: "Client: Adani Transmission Ltd. Part of the same PO set as KPS2–Halvad (9,000 MT combined tower erection, completed + running).",
    img: IMG.towerInsulatorsSky,
    certificate: { issuer: "Adani Transmission Ltd.", ref: "PO 5704002401 / 5704003179", date: "30 Apr 2025", kind: "Undertaking" },
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
    note: "Client: LS Cable India Private Limited. PO No. LSCI/DVC/24-25/PIPL/001. Stringing & installation of HTLS conductor — 1.7 CKM completed.",
    img: IMG.stringingDrums,
    certificate: { issuer: "LS Cable India Pvt. Ltd.", ref: "PO LSCI/DVC/24-25/PIPL/001", date: "30 Apr 2025", kind: "Undertaking" },
    highlights: [
      { label: "Work", value: "HTLS Stringing" },
      { label: "Quantity", value: "1.7 CKM" },
      { label: "Status", value: "Completed" },
      { label: "Reference Date", value: "30 Apr 2025" },
    ],
  },
  {
    id: "mumbai-urja-marg-400",
    name: "400 kV D/C Mumbai Urja Marg Project (Kharghar – Padghe), WRNER Pkg C",
    location: "Maharashtra",
    period: "Dec 2022 – Apr 2024",
    role: "Subcontractor under Sterlite Power Transmission Ltd.",
    voltage: "400 kV",
    lineType: "Double Circuit",
    scope: ["Structure erection — tower types DA+0 to DD+35 (3,129.078 MT, 101 nos)", "Civil / foundation works — 27 nos", "Stringing — 20.52 km"],
    category: "subcontract",
    note: "Executed against Sterlite PO Nos. 3290003653 (15-12-2022) & 3290003780 (22-02-2023). Certified compliant to required norms & standards; all statutory compliance completed.",
    img: IMG.towerErectionProgress,
    highlights: [
      { label: "Erection", value: "3,129 MT / 101 Towers" },
      { label: "Foundations", value: "27 Nos" },
      { label: "Stringing", value: "20.52 km" },
      { label: "Voltage", value: "400 kV D/C" },
    ],
    certificate: { issuer: "Sterlite Power Transmission Ltd.", ref: "SPTL/MSI-WCC-WRNER Pkg C-001", date: "07 Apr 2024", kind: "Experience Certificate" },
  },
  {
    id: "vapi-sayali-220",
    name: "220 kV D/C Vapi – Sayali Transmission Line, WRNER Pkg B",
    location: "Gujarat",
    period: "Dec 2022 – Apr 2024",
    role: "Subcontractor under Sterlite Power Transmission Ltd.",
    voltage: "220 kV",
    lineType: "Double Circuit",
    scope: ["Structure erection — tower types DA+0 to MCT (474 MT, 48 nos)", "Civil / foundation works — 63 nos", "Stringing — 15.7 km"],
    category: "subcontract",
    note: "Executed against Sterlite PO No. 3290003637 (09-12-2022). Certified compliant to required norms & standards; all statutory compliance completed.",
    img: IMG.foundationExcavation,
    highlights: [
      { label: "Erection", value: "474 MT / 48 Towers" },
      { label: "Foundations", value: "63 Nos" },
      { label: "Stringing", value: "15.7 km" },
      { label: "Voltage", value: "220 kV D/C" },
    ],
    certificate: { issuer: "Sterlite Power Transmission Ltd.", ref: "SPTL/MSI-WCC-WRNER Pkg B-001", date: "07 Apr 2024", kind: "Experience Certificate" },
  },
  {
    id: "jamnagar-jamkhambaliya-400",
    name: "POWERGRID Jamnagar RIL – Jamkhambaliya 400 kV D/C Transmission Line",
    location: "Gujarat",
    period: "Aug 2023 – Apr 2024",
    role: "Subcontractor under Sterlite Power Transmission Ltd.",
    voltage: "400 kV",
    lineType: "Double Circuit",
    scope: ["Structure erection — tower types DA+0 to QD+25 (2,467.264 MT, 110 nos)", "Civil / foundation works — 53 nos", "Stringing — 20.25 km"],
    category: "subcontract",
    note: "Executed against Sterlite PO No. 3290004128 (25-08-2023). Certified compliant to required norms & standards; all statutory compliance completed.",
    img: IMG.stringingTower,
    highlights: [
      { label: "Erection", value: "2,467 MT / 110 Towers" },
      { label: "Foundations", value: "53 Nos" },
      { label: "Stringing", value: "20.25 km" },
      { label: "Voltage", value: "400 kV D/C" },
    ],
    certificate: { issuer: "Sterlite Power Transmission Ltd.", ref: "SPTL/MSI-WCC-JKTL-002", date: "11 Apr 2024", kind: "Experience Certificate" },
  },
  {
    id: "adselr-assam-substation",
    name: "33/11 kV Partially Outdoor Substation, Khagrabari — ADSELR Project",
    location: "Udalguri District, Assam",
    period: "2023 – 2024",
    role: "Subcontractor under Ashoka Buildcon Ltd.",
    voltage: "33/11 kV",
    scope: ["Complete construction of 1 no. 33/11 kV partially outdoor substation at Khagrabari, Tongla Subdivision"],
    category: "subcontract",
    note: "Assam Distribution System Enhancement & Loss Reduction (ADSELR) project, AIIB funded, Mangaldoi Circle. Quality of work certified as satisfactory by Ashoka Buildcon Ltd.",
    img: IMG.substation,
    highlights: [
      { label: "Work", value: "33/11 kV Substation" },
      { label: "Quantity", value: "1 No. Completed" },
      { label: "Funding", value: "AIIB" },
      { label: "Location", value: "Assam" },
    ],
    certificate: { issuer: "Ashoka Buildcon Ltd.", ref: "Experience Certificate", date: "2024", kind: "Experience Certificate" },
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
  { year: "2020–2022", title: "High-Voltage Execution Portfolio", desc: "765 kV and 400 kV works across Gujarat, Rajasthan and Madhya Pradesh." },
  { year: "2022–2024", title: "Sterlite Power — Three Certified Packages", desc: "Mumbai Urja Marg 400 kV, Vapi–Sayali 220 kV and Jamnagar–Jamkhambaliya 400 kV: 6,070 MT erection, 143 foundations, 56.5 km stringing — all certified." },
  { year: "2023–2024", title: "33/11 kV Substation, Assam", desc: "Complete 33/11 kV partially outdoor substation at Khagrabari under Ashoka Buildcon Ltd. (ADSELR, AIIB funded)." },
  { year: "2024–2025", title: "Adani 765 kV Tower Erection", desc: "KPS2–Halvad and Khavda–Lakadia 765 kV lines — 9,000 MT tower erection completed + running; HTLS stringing for LS Cable (DVC)." },
  { year: "Nov 2025", title: "Transition to Full EPC", desc: "Expansion from specialized field execution into integrated EPC delivery.", marker: true },
  { year: "Current", title: "765 kV New Narendra–Pune", desc: "35 km full EPC project in Karnataka — Package-1, AP1/0 to AP14/0.", marker: true },
];

export const CERTIFIED_RECORD = {
  totals: [
    { label: "Certified Tower Erection", value: 6070, suffix: " MT" },
    { label: "Towers Erected (Certified)", value: 259, suffix: " Nos" },
    { label: "Foundations (Certified)", value: 143, suffix: " Nos" },
    { label: "Stringing (Certified)", value: 56.5, suffix: " km" },
  ],
  rows: [
    { client: "Sterlite Power Transmission Ltd.", project: "400 kV D/C Mumbai Urja Marg (Kharghar–Padghe), WRNER Pkg C", erection: "3,129 MT · 101 nos", foundations: "27 nos", stringing: "20.52 km", date: "07 Apr 2024", id: "mumbai-urja-marg-400" },
    { client: "Sterlite Power Transmission Ltd.", project: "POWERGRID Jamnagar RIL – Jamkhambaliya 400 kV D/C", erection: "2,467 MT · 110 nos", foundations: "53 nos", stringing: "20.25 km", date: "11 Apr 2024", id: "jamnagar-jamkhambaliya-400" },
    { client: "Sterlite Power Transmission Ltd.", project: "220 kV D/C Vapi – Sayali, WRNER Pkg B", erection: "474 MT · 48 nos", foundations: "63 nos", stringing: "15.7 km", date: "07 Apr 2024", id: "vapi-sayali-220" },
    { client: "Ashoka Buildcon Ltd.", project: "33/11 kV Substation, Khagrabari — ADSELR (AIIB), Assam", erection: "1 no. substation", foundations: "—", stringing: "—", date: "2024", id: "adselr-assam-substation" },
    { client: "Adani Transmission Ltd.", project: "KPS2–Halvad & Khavda PS2–Lakadia 765 kV lines", erection: "9,000 MT+ (running)", foundations: "—", stringing: "—", date: "30 Apr 2025", id: "kps2-halvad-765" },
    { client: "LS Cable India Pvt. Ltd.", project: "HTLS conductor stringing — DVC project", erection: "—", foundations: "—", stringing: "1.7 CKM", date: "30 Apr 2025", id: "dvc-htls" },
  ],
};

export const PARTNERS: { name: string; label: string }[] = [
  { name: "KEC International Ltd.", label: "Main Contractor" },
  { name: "Sterlite Power Transmission Ltd.", label: "Main Contractor — Certified" },
  { name: "Ashoka Buildcon Ltd.", label: "Main Contractor — Certified" },
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

export const CERTIFICATIONS = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    body: "Execution planned, inspected and documented in line with ISO 9001 quality-management principles.",
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    body: "Corridor works, ROW handling and waste management aligned to ISO 14001 environmental practice.",
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    body: "Height-work, stringing and live-line safety systems aligned to ISO 45001 OH&S requirements.",
  },
  {
    code: "MSME / Udyam",
    title: "Udyam Registered Enterprise",
    body: `Registered under the Government of India MSME framework — ${CORPORATE.udyam}.`,
  },
  {
    code: "MCA / ROC",
    title: "Registered Private Limited Company",
    body: `Incorporated ${CORPORATE.incorporated} — CIN ${CORPORATE.cin}.`,
  },
  {
    code: "GST & EPFO",
    title: "Statutory Compliance",
    body: `GSTIN ${CORPORATE.gstin} · EPFO ${CORPORATE.epfo}. Fully compliant workforce and tax registrations.`,
  },
];

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

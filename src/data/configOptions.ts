export interface ExteriorColor {
  id: string;
  label: string;
  hex: string;
  price: number;
}

export interface WheelOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

export interface CaliperOption {
  id: string;
  label: string;
  hex: string;
  price: number;
}

export interface InteriorOption {
  id: string;
  label: string;
  hex: string;
  price: number;
}

export type LightingMode = "showroom" | "daylight" | "sunset" | "night" | "racing";

export const exteriorColors: ExteriorColor[] = [
  { id: "rosso", label: "Rosso Corsa", hex: "#c40000", price: 0 },
  { id: "nero", label: "Nero Daytona", hex: "#0a0a0a", price: 8500 },
  { id: "bianco", label: "Bianco Italia", hex: "#f2f2f0", price: 6500 },
  { id: "giallo", label: "Giallo Modena", hex: "#ffd400", price: 9800 },
  { id: "blu", label: "Blu Corsa", hex: "#0b2c6b", price: 8500 },
  { id: "grigio", label: "Grigio Silverstone", hex: "#7c7f83", price: 7200 },
];

export const wheelOptions: WheelOption[] = [
  { id: "sport", label: "Sport", description: "20\" forged alloy", price: 0 },
  { id: "racing", label: "Racing", description: "21\" lightweight racing", price: 12500 },
  { id: "carbon", label: "Carbon", description: "21\" full carbon fibre", price: 24900 },
  { id: "classic", label: "Classic", description: "20\" five-spoke heritage", price: 6800 },
];

export const caliperOptions: CaliperOption[] = [
  { id: "red", label: "Red", hex: "#c40000", price: 0 },
  { id: "yellow", label: "Yellow", hex: "#ffd400", price: 1400 },
  { id: "black", label: "Black", hex: "#141414", price: 0 },
  { id: "carbon", label: "Carbon Ceramic", hex: "#3a3a3c", price: 15900 },
];

export const interiorOptions: InteriorOption[] = [
  { id: "black", label: "Nero Black", hex: "#161616", price: 0 },
  { id: "tan", label: "Cuoio Tan", hex: "#b08a5c", price: 5400 },
  { id: "red", label: "Rosso Interior", hex: "#7a1010", price: 6200 },
  { id: "carbon", label: "Full Carbon", hex: "#242427", price: 18500 },
];

export const lightingModes: { id: LightingMode; label: string }[] = [
  { id: "showroom", label: "Showroom" },
  { id: "daylight", label: "Daylight" },
  { id: "sunset", label: "Sunset" },
  { id: "night", label: "Night" },
  { id: "racing", label: "Racing" },
];

export const optionsPackagePrice = 4200;

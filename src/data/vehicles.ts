export interface VehicleSpec {
  power: string;
  zeroToHundred: string;
  topSpeed: string;
  engine: string;
  torque: string;
  weight: string;
  transmission: string;
  drive: string;
  fuel: string;
  year: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  tagline: string;
  priceFrom: number;
  has3d: boolean;
  spec: VehicleSpec;
}

export const vehicles: Vehicle[] = [
  {
    id: "f80",
    name: "F80",
    category: "Hypercar",
    tagline: "The pinnacle of the road.",
    priceFrom: 3900000,
    has3d: true,
    spec: {
      power: "1200",
      zeroToHundred: "2.15",
      topSpeed: "350",
      engine: "V6 Hybrid Turbo",
      torque: "850",
      weight: "1525",
      transmission: "8-Speed DCT",
      drive: "AWD",
      fuel: "Hybrid",
      year: "2025",
    },
  },
  {
    id: "12cilindri",
    name: "12Cilindri",
    category: "V12 Grand Tourer",
    tagline: "The last of a legendary breed.",
    priceFrom: 450000,
    has3d: false,
    spec: {
      power: "830",
      zeroToHundred: "2.9",
      topSpeed: "340",
      engine: "6.5L V12",
      torque: "678",
      weight: "1560",
      transmission: "8-Speed DCT",
      drive: "RWD",
      fuel: "Petrol",
      year: "2024",
    },
  },
  {
    id: "296gtb",
    name: "296 GTB",
    category: "Hybrid Berlinetta",
    tagline: "Compact power, uncompromising thrill.",
    priceFrom: 320000,
    has3d: false,
    spec: {
      power: "830",
      zeroToHundred: "2.9",
      topSpeed: "330",
      engine: "V6 Hybrid Turbo",
      torque: "740",
      weight: "1470",
      transmission: "8-Speed DCT",
      drive: "RWD",
      fuel: "Hybrid",
      year: "2023",
    },
  },
  {
    id: "purosangue",
    name: "Purosangue",
    category: "Luxury Performance SUV",
    tagline: "Four doors. Zero compromise.",
    priceFrom: 400000,
    has3d: false,
    spec: {
      power: "725",
      zeroToHundred: "3.3",
      topSpeed: "310",
      engine: "6.5L V12",
      torque: "716",
      weight: "2033",
      transmission: "8-Speed DCT",
      drive: "AWD",
      fuel: "Petrol",
      year: "2024",
    },
  },
];

export const flagshipVehicle = vehicles[0];

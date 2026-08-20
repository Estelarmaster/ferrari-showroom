export interface Dealer {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
}

export const dealers: Dealer[] = [
  { id: "d1", name: "Maranello Flagship", country: "Italy", city: "Modena", address: "Via Emilia Ovest 12", phone: "+39 059 000 1122", hours: "Mon–Sat, 9:00–19:00" },
  { id: "d2", name: "Milano Showroom", country: "Italy", city: "Milan", address: "Corso Venezia 45", phone: "+39 02 000 5588", hours: "Mon–Sat, 10:00–19:00" },
  { id: "d3", name: "Beverly Hills Gallery", country: "United States", city: "Los Angeles", address: "8899 Wilshire Blvd", phone: "+1 310 555 0199", hours: "Mon–Sat, 9:00–18:00" },
  { id: "d4", name: "Manhattan Collection", country: "United States", city: "New York", address: "410 Park Avenue", phone: "+1 212 555 0143", hours: "Mon–Sat, 9:00–18:00" },
  { id: "d5", name: "Mayfair Showroom", country: "United Kingdom", city: "London", address: "24 Berkeley Square", phone: "+44 20 7946 0958", hours: "Mon–Sat, 9:30–18:30" },
  { id: "d6", name: "Ginza Flagship", country: "Japan", city: "Tokyo", address: "6-10-1 Ginza", phone: "+81 3 5555 0192", hours: "Tue–Sun, 10:00–19:00" },
  { id: "d7", name: "Dubai Marina Gallery", country: "United Arab Emirates", city: "Dubai", address: "Sheikh Zayed Road 88", phone: "+971 4 555 0177", hours: "Sat–Thu, 10:00–20:00" },
  { id: "d8", name: "Zúrich Atelier", country: "Switzerland", city: "Zurich", address: "Bahnhofstrasse 61", phone: "+41 44 555 0166", hours: "Mon–Sat, 9:00–18:00" },
];

export const countries = Array.from(new Set(dealers.map((d) => d.country))).sort();

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { dealers, countries } from "../data/dealers";

export function Dealers() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const cities = useMemo(
    () => Array.from(new Set(dealers.filter((d) => !country || d.country === country).map((d) => d.city))).sort(),
    [country]
  );

  const results = useMemo(
    () => dealers.filter((d) => (!country || d.country === country) && (!city || d.city === city)),
    [country, city]
  );

  return (
    <section id="dealers" className="bg-[var(--color-carbon-light)] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-2xl">
          <p className="kicker">Network</p>
          <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">FIND A DEALER</h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-4">
          <label className="flex flex-col gap-1 text-xs text-zinc-400">
            Country
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setCity("");
              }}
              className="min-w-[180px] border border-white/20 bg-black px-4 py-2 text-sm text-white"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-zinc-400">
            City
            <select value={city} onChange={(e) => setCity(e.target.value)} className="min-w-[180px] border border-white/20 bg-black px-4 py-2 text-sm text-white">
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {results.length === 0 && <p className="text-zinc-500">No dealers match your search.</p>}
          {results.map((d) => (
            <div key={d.id} role="listitem" className="border border-white/10 bg-black p-6">
              <h3 className="text-lg text-white">{d.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{d.city}, {d.country}</p>
              <div className="mt-4 space-y-2 text-sm text-zinc-400">
                <p className="flex items-center gap-2"><MapPin size={14} /> {d.address}</p>
                <p className="flex items-center gap-2"><Phone size={14} /> {d.phone}</p>
                <p className="flex items-center gap-2"><Clock size={14} /> {d.hours}</p>
              </div>
              <a
                href={`tel:${d.phone.replace(/\s+/g, "")}`}
                className="mt-5 inline-block border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-[var(--color-rosso)] hover:text-[var(--color-rosso-bright)]"
              >
                Contact
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

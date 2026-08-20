export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 text-center">
      <p className="text-[11px] text-zinc-600">
        3D model: "2018 Ferrari SP38 (Deborah)" by{" "}
        <a
          href="https://sketchfab.com/ddiaz-design"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-400"
        >
          Ddiaz Design
        </a>{" "}
        — licensed under{" "}
        <a
          href="http://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-400"
        >
          CC BY 4.0
        </a>
        .
      </p>
      <p className="mt-2 text-[11px] text-zinc-700">FERRARI — BEYOND PERFORMANCE is an unofficial concept demo, not affiliated with Ferrari S.p.A.</p>
    </footer>
  );
}

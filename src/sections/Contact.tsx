import { motion } from "framer-motion";
import { useStore } from "../store/useStore";
import { Button } from "../components/ui/Button";

export function Contact() {
  const openTestDrive = useStore((s) => s.openTestDrive);

  return (
    <section id="contact" className="relative overflow-hidden bg-black px-6 py-32 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,0,0,0.15),transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mx-auto max-w-2xl">
        <p className="kicker">The Difference</p>
        <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">EXPERIENCE THE DIFFERENCE</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400">
          Book a private appointment with a Ferrari specialist and feel what four decades of racing DNA does on the open road.
        </p>
        <div className="mt-8">
          <Button onClick={openTestDrive}>Request a Test Drive</Button>
        </div>
      </motion.div>
    </section>
  );
}

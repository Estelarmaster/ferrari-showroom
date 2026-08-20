import { useState, type FormEvent } from "react";
import { useStore } from "../../store/useStore";
import { vehicles } from "../../data/vehicles";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  country: string;
  model: string;
  date: string;
  message: string;
}

const emptyForm: FormState = { name: "", email: "", phone: "", country: "", model: vehicles[0].id, date: "", message: "" };

export function TestDriveModal() {
  const isOpen = useStore((s) => s.isTestDriveOpen);
  const closeTestDrive = useStore((s) => s.closeTestDrive);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
    if (!form.country.trim()) next.country = "Country is required.";
    if (!form.date) next.date = "Preferred date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    closeTestDrive();
    setTimeout(() => {
      setSubmitted(false);
      setForm(emptyForm);
      setErrors({});
    }, 300);
  };

  const field = (label: string, key: keyof FormState, type = "text") => (
    <label className="block text-xs text-zinc-400">
      {label}
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className={`mt-1 w-full border bg-black px-3 py-2 text-sm text-white outline-none ${errors[key] ? "border-red-500" : "border-white/20 focus:border-[var(--color-rosso)]"}`}
      />
      {errors[key] && (
        <span id={`${key}-error`} className="mt-1 block text-[11px] text-red-400">
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={submitted ? "Request Received" : "Request a Test Drive"}>
      {submitted ? (
        <div className="py-4">
          <p className="mb-6 text-zinc-300">
            Thank you, {form.name.split(" ")[0] || "driver"}. A Ferrari specialist will contact you shortly to confirm your test drive.
          </p>
          <Button onClick={handleClose}>Close</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Name", "name")}
            {field("Email", "email", "email")}
            {field("Phone", "phone", "tel")}
            {field("Country", "country")}
          </div>

          <label className="block text-xs text-zinc-400">
            Preferred Model
            <select
              value={form.model}
              onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
              className="mt-1 w-full border border-white/20 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[var(--color-rosso)]"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </label>

          {field("Preferred Date", "date", "date")}

          <label className="block text-xs text-zinc-400">
            Message
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={3}
              className="mt-1 w-full border border-white/20 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[var(--color-rosso)]"
            />
          </label>

          <Button type="submit" className="w-full justify-center">Submit Request</Button>
        </form>
      )}
    </Modal>
  );
}

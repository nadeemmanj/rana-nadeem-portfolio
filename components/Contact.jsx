"use client";
// Contact section: contact rows + centered single-column form.
// ✏️ EDIT: wire Formspree/EmailJS in onSubmit for real delivery, e.g.
//   await fetch("https://formspree.io/f/YOUR_ID", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(form),
//   });
import { useState } from "react";
import { profile } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const fieldClass =
  "w-full rounded-xl border border-[#1e2c52] bg-[#0e1830] px-4 py-3 text-[#e8eefc] placeholder-[#5b6b8c] transition-colors focus:border-[#3b82f6] focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // ✏️ EDIT: replace this with a real Formspree/EmailJS call for delivery.
    setSent(true);
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-xl px-5">
        <SectionHeading eyebrow="ASK ME QUESTIONS" title="Contact Me" />

        {/* Contact rows from profile */}
        <Reveal className="mb-8 flex flex-col items-center gap-2 text-sm text-[#93a1c0]">
          {profile?.email && <p>📧 {profile.email}</p>}
          {profile?.phone && <p>📱 {profile.phone}</p>}
          {profile?.location && <p>📍 {profile.location}</p>}
        </Reveal>

        <Reveal delay={100}>
          {sent ? (
            <div className="rounded-2xl border border-[#1e2c52] bg-[#0e1830] p-10 text-center shadow-[0_0_30px_rgba(59,130,246,.25)]">
              <span className="text-5xl">✅</span>
              <p className="mt-4 text-lg font-semibold text-[#e8eefc]">
                Message sent! I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={set("name")}
                  className={fieldClass}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={set("email")}
                  className={fieldClass}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={set("phone")}
                  className={fieldClass}
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message *"
                  value={form.message}
                  onChange={set("message")}
                  className={`${fieldClass} resize-y`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="btn-sweep btn-sweep-primary rounded-full bg-gradient-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] px-10 py-3 font-semibold text-[#070d1f] shadow-[0_0_30px_rgba(59,130,246,.45)] hover:shadow-[0_0_45px_rgba(59,130,246,.65)]"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

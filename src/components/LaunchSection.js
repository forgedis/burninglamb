"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import TextReveal from "@/components/TextReveal";

const INITIAL_FORM = { name: "", contact: "", project: "" };

const serviceOptions = [
  "Motion design",
  "Logo",
  "Branding",
  "Web Design",
  "App Design",
  "Development",
  "Other",
];

const contactMethods = ["Email", "Telegram", "Whatsapp"];

export default function LaunchSection({ className }) {
  const [contactMethod, setContactMethod] = useState("Email");
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contactMethod,
          contact: formData.contact,
          services: selectedServices,
          project: formData.project,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData(INITIAL_FORM);
      setSelectedServices([]);
      setContactMethod("Email");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className={twMerge("relative bg-black py-16 md:py-24", className)}
    >
      {/* Thank you popup */}
      {status === "success" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-modal-backdrop"
          onClick={(e) => { if (!e.target.closest('[data-card]')) setStatus("idle"); }}
        >
          <div data-card className="bg-[#111111] rounded-[12px] px-12 py-10 flex flex-col items-center text-center w-[340px] animate-modal-card">
            <div className="logo logo-main-mobile mb-6" />
            <h2 className="font-heading text-white text-[34px] leading-[1.2] mb-3 text-center lowercase">
              thank you for<br />submitting
            </h2>
            <p className="text-white/60 text-[18px] font-medium mt-1" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
              We will get back to you shortly.
            </p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-[var(--max-width)] px-4 md:px-[30px]">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left column: title */}
          <TextReveal
            as="h2"
            className="font-heading leading-none lowercase tracking-2 text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8.125rem)" }}
            lineStagger={0.1}
            start="top 85%"
          >
            launch your project
          </TextReveal>

          {/* Right column: form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            {/* Field 1: Your data */}
            <div className="flex flex-col gap-4">
              <p className="text-xl font-medium text-white">
                Your data <span className="text-primary-500">*</span>
              </p>
              <input
                type="text"
                placeholder="Name or Company"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-transparent border-0.5 border-white rounded-lg px-5 py-6 text-xl text-white placeholder-[#929292] outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Field 2: Contact method */}
            <div className="flex flex-col gap-4">
              <p className="text-xl font-medium text-white">
                Where can we contact you?{" "}
                <span className="text-primary-500">*</span>
              </p>
              <div className="flex gap-8 flex-wrap">
                {contactMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={contactMethod === method}
                      onChange={() => setContactMethod(method)}
                      className="sr-only"
                    />
                    <span
                      className={`w-3 h-3 rounded-full border-0.5 flex-shrink-0 transition-colors ${
                        contactMethod === method
                          ? "bg-primary-500 border-primary-500"
                          : "border-white"
                      }`}
                    />
                    <span
                      className={`text-lg transition-colors ${
                        contactMethod === method
                          ? "text-primary-500"
                          : "text-white"
                      }`}
                    >
                      {method}
                    </span>
                  </label>
                ))}
              </div>
              <input
                type={contactMethod === "Email" ? "email" : "text"}
                placeholder={
                  contactMethod === "Email"
                    ? "E-mail"
                    : contactMethod === "Telegram"
                    ? "@username"
                    : "+421 000 000 000"
                }
                value={formData.contact}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, contact: e.target.value }))
                }
                className="bg-transparent border-0.5 border-white rounded-lg px-5 py-6 text-xl text-white placeholder-[#929292] outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Field 3: Services */}
            <div className="flex flex-col gap-4">
              <p className="text-xl font-medium text-white">
                What are you interested in?{" "}
                <span className="text-primary-500">*</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`border-0.5 rounded-full px-5 py-3 text-xl transition-colors ${
                      selectedServices.includes(service)
                        ? "border-primary-500 text-primary-500"
                        : "border-white text-white hover:border-primary-500 hover:text-primary-500"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 4: Project details */}
            <div className="flex flex-col gap-4">
              <p className="text-xl font-medium text-white">
                Tell us more about your project...
              </p>
              <textarea
                rows={4}
                placeholder="Project Details"
                value={formData.project}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, project: e.target.value }))
                }
                className="bg-transparent border-0.5 border-white rounded-lg px-5 py-6 text-xl text-white placeholder-[#929292] outline-none focus:border-primary-500 transition-colors resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative flex items-center justify-between bg-primary-500 rounded-[4px] px-10 py-6 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              style={{ width: "388px", maxWidth: "100%" }}
            >
              <span className="font-heading text-[34px] leading-1.3 lowercase tracking-2 text-black">
                {status === "loading" ? "sending..." : status === "error" ? "try again" : "submit"}
              </span>
              {status !== "loading" && (
                <svg
                  width="44"
                  height="37"
                  viewBox="0 0 51 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    className="origin-left duration-500 scale-x-[66%] group-hover:scale-x-100 transition-all"
                    d="M49.5137 14.3005L0 14.5005"
                    stroke="#000"
                    strokeWidth="2.63889"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    className="origin-left duration-500 -translate-x-1/3 group-hover:translate-x-0 transition-all"
                    d="M35.0545 26.8875C41.3581 17.8033 49.6162 14.5 49.6162 14.5C49.6162 14.5 41.3581 11.1967 35.0544 2.11184"
                    stroke="#000"
                    strokeWidth="2.63889"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            {status === "error" && (
              <p className="text-primary-500 text-base mt-2">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import TextReveal from "@/components/TextReveal";

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
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    project: "",
  });

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement form submission endpoint
  };

  return (
    <section
      id="contact"
      className={twMerge("bg-black py-16 md:py-24", className)}
    >
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
                type="text"
                placeholder="E-mail"
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
              className="group relative flex items-center justify-between bg-primary-500 rounded-[4px] px-10 py-6 overflow-hidden"
              style={{ width: "388px", maxWidth: "100%" }}
            >
              <span className="font-heading text-[34px] leading-1.3 lowercase tracking-2 text-black">
                submit
              </span>
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
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

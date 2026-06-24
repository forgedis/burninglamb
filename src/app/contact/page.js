"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TOTAL_STEPS = 11;

const STEPS = [
  {
    id: 1,
    question: "What is the website about?",
    subtitle: "Briefly explain your goal, products, services, and what you'd like to achieve.",
    type: "text",
    placeholder: "Event, AI Agent, Gardening...",
  },
  {
    id: 2,
    question: "What is the main goal of this website?",
    subtitle: "Select the primary purpose of the website project.",
    type: "radio",
    cols: 2,
    options: ["Generate leads", "Online shop/Product showcase", "Portfolio", "Build brand awareness", "Book appointments", "Educational", "Create community", "Other"],
    conditionalText: "Other",
    textareaPlaceholder: "Shortly describe your goal",
  },
  {
    id: 3,
    question: "Who is your target audience?",
    subtitle: "Describe the people you want visiting the website.",
    type: "text",
    placeholder: "Potential Clients, Businesses, People who...",
  },
  {
    id: 4,
    question: "Do you already have branding materials?",
    subtitle: "Select which assets you currently have available.",
    type: "radio",
    cols: 1,
    options: ["Logo", "Complete Brand Guidelines", "None yet"],
  },
  {
    id: 5,
    question: "What feeling should visitors get from the website?",
    subtitle: "Describe the emotional impression the website should create.",
    type: "text",
    placeholder: "Profesional, Joyfull, Calm, Excited..",
  },
  {
    id: 6,
    question: "Which design direction do you prefer?",
    subtitle: "Choose the closest style preference.",
    type: "radio",
    cols: 2,
    options: ["Clean & minimal", "Bold & modern", "Luxury & elegant", "Corporate & structured", "Creative & unique", "Fun & colorful", "High-tech/futuristic", "Other"],
    conditionalText: "Other",
    textareaPlaceholder: "Shortly describe your preference",
  },
  {
    id: 7,
    question: "Will you need ongoing support?",
    subtitle: "Select whether you'd like additional support after the project is finalizes from us.",
    type: "radio",
    cols: 1,
    options: ["Yes", "No", "Maybe later"],
  },
  {
    id: 8,
    question: "When would you like the project completed?",
    subtitle: "Choose your preferred timeline.",
    type: "radio",
    cols: 2,
    options: ["ASAP", "Within 1 week", "Within 2 weeks", "Within 1 month", "1-3 months", "Flexible timeline"],
  },
  {
    id: 9,
    question: "What is your estimated budget range?",
    subtitle: "A budget range helps define the scope and features realistically.",
    type: "radio",
    cols: 2,
    options: ["Under €500", "Under €1,000", "€1,000-€3,000", "€3,000-€5,000", "Prefer to discuss", "Other"],
  },
  {
    id: 10,
    question: "Is there anything else we should know before starting?",
    subtitle: "Share additional ideas, concerns, expectations, or requirements.",
    type: "text",
    placeholder: "Additional Thoughts...",
    optional: true,
  },
  {
    id: 11,
    question: "How can we contact you?",
    subtitle: "Share your prefered contact information.",
    type: "contact",
  },
];

const INITIAL_ANSWERS = {
  1: "",
  2: "",
  "2_text": "",
  3: "",
  4: "",
  5: "",
  6: "",
  "6_text": "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: { name: "", method: "Email", value: "" },
};

export default function ContactPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [status, setStatus] = useState("idle");
  const thankYouRef = useRef(null);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [status, router]);

  const current = STEPS[step - 1];

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function canContinue() {
    if (current.optional) return true;
    if (current.type === "contact") {
      return answers[11].name.trim().length > 0 && answers[11].value.trim().length > 0;
    }
    const val = answers[current.id];
    if (typeof val === "string") return val.trim().length > 0;
    return !!val;
  }

  async function handleSubmit() {
    setStatus("loading");
    const contact = answers[11];
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          contactMethod: contact.method,
          contact: contact.value,
          about: answers[1],
          goal: answers[2],
          goalDescription: answers["2_text"],
          audience: answers[3],
          branding: answers[4],
          feeling: answers[5],
          designDirection: answers[6],
          designDescription: answers["6_text"],
          support: answers[7],
          timeline: answers[8],
          budget: answers[9],
          extra: answers[10],
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }

  const isLastStep = step === TOTAL_STEPS;

  const dgFont = { fontFamily: "'Darker Grotesque', sans-serif" };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Thank you overlay */}
      {status === "success" && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => { if (!thankYouRef.current?.contains(e.target)) router.push("/"); }}
        >
          <div ref={thankYouRef} className="bg-[#111] rounded-xl px-12 py-10 flex flex-col items-center text-center max-w-sm mx-4">
            <div className="logo logo-scaled mb-6" />
            <h2 className="font-heading text-white text-[34px] leading-[1.2] lowercase mb-3">
              <span style={dgFont}>t</span>hank you for<br />submitting
            </h2>
            <p className="text-white/60 text-[18px] font-medium mt-1" style={dgFont}>
              We will get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {/* Page uses a min-height layout so button is always near bottom on short content */}
      <div className="relative min-h-screen w-full">

        {/* ── Nav row ── centered 534px, absolute top-[60px] */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[60px] w-full max-w-[534px] px-4 flex items-center justify-between">
          <button
            onClick={() => (step > 1 ? setStep((s) => s - 1) : router.push("/"))}
            className="flex items-center gap-[6px] hover:opacity-80 transition-opacity"
          >
            <Image src="/svg/lamb-primary.svg" alt="" width={21} height={16} />
            <span
              className="text-[18px] text-primary-500 underline decoration-solid leading-[1.2]"
              style={{ ...dgFont, fontWeight: 400 }}
            >
              Navigate to Home
            </span>
          </button>
          <span style={{ ...dgFont, fontWeight: 500, fontSize: "18px", lineHeight: "1.2" }}>
            <span className="text-white">{step}</span>
            <span className="text-[#929292]">{` / ${TOTAL_STEPS}`}</span>
          </span>
        </div>

        {/* ── Progress dots ── centered, absolute top-[119px] */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[119px] flex items-center gap-[41.5px]">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const isPast = i + 1 < step;
            const isCurrent = i + 1 === step;
            return (
              <button
                key={i}
                onClick={() => isPast && setStep(i + 1)}
                className={`rounded-full transition-all duration-300 shrink-0${isPast ? " cursor-pointer hover:opacity-70" : " cursor-default"}`}
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: isPast ? "#f04823" : isCurrent ? "#ffffff" : "transparent",
                  border: "1.5px solid #f04823",
                }}
              />
            );
          })}
        </div>

        {/* ── Content block ── 470px wide, centered, starts at top-[191px] */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[191px] w-full max-w-[470px] px-4">

          {/* Question + subtitle */}
          <div className="flex flex-col gap-[20px] mb-[50px]">
            <h1
              className="font-heading text-white lowercase leading-[1.2]"
              style={{ fontSize: "32px", letterSpacing: "-0.64px" }}
            >
              {current.question}
            </h1>
            {current.subtitle && (
              <p
                className="text-white/60 leading-[1.2]"
                style={{ ...dgFont, fontSize: "18px", fontWeight: 500 }}
              >
                {current.subtitle}
              </p>
            )}
          </div>

          {/* ── text input ── */}
          {current.type === "text" && (
            <div className="border-[0.5px] border-white rounded-[8px] px-[20px] py-[24px] mb-[50px]">
              <input
                type="text"
                placeholder={current.placeholder}
                value={answers[current.id]}
                onChange={(e) => setAnswer(current.id, e.target.value)}
                className="w-full bg-transparent text-white outline-none"
                style={{ ...dgFont, fontSize: "20px", fontWeight: 500, color: "#fff" }}
              />
            </div>
          )}

          {/* ── radio options ── */}
          {current.type === "radio" && (
            <div className="mb-[50px]">
              <div
                className={
                  current.cols === 2
                    ? "grid grid-cols-2 gap-x-[50px] gap-y-[30px] mb-[30px]"
                    : "flex flex-col gap-[30px] mb-[30px]"
                }
              >
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswer(current.id, opt)}
                      className="flex items-center gap-[8px] text-left"
                    >
                      <div
                        className="shrink-0 rounded-full transition-all duration-150"
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: selected ? "#f04823" : "transparent",
                          border: "1.5px solid #f04823",
                        }}
                      />
                      <span
                        className="text-[#fbf7f0] leading-[1.2]"
                        style={{ ...dgFont, fontSize: "18px", fontWeight: 500 }}
                      >
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
              {current.conditionalText && answers[current.id] === current.conditionalText && (
                <div className="border-[0.5px] border-white rounded-[8px] px-[20px] py-[24px]">
                  <input
                    type="text"
                    placeholder={current.textareaPlaceholder}
                    value={answers[`${current.id}_text`] || ""}
                    onChange={(e) => setAnswer(`${current.id}_text`, e.target.value)}
                    className="w-full bg-transparent text-white outline-none"
                    style={{ ...dgFont, fontSize: "20px", fontWeight: 500 }}
                  />
                </div>
              )}
            </div>
          )}

          {/* ── contact step ── */}
          {current.type === "contact" && (
            <div className="flex flex-col gap-[20px] mb-[50px]">
              <div>
                <p
                  className="mb-[10px] text-white leading-[1.2]"
                  style={{ ...dgFont, fontSize: "18px", fontWeight: 500 }}
                >
                  Your data <span className="text-primary-500">*</span>
                </p>
                <div className="border-[0.5px] border-white rounded-[8px] px-[20px] py-[24px]">
                  <input
                    type="text"
                    placeholder="Name or Company"
                    value={answers[11].name}
                    onChange={(e) => setAnswer(11, { ...answers[11], name: e.target.value })}
                    className="w-full bg-transparent text-white outline-none"
                    style={{ ...dgFont, fontSize: "20px", fontWeight: 500 }}
                  />
                </div>
              </div>
              <div>
                <p
                  className="mb-[12px] text-white leading-[1.2]"
                  style={{ ...dgFont, fontSize: "18px", fontWeight: 500 }}
                >
                  Where can we contact you? <span className="text-primary-500">*</span>
                </p>
                <div className="flex gap-[30px] mb-[16px]">
                  {["Email", "Telegram", "Whatsapp"].map((opt) => {
                    const selected = answers[11].method === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswer(11, { ...answers[11], method: opt })}
                        className="flex items-center gap-[8px]"
                      >
                        <div
                          className="shrink-0 rounded-full transition-all duration-150"
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: selected ? "#f04823" : "transparent",
                            border: "1.5px solid #f04823",
                          }}
                        />
                        <span
                          className="text-[#fbf7f0] leading-[1.2]"
                          style={{ ...dgFont, fontSize: "18px", fontWeight: 500 }}
                        >
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="border-[0.5px] border-white rounded-[8px] px-[20px] py-[24px]">
                  <input
                    type={answers[11].method === "Email" ? "email" : "text"}
                    placeholder={
                      answers[11].method === "Email"
                        ? "E-mail"
                        : answers[11].method === "Telegram"
                        ? "@username"
                        : "+421 000 000 000"
                    }
                    value={answers[11].value}
                    onChange={(e) => setAnswer(11, { ...answers[11], value: e.target.value })}
                    className="w-full bg-transparent text-white outline-none"
                    style={{ ...dgFont, fontSize: "20px", fontWeight: 500 }}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── Continue / Submit button ── 534px centered, absolute bottom-[93px] */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[93px] w-full max-w-[534px] px-4">
          <button
            onClick={handleNext}
            disabled={!canContinue() || status === "loading"}
            className="w-full flex items-center justify-between bg-primary-500 rounded-[4px] px-[40px] disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
            style={{ height: "84px" }}
          >
            <span className="font-heading text-[34px] leading-[1.3] lowercase tracking-[0.02em] text-black">
              {status === "loading" ? "sending…" : isLastStep ? "submit" : "continue"}
            </span>
            <svg width="44" height="29" viewBox="0 0 51 29" fill="none" className="shrink-0">
              <path d="M49.5137 14.3005L0 14.5005" stroke="#000" strokeWidth="2.63889" strokeLinecap="square" />
              <path d="M35.0545 26.8875C41.3581 17.8033 49.6162 14.5 49.6162 14.5C49.6162 14.5 41.3581 11.1967 35.0544 2.11184" stroke="#000" strokeWidth="2.63889" strokeLinecap="square" />
            </svg>
          </button>
          {status === "error" && (
            <p className="text-primary-500 text-sm mt-3 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

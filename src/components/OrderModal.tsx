"use client";

import { useState } from "react";
import { X, MapPin, Mail, Phone, Calendar, Heart, Home } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxTitle: string;
}

interface FormState {
  city: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  postalCode: string;
  deliveryDate: string;
}

const INITIAL_FORM: FormState = {
  city: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  street: "",
  postalCode: "",
  deliveryDate: "",
};

// Cities and their valid postal codes (Slovak format, normalised without space)
const CITY_POSTAL_MAP: Record<string, string[]> = {
  "Poprad":           ["05801"],
  "Spišská Sobota":   ["05801"],
  "Veľká":            ["05801"],
  "Matejovce":        ["05801"],
  "Kvetnica":         ["05801"],
  "Svit":             ["05921"],
  "Ganovce":          ["05927"],
  "Spišská Teplica":  ["05928"],
  "Stráže":           ["05952"],
  "Veľká Lomnica":    ["05952"],
};

const CITIES = Object.keys(CITY_POSTAL_MAP);

function normalisePostal(raw: string): string {
  return raw.replace(/\s/g, "");
}

function getPostalStatus(city: string, postalCode: string): "empty" | "valid" | "coming-soon" {
  const clean = normalisePostal(postalCode);
  if (!clean || clean.length < 5) return "empty";
  const validCodes = CITY_POSTAL_MAP[city];
  if (!validCodes) return "empty";
  return validCodes.includes(clean) ? "valid" : "coming-soon";
}

export default function OrderModal({ isOpen, onClose, boxTitle }: OrderModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleClose() {
    setForm(INITIAL_FORM);
    setDateError("");
    setIsSuccess(false);
    setSubmitError("");
    onClose();
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!val) {
      setForm((f) => ({ ...f, deliveryDate: "" }));
      setDateError("");
      return;
    }
    const parts = val.split("-");
    const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) {
      setDateError("Doručujeme iba v Sobotu a Nedeľu. Prosím, vyberte víkend.");
      setForm((f) => ({ ...f, deliveryDate: "" }));
    } else {
      setDateError("");
      setForm((f) => ({ ...f, deliveryDate: val }));
    }
  }

  const postalStatus = form.city ? getPostalStatus(form.city, form.postalCode) : "empty";
  const addressValid = postalStatus === "valid";
  const canSubmit =
    form.city !== "" &&
    form.deliveryDate !== "" &&
    dateError === "" &&
    addressValid &&
    !isSubmitting;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          box: boxTitle,
          city: form.city,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          address: `${form.street}, ${form.postalCode} ${form.city}`,
          deliveryDate: form.deliveryDate,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setIsSuccess(true);
      setTimeout(() => { handleClose(); }, 3500);
    } catch {
      setSubmitError("Nepodarilo sa odoslať. Skúste to znova.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  // Shared input style
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid rgba(180,145,75,0.3)",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#1a202c",
    boxSizing: "border-box",
    background: "white",
    fontFamily: "inherit",
    outline: "none",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,32,44,0.95)", backdropFilter: "blur(4px)" }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        style={{ position: "relative", background: "#ffffff", width: "100%", maxWidth: "640px", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: "#f5f0e8", borderBottom: "1px solid rgba(180,145,75,0.2)", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "28px", color: "#1a202c" }}>Objednávka</h2>
            <p style={{ margin: "4px 0 0", fontFamily: "var(--font-accent)", fontSize: "20px", color: "#b4914b" }}>{boxTitle}</p>
          </div>
          <button onClick={handleClose} style={{ background: "white", border: "1px solid rgba(180,145,75,0.2)", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} color="#1a202c" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px", overflowY: "auto", flexGrow: 1 }}>
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ width: "80px", height: "80px", background: "rgba(180,145,75,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <Heart size={40} color="#b4914b" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "#1a202c", margin: "0 0 8px" }}>Objednávka prijatá!</h3>
              <p style={{ color: "rgba(26,32,44,0.6)", margin: 0 }}>Ďakujeme. O chvíľu sa vám ozveme s detailmi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

              {/* ── CITY ── */}
              <div style={{ background: "rgba(180,145,75,0.05)", border: "1px solid rgba(180,145,75,0.2)", borderRadius: "12px", padding: "20px" }}>
                <p style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#b4914b", display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={14} /> Vyberte si vaše mesto
                </p>
                <select
                  required
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value, postalCode: "" }))}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="" disabled>Vyberte si mesto...</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <p style={{ margin: "8px 0 0", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,32,44,0.4)", textAlign: "right" }}>(Ďalšie mestá čoskoro)</p>
              </div>

              {/* ── NAME ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>Meno</label>
                  <input type="text" required placeholder="Jozef" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>Priezvisko</label>
                  <input type="text" required placeholder="Mrkvička" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} style={inputStyle} />
                </div>
              </div>

              {/* ── CONTACT ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "4px" } as React.CSSProperties}>
                    <Phone size={13} /> Telefón
                  </label>
                  <input type="tel" required placeholder="+421 900 000 000" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "4px" } as React.CSSProperties}>
                    <Mail size={13} /> E-mail
                  </label>
                  <input type="email" required placeholder="jozef@email.sk" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={inputStyle} />
                </div>
              </div>

              {/* ── ADDRESS ── */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px", alignItems: "center", gap: "4px", display: "flex" } as React.CSSProperties}>
                  <Home size={13} /> Ulica a číslo domu
                </label>
                <input
                  type="text"
                  required
                  placeholder="napr. Mnoheľova 867/3"
                  value={form.street}
                  onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* ── POSTAL CODE ── */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>PSČ (poštové smerovacie číslo)</label>
                <input
                  type="text"
                  required
                  placeholder={form.city ? `napr. ${CITY_POSTAL_MAP[form.city]?.[0].slice(0,3)} ${CITY_POSTAL_MAP[form.city]?.[0].slice(3)}` : "058 01"}
                  value={form.postalCode}
                  onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                  style={{
                    ...inputStyle,
                    borderColor: postalStatus === "coming-soon" ? "rgba(180,145,75,0.5)" : "rgba(180,145,75,0.3)",
                  }}
                  maxLength={6}
                />

                {/* Coming Soon message */}
                {postalStatus === "coming-soon" && (
                  <div style={{
                    marginTop: "10px",
                    padding: "12px 16px",
                    background: "linear-gradient(135deg, rgba(180,145,75,0.08), rgba(180,145,75,0.04))",
                    border: "1px solid rgba(180,145,75,0.25)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}>
                    <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>✦</span>
                    <div>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#b4914b", fontFamily: "var(--font-heading)" }}>
                        Vaša oblasť je na mape — čoskoro!
                      </p>
                      <p style={{ margin: "3px 0 0", fontSize: "12px", color: "rgba(26,32,44,0.55)", lineHeight: 1.5 }}>
                        Toto PSČ momentálne nie je v našej doručovacej zóne, ale rozrastáme sa. Sledujte nás — budeme u vás skôr, ako si myslíte.
                      </p>
                    </div>
                  </div>
                )}

                {/* Valid confirmation */}
                {postalStatus === "valid" && (
                  <div style={{ marginTop: "8px", fontSize: "12px", color: "#38a169", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>✓</span> PSČ zodpovedá vybranému mestu — perfektné!
                  </div>
                )}
              </div>

              {/* ── DATE ── */}
              <div style={{ background: "rgba(245,240,232,0.5)", border: "1px solid rgba(180,145,75,0.2)", borderRadius: "12px", padding: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#1a202c", marginBottom: "12px" }}>
                  <Calendar size={14} color="#b4914b" /> Termín doručenia
                </label>
                <input
                  type="date"
                  required
                  value={form.deliveryDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  style={{ ...inputStyle, borderColor: dateError ? "#e53e3e" : "rgba(180,145,75,0.3)" }}
                />
                {dateError && <p style={{ margin: "8px 0 0", color: "#e53e3e", fontSize: "13px" }}>{dateError}</p>}
                {form.deliveryDate && !dateError && (
                  <div style={{ marginTop: "12px", background: "rgba(180,145,75,0.1)", border: "1px solid rgba(180,145,75,0.2)", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", fontWeight: 600, color: "#1a202c", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", background: "#b4914b", borderRadius: "50%", display: "inline-block" }} />
                    Doručenie prebehne medzi 12:00 a 14:00.
                  </div>
                )}
              </div>

              {submitError && (
                <div style={{ padding: "12px 16px", background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: "8px", color: "#c53030", fontSize: "13px" }}>
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: canSubmit ? "#1a202c" : "rgba(26,32,44,0.35)",
                  color: "#f5f0e8",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "background 0.2s",
                }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ width: "16px", height: "16px", border: "2px solid rgba(245,240,232,0.3)", borderTop: "2px solid #f5f0e8", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                    Odosielam...
                  </>
                ) : "Záväzne Objednať"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

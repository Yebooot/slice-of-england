"use client";

import { useState } from "react";
import { X, MapPin, Mail, Phone, Calendar, Heart } from "lucide-react";

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
  address: string;
  deliveryDate: string;
}

const INITIAL_FORM: FormState = {
  city: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  deliveryDate: "",
};

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
    // Parse as UTC to avoid timezone day-shift
    const parts = val.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    const dow = date.getDay(); // 0=Sun, 6=Sat
    if (dow !== 0 && dow !== 6) {
      setDateError("Doručujeme iba v Sobotu a Nedeľu. Prosím, vyberte víkend.");
      setForm((f) => ({ ...f, deliveryDate: "" }));
    } else {
      setDateError("");
      setForm((f) => ({ ...f, deliveryDate: val }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ box: boxTitle, ...form }),
      });
      if (!res.ok) throw new Error("Server error");
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3500);
    } catch {
      setSubmitError("Nepodarilo sa odoslať. Skúste to znova.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  const canSubmit = form.city !== "" && form.deliveryDate !== "" && dateError === "" && !isSubmitting;

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

      {/* Modal box */}
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          width: "100%",
          maxWidth: "640px",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: "#f5f0e8", borderBottom: "1px solid rgba(180,145,75,0.2)", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "28px", color: "#1a202c" }}>Objednávka</h2>
            <p style={{ margin: "4px 0 0", fontFamily: "var(--font-accent)", fontSize: "20px", color: "#b4914b" }}>{boxTitle}</p>
          </div>
          <button
            onClick={handleClose}
            style={{ background: "white", border: "1px solid rgba(180,145,75,0.2)", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X size={18} color="#1a202c" />
          </button>
        </div>

        {/* Scrollable content */}
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

              {/* City */}
              <div style={{ background: "rgba(180,145,75,0.05)", border: "1px solid rgba(180,145,75,0.2)", borderRadius: "12px", padding: "20px" }}>
                <p style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#b4914b", display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={14} /> Doručujeme do týchto miest:
                </p>
                <select
                  required
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(180,145,75,0.3)", borderRadius: "8px", fontSize: "15px", color: "#1a202c", background: "white", cursor: "pointer" }}
                >
                  <option value="" disabled>Vyberte si mesto...</option>
                  <option value="Bratislava">Bratislava</option>
                  <option value="Košice">Košice</option>
                  <option value="Poprad">Poprad</option>
                </select>
                <p style={{ margin: "8px 0 0", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,32,44,0.4)", textAlign: "right" }}>(Ďalšie mestá čoskoro)</p>
              </div>

              {/* Name row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>Meno</label>
                  <input
                    type="text"
                    required
                    placeholder="Jozef"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(180,145,75,0.3)", borderRadius: "8px", fontSize: "14px", color: "#1a202c", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>Priezvisko</label>
                  <input
                    type="text"
                    required
                    placeholder="Mrkvička"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(180,145,75,0.3)", borderRadius: "8px", fontSize: "14px", color: "#1a202c", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Contact row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>
                    <Phone size={13} style={{ display: "inline", marginRight: "4px" }} />Telefón
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+421 900 000 000"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(180,145,75,0.3)", borderRadius: "8px", fontSize: "14px", color: "#1a202c", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>
                    <Mail size={13} style={{ display: "inline", marginRight: "4px" }} />E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jozef@email.sk"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(180,145,75,0.3)", borderRadius: "8px", fontSize: "14px", color: "#1a202c", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(26,32,44,0.7)", marginBottom: "6px" }}>Adresa doručenia</label>
                <textarea
                  required
                  placeholder="Ulica, číslo domu, poschodie..."
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  rows={2}
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(180,145,75,0.3)", borderRadius: "8px", fontSize: "14px", color: "#1a202c", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>

              {/* Date */}
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
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: `1px solid ${dateError ? "#e53e3e" : "rgba(180,145,75,0.3)"}`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#1a202c",
                    boxSizing: "border-box",
                    background: "white",
                  }}
                />
                {dateError && (
                  <p style={{ margin: "8px 0 0", color: "#e53e3e", fontSize: "13px" }}>{dateError}</p>
                )}
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
                  background: canSubmit ? "#1a202c" : "rgba(26,32,44,0.4)",
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

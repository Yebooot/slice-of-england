"use client";

import { useState } from "react";
import { X, Calendar as CalendarIcon, MapPin, Mail, Phone, Home as Info } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxTitle: string;
}

export default function OrderModal({ isOpen, onClose, boxTitle }: OrderModalProps) {
  const [dateError, setDateError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    deliveryDate: "",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateStr = e.target.value;
    setFormData({ ...formData, deliveryDate: selectedDateStr });
    
    if (!selectedDateStr) {
      setDateError("");
      return;
    }

    const date = new Date(selectedDateStr);
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      setDateError("Doručujeme iba cez víkendy (Sobota a Nedeľa). Prosím, vyberte iný dátum.");
      setFormData({ ...formData, deliveryDate: "" });
    } else {
      setDateError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { box: boxTitle, ...formData });
    setIsSuccess(true);
    // User noted: "Once this gets filled out, I'll later tell you where this should be sent."
    // Keeping it at success state for now.
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/95 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-cream border-b border-secondary/20 p-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="font-heading text-3xl text-primary">Objednávka</h2>
            <p className="text-secondary font-medium font-accent text-xl mt-1">{boxTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full text-primary hover:text-secondary hover:bg-cream transition-colors border border-secondary/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                 <Heart className="w-10 h-10" />
              </div>
              <h3 className="font-heading text-3xl text-primary mb-2">Objednávka prijatá!</h3>
              <p className="text-primary/70">Ďakujeme. O chvíľu sa vám ozveme s detailmi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* City Selection */}
              <div className="bg-secondary/5 rounded-xl border border-secondary/20 p-5">
                <p className="text-[13px] uppercase tracking-widest text-secondary font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Máte šťastie, doručujeme do týchto miest:
                </p>
                <select 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full bg-white border border-secondary/30 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent text-sm md:text-base font-medium"
                >
                  <option value="" disabled>Vyberte si mesto...</option>
                  <option value="Bratislava">Bratislava</option>
                  <option value="Košice">Košice</option>
                  <option value="Poprad">Poprad</option>
                </select>
                <p className="text-[11px] uppercase tracking-wider text-primary/50 mt-3 text-right">
                  (Ďalšie mestá čoskoro)
                </p>
              </div>

              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-1.5 pl-1">Meno</label>
                  <input 
                    type="text" required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-white border border-secondary/30 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                    placeholder="Jozef"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-1.5 pl-1">Priezvisko</label>
                  <input 
                    type="text" required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-white border border-secondary/30 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                    placeholder="Mrkvička"
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-1.5 pl-1">Telefónne číslo</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-secondary/30 rounded-lg pl-10 pr-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                      placeholder="+421 900 000 000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-1.5 pl-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-secondary/30 rounded-lg pl-10 pr-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                      placeholder="jozef@email.sk"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-1.5 pl-1">Adresa doručenia</label>
                <div className="relative">
                  <Info className="w-4 h-4 text-primary/40 absolute left-3 top-3.5" />
                  <textarea 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-white border border-secondary/30 rounded-lg pl-10 pr-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm min-h-[80px]"
                    placeholder="Ulica, číslo domu, poschodie..."
                  />
                </div>
              </div>

              {/* Delivery Date */}
              <div className="bg-cream/50 rounded-xl border border-secondary/20 p-5">
                <label className="block text-sm font-bold text-primary mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-secondary" />
                  Termín doručenia
                </label>
                <input 
                  type="date" required
                  value={formData.deliveryDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]} // Cannot select past dates
                  className={`w-full bg-white border ${dateError ? 'border-red-500' : 'border-secondary/30'} rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm`}
                />
                
                {dateError && (
                  <p className="text-red-500 text-sm mt-3 animate-in fade-in">
                    {dateError}
                  </p>
                )}

                {formData.deliveryDate && !dateError && (
                  <div className="mt-4 bg-secondary/10 text-primary border border-secondary/20 rounded-lg p-3 text-sm font-medium flex items-center gap-2 animate-in fade-in">
                     <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                     Doručenie prebehne vo vybraný deň medzi 12:00 a 14:00.
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4 sticky bottom-0 bg-white">
                <button 
                  type="submit"
                  disabled={!formData.city || !formData.deliveryDate || !!dateError}
                  className="w-full bg-primary text-cream py-4 rounded-lg hover:bg-primary/90 transition-all font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/10"
                >
                  Záväzne Objednať
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Coffee, Gift, Heart, ArrowRight, UtensilsCrossed, X, Search } from "lucide-react";
import Logo from "@/components/Logo";
import OrderModal from "@/components/OrderModal";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [orderModalBox, setOrderModalBox] = useState<string | null>(null);

  const productBoxes = [
    {
      id: "signature",
      title: "Signature Box",
      price: "€12.99",
      image: "/images/signature-box.jpg",
      items: [
        "1x Šunka & syr",
        "1x Uhorka & cream cheese",
        "1x Vajíčko & žerucha",
        "1x Scones + džem & smotana",
        "1x Snickers cupcake",
        "1x Red velvet",
        "1x Citrónová panna cotta"
      ],
      highlight: "Sypaný čaj included",
      theme: "light"
    },
    {
      id: "collection",
      title: "Collection Box",
      price: "€21.99",
      image: "/images/collection-box.jpg",
      items: [
        "2x Šunka & syr",
        "2x Uhorka & cream cheese",
        "2x Vajíčko & žerucha",
        "2x Scones + džem & smotana",
        "2x Snickers cupcake",
        "2x Red velvet",
        "2x Citrónová panna cotta"
      ],
      highlight: "2x Sypaný čaj included",
      theme: "dark"
    }
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-cream/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo size={48} className="rounded-full border border-secondary/20" />
            <div className="font-heading text-xl font-bold tracking-tight text-primary">
              Slice of England
            </div>
          </div>
          <div className="hidden md:flex space-x-10 text-[13px] font-medium tracking-widest uppercase">
            <a href="#o-nas" className="hover:text-secondary transition-colors">O nás</a>
            <a href="#menu" className="hover:text-secondary transition-colors">Menu</a>
            <a href="#boxy" className="hover:text-secondary transition-colors">Boxy</a>
            <a href="#kontakt" className="hover:text-secondary transition-colors">Kontakt</a>
          </div>
          <button className="bg-primary text-cream px-6 py-2.5 rounded-sm hover:bg-primary/90 transition-all font-medium text-sm">
            Objednať
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-floral-pattern"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Tradičný anglický popoludňajší čaj"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-[12px] mb-6 block">
              Zážitok moderného Anglicka
            </span>
            <h1 className="font-heading text-5xl md:text-8xl font-bold text-primary leading-[1.1] mb-8">
              Pravý britský čaj <br/>u vás doma.
            </h1>
            <p className="text-lg md:text-xl text-primary/80 mb-10 leading-relaxed max-w-lg">
              Prinášame kúsok britskej kultúry priamo na Slovensko. Naše boxy sú plné tradície, elegancie a chutí, ktoré musíte zažiť.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#boxy" className="bg-primary text-cream px-10 py-4 rounded-sm hover:bg-primary/90 transition-all font-medium flex items-center justify-center gap-3 group text-sm">
                Pozrieť ponuku
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#menu" className="bg-transparent border border-primary text-primary px-10 py-4 rounded-sm hover:bg-primary/5 transition-all font-medium text-sm text-center">
                Prezrieť Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Storytelling Section: Tajomstvo anglickej klasiky */}
      <section id="o-nas" className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
              <h3 className="font-accent text-5xl text-secondary mb-2">Tajomstvo anglickej klasiky...</h3>
              <h2 className="font-heading text-4xl text-primary mb-10">Tradícia v každom súste</h2>
              
              <div className="space-y-12">
                <div className="flex gap-8">
                  <div className="w-24 h-24 shrink-0 flex items-center justify-center -ml-4">
                    <Image 
                      src="/scone-illustration.png" 
                      alt="Scones illustration" 
                      width={100} 
                      height={100} 
                      className="object-contain mix-blend-multiply opacity-90 scale-110"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Scones</h4>
                    <p className="text-primary/70 leading-relaxed text-sm">
                      Scone (sladký pagáč) sa tradične prekrojí na dve polovice a servíruje sa s džemom a smotanou (clotted cream).
                    </p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="w-24 h-24 shrink-0 flex items-center justify-center -ml-4">
                    <Image 
                      src="/tea-illustration.png" 
                      alt="Tea illustration" 
                      width={100} 
                      height={100} 
                      className="object-contain mix-blend-multiply opacity-90 scale-125"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Tea (Čaj)</h4>
                    <p className="text-primary/70 leading-relaxed text-sm">
                      V Spojenom kráľovstve sa denne vypije až 35 miliónov šálok čaju PG Tips. Čaj zalejte vriacou vodou a luhujte 2-3 minúty. Môžete podávať s mliekom a cukrom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-primary group overflow-hidden">
              <Image 
                src="/images/hero.png" 
                alt="Afternoon Tea Details" 
                fill 
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 border-[20px] border-cream/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="font-accent text-5xl text-secondary mb-2">Menu</h3>
            <h2 className="font-heading text-4xl text-primary uppercase tracking-widest">Ponuka dobrôt</h2>
            <div className="w-20 h-px bg-secondary mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-8">
              <div className="flex flex-col items-center text-center">
                <span className="font-heading text-2xl text-primary mb-4 border-b border-secondary/40 pb-2 px-4 uppercase tracking-tighter">Sandwiches</span>
                <p className="font-medium text-primary/80">
                  Uhorka & cream cheese <br/>
                  Šunka & syr <br/>
                  Vajíčko & žerucha
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col items-center text-center">
                <span className="font-heading text-2xl text-primary mb-4 border-b border-secondary/40 pb-2 px-4 uppercase tracking-tighter">Scones</span>
                <p className="font-medium text-primary/80">
                  Čerstvo upečené scones <br/>
                  Džem & smotana (clotted cream)
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col items-center text-center">
                <span className="font-heading text-2xl text-primary mb-4 border-b border-secondary/40 pb-2 px-4 uppercase tracking-tighter">Cakes</span>
                <p className="font-medium text-primary/80">
                  Snickers cupcake <br/>
                  Red velvet <br/>
                  Citrónová panna cotta
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boxy Portfolio */}
      <section id="boxy" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl text-primary mb-4">Vyberte si svoj Box</h2>
            <p className="text-primary/60">Prineste si domov pravú britskú atmosféru.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {productBoxes.map((box) => (
              <div 
                key={box.id}
                className={`border border-secondary/10 relative group overflow-hidden flex flex-col min-h-[450px] ${
                  box.theme === 'dark' ? 'bg-primary text-cream' : 'bg-white text-primary'
                }`}
              >
                {/* Tiny Corner Image Trigger */}
                <button 
                  onClick={() => setSelectedImage(box.image)}
                  className="absolute top-6 right-6 z-10 w-20 h-20 overflow-hidden rounded-lg border-2 border-secondary/40 shadow-xl group/img"
                  title="Kliknite pre zväčšenie"
                >
                  <Image 
                    src={box.image} 
                    alt={box.title} 
                    fill 
                    className="object-cover group-hover/img:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors flex items-center justify-center">
                    <Search className="text-white w-5 h-5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  </div>
                </button>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="font-accent text-3xl text-secondary mb-2">{box.title}</div>
                  <div className={`text-4xl font-heading mb-6 tracking-tighter ${box.theme === 'dark' ? 'text-white' : 'text-primary'}`}>
                    {box.price}
                  </div>
                  <div className="w-12 h-px bg-secondary/30 mb-8"></div>
                  
                  <ul className={`space-y-4 font-medium text-[15px] flex-1 ${box.theme === 'dark' ? 'text-cream/70' : 'text-primary/70'}`}>
                    {box.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                    <li className="font-bold text-secondary italic pt-2">{box.highlight}</li>
                  </ul>

                  <button 
                    onClick={() => setOrderModalBox(box.title)}
                    className={`w-full mt-12 py-5 transition-all font-semibold tracking-wider uppercase text-xs ${
                      box.theme === 'dark' 
                        ? 'bg-secondary text-white hover:bg-secondary/90 shadow-xl shadow-black/20' 
                        : 'bg-primary text-cream hover:bg-primary/90'
                    }`}
                  >
                    Objednať {box.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-cream/60 hover:text-white p-2 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Detail boxu" 
              fill 
              className="object-contain" 
              priority
            />
          </div>
          <div className="absolute bottom-10 text-cream/40 text-sm uppercase tracking-widest pointer-events-none">
            Kliknite kamkoľvek pre zatvorenie
          </div>
        </div>
      )}

      {/* Contact Banner */}
      <section className="py-20 bg-background relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <Gift className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-heading text-4xl text-primary mb-6">Chcete niekoho obdariť?</h2>
            <p className="text-primary/70 mb-10 text-lg leading-relaxed">
              Či už ide o narodeniny, výročie alebo len tak z lásky, náš box je dokonalým spôsobom, ako povedať "záleží mi na tebe".
            </p>
         </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="bg-primary text-cream pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <Logo size={64} className="rounded-full" />
                <div className="font-heading text-2xl font-bold tracking-tight text-secondary lowercase italic">
                  slice of england.
                </div>
              </div>
              <p className="text-cream/60 max-w-sm mb-6 leading-relaxed">
                Prinášame tradičný britský "Afternoon Tea" na Slovensko. Luxusný zážitok, ktorý k vám doručíme priamo domov.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-xl mb-4 text-cream">Rýchle odkazy</h4>
              <ul className="space-y-3 text-[13px] text-cream/50 uppercase tracking-widest">
                <li><a href="#menu" className="hover:text-secondary transition-colors">Menu</a></li>
                <li><a href="#boxy" className="hover:text-secondary transition-colors">Naše Boxy</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Darčekové poukazy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl mb-4 text-cream">Kontakt</h4>
              <ul className="space-y-3 text-cream/60 text-sm">
                <li>ahoj@sliceofengland.sk</li>
                <li>+421 900 000 000</li>
                <li className="pt-2">Follow us @sliceofengland</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-cream/10 text-center text-cream/40 text-[11px] uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-6">
            <p>&copy; {new Date().getFullYear()} Slice of England. Všetky práva vyhradené.</p>
            <div className="flex space-x-8">
               <a href="#" className="hover:text-cream transition-colors">Obchodné podmienky</a>
               <a href="#" className="hover:text-cream transition-colors">GDPR</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      <OrderModal 
        isOpen={!!orderModalBox} 
        onClose={() => setOrderModalBox(null)} 
        boxTitle={orderModalBox || ""} 
      />
    </div>
  );
}

import Image from "next/image";
import { Coffee, Gift, Heart, ArrowRight, UtensilsCrossed } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-cream/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-heading text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
            Slice of England
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
                  <div className="w-24 h-24 shrink-0 bg-white p-4 border border-secondary/20 flex items-center justify-center">
                    <UtensilsCrossed className="w-10 h-10 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Scones</h4>
                    <p className="text-primary/70 leading-relaxed text-sm">
                      Scone (sladký pagáč) sa tradične prekrojí na dve polovice a servíruje sa s džemom a smotanou (clotted cream).
                    </p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="w-24 h-24 shrink-0 bg-white p-4 border border-secondary/20 flex items-center justify-center">
                    <Coffee className="w-10 h-10 text-secondary" />
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
            {/* Signature Box */}
            <div className="bg-white border border-secondary/10 relative group overflow-hidden flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image src="/images/signature-box.jpg" alt="Signature Box" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/20"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1">
                   <span className="font-accent text-2xl text-secondary">Signature Box</span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="text-4xl font-heading text-primary mb-6 tracking-tighter">€12.99</div>
                <div className="w-12 h-px bg-secondary/30 mb-6"></div>
                <ul className="space-y-3 text-primary/80 font-medium text-[14px] flex-1">
                  <li>• 1x Šunka & syr</li>
                  <li>• 1x Uhorka & cream cheese</li>
                  <li>• 1x Vajíčko & žerucha</li>
                  <li>• 1x Scones + džem & smotana</li>
                  <li>• 1x Snickers cupcake</li>
                  <li>• 1x Red velvet</li>
                  <li>• 1x Citrónová panna cotta</li>
                  <li className="font-bold text-secondary italic">Sypaný čaj included</li>
                </ul>
                <button className="w-full mt-10 bg-primary text-cream py-4 hover:bg-primary/90 transition-all font-semibold tracking-wider uppercase text-xs">
                  Objednať Signature Box
                </button>
              </div>
            </div>

            {/* Collection Box */}
            <div className="bg-primary border border-secondary/10 relative group overflow-hidden text-cream flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image src="/images/collection-box.jpg" alt="Collection Box" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/20"></div>
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-1">
                   <span className="font-accent text-2xl text-secondary">Collection Box</span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="text-4xl font-heading mb-6 tracking-tighter text-white">€21.99</div>
                <div className="w-12 h-px bg-secondary/40 mb-6"></div>
                <ul className="space-y-3 text-cream/70 font-medium text-[14px] flex-1">
                  <li>• 2x Šunka & syr</li>
                  <li>• 2x Uhorka & cream cheese</li>
                  <li>• 2x Vajíčko & žerucha</li>
                  <li>• 2x Scones + džem & smotana</li>
                  <li>• 2x Snickers cupcake</li>
                  <li>• 2x Red velvet</li>
                  <li>• 2x Citrónová panna cotta</li>
                  <li className="font-bold text-secondary italic">2x Sypaný čaj included</li>
                </ul>
                <button className="w-full mt-10 bg-secondary text-white py-4 hover:bg-secondary/90 transition-all font-semibold tracking-wider uppercase text-xs shadow-xl shadow-black/20">
                  Objednať Collection Box
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <div className="font-heading text-3xl font-bold tracking-tight text-secondary mb-6 lowercase italic">
                slice of england.
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
    </div>
  );
}

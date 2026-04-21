import Image from "next/image";
import { Coffee, Gift, Heart, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-cream/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-heading text-2xl font-bold tracking-tight text-primary">
            Kúsok Anglicka.
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <a href="#o-nas" className="hover:text-secondary transition-colors">O nás</a>
            <a href="#boxy" className="hover:text-secondary transition-colors">Naše Boxy</a>
            <a href="#kontakt" className="hover:text-secondary transition-colors">Kontakt</a>
          </div>
          <button className="bg-primary text-cream px-6 py-2.5 rounded-sm hover:bg-primary/90 transition-all font-medium text-sm">
            Objednať Box
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Tradičný anglický popoludňajší čaj"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent md:w-2/3"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-xl">
            <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4 block">
              Zážitok moderného Anglicka
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary leading-tight mb-6">
              Pravý britský čaj u vás doma.
            </h1>
            <p className="text-lg md:text-xl text-primary/80 mb-10 text-balance leading-relaxed">
              Zbaľte si kufre na chuťový výlet. Naše prémiové boxy "Afternoon Tea" prinášajú čerstvé scones, originálny clotted cream, lahodné džemy a ten najjemnejší čaj priamo k vašim dverám.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-cream px-8 py-4 rounded-sm hover:bg-primary/90 transition-all font-medium flex items-center justify-center gap-2 group">
                Preskúmať boxy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border border-primary text-primary px-8 py-4 rounded-sm hover:bg-primary/5 transition-all font-medium">
                Ako to funguje?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="o-nas" className="py-24 bg-primary text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">Viac než len jedlo, je to udalosť.</h2>
            <p className="text-cream/80 text-lg">
              Popoludňajší čaj je o zastavení sa a vychutnaní si okamihu. Prinášame vám všetko potrebné pre dokonalý "Afternoon Tea" zážitok.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center mb-6 text-secondary bg-secondary/10">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl mb-3">Autentické Suroviny</h3>
              <p className="text-cream/70">
                Pravý Devonshire clotted cream, jahodový džem a tradičné britské sypané čaje pre autentický zážitok.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center mb-6 text-secondary bg-secondary/10">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl mb-3">Čerstvo Upečené</h3>
              <p className="text-cream/70">
                Naše scones pečieme priamo pre vás v deň doručenia. Teplé, voňavé a pripravené na degustáciu.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center mb-6 text-secondary bg-secondary/10">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl mb-3">Dokonalý Darček</h3>
              <p className="text-cream/70">
                Luxusné balenie posypané dotykom modernej elegancie robí z našich boxov ideálny darček pre vašich blízkych.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Box Preview Section */}
      <section id="boxy" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual placeholder for tea box image since generation failed */}
            <div className="aspect-[4/5] bg-cream rounded-sm p-4 relative overflow-hidden border border-secondary/20 group">
               <div className="absolute inset-0 bg-tertiary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-full h-full border border-secondary/40 flex flex-col items-center justify-center bg-white/50 p-8 text-center shadow-sm">
                  <div className="font-heading text-3xl text-primary mb-4">The Classic Box</div>
                  <div className="w-16 h-px bg-secondary mb-6"></div>
                  <ul className="text-primary/70 space-y-3 font-medium">
                    <li>4x Čerstvo upečené domáce scones</li>
                    <li>2x Autentický Clotted Cream (113g)</li>
                    <li>1x Remeselný Jahodový džem</li>
                    <li>2x English Breakfast Sypaný Čaj</li>
                    <li>2x Earl Grey Sypaný Čaj</li>
                  </ul>
               </div>
            </div>
            
            <div>
               <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">Objavte náš Signature Box</h2>
               <p className="text-primary/80 lg:text-lg mb-8 leading-relaxed">
                 Starostlivo sme vybrali tie najlepšie britské ingrediencie a zbalili ich do luxusnej krabice, ktorá vám po rozbalení odhalí pravú podstatu Anglicka. Ideálne pre 2 osoby.
               </p>
               <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4">
                     <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                     </div>
                     <div>
                        <h4 className="font-heading text-xl text-primary">Prémiové Balenie</h4>
                        <p className="text-sm text-primary/70">Zabaleno s anglickou precíznosťou – navy modrá a zlatá estetika.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                     </div>
                     <div>
                        <h4 className="font-heading text-xl text-primary">Doručenie po celom Slovensku</h4>
                        <p className="text-sm text-primary/70">Špeciálne chladiace vložky udržia váš clotted cream dokonale čerstvý.</p>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-6">
                 <div className="text-3xl font-heading font-bold text-primary">35 €</div>
                 <button className="bg-secondary text-white px-8 py-3 rounded-sm hover:bg-secondary/90 transition-all font-medium">
                   Vložiť do košíka
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="bg-primary text-cream pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="font-heading text-3xl font-bold tracking-tight text-secondary mb-6">
                Kúsok Anglicka.
              </div>
              <p className="text-cream/60 max-w-sm mb-6">
                Prinášame tradičný britský "Afternoon Tea" na Slovensko. Luxusný zážitok v každej krabici.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-xl mb-4 text-cream">Rýchle odkazy</h4>
              <ul className="space-y-3 text-cream/60">
                <li><a href="#" className="hover:text-secondary transition-colors">Naše Boxy</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Firemné darčeky</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Často kladené otázky</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl mb-4 text-cream">Kontakt</h4>
              <ul className="space-y-3 text-cream/60">
                <li>ahoj@kusokanglicka.sk</li>
                <li>+421 900 000 000</li>
                <li>Sledujte nás na Instagrame</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-cream/10 text-center text-cream/40 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Kúsok Anglicka. Všetky práva vyhradené.</p>
            <div className="flex space-x-6">
               <a href="#" className="hover:text-cream">Obchodné podmienky</a>
               <a href="#" className="hover:text-cream">Ochrana osobných údajov</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

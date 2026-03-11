/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  Instagram, 
  Facebook, 
  Phone,
  Star,
  Award,
  Users,
  Calendar,
  ExternalLink,
  Menu,
  X,
  Ticket,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Constants
const WHATSAPP_NUMBER = "+15557439674";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá, tenho interesse na promoção de dois óculos por apenas R$199,00");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${WHATSAPP_MESSAGE}`;

const BRANDS = [
  "Ray-Ban", "Oakley", "Prada", "Gucci", "Vogue", "Ana Hickmann", "Grazi", "Carrera"
];

const UNITS = [
  { name: "Centro (R. do Príncipe)", city: "Joinville", maps: "https://goo.gl/maps/example1" },
  { name: "Vila Nova (R. XV de Novembro)", city: "Joinville", maps: "https://goo.gl/maps/example2" },
  { name: "Shopping Muller (R. Visc. de Taunay)", city: "Joinville", maps: "https://goo.gl/maps/example3" },
  { name: "Iririú", city: "Joinville", maps: "https://goo.gl/maps/example4" },
  { name: "Itinga", city: "Araquari", maps: "https://goo.gl/maps/example5" },
];

const FAQS = [
  {
    question: "Como funciona a promoção?",
    answer: "Na compra de dois óculos completos (armação + lentes), você paga apenas R$199,00 no total. É a oportunidade perfeita para renovar seu visual e ter um par reserva ou de sol."
  },
  {
    question: "O que é a lente anti-reflexo grátis?",
    answer: "O tratamento anti-reflexo elimina reflexos indesejados nas lentes, proporcionando maior conforto visual, estética superior e redução da fadiga ocular. Nesta promoção, ele já está incluso sem custo adicional."
  },
  {
    question: "Preciso de receita?",
    answer: "Sim, para a confecção das lentes com o seu grau exato, é necessária a receita oftalmológica. Caso não tenha uma recente, podemos indicar parceiros para agilizar seu atendimento."
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Aceitamos cartões de crédito (com parcelamento facilitado), PIX e dinheiro. Consulte condições especiais de parcelamento em nossas unidades."
  }
];

// Components
const UrgencyBar = () => {
  return (
    <div className="bg-diniz-red text-white py-3 px-4 text-center font-bold overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-widest text-sm">Restam apenas</span>
          <span className="bg-white text-diniz-red px-2 py-0.5 rounded font-black text-lg">17</span>
          <span className="uppercase tracking-widest text-sm">Vouchers de desconto para usar na loja!</span>
        </div>
        <a 
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-diniz-red px-6 py-2 rounded-full text-sm font-black hover:bg-gray-100 transition-all uppercase"
        >
          Retirar meu voucher!
        </a>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Óticas Diniz" className="h-10 md:h-16 w-auto object-contain" />
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#promocao" className="text-gray-700 hover:text-diniz-red font-medium transition-colors">Promoção</a>
            <a href="#unidades" className="text-gray-700 hover:text-diniz-red font-medium transition-colors">Unidades</a>
            <a href="#faq" className="text-gray-700 hover:text-diniz-red font-medium transition-colors">FAQ</a>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-diniz-red text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 flex items-center gap-2"
            >
              Garantir Desconto
            </a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <a href="#promocao" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-gray-800 py-2">Promoção</a>
              <a href="#unidades" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-gray-800 py-2">Unidades</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-gray-800 py-2">FAQ</a>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-diniz-red text-white text-center px-6 py-3 rounded-xl font-bold"
              >
                Garantir Desconto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-diniz-red transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`text-gray-400 group-hover:text-diniz-red transition-colors`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <UrgencyBar />
      <Header />

      <main>
        {/* Hero Section */}
        <section id="promocao" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="text-5xl sm:text-6xl lg:text-8xl font-bold text-gray-900 leading-none mb-4"
                >
                  Óculos<br />completo
                </motion.h1>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="h-12 w-1.5 bg-diniz-red rounded-full"></div>
                  <div className="flex items-center text-diniz-red flex-wrap">
                    <span className="text-xl lg:text-3xl font-medium mr-3">por apenas</span>
                    <span className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none">R$199,00</span>
                  </div>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 max-w-xl"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center text-diniz-red shadow-sm">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase leading-tight">Pronto em<br /><span className="text-gray-900">até 1h</span></p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center text-diniz-red shadow-sm">
                      <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase leading-tight">Garantia de<br /><span className="text-gray-900">1 ano</span></p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center text-diniz-red shadow-sm">
                      <Ticket className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase leading-tight">Descontos<br /><span className="text-gray-900">exclusivos</span></p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex flex-col gap-4 max-w-sm"
                >
                  <a 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-diniz-red text-white px-8 py-4 rounded-full text-lg font-black hover:bg-red-700 transition-all shadow-xl uppercase tracking-wider"
                  >
                    Retirar meu voucher!
                  </a>
                  <a 
                    href="#unidades"
                    className="inline-flex items-center justify-center bg-gray-100 text-gray-900 px-8 py-3 rounded-full text-lg font-black hover:bg-gray-200 transition-all shadow-lg uppercase tracking-wider"
                  >
                    Ver unidades
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative lg:h-[600px] flex items-center justify-center"
              >
                <div className="relative z-10 w-full max-w-lg">
                  <img 
                    src="/Foto Diniz.webp" 
                    alt="Óculos de Grau Premium" 
                    className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-diniz-red/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gray-200/20 rounded-full blur-3xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-12 bg-diniz-red w-full"></div>

        {/* Brands Section - Infinite Marquee */}
        <section className="py-12 border-y border-gray-100 bg-gray-50/50 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Marcas que você encontra aqui</p>
          </div>
          
          <div className="flex relative">
            {/* Gradient masks for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

            <motion.div 
              className="flex whitespace-nowrap gap-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                ease: "linear", 
                duration: 30, 
                repeat: Infinity 
              }}
            >
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <span 
                  key={`${brand}-${idx}`} 
                  className="text-2xl md:text-4xl font-bold text-gray-800/40 hover:text-diniz-red transition-colors cursor-default"
                >
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Sempre perto de você, em todos os cantos.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Com 5 unidades estrategicamente localizadas em Joinville e Araquari, garantimos que você sempre tenha o melhor atendimento por perto. Nossa equipe está pronta para oferecer uma experiência personalizada e técnica.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                      <Clock size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">Aberto Agora</h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <p className="text-gray-600 text-sm">Visite-nos hoje e aproveite a promoção antes que acabe.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-diniz-red/5 flex items-center justify-center flex-shrink-0 text-diniz-red">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Cidades Atendidas</h3>
                      <p className="text-gray-600 text-sm">Joinville (Centro, Vila Nova, Iririú, Shopping Muller) e Araquari (Itinga).</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-6 sm:pt-12">
                  <div className="bg-gray-50 p-8 rounded-3xl text-center">
                    <p className="text-4xl font-bold text-diniz-red mb-2">5.000+</p>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Clientes Satisfeitos</p>
                  </div>
                  <div className="bg-diniz-dark p-8 rounded-3xl text-center text-white">
                    <p className="text-4xl font-bold mb-2">5</p>
                    <p className="text-sm font-medium opacity-70 uppercase tracking-wider">Unidades na Região</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-emerald-600 p-8 rounded-3xl text-center text-white">
                    <p className="text-4xl font-bold mb-2">30+</p>
                    <p className="text-sm font-medium opacity-70 uppercase tracking-wider">Anos de Tradição</p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-3xl text-center">
                    <Users className="mx-auto text-diniz-red mb-4" size={32} />
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Atendimento Especializado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Units Section */}
        <section id="unidades" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Onde Encontrar</h2>
              <p className="text-gray-600">Escolha a unidade mais próxima de você e venha garantir seus novos óculos.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UNITS.map((unit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-diniz-red group-hover:text-white transition-colors">
                      <MapPin size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{unit.city}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{unit.name}</h3>
                  <p className="text-gray-500 text-sm mb-8">Atendimento especializado e laboratório próprio para maior agilidade.</p>
                  <motion.a 
                    href={unit.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: (idx * 0.1) + 0.5, 
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className="inline-flex items-center gap-2 text-diniz-red font-bold hover:gap-3 transition-all"
                  >
                    Ver no Google Maps
                    <ExternalLink size={16} />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Dúvidas Frequentes</h2>
              <p className="text-gray-600">Tudo o que você precisa saber sobre nossa promoção exclusiva.</p>
            </div>
            <div className="bg-gray-50 rounded-[40px] p-8 md:p-12">
              {FAQS.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-diniz-red rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-red-200">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Não perca essa oportunidade única!</h2>
                <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
                  Estoque limitado. Garanta agora seu cupom de desconto e venha escolher suas armações favoritas.
                </p>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-diniz-red px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all shadow-xl group"
                >
                  Falar com Consultor no WhatsApp
                  <MessageCircle className="group-hover:rotate-12 transition-transform" />
                </a>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-diniz-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-full md:col-span-2">
              <img src="/logo.png" alt="Óticas Diniz" className="h-16 md:h-20 w-auto object-contain mb-6 brightness-0 invert" />
              <p className="text-gray-400 max-w-md leading-relaxed">
                A maior rede de óticas do Brasil, agora com condições exclusivas para Joinville e Araquari. Qualidade, tecnologia e o melhor atendimento para sua visão.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Links Rápidos</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#promocao" className="hover:text-white transition-colors">Promoção</a></li>
                <li><a href="#unidades" className="hover:text-white transition-colors">Unidades</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-diniz-red transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-diniz-red transition-colors">
                  <Facebook size={20} />
                </a>
                <a href={WHATSAPP_URL} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-diniz-red transition-colors">
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>© 2026 Óticas Diniz. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle size={32} fill="currentColor" />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Fale Conosco
        </span>
      </a>
    </div>
  );
}

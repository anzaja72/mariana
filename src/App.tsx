/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, Instagram, Linkedin, Mail, Send } from 'lucide-react';

// Webhook URL provided by the user
const WEBHOOK_URL = 'https://icad-n8n.ltubgr.easypanel.host/webhook/mariana-onboarding';

interface FormData {
  Nombre_Marca: string;
  Avatar_Conversion: string;
  Resultado_Final_Deseado: string;
  Enemigo_Comun: string;
  Prueba_Casos_Exito: string;
  Status_Recursos_Escasos: string;
  Factores_Autoridad: string;
  Clase_Maestra_Titulo: string;
  Temas_Dominio: string;
  Lead_Magnet: string;
  Capacidad_Produccion_Horas: string;
  Recursos_Edicion: string;
  LTV_Ingreso_Promedio: string;
  Leads_Actuales_Redes: string;
  Email_Contacto: string;
}

const INITIAL_DATA: FormData = {
  Nombre_Marca: '',
  Avatar_Conversion: '',
  Resultado_Final_Deseado: '',
  Enemigo_Comun: '',
  Prueba_Casos_Exito: '',
  Status_Recursos_Escasos: '',
  Factores_Autoridad: '',
  Clase_Maestra_Titulo: '',
  Temas_Dominio: '',
  Lead_Magnet: '',
  Capacidad_Produccion_Horas: '',
  Recursos_Edicion: '',
  LTV_Ingreso_Promedio: '',
  Leads_Actuales_Redes: '',
  Email_Contacto: '',
};

export default function App() {
  const [step, setStep] = useState(0); // 0 is landing, 1+ are form steps
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      Timestamp: new Date().toISOString(),
      ...formData
    };

    try {
      // Calling our local server proxy instead of the external webhook directly to bypass CORS
      const response = await fetch('/api/submit-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorText = await response.text();
        console.error('Submission failed:', errorText);
        alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const formSteps = [
    {
      id: 'brand',
      title: 'Tu Identidad',
      fields: [
        {
          id: 'Nombre_Marca',
          label: '¿Cuál es el nombre de tu marca?',
          subLabel: 'El nombre comercial o personal con el que te identificas.',
          placeholder: 'Ej. Mariana Simanca Studio'
        },
        {
          id: 'Email_Contacto',
          label: 'Email de contacto',
          subLabel: 'Donde recibirás tu estrategia personalizada.',
          placeholder: 'tu@email.com',
          type: 'email'
        }
      ]
    },
    {
      id: 'audience',
      title: 'Tu Audiencia Ideal',
      fields: [
        {
          id: 'Avatar_Conversion',
          label: 'Describe a tu cliente ideal',
          subLabel: 'Quién es la persona que más se beneficia de lo que haces.',
          placeholder: 'Ej. Emprendedoras digitales de 25-35 años...'
        },
        {
          id: 'Resultado_Final_Deseado',
          label: '¿Cuál es el "resultado positivo" exacto que buscan?',
          subLabel: 'El sueño o meta final que quieren alcanzar contigo.',
          placeholder: 'Ej. Duplicar su facturación en 90 días...'
        }
      ]
    },
    {
      id: 'positioning',
      title: 'Posicionamiento',
      fields: [
        {
          id: 'Enemigo_Comun',
          label: '¿Contra qué o quién luchan?',
          subLabel: 'Esa creencia limitante o competidor que les impide avanzar.',
          placeholder: 'Ej. El algoritmo de Instagram, la falta de tiempo...'
        },
        {
          id: 'Factores_Autoridad',
          label: '¿Por qué deberían escucharte en 5 segundos?',
          subLabel: 'Tu propuesta de valor única y rápida.',
          placeholder: 'Ej. He ayudado a +100 marcas a crecer orgánicamente...'
        }
      ]
    },
    {
      id: 'proof',
      title: 'Prueba y Recursos',
      fields: [
        {
          id: 'Prueba_Casos_Exito',
          label: 'Tus 3 casos de éxito con números',
          subLabel: 'Resultados tangibles que demuestren tu capacidad.',
          placeholder: '1. Marca X: +50k seguidores. 2. Marca Y...'
        },
        {
          id: 'Status_Recursos_Escasos',
          label: '¿Qué recursos exclusivos controlas?',
          subLabel: 'Herramientas o métodos que solo tú ofreces.',
          placeholder: 'Ej. Método "Organic Growth 360"...'
        }
      ]
    },
    {
      id: 'content',
      title: 'Estrategia de Contenido',
      fields: [
        {
          id: 'Clase_Maestra_Titulo',
          label: 'Título de tu clase maestra de 45 min',
          subLabel: 'Un título magnético para tu contenido estrella.',
          placeholder: 'Ej. Cómo dominar Reels sin bailar...'
        },
        {
          id: 'Temas_Dominio',
          label: 'Los 5 temas que dominas',
          subLabel: 'Tus pilares de contenido principales.',
          placeholder: 'Ej. Estrategia, Edición, Ventas, Mindset...'
        }
      ]
    },
    {
      id: 'conversion',
      title: 'Conversión',
      fields: [
        {
          id: 'Lead_Magnet',
          label: '¿A dónde envías a la gente? (Tu oferta)',
          subLabel: 'Tu imán de prospectos o producto de entrada.',
          placeholder: 'Ej. Guía gratuita de 10 pasos...'
        },
        {
          id: 'Leads_Actuales_Redes',
          label: '¿Cuántos leads generas hoy por redes?',
          subLabel: 'Tu punto de partida actual.',
          placeholder: 'Ej. 5 leads por semana...'
        }
      ]
    },
    {
      id: 'logistics',
      title: 'Logística y Valor',
      fields: [
        {
          id: 'Capacidad_Produccion_Horas',
          label: 'Horas semanales para grabar',
          subLabel: 'Tu disponibilidad real para crear contenido.',
          placeholder: 'Ej. 4 horas los martes...'
        },
        {
          id: 'Recursos_Edicion',
          label: 'Recursos de edición',
          subLabel: '¿Tienes equipo propio o buscas edición mínima?',
          placeholder: 'Ej. Edito yo mismo en CapCut...'
        },
        {
          id: 'LTV_Ingreso_Promedio',
          label: 'Ingreso promedio por cliente (LTV)',
          subLabel: 'Cuánto vale un cliente para tu negocio en el tiempo.',
          placeholder: 'Ej. $500 USD...'
        }
      ]
    }
  ];

  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center sticky top-0 bg-[#fdfcfb]/80 backdrop-blur-md z-50">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="font-serif text-2xl font-semibold tracking-tighter"
          >
            MS<span className="text-[#1a1a1a]/30">.</span>STUDIO
          </motion.div>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
            <a href="#inicio" className="hover:opacity-100 transition-opacity">Inicio</a>
            <a href="#casos" className="hover:opacity-100 transition-opacity">Casos de Éxito</a>
            <a href="#contacto" className="hover:opacity-100 transition-opacity">Contacto</a>
          </div>
          <button 
            onClick={nextStep}
            className="text-[10px] uppercase tracking-[0.2em] font-bold bg-[#1a1a1a] text-white px-6 py-3 rounded-full hover:bg-[#333] transition-colors"
          >
            Onboarding
          </button>
        </nav>

        {/* Hero Section */}
        <section id="inicio" className="min-h-[90vh] flex items-center">
          <main className="grid lg:grid-cols-2 gap-12 px-8 py-12 items-center max-w-7xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1 rounded-full border border-[#1a1a1a]/10 text-xs uppercase tracking-[0.2em] font-medium"
                >
                  Community Strategist
                </motion.span>
                <h1 className="text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter">
                  Mariana <br />
                  <span className="italic text-[#1a1a1a]/40">Simanca</span>
                </h1>
                <p className="text-xl text-[#1a1a1a]/60 max-w-md font-light leading-relaxed">
                  Ayudamos a marcas y creadores a escalar su audiencia mediante estrategias de contenido de alto impacto y conversión.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="group flex items-center gap-4 bg-[#1a1a1a] text-white px-8 py-5 rounded-full text-lg font-medium transition-all hover:bg-[#333]"
              >
                Comenzar Onboarding
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="flex gap-8 pt-8 border-t border-[#1a1a1a]/5">
                <div>
                  <div className="text-2xl font-serif">+100k</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40">Alcance Generado</div>
                </div>
                <div>
                  <div className="text-2xl font-serif">24/7</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40">Soporte Estratégico</div>
                </div>
                <div>
                  <div className="text-2xl font-serif">95%</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40">Retención de Clientes</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://imgur.com/3nqKGcY.jpg" 
                alt="Mariana Simanca" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </main>
        </section>

        {/* Cases Section */}
        <section id="casos" className="py-24 bg-[#f9f7f4]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Portafolio</span>
              <h2 className="text-5xl lg:text-6xl font-serif tracking-tighter">Casos de <span className="italic text-[#1a1a1a]/40">Éxito</span></h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Case 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="aspect-video bg-[#1a1a1a]/5 rounded-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif opacity-10 group-hover:opacity-20 transition-opacity">FJ</div>
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest font-bold">Consultoría Corporativa</div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif">FJ Consultorías</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">El Reto</h4>
                      <p className="text-[#1a1a1a]/70 leading-relaxed">FJ Consultorías contaba con un profundo conocimiento técnico en su sector, pero su comunicación digital estaba estancada. Sus publicaciones eran densas, carecían de un hilo conductor y el equipo invertía demasiado tiempo tratando de redactar contenido que al final no conectaba con su cliente ideal ni generaba oportunidades de negocio.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">La Intervención del Studio</h4>
                      <p className="text-[#1a1a1a]/70 leading-relaxed">Se realizó una auditoría completa de la marca y se diseñó una arquitectura de contenido enfocada en la eficiencia y la autoridad. Se eliminó la fricción en la creación de contenido, traduciendo su experiencia técnica a mensajes magnéticos, rápidos de consumir y altamente estratégicos.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">El Veredicto del Cliente</h4>
                    <blockquote className="border-l-2 border-[#1a1a1a] pl-6 py-2 italic font-serif text-xl text-[#1a1a1a]/80">
                      "Antes de llegar al estudio, sentíamos que publicábamos por publicar, sin ver un retorno real de nuestro esfuerzo. Mariana transformó nuestra marca por completo. Le dio un objetivo claro a la estrategia de redes de la firma, construyendo el puente perfecto entre nuestra experiencia corporativa y el mundo digital. Hoy comunicamos nuestra autoridad con una rapidez y claridad que antes nos parecía imposible."
                      <footer className="mt-4 text-xs uppercase tracking-widest font-bold not-italic opacity-40">— Director de FJ Consultorías</footer>
                    </blockquote>
                  </div>
                </div>
              </motion.div>

              {/* Case 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="aspect-video bg-[#1a1a1a]/5 rounded-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif opacity-10 group-hover:opacity-20 transition-opacity">LS</div>
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest font-bold">Marca Personal & E-commerce</div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif">LuisianaSierra.com</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">El Reto</h4>
                      <p className="text-[#1a1a1a]/70 leading-relaxed">A pesar de tener una excelente oferta de valor y tráfico en su web, Luisiana Sierra se enfrentaba al síndrome de la "audiencia fantasma": seguidores que consumían el contenido pero no interactuaban, no formaban comunidad y, lo más crítico, no entraban al embudo de conversión para contratar sus servicios premium.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">La Intervención del Studio</h4>
                      <p className="text-[#1a1a1a]/70 leading-relaxed">El equipo de Maria Simanca reestructuró por completo sus pilares de contenido, pasando de un enfoque puramente informativo a uno de Community Building (construcción de comunidad). Se implementaron formatos de prueba social y un ecosistema de retención que guió a la audiencia desde el primer impacto visual hasta la venta.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">El Veredicto del Cliente</h4>
                    <blockquote className="border-l-2 border-[#1a1a1a] pl-6 py-2 italic font-serif text-xl text-[#1a1a1a]/80">
                      "Trabajar con el equipo de Maria Simanca fue el punto de inflexión para mi ecosistema digital. Mariana no solo entendió mi voz desde el primer día, sino que estructuró un plan de posicionamiento brillante. Pasamos de tener métricas vacías a cultivar una comunidad real y activa. Me entregaron una hoja de ruta tan precisa que ahora cada pieza de contenido que publicamos en LuisianaSierra.com tiene una intención clara de conversión."
                      <footer className="mt-4 text-xs uppercase tracking-widest font-bold not-italic opacity-40">— Luisiana Sierra, Fundadora</footer>
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contacto" className="py-24 px-8 text-center bg-white">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl font-serif tracking-tight">¿Listo para ser nuestro próximo <span className="italic text-[#1a1a1a]/40">caso de éxito</span>?</h2>
            <p className="text-xl text-[#1a1a1a]/60 font-light">Completa nuestro formulario de onboarding y diseñaremos una estrategia a medida para tu marca.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="bg-[#1a1a1a] text-white px-12 py-6 rounded-full text-lg font-bold uppercase tracking-widest"
            >
              Comenzar Ahora
            </motion.button>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 border-t border-[#1a1a1a]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] opacity-40">
          <div>© 2024 Mariana Simanca Studio</div>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Behance</a>
          </div>
        </footer>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#fdfcfb]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-xl">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif tracking-tight">¡Todo listo!</h2>
            <p className="text-[#1a1a1a]/60 leading-relaxed">
              Hemos recibido tu información. Mariana y su equipo revisarán tus respuestas para diseñar la estrategia perfecta para tu marca.
            </p>
          </div>
          <button 
            onClick={() => setStep(0)}
            className="text-sm uppercase tracking-widest font-bold border-b-2 border-[#1a1a1a] pb-1 hover:opacity-60 transition-opacity"
          >
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  const currentStepData = formSteps[step - 1];
  const progress = ((step - 1) / formSteps.length) * 100;

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 w-full bg-[#1a1a1a]/5 fixed top-0 left-0 z-50">
        <motion.div 
          className="h-full bg-[#1a1a1a]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <nav className="p-8 flex justify-between items-center">
        <button 
          onClick={() => setStep(0)}
          className="font-serif text-2xl font-semibold tracking-tighter"
        >
          MS<span className="text-[#1a1a1a]/30">.</span>STUDIO
        </button>
        <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">
          Paso {step} de {formSteps.length}
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/30">
                  {currentStepData.title}
                </span>
                <h2 className="text-4xl font-serif tracking-tight">Cuéntanos sobre tu proyecto</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {currentStepData.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="label-text">
                      {field.label}
                    </label>
                    <span className="sub-label">{field.subLabel}</span>
                    <input
                      id={field.id}
                      type={field.type || 'text'}
                      required
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof FormData]}
                      onChange={(e) => handleInputChange(field.id as keyof FormData, e.target.value)}
                      className="input-field"
                    />
                  </div>
                ))}

                <div className="flex justify-between items-center pt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Atrás
                  </button>

                  {step === formSteps.length ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold disabled:opacity-50"
                    >
                      {isSubmitting ? 'Enviando...' : 'Finalizar Onboarding'}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-[#f5f2ed] rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] aspect-square bg-[#e5e1da] rounded-full blur-[100px] opacity-30" />
      </div>
    </div>
  );
}

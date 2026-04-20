"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, Receipt, ChevronRight, ChevronLeft, 
  Building2, LineChart, ShieldCheck, CheckCircle2, Home, Building, Utensils, ArrowDown
} from 'lucide-react';

export default function CalculatorPage() {
  // --- STATE FOR MULTI-STEP FORM ---
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [formData, setFormData] = useState({
    projectType: 'Residential',
    area: '',
    style: 'Premium',
    rooms: '2 BHK',
    name: '',
    email: '',
    budget: 'not-decided'
  });

  const [estimateData, setEstimateData] = useState<{
    total: number;
    baseRate: number;
    styleFactor: number;
    area: number;
  } | null>(null);

  // --- HANDLERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelection = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const calculateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      // 1. Calculate estimate locally
      const area = parseInt(formData.area) || 0;
      let baseRate = 100;
      if (formData.projectType === 'Commercial') baseRate = 120;
      if (formData.projectType === 'Restaurant') baseRate = 150;

      let styleFactor = 1.0;
      if (formData.style === 'Premium') styleFactor = 1.3;
      if (formData.style === 'Luxury') styleFactor = 1.6;

      const totalCost = area * baseRate * styleFactor;

      // Artificial delay for a "processing" feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEstimateData({ total: totalCost, baseRate, styleFactor, area });

      // 2. Submit to backend API (Fire and forget)
      const estimatePayload = {
        customerName: formData.name,
        email: formData.email,
        projectType: formData.projectType.toLowerCase(),
        builtUpArea: area,
        areaUnit: 'sqft',
        qualityLevel: formData.style.toLowerCase(),
        numberOfFloors: 1,
        features: [],
        city: '',
        location: '',
        customerBudget: formData.budget
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      fetch(`${API_URL}/api/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estimatePayload)
      }).catch(err => console.warn('API Error, continuing locally', err));

      setIsCalculating(false);
      setStep(4); 
    } catch (error) {
      console.error('Error calculating estimate:', error);
      setIsCalculating(false);
      setStep(4);
    }
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount);
  };

  const resetCalculator = () => {
    setStep(1);
    setEstimateData(null);
  };

  const scrollToCalculator = () => {
    const calcSection = document.getElementById('calculator-section');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBFF] font-sans selection:bg-[#5B96D1] selection:text-[#1D325E]">

      {/* ── 1. HERO SECTION (INFO ONLY) ── */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#1D325E]">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Architecture Background" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D325E] via-[#1D325E]/80 to-[#1D325E]/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#5B96D1]" />
              <span className="text-[#5B96D1] font-bold uppercase tracking-[0.4em] text-[9px]">Project Planning</span>
              <div className="h-[1px] w-12 bg-[#5B96D1]" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif text-[#F7FBFF] mb-8 leading-[1.05] tracking-tight">
              Reliable <span className="italic font-normal text-[#5B96D1]">estimates</span>,<br className="hidden md:block"/> delivered instantly.
            </h1>
            
            <p className="text-lg text-[#D4E0FF]/70 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Get detailed, highly accurate cost projections for your residential or commercial projects in under two minutes. Absolute transparency, no commitments.
            </p>

            <button 
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#5B96D1] text-[#1D325E] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#F7FBFF] transition-colors duration-300 group"
            >
              Start Calculator
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. CALCULATOR SECTION ── */}
      <section id="calculator-section" className="py-32 bg-[#F7FBFF] relative">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-14">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Offset Decorative Border */}
            <div className="absolute -inset-4 border border-[#5B96D1]/20 pointer-events-none hidden md:block" />

            <div className="bg-[#FFFFFF] shadow-[0_20px_80px_rgba(180,130,40,0.08)] overflow-hidden min-h-[600px] flex flex-col relative z-10 border border-[#5B96D1]/10">
              
              {/* Visual Header / Progress Indicator */}
              <div className="bg-[#EFF5FF] px-8 lg:px-12 py-8 shrink-0">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="font-serif text-3xl text-[#1D325E] mb-2">Cost Estimator</h3>
                    <p className="text-[#4A6E9A] text-xs font-light">Complete the steps below for your projection.</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5A7BC1]">
                    {step === 4 ? 'Result' : `Step ${step} / 3`}
                  </span>
                </div>
                {/* Progress Line */}
                <div className="w-full bg-[#D4E0FF]/50 h-[2px] flex relative overflow-hidden">
                  <div className="bg-[#5B96D1] h-full transition-all duration-700 ease-out" style={{ width: `${(step / 4) * 100}%` }} />
                </div>
              </div>

              {/* Dynamic Form Content */}
              <div className="p-8 lg:p-12 flex-1 flex flex-col relative bg-white">
                <form onSubmit={step === 3 ? calculateEstimate : (e) => { e.preventDefault(); nextStep(); }} className="flex-1 flex flex-col">
                  
                  <AnimatePresence mode="wait">
                    
                    {/* --- STEP 1: SPACE --- */}
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="flex-1">
                        <h2 className="text-2xl font-serif text-[#1D325E] mb-10">Tell us about your space</h2>
                        
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-4">Project Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                          {[
                            { id: 'Residential', icon: Home },
                            { id: 'Commercial', icon: Building },
                            { id: 'Restaurant', icon: Utensils }
                          ].map((type) => (
                            <button
                              key={type.id} type="button"
                              onClick={() => handleSelection('projectType', type.id)}
                              className={`p-6 border flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
                                formData.projectType === type.id 
                                ? 'border-[#5B96D1] bg-[#EFF5FF]/50 text-[#1D325E] shadow-sm' 
                                : 'border-[#D4E0FF]/50 text-[#4A6E9A] hover:border-[#5B96D1]/50 hover:bg-[#F7FBFF]'
                              }`}
                            >
                              <type.icon className={`w-8 h-8 ${formData.projectType === type.id ? 'text-[#5B96D1]' : 'text-[#5A7BC1]/50'}`} strokeWidth={1} />
                              <span className="text-[11px] font-bold uppercase tracking-widest">{type.id}</span>
                            </button>
                          ))}
                        </div>

                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-4">Carpet Area (Sq. Ft.)</label>
                        <input 
                          type="number" name="area" value={formData.area} onChange={handleInputChange} required min="100" placeholder="e.g. 1500" 
                          className="w-full border-b border-[#D4E0FF] py-4 bg-transparent focus:border-[#5B96D1] outline-none transition-colors text-2xl font-serif text-[#1D325E] placeholder:text-[#5B96D1]/30" 
                        />
                      </motion.div>
                    )}

                    {/* --- STEP 2: STYLE --- */}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="flex-1">
                        <h2 className="text-2xl font-serif text-[#1D325E] mb-10">Refine your requirements</h2>
                        
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-4">Desired Finish</label>
                        <div className="space-y-4 mb-10">
                          {[
                            { id: 'Standard', desc: 'Durable & Cost-Effective materials.' },
                            { id: 'Premium', desc: 'Branded fittings & Custom finishes.' },
                            { id: 'Luxury', desc: 'Imported materials & Bespoke detailing.' }
                          ].map((style) => (
                            <div 
                              key={style.id} onClick={() => handleSelection('style', style.id)}
                              className={`p-6 border cursor-pointer flex items-center justify-between transition-all duration-300 ${
                                formData.style === style.id ? 'border-[#5B96D1] bg-[#EFF5FF]/30 shadow-sm' : 'border-[#D4E0FF]/50 hover:border-[#5B96D1]/50 hover:bg-[#F7FBFF]'
                              }`}
                            >
                              <div>
                                <div className={`font-serif text-xl mb-2 ${formData.style === style.id ? 'text-[#1D325E]' : 'text-[#4A6E9A]'}`}>{style.id}</div>
                                <div className="text-sm text-[#4A6E9A] font-light">{style.desc}</div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-300 ${formData.style === style.id ? 'border-[#5B96D1]' : 'border-[#5B96D1]/30'}`}>
                                {formData.style === style.id && <div className="w-3 h-3 bg-[#5B96D1] rounded-full" />}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className={`transition-opacity ${formData.projectType !== 'Residential' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-4">Rooms</label>
                            <select name="rooms" value={formData.rooms} onChange={handleInputChange} className="w-full border-b border-[#D4E0FF] py-4 bg-transparent focus:border-[#5B96D1] outline-none transition-colors text-lg font-serif text-[#1D325E]">
                              <option value="1 BHK">1 BHK</option>
                              <option value="2 BHK">2 BHK</option>
                              <option value="3 BHK">3 BHK</option>
                              <option value="4+ BHK">4+ BHK / Villa</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-4">Budget Range</label>
                            <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full border-b border-[#D4E0FF] py-4 bg-transparent focus:border-[#5B96D1] outline-none transition-colors text-lg font-serif text-[#1D325E]">
                              <option value="not-decided">Undecided</option>
                              <option value="under-10lakh">Under ₹10L</option>
                              <option value="10-20-lakh">₹10L - ₹20L</option>
                              <option value="20-50-lakh">₹20L - ₹50L</option>
                              <option value="50lakh-plus">Above ₹50L</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* --- STEP 3: CONTACT --- */}
                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="flex-1 flex flex-col justify-center py-10">
                        <div className="text-center mb-12">
                          <div className="w-20 h-20 bg-[#EFF5FF] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Receipt className="w-8 h-8 text-[#5B96D1]" strokeWidth={1.5} />
                          </div>
                          <h2 className="text-3xl font-serif text-[#1D325E] mb-4">Where should we send this?</h2>
                          <p className="text-[#4A6E9A] font-light max-w-sm mx-auto">Enter your details below to generate and securely deliver your customized estimate instantly.</p>
                        </div>
                        
                        <div className="space-y-8 max-w-md mx-auto w-full">
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-2">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="w-full border-b border-[#D4E0FF] py-4 bg-transparent focus:border-[#5B96D1] outline-none transition-colors text-lg font-serif text-[#1D325E] placeholder:text-[#5B96D1]/30" />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold mb-2">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className="w-full border-b border-[#D4E0FF] py-4 bg-transparent focus:border-[#5B96D1] outline-none transition-colors text-lg font-serif text-[#1D325E] placeholder:text-[#5B96D1]/30" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* --- STEP 4: RESULTS --- */}
                    {step === 4 && estimateData && (
                      <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex-1 flex flex-col">
                        <div className="text-center mb-10 pt-4">
                          <h2 className="text-3xl lg:text-4xl font-serif text-[#1D325E] mb-3">Estimate Ready, {formData.name.split(' ')[0]}</h2>
                          <p className="text-[#4A6E9A] font-light">Based on {formData.area} sq.ft. {formData.projectType} space.</p>
                        </div>

                        <div className="bg-[#EFF5FF] border border-[#5B96D1]/20 p-10 text-center relative overflow-hidden mb-10">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#5B96D1] to-transparent opacity-80" />
                          
                          <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#5A7BC1] font-bold mb-6">Estimated Investment Range</h3>
                          
                          <div className="text-4xl lg:text-6xl font-serif text-[#1D325E] tracking-tight">
                            {formatINR(estimateData.total * 0.9)} 
                            <span className="text-2xl text-[#5B96D1] font-serif font-light mx-4 italic">to</span> 
                            {formatINR(estimateData.total * 1.1)}
                          </div>
                        </div>

                        <div className="space-y-4 text-sm text-[#4A6E9A] font-light mb-12 max-w-md mx-auto w-full">
                          <div className="flex justify-between border-b border-[#5B96D1]/20 pb-3">
                            <span>Base Rate ({formData.projectType}):</span>
                            <span className="font-serif font-bold text-[#1D325E]">₹{estimateData.baseRate}/sqft</span>
                          </div>
                          <div className="flex justify-between border-b border-[#5B96D1]/20 pb-3">
                            <span>Style Multiplier ({formData.style}):</span>
                            <span className="font-serif font-bold text-[#1D325E]">x {estimateData.styleFactor}</span>
                          </div>
                        </div>
                        
                        <div className="mt-auto text-center">
                          <button type="button" onClick={resetCalculator} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A7BC1] hover:text-[#1D325E] transition-colors pb-1 border-b border-[#5B96D1]/30 hover:border-[#1D325E]">
                            Calculate Another Project
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons (Hidden on Step 4) */}
                  {step < 4 && (
                    <div className="mt-12 flex justify-between items-center pt-8 border-t border-[#5B96D1]/20 shrink-0">
                      {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-[#5A7BC1] hover:text-[#1D325E] font-bold flex items-center transition-colors text-[10px] uppercase tracking-[0.2em]">
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </button>
                      ) : <div />}
                      
                      <button 
                        type="submit" 
                        disabled={isCalculating || (step === 1 && !formData.area) || (step === 3 && (!formData.name || !formData.email))} 
                        className="bg-[#1D325E] text-[#F7FBFF] px-10 py-5 flex items-center hover:bg-[#5B96D1] hover:text-[#1D325E] transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 disabled:hover:bg-[#1D325E] disabled:hover:text-[#F7FBFF] group shadow-lg"
                      >
                        {isCalculating ? <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> Processing</> : 
                        step === 3 ? 'Reveal Estimate' : 
                        <>Next Step <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" /></>}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. WHY CHOOSE US ── */}
      <section className="py-32 bg-[#EFF5FF] border-t border-[#5B96D1]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#5B96D1]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5A7BC1]">The Advantage</span>
              <div className="h-[1px] w-8 bg-[#5B96D1]" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#1D325E]">Smarter Project Planning</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {[
              { icon: LineChart, title: "Data-Driven Precision", desc: "Our algorithm utilizes real-time market rates and historical project data to generate highly accurate baselines." },
              { icon: ShieldCheck, title: "Transparent Breakdown", desc: "No hidden fees or surprise costs. We provide a clear, understandable projection before any commitment." },
              { icon: Building2, title: "Expert Architecture", desc: "Every estimate serves as a robust foundation for our master architects to build your perfect space." }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
                  className="p-10 border border-[#5B96D1]/20 bg-[#F7FBFF] hover:border-[#5B96D1]/60 hover:shadow-[0_10px_40px_rgba(180,130,40,0.08)] transition-all duration-500 group text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EFF5FF] flex items-center justify-center mx-auto mb-8 group-hover:bg-[#5B96D1] transition-colors duration-500">
                    <Icon className="w-6 h-6 text-[#5B96D1] group-hover:text-[#1D325E] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#1D325E] mb-4">{feature.title}</h3>
                  <p className="text-[#4A6E9A] font-light leading-relaxed text-sm">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. FAQ SECTION ── */}
      <section className="py-32 bg-[#F7FBFF] border-t border-[#5B96D1]/20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-14">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-serif text-[#1D325E] mb-6">Frequently Asked Questions</h2>
            <div className="h-[1px] w-12 bg-[#5B96D1] mx-auto" />
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Are these estimates 100% accurate?", a: "They provide a highly reliable baseline based on current market rates. Final costs vary depending on specific materials, site conditions, and final design selections." },
              { q: "What is the difference between Premium and Luxury?", a: "Premium introduces high-quality branded finishes and custom cabinetry. Luxury includes imported stones, smart home automation, and bespoke architectural detailing curated specifically for you." },
              { q: "Does this estimate include taxes?", a: "No, this represents core material and labor costs. Government taxes (like GST) and necessary building permits are calculated separately in the final formal quotation." }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }}
                className="bg-[#EFF5FF] border border-[#5B96D1]/20 p-8 lg:p-10 hover:border-[#5B96D1]/60 transition-colors duration-500"
              >
                <h3 className="font-bold font-serif text-lg lg:text-xl text-[#1D325E] mb-4 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#5B96D1] shrink-0 mt-1" strokeWidth={2} /> 
                  <span className="leading-snug">{faq.q}</span>
                </h3>
                <p className="text-[#4A6E9A] font-light pl-9 leading-relaxed text-sm lg:text-base">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
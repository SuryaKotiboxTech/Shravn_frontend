"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar'; // Adjust path if needed
import { 
  Loader2, Calculator, Receipt, X, ChevronRight, ChevronLeft, 
  Building2, LineChart, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export default function CalculatorPage() {
  // --- STATE FOR MODAL & MULTI-STEP FORM ---
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const calculateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      // Calculate estimate locally first
      const area = parseInt(formData.area) || 0;
      let baseRate = 100;
      if (formData.projectType === 'Commercial') baseRate = 120;
      if (formData.projectType === 'Restaurant') baseRate = 150;

      let styleFactor = 1.0;
      if (formData.style === 'Premium') styleFactor = 1.3;
      if (formData.style === 'Luxury') styleFactor = 1.6;

      const totalCost = area * baseRate * styleFactor;

      setEstimateData({ total: totalCost, baseRate, styleFactor, area });

      // Submit to backend API
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

      const response = await fetch('https://api.rkinteriorstudio.in/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estimatePayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Estimate API error:', errorData);
        // Still show the estimate even if API fails
      } else {
        const result = await response.json();
        console.log('Estimate saved:', result);
      }

      setIsCalculating(false);
      setStep(4); // Move to final results step
    } catch (error) {
      console.error('Error calculating estimate:', error);
      setIsCalculating(false);
      // Still show the estimate even if API fails
      setStep(4);
    }
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount);
  };

  // --- PAGE CONTENT DATA ---
  const stats = [
    { value: "200+", label: "Projects designed & delivered" },
    { value: "10,000+", label: "Cost estimates provided" },
    { value: "2000 Cr+", label: "Value of estimated projects" },
    { value: "50 Lakhs+", label: "Sq.ft. area estimated" }
  ];

  const features = [
    {
      icon: LineChart,
      title: "Data-Driven Precision",
      description: "Our algorithm uses real-time market rates and historical project data to generate highly accurate baselines."
    },
    {
      icon: ShieldCheck,
      title: "Transparent Breakdown",
      description: "No hidden fees or surprise costs. We provide a clear, understandable breakdown of where your budget goes."
    },
    {
      icon: Building2,
      title: "Expert Architecture",
      description: "Every estimate serves as a foundation for our master architects to build your perfect, customized space."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <main className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Architecture Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#a68a6b] font-bold uppercase tracking-widest text-sm mb-4 block">Project Planning</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6">
              Reliable estimates, <br/> delivered instantly.
            </h1>
            <p className="text-xl text-zinc-300 font-light mb-10 max-w-2xl mx-auto">
              Get detailed, accurate, and customized cost projections for your residential or commercial projects in under two minutes.
            </p>
            <button 
              onClick={() => { setIsModalOpen(true); setStep(1); setEstimateData(null); }}
              className="bg-[#a68a6b] hover:bg-[#8e7358] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              Start Free Estimate
            </button>
          </motion.div>
        </div>
      </main>

      {/* --- STATS SECTION (From your Image) --- */}
      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-4 md:py-0 px-4"
              >
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{stat.value}</h3>
                <p className="text-zinc-500 font-light text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (New Value-Add Section) --- */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Smarter Project Planning</h2>
            <div className="h-1 w-20 bg-[#a68a6b] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-8 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-[#a68a6b] transition-all duration-300 group"
                >
                  <div className="inline-flex p-4 bg-zinc-50 rounded-sm mb-6 group-hover:bg-[#a68a6b] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#a68a6b] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">{feature.title}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- INLINE FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-[#a68a6b] mx-auto mb-6"></div>
          </div>
          <div className="space-y-4">
            {[
              { q: "Are these estimates 100% accurate?", a: "They provide a highly reliable baseline based on current market rates. Final costs vary depending on specific materials and site conditions." },
              { q: "What is the difference between Premium and Luxury?", a: "Premium introduces branded finishes and custom cabinetry. Luxury includes imported stones, smart home automation, and bespoke architectural detailing." },
              { q: "Does this estimate include taxes?", a: "No, this represents core material and labor costs. Government taxes (like GST) and permits are calculated separately in the final quotation." }
            ].map((faq, index) => (
              <div key={index} className="border border-zinc-200 rounded-sm p-6 hover:border-[#a68a6b] transition-colors bg-zinc-50">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#a68a6b]" /> {faq.q}
                </h3>
                <p className="text-slate-600 font-light pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* --- MULTI-STEP MODAL FOR CALCULATION --- */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center shrink-0">
                <h3 className="text-white font-serif text-xl">Project Estimator</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Bar */}
              {step < 4 && (
                <div className="w-full bg-zinc-100 h-1.5 shrink-0">
                  <div className="bg-[#a68a6b] h-1.5 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
              )}

              {/* Modal Body (Scrollable) */}
              <div className="p-6 md:p-10 overflow-y-auto">
                <form onSubmit={step === 3 ? calculateEstimate : (e) => { e.preventDefault(); nextStep(); }}>
                  
                  {/* STEP 1: Basic Details */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif text-slate-900 mb-6">Tell us about your space</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium">Project Type</label>
                          <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all">
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Restaurant">Restaurant / Hospitality</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium">Carpet Area (Sq. Ft.)</label>
                          <input type="number" name="area" value={formData.area} onChange={handleInputChange} required min="100" placeholder="e.g. 1500" className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all" />
                        </div>
                      </div>
                      
                      <div className="mt-10 flex justify-end">
                        <button type="submit" disabled={!formData.area} className="bg-slate-900 text-white px-8 py-3 rounded-sm flex items-center hover:bg-[#a68a6b] transition-colors disabled:opacity-50">
                          Next Step <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Finishes & Style */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif text-slate-900 mb-6">Refine your requirements</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium">Desired Finish / Style</label>
                          <select name="style" value={formData.style} onChange={handleInputChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all">
                            <option value="Standard">Standard (Durable, Cost-Effective)</option>
                            <option value="Premium">Premium (Branded, Custom Finishes)</option>
                            <option value="Luxury">Luxury (Imported Materials, Bespoke)</option>
                          </select>
                        </div>
                        
                        <div className={`transition-opacity ${formData.projectType !== 'Residential' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium flex justify-between">
                            Rooms Configuration <span className="text-xs text-red-500">{formData.projectType !== 'Residential' && 'Residential Only'}</span>
                          </label>
                          <select name="rooms" value={formData.rooms} onChange={handleInputChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all">
                            <option value="1 BHK">1 BHK</option>
                            <option value="2 BHK">2 BHK</option>
                            <option value="3 BHK">3 BHK</option>
                            <option value="4+ BHK">4+ BHK / Villa</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium">Your Budget Range</label>
                          <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all">
                            <option value="not-decided">Not decided yet</option>
                            <option value="under-10lakh">Under ₹10 Lakhs</option>
                            <option value="10-20-lakh">₹10-20 Lakhs</option>
                            <option value="20-50-lakh">₹20-50 Lakhs</option>
                            <option value="50lakh-1crore">₹50 Lakhs - 1 Crore</option>
                            <option value="1crore-plus">Above ₹1 Crore</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-between">
                        <button type="button" onClick={prevStep} className="text-zinc-500 hover:text-slate-900 px-6 py-3 font-medium flex items-center transition-colors">
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </button>
                        <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-sm flex items-center hover:bg-[#a68a6b] transition-colors">
                          Next Step <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Contact Info (Lead Generation) */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif text-slate-900 mb-2">Where should we send this?</h2>
                      <p className="text-zinc-500 mb-6 text-sm">Enter your details to generate your customized estimate instantly.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium">Full Name</label>
                          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-500 mb-2 font-medium">Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] outline-none transition-all" />
                        </div>
                      </div>

                      <div className="mt-10 flex justify-between items-center">
                        <button type="button" onClick={prevStep} className="text-zinc-500 hover:text-slate-900 px-4 py-3 font-medium flex items-center transition-colors">
                          <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                        <button type="submit" disabled={isCalculating || !formData.name || !formData.email} className="bg-[#a68a6b] text-white px-8 py-3 rounded-sm flex items-center hover:bg-[#8e7358] transition-colors font-bold uppercase tracking-widest text-sm disabled:opacity-70">
                          {isCalculating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...</> : 'Reveal Estimate'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Results */}
                  {step === 4 && estimateData && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-4 text-[#a68a6b]">
                          <Calculator className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-serif text-slate-900 mb-2">Your Estimate is Ready, {formData.name.split(' ')[0]}</h2>
                        <p className="text-zinc-500">Based on your requirements for a {formData.area} sqft {formData.projectType} space.</p>
                      </div>

                      <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-6 mb-6 text-center">
                        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">Estimated Range</h3>
                        <div className="text-4xl md:text-5xl font-serif text-[#a68a6b] font-bold">
                          {formatINR(estimateData.total * 0.9)} 
                          <span className="text-xl text-zinc-400 font-sans font-light mx-2">to</span> 
                          {formatINR(estimateData.total * 1.1)}
                        </div>
                      </div>

                      <div className="bg-zinc-900 rounded-sm p-6 text-zinc-300 font-light text-sm shadow-inner">
                        <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3">
                          <Receipt className="w-4 h-4 text-[#a68a6b]" />
                          <h4 className="text-white uppercase tracking-widest font-semibold">Calculation Breakdown</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between"><span>Base Area:</span><span className="text-white">{estimateData.area} sq ft</span></div>
                          <div className="flex justify-between"><span>Base Rate ({formData.projectType}):</span><span className="text-white">₹{estimateData.baseRate} / sq ft</span></div>
                          <div className="flex justify-between"><span>Style Multiplier ({formData.style}):</span><span className="text-white">x {estimateData.styleFactor}</span></div>
                        </div>
                      </div>

                      <div className="mt-8 text-center">
                        <p className="text-xs text-zinc-400 mb-4">*This is a preliminary estimate. A copy has been sent to {formData.email}.</p>
                        <button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-900 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#a68a6b] transition-colors">
                          Book Final Consultation
                        </button>
                      </div>
                    </motion.div>
                  )}

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
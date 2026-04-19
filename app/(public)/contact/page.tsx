"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight, Calculator, Send, Loader2, Clock, ArrowUpRight } from 'lucide-react';

interface ContactDetails {
  companyName: string;
  address: { street: string; city: string; state: string; zipCode: string; country: string; };
  phone: string;
  email: string;
  businessHours?: { [key: string]: { closed?: boolean; open?: string; close?: string; } };
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', projectType: 'residential', subject: '', message: '', budget: 'not-sure'
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/contact-details`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) setContactDetails(data.data);
        }
      } catch { } finally {
        setLoadingContact(false);
      }
    };
    fetchContactDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', projectType: 'residential', subject: '', message: '', budget: 'not-sure' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMessage(data.message || 'Failed to submit. Please try again.');
      }
    } catch {
      setErrorMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full border-b border-[#C9A84C]/30 bg-transparent text-[#2C1F0A] font-serif text-lg py-4 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#A07828]/30 rounded-none";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <div className="min-h-screen bg-[#FAF6EF] selection:bg-[#C9A84C] selection:text-[#2C1F0A]">

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-[#2C1F0A]">
        {/* Parallax/Static Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=85"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C1F0A]/80 via-[#2C1F0A]/40 to-[#2C1F0A]" />
        </div>

        {/* Hero Typography */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#C9A84C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">Contact Us</span>
              <div className="h-[1px] w-12 bg-[#C9A84C]" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold text-[#FAF6EF] font-serif leading-[1.05] tracking-tight drop-shadow-lg">
              Let's Create <br />
              <span className="text-[#C9A84C] italic font-normal">Extraordinary.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FLOATING FORM CARD (OVERLAPPING HERO) ── */}
      <section className="relative z-20 max-w-[1500px] mx-auto px-6 lg:px-14 -mt-36 lg:-mt-35 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#FAF6EF] shadow-[0_30px_100px_rgba(44,31,10,0.15)] border border-[#C9A84C]/20 flex flex-col xl:flex-row relative"
        >
          {/* Subtle Decorative Border inside the card */}
          <div className="absolute inset-3 border border-[#C9A84C]/10 pointer-events-none hidden md:block" />

          {/* Left Side: Context & Direct Info */}
          <div className="w-full xl:w-5/12 bg-[#F5EDD8] p-10 lg:p-16 xl:p-20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#2C1F0A] font-bold leading-tight mb-8">
                Initiate a <br className="hidden xl:block" />
                <span className="italic font-normal text-[#B8872A]">Dialogue.</span>
              </h2>
              <p className="text-[#7A6040] text-base leading-relaxed font-light mb-12 max-w-md">
                Whether you have a specific project in mind, require a detailed consultation, or simply want to explore design possibilities, our principal architects are ready to guide your vision.
              </p>
            </div>

            <div className="space-y-8 border-t border-[#C9A84C]/20 pt-10">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#A07828] font-bold block mb-2">Direct Line</span>
                <a href={`tel:${contactDetails?.phone || '+918619633247'}`} className="text-xl font-serif text-[#2C1F0A] hover:text-[#C9A84C] transition-colors">
                  {loadingContact ? 'Loading...' : (contactDetails?.phone || '+91-8619633247')}
                </a>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#A07828] font-bold block mb-2">Digital Desk</span>
                <a href={`mailto:${contactDetails?.email || 'sukeradexterity@gmail.com'}`} className="text-xl font-serif text-[#2C1F0A] hover:text-[#C9A84C] transition-colors">
                  {loadingContact ? 'Loading...' : (contactDetails?.email || 'sukeradexterity@gmail.com')}
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="w-full xl:w-7/12 p-10 lg:p-16 xl:p-20 bg-[#FAF6EF] relative z-10">
            
            {errorMessage && (
              <div className="mb-8 p-5 border border-red-500/20 bg-red-50 text-red-700 text-sm font-light">
                {errorMessage}
              </div>
            )}
            {isSubmitted && (
              <div className="mb-8 p-5 border border-[#C9A84C]/30 bg-[#F5EDD8] text-[#2C1F0A] text-sm font-medium flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-white flex items-center justify-center shrink-0">✓</div>
                Inquiry submitted successfully. A principal designer will be in touch shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className={inputClass} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX (Optional)" className={inputClass} />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Estimated Budget</label>
                  <div className="relative">
                    <select name="budget" value={formData.budget} onChange={handleInputChange} className={selectClass}>
                      <option value="not-sure">Select a range (Optional)</option>
                      <option value="under-5lakh">Under 5 Lakh</option>
                      <option value="5-10-lakh">5-10 Lakh</option>
                      <option value="10-25-lakh">10-25 Lakh</option>
                      <option value="25-50-lakh">25-50 Lakh</option>
                      <option value="50-lakh-plus">50 Lakh+</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleInputChange} className={selectClass}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="interior">Interior Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Project Title *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="e.g. Luxury Villa Design" className={inputClass} />
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] font-bold mb-1">Project Details *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  placeholder="Tell us about your vision, requirements, and timeline..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-[#2C1F0A] hover:bg-[#C9A84C] text-[#FAF6EF] hover:text-[#2C1F0A] px-8 py-5 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-60 disabled:hover:bg-[#2C1F0A] disabled:hover:text-[#FAF6EF] shadow-lg"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : isSubmitted ? (
                    '✓ Inquiry Received'
                  ) : (
                    <>Submit Inquiry <Send className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>

          </div>
        </motion.div>
      </section>

      {/* ── 3. ESTIMATE CTA (LIGHT BANNER) ── */}
      <section className="py-24 bg-[#F5EDD8] border-t border-[#C9A84C]/20">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 lg:p-16 border border-[#C9A84C]/30 bg-[#FAF6EF] shadow-sm hover:shadow-[0_20px_60px_rgba(180,130,40,0.05)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-[#C9A84C]/30 group-hover:bg-[#C9A84C] transition-colors duration-500">
                <Calculator className="w-8 h-8 text-[#C9A84C] group-hover:text-[#FAF6EF] transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#2C1F0A] font-serif mb-2">Require a quick cost projection?</h3>
                <p className="text-[#7A6040] font-light text-sm">Utilize our smart estimation tool for instant clarity before consulting.</p>
              </div>
            </div>
            <Link
              href="/calculator"
              className="flex-shrink-0 bg-[#C9A84C] hover:bg-[#2C1F0A] text-[#2C1F0A] hover:text-[#FAF6EF] px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex items-center gap-3 shadow-lg"
            >
              Cost Calculator <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 4. STUDIO INFO (THE ATELIER GRID) ── */}
      <section className="py-32 bg-[#FAF6EF] border-t border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">The Atelier</span>
              <div className="h-[1px] w-10 bg-[#C9A84C]" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C1F0A] font-serif">Visit Our Studio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: MapPin,
                title: 'Headquarters',
                content: loadingContact ? 'Loading...' : contactDetails
                  ? `${contactDetails.address.street}\n${contactDetails.address.city}, ${contactDetails.address.state}`
                  : 'Jaike-e-Jaipur Chowpatty,\nSirsi Road, Jaipur'
              },
              {
                Icon: Phone,
                title: 'Direct Line',
                content: loadingContact ? 'Loading...' : (contactDetails?.phone || '+91-8619633247')
              },
              {
                Icon: Mail,
                title: 'Digital Desk',
                content: loadingContact ? 'Loading...' : (contactDetails?.email || 'sukeradexterity@gmail.com')
              },
              {
                Icon: Clock,
                title: 'Operating Hours',
                content: 'Monday to Friday\n11:00 AM — 6:00 PM\nSunday: Closed'
              },
            ].map(({ Icon, title, content }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#F5EDD8] p-10 flex flex-col items-center text-center group hover:bg-[#2C1F0A] transition-colors duration-500 border border-[#C9A84C]/10 hover:border-[#2C1F0A]"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF6EF] flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] transition-colors duration-500 shadow-sm">
                  <Icon className="w-5 h-5 text-[#B8872A] group-hover:text-[#2C1F0A] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#2C1F0A] font-bold mb-4 group-hover:text-[#C9A84C] transition-colors">{title}</div>
                <p className="text-[#7A6040] text-sm font-light leading-relaxed whitespace-pre-line group-hover:text-[#FAF6EF]/80 transition-colors">{content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
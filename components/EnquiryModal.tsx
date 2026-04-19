'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residential', 
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (scrollBarGap > 0) {
      document.body.style.paddingRight = `${scrollBarGap}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Website Enquiry',
          message: formData.message,
          projectType: formData.projectType,
          budget: 'not-sure'
        })
      });

      const data = await response.json(); 

      if (response.ok && data.success) {
        setSubmitted(true);

        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectType: 'residential', 
            message: ''
          });
        }, 2500);
      } else {
        console.error('API Error:', data.message);
        alert(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Minimalist input styling
  const inputClass = "w-full border-b border-[#C9A84C]/30 bg-transparent text-[#2C1F0A] font-serif text-base py-3 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#A07828]/40 rounded-none";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1205]/60 backdrop-blur-md"
          />

          {/* Modal Container - Fixed constraints for all screen sizes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1000px] bg-[#FAF6EF] shadow-[0_30px_100px_rgba(26,18,5,0.4)] flex flex-col md:flex-row border border-[#C9A84C]/20 rounded-sm overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
          >
            
            {/* Close Button (Absolute Top Right - extremely high z-index) */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2.5 text-[#2C1F0A] hover:text-[#FAF6EF] hover:bg-[#C9A84C] transition-colors bg-[#F5EDD8] md:bg-[#FAF6EF] rounded-full shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Visual Image (Hidden on Mobile) */}
            <div className="hidden md:flex md:w-5/12 relative bg-[#2C1F0A] flex-col justify-end p-10 lg:p-12 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Architecture Setup" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F0A] via-[#2C1F0A]/40 to-transparent" />
              
              <div className="relative z-10">
                <div className="h-[1px] w-10 bg-[#C9A84C] mb-6" />
                <h2 className="text-4xl font-serif text-[#FAF6EF] mb-4 leading-[1.1]">
                  Let's build<br/>
                  <span className="italic text-[#C9A84C] font-normal">your vision.</span>
                </h2>
                <p className="text-[#E8D5A8]/70 font-light text-sm leading-relaxed">
                  Provide a few details, and our principal architects will be in touch to discuss your requirements.
                </p>
              </div>
            </div>

            {/* Right Side: The Form (Scrollable) */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 lg:p-12 relative bg-[#FAF6EF] overflow-y-auto custom-scrollbar">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 pt-4 sm:pt-0">
                  
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-3xl font-serif text-[#2C1F0A] md:hidden mb-2">Initiate Dialogue</h3>
                    <p className="text-[#7A6040] text-sm font-light md:hidden">Provide a few details below.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] mb-1 font-bold">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] mb-1 font-bold">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXX XXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] mb-1 font-bold">Project Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleInputChange} className={selectClass}>
                      <option value="residential">Residential Space</option>
                      <option value="commercial">Commercial Space</option>
                      <option value="renovation">Renovation</option>
                      <option value="interior">Interior Design Only</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A07828] mb-1 font-bold">Project Brief</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      required
                      placeholder="Tell us a bit about your project..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-[#2C1F0A] hover:bg-[#C9A84C] text-[#FAF6EF] hover:text-[#2C1F0A] py-4 sm:py-5 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 disabled:opacity-70 flex items-center justify-center gap-3 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success State */
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-[#F5EDD8] rounded-full flex items-center justify-center mb-8 border border-[#C9A84C]/30"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#C9A84C]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-3xl font-serif text-[#2C1F0A] mb-4">Inquiry Received</h3>
                  <p className="text-[#7A6040] text-sm font-light max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. A principal architect will review your details and contact you shortly.
                  </p>
                </div>
              )}
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
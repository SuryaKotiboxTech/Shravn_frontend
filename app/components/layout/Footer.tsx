"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, Loader2 } from 'lucide-react';

// Custom SVGs for Social Icons
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: '',
        subject: 'Footer Inquiry',
        message: formData.message,
        projectType: formData.projectType,
        budget: 'not-sure'
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          projectType: 'residential',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        setErrorMessage(data.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#111111] w-full overflow-hidden text-white pt-24 pb-8">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Dark Architecture Texture"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* --- 1. CENTERED PRO-SIZE LOGO --- */}
        <Link href="/" className="flex justify-center items-center group mb-8 transition-transform hover:scale-105 duration-500">
          <div className="relative h-20 w-48 sm:h-28 sm:w-80">
            <Image
              src="/logo1.png"
              alt="Architecture Studio Logo"
              fill
              sizes="(max-width: 640px) 192px, (max-width: 1024px) 320px, 320px"
              loading="eager"
              className="object-contain"
            />
          </div>
        </Link>
        
        <p className="text-zinc-400 font-light text-lg mb-12 max-w-xl text-center">
          Have a vision? Send us your project details below and our lead architects will be in touch.
        </p>

        {/* --- 2. FULL CENTERED FORM --- */}
        <div className="w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 md:p-12 rounded-sm shadow-2xl mb-16">
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-sm text-sm">
              {errorMessage}
            </div>
          )}

          {isSubmitted && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 text-green-200 rounded-sm text-sm">
              ✅ Message sent successfully! Check your email for confirmation.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Your Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors placeholder:text-zinc-700"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors placeholder:text-zinc-700"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Row 2: Project Type */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Project Type</label>
              <select 
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors appearance-none cursor-pointer"
              >
                <option value="residential">Residential Architecture</option>
                <option value="commercial">Commercial Interior</option>
                <option value="industrial">Hospitality / Restaurant</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>

            {/* Row 3: Project Details */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Project Details</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors resize-none placeholder:text-zinc-700"
                placeholder="Tell us a bit about your vision, location, and requirements..."
              ></textarea>
            </div>

            {/* Row 4: Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting || isSubmitted}
              className="w-full bg-[#a68a6b] hover:bg-[#8e7358] text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center disabled:opacity-70 shadow-lg"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Sending...</>
              ) : isSubmitted ? (
                <span className="text-white">Message Sent! Check your email</span>
              ) : (
                <>Send Message <Send className="w-4 h-4 ml-3" /></>
              )}
            </button>

          </form>
        </div>

        {/* --- 3. DIVIDER --- */}
        <div className="w-full h-px bg-zinc-800 mb-8"></div>

        {/* --- 4. BOTTOM BAR (Socials & Copyright) --- */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#a68a6b] hover:bg-[#a68a6b] transition-all duration-300">
              <TwitterIcon />
            </a>
            <a href="#" className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#a68a6b] hover:bg-[#a68a6b] transition-all duration-300">
              <FacebookIcon />
            </a>
            <a href="#" className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#a68a6b] hover:bg-[#a68a6b] transition-all duration-300">
              <InstagramIcon />
            </a>
            <a href="#" className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#a68a6b] hover:bg-[#a68a6b] transition-all duration-300">
              <LinkedinIcon />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-zinc-500 font-light text-xs uppercase tracking-wider text-center">
            &copy; {currentYear} Architect Studio. All Rights Reserved.
          </p>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;
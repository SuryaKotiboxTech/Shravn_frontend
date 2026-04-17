"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react'; // Make sure lucide-react is installed

// Custom Social Icons
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Calculator', href: '/calculator' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll state for navbar background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  // Fetch social links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/social-icons`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && data.data) setSocialLinks(data.data);
      } catch {
        setSocialLinks({});
      }
    };
    fetchSocialLinks();
  }, []);

  const trackSocialClick = (channel: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const payload = JSON.stringify({ channel });
    if (navigator?.sendBeacon) {
      navigator.sendBeacon(`${API_URL}/api/social/click`, new Blob([payload], { type: 'application/json' }));
    } else {
      fetch(`${API_URL}/api/social/click`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: payload }).catch(() => {});
    }
  };

  const socials = [
    { key: 'facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'twitter', href: socialLinks.twitter, Icon: TwitterIcon },
    { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedInIcon },
  ].filter(s => s.href);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-6'
      }`}>
        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C4A56D] to-transparent" />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[50px]">

            {/* Logo */}
           <Link href="/" className="flex-shrink-0 flex items-center">
<img 
  src="/logo2.png" 
  alt="Logo" 
  className="h-16  object-contain"
/>
</Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 group ${
                    scrolled ? 'text-[#0A0A0A]/60 hover:text-[#C4A56D]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C4A56D] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side: Socials + CTA */}
            <div className="flex items-center gap-6">
              {socials.length > 0 && (
                <div className="hidden lg:flex items-center gap-4">
                  {socials.map(({ key, href, Icon }) => (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={key} onClick={() => trackSocialClick(key)}
                      className={`transition-colors duration-200 ${scrolled ? 'text-[#0A0A0A]/30 hover:text-[#C4A56D]' : 'text-white/40 hover:text-white'}`}>
                      <Icon />
                    </a>
                  ))}
                  <div className={`w-px h-4 ml-1 transition-colors duration-500 ${scrolled ? 'bg-[#0A0A0A]/10' : 'bg-white/20'}`} />
                </div>
              )}

              {/* Dynamic CTA Button */}
              <Link href="/contact"
                className={`hidden lg:inline-flex items-center justify-center text-[9px] font-black uppercase tracking-[0.25em] px-8 py-3.5 transition-all duration-400 ${
                  scrolled 
                    ? 'bg-[#C4A56D] text-white hover:bg-[#0A0A0A] hover:-translate-y-0.5 shadow-lg hover:shadow-xl' 
                    : 'bg-transparent border border-white/30 text-white hover:border-[#C4A56D] hover:bg-[#C4A56D]'
                }`}>
                Start Project
              </Link>

              {/* Mobile hamburger menu button */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-1 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-[5px] w-6">
                  <span className={`block h-[1.5px] w-full transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-full transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-full transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]' : 'bg-white'}`} />
                </div>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Off-Canvas Mobile Menu (Sidebar) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Slide-in Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[70] flex flex-col lg:hidden border-l border-stone-200"
            >
              {/* Close Button Header */}
              <div className="p-6 flex justify-end border-b border-stone-100">
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#0A0A0A]/40 hover:text-[#C4A56D] transition-colors bg-stone-50 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col px-8 py-10 gap-8 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.name} 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)} 
                      className="block text-2xl font-black text-[#0A0A0A] font-serif uppercase tracking-wide hover:text-[#C4A56D] hover:pl-2 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full bg-[#C4A56D] text-white text-[10px] font-black uppercase tracking-[0.25em] px-8 py-5 hover:bg-[#0A0A0A] transition-colors duration-300">
                    Start Project
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Footer / Socials */}
              <div className="p-8 bg-stone-50 border-t border-stone-100">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0A0A0A]/40 mb-4">Connect With Us</p>
                <div className="flex gap-5">
                  {socials.map(({ key, href, Icon }) => (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackSocialClick(key)}
                      className="text-[#0A0A0A]/40 hover:text-[#C4A56D] transition-colors">
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
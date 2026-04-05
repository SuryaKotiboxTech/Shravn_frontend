"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Removed unused ArrowRight
import { motion, AnimatePresence } from 'framer-motion';

// Custom Premium SVGs for Social Icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const socialLinks = [
    { channel: 'facebook', href: 'https://www.facebook.com', icon: FacebookIcon },
    { channel: 'instagram', href: 'https://www.instagram.com', icon: InstagramIcon }
  ];

  // Advanced scroll effect: detects scroll to trigger glassmorphism and color swap
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackSocialClick = (channel: string) => {
    const payload = JSON.stringify({ channel });

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      navigator.sendBeacon('https://api.rkinteriorstudio.in/api/social/click', new Blob([payload], { type: 'application/json' }));
      return;
    }

    fetch('https://api.rkinteriorstudio.in/api/social/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: payload
    }).catch(() => undefined);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3 border-b border-gray-200/50'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-32 sm:h-14 sm:w-40">
              <Image
                src="/logo1.png"
                alt="Site logo"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 160px"
                loading="eager"
                className="object-contain"
              />
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group font-medium text-xs uppercase tracking-[0.15em] transition-colors duration-300 py-2 ${
                  scrolled 
                    ? 'text-slate-600 hover:text-[#a68a6b]' 
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.name}
                {/* Animated Underline */}
                <span 
                  className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full bg-[#a68a6b]`}
                ></span>
              </Link>
            ))}
            
            {/* Desktop Social Icons with Premium Backgrounds */}
            <div className={`flex items-center space-x-3 pl-6 border-l transition-colors duration-300 ${scrolled ? 'border-zinc-300' : 'border-white/20'}`}>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.channel}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.channel}
                    onClick={() => trackSocialClick(link.channel)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
                      scrolled
                        ? 'bg-zinc-100 text-slate-600 hover:bg-[#a68a6b] hover:text-white hover:shadow-md'
                        : 'bg-white/10 backdrop-blur-sm text-white hover:bg-[#a68a6b] hover:text-white'
                    }`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* --- MOBILE RIGHT SIDE (Socials + Hamburger) --- */}
          <div className="lg:hidden flex items-center space-x-3">
            
            {/* Mobile Social Icons with Premium Backgrounds */}
            <div className="flex items-center space-x-2 mr-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.channel}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.channel}
                    onClick={() => trackSocialClick(link.channel)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                      scrolled
                        ? 'bg-zinc-100 text-slate-600 hover:bg-[#a68a6b] hover:text-white'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-[#a68a6b]'
                    }`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            {/* Mobile Hamburger Menu Button */}
            {!isOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors p-1 flex items-center justify-center ${
                  scrolled ? 'text-slate-900 hover:text-[#a68a6b]' : 'text-white hover:text-[#a68a6b]'
                }`}
              >
                <Menu className="w-8 h-8" />
              </button>
            )}
          </div>
          
        </div>
      </div>

      {/* --- MOBILE NAVIGATION PANEL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-zinc-100 shadow-2xl overflow-hidden absolute w-full top-full left-0"
          >
            <div className="px-6 pt-4 pb-8">
              <div className="flex justify-end mb-4">
                <button
  onClick={() => setIsOpen(!isOpen)}
  className={`transition-colors p-1 flex items-center justify-center ${
    scrolled ? 'text-slate-900 hover:text-[#a68a6b]' : 'text-white hover:text-[#a68a6b]'
  }`}
>
  {isOpen ? (
    <X className="w-8 h-8" />
  ) : (
    <Menu className="w-8 h-8" />
  )}
</button>
              </div>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-4 text-slate-800 hover:text-[#a68a6b] hover:bg-zinc-50 rounded-sm font-serif text-xl transition-all duration-300 border-b border-zinc-100 last:border-0"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
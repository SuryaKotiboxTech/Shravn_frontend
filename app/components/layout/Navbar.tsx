"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF6EF]/98 shadow-[0_2px_40px_rgba(180,140,60,0.12)] border-b border-[#C9A84C]/20'
            : 'bg-[#FAF6EF]/90 border-b border-[#C9A84C]/10'
        } backdrop-blur-xl`}
      >
        {/* Top gold accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <img
                src="/logo2.png"
                alt="Sukera Dexterity"
                className="h-12 object-contain transition-opacity duration-300 group-hover:opacity-75"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#5C4A1E] hover:text-[#A07828] transition-colors duration-300 group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right: Social Icons + CTA */}
            <div className="flex items-center gap-6">
              {socials.length > 0 && (
                <div className="hidden lg:flex items-center gap-4">
                  {socials.map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      onClick={() => trackSocialClick(key)}
                      className="text-[#A08040] hover:text-[#C9A84C] transition-colors duration-200"
                    >
                      <Icon />
                    </a>
                  ))}
                  <div className="w-px h-5 bg-[#C9A84C]/30 mx-1" />
                </div>
              )}

              {/* CTA Button */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center justify-center text-[9.5px] font-black uppercase tracking-[0.22em] px-7 py-[11px] bg-[#B8872A] text-[#FAF6EF] hover:bg-[#3D2E0A] transition-all duration-300 shadow-[0_2px_18px_rgba(180,130,40,0.25)] hover:shadow-[0_4px_24px_rgba(60,40,10,0.3)]"
              >
                Start Project
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom gold line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#2A1E06]/50 backdrop-blur-sm z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[82%] max-w-[360px] bg-[#FAF6EF] z-[70] flex flex-col shadow-[−8px_0_60px_rgba(140,100,20,0.2)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#C9A84C]/20">
                <img src="/logo2.png" alt="Logo" className="h-9 object-contain" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#A08040] hover:text-[#3D2E0A] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col px-8 py-10 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between group py-4 border-b border-[#C9A84C]/10 hover:border-[#C9A84C]/40 transition-colors"
                    >
                      <span className="text-[22px] font-bold text-[#3D2E0A] group-hover:text-[#B8872A] transition-colors leading-none tracking-tight font-serif">
                        {link.name}
                      </span>
                      <span className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A84C]">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full bg-[#B8872A] text-[#FAF6EF] text-[10px] font-black uppercase tracking-[0.25em] py-5 hover:bg-[#3D2E0A] transition-colors"
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </div>

              {/* Footer / Social */}
              <div className="px-8 py-6 border-t border-[#C9A84C]/20 bg-[#F5EDD8]/60">
                <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-[#A08040] mb-4">Follow Us</p>
                <div className="flex gap-5">
                  {socials.map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSocialClick(key)}
                      className="text-[#A08040] hover:text-[#B8872A] transition-colors"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[74px]" />
    </>
  );
}
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState({ twitter: '', facebook: '', instagram: '', linkedin: '' });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/social-icons`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && data.data) setSocialLinks({ ...socialLinks, ...data.data });
      } catch { /* silent fail */ }
    };
    fetch_();
  }, []);

  const trackSocialClick = (channel: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/social/click`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
      body: JSON.stringify({ channel })
    }).catch(() => {});
  };

  const socials = [
    { key: 'twitter', href: socialLinks.twitter, Icon: TwitterIcon },
    { key: 'facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedinIcon },
  ].filter(s => s.href);

  return (
    <footer className="bg-[#080808] relative overflow-hidden">
      {/* Top gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter font-serif">RK</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 pb-10 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand - large */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-8">
<img 
  src="/logo2.png" 
  alt="Logo" 
  className="h-16  object-contain"
/>
</Link>
            <p className="text-white/40 text-sm leading-relaxed font-light max-w-sm mb-8">
              An award-winning interior design and architecture studio. Crafting refined, timeless environments across India and beyond.
            </p>
            {/* Social media stat */}
            <div className="border border-[#C9A96E]/20 p-6 inline-block">
              <div className="text-3xl font-black text-[#C9A96E] font-serif mb-1">2,00,000<span className="text-[#C9A96E]">+</span></div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">People follow our journey</div>
            </div>
          </div>

          {/* Studio links */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E] mb-6">Studio</h4>
            <ul className="space-y-4">
              {['Portfolio', 'Services', 'About', 'Contact', 'Calculator'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}
                    className="text-white/40 text-sm font-light hover:text-[#C9A96E] transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E] mb-6">Services</h4>
            <ul className="space-y-4">
              {['Residential', 'Commercial', 'Turnkey', 'PMC', 'Estimation'].map(item => (
                <li key={item}>
                  <span className="text-white/40 text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E] mb-6">Contact</h4>
            <div className="space-y-4 text-white/40 text-sm font-light">
              <p className="leading-relaxed">Jaipur, Rajasthan, India</p>
              <p>
                <a href="mailto:hello@rkinterior.in" className="hover:text-[#C9A96E] transition-colors">hello@rkinterior.in</a>
              </p>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-white/20 text-[9px] uppercase tracking-[0.25em] font-bold">
            &copy; {year} Sukera -dexterity. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/20 hover:text-[#C9A96E] text-[9px] uppercase tracking-[0.2em] font-bold transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/20 hover:text-[#C9A96E] text-[9px] uppercase tracking-[0.2em] font-bold transition-colors">Terms</Link>
          </div>

          {socials.length > 0 && (
            <div className="flex items-center gap-5">
              {socials.map(({ key, href, Icon }) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={key} onClick={() => trackSocialClick(key)}
                  className="text-white/20 hover:text-[#C9A96E] transition-all duration-200 hover:-translate-y-0.5">
                  <Icon />
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </footer>
  );
};

export default Footer;
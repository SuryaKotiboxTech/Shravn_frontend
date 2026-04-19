"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Refined social icons matching navbar style
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
    { key: 'facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'twitter', href: socialLinks.twitter, Icon: TwitterIcon },
    { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedinIcon },
  ].filter(s => s.href);

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#FAF6EF] relative border-t border-[#C9A84C]/20">
      {/* Top gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14 pt-16 pb-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo2.png"
                alt="Sukera Dexterity"
                className="h-14 object-contain"
              />
            </Link>
            <p className="text-[11px] font-light text-[#5C4A1E] leading-relaxed tracking-wide">
              Crafting exceptional spaces that blend luxury, functionality, and timeless design.
              Transforming visions into architectural masterpieces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5C4A1E] mb-8">
              Quick Links
            </h3>
            <div className="space-y-3">
              {footerLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-[10px] font-medium uppercase tracking-[0.15em] text-[#8B7355] hover:text-[#C9A84C] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5C4A1E] mb-8">
              Contact Info
            </h3>
            <div className="space-y-4 text-[11px] font-light text-[#5C4A1E] leading-relaxed">
              <div>
                <p className="font-medium text-[#8B7355] mb-1">STUDIO ADDRESS</p>
                <p>Jaike-e-Jaipur Chowpatty<br />Sirsi Road, Jaipur - 302012<br />Rajasthan, India</p>
              </div>
              <div>
                <p className="font-medium text-[#8B7355] mb-1">PHONE</p>
                <a href="tel:+918619633247" className="hover:text-[#C9A84C] transition-colors">
                  +91-8619633247
                </a>
              </div>
              <div>
                <p className="font-medium text-[#8B7355] mb-1">EMAIL</p>
                <a href="mailto:sukeradexterity@gmail.com" className="hover:text-[#C9A84C] transition-colors">
                  sukeradexterity@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social & CTA */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5C4A1E] mb-8">
              Follow Us
            </h3>

            {/* Social Icons */}
            {socials.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                {socials.map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    onClick={() => trackSocialClick(key)}
                    className="text-[#8B7355] hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-[9px] font-black uppercase tracking-[0.2em] px-6 py-3 bg-[#B8872A] text-[#FAF6EF] hover:bg-[#3D2E0A] transition-all duration-300 shadow-[0_2px_16px_rgba(180,130,40,0.2)] hover:shadow-[0_4px_20px_rgba(60,40,10,0.25)]"
            >
              Start Project
            </Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#C9A84C]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B7355] font-light">
              © {year} Sukera Dexterity. All rights reserved.
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B7355] font-light">
              Designed & Developed by{' '}
              <a
                href="#"
                className="text-[#C9A84C] hover:text-[#B8872A] transition-colors font-medium"
              >
                Nine Degree
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom gold line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
    </footer>
  );
};

export default Footer;
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';

import MissionVision from '../components/MissionVision';
import FeaturedProjects from '../components/FeaturedProjects';

const services = [
  {
    num: '01',
    title: 'Residential Design',
    desc: 'Bespoke living spaces that reflect your personality — from concept to a fully-styled sanctuary.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    num: '02',
    title: 'Commercial Spaces',
    desc: 'Dynamic environments that inspire productivity, impress clients, and embody your brand identity.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    num: '03',
    title: 'Architecture & PMC',
    desc: 'End-to-end project management, contractor coordination, and on-site quality supervision.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    num: '04',
    title: 'Cost Estimation',
    desc: 'Precision budgeting with transparent breakdowns. Know your numbers before the first brick is laid.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
];

const process = [
  { num: '01', title: 'Discovery', desc: 'We listen, analyse, and immerse ourselves in your vision and lifestyle.' },
  { num: '02', title: 'Concept', desc: 'Spatial layouts, mood boards, and 3D previews that define the direction.' },
  { num: '03', title: 'Execution', desc: 'Procurement, contractor management, and meticulous quality audits.' },
  { num: '04', title: 'Handover', desc: 'A curated reveal of your new space, followed by ongoing partnership.' },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '2M+', label: 'Social Followers' },
];

const specialConditions = [
  { title: 'Support After Completion', desc: 'Our team stays with you even after the project is delivered — continuous care and support.', icon: <CheckCircle className="w-8 h-8 text-[#C9A96E]" /> },
  { title: 'Familiar Premium Service', desc: 'Maintain your lifestyle while we transform your space with zero disruption.', icon: <CheckCircle className="w-8 h-8 text-[#C9A96E]" /> },
  { title: 'Personal Design Expert', desc: 'A dedicated architect is your single point of contact throughout the journey.', icon: <CheckCircle className="w-8 h-8 text-[#C9A96E]" /> },
  { title: 'Special Attention', desc: 'Enhanced service class for discerning clients who expect nothing but excellence.', icon: <CheckCircle className="w-8 h-8 text-[#C9A96E]" /> },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#0A0A0A] selection:bg-[#C9A96E] selection:text-black">

      {/* ── 1. CINEMATIC HERO ───────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/30" />
          {/* Gold vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 pb-24 pt-48"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-[10px] font-black uppercase tracking-[0.4em]">Award-Winning Interior Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-black text-white tracking-tighter leading-[0.9] mb-10 font-serif">
              Spaces<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>That</span><br />
              <span className="text-[#C9A96E]">Inspire.</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/portfolio"
                className="group flex items-center gap-3 px-8 py-4 bg-[#C9A96E] text-[#0A0A0A] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-300">
                View Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact"
                className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300">
                Free Consultation
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl lg:text-4xl font-black text-white font-serif mb-1">{s.value}</div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-[#C9A96E] font-bold">{s.label}</div>
              </div>
            ))}
          </motion.div> */}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-12 z-10 flex flex-col items-center gap-3">
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#C9A96E] to-transparent" />
        </div>
      </section>

      {/* ── 2. ABOUT / WHO WE ARE ─ Zigzag ─────────────────── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Left image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
                  alt="Studio Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
                {/* Overlapping stat card */}
                <div className="absolute -right-8 bottom-16 bg-[#0A0A0A] border-l-4 border-[#C9A96E] p-8 shadow-2xl z-10">
                  <div className="text-6xl font-black text-white font-serif leading-none mb-2">15<span className="text-[#C9A96E]">+</span></div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Years of<br />Excellence</div>
                </div>
              </div>
            </motion.div>

            {/* Right text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex flex-col justify-center lg:pl-20 pt-12 lg:pt-0"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-[#C9A96E]" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">The Studio</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[1.0] mb-8 font-serif">
                Crafting Spaces<br />
                <span className="text-[#0A0A0A]/30 font-light italic">Beyond Ordinary.</span>
              </h2>
              <div className="space-y-5 text-[#0A0A0A]/60 text-base leading-relaxed font-light mb-12">
                <p>
                  At Sukera -dexterity, every space begins with a deep focus on detail — the foundation of exceptional design. From material selection to finishing touches, each element is carefully considered and thoughtfully executed.
                </p>
                <p>
                  Our approach merges architectural rigor with curated aesthetics — combining premium materials and meticulous attention to detail to create environments that embody elegance and individuality.
                </p>
              </div>
              <Link href="/about"
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A96E] hover:text-[#0A0A0A] transition-colors group">
                Discover Our Story
                <span className="w-10 h-px bg-current group-hover:w-14 transition-all duration-300" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS ────────────────────────────── */}
      <FeaturedProjects />

      {/* ── 4. SERVICES ─ Zigzag Cards ──────────────────────── */}
      <section className="py-32 bg-[#0A0A0A]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#C9A96E]" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">Capabilities</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight font-serif">Our Expertise</h2>
            </div>
            <p className="text-white/40 max-w-md text-sm leading-relaxed">
              Comprehensive design solutions from conceptual architecture to final interior details — tailored to your vision.
            </p>
          </motion.div>

          {/* Zigzag service cards */}
          <div className="space-y-0">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`group flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} border-b border-white/5 hover:border-[#C9A96E]/30 transition-colors duration-500`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-auto lg:h-[380px] overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/20 transition-colors duration-500" />
                  {/* Number overlay */}
                  <div className="absolute top-6 left-6 text-6xl font-black text-white/10 font-serif">{service.num}</div>
                </div>

                {/* Content */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center p-10 lg:p-16 ${idx % 2 === 0 ? '' : ''} bg-[#111111] group-hover:bg-[#141414] transition-colors duration-500`}>
                  <div className="text-[9px] font-black text-[#C9A96E] tracking-[0.4em] uppercase mb-4">Service {service.num}</div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white font-serif mb-6 leading-tight">{service.title}</h3>
                  <p className="text-white/40 text-base leading-relaxed font-light mb-8">{service.desc}</p>
                  <Link href="/services"
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A96E] hover:text-white transition-colors group/btn">
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ──────────────────────────────────────── */}
     <section className="py-32 bg-white relative overflow-hidden border-t border-stone-200">
        {/* BG image with overlay */}
        <div className="absolute inset-0 z-0 opacity-5">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=60" alt="Process Background" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-[#C9A96E]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">Methodology</span>
              <div className="w-10 h-px bg-[#C9A96E]" />
            </div>
            
            {/* New Premium Heading */}
            <h2 className="text-4xl lg:text-6xl font-serif text-[#0A0A0A] mb-6 leading-tight">
              From Concept to <span className="italic font-light text-[#0A0A0A]/60">Creation.</span>
            </h2>
            
            {/* Added Sub-heading for context */}
            <p className="text-[#0A0A0A]/50 font-light max-w-2xl mx-auto text-lg">
              A structured, transparent approach to bringing your visionary spaces to life.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 shadow-xl">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 hover:bg-[#0A0A0A] group transition-all duration-500 relative overflow-hidden cursor-pointer"
              >
                {/* Giant Background Number */}
                <div className="absolute -right-4 -bottom-4 text-9xl font-black text-[#0A0A0A]/[0.03] group-hover:text-[#C9A96E]/10 transition-colors duration-500 font-serif select-none">
                  {step.num}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-[10px] font-black text-[#C9A96E] tracking-[0.3em] uppercase mb-6">
                    Phase {step.num}
                  </div>
                  <h3 className="text-2xl font-serif text-[#0A0A0A] group-hover:text-white mb-4 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#0A0A0A]/50 group-hover:text-white/60 text-sm leading-relaxed font-light transition-colors">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. SPECIAL CONDITIONS ── Dark cards ─────────────── */}
      <section className="py-32 bg-[#0A0A0A]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#C9A96E]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">Why Choose Us</span>
              <div className="w-8 h-[2px] bg-[#C9A96E]" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight font-serif">
              Special Conditions For <span className="text-[#C9A96E]">Your</span> Project
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {specialConditions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111111] hover:bg-[#141414] p-12 lg:p-16 flex items-start gap-8 group border border-transparent hover:border-[#C9A96E]/20 transition-all duration-500"
              >
                <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-black text-[#C9A96E] uppercase tracking-[0.1em] mb-4">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MISSION & VISION ─────────────────────────────── */}
      <MissionVision />

      {/* ── 8. SOCIAL PROOF BANNER ──────────────────────────── */}
     <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury Interior Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/90" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          
          {/* Main Massive Metric */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-10 h-px bg-[#C9A96E]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">Our Community</span>
              <div className="w-10 h-px bg-[#C9A96E]" />
            </div>

            <div className="text-[12vw] sm:text-[10vw] font-serif text-white leading-none mb-6">
              2,000,000<span className="text-[#C9A96E] font-light">+</span>
            </div>
            
            <p className="text-white/50 text-base md:text-lg font-light tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
              People constantly follow our design journey and studio developments worldwide.
            </p>
          </motion.div>

          {/* Premium Glassmorphism Stat Cards (Replacing Emojis) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { platform: "Instagram", num: "1.2M+", label: "Followers" },
              { platform: "Pinterest", num: "5M+", label: "Monthly Views" },
              { platform: "YouTube", num: "300K+", label: "Subscribers" },
              { platform: "Newsletter", num: "50K+", label: "Design Insiders" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 hover:bg-white/[0.05] hover:border-[#C9A96E]/50 transition-all duration-500 group cursor-pointer flex flex-col items-center justify-center"
              >
                <div className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {stat.platform}
                </div>
                <div className="text-3xl md:text-4xl font-serif text-white mb-2 transition-transform duration-500 group-hover:scale-105">
                  {stat.num}
                </div>
                <div className="text-white/40 text-[10px] md:text-xs font-light uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 9. CTA ──────────────────────────────────────────── */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=60" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
                  alt="Architecture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1200ms]"
                />
              </div>
              {/* Gold frame accent */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#C9A96E]/30 -z-10" />
            </motion.div>

            {/* Right content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-[#C9A96E]" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">Get Started</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight font-serif leading-[1.05] mb-8">
                Take a Step Into<br />
                <span className="text-[#C9A96E]">Our World.</span>
              </h2>
              <p className="text-[#0A0A0A]/50 text-base leading-relaxed font-light mb-8 max-w-md">
                A place where your ideas take shape in our studio's original designs. We look forward to embarking on this inspiring journey and bringing your project to life.
              </p>
              <div className="space-y-3 mb-10">
                {['24hr Response Time', 'Senior Design Experts', 'Transparent Budgeting'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#0A0A0A]/60">
                    <CheckCircle className="w-4 h-4 text-[#C9A96E]" /> {item}
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-300">
                Book Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
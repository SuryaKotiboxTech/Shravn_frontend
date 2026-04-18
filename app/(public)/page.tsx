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
  { title: 'Support After Completion', desc: 'Our team stays with you even after the project is delivered — continuous care and support.' },
  { title: 'Familiar Premium Service', desc: 'Maintain your lifestyle while we transform your space with zero disruption.' },
  { title: 'Personal Design Expert', desc: 'A dedicated architect is your single point of contact throughout the journey.' },
  { title: 'Special Attention', desc: 'Enhanced service for discerning clients who expect nothing but excellence.' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#FAF6EF]">

      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden bg-[#F5EDD8] pt-24">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EF] via-[#FAF6EF]/50 to-[#FAF6EF]/10" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1700px] mx-auto px-6 lg:px-14 pb-24 pt-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-[1.5px] bg-[#C9A84C]" />
              <span className="text-[#A07828] text-[10px] font-bold uppercase tracking-[0.42em]">Sukera Dexterity Design Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-bold text-[#2C1F0A] tracking-tight leading-[0.88] mb-10 font-serif">
              Spaces<br />
              <span className="text-[#B8872A]">We've Transformed</span><br />
              Into Reality.
            </h1>

            <p className="text-[#6B5530] text-lg leading-relaxed mb-12 max-w-xl font-light">
              Thoughtfully designed. Beautifully executed. Timeless elegance meets modern functionality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/portfolio"
                className="group flex items-center gap-3 px-8 py-4 bg-[#B8872A] text-[#FAF6EF] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#2C1F0A] transition-all duration-300 shadow-[0_4px_30px_rgba(180,130,40,0.3)] hover:shadow-[0_4px_30px_rgba(44,31,10,0.3)]"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 px-8 py-4 border-2 border-[#C9A84C]/50 text-[#6B5530] text-[10px] font-bold uppercase tracking-[0.3em] hover:border-[#B8872A] hover:text-[#B8872A] transition-all duration-300"
              >
                Free Consultation
              </Link>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-[#C9A84C]/25 grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="text-3xl lg:text-4xl font-bold text-[#2C1F0A] font-serif mb-2 group-hover:text-[#B8872A] transition-colors">{s.value}</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-[#9A7840] font-bold">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 right-12 z-10 flex flex-col items-center gap-3 opacity-50 hover:opacity-90 transition-opacity">
            <span className="text-[8px] uppercase tracking-[0.4em] text-[#9A7840] font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent" />
          </div>
        </motion.div>
      </section>


  <section className="bg-[#F5EDD8]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14 pt-28 pb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Featured Works</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] tracking-tight font-serif mb-4">
            Our Creations & Concepts
          </h2>
          <p className="text-[#7A6040] text-lg font-light">
            Designing spaces that inspire and endure.
          </p>
        </div>
      </section>
      <FeaturedProjects />
      {/* ── 2. ABOUT ── */}
      <section className="py-32 bg-[#FAF6EF] overflow-hidden border-t border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Left image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_20px_80px_rgba(140,100,20,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
                  alt="Studio Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
                {/* Floating stat card */}
                <div className="absolute -right-8 bottom-16 bg-[#B8872A] text-[#FAF6EF] border-l-4 border-[#8A6020] p-8 shadow-2xl z-10">
                  <div className="text-6xl font-bold font-serif leading-none mb-2">
                    15<span className="text-[#FAF6EF]/60">+</span>
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.3em] font-bold">Years of<br />Excellence</div>
                </div>
              </div>
            </motion.div>

            {/* Right text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex flex-col justify-center lg:pl-20 pt-14 lg:pt-0"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Designed Around You</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] tracking-tight leading-[1.0] mb-8 font-serif">
                Crafting Spaces<br />
                <span className="text-[#9A7840] font-normal italic">Beyond Ordinary.</span>
              </h2>

              <p className="text-[#6B5530] text-base leading-relaxed font-light mb-12 max-w-lg">
                At Sukera Dexterity & SP Architects, we design spaces that feel as good as they look. With a focus on creativity, functionality, and detail, we create interiors tailored to your lifestyle — where every space is thoughtfully designed and uniquely yours.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8872A] hover:text-[#2C1F0A] transition-colors group"
              >
                Discover Our Story
                <span className="w-10 h-px bg-current group-hover:w-14 transition-all duration-300" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS ── */}
    

      {/* ── 4. SERVICES ── */}
      <section className="py-32 bg-[#FAF6EF] border-t border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Our Proficiency</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight font-serif text-[#2C1F0A]">
                Shaping spaces with<br />knowledge, creativity,<br />and precision.
              </h2>
            </div>
            <p className="text-[#7A6040] max-w-md text-sm leading-relaxed font-light">
              Design That Performs. Our approach covers every stage of your project — from design consultation to complete turnkey execution, making the entire process simple and stress-free.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="space-y-0">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`group flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} border-b border-[#C9A84C]/25 hover:border-[#C9A84C]/70 transition-colors duration-500`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-auto lg:h-[360px] overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-[#2C1F0A]/30 group-hover:bg-[#2C1F0A]/15 transition-colors duration-500" />
                  <div className="absolute top-6 left-6 text-7xl font-bold text-[#FAF6EF]/10 font-serif">{service.num}</div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-10 lg:p-16 bg-[#F5EDD8] group-hover:bg-[#FAF6EF] transition-colors duration-500">
                  <div className="text-[9px] font-bold text-[#A07828] tracking-[0.4em] uppercase mb-4">Service {service.num}</div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#2C1F0A] font-serif mb-6 leading-tight">{service.title}</h3>
                  <p className="text-[#7A6040] text-base leading-relaxed font-light mb-8">{service.desc}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8872A] hover:text-[#2C1F0A] transition-colors group/btn"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ── */}
      <section className="py-32 bg-[#2C1F0A]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">Methodology</span>
              <div className="w-10 h-px bg-[#C9A84C]" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-[#FAF6EF] mb-6 leading-tight font-serif">
              From Concept to{' '}
              <span className="italic font-normal text-[#C9A84C]">Creation.</span>
            </h2>

            <p className="text-[#C4A97A] font-light max-w-2xl mx-auto text-lg">
              A structured, transparent approach to bringing your visionary spaces to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#3D2E0A]/80 border border-[#C9A84C]/20 p-10 hover:border-[#C9A84C]/60 hover:bg-[#3D2E0A] group transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -right-3 -bottom-3 text-[110px] font-bold text-[#C9A84C]/[0.06] group-hover:text-[#C9A84C]/[0.1] transition-colors duration-500 font-serif select-none leading-none">
                  {step.num}
                </div>

                <div className="relative z-10">
                  <div className="text-[10px] font-bold text-[#C9A84C] tracking-[0.3em] uppercase mb-6">
                    Phase {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-[#FAF6EF] font-serif group-hover:text-[#C9A84C] mb-4 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#C4A97A] text-sm leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US ── */}
      <section className="py-32 bg-[#F5EDD8]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Why Choose Us</span>
              <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] tracking-tight font-serif">
              Special Conditions For{' '}
              <span className="text-[#B8872A]">Your</span> Project
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {specialConditions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#FAF6EF] border border-[#C9A84C]/25 hover:border-[#C9A84C]/70 p-8 flex items-start gap-6 group transition-all duration-500 hover:shadow-[0_8px_40px_rgba(180,130,40,0.1)]"
              >
                <CheckCircle className="w-7 h-7 text-[#C9A84C] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-base font-bold text-[#2C1F0A] uppercase tracking-[0.08em] mb-2 group-hover:text-[#B8872A] transition-colors">{item.title}</h3>
                  <p className="text-[#7A6040] text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MISSION & VISION ── */}
      <MissionVision />

      {/* ── 8. STUDIO INFO ── */}
      <section className="py-32 bg-[#FAF6EF] border-t border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Studio Information</span>
              <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] tracking-tight font-serif mb-4">
              Visit Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Address', icon: '📍', text: 'Jaike-e-Jaipur Chowpatty, Sirsi Road, Jaipur' },
              { title: 'Call Us', icon: '☎️', text: '+91-8619633247' },
              { title: 'Email Us', icon: '✉️', text: 'sukeradexterity@gmail.com' },
              { title: 'Business Hours', icon: '🕐', text: 'Monday to Friday\n11:00 AM to 6:00 PM' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#F5EDD8] border border-[#C9A84C]/25 hover:border-[#C9A84C]/70 p-8 hover:shadow-[0_8px_40px_rgba(180,130,40,0.1)] transition-all duration-500 group"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-[#B8872A] text-base font-bold uppercase tracking-[0.1em] mb-3 group-hover:text-[#2C1F0A] transition-colors">{item.title}</h3>
                <p className="text-[#7A6040] text-sm leading-relaxed whitespace-pre-line font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. SOCIAL PROOF ── */}
      <section className="relative py-32 lg:py-48 overflow-hidden bg-[#2C1F0A]">
        {/* Background texture */}
        <div className="absolute inset-0 z-0 opacity-[0.06]">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.08),transparent)]" />

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 lg:px-14 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-10 h-px bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">Our Community</span>
              <div className="w-10 h-px bg-[#C9A84C]" />
            </div>

            <div className="text-[14vw] sm:text-[11vw] font-bold font-serif text-[#FAF6EF] leading-none mb-6">
              2,000,000<span className="text-[#C9A84C] font-normal">+</span>
            </div>

            <p className="text-[#C4A97A] text-base md:text-lg font-light tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
              People constantly follow our design journey and studio developments worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { platform: 'Instagram', num: '1.2M+', label: 'Followers' },
              { platform: 'Pinterest', num: '5M+', label: 'Monthly Views' },
              { platform: 'YouTube', num: '300K+', label: 'Subscribers' },
              { platform: 'Newsletter', num: '50K+', label: 'Design Insiders' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#3D2E0A]/80 border border-[#C9A84C]/20 p-8 hover:border-[#C9A84C]/60 hover:bg-[#3D2E0A] transition-all duration-500 group cursor-pointer"
              >
                <div className="text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{stat.platform}</div>
                <div className="text-3xl md:text-4xl font-bold text-[#FAF6EF] font-serif mb-2 group-hover:text-[#C9A84C] transition-colors">{stat.num}</div>
                <div className="text-[#C4A97A] text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="py-32 bg-[#FAF6EF] border-t border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden shadow-[0_20px_80px_rgba(140,100,20,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
                  alt="Architecture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1200ms]"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-full h-full border-[3px] border-[#C9A84C]/30 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Get Started</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] tracking-tight font-serif leading-[1.05] mb-8">
                Take a Step Into<br />
                <span className="text-[#B8872A]">Our World.</span>
              </h2>

              <p className="text-[#6B5530] text-base leading-relaxed font-light mb-8 max-w-md">
                A place where your ideas take shape in our studio's original designs. We look forward to embarking on this inspiring journey and bringing your project to life.
              </p>

              <div className="space-y-3 mb-10">
                {['24hr Response Time', 'Senior Design Experts', 'Transparent Budgeting'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#6B5530]">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C]" /> {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[#2C1F0A] text-[#FAF6EF] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B8872A] transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(180,130,40,0.3)]"
              >
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
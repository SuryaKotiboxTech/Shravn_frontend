"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative bg-[#F5EDD8] overflow-hidden">

      {/* Decorative watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[28vw] font-bold text-[#C9A84C]/[0.05] leading-none tracking-tighter font-serif">SD</span>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top ornamental border */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center pt-24 pb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-14 bg-[#C9A84C]" />
            <span className="text-[#A07828] text-[9px] font-bold uppercase tracking-[0.45em]">Philosophy</span>
            <div className="h-px w-14 bg-[#C9A84C]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#2C1F0A] uppercase tracking-tight leading-none font-serif">
            Our Design{' '}
            <span className="italic font-normal text-[#B8872A]">Philosophy</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">

          {/* Mission Card */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative bg-[#FAF6EF] border-2 border-[#C9A84C]/30 hover:border-[#C9A84C]/70 p-12 lg:p-16 group overflow-hidden transition-all duration-500 shadow-[0_8px_50px_rgba(180,130,40,0.08)]"
          >
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-28 h-28 border-t-2 border-r-2 border-[#C9A84C]/40 group-hover:border-[#C9A84C]/80 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-28 h-28 border-b-2 border-l-2 border-[#C9A84C]/40 group-hover:border-[#C9A84C]/80 transition-colors duration-700" />
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#C9A84C]/[0.06] rounded-full blur-3xl group-hover:bg-[#C9A84C]/[0.12] transition-colors duration-1000" />

            {/* Background image on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=60" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-7xl font-bold text-[#C9A84C]/20 leading-none font-serif">01</span>
                <div>
                  <p className="text-[#A07828] text-[9px] font-bold uppercase tracking-[0.4em] mb-2">Our Mission</p>
                  <div className="h-[1.5px] w-16 bg-[#C9A84C]" />
                </div>
              </div>

              <h3 className="text-3xl xl:text-4xl font-bold text-[#2C1F0A] uppercase leading-tight tracking-tight mb-6 font-serif">
                Design That<br />
                <span className="text-[#B8872A] italic font-normal">Transcends</span><br />
                Time
              </h3>

              <p className="text-[#6B5530] text-base leading-relaxed font-light mb-10 max-w-md">
                We craft sophisticated spaces where elegance meets precision. Through curated materials, refined detailing, and a focus on timeless design, we create interiors that exude luxury while remaining functional and enduring.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#C9A84C]/20">
                {[{ v: '500+', l: 'Projects' }, { v: '15+', l: 'Years' }, { v: '100%', l: 'Satisfaction' }].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-[#B8872A] font-serif mb-1">{s.v}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#9A7840] font-bold">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative bg-[#2C1F0A] border-2 border-[#C9A84C]/20 hover:border-[#C9A84C]/60 p-12 lg:p-16 group overflow-hidden transition-all duration-500 shadow-[0_8px_50px_rgba(44,31,10,0.2)]"
          >
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-28 h-28 border-t-2 border-r-2 border-[#C9A84C]/20 group-hover:border-[#C9A84C]/60 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-28 h-28 border-b-2 border-l-2 border-[#C9A84C]/20 group-hover:border-[#C9A84C]/60 transition-colors duration-700" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#C9A84C]/[0.06] rounded-full blur-3xl group-hover:bg-[#C9A84C]/[0.12] transition-colors duration-1000" />

            {/* Background image on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=60" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-7xl font-bold text-[#C9A84C]/20 leading-none font-serif">02</span>
                <div>
                  <p className="text-[#C9A84C] text-[9px] font-bold uppercase tracking-[0.4em] mb-2">Our Vision</p>
                  <div className="h-[1.5px] w-16 bg-[#C9A84C]" />
                </div>
              </div>

              <h3 className="text-3xl xl:text-4xl font-bold text-[#FAF6EF] uppercase leading-tight tracking-tight mb-6 font-serif">
                Shaping The<br />
                <span className="text-[#C9A84C] italic font-normal">Future</span> Of<br />
                Living
              </h3>

              <p className="text-[#C4A97A] text-base leading-relaxed font-light mb-10 max-w-md">
                Inspiring spaces with lasting impact. Developing environments that combine visual appeal, functionality, and durability — ensuring they influence users positively and perform efficiently in the long run.
              </p>

              <div className="space-y-4 pt-8 border-t border-[#C9A84C]/20">
                {['Global Recognition', 'Timeless Craft', 'Client-First Approach'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#C9A84C] rotate-45 flex-shrink-0" />
                    <span className="text-[#E8D5A8] text-xs uppercase tracking-[0.18em] font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
    </section>
  );
}
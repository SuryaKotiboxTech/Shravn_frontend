"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="relative bg-[#F7FBFF] py-32 overflow-hidden border-t border-[#5B96D1]/20">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative z-10"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#5B96D1]" />
            <span className="text-[#5A7BC1] text-[9px] font-bold uppercase tracking-[0.4em]">Core Philosophy</span>
            <div className="h-px w-12 bg-[#5B96D1]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D325E] tracking-tight leading-[1.1] font-serif">
            Our Purpose & <br />
            <span className="italic font-normal text-[#9A7840]">Future Trajectory.</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Mission Card (Light) */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative bg-[#EFF5FF] p-12 lg:p-16 group transition-all duration-700 hover:shadow-[0_20px_60px_rgba(180,130,40,0.08)]"
          >
            {/* Elegant Inner Frame */}
            <div className="absolute inset-4 border border-[#5B96D1]/20 pointer-events-none transition-colors duration-500 group-hover:border-[#5B96D1]/50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-16">
                <span className="text-6xl font-bold text-[#5B96D1]/30 leading-none font-serif group-hover:text-[#5B96D1]/60 transition-colors duration-500">I</span>
                <p className="text-[#5A7BC1] text-[9px] font-bold uppercase tracking-[0.4em]">The Mandate</p>
              </div>

              <h3 className="text-3xl xl:text-4xl font-bold text-[#1D325E] leading-tight tracking-tight mb-6 font-serif">
                Elevating the <br />
                <span className="text-[#2660A2] italic font-normal">Standard</span> of Living
              </h3>

              <p className="text-[#4A6E9A] text-sm leading-relaxed font-light mb-12 max-w-md">
                We are dedicated to crafting spaces that seamlessly blend aesthetic brilliance with everyday functionality. Our mission is to transform environments into bespoke sanctuaries that perfectly reflect the unique identity of those who inhabit them.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#5B96D1]/20">
                {[{ v: '500+', l: 'Spaces' }, { v: '15+', l: 'Years' }, { v: '100%', l: 'Precision' }].map((s, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold text-[#1D325E] font-serif mb-1 group-hover:text-[#2660A2] transition-colors">{s.v}</div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-[#5A7BC1] font-bold">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision Card (Ultra-Light) */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative bg-[#F7FBFF] border border-[#5B96D1]/20 p-12 lg:p-16 group transition-all duration-700 hover:shadow-[0_20px_60px_rgba(180,130,40,0.08)] hover:border-[#5B96D1]/50 hover:bg-[#EFF5FF]"
          >
            {/* Elegant Inner Frame */}
            <div className="absolute inset-4 border border-[#5B96D1]/10 pointer-events-none transition-colors duration-500 group-hover:border-[#5B96D1]/40" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-16">
                <span className="text-6xl font-bold text-[#5B96D1]/30 leading-none font-serif group-hover:text-[#5B96D1]/60 transition-colors duration-500">II</span>
                <p className="text-[#5A7BC1] text-[9px] font-bold uppercase tracking-[0.4em]">The Horizon</p>
              </div>

              <h3 className="text-3xl xl:text-4xl font-bold text-[#1D325E] leading-tight tracking-tight mb-6 font-serif">
                Pioneering <br />
                <span className="text-[#2660A2] italic font-normal">Architectural</span> Legacy
              </h3>

              <p className="text-[#4A6E9A] text-sm leading-relaxed font-light mb-12 max-w-md flex-grow">
                To be the global benchmark in luxury architecture and interior design. We envision a future where our creations not only define modern elegance but stand as enduring landmarks of sustainable and innovative design.
              </p>

              <div className="space-y-4 pt-8 border-t border-[#5B96D1]/20">
                {['Global Design Influence', 'Sustainable Luxury', 'Uncompromising Quality'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1 h-1 rounded-full bg-[#5B96D1] flex-shrink-0" />
                    <span className="text-[#1D325E] text-[10px] uppercase tracking-[0.2em] font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
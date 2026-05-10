"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight, Award, TrendingUp, Star, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const stats = [
    { value: '500+', label: 'Projects Delivered', icon: TrendingUp },
    { value: '15+', label: 'Years Experience', icon: Star },
    { value: '100%', label: 'Client Satisfaction', icon: Users },
    { value: '25+', label: 'Global Awards', icon: Award },
  ];

  const services = [
    {
      num: 'I',
      label: 'RESIDENTIAL',
      title: 'Bespoke Residential Spaces',
      desc: 'We specialize in crafting bespoke living spaces that are both luxurious and liveable. From ground-up residential builds to complete home transformations, our approach ensures your sanctuary is a true reflection of your personality and lifestyle.',
      features: ["Custom Villa & Home Design", "Kitchen & Bathroom Remodeling", "Master Bedroom Sanctuaries", "Spatial Planning & Flow"],
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      cta: 'Discuss Your Home',
    },
    {
      num: 'II',
      label: 'COMMERCIAL',
      title: 'Dynamic Commercial Environments',
      desc: 'Your commercial space is an extension of your brand. We design dynamic environments that inspire productivity, impress clients, and foster growth — from modern corporate offices to inviting hospitality venues.',
      features: ["Corporate Office Strategy", "Retail Store Environments", "Hospitality & Restaurant Ambience", "Brand Integration"],
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      cta: 'Elevate Your Workspace',
    },
    {
      num: 'III',
      label: 'PMC',
      title: 'Project Management & Consultancy',
      desc: 'Protect your investment. As your Project Management Consultants, we act as your direct representative on-site. We oversee contractors, manage strict timelines, audit budgets, and ensure that execution flawlessly matches the architectural intent.',
      features: ["Timeline Management", "Contractor Coordination", "Site Quality Audits", "Feasibility Studies"],
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200',
      cta: 'Protect Your Investment',
    },
    {
      num: 'IV',
      label: 'ESTIMATION',
      title: 'Precision Cost Estimation',
      desc: 'Precise budgeting and cost estimation for your interior design projects. We provide detailed financial planning, material cost analysis, and comprehensive project estimates to ensure absolute transparency.',
      features: ["Detailed Cost Breakdown", "Material Estimates", "Budget Optimization", "Financial Feasibility"],
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200',
      cta: 'Get Your Estimate',
    },
  ];

  const designProcessSteps = [
    { num: '01', title: "Concept Design", desc: "Understanding lifestyle, defining vision, and setting the aesthetic direction through initial mood boards and sketches.", duration: "2-4 weeks" },
    { num: '02', title: "Schematic Layout", desc: "Translating concepts into 2D spatial realities, exploring structural modifications, and curating material palettes.", duration: "3-6 weeks" },
    { num: '03', title: "Detailed 3D Design", desc: "Refining exact finishes, custom millwork, and providing highly detailed 3D photorealistic renderings of the space.", duration: "4-8 weeks" },
    { num: '04', title: "Technical Blueprints", desc: "Producing precise master guides and construction drawings to ensure flawless execution by builders and contractors.", duration: "2-4 weeks" },
    { num: '05', title: "Execution & Styling", desc: "Managing procurement, conducting site-audits, staging the furniture, and the final handover of your completed sanctuary.", duration: "8-24 weeks" },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F7FBFF]">

      {/* ── 1. EDITORIAL HERO WITH OVERLAPPING CARDS ── */}
      <section ref={heroRef} className="relative pt-32 pb-32 lg:pt-12 lg:pb-48 overflow-hidden bg-[#EFF5FF]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14 flex flex-col items-center text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#5B96D1]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5A7BC1]">Our Capabilities</span>
              <div className="w-12 h-[1px] bg-[#5B96D1]" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[90px] font-bold text-[#1D325E] tracking-tight leading-[1.05] font-serif mb-8">
              Our Proficiency
            </h1>
            
            <p className="text-[#4A6E9A] text-base lg:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-16">
              Shaping spaces with knowledge, creativity, and precision.
            </p>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-[1600px] mx-auto h-[50vh] lg:h-[60vh] px-6 lg:px-14 z-10">
          <motion.div style={{ y: heroY }} className="w-full h-full overflow-hidden shadow-[0_20px_80px_rgba(180,130,40,0.15)] relative">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920"
              alt="Sophisticated Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1D325E]/10" />
          </motion.div>
        </div>

        {/* Overlapping Stat Cards */}
        <div className="relative z-30 max-w-[1500px] mx-auto px-6 lg:px-14 -mt-16 lg:-mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                className="bg-[#F7FBFF]/90 backdrop-blur-md border border-[#5B96D1]/30 p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(201,168,76,0.08)] group hover:bg-[#1D325E] transition-colors duration-500"
              >
                <s.icon className="w-6 h-6 text-[#5B96D1] mb-4 group-hover:text-[#F7FBFF] transition-colors duration-500" strokeWidth={1.5} />
                <div className="text-3xl lg:text-4xl font-bold text-[#1D325E] font-serif mb-2 group-hover:text-[#5B96D1] transition-colors duration-500">{s.value}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A7BC1] group-hover:text-[#F7FBFF]/70 transition-colors duration-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1.5. DESIGN THAT PERFORMS ── */}
      <section className="py-20 bg-[#EFF5FF]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-[#1D325E] font-serif mb-6 leading-tight">
            Design That Performs
          </h2>
          <p className="text-[#4A6E9A] text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Our approach covers every stage of your project with tailored solutions. Starting from design consultation to complete turnkey execution, we focus on creating refined spaces while making the entire process simple and stress-free.
          </p>
        </div>
      </section>

      {/* ── 2. CORE CAPABILITIES (LIGHT ZIG-ZAG) ── */}
      <section className="py-32 lg:py-48 bg-[#F7FBFF] relative">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          
          <div className="text-center mb-24 lg:mb-40">
            <h2 className="text-4xl lg:text-6xl font-bold text-[#1D325E] font-serif mb-6 leading-tight">
              Our Core <span className="text-[#2660A2] italic font-normal">Disciplines.</span>
            </h2>
            <p className="text-[#4A6E9A] text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We move beyond standard layouts, offering end-to-end solutions that guarantee structural integrity and breathtaking aesthetics.
            </p>
          </div>

          <div className="space-y-32 lg:space-y-48">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                  
                  {/* Image with Inner Frame */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 relative"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden group shadow-[0_20px_60px_rgba(180,130,40,0.1)]">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out" />
                      
                      {/* Elegant Inner Frame */}
                      <div className="absolute inset-5 border border-[#F7FBFF]/30 z-10 pointer-events-none transition-colors duration-700 group-hover:border-[#5B96D1]/60" />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D325E]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      {/* Giant Number Overlay */}
                      <div className="absolute top-6 right-8 text-6xl lg:text-8xl font-bold text-[#F7FBFF]/90 font-serif drop-shadow-lg">
                        {service.num}
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-[1px] bg-[#5B96D1]" />
                      <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5A7BC1]">
                        {service.label}
                      </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D325E] font-serif mb-8 leading-[1.1]">
                      {service.title}
                    </h3>
                    
                    <p className="text-[#4A6E9A] text-base lg:text-lg font-light leading-relaxed mb-10 max-w-xl">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#5B96D1] mt-0.5" />
                          <span className="text-[#4A6E9A] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2660A2] hover:text-[#1D325E] transition-colors group">
                      {service.cta}
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 3. METHODOLOGY ── */}
      <section className="py-32 lg:py-40 bg-[#EFF5FF] relative border-t border-[#5B96D1]/20">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-14">
          
          <div className="mb-20 lg:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-bold text-[#1D325E] font-serif mb-6 leading-tight">
                Our <span className="italic font-normal text-[#2660A2]">Methodology.</span>
              </h2>
              <p className="text-[#4A6E9A] text-base lg:text-lg font-light leading-relaxed">
                A systematic, phased approach ensuring absolute precision from the first sketch to the final installation. We leave nothing to chance.
              </p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-[#5B96D1]" />
          </div>

          <div className="flex flex-col">
            {designProcessSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-12 py-10 lg:py-14 border-t border-[#5B96D1]/30 hover:border-[#5B96D1] transition-colors duration-500"
              >
                <div className="text-5xl lg:text-7xl font-bold font-serif w-24 lg:w-32 flex-shrink-0 text-[#5B96D1]/40 group-hover:text-[#5B96D1] transition-colors duration-500">
                  {step.num}
                </div>
                
                <div className="flex-1 pr-0 md:pr-12">
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#1D325E] font-serif mb-3 group-hover:text-[#2660A2] transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-[#4A6E9A] text-sm lg:text-base font-light leading-relaxed max-w-3xl">
                    {step.desc}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1 flex-shrink-0 mt-4 md:mt-0">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5A7BC1]">Duration</span>
                  <span className="text-sm font-bold text-[#1D325E]">{step.duration}</span>
                </div>
              </motion.div>
            ))}
            <div className="w-full h-px border-t border-[#5B96D1]/30" />
          </div>

        </div>
      </section>

      {/* ── 4. FINAL CTA (LIGHT THEME) ── */}
      <section className="py-32 lg:py-48 bg-[#F7FBFF] relative overflow-hidden border-t border-[#5B96D1]/20">
        <div className="absolute inset-0 opacity-[0.03]">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=60" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-14 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/3] overflow-hidden shadow-[0_20px_80px_rgba(180,130,40,0.15)] bg-[#EFF5FF]">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
                  alt="Architecture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-[3px] border-[#5B96D1]/30 -z-10" />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#5B96D1]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5A7BC1]">Initiate A Dialogue</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1D325E] tracking-tight font-serif leading-[1.05] mb-8">
                Craft Your <br />
                <span className="italic font-normal text-[#2660A2]">Legacy.</span>
              </h2>
              
              <p className="text-[#4A6E9A] text-base lg:text-lg leading-relaxed font-light mb-10 max-w-lg">
                Every extraordinary environment begins with a single conversation. Let our visionary architects translate your unique lifestyle into a bespoke masterpiece that transcends the ordinary.
              </p>
              
              <div className="space-y-4 mb-12">
                {['Tailored Spatial Planning', 'Exclusive Material Sourcing', 'Flawless Turnkey Execution'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#4A6E9A] text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#5B96D1]" /> {item}
                  </div>
                ))}
              </div>
              
              <Link href="/contact"
                className="group inline-flex items-center gap-5 px-10 py-5 bg-[#1D325E] text-[#F7FBFF] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#5B96D1] hover:text-[#1D325E] transition-all duration-500 shadow-xl"
              >
                Request Consultation
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F7FBFF]/10 group-hover:bg-[#1D325E]/10 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
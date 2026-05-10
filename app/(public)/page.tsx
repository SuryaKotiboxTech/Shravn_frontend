"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Slider from 'react-slick';

// Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// Fallback hero slider projects when API data is unavailable
const fallbackHeroProjects = [
  {
    title: 'The Glass Pavilion',
    category: 'Residential',
    location: 'Swiss Alps',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85',
  },
  {
    title: 'Aura Skyscraper',
    category: 'Commercial',
    location: 'Dubai, UAE',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85',
  },
  {
    title: 'Zenith Estate',
    category: 'Luxury Villa',
    location: 'Malibu, CA',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=85',
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [heroProjects, setHeroProjects] = useState<any[]>([]);
  const [loadingHero, setLoadingHero] = useState(true);

  const activeHeroProjects = heroProjects.length > 0 ? heroProjects : fallbackHeroProjects;

  useEffect(() => {
    const fetchHeroProjects = async () => {
      try {
        const API_URL = 'https://sukeradexterity.com';
        const res = await fetch(`${API_URL}/api/projects?limit=3`);
        if (!res.ok) throw new Error('Failed to fetch hero projects');

        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const activeProjects = data.data.filter((project: any) => project.isActive !== false);
          setHeroProjects(activeProjects.slice(0, 3));
        } else {
          setHeroProjects([]);
        }
      } catch (error) {
        console.error('Hero fetch error:', error);
        setHeroProjects([]);
      } finally {
        setLoadingHero(false);
      }
    };

    fetchHeroProjects();
  }, []);
  
  // Slick Carousel Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="bg-[#F7FBFF]">
      {/* Global override for Slick Carousel to match luxury theme */}
      <style>{`
        .luxury-slider .slick-dots {
          bottom: 50px;
          z-index: 20;
        }
        .luxury-slider .slick-dots li {
          margin: 0 6px;
        }
        .luxury-slider .slick-dots li button:before {
          color: #ffffff;
          font-size: 10px;
          opacity: 0.3;
          transition: all 0.4s ease;
        }
        .luxury-slider .slick-dots li.slick-active button:before {
          color: #ffffff;
          font-size: 12px;
          opacity: 1;
        }
      `}</style>

      {/* ── 2. ABOUT ── */}
      
      {/* ── 3. SHOWCASE SLIDER (MAX 90VH) - REDESIGNED ── */}
      <section ref={heroRef} className="relative w-full h-[90vh] max-h-[90vh] bg-[#162A48] overflow-hidden group">
        {/* Logo in top left */}
        {/* <div className="absolute top-8 left-6 lg:left-16 z-20">
          <img
            src="/logo2.png"
            alt="SP Architects"
            className="h-12 object-contain"
          />
        </div> */}
        {activeHeroProjects.length > 0 && (
          <Slider {...sliderSettings} className="h-full luxury-slider">
            {activeHeroProjects.map((slide, idx) => (
            <div key={idx} className="relative h-[90vh] max-h-[90vh] outline-none overflow-hidden">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                src={slide.image || slide.featuredImage || slide.img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85'} 
                alt={slide.title || 'Project Showcase'} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Premium Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#162A48]/30 to-[#0A1322]/95" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 lg:px-16 max-w-[1700px] mx-auto w-full z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="max-w-4xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2">
                      {slide.category}
                    </span>
                    <div className="w-12 h-px bg-white/40" />
                    <span className="flex items-center gap-2 text-white/80 text-[11px] font-medium tracking-widest uppercase">
                      <MapPin className="w-4 h-4 text-[#2660A2]" /> {slide.location}
                    </span>
                  </div>
                  <h2 className="text-5xl lg:text-[5.5rem] font-bold text-white font-serif mb-8 leading-[1.05] tracking-tight drop-shadow-2xl">
                    {slide.title}
                  </h2>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-[#2660A2] transition-colors group/btn bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-4 hover:bg-white/10"
                  >
                    Explore Project
                    <span className="bg-[#2660A2] p-2 rounded-full group-hover/btn:scale-110 transition-transform shadow-[0_0_15px_rgba(38,96,162,0.5)]">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
            ))}
          </Slider>
        )}

        {/* Scroll indicator animation */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <motion.div 
              className="w-full h-1/2 bg-white absolute top-0"
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── 3. SPACES WE’VE TRANSFORMED ── */}
      {/* <section className="py-20 bg-[#EFF5FF]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-[#162A48] tracking-tight font-serif mb-4">
            Spaces We’ve Transformed
          </h2>
          <p className="text-[#4B5F8A] text-lg font-light">
            Thoughtfully designed. Beautifully executed.
          </p>
        </div>
      </section> */}

      {/* ── 3.5. INTRO SECTION - REDESIGNED ── */}
      <section className="py-32 lg:py-40 bg-[#F7FBFF] overflow-hidden relative">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EFF5FF] rounded-bl-[200px] opacity-60 pointer-events-none" />

        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left image - Editorial Layout */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              {/* Image Frame with rounded offset */}
              <div className="relative aspect-[4/5] rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-[0_30px_60px_rgba(22,42,72,0.15)] z-10 border-[6px] border-white">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
                  alt="Studio Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-[#162A48]/10 hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* Backdrop outline */}
              <div className="absolute -inset-4 border border-[#2660A2]/30 rounded-tl-[70px] rounded-br-[70px] -z-10 translate-x-4 translate-y-4" />

              {/* Floating stat card - Glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -right-6 lg:-right-16 bottom-12 bg-white/85 backdrop-blur-xl border border-white/50 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] z-20 rounded-2xl"
              >
                <div className="text-6xl lg:text-7xl font-bold font-serif leading-none mb-3 text-[#162A48]">
                  15<span className="text-[#2660A2] text-5xl">+</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[2px] bg-[#2660A2]" />
                  <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#5B6E9A] leading-tight">Years of<br />Excellence</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right text - Elegant Typography */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center pt-16 lg:pt-0 lg:pl-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-[#2660A2]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2660A2]">Designed Around You</span>
              </div>

              <h2 className="text-5xl lg:text-[4.5rem] font-bold text-[#162A48] tracking-tight leading-[1.05] mb-8 font-serif">
                Crafting Spaces<br />
                <span className="text-[#8B99B8] font-light italic">Beyond Ordinary.</span>
              </h2>

              <div className="pl-6 border-l-[3px] border-[#2660A2]/20 mb-10">
                <p className="text-[#4B5F8A] text-lg leading-relaxed font-light max-w-xl">
                  At SP Architects, we design spaces that feel as good as they look. With a focus on creativity, functionality, and detail, we create interiors tailored to your lifestyle — where every space is thoughtfully designed and uniquely yours.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#162A48] hover:text-[#2660A2] transition-colors group w-fit"
              >
                <span className="border-b border-[#162A48] group-hover:border-[#2660A2] pb-1 transition-colors">Discover Our Story</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS COMPONENT ── */}
      <section className="bg-[#EFF5FF]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14 pt-28 pb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#2660A2]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5B6E9A]">Featured Works</span>
            <div className="w-8 h-px bg-[#2660A2]" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#162A48] tracking-tight font-serif mb-4">
            Our Creations & Concepts
          </h2>
          <p className="text-[#4B5F8A] text-lg font-light">
            Designing spaces that inspire and endure.
          </p>
        </div>
      </section>
      <FeaturedProjects />

      {/* ── 5. SERVICES (MODERN REDESIGN) ── */}
      <section className="py-32 bg-[#F7FBFF] border-t border-[#2660A2]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#2660A2]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5B6E9A]">Our Proficiency</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight font-serif text-[#162A48] leading-[1.1]">
                Shaping spaces with<br />knowledge, creativity,<br />
                <span className="italic font-normal text-[#8B99B8]">and precision.</span>
              </h2>
              <p className="text-[#4B5F8A] max-w-md text-base leading-relaxed font-light lg:pb-3">
                Design That Performs. Our approach covers every stage of your project — from design consultation to complete turnkey execution, making the entire process simple and stress-free.
              </p>
            </div>
          </motion.div>

          {/* Modern Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="group flex flex-col"
              >
                {/* Top Border & Header */}
                <div className="flex items-center justify-between border-b border-[#2660A2]/30 pb-6 mb-8 transition-colors duration-700 group-hover:border-[#2660A2]">
                  <h3 className="text-3xl font-bold text-[#162A48] font-serif group-hover:text-[#2660A2] transition-colors duration-500">
                    {service.title}
                  </h3>
                  <span className="text-[#2660A2] text-lg font-bold font-serif tracking-widest group-hover:scale-110 transition-transform duration-500">
                    {service.num}
                  </span>
                </div>

                {/* Image Container */}
                <Link 
                  href="/services" 
                  className="relative w-full aspect-[16/10] overflow-hidden mb-8 bg-[#EFF5FF] block"
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-[#162A48]/10 group-hover:bg-transparent transition-colors duration-700" />
                  
                  {/* Floating View Text inside image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F7FBFF]/90 backdrop-blur-md px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-[#162A48] text-[9px] font-bold uppercase tracking-[0.3em]">
                    Explore Service <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                {/* Description & Button */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pr-4">
                  <p className="text-[#4B5F8A] text-sm leading-relaxed font-light max-w-sm">
                    {service.desc}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#2660A2]/50 text-[#5B6E9A] group-hover:bg-[#2660A2] group-hover:text-[#162A48] group-hover:border-[#2660A2] transition-all duration-500 flex-shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. PROCESS ── */}
      <section className="py-32 bg-[#162A48]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-[#2660A2]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#2660A2]">Methodology</span>
              <div className="w-10 h-px bg-[#2660A2]" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-[#F7FBFF] mb-6 leading-tight font-serif">
              From Concept to{' '}
              <span className="italic font-normal text-[#2660A2]">Creation.</span>
            </h2>

            <p className="text-[#8B99B8] font-light max-w-2xl mx-auto text-lg">
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
                className="bg-[#162A48]/80 border border-[#2660A2]/20 p-10 hover:border-[#2660A2]/60 hover:bg-[#162A48] group transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -right-3 -bottom-3 text-[110px] font-bold text-[#2660A2]/[0.06] group-hover:text-[#2660A2]/[0.1] transition-colors duration-500 font-serif select-none leading-none">
                  {step.num}
                </div>

                <div className="relative z-10">
                  <div className="text-[10px] font-bold text-[#2660A2] tracking-[0.3em] uppercase mb-6">
                    Phase {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-[#F7FBFF] font-serif group-hover:text-[#2660A2] mb-4 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#8B99B8] text-sm leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. THE ADVANTAGE (WHY CHOOSE US) ── */}
      <section className="py-32 bg-[#EFF5FF]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#2660A2]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5B6E9A]">The Advantage</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-[#162A48] tracking-tight font-serif leading-[1.1]">
                The Shravan Puri <span className="text-[#2660A2] italic font-normal">Edge.</span>
              </h2>
            </div>
            <p className="text-[#4B5F8A] max-w-sm text-sm leading-relaxed font-light lg:pb-2">
              Beyond exceptional aesthetics, we provide a holistic, white-glove experience tailored to the most discerning clientele.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { title: 'Post-Delivery Care', desc: 'Our commitment extends beyond handover. We offer continuous aesthetic and structural support.' },
              { title: 'Zero-Disruption Process', desc: 'We manage every granular detail so you can maintain your lifestyle undisturbed during the transformation.' },
              { title: 'Dedicated Art Director', desc: 'A senior principal architect serves as your exclusive liaison from initial sketch to final styling.' },
              { title: 'Bespoke Sourcing', desc: 'Access to rare materials, custom furniture artisans, and exclusive global design catalogs.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex gap-6 p-8 bg-[#F7FBFF] border-l-2 border-transparent hover:border-[#2660A2] transition-all duration-500 hover:shadow-[0_10px_40px_rgba(20,42,72,0.06)]"
              >
                <div className="text-3xl font-serif text-[#2660A2]/40 group-hover:text-[#2660A2] transition-colors duration-500">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#162A48] font-serif mb-3 group-hover:text-[#2660A2] transition-colors">{item.title}</h3>
                  <p className="text-[#4B5F8A] text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MISSION & VISION ── */}
      <MissionVision />

      {/* ── 8. THE ATELIER (STUDIO INFO) ── */}
    

      {/* ── 9. FINAL CTA (MODERN & ELEGANT) ── */}
      <section className="py-32 lg:py-40 bg-[#EFF5FF] border-t border-[#2660A2]/20 relative overflow-hidden">
        {/* Subtle large background typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] whitespace-nowrap">
          <span className="text-[20vw] font-serif font-bold text-[#162A48] leading-none">SHRAVAN PURI</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#2660A2]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#5B6E9A]">Commence The Journey</span>
              <div className="w-12 h-[1px] bg-[#2660A2]" />
            </div>

            <h2 className="text-5xl lg:text-7xl font-bold text-[#162A48] tracking-tight font-serif leading-[1.1] mb-8">
              Ready to redefine <br className="hidden md:block" />
              <span className="text-[#2660A2] italic font-normal">your space?</span>
            </h2>

            <p className="text-[#4B5F8A] text-lg leading-relaxed font-light mb-12 max-w-2xl mx-auto">
              Schedule a private consultation with our principal architects. Let us translate your vision into a structural masterpiece.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-5 px-12 py-6 bg-[#162A48] text-[#F7FBFF] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#2660A2] hover:text-[#162A48] transition-all duration-500 shadow-xl"
            >
              Initiate Project
              <div className="w-8 h-[1px] bg-[#F7FBFF] group-hover:bg-[#162A48] group-hover:w-12 transition-all duration-500 relative">
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 translate-x-1/2" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
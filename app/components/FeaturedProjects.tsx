"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';

const fallbackProjects = [
  {
    id: 'glass-pavilion',
    title: 'The Glass Pavilion',
    category: 'Residential',
    location: 'Swiss Alps',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  },
  {
    id: 'aura-tower',
    title: 'Aura Skyscraper',
    category: 'Commercial',
    location: 'Dubai, UAE',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    id: 'zenith-estate',
    title: 'Zenith Estate',
    category: 'Luxury Villa',
    location: 'Malibu, CA',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  },
  {
    id: 'lumina-center',
    title: 'Lumina Art Center',
    category: 'Cultural',
    location: 'Copenhagen',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80',
  },
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/projects?limit=4`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data.slice(0, 4));
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayed = projects.length > 0 ? projects : fallbackProjects;

  if (loading) {
    return (
      <section className="bg-[#F5EDD8] py-32 flex items-center justify-center border-t border-[#C9A84C]/20">
        <div className="flex items-center gap-4 text-[#A08040]/50">
          <div className="w-5 h-5 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Loading Portfolio</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5EDD8] border-t border-[#C9A84C]/20 relative">
      {/* ── HEADER SECTION ── */}
      <div className="max-w-[1700px] mx-auto px-6 lg:px-14 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Featured Works</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] tracking-tight font-serif mb-6 leading-[1.1]">
              Our Creations & <br className="hidden sm:block" />
              <span className="italic font-normal text-[#9A7840]">Concepts.</span>
            </h2>
            <p className="text-[#7A6040] text-lg font-light leading-relaxed">
              Designing spaces that inspire and endure. Step into a curated gallery of our most prestigious architectural and interior transformations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block pb-2"
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-4 px-8 py-4 bg-[#2C1F0A] text-[#FAF6EF] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#C9A84C] hover:text-[#2C1F0A] transition-all duration-500 shadow-lg"
            >
              View Full Portfolio
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="max-w-[1700px] mx-auto px-6 lg:px-14 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Large Feature — first project */}
          {displayed[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Link
                href={`/portfolio/${displayed[0]._id || displayed[0].id}`}
                className="group block relative aspect-[4/3] overflow-hidden bg-[#2C1F0A]"
              >
                <img
                  src={displayed[0].image || displayed[0].featuredImage}
                  alt={displayed[0].title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                />
                {/* Elegant Inner Frame */}
                <div className="absolute inset-5 border border-[#FAF6EF]/20 z-10 pointer-events-none transition-colors duration-700 group-hover:border-[#C9A84C]/50" />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1205] via-[#1A1205]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content Box */}
                <div className="absolute bottom-10 left-10 right-10 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <span className="flex items-center gap-2 text-[#C9A84C] text-[9px] font-bold uppercase tracking-[0.3em] mb-4">
                      <div className="w-4 h-[1px] bg-[#C9A84C]" />
                      {displayed[0].category}
                    </span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6EF] font-serif group-hover:text-[#C9A84C] transition-colors duration-500">
                      {displayed[0].title}
                    </h3>
                    <div className="flex items-center gap-2 mt-4 text-[#FAF6EF]/60 text-xs font-light tracking-widest uppercase">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" /> {displayed[0].location}
                    </div>
                  </div>
                  {/* Hover Button */}
                  <div className="w-14 h-14 rounded-full border border-[#FAF6EF]/30 flex items-center justify-center text-[#FAF6EF] group-hover:bg-[#C9A84C] group-hover:text-[#2C1F0A] group-hover:border-[#C9A84C] transition-all duration-500 flex-shrink-0 backdrop-blur-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Right column — 2 smaller projects */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {displayed.slice(1, 3).map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.15 }}
              >
                <Link
                  href={`/portfolio/${project._id || project.id}`}
                  className="group block relative aspect-[16/9] overflow-hidden bg-[#2C1F0A]"
                >
                  <img
                    src={project.image || project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms]"
                  />
                  {/* Elegant Inner Frame */}
                  <div className="absolute inset-4 border border-[#FAF6EF]/15 z-10 pointer-events-none transition-colors duration-700 group-hover:border-[#C9A84C]/50" />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1205]/95 via-[#1A1205]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content Box */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between gap-4">
                    <div>
                      <span className="block text-[#C9A84C] text-[8px] font-bold uppercase tracking-[0.3em] mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6EF] font-serif group-hover:text-[#C9A84C] transition-colors duration-500">
                        {project.title}
                      </h3>
                    </div>
                    {/* Hover Button */}
                    <div className="w-10 h-10 rounded-full border border-[#FAF6EF]/20 flex items-center justify-center text-[#FAF6EF] group-hover:bg-[#C9A84C] group-hover:text-[#2C1F0A] group-hover:border-[#C9A84C] transition-all duration-500 flex-shrink-0 backdrop-blur-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Wide panoramic — 4th project */}
          {displayed[3] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-12"
            >
              <Link
                href={`/portfolio/${displayed[3]._id || displayed[3].id}`}
                className="group block relative h-[280px] lg:h-[380px] overflow-hidden bg-[#2C1F0A]"
              >
                <img
                  src={displayed[3].image || displayed[3].featuredImage}
                  alt={displayed[3].title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms]"
                />
                {/* Elegant Inner Frame */}
                <div className="absolute inset-5 border border-[#FAF6EF]/20 z-10 pointer-events-none transition-colors duration-700 group-hover:border-[#C9A84C]/50" />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1205]/95 via-[#1A1205]/50 to-transparent transition-opacity duration-500" />
                
                {/* Content Box */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-10 lg:p-16 w-full md:w-2/3">
                  <span className="flex items-center gap-2 text-[#C9A84C] text-[9px] font-bold uppercase tracking-[0.3em] mb-4">
                    <div className="w-6 h-[1px] bg-[#C9A84C]" />
                    {displayed[3].category}
                  </span>
                  <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EF] font-serif mb-6 group-hover:text-[#C9A84C] transition-colors duration-500">
                    {displayed[3].title}
                  </h3>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[#FAF6EF]/70 text-xs font-light tracking-widest uppercase">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" /> {displayed[3].location}
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      View Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile view all CTA */}
        <div className="mt-10 lg:hidden">
          <Link
            href="/portfolio"
            className="flex items-center justify-center w-full bg-[#2C1F0A] text-[#FAF6EF] hover:bg-[#C9A84C] hover:text-[#2C1F0A] gap-3 text-[10px] font-bold uppercase tracking-[0.3em] py-5 transition-all duration-300 shadow-lg"
          >
            View Full Portfolio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
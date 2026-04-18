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
      <section className="bg-[#F5EDD8] py-32 flex items-center justify-center">
        <div className="flex items-center gap-4 text-[#A08040]/50">
          <div className="w-5 h-5 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Loading Portfolio</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5EDD8]">
      {/* Top border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#A07828]">Selected Works</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#2C1F0A] tracking-tight font-serif">Featured Projects</h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A08040] hover:text-[#B8872A] transition-colors group"
          >
            View All
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Large Feature — first project */}
          {displayed[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Link
                href={`/portfolio/${displayed[0]._id || displayed[0].id}`}
                className="group block relative aspect-[4/3] overflow-hidden bg-[#E8D5A8]"
              >
                <img
                  src={displayed[0].image || displayed[0].featuredImage}
                  alt={displayed[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F0A]/80 via-[#2C1F0A]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block bg-[#C9A84C] text-[#2C1F0A] text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 mb-4">
                    {displayed[0].category}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-black text-[#FAF6EF] font-serif group-hover:text-[#C9A84C] transition-colors">
                    {displayed[0].title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-[#E8D5A8]/70 text-xs">
                    <MapPin className="w-3 h-3" /> {displayed[0].location}
                  </div>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#FAF6EF]/20 backdrop-blur-sm flex items-center justify-center text-[#FAF6EF] group-hover:bg-[#C9A84C] group-hover:text-[#2C1F0A] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Right column — 2 smaller projects */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {displayed.slice(1, 3).map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
              >
                <Link
                  href={`/portfolio/${project._id || project.id}`}
                  className="group block relative aspect-[16/9] overflow-hidden bg-[#E8D5A8]"
                >
                  <img
                    src={project.image || project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F0A]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block bg-[#C9A84C]/25 border border-[#C9A84C]/50 text-[#F5EDD8] text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-black text-[#FAF6EF] font-serif group-hover:text-[#C9A84C] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF6EF]/20 backdrop-blur-sm flex items-center justify-center text-[#FAF6EF] group-hover:bg-[#C9A84C] group-hover:text-[#2C1F0A] transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Wide panoramic — 4th project */}
          {displayed[3] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-12"
            >
              <Link
                href={`/portfolio/${displayed[3]._id || displayed[3].id}`}
                className="group block relative h-[280px] lg:h-[380px] overflow-hidden bg-[#E8D5A8]"
              >
                <img
                  src={displayed[3].image || displayed[3].featuredImage}
                  alt={displayed[3].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C1F0A]/85 via-[#2C1F0A]/30 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center p-10 lg:p-16">
                  <span className="inline-block bg-[#C9A84C] text-[#2C1F0A] text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 mb-4 self-start">
                    {displayed[3].category}
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-black text-[#FAF6EF] font-serif group-hover:text-[#C9A84C] transition-colors max-w-lg">
                    {displayed[3].title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-[#E8D5A8]/60 text-xs">
                    <MapPin className="w-3 h-3" /> {displayed[3].location}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/portfolio"
            className="flex items-center justify-center w-full border-2 border-[#C9A84C]/40 hover:bg-[#C9A84C] hover:border-[#C9A84C] text-[#A07828] hover:text-[#2C1F0A] gap-2 text-[10px] font-black uppercase tracking-[0.25em] py-4 transition-all duration-300"
          >
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
    </section>
  );
}
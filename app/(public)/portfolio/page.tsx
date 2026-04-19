"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Loader2, ArrowUpRight } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: 'residential' | 'commercial';
  description: string;
  location: string;
  completionYear: number;
  client: string;
  featuredImage: string;
  images: string[];
  isActive: boolean;
  order: number;
}

const fallbackProjects: Project[] = [
  { _id: "p1", title: "The Glass Pavilion", category: "residential", description: "A contemporary masterpiece.", location: "Swiss Alps", completionYear: 2023, client: "Private", featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", images: [], isActive: true, order: 1 },
  { _id: "p2", title: "Aura Skyscraper", category: "commercial", description: "Redefines the skyline.", location: "Dubai, UAE", completionYear: 2024, client: "Emaar", featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80", images: [], isActive: true, order: 2 },
  { _id: "p3", title: "Zenith Estate", category: "residential", description: "Cliffside luxury.", location: "Malibu, CA", completionYear: 2022, client: "Confidential", featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", images: [], isActive: true, order: 3 },
  { _id: "p4", title: "Lumina Art Center", category: "commercial", description: "Cultural hub.", location: "Copenhagen", completionYear: 2023, client: "City Council", featuredImage: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80", images: [], isActive: true, order: 4 },
  { _id: "p5", title: "Coastal Retreat", category: "residential", description: "Pacific panoramic home.", location: "Sydney, AUS", completionYear: 2024, client: "Private", featuredImage: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80", images: [], isActive: true, order: 5 },
  { _id: "p6", title: "The Nordic Loft", category: "residential", description: "Minimalist Nordic design.", location: "Oslo, Norway", completionYear: 2023, client: "Private", featuredImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80", images: [], isActive: true, order: 6 },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial'>('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0, limit: 20 });
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { fetchProjects(1, true); }, []);
  useEffect(() => { setProjects([]); fetchProjects(1, true); }, [selectedCategory]);

  const fetchProjects = async (page: number, isInitial = false) => {
    if (isInitial) setLoading(true); else setLoadingMore(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      const res = await fetch(`${API_URL}/api/projects?page=${page}&limit=20${catParam}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.success) {
        const active = data.data.filter((p: Project) => p.isActive).sort((a: Project, b: Project) => a.order - b.order);
        if (isInitial) setProjects(active); else setProjects(prev => [...prev, ...active]);
        setPagination(data.pagination);
        setHasMore(data.pagination.currentPage < data.pagination.totalPages);
      }
    } catch {
      if (isInitial) { setProjects(fallbackProjects); setHasMore(false); }
    } finally { setLoading(false); setLoadingMore(false); }
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loadingMore) fetchProjects(pagination.currentPage + 1, false);
  }, [hasMore, loadingMore, pagination]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(handleObserver, { threshold: 0.1, rootMargin: '100px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [handleObserver]);

  const filtered = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">

      {/* ── REFINED EDITORIAL HERO ── */}
      <section className="relative pt-40 lg:pt-56 pb-20 overflow-hidden bg-[#F5EDD8]">
        {/* Subtle background radial gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-[1700px] mx-auto px-6 lg:px-14 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#A07828] text-[9px] font-bold uppercase tracking-[0.4em]">Curated Archives</span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-bold text-[#2C1F0A] tracking-tight font-serif leading-[1.05]">
              Selected <br className="sm:hidden" />
              <span className="text-[#B8872A] italic font-normal">Works.</span>
            </h1>
            
            <p className="text-[#7A6040] text-base lg:text-lg font-light mt-8 max-w-2xl mx-auto leading-relaxed">
              Explore our collection of architectural masterpieces, where visionary design meets flawless execution and timeless elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR (LIGHT & FROSTED) ── */}
      <section className="py-5 bg-[#FAF6EF]/90 backdrop-blur-md border-b border-[#C9A84C]/20 sticky top-[72px] z-30 shadow-[0_4px_30px_rgba(201,168,76,0.03)]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar justify-start sm:justify-center">
            {['all', 'residential', 'commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`relative pb-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors whitespace-nowrap ${
                  selectedCategory === cat ? 'text-[#B8872A]' : 'text-[#A07828]/60 hover:text-[#2C1F0A]'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
                {selectedCategory === cat && (
                  <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL CARD GRID ── */}
      <section className="py-24 bg-[#FAF6EF]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          {loading ? (
            <div className="flex justify-center items-center py-40">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#A07828] font-bold">Curating Portfolio</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-40 border border-dashed border-[#C9A84C]/30 bg-[#F5EDD8]/50 rounded-lg">
              <Building className="w-12 h-12 text-[#C9A84C]/40 mx-auto mb-4" />
              <p className="text-[#7A6040] font-light">No projects found in this category.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    key={project._id}
                  >
                    <Link href={`/portfolio/${project._id}`} className="group flex flex-col gap-6 w-full h-full">
                      
                      {/* Image Container */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E8D5A8] shadow-[0_10px_40px_rgba(180,130,40,0.05)]">
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                        />
                        
                        {/* Elegant Inner Frame Hover */}
                        <div className="absolute inset-4 border border-[#FAF6EF]/0 z-10 pointer-events-none transition-colors duration-700 group-hover:border-[#FAF6EF]/40" />

                        {/* Subtle Dark Gradient for Text Legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1205]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Hover Circle Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-[#FAF6EF]/90 backdrop-blur-sm text-[#B8872A] flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-xl">
                            <ArrowUpRight className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-[#FAF6EF]/90 backdrop-blur-sm text-[#B8872A] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.3em] shadow-sm">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Clean Text Content Below */}
                      <div className="flex flex-col px-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#2C1F0A] font-serif mb-3 group-hover:text-[#B8872A] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[#7A6040] text-xs font-light uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                            {project.location}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40" />
                          <span>{project.completionYear}</span>
                        </div>
                      </div>

                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="flex justify-center pt-24 pb-16">
            {loadingMore && (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-7 h-7 text-[#C9A84C] animate-spin" />
                <p className="text-[#A07828] text-[9px] font-bold uppercase tracking-[0.3em]">Loading archive...</p>
              </div>
            )}
            {!hasMore && !loadingMore && pagination.totalRecords > 0 && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[#C9A84C]/30" />
                <p className="text-[#A07828] text-[9px] font-bold uppercase tracking-[0.3em]">
                  Displaying all {pagination.totalRecords} works
                </p>
                <div className="w-12 h-px bg-[#C9A84C]/30" />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
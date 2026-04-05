"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Building, Home, Eye } from 'lucide-react';
import Navbar from '../../components/layout/Navbar'; // Adjust path

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
  videos: string[];
  technologies: string[];
  materials: string[];
  isActive: boolean;
  order: number;
}

// Premium Fallback Data to prevent crashes if backend is down
const fallbackProjects: Project[] = [
  {
    _id: "p1",
    title: "The Glass Pavilion",
    category: "residential",
    description: "A contemporary residential masterpiece perched on a dramatic slope.",
    location: "Swiss Alps, Switzerland",
    completionYear: 2023,
    client: "Private Client",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 1
  },
  {
    _id: "p2",
    title: "Aura Skyscraper",
    category: "commercial",
    description: "Aura Skyscraper redefines the commercial skyline.",
    location: "Dubai, UAE",
    completionYear: 2024,
    client: "Emaar Properties",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 2
  },
  {
    _id: "p3",
    title: "Zenith Estate",
    category: "residential",
    description: "Situated on a rugged cliffside, Zenith Estate provides ultimate luxury.",
    location: "Malibu, California",
    completionYear: 2022,
    client: "Confidential",
    featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 3
  },
  {
    _id: "p4",
    title: "Lumina Art Center",
    category: "commercial",
    description: "A brilliant cultural hub wrapped in smart glass.",
    location: "Copenhagen",
    completionYear: 2023,
    client: "City Council",
    featuredImage: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 4
  },
  {
    _id: "p5",
    title: "Coastal Retreat",
    category: "residential",
    description: "A sprawling panoramic home facing the Pacific ocean.",
    location: "Sydney, AUS",
    completionYear: 2024,
    client: "Private Client",
    featuredImage: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1600&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 5
  }
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://api.rkinteriorstudio.in/api/projects');
      if (!response.ok) throw new Error("Failed to fetch from backend");
      
      const data = await response.json();
      if (data.success) {
        const activeProjects = data.data
          .filter((project: Project) => project.isActive)
          .sort((a: Project, b: Project) => a.order - b.order);
        setProjects(activeProjects);
      }
    } catch (error) {
      console.warn('Backend unreachable. Loading fallback premium data.', error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Dynamic Helper to create the repeating Mosaic Grid Pattern
  const getSpanClass = (index: number) => {
    const pattern = index % 5; // Repeats every 5 items to keep the grid perfectly shaped
    switch (pattern) {
      case 0: return "md:col-span-2 md:row-span-2"; // Big Square
      case 1: return "md:col-span-1 md:row-span-1"; // Small Square
      case 2: return "md:col-span-1 md:row-span-1"; // Small Square
      case 3: return "md:col-span-2 md:row-span-1"; // Wide Rectangle
      case 4: return "md:col-span-4 md:row-span-1"; // Panoramic Full Width
      default: return "md:col-span-2 md:row-span-2";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a68a6b]"></div>
          <p className="text-zinc-500 mt-4 uppercase tracking-widest text-sm font-semibold">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />

      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative pt-40 pb-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Architecture Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-px w-12 bg-[#a68a6b]"></div>
              <span className="text-[#a68a6b] font-bold uppercase tracking-widest text-sm">Our Work</span>
              <div className="h-px w-12 bg-[#a68a6b]"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Selected Portfolio</h1>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
              Explore our collection of architectural masterpieces, where visionary design meets flawless execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- ELEGANT FILTER SECTION --- */}
      <section className="py-8 bg-white border-b border-zinc-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {['all', 'residential', 'commercial'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as any)}
                  className={`relative pb-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                    selectedCategory === category ? 'text-slate-900' : 'text-zinc-400 hover:text-[#a68a6b]'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                  {selectedCategory === category && (
                    <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#a68a6b]" />
                  )}
                </button>
              ))}
            </div>
           
          </div>
        </div>
      </section>

      {/* --- PROJECTS GRID (DYNAMIC MOSAIC) --- */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-zinc-300 rounded-sm">
              <Building className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-slate-900 mb-2">No Projects Found</h3>
              <p className="text-slate-500 font-light">Check back soon for our latest architectural work.</p>
            </div>
          ) : (
            /* DYNAMIC GRID: Base row height is 350px. Span classes change sizes based on index. */
            <motion.div layout className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={project._id}
                    className={`${getSpanClass(index)} group relative w-full h-full overflow-hidden cursor-pointer bg-zinc-900 rounded-sm shadow-md hover:shadow-xl transition-all duration-500`}
                  >
                    <Link href={`/portfolio/${project._id}`} className="block w-full h-full">
                      
                      {/* 1. Default State Image (Slow Zoom on hover) */}
                      <img 
                        src={project.featuredImage} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />

                      {/* 2. Hover State: Slow Translucent Overlay from bottom */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"></div>

                      {/* 3. Hover Content: Fades and slides in after the background */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out">
                        
                        {/* Category Tag */}
                        <span className="text-white bg-[#a68a6b] self-start px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 block shadow-md">
                          {project.category}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 drop-shadow-md">
                          {project.title}
                        </h3>
                        
                        {/* Location */}
                        <div className="flex items-center gap-2 text-zinc-200 text-sm font-light mb-6 drop-shadow-md">
                          <MapPin className="w-4 h-4 text-[#a68a6b]" />
                          {project.location}
                        </div>

                        {/* Divider & Action Button */}
                        <div className="pt-5 border-t border-white/30 flex items-center justify-between">
                          <span className="text-white text-sm uppercase tracking-wider font-semibold">
                            View Project
                          </span>
                          <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white group-hover:bg-[#a68a6b] group-hover:border-[#a68a6b] transition-colors duration-500">
                            <ArrowRight className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
      
    
    </div>
  );
}
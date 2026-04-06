"use client";

import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar'; // Adjust path based on your folder structure
import Footer from '../../components/layout/Footer'; // Adjust path based on your folder structure
import { Play, ArrowRight, Award, Globe, Leaf, Link, Mail, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/team`);
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const journeySteps = [
    {
      year: "2010",
      title: "The Inception",
      description: "Founded with a vision to redefine urban living spaces through sustainable, minimalist architecture."
    },
    {
      year: "2015",
      title: "First Major Recognition",
      description: "Awarded the National Design Excellence Award for our groundbreaking work on the Horizon Residential Complex."
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Opened our first international studio in Dubai, bringing our unique design philosophy to the global stage."
    },
    {
      year: "2024",
      title: "Sustainable Future",
      description: "Committed to 100% carbon-neutral designs, integrating advanced eco-technologies into all new projects."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-300 font-sans">
      <Navbar />

      {/* 1. SIMPLE HERO SECTION (No Background Image) */}
      <main className="relative pt-40 pb-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-px w-12 bg-[#a68a6b]"></div>
              <span className="text-[#a68a6b] font-bold uppercase tracking-widest text-sm">
                About The Studio
              </span>
              <div className="h-px w-12 bg-[#a68a6b]"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 mb-6">
              Shaping the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a68a6b] to-[#d4bca1]">Future</span> <br className="hidden md:block" /> of Spatial Design.
            </h1>
            <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
              We are a collective of visionary architects, interior designers, and urban planners dedicated to creating enduring masterpieces.
            </p>
          </motion.div>
        </div>
      </main>

      {/* 2. ABOUT US: LEFT TEXT / RIGHT IMAGE */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                Designing spaces that <br /> inspire and endure.
              </h2>
              <div className="h-1 w-20 bg-[#a68a6b] mb-8"></div>
              
              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-10">
                <p>
                  At Architect Studio, we believe that architecture is more than just erecting buildings; it’s about crafting environments that elevate the human experience. Every line drawn and material chosen is infused with purpose.
                </p>
                <p>
                  Our interior design philosophy bridges the gap between raw functionality and ultimate luxury. We meticulously source premium materials and collaborate with master craftsmen to ensure every detail resonates with our clients' visions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
                <div>
                  <h4 className="text-4xl font-serif text-[#a68a6b] mb-2">15+</h4>
                  <p className="text-sm font-semibold text-slate-900 uppercase tracking-widest">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif text-[#a68a6b] mb-2">120</h4>
                  <p className="text-sm font-semibold text-slate-900 uppercase tracking-widest">Global Awards</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Interior Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full"
            >
              <div className="absolute inset-0 bg-[#a68a6b]/10 translate-x-4 translate-y-4 rounded-sm"></div>
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury Interior Design" 
                className="relative z-10 w-full h-full object-cover rounded-sm shadow-2xl"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. MEET THE FOUNDER */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Founder Image */}
            <div className="md:w-2/5 h-[400px] md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Founder Portrait" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Founder Text */}
            <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
              {/* Decorative Quote Mark */}
              <span className="absolute top-10 left-10 text-9xl text-zinc-800 font-serif opacity-50 pointer-events-none">"</span>
              
              <div className="relative z-10">
                <h3 className="text-sm font-semibold text-[#a68a6b] uppercase tracking-widest mb-2">Meet The Founder</h3>
                <h2 className="text-4xl font-serif text-white mb-6">Elena Rostova</h2>
                <p className="text-xl text-zinc-300 font-light leading-relaxed mb-8 italic">
                  "Architecture is the silent poetry of our daily lives. We don't just build walls; we frame memories, structure workflows, and design the sanctuaries where life unfolds."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-zinc-700"></div>
                  <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Principal Architect & CEO</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OUR TEAM SECTION */}
      {/* --- OUR TEAM SECTION --- */}
<section className="py-24 bg-zinc-50 border-t border-zinc-200 relative z-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#a68a6b]"></div>
          <span className="text-[#a68a6b] font-semibold uppercase tracking-widest text-sm">The Masterminds</span>
          <div className="h-px w-8 bg-[#a68a6b]"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Our Team</h2>
        <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
          Meet the visionary architects and designers who turn blank canvases into structural masterpieces.
        </p>
      </motion.div>
    </div>

    {/* Content State */}
    {loading ? (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#a68a6b]"></div>
        <p className="text-zinc-500 mt-4 uppercase tracking-widest text-sm font-semibold">Loading masterminds...</p>
      </div>
    ) : teamMembers.length === 0 ? (
      <div className="text-center py-16 border border-dashed border-zinc-300 bg-white">
        <User className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
        <p className="text-slate-500 font-light">No team members available at the moment.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-white"
          >
            {/* --- ANIMATED CORNER BORDERS (Adjusted to match new scale) --- */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[3px] border-l-[3px] border-[#a68a6b] opacity-0 group-hover:w-12 group-hover:h-12 group-hover:opacity-100 transition-all duration-500 ease-out z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[3px] border-r-[3px] border-[#a68a6b] opacity-0 group-hover:w-12 group-hover:h-12 group-hover:opacity-100 transition-all duration-500 ease-out z-20 pointer-events-none"></div>

            {/* Inner Card Container */}
            <div className="h-full shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col border border-zinc-100">
              
              {/* Image Container (Reduced Height) */}
              <div className="relative h-[280px] sm:h-[300px] w-full overflow-hidden bg-zinc-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                
                <div className="absolute inset-0 bg-[#a68a6b]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Text & Details Container (Reduced Padding) */}
              <div className="p-5 sm:p-6 text-center flex-grow flex flex-col justify-between relative z-10 bg-white">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 group-hover:text-[#a68a6b] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#a68a6b] uppercase tracking-wider text-[11px] font-bold mb-3">
                    {member.position}
                  </p>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-5 line-clamp-3">
                    {member.bio}
                  </p>
                </div>
                
                {/* Social Links (Tighter Spacing) */}
                {/* <div className="flex items-center justify-center space-x-3 pt-4 border-t border-zinc-100">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-full bg-zinc-50 text-zinc-400 hover:bg-[#a68a6b] hover:text-white transition-all duration-300"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-zinc-50 text-zinc-400 hover:bg-[#a68a6b] hover:text-white transition-all duration-300"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-zinc-50 text-zinc-400 hover:bg-[#a68a6b] hover:text-white transition-all duration-300"
                      aria-label={`${member.name} Twitter`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  )}
                </div> */}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</section>

      {/* 5. THE JOURNEY (Timeline) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Journey</h2>
            <div className="h-1 w-20 bg-[#a68a6b] mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 font-light">A timeline of passion, precision, and continuous evolution.</p>
          </div>

          <div className="relative border-l-2 border-zinc-200 ml-3 md:ml-6 space-y-12 pb-4">
            {journeySteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#a68a6b] ring-4 ring-white"></div>
                
                <span className="text-[#a68a6b] font-bold text-xl font-serif block mb-2">{step.year}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIDEO SECTION */}
    {/* --- CINEMATIC VIDEO SECTION (Light Theme) --- */}
      <section className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden border-y border-zinc-200">
        
        {/* Subtle Light Background Pattern */}
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-200 via-zinc-50 to-zinc-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#a68a6b]"></div>
                <span className="text-[#a68a6b] font-semibold uppercase tracking-widest text-sm">Vision in Motion</span>
                <div className="h-px w-8 bg-[#a68a6b]"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                The Art of Space
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Step inside our world. Experience the meticulous craftsmanship and design philosophy behind our most celebrated architectural projects.
              </p>
            </motion.div>
          </div>

          {/* Cinematic Video Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-5xl mx-auto aspect-video rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white group bg-zinc-200"
          >
            {/* YouTube Embed */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&modestbranding=1&rel=0" 
              title="Architecture Studio Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            
            {/* Optional: Premium Custom Play Overlay (Uncomment and handle state if you want a custom thumbnail before playing) */}
            {/* <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group-hover:bg-slate-900/10 transition-all duration-500">
              <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#a68a6b] transform group-hover:scale-110 transition-transform duration-500 shadow-2xl pl-2">
                <Play className="w-10 h-10" fill="currentColor" />
              </div>
            </div> 
            */}
          </motion.div>
          
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
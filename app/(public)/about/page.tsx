"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaUser, FaArrowRight, FaGem, FaLeaf, FaHandshake, FaExternalLinkAlt, FaTwitter, FaEnvelope } from 'react-icons/fa';
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

interface Founder {
  _id?: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  bio?: string;
}

const journeySteps = [
  { year: "2010", title: "The Inception", description: "Founded with a vision to redefine interior spaces through thoughtful design and premium craftsmanship." },
  { year: "2015", title: "First Major Recognition", description: "Awarded the National Design Excellence Award for our groundbreaking work on the Horizon Residential Complex." },
  { year: "2020", title: "Global Expansion", description: "Opened our first international studio in Dubai, bringing our unique interior design philosophy to the global stage." },
  { year: "2024", title: "Sustainable Future", description: "Committed to 100% eco-friendly designs, integrating sustainable materials into all new projects." },
];

// Fallback Premium Data to ensure the UI never breaks
const fallbackTeam: TeamMember[] = [
  { 
    _id: 't1', 
    name: 'Eleanor Vance', 
    position: 'Principal Architect', 
    bio: 'With over 20 years of experience, Eleanor leads the studio with a distinct vision for blending modern minimalism with timeless warmth.', 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' 
  },
  { 
    _id: 't2', 
    name: 'Marcus Sterling', 
    position: 'Design Director', 
    bio: 'Marcus oversees all creative operations, ensuring every project aligns with our uncompromising standards of luxury and functionality.', 
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80' 
  },
  { 
    _id: 't3', 
    name: 'Sophia Lin', 
    position: 'Lead Interior Designer', 
    bio: 'Sophia specializes in bespoke furniture curation and textile selection, bringing distinct character to every residential and commercial space.', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80' 
  }
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [founder, setFounder] = useState<Founder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/team`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setTeamMembers(data.data);
        } else {
          setTeamMembers(fallbackTeam);
        }
      } catch {
        setTeamMembers(fallbackTeam);
      }
    };

    const fetchFounder = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/founder`);
        const data = await res.json();
        if (data.success && data.data) {
          setFounder(data.data);
        }
      } catch {
        // Silently fail
      }
    };

    Promise.all([fetchTeam(), fetchFounder()]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[95vh] flex items-center lg:items-end pb-0 lg:pb-24 pt-32 overflow-hidden bg-[#2C1F0A]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
            alt="Luxury Interior"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2C1F0A]/20 to-[#2C1F0A]/60" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 lg:px-14 w-full flex justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full lg:w-5/12 xl:w-1/3 bg-[#FAF6EF]/95 backdrop-blur-md p-10 lg:p-16 border border-[#C9A84C]/30 shadow-[0_20px_80px_rgba(44,31,10,0.2)]"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-10 bg-[#C9A84C]" />
              <span className="text-[#A07828] text-[9px] font-bold uppercase tracking-[0.4em]">About The Studio</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C1F0A] tracking-tight font-serif leading-[1.1] mb-6">
              Crafting <br />
              <span className="text-[#B8872A] italic font-normal">Masterpieces.</span>
            </h1>
            
            <p className="text-[#7A6040] text-sm leading-relaxed font-light mb-10">
              We are a collective of visionary designers and interior professionals dedicated to creating enduring, bespoke environments that perfectly balance luxury with liveability.
            </p>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-[#C9A84C] flex items-center justify-center">
                <FaArrowRight className="w-4 h-4 text-[#B8872A]" />
              </div>
              <span className="text-[#2C1F0A] text-[10px] font-bold uppercase tracking-[0.2em]">Discover Our Story</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. THE STUDIO CONTENT ── */}
      <section className="bg-[#FAF6EF] py-32 lg:py-48 border-b border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-[#C9A84C]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Our Ethos</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] font-serif mb-2 leading-tight">Designing spaces that</h2>
              <h2 className="text-4xl lg:text-6xl font-bold text-[#B8872A] font-serif mb-10 leading-tight italic font-normal">inspire and endure.</h2>
              
              <div className="space-y-6 text-[#7A6040] text-base leading-relaxed font-light mb-12 max-w-lg">
                <p>At our Studio, every space begins with a deep focus on detail — the foundation of exceptional design. From material selection to finishing touches, each element is carefully considered and thoughtfully executed.</p>
                <p>We craft smart, elegant and customised interiors that balance design, comfort and functionality. Our expertise spans residential, commercial and bespoke interior solutions.</p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-[#C9A84C]/20">
                {[{ v: '15+', l: 'Years Experience' }, { v: '120', l: 'Global Awards' }].map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold text-[#2C1F0A] font-serif mb-2">{s.v}</div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-[#A07828] font-bold">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F5EDD8] shadow-[0_20px_80px_rgba(180,130,40,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80"
                  alt="Interior Design"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms] ease-out"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#C9A84C]/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. CORE VALUES ── */}
      <section className="bg-[#F5EDD8] py-32 border-b border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Our Pillars</span>
              <div className="h-[1px] w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] font-serif">Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              { icon: FaGem, title: 'Uncompromising Quality', desc: 'Sourcing only the finest materials and partnering with master artisans to ensure every detail exudes premium craftsmanship.' },
              { icon: FaLeaf, title: 'Sustainable Luxury', desc: 'Integrating eco-friendly practices and sustainable materials without sacrificing the refined elegance our clients expect.' },
              { icon: FaHandshake, title: 'Collaborative Vision', desc: 'Your vision is our blueprint. We maintain absolute transparency and deep collaboration throughout the entire design journey.' }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-full border border-[#C9A84C]/40 flex items-center justify-center mb-8 group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-colors duration-500 bg-[#FAF6EF]">
                  <val.icon className="w-8 h-8 text-[#C9A84C] group-hover:text-[#2C1F0A] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#2C1F0A] font-serif mb-4">{val.title}</h3>
                <p className="text-[#7A6040] font-light leading-relaxed text-sm max-w-sm mx-auto">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FOUNDER (EDITORIAL OVERLAP DESIGN) ── */}
      <section className="py-32 lg:py-48 bg-[#FAF6EF] overflow-hidden border-b border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          
          {founder ? (
            <div className="flex flex-col lg:flex-row items-center relative">
              
              {/* Left Content (Overlaps Image on Desktop) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-5/12 bg-[#F5EDD8] p-10 lg:p-16 xl:p-20 relative z-20 shadow-[0_20px_80px_rgba(180,130,40,0.1)] lg:translate-x-16"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-[1px] w-10 bg-[#C9A84C]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">The Visionary</span>
                </div>
                
                <h2 className="text-5xl lg:text-7xl font-bold text-[#2C1F0A] font-serif mb-6 leading-none">
                  {founder.name}
                </h2>
                
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold block mb-12">
                  {founder.title}
                </span>

                <div className="relative">
                  <div className="absolute -top-6 -left-4 text-[6rem] text-[#C9A84C]/20 font-serif font-black leading-none pointer-events-none">"</div>
                  <p className="text-2xl text-[#2C1F0A] font-light leading-relaxed mb-8 italic relative z-10 font-serif">
                    {founder.quote}
                  </p>
                </div>
                
                <p className="text-[#7A6040] font-light text-sm leading-relaxed max-w-md">
                  {founder.bio || "Dedicated to pushing the boundaries of spatial design, crafting environments that elevate the human experience through harmony, texture, and light."}
                </p>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-7/12 relative aspect-square lg:aspect-[4/3] xl:h-[750px] z-10 mt-10 lg:mt-0"
              >
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-[1500ms]" 
                />
              </motion.div>

            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mx-auto" />
            </div>
          )}
        </div>
      </section>

      {/* ── 5. TEAM (HIGH-FASHION GRID) ── */}
      <section className="py-32 lg:py-48 bg-[#F5EDD8] border-b border-[#C9A84C]/20">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 lg:mb-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-10 bg-[#C9A84C]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">The Masterminds</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] font-serif">Creative Team</h2>
            </motion.div>
            <p className="text-[#7A6040] max-w-sm text-sm leading-relaxed font-light pb-2">
              A curated collective of world-class architects, designers, and strategists dedicated to realizing your vision.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mx-auto" />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-[#C9A84C]/30 bg-[#FAF6EF]/50">
              <FaUser className="w-12 h-12 text-[#C9A84C]/40 mx-auto mb-4" />
              <p className="text-[#7A6040] font-light">No team members available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="group flex flex-col"
                >
                  {/* Clean Sharp Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#FAF6EF] mb-8 shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                    />
                    
                    {/* Social Icons Overlay on Hover */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/90 backdrop-blur-sm text-[#2C1F0A] rounded-full flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors">
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/90 backdrop-blur-sm text-[#2C1F0A] rounded-full flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors">
                          <FaTwitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="w-10 h-10 bg-white/90 backdrop-blur-sm text-[#2C1F0A] rounded-full flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors">
                          <FaEnvelope className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    {/* Gradient for social icons legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Refined Text Content */}
                  <div className="flex flex-col px-2">
                    <h3 className="text-3xl font-serif font-bold text-[#2C1F0A] mb-2">{member.name}</h3>
                    <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.25em] font-bold mb-5">{member.position}</p>
                    <div className="w-full h-[1px] bg-[#C9A84C]/20 mb-5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-1000 ease-out" />
                    </div>
                    <p className="text-[#7A6040] font-light text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. TIMELINE / HISTORY (VERTICAL EDITORIAL DESIGN) ── */}
      <section className="py-32 lg:py-48 bg-[#FAF6EF] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-14">
          
          <div className="text-center mb-24 lg:mb-40">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-[#C9A84C]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#A07828]">Timeline</span>
              <div className="h-[1px] w-10 bg-[#C9A84C]" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#2C1F0A] font-serif">Our Legacy</h2>
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#C9A84C]/30 md:-translate-x-1/2" />

            <div className="space-y-24 md:space-y-32">
              {journeySteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    
                    {/* Floating Center Node */}
                    <div className="absolute left-[39px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FAF6EF] border-2 border-[#C9A84C] rounded-full z-20 shadow-[0_0_0_8px_#FAF6EF]" />

                    {/* Content Block */}
                    <div className={`w-full md:w-1/2 relative z-10 pl-16 md:pl-0 ${isEven ? 'md:pl-20' : 'md:pr-20 text-left md:text-right'}`}>
                      
                      {/* Massive Watermark Year */}
                      <span className={`absolute top-1/2 -translate-y-1/2 text-[7rem] md:text-[10rem] font-bold text-[#E8D5A8]/40 font-serif pointer-events-none -z-10 ${isEven ? 'left-8 md:left-16' : 'left-8 md:auto md:right-16'}`}>
                        {step.year}
                      </span>
                      
                      <div className={`inline-block border border-[#C9A84C]/30 px-4 py-1 mb-6 bg-[#FAF6EF] text-[#C9A84C] font-bold text-sm tracking-widest`}>
                        {step.year}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-[#2C1F0A] font-serif mb-4">{step.title}</h3>
                      
                      <p className="text-[#7A6040] font-light leading-relaxed text-sm md:text-base max-w-sm ml-0 md:ml-auto">
                        {step.description}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
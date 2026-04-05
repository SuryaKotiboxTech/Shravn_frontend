"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FolderOpen, Mail, Calculator, Building, User, Calendar,
  MapPin, AlertCircle, Clock, DollarSign, Activity, Settings, 
  Globe, ArrowUpRight, Plus, Loader2, CheckCircle, ChevronRight, Inbox
} from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  isActive: boolean;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  category: 'residential' | 'commercial';
  location: string;
  completionYear: number;
  featuredImage: string;
  client: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  createdAt: string;
}

interface Estimate {
  _id: string;
  customerName: string;
  email: string;
  phone?: string;
  projectType: string;
  builtUpArea: number;
  calculatedEstimate?: {
    totalEstimate: number;
  };
  status: 'new' | 'contacted' | 'negotiating' | 'approved' | 'rejected' | 'converted';
  createdAt: string;
}

interface SocialClick {
  channel: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  count: number;
}

export default function AdminDashboard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [socialClicks, setSocialClicks] = useState<SocialClick[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setRefreshing(true);
    try {
      setError(null);
      const [
        teamResponse,
        projectsResponse,
        contactsResponse,
        estimatesResponse,
        socialResponse
      ] = await Promise.all([
        fetch('https://api.rkinteriorstudio.in/api/team'),
        fetch('https://api.rkinteriorstudio.in/api/projects'),
        fetch('https://api.rkinteriorstudio.in/api/contact'),
        fetch('https://api.rkinteriorstudio.in/api/estimate'),
        fetch('https://api.rkinteriorstudio.in/api/social')
      ]);

      const [teamData, projectsData, contactsData, estimatesData, socialData] = await Promise.all([
        teamResponse.json(),
        projectsResponse.json(),
        contactsResponse.json(),
        estimatesResponse.json(),
        socialResponse.json()
      ]);

      if (teamData.success) setTeamMembers(teamData.data);
      if (projectsData.success) setProjects(projectsData.data);
      if (contactsData.success) setContacts(contactsData.data);
      if (estimatesData.success) setEstimates(estimatesData.data);
      if (socialData.success) setSocialClicks(Array.isArray(socialData.data) ? socialData.data : []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please check your backend connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'new': 'bg-blue-50 text-blue-700 border-blue-200',
      'contacted': 'bg-amber-50 text-amber-700 border-amber-200',
      'negotiating': 'bg-orange-50 text-orange-700 border-orange-200',
      'in-progress': 'bg-purple-50 text-purple-700 border-purple-200',
      'approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'converted': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'rejected': 'bg-red-50 text-red-700 border-red-200',
      'closed': 'bg-zinc-100 text-zinc-600 border-zinc-200'
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles['new']}`}>
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const totalEstimateValue = estimates
    .filter(e => e.calculatedEstimate)
    .reduce((sum, e) => sum + (e.calculatedEstimate?.totalEstimate || 0), 0);

  const newLeadsCount = contacts.filter(c => c.status === 'new').length + estimates.filter(e => e.status === 'new').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#a68a6b] mb-4" />
        <p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-500 mb-6 text-sm">{error}</p>
          <button onClick={fetchAllData} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-[#a68a6b] transition-colors font-medium text-sm">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Overview</h1>
          <p className="text-gray-500 mt-1 text-sm">Complete snapshot of your studio's activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            disabled={refreshing}
            className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all shadow-sm disabled:opacity-50"
          >
            <Activity className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href="/admin/projects/add" className="flex items-center px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-[#a68a6b] text-sm font-medium transition-all shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Link>
        </div>
      </div>

      {/* --- TOP KPIs --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Projects', value: projects.length, sub: `${projects.filter(p => p.isActive).length} Active`, icon: Building, link: '/admin/projects' },
          { title: 'Quote Requests', value: estimates.length, sub: `${estimates.filter(e => e.status === 'new').length} New`, icon: Calculator, link: '/admin/estimates' },
          { title: 'Client Inquiries', value: contacts.length, sub: `${contacts.filter(c => c.status === 'new').length} New`, icon: Mail, link: '/admin/contacts' },
          { title: 'Team Members', value: teamMembers.length, sub: `${teamMembers.filter(m => m.isActive).length} Active`, icon: Users, link: '/admin/team' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 group hover:border-[#a68a6b] transition-colors relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#a68a6b]/10 transition-colors">
                <stat.icon className="w-6 h-6 text-gray-700 group-hover:text-[#a68a6b] transition-colors" />
              </div>
              <Link href={stat.link} className="text-gray-400 hover:text-slate-900 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">{stat.title}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> {stat.sub}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MIDDLE ROW: FINANCIALS & SOCIAL --- */}
      <div className="grid grid-cols-1  gap-6">
        
        {/* Financial Pipeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#a68a6b]" /> Financial Pipeline
            </h2>
            <Link href="/admin/estimates" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider">View Quotes</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Total Quoted Value</p>
              <p className="text-2xl lg:text-3xl font-bold text-slate-900">{formatCurrency(totalEstimateValue)}</p>
            </div>
            <div className="p-5 rounded-xl bg-green-50 border border-green-100">
              <p className="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-2">Converted Deals</p>
              <p className="text-2xl lg:text-3xl font-bold text-green-700">{estimates.filter(e => e.status === 'converted').length}</p>
            </div>
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Avg. Quote Size</p>
              <p className="text-2xl lg:text-3xl font-bold text-slate-900">{formatCurrency(totalEstimateValue / Math.max(estimates.length, 1))}</p>
            </div>
          </div>
        </motion.div>

        {/* Social Reach */}
       
      </div>
            <div className="grid grid-cols-1  gap-6">

       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#a68a6b]" /> Social Clicks
            </h2>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{socialClicks.reduce((a,b) => a+b.count, 0)} Total</span>
          </div>
          <div className="space-y-3">
            {socialClicks.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">No social clicks recorded yet.</p>
            ) : (
              socialClicks.map((item) => (
                <div key={item.channel} className="flex justify-between items-center p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                  <span className="text-sm font-semibold text-gray-700 capitalize">{item.channel}</span>
                  <span className="text-sm font-bold text-slate-900">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
        </div>

      {/* --- QUICK ACTIONS --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
          <Settings className="w-5 h-5 text-[#a68a6b] mr-2" /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: 'Add Project', icon: FolderOpen, link: '/admin/projects/add', color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100' },
            { label: 'Add Team', icon: Users, link: '/admin/team/add', color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100' },
            { label: 'Site Settings', icon: Settings, link: '/admin/settings', color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100' },
            { label: 'View Contacts', icon: Mail, link: '/admin/contacts', color: 'text-orange-600', bg: 'bg-orange-50 hover:bg-orange-100' },
            { label: 'View Quotes', icon: Calculator, link: '/admin/estimates', color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100' },
            { label: 'Manage Projects', icon: Building, link: '/admin/projects', color: 'text-rose-600', bg: 'bg-rose-50 hover:bg-rose-100' },
          ].map((action, i) => (
            <Link key={i} href={action.link} className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors ${action.bg} ${action.color}`}>
              <action.icon className="w-6 h-6 mb-2" />
              <span className="text-xs font-bold text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* --- RECENT FEEDS (2x2 Grid) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" /> Recent Inquiries
            </h3>
            <Link href="/admin/contacts" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-2">
            {contacts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400"><Inbox className="w-8 h-8 mb-2" /><p className="text-sm">No inquiries yet</p></div>
            ) : (
              contacts.slice(0, 5).map((contact) => (
                <div key={contact._id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0 flex justify-between items-start">
                  <div className="min-w-0 pr-4">
                    <p className="font-semibold text-sm text-gray-900 truncate mb-1">{contact.name}</p>
                    <p className="text-xs text-gray-500 truncate mb-2">{contact.subject}</p>
                    <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(contact.createdAt)}</p>
                  </div>
                  {getStatusBadge(contact.status)}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-gray-400" /> Recent Quotes
            </h3>
            <Link href="/admin/estimates" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-2">
            {estimates.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400"><Inbox className="w-8 h-8 mb-2" /><p className="text-sm">No quotes yet</p></div>
            ) : (
              estimates.slice(0, 5).map((estimate) => (
                <div key={estimate._id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-sm text-gray-900 truncate pr-4">{estimate.customerName}</p>
                    {getStatusBadge(estimate.status)}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{estimate.projectType}</span>
                    <span className="text-sm font-bold text-[#a68a6b]">
                      {estimate.calculatedEstimate ? formatCurrency(estimate.calculatedEstimate.totalEstimate) : 'Pending'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-400" /> Recent Projects
            </h3>
            <Link href="/admin/projects" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-2">
            {projects.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400"><FolderOpen className="w-8 h-8 mb-2" /><p className="text-sm">No projects yet</p></div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div key={project._id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-4 border-b border-gray-50 last:border-0">
                  <img src={project.featuredImage} alt={project.title} className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{project.title}</p>
                    <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${project.category === 'residential' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Team Members */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" /> Team Roster
            </h3>
            <Link href="/admin/team" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-2">
            {teamMembers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400"><User className="w-8 h-8 mb-2" /><p className="text-sm">No team members yet</p></div>
            ) : (
              teamMembers.slice(0, 5).map((member) => (
                <div key={member._id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-4 border-b border-gray-50 last:border-0">
                  <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate flex items-center gap-2">
                      {member.name}
                      {member.isActive && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{member.position}</p>
                  </div>
                  <Link href={`/admin/team/${member._id}`} className="p-2 text-gray-400 hover:text-[#a68a6b] transition-colors rounded-full hover:bg-gray-100">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* --- BOTTOM ACTIVITY SUMMARY BANNER --- */}
      <div className="bg-[#111111] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden mt-8">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#a68a6b]/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-xl font-serif font-bold mb-2">Activity Summary</h3>
          <p className="text-zinc-400 text-sm max-w-md">Stay on top of your architecture studio's digital growth. You have {newLeadsCount} new leads requiring attention.</p>
        </div>
        <div className="relative z-10 flex gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#a68a6b]">{newLeadsCount}</p>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mt-1">New Leads</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{projects.filter(p => p.isActive).length + teamMembers.filter(m => m.isActive).length}</p>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mt-1">Active Posts</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-3xl font-bold text-white">{Math.round((Date.now() - new Date(projects[0]?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)) || 0}</p>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mt-1">Days Since Post</p>
          </div>
        </div>
      </div>

    </div>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Settings,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calculator,
  X,
  Phone,
  Shield,
  Share2
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const baseMenuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/contact-details', label: 'Site Settings', icon: Settings },
  { href: '/admin/social-icons', label: 'Social Icons', icon: Share2 },
  { href: '/admin/founder', label: 'Founder', icon: UserPlus },
  { href: '/admin/team', label: 'Team Roster', icon: Users },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/contacts', label: 'Inquiries', icon: Mail },
  { href: '/admin/estimates', label: 'Estimates', icon: Calculator },
];

const superadminMenuItems = [
  { href: '/admin/manage-admins', label: 'Manage Admins', icon: Shield },
];

interface AdminSidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen = false, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { isSuperadmin } = useAuth();

  const menuItems = isSuperadmin ? [...baseMenuItems, ...superadminMenuItems] : baseMenuItems;

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside 
        className={`hidden lg:flex bg-slate-950 border-r border-slate-800/60 text-slate-300 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} h-screen sticky top-0 flex-col overflow-hidden z-40 shrink-0`}
      >
        {/* Logo & Toggle Header */}
        <div className="h-20 border-b bg-white border-slate-800/60 flex items-center justify-between px-4 shrink-0 relative">
          
          {/* Custom Logo Image */}
          <div className={`flex items-center overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-36 opacity-100'}`}>
            <div className="relative h-12 w-full">
              <Image 
                src="/logo2.png" 
                alt="Studio Logo" 
                fill 
                sizes="144px"
                className="object-contain object-left" 
                priority
              />
            </div>
          </div>
          
          {/* Toggle Button (Centers when collapsed) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all absolute ${collapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'}`}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="mt-6 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/admin');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : ""}
                className={`
                  flex items-center px-3 py-3 rounded-xl transition-all duration-300 group
                  ${isActive
                    ? 'bg-[#a68a6b] text-white shadow-[0_4px_15px_rgba(166,138,107,0.3)] font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 font-medium'
                  }
                  ${collapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                
                {!collapsed && (
                  <span className="ml-3.5 whitespace-nowrap tracking-wide text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* User Badge / Footer */}
        {!collapsed && (
          <div className="p-6 shrink-0 border-t border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#a68a6b] font-bold text-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Admin Panel</span>
                <span className="text-[10px] text-slate-500 font-medium">SP Architects</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* --- MOBILE SIDEBAR (OFFCANVAS) --- */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen?.(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            
            {/* Sidebar Panel */}
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 flex flex-col shadow-2xl"
            >
              <div className="h-20 border-b border-slate-800/60 flex justify-between items-center px-6 shrink-0">
                
                {/* Custom Logo Image (Mobile) */}
                <div className="relative h-12 w-36">
                  <Image 
                    src="/logo1.png" 
                    alt="Studio Logo" 
                    fill 
                    sizes="144px"
                    className="object-contain object-left" 
                    priority
                  />
                </div>

                <button
                  onClick={() => setSidebarOpen?.(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex-1 overflow-y-auto px-4 space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/admin');
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen?.(false)}
                      className={`
                        flex items-center px-4 py-3.5 rounded-xl transition-all duration-300
                        ${isActive
                          ? 'bg-[#a68a6b] text-white shadow-lg shadow-[#a68a6b]/20 font-semibold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 font-medium'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="ml-4 tracking-wide text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
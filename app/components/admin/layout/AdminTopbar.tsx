'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Bell, User, LogOut, Menu, Crown } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { user, logout, isSuperadmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  const pageNames: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/users': 'Users Management',
    '/admin/projects': 'Projects Management',
    '/admin/team': 'Team Management',
    '/admin/contacts': 'Customer Contacts',
    '/admin/contact-details': 'Contact Details',
    '/admin/estimates': 'Project Estimates',
    '/admin/manage-admins': 'Manage Admins',
    '/admin/blogs': 'Blogs Management',
    '/admin/settings': 'Settings',
  };

  const currentPage = pageNames[pathname] || 'Dashboard';

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">{currentPage}</h1>
                {isSuperadmin && (
                  <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                    <Crown className="w-3 h-3" />
                    Superadmin
                  </span>
                )}
              </div>
              <p className="text-xs lg:text-sm text-gray-600 truncate">Welcome back, {user?.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button> */}

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSuperadmin ? 'bg-purple-600' : 'bg-blue-600'}`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 hidden sm:inline text-sm font-medium">{user?.name}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium flex items-center gap-2">
                      {isSuperadmin && <Crown className="w-4 h-4 text-purple-600" />}
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-gray-400 mt-1 capitalize">
                      {isSuperadmin ? '👑 Superadmin' : '👤 Admin'}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center space-x-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
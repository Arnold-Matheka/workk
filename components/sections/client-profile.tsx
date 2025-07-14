"use client";
import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  Users, 
  CreditCard, 
  FileCheck,
  Clock,
  Search,
  Bell,
  Settings,
  Plus,
  Download,
  Eye
} from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface ClientProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    policies: number;
    joinDate: string;
  };
}

function ClientProfile({ user }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading for 1.5s
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'policies', label: 'Policies', count: user.policies },
    { id: 'claims', label: 'Claims', count: 2 },
    { id: 'payments', label: 'Payments', count: 5 },
    { id: 'invoices', label: 'Invoices' },
    { id: 'documents', label: 'Documents', count: 12 }
  ];

  const latestTasks = [
    {
      id: 1,
      title: 'Review policy renewal documents',
      status: 'Due 15 Dec',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Process claim settlement payment',
      status: 'Due 20 Dec',
      priority: 'medium',
      completed: false
    },
    {
      id: 3,
      title: 'Complete beneficiary information',
      status: 'Due 25 Dec',
      priority: 'low',
      completed: true
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'Policy verification form',
      subtitle: 'Submitted 15 Nov 2024',
      type: 'policy',
      color: 'bg-blue-100 border-blue-200'
    },
    {
      id: 2,
      title: 'Medical examination report',
      subtitle: 'Uploaded 12 Nov 2024',
      type: 'medical',
      color: 'bg-yellow-100 border-yellow-200'
    },
    {
      id: 3,
      title: 'Premium payment receipt',
      subtitle: 'Generated 10 Nov 2024',
      type: 'payment',
      color: 'bg-green-100 border-green-200'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white-400 to-white-500 px-6 py-4">
        <div className="flex items-center">
  <h1 className="font-semibold text-xl" style={{ color: '#AC1F2D' }}>Client profile</h1>
</div>
      </div>

      {/* Profile Header */}
      <div className="bg-white/80 shadow-xl border-b rounded-b-2xl backdrop-blur-md">
        <div className="px-6 py-6">
          {loading ? (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex flex-col items-center sm:items-start w-full gap-2">
                <Skeleton className="h-8 w-48 mb-1" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
              {/* Larger profile icon with blur/glassmorphism */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center shadow-xl backdrop-blur-lg bg-purple-500/70 border-4 border-white">
                  <span className="text-4xl text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-cyan-300/20 blur-2xl" style={{ zIndex: -1 }}></div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-500 mb-2">Client ID: {user.id}</p>
                <div className="flex flex-col gap-1 text-gray-600">
                  <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {user.phone}</span>
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {user.email}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /> Joined: {user.joinDate}</span>
                  <span className="flex items-center gap-2"><Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Client Details</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                      <p className="text-gray-900">Mercy Mandela</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                      <p className="text-gray-900">March 15, 1985</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                      <p className="text-gray-900">mercy.mandela@email.com</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                      <p className="text-gray-900">+1 (555) 123-4567</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                      <p className="text-gray-900">123 Main Street<br />New York, NY 10001</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Policy Status</label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </>
              )}
              {!loading && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#AC1F2D] text-white py-2 px-4 rounded-lg hover:bg-[#8B1A26] transition-colors text-sm font-medium">
                      Update Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Latest Tasks */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full mb-2" />
                  ))}
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Latest Tasks</h3>
                    <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Show all
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {latestTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500">{task.status}</span>
                          </div>
                        </div>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add New Task</span>
                  </button>
                </>
              )}
            </div>

            {/* Pinned Documents & Files */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full" />
                  ))}
                  <Skeleton className="h-10 w-40 mt-4 mx-auto" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pinned Documents & Files</h3>
                    <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Show all
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className={`p-4 border-2 border-dashed rounded-lg ${doc.color} hover:shadow-md transition-shadow`}>
                        <div className="flex items-start justify-between mb-3">
                          <FileText className="w-8 h-8 text-gray-600" />
                          <div className="flex space-x-1">
                            <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{doc.title}</h4>
                        <p className="text-xs text-gray-600">{doc.subtitle}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <button className="bg-[#AC1F2D] text-white py-2 px-6 rounded-lg hover:bg-[#8B1A26] transition-colors text-sm font-medium flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Upload Document</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
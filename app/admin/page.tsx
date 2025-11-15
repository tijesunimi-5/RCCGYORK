'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/UI/Button';
import { FaInbox, FaSignOutAlt, FaTimesCircle, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { BiEnvelopeOpen } from 'react-icons/bi';
import gsap from 'gsap';

// Define the structure of a Contact Message
interface ContactMessage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  receivedAt: string;
  isRead: boolean;
}

// GSAP Utility: Function to run the animations
const runAnimations = () => {
  // 1. Initial fade-in of the header/controls
  gsap.fromTo('.js-dashboard-header',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  );

  // 2. Staggered fade-in of the message cards
  // Using a more general selector since we need all cards to stagger
  gsap.fromTo('.js-message-card',
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }
  );
};


export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to fetch messages securely
  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // 1. Get the client-side token
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError('Not authenticated. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
      setIsLoading(false);
      return;
    }

    try {
      // 2. Call the secure GET endpoint
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle 401 Unauthorized errors specifically
        if (response.status === 401) {
          throw new Error('Session expired or unauthorized. Please log in again.');
        }
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data.messages);

      // Run animations after data is loaded
      setTimeout(runAnimations, 100);

    } catch (err: any) {
      console.error('Fetch Error:', err);
      setError(err.message);
      if (err.message.includes('expired') || err.message.includes('unauthorized')) {
        // Clear token and redirect if authentication fails
        localStorage.removeItem('adminToken');
        setTimeout(() => router.push('/login'), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Initial load of messages
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    // Clear the HTTP-only cookie by redirecting to a logout endpoint if you had one
    // For simplicity here, we rely on the cookie expiring, or you can navigate home.
    router.push('/');
    alert('You have been logged out successfully.');
  };

  // Function to format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Placeholder for Mark as Read/Unread functionality (to be implemented later if needed)
  const handleMarkRead = (id: number) => {
    console.log(`Message ${id} marked as read.`);
    // Optimistically update UI
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, isRead: !msg.isRead } : msg));
  };


  // --- RENDERING LOGIC ---

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="text-center p-8 rounded-xl shadow-lg bg-white border border-red-200">
          <FaTimesCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => router.push('/login')} className="mt-4 bg-navy-700 hover:bg-navy-800">Go to Login</Button>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;


  return (
    <div className="min-h-screen bg-gray-50 mt-20 py-8 sm:py-12 px-2 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header and Controls */}
        <div className="js-dashboard-header flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 sm:mb-12 pb-4 border-b-4 border-red-700">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-0">
            <FaInbox className="text-red-700 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            Admin Inbox
            {unreadCount > 0 && (
              <span className="text-xs sm:text-base font-semibold bg-red-700 text-white rounded-full px-2 sm:px-3 py-0.5 ml-1 animate-pulse shrink-0">
                {unreadCount} New
              </span>
            )}
          </h1>
          <Button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-gray-200 text-gray-700 hover:bg-red-700 hover:text-white transition-all shadow-md"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-20">
            <FaSpinner className="h-10 w-10 text-red-700 mx-auto mb-4 animate-spin" />
            <p className="text-xl text-navy-600">Loading messages...</p>
          </div>
        )}

        {/* Messages List */}
        {!isLoading && messages.length === 0 && (
          <div className="text-center py-20 p-10 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
            <BiEnvelopeOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">Inbox Clear!</h2>
            <p className="text-gray-500">No new messages received yet. Check back soon.</p>
            <Button
              onClick={fetchMessages}
              className="mt-6 bg-navy-700 hover:bg-navy-800"
            >
              Refresh
            </Button>
          </div>
        )}

        {!isLoading && messages.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`js-message-card p-4 sm:p-6 rounded-xl shadow-xl transition-all border-l-4 sm:border-l-8 ${message.isRead
                    ? 'bg-white border-l-gray-400 opacity-90'
                    : 'bg-red-50 border-l-red-700 shadow-2xl hover:shadow-red-300/50'
                  }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div className="flex-1 min-w-0 mb-3 sm:mb-0">
                    <h3 className={`text-lg sm:text-xl font-bold truncate ${message.isRead ? 'text-navy-700' : 'text-red-700'}`}>
                      {message.firstName} {message.lastName}
                      {!message.isRead && (
                        <span className="text-xs font-semibold bg-red-700 text-white rounded-full px-2 py-0.5 ml-3">NEW</span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      <a href={`mailto:${message.email}`} className="hover:underline text-navy-500">{message.email}</a>
                      {/* Hide phone on very small screens if it makes layout too tight */}
                      {message.phone && <span className="ml-2 sm:ml-4 hidden sm:inline">| Phone: <a href={`tel:${message.phone}`} className="hover:underline text-navy-500">{message.phone}</a></span>}
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                    <p className="text-xs text-gray-500">{formatDate(message.receivedAt)}</p>
                    <Button
                      onClick={() => handleMarkRead(message.id)}
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs sm:text-sm text-gray-600 hover:text-red-700"
                      title={message.isRead ? "Mark as Unread" : "Mark as Read"}
                    >
                      {message.isRead ? <FaCheckCircle className="mr-1" /> : <BiEnvelopeOpen className="mr-1" />}
                      {message.isRead ? 'Read' : 'Unread'}
                    </Button>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap">
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
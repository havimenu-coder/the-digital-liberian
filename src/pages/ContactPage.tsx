import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MessageSquare, CheckCircle, Send, ArrowRight, MessageCircle } from 'lucide-react';
import { dataStore } from '../lib/storage';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSubject = searchParams.get('subject') || 'General Inquiry';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: initialSubject,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const subjectParam = new URLSearchParams(location.search).get('subject');
    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    }
  }, [location.search]);

  const subjectOptions = [
    "General Inquiry",
    "Library and Information Solutions Inquiry",
    "Media (Photography/Videography) Service Inquiry",
    "Partnership Inquiry",
    "Invite/Book me for an Event",
    "Feedback"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dataStore.saveSubmission({
        form_type: 'contact',
        data: formData
      });

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Failed to submit contact form', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Direct Inquiries & Collaboration
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Connect With The Digital Librarian
            </h1>
            <p className="text-base text-slate-300">
              Have a problem worth solving? Reach out directly to book a consultation, discuss partnerships, or invite Sylvester to speak.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Form (As requested in PDF 2) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border-2 border-brand-dark shadow-xl">
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex flex-col">
                <span className="font-serif text-xs font-bold text-brand-blue uppercase tracking-widest">
                  Direct Response
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mt-0.5">
                  GET IN TOUCH WITH ME OR MY TEAM
                </h2>
              </div>
            </div>

            {isSuccess ? (
              <div className="text-center py-12 space-y-4 bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-emerald-950">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you for reaching out. Sylvester Ebhonu or a designated team member will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ firstName: '', lastName: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-4 inline-block text-xs font-bold text-brand-blue hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                {/* 2. Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                      placeholder="e.g. 07030413987"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* 3. Subject Multiple Choice (As required in PDF 2) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Inquiry Category *</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue font-medium text-slate-800"
                  >
                    {subjectOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Consultation Details *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder="Provide context regarding your library, event dates, research challenges, or media requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Sylvester & Team'}</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>
            )}

          </div>

          {/* Right Column: Sylvester's Portrait & Direct Communication Channels (PDF 2) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Portrait Frame */}
            <div className="rounded-2xl overflow-hidden border-2 border-brand-dark shadow-lg bg-slate-100">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/sylvester-portrait.jpg"
                  alt="Sylvester Israel Ebhonu"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/sylvester-hero.jpg';
                  }}
                />
              </div>
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="font-serif text-lg font-bold text-brand-dark">
                  Sylvester Israel Ebhonu
                </div>
                <div className="text-xs text-brand-blue font-semibold">
                  Founder & Head of E-Services
                </div>
              </div>
            </div>

            {/* Direct Instant Channels */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-300 space-y-4">
              <div className="font-serif text-lg font-bold text-brand-dark">
                Fast Response Channels
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <a
                  href="https://wa.me/message/VV5A32BESJYHC1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Chat on WhatsApp (Direct Link)</div>
                    <div className="text-xs text-emerald-700">wa.me/message/VV5A32BESJYHC1</div>
                  </div>
                </a>

                <a
                  href="tel:07030413987"
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-brand-blue transition-colors"
                >
                  <Phone className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="font-bold text-brand-dark">Phone Call</div>
                    <div className="text-xs text-slate-500">07030413987</div>
                  </div>
                </a>

                <a
                  href="mailto:didigitallibrarian@gmail.com"
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-brand-blue transition-colors"
                >
                  <Mail className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="font-bold text-brand-dark">Direct Email</div>
                    <div className="text-xs text-slate-500">didigitallibrarian@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

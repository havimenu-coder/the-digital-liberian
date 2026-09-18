import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight, CreditCard, ArrowLeft } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Event } from '../types';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    category: 'Librarian',
    proficiency: 'Beginner/Novice',
    expectations: [] as string[],
    investment: '₦2,000 / $5',
    paymentReference: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    dataStore.getEvents().then(events => {
      const found = events.find(e => e.slug === slug);
      setEvent(found || events[0]);
      setLoading(false);
    });
  }, [slug]);

  const handleExpectationToggle = (item: string) => {
    setFormData(prev => {
      const exists = prev.expectations.includes(item);
      return {
        ...prev,
        expectations: exists
          ? prev.expectations.filter(e => e !== item)
          : [...prev.expectations, item]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dataStore.saveSubmission({
        form_type: 'event_registration',
        data: {
          event_id: event?.id,
          event_title: event?.title,
          ...formData
        }
      });

      setIsRegistered(true);

      // Auto redirect to WhatsApp community as instructed in PDF 2
      const redirectUrl = event?.whatsapp_redirect_url || "https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD";
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000);

    } catch (err) {
      console.error('Registration failed', err);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-blue border-t-transparent" />
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-xs text-brand-blue hover:text-white mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              {event.category} · {event.status === 'upcoming' ? 'Registration Open' : 'Archived'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              {event.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {event.tagline || event.description}
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Event Overview & Bank Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                About this Masterclass
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Official Bank Account Information (From PDF 2, Page 17) */}
            <div className="bg-slate-50 border-2 border-brand-dark rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Official Payment / Transfer Details</span>
              </div>
              
              <div className="space-y-2 text-sm text-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="font-semibold text-slate-600">Account Name:</span>
                  <span className="font-bold text-brand-dark">{event.bank_details?.account_name || 'SESITECH VENTURES'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="font-semibold text-slate-600">Account Number:</span>
                  <span className="font-mono font-bold text-brand-blue text-base">{event.bank_details?.account_number || '4011277179'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="font-semibold text-slate-600">Bank Name:</span>
                  <span className="font-bold text-brand-dark">{event.bank_details?.bank_name || 'FIDELITY BANK'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-600">Contact / Help:</span>
                  <span className="text-xs text-slate-600">{event.bank_details?.contact || '07030413987'}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic pt-1">
                Make your transfer for your chosen investment tier, copy the transaction reference number, and paste it into the registration form.
              </div>
            </div>

            {/* Redirection note */}
            <div className="p-4 bg-brand-blue-light/40 rounded-xl border border-brand-blue/30 text-xs text-slate-700 leading-relaxed">
              <strong>Automatic WhatsApp Community Access:</strong> Upon completing registration, you will automatically be redirected to join <em>The Digital Librarian's WhatsApp Community (Upskill & Learn)</em> where live session links and materials are distributed.
            </div>
          </div>

          {/* Right Column: Complete 10-Field Registration Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border-2 border-brand-dark p-6 sm:p-8 shadow-xl">
              
              {isRegistered ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark">
                    Registration Confirmed!
                  </h3>
                  <p className="text-sm text-slate-600">
                    Redirecting you to The Digital Librarian's WhatsApp Community (Upskill & Learn)...
                  </p>
                  <div className="pt-4">
                    <a
                      href={event.whatsapp_redirect_url}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold"
                    >
                      <span>Click here if not redirected automatically</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-brand-dark mb-1">
                    Event Registration Form
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Complete all details to reserve your seat and access the masterclass materials.
                  </p>

                  {/* 1 & 2. First & Last Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  {/* 3 & 4. Phone & Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone No. (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  {/* 5. Location */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Location (City/State/Country) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos, Nigeria / Nairobi, Kenya"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  {/* 6. Category */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Which Category best describes you? *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      <option value="Student">Student</option>
                      <option value="Lecturer/Teacher">Lecturer / Teacher</option>
                      <option value="Librarian">Librarian / Information Professional</option>
                      <option value="Administrator">Administrator / Corporate Executive</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* 7. AI/Tech proficiency */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">In terms of AI/Tech proficiency: *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner/Novice', 'Intermediate', 'Expert/Pro'].map(p => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setFormData({ ...formData, proficiency: p })}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                            formData.proficiency === p
                              ? 'bg-brand-dark text-white border-brand-dark'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 8. Expectations Checkboxes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">What are your expectations from this Masterclass? (Check all that apply)</label>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {[
                        "To improve my work/research performance and productivity",
                        "To upgrade my products/services delivery by leveraging AI",
                        "To establish research or business relations for future collaborations",
                        "To gain practical know-how and become a Master of AI"
                      ].map((exp, i) => (
                        <label key={i} className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.expectations.includes(exp)}
                            onChange={() => handleExpectationToggle(exp)}
                            className="mt-0.5 accent-brand-blue"
                          />
                          <span>{exp}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 9. Investment Choice */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">What can you invest to gain this AI Knowledge, Certification & Resources? *</label>
                    <select
                      value={formData.investment}
                      onChange={e => setFormData({ ...formData, investment: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-brand-dark"
                    >
                      <option value="₦1,000 / $3">₦1,000 / $3 (Access Only)</option>
                      <option value="₦2,000 / $5">₦2,000 / $5 (Standard: Session + Certificate + Recording)</option>
                      <option value="₦5,000 / $11">₦5,000 / $11 (Executive VIP: Materials + 1-on-1 Coaching Audit)</option>
                      <option value="Keynote Free Only">I can't afford it, I will attend only the Keynote Address (Free)</option>
                    </select>
                  </div>

                  {/* 10. Evidence of Payment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Evidence of Payment (Type Transaction Reference No. if paid):</label>
                    <input
                      type="text"
                      placeholder="e.g. FBN/20260917/998234"
                      value={formData.paymentReference}
                      onChange={e => setFormData({ ...formData, paymentReference: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Registering...' : 'Complete Registration & Join WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

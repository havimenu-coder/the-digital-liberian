import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { dataStore } from '../../lib/storage';

interface FreeGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeGiftModal: React.FC<FreeGiftModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save submission to dataStore
      await dataStore.saveSubmission({
        form_type: 'gift_download',
        data: {
          ...formData,
          requested_gift: "Prescription of AI Tools for Quantum Leap Productivity"
        }
      });

      setIsSuccess(true);

      // Construct WhatsApp message URL with pre-filled prompt
      const whatsappMessage = encodeURIComponent(
        `Hello Sylvester Ebhonu / The Digital Librarian, my name is ${formData.firstName} ${formData.lastName}. I need your "Prescription of AI Tools I can leverage to work smarter and gain a quantum leap in my business and services."`
      );
      const whatsappUrl = `https://wa.me/message/VV5A32BESJYHC1?text=${whatsappMessage}`;

      // Redirect after brief feedback
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        onClose();
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-dark">
              Request Received!
            </h3>
            <p className="text-sm text-slate-600">
              Redirecting you to WhatsApp with your customized message to claim your prescription toolkit...
            </p>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary Professional Gift</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-brand-dark leading-tight">
              Get Sylvester's "Prescription of AI Tools"
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Curated blueprint of over 50+ vetted AI tools to work smarter, accelerate research, and gain a quantum leap in your productivity.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                    placeholder="e.g. John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                    placeholder="e.g. Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  placeholder="e.g. 07030413987"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Processing...' : 'Submit & Download Free Gift'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-400">
                Direct WhatsApp redirect upon submit. No spam, ever.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

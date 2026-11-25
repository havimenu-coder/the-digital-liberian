import React from 'react';
import { AlertCircle } from 'lucide-react';

/** Shown when a form could not be saved. Never implies that anything was sent. */
export const FORM_SUBMIT_ERROR_MESSAGE =
  "Sorry, we couldn't submit this form right now, so nothing has been sent. Your details are still filled in — please try again in a few minutes, or contact us directly by phone, WhatsApp or email.";

export const FormSubmitError: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

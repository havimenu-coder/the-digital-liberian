import React, { useMemo } from 'react';
import { sanitizeHtml } from '../../lib/sanitizeHtml';

interface SafeHtmlProps {
  html: string | null | undefined;
  className?: string;
}

/**
 * The ONLY component allowed to use dangerouslySetInnerHTML
 * (enforced by scripts/check-raw-html.js). Always sanitizes at render time,
 * which also protects content already stored in the database.
 */
export const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className }) => {
  const clean = useMemo(() => sanitizeHtml(html), [html]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
};

import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SafeHtml } from './SafeHtml';

describe('<SafeHtml>', () => {
  it('renders sanitized HTML with the given className', () => {
    const markup = renderToStaticMarkup(
      <SafeHtml className="prose" html={'<p>Hello</p><img src="x" onerror="alert(1)"><script>alert(2)</script>'} />
    );
    expect(markup).toBe('<div class="prose"><p>Hello</p><img src="x"></div>');
  });

  it('renders an empty div for empty content', () => {
    expect(renderToStaticMarkup(<SafeHtml html={undefined} />)).toBe('<div></div>');
  });
});

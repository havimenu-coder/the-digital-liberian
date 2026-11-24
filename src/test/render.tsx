import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

/** Let pending promises and effects settle inside act(). */
export async function flush() {
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
}

/** Render `element` at `route`, matched by `path` (for useParams). */
export async function renderAt(element: React.ReactElement, { path = '/', route = '/' } = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      </MemoryRouter>
    );
  });
  await flush();
  return {
    container,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    }
  };
}

export async function submitForm(form: HTMLFormElement) {
  await act(async () => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  await flush();
}

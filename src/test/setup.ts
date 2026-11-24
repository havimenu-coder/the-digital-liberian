// Node >= 25 ships an experimental global `localStorage` that shadows jsdom's
// implementation and is undefined unless Node is started with --localstorage-file.
// Point the global back at jsdom's storage so code under test can use it.
const jsdomStorage = (globalThis as any).jsdom?.window?.localStorage
  ?? (typeof window !== 'undefined' ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'localStorage')?.get?.call(window) : undefined);

if (jsdomStorage && globalThis.localStorage !== jsdomStorage) {
  Object.defineProperty(globalThis, 'localStorage', { value: jsdomStorage, configurable: true, writable: true });
}

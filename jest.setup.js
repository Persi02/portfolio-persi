/* eslint-disable @typescript-eslint/no-require-imports */
const { cleanup } = require("@testing-library/react");

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => "dark"),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
  writable: true,
});

// Make cleanup available globally for tests
global.cleanup = cleanup;
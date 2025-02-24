import { vi } from "vitest";
import { config } from "@vue/test-utils";

// Mock localStorage
vi.stubGlobal("localStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
});

// Mock vue-router
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock axios
vi.mock("axios", () => ({
  get: vi.fn(),
  post: vi.fn(),
}));

// ✅ Stubowanie brakujących komponentów, aby uniknąć błędów w testach
config.global.stubs = {
  "router-link": true,
  "apexchart": true,
};

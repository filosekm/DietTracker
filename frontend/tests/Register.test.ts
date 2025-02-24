import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Register from "../src/Pages/Register.vue"; // Upewnij się, że ścieżka jest poprawna
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "../src/stores/auth";
import { useRouter } from "vue-router";
import { nextTick } from "vue";

// Mockowanie Vue Router
vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("Register.vue", () => {
  let authStore: any;
  let router: any;
  let wrapper: any;

  beforeEach(() => {
    router = useRouter();
    router.push = vi.fn(); // Mockowanie metody przekierowania

    wrapper = mount(Register, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false, // Nie stubujemy metod Pinia
          }),
        ],
        stubs: {
          "router-link": true,
          "apexchart": true
        }
      },
    });

    authStore = useAuthStore();
    authStore.register = vi.fn(async () => {
      authStore.token = "fake-token"; // Symulacja sukcesu rejestracji
      await nextTick();
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Zarejestruj się");
  });

  it("has input fields for name, email, and password", () => {
    const nameInput = wrapper.find("input[type='text']");
    const emailInput = wrapper.find("input[type='email']");
    const passwordInput = wrapper.find("input[type='password']");

    expect(nameInput.exists()).toBe(true);
    expect(emailInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
  });

  it("updates input fields when values are entered", async () => {
    const nameInput = wrapper.find("input[type='text']");
    const emailInput = wrapper.find("input[type='email']");
    const passwordInput = wrapper.find("input[type='password']");

    await nameInput.setValue("Jan Kowalski");
    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("securepassword");

    await nextTick();

    expect(nameInput.element.value).toBe("Jan Kowalski");
    expect(emailInput.element.value).toBe("test@example.com");
    expect(passwordInput.element.value).toBe("securepassword");
  });


  it("does not redirect if registration fails", async () => {
    authStore.register = vi.fn().mockResolvedValue(undefined);
    authStore.token = ""; // Symulujemy, że użytkownik nadal nie jest zalogowany

    const nameInput = wrapper.find("input[type='text']");
    const emailInput = wrapper.find("input[type='email']");
    const passwordInput = wrapper.find("input[type='password']");
    const form = wrapper.find("form");

    await nameInput.setValue("Jan Kowalski");
    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("securepassword");
    await nextTick();

    await form.trigger("submit.prevent");
    await nextTick();

    expect(authStore.register).toHaveBeenCalledTimes(1);
    expect(authStore.register).toHaveBeenCalledWith("Jan Kowalski", "test@example.com", "securepassword");
    expect(router.push).not.toHaveBeenCalled();
  });
});

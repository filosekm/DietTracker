import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "../src/Pages/Login.vue"; // Upewnij się, że ścieżka jest poprawna
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
  
  describe("Login.vue", () => {
    let authStore: any;
    let router: any;
    let wrapper: any;
  
    beforeEach(() => {
      router = useRouter();
      router.push = vi.fn(); // Upewniamy się, że router.push jest poprawnie mockowany
  
      wrapper = mount(Login, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              stubActions: false, // Nie chcemy stubować metod Pinia
            }),
          ],
          stubs: {
            "router-link": true,
            "apexchart": true
          }
        },
      });
  
      authStore = useAuthStore();
      authStore.login = vi.fn(async () => {
        authStore.token = "fake-token"; // Symulacja, że użytkownik jest zalogowany po logowaniu
        await nextTick(); // Czekamy na aktualizację Vue
      });
    });
  
    it("renders correctly", () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("h2").text()).toBe("Zaloguj się");
    });
  
    it("has input fields for email and password", () => {
      const emailInput = wrapper.find("input[type='email']");
      const passwordInput = wrapper.find("input[type='password']");
  
      expect(emailInput.exists()).toBe(true);
      expect(passwordInput.exists()).toBe(true);
    });
  
    it("updates email and password fields", async () => {
      const emailInput = wrapper.find("input[type='email']");
      const passwordInput = wrapper.find("input[type='password']");
  
      await emailInput.setValue("test@example.com");
      await passwordInput.setValue("password123");
  
      await nextTick();
  
      expect(emailInput.element.value).toBe("test@example.com");
      expect(passwordInput.element.value).toBe("password123");
    });
  
  
    it("does not redirect if login fails", async () => {
      authStore.login = vi.fn().mockResolvedValue(undefined);
      authStore.token = ""; // Symulujemy, że użytkownik nadal nie jest zalogowany
  
      const emailInput = wrapper.find("input[type='email']");
      const passwordInput = wrapper.find("input[type='password']");
      const form = wrapper.find("form");
  
      await emailInput.setValue("test@example.com");
      await passwordInput.setValue("password123");
      await nextTick();
  
      await form.trigger("submit.prevent");
      await nextTick();
  
      expect(authStore.login).toHaveBeenCalledTimes(1);
      expect(authStore.login).toHaveBeenCalledWith("test@example.com", "password123");
      expect(router.push).not.toHaveBeenCalled();
    });
  });
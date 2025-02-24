import { mount, flushPromises } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { vi } from "vitest";
import Login from "../src/Pages/Login.vue";
import { useAuthStore } from "../src/stores/auth";

const routerPushMock = vi.fn(); // Tworzymy mock dla routera

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe("Login.vue - Test integracyjny", () => {
  let authStore: any;
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    authStore = useAuthStore();
    authStore.login = vi.fn(() => Promise.resolve());
  });

  it("powinien wywołać metodę login i przekierować użytkownika", async () => {
    const emailInput = wrapper.find("input[type='email']");
    const passwordInput = wrapper.find("input[type='password']");
    const loginButton = wrapper.find("button[type='submit']");

    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("password123");

    authStore.token = "fake-token"; // ✅ Symulujemy poprawne logowanie

    await loginButton.trigger("submit");

    await flushPromises();

    expect(authStore.login).toHaveBeenCalledWith("test@example.com", "password123");
    expect(routerPushMock).toHaveBeenCalledWith("/"); // ✅ Upewniamy się, że przekierowanie działa
  });

});

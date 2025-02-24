import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Home from "../src/Pages/Home.vue"; // Użycie ścieżki względnej
import { createTestingPinia } from "@pinia/testing";
import { useNotificationsStore } from "../src/stores/notificationsStore";
import { useActivitiesStore } from "../src/stores/activitiesStore";

vi.mock("vue3-apexcharts", () => ({
  default: {
    name: "apexchart",
    render: () => null, // Mockowanie wykresów
  },
}));

describe("Home.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          "router-link": true,
          "apexchart": true
        }
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Witaj w Diet Tracker");
  });

  it("renders feature cards", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    const featureCards = wrapper.findAll(".grid div");
    expect(featureCards.length).toBeGreaterThan(0);
  });



  it("hides charts when isApexLoaded is false", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      data() {
        return { isApexLoaded: false };
      },
    });

    expect(wrapper.find("apexchart").exists()).toBe(false);
  });
});

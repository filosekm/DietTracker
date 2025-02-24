import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GoalsSettings from "../src/Pages/Settings.vue"; // Upewnij się, że ścieżka jest poprawna
import { createTestingPinia } from "@pinia/testing";
import { useGoalsStore } from "../src/stores/goals";
import { nextTick } from "vue";

describe("Settings.vue", () => {
  let goalsStore: any;
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(GoalsSettings, {
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

    goalsStore = useGoalsStore();
    goalsStore.goals = {
      calories: 2000,
      protein: 100,
      carbs: 250,
      fats: 80,
    };
    goalsStore.setGoals = vi.fn();
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Ustawienia Celów");
  });

  it("has input fields for calories, protein, carbs, and fats", () => {
    const inputs = wrapper.findAll("input[type='number']");
    expect(inputs.length).toBe(4);
  });

  it("updates input fields when values are entered", async () => {
    const inputs = wrapper.findAll("input[type='number']");

    await inputs[0].setValue(2200);
    await inputs[1].setValue(120);
    await inputs[2].setValue(260);
    await inputs[3].setValue(90);

    await nextTick();

    expect(inputs[0].element.value).toBe("2200");
    expect(inputs[1].element.value).toBe("120");
    expect(inputs[2].element.value).toBe("260");
    expect(inputs[3].element.value).toBe("90");
  });

  it("calls setGoals method on submit", async () => {
    const inputs = wrapper.findAll("input[type='number']");
    const form = wrapper.find("form");

    await inputs[0].setValue(2200);
    await inputs[1].setValue(120);
    await inputs[2].setValue(260);
    await inputs[3].setValue(90);
    await nextTick();

    await form.trigger("submit.prevent");
    await nextTick();

    expect(goalsStore.setGoals).toHaveBeenCalledTimes(1);
    expect(goalsStore.setGoals).toHaveBeenCalledWith({
      calories: 2200,
      protein: 120,
      carbs: 260,
      fats: 90,
    });
  });

  it("displays success message after updating goals", async () => {
    const form = wrapper.find("form");

    await form.trigger("submit.prevent");
    await nextTick();

    const successMessage = wrapper.find("p.text-green-500");
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toBe("Cele zostały zaktualizowane!");
  });

  it("clears success message after timeout", async () => {
    const form = wrapper.find("form");

    await form.trigger("submit.prevent");
    await nextTick();

    await new Promise((resolve) => setTimeout(resolve, 3100));
    await nextTick();

    const successMessage = wrapper.find("p.text-green-500");
    expect(successMessage.exists()).toBe(false);
  });
});

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ActivityTracker from "../src/Pages/Activities.vue"; // Upewnij się, że ścieżka jest poprawna
import { nextTick } from "vue";

describe("ActivityTracker.vue", () => {
    it("renders correctly", () => {
      const wrapper = mount(ActivityTracker,{
        global: {
          stubs: {
            "router-link": true,
            "apexchart": true
          }
        }
      });
  
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("h2").text()).toBe("Aktywność Fizyczna");
    });
  
    it("displays 'Brak zapisanych aktywności.' when there are no activities", () => {
      const wrapper = mount(ActivityTracker);
  
      const noActivitiesMessage = wrapper.find("p.text-center");
      expect(noActivitiesMessage.exists()).toBe(true);
      expect(noActivitiesMessage.text()).toBe("Brak zapisanych aktywności.");
    });
  
    it("adds a new activity when input values are provided", async () => {
      const wrapper = mount(ActivityTracker);
  
      const inputs = wrapper.findAll("input");
      expect(inputs.length).toBe(3); // Sprawdzamy, czy są wszystkie inputy
  
      await inputs[0].setValue("Bieganie");
      await inputs[1].setValue(30);
      await inputs[2].setValue(250);
  
      const addButton = wrapper.find("button");
      await addButton.trigger("click");
  
      await nextTick();
  
      const activityList = wrapper.findAll("li");
      expect(activityList.length).toBe(1);
      expect(activityList[0].text()).toContain("Bieganie – 30 min");
    });
  
    it("removes an activity when delete button is clicked", async () => {
      const wrapper = mount(ActivityTracker);
  
      const inputs = wrapper.findAll("input");
      await inputs[0].setValue("Jazda na rowerze");
      await inputs[1].setValue(45);
      await inputs[2].setValue(400);
  
      const addButton = wrapper.find("button");
      await addButton.trigger("click");
  
      await nextTick();
  
      const removeButton = wrapper.find("li button");
      expect(removeButton.exists()).toBe(true);
  
      await removeButton.trigger("click");
  
      await nextTick();
  
      const activityList = wrapper.findAll("li");
      expect(activityList.length).toBe(0);
    });
  
    it("does not add an activity if name or duration is missing", async () => {
      const wrapper = mount(ActivityTracker);
  
      const inputs = wrapper.findAll("input");
      const addButton = wrapper.find("button");
  
      // Brak nazwy aktywności
      await inputs[1].setValue(30);
      await inputs[2].setValue(200);
      await addButton.trigger("click");
      await nextTick();
      expect(wrapper.findAll("li").length).toBe(0);
  
      // Brak czasu trwania
      await inputs[0].setValue("Pływanie");
      await inputs[1].setValue("");
      await addButton.trigger("click");
      await nextTick();
      expect(wrapper.findAll("li").length).toBe(0);
    });
  });
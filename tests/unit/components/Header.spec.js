// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

// Components
import Header from '@/components/Header.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();

jest.mock('@/event-bus.js', () => {
  const EventBus = {
    $on: jest.fn(),
    $emit: jest.fn(),
    $off: jest.fn(),
  };

  global.EventBus = EventBus;
  return global.EventBus;
});

describe('Header.vue', () => {
  let vuetify, wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Header, {
      localVue,
      vuetify,
    });
  });

  it('should listen EventBus event on mounted', async () => {
    expect(global.EventBus.$on).toBeCalledWith(
      'update-question-count',
      expect.any(Function)
    );
  });

  test('should update index when updateIndex method invoked', () => {
    expect(wrapper.vm.index).toBe(0);
    wrapper.vm.updateIndex(1);

    expect(wrapper.vm.index).toBe(1);
  });

  test('should $off EventBus when component has been destroyed', () => {
    wrapper.destroy();

    expect(global.EventBus.$off).toBeCalledWith('update-question-count');
  });
});

// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

// Components
import Question from '@/components/Question.vue';

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

const question = {
  category: 'Science & Nature',
  type: 'multiple',
  difficulty: 'easy',
  question:
    'Rhinoplasty is a surgical procedure on what part of the human body?',
  correct_answer: 'Nose',
  incorrect_answers: ['Ears', 'Chin', 'Neck'],
};

const options = ['Nose', 'Ears', 'Chin', 'Neck'];

describe('Question.vue', () => {
  let vuetify, wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Question, {
      localVue,
      vuetify,
      propsData: {
        question,
        options,
      },
    });
  });

  it('should set selectedOption properly', () => {
    const answer = 'Nose';
    wrapper.vm.setSelectedOption(answer);

    expect(wrapper.vm.selectedOption).toBe(answer);
    expect(global.EventBus.$emit).toBeCalledWith('selected-option', answer);
  });

  it('should reset selectedOption properly', () => {
    wrapper.vm.resetSelectedOption();

    expect(wrapper.vm.selectedOption).toBe('');
    expect(wrapper.vm.selectedOptionIndex).toBe(undefined);
  });

  it('should set selectedOption to empty string when option unselected', async () => {
    const answer = 'Nose';
    wrapper.vm.setSelectedOption(answer);

    wrapper.vm.selectedOptionIndex = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedOptionIndex).toBe(true);
    expect(wrapper.vm.selectedOption).toBe(answer);

    wrapper.vm.selectedOptionIndex = false;

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedOptionIndex).toBe(false);
    expect(wrapper.vm.selectedOption).toBe('');
  });

  test('should $off EventBus when component has been destroyed', () => {
    wrapper.destroy();

    expect(global.EventBus.$off).toBeCalledWith('question-changed');
  });
});

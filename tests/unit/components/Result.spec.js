// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

// Components
import Result from '@/components/Result.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

const answers = [
  {
    category: 'Science & Nature',
    correct_answer: 'Femur',
    difficulty: 'easy',
    incorrect_answers: ['Cranium', 'Humerus', 'Tibia'],
    question: 'Which of these bones is hardest to break?',
    type: 'multiple',
    selectedOption: 'Femur',
  },
  {
    category: 'Science & Nature',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Which type of rock is created by intense heat AND pressure?',
    correct_answer: 'Metamorphic',
    incorrect_answers: ['Sedimentary', 'Igneous', 'Diamond'],
  },
];

describe('Result.vue', () => {
  let vuetify, wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Result, {
      localVue,
      vuetify,
    });
  });

  test('should set answers properly', () => {
    wrapper.vm.setAnswers(answers);

    expect(wrapper.vm.answers).toEqual(answers);
  });

  test('should calculate total responses properly', () => {
    wrapper.vm.setAnswers(answers);
    wrapper.vm.calculateTotalResponses();

    expect(wrapper.vm.totalResponses).toBe(1);
  });

  test('should show result correctly', () => {
    wrapper.vm.viewResult(answers);

    expect(wrapper.vm.correctAnswerCount).toBe(1);
    expect(wrapper.vm.viewCorrectAnswerCount).toBe(true);
  });
});

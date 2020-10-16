// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

// Components
import Quiz from '@/components/Quiz.vue';

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

const questions = [
  {
    category: 'Science & Nature',
    correct_answer: 'Femur',
    difficulty: 'easy',
    incorrect_answers: ['Cranium', 'Humerus', 'Tibia'],
    question: 'Which of these bones is hardest to break?',
    type: 'multiple',
  },
];

describe('Quiz.vue', () => {
  let vuetify, wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Quiz, {
      localVue,
      vuetify,
      propsData: {
        questions,
      },
    });
  });

  test('should navigate question properly', () => {
    const navigatorSpy = jest.spyOn(wrapper.vm, 'navigator');

    // next question
    wrapper.vm.next();
    expect(wrapper.vm.index).toBe(1);
    expect(navigatorSpy).toBeCalled();
    expect(global.EventBus.$emit).toBeCalledWith('question-changed');
    expect(global.EventBus.$emit).toBeCalledWith('update-question-count', 1);

    //previous question
    wrapper.vm.previous();
    expect(wrapper.vm.index).toBe(0);
    expect(navigatorSpy).toBeCalled();
    expect(global.EventBus.$emit).toBeCalledWith('question-changed');
    expect(global.EventBus.$emit).toBeCalledWith('update-question-count', 0);
  });

  test('should reset question properly', () => {
    const navigatorSpy = jest.spyOn(wrapper.vm, 'navigator');
    wrapper.vm.reset();

    expect(wrapper.vm.index).toBe(0);
    expect(wrapper.vm.answers.length).toBe(0);
    expect(global.EventBus.$emit).toBeCalledWith('answers', []);
    expect(navigatorSpy).toBeCalled();
    expect(global.EventBus.$emit).toBeCalledWith('question-changed');
    expect(global.EventBus.$emit).toBeCalledWith('update-question-count', 0);
  });

  it('should update selectedOption properly', async () => {
    const selectedOption = 'Femur';
    wrapper.vm.updateSelectedOption(selectedOption);

    const answers = [
      {
        ...questions[0],
        selectedOption,
      },
    ];

    expect(wrapper.vm.answers).toEqual(answers);
    expect(global.EventBus.$emit).toBeCalledWith('answers', answers);
  });

  test('should $off EventBus when component has been destroyed', () => {
    wrapper.destroy();

    expect(global.EventBus.$off).toBeCalledWith('selected-option');
  });
});

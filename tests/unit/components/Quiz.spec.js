
// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

// Components
import Quiz from '@/components/Quiz.vue'

Vue.use(Vuetify);

const localVue = createLocalVue();

const questions = [{
    "category": "Science & Nature",
    "correct_answer": "Femur",
    "difficulty": "easy",
    "incorrect_answers": [
        "Cranium",
        "Humerus",
        "Tibia"
    ],
    "question": "Which of these bones is hardest to break?",
    "type": "multiple"
}]

describe('Quiz.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    test('snapshot', () => {
        const wrapper = mount(Quiz, {
            localVue,
            vuetify,
            propsData: {
                questions
            }
        })
        expect(wrapper).toMatchSnapshot
    });
});
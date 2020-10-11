
// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

// Components
import Quiz from '@/components/Quiz.vue'

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Quiz.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    test('snapshot', () => {
        const wrapper = mount(Quiz, {
            localVue,
            vuetify,
        })
        expect(wrapper).toMatchSnapshot
    });
});
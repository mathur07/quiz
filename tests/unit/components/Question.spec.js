
// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

// Components
import Question from '@/components/Question.vue'

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Question.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    test('snapshot', () => {
        const wrapper = mount(Question, {
            localVue,
            vuetify,
        })
        expect(wrapper).toMatchSnapshot
    });
});
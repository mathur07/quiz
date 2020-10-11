
// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

// Components
import Result from '@/components/Result.vue'

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Result.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    test('snapshot', () => {
        const wrapper = mount(Result, {
            localVue,
            vuetify,
        })
        expect(wrapper).toMatchSnapshot
    });
});
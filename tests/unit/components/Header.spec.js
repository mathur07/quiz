
// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

// Components
import Header from '@/components/Header.vue'

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Header.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    test('snapshot', () => {
        const wrapper = mount(Header, {
            localVue,
            vuetify,
        })
        expect(wrapper).toMatchSnapshot
    });
});
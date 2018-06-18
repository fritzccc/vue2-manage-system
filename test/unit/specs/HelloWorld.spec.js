import Vue from 'vue'
import {mount} from '@vue/test-utils'
import HelloWorld from '../../../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.vm.msg)
      .toBe('Welcome to Your Vue.js App')
  })
})

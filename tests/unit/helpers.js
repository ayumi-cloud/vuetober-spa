import Vue from 'vue';
import modules from '@/app/store';
import routes from '@/app/routes';
import sinon from 'sinon';
import { factory as spyfuVueFactory } from 'spyfu-vue-factory';

//
// click an element
//
window.click = function click(el) {
    el.click();
}

//
// create a vue factory
//
window.factory = function factory(options = {}) {
    return spyfuVueFactory({
        Vue,
        modules,
        routes,
        ...options,
    });
}

//
// simulate an input event
//
window.input = function (value, el) {
    el.value = value;

    return simulate('input', el);
}

//
// default mount function
//
window.mount = factory();

//
// no-op
//
window.noop = () => {};

//
// simulate an event
//
window.simulate = function (name, el, setupFn) {
    const e = new Event(name);

    if (setupFn) {
        setupFn(e);
    }

    return el.dispatchEvent(e);
};

//
// test sandbox
// this is cleaned up after each test
//
window.sandbox = sinon.createSandbox();
window.spy = sandbox.spy;
window.stub = sandbox.stub;

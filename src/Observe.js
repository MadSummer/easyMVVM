/*
 * @Author: Liu Jing 
 * @Date: 2017-03-10 16:36:07 
 * @Last Modified by: liujing
 * @Last Modified time: 2017-03-12 21:18:35
 */

const Pub = require('./Publish');
/**
 * 
 * 
 * @param {Object} obj
 * object which want to observe
 * @param {Object} parent
 * object's parent  
 */
let pubs = {};
function Observe(obj,parent) {
  this.obj = obj;
  this.parent = parent === undefined ? null : parent;
  this.init(obj);
}
Observe.prototype = {
  init: function (obj) {
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key])
    })
  },
  defineReactive: function (obj, prop, value) {
    let pub = new Pub();
    obj.__observe = pub;
    Object.defineProperty(obj, prop, {
      enumerable: true,
      configurable: false,
      get: function () {
        return value;
      },
      set: function (newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        pub.notify();
      }
    });
    if (!this.parent) {
      pubs[prop] = {
        child: {},
        pub:pub
      }
    }
    else {
      pubs[this.parent]['child'] = {
        child: {},
        pub:pub
      }
    }
    if (typeof value === 'object') {
      new Observe(value, prop);
    }
  }
}

module.exports = Observe
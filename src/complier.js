/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-03-11 23:29:17 
 * @Last Modified by: liujing
 * @Last Modified time: 2017-03-12 01:09:23
 */
const ch = require('./complierHelper');
/**
 * 
 * 
 * @param {MVVM} mvvm
 * MVVM 实例
 * @param {String} el
 * 编译顶级元素selector
 */
function Complier(mvvm, el) {
  this.$mvvm = mvvm;
  this.$el = document.querySelector(el);
  if (this.$el) {
    this.$fragment = this.nodeToFragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}
Complier.prototype = {
  nodeToFragment: function (el) {
    let fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  },
  init: function () {
    this.comlierNode(this.$fragment);
  },
  comlierNode: function (el) {
    let childNodes = el.childNodes;
    let reg = /\{\{(.*)\}\}/;
    Array.from(childNodes).forEach(node => {
      if (( !ch.isElement(node) ) && reg.test(node.nodeValue)) {
        this.comlierText(node);
      }
      if (ch.isElement(node)) {
        this.comlierElement(node);
      }

    })
  },
  comlierElement: function (node) {
    let attributes = node.attributes;
    Array.from(attributes).forEach(attr => {
      let attrName = attr.name;
      let attrValue = attr.value;
      if (ch.isEvent(attrName)) {
        return ch.eventHandler(attributes, node, this.$mvvm, attrValue);
      }
      if (ch.isDirective(attrName)) {
        return ch.directiveHandler(attrName, node, this.$mvvm, attrValue);
      }
    })
  },
  comlierText: function (node) {
    
  }
}

module.exports = Complier;
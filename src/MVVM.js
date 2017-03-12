/*
 * @Author: Liu Jing 
 * @Date: 2017-03-10 16:16:20 
 * @Last Modified by: liujing
 * @Last Modified time: 2017-03-12 21:19:29
 */
const Complier = require('./complier');
const Observe = require('./Observe');
function MVVM(obj) {
  this.$option = obj;
  this.$el = document.querySelector(obj.el);
  this.$data = obj.data;
  new Observe(this.$data)
  this.$method = obj.method;
  this.init();
}
MVVM.prototype.init = function () {
  new Complier(this,this.$option.el);
}

module.exports = MVVM;
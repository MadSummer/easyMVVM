const Dep = require('./Observe').Dep;

/**
 * 
 * 
 * @param {MVVM} mvvm
 * MVVM 实例
 * @param {Node} node
 * Node
 * @param {String} prop
 * 监听的属性
 * @param {Function} cb
 * 触发更新后的回调函数
 */
function Watcher(mvvm, node, prop, cb) {
  this.cb = cb;
  this.mvvm = mvvm;
  this.prop = prop;
  this.value = this.get();

}
Watcher.prototype = {
  get: function () {
    Dep.target = this;
    let prop = this.prop;
    let val = this.mvvm.$data;
    let value = eval('val.prop');
    return value;
  },
  /**
   * 
   * 
   * @param {Dep} dep 
   */
  addDep: function (dep) {
    dep.addSub(this);
  },
  update: function () {
    let value = this.get();
    let oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
}
module.exports = Watcher;
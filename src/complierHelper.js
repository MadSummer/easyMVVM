const Watcher = require('./Watcher');
module.exports = {
  isElement: node => {
    return node.nodeType === 1;
  },
  isDirective: attrName => {
    return attrName.indexOf('v-') == 0;
  },
  isEvent: attrName => {
    return attrName.indexOf('v-on') == 0;
  },
  /**
   * 
   * 
   * @param {String} directive
   * 指令
   * @param {Node} node
   * 节点
   * @param {MVVM} mvvm
   * MVVM 实例
   * @param {String} value
   * 指令值
   */
  eventHandler: function (directive, node, mvvm, value) {
    let type = directive.split(':')[1];
    let fn = mvvm.$option.methods[value];
    node.addEventListener(type, fn.bind(mvvm), false);
  },
  /**
   * 
   * 
   * @param {String} directive
   * 指令
   * @param {Node} node
   * 节点
   * @param {MVVM} mvvm
   * MVVM 实例
   * @param {String} prop
   * v-text = message 中的message
   */
  directiveHandler: function (directive, node, mvvm, prop) {
    switch (directive.replace('v-', '')) {
      case 'text':
        new Watcher(mvvm, node, prop, value => {
          node.textContent = typeof value === 'undefined' ? '' : value;
        })
        break;
      case 'model':
      node.addEventListener('input',(e) => {
        let newValue = e.target.value;
        mvvm.$data[prop] = newValue;
      })  
        new Watcher(mvvm, node, prop, value => {
          node.value = typeof value === 'undefined' ? '' : value;
        })
        break;
      default:
        break;
    }
  }
}
/*
 * @Author: Liu Jing 
 * @Date: 2017-03-10 16:16:13 
 * @Last Modified by: Liu Jing
 * @Last Modified time: 2017-03-10 18:23:38
 */
const MVVM = require('./MVVM');

let vm = new MVVM({
  el: '#app',
  data: {
    message: 'this is a easy mvvm ',
    list: [
      'one',
      'two',
      'three'
    ]
  },
  method: {
    changeMessage: function () {
      this.message += 'x';
    }
  }
})
window.vm = vm;
//p.appendChild(vm.doc)
console.log(vm)
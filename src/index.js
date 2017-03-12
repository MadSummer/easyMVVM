const MVVM = require('./MVVM');
let mvvm = new MVVM({
  el: '#app',
  data: {
    message: {
      user: {
        name: 'liujing',
        age:12
      },
      valid:true
    }
  },
  methods: {
    getMessage: function () {
      return this.message;
    }
  }
});
window.mvvm = mvvm
console.log(mvvm);
let uid = 0;
/**
 * 消息订阅器
 * 
 */
function Publish(type) {
  this.id = uid++;
  this.subs = [];
}
Publish.instance = {};
Publish.prototype = {
  /**
   * 
   * 
   * @param {any} sub 
   */
  addSub: function (sub) {
    if (typeof sub.update !== 'function') return;
    this.subs.push(sub)
  },
  /**
   * 
   * 
   * @param {any} sub 
   */
  removeSub: function (sub) {
    let index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  },
  /**
   * 发送通知
   * 调用订阅者的update函数
   */
  notify: function () {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

module.exports = Publish;
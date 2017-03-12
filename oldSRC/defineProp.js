/*
 * @Author: Liu Jing 
 * @Date: 2017-03-10 16:42:11 
 * @Last Modified by: Liu Jing
 * @Last Modified time: 2017-03-10 16:45:42
 */
/**
 * 
 * 
 * @param {Object} obj 
 * @param {String} prop 
 */
module.exports = (obj,prop,cb) => {
  Object.defineProperty(obj, prop, {
    get: function () {
      return obj[prop];
    },
    set: function (value) {
      obj[prop] = value;
      cb(value);
    }
  })
}
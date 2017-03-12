/*
 * @Author: Liu Jing 
 * @Date: 2017-03-10 16:09:53 
 * @Last Modified by: Liu Jing
 * @Last Modified time: 2017-03-10 16:19:33
 */
/**
 * 
 * 根据选择器，获取这个selecor对应的documentFragment
 * @param {String} selector 
 */
module.exports = (selector) => {
  let root = document.querySelector(selector);
  let doc = document.createDocumentFragment();
  let child;
  while (child = root.firstChild) {
    doc.appendChild(child);
  }
  return doc;
}
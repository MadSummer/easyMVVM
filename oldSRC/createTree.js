/*
 * @Author: Liu Jing 
 * @Date: 2017-03-10 16:16:10 
 * @Last Modified by: Liu Jing
 * @Last Modified time: 2017-03-10 16:27:59
 */
/**
 * 
 * 
 * @param {String} ele
 * HTML DOM Element
 * @returns
 * Object As A DOM Tree
 */
function getElement(ele) {
    var element = {
      children: [],
      prop: {}
    };
    element.tagName = ele.tagName.toLowerCase();
    var prop = ele.attributes;
    for (let k in prop) {
      if (prop.hasOwnProperty(+k)) {
        element.prop[prop[+k].name] = prop[+k].value
      }

    }
    var children = Array.from(ele.childNodes);
    children.forEach(child => {
      if (child.nodeType === 3) {
        if (child.data.trim() === '') return;
        element.text = child.data;
      } else {
        element.children.push(getElement(child))
      }

    })
    return element;
}
  
module.exports = selector => {
  let ele = document.querySelector(selector)
  var element = {
    children: [],
    prop: {}
  }; 
  element.tagName = ele.tagName.toLowerCase();
  var prop = ele.attributes;
  for (let k in prop) {
    if (prop.hasOwnProperty(+k)) {
      element.prop[prop[+k].name] = prop[+k].value
    }

  }
  var children = Array.from(ele.childNodes);
  children.forEach(child => {
    if (child.nodeType === 3) {
      if (child.data.trim() === '') return;
      element.text = child.data;
    } else {
      element.children.push(getElement(child))
    }

  })
  return element;
}
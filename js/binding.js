'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	var MVVM = __webpack_require__(1);
	var mvvm = new MVVM({
		el: '#app',
		data: {
			message: {
				user: {
					name: 'liujing',
					age: 12
				},
				valid: true
			}
		},
		methods: {
			getMessage: function getMessage() {
				return this.message;
			}
		}
	});
	window.mvvm = mvvm;
	console.log(mvvm);

	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	/*
  * @Author: Liu Jing 
  * @Date: 2017-03-10 16:16:20 
  * @Last Modified by: liujing
  * @Last Modified time: 2017-03-12 21:19:29
  */
	var Complier = __webpack_require__(2);
	var Observe = __webpack_require__(5);
	function MVVM(obj) {
		this.$option = obj;
		this.$el = document.querySelector(obj.el);
		this.$data = obj.data;
		new Observe(this.$data);
		this.$method = obj.method;
		this.init();
	}
	MVVM.prototype.init = function () {
		new Complier(this, this.$option.el);
	};

	module.exports = MVVM;

	/***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

	/*
  * @Author: mikey.zhaopeng 
  * @Date: 2017-03-11 23:29:17 
  * @Last Modified by: liujing
  * @Last Modified time: 2017-03-12 01:09:23
  */
	var ch = __webpack_require__(3);
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
		nodeToFragment: function nodeToFragment(el) {
			var fragment = document.createDocumentFragment();
			var child = void 0;
			while (child = el.firstChild) {
				fragment.appendChild(child);
			}
			return fragment;
		},
		init: function init() {
			this.comlierNode(this.$fragment);
		},
		comlierNode: function comlierNode(el) {
			var _this = this;

			var childNodes = el.childNodes;
			var reg = /\{\{(.*)\}\}/;
			Array.from(childNodes).forEach(function (node) {
				if (!ch.isElement(node) && reg.test(node.nodeValue)) {
					_this.comlierText(node);
				}
				if (ch.isElement(node)) {
					_this.comlierElement(node);
				}
			});
		},
		comlierElement: function comlierElement(node) {
			var _this2 = this;

			var attributes = node.attributes;
			Array.from(attributes).forEach(function (attr) {
				var attrName = attr.name;
				var attrValue = attr.value;
				if (ch.isEvent(attrName)) {
					return ch.eventHandler(attributes, node, _this2.$mvvm, attrValue);
				}
				if (ch.isDirective(attrName)) {
					return ch.directiveHandler(attrName, node, _this2.$mvvm, attrValue);
				}
			});
		},
		comlierText: function comlierText(node) {}
	};

	module.exports = Complier;

	/***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

	var Watcher = __webpack_require__(4);
	module.exports = {
		isElement: function isElement(node) {
			return node.nodeType === 1;
		},
		isDirective: function isDirective(attrName) {
			return attrName.indexOf('v-') == 0;
		},
		isEvent: function isEvent(attrName) {
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
		eventHandler: function eventHandler(directive, node, mvvm, value) {
			var type = directive.split(':')[1];
			var fn = mvvm.$option.methods[value];
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
		directiveHandler: function directiveHandler(directive, node, mvvm, prop) {
			switch (directive.replace('v-', '')) {
				case 'text':
					new Watcher(mvvm, node, prop, function (value) {
						node.textContent = typeof value === 'undefined' ? '' : value;
					});
					break;
				case 'model':
					node.addEventListener('input', function (e) {
						var newValue = e.target.value;
						mvvm.$data[prop] = newValue;
					});
					new Watcher(mvvm, node, prop, function (value) {
						node.value = typeof value === 'undefined' ? '' : value;
					});
					break;
				default:
					break;
			}
		}
	};

	/***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

	var Dep = __webpack_require__(5).Dep;

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
		get: function get() {
			Dep.target = this;
			var prop = this.prop;
			var val = this.mvvm.$data;
			var value = eval('val.prop');
			return value;
		},
		/**
   * 
   * 
   * @param {Dep} dep 
   */
		addDep: function addDep(dep) {
			dep.addSub(this);
		},
		update: function update() {
			var value = this.get();
			var oldVal = this.value;
			if (value !== oldVal) {
				this.value = value;
				this.cb.call(this.vm, value, oldVal);
			}
		}
	};
	module.exports = Watcher;

	/***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

	/*
  * @Author: Liu Jing 
  * @Date: 2017-03-10 16:36:07 
  * @Last Modified by: liujing
  * @Last Modified time: 2017-03-12 21:18:35
  */

	var Pub = __webpack_require__(6);
	/**
  * 
  * 
  * @param {Object} obj
  * object which want to observe
  * @param {Object} parent
  * object's parent  
  */
	var pubs = {};
	function Observe(obj, parent) {
		this.obj = obj;
		this.parent = parent === undefined ? null : parent;
		this.init(obj);
	}
	Observe.prototype = {
		init: function init(obj) {
			var _this3 = this;

			Object.keys(obj).forEach(function (key) {
				_this3.defineReactive(obj, key, obj[key]);
			});
		},
		defineReactive: function defineReactive(obj, prop, value) {
			var pub = new Pub();
			obj.__observe = pub;
			Object.defineProperty(obj, prop, {
				enumerable: true,
				configurable: false,
				get: function get() {
					return value;
				},
				set: function set(newValue) {
					if (newValue === value) {
						return;
					}
					value = newValue;
					pub.notify();
				}
			});
			if (!this.parent) {
				pubs[prop] = {
					child: {},
					pub: pub
				};
			} else {
				pubs[this.parent]['child'] = {
					child: {},
					pub: pub
				};
			}
			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				new Observe(value, prop);
			}
		}
	};

	module.exports = Observe;

	/***/
},
/* 6 */
/***/function (module, exports) {

	var uid = 0;
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
		addSub: function addSub(sub) {
			if (typeof sub.update !== 'function') return;
			this.subs.push(sub);
		},
		/**
   * 
   * 
   * @param {any} sub 
   */
		removeSub: function removeSub(sub) {
			var index = this.subs.indexOf(sub);
			if (index !== -1) {
				this.subs.splice(index, 1);
			}
		},
		/**
   * 发送通知
   * 调用订阅者的update函数
   */
		notify: function notify() {
			this.subs.forEach(function (sub) {
				sub.update();
			});
		}
	};

	module.exports = Publish;

	/***/
}
/******/]);
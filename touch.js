;(function (window) {
	var isClick;
	var startX;
	var startY;
	var endX;
	var endY;
	var distanceX;
	var distanceY;
	var tap;
	var swipeUp;
	var swipeDown;
	var swipeLeft;
	var swipeRight;
	var defaultVal = {
		tap: function () {
			return false;
		},
		swipeUp: function () {
			return false;
		},
		swipeDown: function () {
			return false;
		},
		swipeLeft: function () {
			return false;
		},
		swipeRight: function () {
			return false;
		},
	};
	var touch = function (options) {
		var obj = this;
		var opts = _merge(defaultVal, options);
		if (window.addEventListener) {
			obj.addEventListener('touchstart', function (e) {
				_touchstart(e);
			}, false);
			obj.addEventListener('touchmove', function (e) {
				_touchmove(e);
			}, false);
			obj.addEventListener('touchend', function (e) {
				_touchend(opts);
			}, false);
		} else if (window.attachEvent) {
			obj.attach('ontouchstart', function (e) {
				_touchstart(e)
			});
			obj.attach('ontouchmove', function (e) {
				_touchmove(e);
			});
			obj.attach('ontouchend', function (e) {
				_touchend(opts);
			});
		}
		return obj;
	}

	// 合并两个对象
	var _merge = function (defaultVal, options) {
		for (name in options) {
			defaultVal[name] = options[name];
		}
		return defaultVal;
	};

	var _touchstart = function (e) {
		e.preventDefault();
		var touch = e.targetTouches[0];
		isClick = true;
		startX = touch.pageX;
		startY = touch.pageY;
		startTime = +new Date;
	};

	var _touchmove = function (e) {
		if (e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
		var touch = e.targetTouches[0];
		isClick = false;
		distanceX = touch.pageX - startX;
		distanceY = touch.pageY - startY;
	};

	var _touchend = function (opts) {
		if (isClick) {
			// 点击
			opts.tap.call(this);
		} else {
			if (distanceY > 50) {
				// 下滑
			  opts.swipeDown.call(this);
			} else if (distanceY < -50) {
				// 上滑
			  opts.swipeUp.call(this);
			} else if (distanceX > 50) {
			  // 右滑
			  opts.swipeRight.call(this);
			} else if (distanceX < -50) {
				// 左滑
				opts.swipeLeft.call(this);
			} else {
				// 点击
				opts.tap.call(this);
			}
		}
	};

	// 对外输出的方式
	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function () {
			return touch;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		exports.touch = touch;
	} else {
		HTMLElement.prototype.touch = touch;
	}
}(window));
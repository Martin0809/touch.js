#touch.js
移动端触摸事件第三方库，解决click事件延迟300ms问题。
####使用方法：
**1.依赖**

在调用该方法前，请引用的依赖文件
```
<script src="touch.js"></script>
```
**2.调用**

touch方法绑定在DOM对象上，调用时使用
```
document.getElementById('id').touch({
	tap: function () {
		alert('tap');
	}
});
```
**3.参数**

`tap`：(*function*) 触发点击事件时执行该方法

`swipeUp`：(*function*) 触发上滑时执行该方法

`swipeDown`：(*function*) 触发下滑事件时执行该方法

`swipeLeft`：(*function*) 触发左滑事件时执行该方法

`swipeRight`：(*function*) 触发右滑事件时执行该方法

 **4.支持**
 
 支持cmd和amd规范

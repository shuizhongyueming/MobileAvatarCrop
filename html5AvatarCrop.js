var html5AvatarCrop = {

	/**
	 * 初始化函数
	 */
	init: function () {
		var t = this;
		t.regional = document.getElementById('js_hac_label');
		t.getImage = document.getElementById('js_hac_get_image');
		t.editPic = document.getElementById('js_hac_edit_pic');
		t.editBox = document.getElementById('js_hac_cover_box');

		// t.px t.py分别表示在实时预览区域的背景图片的坐标；
		t.px = 0; //background image x
		t.py = 0; //background image y

		// t.sx，t.sy， t.sHeight， t.sWidth分别表示图片的横纵坐标和宽高
		t.sx = 15; //crop area x
		t.sy = 15; //crop area y
		t.sHeight = 150; //crop area height
		t.sWidth = 150 //crop area width
		document.getElementById('js_hac_post_file').addEventListener("change", t.handleFiles, false);

		// 在用户点击save按钮的时候，将裁剪出来的图片保存到预览右边的方框内
		document.getElementById('js_hac_save_button').onclick = function () {
			t.editPic.height = t.sHeight;
			t.editPic.width = t.sWidth;
			var ctx = t.editPic.getContext('2d');
			var images = new Image();
			images.src = t.imgUrl;

			images.onload = function () {
				ctx.drawImage(images, t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth);
				document.getElementById('js_hac_show_pic').getElementsByTagName('img')[0].src = t.editPic.toDataURL();
			}
		}
	},

	/**
	 * 获取文件，读取文件并生成url
	 */
	handleFiles: function () {
		document.getElementById("js_hac").style.display = "block";
		var fileList = this.files[0];
		// 通过new FileReader()来实例化一个FileReader对象oFReader
		var oFReader = new FileReader();
		// 调用其readAsDataURL()方法将文件的内容读取出来并处理成base64编码的格式
		oFReader.readAsDataURL(fileList);
		oFReader.onload = function (oFREvent) {
			html5AvatarCrop.paintImage(oFREvent.target.result);
		};
	},

	/**
	 * 将读取到的图片数据重新绘画到浏览器上
	 */
	paintImage: function (url) {
		var t = this;
		var createCanvas = t.getImage.getContext("2d");
		// 利用new Image()来得到一个<img>标签，设置src属性的值
		var img = new Image();
		img.src = url;
		// 将图片按照原大小等比例地重画出来
		img.onload = function () {
			if (img.width < t.regional.offsetWidth && img.height < t.regional.offsetHeight) {
				t.imgWidth = img.width;
				t.imgHeight = img.height;
			} else {
				var pWidth = img.width / (img.height / t.regional.offsetHeight);
				var pHeight = img.height / (img.width / t.regional.offsetWidth);
				t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
				t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
			}
			t.px = (t.regional.offsetWidth - t.imgWidth) / 2 + 'px';
			t.py = (t.regional.offsetHeight - t.imgHeight) / 2 + 'px';

			t.getImage.height = t.imgHeight;
			t.getImage.width = t.imgWidth;
			t.getImage.style.left = t.px;
			t.getImage.style.top = t.py;

			createCanvas.drawImage(img, 0, 0, t.imgWidth, t.imgHeight);
			t.imgUrl = t.getImage.toDataURL();
			t.cutImage();
			t.drag();
		};
	},

	/**
	 * cutImage 方法主要是负责两个事情:
	 *    一个是制造遮罩层，
	 *    一个是利用css的background属性将选中的裁剪区域实时预览
	 */
	cutImage: function () {
		var t = this;

		t.editBox.height = t.imgHeight;
		t.editBox.width = t.imgWidth;
		t.editBox.style.display = 'block';
		t.editBox.style.left = t.px;
		t.editBox.style.top = t.py;

		var cover = t.editBox.getContext("2d");
		cover.fillStyle = "rgba(0, 0, 0, 0.5)";
		cover.fillRect(0, 0, t.imgWidth, t.imgHeight);
		cover.clearRect(t.sx, t.sy, t.sHeight, t.sWidth);

		document.getElementById('js_hac_show_edit').style.background = 'url(' + t.imgUrl + ')' + -t.sx + 'px ' + -t.sy + 'px no-repeat';
		document.getElementById('js_hac_show_edit').style.height = t.sHeight + 'px';
		document.getElementById('js_hac_show_edit').style.width = t.sWidth + 'px';
	},

	/**
	 * 裁剪框跟进鼠标的移动选择需要裁剪的图片区域
	 */
	drag: function () {
		var t = this;
		var draging = false;
		var startX = 0;
		var startY = 0;

		document.getElementById('js_hac_cover_box').onmousemove = function (e) {
			// 获取鼠标距离背景图片的距离
			// e.pageX代表鼠标到浏览器左边缘的距离
			// e.pageY代表鼠标到浏览器顶部边缘的距离
			// t.regional.offsetLeft + this.offsetLeft可以计算出图片到浏览器的左边边缘的距离
			var pageX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
			var pageY = e.pageY - (t.regional.offsetTop + this.offsetTop);
			// 判断鼠标是否在图片的区域内部
			if (pageX > t.sx && pageX < t.sx + t.sWidth && pageY > t.sy && pageY < t.sy + t.sHeight) {
				this.style.cursor = 'move';

				this.onmousedown = function () {
					draging = true;
					// 记录上一次截图时候的坐标（没有上一次就是初始化的时候的坐标）
					t.ex = t.sx;
					t.ey = t.sy;
					// 记录鼠标按下时候的坐标
					startX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
					startY = e.pageY - (t.regional.offsetTop + this.offsetTop);
				}
				window.onmouseup = function () {
					draging = false;
				}

				// 如果实在拖动的情况下，我们需要根据坐标的变化来实时更新t.sx和t.sy的值,并且实时调用cutImage方法实现预览
				// 移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)
				if (draging) {
					if (t.ex + (pageX - startX) < 0) {
						t.sx = 0;
					} else if (t.ex + (pageX - startX) + t.sWidth > t.imgWidth) {
						t.sx = t.imgWidth - t.sWidth;
					} else {
						t.sx = t.ex + (pageX - startX);
					};

					if (t.ey + (pageY - startY) < 0) {
						t.sy = 0;
					} else if (t.ey + (pageY - startY) + t.sHeight > t.imgHeight) {
						t.sy = t.imgHeight - t.sHeight;
					} else {
						t.sy = t.ey + (pageY - startY);
					}

					t.cutImage();
				}
			} else {
				this.style.cursor = 'auto';
			}
		};
	}
}
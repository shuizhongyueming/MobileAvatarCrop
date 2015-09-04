## html5AvatarCrop

利用HTML5的File API和Canvas实现本地的图片裁剪

![Image](http://images.helloarron.com/html5AvatarCrop.gif)

## CSS
```
<link rel="stylesheet" href="./html5AvatarCrop.css">
```

## JavasCript
```
<script type="text/javascript" src="./html5AvatarCrop.js"></script>
<script type="text/javascript">
  html5AvatarCrop.init();
</script>
```

## HTML
```
<input type="file" name="file" id="js_ach_post_file">
<div id="js_ach" class="ahc-avatar-box">
  <div id="js_ach_label" class="ahc-label">
    <canvas id="js_ach_get_image" class="ahc-get-image"></canvas>
    <div>
      <canvas id="js_ach_cover_box" class="ahc-cover-box"></canvas>
      <canvas id="js_ach_edit_pic" class="ahc-edit-pic"></canvas>
    </div>
  </div>
  <div class="ahc-croped-box">
    <span id="js_ach_show_edit" class="ahc-show-edit"></span>
    <button id="js_ach_save_button" class="ahc-save-button">确定</button>
    <span id="js_ach_show_pic" class="ahc-show-pic"><img src=""></span>
  </div>
</div>
```

### About

个人首页：[http://helloarron.com](http://helloarron.com)

个人博客：[http://blog.helloarron.com ](http://blog.helloarron.com )

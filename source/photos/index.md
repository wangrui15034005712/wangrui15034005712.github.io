---
layout: post
slug: "photos"
title: "相册"
---
<link rel="stylesheet" href="./ins.css">
<div class="instagram itemscope">
	<a href="https://lastsummer.top/" target="_blank" class="open-ins">图片正在加载中…</a>
</div>
<script>
  (function() {
    var loadScript = function(path) {
      var $script = document.createElement('script')
      document.getElementsByTagName('body')[0].appendChild($script)
      $script.setAttribute('src', path)
    }
    setTimeout(function() {
      loadScript('./ins.js')
    }, 0)
  })()
  function imgshow(data){
    window.open(data.href);
  }
</script>

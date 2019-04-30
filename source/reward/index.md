---
title: 打赏
date: 2018-10-18 14:28:33
layout: false
---
<head>
<style type="text/css">
/* The page body */
html, body {
  background: #333;
  overflow: hidden;
  font-family: Helvetica, Arial, sans-serif;
}

/* The div holding the wooden table img tag */
#wooden-table {
  position: absolute;
  left: -5000px;
}

/* The light table itself */
#lighttable {
  position: relative;
  width: 100%;
  height: 600px;
  background: #eee url(images/wooden-table.jpg);
  padding: 70px;
  margin: 0 auto;
  border: 20px solid #111;
  display: none;
}

/* Photos on the light table */
#lighttable img {
  border: 10px solid #fff;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0 0 1em rgba(0, 0, 0, 0.9);
  -webkit-box-shadow: 0 0 1em rgba(0, 0, 0, 0.9);
  position: absolute;
  left: -9999px;
  top: -9999px;
  display: none;
}
</style>

<script type="text/javascript" src="/blog/js/jquery.js"></script>
<script type="text/javascript" src="/blog/js/jquery-ui-1.8.2.custom.min.js"></script>

<script type="text/javascript">

var newImageZIndex = 1;  // To make sure newly-loaded images land on top of images on the table
var loaded = false;      // Used to prevent initPhotos() running twice

// When the document is ready, fire up the table!
$( init );

// When the wooden table image has loaded, start bringing in the photos
function init() {
  var woodenTable = $('#wooden-table img');
  woodenTable.load( initPhotos );

  // Hack for browsers that don't fire load events for cached images
  if ( woodenTable.get(0).complete ) $(woodenTable).trigger("load");
}

// Set up each of the photos on the table

function initPhotos() {

  // (Ensure this function doesn't run twice)
  if ( loaded ) return;
  loaded = true;

  // The table image has loaded, so bring in the table
  $('#lighttable').fadeIn('fast');

  // Process each photo in turn...
  $('#lighttable img').each( function(index) {

    // Set a random position and angle for this photo
    var left = Math.floor( Math.random() * 1000);
    var top = Math.floor( Math.random() * 300);
    var angle = Math.floor( Math.random() * 60 - 30 );
    $(this).css( 'left', left+'px' );
    $(this).css( 'top', top+'px' );
    $(this).css( 'transform', 'rotate(' + angle + 'deg)' );   
    $(this).css( '-moz-transform', 'rotate(' + angle + 'deg)' );   
    $(this).css( '-webkit-transform', 'rotate(' + angle + 'deg)' );
    $(this).css( '-o-transform', 'rotate(' + angle + 'deg)' );

    // Make the photo draggable
    $(this).draggable( { containment: 'parent', stack: '#lighttable img', cursor: 'pointer' } );

    // Hide the photo for now, in case it hasn't finished loading
    $(this).hide();

    // When the photo image has loaded...
    $(this).load( function() {

      // (Ensure this function doesn't run twice)
      if ( $(this).data('loaded') ) return;
      $(this).data('loaded', true);

      // Record the photo's true dimensions
      var imgWidth = $(this).width();
      var imgHeight = $(this).height();

      // Make the photo bigger, so it looks like it's high above the table
      $(this).css( 'width', imgWidth * 1.5 );
      $(this).css( 'height', imgHeight * 1.5 );

      // Make it completely transparent, ready for fading in
      $(this).css( 'opacity', 0 );

      // Make sure its z-index is higher than the photos already on the table
      $(this).css( 'z-index', newImageZIndex++ );

      // Gradually reduce the photo's dimensions to normal, fading it in as we go
      $(this).animate( { width: imgWidth, height: imgHeight, opacity: .95 }, 1200 );
    } );

    // Hack for browsers that don't fire load events for cached images
    if ( this.complete ) $(this).trigger("load");

  });

}
(function(){
	var password = prompt('请输入文章密码');
	if (password != 'admin'){
		alert('密码错误！');
		history.back();
	}
})();
$(function(){
	$('#lighttable img').each( function(s,index) {
			$("#lighttable img").eq(s).hide();
		});
	
	$("select").change(function(){
		var name = $("select").val();
		$('#lighttable img').each( function(s,index) {
			$("#lighttable img").eq(s).hide();
		});
		if(name=="wangdan1"){
			$("#lighttable img").eq(0).show();
			$("#lighttable img").eq(1).show();
			$("#lighttable img").eq(2).show();
			$("#lighttable img").eq(3).show();
			$("#lighttable img").eq(4).show();
			$("#lighttable img").eq(5).show();
			$("#lighttable img").eq(6).show();
			$("#lighttable img").eq(7).show();
		}
		if(name=="wangdan2"){
			$("#lighttable img").eq(8).show();
			$("#lighttable img").eq(9).show();
			$("#lighttable img").eq(10).show();
			$("#lighttable img").eq(11).show();
			$("#lighttable img").eq(12).show();
			$("#lighttable img").eq(13).show();
			$("#lighttable img").eq(14).show();
			$("#lighttable img").eq(15).show();
			$("#lighttable img").eq(16).show();
			$("#lighttable img").eq(17).show();
		}
		if(name=="wangdan3"){
			$("#lighttable img").eq(18).show();
			$("#lighttable img").eq(19).show();
			$("#lighttable img").eq(20).show();
			$("#lighttable img").eq(21).show();
			$("#lighttable img").eq(22).show();
			$("#lighttable img").eq(23).show();
			$("#lighttable img").eq(24).show();
			$("#lighttable img").eq(25).show();
			$("#lighttable img").eq(26).show();
		}
	});
});

</script>

</head>
<body>

<select id="选择" name="选择">
  <option value ="mingxing">明星</option>
  <option value ="wangdan1">王丹</option>
  <option value="wangdan2">王丹</option>
  <option value="wangdan3">王丹</option>
</select>

  <div id="wooden-table"><img src="images/wooden-table.jpg" alt="Wooden table image" /></div>

  <div id="lighttable">
	<img src="/images/pic1.jpg" alt="MM1" />
	<img src="/images/pic2.jpg" alt="MM2" />
	<img src="/images/pic3.jpg" alt="MM3" />
	<img src="/images/pic4.jpg" alt="MM4" />
	<img src="/images/pic5.jpg" alt="MM5" />
	<img src="/images/pic6.jpg" alt="MM6" />
	<img src="/images/pic7.jpg" alt="MM7" />
	<img src="/images/pic8.jpg" alt="MM8" />
	<img src="/images/pic9.jpg" alt="MM9" />
	<img src="/images/pic10.jpg" alt="MM10" />
	<img src="/images/pic11.jpg" alt="MM10" />
	<img src="/images/pic12.jpg" alt="MM10" />
	<img src="/images/pic13.jpg" alt="MM10" />
	<img src="/images/pic14.jpg" alt="MM10" />
	<img src="/images/pic15.jpg" alt="MM10" />
	<img src="/images/pic16.jpg" alt="MM10" />
	<img src="/images/pic17.jpg" alt="MM10" />
	<img src="/images/pic18.jpg" alt="MM10" />
	<img src="/images/pic19.jpg" alt="MM10" />
	<img src="/images/pic20.jpg" alt="MM10" />
	<img src="/images/pic21.jpg" alt="MM10" />
	<img src="/images/pic22.jpg" alt="MM10" />
	<img src="/images/pic23.jpg" alt="MM10" />
	<img src="/images/pic24.jpg" alt="MM10" />
	<img src="/images/pic25.jpg" alt="MM10" />
	<img src="/images/pic26.jpg" alt="MM10" />
 </div>

  
</body>
</html>


jquery.silverlight
==============


Properties:
==============

jQuery.silverlight.versions
---------------------------
Maps for verious of Silverlight version

APIs:
==============

.silverlight(options)
------------------
Appends object element

	options = {
		data:'data:application/x-silverlight-2,', // default
		type:'application/x-silverlight-2',  // default
		width:'640',  // default
		height:'480',  // default
		param: {
			source: '', // xap, required
			initParams: '', // optional
			onError: 'onSilverlightError',  // default
			minRuntimeVersion: '4.0.50401.0',  // default
			autoUpgrade: 'true'  // default
		},
		content:'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0" style="text-decoration:none">'
				+'<img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none"/>'
				+'</a>' // default
	}

silverlight() same as :

	$(this).append($.silverlight.toString(options))


You can use jQuery.silverlight.versions for minRuntimeVersion and content options:
  
	 $(this).silverlight({
	 	param: {
	 		minRuntimeVersion: $.silverlight.versions['3'].minRuntimeVersion
	 	},
	 	content: $.silverlight.versions['3'].content
	 });


jQuery.silverlight.toString(options)
------------------
Creates html string for object Element

options: see .silverlight()



jQuery.silverlight.lightbox(options)
------------------

	options = {
		silverlight: {}, // same as 1st arugment of .silverlight()
		events: {
			opened:null, // callback function
			closed:null // callback function 
		}

Examples:
==============

Example: Add a silverlight application to the DOM Element
------------------

	<div id="silverlightControlHost" style="text-align:center;"></div>
	<script type="text/javascript">
	(function($) {
		$(document).ready(function(){
			var app = {
					width:'80%',
					height:300,
					param:{source:'silverlight.xap'}
			};
			$('#silverlightControlHost').empty().silverlight(app);
		});
	})(jQuery);
	</script>
	
Example: Show a silvelight app on the Lightbox
------------------

	<a id="lightbox" href="#">$.silverlight.lightbox()</a>
	<script type="text/javascript">
	(function($) {
		$(document).ready(function(){
			var app = {
						width:'80%',
						height:300,
						param:{source:'silverlight.xap'}
				};
			$('#lightbox').click(function(){
				$.silverlight.lightbox({silverlight:app});
				return false;
			});
		});
	})(jQuery);
	</script>


Example: Using callback function for Lightbox
------------------

	<a id="lightbox" href="#">$.silverlight.lightbox()</a>
	<script type="text/javascript">
	(function($) {
		$(document).ready(function(){
			var app = {
						width:'80%',
						height:300,
						param:{source:'silverlight.xap'}
				};
			$.silverlight.lightbox({
				silverlight: app,
				events: {
					opened: function() {
						alert('opened');
					},
					closed: function() {
						alert('closed');
					}
				}
			});
		});
	})(jQuery);
	</script>


Demo:
------------------

http://labs.makotokw.com/jquery/silverlight



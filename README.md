jquery.silverlight
==============

APIs:
==============

.silverlight(options)
------------------

	options = {
		data:'data:application/x-silverlight-2,', // default
		type:'application/x-silverlight-2',  // default
		width:'640',  // default
		height:'480',  // default
		param: {
			source: '', // xap, required
			initParams: '', // optional
			onError: 'onSilverlightError',  // default
			minRuntimeVersion: '3.0.40818.0',  // default
			autoUpgrade: 'true'  // default
		},
		content:'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=3.0.40818.0" style="text-decoration:none">'
		  		+'<img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style:none"/>'
				+'</a>'  // default
	}

jQuery.silverlightContent(options)
------------------

options: see .silverlight()


jQuery.silverlightBox(options)
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

	<a id="lightbox" href="#">$.silverlightBox()</a>
	<script type="text/javascript">
	(function($) {
		$(document).ready(function(){
			var app = {
						width:'80%',
						height:300,
						param:{source:'silverlight.xap'}
				};
			$('#lightbox').click(function(){
				$.silverlightBox({silverlight:app});
				return false;
			});
		});
	})(jQuery);
	</script>


Example: Using callback function for silverlightBox
------------------

	<a id="lightbox" href="#">$.silverlightBox()</a>
	<script type="text/javascript">
	(function($) {
		$(document).ready(function(){
			var app = {
						width:'80%',
						height:300,
						param:{source:'silverlight.xap'}
				};
			$.silverlightBox({
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




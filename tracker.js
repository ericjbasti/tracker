(function($){
	$.fn.tracker = function(options) {
		var tracker=[];

		var defaults = {
			passed:function(){},
			inView:function(){},
			outside:function(){},
			update:null,
			buffer:.2, //20%
			index:null,
			titleTag:'h2'
		};
		
		options = $.extend(defaults, options);
		
		var hitTest = function(a,b){
			var d = {};
			d.y = a.top - b.top - b.height;
			d.height = a.height + b.height;
			if (d.y < 0 && d.height + d.y > 0) return {hit:true,delta:d};
			return {hit:false,delta:d};
		}
		
		var track = function(){
			var top=$(window).scrollTop();
		    var view = $(window).height();
		    
		   	for (var i=0;i!=tracker.length;i++){
		   		var temp= $(tracker[i]).offset().top+($(tracker[i]).height())-view+(view*(options.buffer));
		   		var test=(hitTest({top:top,height:view},{top:$(tracker[i]).offset().top,height:$(tracker[i]).height()}));
		   		var delta = (temp/view);
		   		if(test.hit){
		   			options.inView(tracker[i],delta);
		   		}else{
		   			if(delta>0){
		   				options.outside(tracker[i],delta);
		   			}else{
		   				options.passed(tracker[i],delta);
		   			}
		   		}
		   	}
		}

		$(window).scroll(function() {
		    track();
		});

		return this.each(function(){
			tracker.push(this);
		});
	};
})(jQuery);
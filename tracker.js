(function($){
	$.fn.tracker = function(options) {
		var tracker=[];

		var defaults = {
			passed:function(){},
			inView:function(){},
			outside:function(){},
			firstView:function(){},
			update: null,
			buffer: 50, //20%
			index: null,
			titleTag: 'h2'
		};
		
		options = $.extend(defaults, options);
		
		var hitTest = function(a,b){
			var d = {};
			d.y = a.top - b.top - b.height;
			d.height = a.height + b.height;
			if (d.y < 0 && d.height + d.y > 0) return {hit:true,delta:d};
			return {hit:false,delta:d};
		}
		var target = null; // save us on garbage collection

		var track = function(){
			var top=$(window).scrollTop();
		    var view = $(window).height();

		    var buffer= options.buffer;
		    console.log(top,view)
		   	for (var i=0;i!=tracker.length;i++){
		   		target= $(tracker[i].target);
		   		var temp= target.offset().top;
		   		var test=(hitTest({top:top,height:view},{top:target.offset().top-buffer,height:target.height()+buffer}));
		   		var delta = (temp-top);
		   		if(test.hit){
		   			options.inView(target,delta);
		   			tracker[i].hits++;
		   			if(tracker[i].hits===1) options.firstView(target,delta);
		   		}else{
		   			if(delta>0){
		   				options.outside(target,delta);
		   			}else{
		   				options.passed(target,delta);
		   			}
		   		}
		   	}
		}

		$(window).scroll(function() {
		    track();
		});

		return this.each(function(){
			tracker.push({target:this,hits:0});
			track();
		});
	};


	$.fn.trackerLoad = function(options){
		var defaults = {
			firstView:function(a){
				var img = $(a);
				var cur = a.attr('src');
				var full = a.attr('data-original');
				if(cur!=full){
					img.attr({'src':full});
					a.load(function(){
						$(this).addClass('loaded');
					})
				}
			},
			buffer: 50
		};
		options = $.extend(defaults, options);

		$(this).tracker(options);
	}

})(jQuery);



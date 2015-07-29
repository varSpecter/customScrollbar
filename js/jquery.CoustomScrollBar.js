;(function( $, window ){


	var body = $('body, html');

	$.CoustomScrollBar = function( el, options ) {

		this.el = $( el );

		this.init( options );

	};

	// option
	$.CoustomScrollBar.defaults = {};

	$.CoustomScrollBar.prototype = {

		init : function( options ){
			//설정 
			this.config();
			//이벤트
			this.initEvent();
			//옵션
			this.options = $.extend( true, {}, $.CoustomScrollBar.defaults, options );
		},
		config : function(){

			
			this.el.css({ 
				'position':'relative', 
				'overflow':'hidden'
			});
		
			// 보이는 영역 height
			this.viewH = this.el.height();
			// 보이는 영역 height + padding
			this.outerViewH = this.el.outerHeight();
			// padding 값 
			this.el.paddingH = 
			parseInt(this.el.css('padding-top')) + parseInt(this.el.css('padding-bottom'));

			//스크롤박스생성 
			this.el.children().wrapAll(
				$('<div></div>') 
				.addClass('scroll-box')
				.css({ 
					'position':'relative', 
					'overflow':'hidden'
				})
			);
			//스크롤 박스
			this.scrollBox = this.el.find('.scroll-box');

			// 전체 총 높이  
			this.totalH = this.scrollBox.height() - this.el.paddingH;

			// 스크롤 박스 높이 지정 
			this.scrollBox.height( this.viewH );

			// 스크롤 바 생성
			this.el.append( 
				$('<div></div>')
				.addClass('scroll-line')
				.height( this.outerViewH )
				.append(
					$('<span></span>')
					.addClass('scroll-bar')
					.height( ( this.viewH / this.totalH ) *  this.viewH  )
				)	
			);

			this.scrollLine = this.el.find('.scroll-line'); 
			this.scrollBar = this.el.find('.scroll-bar');

			if( this.totalH < this.viewH ){
				this.scrollLine.hide();
			};		

		},
		mouseWheelEvent : function( e, startYPos ){

			var delta,posY;

			if( !e ) e = window.event;
					

			if( !startYPos ) {  // 마우스 휠 
				
				if( e.originalEvent.detail ) { 
					delta = e.originalEvent.detail * (-10); //FF
				}
				else { 
					delta = e.originalEvent.wheelDelta / 2; //chrom
				};

				posY = this.scrollBox.scrollTop() - delta;
			}
			else { // 드래그 

				posY = this.scrollBox.scrollTop() + (e.offsetY - startYPos)

			};
			
			this.scrollBox.scrollTop( posY );				
			this.scrollBar.css({ 
				'top' : ( this.scrollBox.scrollTop() / this.totalH ) * this.outerViewH 
			});
			
		},
		initEvent : function(){

			var self = this,
			startYPos = 0,
		    mouseDown = false;			

			this.scrollBox.add(this.scrollLine).on({
				'mousewheel' : function(e){
					self.mouseWheelEvent(e);
				},
				'DOMMouseScroll' : function(e){
					self.mouseWheelEvent(e);	
				},
				'mouseenter' : function(){
					body.on('mousewheel DOMMouseScroll' , function(e){
						e.preventDefault(); 
					});
				},
				'mouseleave' : function(){
					body.off('mousewheel DOMMouseScroll');	
				}
			});

			this.scrollBar.on({
				'mousedown' : function(e){
					mouseDown = true;
					startYPos = e.offsetY;
					$(this).addClass('scroll-capture');
				},
				'mouseup' : function(){
					mouseDown = false;
					$(this).removeClass('scroll-capture');
				},
				'mousemove' : function(e){
					if( mouseDown ){
						self.mouseWheelEvent(e, startYPos);
					}
				}	
			})
		}

	};

	$.fn.CoustomScrollBar = function( options ){
		this.each(function(){
			new $.CoustomScrollBar( this, options );
		});
	};


/*		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'cbpNTAccordion' );
				if ( !instance ) {
					logError( "cannot call methods on cbpNTAccordion prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for cbpNTAccordion instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'cbpNTAccordion' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'cbpNTAccordion', new $.CBPNTAccordion( options, this ) );
				}
			});
		}
		return this;*/



} ( window.jQuery, window ) );
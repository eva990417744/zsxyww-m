/**
 * COPY by XX on 2016/7/14.  thanks to http://www.ghugo.com/special-scroll-events-for-jquery/
 */
(function(){var a=jQuery.event.special,c="D"+(+new Date()),b="D"+(+new Date()+1);a.scrollstart={setup:function(){var e,d=function(h){var f=this,g=arguments;if(e){clearTimeout(e)}else{h.type="scrollstart";jQuery.event.dispatch.apply(f,g)}e=setTimeout(function(){e=null},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(c,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(c))}};a.scrollstop={latency:300,setup:function(){var e,d=function(h){var f=this,g=arguments;if(e){clearTimeout(e)}e=setTimeout(function(){e=null;h.type="scrollstop";jQuery.event.dispatch.apply(f,g)},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(b,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(b))}}})();
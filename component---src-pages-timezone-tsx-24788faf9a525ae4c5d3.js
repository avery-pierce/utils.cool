"use strict";(self.webpackChunkutils_cool=self.webpackChunkutils_cool||[]).push([[662],{9905:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r,o=n(7294),i=n(5267);function l(e){void 0===e&&(e=r.SECOND);var t=(0,o.useState)(new Date),n=t[0],i=t[1];return(0,o.useEffect)((function(){var t;return function n(){var o=function(e,t){void 0===e&&(e=new Date);var n=1e3-e.getMilliseconds();if(t===r.SECOND)return n;var o=60-e.getSeconds();if(t===r.MINUTE)return 1e3*o-e.getMilliseconds();var i=60-e.getMinutes();if(t===r.HOUR)return 60*i*1e3-e.getSeconds()-e.getMilliseconds();return null}(new Date,e);t=setTimeout((function(){i(new Date),n()}),o)}(),function(){return clearTimeout(t)}}),[e]),n}function u(){var e=l(r.SECOND),t=Intl.DateTimeFormat().resolvedOptions().timeZone;return o.createElement(o.Fragment,null,o.createElement("div",null,o.createElement(i.Z,null,"The current time is ",e.toLocaleString())),o.createElement("div",null,o.createElement(i.Z,null,t)))}!function(e){e[e.SECOND=0]="SECOND",e[e.MINUTE=1]="MINUTE",e[e.HOUR=2]="HOUR"}(r||(r={}))},5267:function(e,t,n){n.d(t,{N:function(){return o},Z:function(){return i}});var r=n(7294);function o(e){var t=e.children,n=e.style;return r.createElement("h1",{style:Object.assign({fontFamily:"Monoton",textTransform:"uppercase",fontWeight:"normal",fontSize:"30pt",color:"#FFF"},n)},t)}function i(e){var t=e.children,n=e.style,o=e.bold;return r.createElement("span",{style:Object.assign({fontFamily:"Roboto",fontWeight:o?"500":"normal",color:"#FFF"},n)},t)}}}]);
//# sourceMappingURL=component---src-pages-timezone-tsx-24788faf9a525ae4c5d3.js.map
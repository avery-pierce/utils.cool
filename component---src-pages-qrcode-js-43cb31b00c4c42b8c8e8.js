(self.webpackChunkutils_cool=self.webpackChunkutils_cool||[]).push([[384],{2108:function(t,e,r){var n=r(7218);function o(t){this.mode=n.MODE_8BIT_BYTE,this.data=t}o.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},t.exports=o},956:function(t){function e(){this.buffer=new Array,this.length=0}e.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=e},5766:function(t){t.exports={L:1,M:0,Q:3,H:2}},2209:function(t,e,r){var n=r(2778);function o(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}o.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<t.getLength();i++)e[r+i]^=n.gexp(n.glog(this.get(r))+n.glog(t.get(i)));return new o(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=n.glog(this.get(0))-n.glog(t.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(i=0;i<t.getLength();i++)r[i]^=n.gexp(n.glog(t.get(i))+e);return new o(r,0).mod(t)}},t.exports=o},5189:function(t,e,r){var n=r(2108),o=r(3085),i=r(956),a=r(6035),u=r(2209);function l(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var s=l.prototype;s.addData=function(t){var e=new n(t);this.dataList.push(e),this.dataCache=null},s.isDark=function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},s.getModuleCount=function(){return this.moduleCount},s.make=function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=o.getRSBlocks(t,this.errorCorrectLevel),r=new i,n=0,u=0;u<e.length;u++)n+=e[u].dataCount;for(u=0;u<this.dataList.length;u++){var l=this.dataList[u];r.put(l.mode,4),r.put(l.getLength(),a.getLengthInBits(l.mode,t)),l.write(r)}if(r.getLengthInBits()<=8*n)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},s.makeImpl=function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=l.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},s.setupPositionProbePattern=function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+r][e+n]=0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4)},s.getBestMaskPattern=function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=a.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},s.createMovieClip=function(t,e,r){var n=t.createEmptyMovieClip(e,r);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,a=0;a<this.modules[o].length;a++){var u=1*a;this.modules[o][a]&&(n.beginFill(0,100),n.moveTo(u,i),n.lineTo(u+1,i),n.lineTo(u+1,i+1),n.lineTo(u,i+1),n.endFill())}return n},s.setupTimingPattern=function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},s.setupPositionAdjustPattern=function(){for(var t=a.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],o=t[r];if(null==this.modules[n][o])for(var i=-2;i<=2;i++)for(var u=-2;u<=2;u++)this.modules[n+i][o+u]=-2==i||2==i||-2==u||2==u||0==i&&0==u}},s.setupTypeNumber=function(t){for(var e=a.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;r<18;r++){n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},s.setupTypeInfo=function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=a.getBCHTypeInfo(r),o=0;o<15;o++){var i=!t&&1==(n>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++){i=!t&&1==(n>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i}this.modules[this.moduleCount-8][8]=!t},s.mapData=function(t,e){for(var r=-1,n=this.moduleCount-1,o=7,i=0,u=this.moduleCount-1;u>0;u-=2)for(6==u&&u--;;){for(var l=0;l<2;l++)if(null==this.modules[n][u-l]){var s=!1;i<t.length&&(s=1==(t[i]>>>o&1)),a.getMask(e,n,u-l)&&(s=!s),this.modules[n][u-l]=s,-1==--o&&(i++,o=7)}if((n+=r)<0||this.moduleCount<=n){n-=r,r=-r;break}}},l.PAD0=236,l.PAD1=17,l.createData=function(t,e,r){for(var n=o.getRSBlocks(t,e),u=new i,s=0;s<r.length;s++){var c=r[s];u.put(c.mode,4),u.put(c.getLength(),a.getLengthInBits(c.mode,t)),c.write(u)}var f=0;for(s=0;s<n.length;s++)f+=n[s].dataCount;if(u.getLengthInBits()>8*f)throw new Error("code length overflow. ("+u.getLengthInBits()+">"+8*f+")");for(u.getLengthInBits()+4<=8*f&&u.put(0,4);u.getLengthInBits()%8!=0;)u.putBit(!1);for(;!(u.getLengthInBits()>=8*f||(u.put(l.PAD0,8),u.getLengthInBits()>=8*f));)u.put(l.PAD1,8);return l.createBytes(u,n)},l.createBytes=function(t,e){for(var r=0,n=0,o=0,i=new Array(e.length),l=new Array(e.length),s=0;s<e.length;s++){var c=e[s].dataCount,f=e[s].totalCount-c;n=Math.max(n,c),o=Math.max(o,f),i[s]=new Array(c);for(var h=0;h<i[s].length;h++)i[s][h]=255&t.buffer[h+r];r+=c;var g=a.getErrorCorrectPolynomial(f),d=new u(i[s],g.getLength()-1).mod(g);l[s]=new Array(g.getLength()-1);for(h=0;h<l[s].length;h++){var m=h+d.getLength()-l[s].length;l[s][h]=m>=0?d.get(m):0}}var p=0;for(h=0;h<e.length;h++)p+=e[h].totalCount;var v=new Array(p),y=0;for(h=0;h<n;h++)for(s=0;s<e.length;s++)h<i[s].length&&(v[y++]=i[s][h]);for(h=0;h<o;h++)for(s=0;s<e.length;s++)h<l[s].length&&(v[y++]=l[s][h]);return v},t.exports=l},3085:function(t,e,r){var n=r(5766);function o(t,e){this.totalCount=t,this.dataCount=e}o.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.getRSBlocks=function(t,e){var r=o.getRsBlockTable(t,e);if(null==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=new Array,a=0;a<n;a++)for(var u=r[3*a+0],l=r[3*a+1],s=r[3*a+2],c=0;c<u;c++)i.push(new o(l,s));return i},o.getRsBlockTable=function(t,e){switch(e){case n.L:return o.RS_BLOCK_TABLE[4*(t-1)+0];case n.M:return o.RS_BLOCK_TABLE[4*(t-1)+1];case n.Q:return o.RS_BLOCK_TABLE[4*(t-1)+2];case n.H:return o.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},t.exports=o},2778:function(t){for(var e={glog:function(t){if(t<1)throw new Error("glog("+t+")");return e.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return e.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},r=0;r<8;r++)e.EXP_TABLE[r]=1<<r;for(r=8;r<256;r++)e.EXP_TABLE[r]=e.EXP_TABLE[r-4]^e.EXP_TABLE[r-5]^e.EXP_TABLE[r-6]^e.EXP_TABLE[r-8];for(r=0;r<255;r++)e.LOG_TABLE[e.EXP_TABLE[r]]=r;t.exports=e},7218:function(t){t.exports={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}},6035:function(t,e,r){var n=r(7218),o=r(2209),i=r(2778),a=0,u=1,l=2,s=3,c=4,f=5,h=6,g=7,d={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;d.getBCHDigit(e)-d.getBCHDigit(d.G15)>=0;)e^=d.G15<<d.getBCHDigit(e)-d.getBCHDigit(d.G15);return(t<<10|e)^d.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;d.getBCHDigit(e)-d.getBCHDigit(d.G18)>=0;)e^=d.G18<<d.getBCHDigit(e)-d.getBCHDigit(d.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return d.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case a:return(e+r)%2==0;case u:return e%2==0;case l:return r%3==0;case s:return(e+r)%3==0;case c:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case f:return e*r%2+e*r%3==0;case h:return(e*r%2+e*r%3)%2==0;case g:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new o([1],0),r=0;r<t;r++)e=e.multiply(new o([1,i.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case n.MODE_NUMBER:return 10;case n.MODE_ALPHA_NUM:return 9;case n.MODE_8BIT_BYTE:case n.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case n.MODE_NUMBER:return 12;case n.MODE_ALPHA_NUM:return 11;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case n.MODE_NUMBER:return 14;case n.MODE_ALPHA_NUM:return 13;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var o=0;o<e;o++){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u++)if(!(n+u<0||e<=n+u))for(var l=-1;l<=1;l++)o+l<0||e<=o+l||0==u&&0==l||a==t.isDark(n+u,o+l)&&i++;i>5&&(r+=3+i-5)}for(n=0;n<e-1;n++)for(o=0;o<e-1;o++){var s=0;t.isDark(n,o)&&s++,t.isDark(n+1,o)&&s++,t.isDark(n,o+1)&&s++,t.isDark(n+1,o+1)&&s++,0!=s&&4!=s||(r+=3)}for(n=0;n<e;n++)for(o=0;o<e-6;o++)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(r+=40);for(o=0;o<e;o++)for(n=0;n<e-6;n++)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(r+=40);var c=0;for(o=0;o<e;o++)for(n=0;n<e;n++)t.isDark(n,o)&&c++;return r+=10*(Math.abs(100*c/e/e-50)/5)}};t.exports=d},5854:function(t,e,r){"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){return o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o.apply(this,arguments)}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(r,!0).forEach((function(e){p(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t,e,r){return e&&s(t.prototype,e),r&&s(t,r),t}function f(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?g(t):e}function h(t){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},h(t)}function g(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}function m(t,e){return m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},m(t,e)}function p(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var v=r(7294),y=r(5189),w=r(5766);function C(t){for(var e="",r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e+=String.fromCharCode(n):n<2048?(e+=String.fromCharCode(192|n>>6),e+=String.fromCharCode(128|63&n)):n<55296||n>=57344?(e+=String.fromCharCode(224|n>>12),e+=String.fromCharCode(128|n>>6&63),e+=String.fromCharCode(128|63&n)):(r++,n=65536+((1023&n)<<10|1023&t.charCodeAt(r)),e+=String.fromCharCode(240|n>>18),e+=String.fromCharCode(128|n>>12&63),e+=String.fromCharCode(128|n>>6&63),e+=String.fromCharCode(128|63&n))}return e}var b={size:128,level:"L",bgColor:"#FFFFFF",fgColor:"#000000",includeMargin:!1};function E(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=[];return t.forEach((function(t,n){var o=null;t.forEach((function(i,a){if(!i&&null!==o)return r.push("M".concat(o+e," ").concat(n+e,"h").concat(a-o,"v1H").concat(o+e,"z")),void(o=null);if(a!==t.length-1)i&&null===o&&(o=a);else{if(!i)return;null===o?r.push("M".concat(a+e,",").concat(n+e," h1v1H").concat(a+e,"z")):r.push("M".concat(o+e,",").concat(n+e," h").concat(a+1-o,"v1H").concat(o+e,"z"))}}))})),r.join("")}function L(t,e){return t.slice().map((function(t,r){return r<e.y||r>=e.y+e.h?t:t.map((function(t,r){return(r<e.x||r>=e.x+e.w)&&t}))}))}function P(t,e){var r=t.imageSettings,n=t.size,o=t.includeMargin;if(null==r)return null;var i=o?4:0,a=e.length+2*i,u=Math.floor(.1*n),l=a/n,s=(r.width||u)*l,c=(r.height||u)*l,f=null==r.x?e.length/2-s/2:r.x*l,h=null==r.y?e.length/2-c/2:r.y*l,g=null;if(r.excavate){var d=Math.floor(f),m=Math.floor(h);g={x:d,y:m,w:Math.ceil(s+f-d),h:Math.ceil(c+h-m)}}return{x:f,y:h,h:c,w:s,excavation:g}}var B=function(){try{(new Path2D).addPath(new Path2D)}catch(t){return!1}return!0}(),_=function(t){function e(){var t,r;l(this,e);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return p(g(r=f(this,(t=h(e)).call.apply(t,[this].concat(o)))),"_canvas",void 0),p(g(r),"_image",void 0),p(g(r),"state",{imgLoaded:!1}),p(g(r),"handleImageLoad",(function(){r.setState({imgLoaded:!0})})),r}return d(e,t),c(e,[{key:"componentDidMount",value:function(){this._image&&this._image.complete&&this.handleImageLoad(),this.update()}},{key:"componentWillReceiveProps",value:function(t){var e,r;(null===(e=this.props.imageSettings)||void 0===e?void 0:e.src)!==(null===(r=t.imageSettings)||void 0===r?void 0:r.src)&&this.setState({imgLoaded:!1})}},{key:"componentDidUpdate",value:function(){this.update()}},{key:"update",value:function(){var t=this.props,e=t.value,r=t.size,n=t.level,o=t.bgColor,i=t.fgColor,a=t.includeMargin,u=t.imageSettings,l=new y(-1,w[n]);if(l.addData(C(e)),l.make(),null!=this._canvas){var s=this._canvas,c=s.getContext("2d");if(!c)return;var f=l.modules;if(null===f)return;var h=a?4:0,g=f.length+2*h,d=P(this.props,f);null!=u&&null!=d&&null!=d.excavation&&(f=L(f,d.excavation));var m=window.devicePixelRatio||1;s.height=s.width=r*m;var p=r/g*m;c.scale(p,p),c.fillStyle=o,c.fillRect(0,0,g,g),c.fillStyle=i,B?c.fill(new Path2D(E(f,h))):f.forEach((function(t,e){t.forEach((function(t,r){t&&c.fillRect(r+h,e+h,1,1)}))})),this.state.imgLoaded&&this._image&&null!=d&&c.drawImage(this._image,d.x+h,d.y+h,d.w,d.h)}}},{key:"render",value:function(){var t=this,e=this.props,r=(e.value,e.size),n=(e.level,e.bgColor,e.fgColor,e.style),i=(e.includeMargin,e.imageSettings),l=u(e,["value","size","level","bgColor","fgColor","style","includeMargin","imageSettings"]),s=a({height:r,width:r},n),c=null,f=i&&i.src;return null!=i&&null!=f&&(c=v.createElement("img",{src:f,style:{display:"none"},onLoad:this.handleImageLoad,ref:function(e){return t._image=e}})),v.createElement(v.Fragment,null,v.createElement("canvas",o({style:s,height:r,width:r,ref:function(e){return t._canvas=e}},l)),c)}}]),e}(v.PureComponent);p(_,"defaultProps",b);var D=function(t){function e(){return l(this,e),f(this,h(e).apply(this,arguments))}return d(e,t),c(e,[{key:"render",value:function(){var t=this.props,e=t.value,r=t.size,n=t.level,i=t.bgColor,a=t.fgColor,l=t.includeMargin,s=t.imageSettings,c=u(t,["value","size","level","bgColor","fgColor","includeMargin","imageSettings"]),f=new y(-1,w[n]);f.addData(C(e)),f.make();var h=f.modules;if(null===h)return null;var g=l?4:0,d=h.length+2*g,m=P(this.props,h),p=null;null!=s&&null!=m&&(null!=m.excavation&&(h=L(h,m.excavation)),p=v.createElement("image",{xlinkHref:s.src,height:m.h,width:m.w,x:m.x+g,y:m.y+g,preserveAspectRatio:"none"}));var b=E(h,g);return v.createElement("svg",o({shapeRendering:"crispEdges",height:r,width:r,viewBox:"0 0 ".concat(d," ").concat(d)},c),v.createElement("path",{fill:i,d:"M0,0 h".concat(d,"v").concat(d,"H0z")}),v.createElement("path",{fill:a,d:b}),p)}}]),e}(v.PureComponent);p(D,"defaultProps",b);var O=function(t){var e=t.renderAs,r=u(t,["renderAs"]),n="svg"===e?D:_;return v.createElement(n,r)};O.defaultProps=a({renderAs:"canvas"},b),t.exports=O},5951:function(t,e,r){"use strict";r.d(e,{Z:function(){return o}});var n=r(7294);function o(t){var e=t.children,r=t.style;return n.createElement("div",{style:Object.assign({display:"flex",position:"fixed",top:0,left:0,bottom:0,right:0,flex:1,flexDirection:"column"},r)},e)}},3119:function(t,e,r){"use strict";r.d(e,{ZP:function(){return o},dt:function(){return i},tA:function(){return a},YE:function(){return u},_4:function(){return l}});var n=r(7294);function o(t,e,r,o){void 0===r&&(r=function(t){return t}),void 0===o&&(o=function(t){return t});var i=function(t){return"undefined"!=typeof window&&null!==window.localStorage.getItem(t)}(t)?o(function(t){if("undefined"==typeof window)return null;var e=window.localStorage.getItem(t);return JSON.parse(e)}(t)):e,a=(0,n.useState)(i),u=a[0],l=a[1],s=(0,n.useCallback)((function(e){var n=r(e);!function(t,e){if("undefined"==typeof window)return;var r=JSON.stringify(e);window.localStorage.setItem(t,r)}(t,n),l(e)}),[]),c=(0,n.useCallback)((function(){!function(t){if("undefined"==typeof window)return;window.localStorage.removeItem(t)}(t)}),[]);return[u,s,c]}var i=function(t){return null===t?null:t.getTime()},a=function(t){return null===t?null:new Date(t)},u=function(t){return function(e){return e.map(t)}},l=function(t){return function(e){return e.map(t)}}},5223:function(t,e,r){"use strict";r.r(e);var n=r(7294),o=r(5951),i=r(3119),a=r(5854),u=r.n(a);e.default=function(){var t=(0,i.ZP)("qr.input",""),e=t[0],r=t[1],a=(0,n.useRef)(),l=(0,n.useCallback)((function(){var t=a.current.children[0],e=document.createElement("a");e.download="qrcode.png",e.href=t.toDataURL("image/png"),e.click()}),[]);return n.createElement(o.Z,{style:{padding:"1em"}},n.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"stretch",maxWidth:600,margin:"auto"}},n.createElement("input",{type:"text",onChange:function(t){r(t.target.value)},value:e,placeholder:"https://utils.cool",style:{fontSize:"1.4em",borderRadius:12,border:"none",padding:"0.4em",marginBottom:"1em"}}),n.createElement("div",{ref:a,style:{padding:"1em",borderRadius:12,backgroundColor:"white"}},n.createElement(u(),{value:e,size:200,style:{display:"block",margin:"auto"}})),n.createElement("button",{onClick:l},"Download")))}}}]);
//# sourceMappingURL=component---src-pages-qrcode-js-43cb31b00c4c42b8c8e8.js.map
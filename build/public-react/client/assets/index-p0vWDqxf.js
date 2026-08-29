import{T as kn,a as Sn}from"./components-Du9Ywr_M.js";import{H as Kf,C as Vf}from"./hls-DaaW-Q4g.js";import{C as Kn,M as qf}from"./mixin-BY5xW4uI.js";var Yf=Object.create,Om=Object.defineProperty,Gf=Object.getOwnPropertyDescriptor,zf=Object.getOwnPropertyNames,Qf=Object.getPrototypeOf,jf=Object.prototype.hasOwnProperty,Nm=function(t,e){return function(){return t&&(e=t(t=0)),e}},ze=function(t,e){return function(){return e||t((e={exports:{}}).exports,e),e.exports}},Zf=function(t,e,i,a){if(e&&typeof e=="object"||typeof e=="function")for(var r=zf(e),n=0,s=r.length,o;n<s;n++)o=r[n],!jf.call(t,o)&&o!==i&&Om(t,o,{get:(function(l){return e[l]}).bind(null,o),enumerable:!(a=Gf(e,o))||a.enumerable});return t},ut=function(t,e,i){return i=t!=null?Yf(Qf(t)):{},Zf(!t||!t.__esModule?Om(i,"default",{value:t,enumerable:!0}):i,t)},Jt=ze(function(t,e){var i;typeof window<"u"?i=window:typeof global<"u"?i=global:typeof self<"u"?i=self:i={},e.exports=i});function fa(t,e){return e!=null&&typeof Symbol<"u"&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](t):fa(t,e)}var Ea=Nm(function(){Ea()});function Pm(t){"@swc/helpers - typeof";return t&&typeof Symbol<"u"&&t.constructor===Symbol?"symbol":typeof t}var Um=Nm(function(){}),$m=ze(function(t,e){var i=Array.prototype.slice;e.exports=a;function a(r,n){for(("length"in r)||(r=[r]),r=i.call(r);r.length;){var s=r.shift(),o=n(s);if(o)return o;s.childNodes&&s.childNodes.length&&(r=i.call(s.childNodes).concat(r))}}}),Xf=ze(function(t,e){Ea(),e.exports=i;function i(a,r){if(!fa(this,i))return new i(a,r);this.data=a,this.nodeValue=a,this.length=a.length,this.ownerDocument=r||null}i.prototype.nodeType=8,i.prototype.nodeName="#comment",i.prototype.toString=function(){return"[object Comment]"}}),Jf=ze(function(t,e){Ea(),e.exports=i;function i(a,r){if(!fa(this,i))return new i(a);this.data=a||"",this.length=this.data.length,this.ownerDocument=r||null}i.prototype.type="DOMTextNode",i.prototype.nodeType=3,i.prototype.nodeName="#text",i.prototype.toString=function(){return this.data},i.prototype.replaceData=function(a,r,n){var s=this.data,o=s.substring(0,a),l=s.substring(a+r,s.length);this.data=o+n+l,this.length=this.data.length}}),Hm=ze(function(t,e){e.exports=i;function i(a){var r=this,n=a.type;a.target||(a.target=r),r.listeners||(r.listeners={});var s=r.listeners[n];if(s)return s.forEach(function(o){a.currentTarget=r,typeof o=="function"?o(a):o.handleEvent(a)});r.parentNode&&r.parentNode.dispatchEvent(a)}}),Bm=ze(function(t,e){e.exports=i;function i(a,r){var n=this;n.listeners||(n.listeners={}),n.listeners[a]||(n.listeners[a]=[]),n.listeners[a].indexOf(r)===-1&&n.listeners[a].push(r)}}),Wm=ze(function(t,e){e.exports=i;function i(a,r){var n=this;if(n.listeners&&n.listeners[a]){var s=n.listeners[a],o=s.indexOf(r);o!==-1&&s.splice(o,1)}}}),eE=ze(function(t,e){Um(),e.exports=a;var i=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];function a(h){switch(h.nodeType){case 3:return m(h.data);case 8:return"<!--"+h.data+"-->";default:return r(h)}}function r(h){var u=[],v=h.tagName;return h.namespaceURI==="http://www.w3.org/1999/xhtml"&&(v=v.toLowerCase()),u.push("<"+v+d(h)+o(h)),i.indexOf(v)>-1?u.push(" />"):(u.push(">"),h.childNodes.length?u.push.apply(u,h.childNodes.map(a)):h.textContent||h.innerText?u.push(m(h.textContent||h.innerText)):h.innerHTML&&u.push(h.innerHTML),u.push("</"+v+">")),u.join("")}function n(h,u){var v=Pm(h[u]);return u==="style"&&Object.keys(h.style).length>0?!0:h.hasOwnProperty(u)&&(v==="string"||v==="boolean"||v==="number")&&u!=="nodeName"&&u!=="className"&&u!=="tagName"&&u!=="textContent"&&u!=="innerText"&&u!=="namespaceURI"&&u!=="innerHTML"}function s(h){if(typeof h=="string")return h;var u="";return Object.keys(h).forEach(function(v){var E=h[v];v=v.replace(/[A-Z]/g,function(y){return"-"+y.toLowerCase()}),u+=v+":"+E+";"}),u}function o(h){var u=h.dataset,v=[];for(var E in u)v.push({name:"data-"+E,value:u[E]});return v.length?l(v):""}function l(h){var u=[];return h.forEach(function(v){var E=v.name,y=v.value;E==="style"&&(y=s(y)),u.push(E+'="'+p(y)+'"')}),u.length?" "+u.join(" "):""}function d(h){var u=[];for(var v in h)n(h,v)&&u.push({name:v,value:h[v]});for(var E in h._attributes)for(var y in h._attributes[E]){var g=h._attributes[E][y],T=(g.prefix?g.prefix+":":"")+y;u.push({name:T,value:g.value})}return h.className&&u.push({name:"class",value:h.className}),u.length?l(u):""}function m(h){var u="";return typeof h=="string"?u=h:h&&(u=h.toString()),u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function p(h){return m(h).replace(/"/g,"&quot;")}}),Fm=ze(function(t,e){Ea();var i=$m(),a=Hm(),r=Bm(),n=Wm(),s=eE(),o="http://www.w3.org/1999/xhtml";e.exports=l;function l(d,m,p){if(!fa(this,l))return new l(d);var h=p===void 0?o:p||null;this.tagName=h===o?String(d).toUpperCase():d,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=m||null,this.namespaceURI=h,this._attributes={},this.tagName==="INPUT"&&(this.type="text")}l.prototype.type="DOMElement",l.prototype.nodeType=1,l.prototype.appendChild=function(d){return d.parentNode&&d.parentNode.removeChild(d),this.childNodes.push(d),d.parentNode=this,d},l.prototype.replaceChild=function(d,m){d.parentNode&&d.parentNode.removeChild(d);var p=this.childNodes.indexOf(m);return m.parentNode=null,this.childNodes[p]=d,d.parentNode=this,m},l.prototype.removeChild=function(d){var m=this.childNodes.indexOf(d);return this.childNodes.splice(m,1),d.parentNode=null,d},l.prototype.insertBefore=function(d,m){d.parentNode&&d.parentNode.removeChild(d);var p=m==null?-1:this.childNodes.indexOf(m);return p>-1?this.childNodes.splice(p,0,d):this.childNodes.push(d),d.parentNode=this,d},l.prototype.setAttributeNS=function(d,m,p){var h=null,u=m,v=m.indexOf(":");if(v>-1&&(h=m.substr(0,v),u=m.substr(v+1)),this.tagName==="INPUT"&&m==="type")this.type=p;else{var E=this._attributes[d]||(this._attributes[d]={});E[u]={value:p,prefix:h}}},l.prototype.getAttributeNS=function(d,m){var p=this._attributes[d],h=p&&p[m]&&p[m].value;return this.tagName==="INPUT"&&m==="type"?this.type:typeof h!="string"?null:h},l.prototype.removeAttributeNS=function(d,m){var p=this._attributes[d];p&&delete p[m]},l.prototype.hasAttributeNS=function(d,m){var p=this._attributes[d];return!!p&&m in p},l.prototype.setAttribute=function(d,m){return this.setAttributeNS(null,d,m)},l.prototype.getAttribute=function(d){return this.getAttributeNS(null,d)},l.prototype.removeAttribute=function(d){return this.removeAttributeNS(null,d)},l.prototype.hasAttribute=function(d){return this.hasAttributeNS(null,d)},l.prototype.removeEventListener=n,l.prototype.addEventListener=r,l.prototype.dispatchEvent=a,l.prototype.focus=function(){},l.prototype.toString=function(){return s(this)},l.prototype.getElementsByClassName=function(d){var m=d.split(" "),p=[];return i(this,function(h){if(h.nodeType===1){var u=h.className||"",v=u.split(" ");m.every(function(E){return v.indexOf(E)!==-1})&&p.push(h)}}),p},l.prototype.getElementsByTagName=function(d){d=d.toLowerCase();var m=[];return i(this.childNodes,function(p){p.nodeType===1&&(d==="*"||p.tagName.toLowerCase()===d)&&m.push(p)}),m},l.prototype.contains=function(d){return i(this,function(m){return d===m})||!1}}),tE=ze(function(t,e){Ea();var i=Fm();e.exports=a;function a(r){if(!fa(this,a))return new a;this.childNodes=[],this.parentNode=null,this.ownerDocument=r||null}a.prototype.type="DocumentFragment",a.prototype.nodeType=11,a.prototype.nodeName="#document-fragment",a.prototype.appendChild=i.prototype.appendChild,a.prototype.replaceChild=i.prototype.replaceChild,a.prototype.removeChild=i.prototype.removeChild,a.prototype.toString=function(){return this.childNodes.map(function(r){return String(r)}).join("")}}),iE=ze(function(t,e){e.exports=i;function i(a){}i.prototype.initEvent=function(a,r,n){this.type=a,this.bubbles=r,this.cancelable=n},i.prototype.preventDefault=function(){}}),aE=ze(function(t,e){Ea();var i=$m(),a=Xf(),r=Jf(),n=Fm(),s=tE(),o=iE(),l=Hm(),d=Bm(),m=Wm();e.exports=p;function p(){if(!fa(this,p))return new p;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}var h=p.prototype;h.createTextNode=function(u){return new r(u,this)},h.createElementNS=function(u,v){var E=u===null?null:String(u);return new n(v,this,E)},h.createElement=function(u){return new n(u,this)},h.createDocumentFragment=function(){return new s(this)},h.createEvent=function(u){return new o(u)},h.createComment=function(u){return new a(u,this)},h.getElementById=function(u){u=String(u);var v=i(this.childNodes,function(E){if(String(E.id)===u)return E});return v||null},h.getElementsByClassName=n.prototype.getElementsByClassName,h.getElementsByTagName=n.prototype.getElementsByTagName,h.contains=n.prototype.contains,h.removeEventListener=m,h.addEventListener=d,h.dispatchEvent=l}),rE=ze(function(t,e){var i=aE();e.exports=new i}),Km=ze(function(t,e){var i=typeof global<"u"?global:typeof window<"u"?window:{},a=rE(),r;typeof document<"u"?r=document:(r=i["__GLOBAL_DOCUMENT_CACHE@4"],r||(r=i["__GLOBAL_DOCUMENT_CACHE@4"]=a)),e.exports=r});function nE(t){if(Array.isArray(t))return t}function sE(t,e){var i=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(i!=null){var a=[],r=!0,n=!1,s,o;try{for(i=i.call(t);!(r=(s=i.next()).done)&&(a.push(s.value),!(e&&a.length===e));r=!0);}catch(l){n=!0,o=l}finally{try{!r&&i.return!=null&&i.return()}finally{if(n)throw o}}return a}}function oE(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Gl(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}function Vm(t,e){if(t){if(typeof t=="string")return Gl(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);if(i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set")return Array.from(i);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Gl(t,e)}}function Ei(t,e){return nE(t)||sE(t,e)||Vm(t,e)||oE()}var un=ut(Jt()),Xc=ut(Jt()),lE=ut(Jt()),dE={now:function(){var t=lE.default.performance,e=t&&t.timing,i=e&&e.navigationStart,a=typeof i=="number"&&typeof t.now=="function"?i+t.now():Date.now();return Math.round(a)}},De=dE,wn=function(){var t,e,i;if(typeof((t=Xc.default.crypto)===null||t===void 0?void 0:t.getRandomValues)=="function"){i=new Uint8Array(32),Xc.default.crypto.getRandomValues(i);for(var a=0;a<32;a++)i[a]=i[a]%16}else{i=[];for(var r=0;r<32;r++)i[r]=Math.random()*16|0}var n=0;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(l){var d=l==="x"?i[n]:i[n]&3|8;return n++,d.toString(16)});var s=De.now(),o=s?.toString(16).substring(3);return o?e.substring(0,28)+o:e},qm=function(){return("000000"+(Math.random()*Math.pow(36,6)<<0).toString(36)).slice(-6)},ft=function(t){if(t&&typeof t.nodeName<"u")return t.muxId||(t.muxId=qm()),t.muxId;var e;try{e=document.querySelector(t)}catch{}return e&&!e.muxId&&(e.muxId=t),e?.muxId||t},yo=function(t){var e;t&&typeof t.nodeName<"u"?(e=t,t=ft(e)):e=document.querySelector(t);var i=e&&e.nodeName?e.nodeName.toLowerCase():"";return[e,t,i]};function uE(t){if(Array.isArray(t))return Gl(t)}function cE(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function hE(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Et(t){return uE(t)||cE(t)||Vm(t)||hE()}var ra={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4},mE=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:3,i,a,r,n,s,o=[console,t],l=(i=console.trace).bind.apply(i,Et(o)),d=(a=console.info).bind.apply(a,Et(o)),m=(r=console.debug).bind.apply(r,Et(o)),p=(n=console.warn).bind.apply(n,Et(o)),h=(s=console.error).bind.apply(s,Et(o)),u=e;return{trace:function(){for(var v=arguments.length,E=new Array(v),y=0;y<v;y++)E[y]=arguments[y];if(!(u>ra.TRACE))return l.apply(void 0,Et(E))},debug:function(){for(var v=arguments.length,E=new Array(v),y=0;y<v;y++)E[y]=arguments[y];if(!(u>ra.DEBUG))return m.apply(void 0,Et(E))},info:function(){for(var v=arguments.length,E=new Array(v),y=0;y<v;y++)E[y]=arguments[y];if(!(u>ra.INFO))return d.apply(void 0,Et(E))},warn:function(){for(var v=arguments.length,E=new Array(v),y=0;y<v;y++)E[y]=arguments[y];if(!(u>ra.WARN))return p.apply(void 0,Et(E))},error:function(){for(var v=arguments.length,E=new Array(v),y=0;y<v;y++)E[y]=arguments[y];if(!(u>ra.ERROR))return h.apply(void 0,Et(E))},get level(){return u},set level(v){v!==this.level&&(u=v??e)}}},te=mE("[mux]"),Sl=ut(Jt());function zl(){var t=Sl.default.doNotTrack||Sl.default.navigator&&Sl.default.navigator.doNotTrack;return t==="1"}function U(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}Ea();function ve(t,e){if(!fa(t,e))throw new TypeError("Cannot call a class as a function")}function Jc(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function ct(t,e,i){return e&&Jc(t.prototype,e),i&&Jc(t,i),t}function I(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function cr(t){return cr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},cr(t)}function pE(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&(t=cr(t),t!==null););return t}function ds(t,e,i){return typeof Reflect<"u"&&Reflect.get?ds=Reflect.get:ds=function(a,r,n){var s=pE(a,r);if(s){var o=Object.getOwnPropertyDescriptor(s,r);return o.get?o.get.call(n||a):o.value}},ds(t,e,i||t)}function Ql(t,e){return Ql=Object.setPrototypeOf||function(i,a){return i.__proto__=a,i},Ql(t,e)}function vE(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Ql(t,e)}function fE(t,e){if(t==null)return{};var i={},a=Object.keys(t),r,n;for(n=0;n<a.length;n++)r=a[n],!(e.indexOf(r)>=0)&&(i[r]=t[r]);return i}function EE(t,e){if(t==null)return{};var i=fE(t,e),a,r;if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);for(r=0;r<n.length;r++)a=n[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}function _E(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}Um();function bE(t,e){return e&&(Pm(e)==="object"||typeof e=="function")?e:U(t)}function gE(t){var e=_E();return function(){var i=cr(t),a;if(e){var r=cr(this).constructor;a=Reflect.construct(i,arguments,r)}else a=i.apply(this,arguments);return bE(this,a)}}var kt=function(t){return In(t)[0]},In=function(t){if(typeof t!="string"||t==="")return["localhost"];var e=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,i=t.match(e)||[],a=i[4],r;return a&&(r=(a.match(/[^\.]+\.[^\.]+$/)||[])[0]),[a,r]},wl=ut(Jt()),yE={exists:function(){var t=wl.default.performance,e=t&&t.timing;return e!==void 0},domContentLoadedEventEnd:function(){var t=wl.default.performance,e=t&&t.timing;return e&&e.domContentLoadedEventEnd},navigationStart:function(){var t=wl.default.performance,e=t&&t.timing;return e&&e.navigationStart}},To=yE;function we(t,e,i){i=i===void 0?1:i,t[e]=t[e]||0,t[e]+=i}function Rn(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{},a=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable}))),a.forEach(function(r){I(t,r,i[r])})}return t}function TE(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);i.push.apply(i,a)}return i}function hu(t,e){return e=e??{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):TE(Object(e)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}),t}var AE=["x-cdn","content-type"],Ym=["x-request-id","cf-ray","x-amz-cf-id","x-akamai-request-id"],kE=AE.concat(Ym);function mu(t){t=t||"";var e={},i=t.trim().split(/[\r\n]+/);return i.forEach(function(a){if(a){var r=a.split(": "),n=r.shift();n&&(kE.indexOf(n.toLowerCase())>=0||n.toLowerCase().indexOf("x-litix-")===0)&&(e[n]=r.join(": "))}}),e}function Ao(t){if(t){var e=Ym.find(function(i){return t[i]!==void 0});return e?t[e]:void 0}}var SE=function(t){var e={};for(var i in t){var a=t[i],r=a["DATA-ID"].search("io.litix.data.");if(r!==-1){var n=a["DATA-ID"].replace("io.litix.data.","");e[n]=a.VALUE}}return e},Gm=SE,Vn=function(t){if(!t)return{};var e=To.navigationStart(),i=t.loading,a=i?i.start:t.trequest,r=i?i.first:t.tfirst,n=i?i.end:t.tload;return{bytesLoaded:t.total,requestStart:Math.round(e+a),responseStart:Math.round(e+r),responseEnd:Math.round(e+n)}},Sr=function(t){if(!(!t||typeof t.getAllResponseHeaders!="function"))return mu(t.getAllResponseHeaders())},wE=function(t,e,i){var a=arguments.length>4?arguments[4]:void 0,r=t.log,n=t.utils.secondsToMs,s=function(y){var g=parseInt(a.version),T;return g===1&&y.programDateTime!==null&&(T=y.programDateTime),g===0&&y.pdt!==null&&(T=y.pdt),T};if(!To.exists()){r.warn("performance timing not supported. Not tracking HLS.js.");return}var o=function(y,g){return t.emit(e,y,g)},l=function(y,g){var T=g.levels,_=g.audioTracks,k=g.url,D=g.stats,L=g.networkDetails,w=g.sessionData,$={},V={};T.forEach(function(fe,He){$[He]={width:fe.width,height:fe.height,bitrate:fe.bitrate,attrs:fe.attrs}}),_.forEach(function(fe,He){V[He]={name:fe.name,language:fe.lang,bitrate:fe.bitrate}});var W=Vn(D),B=W.bytesLoaded,Ne=W.requestStart,Qe=W.responseStart,je=W.responseEnd;o("requestcompleted",hu(Rn({},Gm(w)),{request_event_type:y,request_bytes_loaded:B,request_start:Ne,request_response_start:Qe,request_response_end:je,request_type:"manifest",request_hostname:kt(k),request_response_headers:Sr(L),request_rendition_lists:{media:$,audio:V,video:{}}}))};i.on(a.Events.MANIFEST_LOADED,l);var d=function(y,g){var T=g.details,_=g.level,k=g.networkDetails,D=g.stats,L=Vn(D),w=L.bytesLoaded,$=L.requestStart,V=L.responseStart,W=L.responseEnd,B=T.fragments[T.fragments.length-1],Ne=s(B)+n(B.duration);o("requestcompleted",{request_event_type:y,request_bytes_loaded:w,request_start:$,request_response_start:V,request_response_end:W,request_current_level:_,request_type:"manifest",request_hostname:kt(T.url),request_response_headers:Sr(k),video_holdback:T.holdBack&&n(T.holdBack),video_part_holdback:T.partHoldBack&&n(T.partHoldBack),video_part_target_duration:T.partTarget&&n(T.partTarget),video_target_duration:T.targetduration&&n(T.targetduration),video_source_is_live:T.live,player_manifest_newest_program_time:isNaN(Ne)?void 0:Ne})};i.on(a.Events.LEVEL_LOADED,d);var m=function(y,g){var T=g.details,_=g.networkDetails,k=g.stats,D=Vn(k),L=D.bytesLoaded,w=D.requestStart,$=D.responseStart,V=D.responseEnd;o("requestcompleted",{request_event_type:y,request_bytes_loaded:L,request_start:w,request_response_start:$,request_response_end:V,request_type:"manifest",request_hostname:kt(T.url),request_response_headers:Sr(_)})};i.on(a.Events.AUDIO_TRACK_LOADED,m);var p=function(y,g){var T=g.stats,_=g.networkDetails,k=g.frag;T=T||k.stats;var D=Vn(T),L=D.bytesLoaded,w=D.requestStart,$=D.responseStart,V=D.responseEnd,W=_?Sr(_):void 0,B={request_event_type:y,request_bytes_loaded:L,request_start:w,request_response_start:$,request_response_end:V,request_hostname:_?kt(_.responseURL):void 0,request_id:W?Ao(W):void 0,request_response_headers:W,request_media_duration:k.duration,request_url:_?.responseURL};k.type==="main"?(B.request_type="media",B.request_current_level=k.level,B.request_video_width=(i.levels[k.level]||{}).width,B.request_video_height=(i.levels[k.level]||{}).height,B.request_labeled_bitrate=(i.levels[k.level]||{}).bitrate):B.request_type=k.type,o("requestcompleted",B)};i.on(a.Events.FRAG_LOADED,p);var h=function(y,g){var T=g.frag,_=T.start,k=s(T),D={currentFragmentPDT:k,currentFragmentStart:n(_)};o("fragmentchange",D)};i.on(a.Events.FRAG_CHANGED,h);var u=function(y,g){var T=g.type,_=g.details,k=g.response,D=g.fatal,L=g.frag,w=g.networkDetails,$=L?.url||g.url||"",V=w?Sr(w):void 0;if((_===a.ErrorDetails.MANIFEST_LOAD_ERROR||_===a.ErrorDetails.MANIFEST_LOAD_TIMEOUT||_===a.ErrorDetails.FRAG_LOAD_ERROR||_===a.ErrorDetails.FRAG_LOAD_TIMEOUT||_===a.ErrorDetails.LEVEL_LOAD_ERROR||_===a.ErrorDetails.LEVEL_LOAD_TIMEOUT||_===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||_===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT||_===a.ErrorDetails.SUBTITLE_LOAD_ERROR||_===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT||_===a.ErrorDetails.KEY_LOAD_ERROR||_===a.ErrorDetails.KEY_LOAD_TIMEOUT)&&o("requestfailed",{request_error:_,request_url:$,request_hostname:kt($),request_id:V?Ao(V):void 0,request_type:_===a.ErrorDetails.FRAG_LOAD_ERROR||_===a.ErrorDetails.FRAG_LOAD_TIMEOUT?"media":_===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||_===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT?"audio":_===a.ErrorDetails.SUBTITLE_LOAD_ERROR||_===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT?"subtitle":_===a.ErrorDetails.KEY_LOAD_ERROR||_===a.ErrorDetails.KEY_LOAD_TIMEOUT?"encryption":"manifest",request_error_code:k?.code,request_error_text:k?.text}),D){var W,B="".concat($?"url: ".concat($,`
`):"")+"".concat(k&&(k.code||k.text)?"response: ".concat(k.code,", ").concat(k.text,`
`):"")+"".concat(g.reason?"failure reason: ".concat(g.reason,`
`):"")+"".concat(g.level?"level: ".concat(g.level,`
`):"")+"".concat(g.parent?"parent stream controller: ".concat(g.parent,`
`):"")+"".concat(g.buffer?"buffer length: ".concat(g.buffer,`
`):"")+"".concat(g.error?"error: ".concat(g.error,`
`):"")+"".concat(g.event?"event: ".concat(g.event,`
`):"")+"".concat(g.err?"error message: ".concat((W=g.err)===null||W===void 0?void 0:W.message,`
`):"");o("error",{player_error_code:T,player_error_message:_,player_error_context:B})}};i.on(a.Events.ERROR,u);var v=function(y,g){var T=g.frag,_=T&&T._url||"";o("requestcanceled",{request_event_type:y,request_url:_,request_type:"media",request_hostname:kt(_)})};i.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,v);var E=function(y,g){var T=g.level,_=i.levels[T];if(_&&_.attrs&&_.attrs.BANDWIDTH){var k=_.attrs.BANDWIDTH,D,L=parseFloat(_.attrs["FRAME-RATE"]);isNaN(L)||(D=L),k?o("renditionchange",{video_source_fps:D,video_source_bitrate:k,video_source_width:_.width,video_source_height:_.height,video_source_rendition_name:_.name,video_source_codec:_?.videoCodec}):r.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js")}};i.on(a.Events.LEVEL_SWITCHED,E),i._stopMuxMonitor=function(){i.off(a.Events.MANIFEST_LOADED,l),i.off(a.Events.LEVEL_LOADED,d),i.off(a.Events.AUDIO_TRACK_LOADED,m),i.off(a.Events.FRAG_LOADED,p),i.off(a.Events.FRAG_CHANGED,h),i.off(a.Events.ERROR,u),i.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,v),i.off(a.Events.LEVEL_SWITCHED,E),i.off(a.Events.DESTROYING,i._stopMuxMonitor),delete i._stopMuxMonitor},i.on(a.Events.DESTROYING,i._stopMuxMonitor)},IE=function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},eh=function(t,e){if(!t||!t.requestEndDate)return{};var i=kt(t.url),a=t.url,r=t.bytesLoaded,n=new Date(t.requestStartDate).getTime(),s=new Date(t.firstByteDate).getTime(),o=new Date(t.requestEndDate).getTime(),l=isNaN(t.duration)?0:t.duration,d=typeof e.getMetricsFor=="function"?e.getMetricsFor(t.mediaType).HttpList:e.getDashMetrics().getHttpRequests(t.mediaType),m;d.length>0&&(m=mu(d[d.length-1]._responseHeaders||""));var p=m?Ao(m):void 0;return{requestStart:n,requestResponseStart:s,requestResponseEnd:o,requestBytesLoaded:r,requestResponseHeaders:m,requestMediaDuration:l,requestHostname:i,requestUrl:a,requestId:p}},RE=function(t,e){if(typeof e.getCurrentRepresentationForType=="function"){var i=e.getCurrentRepresentationForType(t);return i?{currentLevel:i.absoluteIndex,renditionWidth:i.width||null,renditionHeight:i.height||null,renditionBitrate:i.bandwidth}:{}}var a=e.getQualityFor(t),r=e.getCurrentTrackFor(t).bitrateList;return r?{currentLevel:a,renditionWidth:r[a].width||null,renditionHeight:r[a].height||null,renditionBitrate:r[a].bandwidth}:{}},LE=function(t){var e;return(e=t.match(/.*codecs\*?="(.*)"/))===null||e===void 0?void 0:e[1]},CE=function(t){try{var e,i,a=(i=t.getVersion)===null||i===void 0||(e=i.call(t))===null||e===void 0?void 0:e.split(".").map(function(r){return parseInt(r)})[0];return a}catch{return!1}},DE=function(t,e,i){var a=t.log;if(!i||!i.on){a.warn("Invalid dash.js player reference. Monitoring blocked.");return}var r=CE(i),n=function(T,_){return t.emit(e,T,_)},s=function(T){var _=T.type,k=T.data,D=(k||{}).url;n("requestcompleted",{request_event_type:_,request_start:0,request_response_start:0,request_response_end:0,request_bytes_loaded:-1,request_type:"manifest",request_hostname:kt(D),request_url:D})};i.on("manifestLoaded",s);var o={},l=function(T){if(typeof T.getRequests!="function")return null;var _=T.getRequests({state:"executed"});return _.length===0?null:_[_.length-1]},d=function(T){var _=T.type,k=T.fragmentModel,D=T.chunk,L=l(k);m({type:_,request:L,chunk:D})},m=function(T){var _=T.type,k=T.chunk,D=T.request,L=(k||{}).mediaInfo,w=L||{},$=w.type,V=w.bitrateList;V=V||[];var W={};V.forEach(function(Ze,Ie){W[Ie]={},W[Ie].width=Ze.width,W[Ie].height=Ze.height,W[Ie].bitrate=Ze.bandwidth,W[Ie].attrs={}}),$==="video"?o.video=W:$==="audio"?o.audio=W:o.media=W;var B=eh(D,i),Ne=B.requestStart,Qe=B.requestResponseStart,je=B.requestResponseEnd,fe=B.requestResponseHeaders,He=B.requestMediaDuration,Rt=B.requestHostname,Be=B.requestUrl,mt=B.requestId;n("requestcompleted",{request_event_type:_,request_start:Ne,request_response_start:Qe,request_response_end:je,request_bytes_loaded:-1,request_type:$+"_init",request_response_headers:fe,request_hostname:Rt,request_id:mt,request_url:Be,request_media_duration:He,request_rendition_lists:o})};r>=4?i.on("initFragmentLoaded",m):i.on("initFragmentLoaded",d);var p=function(T){var _=T.type,k=T.fragmentModel,D=T.chunk,L=l(k);h({type:_,request:L,chunk:D})},h=function(T){var _=T.type,k=T.chunk,D=T.request,L=k||{},w=L.mediaInfo,$=L.start,V=w||{},W=V.type,B=eh(D,i),Ne=B.requestStart,Qe=B.requestResponseStart,je=B.requestResponseEnd,fe=B.requestBytesLoaded,He=B.requestResponseHeaders,Rt=B.requestMediaDuration,Be=B.requestHostname,mt=B.requestUrl,Ze=B.requestId,Ie=RE(W,i),Pe=Ie.currentLevel,We=Ie.renditionWidth,ei=Ie.renditionHeight,Vi=Ie.renditionBitrate;n("requestcompleted",{request_event_type:_,request_start:Ne,request_response_start:Qe,request_response_end:je,request_bytes_loaded:fe,request_type:W,request_response_headers:He,request_hostname:Be,request_id:Ze,request_url:mt,request_media_start_time:$,request_media_duration:Rt,request_current_level:Pe,request_labeled_bitrate:Vi,request_video_width:We,request_video_height:ei})};r>=4?i.on("mediaFragmentLoaded",h):i.on("mediaFragmentLoaded",p);var u={video:void 0,audio:void 0,totalBitrate:void 0},v=function(){if(u.video&&typeof u.video.bitrate=="number"){if(!(u.video.width&&u.video.height)){a.warn("have bitrate info for video but missing width/height");return}var T=u.video.bitrate;if(u.audio&&typeof u.audio.bitrate=="number"&&(T+=u.audio.bitrate),T!==u.totalBitrate)return u.totalBitrate=T,{video_source_bitrate:T,video_source_height:u.video.height,video_source_width:u.video.width,video_source_codec:LE(u.video.codec)}}},E=function(T,_,k){var D=T.mediaType;if(D==="audio"||D==="video"){var L;if(typeof i.getRepresentationsByType=="function")if(T.newRepresentation)L={bitrate:T.newRepresentation.bandwidth,width:T.newRepresentation.width,height:T.newRepresentation.height,qualityIndex:T.newRepresentation.absoluteIndex};else{var w=i.getRepresentationsByType(D);if(w&&typeof T.newQuality=="number"){var $=w.find(function(W){return W.absoluteIndex===T.newQuality||W.index===T.newQuality});$&&(L={bitrate:$.bandwidth,width:$.width,height:$.height,qualityIndex:T.newQuality})}}else{if(typeof T.newQuality!="number"){a.warn("missing evt.newQuality in qualityChangeRendered event",T);return}L=i.getBitrateInfoListFor(D).find(function(W){var B=W.qualityIndex;return B===T.newQuality})}if(!(L&&typeof L.bitrate=="number")){a.warn("missing bitrate info for ".concat(D));return}u[D]=hu(Rn({},L),{codec:i.getCurrentTrackFor(D).codec});var V=v();V&&n("renditionchange",V)}};i.on("qualityChangeRendered",E);var y=function(T){var _=T.request,k=T.mediaType;_=_||{},n("requestcanceled",{request_event_type:_.type+"_"+_.action,request_url:_.url,request_type:k,request_hostname:kt(_.url)})};i.on("fragmentLoadingAbandoned",y);var g=function(T){var _=T.error,k,D,L=(_==null||(k=_.data)===null||k===void 0?void 0:k.request)||{},w=(_==null||(D=_.data)===null||D===void 0?void 0:D.response)||{};_?.code===27&&n("requestfailed",{request_error:L.type+"_"+L.action,request_url:L.url,request_hostname:kt(L.url),request_type:L.mediaType,request_error_code:w.status,request_error_text:w.statusText});var $="".concat(L!=null&&L.url?"url: ".concat(L.url,`
`):"")+"".concat(w!=null&&w.status||w!=null&&w.statusText?"response: ".concat(w?.status,", ").concat(w?.statusText,`
`):"");n("error",{player_error_code:_?.code,player_error_message:_?.message,player_error_context:$})};i.on("error",g),i._stopMuxMonitor=function(){i.off("manifestLoaded",s),i.off("initFragmentLoaded",m),i.off("mediaFragmentLoaded",h),i.off("qualityChangeRendered",E),i.off("error",g),i.off("fragmentLoadingAbandoned",y),delete i._stopMuxMonitor}},ME=function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},th=0,xE=(function(){function t(){ve(this,t),I(this,"_listeners",void 0)}return ct(t,[{key:"on",value:function(e,i,a){return i._eventEmitterGuid=i._eventEmitterGuid||++th,this._listeners=this._listeners||{},this._listeners[e]=this._listeners[e]||[],a&&(i=i.bind(a)),this._listeners[e].push(i),i}},{key:"off",value:function(e,i){var a=this._listeners&&this._listeners[e];a&&a.forEach(function(r,n){r._eventEmitterGuid===i._eventEmitterGuid&&a.splice(n,1)})}},{key:"one",value:function(e,i,a){var r=this;i._eventEmitterGuid=i._eventEmitterGuid||++th;var n=function(){r.off(e,n),i.apply(a||this,arguments)};n._eventEmitterGuid=i._eventEmitterGuid,this.on(e,n)}},{key:"emit",value:function(e,i){var a=this;if(this._listeners){i=i||{};var r=this._listeners["before"+e]||[],n=this._listeners["before*"]||[],s=this._listeners[e]||[],o=this._listeners["after"+e]||[],l=function(d,m){d=d.slice(),d.forEach(function(p){p.call(a,{type:e},m)})};l(r,i),l(n,i),l(s,i),l(o,i)}}}]),t})(),OE=xE,Il=ut(Jt()),NE=(function(){function t(e){var i=this;ve(this,t),I(this,"_playbackHeartbeatInterval",void 0),I(this,"_playheadShouldBeProgressing",void 0),I(this,"pm",void 0),this.pm=e,this._playbackHeartbeatInterval=null,this._playheadShouldBeProgressing=!1,e.on("playing",function(){i._playheadShouldBeProgressing=!0}),e.on("play",this._startPlaybackHeartbeatInterval.bind(this)),e.on("playing",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adbreakstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplay",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplaying",this._startPlaybackHeartbeatInterval.bind(this)),e.on("devicewake",this._startPlaybackHeartbeatInterval.bind(this)),e.on("viewstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("rebufferstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("pause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("ended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("viewend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("error",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("aderror",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adpause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adbreakend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("seeked",function(){e.data.player_is_paused?i._stopPlaybackHeartbeatInterval():i._startPlaybackHeartbeatInterval()}),e.on("timeupdate",function(){i._playbackHeartbeatInterval!==null&&e.emit("playbackheartbeat")}),e.on("devicesleep",function(a,r){i._playbackHeartbeatInterval!==null&&(Il.default.clearInterval(i._playbackHeartbeatInterval),e.emit("playbackheartbeatend",{viewer_time:r.viewer_time}),i._playbackHeartbeatInterval=null)})}return ct(t,[{key:"_startPlaybackHeartbeatInterval",value:function(){var e=this;this._playbackHeartbeatInterval===null&&(this.pm.emit("playbackheartbeat"),this._playbackHeartbeatInterval=Il.default.setInterval(function(){e.pm.emit("playbackheartbeat")},this.pm.playbackHeartbeatTime))}},{key:"_stopPlaybackHeartbeatInterval",value:function(){this._playheadShouldBeProgressing=!1,this._playbackHeartbeatInterval!==null&&(Il.default.clearInterval(this._playbackHeartbeatInterval),this.pm.emit("playbackheartbeatend"),this._playbackHeartbeatInterval=null)}}]),t})(),PE=NE,UE=function t(e){var i=this;ve(this,t),I(this,"viewErrored",void 0),e.on("viewinit",function(){i.viewErrored=!1}),e.on("error",function(a,r){try{var n=e.errorTranslator({player_error_code:r.player_error_code,player_error_message:r.player_error_message,player_error_context:r.player_error_context,player_error_severity:r.player_error_severity,player_error_business_exception:r.player_error_business_exception});n&&(e.data.player_error_code=n.player_error_code||r.player_error_code,e.data.player_error_message=n.player_error_message||r.player_error_message,e.data.player_error_context=n.player_error_context||r.player_error_context,e.data.player_error_severity=n.player_error_severity||r.player_error_severity,e.data.player_error_business_exception=n.player_error_business_exception||r.player_error_business_exception,i.viewErrored=!0)}catch(s){e.mux.log.warn("Exception in error translator callback.",s),i.viewErrored=!0}}),e.on("aftererror",function(){var a,r,n,s,o;(a=e.data)===null||a===void 0||delete a.player_error_code,(r=e.data)===null||r===void 0||delete r.player_error_message,(n=e.data)===null||n===void 0||delete n.player_error_context,(s=e.data)===null||s===void 0||delete s.player_error_severity,(o=e.data)===null||o===void 0||delete o.player_error_business_exception})},$E=UE,HE=(function(){function t(e){ve(this,t),I(this,"_watchTimeTrackerLastCheckedTime",void 0),I(this,"pm",void 0),this.pm=e,this._watchTimeTrackerLastCheckedTime=null,e.on("playbackheartbeat",this._updateWatchTime.bind(this)),e.on("playbackheartbeatend",this._clearWatchTimeState.bind(this))}return ct(t,[{key:"_updateWatchTime",value:function(e,i){var a=i.viewer_time;this._watchTimeTrackerLastCheckedTime===null&&(this._watchTimeTrackerLastCheckedTime=a),we(this.pm.data,"view_watch_time",a-this._watchTimeTrackerLastCheckedTime),this._watchTimeTrackerLastCheckedTime=a}},{key:"_clearWatchTimeState",value:function(e,i){this._updateWatchTime(e,i),this._watchTimeTrackerLastCheckedTime=null}}]),t})(),BE=HE,WE=(function(){function t(e){var i=this;ve(this,t),I(this,"_playbackTimeTrackerLastPlayheadPosition",void 0),I(this,"_lastTime",void 0),I(this,"_isAdPlaying",void 0),I(this,"_callbackUpdatePlaybackTime",void 0),I(this,"pm",void 0),this.pm=e,this._playbackTimeTrackerLastPlayheadPosition=-1,this._lastTime=De.now(),this._isAdPlaying=!1,this._callbackUpdatePlaybackTime=null,e.on("viewinit",function(){i.pm.data.view_playing_time_ms_cumulative=0});var a=this._startPlaybackTimeTracking.bind(this);e.on("playing",a),e.on("adplaying",a);var r=function(){i.pm.data.player_is_paused||a()};e.on("seeked",r),e.on("rebufferend",r);var n=this._stopPlaybackTimeTracking.bind(this);e.on("playbackheartbeatend",n),e.on("seeking",n),e.on("rebufferstart",n),e.on("adplaying",function(){i._isAdPlaying=!0}),e.on("adended",function(){i._isAdPlaying=!1}),e.on("adpause",function(){i._isAdPlaying=!1}),e.on("adbreakstart",function(){i._isAdPlaying=!1}),e.on("adbreakend",function(){i._isAdPlaying=!1}),e.on("adplay",function(){i._isAdPlaying=!1}),e.on("viewinit",function(){i._playbackTimeTrackerLastPlayheadPosition=-1,i._lastTime=De.now(),i._isAdPlaying=!1,i._callbackUpdatePlaybackTime=null})}return ct(t,[{key:"_startPlaybackTimeTracking",value:function(){this._callbackUpdatePlaybackTime===null&&(this._callbackUpdatePlaybackTime=this._updatePlaybackTime.bind(this),this._playbackTimeTrackerLastPlayheadPosition=this.pm.data.player_playhead_time,this._lastTime=De.now(),this.pm.on("playbackheartbeat",this._callbackUpdatePlaybackTime))}},{key:"_stopPlaybackTimeTracking",value:function(){this._callbackUpdatePlaybackTime&&(this._updatePlaybackTime(),this.pm.off("playbackheartbeat",this._callbackUpdatePlaybackTime),this._callbackUpdatePlaybackTime=null,this._playbackTimeTrackerLastPlayheadPosition=-1)}},{key:"_updatePlaybackTime",value:function(){var e=this.pm.data.player_playhead_time||0,i=De.now(),a=i-this._lastTime,r=-1;this._playbackTimeTrackerLastPlayheadPosition>=0&&e>this._playbackTimeTrackerLastPlayheadPosition?r=e-this._playbackTimeTrackerLastPlayheadPosition:this._isAdPlaying&&(r=a),r>0&&r<=1e3&&we(this.pm.data,"view_content_playback_time",r),this._callbackUpdatePlaybackTime!==null&&a>0&&a<=1e3&&(this._isAdPlaying&&we(this.pm.data,"ad_playing_time_ms_cumulative",a),we(this.pm.data,"view_playing_time_ms_cumulative",a)),this._playbackTimeTrackerLastPlayheadPosition=e,this._lastTime=i}}]),t})(),FE=WE,KE=(function(){function t(e){ve(this,t),I(this,"pm",void 0),this.pm=e;var i=this._updatePlayheadTime.bind(this);e.on("playbackheartbeat",i),e.on("playbackheartbeatend",i),e.on("timeupdate",i),e.on("destroy",function(){e.off("timeupdate",i)})}return ct(t,[{key:"_updateMaxPlayheadPosition",value:function(){this.pm.data.view_max_playhead_position=typeof this.pm.data.view_max_playhead_position>"u"?this.pm.data.player_playhead_time:Math.max(this.pm.data.view_max_playhead_position,this.pm.data.player_playhead_time)}},{key:"_updatePlayheadTime",value:function(e,i){var a=this,r=function(){a.pm.currentFragmentPDT&&a.pm.currentFragmentStart&&(a.pm.data.player_program_time=a.pm.currentFragmentPDT+a.pm.data.player_playhead_time-a.pm.currentFragmentStart)};if(i&&i.player_playhead_time)this.pm.data.player_playhead_time=i.player_playhead_time,r(),this._updateMaxPlayheadPosition();else if(this.pm.getPlayheadTime){var n=this.pm.getPlayheadTime();typeof n<"u"&&(this.pm.data.player_playhead_time=n,r(),this._updateMaxPlayheadPosition())}}}]),t})(),VE=KE,ih=300*1e3,qE=function t(e){if(ve(this,t),!e.disableRebufferTracking){var i,a=function(n,s){r(s),i=void 0},r=function(n){if(i){var s=n.viewer_time-i;we(e.data,"view_rebuffer_duration",s),i=n.viewer_time,e.data.view_rebuffer_duration>ih&&(e.emit("viewend"),e.send("viewend"),e.mux.log.warn("Ending view after rebuffering for longer than ".concat(ih,"ms, future events will be ignored unless a programchange or videochange occurs.")))}e.data.view_watch_time>=0&&e.data.view_rebuffer_count>0&&(e.data.view_rebuffer_frequency=e.data.view_rebuffer_count/e.data.view_watch_time,e.data.view_rebuffer_percentage=e.data.view_rebuffer_duration/e.data.view_watch_time)};e.on("playbackheartbeat",function(n,s){return r(s)}),e.on("rebufferstart",function(n,s){i||(we(e.data,"view_rebuffer_count",1),i=s.viewer_time,e.one("rebufferend",a))}),e.on("viewinit",function(){i=void 0,e.off("rebufferend",a)})}},YE=qE,GE=(function(){function t(e){var i=this;ve(this,t),I(this,"_lastCheckedTime",void 0),I(this,"_lastPlayheadTime",void 0),I(this,"_lastPlayheadTimeUpdatedTime",void 0),I(this,"_rebuffering",void 0),I(this,"pm",void 0),this.pm=e,!(e.disableRebufferTracking||e.disablePlayheadRebufferTracking)&&(this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null,e.on("playbackheartbeat",this._checkIfRebuffering.bind(this)),e.on("playbackheartbeatend",this._cleanupRebufferTracker.bind(this)),e.on("seeking",function(){i._cleanupRebufferTracker(null,{viewer_time:De.now()})}))}return ct(t,[{key:"_checkIfRebuffering",value:function(e,i){if(this.pm.seekingTracker.isSeeking||this.pm.adTracker.isAdBreak||!this.pm.playbackHeartbeat._playheadShouldBeProgressing){this._cleanupRebufferTracker(e,i);return}if(this._lastCheckedTime===null){this._prepareRebufferTrackerState(i.viewer_time);return}if(this._lastPlayheadTime!==this.pm.data.player_playhead_time){this._cleanupRebufferTracker(e,i,!0);return}var a=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.sustainedRebufferThreshold=="number"&&a>=this.pm.sustainedRebufferThreshold&&(this._rebuffering||(this._rebuffering=!0,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}))),this._lastCheckedTime=i.viewer_time}},{key:"_clearRebufferTrackerState",value:function(){this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null}},{key:"_prepareRebufferTrackerState",value:function(e){this._lastCheckedTime=e,this._lastPlayheadTime=this.pm.data.player_playhead_time,this._lastPlayheadTimeUpdatedTime=e}},{key:"_cleanupRebufferTracker",value:function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(this._rebuffering)this._rebuffering=!1,this.pm.emit("rebufferend",{viewer_time:i.viewer_time});else{if(this._lastCheckedTime===null)return;var r=this.pm.data.player_playhead_time-this._lastPlayheadTime,n=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.minimumRebufferDuration=="number"&&r>0&&n-r>this.pm.minimumRebufferDuration&&(this._lastCheckedTime=null,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}),this.pm.emit("rebufferend",{viewer_time:this._lastPlayheadTimeUpdatedTime+n-r}))}a?this._prepareRebufferTrackerState(i.viewer_time):this._clearRebufferTrackerState()}}]),t})(),zE=GE,QE=(function(){function t(e){var i=this;ve(this,t),I(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){var a=e.data,r=a.view_id;if(!a.view_program_changed){var n=function(s,o){var l=o.viewer_time;(s.type==="playing"&&typeof e.data.view_time_to_first_frame>"u"||s.type==="adplaying"&&(typeof e.data.view_time_to_first_frame>"u"||i._inPrerollPosition()))&&i.calculateTimeToFirstFrame(l||De.now(),r)};e.one("playing",n),e.one("adplaying",n),e.one("viewend",function(){e.off("playing",n),e.off("adplaying",n)})}})}return ct(t,[{key:"_inPrerollPosition",value:function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3}},{key:"calculateTimeToFirstFrame",value:function(e,i){i===this.pm.data.view_id&&(this.pm.watchTimeTracker._updateWatchTime(null,{viewer_time:e}),this.pm.data.view_time_to_first_frame=this.pm.data.view_watch_time,(this.pm.data.player_autoplay_on||this.pm.data.video_is_autoplay)&&this.pm.pageLoadInitTime&&(this.pm.data.view_aggregate_startup_time=this.pm.data.view_start+this.pm.data.view_watch_time-this.pm.pageLoadInitTime))}}]),t})(),jE=QE,ZE=function t(e){var i=this;ve(this,t),I(this,"_lastPlayerHeight",void 0),I(this,"_lastPlayerWidth",void 0),I(this,"_lastPlayheadPosition",void 0),I(this,"_lastSourceHeight",void 0),I(this,"_lastSourceWidth",void 0),e.on("viewinit",function(){i._lastPlayheadPosition=-1});var a=["pause","rebufferstart","seeking","error","adbreakstart","hb","renditionchange","orientationchange","viewend","playbackmodechange"],r=["playing","hb","renditionchange","orientationchange","playbackmodechange"];a.forEach(function(n){e.on(n,function(){if(i._lastPlayheadPosition>=0&&e.data.player_playhead_time>=0&&i._lastPlayerWidth>=0&&i._lastSourceWidth>0&&i._lastPlayerHeight>=0&&i._lastSourceHeight>0){var s=e.data.player_playhead_time-i._lastPlayheadPosition;if(s<0){i._lastPlayheadPosition=-1;return}var o=Math.min(i._lastPlayerWidth/i._lastSourceWidth,i._lastPlayerHeight/i._lastSourceHeight),l=Math.max(0,o-1),d=Math.max(0,1-o);e.data.view_max_upscale_percentage=Math.max(e.data.view_max_upscale_percentage||0,l),e.data.view_max_downscale_percentage=Math.max(e.data.view_max_downscale_percentage||0,d),we(e.data,"view_total_content_playback_time",s),we(e.data,"view_total_upscaling",l*s),we(e.data,"view_total_downscaling",d*s)}i._lastPlayheadPosition=-1})}),r.forEach(function(n){e.on(n,function(){i._lastPlayheadPosition=e.data.player_playhead_time,i._lastPlayerWidth=e.data.player_width,i._lastPlayerHeight=e.data.player_height,i._lastSourceWidth=e.data.video_source_width,i._lastSourceHeight=e.data.video_source_height})})},XE=ZE,JE=2e3,e_=function t(e){var i=this;ve(this,t),I(this,"isSeeking",void 0),this.isSeeking=!1;var a=-1,r=function(){var n=De.now(),s=(e.data.viewer_time||n)-(a||n);we(e.data,"view_seek_duration",s),e.data.view_max_seek_time=Math.max(e.data.view_max_seek_time||0,s),i.isSeeking=!1,a=-1};e.on("seeking",function(n,s){if(Object.assign(e.data,s),i.isSeeking&&s.viewer_time-a<=JE){a=s.viewer_time;return}i.isSeeking&&r(),i.isSeeking=!0,a=s.viewer_time,we(e.data,"view_seek_count",1),e.send("seeking")}),e.on("seeked",function(){r()}),e.on("viewend",function(){i.isSeeking&&(r(),e.send("seeked")),i.isSeeking=!1,a=-1})},t_=e_,ah=function(t,e){t.push(e),t.sort(function(i,a){return i.viewer_time-a.viewer_time})},i_=["adbreakstart","adrequest","adresponse","adplay","adplaying","adpause","adended","adbreakend","aderror","adclicked","adskipped"],a_=(function(){function t(e){var i=this;ve(this,t),I(this,"_adHasPlayed",void 0),I(this,"_adRequests",void 0),I(this,"_adResponses",void 0),I(this,"_currentAdRequestNumber",void 0),I(this,"_currentAdResponseNumber",void 0),I(this,"_prerollPlayTime",void 0),I(this,"_wouldBeNewAdPlay",void 0),I(this,"isAdBreak",void 0),I(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){i.isAdBreak=!1,i._currentAdRequestNumber=0,i._currentAdResponseNumber=0,i._adRequests=[],i._adResponses=[],i._adHasPlayed=!1,i._wouldBeNewAdPlay=!0,i._prerollPlayTime=void 0}),i_.forEach(function(r){return e.on(r,i._updateAdData.bind(i))});var a=function(){i.isAdBreak=!1};e.on("adbreakstart",function(){i.isAdBreak=!0}),e.on("play",a),e.on("playing",a),e.on("viewend",a),e.on("adrequest",function(r,n){n=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdRequestNumber++},n),ah(i._adRequests,n),we(e.data,"view_ad_request_count"),i.inPrerollPosition()&&(e.data.view_preroll_requested=!0,i._adHasPlayed||we(e.data,"view_preroll_request_count"))}),e.on("adresponse",function(r,n){n=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdResponseNumber++},n),ah(i._adResponses,n);var s=i.findAdRequest(n.ad_request_id);s&&we(e.data,"view_ad_request_time",Math.max(0,n.viewer_time-s.viewer_time))}),e.on("adplay",function(r,n){i._adHasPlayed=!0,i._wouldBeNewAdPlay&&(i._wouldBeNewAdPlay=!1,we(e.data,"view_ad_played_count")),i.inPrerollPosition()&&!e.data.view_preroll_played&&(e.data.view_preroll_played=!0,i._adRequests.length>0&&(e.data.view_preroll_request_time=Math.max(0,n.viewer_time-i._adRequests[0].viewer_time)),e.data.view_start&&(e.data.view_startup_preroll_request_time=Math.max(0,n.viewer_time-e.data.view_start)),i._prerollPlayTime=n.viewer_time)}),e.on("adplaying",function(r,n){i.inPrerollPosition()&&typeof e.data.view_preroll_load_time>"u"&&typeof i._prerollPlayTime<"u"&&(e.data.view_preroll_load_time=n.viewer_time-i._prerollPlayTime,e.data.view_startup_preroll_load_time=n.viewer_time-i._prerollPlayTime)}),e.on("adclicked",function(r,n){i._wouldBeNewAdPlay||we(e.data,"view_ad_clicked_count")}),e.on("adskipped",function(r,n){i._wouldBeNewAdPlay||we(e.data,"view_ad_skipped_count")}),e.on("adended",function(){i._wouldBeNewAdPlay=!0}),e.on("aderror",function(){i._wouldBeNewAdPlay=!0})}return ct(t,[{key:"inPrerollPosition",value:function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3}},{key:"findAdRequest",value:function(e){for(var i=0;i<this._adRequests.length;i++)if(this._adRequests[i].ad_request_id===e)return this._adRequests[i]}},{key:"_updateAdData",value:function(e,i){if(this.inPrerollPosition()){if(!this.pm.data.view_preroll_ad_tag_hostname&&i.ad_tag_url){var a=Ei(In(i.ad_tag_url),2),r=a[0],n=a[1];this.pm.data.view_preroll_ad_tag_domain=n,this.pm.data.view_preroll_ad_tag_hostname=r}if(!this.pm.data.view_preroll_ad_asset_hostname&&i.ad_asset_url){var s=Ei(In(i.ad_asset_url),2),o=s[0],l=s[1];this.pm.data.view_preroll_ad_asset_domain=l,this.pm.data.view_preroll_ad_asset_hostname=o}this.pm.data.ad_type="preroll"}this.pm.data.ad_asset_url=i?.ad_asset_url,this.pm.data.ad_tag_url=i?.ad_tag_url,this.pm.data.ad_creative_id=i?.ad_creative_id,this.pm.data.ad_id=i?.ad_id,this.pm.data.ad_universal_id=i?.ad_universal_id,i!=null&&i.ad_type&&(this.pm.data.ad_type=i?.ad_type)}}]),t})(),r_=a_,n_=function t(e){var i=this;ve(this,t),I(this,"lastWallClockTime",void 0);var a=function(){i.lastWallClockTime=De.now(),e.on("before*",r)},r=function(n){var s=De.now(),o=i.lastWallClockTime;i.lastWallClockTime=s,s-o>3e4&&(e.emit("devicesleep",{viewer_time:o}),Object.assign(e.data,{viewer_time:o}),e.send("devicesleep"),e.emit("devicewake",{viewer_time:s}),Object.assign(e.data,{viewer_time:s}),e.send("devicewake"))};e.one("playbackheartbeat",a),e.on("playbackheartbeatend",function(){e.off("before*",r),e.one("playbackheartbeat",a)})},s_=n_,Rl=ut(Jt()),zm=(function(t){return t()})(function(){var t=function(){for(var i=0,a={};i<arguments.length;i++){var r=arguments[i];for(var n in r)a[n]=r[n]}return a};function e(i){function a(r,n,s){var o;if(typeof document<"u"){if(arguments.length>1){if(s=t({path:"/"},a.defaults,s),typeof s.expires=="number"){var l=new Date;l.setMilliseconds(l.getMilliseconds()+s.expires*864e5),s.expires=l}try{o=JSON.stringify(n),/^[\{\[]/.test(o)&&(n=o)}catch{}return i.write?n=i.write(n,r):n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),r=r.replace(/[\(\)]/g,escape),document.cookie=[r,"=",n,s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}r||(o={});for(var d=document.cookie?document.cookie.split("; "):[],m=/(%[0-9A-Z]{2})+/g,p=0;p<d.length;p++){var h=d[p].split("="),u=h.slice(1).join("=");u.charAt(0)==='"'&&(u=u.slice(1,-1));try{var v=h[0].replace(m,decodeURIComponent);if(u=i.read?i.read(u,v):i(u,v)||u.replace(m,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch{}if(r===v){o=u;break}r||(o[v]=u)}catch{}}return o}}return a.set=a,a.get=function(r){return a.call(a,r)},a.getJSON=function(){return a.apply({json:!0},[].slice.call(arguments))},a.defaults={},a.remove=function(r,n){a(r,"",t(n,{expires:-1}))},a.withConverter=e,a}return e(function(){})}),Qm="muxData",o_=function(t){return Object.entries(t).map(function(e){var i=Ei(e,2),a=i[0],r=i[1];return"".concat(a,"=").concat(r)}).join("&")},l_=function(t){return t.split("&").reduce(function(e,i){var a=Ei(i.split("="),2),r=a[0],n=a[1],s=+n,o=n&&s==n?s:n;return e[r]=o,e},{})},jm=function(){var t;try{t=l_(zm.get(Qm)||"")}catch{t={}}return t},Zm=function(t){try{zm.set(Qm,o_(t),{expires:365})}catch{}},d_=function(){var t=jm();return t.mux_viewer_id=t.mux_viewer_id||wn(),t.msn=t.msn||Math.random(),Zm(t),{mux_viewer_id:t.mux_viewer_id,mux_sample_number:t.msn}},u_=function(){var t=jm(),e=De.now();return t.session_start&&(t.sst=t.session_start,delete t.session_start),t.session_id&&(t.sid=t.session_id,delete t.session_id),t.session_expires&&(t.sex=t.session_expires,delete t.session_expires),(!t.sex||t.sex<e)&&(t.sid=wn(),t.sst=e),t.sex=e+1500*1e3,Zm(t),{session_id:t.sid,session_start:t.sst,session_expires:t.sex}};function c_(t,e){var i=e.beaconCollectionDomain,a=e.beaconDomain;if(i){var r=/localhost(?::\d+)?$/.test(i)?"http://":"https://";return r+i}t=t||"inferred";var n=a||"litix.io";return t.match(/^[a-z0-9]+$/)?"https://"+t+"."+n:"https://img.litix.io/a.gif"}var h_={a:"env",b:"beacon",c:"custom",d:"ad",e:"event",f:"experiment",i:"internal",m:"mux",n:"response",p:"player",q:"request",r:"retry",s:"session",t:"timestamp",u:"viewer",v:"video",w:"page",x:"view",y:"sub"},m_=Xm(h_),p_={ad:"ad",af:"affiliate",ag:"aggregate",ap:"api",al:"application",ao:"audio",ar:"architecture",as:"asset",au:"autoplay",av:"average",bi:"bitrate",bn:"brand",br:"break",bw:"browser",by:"bytes",bz:"business",ca:"cached",cb:"cancel",cc:"codec",cd:"code",cg:"category",ch:"changed",ci:"client",ck:"clicked",cl:"canceled",cm:"cmcd",cn:"config",co:"count",ce:"counter",cp:"complete",cq:"creator",cr:"creative",cs:"captions",ct:"content",cu:"current",cv:"cumulative",cx:"connection",cz:"context",da:"data",dg:"downscaling",dm:"domain",dn:"cdn",do:"downscale",dr:"drm",dp:"dropped",du:"duration",dv:"device",dy:"dynamic",eb:"enabled",ec:"encoding",ed:"edge",en:"end",eg:"engine",em:"embed",er:"error",ep:"experiments",es:"errorcode",et:"errortext",ee:"event",ev:"events",ex:"expires",ez:"exception",fa:"failed",fi:"first",fm:"family",ft:"format",fp:"fps",fq:"frequency",fr:"frame",fs:"fullscreen",ha:"has",hb:"holdback",he:"headers",ho:"host",hn:"hostname",ht:"height",id:"id",ii:"init",in:"instance",ip:"ip",is:"is",ke:"key",la:"language",lb:"labeled",le:"level",li:"live",ld:"loaded",lo:"load",lw:"low",ls:"lists",lt:"latency",ma:"max",md:"media",me:"message",mf:"manifest",mi:"mime",ml:"midroll",mm:"min",mn:"manufacturer",mo:"model",mp:"mode",ms:"ms",mx:"mux",ne:"newest",nm:"name",no:"number",on:"on",or:"origin",os:"os",pa:"paused",pb:"playback",pd:"producer",pe:"percentage",pf:"played",pg:"program",ph:"playhead",pi:"plugin",pl:"preroll",pn:"playing",po:"poster",pp:"pip",pr:"preload",ps:"position",pt:"part",pv:"previous",py:"property",px:"pop",pz:"plan",ra:"rate",rd:"requested",re:"rebuffer",rf:"rendition",rg:"range",rm:"remote",ro:"ratio",rp:"response",rq:"request",rs:"requests",sa:"sample",sd:"skipped",se:"session",sh:"shift",sk:"seek",sm:"stream",so:"source",sq:"sequence",sr:"series",ss:"status",st:"start",su:"startup",sv:"server",sw:"software",sy:"severity",ta:"tag",tc:"tech",te:"text",tg:"target",th:"throughput",ti:"time",tl:"total",to:"to",tt:"title",ty:"type",ug:"upscaling",un:"universal",up:"upscale",ur:"url",us:"user",va:"variant",vd:"viewed",vi:"video",ve:"version",vw:"view",vr:"viewer",wd:"width",wa:"watch",wt:"waiting"},rh=Xm(p_);function Xm(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[t[i]]=i);return e}function jl(t){var e={},i={};return Object.keys(t).forEach(function(a){var r=!1;if(t.hasOwnProperty(a)&&t[a]!==void 0){var n=a.split("_"),s=n[0],o=m_[s];o||(te.info("Data key word `"+n[0]+"` not expected in "+a),o=s+"_"),n.splice(1).forEach(function(l){l==="url"&&(r=!0),rh[l]?o+=rh[l]:Number.isInteger(Number(l))?o+=l:(te.info("Data key word `"+l+"` not expected in "+a),o+="_"+l+"_")}),r?i[o]=t[a]:e[o]=t[a]}}),Object.assign(e,i)}var sa=ut(Jt()),v_=ut(Km()),f_={maxBeaconSize:300,maxQueueLength:3600,baseTimeBetweenBeacons:1e4,maxPayloadKBSize:500},E_=56*1024,__=["hb","requestcompleted","requestfailed","requestcanceled"],b_="https://img.litix.io",_i=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this._beaconUrl=t||b_,this._eventQueue=[],this._postInFlight=!1,this._resendAfterPost=!1,this._failureCount=0,this._sendTimeout=!1,this._options=Object.assign({},f_,e)};_i.prototype.queueEvent=function(t,e){var i=Object.assign({},e);return this._eventQueue.length<=this._options.maxQueueLength||t==="eventrateexceeded"?(this._eventQueue.push(i),this._sendTimeout||this._startBeaconSending(),this._eventQueue.length<=this._options.maxQueueLength):!1};_i.prototype.flushEvents=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(t&&this._eventQueue.length===1){this._eventQueue.pop();return}this._eventQueue.length&&this._sendBeaconQueue(),this._startBeaconSending()};_i.prototype.destroy=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;this.destroyed=!0,t?this._clearBeaconQueue():this.flushEvents(),sa.default.clearTimeout(this._sendTimeout)};_i.prototype._clearBeaconQueue=function(){var t=this._eventQueue.length>this._options.maxBeaconSize?this._eventQueue.length-this._options.maxBeaconSize:0,e=this._eventQueue.slice(t);t>0&&Object.assign(e[e.length-1],jl({mux_view_message:"event queue truncated"}));var i=this._createPayload(e);Jm(this._beaconUrl,i,!0,function(){})};_i.prototype._sendBeaconQueue=function(){var t=this;if(this._postInFlight){this._resendAfterPost=!0;return}var e=this._eventQueue.slice(0,this._options.maxBeaconSize);this._eventQueue=this._eventQueue.slice(this._options.maxBeaconSize),this._postInFlight=!0;var i=this._createPayload(e),a=De.now();Jm(this._beaconUrl,i,!1,function(r,n){n?(t._eventQueue=e.concat(t._eventQueue),t._failureCount+=1,te.info("Error sending beacon: "+n)):t._failureCount=0,t._roundTripTime=De.now()-a,t._postInFlight=!1,t._resendAfterPost&&(t._resendAfterPost=!1,t._eventQueue.length>0&&t._sendBeaconQueue())})};_i.prototype._getNextBeaconTime=function(){if(!this._failureCount)return this._options.baseTimeBetweenBeacons;var t=Math.pow(2,this._failureCount-1);return t=t*Math.random(),(1+t)*this._options.baseTimeBetweenBeacons};_i.prototype._startBeaconSending=function(){var t=this;sa.default.clearTimeout(this._sendTimeout),!this.destroyed&&(this._sendTimeout=sa.default.setTimeout(function(){t._eventQueue.length&&t._sendBeaconQueue(),t._startBeaconSending()},this._getNextBeaconTime()))};_i.prototype._createPayload=function(t){var e=this,i={transmission_timestamp:Math.round(De.now())};this._roundTripTime&&(i.rtt_ms=Math.round(this._roundTripTime));var a,r,n,s=function(){a=JSON.stringify({metadata:i,events:r||t}),n=a.length/1024},o=function(){return n<=e._options.maxPayloadKBSize};return s(),o()||(te.info("Payload size is too big ("+n+" kb). Removing unnecessary events."),r=t.filter(function(l){return __.indexOf(l.e)===-1}),s()),o()||(te.info("Payload size still too big ("+n+" kb). Cropping fields.."),r.forEach(function(l){for(var d in l){var m=l[d],p=50*1024;typeof m=="string"&&m.length>p&&(l[d]=m.substring(0,p))}}),s()),a};var g_=typeof v_.default.exitPictureInPicture=="function"?function(t){return t.length<=E_}:function(t){return!1},Jm=function(t,e,i,a){if(i&&navigator&&navigator.sendBeacon&&navigator.sendBeacon(t,e)){a();return}if(sa.default.fetch){sa.default.fetch(t,{method:"POST",body:e,headers:{"Content-Type":"text/plain"},keepalive:g_(e)}).then(function(n){return a(null,n.ok?null:"Error")}).catch(function(n){return a(null,n)});return}if(sa.default.XMLHttpRequest){var r=new sa.default.XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState===4)return a(null,r.status!==200?"error":void 0)},r.open("POST",t),r.setRequestHeader("Content-Type","text/plain"),r.send(e);return}a()},y_=_i,T_=["env_key","view_id","view_sequence_number","player_sequence_number","beacon_domain","player_playhead_time","viewer_time","mux_api_version","event","video_id","player_instance_id","player_error_code","player_error_message","player_error_context","player_error_severity","player_error_business_exception","view_playing_time_ms_cumulative","ad_playing_time_ms_cumulative"],A_=["adplay","adplaying","adpause","adfirstquartile","admidpoint","adthirdquartile","adended","adresponse","adrequest"],k_=["ad_id","ad_creative_id","ad_universal_id"],S_=["viewstart","error","ended","viewend"],w_=600*1e3,I_=(function(){function t(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};ve(this,t);var r,n,s,o,l,d,m,p,h,u,v,E;I(this,"mux",void 0),I(this,"envKey",void 0),I(this,"options",void 0),I(this,"eventQueue",void 0),I(this,"sampleRate",void 0),I(this,"disableCookies",void 0),I(this,"respectDoNotTrack",void 0),I(this,"previousBeaconData",void 0),I(this,"lastEventTime",void 0),I(this,"rateLimited",void 0),I(this,"pageLevelData",void 0),I(this,"viewerData",void 0),this.mux=e,this.envKey=i,this.options=a,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.eventQueue=new y_(c_(this.envKey,this.options));var y;this.sampleRate=(y=this.options.sampleRate)!==null&&y!==void 0?y:1;var g;this.disableCookies=(g=this.options.disableCookies)!==null&&g!==void 0?g:!1;var T;this.respectDoNotTrack=(T=this.options.respectDoNotTrack)!==null&&T!==void 0?T:!1,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.pageLevelData={mux_api_version:this.mux.API_VERSION,mux_embed:this.mux.NAME,mux_embed_version:this.mux.VERSION,viewer_application_name:(r=this.options.platform)===null||r===void 0?void 0:r.name,viewer_application_version:(n=this.options.platform)===null||n===void 0?void 0:n.version,viewer_application_engine:(s=this.options.platform)===null||s===void 0?void 0:s.layout,viewer_device_name:(o=this.options.platform)===null||o===void 0?void 0:o.product,viewer_device_category:"",viewer_device_manufacturer:(l=this.options.platform)===null||l===void 0?void 0:l.manufacturer,viewer_os_family:(m=this.options.platform)===null||m===void 0||(d=m.os)===null||d===void 0?void 0:d.family,viewer_os_architecture:(h=this.options.platform)===null||h===void 0||(p=h.os)===null||p===void 0?void 0:p.architecture,viewer_os_version:(v=this.options.platform)===null||v===void 0||(u=v.os)===null||u===void 0?void 0:u.version,page_url:Rl.default===null||Rl.default===void 0||(E=Rl.default.location)===null||E===void 0?void 0:E.href},this.viewerData=this.disableCookies?{}:d_()}return ct(t,[{key:"send",value:function(e,i){if(!(!e||!(i!=null&&i.view_id))){if(this.respectDoNotTrack&&zl())return te.info("Not sending `"+e+"` because Do Not Track is enabled");if(!i||typeof i!="object")return te.error("A data object was expected in send() but was not provided");var a=this.disableCookies?{}:u_(),r=hu(Rn({},this.pageLevelData,i,a,this.viewerData),{event:e,env_key:this.envKey});r.user_id&&(r.viewer_user_id=r.user_id,delete r.user_id);var n,s=((n=r.mux_sample_number)!==null&&n!==void 0?n:0)>=this.sampleRate,o=this._deduplicateBeaconData(e,r),l=jl(o);if(this.lastEventTime=this.mux.utils.now(),s)return te.info("Not sending event due to sample rate restriction",e,r,l);if(this.envKey||te.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",e,r,l),!this.rateLimited)if(te.info("Sending event",e,r,l),this.rateLimited=!this.eventQueue.queueEvent(e,l),this.mux.WINDOW_UNLOADING&&e==="viewend")this.eventQueue.destroy(!0);else{if(this.mux.WINDOW_HIDDEN&&e==="hb")this.eventQueue.flushEvents(!0);else if(S_.indexOf(e)>=0){if(e==="error"&&i.player_error_severity==="warning")return;this.eventQueue.flushEvents()}if(this.rateLimited)return r.event="eventrateexceeded",l=jl(r),this.eventQueue.queueEvent(r.event,l),te.error("Beaconing disabled due to rate limit.")}}}},{key:"destroy",value:function(){this.eventQueue.destroy(!1)}},{key:"_deduplicateBeaconData",value:function(e,i){var a=this,r={},n=i.view_id;if(n==="-1"||e==="viewstart"||e==="viewend"||!this.previousBeaconData||this.mux.utils.now()-this.lastEventTime>=w_)r=Rn({},i),n&&(this.previousBeaconData=r),n&&e==="viewend"&&(this.previousBeaconData=null);else{var s=e.indexOf("request")===0;Object.entries(i).forEach(function(o){var l=Ei(o,2),d=l[0],m=l[1];a.previousBeaconData&&(m!==a.previousBeaconData[d]||T_.indexOf(d)>-1||a.objectHasChanged(s,d,m,a.previousBeaconData[d])||a.eventRequiresKey(e,d))&&(r[d]=m,a.previousBeaconData[d]=m)})}return r}},{key:"objectHasChanged",value:function(e,i,a,r){return!e||i.indexOf("request_")!==0?!1:i==="request_response_headers"||typeof a!="object"||typeof r!="object"?!0:Object.keys(a||{}).length!==Object.keys(r||{}).length}},{key:"eventRequiresKey",value:function(e,i){return!!(e==="renditionchange"&&i.indexOf("video_source_")===0||k_.includes(i)&&A_.includes(e)||e==="playbackmodechange"&&i.indexOf("player_playback_mode")===0)}}]),t})(),R_=function t(e){ve(this,t);var i=0,a=0,r=0,n=0,s=0,o=0,l=0,d=function(h,u){var v=u.request_start,E=u.request_response_start,y=u.request_response_end,g=u.request_bytes_loaded;n++;var T,_;if(E?(T=E-(v??0),_=(y??0)-E):_=(y??0)-(v??0),_>0&&g&&g>0){var k=g/_*8e3;s++,a+=g,r+=_,e.data.view_min_request_throughput=Math.min(e.data.view_min_request_throughput||1/0,k),e.data.view_average_request_throughput=a/r*8e3,e.data.view_request_count=n,T>0&&(i+=T,e.data.view_max_request_latency=Math.max(e.data.view_max_request_latency||0,T),e.data.view_average_request_latency=i/s)}},m=function(h,u){n++,o++,e.data.view_request_count=n,e.data.view_request_failed_count=o},p=function(h,u){n++,l++,e.data.view_request_count=n,e.data.view_request_canceled_count=l};e.on("requestcompleted",d),e.on("requestfailed",m),e.on("requestcanceled",p)},L_=R_,C_=3600*1e3,D_=function t(e){var i=this;ve(this,t),I(this,"_lastEventTime",void 0),e.on("before*",function(a,r){var n=r.viewer_time,s=De.now(),o=i._lastEventTime;if(i._lastEventTime=s,o&&s-o>C_){var l=Object.keys(e.data).reduce(function(m,p){return p.indexOf("video_")===0?Object.assign(m,I({},p,e.data[p])):m},{});e.mux.log.info("Received event after at least an hour inactivity, creating a new view");var d=e.playbackHeartbeat._playheadShouldBeProgressing;e._resetView(Object.assign({viewer_time:n},l)),e.playbackHeartbeat._playheadShouldBeProgressing=d,e.playbackHeartbeat._playheadShouldBeProgressing&&a.type!=="play"&&a.type!=="adbreakstart"&&(e.emit("play",{viewer_time:n}),a.type!=="playing"&&e.emit("playing",{viewer_time:n}))}})},M_=D_,x_=function t(e){ve(this,t);var i=function(o){var l=O_(o),d=N_(o);if(l!=null&&!nh(l,n)&&s<=d){n=l,s=d;var m={video_cdn:l};e.emit("cdnchange",m)}},a=null,r=null,n=null,s=0;e.on("viewinit",function(){a=null,r=null,n=null,s=0}),e.on("beforecdnchange",function(o,l){var d=l?.video_cdn;d&&(typeof l.video_previous_cdn>"u"||l.video_previous_cdn===null)&&(nh(d,r)?l.video_previous_cdn=a??void 0:(l.video_previous_cdn=r??void 0,a=r,r=d))}),e.on("requestcompleted",function(o,l){i(l)})};function nh(t,e){return t?.toLowerCase()===e?.toLowerCase()}function O_(t){var e;return t!=null&&t.request_type&&(t.request_type==="media"||t.request_type==="video")&&!((e=t.request_response_headers)===null||e===void 0)&&e["x-cdn"]?t.request_response_headers["x-cdn"]:t!=null&&t.video_cdn?t.video_cdn:null}function N_(t){return t!=null&&t.request_start?t.request_start:t!=null&&t.viewer_time?t.viewer_time:Date.now()}var P_=x_,U_=function(t){try{return JSON.parse(t),!0}catch{return!1}},$_=function t(e){var i=this;ve(this,t),I(this,"_emittingAutomaticEvent",!1),I(this,"_hasInitialized",!1),I(this,"_currentMode","standard"),e.on("viewstart",function(){i._hasInitialized||(i._hasInitialized=!0,i._currentMode=e.data.player_playback_mode||"standard",i._emittingAutomaticEvent=!0,e.emit("playbackmodechange",{player_playback_mode:i._currentMode,player_playback_mode_data:"{}"}),i._emittingAutomaticEvent=!1)}),e.on("viewend",function(){i._hasInitialized=!1}),e.on("playbackmodechange",function(a,r){i._emittingAutomaticEvent||(r.player_playback_mode_data?U_(r.player_playback_mode_data)||(e.mux.log.warn("Invalid JSON string for player_playback_mode_data"),r.player_playback_mode_data="{}"):r.player_playback_mode_data="{}",e.data.player_playback_mode_data=r.player_playback_mode_data,e.data.player_playback_mode=r.player_playback_mode,i._currentMode=r.player_playback_mode)})},H_=$_,B_=(function(){function t(e){ve(this,t),I(this,"pm",void 0),I(this,"_currentRangeStart",void 0),I(this,"_lastPlayheadTime",void 0),this.pm=e,this._currentRangeStart=null,this._lastPlayheadTime=null,e.on("playbackheartbeat",this._updatePlaybackRange.bind(this)),e.on("playbackheartbeatend",this._endPlaybackRange.bind(this))}return ct(t,[{key:"_updateLastRangeEnd",value:function(){var e=this.pm.data.video_playback_ranges;if(e&&e.length>0){var i=this.pm.data.player_playhead_time||0;e[e.length-1][1]=i}}},{key:"_updatePlaybackRange",value:function(){var e,i=this.pm.data.player_playhead_time||0;if(!(!this.pm.disableAdPlaybackRangeFiltering&&!((e=this.pm.adTracker)===null||e===void 0)&&e.isAdBreak&&this._lastPlayheadTime!==null&&i<this._lastPlayheadTime)){if(this._lastPlayheadTime!==null&&this._currentRangeStart!==null){var a=Math.abs(i-this._lastPlayheadTime);if(a>1e3){var r=this.pm.data.video_playback_ranges;r&&r.length>0&&(r[r.length-1][1]=this._lastPlayheadTime),this._currentRangeStart=null}}if(this._currentRangeStart===null){var n=this.pm.data.video_playback_ranges||[];n.length>0&&n[n.length-1][1]===i?this._currentRangeStart=n[n.length-1][0]:(this._currentRangeStart=i,n.push([i,i])),this.pm.data.video_playback_ranges=n}else this._updateLastRangeEnd();this._lastPlayheadTime=i}}},{key:"_endPlaybackRange",value:function(){this._currentRangeStart!==null&&(this._updateLastRangeEnd(),this._currentRangeStart=null,this._lastPlayheadTime=null)}}]),t})(),W_=B_,Ft=Object.freeze({CELLULAR:"cellular",WIFI:"wifi",WIRED:"wired",OTHER:"other",NO_CONNECTION:"no_connection",UNKNOWN:"unknown"}),F_=function(t){if(!t)return Ft.UNKNOWN;switch(t){case"cellular":case"wimax":return Ft.CELLULAR;case"wifi":return Ft.WIFI;case"ethernet":return Ft.WIRED;case"none":return Ft.NO_CONNECTION;case"bluetooth":case"other":return Ft.OTHER;case"unknown":return Ft.UNKNOWN;default:return Ft.OTHER}},K_=function(t){return typeof t=="object"&&"connection"in t&&typeof t.connection=="object"},qi=ut(Jt()),V_=(function(){function t(e){var i=this;ve(this,t),I(this,"pm",void 0),I(this,"lastType",void 0),I(this,"lastLowDataMode",void 0),this.pm=e,this.pm.one("viewinit",function(){var a,r=i.emit.bind(i);r(),qi.default.addEventListener("online",r),qi.default.addEventListener("offline",r),(a=t.connection)===null||a===void 0||a.addEventListener("change",r),i.pm.on("destroy",function(){var n;(n=t.connection)===null||n===void 0||n.removeEventListener("change",r),qi.default.removeEventListener("online",r),qi.default.removeEventListener("offline",r)})})}return ct(t,[{key:"type",get:function(){var e,i;return((e=qi.default.navigator)===null||e===void 0?void 0:e.onLine)===!1?Ft.NO_CONNECTION:!((i=t.connection)===null||i===void 0)&&i.type?F_(t.connection.type):Ft.UNKNOWN}},{key:"lowDataMode",get:function(){var e;return(e=t.connection)===null||e===void 0?void 0:e.saveData}},{key:"emit",value:function(){var e=this.type,i=this.lowDataMode;e===this.lastType&&i===this.lastLowDataMode||(this.lastType=e,this.lastLowDataMode=i,this.pm.emit("networkchange",Rn({viewer_connection_type:e},i!==void 0&&{viewer_connection_low_data_mode:i})))}}],[{key:"connection",get:function(){return K_(qi.default.navigator)?qi.default.navigator.connection:null}}]),t})(),q_=V_,Y_=["viewstart","ended","loadstart","pause","play","playing","ratechange","waiting","adplay","adpause","adended","aderror","adplaying","adrequest","adresponse","adbreakstart","adbreakend","adfirstquartile","admidpoint","adthirdquartile","rebufferstart","rebufferend","seeked","error","hb","requestcompleted","requestfailed","requestcanceled","renditionchange","networkchange","cdnchange","playbackmodechange"],G_=new Set(["requestcompleted","requestfailed","requestcanceled"]),z_=(function(t){vE(i,t);var e=gE(i);function i(a,r,n){ve(this,i);var s;s=e.call(this),I(U(s),"pageLoadEndTime",void 0),I(U(s),"pageLoadInitTime",void 0),I(U(s),"_destroyed",void 0),I(U(s),"_heartBeatTimeout",void 0),I(U(s),"adTracker",void 0),I(U(s),"dashjs",void 0),I(U(s),"data",void 0),I(U(s),"disablePlayheadRebufferTracking",void 0),I(U(s),"disableRebufferTracking",void 0),I(U(s),"disableAdPlaybackRangeFiltering",void 0),I(U(s),"errorTracker",void 0),I(U(s),"errorTranslator",void 0),I(U(s),"emitTranslator",void 0),I(U(s),"getAdData",void 0),I(U(s),"getPlayheadTime",void 0),I(U(s),"getStateData",void 0),I(U(s),"stateDataTranslator",void 0),I(U(s),"hlsjs",void 0),I(U(s),"id",void 0),I(U(s),"longResumeTracker",void 0),I(U(s),"minimumRebufferDuration",void 0),I(U(s),"mux",void 0),I(U(s),"playbackEventDispatcher",void 0),I(U(s),"playbackHeartbeat",void 0),I(U(s),"playbackHeartbeatTime",void 0),I(U(s),"playheadTime",void 0),I(U(s),"seekingTracker",void 0),I(U(s),"sustainedRebufferThreshold",void 0),I(U(s),"watchTimeTracker",void 0),I(U(s),"currentFragmentPDT",void 0),I(U(s),"currentFragmentStart",void 0),s.pageLoadInitTime=To.navigationStart(),s.pageLoadEndTime=To.domContentLoadedEventEnd();var o={debug:!1,minimumRebufferDuration:250,sustainedRebufferThreshold:1e3,playbackHeartbeatTime:25,beaconDomain:"litix.io",sampleRate:1,disableCookies:!1,respectDoNotTrack:!1,disableRebufferTracking:!1,disablePlayheadRebufferTracking:!1,disableAdPlaybackRangeFiltering:!1,errorTranslator:function(h){return h},emitTranslator:function(){for(var h=arguments.length,u=new Array(h),v=0;v<h;v++)u[v]=arguments[v];return u},stateDataTranslator:function(h){return h}};s.mux=a,s.id=r,n!=null&&n.beaconDomain&&s.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."),n=Object.assign(o,n),n.data=n.data||{},n.data.property_key&&(n.data.env_key=n.data.property_key,delete n.data.property_key),te.level=n.debug?ra.DEBUG:ra.WARN,s.getPlayheadTime=n.getPlayheadTime,s.getStateData=n.getStateData||function(){return{}},s.getAdData=n.getAdData||function(){},s.minimumRebufferDuration=n.minimumRebufferDuration,s.sustainedRebufferThreshold=n.sustainedRebufferThreshold,s.playbackHeartbeatTime=n.playbackHeartbeatTime,s.disableRebufferTracking=n.disableRebufferTracking,s.disableRebufferTracking&&s.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."),s.disablePlayheadRebufferTracking=n.disablePlayheadRebufferTracking,s.disableAdPlaybackRangeFiltering=n.disableAdPlaybackRangeFiltering,s.errorTranslator=n.errorTranslator,s.emitTranslator=n.emitTranslator,s.stateDataTranslator=n.stateDataTranslator,s.playbackEventDispatcher=new I_(a,n.data.env_key,n),s.data={player_instance_id:wn(),mux_sample_rate:n.sampleRate,beacon_domain:n.beaconCollectionDomain||n.beaconDomain},s.data.view_sequence_number=1,s.data.player_sequence_number=1;var l=(function(){typeof this.data.view_start>"u"&&(this.data.view_start=this.mux.utils.now(),this.emit("viewstart"),this.emit("renditionchange"))}).bind(U(s));if(s.on("viewinit",function(h,u){this._resetVideoData(),this._resetViewData(),this._resetErrorData(),this._updateStateData(),Object.assign(this.data,u),this._initializeViewData(),this.one("play",l),this.one("adbreakstart",l)}),s.on("videochange",function(h,u){this._resetView(u)}),s.on("programchange",function(h,u){this.data.player_is_paused&&this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."),this._resetView(Object.assign(u,{view_program_changed:!0})),l(),this.emit("play"),this.emit("playing")}),s.on("fragmentchange",function(h,u){this.currentFragmentPDT=u.currentFragmentPDT,this.currentFragmentStart=u.currentFragmentStart}),s.on("destroy",s.destroy),typeof window<"u"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"){var d=function(){var h=typeof s.data.view_start<"u";s.mux.WINDOW_HIDDEN=document.visibilityState==="hidden",h&&s.mux.WINDOW_HIDDEN&&(s.data.player_is_paused||s.emit("hb"))};window.addEventListener("visibilitychange",d,!1);var m=function(h){h.persisted||s.destroy()};window.addEventListener("pagehide",m,!1),s.on("destroy",function(){window.removeEventListener("visibilitychange",d),window.removeEventListener("pagehide",m)})}s.on("playerready",function(h,u){Object.assign(this.data,u)}),Y_.forEach(function(h){s.on(h,function(u,v){h.indexOf("ad")!==0&&this._updateStateData(),Object.assign(this.data,v),this._sanitizeData()}),s.on("after"+h,function(){(h!=="error"||this.errorTracker.viewErrored)&&this.send(h)})}),s.on("viewend",function(h,u){Object.assign(s.data,u)});var p=function(h){var u=this.mux.utils.now();this.data.player_init_time&&(this.data.player_startup_time=u-this.data.player_init_time),this.pageLoadInitTime=this.data.page_load_init_time||this.pageLoadInitTime,this.pageLoadEndTime=this.data.page_load_end_time||this.pageLoadEndTime,!this.mux.PLAYER_TRACKED&&this.pageLoadInitTime&&(this.mux.PLAYER_TRACKED=!0,(this.data.player_init_time||this.pageLoadEndTime)&&(this.data.page_load_time=Math.min(this.data.player_init_time||1/0,this.pageLoadEndTime||1/0)-this.pageLoadInitTime)),this.send("playerready"),delete this.data.player_startup_time,delete this.data.page_load_time};return s.one("playerready",p),s.longResumeTracker=new M_(U(s)),s.errorTracker=new $E(U(s)),new s_(U(s)),s.seekingTracker=new t_(U(s)),s.playheadTime=new VE(U(s)),s.playbackHeartbeat=new PE(U(s)),new XE(U(s)),s.watchTimeTracker=new BE(U(s)),new FE(U(s)),new W_(U(s)),s.adTracker=new r_(U(s)),new zE(U(s)),new YE(U(s)),new jE(U(s)),new L_(U(s)),new P_(U(s)),new H_(U(s)),new q_(U(s)),n.hlsjs&&s.addHLSJS(n),n.dashjs&&s.addDashJS(n),s.emit("viewinit",n.data),s}return ct(i,[{key:"emit",value:function(a,r){var n,s=Object.assign({viewer_time:this.mux.utils.now()},r),o=[a,s];if(this.emitTranslator)try{o=this.emitTranslator(a,s)}catch(l){this.mux.log.warn("Exception in emit translator callback.",l)}o!=null&&o.length&&(n=ds(cr(i.prototype),"emit",this)).call.apply(n,[this].concat(Et(o)))}},{key:"destroy",value:function(){this._destroyed||(this._destroyed=!0,typeof this.data.view_start<"u"&&(this.emit("viewend"),this.send("viewend")),this.playbackEventDispatcher.destroy(),this.removeHLSJS(),this.removeDashJS(),window.clearTimeout(this._heartBeatTimeout))}},{key:"send",value:function(a){if(this.data.view_id){var r=Object.assign({},this.data),n=["player_program_time","player_manifest_newest_program_time","player_live_edge_program_time","player_program_time","video_holdback","video_part_holdback","video_target_duration","video_part_target_duration"];if(r.video_source_is_live===void 0&&(r.player_source_duration===1/0||r.video_source_duration===1/0?r.video_source_is_live=!0:(r.player_source_duration>0||r.video_source_duration>0)&&(r.video_source_is_live=!1)),r.video_source_is_live||n.forEach(function(d){r[d]=void 0}),r.video_source_url=r.video_source_url||r.player_source_url,r.video_source_url){var s=Ei(In(r.video_source_url),2),o=s[0],l=s[1];r.video_source_domain=l,r.video_source_hostname=o}delete r.ad_request_id,r.video_playback_ranges&&(r.video_playback_range=JSON.stringify(r.video_playback_ranges.filter(function(d){return d[0]!==d[1]}).map(function(d){return"".concat(d[0],":").concat(d[1])})),delete r.video_playback_ranges),this.playbackEventDispatcher.send(a,r),this.data.view_sequence_number++,this.data.player_sequence_number++,G_.has(a)||this._restartHeartBeat(),a==="viewend"&&delete this.data.view_id}}},{key:"_resetView",value:function(a){this.emit("viewend"),this.send("viewend"),this.emit("viewinit",a)}},{key:"_updateStateData",value:function(){var a,r=this.getStateData();if(typeof this.stateDataTranslator=="function")try{r=this.stateDataTranslator(r)}catch(s){this.mux.log.warn("Exception in stateDataTranslator translator callback.",s)}if(!((a=this.data)===null||a===void 0)&&a.video_cdn&&r!=null&&r.video_cdn){r.video_cdn;var n=EE(r,["video_cdn"]);r=n}Object.assign(this.data,r),this.playheadTime._updatePlayheadTime(),this._sanitizeData()}},{key:"_sanitizeData",value:function(){var a=this,r=["player_width","player_height","video_source_width","video_source_height","player_playhead_time","video_source_bitrate"];r.forEach(function(s){var o=parseInt(a.data[s],10);a.data[s]=isNaN(o)?void 0:o});var n=["player_source_url","video_source_url"];n.forEach(function(s){if(a.data[s]){var o=a.data[s].toLowerCase();(o.indexOf("data:")===0||o.indexOf("blob:")===0)&&(a.data[s]="MSE style URL")}})}},{key:"_resetVideoData",value:function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("video_")===0&&delete a.data[r]})}},{key:"_resetViewData",value:function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("view_")===0&&delete a.data[r]}),this.data.view_sequence_number=1}},{key:"_resetErrorData",value:function(){delete this.data.player_error_code,delete this.data.player_error_message,delete this.data.player_error_context,delete this.data.player_error_severity,delete this.data.player_error_business_exception}},{key:"_initializeViewData",value:function(){var a=this,r=this.data.view_id=wn(),n=function(){r===a.data.view_id&&we(a.data,"player_view_count",1)};this.data.player_is_paused?this.one("play",n):n()}},{key:"_restartHeartBeat",value:function(){var a=this;window.clearTimeout(this._heartBeatTimeout),this._heartBeatTimeout=window.setTimeout(function(){a.data.player_is_paused||a.emit("hb")},1e4)}},{key:"addHLSJS",value:function(a){if(!a.hlsjs){this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");return}if(this.hlsjs){this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");return}this.hlsjs=a.hlsjs,wE(this.mux,this.id,a.hlsjs,{},a.Hls||window.Hls)}},{key:"removeHLSJS",value:function(){this.hlsjs&&(IE(this.hlsjs),this.hlsjs=void 0)}},{key:"addDashJS",value:function(a){if(!a.dashjs){this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");return}if(this.dashjs){this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");return}this.dashjs=a.dashjs,DE(this.mux,this.id,a.dashjs)}},{key:"removeDashJS",value:function(){this.dashjs&&(ME(this.dashjs),this.dashjs=void 0)}}]),i})(OE),Q_=z_,wr=ut(Km());function Ll(){return wr.default&&!!(wr.default.fullscreenElement||wr.default.webkitFullscreenElement||wr.default.mozFullScreenElement||wr.default.msFullscreenElement)}var j_=["loadstart","pause","play","playing","seeking","seeked","timeupdate","ratechange","stalled","waiting","error","ended"],Z_={1:"MEDIA_ERR_ABORTED",2:"MEDIA_ERR_NETWORK",3:"MEDIA_ERR_DECODE",4:"MEDIA_ERR_SRC_NOT_SUPPORTED"};function X_(t,e,i){var a=Ei(yo(e),3),r=a[0],n=a[1],s=a[2],o=t.log,l=t.utils.getComputedStyle,d=t.utils.secondsToMs,m={automaticErrorTracking:!0};if(r){if(s!=="video"&&s!=="audio")return o.error("The element of `"+n+"` was not a media element.")}else return o.error("No element was found with the `"+n+"` query selector.");r.mux&&(r.mux.destroy(),delete r.mux,o.warn("Already monitoring this video element, replacing existing event listeners"));var p={getPlayheadTime:function(){return d(r.currentTime)},getStateData:function(){var u,v,E,y=((u=(v=this).getPlayheadTime)===null||u===void 0?void 0:u.call(v))||d(r.currentTime),g=this.hlsjs&&this.hlsjs.url,T=this.dashjs&&typeof this.dashjs.getSource=="function"&&this.dashjs.getSource(),_={player_is_paused:r.paused,player_width:parseInt(l(r,"width")),player_height:parseInt(l(r,"height")),player_autoplay_on:r.autoplay,player_preload_on:r.preload,player_language_code:r.lang,player_is_fullscreen:Ll(),video_poster_url:r.poster,video_source_url:g||T||r.currentSrc,video_source_duration:d(r.duration),video_source_height:r.videoHeight,video_source_width:r.videoWidth,view_dropped_frame_count:r==null||(E=r.getVideoPlaybackQuality)===null||E===void 0?void 0:E.call(r).droppedVideoFrames};if(r.getStartDate&&y>0){var k=r.getStartDate();if(k&&typeof k.getTime=="function"&&k.getTime()){var D=k.getTime();if(_.player_program_time=D+y,r.seekable.length>0){var L=D+r.seekable.end(r.seekable.length-1);_.player_live_edge_program_time=L}}}return _}};i=Object.assign(m,i,p),i.data=Object.assign({player_software:"HTML5 Video Element",player_mux_plugin_name:"VideoElementMonitor",player_mux_plugin_version:t.VERSION},i.data),r.mux=r.mux||{},r.mux.deleted=!1,r.mux.emit=function(u,v){t.emit(n,u,v)},r.mux.updateData=function(u){r.mux.emit("hb",u)};var h=function(){o.error("The monitor for this video element has already been destroyed.")};r.mux.destroy=function(){Object.keys(r.mux.listeners).forEach(function(u){r.removeEventListener(u,r.mux.listeners[u],!1)}),delete r.mux.listeners,r.mux.fullscreenChangeListener&&(document.removeEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1),delete r.mux.fullscreenChangeListener),r.mux.destroy=h,r.mux.swapElement=h,r.mux.emit=h,r.mux.addHLSJS=h,r.mux.addDashJS=h,r.mux.removeHLSJS=h,r.mux.removeDashJS=h,r.mux.updateData=h,r.mux.setEmitTranslator=h,r.mux.setStateDataTranslator=h,r.mux.setGetPlayheadTime=h,r.mux.deleted=!0,t.emit(n,"destroy")},r.mux.swapElement=function(u){var v=Ei(yo(u),3),E=v[0],y=v[1],g=v[2];if(E){if(g!=="video"&&g!=="audio")return t.log.error("The element of `"+y+"` was not a media element.")}else return t.log.error("No element was found with the `"+y+"` query selector.");E.muxId=r.muxId,delete r.muxId,E.mux=E.mux||{},E.mux.listeners=Object.assign({},r.mux.listeners),delete r.mux.listeners,Object.keys(E.mux.listeners).forEach(function(T){r.removeEventListener(T,E.mux.listeners[T],!1),E.addEventListener(T,E.mux.listeners[T],!1)}),E.mux.fullscreenChangeListener=r.mux.fullscreenChangeListener,delete r.mux.fullscreenChangeListener,E.mux.swapElement=r.mux.swapElement,E.mux.destroy=r.mux.destroy,delete r.mux,r=E},r.mux.addHLSJS=function(u){t.addHLSJS(n,u)},r.mux.addDashJS=function(u){t.addDashJS(n,u)},r.mux.removeHLSJS=function(){t.removeHLSJS(n)},r.mux.removeDashJS=function(){t.removeDashJS(n)},r.mux.setEmitTranslator=function(u){t.setEmitTranslator(n,u)},r.mux.setStateDataTranslator=function(u){t.setStateDataTranslator(n,u)},r.mux.setGetPlayheadTime=function(u){u||(u=i.getPlayheadTime),t.setGetPlayheadTime(n,u)},t.init(n,i),t.emit(n,"playerready"),r.paused||(t.emit(n,"play"),r.readyState>2&&t.emit(n,"playing")),r.mux.listeners={},j_.forEach(function(u){u==="error"&&!i.automaticErrorTracking||(r.mux.listeners[u]=function(){var v={};if(u==="error"){if(!r.error||r.error.code===1)return;v.player_error_code=r.error.code,v.player_error_message=Z_[r.error.code]||r.error.message}t.emit(n,u,v)},r.addEventListener(u,r.mux.listeners[u],!1))}),r.mux.listeners.enterpictureinpicture=function(){t.emit(n,"playbackmodechange",{player_playback_mode:"pip",player_playback_mode_data:"{}"})},r.mux.listeners.leavepictureinpicture=function(){var u=Ll()?"fullscreen":"standard";t.emit(n,"playbackmodechange",{player_playback_mode:u,player_playback_mode_data:"{}"})},r.addEventListener("enterpictureinpicture",r.mux.listeners.enterpictureinpicture,!1),r.addEventListener("leavepictureinpicture",r.mux.listeners.leavepictureinpicture,!1),r.mux.fullscreenChangeListener=function(){var u=Ll(),v=document.fullscreenElement;if(u&&(v===r||v!=null&&v.contains(r)))t.emit(n,"playbackmodechange",{player_playback_mode:"fullscreen",player_playback_mode_data:"{}"});else if(!u){var E=document.pictureInPictureElement===r,y=E?"pip":"standard";t.emit(n,"playbackmodechange",{player_playback_mode:y,player_playback_mode_data:"{}"})}},document.addEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1)}function J_(t,e,i,a){var r=a;if(t&&typeof t[e]=="function")try{r=t[e].apply(t,i)}catch(n){te.info("safeCall error",n)}return r}var cn=ut(Jt()),wa;cn.default&&cn.default.WeakMap&&(wa=new WeakMap);function eb(t,e){if(!t||!e||!cn.default||typeof cn.default.getComputedStyle!="function")return"";var i;return wa&&wa.has(t)&&(i=wa.get(t)),i||(i=cn.default.getComputedStyle(t,null),wa&&wa.set(t,i)),i.getPropertyValue(e)}function tb(t){return Math.floor(t*1e3)}var Yi={TARGET_DURATION:"#EXT-X-TARGETDURATION",PART_INF:"#EXT-X-PART-INF",SERVER_CONTROL:"#EXT-X-SERVER-CONTROL",INF:"#EXTINF",PROGRAM_DATE_TIME:"#EXT-X-PROGRAM-DATE-TIME",VERSION:"#EXT-X-VERSION",SESSION_DATA:"#EXT-X-SESSION-DATA"},al=function(t){return this.buffer="",this.manifest={segments:[],serverControl:{},sessionData:{}},this.currentUri={},this.process(t),this.manifest};al.prototype.process=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf(`
`);e>-1;e=this.buffer.indexOf(`
`))this.processLine(this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)};al.prototype.processLine=function(t){var e=t.indexOf(":"),i=nb(t,e),a=i[0],r=i.length===2?pu(i[1]):void 0;if(a[0]!=="#")this.currentUri.uri=a,this.manifest.segments.push(this.currentUri),this.manifest.targetDuration&&!("duration"in this.currentUri)&&(this.currentUri.duration=this.manifest.targetDuration),this.currentUri={};else switch(a){case Yi.TARGET_DURATION:{if(!isFinite(r)||r<0)return;this.manifest.targetDuration=r,this.setHoldBack();break}case Yi.PART_INF:{Cl(this.manifest,i),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),this.setHoldBack();break}case Yi.SERVER_CONTROL:{Cl(this.manifest,i),this.setHoldBack();break}case Yi.INF:{r===0?this.currentUri.duration=.01:r>0&&(this.currentUri.duration=r);break}case Yi.PROGRAM_DATE_TIME:{var n=r,s=new Date(n);this.manifest.dateTimeString||(this.manifest.dateTimeString=n,this.manifest.dateTimeObject=s),this.currentUri.dateTimeString=n,this.currentUri.dateTimeObject=s;break}case Yi.VERSION:{Cl(this.manifest,i);break}case Yi.SESSION_DATA:{var o=sb(i[1]),l=Gm(o);Object.assign(this.manifest.sessionData,l)}}};al.prototype.setHoldBack=function(){var t=this.manifest,e=t.serverControl,i=t.targetDuration,a=t.partTargetDuration;if(e){var r="holdBack",n="partHoldBack",s=i&&i*3,o=a&&a*2;i&&!e.hasOwnProperty(r)&&(e[r]=s),s&&e[r]<s&&(e[r]=s),a&&!e.hasOwnProperty(n)&&(e[n]=a*3),a&&e[n]<o&&(e[n]=o)}};var Cl=function(t,e){var i=ep(e[0].replace("#EXT-X-","")),a;rb(e[1])?(a={},a=Object.assign(ab(e[1]),a)):a=pu(e[1]),t[i]=a},ep=function(t){return t.toLowerCase().replace(/-(\w)/g,function(e){return e[1].toUpperCase()})},pu=function(t){if(t.toLowerCase()==="yes"||t.toLowerCase()==="no")return t.toLowerCase()==="yes";var e=t.indexOf(":")!==-1?t:parseFloat(t);return isNaN(e)?t:e},ib=function(t){var e={},i=t.split("=");if(i.length>1){var a=ep(i[0]);e[a]=pu(i[1])}return e},ab=function(t){for(var e=t.split(","),i={},a=0;e.length>a;a++){var r=e[a],n=ib(r);i=Object.assign(n,i)}return i},rb=function(t){return t.indexOf("=")>-1},nb=function(t,e){return e===-1?[t]:[t.substring(0,e),t.substring(e+1)]},sb=function(t){var e={};if(t){var i=t.search(","),a=t.slice(0,i),r=t.slice(i+1),n=[a,r];return n.forEach(function(s,o){for(var l=s.replace(/['"]+/g,"").split("="),d=0;d<l.length;d++)l[d]==="DATA-ID"&&(e["DATA-ID"]=l[1-d]),l[d]==="VALUE"&&(e.VALUE=l[1-d])}),{data:e}}},ob=al,lb={safeCall:J_,safeIncrement:we,getComputedStyle:eb,secondsToMs:tb,assign:Object.assign,headersStringToObject:mu,cdnHeadersToRequestId:Ao,extractHostnameAndDomain:In,extractHostname:kt,manifestParser:ob,generateShortID:qm,generateUUID:wn,now:De.now,findMediaElement:yo},db=lb,ub={PLAYER_READY:"playerready",VIEW_INIT:"viewinit",VIDEO_CHANGE:"videochange",PLAY:"play",PAUSE:"pause",PLAYING:"playing",TIME_UPDATE:"timeupdate",SEEKING:"seeking",SEEKED:"seeked",REBUFFER_START:"rebufferstart",REBUFFER_END:"rebufferend",ERROR:"error",ENDED:"ended",RENDITION_CHANGE:"renditionchange",ORIENTATION_CHANGE:"orientationchange",PLAYBACK_MODE_CHANGE:"playbackmodechange",NETWORK_CHANGE:"networkchange",AD_REQUEST:"adrequest",AD_RESPONSE:"adresponse",AD_BREAK_START:"adbreakstart",AD_PLAY:"adplay",AD_PLAYING:"adplaying",AD_PAUSE:"adpause",AD_FIRST_QUARTILE:"adfirstquartile",AD_MID_POINT:"admidpoint",AD_THIRD_QUARTILE:"adthirdquartile",AD_ENDED:"adended",AD_BREAK_END:"adbreakend",AD_ERROR:"aderror",REQUEST_COMPLETED:"requestcompleted",REQUEST_FAILED:"requestfailed",REQUEST_CANCELLED:"requestcanceled",HEARTBEAT:"hb",DESTROY:"destroy"},cb=ub,hb="mux-embed",mb="5.18.1",pb="2.1",_e={},$i=function(t){var e=arguments;typeof t=="string"?$i.hasOwnProperty(t)?un.default.setTimeout(function(){e=Array.prototype.splice.call(e,1),$i[t].apply(null,e)},0):te.warn("`"+t+"` is an unknown task"):typeof t=="function"?un.default.setTimeout(function(){t($i)},0):te.warn("`"+t+"` is invalid.")},vb={loaded:De.now(),NAME:hb,VERSION:mb,API_VERSION:pb,PLAYER_TRACKED:!1,monitor:function(t,e){return X_($i,t,e)},destroyMonitor:function(t){var e=Ei(yo(t),1),i=e[0];i&&i.mux&&typeof i.mux.destroy=="function"?i.mux.destroy():te.error("A video element monitor for `"+t+"` has not been initialized via `mux.monitor`.")},addHLSJS:function(t,e){var i=ft(t);_e[i]?_e[i].addHLSJS(e):te.error("A monitor for `"+i+"` has not been initialized.")},addDashJS:function(t,e){var i=ft(t);_e[i]?_e[i].addDashJS(e):te.error("A monitor for `"+i+"` has not been initialized.")},removeHLSJS:function(t){var e=ft(t);_e[e]?_e[e].removeHLSJS():te.error("A monitor for `"+e+"` has not been initialized.")},removeDashJS:function(t){var e=ft(t);_e[e]?_e[e].removeDashJS():te.error("A monitor for `"+e+"` has not been initialized.")},init:function(t,e){zl()&&e&&e.respectDoNotTrack&&te.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");var i=ft(t);_e[i]=new Q_($i,i,e)},emit:function(t,e,i){var a=ft(t);_e[a]?(_e[a].emit(e,i),e==="destroy"&&delete _e[a]):te.error("A monitor for `"+a+"` has not been initialized.")},updateData:function(t,e){var i=ft(t);_e[i]?_e[i].emit("hb",e):te.error("A monitor for `"+i+"` has not been initialized.")},setEmitTranslator:function(t,e){var i=ft(t);_e[i]?_e[i].emitTranslator=e:te.error("A monitor for `"+i+"` has not been initialized.")},setStateDataTranslator:function(t,e){var i=ft(t);_e[i]?_e[i].stateDataTranslator=e:te.error("A monitor for `"+i+"` has not been initialized.")},setGetPlayheadTime:function(t,e){var i=ft(t);_e[i]?_e[i].getPlayheadTime=e:te.error("A monitor for `"+i+"` has not been initialized.")},checkDoNotTrack:zl,log:te,utils:db,events:cb,WINDOW_HIDDEN:!1,WINDOW_UNLOADING:!1};Object.assign($i,vb);typeof un.default<"u"&&typeof un.default.addEventListener=="function"&&un.default.addEventListener("pagehide",function(t){t.persisted||($i.WINDOW_UNLOADING=!0)},!1);var vu=$i;var F=Kf,j={VIDEO:"video",THUMBNAIL:"thumbnail",STORYBOARD:"storyboard",DRM:"drm"},N={NOT_AN_ERROR:0,NETWORK_OFFLINE:2000002,NETWORK_RECONNECTING:2000003,NETWORK_UNKNOWN_ERROR:2e6,NETWORK_NO_STATUS:2000001,NETWORK_INVALID_URL:24e5,NETWORK_NOT_FOUND:2404e3,NETWORK_NOT_READY:2412e3,NETWORK_GENERIC_SERVER_FAIL:25e5,NETWORK_TOKEN_MISSING:2403201,NETWORK_TOKEN_MALFORMED:2412202,NETWORK_TOKEN_EXPIRED:2403210,NETWORK_TOKEN_AUD_MISSING:2403221,NETWORK_TOKEN_AUD_MISMATCH:2403222,NETWORK_TOKEN_SUB_MISMATCH:2403232,ENCRYPTED_ERROR:5e6,ENCRYPTED_UNSUPPORTED_KEY_SYSTEM:5000001,ENCRYPTED_GENERATE_REQUEST_FAILED:5000002,ENCRYPTED_UPDATE_LICENSE_FAILED:5000003,ENCRYPTED_UPDATE_SERVER_CERT_FAILED:5000004,ENCRYPTED_CDM_ERROR:5000005,ENCRYPTED_OUTPUT_RESTRICTED:5000006,ENCRYPTED_MISSING_TOKEN:5000002},rl=t=>t===j.VIDEO?"playback":t,Ti=class Ur extends Error{constructor(e,i=Ur.MEDIA_ERR_CUSTOM,a,r){var n;super(e),this.name="MediaError",this.code=i,this.context=r,this.fatal=a??(i>=Ur.MEDIA_ERR_NETWORK&&i<=Ur.MEDIA_ERR_ENCRYPTED),this.message||(this.message=(n=Ur.defaultMessages[this.code])!=null?n:"")}};Ti.MEDIA_ERR_ABORTED=1,Ti.MEDIA_ERR_NETWORK=2,Ti.MEDIA_ERR_DECODE=3,Ti.MEDIA_ERR_SRC_NOT_SUPPORTED=4,Ti.MEDIA_ERR_ENCRYPTED=5,Ti.MEDIA_ERR_CUSTOM=100,Ti.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail.",3:"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",4:"An unsupported error occurred. The server or network failed, or your browser does not support this format.",5:"The media is encrypted and there are no keys to decrypt it."};var R=Ti,fb=t=>t==null,fu=(t,e)=>fb(e)?!1:t in e,Zl={ANY:"any",MUTED:"muted"},Z={ON_DEMAND:"on-demand",LIVE:"live",UNKNOWN:"unknown"},Gt={MSE:"mse",NATIVE:"native"},$r={HEADER:"header",QUERY:"query",NONE:"none"},ko=Object.values($r),pi={M3U8:"application/vnd.apple.mpegurl",MP4:"video/mp4"},sh={HLS:pi.M3U8};[...Object.values(pi)];var Sk={upTo720p:"720p",upTo1080p:"1080p",upTo1440p:"1440p",upTo2160p:"2160p"},wk={noLessThan480p:"480p",noLessThan540p:"540p",noLessThan720p:"720p",noLessThan1080p:"1080p",noLessThan1440p:"1440p",noLessThan2160p:"2160p"},Ik={DESCENDING:"desc"},Eb="en",Xl={code:Eb},he=(t,e,i,a,r=t)=>{r.addEventListener(e,i,a),t.addEventListener("teardown",()=>{r.removeEventListener(e,i)},{once:!0})};function _b(t,e,i){e&&i>e&&(i=e);for(let a=0;a<t.length;a++)if(t.start(a)<=i&&t.end(a)>=i)return!0;return!1}var Eu=t=>{let e=t.indexOf("?");if(e<0)return[t];let i=t.slice(0,e),a=t.slice(e);return[i,a]},nl=t=>{let{type:e}=t;if(e){let i=e.toUpperCase();return fu(i,sh)?sh[i]:e}return bb(t)},tp=t=>t==="VOD"?Z.ON_DEMAND:Z.LIVE,ip=t=>t==="EVENT"?Number.POSITIVE_INFINITY:t==="VOD"?Number.NaN:0,bb=t=>{let{src:e}=t;if(!e)return"";let i="";try{i=_u(e).pathname}catch{console.error("Invalid url when trying to infer mime type",e)}let a=i.lastIndexOf(".");if(a<0)return Tb(t)?pi.M3U8:"";let r=i.slice(a+1).toUpperCase();return fu(r,pi)?pi[r]:""},Jl=t=>{try{return new URL(t),!1}catch{return!0}},gb=t=>t.split(`
`).find((e,i,a)=>i>0&&a[i-1].startsWith("#EXT-X-STREAM-INF")),_u=(t,e)=>{var i;if(!Jl(t))return new URL(t);let a=(i=window?.location)==null?void 0:i.href,r=e??a;return e&&Jl(e.toString())&&(r=new URL(e,a)),new URL(t,r)},yb="mux.com",Tb=({src:t,customDomain:e=yb})=>{let i;try{i=new URL(`${t}`)}catch{return!1}let a=i.protocol==="https:",r=i.hostname===`stream.${e}`.toLowerCase(),n=i.pathname.split("/"),s=n.length===2,o=!(n!=null&&n[1].includes("."));return a&&r&&s&&o},tr=t=>{let e=(t??"").split(".")[1];if(e)try{let i=e.replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(i).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(a)}catch{return}},Ab=({exp:t},e=Date.now())=>!t||t*1e3<e,kb=({sub:t},e)=>t!==e,Sb=({aud:t},e)=>!t,wb=({aud:t},e)=>t!==e,ap="en";function x(t,e=!0){var i,a;let r=e&&(a=(i=Xl)==null?void 0:i[t])!=null?a:t,n=e?Xl.code:ap;return new Ib(r,n)}var Ib=class{constructor(e,i=(a=>(a=Xl)!=null?a:ap)()){this.message=e,this.locale=i}format(e){return this.message.replace(/\{(\w+)\}/g,(i,a)=>{var r;return(r=e[a])!=null?r:""})}toString(){return this.message}},Rb=Object.values(Zl),oh=t=>typeof t=="boolean"||typeof t=="string"&&Rb.includes(t),Lb=(t,e,i)=>{let{autoplay:a}=t,r=!1,n=!1,s=oh(a)?a:!!a,o=()=>{r||he(e,"playing",()=>{r=!0},{once:!0})};if(o(),he(e,"loadstart",()=>{r=!1,o(),Dl(e,s)},{once:!0}),he(e,"loadstart",()=>{i||(t.streamType&&t.streamType!==Z.UNKNOWN?n=t.streamType===Z.LIVE:n=!Number.isFinite(e.duration)),Dl(e,s)},{once:!0}),i&&i.once(F.Events.LEVEL_LOADED,(l,d)=>{var m;t.streamType&&t.streamType!==Z.UNKNOWN?n=t.streamType===Z.LIVE:n=(m=d.details.live)!=null?m:!1}),!s){let l=()=>{!n||Number.isFinite(t.startTime)||(i!=null&&i.liveSyncPosition?e.currentTime=i.liveSyncPosition:Number.isFinite(e.seekable.end(0))&&(e.currentTime=e.seekable.end(0)))};i&&he(e,"play",()=>{e.preload==="metadata"?i.once(F.Events.LEVEL_UPDATED,l):l()},{once:!0})}return l=>{r||(s=oh(l)?l:!!l,Dl(e,s))}},Dl=(t,e)=>{if(!e)return;let i=t.muted,a=()=>t.muted=i;switch(e){case Zl.ANY:t.play().catch(()=>{t.muted=!0,t.play().catch(a)});break;case Zl.MUTED:t.muted=!0,t.play().catch(a);break;default:t.play().catch(()=>{});break}},Cb=({preload:t,src:e},i,a)=>{let r=p=>{p!=null&&["","none","metadata","auto"].includes(p)?i.setAttribute("preload",p):i.removeAttribute("preload")};if(!a)return r(t),r;let n=!1,s=!1,o=a.config.maxBufferLength,l=a.config.maxBufferSize,d=p=>{r(p);let h=p??i.preload;s||h==="none"||(h==="metadata"?(a.config.maxBufferLength=1,a.config.maxBufferSize=1):(a.config.maxBufferLength=o,a.config.maxBufferSize=l),m())},m=()=>{!n&&e&&(n=!0,a.loadSource(e))};return he(i,"play",()=>{s=!0,a.config.maxBufferLength=o,a.config.maxBufferSize=l,m()},{once:!0}),d(t),d},Db=(t,e,i)=>{let{minPreloadSegments:a}=t;if(a==null||a<=0||!i)return;let r=0,n=!1,s=e.playbackRate||1,o=()=>{e.playbackRate!==0&&(s=e.playbackRate,e.playbackRate=0)};e.playbackRate=0,he(e,"ratechange",o);let l=(d,{frag:m})=>{n||m.type!=="main"||(r++,r>=a&&(n=!0,e.removeEventListener("ratechange",o),e.playbackRate=s))};i.on(F.Events.FRAG_BUFFERED,l),e.addEventListener("teardown",()=>{n||(n=!0,i.off(F.Events.FRAG_BUFFERED,l),e.playbackRate=s)},{once:!0})},Mb=(t,e,i)=>{let{initialEstimateSegments:a}=t;if(a==null||a<=0||!i)return;let r=0;i.on(F.Events.FRAG_BUFFERED,(n,{frag:s})=>{s.type==="main"&&(r++,r<a&&i.abrController.resetEstimator(i.config.abrEwmaDefaultEstimate))})};function xb(t,e){var i;if(!("videoTracks"in t))return;let a=new WeakMap;e.on(F.Events.MANIFEST_PARSED,function(d,m){l();let p=t.addVideoTrack("main");p.selected=!0;for(let[h,u]of m.levels.entries()){let v=p.addRendition(u.url[0],u.width,u.height,u.videoCodec,u.bitrate);a.set(u,`${h}`),v.id=`${h}`}}),e.on(F.Events.AUDIO_TRACKS_UPDATED,function(d,m){o();for(let p of m.audioTracks){let h=p.default?"main":"alternative",u=t.addAudioTrack(h,p.name,p.lang);u.id=`${p.id}`,p.default&&(u.enabled=!0)}});let r=()=>{var d;let m=+((d=[...t.audioTracks].find(h=>h.enabled))==null?void 0:d.id),p=e.audioTracks.map(h=>h.id);m!=e.audioTrack&&p.includes(m)&&(e.audioTrack=m)};t.audioTracks.addEventListener("change",r),e.on(F.Events.LEVELS_UPDATED,function(d,m){var p;let h=t.videoTracks[(p=t.videoTracks.selectedIndex)!=null?p:0];if(!h)return;let u=m.levels.map(v=>a.get(v));for(let v of t.videoRenditions)v.id&&!u.includes(v.id)&&h.removeRendition(v)});let n=d=>{let m=d.target.selectedIndex;m!=e.nextLevel&&(e.nextLevel=m)};(i=t.videoRenditions)==null||i.addEventListener("change",n);let s=()=>{for(let d of t.videoTracks)t.removeVideoTrack(d)},o=()=>{for(let d of t.audioTracks)t.removeAudioTrack(d)},l=()=>{s(),o()};e.once(F.Events.DESTROYING,()=>{var d,m;l(),(d=t.audioTracks)==null||d.removeEventListener("change",r),(m=t.videoRenditions)==null||m.removeEventListener("change",n)})}var Ml=t=>"time"in t?t.time:t.startTime;function Ob(t,e){e.on(F.Events.NON_NATIVE_TEXT_TRACKS_FOUND,(r,{tracks:n})=>{n.forEach(s=>{var o,l;let d=(o=s.subtitleTrack)!=null?o:s.closedCaptions,m=e.subtitleTracks.findIndex(({lang:h,name:u,type:v})=>h==d?.lang&&u===s.label&&v.toLowerCase()===s.kind),p=((l=s._id)!=null?l:s.default)?"default":`${s.kind}${m}`;bu(t,s.kind,s.label,d?.lang,p,s.default)})});let i=()=>{if(!e.subtitleTracks.length)return;let r=Array.from(t.textTracks).find(o=>o.id&&o.mode==="showing"&&["subtitles","captions"].includes(o.kind));if(!r)return;let n=e.subtitleTracks[e.subtitleTrack],s=n?n.default?"default":`${e.subtitleTracks[e.subtitleTrack].type.toLowerCase()}${e.subtitleTrack}`:void 0;if(e.subtitleTrack<0||r?.id!==s){let o=e.subtitleTracks.findIndex(({lang:l,name:d,type:m,default:p})=>r.id==="default"&&p||l==r.language&&d===r.label&&m.toLowerCase()===r.kind);e.subtitleTrack=o}r?.id===s&&r.cues&&Array.from(r.cues).forEach(o=>{r.addCue(o)})};t.textTracks.addEventListener("change",i),e.on(F.Events.CUES_PARSED,(r,{track:n,cues:s})=>{let o=t.textTracks.getTrackById(n);if(!o)return;let l=o.mode==="disabled";l&&(o.mode="hidden"),s.forEach(d=>{var m;(m=o.cues)!=null&&m.getCueById(d.id)||o.addCue(d)}),l&&(o.mode="disabled")}),e.once(F.Events.DESTROYING,()=>{t.textTracks.removeEventListener("change",i),t.querySelectorAll("track[data-removeondestroy]").forEach(r=>{r.remove()})});let a=()=>{Array.from(t.textTracks).forEach(r=>{var n,s;if(!["subtitles","caption"].includes(r.kind)&&(r.label==="thumbnails"||r.kind==="chapters")){if(!((n=r.cues)!=null&&n.length)){let o="track";r.kind&&(o+=`[kind="${r.kind}"]`),r.label&&(o+=`[label="${r.label}"]`);let l=t.querySelector(o),d=(s=l?.getAttribute("src"))!=null?s:"";l?.removeAttribute("src"),setTimeout(()=>{l?.setAttribute("src",d)},0)}r.mode!=="hidden"&&(r.mode="hidden")}})};e.once(F.Events.MANIFEST_LOADED,a),e.once(F.Events.MEDIA_ATTACHED,a)}function bu(t,e,i,a,r,n){let s=document.createElement("track");return s.kind=e,s.label=i,a&&(s.srclang=a),r&&(s.id=r),n&&(s.default=!0),s.track.mode=["subtitles","captions"].includes(e)?"disabled":"hidden",s.setAttribute("data-removeondestroy",""),t.append(s),s.track}function Nb(t,e){let i=Array.prototype.find.call(t.querySelectorAll("track"),a=>a.track===e);i?.remove()}function Wn(t,e,i){var a;return(a=Array.from(t.querySelectorAll("track")).find(r=>r.track.label===e&&r.track.kind===i))==null?void 0:a.track}async function rp(t,e,i,a){let r=Wn(t,i,a);return r||(r=bu(t,a,i),r.mode="hidden",await new Promise(n=>setTimeout(()=>n(void 0),0))),r.mode!=="hidden"&&(r.mode="hidden"),[...e].sort((n,s)=>Ml(s)-Ml(n)).forEach(n=>{var s,o;let l=n.value,d=Ml(n);if("endTime"in n&&n.endTime!=null)r?.addCue(new VTTCue(d,n.endTime,a==="chapters"?l:JSON.stringify(l??null)));else{let m=Array.prototype.findIndex.call(r?.cues,v=>v.startTime>=d),p=(s=r?.cues)==null?void 0:s[m],h=p?p.startTime:Number.isFinite(t.duration)?t.duration:Number.MAX_SAFE_INTEGER,u=(o=r?.cues)==null?void 0:o[m-1];u&&(u.endTime=d),r?.addCue(new VTTCue(d,h,a==="chapters"?l:JSON.stringify(l??null)))}}),t.textTracks.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r}var gu="cuepoints",np=Object.freeze({label:gu});async function sp(t,e,i=np){return rp(t,e,i.label,"metadata")}var ed=t=>({time:t.startTime,value:JSON.parse(t.text)});function Pb(t,e={label:gu}){let i=Wn(t,e.label,"metadata");return i!=null&&i.cues?Array.from(i.cues,a=>ed(a)):[]}function op(t,e={label:gu}){var i,a;let r=Wn(t,e.label,"metadata");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return ed(r.activeCues[0]);let{currentTime:n}=t,s=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:o,endTime:l})=>o<=n&&l>n);return ed(s||r.activeCues[0])}async function Ub(t,e=np){return new Promise(i=>{he(t,"loadstart",async()=>{let a=await sp(t,[],e);he(t,"cuechange",()=>{let r=op(t);if(r){let n=new CustomEvent("cuepointchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(n)}},{},a),i(a)})})}var yu="chapters",lp=Object.freeze({label:yu}),td=t=>({startTime:t.startTime,endTime:t.endTime,value:t.text});async function dp(t,e,i=lp){return rp(t,e,i.label,"chapters")}function $b(t,e={label:yu}){var i;let a=Wn(t,e.label,"chapters");return(i=a?.cues)!=null&&i.length?Array.from(a.cues,r=>td(r)):[]}function up(t,e={label:yu}){var i,a;let r=Wn(t,e.label,"chapters");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return td(r.activeCues[0]);let{currentTime:n}=t,s=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:o,endTime:l})=>o<=n&&l>n);return td(s||r.activeCues[0])}async function Hb(t,e=lp){return new Promise(i=>{he(t,"loadstart",async()=>{let a=await dp(t,[],e);he(t,"cuechange",()=>{let r=up(t);if(r){let n=new CustomEvent("chapterchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(n)}},{},a),i(a)})})}function Bb(t,e){if(e){let i=e.playingDate;if(i!=null)return new Date(i.getTime()-t.currentTime*1e3)}return typeof t.getStartDate=="function"?t.getStartDate():new Date(NaN)}function Wb(t,e){if(e&&e.playingDate)return e.playingDate;if(typeof t.getStartDate=="function"){let i=t.getStartDate();return new Date(i.getTime()+t.currentTime*1e3)}return new Date(NaN)}var hn={VIDEO:"v",THUMBNAIL:"t",STORYBOARD:"s",DRM:"d"},Fb=t=>{if(t===j.VIDEO)return hn.VIDEO;if(t===j.DRM)return hn.DRM},Kb=(t,e)=>{var i,a;let r=rl(t),n=`${r}Token`;return(i=e.tokens)!=null&&i[r]?(a=e.tokens)==null?void 0:a[r]:fu(n,e)?e[n]:void 0},So=(t,e,i,a,r=!1,n=!(s=>(s=globalThis.navigator)==null?void 0:s.onLine)())=>{var s,o;if(n){let g=x("Your device appears to be offline",r),T,_=R.MEDIA_ERR_NETWORK,k=new R(g,_,!1,T);return k.errorCategory=e,k.muxCode=N.NETWORK_OFFLINE,k.data=t,k}let l="status"in t?t.status:t.code,d=Date.now(),m=R.MEDIA_ERR_NETWORK;if(l===200)return;let p=rl(e),h=Kb(e,i),u=Fb(e),[v]=Eu((s=i.playbackId)!=null?s:"");if(!l||!v)return;let E=tr(h);if(h&&!E){let g=x("The {tokenNamePrefix}-token provided is invalid or malformed.",r).format({tokenNamePrefix:p}),T=x("Compact JWT string: {token}",r).format({token:h}),_=new R(g,m,!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_TOKEN_MALFORMED,_.data=t,_}if(l>=500){let g=new R("",m,a??!0);return g.errorCategory=e,g.muxCode=N.NETWORK_UNKNOWN_ERROR,g}if(l===403)if(E){if(Ab(E,d)){let g={timeStyle:"medium",dateStyle:"medium"},T=x("The video’s secured {tokenNamePrefix}-token has expired.",r).format({tokenNamePrefix:p}),_=x("Expired at: {expiredDate}. Current time: {currentDate}.",r).format({expiredDate:new Intl.DateTimeFormat("en",g).format((o=E.exp)!=null?o:0*1e3),currentDate:new Intl.DateTimeFormat("en",g).format(d)}),k=new R(T,m,!0,_);return k.errorCategory=e,k.muxCode=N.NETWORK_TOKEN_EXPIRED,k.data=t,k}if(kb(E,v)){let g=x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",r).format({tokenNamePrefix:p}),T=x("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}",r).format({tokenNamePrefix:p,playbackId:v,tokenPlaybackId:E.sub}),_=new R(g,m,!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_TOKEN_SUB_MISMATCH,_.data=t,_}if(Sb(E)){let g=x("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:p}),T=x("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.",r).format({tokenNamePrefix:p,expectedAud:u}),_=new R(g,m,!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_TOKEN_AUD_MISSING,_.data=t,_}if(wb(E,u)){let g=x("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:p}),T=x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.",r).format({tokenNamePrefix:p,expectedAud:u,aud:E.aud}),_=new R(g,m,!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_TOKEN_AUD_MISMATCH,_.data=t,_}}else{let g=x("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.",r).format({tokenNamePrefix:p,category:e}),T=x("Specified playback ID: {playbackId}",r).format({playbackId:v}),_=new R(g,m,a??!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_TOKEN_MISSING,_.data=t,_}if(l===412){let g=x("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.",r),T=x("Specified playback ID: {playbackId}",r).format({playbackId:v}),_=new R(g,m,a??!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_NOT_READY,_.streamType=i.streamType===Z.LIVE?"live":i.streamType===Z.ON_DEMAND?"on-demand":"unknown",_.data=t,_}if(l===404){let g=x("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.",r),T=x("Specified playback ID: {playbackId}",r).format({playbackId:v}),_=new R(g,m,a??!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_NOT_FOUND,_.data=t,_}if(l===400){let g=x("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."),T=x("Specified playback ID: {playbackId}",r).format({playbackId:v}),_=new R(g,m,a??!0,T);return _.errorCategory=e,_.muxCode=N.NETWORK_INVALID_URL,_.data=t,_}let y=new R("",m,a??!0);return y.errorCategory=e,y.muxCode=N.NETWORK_UNKNOWN_ERROR,y.data=t,y},lh=F.DefaultConfig.capLevelController,Vb={"720p":921600,"1080p":2073600,"1440p":4194304,"2160p":8294400};function qb(t){let e=t.toLowerCase().trim();return Vb[e]}var id=class Hr extends lh{constructor(e){super(e)}static setMaxAutoResolution(e,i){i?Hr.maxAutoResolution.set(e,i):Hr.maxAutoResolution.delete(e)}getMaxAutoResolution(){var e;let i=this.hls;return(e=Hr.maxAutoResolution.get(i))!=null?e:void 0}get levels(){var e;return(e=this.hls.levels)!=null?e:[]}getValidLevels(e){return this.levels.filter((i,a)=>this.isLevelAllowed(i)&&a<=e)}getMaxLevelCapped(e){let i=this.getValidLevels(e),a=this.getMaxAutoResolution();if(!a)return super.getMaxLevel(e);let r=qb(a);if(!r)return super.getMaxLevel(e);let n=i.filter(l=>l.width*l.height<=r),s=n.findIndex(l=>l.width*l.height===r);if(s!==-1){let l=n[s];return i.findIndex(d=>d===l)}if(n.length===0)return 0;let o=n[n.length-1];return i.findIndex(l=>l===o)}getMaxLevel(e){if(this.getMaxAutoResolution()!==void 0)return this.getMaxLevelCapped(e);let i=super.getMaxLevel(e),a=this.getValidLevels(e);if(!a[i])return i;let r=Math.min(a[i].width,a[i].height),n=Hr.minMaxResolution;return r>=n?i:lh.getMaxLevelByMediaSize(a,n*(16/9),n)}};id.minMaxResolution=720,id.maxAutoResolution=new WeakMap;var Yb=id,ad=Yb,Gb="com.apple.fps.1_0",zb="application/vnd.apple.mpegurl",Qb=({mediaEl:t,getAppCertificate:e,getLicenseKey:i,saveAndDispatchError:a,drmTypeCb:r})=>{if(!window.WebKitMediaKeys||!("onwebkitneedkey"in t)){console.error("No WebKitMediaKeys. FairPlay may not be supported");let h=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),u=new R(h,R.MEDIA_ERR_ENCRYPTED,!0);return u.errorCategory=j.DRM,u.muxCode=N.ENCRYPTED_CDM_ERROR,a(t,u),()=>{}}let n=t,s=e(),o=null,l=h=>{(async()=>{try{n.webkitKeys||d();let u=await s;if(h.initData===null||u==null)return;let v=jb(h.initData,u);m(v)}catch(u){console.error("Could not start encrypted playback due to exception",u),a(n,u)}})()},d=()=>{try{let h=new WebKitMediaKeys(Gb);n.webkitSetMediaKeys(h),r()}catch{let h="Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.",u=new R(h,R.MEDIA_ERR_ENCRYPTED,!0);throw u.errorCategory=j.DRM,u.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,u}},m=h=>{let u=n.webkitKeys.createSession(zb,h),v=async g=>{try{let T=g.message,_=await i(T);u.update(_)}catch(T){console.error("Error on FairPlay session message",T),a(t,T)}},E=g=>{let T=g.target.error;if(!T)return;console.error(`Internal Webkit Key Session Error - sysCode: ${T.systemCode} code: ${T.code}`);let _=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, updating your browser, or playing in another browser."),k=new R(_,R.MEDIA_ERR_ENCRYPTED,!0);k.errorCategory=j.DRM,k.muxCode=N.ENCRYPTED_CDM_ERROR,a(t,k)},y=()=>{u.removeEventListener("webkitkeymessage",v),u.removeEventListener("webkitkeyerror",E),t.removeEventListener("teardown",y),"webkitCurrentPlaybackTargetIsWireless"in t&&t.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",y),o=null;try{u.close()}catch{}};"webkitCurrentPlaybackTargetIsWireless"in t&&t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",y,{once:!0}),u.addEventListener("webkitkeymessage",v),u.addEventListener("webkitkeyerror",E),t.addEventListener("teardown",y),o=y},p=()=>{t.removeEventListener("webkitneedkey",l),t.removeEventListener("teardown",p),o?.();try{n.webkitSetMediaKeys(null)}catch{}};return t.addEventListener("webkitneedkey",l),t.addEventListener("teardown",p,{once:!0}),p},jb=(t,e)=>{let i=Xb(Zb(t)),a=new Uint8Array(t),r=new Uint8Array(i),n=new Uint8Array(e),s=a.byteLength+4+n.byteLength+4+r.byteLength,o=new Uint8Array(s),l=0,d=p=>{o.set(p,l),l+=p.byteLength},m=p=>{let h=new DataView(o.buffer),u=p.byteLength;h.setUint32(l,u,!0),l+=4,d(p)};return d(a),m(r),m(n),o},Zb=t=>new TextDecoder("utf-16le").decode(t).replace("skd://","").slice(1);function Xb(t){let e=new ArrayBuffer(t.length*2),i=new DataView(e);for(let a=0;a<t.length;a++)i.setUint16(a*2,t.charCodeAt(a),!0);return e}var Jb=({mediaEl:t,getAppCertificate:e,getLicenseKey:i,saveAndDispatchError:a,drmTypeCb:r,fallbackToWebkitFairplay:n})=>{let s=null,o=async p=>{try{let h=p.initDataType;if(h!=="skd"){console.error(`Received unexpected initialization data type "${h}"`);return}t.mediaKeys||await l(h);let u=p.initData;if(u==null){console.error(`Could not start encrypted playback due to missing initData in ${p.type} event`);return}await d(h,u)}catch(h){a(t,h);return}},l=async p=>{let h=await navigator.requestMediaKeySystemAccess("com.apple.fps",[{initDataTypes:[p],videoCapabilities:[{contentType:"application/vnd.apple.mpegurl",robustness:""}],distinctiveIdentifier:"not-allowed",persistentState:"not-allowed",sessionTypes:["temporary"]}]).then(v=>(r(),v)).catch(()=>{let v=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),E=new R(v,R.MEDIA_ERR_ENCRYPTED,!0);E.errorCategory=j.DRM,E.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,a(t,E)});if(!h)return;let u=await h.createMediaKeys();try{let v=await e();await u.setServerCertificate(v).catch(()=>{let E=x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),y=new R(E,R.MEDIA_ERR_ENCRYPTED,!0);return y.errorCategory=j.DRM,y.muxCode=N.ENCRYPTED_UPDATE_SERVER_CERT_FAILED,Promise.reject(y)})}catch(v){a(t,v);return}await t.setMediaKeys(u)},d=async(p,h)=>{let u=t.mediaKeys.createSession(),v=async g=>{let T=g.message,_=await i(T);try{await u.update(_)}catch{let k=x("Failed to update DRM license. This may be an issue with the player or your protected content."),D=new R(k,R.MEDIA_ERR_ENCRYPTED,!0);D.errorCategory=j.DRM,D.muxCode=N.ENCRYPTED_UPDATE_LICENSE_FAILED,a(t,D)}},E=()=>{let g=T=>{let _;if(T==="internal-error"){let k=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, updating your browser, or playing in another browser.");_=new R(k,R.MEDIA_ERR_ENCRYPTED,!0),_.errorCategory=j.DRM,_.muxCode=N.ENCRYPTED_CDM_ERROR}else if(T==="output-restricted"||T==="output-downscaled"){let k=x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");_=new R(k,R.MEDIA_ERR_ENCRYPTED,!1),_.errorCategory=j.DRM,_.muxCode=N.ENCRYPTED_OUTPUT_RESTRICTED}_&&a(t,_)};u.keyStatuses.forEach(T=>g(T))};u.addEventListener("keystatuseschange",E),u.addEventListener("message",v);let y=async()=>{u.removeEventListener("keystatuseschange",E),u.removeEventListener("message",v),"webkitCurrentPlaybackTargetIsWireless"in t&&t.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",y),t.removeEventListener("teardown",y),await u.close().catch(g=>{console.warn("There was an error when closing EME session",g)}),s=null};"webkitCurrentPlaybackTargetIsWireless"in t&&t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",y,{once:!0}),t.addEventListener("teardown",y,{once:!0}),s=y,await u.generateRequest(p,h).catch(async g=>{if(g.name==="NotSupportedError"&&"webkitCurrentPlaybackTargetIsWireless"in t&&t.webkitCurrentPlaybackTargetIsWireless)console.warn("Failed to generate a DRM license request. Attempting to fallback to Webkit DRM"),n?.();else{let T=x("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),_=new R(T,R.MEDIA_ERR_ENCRYPTED,!0);return _.errorCategory=j.DRM,_.muxCode=N.ENCRYPTED_GENERATE_REQUEST_FAILED,console.error("Failed to generate license request",g),Promise.reject(_)}})},m=async()=>{t.removeEventListener("encrypted",o),t.removeEventListener("teardown",m),s&&await s(),await t.setMediaKeys(null).catch(()=>{})};return t.addEventListener("encrypted",o),t.addEventListener("teardown",m,{once:!0}),m},eg=({hls:t,mediaEl:e,src:i,muxMediaState:a,saveAndDispatchError:r,maxRetries:n})=>{var s;let o,l=0,d=!1,m=!1,p=!1,h=()=>{o!=null&&(clearTimeout(o),o=void 0)},u=w=>w?.muxCode===N.NETWORK_RECONNECTING,v=()=>!e.paused&&e.readyState<HTMLMediaElement.HAVE_FUTURE_DATA,E=()=>{let w=a.get(e);if(u(w?.error))return;let $=new R(x("Attempting to reconnect..."),R.MEDIA_ERR_NETWORK,!1);$.errorCategory=j.VIDEO,$.muxCode=N.NETWORK_RECONNECTING,w&&(w.error=$),e.dispatchEvent(new CustomEvent("error",{detail:$}))},y=()=>{if(!p&&i){t.loadSource(i);return}t.startLoad(e.currentTime)},g=()=>{d=!1,m=!0,h();let w=new R(x("Network error, try reloading."),R.MEDIA_ERR_NETWORK,!0);w.errorCategory=j.VIDEO,w.reload=!0,r(e,w)},T=()=>{if(o!=null||d)return;if(l>=n){g();return}d=!0;let w=Math.min(1e3*2**l,3e4);o=setTimeout(()=>{o=void 0,l+=1,y()},w)},_=()=>{let w=a.get(e);!(w!=null&&w.networkError)||m||v()&&(E(),T())},k=()=>{let w=a.get(e);w&&(w.networkError=!0),d=!1,_()},D=()=>{let w=a.get(e);w!=null&&w.networkError&&(l=0,m=!1,h(),d=!0,y())};(s=globalThis.addEventListener)==null||s.call(globalThis,"online",D);let L=()=>{let w=a.get(e);w&&(!w.networkError&&!u(w.error)||(w.networkError=!1,d=!1,l=0,m=!1,h(),w.error&&(w.error=null,e.dispatchEvent(new Event("emptied")))))};return t.on(F.Events.FRAG_BUFFERED,L),he(e,"playing",()=>{let w=a.get(e);w!=null&&w.networkError&&(d=!1,l=0,m=!1,h(),w.error&&(w.error=null))}),he(e,"waiting",_),e.addEventListener("teardown",()=>{var w;(w=globalThis.removeEventListener)==null||w.call(globalThis,"online",D),h()},{once:!0}),{handleHlsError:(w,$)=>{var V,W;if(w.type!==F.ErrorTypes.NETWORK_ERROR)return!1;let B=(W=(V=w.response)==null?void 0:V.code)!=null?W:0;return($.muxCode===N.NETWORK_OFFLINE||B===0||B>=500)&&w.fatal?(k(),!0):!1},onManifestLoaded:()=>{p=!0,d=!1,h()}}},us={FAIRPLAY:"fairplay",PLAYREADY:"playready",WIDEVINE:"widevine"},tg=t=>{if(t.includes("fps"))return us.FAIRPLAY;if(t.includes("playready"))return us.PLAYREADY;if(t.includes("widevine"))return us.WIDEVINE},ig=(t,e)=>{let i=gb(t);if(!i)return Promise.reject(new Error("No media playlist URL found in multivariant playlist"));if(Jl(i)&&!e)return Promise.reject(new Error("masterPlaylistUrl is required to resolve relative media playlist URL"));let a;try{a=_u(i,e)}catch(r){return Promise.reject(r)}return fetch(a).then(r=>r.status!==200?Promise.reject(r):r.text())},ag=t=>{let e=t.split(`
`).filter(a=>a.startsWith("#EXT-X-SESSION-DATA"));if(!e.length)return{};let i={};for(let a of e){let r=ng(a),n=r["DATA-ID"];n&&(i[n]={...r})}return{sessionData:i}},rg=/([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;function ng(t){let e=[...t.matchAll(rg)];return Object.fromEntries(e.map(([,i,a])=>[i,a]))}var sg=t=>{var e,i,a;let r=t.split(`
`),n=(i=((e=r.find(d=>d.startsWith("#EXT-X-PLAYLIST-TYPE")))!=null?e:"").split(":")[1])==null?void 0:i.trim(),s=tp(n),o=ip(n),l;if(s===Z.LIVE){let d=r.find(m=>m.startsWith("#EXT-X-PART-INF"));if(d)l=+d.split(":")[1].split("=")[1]*2;else{let m=r.find(h=>h.startsWith("#EXT-X-TARGETDURATION")),p=(a=m?.split(":"))==null?void 0:a[1];l=+(p??6)*3}}return{streamType:s,targetLiveWindow:o,liveEdgeStartOffset:l}},og=async(t,e)=>{if(e===pi.MP4)return{streamType:Z.ON_DEMAND,targetLiveWindow:Number.NaN,liveEdgeStartOffset:void 0,sessionData:void 0};if(e===pi.M3U8){let i=await fetch(t);if(!i.ok)return Promise.reject(i);let a=await i.text(),r=await ig(a,i.url);return{...ag(a),...sg(r)}}return console.error(`Media type ${e} is an unrecognized or unsupported type for src ${t}.`),{streamType:void 0,targetLiveWindow:void 0,liveEdgeStartOffset:void 0,sessionData:void 0}},lg=async(t,e,i=nl({src:t}))=>{var a,r,n,s;let{streamType:o,targetLiveWindow:l,liveEdgeStartOffset:d,sessionData:m}=await og(t,i),p=m?.["com.apple.hls.chapters"];(p!=null&&p.URI||p!=null&&p.VALUE.toLocaleLowerCase().startsWith("http"))&&Tu((a=p.URI)!=null?a:p.VALUE,e),((r=ae.get(e))!=null?r:{}).liveEdgeStartOffset=d,((n=ae.get(e))!=null?n:{}).targetLiveWindow=l,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((s=ae.get(e))!=null?s:{}).streamType=o,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},Tu=async(t,e)=>{var i,a;try{let r=await fetch(t);if(!r.ok)throw new Error(`Failed to fetch Mux metadata: ${r.status} ${r.statusText}`);let n=await r.json(),s={};if(!((i=n?.[0])!=null&&i.metadata))return;for(let l of n[0].metadata)l.key&&l.value&&(s[l.key]=l.value);((a=ae.get(e))!=null?a:{}).metadata=s;let o=new CustomEvent("muxmetadata");e.dispatchEvent(o)}catch(r){console.error(r)}},dg=t=>{var e;let i=t.type,a=tp(i),r=ip(i),n,s=!!((e=t.partList)!=null&&e.length);return a===Z.LIVE&&(n=s?t.partTarget*2:t.targetduration*3),{streamType:a,targetLiveWindow:r,liveEdgeStartOffset:n,lowLatency:s}},ug=(t,e,i)=>{var a,r,n,s,o,l,d,m;let{streamType:p,targetLiveWindow:h,liveEdgeStartOffset:u,lowLatency:v}=dg(t);if(p===Z.LIVE){v?(i.config.backBufferLength=(a=i.userConfig.backBufferLength)!=null?a:4,i.config.maxFragLookUpTolerance=(r=i.userConfig.maxFragLookUpTolerance)!=null?r:.001,i.config.abrBandWidthUpFactor=(n=i.userConfig.abrBandWidthUpFactor)!=null?n:i.config.abrBandWidthFactor):i.config.backBufferLength=(s=i.userConfig.backBufferLength)!=null?s:8;let E=Object.freeze({get length(){return e.seekable.length},start(y){return e.seekable.start(y)},end(y){var g;return y>this.length||y<0||Number.isFinite(e.duration)?e.seekable.end(y):(g=i.liveSyncPosition)!=null?g:e.seekable.end(y)}});((o=ae.get(e))!=null?o:{}).seekable=E}((l=ae.get(e))!=null?l:{}).liveEdgeStartOffset=u,((d=ae.get(e))!=null?d:{}).targetLiveWindow=h,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((m=ae.get(e))!=null?m:{}).streamType=p,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},dh,uh,cp=(uh=(dh=globalThis?.navigator)==null?void 0:dh.userAgent)!=null?uh:"",ch,hh,mh,cg=(mh=(hh=(ch=globalThis?.navigator)==null?void 0:ch.userAgentData)==null?void 0:hh.platform)!=null?mh:"",hg=cp.toLowerCase().includes("android")||["x11","android"].some(t=>cg.toLowerCase().includes(t)),mg=t=>/^((?!chrome|android).)*safari/i.test(cp)&&!!t.canPlayType("application/vnd.apple.mpegurl"),ae=new WeakMap,vi="mux.com",ph,vh,hp=(vh=(ph=F).isSupported)==null?void 0:vh.call(ph),pg=t=>hg||!mg(t),Au=()=>{if(typeof window<"u")return vu.utils.now()},vg=vu.utils.generateUUID,rd=({playbackId:t,customDomain:e=vi,maxResolution:i,minResolution:a,renditionOrder:r,programStartTime:n,programEndTime:s,assetStartTime:o,assetEndTime:l,playbackToken:d,tokens:{playback:m=d}={},extraSourceParams:p={}}={})=>{if(!t)return;let[h,u=""]=Eu(t),v=new URL(`https://stream.${e}/${h}.m3u8${u}`);return m||v.searchParams.has("token")?(v.searchParams.forEach((E,y)=>{y!="token"&&v.searchParams.delete(y)}),m&&v.searchParams.set("token",m)):(i&&v.searchParams.set("max_resolution",i),a&&(v.searchParams.set("min_resolution",a),i&&+i.slice(0,-1)<+a.slice(0,-1)&&console.error("minResolution must be <= maxResolution","minResolution",a,"maxResolution",i)),r&&v.searchParams.set("rendition_order",r),n&&v.searchParams.set("program_start_time",`${n}`),s&&v.searchParams.set("program_end_time",`${s}`),o&&v.searchParams.set("asset_start_time",`${o}`),l&&v.searchParams.set("asset_end_time",`${l}`),Object.entries(p).forEach(([E,y])=>{y!=null&&v.searchParams.set(E,y)})),v.toString()},sl=t=>{if(!t)return;let[e]=t.split("?");return e||void 0},ku=t=>{if(!t||!t.startsWith("https://stream."))return;let[e]=new URL(t).pathname.slice(1).split(/\.m3u8|\//);return e||void 0},fg=t=>{var e,i,a;return(e=t?.metadata)!=null&&e.video_id?t.metadata.video_id:yp(t)&&(a=(i=sl(t.playbackId))!=null?i:ku(t.src))!=null?a:t.src},mp=t=>{var e;return(e=ae.get(t))==null?void 0:e.error},Eg=t=>{var e;return(e=ae.get(t))==null?void 0:e.metadata},nd=t=>{var e,i;return(i=(e=ae.get(t))==null?void 0:e.streamType)!=null?i:Z.UNKNOWN},_g=t=>{var e,i;return(i=(e=ae.get(t))==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN},Su=t=>{var e,i;return(i=(e=ae.get(t))==null?void 0:e.seekable)!=null?i:t.seekable},bg=t=>{var e;let i=(e=ae.get(t))==null?void 0:e.liveEdgeStartOffset;if(typeof i!="number")return Number.NaN;let a=Su(t);return a.length?a.end(a.length-1)-i:Number.NaN},gg=t=>{var e;return(e=ae.get(t))==null?void 0:e.coreReference},wu=.034,yg=(t,e,i=wu)=>Math.abs(t-e)<=i,pp=(t,e,i=wu)=>t>e||yg(t,e,i),Tg=(t,e=wu)=>t.paused&&pp(t.currentTime,t.duration,e),vp=(t,e)=>{var i,a,r;if(!e||!t.buffered.length)return;if(t.readyState>2)return!1;let n=e.currentLevel>=0?(a=(i=e.levels)==null?void 0:i[e.currentLevel])==null?void 0:a.details:(r=e.levels.find(p=>!!p.details))==null?void 0:r.details;if(!n||n.live)return;let{fragments:s}=n;if(!(s!=null&&s.length))return;if(t.currentTime<t.duration-(n.targetduration+.5))return!1;let o=s[s.length-1];if(t.currentTime<=o.start)return!1;let l=o.start+o.duration/2,d=t.buffered.start(t.buffered.length-1),m=t.buffered.end(t.buffered.length-1);return l>d&&l<m},fp=(t,e)=>t.ended||t.loop?t.ended:e&&vp(t,e)?!0:Tg(t),Ep=(t,e,i)=>{_p(e,i,t);let{metadata:a={}}=t,{view_session_id:r=vg()}=a,n=fg(t);a.view_session_id=r,a.video_id=n,t.metadata=a;let s=h=>{var u;(u=e.mux)==null||u.emit("hb",{view_drm_type:h})};t.drmTypeCb=s,t.fallbackToWebkitFairplay=async()=>{var h;let u=!e.paused,v=e.currentTime;t.useWebkitFairplay=!0;let E=t.muxDataKeepSession;t.muxDataKeepSession=!0;let y=(h=ae.get(e))==null?void 0:h.coreReference;Ep(t,e,y),t.muxDataKeepSession=E,t.useWebkitFairplay=!1,u&&await e.play().then(()=>{e.currentTime=v}).catch(()=>{}),e.currentTime=v},ae.set(e,{retryCount:0});let o=Ag(t,e),l=Cb(t,e,o);t!=null&&t.muxDataKeepSession&&e!=null&&e.mux&&!e.mux.deleted?o&&e.mux.addHLSJS({hlsjs:o,Hls:o?F:void 0}):Cg(t,e,o),Dg(t,e,o),Ub(e),Hb(e);let d=Lb(t,e,o);Db(t,e,o),Mb(t,e,o);let m={engine:o,setAutoplay:d,setPreload:l},p=ae.get(e);return p&&(p.coreReference=m),m},_p=(t,e,i)=>{let a=e?.engine;t!=null&&t.mux&&!t.mux.deleted&&(i!=null&&i.muxDataKeepSession?a&&t.mux.removeHLSJS():(t.mux.destroy(),delete t.mux)),a&&(a.detachMedia(),a.destroy()),t&&(t.hasAttribute("src")&&(t.removeAttribute("src"),t.load()),t.removeEventListener("error",Ap),t.removeEventListener("error",sd),t.removeEventListener("durationchange",Tp),ae.delete(t),t.dispatchEvent(new Event("teardown")))};function bp(t,e){var i;let a=nl(t);if(a!==pi.M3U8)return!0;let r=!a||((i=e.canPlayType(a))!=null?i:!0),{preferPlayback:n}=t,s=n===Gt.MSE,o=n===Gt.NATIVE,l=hp&&(s||pg(e));return r&&(o||!l)}var Ag=(t,e)=>{let{debug:i,streamType:a,startTime:r=-1,metadata:n,preferCmcd:s,_hlsConfig:o={},maxAutoResolution:l,initialBandwidthEstimateKbps:d}=t,m=nl(t)===pi.M3U8,p=bp(t,e);if(m&&!p&&hp){let h={backBufferLength:30,renderTextTracksNatively:!1,liveDurationInfinity:!0,capLevelOnFPSDrop:!0,...d!=null?{abrEwmaDefaultEstimate:d*1e3}:{}},u=kg(a),v=Sg(t),E=[$r.QUERY,$r.HEADER].includes(s)?{useHeaders:s===$r.HEADER,sessionId:n?.view_session_id,contentId:n?.video_id}:void 0,y=Lg(t),g=new F({debug:i,startPosition:r,cmcd:E,xhrSetup:(T,_)=>{var k,D;if(s&&s!==$r.QUERY)return;let L=_u(_);if(!L.searchParams.has("CMCD"))return;let w=((D=(k=L.searchParams.get("CMCD"))==null?void 0:k.split(","))!=null?D:[]).filter($=>$.startsWith("sid")||$.startsWith("cid")).join(",");L.searchParams.set("CMCD",w),T.open("GET",L)},...h,...y,...u,...v,...o});return y.capLevelController===ad&&l!==void 0&&ad.setMaxAutoResolution(g,l),g.on(F.Events.MANIFEST_PARSED,async function(T,_){var k,D;let L=(k=_.sessionData)==null?void 0:k["com.apple.hls.chapters"];(L!=null&&L.URI||L!=null&&L.VALUE.toLocaleLowerCase().startsWith("http"))&&Tu((D=L?.URI)!=null?D:L?.VALUE,e)}),g}},kg=t=>t===Z.LIVE?{backBufferLength:8}:{},Sg=t=>{let{tokens:{drm:e}={},playbackId:i,drmTypeCb:a}=t,r=sl(i);return!e||!r?{}:{emeEnabled:!0,drmSystems:{"com.apple.fps":{licenseUrl:cs(t,"fairplay"),serverCertificateUrl:gp(t,"fairplay")},"com.widevine.alpha":{licenseUrl:cs(t,"widevine")},"com.microsoft.playready":{licenseUrl:cs(t,"playready")}},requestMediaKeySystemAccessFunc:(n,s)=>(n==="com.widevine.alpha"&&(s=[...s.map(o=>{var l;let d=(l=o.videoCapabilities)==null?void 0:l.map(m=>({...m,robustness:"HW_SECURE_ALL"}));return{...o,videoCapabilities:d}}),...s]),navigator.requestMediaKeySystemAccess(n,s).then(o=>{let l=tg(n);return a?.(l),o}))}},wg=async t=>{let e=await fetch(t);return e.status!==200?Promise.reject(e):await e.arrayBuffer()},Ig=async(t,e)=>{let i=await fetch(e,{method:"POST",headers:{"Content-type":"application/octet-stream"},body:t});if(i.status!==200)return Promise.reject(i);let a=await i.arrayBuffer();return new Uint8Array(a)},Rg=(t,e)=>{let i={mediaEl:e,getAppCertificate:()=>wg(gp(t,"fairplay")).catch(a=>{if(a instanceof Response){let r=So(a,j.DRM,t);return console.error("mediaError",r?.message,r?.context),r?Promise.reject(r):Promise.reject(new Error("Unexpected error in app cert request"))}return Promise.reject(a)}),getLicenseKey:a=>Ig(a,cs(t,"fairplay")).catch(r=>{if(r instanceof Response){let n=So(r,j.DRM,t);return console.error("mediaError",n?.message,n?.context),n?Promise.reject(n):Promise.reject(new Error("Unexpected error in license key request"))}return Promise.reject(r)}),saveAndDispatchError:ui,drmTypeCb:()=>{var a;(a=t.drmTypeCb)==null||a.call(t,us.FAIRPLAY)}};if(t.useWebkitFairplay)Qb(i);else{let a={fallbackToWebkitFairplay:async()=>{var n;await r(),(n=t.fallbackToWebkitFairplay)==null||n.call(t)},...i},r=Jb(a)}},cs=({playbackId:t,tokens:{drm:e}={},customDomain:i=vi},a)=>{let r=sl(t);return`https://license.${i.toLocaleLowerCase().endsWith(vi)?i:vi}/license/${a}/${r}?token=${e}`},gp=({playbackId:t,tokens:{drm:e}={},customDomain:i=vi},a)=>{let r=sl(t);return`https://license.${i.toLocaleLowerCase().endsWith(vi)?i:vi}/appcert/${a}/${r}?token=${e}`},yp=({playbackId:t,src:e,customDomain:i})=>{if(t)return!0;if(typeof e!="string")return!1;let a=window?.location.href,r=new URL(e,a).hostname.toLocaleLowerCase();return r.includes(vi)||!!i&&r.includes(i.toLocaleLowerCase())},Lg=(t,e)=>{let i={};return i.capLevelToPlayerSize=t.capRenditionToPlayerSize,i.capLevelToPlayerSize==null?(i.capLevelController=ad,i.capLevelToPlayerSize=!0):i.capLevelController=Vf,i},Cg=(t,e,i)=>{var a;let{envKey:r,disableTracking:n,muxDataSDK:s=vu,muxDataSDKOptions:o={}}=t,l=yp(t);if(!n&&(r||l)){let{playerInitTime:d,playerSoftwareName:m,playerSoftwareVersion:p,beaconCollectionDomain:h,debug:u,disableCookies:v}=t,E={...t.metadata,video_title:((a=t?.metadata)==null?void 0:a.video_title)||void 0},y=g=>typeof g.player_error_code=="string"?!1:typeof t.errorTranslator=="function"?t.errorTranslator(g):g;s.monitor(e,{debug:u,beaconCollectionDomain:h,hlsjs:i,Hls:i?F:void 0,automaticErrorTracking:!1,errorTranslator:y,disableCookies:v,...o,data:{...r?{env_key:r}:{},player_software_name:m,player_software:m,player_software_version:p,player_init_time:d,...E}})}},Dg=(t,e,i)=>{var a,r,n;let s=bp(t,e),{src:o,customDomain:l=vi}=t,d=()=>{e.ended||t.disablePseudoEnded||!fp(e,i)||(vp(e,i)?e.currentTime=e.buffered.end(e.buffered.length-1):e.dispatchEvent(new Event("ended")))},m,p,h=()=>{let u=Su(e),v,E;u.length>0&&(v=u.start(0),E=u.end(0)),(p!==E||m!==v)&&e.dispatchEvent(new CustomEvent("seekablechange",{composed:!0})),m=v,p=E};if(he(e,"durationchange",h),e&&s){let u=nl(t);if(typeof o=="string"){if(o.endsWith(".mp4")&&o.includes(l)){let y=ku(o),g=new URL(`https://stream.${l}/${y}/metadata.json`);Tu(g.toString(),e)}let v=()=>{if(nd(e)!==Z.LIVE||Number.isFinite(e.duration))return;let y=setInterval(h,1e3);e.addEventListener("teardown",()=>{clearInterval(y)},{once:!0}),he(e,"durationchange",()=>{Number.isFinite(e.duration)&&clearInterval(y)})},E=async()=>lg(o,e,u).then(v).catch(y=>{if(y instanceof Response){let g=So(y,j.VIDEO,t);if(g){ui(e,g);return}}});if(e.preload==="none"){let y=()=>{E(),e.removeEventListener("loadedmetadata",g)},g=()=>{E(),e.removeEventListener("play",y)};he(e,"play",y,{once:!0}),he(e,"loadedmetadata",g,{once:!0})}else E();(a=t.tokens)!=null&&a.drm?Rg(t,e):he(e,"encrypted",()=>{let y=x("Attempting to play DRM-protected content without providing a DRM token."),g=new R(y,R.MEDIA_ERR_ENCRYPTED,!0);g.errorCategory=j.DRM,g.muxCode=N.ENCRYPTED_MISSING_TOKEN,ui(e,g)},{once:!0}),e.setAttribute("src",o),t.startTime&&(((r=ae.get(e))!=null?r:{}).startTime=t.startTime,e.addEventListener("durationchange",Tp,{once:!0}))}else e.removeAttribute("src");e.addEventListener("error",Ap),e.addEventListener("error",sd),e.addEventListener("emptied",()=>{e.querySelectorAll("track[data-removeondestroy]").forEach(v=>{v.remove()})},{once:!0}),he(e,"pause",d),he(e,"seeked",d),he(e,"play",()=>{e.ended||pp(e.currentTime,e.duration)&&(e.currentTime=e.seekable.length?e.seekable.start(0):0)})}else if(i&&o){i.once(F.Events.LEVEL_LOADED,(E,y)=>{ug(y.details,e,i),h(),nd(e)===Z.LIVE&&!Number.isFinite(e.duration)&&(i.on(F.Events.LEVEL_UPDATED,h),he(e,"durationchange",()=>{Number.isFinite(e.duration)&&i.off(F.Events.LEVELS_UPDATED,h)}))});let u=(n=t.maxReconnectRetries)!=null?n:0,v=u>0?eg({hls:i,mediaEl:e,src:o,muxMediaState:ae,saveAndDispatchError:ui,maxRetries:u}):void 0;i.on(F.Events.ERROR,(E,y)=>{var g,T;let _=Mg(y,t);if(_.muxCode===N.NETWORK_NOT_READY){let k=(g=ae.get(e))!=null?g:{},D=(T=k.retryCount)!=null?T:0;if(D<6){let L=D===0?5e3:6e4,w=new R(`Retrying in ${L/1e3} seconds...`,_.code,_.fatal);Object.assign(w,_),ui(e,w);let $=setTimeout(()=>{k.retryCount=D+1,y.details==="manifestLoadError"&&y.url&&i.loadSource(y.url)},L);e.addEventListener("teardown",()=>clearTimeout($),{once:!0});return}else{k.retryCount=0;let L=new R("Network error, try reloading.",_.code,_.fatal);Object.assign(L,_),L.reload=!0,ui(e,L);return}}v!=null&&v.handleHlsError(y,_)||ui(e,_)}),i.on(F.Events.MANIFEST_LOADED,()=>{v?.onManifestLoaded();let E=ae.get(e);E!=null&&E.networkError||E&&E.error&&(E.error=null,E.retryCount=0,e.dispatchEvent(new Event("emptied")),e.dispatchEvent(new Event("loadstart")))}),e.addEventListener("error",sd),he(e,"waiting",d),xb(t,i),Ob(e,i),i.attachMedia(e)}else console.error("It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software.")};function Tp(t){var e;let i=t.target,a=(e=ae.get(i))==null?void 0:e.startTime;if(a&&_b(i.seekable,i.duration,a)){let r=i.preload==="auto";r&&(i.preload="none"),i.currentTime=a,r&&(i.preload="auto")}}async function Ap(t){if(!t.isTrusted)return;t.stopImmediatePropagation();let e=t.target;if(!(e!=null&&e.error))return;let{message:i,code:a}=e.error,r=new R(i,a);if(e.src&&a===R.MEDIA_ERR_SRC_NOT_SUPPORTED&&e.readyState===HTMLMediaElement.HAVE_NOTHING){setTimeout(()=>{var n;let s=(n=mp(e))!=null?n:e.error;s?.code===R.MEDIA_ERR_SRC_NOT_SUPPORTED&&ui(e,r)},500);return}if(e.src&&(a!==R.MEDIA_ERR_DECODE||a!==void 0))try{let{status:n}=await fetch(e.src);r.data={response:{code:n}}}catch{}ui(e,r)}function ui(t,e){var i;e.fatal&&(((i=ae.get(t))!=null?i:{}).error=e,t.dispatchEvent(new CustomEvent("error",{detail:e})))}function sd(t){var e,i;if(!(t instanceof CustomEvent)||!(t.detail instanceof R))return;let a=t.target,r=t.detail;!r||!r.fatal||(((e=ae.get(a))!=null?e:{}).error=r,(i=a.mux)==null||i.emit("error",{player_error_code:r.code,player_error_message:r.message,player_error_context:r.context}))}var Mg=(t,e)=>{var i,a,r;t.fatal?console.error("getErrorFromHlsErrorData()",t):e.debug&&console.warn("getErrorFromHlsErrorData() (non-fatal)",t);let n={[F.ErrorTypes.NETWORK_ERROR]:R.MEDIA_ERR_NETWORK,[F.ErrorTypes.MEDIA_ERROR]:R.MEDIA_ERR_DECODE,[F.ErrorTypes.KEY_SYSTEM_ERROR]:R.MEDIA_ERR_ENCRYPTED},s=m=>[F.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,F.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(m.details)?R.MEDIA_ERR_NETWORK:n[m.type],o=m=>{if(m.type===F.ErrorTypes.KEY_SYSTEM_ERROR)return j.DRM;if(m.type===F.ErrorTypes.NETWORK_ERROR)return j.VIDEO},l,d=s(t);if(d===R.MEDIA_ERR_NETWORK&&t.response){let m=(i=o(t))!=null?i:j.VIDEO;l=(a=So(t.response,m,e,t.fatal))!=null?a:new R("",d,t.fatal)}else if(d===R.MEDIA_ERR_ENCRYPTED)if(t.details===F.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE){let m=x("Attempting to play DRM-protected content without providing a DRM token.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,t.fatal),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_MISSING_TOKEN}else if(t.details===F.ErrorDetails.KEY_SYSTEM_NO_ACCESS){let m=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,t.fatal),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM}else if(t.details===F.ErrorDetails.KEY_SYSTEM_NO_SESSION){let m=x("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,!0),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_GENERATE_REQUEST_FAILED}else if(t.details===F.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED){let m=x("Failed to update DRM license. This may be an issue with the player or your protected content.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,t.fatal),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_UPDATE_LICENSE_FAILED}else if(t.details===F.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED){let m=x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,t.fatal),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_UPDATE_SERVER_CERT_FAILED}else if(t.details===F.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR){let m=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, updating your browser, or playing in another browser.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,t.fatal),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_CDM_ERROR}else if(t.details===F.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED){let m=x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");l=new R(m,R.MEDIA_ERR_ENCRYPTED,!1),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_OUTPUT_RESTRICTED}else l=new R(t.error.message,R.MEDIA_ERR_ENCRYPTED,t.fatal),l.errorCategory=j.DRM,l.muxCode=N.ENCRYPTED_ERROR;else l=new R("",d,t.fatal);return l.context||(l.context=`${t.url?`url: ${t.url}
`:""}${t.response&&(t.response.code||t.response.text)?`response: ${t.response.code}, ${t.response.text}
`:""}${t.reason?`failure reason: ${t.reason}
`:""}${t.level?`level: ${t.level}
`:""}${t.parent?`parent stream controller: ${t.parent}
`:""}${t.buffer?`buffer length: ${t.buffer}
`:""}${t.error?`error: ${t.error}
`:""}${t.event?`event: ${t.event}
`:""}${t.err?`error message: ${(r=t.err)==null?void 0:r.message}
`:""}`),l.data=t,l},kp=t=>{throw TypeError(t)},Iu=(t,e,i)=>e.has(t)||kp("Cannot "+i),be=(t,e,i)=>(Iu(t,e,"read from private field"),i?i.call(t):e.get(t)),it=(t,e,i)=>e.has(t)?kp("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),yt=(t,e,i,a)=>(Iu(t,e,"write to private field"),e.set(t,i),i),qn=(t,e,i)=>(Iu(t,e,"access private method"),i),xg=()=>{try{return"0.31.2"}catch{}return"UNKNOWN"},Og=xg(),Ng=()=>Og,Pg=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,f={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",MAX_RECONNECT_RETRIES:"max-reconnect-retries",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",MAX_AUTO_RESOLUTION:"max-auto-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo",CAP_RENDITION_TO_PLAYER_SIZE:"cap-rendition-to-player-size",INITIAL_BANDWIDTH_ESTIMATE_KBPS:"initial-bandwidth-estimate-kbps",INITIAL_ESTIMATE_SEGMENTS:"initial-estimate-segments",MIN_PRELOAD_SEGMENTS:"min-preload-segments"},Ug=Object.values(f),fh=Ng(),Eh="mux-video",Br,hs,Wr,ms,ps,vs,fs,Es,Fr,_s,nt,Zi,bs,Kr,$g=class extends Kn{constructor(){super(),it(this,nt),it(this,Br),it(this,hs),it(this,Wr,{}),it(this,ms,{}),it(this,ps),it(this,vs),it(this,fs),it(this,Es),it(this,Fr,""),it(this,_s,e=>{var i;let a=Eg(this.nativeEl),r=(i=this.metadata)!=null?i:{};this.metadata={...a,...r},a?.["com.mux.video.branding"]==="mux-free-plan"&&(yt(this,Fr,"default"),this.updateLogo())}),it(this,bs),yt(this,hs,Au())}static get NAME(){return Eh}static get VERSION(){return fh}static get observedAttributes(){var e;return[...Ug,...(e=Kn.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?Pg:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${Kn.getTemplateHTML(e)}
      <style>
        :host {
          position: relative;
        }
        slot[name="logo"] {
          display: flex;
          justify-content: end;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        slot[name="logo"]:has([part="logo"]) {
          opacity: 1;
        }
        slot[name="logo"] [part="logo"] {
          width: 5rem;
          pointer-events: none;
          user-select: none;
        }
      </style>
      <slot name="logo">
        ${this.getLogoHTML((i=e[f.LOGO])!=null?i:"")}
      </slot>
    `}get preferCmcd(){var e;return(e=this.getAttribute(f.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?ko.includes(e)?this.setAttribute(f.PREFER_CMCD,e):console.warn(`Invalid value for preferCmcd. Must be one of ${ko.join()}`):this.removeAttribute(f.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(f.PLAYER_INIT_TIME)?+this.getAttribute(f.PLAYER_INIT_TIME):be(this,hs)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(f.PLAYER_INIT_TIME):this.setAttribute(f.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=be(this,fs))!=null?e:Eh}set playerSoftwareName(e){yt(this,fs,e)}get playerSoftwareVersion(){var e;return(e=be(this,vs))!=null?e:fh}set playerSoftwareVersion(e){yt(this,vs,e)}get _hls(){var e;return(e=be(this,nt,Zi))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=mp(this.nativeEl))!=null?e:null}get errorTranslator(){return be(this,Es)}set errorTranslator(e){yt(this,Es,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(f.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(f.TYPE,e):this.removeAttribute(f.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(f.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(f.DEBUG,""):this.removeAttribute(f.DEBUG))}get disableTracking(){return this.hasAttribute(f.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(f.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(f.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(f.DISABLE_COOKIES,""):this.removeAttribute(f.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(f.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(f.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(f.DISABLE_PSEUDO_ENDED))}get maxReconnectRetries(){let e=this.getAttribute(f.MAX_RECONNECT_RETRIES);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set maxReconnectRetries(e){e!==this.maxReconnectRetries&&(e==null?this.removeAttribute(f.MAX_RECONNECT_RETRIES):this.setAttribute(f.MAX_RECONNECT_RETRIES,`${e}`))}get startTime(){let e=this.getAttribute(f.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(f.START_TIME):this.setAttribute(f.START_TIME,`${e}`))}get initialBandwidthEstimateKbps(){let e=this.getAttribute(f.INITIAL_BANDWIDTH_ESTIMATE_KBPS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set initialBandwidthEstimateKbps(e){e!==this.initialBandwidthEstimateKbps&&(e==null?this.removeAttribute(f.INITIAL_BANDWIDTH_ESTIMATE_KBPS):this.setAttribute(f.INITIAL_BANDWIDTH_ESTIMATE_KBPS,`${e}`))}get initialEstimateSegments(){let e=this.getAttribute(f.INITIAL_ESTIMATE_SEGMENTS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set initialEstimateSegments(e){e!==this.initialEstimateSegments&&(e==null?this.removeAttribute(f.INITIAL_ESTIMATE_SEGMENTS):this.setAttribute(f.INITIAL_ESTIMATE_SEGMENTS,`${e}`))}get minPreloadSegments(){let e=this.getAttribute(f.MIN_PRELOAD_SEGMENTS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set minPreloadSegments(e){e!==this.minPreloadSegments&&(e==null?this.removeAttribute(f.MIN_PRELOAD_SEGMENTS):this.setAttribute(f.MIN_PRELOAD_SEGMENTS,`${e}`))}get playbackId(){var e;return this.hasAttribute(f.PLAYBACK_ID)?this.getAttribute(f.PLAYBACK_ID):(e=ku(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(f.PLAYBACK_ID,e):this.removeAttribute(f.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(f.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(f.MAX_RESOLUTION,e):this.removeAttribute(f.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(f.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(f.MIN_RESOLUTION,e):this.removeAttribute(f.MIN_RESOLUTION))}get maxAutoResolution(){var e;return(e=this.getAttribute(f.MAX_AUTO_RESOLUTION))!=null?e:void 0}set maxAutoResolution(e){e==null?this.removeAttribute(f.MAX_AUTO_RESOLUTION):this.setAttribute(f.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return(e=this.getAttribute(f.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(f.RENDITION_ORDER,e):this.removeAttribute(f.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(f.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(f.PROGRAM_START_TIME):this.setAttribute(f.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(f.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(f.PROGRAM_END_TIME):this.setAttribute(f.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(f.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(f.ASSET_START_TIME):this.setAttribute(f.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(f.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(f.ASSET_END_TIME):this.setAttribute(f.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(f.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(f.CUSTOM_DOMAIN,e):this.removeAttribute(f.CUSTOM_DOMAIN))}get capRenditionToPlayerSize(){var e;return((e=this._hlsConfig)==null?void 0:e.capLevelToPlayerSize)!=null?this._hlsConfig.capLevelToPlayerSize:be(this,bs)}set capRenditionToPlayerSize(e){yt(this,bs,e)}get drmToken(){var e;return(e=this.getAttribute(f.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(f.DRM_TOKEN,e):this.removeAttribute(f.DRM_TOKEN))}get playbackToken(){var e,i,a,r;if(this.hasAttribute(f.PLAYBACK_TOKEN))return(e=this.getAttribute(f.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(f.PLAYBACK_ID)){let[,n]=Eu((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(n).get("token"))!=null?a:void 0}if(this.src)return(r=new URLSearchParams(this.src).get("token"))!=null?r:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(f.PLAYBACK_TOKEN,e):this.removeAttribute(f.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(f.PLAYBACK_TOKEN),i=this.getAttribute(f.DRM_TOKEN);return{...be(this,ms),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){yt(this,ms,e??{})}get ended(){return fp(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(f.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(f.ENV_KEY,e):this.removeAttribute(f.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(f.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(f.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(f.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(f.STREAM_TYPE))!=null?e:nd(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(f.STREAM_TYPE,e):this.removeAttribute(f.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(f.TARGET_LIVE_WINDOW)?+this.getAttribute(f.TARGET_LIVE_WINDOW):_g(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(f.TARGET_LIVE_WINDOW):this.setAttribute(f.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(f.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,r=(e=this.nativeEl.seekable.end(0))!=null?e:0,n=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(n,r-a)}return bg(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(f.LIVE_EDGE_OFFSET))return+this.getAttribute(f.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(f.LIVE_EDGE_OFFSET):this.setAttribute(f.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return Su(this.nativeEl)}async addCuePoints(e){return this.nativeEl.currentSrc||console.warn("addCuePoints() was called before the media element has loaded. Wait for the loadstart event before calling addCuePoints()."),sp(this.nativeEl,e)}get activeCuePoint(){return op(this.nativeEl)}get cuePoints(){return Pb(this.nativeEl)}async addChapters(e){return this.nativeEl.currentSrc||console.warn("addChapters() was called before the media element has loaded. Wait for the loadstart event before calling addChapters()."),dp(this.nativeEl,e)}get activeChapter(){return up(this.nativeEl)}get chapters(){return $b(this.nativeEl)}getStartDate(){return Bb(this.nativeEl,this._hls)}get currentPdt(){return Wb(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(f.PREFER_PLAYBACK);if(e===Gt.MSE||e===Gt.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===Gt.MSE||e===Gt.NATIVE?this.setAttribute(f.PREFER_PLAYBACK,e):this.removeAttribute(f.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![f.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...be(this,Wr)}}set metadata(e){yt(this,Wr,e??{}),this.mux&&this.mux.emit("hb",be(this,Wr))}get _hlsConfig(){return be(this,ps)}set _hlsConfig(e){yt(this,ps,e)}get logo(){var e;return(e=this.getAttribute(f.LOGO))!=null?e:be(this,Fr)}set logo(e){e?this.setAttribute(f.LOGO,e):this.removeAttribute(f.LOGO)}load(){Ep(this,this.nativeEl,be(this,nt,Zi))}unload(){_p(this.nativeEl,be(this,nt,Zi),this)}attributeChangedCallback(e,i,a){var r,n;switch(Kn.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case f.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case f.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let s=!!i,o=!!a;!s&&o?qn(this,nt,Kr).call(this):s&&!o?this.unload():s&&o&&(this.unload(),qn(this,nt,Kr).call(this));break}case"autoplay":if(a===i)break;(r=be(this,nt,Zi))==null||r.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(n=be(this,nt,Zi))==null||n.setPreload(a);break;case f.PLAYBACK_ID:case f.CUSTOM_DOMAIN:case f.MAX_RESOLUTION:case f.MIN_RESOLUTION:case f.RENDITION_ORDER:case f.PROGRAM_START_TIME:case f.PROGRAM_END_TIME:case f.ASSET_START_TIME:case f.ASSET_END_TIME:case f.PLAYBACK_TOKEN:this.src=rd(this);break;case f.DEBUG:{let s=this.debug;this.mux&&console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."),this._hls&&(this._hls.config.debug=s);break}case f.METADATA_URL:a&&fetch(a).then(s=>s.json()).then(s=>this.metadata=s).catch(()=>console.error(`Unable to load or parse metadata JSON from metadata-url ${a}!`));break;case f.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case f.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case f.LOGO:(a==null||a!==i)&&this.updateLogo();break;case f.DISABLE_TRACKING:{if(a==null||a!==i){let s=this.currentTime,o=this.paused;this.unload(),qn(this,nt,Kr).call(this).then(()=>{this.currentTime=s,o||this.play()})}break}case f.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(s=>{s.trim().startsWith("muxData")&&(document.cookie=s.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}case f.CAP_RENDITION_TO_PLAYER_SIZE:(a==null||a!==i)&&(this.capRenditionToPlayerSize=a!=null?!0:void 0)}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(be(this,Fr)||this.logo);e.innerHTML=i}connectedCallback(){var e,i;(e=super.connectedCallback)==null||e.call(this),(i=this.nativeEl)==null||i.addEventListener("muxmetadata",be(this,_s)),this.nativeEl&&this.src&&!be(this,nt,Zi)&&qn(this,nt,Kr).call(this)}disconnectedCallback(){var e,i;(e=this.nativeEl)==null||e.removeEventListener("muxmetadata",be(this,_s)),this.unload(),(i=super.disconnectedCallback)==null||i.call(this)}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}};Br=new WeakMap,hs=new WeakMap,Wr=new WeakMap,ms=new WeakMap,ps=new WeakMap,vs=new WeakMap,fs=new WeakMap,Es=new WeakMap,Fr=new WeakMap,_s=new WeakMap,nt=new WeakSet,Zi=function(){return gg(this.nativeEl)},bs=new WeakMap,Kr=async function(){be(this,Br)||(await yt(this,Br,Promise.resolve()),yt(this,Br,null),this.load())};const Hi=new WeakMap;class xl extends Error{}class Hg extends Error{}const Bg=["application/x-mpegURL","application/vnd.apple.mpegurl","audio/mpegurl"],Wg=globalThis.WeakRef?class extends Set{add(t){super.add(new WeakRef(t))}forEach(t){super.forEach(e=>{const i=e.deref();i&&t(i)})}}:Set;function Fg(t){globalThis.chrome?.cast?.isAvailable?globalThis.cast?.framework?t():customElements.whenDefined("google-cast-button").then(t):globalThis.__onGCastApiAvailable=()=>{customElements.whenDefined("google-cast-button").then(t)}}function Kg(){return globalThis.chrome}function Vg(){const t="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";if(globalThis.chrome?.cast||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.src=t,document.head.append(e)}function Pi(){return globalThis.cast?.framework?.CastContext.getInstance()}function Ru(){return Pi()?.getCurrentSession()}function Lu(){return Ru()?.getSessionObj().media[0]}function qg(t){return new Promise((e,i)=>{Lu().editTracksInfo(t,e,i)})}function Yg(t){return new Promise((e,i)=>{Lu().getStatus(t,e,i)})}function _h(t){return Pi().setOptions({...Sp(),...t})}function Sp(){return{receiverApplicationId:"CC1AD845",autoJoinPolicy:"origin_scoped",androidReceiverCompatible:!1,language:"en-US",resumeSavedSession:!0}}function bh(t){if(!t)return;const e=/\.([a-zA-Z0-9]+)(?:\?.*)?$/,i=t.match(e);return i?i[1]:null}function Gg(t){for(const e of t.split(`
`)){const i=e.trim();if(i.startsWith("#EXT-X-MEDIA")&&/TYPE=AUDIO/i.test(i)){const a=i.match(/URI="([^"]+)"/i);if(a)return a[1]}}}function zg(t){const e=t.split(`
`),i=[];for(let a=0;a<e.length;a++)if(e[a].trim().startsWith("#EXT-X-STREAM-INF")){const n=e[a+1]?e[a+1].trim():"";n&&!n.startsWith("#")&&i.push(n)}return i}function gh(t){return t.split(`
`).find(a=>!a.trim().startsWith("#")&&a.trim()!=="")?.trim()}async function Qg(t){if(!t)return!1;if(/\.m3u8?(\?.*)?$/i.test(t))return!0;if(t.startsWith("blob:"))return!1;try{const i=(await fetch(t,{method:"HEAD"})).headers.get("Content-Type");return Bg.some(a=>i===a)}catch(e){return console.error("Error while trying to get the Content-Type of the manifest",e),!1}}async function jg(t){if(!t||t.startsWith("blob:"))return{videoFormat:void 0,audioFormat:void 0};try{const e=await(await fetch(t)).text();let i=e;const a=zg(e);if(a.length>0){const l=new URL(a[0],t).toString();i=await(await fetch(l)).text()}const r=gh(i),n=bh(r),s=Gg(e);let o=n;if(s)try{const l=new URL(s,t).toString(),d=await(await fetch(l)).text(),m=gh(d);o=bh(m)??n}catch(l){console.error("Error while trying to parse the audio rendition playlist",l)}return{videoFormat:n,audioFormat:o}}catch(e){return console.error("Error while trying to parse the manifest playlist",e),{videoFormat:void 0,audioFormat:void 0}}}const gs=new Wg,ti=new WeakSet;let ke;Fg(()=>{if(!globalThis.chrome?.cast?.isAvailable){console.debug("chrome.cast.isAvailable",globalThis.chrome?.cast?.isAvailable);return}ke||(ke=cast.framework,Pi().addEventListener(ke.CastContextEventType.CAST_STATE_CHANGED,t=>{gs.forEach(e=>Hi.get(e).onCastStateChanged?.(t))}),Pi().addEventListener(ke.CastContextEventType.SESSION_STATE_CHANGED,t=>{gs.forEach(e=>Hi.get(e).onSessionStateChanged?.(t))}),gs.forEach(t=>Hi.get(t).init?.()))});let yh=0;class Zg extends EventTarget{#t;#r;#i;#a;#e="disconnected";#n=!1;#o=new Set;#h=new WeakMap;#l=()=>this.#c();constructor(e){super(),this.#t=e,gs.add(this),Hi.set(this,{init:()=>this.#u(),onCastStateChanged:()=>this.#d(),onSessionStateChanged:()=>this.#v(),getCastPlayer:()=>this.#s}),this.#u()}destroy(){this.#t?.textTracks?.removeEventListener("change",this.#l),this.#a&&this.#i?.controller&&Object.entries(this.#a).forEach(([e,i])=>{this.#i.controller.removeEventListener(e,i)}),this.#t&&ti.delete(this.#t),this.#r=!1}get#s(){if(ti.has(this.#t))return this.#i}get state(){return this.#e}async watchAvailability(e){if(this.#t.disableRemotePlayback)throw new xl("disableRemotePlayback attribute is present.");return this.#h.set(e,++yh),this.#o.add(e),queueMicrotask(()=>e(this.#p())),yh}async cancelWatchAvailability(e){if(this.#t.disableRemotePlayback)throw new xl("disableRemotePlayback attribute is present.");e?this.#o.delete(e):this.#o.clear()}async prompt(){if(this.#t.disableRemotePlayback)throw new xl("disableRemotePlayback attribute is present.");if(!globalThis.chrome?.cast?.isAvailable)throw new Hg("The RemotePlayback API is disabled on this platform.");const e=ti.has(this.#t);ti.add(this.#t),_h(this.#t.castOptions),Object.entries(this.#a).forEach(([i,a])=>{this.#i.controller.addEventListener(i,a)});try{await Pi().requestSession()}catch(i){if(e||ti.delete(this.#t),i==="cancel")return;throw new Error(i)}Hi.get(this.#t)?.loadOnPrompt?.()}#m(){ti.has(this.#t)&&(Object.entries(this.#a).forEach(([e,i])=>{this.#i.controller.removeEventListener(e,i)}),ti.delete(this.#t),this.#t.muted=this.#i.isMuted,this.#t.currentTime=this.#i.savedPlayerState.currentTime,this.#i.savedPlayerState.isPaused===!1&&this.#t.play())}#p(){const e=Pi()?.getCastState();return e&&e!=="NO_DEVICES_AVAILABLE"}#d(){const e=Pi().getCastState();if(ti.has(this.#t)&&e==="CONNECTING"&&(this.#e="connecting",this.dispatchEvent(new Event("connecting"))),!this.#n&&e?.includes("CONNECT")){this.#n=!0;for(let i of this.#o)i(!0)}else if(this.#n&&(!e||e==="NO_DEVICES_AVAILABLE")){this.#n=!1;for(let i of this.#o)i(!1)}}async#v(){const{SESSION_RESUMED:e}=ke.SessionState;if(Pi().getSessionState()===e&&this.#t.castSrc===Lu()?.media.contentId){ti.add(this.#t),Object.entries(this.#a).forEach(([i,a])=>{this.#i.controller.addEventListener(i,a)});try{await Yg(new chrome.cast.media.GetStatusRequest)}catch(i){console.error(i)}this.#a[ke.RemotePlayerEventType.IS_PAUSED_CHANGED](),this.#a[ke.RemotePlayerEventType.PLAYER_STATE_CHANGED]()}}#u(){!ke||this.#r||(this.#r=!0,_h(this.#t.castOptions),this.#t.textTracks.addEventListener("change",this.#l),this.#d(),this.#i=new ke.RemotePlayer,new ke.RemotePlayerController(this.#i),this.#a={[ke.RemotePlayerEventType.IS_CONNECTED_CHANGED]:({value:e})=>{e===!0?(this.#e="connected",this.dispatchEvent(new Event("connect"))):(this.#m(),this.#e="disconnected",this.dispatchEvent(new Event("disconnect")))},[ke.RemotePlayerEventType.DURATION_CHANGED]:()=>{this.#t.dispatchEvent(new Event("durationchange"))},[ke.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]:()=>{this.#t.dispatchEvent(new Event("volumechange"))},[ke.RemotePlayerEventType.IS_MUTED_CHANGED]:()=>{this.#t.dispatchEvent(new Event("volumechange"))},[ke.RemotePlayerEventType.CURRENT_TIME_CHANGED]:()=>{this.#s?.isMediaLoaded&&this.#t.dispatchEvent(new Event("timeupdate"))},[ke.RemotePlayerEventType.VIDEO_INFO_CHANGED]:()=>{this.#t.dispatchEvent(new Event("resize"))},[ke.RemotePlayerEventType.IS_PAUSED_CHANGED]:()=>{this.#t.dispatchEvent(new Event(this.paused?"pause":"play"))},[ke.RemotePlayerEventType.PLAYER_STATE_CHANGED]:()=>{this.#s?.playerState!==chrome.cast.media.PlayerState.PAUSED&&this.#t.dispatchEvent(new Event({[chrome.cast.media.PlayerState.PLAYING]:"playing",[chrome.cast.media.PlayerState.BUFFERING]:"waiting",[chrome.cast.media.PlayerState.IDLE]:"emptied"}[this.#s?.playerState]))},[ke.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]:async()=>{this.#s?.isMediaLoaded&&(await Promise.resolve(),this.#f())}})}#f(){this.#c()}async#c(){if(!this.#s)return;const i=(this.#i.mediaInfo?.tracks??[]).filter(({type:p})=>p===chrome.cast.media.TrackType.TEXT),a=[...this.#t.textTracks].filter(({kind:p})=>p==="subtitles"||p==="captions"),r=i.map(({language:p,name:h,trackId:u})=>{const{mode:v}=a.find(E=>E.language===p&&E.label===h)??{};return v?{mode:v,trackId:u}:!1}).filter(Boolean),s=r.filter(({mode:p})=>p!=="showing").map(({trackId:p})=>p),o=r.find(({mode:p})=>p==="showing"),l=Ru()?.getSessionObj().media[0]?.activeTrackIds??[];let d=l;if(l.length&&(d=d.filter(p=>!s.includes(p))),o?.trackId&&(d=[...d,o.trackId]),d=[...new Set(d)],!((p,h)=>p.length===h.length&&p.every(u=>h.includes(u)))(l,d))try{const p=new chrome.cast.media.EditTracksInfoRequest(d);await qg(p)}catch(p){console.error(p)}}}const Xg=t=>class extends t{static observedAttributes=[...t.observedAttributes??[],"cast-src","cast-content-type","cast-stream-type","cast-receiver"];#t={paused:!1};#r=Sp();#i;#a;get remote(){return this.#a?this.#a:Kg()?this.isConnected?(this.disableRemotePlayback||Vg(),Hi.set(this,{loadOnPrompt:()=>this.#n()}),this.#a=new Zg(this)):void 0:super.remote}get#e(){return Hi.get(this.#a)?.getCastPlayer?.()}disconnectedCallback(){this.#a?.destroy(),this.#a=null,Hi.delete(this),super.disconnectedCallback?.()}attributeChangedCallback(i,a,r){if(super.attributeChangedCallback(i,a,r),i==="cast-receiver"&&r){this.#r.receiverApplicationId=r;return}if(this.#e)switch(i){case"cast-stream-type":case"cast-src":this.load();break}}async#n(){this.#t.paused=super.paused,super.pause(),this.muted=super.muted;try{await this.load()}catch(i){console.error(i)}}async load(){if(!this.#e)return super.load();const i=new chrome.cast.media.MediaInfo(this.castSrc,this.castContentType);i.customData=this.castCustomData;const a=[...this.querySelectorAll("track")].filter(({kind:l,src:d})=>d&&(l==="subtitles"||l==="captions")),r=[];let n=0;if(a.length&&(i.tracks=a.map(l=>{const d=++n;r.length===0&&l.track.mode==="showing"&&r.push(d);const m=new chrome.cast.media.Track(d,chrome.cast.media.TrackType.TEXT);return m.trackContentId=l.src,m.trackContentType="text/vtt",m.subtype=l.kind==="captions"?chrome.cast.media.TextTrackType.CAPTIONS:chrome.cast.media.TextTrackType.SUBTITLES,m.name=l.label,m.language=l.srclang,m})),this.castStreamType==="live"?i.streamType=chrome.cast.media.StreamType.LIVE:i.streamType=chrome.cast.media.StreamType.BUFFERED,i.metadata=new chrome.cast.media.GenericMediaMetadata,i.metadata.title=this.title,i.metadata.images=[{url:this.poster}],await Qg(this.castSrc)){i.contentType||(i.contentType="application/x-mpegURL");const{videoFormat:l,audioFormat:d}=await jg(this.castSrc);l?.includes("m4s")||l?.includes("mp4")||l?.includes("m4a")?(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.FMP4,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.FMP4):d?.includes("aac")?(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.AAC,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.MPEG2_TS):(l?.includes("ts")||d?.includes("ts"))&&(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.TS,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.MPEG2_TS)}const o=new chrome.cast.media.LoadRequest(i);o.currentTime=super.currentTime??0,o.autoplay=!this.#t.paused,o.activeTrackIds=r,await Ru()?.loadMedia(o),this.dispatchEvent(new Event("volumechange"))}play(){if(this.#e){this.#e.isPaused&&this.#e.controller?.playOrPause();return}return super.play()}pause(){if(this.#e){this.#e.isPaused||this.#e.controller?.playOrPause();return}super.pause()}get castOptions(){return this.#r}get castReceiver(){return this.getAttribute("cast-receiver")??void 0}set castReceiver(i){this.castReceiver!=i&&this.setAttribute("cast-receiver",`${i}`)}get castSrc(){const i=this.currentSrc,a=i?.startsWith("blob:")?void 0:i;return this.getAttribute("cast-src")??this.querySelector("source")?.src??a??this.getAttribute("src")??void 0}set castSrc(i){this.castSrc!=i&&this.setAttribute("cast-src",`${i}`)}get castContentType(){return this.getAttribute("cast-content-type")??void 0}set castContentType(i){this.setAttribute("cast-content-type",`${i}`)}get castStreamType(){return this.getAttribute("cast-stream-type")??this.streamType??void 0}set castStreamType(i){this.setAttribute("cast-stream-type",`${i}`)}get castCustomData(){return this.#i}set castCustomData(i){const a=typeof i;if(!["object","undefined"].includes(a)){console.error(`castCustomData must be nullish or an object but value was of type ${a}`);return}this.#i=i}get readyState(){if(this.#e)switch(this.#e.playerState){case chrome.cast.media.PlayerState.IDLE:return 0;case chrome.cast.media.PlayerState.BUFFERING:return 2;default:return 3}return super.readyState}get paused(){return this.#e?this.#e.isPaused:super.paused}get muted(){return this.#e?this.#e?.isMuted:super.muted}set muted(i){if(this.#e){(i&&!this.#e.isMuted||!i&&this.#e.isMuted)&&this.#e.controller?.muteOrUnmute();return}super.muted=i}get volume(){return this.#e?this.#e?.volumeLevel??1:super.volume}set volume(i){if(this.#e){this.#e.volumeLevel=+i,this.#e.controller?.setVolumeLevel();return}super.volume=i}get duration(){return this.#e&&this.#e?.isMediaLoaded?this.#e?.duration??NaN:super.duration}get currentTime(){return this.#e&&this.#e?.isMediaLoaded?this.#e?.currentTime??0:super.currentTime}set currentTime(i){if(this.#e){this.#e.currentTime=i,this.#e.controller?.seek();return}super.currentTime=i}};var wp=t=>{throw TypeError(t)},Ip=(t,e,i)=>e.has(t)||wp("Cannot "+i),Jg=(t,e,i)=>(Ip(t,e,"read from private field"),i?i.call(t):e.get(t)),e0=(t,e,i)=>e.has(t)?wp("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),t0=(t,e,i,a)=>(Ip(t,e,"write to private field"),e.set(t,i),i),Rp=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment>"u"){class t extends Rp{}globalThis.DocumentFragment=t}var i0=class extends Rp{},a0={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(i0)}},r0={customElements:a0},n0=typeof window>"u"||typeof globalThis.customElements>"u",Ol=n0?r0:globalThis,ys,Th=class extends Xg(qf($g)){constructor(){super(...arguments),e0(this,ys)}get autoplay(){let t=this.getAttribute("autoplay");return t===null?!1:t===""?!0:t}set autoplay(t){let e=this.autoplay;t!==e&&(t?this.setAttribute("autoplay",typeof t=="string"?t:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var t;return(t=Jg(this,ys))!=null?t:this.muxCastCustomData}set castCustomData(t){t0(this,ys,t)}};ys=new WeakMap;Ol.customElements.get("mux-video")||(Ol.customElements.define("mux-video",Th),Ol.MuxVideoElement=Th);const M={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},Q={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Lp={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},Cp=Object.entries(Lp),c=Cp.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),s0={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Xt=Cp.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...s0});Object.entries(Xt).reduce((t,[e,i])=>{const a=c[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const o0=Object.entries(c).reduce((t,[e,i])=>{const a=Xt[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),jt={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},ir={DISABLED:"disabled",SHOWING:"showing"},Nl={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Je={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},di={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},l0={FULLSCREEN:"fullscreen"};function d0(t){return t?.map(c0).join(" ")}function u0(t){return t?.split(/\s+/).map(h0)}function c0(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}function h0(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function m0(t){return t?.map(v0).join(" ")}function p0(t){return t?.split(/\s+/).map(f0)}function v0(t){if(t){const{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(n=>n!=null).join(":")}}function f0(t){if(t){const[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}function E0(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function Cu(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}function Dp(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}const Mp=t=>new Promise(e=>setTimeout(e,t)),_0={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var Ah;const mn={en:_0};let ar=((Ah=globalThis.navigator)==null?void 0:Ah.language)||"en";const b0=t=>{ar=t},g0=t=>{var e,i,a;const[r]=ar.split("-");return((e=mn[ar])==null?void 0:e[t])||((i=mn[r])==null?void 0:i[t])||((a=mn.en)==null?void 0:a[t])||t},y0=()=>{const[t]=ar.split("-");return mn[ar]?ar:mn[t]?t:"en"},C=(t,e={})=>g0(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),kh=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],T0=(t,e)=>{const i=C(t===1?kh[e].singular:kh[e].plural);return`${t} ${i}`},pn=t=>{if(!Cu(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),n=[a.getHours(),a.getMinutes(),a.getSeconds()].map((s,o)=>s&&T0(s,o)).filter(s=>s).join(", ");return i?C("{time} remaining",{time:n}):n};function Bi(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),n=Math.floor(t/3600);const s=Math.floor(e/60%60),o=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(n=r=a="0"),n=n>0||o>0?n+":":"",r=((n||s>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+n+r+a}let xp=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}};class Op extends xp{}let Sh=class extends Op{constructor(){super(...arguments),this.role=null}};class A0{observe(){}unobserve(){}disconnect(){}}const Np={createElement:function(){return new Ln.HTMLElement},createElementNS:function(){return new Ln.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Ln={ResizeObserver:A0,document:Np,Node:Op,Element:Sh,HTMLElement:class extends Sh{constructor(){super(...arguments),this.innerHTML=""}get content(){return new Ln.DocumentFragment}},DocumentFragment:class extends xp{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{parseFromString(e,i){return{body:{textContent:e}}}}},Pp="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",Up=Object.keys(Ln).every(t=>t in globalThis),b=Pp&&!Up?Ln:globalThis,Te=Pp&&!Up?Np:globalThis.document,wh=new WeakMap,Du=t=>{let e=wh.get(t);return e||wh.set(t,e=new Set),e},$p=new b.ResizeObserver(t=>{for(const e of t)for(const i of Du(e.target))i(e)});function hr(t,e){Du(t).add(e),$p.observe(t)}function mr(t,e){const i=Du(t);i.delete(e),i.size||$p.unobserve(t)}function tt(t){const e={};for(const i of t)e[i.name]=i.value;return e}function Ge(t){var e;return(e=od(t))!=null?e:_r(t,"media-controller")}function od(t){var e;const{MEDIA_CONTROLLER:i}=Q,a=t.getAttribute(i);if(a)return(e=ol(t))==null?void 0:e.getElementById(a)}const Hp=(t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},k0=(t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Bp=(t,e)=>k0(t,e)[0],bi=(t,e)=>!t||!e?!1:t?.contains(e)?!0:bi(t,e.getRootNode().host),_r=(t,e)=>{if(!t)return null;const i=t.closest(e);return i||_r(t.getRootNode().host,e)};function Mu(t=document){var e;const i=t?.activeElement;return i?(e=Mu(i.shadowRoot))!=null?e:i:null}function ol(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function Wp(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){const n=getComputedStyle(r);if(i&&n.opacity==="0"||a&&n.visibility==="hidden"||n.display==="none")return!1;r=r.parentElement,e--}return!0}function S0(t,e,i,a){const r=a.x-i.x,n=a.y-i.y,s=r*r+n*n;if(s===0)return 0;const o=((t-i.x)*r+(e-i.y)*n)/s;return Math.max(0,Math.min(1,o))}function Se(t,e){const i=w0(t,a=>a===e);return i||xu(t,e)}function w0(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let n;try{n=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(const s of n??[])if(e(s.selectorText))return s}}function xu(t,e){var i,a;const r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],n=r?.[r.length-1];if(!n?.sheet)return console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};const s=n?.sheet.insertRule(`${e}{}`,n.sheet.cssRules.length);return(a=n.sheet.cssRules)==null?void 0:a[s]}function ie(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}function ce(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}ie(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function Y(t,e){return t.hasAttribute(e)}function G(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}Y(t,e)!=i&&t.toggleAttribute(e,i)}function oe(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function re(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;oe(t,e,void 0)!==a&&t.setAttribute(e,a)}var Fp=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},vt=(t,e,i)=>(Fp(t,e,"read from private field"),i?i.call(t):e.get(t)),I0=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Yn=(t,e,i,a)=>(Fp(t,e,"write to private field"),e.set(t,i),i),Oe;function R0(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}class ll extends b.HTMLElement{constructor(){if(super(),I0(this,Oe,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,c.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,n,s,o,l;e===Q.MEDIA_CONTROLLER&&(i&&((n=(r=vt(this,Oe))==null?void 0:r.unassociateElement)==null||n.call(r,this),Yn(this,Oe,null)),a&&this.isConnected&&(Yn(this,Oe,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=vt(this,Oe))==null?void 0:o.associateElement)==null||l.call(o,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Yn(this,Oe,L0(this)),this.getAttribute(Q.MEDIA_CONTROLLER)&&((i=(e=vt(this,Oe))==null?void 0:e.associateElement)==null||i.call(e,this)),vt(this,Oe)&&(vt(this,Oe).addEventListener("pointerdown",this),vt(this,Oe).addEventListener("click",this),vt(this,Oe).hasAttribute("tabindex")||(vt(this,Oe).tabIndex=0))}disconnectedCallback(){var e,i,a,r;this.getAttribute(Q.MEDIA_CONTROLLER)&&((i=(e=vt(this,Oe))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=vt(this,Oe))==null||a.removeEventListener("pointerdown",this),(r=vt(this,Oe))==null||r.removeEventListener("click",this),Yn(this,Oe,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:n,clientY:s}=e,{left:o,top:l,width:d,height:m}=this.getBoundingClientRect(),p=n-o,h=s-l;if(p<0||h<0||p>d||h>m||d===0&&m===0)return;const u=this._pointerType||"mouse";if(this._pointerType=void 0,u===Nl.TOUCH){this.handleTap(e);return}else if(u===Nl.MOUSE||u===Nl.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return Y(this,c.MEDIA_PAUSED)}set mediaPaused(e){G(this,c.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?M.MEDIA_PLAY_REQUEST:M.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new b.CustomEvent(i,{composed:!0,bubbles:!0}))}}Oe=new WeakMap;ll.shadowRootOptions={mode:"open"};ll.getTemplateHTML=R0;function L0(t){var e;const i=t.getAttribute(Q.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):_r(t,"media-controller")}b.customElements.get("media-gesture-receiver")||b.customElements.define("media-gesture-receiver",ll);var Ih=ll,Ou=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},me=(t,e,i)=>(Ou(t,e,"read from private field"),i?i.call(t):e.get(t)),Fe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_t=(t,e,i,a)=>(Ou(t,e,"write to private field"),e.set(t,i),i),wt=(t,e,i)=>(Ou(t,e,"access private method"),i),Vr,wo,Ia,pr,ja,ld,Ra,Ts,dd,Kp,ud,Vp,Cn,dl,ul,Nu,vr,Dn,Ai,As;const P={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function C0(t){return`
    <style>
      
      :host([${c.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${P.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${P.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${P.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${P.AUDIO}])[${P.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${P.AUDIO}])[${P.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${P.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${P.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${P.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${P.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${P.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${P.USER_INACTIVE}]:not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_AIRPLAYING}]):not([${c.MEDIA_IS_CASTING}]):not([${P.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${P.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${P.USER_INACTIVE}]:not([${P.NO_AUTOHIDE}]):not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_CASTING}]):not([${P.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${P.USER_INACTIVE}][${P.AUTOHIDE_OVER_CONTROLS}]:not([${P.NO_AUTOHIDE}]):not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_CASTING}]):not([${P.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${P.AUDIO}])[${c.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${Ih.shadowRootOptions.mode}">
          ${Ih.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}const D0=Object.values(c),M0="sm:384 md:576 lg:768 xl:960";function x0(t){qp(t.target,t.contentRect.width)}function qp(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(P.BREAKPOINTS))!=null?i:M0,r=O0(a),n=N0(r,e);let s=!1;if(Object.keys(r).forEach(o=>{if(n.includes(o)){t.hasAttribute(`breakpoint${o}`)||(t.setAttribute(`breakpoint${o}`,""),s=!0);return}t.hasAttribute(`breakpoint${o}`)&&(t.removeAttribute(`breakpoint${o}`),s=!0)}),s){const o=new CustomEvent(Xt.BREAKPOINTS_CHANGE,{detail:n});t.dispatchEvent(o)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Xt.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function O0(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function N0(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}class cl extends b.HTMLElement{constructor(){if(super(),Fe(this,dd),Fe(this,ud),Fe(this,Cn),Fe(this,ul),Fe(this,vr),Fe(this,Vr,void 0),Fe(this,wo,0),Fe(this,Ia,null),Fe(this,pr,null),Fe(this,ja,void 0),this.breakpointsComputed=!1,Fe(this,ld,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const r=a.removedNodes;for(const n of r){if(n.slot!="media"||a.target!=this)continue;let s=a.previousSibling&&a.previousSibling.previousElementSibling;if(!s||!i)this.mediaUnsetCallback(n);else{let o=s.slot!=="media";for(;(s=s.previousSibling)!==null;)s.slot=="media"&&(o=!1);o&&this.mediaUnsetCallback(n)}}if(i)for(const n of a.addedNodes)n===i&&this.handleMediaUpdated(i)}}),Fe(this,Ra,!1),Fe(this,Ts,e=>{me(this,Ra)||(setTimeout(()=>{x0(e),_t(this,Ra,!1)},0),_t(this,Ra,!0))}),Fe(this,Ai,void 0),Fe(this,As,()=>{if(!me(this,Ai).assignedElements({flatten:!0}).length){me(this,Ia)&&this.mediaUnsetCallback(me(this,Ia));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}_t(this,Vr,new MutationObserver(me(this,ld)))}static get observedAttributes(){return[P.AUTOHIDE,P.GESTURES_DISABLED].concat(D0).filter(e=>![c.MEDIA_RENDITION_LIST,c.MEDIA_AUDIO_TRACK_LIST,c.MEDIA_CHAPTERS_CUES,c.MEDIA_WIDTH,c.MEDIA_HEIGHT,c.MEDIA_ERROR,c.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==P.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(_t(this,Ia,e),e.localName.includes("-")&&await b.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;me(this,Vr).observe(this,{childList:!0,subtree:!0}),hr(this,me(this,Ts));const i=this.getAttribute(P.AUDIO)!=null,a=C(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(P.USER_INACTIVE,""),qp(this,this.getBoundingClientRect().width);const r=this.querySelector(":scope > slot[slot=media]");r&&(_t(this,Ai,r),me(this,Ai).addEventListener("slotchange",me(this,As))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=b.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;mr(this,me(this,Ts)),clearTimeout(me(this,pr)),me(this,Vr).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=b.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),me(this,Ai)&&(me(this,Ai).removeEventListener("slotchange",me(this,As)),_t(this,Ai,null)),_t(this,Ra,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){_t(this,Ia,null)}handleEvent(e){switch(e.type){case"pointerdown":_t(this,wo,e.timeStamp);break;case"pointermove":wt(this,dd,Kp).call(this,e);break;case"pointerup":wt(this,ud,Vp).call(this,e);break;case"mouseleave":wt(this,Cn,dl).call(this);break;case"mouseup":this.removeAttribute(P.KEYBOARD_CONTROL);break;case"keyup":wt(this,vr,Dn).call(this),this.setAttribute(P.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);_t(this,ja,isNaN(i)?0:i)}get autohide(){return(me(this,ja)===void 0?2:me(this,ja)).toString()}get breakpoints(){return oe(this,P.BREAKPOINTS)}set breakpoints(e){re(this,P.BREAKPOINTS,e)}get audio(){return Y(this,P.AUDIO)}set audio(e){G(this,P.AUDIO,e)}get gesturesDisabled(){return Y(this,P.GESTURES_DISABLED)}set gesturesDisabled(e){G(this,P.GESTURES_DISABLED,e)}get keyboardControl(){return Y(this,P.KEYBOARD_CONTROL)}set keyboardControl(e){G(this,P.KEYBOARD_CONTROL,e)}get noAutohide(){return Y(this,P.NO_AUTOHIDE)}set noAutohide(e){G(this,P.NO_AUTOHIDE,e)}get autohideOverControls(){return Y(this,P.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){G(this,P.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return Y(this,P.USER_INACTIVE)}set userInteractive(e){G(this,P.USER_INACTIVE,e)}}Vr=new WeakMap;wo=new WeakMap;Ia=new WeakMap;pr=new WeakMap;ja=new WeakMap;ld=new WeakMap;Ra=new WeakMap;Ts=new WeakMap;dd=new WeakSet;Kp=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-me(this,wo)<250)return;wt(this,ul,Nu).call(this),clearTimeout(me(this,pr));const e=this.hasAttribute(P.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&wt(this,vr,Dn).call(this)};ud=new WeakSet;Vp=function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(P.USER_INACTIVE);[this,this.media].includes(t.target)&&e?wt(this,Cn,dl).call(this):wt(this,vr,Dn).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&wt(this,vr,Dn).call(this)};Cn=new WeakSet;dl=function(){if(me(this,ja)<0||this.hasAttribute(P.USER_INACTIVE))return;this.setAttribute(P.USER_INACTIVE,"");const t=new b.CustomEvent(Xt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};ul=new WeakSet;Nu=function(){if(!this.hasAttribute(P.USER_INACTIVE))return;this.removeAttribute(P.USER_INACTIVE);const t=new b.CustomEvent(Xt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};vr=new WeakSet;Dn=function(){wt(this,ul,Nu).call(this),clearTimeout(me(this,pr));const t=parseInt(this.autohide);t<0||_t(this,pr,setTimeout(()=>{wt(this,Cn,dl).call(this)},t*1e3))};Ai=new WeakMap;As=new WeakMap;cl.shadowRootOptions={mode:"open"};cl.getTemplateHTML=C0;b.customElements.get("media-container")||b.customElements.define("media-container",cl);var Yp=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ce=(t,e,i)=>(Yp(t,e,"read from private field"),i?i.call(t):e.get(t)),Ir=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Gn=(t,e,i,a)=>(Yp(t,e,"write to private field"),e.set(t,i),i),La,Ca,Io,oa,ri,ki;class Pu{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Ir(this,ri),Ir(this,La,void 0),Ir(this,Ca,void 0),Ir(this,Io,void 0),Ir(this,oa,new Set),Gn(this,La,e),Gn(this,Ca,i),Gn(this,Io,new Set(a))}[Symbol.iterator](){return Ce(this,ri,ki).values()}get length(){return Ce(this,ri,ki).size}get value(){var e;return(e=[...Ce(this,ri,ki)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Gn(this,oa,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...Ce(this,ri,ki)][e]}values(){return Ce(this,ri,ki).values()}forEach(e,i){Ce(this,ri,ki).forEach(e,i)}add(...e){var i,a;e.forEach(r=>Ce(this,oa).add(r)),!(this.value===""&&!((i=Ce(this,La))!=null&&i.hasAttribute(`${Ce(this,Ca)}`)))&&((a=Ce(this,La))==null||a.setAttribute(`${Ce(this,Ca)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>Ce(this,oa).delete(a)),(i=Ce(this,La))==null||i.setAttribute(`${Ce(this,Ca)}`,`${this.value}`)}contains(e){return Ce(this,ri,ki).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}La=new WeakMap;Ca=new WeakMap;Io=new WeakMap;oa=new WeakMap;ri=new WeakSet;ki=function(){return Ce(this,oa).size?Ce(this,oa):Ce(this,Io)};const P0=(t="")=>t.split(/\s+/),Gp=(t="")=>{const[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?jt.CAPTIONS:jt.SUBTITLES,language:i,label:r}},hl=(t="",e={})=>P0(t).map(i=>{const a=Gp(i);return{...e,...a}}),zp=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Gp(e):e):typeof t=="string"?hl(t):[t]:[],cd=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,Mn=(t=[])=>Array.prototype.map.call(t,cd).join(" "),U0=(t,e)=>i=>i[t]===e,Qp=t=>{const e=Object.entries(t).map(([i,a])=>U0(i,a));return i=>e.every(a=>a(i))},vn=(t,e=[],i=[])=>{const a=zp(i).map(Qp),r=n=>a.some(s=>s(n));Array.from(e).filter(r).forEach(n=>{n.mode=t})},ml=(t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Qp(e);return Array.from(t.textTracks).filter(i)},jp=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(c.MEDIA_SUBTITLES_SHOWING)},$0=t=>{var e;const{media:i,fullscreenElement:a}=t;try{const r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){const n=(e=a[r])==null?void 0:e.call(a);if(n instanceof Promise)return n.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},Rh="exitFullscreen"in Te?"exitFullscreen":"webkitExitFullscreen"in Te?"webkitExitFullscreen":"webkitCancelFullScreen"in Te?"webkitCancelFullScreen":void 0,H0=t=>{var e;const{documentElement:i}=t;if(Rh){const a=(e=i?.[Rh])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},qr="fullscreenElement"in Te?"fullscreenElement":"webkitFullscreenElement"in Te?"webkitFullscreenElement":void 0,B0=t=>{const{documentElement:e,media:i}=t,a=e?.[qr];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===l0.FULLSCREEN?i:a},W0=t=>{var e;const{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;const n=B0(t);if(!n)return!1;if(n===r||n===i)return!0;if(n.localName.includes("-")){let s=n.shadowRoot;if(!(qr in s))return bi(n,r);for(;s?.[qr];){if(s[qr]===r)return!0;s=(e=s[qr])==null?void 0:e.shadowRoot}}return!1},F0="fullscreenEnabled"in Te?"fullscreenEnabled":"webkitFullscreenEnabled"in Te?"webkitFullscreenEnabled":void 0,K0=t=>{const{documentElement:e,media:i}=t;return!!e?.[F0]||i&&"webkitSupportsFullscreen"in i};let zn;const Uu=()=>{var t,e;return zn||(zn=(e=(t=Te)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),zn)},V0=async(t=Uu())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([q0(t,i.signal),Y0(t,e)]);return i.abort(),a},q0=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),Y0=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Mp(10)}return t.volume!==e},G0=/.*Version\/.*Safari\/.*/.test(b.navigator.userAgent),Zp=(t=Uu())=>b.matchMedia("(display-mode: standalone)").matches&&G0?!1:typeof t?.requestPictureInPicture=="function",Xp=(t=Uu())=>K0({documentElement:Te,media:t}),z0=Xp(),Q0=Zp(),j0=!!b.WebKitPlaybackTargetAvailabilityEvent,Z0=!!b.chrome,Ro=t=>ml(t.media,e=>[jt.SUBTITLES,jt.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),Jp=t=>ml(t.media,e=>e.mode===ir.SHOWING&&[jt.SUBTITLES,jt.CAPTIONS].includes(e.kind)),ev=(t,e)=>{const i=Ro(t),a=Jp(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)vn(ir.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let n=i[0];const{options:s}=t;if(!s?.noSubtitlesLangPref){const m=b.localStorage.getItem("media-chrome-pref-subtitles-lang"),p=m?[m,...b.navigator.languages]:b.navigator.languages,h=i.filter(u=>p.some(v=>u.language.toLowerCase().startsWith(v.split("-")[0]))).sort((u,v)=>{const E=p.findIndex(g=>u.language.toLowerCase().startsWith(g.split("-")[0])),y=p.findIndex(g=>v.language.toLowerCase().startsWith(g.split("-")[0]));return E-y});h[0]&&(n=h[0])}const{language:o,label:l,kind:d}=n;vn(ir.DISABLED,i,a),vn(ir.SHOWING,i,[{language:o,label:l,kind:d}])}}},$u=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?X0(t,e):Object.entries(t).every(([i,a])=>i in e&&$u(a,e[i])),X0=(t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,n)=>$u(r,e[n])):!0},J0=Object.values(di);let Lo;const e1=V0().then(t=>(Lo=t,Lo)),t1=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof b.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=b.customElements.get(i);a&&e instanceof a||(await b.customElements.whenDefined(i),b.customElements.upgrade(e))}))},i1=new b.DOMParser,a1=t=>t&&(i1.parseFromString(t,"text/html").body.textContent||t),Yr={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:r}=t;if(e?.type!=="playing")return(a=(i=r?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const r=b.localStorage.getItem("media-chrome-pref-muted")!==null,n=i.hasAttribute("muted");if(a){r&&b.localStorage.removeItem("media-chrome-pref-muted");return}if(n&&!r)return;b.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(r){console.debug("Error setting muted pref",r)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const r=b.localStorage.getItem("media-chrome-pref-muted")==="true";Yr.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?b.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&b.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(r){console.debug("Error setting volume pref",r)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const r=b.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Yr.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!Cu(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((r,n)=>[Number(a.start(n).toFixed(3)),Number(a.end(n).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[di.LIVE,di.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:r}=e;if(J0.includes(r))return r===di.UNKNOWN?a:r;const n=e.duration;return n===1/0?di.LIVE:Number.isFinite(n)?di.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Yr.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===di.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Yr.mediaStreamType.get(t)===di.LIVE))return!1;const r=e.seekable;if(!r)return!0;if(!r.length)return!1;const n=r.end(r.length-1)-i;return e.currentTime>=n},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Ro(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return Jp(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:r,options:n}=e;if(!r)return;const s=o=>{var l;!n.defaultSubtitles||o&&![jt.CAPTIONS,jt.SUBTITLES].includes((l=o?.track)==null?void 0:l.kind)||ev(e,!0)};return r.addEventListener("loadstart",s),(i=r.textTracks)==null||i.addEventListener("addtrack",s),(a=r.textTracks)==null||a.addEventListener("removetrack",s),()=>{var o,l;r.removeEventListener("loadstart",s),(o=r.textTracks)==null||o.removeEventListener("addtrack",s),(l=r.textTracks)==null||l.removeEventListener("removetrack",s)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=ml(i,{kind:jt.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:r,startTime:n,endTime:s})=>({text:a1(r),startTime:n,endTime:s}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const r=a.querySelector('track[kind="chapters"][default][src]'),n=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r?.addEventListener("load",t),n?.addEventListener("load",t),()=>{r?.removeEventListener("load",t),n?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?bi(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let n=r.pictureInPictureElement.shadowRoot;for(;n?.pictureInPictureElement;){if(n.pictureInPictureElement===a)return!0;n=(i=n.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!Te.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const n=()=>{i.removeEventListener("loadedmetadata",s),i.preload="none"},s=()=>{i.requestPictureInPicture().catch(a),n()};i.addEventListener("loadedmetadata",s),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),n()},1e3)}else throw r}else throw r})}else Te.pictureInPictureElement&&Te.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:r}=t;return(a=(i=r?.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,r=Array.prototype.findIndex.call(i.videoRenditions,n=>n.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return W0(t)},set(t,e,i){var a,r;t?($0(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((r=e.media)==null||r.focus())):H0(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:i.remote.state==="connected"},set(t,e){var i,a;const{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&b.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!z0||!Xp(e))return Je.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!Q0||!Zp(e))return Je.UNSUPPORTED;if(e?.disablePictureInPicture)return Je.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(Lo===!1||e?.volume==null)return Je.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Lo==null&&e1.then(e=>t(e?void 0:Je.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!Z0||!((i=a?.remote)!=null&&i.state))return Je.UNSUPPORTED;if(!(e==null||e==="available"))return Je.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(n=>{t({availability:n?"available":"not-available"})}).catch(n=>{n.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var n;(n=a?.remote)==null||n.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!j0)return Je.UNSUPPORTED;if(e?.availability==="not-available")return Je.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(n=>{t({availability:n?"available":"not-available"})}).catch(n=>{n.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var n;(n=a?.remote)==null||n.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return Je.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return Je.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return Je.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return Je.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},r1={[M.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,n;const{media:s}=e,o=i??void 0;let l,d;if(s&&o!=null){const[u]=ml(s,{kind:jt.METADATA,label:"thumbnails"}),v=Array.prototype.find.call((a=u?.cues)!=null?a:[],(E,y,g)=>y===0?E.endTime>o:y===g.length-1?E.startTime<=o:E.startTime<=o&&E.endTime>o);if(v){const E=/'^(?:[a-z]+:)?\/\//i.test(v.text)||(r=s?.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,y=new URL(v.text,E);d=new URLSearchParams(y.hash).get("#xywh").split(",").map(T=>+T),l=y.href}}const m=t.mediaDuration.get(e);let h=(n=t.mediaChaptersCues.get(e).find((u,v,E)=>v===E.length-1&&m===u.endTime?u.startTime<=o&&u.endTime>=o:u.startTime<=o&&u.endTime>o))==null?void 0:n.text;return i!=null&&h==null&&(h=""),{mediaPreviewTime:o,mediaPreviewImage:l,mediaPreviewCoords:d,mediaPreviewChapter:h}},[M.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[M.MEDIA_PLAY_REQUEST](t,e){var i,a,r,n;const s="mediaPaused",l=t.mediaStreamType.get(e)===di.LIVE,d=!((i=e.options)!=null&&i.noAutoSeekToLive),m=t.mediaTargetLiveWindow.get(e)>0;if(l&&d&&!m){const p=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(p){const h=(n=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?n:0,u=p-h;t.mediaCurrentTime.set(u,e)}}t[s].set(!1,e)},[M.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",r=i;t[a].set(r,e)},[M.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[M.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[M.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[M.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[M.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",r=i;t[a].set(r,e)},[M.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;const n="mediaCurrentTime",s=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(s)))return;const o=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,l=s-o;t[n].set(l,e)},[M.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:r}=e,n=Ro(e),s=zp(i),o=(a=s[0])==null?void 0:a.language;o&&!r.noSubtitlesLangPref&&b.localStorage.setItem("media-chrome-pref-subtitles-lang",o),vn(ir.SHOWING,n,s)},[M.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=Ro(e),r=i??[];vn(ir.DISABLED,a,r)},[M.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){ev(e,i)},[M.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",r=i;t[a].set(r,e)},[M.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[M.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[M.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[M.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[M.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[M.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[M.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[M.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},n1=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Yr,requestMap:r=r1,options:n={},monitorStateOwnersOnlyWithSubscriptions:s=!0})=>{const o=[],l={options:{...n}};let d=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const m=E=>{E!=null&&($u(E,d)||(d=Object.freeze({...d,...E}),o.forEach(y=>y(d))))},p=()=>{const E=Object.entries(a).reduce((y,[g,{get:T}])=>(y[g]=T(l),y),{});m(E)},h={};let u;const v=async(E,y)=>{var g,T,_,k,D,L,w,$,V,W,B,Ne,Qe,je,fe,He;const Rt=!!u;if(u={...l,...u??{},...E},Rt)return;await t1(...Object.values(E));const Be=o.length>0&&y===0&&s,mt=l.media!==u.media,Ze=((g=l.media)==null?void 0:g.textTracks)!==((T=u.media)==null?void 0:T.textTracks),Ie=((_=l.media)==null?void 0:_.videoRenditions)!==((k=u.media)==null?void 0:k.videoRenditions),Pe=((D=l.media)==null?void 0:D.audioTracks)!==((L=u.media)==null?void 0:L.audioTracks),We=((w=l.media)==null?void 0:w.remote)!==(($=u.media)==null?void 0:$.remote),ei=l.documentElement!==u.documentElement,Vi=!!l.media&&(mt||Be),Ar=!!((V=l.media)!=null&&V.textTracks)&&(Ze||Be),Wc=!!((W=l.media)!=null&&W.videoRenditions)&&(Ie||Be),Fc=!!((B=l.media)!=null&&B.audioTracks)&&(Pe||Be),Kc=!!((Ne=l.media)!=null&&Ne.remote)&&(We||Be),Vc=!!l.documentElement&&(ei||Be),kl=Vi||Ar||Wc||Fc||Kc||Vc,_a=o.length===0&&y===1&&s,qc=!!u.media&&(mt||_a),Yc=!!((Qe=u.media)!=null&&Qe.textTracks)&&(Ze||_a),Gc=!!((je=u.media)!=null&&je.videoRenditions)&&(Ie||_a),zc=!!((fe=u.media)!=null&&fe.audioTracks)&&(Pe||_a),Qc=!!((He=u.media)!=null&&He.remote)&&(We||_a),jc=!!u.documentElement&&(ei||_a),Zc=qc||Yc||Gc||zc||Qc||jc;if(!(kl||Zc)){Object.entries(u).forEach(([X,kr])=>{l[X]=kr}),p(),u=void 0;return}Object.entries(a).forEach(([X,{get:kr,mediaEvents:Pf=[],textTracksEvents:Uf=[],videoRenditionsEvents:$f=[],audioTracksEvents:Hf=[],remoteEvents:Bf=[],rootEvents:Wf=[],stateOwnersUpdateHandlers:Ff=[]}])=>{h[X]||(h[X]={});const Xe=le=>{const Ee=kr(l,le);m({[X]:Ee})};let Re;Re=h[X].mediaEvents,Pf.forEach(le=>{Re&&Vi&&(l.media.removeEventListener(le,Re),h[X].mediaEvents=void 0),qc&&(u.media.addEventListener(le,Xe),h[X].mediaEvents=Xe)}),Re=h[X].textTracksEvents,Uf.forEach(le=>{var Ee,pt;Re&&Ar&&((Ee=l.media.textTracks)==null||Ee.removeEventListener(le,Re),h[X].textTracksEvents=void 0),Yc&&((pt=u.media.textTracks)==null||pt.addEventListener(le,Xe),h[X].textTracksEvents=Xe)}),Re=h[X].videoRenditionsEvents,$f.forEach(le=>{var Ee,pt;Re&&Wc&&((Ee=l.media.videoRenditions)==null||Ee.removeEventListener(le,Re),h[X].videoRenditionsEvents=void 0),Gc&&((pt=u.media.videoRenditions)==null||pt.addEventListener(le,Xe),h[X].videoRenditionsEvents=Xe)}),Re=h[X].audioTracksEvents,Hf.forEach(le=>{var Ee,pt;Re&&Fc&&((Ee=l.media.audioTracks)==null||Ee.removeEventListener(le,Re),h[X].audioTracksEvents=void 0),zc&&((pt=u.media.audioTracks)==null||pt.addEventListener(le,Xe),h[X].audioTracksEvents=Xe)}),Re=h[X].remoteEvents,Bf.forEach(le=>{var Ee,pt;Re&&Kc&&((Ee=l.media.remote)==null||Ee.removeEventListener(le,Re),h[X].remoteEvents=void 0),Qc&&((pt=u.media.remote)==null||pt.addEventListener(le,Xe),h[X].remoteEvents=Xe)}),Re=h[X].rootEvents,Wf.forEach(le=>{Re&&Vc&&(l.documentElement.removeEventListener(le,Re),h[X].rootEvents=void 0),jc&&(u.documentElement.addEventListener(le,Xe),h[X].rootEvents=Xe)});const Fn=h[X].stateOwnersUpdateHandlers;if(Fn&&kl&&(Array.isArray(Fn)?Fn:[Fn]).forEach(Ee=>{typeof Ee=="function"&&Ee()}),Zc){const le=Ff.map(Ee=>Ee(Xe,u)).filter(Ee=>typeof Ee=="function");h[X].stateOwnersUpdateHandlers=le.length===1?le[0]:le}else kl&&(h[X].stateOwnersUpdateHandlers=void 0)}),Object.entries(u).forEach(([X,kr])=>{l[X]=kr}),p(),u=void 0};return v({media:t,fullscreenElement:e,documentElement:i,options:n}),{dispatch(E){const{type:y,detail:g}=E;if(r[y]&&d.mediaErrorCode==null){m(r[y](a,l,E));return}y==="mediaelementchangerequest"?v({media:g}):y==="fullscreenelementchangerequest"?v({fullscreenElement:g}):y==="documentelementchangerequest"?v({documentElement:g}):y==="optionschangerequest"&&(Object.entries(g??{}).forEach(([T,_])=>{l.options[T]=_}),p())},getState(){return d},subscribe(E){return v({},o.length+1),o.push(E),E(d),()=>{const y=o.indexOf(E);y>=0&&(v({},o.length-1),o.splice(y,1))}}}};var Hu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},O=(t,e,i)=>(Hu(t,e,"read from private field"),i?i.call(t):e.get(t)),at=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},bt=(t,e,i,a)=>(Hu(t,e,"write to private field"),e.set(t,i),i),Rr=(t,e,i)=>(Hu(t,e,"access private method"),i),ci,Gr,q,zt,zr,Ot,ks,Qr,Ss,hd,ca,ws,md,pd,tv;const iv=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],Lh=10,Ch=.025,Dh=.25,s1=.25,o1=2,S={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class av extends cl{constructor(){super(),at(this,Ss),at(this,ws),at(this,pd),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,at(this,ci,new Pu(this,S.HOTKEYS)),at(this,Gr,void 0),at(this,q,void 0),at(this,zt,null),at(this,zr,void 0),at(this,Ot,void 0),at(this,ks,i=>{var a;(a=O(this,q))==null||a.dispatch(i)}),at(this,Qr,void 0),at(this,ca,i=>{const{key:a,shiftKey:r}=i;if(!(r&&(a==="/"||a==="?")||iv.includes(a))){this.removeEventListener("keyup",O(this,ca));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};bt(this,zr,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);const n=a.toLowerCase(),s=new b.CustomEvent(o0[n],{composed:!0,detail:r});this.dispatchEvent(s)}),e=i})}static get observedAttributes(){return super.observedAttributes.concat(S.NO_HOTKEYS,S.HOTKEYS,S.DEFAULT_STREAM_TYPE,S.DEFAULT_SUBTITLES,S.DEFAULT_DURATION,S.NO_MUTED_PREF,S.NO_VOLUME_PREF,S.LANG,S.LOOP,S.LIVE_EDGE_OFFSET,S.SEEK_TO_LIVE_OFFSET,S.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return O(this,q)}set mediaStore(e){var i,a;if(O(this,q)&&((i=O(this,Ot))==null||i.call(this),bt(this,Ot,void 0)),bt(this,q,e),!O(this,q)&&!this.hasAttribute(S.NO_DEFAULT_STORE)){Rr(this,Ss,hd).call(this);return}bt(this,Ot,(a=O(this,q))==null?void 0:a.subscribe(O(this,zr)))}get fullscreenElement(){var e;return(e=O(this,Gr))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(S.FULLSCREEN_ELEMENT)&&this.removeAttribute(S.FULLSCREEN_ELEMENT),bt(this,Gr,e),(i=O(this,q))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return Y(this,S.DEFAULT_SUBTITLES)}set defaultSubtitles(e){G(this,S.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return oe(this,S.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){re(this,S.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return ie(this,S.DEFAULT_DURATION)}set defaultDuration(e){ce(this,S.DEFAULT_DURATION,e)}get noHotkeys(){return Y(this,S.NO_HOTKEYS)}set noHotkeys(e){G(this,S.NO_HOTKEYS,e)}get keysUsed(){return oe(this,S.KEYS_USED)}set keysUsed(e){re(this,S.KEYS_USED,e)}get liveEdgeOffset(){return ie(this,S.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){ce(this,S.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return Y(this,S.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){G(this,S.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return Y(this,S.NO_VOLUME_PREF)}set noVolumePref(e){G(this,S.NO_VOLUME_PREF,e)}get noMutedPref(){return Y(this,S.NO_MUTED_PREF)}set noMutedPref(e){G(this,S.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return Y(this,S.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){G(this,S.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return Y(this,S.NO_DEFAULT_STORE)}set noDefaultStore(e){G(this,S.NO_DEFAULT_STORE,e)}get resolvedLang(){return y0()}attributeChangedCallback(e,i,a){var r,n,s,o,l,d,m,p,h,u,v,E;if(super.attributeChangedCallback(e,i,a),e===S.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(S.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===S.HOTKEYS)O(this,ci).value=a;else if(e===S.DEFAULT_SUBTITLES&&a!==i)(r=O(this,q))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(S.DEFAULT_SUBTITLES)}});else if(e===S.DEFAULT_STREAM_TYPE)(s=O(this,q))==null||s.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(n=this.getAttribute(S.DEFAULT_STREAM_TYPE))!=null?n:void 0}});else if(e===S.LIVE_EDGE_OFFSET&&a!==i)(o=O(this,q))==null||o.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(S.LIVE_EDGE_OFFSET)?+this.getAttribute(S.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(S.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(S.SEEK_TO_LIVE_OFFSET):this.hasAttribute(S.LIVE_EDGE_OFFSET)?+this.getAttribute(S.LIVE_EDGE_OFFSET):void 0}});else if(e===S.SEEK_TO_LIVE_OFFSET&&a!==i)(l=O(this,q))==null||l.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(S.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(S.SEEK_TO_LIVE_OFFSET):this.hasAttribute(S.LIVE_EDGE_OFFSET)?+this.getAttribute(S.LIVE_EDGE_OFFSET):void 0}});else if(e===S.NO_AUTO_SEEK_TO_LIVE)(d=O(this,q))==null||d.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(S.NO_AUTO_SEEK_TO_LIVE)}});else if(e===S.FULLSCREEN_ELEMENT){const y=a?(m=this.getRootNode())==null?void 0:m.getElementById(a):void 0;bt(this,Gr,y),(p=O(this,q))==null||p.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===S.LANG&&a!==i?(b0(a),(h=O(this,q))==null||h.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===S.LOOP&&a!==i?(u=O(this,q))==null||u.dispatch({type:M.MEDIA_LOOP_REQUEST,detail:a!=null}):e===S.NO_VOLUME_PREF&&a!==i?(v=O(this,q))==null||v.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(S.NO_VOLUME_PREF)}}):e===S.NO_MUTED_PREF&&a!==i&&((E=O(this,q))==null||E.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(S.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;this.associateElement(this),!O(this,q)&&!this.hasAttribute(S.NO_DEFAULT_STORE)&&Rr(this,Ss,hd).call(this),(e=O(this,q))==null||e.dispatch({type:"documentelementchangerequest",detail:Te}),(i=O(this,q))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),O(this,q)&&!O(this,Ot)&&bt(this,Ot,(a=O(this,q))==null?void 0:a.subscribe(O(this,zr))),O(this,Qr)!==void 0&&O(this,q)&&this.media&&setTimeout(()=>{var r,n,s;(n=(r=this.media)==null?void 0:r.textTracks)!=null&&n.length&&((s=O(this,q))==null||s.dispatch({type:M.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:O(this,Qr)}))},0),this.hasAttribute(S.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r,n,s;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),O(this,q)){const o=O(this,q).getState();bt(this,Qr,!!((i=o.mediaSubtitlesShowing)!=null&&i.length)),(a=O(this,q))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(r=O(this,q))==null||r.dispatch({type:"documentelementchangerequest",detail:void 0}),(n=O(this,q))==null||n.dispatch({type:M.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}O(this,Ot)&&((s=O(this,Ot))==null||s.call(this),bt(this,Ot,void 0)),this.unassociateElement(this),O(this,zt)&&(O(this,zt).remove(),bt(this,zt,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=O(this,q))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=O(this,q))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){Oh(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),n=m1(e,a,r);Object.values(M).forEach(s=>{e.addEventListener(s,O(this,ks))}),i.set(e,n)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(M).forEach(r=>{e.removeEventListener(r,O(this,ks))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),O(this,q)&&Object.entries(O(this,q).getState()).forEach(([r,n])=>{Oh([e],r,n)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Rr(this,ws,md))}disableHotkeys(){this.removeEventListener("keydown",Rr(this,ws,md)),this.removeEventListener("keyup",O(this,ca))}get hotkeys(){return O(this,ci)}set hotkeys(e){re(this,S.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,n,s,o,l,d,m;const p=e.target;if(((r=(a=(i=p.getAttribute(S.KEYS_USED))==null?void 0:i.split(" "))!=null?a:p?.keysUsed)!=null?r:[]).map(g=>g==="Space"?" ":g).filter(Boolean).includes(e.key))return;let u,v,E;if(!(O(this,ci).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&O(this,ci).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&O(this,ci).contains("noshift+/")))switch(e.key){case" ":case"k":u=O(this,q).getState().mediaPaused?M.MEDIA_PLAY_REQUEST:M.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new b.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"m":u=this.mediaStore.getState().mediaVolumeLevel==="off"?M.MEDIA_UNMUTE_REQUEST:M.MEDIA_MUTE_REQUEST,this.dispatchEvent(new b.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"f":u=this.mediaStore.getState().mediaIsFullscreen?M.MEDIA_EXIT_FULLSCREEN_REQUEST:M.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new b.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new b.CustomEvent(M.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const g=this.hasAttribute(S.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(S.KEYBOARD_BACKWARD_SEEK_OFFSET):Lh;v=Math.max(((n=this.mediaStore.getState().mediaCurrentTime)!=null?n:0)-g,0),E=new b.CustomEvent(M.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:v}),this.dispatchEvent(E);break}case"ArrowRight":case"l":{const g=this.hasAttribute(S.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(S.KEYBOARD_FORWARD_SEEK_OFFSET):Lh;v=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)+g,0),E=new b.CustomEvent(M.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:v}),this.dispatchEvent(E);break}case"ArrowUp":{const g=this.hasAttribute(S.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(S.KEYBOARD_UP_VOLUME_STEP):Ch;v=Math.min(((o=this.mediaStore.getState().mediaVolume)!=null?o:1)+g,1),E=new b.CustomEvent(M.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:v}),this.dispatchEvent(E);break}case"ArrowDown":{const g=this.hasAttribute(S.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(S.KEYBOARD_DOWN_VOLUME_STEP):Ch;v=Math.max(((l=this.mediaStore.getState().mediaVolume)!=null?l:1)-g,0),E=new b.CustomEvent(M.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:v}),this.dispatchEvent(E);break}case"<":{const g=(d=this.mediaStore.getState().mediaPlaybackRate)!=null?d:1;v=Math.max(g-Dh,s1).toFixed(2),E=new b.CustomEvent(M.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:v}),this.dispatchEvent(E);break}case">":{const g=(m=this.mediaStore.getState().mediaPlaybackRate)!=null?m:1;v=Math.min(g+Dh,o1).toFixed(2),E=new b.CustomEvent(M.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:v}),this.dispatchEvent(E);break}case"/":case"?":{e.shiftKey&&Rr(this,pd,tv).call(this);break}case"p":{u=this.mediaStore.getState().mediaIsPip?M.MEDIA_EXIT_PIP_REQUEST:M.MEDIA_ENTER_PIP_REQUEST,E=new b.CustomEvent(u,{composed:!0,bubbles:!0}),this.dispatchEvent(E);break}}}}ci=new WeakMap;Gr=new WeakMap;q=new WeakMap;zt=new WeakMap;zr=new WeakMap;Ot=new WeakMap;ks=new WeakMap;Qr=new WeakMap;Ss=new WeakSet;hd=function(){var t;this.mediaStore=n1({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(S.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(S.DEFAULT_DURATION)?+this.getAttribute(S.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(S.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(S.LIVE_EDGE_OFFSET)?+this.getAttribute(S.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(S.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(S.SEEK_TO_LIVE_OFFSET):this.hasAttribute(S.LIVE_EDGE_OFFSET)?+this.getAttribute(S.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(S.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(S.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(S.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(S.NO_SUBTITLES_LANG_PREF)}})};ca=new WeakMap;ws=new WeakSet;md=function(t){var e;const{metaKey:i,altKey:a,key:r,shiftKey:n}=t,s=n&&(r==="/"||r==="?");if(s&&((e=O(this,zt))!=null&&e.open)){this.removeEventListener("keyup",O(this,ca));return}if(i||a||!s&&!iv.includes(r)){this.removeEventListener("keyup",O(this,ca));return}const o=t.target,l=o instanceof HTMLElement&&(o.tagName.toLowerCase()==="media-volume-range"||o.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!(O(this,ci).contains(`no${r.toLowerCase()}`)||r===" "&&O(this,ci).contains("nospace"))&&!l&&t.preventDefault(),this.addEventListener("keyup",O(this,ca),{once:!0})};pd=new WeakSet;tv=function(){O(this,zt)||(bt(this,zt,Te.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(O(this,zt))),O(this,zt).open=!0};const l1=Object.values(c),d1=Object.values(Lp),rv=t=>{var e,i,a,r;let{observedAttributes:n}=t.constructor;!n&&((e=t.nodeName)!=null&&e.includes("-"))&&(b.customElements.upgrade(t),{observedAttributes:n}=t.constructor);const s=(r=(a=(i=t?.getAttribute)==null?void 0:i.call(t,Q.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(n||s)?(n||s).filter(o=>l1.includes(o)):[]},u1=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&b.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof b.customElements.get(t.nodeName.toLowerCase()))&&b.customElements.upgrade(t),d1.some(a=>a in t)},vd=t=>u1(t)||!!rv(t).length,Mh=t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},xh={[c.MEDIA_SUBTITLES_LIST]:Mn,[c.MEDIA_SUBTITLES_SHOWING]:Mn,[c.MEDIA_SEEKABLE]:Mh,[c.MEDIA_BUFFERED]:t=>t?.map(Mh).join(" "),[c.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[c.MEDIA_RENDITION_LIST]:d0,[c.MEDIA_AUDIO_TRACK_LIST]:m0},c1=async(t,e,i)=>{var a,r;if(t.isConnected||await Mp(0),typeof i=="boolean"||i==null)return G(t,e,i);if(typeof i=="number")return ce(t,e,i);if(typeof i=="string")return re(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const n=(r=(a=xh[e])==null?void 0:a.call(xh,i))!=null?r:i;return t.setAttribute(e,n)},h1=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},Xi=(t,e)=>{if(h1(t))return;const i=(r,n)=>{var s,o;vd(r)&&n(r);const{children:l=[]}=r??{},d=(o=(s=r?.shadowRoot)==null?void 0:s.children)!=null?o:[];[...l,...d].forEach(p=>Xi(p,n))},a=t?.nodeName.toLowerCase();if(a.includes("-")&&!vd(t)){b.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},Oh=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const r=rv(a),n=e.toLowerCase();r.includes(n)&&c1(a,n,i)})},m1=(t,e,i)=>{Xi(t,e);const a=m=>{var p;const h=(p=m?.composedPath()[0])!=null?p:m.target;e(h)},r=m=>{var p;const h=(p=m?.composedPath()[0])!=null?p:m.target;i(h)};t.addEventListener(M.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(M.UNREGISTER_MEDIA_STATE_RECEIVER,r);const n=m=>{m.forEach(p=>{const{addedNodes:h=[],removedNodes:u=[],type:v,target:E,attributeName:y}=p;v==="childList"?(Array.prototype.forEach.call(h,g=>Xi(g,e)),Array.prototype.forEach.call(u,g=>Xi(g,i))):v==="attributes"&&y===Q.MEDIA_CHROME_ATTRIBUTES&&(vd(E)?e(E):i(E))})};let s=[];const o=m=>{const p=m.target;p.name!=="media"&&(s.forEach(h=>Xi(h,i)),s=[...p.assignedElements({flatten:!0})],s.forEach(h=>Xi(h,e)))};t.addEventListener("slotchange",o);const l=new MutationObserver(n);return l.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{Xi(t,i),t.removeEventListener("slotchange",o),l.disconnect(),t.removeEventListener(M.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(M.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};b.customElements.get("media-controller")||b.customElements.define("media-controller",av);var p1=av;const ba={PLACEMENT:"placement",BOUNDS:"bounds"};function v1(t){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}class pl extends b.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Wp(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),r=(e=_r(this,"#"+this.bounds))!=null?e:Ge(this);if(!r)return;const{x:n,width:s}=r.getBoundingClientRect(),{x:o,width:l}=this.getBoundingClientRect(),d=o+l,m=n+s,p=a.getPropertyValue("--media-tooltip-offset-x"),h=p?parseFloat(p.replace("px","")):0,u=a.getPropertyValue("--media-tooltip-container-margin"),v=u?parseFloat(u.replace("px","")):0,E=o-n+h-v,y=d-m+h+v;if(E<0){this.style.setProperty("--media-tooltip-offset-x",`${E}px`);return}if(y>0){this.style.setProperty("--media-tooltip-offset-x",`${y}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[ba.PLACEMENT,ba.BOUNDS]}get placement(){return oe(this,ba.PLACEMENT)}set placement(e){re(this,ba.PLACEMENT,e)}get bounds(){return oe(this,ba.BOUNDS)}set bounds(e){re(this,ba.BOUNDS,e)}}pl.shadowRootOptions={mode:"open"};pl.getTemplateHTML=v1;b.customElements.get("media-tooltip")||b.customElements.define("media-tooltip",pl);var Nh=pl,Bu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ge=(t,e,i)=>(Bu(t,e,"read from private field"),i?i.call(t):e.get(t)),ga=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Qn=(t,e,i,a)=>(Bu(t,e,"write to private field"),e.set(t,i),i),f1=(t,e,i)=>(Bu(t,e,"access private method"),i),Nt,Za,Ni,Da,Is,fd,nv;const gi={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function E1(t,e={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      slot[name="icon"] {
        display: inline-flex;
        align-items: center;
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${Nh.shadowRootOptions.mode}">
          ${Nh.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}function _1(t,e){return`
    <slot></slot>
  `}function b1(){return""}class Me extends b.HTMLElement{constructor(){if(super(),ga(this,fd),ga(this,Nt,void 0),this.preventClick=!1,this.tooltipEl=null,ga(this,Za,e=>{this.preventClick||this.handleClick(e),setTimeout(ge(this,Ni),0)}),ga(this,Ni,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),ga(this,Da,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",ge(this,Da));return}this.preventClick||this.handleClick(e)}),ga(this,Is,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",ge(this,Da));return}this.addEventListener("keyup",ge(this,Da),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",gi.TOOLTIP_PLACEMENT,Q.MEDIA_CONTROLLER,c.MEDIA_LANG]}enable(){this.addEventListener("click",ge(this,Za)),this.addEventListener("keydown",ge(this,Is)),this.tabIndex=0}disable(){this.removeEventListener("click",ge(this,Za)),this.removeEventListener("keydown",ge(this,Is)),this.removeEventListener("keyup",ge(this,Da)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,n,s,o,l;e===Q.MEDIA_CONTROLLER?(i&&((n=(r=ge(this,Nt))==null?void 0:r.unassociateElement)==null||n.call(r,this),Qn(this,Nt,null)),a&&this.isConnected&&(Qn(this,Nt,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=ge(this,Nt))==null?void 0:o.associateElement)==null||l.call(o,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===gi.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===c.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),ge(this,Ni).call(this)}connectedCallback(){var e,i,a;const{style:r}=Se(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const n=this.getAttribute(Q.MEDIA_CONTROLLER);n&&(Qn(this,Nt,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=ge(this,Nt))==null?void 0:i.associateElement)==null||a.call(i,this)),b.customElements.whenDefined("media-tooltip").then(()=>f1(this,fd,nv).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=ge(this,Nt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Qn(this,Nt,null),this.removeEventListener("mouseenter",ge(this,Ni)),this.removeEventListener("focus",ge(this,Ni)),this.removeEventListener("click",ge(this,Za))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return oe(this,gi.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){re(this,gi.TOOLTIP_PLACEMENT,e)}get mediaController(){return oe(this,Q.MEDIA_CONTROLLER)}set mediaController(e){re(this,Q.MEDIA_CONTROLLER,e)}get disabled(){return Y(this,gi.DISABLED)}set disabled(e){G(this,gi.DISABLED,e)}get noTooltip(){return Y(this,gi.NO_TOOLTIP)}set noTooltip(e){G(this,gi.NO_TOOLTIP,e)}handleClick(e){}}Nt=new WeakMap;Za=new WeakMap;Ni=new WeakMap;Da=new WeakMap;Is=new WeakMap;fd=new WeakSet;nv=function(){this.addEventListener("mouseenter",ge(this,Ni)),this.addEventListener("focus",ge(this,Ni)),this.addEventListener("click",ge(this,Za));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};Me.shadowRootOptions={mode:"open"};Me.getTemplateHTML=E1;Me.getSlotTemplateHTML=_1;Me.getTooltipContentHTML=b1;b.customElements.get("media-chrome-button")||b.customElements.define("media-chrome-button",Me);const Ph=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function g1(t){return`
    <style>
      :host([${c.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${c.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ph}</slot>
      <slot name="exit">${Ph}</slot>
    </slot>
  `}function y1(){return`
    <slot name="tooltip-enter">${C("start airplay")}</slot>
    <slot name="tooltip-exit">${C("stop airplay")}</slot>
  `}const Uh=t=>{const e=t.mediaIsAirplaying?C("stop airplay"):C("start airplay");t.setAttribute("aria-label",e)};class Wu extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_AIRPLAYING,c.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Uh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_AIRPLAYING&&Uh(this)}get mediaIsAirplaying(){return Y(this,c.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){G(this,c.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return oe(this,c.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){re(this,c.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new b.CustomEvent(M.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}Wu.getSlotTemplateHTML=g1;Wu.getTooltipContentHTML=y1;b.customElements.get("media-airplay-button")||b.customElements.define("media-airplay-button",Wu);const T1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,A1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function k1(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${T1}</slot>
      <slot name="off">${A1}</slot>
    </slot>
  `}function S1(){return`
    <slot name="tooltip-enable">${C("Enable captions")}</slot>
    <slot name="tooltip-disable">${C("Disable captions")}</slot>
  `}const $h=t=>{t.setAttribute("aria-checked",jp(t).toString())};class Fu extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",C("closed captions")),$h(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_SHOWING&&$h(this)}get mediaSubtitlesList(){return Hh(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Bh(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Hh(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Bh(this,c.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new b.CustomEvent(M.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}Fu.getSlotTemplateHTML=k1;Fu.getTooltipContentHTML=S1;const Hh=(t,e)=>{const i=t.getAttribute(e);return i?hl(i):[]},Bh=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Mn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};b.customElements.get("media-captions-button")||b.customElements.define("media-captions-button",Fu);const w1='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',I1='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function R1(t){return`
    <style>
      :host([${c.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${c.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${w1}</slot>
      <slot name="exit">${I1}</slot>
    </slot>
  `}function L1(){return`
    <slot name="tooltip-enter">${C("Start casting")}</slot>
    <slot name="tooltip-exit">${C("Stop casting")}</slot>
  `}const Wh=t=>{const e=t.mediaIsCasting?C("stop casting"):C("start casting");t.setAttribute("aria-label",e)};class Ku extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_CASTING,c.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Wh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_CASTING&&Wh(this)}get mediaIsCasting(){return Y(this,c.MEDIA_IS_CASTING)}set mediaIsCasting(e){G(this,c.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return oe(this,c.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){re(this,c.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?M.MEDIA_EXIT_CAST_REQUEST:M.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}Ku.getSlotTemplateHTML=R1;Ku.getTooltipContentHTML=L1;b.customElements.get("media-cast-button")||b.customElements.define("media-cast-button",Ku);var Vu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ha=(t,e,i)=>(Vu(t,e,"read from private field"),e.get(t)),ii=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},qu=(t,e,i,a)=>(Vu(t,e,"write to private field"),e.set(t,i),i),Gi=(t,e,i)=>(Vu(t,e,"access private method"),i),Co,xn,va,Rs,Ed,_d,sv,bd,ov,gd,lv,yd,dv,Td,uv;function C1(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(t)}
  `}function D1(t){return`
    <slot id="content"></slot>
  `}const Lr={OPEN:"open",ANCHOR:"anchor"};class br extends b.HTMLElement{constructor(){super(),ii(this,Rs),ii(this,_d),ii(this,bd),ii(this,gd),ii(this,yd),ii(this,Td),ii(this,Co,!1),ii(this,xn,null),ii(this,va,null)}static get observedAttributes(){return[Lr.OPEN,Lr.ANCHOR]}get open(){return Y(this,Lr.OPEN)}set open(e){G(this,Lr.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Gi(this,gd,lv).call(this,e);break;case"focusout":Gi(this,yd,dv).call(this,e);break;case"keydown":Gi(this,Td,uv).call(this,e);break}}connectedCallback(){Gi(this,Rs,Ed).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){Gi(this,Rs,Ed).call(this),e===Lr.OPEN&&a!==i&&(this.open?Gi(this,_d,sv).call(this):Gi(this,bd,ov).call(this))}focus(){qu(this,xn,Mu());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}}Co=new WeakMap;xn=new WeakMap;va=new WeakMap;Rs=new WeakSet;Ed=function(){if(!ha(this,Co)&&(qu(this,Co,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=Se(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};_d=new WeakSet;sv=function(){var t;(t=ha(this,va))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};bd=new WeakSet;ov=function(){var t;(t=ha(this,va))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};gd=new WeakSet;lv=function(t){qu(this,va,t.relatedTarget),bi(this,t.relatedTarget)||(this.open=!this.open)};yd=new WeakSet;dv=function(t){var e;bi(this,t.relatedTarget)||((e=ha(this,xn))==null||e.focus(),ha(this,va)&&ha(this,va)!==t.relatedTarget&&this.open&&(this.open=!1))};Td=new WeakSet;uv=function(t){var e,i,a,r,n;const{key:s,ctrlKey:o,altKey:l,metaKey:d}=t;o||l||d||this.keysUsed.includes(s)&&(t.preventDefault(),t.stopPropagation(),s==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):s==="Escape"&&((n=ha(this,xn))==null||n.focus(),this.open=!1))};br.shadowRootOptions={mode:"open"};br.getTemplateHTML=C1;br.getSlotTemplateHTML=D1;b.customElements.get("media-chrome-dialog")||b.customElements.define("media-chrome-dialog",br);var Yu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},de=(t,e,i)=>(Yu(t,e,"read from private field"),i?i.call(t):e.get(t)),xe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Si=(t,e,i,a)=>(Yu(t,e,"write to private field"),e.set(t,i),i),Tt=(t,e,i)=>(Yu(t,e,"access private method"),i),Pt,vl,Ls,Cs,At,Do,Ds,Ms,xs,Gu,cv,Os,Ad,Ns,kd,Mo,zu,Sd,hv,wd,mv,Id,pv,Rd,vv;function M1(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, 0);
        height: var(--media-time-range-hover-height, max(100% , 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, 0);
          height: var(--media-time-range-hover-height, max(100%, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(t)}
    </div>
    <div id="rightgap"></div>
  `}function x1(t){return""}class gr extends b.HTMLElement{constructor(){if(super(),xe(this,Gu),xe(this,Os),xe(this,Ns),xe(this,Mo),xe(this,Sd),xe(this,wd),xe(this,Id),xe(this,Rd),xe(this,Pt,void 0),xe(this,vl,void 0),xe(this,Ls,void 0),xe(this,Cs,void 0),xe(this,At,{}),xe(this,Do,[]),xe(this,Ds,()=>{if(this.range.matches(":focus-visible")){const{style:e}=Se(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),xe(this,Ms,()=>{const{style:e}=Se(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),xe(this,xs,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),Si(this,Ls,this.shadowRoot.querySelector("#startpoint")),Si(this,Cs,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,n,s,o,l;e===Q.MEDIA_CONTROLLER?(i&&((n=(r=de(this,Pt))==null?void 0:r.unassociateElement)==null||n.call(r,this),Si(this,Pt,null)),a&&this.isConnected&&(Si(this,Pt,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=de(this,Pt))==null?void 0:o.associateElement)==null||l.call(o,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Tt(this,Os,Ad).call(this)):(this.range.setAttribute(e,a),Tt(this,Ns,kd).call(this)))}connectedCallback(){var e,i,a;const{style:r}=Se(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),de(this,At).pointer=Se(this.shadowRoot,"#pointer"),de(this,At).progress=Se(this.shadowRoot,"#progress"),de(this,At).thumb=Se(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),de(this,At).activeSegment=Se(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const n=this.getAttribute(Q.MEDIA_CONTROLLER);n&&(Si(this,Pt,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=de(this,Pt))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",de(this,Ds)),this.shadowRoot.addEventListener("focusout",de(this,Ms)),Tt(this,Os,Ad).call(this),hr(this.container,de(this,xs))}disconnectedCallback(){var e,i;Tt(this,Ns,kd).call(this),(i=(e=de(this,Pt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Si(this,Pt,null),this.shadowRoot.removeEventListener("focusin",de(this,Ds)),this.shadowRoot.removeEventListener("focusout",de(this,Ms)),mr(this.container,de(this,xs))}updatePointerBar(e){var i;(i=de(this,At).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=de(this,At).progress)==null||e.style.setProperty("width",`${a}%`),(i=de(this,At).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(n=>[n.start,n.end]),+this.range.max])];Si(this,Do,[...a]);const r=a.pop();for(const[n,s]of a.entries()){const[o,l]=[n===0,n===a.length-1],d=o?"calc(var(--segments-gap) / -1)":`${s*100}%`,p=`calc(${((l?r:a[n+1])-s)*100}%${o||l?"":" - var(--segments-gap)"})`,h=Te.createElementNS("http://www.w3.org/2000/svg","rect"),u=xu(this.shadowRoot,`#segments-clipping rect:nth-child(${n+1})`);u.style.setProperty("x",d),u.style.setProperty("width",p),i.append(h)}}getPointerRatio(e){return S0(e.clientX,e.clientY,de(this,Ls).getBoundingClientRect(),de(this,Cs).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Tt(this,Rd,vv).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Tt(this,Sd,hv).call(this,e);break;case"pointerdown":Tt(this,Mo,zu).call(this,e);break;case"pointerup":Tt(this,wd,mv).call(this);break;case"pointerleave":Tt(this,Id,pv).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}Pt=new WeakMap;vl=new WeakMap;Ls=new WeakMap;Cs=new WeakMap;At=new WeakMap;Do=new WeakMap;Ds=new WeakMap;Ms=new WeakMap;xs=new WeakMap;Gu=new WeakSet;cv=function(t){const e=de(this,At).activeSegment;if(!e)return;const i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${de(this,Do).findIndex((n,s,o)=>{const l=o[s+1];return l!=null&&i>=n&&i<=l})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};Os=new WeakSet;Ad=function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};Ns=new WeakSet;kd=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=b.window)==null||t.removeEventListener("pointerup",this),(e=b.window)==null||e.removeEventListener("pointermove",this)};Mo=new WeakSet;zu=function(t){var e;Si(this,vl,t.composedPath().includes(this.range)),(e=b.window)==null||e.addEventListener("pointerup",this,{once:!0})};Sd=new WeakSet;hv=function(t){var e;t.pointerType!=="mouse"&&Tt(this,Mo,zu).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=b.window)==null||e.addEventListener("pointermove",this)};wd=new WeakSet;mv=function(){var t;(t=b.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};Id=new WeakSet;pv=function(){var t,e;this.removeEventListener("pointerleave",this),(t=b.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=de(this,At).activeSegment)==null||e.style.removeProperty("transform")};Rd=new WeakSet;vv=function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Tt(this,Gu,cv).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!de(this,vl))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))};gr.shadowRootOptions={mode:"open"};gr.getTemplateHTML=M1;gr.getContainerTemplateHTML=x1;b.customElements.get("media-chrome-range")||b.customElements.define("media-chrome-range",gr);var fv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},jn=(t,e,i)=>(fv(t,e,"read from private field"),i?i.call(t):e.get(t)),O1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Zn=(t,e,i,a)=>(fv(t,e,"write to private field"),e.set(t,i),i),Ut;function N1(t){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}class Qu extends b.HTMLElement{constructor(){if(super(),O1(this,Ut,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,n,s,o,l;e===Q.MEDIA_CONTROLLER&&(i&&((n=(r=jn(this,Ut))==null?void 0:r.unassociateElement)==null||n.call(r,this),Zn(this,Ut,null)),a&&this.isConnected&&(Zn(this,Ut,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=jn(this,Ut))==null?void 0:o.associateElement)==null||l.call(o,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(Zn(this,Ut,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=jn(this,Ut))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=jn(this,Ut))==null?void 0:e.unassociateElement)==null||i.call(e,this),Zn(this,Ut,null)}}Ut=new WeakMap;Qu.shadowRootOptions={mode:"open"};Qu.getTemplateHTML=N1;b.customElements.get("media-control-bar")||b.customElements.define("media-control-bar",Qu);var Ev=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Xn=(t,e,i)=>(Ev(t,e,"read from private field"),i?i.call(t):e.get(t)),P1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Jn=(t,e,i,a)=>(Ev(t,e,"write to private field"),e.set(t,i),i),$t;function U1(t,e={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}function $1(t,e){return`
    <slot></slot>
  `}class Fi extends b.HTMLElement{constructor(){if(super(),P1(this,$t,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,n,s,o,l;e===Q.MEDIA_CONTROLLER&&(i&&((n=(r=Xn(this,$t))==null?void 0:r.unassociateElement)==null||n.call(r,this),Jn(this,$t,null)),a&&this.isConnected&&(Jn(this,$t,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=Xn(this,$t))==null?void 0:o.associateElement)==null||l.call(o,this)))}connectedCallback(){var e,i,a;const{style:r}=Se(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const n=this.getAttribute(Q.MEDIA_CONTROLLER);n&&(Jn(this,$t,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(i=Xn(this,$t))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Xn(this,$t))==null?void 0:e.unassociateElement)==null||i.call(e,this),Jn(this,$t,null)}}$t=new WeakMap;Fi.shadowRootOptions={mode:"open"};Fi.getTemplateHTML=U1;Fi.getSlotTemplateHTML=$1;b.customElements.get("media-text-display")||b.customElements.define("media-text-display",Fi);var _v=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Fh=(t,e,i)=>(_v(t,e,"read from private field"),i?i.call(t):e.get(t)),H1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},B1=(t,e,i,a)=>(_v(t,e,"write to private field"),e.set(t,i),i),jr;function W1(t,e){return`
    <slot>${Bi(e.mediaDuration)}</slot>
  `}class bv extends Fi{constructor(){var e;super(),H1(this,jr,void 0),B1(this,jr,this.shadowRoot.querySelector("slot")),Fh(this,jr).textContent=Bi((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===c.MEDIA_DURATION&&(Fh(this,jr).textContent=Bi(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return ie(this,c.MEDIA_DURATION)}set mediaDuration(e){ce(this,c.MEDIA_DURATION,e)}}jr=new WeakMap;bv.getSlotTemplateHTML=W1;b.customElements.get("media-duration-display")||b.customElements.define("media-duration-display",bv);const F1={2:C("Network Error"),3:C("Decode Error"),4:C("Source Not Supported"),5:C("Encryption Error")},K1={2:C("A network error caused the media download to fail."),3:C("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:C("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:C("The media is encrypted and there are no keys to decrypt it.")},ju=t=>{var e,i;return t.code===1?null:{title:(e=F1[t.code])!=null?e:`Error ${t.code}`,message:(i=K1[t.code])!=null?i:t.message}};var gv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},V1=(t,e,i)=>(gv(t,e,"read from private field"),i?i.call(t):e.get(t)),q1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Y1=(t,e,i,a)=>(gv(t,e,"write to private field"),e.set(t,i),i),Ps;function G1(t){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${yv({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function z1(t){return t.code&&ju(t)!==null}function yv(t){var e;const{title:i,message:a}=(e=ju(t))!=null?e:{};let r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}const Kh=[c.MEDIA_ERROR_CODE,c.MEDIA_ERROR_MESSAGE];class fl extends br{constructor(){super(...arguments),q1(this,Ps,null)}static get observedAttributes(){return[...super.observedAttributes,...Kh]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!Kh.includes(e))return;const n=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=z1(n),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(n),!this.hasAttribute("aria-label"))){const{title:s}=ju(n);s&&this.setAttribute("aria-label",s)}}get mediaError(){return V1(this,Ps)}set mediaError(e){Y1(this,Ps,e)}get mediaErrorCode(){return ie(this,"mediaerrorcode")}set mediaErrorCode(e){ce(this,"mediaerrorcode",e)}get mediaErrorMessage(){return oe(this,"mediaerrormessage")}set mediaErrorMessage(e){re(this,"mediaerrormessage",e)}}Ps=new WeakMap;fl.getSlotTemplateHTML=G1;fl.formatErrorMessage=yv;b.customElements.get("media-error-dialog")||b.customElements.define("media-error-dialog",fl);var Tv=fl,Q1=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},yi=(t,e,i)=>(Q1(t,e,"read from private field"),i?i.call(t):e.get(t)),Vh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ma,xa;function j1(t){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${Z1()}
    </slot>
  `}function Z1(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((n,s)=>s>0?`<span class="key-separator">or</span><span class="key">${n}</span>`:`<span class="key">${n}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}class Av extends br{constructor(){super(...arguments),Vh(this,Ma,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const r=e.composedPath(),n=r[0]===this||r.includes(this),s=r.includes(a);n&&!s&&(this.open=!1)}),Vh(this,xa,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",yi(this,Ma)),document.addEventListener("keydown",yi(this,xa)))}disconnectedCallback(){this.removeEventListener("click",yi(this,Ma)),document.removeEventListener("keydown",yi(this,xa))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",yi(this,Ma)),document.addEventListener("keydown",yi(this,xa))):(this.removeEventListener("click",yi(this,Ma)),document.removeEventListener("keydown",yi(this,xa))))}}Ma=new WeakMap;xa=new WeakMap;Av.getSlotTemplateHTML=j1;b.customElements.get("media-keyboard-shortcuts-dialog")||b.customElements.define("media-keyboard-shortcuts-dialog",Av);var kv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},X1=(t,e,i)=>(kv(t,e,"read from private field"),e.get(t)),J1=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ey=(t,e,i,a)=>(kv(t,e,"write to private field"),e.set(t,i),i),Us;const ty=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,iy=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function ay(t){return`
    <style>
      :host([${c.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${c.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${ty}</slot>
      <slot name="exit">${iy}</slot>
    </slot>
  `}function ry(){return`
    <slot name="tooltip-enter">${C("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${C("Exit fullscreen mode")}</slot>
  `}const qh=t=>{const e=t.mediaIsFullscreen?C("exit fullscreen mode"):C("enter fullscreen mode");t.setAttribute("aria-label",e)};class Zu extends Me{constructor(){super(...arguments),J1(this,Us,null)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_FULLSCREEN,c.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),qh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_FULLSCREEN&&qh(this)}get mediaFullscreenUnavailable(){return oe(this,c.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){re(this,c.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return Y(this,c.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){G(this,c.MEDIA_IS_FULLSCREEN,e)}handleClick(e){ey(this,Us,e);const i=X1(this,Us)instanceof PointerEvent,a=this.mediaIsFullscreen?new b.CustomEvent(M.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new b.CustomEvent(M.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}}Us=new WeakMap;Zu.getSlotTemplateHTML=ay;Zu.getTooltipContentHTML=ry;b.customElements.get("media-fullscreen-button")||b.customElements.define("media-fullscreen-button",Zu);const{MEDIA_TIME_IS_LIVE:$s,MEDIA_PAUSED:fn}=c,{MEDIA_SEEK_TO_LIVE_REQUEST:ny,MEDIA_PLAY_REQUEST:sy}=M,oy='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function ly(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${$s}]:not([${fn}])) slot[name=indicator] > *,
      :host([${$s}]:not([${fn}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${$s}]:not([${fn}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${oy}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${C("live")}</slot>
  `}const Yh=t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=C(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=C("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")};class Sv extends Me{static get observedAttributes(){return[...super.observedAttributes,$s,fn]}connectedCallback(){super.connectedCallback(),Yh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Yh(this)}get mediaPaused(){return Y(this,c.MEDIA_PAUSED)}set mediaPaused(e){G(this,c.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return Y(this,c.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){G(this,c.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new b.CustomEvent(ny,{composed:!0,bubbles:!0})),this.hasAttribute(fn)&&this.dispatchEvent(new b.CustomEvent(sy,{composed:!0,bubbles:!0})))}}Sv.getSlotTemplateHTML=ly;b.customElements.get("media-live-button")||b.customElements.define("media-live-button",Sv);var wv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Cr=(t,e,i)=>(wv(t,e,"read from private field"),i?i.call(t):e.get(t)),Gh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Dr=(t,e,i,a)=>(wv(t,e,"write to private field"),e.set(t,i),i),Ht,Hs;const es={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},Iv=500,dy=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function uy(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${Iv}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${c.MEDIA_LOADING}]:not([${c.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${c.MEDIA_LOADING}]:not([${c.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${c.MEDIA_LOADING}]:not([${c.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${dy}</slot>
    <div id="status" role="status" aria-live="polite">${C("media loading")}</div>
  `}class Xu extends b.HTMLElement{constructor(){if(super(),Gh(this,Ht,void 0),Gh(this,Hs,Iv),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,c.MEDIA_PAUSED,c.MEDIA_LOADING,es.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,n,s,o,l;e===es.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===Q.MEDIA_CONTROLLER&&(i&&((n=(r=Cr(this,Ht))==null?void 0:r.unassociateElement)==null||n.call(r,this),Dr(this,Ht,null)),a&&this.isConnected&&(Dr(this,Ht,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=Cr(this,Ht))==null?void 0:o.associateElement)==null||l.call(o,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(Dr(this,Ht,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Cr(this,Ht))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Cr(this,Ht))==null?void 0:e.unassociateElement)==null||i.call(e,this),Dr(this,Ht,null)}get loadingDelay(){return Cr(this,Hs)}set loadingDelay(e){Dr(this,Hs,e);const{style:i}=Se(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return Y(this,c.MEDIA_PAUSED)}set mediaPaused(e){G(this,c.MEDIA_PAUSED,e)}get mediaLoading(){return Y(this,c.MEDIA_LOADING)}set mediaLoading(e){G(this,c.MEDIA_LOADING,e)}get mediaController(){return oe(this,Q.MEDIA_CONTROLLER)}set mediaController(e){re(this,Q.MEDIA_CONTROLLER,e)}get noAutohide(){return Y(this,es.NO_AUTOHIDE)}set noAutohide(e){G(this,es.NO_AUTOHIDE,e)}}Ht=new WeakMap;Hs=new WeakMap;Xu.shadowRootOptions={mode:"open"};Xu.getTemplateHTML=uy;b.customElements.get("media-loading-indicator")||b.customElements.define("media-loading-indicator",Xu);const cy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,zh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,hy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function my(t){return`
    <style>
      :host(:not([${c.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${c.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${c.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${c.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${c.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${c.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${c.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${cy}</slot>
      <slot name="low">${zh}</slot>
      <slot name="medium">${zh}</slot>
      <slot name="high">${hy}</slot>
    </slot>
  `}function py(){return`
    <slot name="tooltip-mute">${C("Mute")}</slot>
    <slot name="tooltip-unmute">${C("Unmute")}</slot>
  `}const Qh=t=>{const e=t.mediaVolumeLevel==="off",i=C(e?"unmute":"mute");t.setAttribute("aria-label",i)};class Ju extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),Qh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_VOLUME_LEVEL&&Qh(this)}get mediaVolumeLevel(){return oe(this,c.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){re(this,c.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?M.MEDIA_UNMUTE_REQUEST:M.MEDIA_MUTE_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}Ju.getSlotTemplateHTML=my;Ju.getTooltipContentHTML=py;b.customElements.get("media-mute-button")||b.customElements.define("media-mute-button",Ju);const jh=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function vy(t){return`
    <style>
      :host([${c.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${c.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${jh}</slot>
      <slot name="exit">${jh}</slot>
    </slot>
  `}function fy(){return`
    <slot name="tooltip-enter">${C("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${C("Exit picture in picture mode")}</slot>
  `}const Zh=t=>{const e=t.mediaIsPip?C("exit picture in picture mode"):C("enter picture in picture mode");t.setAttribute("aria-label",e)};class ec extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_PIP,c.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Zh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_PIP&&Zh(this)}get mediaPipUnavailable(){return oe(this,c.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){re(this,c.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return Y(this,c.MEDIA_IS_PIP)}set mediaIsPip(e){G(this,c.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?M.MEDIA_EXIT_PIP_REQUEST:M.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}ec.getSlotTemplateHTML=vy;ec.getTooltipContentHTML=fy;b.customElements.get("media-pip-button")||b.customElements.define("media-pip-button",ec);var Ey=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ya=(t,e,i)=>(Ey(t,e,"read from private field"),i?i.call(t):e.get(t)),_y=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wi;const Pl={RATES:"rates"},Rv=[1,1.2,1.5,1.7,2],Xa=1;function Wi(t){return Math.round(t*100)/100}function by(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate?Wi(+t.mediaplaybackrate):Xa}x</slot>
  `}function gy(){return C("Playback rate")}class tc extends Me{constructor(){var e;super(),_y(this,wi,new Pu(this,Pl.RATES,{defaultValue:Rv})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${Wi((e=this.mediaPlaybackRate)!=null?e:Xa)}x`}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,Pl.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Pl.RATES&&(ya(this,wi).value=a),e===c.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,n=Wi(Number.isNaN(r)?Xa:r);this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",C("Playback rate {playbackRate}",{playbackRate:n}))}}get rates(){return ya(this,wi)}set rates(e){e?Array.isArray(e)?ya(this,wi).value=e.join(" "):typeof e=="string"&&(ya(this,wi).value=e):ya(this,wi).value=""}get mediaPlaybackRate(){return ie(this,c.MEDIA_PLAYBACK_RATE,Xa)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(ya(this,wi).values(),s=>+s).sort((s,o)=>s-o),r=(i=(e=a.find(s=>s>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:Xa,n=new b.CustomEvent(M.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(n)}}wi=new WeakMap;tc.getSlotTemplateHTML=by;tc.getTooltipContentHTML=gy;b.customElements.get("media-playback-rate-button")||b.customElements.define("media-playback-rate-button",tc);const yy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Ty=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function Ay(t){return`
    <style>
      :host([${c.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${c.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${c.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${c.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${yy}</slot>
      <slot name="pause">${Ty}</slot>
    </slot>
  `}function ky(){return`
    <slot name="tooltip-play">${C("Play")}</slot>
    <slot name="tooltip-pause">${C("Pause")}</slot>
  `}const Xh=t=>{const e=t.mediaPaused?C("play"):C("pause");t.setAttribute("aria-label",e)};class ic extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PAUSED,c.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Xh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===c.MEDIA_PAUSED||e===c.MEDIA_LANG)&&Xh(this)}get mediaPaused(){return Y(this,c.MEDIA_PAUSED)}set mediaPaused(e){G(this,c.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?M.MEDIA_PLAY_REQUEST:M.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}ic.getSlotTemplateHTML=Ay;ic.getTooltipContentHTML=ky;b.customElements.get("media-play-button")||b.customElements.define("media-play-button",ic);const Lt={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function Sy(t){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}const wy=t=>{t.style.removeProperty("background-image")},Iy=(t,e)=>{t.style["background-image"]=`url('${e}')`};class ac extends b.HTMLElement{static get observedAttributes(){return[Lt.PLACEHOLDER_SRC,Lt.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Lt.SRC&&(a==null?this.image.removeAttribute(Lt.SRC):this.image.setAttribute(Lt.SRC,a)),e===Lt.PLACEHOLDER_SRC&&(a==null?wy(this.image):Iy(this.image,a))}get placeholderSrc(){return oe(this,Lt.PLACEHOLDER_SRC)}set placeholderSrc(e){re(this,Lt.SRC,e)}get src(){return oe(this,Lt.SRC)}set src(e){re(this,Lt.SRC,e)}}ac.shadowRootOptions={mode:"open"};ac.getTemplateHTML=Sy;b.customElements.get("media-poster-image")||b.customElements.define("media-poster-image",ac);var Lv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ry=(t,e,i)=>(Lv(t,e,"read from private field"),i?i.call(t):e.get(t)),Ly=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Cy=(t,e,i,a)=>(Lv(t,e,"write to private field"),e.set(t,i),i),Bs;class Dy extends Fi{constructor(){super(),Ly(this,Bs,void 0),Cy(this,Bs,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PREVIEW_CHAPTER,c.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===c.MEDIA_PREVIEW_CHAPTER||e===c.MEDIA_LANG)&&a!==i&&a!=null)if(Ry(this,Bs).textContent=a,a!==""){const r=C("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return oe(this,c.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){re(this,c.MEDIA_PREVIEW_CHAPTER,e)}}Bs=new WeakMap;b.customElements.get("media-preview-chapter-display")||b.customElements.define("media-preview-chapter-display",Dy);var Cv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ts=(t,e,i)=>(Cv(t,e,"read from private field"),i?i.call(t):e.get(t)),My=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},is=(t,e,i,a)=>(Cv(t,e,"write to private field"),e.set(t,i),i),Bt;function xy(t){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}class El extends b.HTMLElement{constructor(){if(super(),My(this,Bt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(is(this,Bt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ts(this,Bt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=ts(this,Bt))==null?void 0:e.unassociateElement)==null||i.call(e,this),is(this,Bt,null)}attributeChangedCallback(e,i,a){var r,n,s,o,l;[c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===Q.MEDIA_CONTROLLER&&(i&&((n=(r=ts(this,Bt))==null?void 0:r.unassociateElement)==null||n.call(r,this),is(this,Bt,null)),a&&this.isConnected&&(is(this,Bt,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(l=(o=ts(this,Bt))==null?void 0:o.associateElement)==null||l.call(o,this)))}get mediaPreviewImage(){return oe(this,c.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){re(this,c.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(c.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(c.MEDIA_PREVIEW_COORDS);return}this.setAttribute(c.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,r,n,s]=e,o=i.split("#")[0],l=getComputedStyle(this),{maxWidth:d,maxHeight:m,minWidth:p,minHeight:h}=l,u=l.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let v,E;if(u==="fill"){const L=parseInt(d)/n,w=parseInt(m)/s,$=parseInt(p)/n,V=parseInt(h)/s;v=L<1?L:Math.max(L,$),E=w<1?w:Math.max(w,V)}else{const L=Math.min(parseInt(d)/n,parseInt(m)/s),w=Math.max(parseInt(p)/n,parseInt(h)/s),V=L<1?L:w>1?w:1;v=V,E=V}const{style:y}=Se(this.shadowRoot,":host"),g=Se(this.shadowRoot,"img").style,T=this.shadowRoot.querySelector("img"),k=Math.min(v,E)<1?"min":"max";y.setProperty(`${k}-width`,"initial","important"),y.setProperty(`${k}-height`,"initial","important"),y.width=`${n*v}px`,y.height=`${s*E}px`;const D=()=>{g.width=`${this.imgWidth*v}px`,g.height=`${this.imgHeight*E}px`,g.display="block"};T.src!==o&&(T.onload=()=>{this.imgWidth=T.naturalWidth,this.imgHeight=T.naturalHeight,D(),T.onload=null},T.src=o,D()),D(),g.transform=`translate(-${a*v}px, -${r*E}px)`}}Bt=new WeakMap;El.shadowRootOptions={mode:"open"};El.getTemplateHTML=xy;b.customElements.get("media-preview-thumbnail")||b.customElements.define("media-preview-thumbnail",El);var Jh=El,Dv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},em=(t,e,i)=>(Dv(t,e,"read from private field"),i?i.call(t):e.get(t)),Oy=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ny=(t,e,i,a)=>(Dv(t,e,"write to private field"),e.set(t,i),i),Zr;class Py extends Fi{constructor(){super(),Oy(this,Zr,void 0),Ny(this,Zr,this.shadowRoot.querySelector("slot")),em(this,Zr).textContent=Bi(0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_PREVIEW_TIME&&a!=null&&(em(this,Zr).textContent=Bi(parseFloat(a)))}get mediaPreviewTime(){return ie(this,c.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ce(this,c.MEDIA_PREVIEW_TIME,e)}}Zr=new WeakMap;b.customElements.get("media-preview-time-display")||b.customElements.define("media-preview-time-display",Py);const Ta={SEEK_OFFSET:"seekoffset"},Ul=30,Uy=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function $y(t,e){return`
    <slot name="icon">${Uy(e.seekOffset)}</slot>
  `}const Hy=(t,e)=>{t.setAttribute("aria-label",C("seek back {seekOffset} seconds",{seekOffset:e}))};function By(){return C("Seek backward")}const Wy=0;class rc extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_CURRENT_TIME,Ta.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ie(this,Ta.SEEK_OFFSET,Ul)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Hy(this,this.seekOffset),e===Ta.SEEK_OFFSET&&(this.seekOffset=ie(this,Ta.SEEK_OFFSET,Ul))}get seekOffset(){return ie(this,Ta.SEEK_OFFSET,Ul)}set seekOffset(e){ce(this,Ta.SEEK_OFFSET,e),this.setAttribute("aria-label",C("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Hp(Bp(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ie(this,c.MEDIA_CURRENT_TIME,Wy)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new b.CustomEvent(M.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}rc.getSlotTemplateHTML=$y;rc.getTooltipContentHTML=By;b.customElements.get("media-seek-backward-button")||b.customElements.define("media-seek-backward-button",rc);const Aa={SEEK_OFFSET:"seekoffset"},$l=30,Fy=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function Ky(t,e){return`
    <slot name="icon">${Fy(e.seekOffset)}</slot>
  `}const Vy=(t,e)=>{t.setAttribute("aria-label",C("seek forward {seekOffset} seconds",{seekOffset:e}))};function qy(){return C("Seek forward")}const Yy=0;class nc extends Me{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_CURRENT_TIME,Aa.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ie(this,Aa.SEEK_OFFSET,$l)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Vy(this,this.seekOffset),e===Aa.SEEK_OFFSET&&(this.seekOffset=ie(this,Aa.SEEK_OFFSET,$l))}get seekOffset(){return ie(this,Aa.SEEK_OFFSET,$l)}set seekOffset(e){ce(this,Aa.SEEK_OFFSET,e),this.setAttribute("aria-label",C("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Hp(Bp(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ie(this,c.MEDIA_CURRENT_TIME,Yy)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new b.CustomEvent(M.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}nc.getSlotTemplateHTML=Ky;nc.getTooltipContentHTML=qy;b.customElements.get("media-seek-forward-button")||b.customElements.define("media-seek-forward-button",nc);var sc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},St=(t,e,i)=>(sc(t,e,"read from private field"),i?i.call(t):e.get(t)),zi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},oc=(t,e,i,a)=>(sc(t,e,"write to private field"),e.set(t,i),i),Mi=(t,e,i)=>(sc(t,e,"access private method"),i),Oa,Zt,_l,lc,Mv,xo,dc,Xr,Ws,Fs,Ld;const Ii={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},tm=[...Object.values(Ii),c.MEDIA_CURRENT_TIME,c.MEDIA_DURATION,c.MEDIA_SEEKABLE],xv=["Enter"," "],Gy="&nbsp;/&nbsp;",Cd=(t,{timesSep:e=Gy}={})=>{var i,a;const r=(i=t.mediaCurrentTime)!=null?i:0,[,n]=(a=t.mediaSeekable)!=null?a:[];let s=0;Number.isFinite(t.mediaDuration)?s=t.mediaDuration:Number.isFinite(n)&&(s=n);const o=t.remaining?Bi(0-(s-r)):Bi(r);return t.showDuration?`${o}${e}${Bi(s)}`:o},zy=t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-description",C("video not loaded, unknown time."));return}const n=t.remaining?pn(0-(r-i)):pn(i);if(!t.showDuration){t.setAttribute("aria-description",n);return}const s=pn(r),o=C("{currentTime} of {totalTime}",{currentTime:n,totalTime:s});t.setAttribute("aria-description",o)};function Qy(t,e){return`
    <slot>${Cd(e)}</slot>
  `}const jy=t=>{t.setAttribute("aria-label",C("playback time"))};class Ov extends Fi{constructor(){super(),zi(this,lc),zi(this,xo),zi(this,Xr),zi(this,Fs),zi(this,Oa,void 0),zi(this,Zt,null),zi(this,_l,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!xv.includes(r)){this.removeEventListener("keyup",St(this,Zt));return}this.addEventListener("keyup",St(this,Zt))}),oc(this,Oa,this.shadowRoot.querySelector("slot")),St(this,Oa).innerHTML=`${Cd(this)}`}static get observedAttributes(){return[...super.observedAttributes,...tm,"disabled"]}connectedCallback(){const{style:e}=Se(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",C("playback time")),Mi(this,Xr,Ws).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),Mi(this,xo,dc).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){jy(this),tm.includes(e)?this.update():e==="disabled"&&a!==i?a==null?Mi(this,Xr,Ws).call(this):Mi(this,Fs,Ld).call(this):e===Ii.NO_TOGGLE&&a!==i&&(this.noToggle?Mi(this,Fs,Ld).call(this):Mi(this,Xr,Ws).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return Y(this,Ii.REMAINING)}set remaining(e){G(this,Ii.REMAINING,e)}get showDuration(){return Y(this,Ii.SHOW_DURATION)}set showDuration(e){G(this,Ii.SHOW_DURATION,e)}get noToggle(){return Y(this,Ii.NO_TOGGLE)}set noToggle(e){G(this,Ii.NO_TOGGLE,e)}get mediaDuration(){return ie(this,c.MEDIA_DURATION)}set mediaDuration(e){ce(this,c.MEDIA_DURATION,e)}get mediaCurrentTime(){return ie(this,c.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(c.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(c.MEDIA_SEEKABLE);return}this.setAttribute(c.MEDIA_SEEKABLE,e.join(":"))}update(){const e=Cd(this);zy(this),e!==St(this,Oa).innerHTML&&(St(this,Oa).innerHTML=e)}}Oa=new WeakMap;Zt=new WeakMap;_l=new WeakMap;lc=new WeakSet;Mv=function(){St(this,Zt)||(oc(this,Zt,t=>{const{key:e}=t;if(!xv.includes(e)){this.removeEventListener("keyup",St(this,Zt));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",St(this,_l)),this.addEventListener("click",this.toggleTimeDisplay))};xo=new WeakSet;dc=function(){St(this,Zt)&&(this.removeEventListener("keyup",St(this,Zt)),this.removeEventListener("keydown",St(this,_l)),this.removeEventListener("click",this.toggleTimeDisplay),oc(this,Zt,null))};Xr=new WeakSet;Ws=function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),Mi(this,lc,Mv).call(this))};Fs=new WeakSet;Ld=function(){this.removeAttribute("role"),this.disable(),Mi(this,xo,dc).call(this)};Ov.getSlotTemplateHTML=Qy;b.customElements.get("media-time-display")||b.customElements.define("media-time-display",Ov);var Nv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Le=(t,e,i)=>(Nv(t,e,"read from private field"),e.get(t)),Ct=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},et=(t,e,i,a)=>(Nv(t,e,"write to private field"),e.set(t,i),i),Zy=(t,e,i,a)=>({set _(r){et(t,e,r)},get _(){return Le(t,e)}}),Na,Ks,Pa,Jr,Vs,qs,Ys,Ua,Ji,Gs;class Xy{constructor(e,i,a){Ct(this,Na,void 0),Ct(this,Ks,void 0),Ct(this,Pa,void 0),Ct(this,Jr,void 0),Ct(this,Vs,void 0),Ct(this,qs,void 0),Ct(this,Ys,void 0),Ct(this,Ua,void 0),Ct(this,Ji,0),Ct(this,Gs,(r=performance.now())=>{et(this,Ji,requestAnimationFrame(Le(this,Gs))),et(this,Jr,performance.now()-Le(this,Pa));const n=1e3/this.fps;if(Le(this,Jr)>n){et(this,Pa,r-Le(this,Jr)%n);const s=1e3/((r-Le(this,Ks))/++Zy(this,Vs)._),o=(r-Le(this,qs))/1e3/this.duration;let l=Le(this,Ys)+o*this.playbackRate;l-Le(this,Na).valueAsNumber>0?et(this,Ua,this.playbackRate/this.duration/s):(et(this,Ua,.995*Le(this,Ua)),l=Le(this,Na).valueAsNumber+Le(this,Ua)),this.callback(l)}}),et(this,Na,e),this.callback=i,this.fps=a}start(){Le(this,Ji)===0&&(et(this,Pa,performance.now()),et(this,Ks,Le(this,Pa)),et(this,Vs,0),Le(this,Gs).call(this))}stop(){Le(this,Ji)!==0&&(cancelAnimationFrame(Le(this,Ji)),et(this,Ji,0))}update({start:e,duration:i,playbackRate:a}){const r=e-Le(this,Na).valueAsNumber,n=Math.abs(i-this.duration);(r>0||r<-.03||n>=.5)&&this.callback(e),et(this,Ys,e),et(this,qs,performance.now()),this.duration=i,this.playbackRate=a}}Na=new WeakMap;Ks=new WeakMap;Pa=new WeakMap;Jr=new WeakMap;Vs=new WeakMap;qs=new WeakMap;Ys=new WeakMap;Ua=new WeakMap;Ji=new WeakMap;Gs=new WeakMap;var uc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},se=(t,e,i)=>(uc(t,e,"read from private field"),i?i.call(t):e.get(t)),Ae=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},st=(t,e,i,a)=>(uc(t,e,"write to private field"),e.set(t,i),i),dt=(t,e,i)=>(uc(t,e,"access private method"),i),$a,xi,Oo,En,No,zs,On,Nn,Ha,Ba,en,Dd,Pv,Md,Po,cc,Uo,hc,$o,mc,xd,Uv,Pn,Ho,Od,$v;const Jy=t=>{const e=t.range,i=pn(+Hv(t)),a=pn(+t.mediaSeekableEnd),r=i&&a?C("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):C("video not loaded, unknown time.");e.setAttribute("aria-valuetext",r)};function eT(t){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${c.MEDIA_PREVIEW_IMAGE}], [${c.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${c.MEDIA_PREVIEW_IMAGE}], [${c.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${c.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${c.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${c.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${c.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${c.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${c.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${c.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${c.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${c.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${c.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${c.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${c.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${Jh.shadowRootOptions.mode}">
            ${Jh.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}const as=(t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},Hv=(t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i};class pc extends gr{constructor(){super(),Ae(this,Dd),Ae(this,Po),Ae(this,Uo),Ae(this,$o),Ae(this,xd),Ae(this,Pn),Ae(this,Od),Ae(this,$a,null),Ae(this,xi,void 0),Ae(this,Oo,void 0),Ae(this,En,void 0),Ae(this,No,void 0),Ae(this,zs,void 0),Ae(this,On,void 0),Ae(this,Nn,void 0),Ae(this,Ha,void 0),Ae(this,Ba,void 0),Ae(this,en,()=>{dt(this,Dd,Pv).call(this)?se(this,xi).start():se(this,xi).stop()}),Ae(this,Md,a=>{this.dragging||(Cu(a)&&(this.range.valueAsNumber=a),se(this,Ba)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),st(this,Oo,this.shadowRoot.querySelectorAll('[part~="box"]')),st(this,No,this.shadowRoot.querySelector('[part~="preview-box"]')),st(this,zs,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);st(this,On,parseInt(i.getPropertyValue("--media-box-padding-left"))),st(this,Nn,parseInt(i.getPropertyValue("--media-box-padding-right"))),st(this,xi,new Xy(this.range,se(this,Md),60))}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PAUSED,c.MEDIA_DURATION,c.MEDIA_SEEKABLE,c.MEDIA_CURRENT_TIME,c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_TIME,c.MEDIA_PREVIEW_CHAPTER,c.MEDIA_BUFFERED,c.MEDIA_PLAYBACK_RATE,c.MEDIA_LOADING,c.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",C("seek")),se(this,en).call(this),st(this,$a,this.getRootNode()),(e=se(this,$a))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),se(this,xi).stop(),(e=se(this,$a))==null||e.removeEventListener("transitionstart",this),st(this,$a,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===c.MEDIA_CURRENT_TIME||e===c.MEDIA_PAUSED||e===c.MEDIA_ENDED||e===c.MEDIA_LOADING||e===c.MEDIA_DURATION||e===c.MEDIA_SEEKABLE?(se(this,xi).update({start:as(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),se(this,en).call(this),Jy(this)):e===c.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===c.MEDIA_DURATION||e===c.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=se(this,Ha),this.updateBar()))}get mediaChaptersCues(){return se(this,Ha)}set mediaChaptersCues(e){var i;st(this,Ha,e),this.updateSegments((i=se(this,Ha))==null?void 0:i.map(a=>({start:as(this,a.startTime),end:as(this,a.endTime)})))}get mediaPaused(){return Y(this,c.MEDIA_PAUSED)}set mediaPaused(e){G(this,c.MEDIA_PAUSED,e)}get mediaLoading(){return Y(this,c.MEDIA_LOADING)}set mediaLoading(e){G(this,c.MEDIA_LOADING,e)}get mediaDuration(){return ie(this,c.MEDIA_DURATION)}set mediaDuration(e){ce(this,c.MEDIA_DURATION,e)}get mediaCurrentTime(){return ie(this,c.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return ie(this,c.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(c.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(c.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(c.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(c.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(c.MEDIA_SEEKABLE);return}this.setAttribute(c.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return oe(this,c.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){re(this,c.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return ie(this,c.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ce(this,c.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return Y(this,c.MEDIA_ENDED)}set mediaEnded(e){G(this,c.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const n=this.mediaCurrentTime,[,s=this.mediaSeekableStart]=(e=i.find(([o,l])=>o<=n&&n<=l))!=null?e:[];a=as(this,s)}const{style:r}=Se(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=Se(this.shadowRoot,"#current-rail"),a=Se(this.shadowRoot,'[part~="current-box"]'),r=dt(this,Po,cc).call(this,se(this,zs)),n=dt(this,Uo,hc).call(this,r,this.range.valueAsNumber),s=dt(this,$o,mc).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${n})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${s}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":dt(this,Od,$v).call(this);break;case"pointermove":dt(this,xd,Uv).call(this,e);break;case"pointerup":se(this,Ba)&&st(this,Ba,!1);break;case"pointerdown":st(this,Ba,!0);break;case"pointerleave":dt(this,Pn,Ho).call(this,null);break;case"transitionstart":bi(e.target,this)&&setTimeout(()=>se(this,en).call(this),0);break}}}$a=new WeakMap;xi=new WeakMap;Oo=new WeakMap;En=new WeakMap;No=new WeakMap;zs=new WeakMap;On=new WeakMap;Nn=new WeakMap;Ha=new WeakMap;Ba=new WeakMap;en=new WeakMap;Dd=new WeakSet;Pv=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Wp(this)};Md=new WeakMap;Po=new WeakSet;cc=function(t){var e;const a=((e=this.getAttribute("bounds")?_r(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),n=t.offsetWidth,s=-(r.left-a.left-n/2),o=a.right-r.left-n/2;return{box:{width:n,min:s,max:o},bounds:a,range:r}};Uo=new WeakSet;hc=function(t,e){let i=`${e*100}%`;const{width:a,min:r,max:n}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(n)){const o=`calc(1 / var(--_range-width) * 100 * ${n}% - var(--media-box-padding-right))`;i=`min(${i}, ${o})`}return i};$o=new WeakSet;mc=function(t,e){const{width:i,min:a,max:r}=t.box,n=e*t.range.width;if(n<a+se(this,On)){const s=t.range.left-t.bounds.left-se(this,On);return`${n-i/2+s}px`}if(n>r-se(this,Nn)){const s=t.bounds.right-t.range.right-se(this,Nn);return`${n+i/2-s-t.range.width}px`}return 0};xd=new WeakSet;Uv=function(t){const e=[...se(this,Oo)].some(m=>t.composedPath().includes(m));if(!this.dragging&&(e||!t.composedPath().includes(this))){dt(this,Pn,Ho).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=Se(this.shadowRoot,"#preview-rail"),r=Se(this.shadowRoot,'[part~="preview-box"]'),n=dt(this,Po,cc).call(this,se(this,No));let s=(t.clientX-n.range.left)/n.range.width;s=Math.max(0,Math.min(1,s));const o=dt(this,Uo,hc).call(this,n,s),l=dt(this,$o,mc).call(this,n,s);a.style.transform=`translateX(${o})`,a.style.setProperty("--_range-width",`${n.range.width}`),r.style.setProperty("--_box-shift",`${l}`),r.style.setProperty("--_box-width",`${n.box.width}px`);const d=Math.round(se(this,En))-Math.round(s*i);Math.abs(d)<1&&s>.01&&s<.99||(st(this,En,s*i),dt(this,Pn,Ho).call(this,se(this,En)))};Pn=new WeakSet;Ho=function(t){this.dispatchEvent(new b.CustomEvent(M.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Od=new WeakSet;$v=function(){se(this,xi).stop();const t=Hv(this);this.dispatchEvent(new b.CustomEvent(M.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};pc.shadowRootOptions={mode:"open"};pc.getContainerTemplateHTML=eT;b.customElements.get("media-time-range")||b.customElements.define("media-time-range",pc);var tT=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},im=(t,e,i)=>(tT(t,e,"read from private field"),i?i.call(t):e.get(t)),iT=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Qs;const aT=1,rT=t=>t.mediaMuted?0:t.mediaVolume,nT=t=>`${Math.round(t*100)}%`;class sT extends gr{constructor(){super(...arguments),iT(this,Qs,()=>{const e=this.range.value,i=new b.CustomEvent(M.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_VOLUME,c.MEDIA_MUTED,c.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",C("volume")),this.range.addEventListener("input",im(this,Qs))}disconnectedCallback(){this.range.removeEventListener("input",im(this,Qs)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===c.MEDIA_VOLUME||e===c.MEDIA_MUTED)&&(this.range.valueAsNumber=rT(this),this.range.setAttribute("aria-valuetext",nT(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return ie(this,c.MEDIA_VOLUME,aT)}set mediaVolume(e){ce(this,c.MEDIA_VOLUME,e)}get mediaMuted(){return Y(this,c.MEDIA_MUTED)}set mediaMuted(e){G(this,c.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return oe(this,c.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){re(this,c.MEDIA_VOLUME_UNAVAILABLE,e)}}Qs=new WeakMap;b.customElements.get("media-volume-range")||b.customElements.define("media-volume-range",sT);function oT(t){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${c.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function lT(){return C("Loop")}class vc extends Me{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=C("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return Y(this,c.MEDIA_LOOP)}set mediaLoop(e){G(this,c.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new b.CustomEvent(M.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}vc.getSlotTemplateHTML=oT;vc.getTooltipContentHTML=lT;b.customElements.get("media-loop-button")||b.customElements.define("media-loop-button",vc);var Bv=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},K=(t,e,i)=>(Bv(t,e,"read from private field"),i?i.call(t):e.get(t)),qt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},mi=(t,e,i,a)=>(Bv(t,e,"write to private field"),e.set(t,i),i),Wa,js,ea,tn,Ri,Li,Ci,ta,Fa,Zs,gt;const am=1,rm=0,dT=1,uT={processCallback(t,e,i){if(i){for(const[a,r]of e)if(a in i){const n=i[a];typeof n=="boolean"&&r instanceof It&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=n:typeof n=="function"&&r instanceof It?r.element[r.attributeName]=n:r.value=n}}}};class bl extends b.DocumentFragment{constructor(e,i,a=uT){var r;super(),qt(this,Wa,void 0),qt(this,js,void 0),this.append(e.content.cloneNode(!0)),mi(this,Wa,Wv(this)),mi(this,js,a),(r=a.createCallback)==null||r.call(a,this,K(this,Wa),i),a.processCallback(this,K(this,Wa),i)}update(e){K(this,js).processCallback(this,K(this,Wa),e)}}Wa=new WeakMap;js=new WeakMap;const Wv=(t,e=[])=>{let i,a;for(const r of t.attributes||[])if(r.value.includes("{{")){const n=new hT;for([i,a]of sm(r.value))if(!i)n.append(a);else{const s=new It(t,r.name,r.namespaceURI);n.append(s),e.push([a,s])}r.value=n.toString()}for(const r of t.childNodes)if(r.nodeType===am&&!(r instanceof HTMLTemplateElement))Wv(r,e);else{const n=r.data;if(r.nodeType===am||n.includes("{{")){const s=[];if(n)for([i,a]of sm(n))if(!i)s.push(new Text(a));else{const o=new yr(t);s.push(o),e.push([a,o])}else if(r instanceof HTMLTemplateElement){const o=new Vv(t,r);s.push(o),e.push([o.expression,o])}r.replaceWith(...s.flatMap(o=>o.replacementNodes||[o]))}}return e},nm={},sm=t=>{let e="",i=0,a=nm[t],r=0,n;if(a)return a;for(a=[];n=t[r];r++)n==="{"&&t[r+1]==="{"&&t[r-1]!=="\\"&&t[r+2]&&++i==1?(e&&a.push([rm,e]),e="",r++):n==="}"&&t[r+1]==="}"&&t[r-1]!=="\\"&&!--i?(a.push([dT,e.trim()]),e="",r++):e+=n||"";return e&&a.push([rm,(i>0?"{{":"")+e]),nm[t]=a},cT=11;class Fv{get value(){return""}set value(e){}toString(){return this.value}}const Kv=new WeakMap;class hT{constructor(){qt(this,ea,[])}[Symbol.iterator](){return K(this,ea).values()}get length(){return K(this,ea).length}item(e){return K(this,ea)[e]}append(...e){for(const i of e)i instanceof It&&Kv.set(i,this),K(this,ea).push(i)}toString(){return K(this,ea).join("")}}ea=new WeakMap;class It extends Fv{constructor(e,i,a){super(),qt(this,ta),qt(this,tn,""),qt(this,Ri,void 0),qt(this,Li,void 0),qt(this,Ci,void 0),mi(this,Ri,e),mi(this,Li,i),mi(this,Ci,a)}get attributeName(){return K(this,Li)}get attributeNamespace(){return K(this,Ci)}get element(){return K(this,Ri)}get value(){return K(this,tn)}set value(e){K(this,tn)!==e&&(mi(this,tn,e),!K(this,ta,Fa)||K(this,ta,Fa).length===1?e==null?K(this,Ri).removeAttributeNS(K(this,Ci),K(this,Li)):K(this,Ri).setAttributeNS(K(this,Ci),K(this,Li),e):K(this,Ri).setAttributeNS(K(this,Ci),K(this,Li),K(this,ta,Fa).toString()))}get booleanValue(){return K(this,Ri).hasAttributeNS(K(this,Ci),K(this,Li))}set booleanValue(e){if(!K(this,ta,Fa)||K(this,ta,Fa).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}}tn=new WeakMap;Ri=new WeakMap;Li=new WeakMap;Ci=new WeakMap;ta=new WeakSet;Fa=function(){return Kv.get(this)};class yr extends Fv{constructor(e,i){super(),qt(this,Zs,void 0),qt(this,gt,void 0),mi(this,Zs,e),mi(this,gt,i?[...i]:[new Text])}get replacementNodes(){return K(this,gt)}get parentNode(){return K(this,Zs)}get nextSibling(){return K(this,gt)[K(this,gt).length-1].nextSibling}get previousSibling(){return K(this,gt)[0].previousSibling}get value(){return K(this,gt).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===cT?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),mi(this,gt,mT(K(this,gt)[0].parentNode,K(this,gt),i,this.nextSibling))}}Zs=new WeakMap;gt=new WeakMap;class Vv extends yr{constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let r=i.getAttribute("expression")||i.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=i,this.directive=a}}function mT(t,e,i,a=null){let r=0,n,s,o,l=i.length,d=e.length;for(;r<l&&r<d&&e[r]==i[r];)r++;for(;r<l&&r<d&&i[l-1]==e[d-1];)a=i[--d,--l];if(r==d)for(;r<l;)t.insertBefore(i[r++],a);if(r==l)for(;r<d;)t.removeChild(e[r++]);else{for(n=e[r];r<l;)o=i[r++],s=n?n.nextSibling:a,n==o?n=s:r<l&&i[r]==s?(t.replaceChild(o,n),n=s):t.insertBefore(o,n);for(;n!=a;)s=n.nextSibling,t.removeChild(n),n=s}return i}const om={string:t=>String(t)};class qv{constructor(e){this.template=e,this.state=void 0}}const la=new WeakMap,da=new WeakMap,Nd={partial:(t,e)=>{e[t.expression]=new qv(t.template)},if:(t,e)=>{var i;if(Yv(t.expression,e))if(la.get(t)!==t.template){la.set(t,t.template);const a=new bl(t.template,e,fc);t.replace(a),da.set(t,a)}else(i=da.get(t))==null||i.update(e);else t.replace(""),la.delete(t),da.delete(t)}},pT=Object.keys(Nd),fc={processCallback(t,e,i){var a,r;if(i)for(const[n,s]of e){if(s instanceof Vv){if(!s.directive){const l=pT.find(d=>s.template.hasAttribute(d));l&&(s.directive=l,s.expression=s.template.getAttribute(l))}(a=Nd[s.directive])==null||a.call(Nd,s,i);continue}let o=Yv(n,i);if(o instanceof qv){la.get(s)!==o.template?(la.set(s,o.template),o=new bl(o.template,o.state,fc),s.value=o,da.set(s,o)):(r=da.get(s))==null||r.update(o.state);continue}o?(s instanceof It&&s.attributeName.startsWith("aria-")&&(o=String(o)),s instanceof It?typeof o=="boolean"?s.booleanValue=o:typeof o=="function"?s.element[s.attributeName]=o:s.value=o:(s.value=o,la.delete(s),da.delete(s))):s instanceof It?s.value=void 0:(s.value=void 0,la.delete(s),da.delete(s))}}},lm={"!":t=>!t,"!!":t=>!!t,"==":(t,e)=>t==e,"!=":(t,e)=>t!=e,">":(t,e)=>t>e,">=":(t,e)=>t>=e,"<":(t,e)=>t<e,"<=":(t,e)=>t<=e,"??":(t,e)=>t??e,"|":(t,e)=>{var i;return(i=om[e])==null?void 0:i.call(om,t)}};function vT(t){return fT(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}function Yv(t,e={}){var i,a,r,n,s,o,l;const d=vT(t);if(d.length===0||d.some(({type:m})=>!m))return Mr(t);if(((i=d[0])==null?void 0:i.token)===">"){const m=e[(a=d[1])==null?void 0:a.token];if(!m)return Mr(t);const p={...e};m.state=p;const h=d.slice(2);for(let u=0;u<h.length;u+=3){const v=(r=h[u])==null?void 0:r.token,E=(n=h[u+1])==null?void 0:n.token,y=(s=h[u+2])==null?void 0:s.token;v&&E==="="&&(p[v]=xr(y,e))}return m}if(d.length===1)return rs(d[0])?xr(d[0].token,e):Mr(t);if(d.length===2){const m=(o=d[0])==null?void 0:o.token,p=lm[m];if(!p||!rs(d[1]))return Mr(t);const h=xr(d[1].token,e);return p(h)}if(d.length===3){const m=(l=d[1])==null?void 0:l.token,p=lm[m];if(!p||!rs(d[0])||!rs(d[2]))return Mr(t);const h=xr(d[0].token,e);if(m==="|")return p(h,d[2].token);const u=xr(d[2].token,e);return p(h,u)}}function Mr(t){return console.warn(`Warning: invalid expression \`${t}\``),!1}function rs({type:t}){return["number","boolean","string","param"].includes(t)}function xr(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):Dp(t)?parseFloat(t):e[t]}function fT(t,e){let i,a,r;const n=[];for(;t;){r=null,i=t.length;for(const s in e)a=e[s].exec(t),a&&a.index<i&&(r={token:a[0],type:s,matches:a.slice(1)},i=a.index);i&&n.push({token:t.substr(0,i),type:void 0}),r&&n.push(r),t=t.substr(i+(r?r.token.length:0))}return n}var Ec=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Di=(t,e,i)=>(Ec(t,e,"read from private field"),i?i.call(t):e.get(t)),Qi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},hi=(t,e,i,a)=>(Ec(t,e,"write to private field"),e.set(t,i),i),Hl=(t,e,i)=>(Ec(t,e,"access private method"),i),rr,Xs,nr,Ka,Pd,Gv,Js,Ud,an;const Bl={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},zv=Te.createElement("template");zv.innerHTML=`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;class gl extends b.HTMLElement{constructor(){super(),Qi(this,Pd),Qi(this,Js),Qi(this,rr,void 0),Qi(this,Xs,void 0),Qi(this,nr,void 0),Qi(this,Ka,void 0),Qi(this,an,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer()),hi(this,Ka,new MutationObserver(e=>{var i;this.mediaController&&!((i=this.mediaController)!=null&&i.breakpointsComputed)||e.some(a=>{const r=a.target;return r===this?!0:r.localName!=="media-controller"?!1:!!(Bl[a.attributeName]||a.attributeName.startsWith("breakpoint"))})&&this.render()})),hi(this,an,this.render.bind(this)),Hl(this,Pd,Gv).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=Di(this,rr))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(hi(this,rr,e),hi(this,nr,null),this.createRenderer())}get props(){var e,i,a;const r=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:s})=>Bl[s]||s.startsWith("breakpoint")),...Array.from(this.attributes)],n={};for(const s of r){const o=(a=Bl[s.name])!=null?a:E0(s.name);let{value:l}=s;l!=null?(Dp(l)&&(l=parseFloat(l)),n[o]=l===""?!0:l):n[o]=!1}return n}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&Hl(this,Js,Ud).call(this)}connectedCallback(){this.addEventListener(Xt.BREAKPOINTS_COMPUTED,Di(this,an)),Di(this,Ka).observe(this,{attributes:!0}),Di(this,Ka).observe(this.renderRoot,{attributes:!0,subtree:!0}),Hl(this,Js,Ud).call(this)}disconnectedCallback(){this.removeEventListener(Xt.BREAKPOINTS_COMPUTED,Di(this,an)),Di(this,Ka).disconnect()}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==Di(this,Xs)&&(hi(this,Xs,this.template),this.renderer=new bl(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(zv.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}}rr=new WeakMap;Xs=new WeakMap;nr=new WeakMap;Ka=new WeakMap;Pd=new WeakSet;Gv=function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}};Js=new WeakSet;Ud=function(){var t;const e=this.getAttribute("template");if(!e||e===Di(this,nr))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){hi(this,nr,e),hi(this,rr,a),this.createRenderer();return}ET(e)&&(hi(this,nr,e),_T(e).then(r=>{const n=Te.createElement("template");n.innerHTML=r,hi(this,rr,n),this.createRenderer()}).catch(console.error))};an=new WeakMap;gl.observedAttributes=["template"];gl.processor=fc;function ET(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}async function _T(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}b.customElements.get("media-theme")||b.customElements.define("media-theme",gl);function bT({anchor:t,floating:e,placement:i}){const a=gT({anchor:t,floating:e}),{x:r,y:n}=TT(a,i);return{x:r,y:n}}function gT({anchor:t,floating:e}){return{anchor:yT(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function yT(t,e){var i;const a=t.getBoundingClientRect(),r=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}function TT({anchor:t,floating:e},i){const a=AT(i)==="x"?"y":"x",r=a==="y"?"height":"width",n=Qv(i),s=t.x+t.width/2-e.width/2,o=t.y+t.height/2-e.height/2,l=t[r]/2-e[r]/2;let d;switch(n){case"top":d={x:s,y:t.y-e.height};break;case"bottom":d={x:s,y:t.y+t.height};break;case"right":d={x:t.x+t.width,y:o};break;case"left":d={x:t.x-e.width,y:o};break;default:d={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":d[a]-=l;break;case"end":d[a]+=l;break}return d}function Qv(t){return t.split("-")[0]}function AT(t){return["top","bottom"].includes(Qv(t))?"y":"x"}class _c extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}}class kT extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}}var bc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},z=(t,e,i)=>(bc(t,e,"read from private field"),i?i.call(t):e.get(t)),J=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ot=(t,e,i,a)=>(bc(t,e,"write to private field"),e.set(t,i),i),ee=(t,e,i)=>(bc(t,e,"access private method"),i),Wt,Ui,fi,eo,rn,ma,Un,$d,jv,Bo,gc,Wo,to,Hd,Bd,Zv,Wd,Xv,Fd,Jv,sr,or,lr,$n,Fo,yc,Kd,ef,Tc,tf,Vd,af,Ac,rf,qd,nf,Yd,sf,_n,Ko,Gd,of,bn,Vo,io,zd;function fr({type:t,text:e,value:i,checked:a}){const r=Te.createElement("media-chrome-menu-item");r.type=t,r.part.add("menu-item"),r.part.add(t),r.value=i,r.checked=a;const n=Te.createElement("span");return n.textContent=e,r.append(n),r}function pa(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}function ST(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;
        
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `}const ji={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class ht extends b.HTMLElement{constructor(){if(super(),J(this,$d),J(this,Bo),J(this,to),J(this,Bd),J(this,Wd),J(this,Fd),J(this,lr),J(this,Fo),J(this,Kd),J(this,Tc),J(this,Vd),J(this,Ac),J(this,qd),J(this,Yd),J(this,_n),J(this,Gd),J(this,bn),J(this,io),J(this,Wt,null),J(this,Ui,null),J(this,fi,null),J(this,eo,new Set),J(this,rn,void 0),J(this,ma,!1),J(this,Un,null),J(this,Wo,()=>{const e=z(this,eo),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));ot(this,eo,i)}),J(this,sr,()=>{ee(this,lr,$n).call(this),ee(this,Fo,yc).call(this,!1)}),J(this,or,()=>{ee(this,lr,$n).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),ot(this,rn,new MutationObserver(z(this,Wo)))}static get observedAttributes(){return[ji.DISABLED,ji.HIDDEN,ji.STYLE,ji.ANCHOR,Q.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":ee(this,$d,jv).call(this,e);break;case"invoke":ee(this,Bd,Zv).call(this,e);break;case"click":ee(this,Kd,ef).call(this,e);break;case"toggle":ee(this,Vd,af).call(this,e);break;case"focusout":ee(this,qd,nf).call(this,e);break;case"keydown":ee(this,Yd,sf).call(this,e);break}}connectedCallback(){var e,i;z(this,rn).observe(this.defaultSlot,{childList:!0}),ot(this,Un,xu(this.shadowRoot,":host")),ee(this,to,Hd).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),ot(this,Wt,od(this)),(i=(e=z(this,Wt))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(hr(Hn(this),z(this,sr)),hr(this,z(this,or))),ee(this,Bo,gc).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var e,i;z(this,rn).disconnect(),mr(Hn(this),z(this,sr)),mr(this,z(this,or)),this.disable(),(i=(e=z(this,Wt))==null?void 0:e.unassociateElement)==null||i.call(e,this),ot(this,Wt,null),ot(this,Ui,null),ot(this,fi,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(e,i,a){var r,n,s,o;e===ji.HIDDEN&&a!==i?(z(this,ma)||ot(this,ma,!0),this.hidden?ee(this,Fd,Jv).call(this):ee(this,Wd,Xv).call(this),this.dispatchEvent(new kT({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===Q.MEDIA_CONTROLLER?(i&&((n=(r=z(this,Wt))==null?void 0:r.unassociateElement)==null||n.call(r,this),ot(this,Wt,null)),a&&this.isConnected&&(ot(this,Wt,od(this)),(o=(s=z(this,Wt))==null?void 0:s.associateElement)==null||o.call(s,this))):e===ji.DISABLED&&a!==i?a==null?this.enable():this.disable():e===ji.STYLE&&a!==i&&ee(this,to,Hd).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=ol(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(wT)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&ee(this,io,zd).call(this,i)}focus(){if(ot(this,Ui,Mu()),this.items.length){ee(this,bn,Vo).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=ee(this,_n,Ko).call(this,e);a&&(ee(this,io,zd).call(this,a,a.type==="checkbox"),z(this,fi)&&!this.hidden&&((i=z(this,Ui))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:r}=e,n=this.items,s=(a=(i=ee(this,_n,Ko).call(this,e))!=null?i:ee(this,Gd,of).call(this))!=null?a:n[0],o=n.indexOf(s);let l=Math.max(0,o);r==="ArrowDown"?l++:r==="ArrowUp"?l--:e.key==="Home"?l=0:e.key==="End"&&(l=n.length-1),l<0&&(l=n.length-1),l>n.length-1&&(l=0),ee(this,bn,Vo).call(this,n[l]),n[l].focus()}}Wt=new WeakMap;Ui=new WeakMap;fi=new WeakMap;eo=new WeakMap;rn=new WeakMap;ma=new WeakMap;Un=new WeakMap;$d=new WeakSet;jv=function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&ee(this,Bo,gc).call(this),e.name||z(this,Wo).call(this)};Bo=new WeakSet;gc=function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0};Wo=new WeakMap;to=new WeakSet;Hd=function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};Bd=new WeakSet;Zv=function(t){ot(this,fi,t.relatedTarget),bi(this,t.relatedTarget)||(this.hidden=!this.hidden)};Wd=new WeakSet;Xv=function(){var t;(t=z(this,fi))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),hr(Hn(this),z(this,sr)),hr(this,z(this,or))};Fd=new WeakSet;Jv=function(){var t;(t=z(this,fi))==null||t.setAttribute("aria-expanded","false"),mr(Hn(this),z(this,sr)),mr(this,z(this,or))};sr=new WeakMap;or=new WeakMap;lr=new WeakSet;$n=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=bT({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const r=Hn(this).getBoundingClientRect(),n=r.width-e-t,s=r.height-i-this.offsetHeight,{style:o}=z(this,Un);o.setProperty("position","absolute"),o.setProperty("right",`${Math.max(0,n)}px`),o.setProperty("--_menu-bottom",`${s}px`);const l=getComputedStyle(this),m=o.getPropertyValue("--_menu-bottom")===l.bottom?s:parseFloat(l.bottom),p=r.height-m-parseFloat(l.marginBottom);this.style.setProperty("--_menu-max-height",`${p}px`)};Fo=new WeakSet;yc=function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=z(this,Un);if(t||a.setProperty("--media-menu-transition-in","none"),i){const r=i.offsetHeight,n=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${n}px`),this.style.setProperty("min-height",`${r}px`),ee(this,lr,$n).call(this,n)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),ee(this,lr,$n).call(this);a.removeProperty("--media-menu-transition-in")};Kd=new WeakSet;ef=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(z(this,Tc,tf))){(e=z(this,Ui))==null||e.focus(),this.hidden=!0;return}const i=ee(this,_n,Ko).call(this,t);!i||i.hasAttribute("disabled")||(ee(this,bn,Vo).call(this,i),this.handleSelect(t))};Tc=new WeakSet;tf=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};Vd=new WeakSet;af=function(t){if(t.target===this)return;ee(this,Ac,rf).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new _c({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);ee(this,Fo,yc).call(this,!0)};Ac=new WeakSet;rf=function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};qd=new WeakSet;nf=function(t){var e;bi(this,t.relatedTarget)||(z(this,ma)&&((e=z(this,Ui))==null||e.focus()),z(this,fi)&&z(this,fi)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};Yd=new WeakSet;sf=function(t){var e,i,a,r,n;const{key:s,ctrlKey:o,altKey:l,metaKey:d}=t;if(!(o||l||d)&&this.keysUsed.includes(s))if(t.preventDefault(),t.stopPropagation(),s==="Tab"){if(z(this,ma)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else s==="Escape"?((n=z(this,Ui))==null||n.focus(),z(this,ma)&&(this.hidden=!0)):s==="Enter"||s===" "?this.handleSelect(t):this.handleMove(t)};_n=new WeakSet;Ko=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};Gd=new WeakSet;of=function(){return this.items.find(t=>t.tabIndex===0)};bn=new WeakSet;Vo=function(t){for(const e of this.items)e.tabIndex=e===t?0:-1};io=new WeakSet;zd=function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};ht.shadowRootOptions={mode:"open"};ht.getTemplateHTML=ST;function wT(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}function Hn(t){var e;return(e=t.getAttribute("bounds")?_r(t,`#${t.getAttribute("bounds")}`):Ge(t)||t.parentElement)!=null?e:t}b.customElements.get("media-chrome-menu")||b.customElements.define("media-chrome-menu",ht);var kc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ke=(t,e,i)=>(kc(t,e,"read from private field"),i?i.call(t):e.get(t)),ai=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Wl=(t,e,i,a)=>(kc(t,e,"write to private field"),e.set(t,i),i),Ja=(t,e,i)=>(kc(t,e,"access private method"),i),ao,gn,Qd,lf,qo,Sc,wc,df,Qt,Va,jd,ro,Zd;function IT(t){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(t)}
    </slot>
    <slot name="submenu"></slot>
  `}function RT(t){return""}const rt={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class Ki extends b.HTMLElement{constructor(){if(super(),ai(this,Qd),ai(this,qo),ai(this,wc),ai(this,ro),ai(this,ao,!1),ai(this,gn,void 0),ai(this,Qt,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],n=(i=r?.dataset.description)!=null?i:r?.text,s=Te.createElement("span");s.textContent=n??"",a.replaceChildren(s)}),ai(this,Va,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",Ke(this,Va));return}this.handleClick(e)}),ai(this,jd,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",Ke(this,Va));return}this.addEventListener("keyup",Ke(this,Va),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[rt.TYPE,rt.DISABLED,rt.CHECKED,rt.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Or(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Ja(this,Qd,lf).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":Ke(this,jd).call(this,e);break;case"keyup":Ke(this,Va).call(this,e);break}}attributeChangedCallback(e,i,a){e===rt.CHECKED&&Or(this)&&!Ke(this,ao)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===rt.TYPE&&a!==i?this.role="menuitem"+a:e===rt.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(rt.DISABLED)||this.enable(),this.role="menuitem"+this.type,Wl(this,gn,Xd(this,this.parentNode)),Ja(this,ro,Zd).call(this),this.submenuElement&&Ja(this,qo,Sc).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),Ja(this,ro,Zd).call(this),Wl(this,gn,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=ol(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(rt.TYPE))!=null?e:""}set type(e){this.setAttribute(rt.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(rt.VALUE))!=null?e:this.text}set value(e){this.setAttribute(rt.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(Or(this))return this.getAttribute("aria-checked")==="true"}set checked(e){Or(this)&&(Wl(this,ao,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){Or(this)||this.invokeTargetElement&&bi(this,e.target)&&this.invokeTargetElement.dispatchEvent(new _c({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}ao=new WeakMap;gn=new WeakMap;Qd=new WeakSet;lf=function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Ja(this,qo,Sc).call(this):Ja(this,wc,df).call(this))};qo=new WeakSet;Sc=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Ke(this,Qt)),this.submenuElement.addEventListener("addmenuitem",Ke(this,Qt)),this.submenuElement.addEventListener("removemenuitem",Ke(this,Qt)),Ke(this,Qt).call(this)};wc=new WeakSet;df=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Ke(this,Qt)),this.submenuElement.removeEventListener("addmenuitem",Ke(this,Qt)),this.submenuElement.removeEventListener("removemenuitem",Ke(this,Qt)),Ke(this,Qt).call(this)};Qt=new WeakMap;Va=new WeakMap;jd=new WeakMap;ro=new WeakSet;Zd=function(){var t;const e=(t=Ke(this,gn))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")};Ki.shadowRootOptions={mode:"open"};Ki.getTemplateHTML=IT;Ki.getSuffixSlotInnerHTML=RT;function Or(t){return t.type==="radio"||t.type==="checkbox"}function Xd(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?Xd(t,i):e?.items?e:Xd(e,e?.parentNode)}b.customElements.get("media-chrome-menu-item")||b.customElements.define("media-chrome-menu-item",Ki);function LT(t){return`
    ${ht.getTemplateHTML(t)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `}class uf extends ht{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-settings-menu-button")}}uf.getTemplateHTML=LT;b.customElements.get("media-settings-menu")||b.customElements.define("media-settings-menu",uf);function CT(t){return`
    ${Ki.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function DT(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}class yl extends Ki{}yl.shadowRootOptions={mode:"open"};yl.getTemplateHTML=CT;yl.getSuffixSlotInnerHTML=DT;b.customElements.get("media-settings-menu-item")||b.customElements.define("media-settings-menu-item",yl);class Tr extends Me{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=ol(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new _c({relatedTarget:this}))}}b.customElements.get("media-chrome-menu-button")||b.customElements.define("media-chrome-menu-button",Tr);function MT(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `}function xT(){return C("Settings")}class Ic extends Tr{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",C("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Ge(this).querySelector("media-settings-menu")}}Ic.getSlotTemplateHTML=MT;Ic.getTooltipContentHTML=xT;b.customElements.get("media-settings-menu-button")||b.customElements.define("media-settings-menu-button",Ic);var Rc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},cf=(t,e,i)=>(Rc(t,e,"read from private field"),i?i.call(t):e.get(t)),ns=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Jd=(t,e,i,a)=>(Rc(t,e,"write to private field"),e.set(t,i),i),ss=(t,e,i)=>(Rc(t,e,"access private method"),i),nn,Yo,no,eu,so,tu;class OT extends ht{constructor(){super(...arguments),ns(this,no),ns(this,so),ns(this,nn,[]),ns(this,Yo,void 0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_AUDIO_TRACK_LIST,c.MEDIA_AUDIO_TRACK_ENABLED,c.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===c.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(Jd(this,nn,p0(a??"")),ss(this,no,eu).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ss(this,so,tu))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ss(this,so,tu))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=Ge(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return cf(this,nn)}set mediaAudioTrackList(e){Jd(this,nn,e),ss(this,no,eu).call(this)}get mediaAudioTrackEnabled(){var e;return(e=oe(this,c.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){re(this,c.MEDIA_AUDIO_TRACK_ENABLED,e)}}nn=new WeakMap;Yo=new WeakMap;no=new WeakSet;eu=function(){if(cf(this,Yo)===JSON.stringify(this.mediaAudioTrackList))return;Jd(this,Yo,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=fr({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(a)}};so=new WeakSet;tu=function(){if(this.value==null)return;const t=new b.CustomEvent(M.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};b.customElements.get("media-audio-track-menu")||b.customElements.define("media-audio-track-menu",OT);const NT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function PT(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${NT}</slot>
  `}function UT(){return C("Audio")}const dm=t=>{const e=C("Audio");t.setAttribute("aria-label",e)};class Lc extends Tr{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_AUDIO_TRACK_ENABLED,c.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),dm(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_LANG&&dm(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Ge(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=oe(this,c.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){re(this,c.MEDIA_AUDIO_TRACK_ENABLED,e)}}Lc.getSlotTemplateHTML=PT;Lc.getTooltipContentHTML=UT;b.customElements.get("media-audio-track-menu-button")||b.customElements.define("media-audio-track-menu-button",Lc);var Cc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$T=(t,e,i)=>(Cc(t,e,"read from private field"),e.get(t)),Fl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},HT=(t,e,i,a)=>(Cc(t,e,"write to private field"),e.set(t,i),i),os=(t,e,i)=>(Cc(t,e,"access private method"),i),Go,oo,iu,lo,au;const BT=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function WT(t){return`
    ${ht.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${BT}</slot>
  `}class hf extends ht{constructor(){super(...arguments),Fl(this,oo),Fl(this,lo),Fl(this,Go,void 0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_LIST&&i!==a?os(this,oo,iu).call(this):e===c.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",os(this,oo,iu).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",os(this,lo,au))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",os(this,lo,au))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return um(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){cm(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return um(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){cm(this,c.MEDIA_SUBTITLES_SHOWING,e)}}Go=new WeakMap;oo=new WeakSet;iu=function(){var t;const e=$T(this,Go)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(c.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;HT(this,Go,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,r=fr({type:"radio",text:this.formatMenuItemText(C("Off")),value:"off",checked:a});r.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(r);const n=this.mediaSubtitlesList;for(const s of n){const o=fr({type:"radio",text:this.formatMenuItemText(s.label,s),value:cd(s),checked:this.value==cd(s)});o.prepend(pa(this,"checked-indicator")),((t=s.kind)!=null?t:"subs")==="captions"&&o.append(pa(this,"captions-indicator")),this.defaultSlot.append(o)}};lo=new WeakSet;au=function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(c.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new b.CustomEvent(M.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new b.CustomEvent(M.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};hf.getTemplateHTML=WT;const um=(t,e)=>{const i=t.getAttribute(e);return i?hl(i):[]},cm=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Mn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};b.customElements.get("media-captions-menu")||b.customElements.define("media-captions-menu",hf);const FT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,KT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function VT(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${FT}</slot>
      <slot name="off">${KT}</slot>
    </slot>
  `}function qT(){return C("Captions")}const hm=t=>{t.setAttribute("data-captions-enabled",jp(t).toString())},mm=t=>{t.setAttribute("aria-label",C("closed captions"))};class Dc extends Tr{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING,c.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),mm(this),hm(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_SHOWING?hm(this):e===c.MEDIA_LANG&&mm(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Ge(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return pm(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){vm(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return pm(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){vm(this,c.MEDIA_SUBTITLES_SHOWING,e)}}Dc.getSlotTemplateHTML=VT;Dc.getTooltipContentHTML=qT;const pm=(t,e)=>{const i=t.getAttribute(e);return i?hl(i):[]},vm=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Mn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};b.customElements.get("media-captions-menu-button")||b.customElements.define("media-captions-menu-button",Dc);var mf=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},qa=(t,e,i)=>(mf(t,e,"read from private field"),i?i.call(t):e.get(t)),Kl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ka=(t,e,i)=>(mf(t,e,"access private method"),i),Oi,Ya,sn,uo,ru;const Vl={RATES:"rates"};class YT extends ht{constructor(){super(),Kl(this,Ya),Kl(this,uo),Kl(this,Oi,new Pu(this,Vl.RATES,{defaultValue:Rv})),ka(this,Ya,sn).call(this)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,Vl.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,ka(this,Ya,sn).call(this)):e===Vl.RATES&&i!=a&&(qa(this,Oi).value=a,ka(this,Ya,sn).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ka(this,uo,ru))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ka(this,uo,ru))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-playback-rate-menu-button")}get rates(){return qa(this,Oi)}set rates(e){e?Array.isArray(e)?qa(this,Oi).value=e.join(" "):typeof e=="string"&&(qa(this,Oi).value=e):qa(this,Oi).value="",ka(this,Ya,sn).call(this)}get mediaPlaybackRate(){return ie(this,c.MEDIA_PLAYBACK_RATE,Xa)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}}Oi=new WeakMap;Ya=new WeakSet;sn=function(){this.defaultSlot.textContent="";const t=Wi(this.mediaPlaybackRate),e=new Set(Array.from(qa(this,Oi)).map(a=>Wi(Number(a))));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,r)=>a-r);for(const a of i){const r=fr({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});r.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(r)}};uo=new WeakSet;ru=function(){if(!this.value)return;const t=new b.CustomEvent(M.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};b.customElements.get("media-playback-rate-menu")||b.customElements.define("media-playback-rate-menu",YT);const co=1;function GT(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }

      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate?Wi(+t.mediaplaybackrate):co}x</slot>
  `}function zT(){return C("Playback rate")}class Mc extends Tr{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${Wi((e=this.mediaPlaybackRate)!=null?e:co)}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===c.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,n=Wi(Number.isNaN(r)?co:r);this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",C("Playback rate {playbackRate}",{playbackRate:n}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Ge(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return ie(this,c.MEDIA_PLAYBACK_RATE,co)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}}Mc.getSlotTemplateHTML=GT;Mc.getTooltipContentHTML=zT;b.customElements.get("media-playback-rate-menu-button")||b.customElements.define("media-playback-rate-menu-button",Mc);var xc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ni=(t,e,i)=>(xc(t,e,"read from private field"),i?i.call(t):e.get(t)),ls=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},fm=(t,e,i,a)=>(xc(t,e,"write to private field"),e.set(t,i),i),Sa=(t,e,i)=>(xc(t,e,"access private method"),i),on,Kt,Ga,ln,ho,nu;class QT extends ht{constructor(){super(...arguments),ls(this,Ga),ls(this,ho),ls(this,on,[]),ls(this,Kt,{})}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_RENDITION_LIST,c.MEDIA_RENDITION_SELECTED,c.MEDIA_RENDITION_UNAVAILABLE,c.MEDIA_HEIGHT,c.MEDIA_WIDTH]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const r=e.bitrate/1e6,n=`${r.toFixed(r<1?1:0)} Mbps`;return`${a} (${n})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,r;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((r=e.bitrate)!=null?r:0):i.height-e.height}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),i!==a)switch(e){case c.MEDIA_RENDITION_SELECTED:this.value=a??"auto",Sa(this,Ga,ln).call(this);break;case c.MEDIA_RENDITION_LIST:fm(this,on,u0(a)),Sa(this,Ga,ln).call(this);break;case c.MEDIA_HEIGHT:case c.MEDIA_WIDTH:Sa(this,Ga,ln).call(this);break}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Sa(this,ho,nu))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Sa(this,ho,nu))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return ni(this,on)}set mediaRenditionList(e){fm(this,on,e),Sa(this,Ga,ln).call(this)}get mediaRenditionSelected(){return oe(this,c.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){re(this,c.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ie(this,c.MEDIA_HEIGHT)}set mediaHeight(e){ce(this,c.MEDIA_HEIGHT,e)}get mediaWidth(){return ie(this,c.MEDIA_WIDTH)}set mediaWidth(e){ce(this,c.MEDIA_WIDTH,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}}on=new WeakMap;Kt=new WeakMap;Ga=new WeakSet;ln=function(){const t=!this.mediaRenditionSelected;if(ni(this,Kt).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&ni(this,Kt).mediaHeight===this.mediaHeight&&ni(this,Kt).mediaWidth===this.mediaWidth&&ni(this,Kt).isAuto===t)return;ni(this,Kt).mediaRenditionList=JSON.stringify(this.mediaRenditionList),ni(this,Kt).mediaHeight=this.mediaHeight,ni(this,Kt).mediaWidth=this.mediaWidth,ni(this,Kt).isAuto=t;const e=this.mediaRenditionList.sort(this.compareRendition.bind(this)),i=e.find(s=>s.id===this.mediaRenditionSelected);for(const s of e)s.selected=s===i;this.defaultSlot.textContent="";for(const s of e){const o=this.formatRendition(s,{showBitrate:this.showRenditionBitrate(s)}),l=fr({type:"radio",text:o,value:`${s.id}`,checked:s.selected&&!t});l.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(l)}const a=i&&this.showRenditionBitrate(i);let r;t&&(i?r=this.formatMenuItemText(`${C("Auto")} • ${this.formatRendition(i,{showBitrate:a})}`,i):this.mediaHeight>0&&this.mediaWidth>0&&(r=this.formatMenuItemText(`${C("Auto")} (${Math.min(this.mediaWidth,this.mediaHeight)}p)`))),r||(r=this.formatMenuItemText(C("Auto")));const n=fr({type:"radio",text:r,value:"auto",checked:t});n.dataset.description=r,n.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(n)};ho=new WeakSet;nu=function(){if(this.value==null)return;const t=new b.CustomEvent(M.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};b.customElements.get("media-rendition-menu")||b.customElements.define("media-rendition-menu",QT);const jT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function ZT(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${jT}</slot>
  `}function XT(){return C("Quality")}class Oc extends Tr{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_RENDITION_SELECTED,c.MEDIA_RENDITION_UNAVAILABLE,c.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",C("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Ge(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return oe(this,c.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){re(this,c.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ie(this,c.MEDIA_HEIGHT)}set mediaHeight(e){ce(this,c.MEDIA_HEIGHT,e)}}Oc.getSlotTemplateHTML=ZT;Oc.getTooltipContentHTML=XT;b.customElements.get("media-rendition-menu-button")||b.customElements.define("media-rendition-menu-button",Oc);var Nc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Vt=(t,e,i)=>(Nc(t,e,"read from private field"),i?i.call(t):e.get(t)),Dt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},pf=(t,e,i,a)=>(Nc(t,e,"write to private field"),e.set(t,i),i),lt=(t,e,i)=>(Nc(t,e,"access private method"),i),Er,Bn,Tl,na,er,Pc,vf,mo,su,po,ou,ff,zo,Qo,vo;function JT(t){return`
      ${ht.getTemplateHTML(t)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `}class Ef extends ht{constructor(){super(),Dt(this,Bn),Dt(this,na),Dt(this,Pc),Dt(this,mo),Dt(this,ou),Dt(this,Er,!1),Dt(this,po,e=>{const i=e.target,a=i?.nodeName==="VIDEO",r=lt(this,mo,su).call(this,i);(a||r)&&(Vt(this,Er)?lt(this,na,er).call(this):lt(this,ou,ff).call(this,e))}),Dt(this,zo,e=>{const i=e.target,a=this.contains(i),r=e.button===2,n=i?.nodeName==="VIDEO",s=lt(this,mo,su).call(this,i);a||r&&(n||s)||lt(this,na,er).call(this)}),Dt(this,Qo,e=>{e.key==="Escape"&&lt(this,na,er).call(this)}),Dt(this,vo,e=>{var i,a;const r=e.target;if((i=r.matches)!=null&&i.call(r,'button[invoke="copy"]')){const n=(a=r.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');n&&navigator.clipboard.writeText(n.value)}lt(this,na,er).call(this)}),this.setAttribute("noautohide",""),lt(this,Bn,Tl).call(this)}connectedCallback(){super.connectedCallback(),Ge(this).addEventListener("contextmenu",Vt(this,po)),this.addEventListener("click",Vt(this,vo))}disconnectedCallback(){super.disconnectedCallback(),Ge(this).removeEventListener("contextmenu",Vt(this,po)),this.removeEventListener("click",Vt(this,vo)),document.removeEventListener("mousedown",Vt(this,zo)),document.removeEventListener("keydown",Vt(this,Qo))}}Er=new WeakMap;Bn=new WeakSet;Tl=function(){this.hidden=!Vt(this,Er)};na=new WeakSet;er=function(){pf(this,Er,!1),lt(this,Bn,Tl).call(this)};Pc=new WeakSet;vf=function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&lt(i=e,na,er).call(i)})};mo=new WeakSet;su=function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1};po=new WeakMap;ou=new WeakSet;ff=function(t){t.preventDefault(),lt(this,Pc,vf).call(this),pf(this,Er,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,lt(this,Bn,Tl).call(this),document.addEventListener("mousedown",Vt(this,zo),{once:!0}),document.addEventListener("keydown",Vt(this,Qo),{once:!0})};zo=new WeakMap;Qo=new WeakMap;vo=new WeakMap;Ef.getTemplateHTML=JT;b.customElements.get("media-context-menu")||b.customElements.define("media-context-menu",Ef);function eA(t){return`
    ${Ki.getTemplateHTML.call(this,t)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `}class Uc extends Ki{}Uc.shadowRootOptions={mode:"open"};Uc.getTemplateHTML=eA;b.customElements.get("media-context-menu-item")||b.customElements.define("media-context-menu-item",Uc);var _f=t=>{throw TypeError(t)},$c=(t,e,i)=>e.has(t)||_f("Cannot "+i),H=(t,e,i)=>($c(t,e,"read from private field"),i?i.call(t):e.get(t)),ye=(t,e,i)=>e.has(t)?_f("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Ye=(t,e,i,a)=>($c(t,e,"write to private field"),e.set(t,i),i),pe=(t,e,i)=>($c(t,e,"access private method"),i),Al=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends Al{}globalThis.DocumentFragment=t}var Hc=class extends Al{},tA=class extends Al{},iA={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(Hc)}},fo,aA=class{constructor(t,e={}){ye(this,fo),Ye(this,fo,e?.detail)}get detail(){return H(this,fo)}initCustomEvent(){}};fo=new WeakMap;function rA(t,e){return new Hc}var bf={document:{createElement:rA},DocumentFragment,customElements:iA,CustomEvent:aA,EventTarget:Al,HTMLElement:Hc,HTMLVideoElement:tA},gf=typeof window>"u"||typeof globalThis.customElements>"u",Yt=gf?bf:globalThis,jo=gf?bf.document:globalThis.document;function nA(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${lu(i)}: ${a}; `)}),e?e.trim():void 0}function lu(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function yf(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}function $e(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}function Tf(t){let e=sA(t).toString();return e?"?"+e:""}function sA(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}var Af=(t,e)=>!t||!e?!1:t.contains(e)?!0:Af(t,e.getRootNode().host),kf="mux.com",oA=()=>{try{return"3.13.2"}catch{}return"UNKNOWN"},lA=oA(),Sf=()=>lA,dA=(t,{token:e,customDomain:i=kf,thumbnailTime:a,programTime:r}={})=>{var n;let s=e==null?a:void 0,{aud:o}=(n=tr(e))!=null?n:{};if(!(e&&o!=="t"))return`https://image.${i}/${t}/thumbnail.webp${Tf({token:e,time:s,program_time:r})}`},uA=(t,{token:e,customDomain:i=kf,programStartTime:a,programEndTime:r}={})=>{var n;let{aud:s}=(n=tr(e))!=null?n:{};if(!(e&&s!=="s"))return`https://image.${i}/${t}/storyboard.vtt${Tf({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},Bc=t=>{if(t){if([Z.LIVE,Z.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return Z.LIVE}},cA={crossorigin:"crossOrigin",playsinline:"playsInline"};function hA(t){var e;return(e=cA[t])!=null?e:yf(t)}var za,Qa,Ve,mA=class{constructor(e,i){ye(this,za),ye(this,Qa),ye(this,Ve,[]),Ye(this,za,e),Ye(this,Qa,i)}[Symbol.iterator](){return H(this,Ve).values()}get length(){return H(this,Ve).length}get value(){var e;return(e=H(this,Ve).join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Ye(this,Ve,[]),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return H(this,Ve)[e]}values(){return H(this,Ve).values()}keys(){return H(this,Ve).keys()}forEach(e){H(this,Ve).forEach(e)}add(...e){var i,a;e.forEach(r=>{this.contains(r)||H(this,Ve).push(r)}),!(this.value===""&&!((i=H(this,za))!=null&&i.hasAttribute(`${H(this,Qa)}`)))&&((a=H(this,za))==null||a.setAttribute(`${H(this,Qa)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>{H(this,Ve).splice(H(this,Ve).indexOf(a),1)}),(i=H(this,za))==null||i.setAttribute(`${H(this,Qa)}`,`${this.value}`)}contains(e){return H(this,Ve).includes(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){this.remove(e),this.add(i)}};za=new WeakMap,Qa=new WeakMap,Ve=new WeakMap;var wf=`[mux-player ${Sf()}]`;function si(...t){console.warn(wf,...t)}function qe(...t){console.error(wf,...t)}function Em(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${x("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),si(i)}var Ue={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},ia={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},_m=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),pA=Object.values(Ue).filter(t=>Ue.PLAYSINLINE!==t),vA=Object.values(ia),fA=[...pA,...vA],EA=class extends Yt.HTMLElement{static get observedAttributes(){return fA}constructor(){super()}attributeChangedCallback(t,e,i){var a,r;switch(t){case ia.MUTED:{this.media&&(this.media.muted=i!=null,this.media.defaultMuted=i!=null);return}case ia.VOLUME:{let n=(a=$e(i))!=null?a:1;this.media&&(this.media.volume=n);return}case ia.PLAYBACKRATE:{let n=(r=$e(i))!=null?r:1;this.media&&(this.media.playbackRate=n,this.media.defaultPlaybackRate=n);return}}}play(){var t,e;return(e=(t=this.media)==null?void 0:t.play())!=null?e:Promise.reject()}pause(){var t;(t=this.media)==null||t.pause()}load(){var t;(t=this.media)==null||t.load()}get media(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var t,e;return(e=(t=this.media)==null?void 0:t.paused)!=null?e:!0}get duration(){var t,e;return(e=(t=this.media)==null?void 0:t.duration)!=null?e:NaN}get ended(){var t,e;return(e=(t=this.media)==null?void 0:t.ended)!=null?e:!1}get buffered(){var t,e;return(e=(t=this.media)==null?void 0:t.buffered)!=null?e:_m}get seekable(){var t,e;return(e=(t=this.media)==null?void 0:t.seekable)!=null?e:_m}get readyState(){var t,e;return(e=(t=this.media)==null?void 0:t.readyState)!=null?e:0}get videoWidth(){var t,e;return(e=(t=this.media)==null?void 0:t.videoWidth)!=null?e:0}get videoHeight(){var t,e;return(e=(t=this.media)==null?void 0:t.videoHeight)!=null?e:0}get currentSrc(){var t,e;return(e=(t=this.media)==null?void 0:t.currentSrc)!=null?e:""}get currentTime(){var t,e;return(e=(t=this.media)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.media&&(this.media.currentTime=Number(t))}get volume(){var t,e;return(e=(t=this.media)==null?void 0:t.volume)!=null?e:1}set volume(t){this.media&&(this.media.volume=Number(t))}get playbackRate(){var t,e;return(e=(t=this.media)==null?void 0:t.playbackRate)!=null?e:1}set playbackRate(t){this.media&&(this.media.playbackRate=Number(t))}get defaultPlaybackRate(){var t;return(t=$e(this.getAttribute(ia.PLAYBACKRATE)))!=null?t:1}set defaultPlaybackRate(t){t!=null?this.setAttribute(ia.PLAYBACKRATE,`${t}`):this.removeAttribute(ia.PLAYBACKRATE)}get crossOrigin(){return Nr(this,Ue.CROSSORIGIN)}set crossOrigin(t){this.setAttribute(Ue.CROSSORIGIN,`${t}`)}get autoplay(){return Nr(this,Ue.AUTOPLAY)!=null}set autoplay(t){t?this.setAttribute(Ue.AUTOPLAY,typeof t=="string"?t:""):this.removeAttribute(Ue.AUTOPLAY)}get loop(){return Nr(this,Ue.LOOP)!=null}set loop(t){t?this.setAttribute(Ue.LOOP,""):this.removeAttribute(Ue.LOOP)}get muted(){var t,e;return(e=(t=this.media)==null?void 0:t.muted)!=null?e:!1}set muted(t){this.media&&(this.media.muted=!!t)}get defaultMuted(){return Nr(this,Ue.MUTED)!=null}set defaultMuted(t){t?this.setAttribute(Ue.MUTED,""):this.removeAttribute(Ue.MUTED)}get playsInline(){return Nr(this,Ue.PLAYSINLINE)!=null}set playsInline(t){qe("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(t){["","none","metadata","auto"].includes(t)?this.setAttribute(Ue.PRELOAD,t):this.removeAttribute(Ue.PRELOAD)}};function Nr(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}var bm=EA,_A=`:host {
  --media-control-display: var(--controls);
  --media-loading-indicator-display: var(--loading-indicator);
  --media-dialog-display: var(--dialog);
  --media-play-button-display: var(--play-button);
  --media-live-button-display: var(--live-button);
  --media-seek-backward-button-display: var(--seek-backward-button);
  --media-seek-forward-button-display: var(--seek-forward-button);
  --media-mute-button-display: var(--mute-button);
  --media-captions-button-display: var(--captions-button);
  --media-captions-menu-button-display: var(--captions-menu-button, var(--media-captions-button-display));
  --media-rendition-menu-button-display: var(--rendition-menu-button);
  --media-audio-track-menu-button-display: var(--audio-track-menu-button);
  --media-airplay-button-display: var(--airplay-button);
  --media-pip-button-display: var(--pip-button);
  --media-fullscreen-button-display: var(--fullscreen-button);
  --media-cast-button-display: var(--cast-button, var(--_cast-button-drm-display));
  --media-playback-rate-button-display: var(--playback-rate-button);
  --media-playback-rate-menu-button-display: var(--playback-rate-menu-button);
  --media-volume-range-display: var(--volume-range);
  --media-time-range-display: var(--time-range);
  --media-time-display-display: var(--time-display);
  --media-duration-display-display: var(--duration-display);
  --media-title-display-display: var(--title-display);

  display: inline-block;
  line-height: 0;
  width: 100%;
}

a {
  color: #fff;
  font-size: 0.9em;
  text-decoration: underline;
}

media-theme {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

media-poster-image {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
}

media-poster-image:not([src]):not([placeholdersrc]) {
  display: none;
}

::part(top),
[part~='top'] {
  --media-control-display: var(--controls, var(--top-controls));
  --media-play-button-display: var(--play-button, var(--top-play-button));
  --media-live-button-display: var(--live-button, var(--top-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--top-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--top-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--top-mute-button));
  --media-captions-button-display: var(--captions-button, var(--top-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--top-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--top-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--top-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--top-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--top-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--top-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--top-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--top-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --captions-menu-button,
    var(--media-playback-rate-button-display, var(--top-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--top-volume-range));
  --media-time-range-display: var(--time-range, var(--top-time-range));
  --media-time-display-display: var(--time-display, var(--top-time-display));
  --media-duration-display-display: var(--duration-display, var(--top-duration-display));
  --media-title-display-display: var(--title-display, var(--top-title-display));
}

::part(center),
[part~='center'] {
  --media-control-display: var(--controls, var(--center-controls));
  --media-play-button-display: var(--play-button, var(--center-play-button));
  --media-live-button-display: var(--live-button, var(--center-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--center-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--center-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--center-mute-button));
  --media-captions-button-display: var(--captions-button, var(--center-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--center-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--center-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--center-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--center-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--center-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--center-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--center-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--center-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--center-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--center-volume-range));
  --media-time-range-display: var(--time-range, var(--center-time-range));
  --media-time-display-display: var(--time-display, var(--center-time-display));
  --media-duration-display-display: var(--duration-display, var(--center-duration-display));
}

::part(bottom),
[part~='bottom'] {
  --media-control-display: var(--controls, var(--bottom-controls));
  --media-play-button-display: var(--play-button, var(--bottom-play-button));
  --media-live-button-display: var(--live-button, var(--bottom-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--bottom-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--bottom-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--bottom-mute-button));
  --media-captions-button-display: var(--captions-button, var(--bottom-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--bottom-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--bottom-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--bottom-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--bottom-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--bottom-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--bottom-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--bottom-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--bottom-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--bottom-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--bottom-volume-range));
  --media-time-range-display: var(--time-range, var(--bottom-time-range));
  --media-time-display-display: var(--time-display, var(--bottom-time-display));
  --media-duration-display-display: var(--duration-display, var(--bottom-duration-display));
  --media-title-display-display: var(--title-display, var(--bottom-title-display));
}

:host([no-tooltips]) {
  --media-tooltip-display: none;
}
`,Pr=new WeakMap,bA=class If{constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=Pr.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=Pr.get(this.element);i&&i.delete(this.type)}}static for(e){Pr.has(e.element)||Pr.set(e.element,new Map);let i=e.attributeName.slice(2),a=Pr.get(e.element);return a&&a.has(i)?a.get(i):new If(e.element,i)}};function gA(t,e){return t instanceof It&&t.attributeName.startsWith("on")?(bA.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}function yA(t,e){return e instanceof Rf&&t instanceof yr?(e.renderInto(t),!0):!1}function TA(t,e){return e instanceof DocumentFragment&&t instanceof yr?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}function AA(t,e){if(t instanceof It){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}function kA(t,e){if(t instanceof It&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}function SA(t,e){if(typeof e=="boolean"&&t instanceof It){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}function wA(t,e){return e===!1&&t instanceof yr?(t.replace(""),!0):!1}function IA(t,e){kA(t,e)||SA(t,e)||gA(t,e)||wA(t,e)||yA(t,e)||TA(t,e)||AA(t,e)}var ql=new Map,gm=new WeakMap,ym=new WeakMap,Rf=class{constructor(t,e,i){this.strings=t,this.values=e,this.processor=i,this.stringsKey=this.strings.join("")}get template(){if(ql.has(this.stringsKey))return ql.get(this.stringsKey);{let t=jo.createElement("template"),e=this.strings.length-1;return t.innerHTML=this.strings.reduce((i,a,r)=>i+a+(r<e?`{{ ${r} }}`:""),""),ql.set(this.stringsKey,t),t}}renderInto(t){var e;let i=this.template;if(gm.get(t)!==i){gm.set(t,i);let r=new bl(i,this.values,this.processor);ym.set(t,r),t instanceof yr?t.replace(...r.children):t.appendChild(r);return}let a=ym.get(t);(e=a?.update)==null||e.call(a,this.values)}},RA={processCallback(t,e,i){var a;if(i){for(let[r,n]of e)if(r in i){let s=(a=i[r])!=null?a:"";IA(n,s)}}}};function Eo(t,...e){return new Rf(t,e,RA)}function LA(t,e){t.renderInto(e)}var CA=t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},DA=t=>Eo`
  <style>
    ${CA(t)}
    ${_A}
  </style>
  ${NA(t)}
`,MA=t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return Bc(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},xA={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},OA=Object.values(xA).join(", "),NA=t=>{var e,i,a,r,n,s,o,l,d,m,p,h,u,v,E,y,g,T,_,k,D,L,w,$,V,W,B,Ne,Qe,je,fe,He,Rt,Be,mt,Ze,Ie,Pe,We,ei,Vi,Ar;return Eo`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${MA(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(Z.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(r=nA({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?r:!1}"
    defaultsubtitles="${!t.defaultHiddenCaptions}"
    forwardseekoffset="${(n=t.forwardSeekOffset)!=null?n:!1}"
    backwardseekoffset="${(s=t.backwardSeekOffset)!=null?s:!1}"
    playbackrates="${(o=t.playbackRates)!=null?o:!1}"
    defaultshowremainingtime="${(l=t.defaultShowRemainingTime)!=null?l:!1}"
    defaultduration="${(d=t.defaultDuration)!=null?d:!1}"
    hideduration="${(m=t.hideDuration)!=null?m:!1}"
    title="${(p=t.title)!=null?p:!1}"
    videotitle="${(h=t.videoTitle)!=null?h:!1}"
    proudlydisplaymuxbadge="${(u=t.proudlyDisplayMuxBadge)!=null?u:!1}"
    exportparts="${OA}"
  >
    <mux-video
      slot="media"
      inert="${(v=t.noHotKeys)!=null?v:!1}"
      target-live-window="${(E=t.targetLiveWindow)!=null?E:!1}"
      stream-type="${(y=Bc(t.streamType))!=null?y:!1}"
      crossorigin="${(g=t.crossOrigin)!=null?g:""}"
      playsinline
      autoplay="${(T=t.autoplay)!=null?T:!1}"
      muted="${(_=t.muted)!=null?_:!1}"
      loop="${(k=t.loop)!=null?k:!1}"
      preload="${(D=t.preload)!=null?D:!1}"
      debug="${(L=t.debug)!=null?L:!1}"
      prefer-cmcd="${(w=t.preferCmcd)!=null?w:!1}"
      disable-tracking="${($=t.disableTracking)!=null?$:!1}"
      disable-cookies="${(V=t.disableCookies)!=null?V:!1}"
      prefer-playback="${(W=t.preferPlayback)!=null?W:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      initial-bandwidth-estimate-kbps="${t.initialBandwidthEstimateKbps!=null?t.initialBandwidthEstimateKbps:!1}"
      initial-estimate-segments="${t.initialEstimateSegments!=null?t.initialEstimateSegments:!1}"
      min-preload-segments="${t.minPreloadSegments!=null?t.minPreloadSegments:!1}"
      beacon-collection-domain="${(B=t.beaconCollectionDomain)!=null?B:!1}"
      player-init-time="${(Ne=t.playerInitTime)!=null?Ne:!1}"
      player-software-name="${(Qe=t.playerSoftwareName)!=null?Qe:!1}"
      player-software-version="${(je=t.playerSoftwareVersion)!=null?je:!1}"
      env-key="${(fe=t.envKey)!=null?fe:!1}"
      custom-domain="${(He=t.customDomain)!=null?He:!1}"
      src="${t.src?t.src:t.playbackId?rd(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?rd(t):!1}"
      cast-receiver="${(Rt=t.castReceiver)!=null?Rt:!1}"
      drm-token="${(mt=(Be=t.tokens)==null?void 0:Be.drm)!=null?mt:!1}"
      playback-token="${(Ie=(Ze=t.tokens)==null?void 0:Ze.playback)!=null?Ie:!1}"
      exportparts="video"
      disable-pseudo-ended="${(Pe=t.disablePseudoEnded)!=null?Pe:!1}"
      max-reconnect-retries="${(We=t.maxReconnectRetries)!=null?We:!1}"
      max-auto-resolution="${(ei=t.maxAutoResolution)!=null?ei:!1}"
      cap-rendition-to-player-size="${(Vi=t.capRenditionToPlayerSize)!=null?Vi:!1}"
    >
      ${t.storyboard?Eo`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:Eo``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(Ar=t.placeholder)!=null?Ar:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},Lf=t=>t.charAt(0).toUpperCase()+t.slice(1),PA=(t,e=!1)=>{var i,a;if(t.muxCode){let r=Lf((i=t.errorCategory)!=null?i:"video"),n=rl((a=t.errorCategory)!=null?a:j.VIDEO);if(t.muxCode===N.NETWORK_OFFLINE)return x("Your device appears to be offline",e);if(t.muxCode===N.NETWORK_RECONNECTING)return x("Reconnecting...",e);if(t.muxCode===N.NETWORK_TOKEN_EXPIRED)return x("{category} URL has expired",e).format({category:r});if([N.NETWORK_TOKEN_SUB_MISMATCH,N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING,N.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return x("{category} URL is formatted incorrectly",e).format({category:r});if(t.muxCode===N.NETWORK_TOKEN_MISSING)return x("Invalid {categoryName} URL",e).format({categoryName:n});if(t.muxCode===N.NETWORK_NOT_FOUND)return x("{category} does not exist",e).format({category:r});if(t.muxCode===N.NETWORK_NOT_READY){let s=t.streamType==="live"?"Live stream":"Video";return x("{mediaType} is not currently available",e).format({mediaType:s})}}if(t.code){if(t.code===R.MEDIA_ERR_NETWORK)return x("Network Error",e);if(t.code===R.MEDIA_ERR_DECODE)return x("Media Error",e);if(t.code===R.MEDIA_ERR_SRC_NOT_SUPPORTED)return x("Source Not Supported",e)}return x("Error",e)},UA=(t,e=!1)=>{var i,a;if(t.reload)return'Try again later or <a href="#" data-mux-reload style="color: #4a90e2;">click here to retry</a>';if(t.muxCode){let r=Lf((i=t.errorCategory)!=null?i:"video"),n=rl((a=t.errorCategory)!=null?a:j.VIDEO);return t.muxCode===N.NETWORK_OFFLINE?x("Check your internet connection and try reloading this video.",e):t.muxCode===N.NETWORK_RECONNECTING?x("Your connection was interrupted. Attempting to resume playback...",e):t.muxCode===N.NETWORK_TOKEN_EXPIRED?x("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:n}):t.muxCode===N.NETWORK_TOKEN_SUB_MISMATCH?x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:n}):t.muxCode===N.NETWORK_TOKEN_MALFORMED?x("{category} URL is formatted incorrectly",e).format({category:r}):[N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?x("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:n}):[N.NETWORK_TOKEN_MISSING,N.NETWORK_INVALID_URL].includes(t.muxCode)?x("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:n}):t.muxCode===N.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===R.MEDIA_ERR_NETWORK||t.code===R.MEDIA_ERR_DECODE||(t.code,R.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},$A=(t,e=!1)=>{let i=PA(t,e).toString(),a=UA(t,e).toString();return{title:i,message:a}},HA=t=>{if(t.muxCode){if(t.muxCode===N.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===N.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===N.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===N.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===N.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===N.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===R.MEDIA_ERR_NETWORK)return"";if(t.code===R.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===R.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},Cf=(t,e)=>{let i=HA(t);return{message:t.message,context:t.context,file:i}},BA=`<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    media-rendition-menu {
      min-width: 140px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]) media-control-bar[slot='top-chrome']::before,
    :host([videotitle]) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}" exportparts="thumb">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            opacity: 0;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>

    <template if="!audio">
      <media-error-dialog slot="dialog" noautohide></media-error-dialog>
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`,du=jo.createElement("template");"innerHTML"in du&&(du.innerHTML=BA);var Tm,Am,Df=class extends gl{};Df.template=(Am=(Tm=du.content)==null?void 0:Tm.children)==null?void 0:Am[0];Yt.customElements.get("media-theme-gerwig")||Yt.customElements.define("media-theme-gerwig",Df);var WA="gerwig",oi={SRC:"src",POSTER:"poster"},A={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},uu=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function FA(t,e){var i,a,r;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:((i=t.media)==null?void 0:i.currentSrc)&&t.storyboard,storyboardSrc:t.getAttribute(A.STORYBOARD_SRC),fullscreenElement:t.getAttribute(A.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:VA(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(A.NOHOTKEYS),hotKeys:t.getAttribute(A.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,maxAutoResolution:t.maxAutoResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,initialBandwidthEstimateKbps:t.initialBandwidthEstimateKbps,initialEstimateSegments:t.initialEstimateSegments,minPreloadSegments:t.minPreloadSegments,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(f.TARGET_LIVE_WINDOW),streamType:Bc(t.getAttribute(f.STREAM_TYPE)),primaryColor:t.getAttribute(A.PRIMARY_COLOR),secondaryColor:t.getAttribute(A.SECONDARY_COLOR),accentColor:t.getAttribute(A.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:qA(t),playbackRates:t.getAttribute(A.PLAYBACK_RATES),customDomain:(a=t.getAttribute(f.CUSTOM_DOMAIN))!=null?a:void 0,title:t.getAttribute(A.TITLE),videoTitle:(r=t.getAttribute(A.VIDEO_TITLE))!=null?r:t.getAttribute(A.TITLE),novolumepref:t.hasAttribute(A.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(A.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(A.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(A.DISABLE_PSEUDO_ENDED),maxReconnectRetries:t.maxReconnectRetries,capRenditionToPlayerSize:t.capRenditionToPlayerSize,...e,extraSourceParams:t.extraSourceParams}}var KA=Tv.formatErrorMessage;Tv.formatErrorMessage=t=>{var e,i;if(t instanceof R){let a=$A(t,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a?.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${x("(opens in a new window)")}"
              >${(i=a.linkText)!=null?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return KA(t)};function VA(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let n=Yt.customElements.get(a);if(n!=null&&n.template)return n.template}}function qA(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}function dn(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let r=t.getAttribute(a);return r!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),i},e)}var YA=Object.values(f),GA=Object.values(oi),zA=Object.values(A),km=Sf(),Sm="mux-player",wm={isDialogOpen:!1},QA={redundant_streams:!0},_o,yn,bo,aa,go,Tn,Zo,Xo,dr,Jo,el,tl,An,ur,il,ue,li,Mf,cu,ua,Im,Rm,Lm,Cm,jA=class extends bm{constructor(){super(),ye(this,ue),ye(this,_o),ye(this,yn,!1),ye(this,bo,{}),ye(this,aa,!0),ye(this,go,new mA(this,"hotkeys")),ye(this,Tn),ye(this,Zo,()=>pe(this,ue,ua).call(this)),ye(this,Xo,()=>pe(this,ue,ua).call(this)),ye(this,dr,()=>pe(this,ue,ua).call(this)),ye(this,Jo,t=>{t.composedPath().find(e=>{var i;return(i=e?.hasAttribute)==null?void 0:i.call(e,"data-mux-reload")})&&(t.preventDefault(),window.location.reload())}),ye(this,el,t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&pe(this,ue,cu).call(this,{isDialogOpen:!1})}),ye(this,tl,t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&(Af(this,jo.activeElement)||t.preventDefault())}),ye(this,An),ye(this,ur,{...wm}),ye(this,il,t=>{var e;let i=(e=this.media)==null?void 0:e.error;if(!(i instanceof R)){let{message:r,code:n}=i??{};i=new R(r,n)}if(!(i!=null&&i.fatal)){si(i),i.data&&si(`${i.name} data:`,i.data);return}let a=Cf(i);a.message&&Em(a),qe(i),i.data&&qe(`${i.name} data:`,i.data),pe(this,ue,cu).call(this,{isDialogOpen:!0})}),Ye(this,_o,Au()),this.attachShadow({mode:"open"}),pe(this,ue,Mf).call(this),this.isConnected&&pe(this,ue,li).call(this)}static get NAME(){return Sm}static get VERSION(){return km}static get observedAttributes(){var t;return[...(t=bm.observedAttributes)!=null?t:[],...GA,...YA,...zA]}setAttribute(t,e){super.setAttribute(t,e),t.startsWith("metadata-")&&this.media&&(this.media.metadata=dn(this))}removeAttribute(t){super.removeAttribute(t),t.startsWith("metadata-")&&this.media&&(this.media.metadata=dn(this))}get mediaTheme(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("media-theme")}get mediaController(){var t,e;return(e=(t=this.mediaTheme)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("media-controller")}connectedCallback(){pe(this,ue,li).call(this);let t=this.media;t&&(t.metadata=dn(this))}disconnectedCallback(){var t,e,i,a,r,n,s,o,l,d;(t=H(this,Tn))==null||t.disconnect(),(e=this.media)==null||e.removeEventListener("streamtypechange",H(this,Zo)),(i=this.media)==null||i.removeEventListener("loadstart",H(this,Xo)),this.removeEventListener("error",H(this,il)),this.removeEventListener("click",H(this,Jo)),(a=this.mediaTheme)==null||a.removeEventListener("close",H(this,el)),(r=this.mediaTheme)==null||r.removeEventListener("focusin",H(this,tl)),this.media&&(this.media.errorTranslator=void 0),(s=(n=this.media)==null?void 0:n.textTracks)==null||s.removeEventListener("addtrack",H(this,dr)),(l=(o=this.media)==null?void 0:o.textTracks)==null||l.removeEventListener("removetrack",H(this,dr)),(d=H(this,An))==null||d.call(this),Ye(this,An,void 0),Ye(this,yn,!1)}attributeChangedCallback(t,e,i){switch(pe(this,ue,li).call(this),super.attributeChangedCallback(t,e,i),t){case A.HOTKEYS:H(this,go).value=i;break;case A.THUMBNAIL_TIME:{i!=null&&this.tokens.thumbnail&&si(x("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case A.THUMBNAIL_TOKEN:{if(i){let a=tr(i);if(a){let{aud:r}=a,n=hn.THUMBNAIL;r!==n&&si(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:n,tokenNamePrefix:"thumbnail"}))}}break}case A.STORYBOARD_TOKEN:{if(i){let a=tr(i);if(a){let{aud:r}=a,n=hn.STORYBOARD;r!==n&&si(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:n,tokenNamePrefix:"storyboard"}))}}break}case A.DRM_TOKEN:{if(i){let a=tr(i);if(a){let{aud:r}=a,n=hn.DRM;r!==n&&si(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:n,tokenNamePrefix:"drm"}))}}break}case f.PLAYBACK_ID:{i!=null&&i.includes("?token")&&qe(x("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:i}));break}case f.STREAM_TYPE:{i&&![Z.LIVE,Z.ON_DEMAND,Z.UNKNOWN].includes(i)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=i.includes("dvr")?Number.POSITIVE_INFINITY:0:Em({file:"invalid-stream-type.md",message:x("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):i===Z.LIVE?this.getAttribute(A.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case A.FULLSCREEN_ELEMENT:{if(i!=null||i!==e){let a=jo.getElementById(i),r=a?.querySelector("mux-player");this.mediaController&&a&&r&&(this.mediaController.fullscreenElement=a)}break}case f.CAP_RENDITION_TO_PLAYER_SIZE:{(i==null||i!==e)&&(this.capRenditionToPlayerSize=i!=null?!0:void 0);break}case f.MAX_RECONNECT_RETRIES:{(i==null||i!==e)&&(this.maxReconnectRetries=Number(i));break}}[f.PLAYBACK_ID,oi.SRC,A.PLAYBACK_TOKEN].includes(t)&&e!==i&&Ye(this,ur,{...H(this,ur),...wm}),pe(this,ue,ua).call(this,{[hA(t)]:i})}async requestFullscreen(t){var e;if(!(!this.mediaController||this.mediaController.hasAttribute(c.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new Yt.CustomEvent(M.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var r;(r=this.mediaController)==null||r.addEventListener(Xt.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}async exitFullscreen(){var t;if(!(!this.mediaController||!this.mediaController.hasAttribute(c.MEDIA_IS_FULLSCREEN)))return(t=this.mediaController)==null||t.dispatchEvent(new Yt.CustomEvent(M.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,i)=>{var a;(a=this.mediaController)==null||a.addEventListener(Xt.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}get preferCmcd(){var t;return(t=this.getAttribute(f.PREFER_CMCD))!=null?t:void 0}set preferCmcd(t){t!==this.preferCmcd&&(t?ko.includes(t)?this.setAttribute(f.PREFER_CMCD,t):si(`Invalid value for preferCmcd. Must be one of ${ko.join()}`):this.removeAttribute(f.PREFER_CMCD))}get hasPlayed(){var t,e;return(e=(t=this.mediaController)==null?void 0:t.hasAttribute(c.MEDIA_HAS_PLAYED))!=null?e:!1}get inLiveWindow(){var t;return(t=this.mediaController)==null?void 0:t.hasAttribute(c.MEDIA_TIME_IS_LIVE)}get _hls(){var t;return(t=this.media)==null?void 0:t._hls}get mux(){var t;return(t=this.media)==null?void 0:t.mux}get theme(){var t;return(t=this.getAttribute(A.THEME))!=null?t:WA}set theme(t){this.setAttribute(A.THEME,`${t}`)}get themeProps(){let t=this.mediaTheme;if(!t)return;let e={};for(let i of t.getAttributeNames()){if(uu.includes(i))continue;let a=t.getAttribute(i);e[yf(i)]=a===""?!0:a}return e}set themeProps(t){var e,i;pe(this,ue,li).call(this);let a={...this.themeProps,...t};for(let r in a){if(uu.includes(r))continue;let n=t?.[r];typeof n=="boolean"||n==null?(e=this.mediaTheme)==null||e.toggleAttribute(lu(r),!!n):(i=this.mediaTheme)==null||i.setAttribute(lu(r),n)}}get playbackId(){var t;return(t=this.getAttribute(f.PLAYBACK_ID))!=null?t:void 0}set playbackId(t){t?this.setAttribute(f.PLAYBACK_ID,t):this.removeAttribute(f.PLAYBACK_ID)}get src(){var t,e;return this.playbackId?(t=Mt(this,oi.SRC))!=null?t:void 0:(e=this.getAttribute(oi.SRC))!=null?e:void 0}set src(t){t?this.setAttribute(oi.SRC,t):this.removeAttribute(oi.SRC)}get poster(){var t;let e=this.getAttribute(oi.POSTER);if(e!=null)return e;let{tokens:i}=this;if(i.playback&&!i.thumbnail){si("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return dA(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(t=this.thumbnailTime)!=null?t:this.startTime,programTime:this.programStartTime,token:i.thumbnail})}set poster(t){t||t===""?this.setAttribute(oi.POSTER,t):this.removeAttribute(oi.POSTER)}get storyboardSrc(){var t;return(t=this.getAttribute(A.STORYBOARD_SRC))!=null?t:void 0}set storyboardSrc(t){t?this.setAttribute(A.STORYBOARD_SRC,t):this.removeAttribute(A.STORYBOARD_SRC)}get storyboard(){let{tokens:t}=this;if(this.storyboardSrc&&!t.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[Z.LIVE,Z.UNKNOWN].includes(this.streamType)||t.playback&&!t.storyboard))return uA(this.playbackId,{customDomain:this.customDomain,token:t.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(A.AUDIO)}set audio(t){if(!t){this.removeAttribute(A.AUDIO);return}this.setAttribute(A.AUDIO,"")}get hotkeys(){return H(this,go)}get nohotkeys(){return this.hasAttribute(A.NOHOTKEYS)}set nohotkeys(t){if(!t){this.removeAttribute(A.NOHOTKEYS);return}this.setAttribute(A.NOHOTKEYS,"")}get thumbnailTime(){return $e(this.getAttribute(A.THUMBNAIL_TIME))}set thumbnailTime(t){this.setAttribute(A.THUMBNAIL_TIME,`${t}`)}get videoTitle(){var t,e;return(e=(t=this.getAttribute(A.VIDEO_TITLE))!=null?t:this.getAttribute(A.TITLE))!=null?e:""}set videoTitle(t){t!==this.videoTitle&&(t?this.setAttribute(A.VIDEO_TITLE,t):this.removeAttribute(A.VIDEO_TITLE))}get placeholder(){var t;return(t=Mt(this,A.PLACEHOLDER))!=null?t:""}set placeholder(t){this.setAttribute(A.PLACEHOLDER,`${t}`)}get primaryColor(){var t,e;let i=this.getAttribute(A.PRIMARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Yt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_primary-color"))==null?void 0:e.trim(),i))return i}set primaryColor(t){this.setAttribute(A.PRIMARY_COLOR,`${t}`)}get secondaryColor(){var t,e;let i=this.getAttribute(A.SECONDARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Yt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_secondary-color"))==null?void 0:e.trim(),i))return i}set secondaryColor(t){this.setAttribute(A.SECONDARY_COLOR,`${t}`)}get accentColor(){var t,e;let i=this.getAttribute(A.ACCENT_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Yt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_accent-color"))==null?void 0:e.trim(),i))return i}set accentColor(t){this.setAttribute(A.ACCENT_COLOR,`${t}`)}get defaultShowRemainingTime(){return this.hasAttribute(A.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(t){t?this.setAttribute(A.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(A.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(A.PLAYBACK_RATES))return this.getAttribute(A.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(t=>Number(t)).filter(t=>!Number.isNaN(t)).sort((t,e)=>t-e)}set playbackRates(t){if(!t){this.removeAttribute(A.PLAYBACK_RATES);return}this.setAttribute(A.PLAYBACK_RATES,t.join(" "))}get forwardSeekOffset(){var t;return(t=$e(this.getAttribute(A.FORWARD_SEEK_OFFSET)))!=null?t:10}set forwardSeekOffset(t){this.setAttribute(A.FORWARD_SEEK_OFFSET,`${t}`)}get backwardSeekOffset(){var t;return(t=$e(this.getAttribute(A.BACKWARD_SEEK_OFFSET)))!=null?t:10}set backwardSeekOffset(t){this.setAttribute(A.BACKWARD_SEEK_OFFSET,`${t}`)}get defaultHiddenCaptions(){return this.hasAttribute(A.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(t){t?this.setAttribute(A.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(A.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return $e(this.getAttribute(A.DEFAULT_DURATION))}set defaultDuration(t){t==null?this.removeAttribute(A.DEFAULT_DURATION):this.setAttribute(A.DEFAULT_DURATION,`${t}`)}get playerInitTime(){return this.hasAttribute(f.PLAYER_INIT_TIME)?$e(this.getAttribute(f.PLAYER_INIT_TIME)):H(this,_o)}set playerInitTime(t){t!=this.playerInitTime&&(t==null?this.removeAttribute(f.PLAYER_INIT_TIME):this.setAttribute(f.PLAYER_INIT_TIME,`${+t}`))}get playerSoftwareName(){var t;return(t=this.getAttribute(f.PLAYER_SOFTWARE_NAME))!=null?t:Sm}get playerSoftwareVersion(){var t;return(t=this.getAttribute(f.PLAYER_SOFTWARE_VERSION))!=null?t:km}get beaconCollectionDomain(){var t;return(t=this.getAttribute(f.BEACON_COLLECTION_DOMAIN))!=null?t:void 0}set beaconCollectionDomain(t){t!==this.beaconCollectionDomain&&(t?this.setAttribute(f.BEACON_COLLECTION_DOMAIN,t):this.removeAttribute(f.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var t;return(t=this.getAttribute(f.MAX_RESOLUTION))!=null?t:void 0}set maxResolution(t){t!==this.maxResolution&&(t?this.setAttribute(f.MAX_RESOLUTION,t):this.removeAttribute(f.MAX_RESOLUTION))}get minResolution(){var t;return(t=this.getAttribute(f.MIN_RESOLUTION))!=null?t:void 0}set minResolution(t){t!==this.minResolution&&(t?this.setAttribute(f.MIN_RESOLUTION,t):this.removeAttribute(f.MIN_RESOLUTION))}get maxAutoResolution(){var t;return(t=this.getAttribute(f.MAX_AUTO_RESOLUTION))!=null?t:void 0}set maxAutoResolution(t){t==null?this.removeAttribute(f.MAX_AUTO_RESOLUTION):this.setAttribute(f.MAX_AUTO_RESOLUTION,t)}get renditionOrder(){var t;return(t=this.getAttribute(f.RENDITION_ORDER))!=null?t:void 0}set renditionOrder(t){t!==this.renditionOrder&&(t?this.setAttribute(f.RENDITION_ORDER,t):this.removeAttribute(f.RENDITION_ORDER))}get programStartTime(){return $e(this.getAttribute(f.PROGRAM_START_TIME))}set programStartTime(t){t==null?this.removeAttribute(f.PROGRAM_START_TIME):this.setAttribute(f.PROGRAM_START_TIME,`${t}`)}get programEndTime(){return $e(this.getAttribute(f.PROGRAM_END_TIME))}set programEndTime(t){t==null?this.removeAttribute(f.PROGRAM_END_TIME):this.setAttribute(f.PROGRAM_END_TIME,`${t}`)}get assetStartTime(){return $e(this.getAttribute(f.ASSET_START_TIME))}set assetStartTime(t){t==null?this.removeAttribute(f.ASSET_START_TIME):this.setAttribute(f.ASSET_START_TIME,`${t}`)}get assetEndTime(){return $e(this.getAttribute(f.ASSET_END_TIME))}set assetEndTime(t){t==null?this.removeAttribute(f.ASSET_END_TIME):this.setAttribute(f.ASSET_END_TIME,`${t}`)}get extraSourceParams(){return this.hasAttribute(A.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(A.EXTRA_SOURCE_PARAMS)).entries()].reduce((t,[e,i])=>(t[e]=i,t),{}):QA}set extraSourceParams(t){t==null?this.removeAttribute(A.EXTRA_SOURCE_PARAMS):this.setAttribute(A.EXTRA_SOURCE_PARAMS,new URLSearchParams(t).toString())}get customDomain(){var t;return(t=this.getAttribute(f.CUSTOM_DOMAIN))!=null?t:void 0}set customDomain(t){t!==this.customDomain&&(t?this.setAttribute(f.CUSTOM_DOMAIN,t):this.removeAttribute(f.CUSTOM_DOMAIN))}get envKey(){var t;return(t=Mt(this,f.ENV_KEY))!=null?t:void 0}set envKey(t){this.setAttribute(f.ENV_KEY,`${t}`)}get noVolumePref(){return this.hasAttribute(A.NO_VOLUME_PREF)}set noVolumePref(t){t?this.setAttribute(A.NO_VOLUME_PREF,""):this.removeAttribute(A.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(A.NO_MUTED_PREF)}set noMutedPref(t){t?this.setAttribute(A.NO_MUTED_PREF,""):this.removeAttribute(A.NO_MUTED_PREF)}get debug(){return Mt(this,f.DEBUG)!=null}set debug(t){t?this.setAttribute(f.DEBUG,""):this.removeAttribute(f.DEBUG)}get disableTracking(){return Mt(this,f.DISABLE_TRACKING)!=null}set disableTracking(t){this.toggleAttribute(f.DISABLE_TRACKING,!!t)}get disableCookies(){return Mt(this,f.DISABLE_COOKIES)!=null}set disableCookies(t){t?this.setAttribute(f.DISABLE_COOKIES,""):this.removeAttribute(f.DISABLE_COOKIES)}get streamType(){var t,e,i;return(i=(e=this.getAttribute(f.STREAM_TYPE))!=null?e:(t=this.media)==null?void 0:t.streamType)!=null?i:Z.UNKNOWN}set streamType(t){this.setAttribute(f.STREAM_TYPE,`${t}`)}get defaultStreamType(){var t,e,i;return(i=(e=this.getAttribute(A.DEFAULT_STREAM_TYPE))!=null?e:(t=this.mediaController)==null?void 0:t.getAttribute(A.DEFAULT_STREAM_TYPE))!=null?i:Z.ON_DEMAND}set defaultStreamType(t){t?this.setAttribute(A.DEFAULT_STREAM_TYPE,t):this.removeAttribute(A.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var t,e;return this.hasAttribute(A.TARGET_LIVE_WINDOW)?+this.getAttribute(A.TARGET_LIVE_WINDOW):(e=(t=this.media)==null?void 0:t.targetLiveWindow)!=null?e:Number.NaN}set targetLiveWindow(t){t==this.targetLiveWindow||Number.isNaN(t)&&Number.isNaN(this.targetLiveWindow)||(t==null?this.removeAttribute(A.TARGET_LIVE_WINDOW):this.setAttribute(A.TARGET_LIVE_WINDOW,`${+t}`))}get liveEdgeStart(){var t;return(t=this.media)==null?void 0:t.liveEdgeStart}get startTime(){return $e(Mt(this,f.START_TIME))}set startTime(t){this.setAttribute(f.START_TIME,`${t}`)}get initialBandwidthEstimateKbps(){return $e(Mt(this,f.INITIAL_BANDWIDTH_ESTIMATE_KBPS))}set initialBandwidthEstimateKbps(t){t==null?this.removeAttribute(f.INITIAL_BANDWIDTH_ESTIMATE_KBPS):this.setAttribute(f.INITIAL_BANDWIDTH_ESTIMATE_KBPS,`${t}`)}get initialEstimateSegments(){return $e(Mt(this,f.INITIAL_ESTIMATE_SEGMENTS))}set initialEstimateSegments(t){t==null?this.removeAttribute(f.INITIAL_ESTIMATE_SEGMENTS):this.setAttribute(f.INITIAL_ESTIMATE_SEGMENTS,`${t}`)}get minPreloadSegments(){return $e(Mt(this,f.MIN_PRELOAD_SEGMENTS))}set minPreloadSegments(t){t==null?this.removeAttribute(f.MIN_PRELOAD_SEGMENTS):this.setAttribute(f.MIN_PRELOAD_SEGMENTS,`${t}`)}get preferPlayback(){let t=this.getAttribute(f.PREFER_PLAYBACK);if(t===Gt.MSE||t===Gt.NATIVE)return t}set preferPlayback(t){t!==this.preferPlayback&&(t===Gt.MSE||t===Gt.NATIVE?this.setAttribute(f.PREFER_PLAYBACK,t):this.removeAttribute(f.PREFER_PLAYBACK))}get metadata(){var t;return(t=this.media)==null?void 0:t.metadata}set metadata(t){if(pe(this,ue,li).call(this),!this.media){qe("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...dn(this),...t}}get _hlsConfig(){var t;return(t=this.media)==null?void 0:t._hlsConfig}set _hlsConfig(t){if(pe(this,ue,li).call(this),!this.media){qe("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=t}async addCuePoints(t){var e;if(pe(this,ue,li).call(this),!this.media){qe("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(e=this.media)==null?void 0:e.addCuePoints(t)}get activeCuePoint(){var t;return(t=this.media)==null?void 0:t.activeCuePoint}get cuePoints(){var t,e;return(e=(t=this.media)==null?void 0:t.cuePoints)!=null?e:[]}addChapters(t){var e;if(pe(this,ue,li).call(this),!this.media){qe("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(e=this.media)==null?void 0:e.addChapters(t)}get activeChapter(){var t;return(t=this.media)==null?void 0:t.activeChapter}get chapters(){var t,e;return(e=(t=this.media)==null?void 0:t.chapters)!=null?e:[]}getStartDate(){var t;return(t=this.media)==null?void 0:t.getStartDate()}get currentPdt(){var t;return(t=this.media)==null?void 0:t.currentPdt}get tokens(){let t=this.getAttribute(A.PLAYBACK_TOKEN),e=this.getAttribute(A.DRM_TOKEN),i=this.getAttribute(A.THUMBNAIL_TOKEN),a=this.getAttribute(A.STORYBOARD_TOKEN);return{...H(this,bo),...t!=null?{playback:t}:{},...e!=null?{drm:e}:{},...i!=null?{thumbnail:i}:{},...a!=null?{storyboard:a}:{}}}set tokens(t){Ye(this,bo,t??{})}get playbackToken(){var t;return(t=this.getAttribute(A.PLAYBACK_TOKEN))!=null?t:void 0}set playbackToken(t){this.setAttribute(A.PLAYBACK_TOKEN,`${t}`)}get drmToken(){var t;return(t=this.getAttribute(A.DRM_TOKEN))!=null?t:void 0}set drmToken(t){this.setAttribute(A.DRM_TOKEN,`${t}`)}get thumbnailToken(){var t;return(t=this.getAttribute(A.THUMBNAIL_TOKEN))!=null?t:void 0}set thumbnailToken(t){this.setAttribute(A.THUMBNAIL_TOKEN,`${t}`)}get storyboardToken(){var t;return(t=this.getAttribute(A.STORYBOARD_TOKEN))!=null?t:void 0}set storyboardToken(t){this.setAttribute(A.STORYBOARD_TOKEN,`${t}`)}addTextTrack(t,e,i,a){var r;let n=(r=this.media)==null?void 0:r.nativeEl;if(n)return bu(n,t,e,i,a)}removeTextTrack(t){var e;let i=(e=this.media)==null?void 0:e.nativeEl;if(i)return Nb(i,t)}get textTracks(){var t;return(t=this.media)==null?void 0:t.textTracks}get castReceiver(){var t;return(t=this.getAttribute(A.CAST_RECEIVER))!=null?t:void 0}set castReceiver(t){t!==this.castReceiver&&(t?this.setAttribute(A.CAST_RECEIVER,t):this.removeAttribute(A.CAST_RECEIVER))}get castCustomData(){var t;return(t=this.media)==null?void 0:t.castCustomData}set castCustomData(t){if(!this.media){qe("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=t}get noTooltips(){return this.hasAttribute(A.NO_TOOLTIPS)}set noTooltips(t){if(!t){this.removeAttribute(A.NO_TOOLTIPS);return}this.setAttribute(A.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(A.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(t){t?this.setAttribute(A.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(A.PROUDLY_DISPLAY_MUX_BADGE)}get capRenditionToPlayerSize(){var t;return(t=this.media)==null?void 0:t.capRenditionToPlayerSize}set capRenditionToPlayerSize(t){if(!this.media){qe("underlying media element missing when trying to set capRenditionToPlayerSize");return}this.media.capRenditionToPlayerSize=t}get maxReconnectRetries(){var t;return(t=this.media)==null?void 0:t.maxReconnectRetries}set maxReconnectRetries(t){if(!this.media){qe("underlying media element missing when trying to set maxReconnectRetries");return}this.media.maxReconnectRetries=t}};_o=new WeakMap,yn=new WeakMap,bo=new WeakMap,aa=new WeakMap,go=new WeakMap,Tn=new WeakMap,Zo=new WeakMap,Xo=new WeakMap,dr=new WeakMap,Jo=new WeakMap,el=new WeakMap,tl=new WeakMap,An=new WeakMap,ur=new WeakMap,il=new WeakMap,ue=new WeakSet,li=function(){var t,e,i,a;if(!H(this,yn)){Ye(this,yn,!0),pe(this,ue,ua).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof Yt.HTMLElement))throw""}catch{qe("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{qe("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof p1))throw""}catch{qe("<media-controller> failed to upgrade!")}pe(this,ue,Im).call(this),pe(this,ue,Rm).call(this),pe(this,ue,Lm).call(this),Ye(this,aa,(e=(t=this.mediaController)==null?void 0:t.hasAttribute(P.USER_INACTIVE))!=null?e:!0),pe(this,ue,Cm).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",H(this,Zo)),(a=this.media)==null||a.addEventListener("loadstart",H(this,Xo)),this.media&&(this.media.metadata=dn(this))}},Mf=function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},cu=function(t){Object.assign(H(this,ur),t),pe(this,ue,ua).call(this)},ua=function(t={}){LA(DA(FA(this,{...H(this,ur),...t})),this.shadowRoot)},Im=function(){let t=e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let r=e.replace(/^theme-/,"");if(uu.includes(r))return;let n=this.getAttribute(e);n!=null?(i=this.mediaTheme)==null||i.setAttribute(r,n):(a=this.mediaTheme)==null||a.removeAttribute(r)};Ye(this,Tn,new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)})),H(this,Tn).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},Rm=function(){var t,e;this.addEventListener("error",H(this,il)),this.addEventListener("click",H(this,Jo)),(t=this.mediaTheme)==null||t.addEventListener("close",H(this,el)),(e=this.mediaTheme)==null||e.addEventListener("focusin",H(this,tl)),this.media&&(this.media.errorTranslator=(i={})=>{var a,r,n;if(!(((a=this.media)==null?void 0:a.error)instanceof R))return i;let s=Cf((r=this.media)==null?void 0:r.error);return{player_error_code:(n=this.media)==null?void 0:n.error.code,player_error_message:s.message?String(s.message):i.player_error_message,player_error_context:s.context?String(s.context):i.player_error_context}})},Lm=function(){var t,e,i,a;(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",H(this,dr)),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",H(this,dr))},Cm=function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=()=>this.streamType===Z.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,n=(d,m,p=!1)=>{r()||Array.from(d&&d.activeCues||[]).forEach(h=>{if(!(!h.snapToLines||h.line<-5||h.line>=0&&h.line<10))if(!m||this.paused){let u=h.text.split(`
`).length,v=-3;this.streamType===Z.LIVE&&(v=-2);let E=v-u;if(h.line===E&&!p)return;a.has(h)||a.set(h,h.line),h.line=E}else setTimeout(()=>{h.line=a.get(h)||"auto"},500)})},s=()=>{var d,m;n(i,(m=(d=this.mediaController)==null?void 0:d.hasAttribute(P.USER_INACTIVE))!=null?m:!1)},o=()=>{var d,m;let p=Array.from(((m=(d=this.mediaController)==null?void 0:d.media)==null?void 0:m.textTracks)||[]).filter(h=>["subtitles","captions"].includes(h.kind)&&h.mode==="showing")[0];p!==i&&i?.removeEventListener("cuechange",s),i=p,i?.addEventListener("cuechange",s),n(i,H(this,aa))};o(),(t=this.textTracks)==null||t.addEventListener("change",o),(e=this.textTracks)==null||e.addEventListener("addtrack",o);let l=()=>{var d,m;let p=(m=(d=this.mediaController)==null?void 0:d.hasAttribute(P.USER_INACTIVE))!=null?m:!0;H(this,aa)!==p&&(Ye(this,aa,p),n(i,H(this,aa)))};this.addEventListener("userinactivechange",l),Ye(this,An,()=>{var d,m;i?.removeEventListener("cuechange",s),(d=this.textTracks)==null||d.removeEventListener("change",o),(m=this.textTracks)==null||m.removeEventListener("addtrack",o),this.removeEventListener("userinactivechange",l)})};function Mt(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}var Dm=jA,xf=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends xf{}globalThis.DocumentFragment=t}var ZA=class extends xf{},XA={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(ZA)}},JA={customElements:XA},ek=typeof window>"u"||typeof globalThis.customElements>"u",Yl=ek?JA:globalThis;Yl.customElements.get("mux-player")||(Yl.customElements.define("mux-player",Dm),Yl.MuxPlayerElement=Dm);var Of=parseInt(kn.version)>=19,Mm={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},tk=t=>t==null,ik=(t,e)=>tk(e)?!1:t in e,ak=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),rk=(t,e)=>{if(!(!Of&&typeof e=="boolean"&&!e)){if(ik(t,Mm))return Mm[t];if(typeof e<"u")return/[A-Z]/.test(t)?ak(t):t}},nk=(t,e)=>!Of&&typeof t=="boolean"?"":t,sk=(t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[r,n])=>{let s=rk(r,n);if(!s)return a;let o=nk(n);return a[s]=o,a},{})};function xm(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}function ok(...t){return e=>{let i=!1,a=t.map(r=>{let n=xm(r,e);return!i&&typeof n=="function"&&(i=!0),n});if(i)return()=>{for(let r=0;r<a.length;r++){let n=a[r];typeof n=="function"?n():xm(t[r],null)}}}}function lk(...t){return Sn.useCallback(ok(...t),t)}var dk=Object.prototype.hasOwnProperty,uk=(t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,n)=>e[n]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!dk.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},Nf=(t,e,i)=>!uk(e,t[i]),ck=(t,e,i)=>{t[i]=e},hk=(t,e,i,a=ck,r=Nf)=>Sn.useEffect(()=>{let n=i?.current;n&&r(n,e,t)&&a(n,e,t)},[i?.current,e]),xt=hk,mk=()=>{try{return"3.13.2"}catch{}return"UNKNOWN"},pk=mk(),vk=()=>pk,ne=(t,e,i)=>Sn.useEffect(()=>{let a=e?.current;if(!a||!i)return;let r=t,n=i;return a.addEventListener(r,n),()=>{a.removeEventListener(r,n)}},[e?.current,i,t]),fk=kn.forwardRef(({children:t,...e},i)=>kn.createElement("mux-player",{suppressHydrationWarning:!0,...sk(e),ref:i},t)),Ek=(t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:n,onLoadStart:s,onLoadedData:o,onLoadedMetadata:l,onProgress:d,onDurationChange:m,onVolumeChange:p,onRateChange:h,onResize:u,onWaiting:v,onPlay:E,onPlaying:y,onTimeUpdate:g,onPause:T,onSeeking:_,onSeeked:k,onStalled:D,onSuspend:L,onEnded:w,onError:$,onCuePointChange:V,onChapterChange:W,metadata:B,tokens:Ne,paused:Qe,playbackId:je,playbackRates:fe,currentTime:He,themeProps:Rt,extraSourceParams:Be,castCustomData:mt,_hlsConfig:Ze,...Ie}=e;return xt("tokens",Ne,t),xt("playbackId",je,t),xt("playbackRates",fe,t),xt("metadata",B,t),xt("extraSourceParams",Be,t),xt("_hlsConfig",Ze,t),xt("themeProps",Rt,t),xt("castCustomData",mt,t),xt("paused",Qe,t,(Pe,We)=>{We!=null&&(We?Pe.pause():Pe.play())},(Pe,We,ei)=>Pe.hasAttribute("autoplay")&&!Pe.hasPlayed?!1:Nf(Pe,We,ei)),xt("currentTime",He,t,(Pe,We)=>{We!=null&&(Pe.currentTime=We)}),ne("abort",t,i),ne("canplay",t,a),ne("canplaythrough",t,r),ne("emptied",t,n),ne("loadstart",t,s),ne("loadeddata",t,o),ne("loadedmetadata",t,l),ne("progress",t,d),ne("durationchange",t,m),ne("volumechange",t,p),ne("ratechange",t,h),ne("resize",t,u),ne("waiting",t,v),ne("play",t,E),ne("playing",t,y),ne("timeupdate",t,g),ne("pause",t,T),ne("seeking",t,_),ne("seeked",t,k),ne("stalled",t,D),ne("suspend",t,L),ne("ended",t,w),ne("error",t,$),ne("cuepointchange",t,V),ne("chapterchange",t,W),[Ie]},_k=vk(),bk="mux-player-react",gk=kn.forwardRef((t,e)=>{var i;let a=Sn.useRef(null),r=lk(a,e),[n]=Ek(a,t),[s]=Sn.useState((i=t.playerInitTime)!=null?i:Au());return kn.createElement(fk,{ref:r,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:bk,playerSoftwareVersion:_k,playerInitTime:s,...n})}),Bk=gk;export{Sk as MaxResolution,R as MediaError,wk as MinResolution,Ik as RenditionOrder,Bk as default,Au as generatePlayerInitTime,bk as playerSoftwareName,_k as playerSoftwareVersion};

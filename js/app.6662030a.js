(function(t){function e(e){for(var r,a,f=e[0],c=e[1],u=e[2],s=0,d=[];s<f.length;s++)a=f[s],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,f=1;f<n.length;f++){var c=n[f];0!==i[c]&&(r=!1)}r&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},i={app:0},o=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/vue-image-viewer/";var f=window["webpackJsonp"]=window["webpackJsonp"]||[],c=f.push.bind(f);f.push=e,f=f.slice();for(var u=0;u<f.length;u++)e(f[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"29d6":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),i=(n("b0c0"),{class:"app"});function o(t,e,n,o,a,f){var c=Object(r["j"])("viewer");return Object(r["g"])(),Object(r["c"])(r["a"],null,[Object(r["d"])("div",i,[(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["i"])(t.imageList,(function(t){return Object(r["g"])(),Object(r["c"])("div",{class:"image-item",key:t.id},[Object(r["k"])(Object(r["d"])("img",{src:t.src,alt:t.name},null,8,["src","alt"]),[[c]])])})),128))]),Object(r["d"])("button",{onClick:e[1]||(e[1]=function(){return t.handleAdd1&&t.handleAdd1.apply(t,arguments)})},"more images"),Object(r["d"])("button",{onClick:e[2]||(e[2]=function(){return t.handleDel&&t.handleDel.apply(t,arguments)})},"del image")],64)}n("a630"),n("3ca3"),n("a434"),n("a15b"),n("d3b7"),n("25f0");var a=function(){return Array.from({length:16},(function(){return Math.floor(256*Math.random()).toString(16)})).join("")},f="__ZOOM_FLAG__",c="__observer_plugin__",u="img",l={attributes:!0,childList:!0,characterData:!0,subtree:!0},s={margin:40,background:"#fff",scrollOffset:0},d=["https://images.unsplash.com/photo-1623000261482-fd95093395fb?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623128077285-ca65de3d7582?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1622495891958-14d71e85a007?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623116135479-ef83d0c864e2?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623123726825-6e3487e7a15e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623000261482-fd95093395fb?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623128077285-ca65de3d7582?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1622495891958-14d71e85a007?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623116135479-ef83d0c864e2?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1623123726825-6e3487e7a15e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],p=d.length,b=function(){var t=Math.floor(Math.random()*p);return d[t]},h=Object(r["e"])({name:"App",setup:function(){var t=Object(r["h"])(Array.from({length:1},(function(){return{id:a(),name:a(),src:b()}}))),e=function(){t.push({id:a(),name:a(),src:b()})},n=function(){var e=t.length,n=Math.floor(Math.random()*e);t.splice(n,1)};return{imageList:t,handleAdd1:e,handleDel:n}}});n("f76f");h.render=o;var m=h,x=n("72dd"),w=n("2909"),M=(n("10d1"),n("ddb0"),n("caad"),n("159b"),n("f7fe")),v=n.n(M),g=n("d15e"),j=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,H=!1,O=[],Z=new WeakMap,y=function(t){O.includes(t)||(O.push(t),D())},D=function(){H||(H=!0,Object(x["b"])(A))},A=function(){var t;H=!1;while(t=O.shift())t&&t()},G=function(t,e){if(t&&!t.hasAttribute(f)&&!Z.has(t)){var n=Object(g["a"])(t,e);Z.set(t,n),t.setAttribute(f,f)}},V=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s;if(t&&!t.hasAttribute(f)&&!Z.has(t)){var n=function(){if("IMG"!==t.tagName){var n=t.querySelectorAll(u);Object(w["a"])(n).forEach((function(t){G(t,e)}))}else G(t,e)};y(n)}},W=v()(V,300,{leading:!1,trailing:!0}),_=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s;W(t,e);var n=new j((function(t){t.forEach((function(t){var n=t.target;W(n,e)}))}));n.observe(t,l),t[c]=n,window.addEventListener("beforeunload",(function(){n&&n.disconnect()}))},B=function(t){return{inserted:function(e){_(e,t)},update:function(e){_(e,t)},unbind:function(t){var e=t[c];e&&e.disconnect()}}},J=function(t){return{mounted:function(e){_(e,t)},updated:function(e){_(e,t)},beforeUnmount:function(t){var e=t[c];e&&e.disconnect()}}};function q(t){var e;e=x["a"]?J(t):B(t);var n={options:t,install:function(n){n.directive((null===t||void 0===t?void 0:t.directiveName)||"viewer",e)}};return n}var Y={directiveName:"viewer"},k=q(Y);Object(r["b"])(m).use(k).mount("#app")},f76f:function(t,e,n){"use strict";n("29d6")}});
//# sourceMappingURL=app.6662030a.js.map
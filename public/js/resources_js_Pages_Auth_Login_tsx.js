(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Auth_Login_tsx"],{

/***/ "./resources/js/Pages/Auth/Login.tsx":
/*!*******************************************!*\
  !*** ./resources/js/Pages/Auth/Login.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var ziggy_js_1 = __importDefault(__webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js"));

var inertia_react_1 = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");

var Login = function Login() {
  var _a = inertia_react_1.useForm({
    email: "",
    password: "",
    remember: false
  }),
      data = _a.data,
      setData = _a.setData,
      post = _a.post,
      processing = _a.processing,
      errors = _a.errors;

  var handleChange = function handleChange(e) {
    var target = e.currentTarget;
    var value = target.type === "checkbox" ? target.checked : target.value;
    setData(target.name, value);
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    post(ziggy_js_1["default"]("login"));
  };

  return react_1["default"].createElement("form", {
    onSubmit: handleSubmit
  }, react_1["default"].createElement("div", null, react_1["default"].createElement("label", null, "E-mail:"), react_1["default"].createElement("input", {
    type: "text",
    value: data.email,
    name: "email",
    onChange: handleChange
  }), errors.email && react_1["default"].createElement("div", null, errors.email)), react_1["default"].createElement("div", null, react_1["default"].createElement("label", null, "Password"), react_1["default"].createElement("input", {
    type: "password",
    value: data.password,
    name: "password",
    onChange: handleChange
  }), errors.password && react_1["default"].createElement("div", null, errors.password)), react_1["default"].createElement("div", null, react_1["default"].createElement("input", {
    type: "checkbox",
    checked: data.remember,
    name: "remember",
    onChange: handleChange
  }), " ", "Remember Me"), react_1["default"].createElement("div", null, react_1["default"].createElement("button", {
    type: "submit",
    disabled: processing
  }, "Login")));
};

exports.default = Login;

/***/ }),

/***/ "./node_modules/ziggy-js/dist/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ziggy-js/dist/index.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(n,t){ true?module.exports=t(__webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js")):0}(this,function(n){function t(n,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function r(n,r,i){return r&&t(n.prototype,r),i&&t(n,i),n}function i(){return(i=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}return n}).apply(this,arguments)}function e(n){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function u(n,t){return(u=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function o(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}function f(n,t,r){return(f=o()?Reflect.construct:function(n,t,r){var i=[null];i.push.apply(i,t);var e=new(Function.bind.apply(n,i));return r&&u(e,r.prototype),e}).apply(null,arguments)}function c(n){var t="function"==typeof Map?new Map:void 0;return(c=function(n){if(null===n||-1===Function.toString.call(n).indexOf("[native code]"))return n;if("function"!=typeof n)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(n))return t.get(n);t.set(n,r)}function r(){return f(n,arguments,e(this).constructor)}return r.prototype=Object.create(n.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),u(r,n)})(n)}var s=function(){function n(n,t,r){var i;this.name=n,this.definition=t,this.bindings=null!=(i=t.bindings)?i:{},this.config=r}var t=n.prototype;return t.matchesUrl=function(n){if(!this.definition.methods.includes("GET"))return!1;var t=this.template.replace(/\/{[^}?]*\?}/g,"(/[^/?]+)?").replace(/{[^}]+}/g,"[^/?]+").replace(/^\w+:\/\//,"");return new RegExp("^"+t+"$").test(n.replace(/\/+$/,"").split("?").shift())},t.compile=function(n){var t=this;return this.parameterSegments.length?this.template.replace(/{([^}?]+)\??}/g,function(r,i){var e;if([null,void 0].includes(n[i])&&t.parameterSegments.find(function(n){return n.name===i}).required)throw new Error("Ziggy error: '"+i+"' parameter is required for route '"+t.name+"'.");return encodeURIComponent(null!=(e=n[i])?e:"")}).replace(/\/+$/,""):this.template},r(n,[{key:"template",get:function(){return((this.config.absolute?this.definition.domain?""+this.config.url.match(/^\w+:\/\//)[0]+this.definition.domain+(this.config.port?":"+this.config.port:""):this.config.url:"")+"/"+this.definition.uri).replace(/\/+$/,"")}},{key:"parameterSegments",get:function(){var n,t;return null!=(n=null===(t=this.template.match(/{[^}?]+\??}/g))||void 0===t?void 0:t.map(function(n){return{name:n.replace(/{|\??}/g,""),required:!/\?}$/.test(n)}}))?n:[]}}]),n}(),a=function(t){var e,u;function o(n,r,e,u){var o,f;if(void 0===e&&(e=!0),(f=t.call(this)||this).t=null!=(o=null!=u?u:Ziggy)?o:null===globalThis||void 0===globalThis?void 0:globalThis.Ziggy,f.t=i({},f.t,{absolute:e}),n){if(!f.t.routes[n])throw new Error("Ziggy error: route '"+n+"' is not in the route list.");f.i=new s(n,f.t.routes[n],f.t),f.u=f.o(r)}return f}u=t,(e=o).prototype=Object.create(u.prototype),e.prototype.constructor=e,e.__proto__=u;var f=o.prototype;return f.toString=function(){var t=this,r=Object.keys(this.u).filter(function(n){return!t.i.parameterSegments.some(function(t){return t.name===n})}).filter(function(n){return"_query"!==n}).reduce(function(n,r){var e;return i({},n,((e={})[r]=t.u[r],e))},{});return this.i.compile(this.u)+n.stringify(i({},r,this.u._query),{addQueryPrefix:!0,arrayFormat:"indices",encodeValuesOnly:!0,skipNulls:!0,encoder:function(n,t){return"boolean"==typeof n?Number(n):t(n)}})},f.current=function(n,t){var r=this,i=this.t.absolute?this.s().host+this.s().pathname:this.s().pathname.replace(this.t.url.replace(/^\w*:\/\/[^/]+/,""),"").replace(/^\/+/,"/"),e=Object.entries(this.t.routes).find(function(t){return new s(n,t[1],r.t).matchesUrl(i)})||[void 0,void 0],u=e[0],o=e[1];if(!n)return u;var f=new RegExp("^"+n.replace(".","\\.").replace("*",".*")+"$").test(u);if([null,void 0].includes(t)||!f)return f;var c=new s(u,o,this.t);t=this.o(t,c);var a=this.h(o);return!(!Object.values(t).every(function(n){return!n})||Object.values(a).length)||Object.entries(t).every(function(n){return a[n[0]]==n[1]})},f.s=function(){var n,t,r,i,e,u,o="undefined"!=typeof window?window.location:{},f=o.host,c=o.pathname,s=o.search;return{host:null!=(n=null===(t=this.t.location)||void 0===t?void 0:t.host)?n:void 0===f?"":f,pathname:null!=(r=null===(i=this.t.location)||void 0===i?void 0:i.pathname)?r:void 0===c?"":c,search:null!=(e=null===(u=this.t.location)||void 0===u?void 0:u.search)?e:void 0===s?"":s}},f.has=function(n){return Object.keys(this.t.routes).includes(n)},f.o=function(n,t){var r=this;void 0===n&&(n={}),void 0===t&&(t=this.i),n=["string","number"].includes(typeof n)?[n]:n;var e=t.parameterSegments.filter(function(n){return!r.t.defaults[n.name]});if(Array.isArray(n))n=n.reduce(function(n,t,r){var u,o;return i({},n,e[r]?((u={})[e[r].name]=t,u):((o={})[t]="",o))},{});else if(1===e.length&&!n[e[0].name]&&(n.hasOwnProperty(Object.values(t.bindings)[0])||n.hasOwnProperty("id"))){var u;(u={})[e[0].name]=n,n=u}return i({},this.l(t),this.v(n,t.bindings))},f.l=function(n){var t=this;return n.parameterSegments.filter(function(n){return t.t.defaults[n.name]}).reduce(function(n,r,e){var u,o=r.name;return i({},n,((u={})[o]=t.t.defaults[o],u))},{})},f.v=function(n,t){return void 0===t&&(t={}),Object.entries(n).reduce(function(n,r){var e,u,o=r[0],f=r[1];if(!f||"object"!=typeof f||Array.isArray(f)||"_query"===o)return i({},n,((u={})[o]=f,u));if(!f.hasOwnProperty(t[o])){if(!f.hasOwnProperty("id"))throw new Error("Ziggy error: object passed as '"+o+"' parameter is missing route model binding key '"+t[o]+"'.");t[o]="id"}return i({},n,((e={})[o]=f[t[o]],e))},{})},f.h=function(t){var r,e=this.s().pathname.replace(this.t.url.replace(/^\w*:\/\/[^/]+/,""),"").replace(/^\/+/,""),u=function(n,t,r){void 0===t&&(t="");var e=[n,t].map(function(n){return n.split(r)}),u=e[0];return e[1].reduce(function(n,t,r){var e;return/^{[^}?]+\??}$/.test(t)&&u[r]?i({},n,((e={})[t.replace(/^{|\??}$/g,"")]=u[r],e)):n},{})};return i({},u(this.s().host,t.domain,"."),u(e,t.uri,"/"),n.parse(null===(r=this.s().search)||void 0===r?void 0:r.replace(/^\?/,"")))},f.valueOf=function(){return this.toString()},f.check=function(n){return this.has(n)},r(o,[{key:"params",get:function(){return this.h(this.t.routes[this.current()])}}]),o}(c(String));return function(n,t,r,i){var e=new a(n,t,r,i);return n?e.toString():e}});


/***/ })

}]);
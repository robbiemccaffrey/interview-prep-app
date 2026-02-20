function Gg(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in e)){const a=Object.getOwnPropertyDescriptor(r,i);a&&Object.defineProperty(e,i,a.get?a:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();var qa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ko(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Zp={exports:{}},So={},Jp={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qi=Symbol.for("react.element"),Kg=Symbol.for("react.portal"),Vg=Symbol.for("react.fragment"),Yg=Symbol.for("react.strict_mode"),Qg=Symbol.for("react.profiler"),Xg=Symbol.for("react.provider"),Zg=Symbol.for("react.context"),Jg=Symbol.for("react.forward_ref"),ey=Symbol.for("react.suspense"),ty=Symbol.for("react.memo"),ny=Symbol.for("react.lazy"),gu=Symbol.iterator;function ry(e){return e===null||typeof e!="object"?null:(e=gu&&e[gu]||e["@@iterator"],typeof e=="function"?e:null)}var ef={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},tf=Object.assign,nf={};function Lr(e,t,n){this.props=e,this.context=t,this.refs=nf,this.updater=n||ef}Lr.prototype.isReactComponent={};Lr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Lr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function rf(){}rf.prototype=Lr.prototype;function Vl(e,t,n){this.props=e,this.context=t,this.refs=nf,this.updater=n||ef}var Yl=Vl.prototype=new rf;Yl.constructor=Vl;tf(Yl,Lr.prototype);Yl.isPureReactComponent=!0;var yu=Array.isArray,af=Object.prototype.hasOwnProperty,Ql={current:null},of={key:!0,ref:!0,__self:!0,__source:!0};function sf(e,t,n){var r,i={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)af.call(t,r)&&!of.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];i.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:qi,type:e,key:a,ref:o,props:i,_owner:Ql.current}}function iy(e,t){return{$$typeof:qi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Xl(e){return typeof e=="object"&&e!==null&&e.$$typeof===qi}function ay(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var bu=/\/+/g;function Yo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ay(""+e.key):t.toString(36)}function Ra(e,t,n,r,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case qi:case Kg:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Yo(o,0):r,yu(i)?(n="",e!=null&&(n=e.replace(bu,"$&/")+"/"),Ra(i,t,n,"",function(c){return c})):i!=null&&(Xl(i)&&(i=iy(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(bu,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",yu(e))for(var s=0;s<e.length;s++){a=e[s];var l=r+Yo(a,s);o+=Ra(a,t,n,l,i)}else if(l=ry(e),typeof l=="function")for(e=l.call(e),s=0;!(a=e.next()).done;)a=a.value,l=r+Yo(a,s++),o+=Ra(a,t,n,l,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ta(e,t,n){if(e==null)return e;var r=[],i=0;return Ra(e,r,"","",function(a){return t.call(n,a,i++)}),r}function oy(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var He={current:null},Ia={transition:null},sy={ReactCurrentDispatcher:He,ReactCurrentBatchConfig:Ia,ReactCurrentOwner:Ql};function lf(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:ta,forEach:function(e,t,n){ta(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ta(e,function(){t++}),t},toArray:function(e){return ta(e,function(t){return t})||[]},only:function(e){if(!Xl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ee.Component=Lr;ee.Fragment=Vg;ee.Profiler=Qg;ee.PureComponent=Vl;ee.StrictMode=Yg;ee.Suspense=ey;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sy;ee.act=lf;ee.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=tf({},e.props),i=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=Ql.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)af.call(t,l)&&!of.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:qi,type:e.type,key:i,ref:a,props:r,_owner:o}};ee.createContext=function(e){return e={$$typeof:Zg,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Xg,_context:e},e.Consumer=e};ee.createElement=sf;ee.createFactory=function(e){var t=sf.bind(null,e);return t.type=e,t};ee.createRef=function(){return{current:null}};ee.forwardRef=function(e){return{$$typeof:Jg,render:e}};ee.isValidElement=Xl;ee.lazy=function(e){return{$$typeof:ny,_payload:{_status:-1,_result:e},_init:oy}};ee.memo=function(e,t){return{$$typeof:ty,type:e,compare:t===void 0?null:t}};ee.startTransition=function(e){var t=Ia.transition;Ia.transition={};try{e()}finally{Ia.transition=t}};ee.unstable_act=lf;ee.useCallback=function(e,t){return He.current.useCallback(e,t)};ee.useContext=function(e){return He.current.useContext(e)};ee.useDebugValue=function(){};ee.useDeferredValue=function(e){return He.current.useDeferredValue(e)};ee.useEffect=function(e,t){return He.current.useEffect(e,t)};ee.useId=function(){return He.current.useId()};ee.useImperativeHandle=function(e,t,n){return He.current.useImperativeHandle(e,t,n)};ee.useInsertionEffect=function(e,t){return He.current.useInsertionEffect(e,t)};ee.useLayoutEffect=function(e,t){return He.current.useLayoutEffect(e,t)};ee.useMemo=function(e,t){return He.current.useMemo(e,t)};ee.useReducer=function(e,t,n){return He.current.useReducer(e,t,n)};ee.useRef=function(e){return He.current.useRef(e)};ee.useState=function(e){return He.current.useState(e)};ee.useSyncExternalStore=function(e,t,n){return He.current.useSyncExternalStore(e,t,n)};ee.useTransition=function(){return He.current.useTransition()};ee.version="18.3.1";Jp.exports=ee;var R=Jp.exports;const pn=ko(R),ly=Gg({__proto__:null,default:pn},[R]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cy=R,uy=Symbol.for("react.element"),dy=Symbol.for("react.fragment"),py=Object.prototype.hasOwnProperty,fy=cy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,hy={key:!0,ref:!0,__self:!0,__source:!0};function cf(e,t,n){var r,i={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)py.call(t,r)&&!hy.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:uy,type:e,key:a,ref:o,props:i,_owner:fy.current}}So.Fragment=dy;So.jsx=cf;So.jsxs=cf;Zp.exports=So;var m=Zp.exports,Us={},uf={exports:{}},lt={},df={exports:{}},pf={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(O,P){var b=O.length;O.push(P);e:for(;0<b;){var B=b-1>>>1,H=O[B];if(0<i(H,P))O[B]=P,O[b]=H,b=B;else break e}}function n(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var P=O[0],b=O.pop();if(b!==P){O[0]=b;e:for(var B=0,H=O.length,_=H>>>1;B<_;){var Z=2*(B+1)-1,ne=O[Z],re=Z+1,Be=O[re];if(0>i(ne,b))re<H&&0>i(Be,ne)?(O[B]=Be,O[re]=b,B=re):(O[B]=ne,O[Z]=b,B=Z);else if(re<H&&0>i(Be,b))O[B]=Be,O[re]=b,B=re;else break e}}return P}function i(O,P){var b=O.sortIndex-P.sortIndex;return b!==0?b:O.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var l=[],c=[],u=1,d=null,p=3,f=!1,v=!1,x=!1,S=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(O){for(var P=n(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=O)r(c),P.sortIndex=P.expirationTime,t(l,P);else break;P=n(c)}}function E(O){if(x=!1,y(O),!v)if(n(l)!==null)v=!0,T(N);else{var P=n(c);P!==null&&D(E,P.startTime-O)}}function N(O,P){v=!1,x&&(x=!1,h(I),I=-1),f=!0;var b=p;try{for(y(P),d=n(l);d!==null&&(!(d.expirationTime>P)||O&&!$());){var B=d.callback;if(typeof B=="function"){d.callback=null,p=d.priorityLevel;var H=B(d.expirationTime<=P);P=e.unstable_now(),typeof H=="function"?d.callback=H:d===n(l)&&r(l),y(P)}else r(l);d=n(l)}if(d!==null)var _=!0;else{var Z=n(c);Z!==null&&D(E,Z.startTime-P),_=!1}return _}finally{d=null,p=b,f=!1}}var w=!1,A=null,I=-1,U=5,M=-1;function $(){return!(e.unstable_now()-M<U)}function W(){if(A!==null){var O=e.unstable_now();M=O;var P=!0;try{P=A(!0,O)}finally{P?Y():(w=!1,A=null)}}else w=!1}var Y;if(typeof g=="function")Y=function(){g(W)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,L=V.port2;V.port1.onmessage=W,Y=function(){L.postMessage(null)}}else Y=function(){S(W,0)};function T(O){A=O,w||(w=!0,Y())}function D(O,P){I=S(function(){O(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(O){O.callback=null},e.unstable_continueExecution=function(){v||f||(v=!0,T(N))},e.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<O?Math.floor(1e3/O):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(O){switch(p){case 1:case 2:case 3:var P=3;break;default:P=p}var b=p;p=P;try{return O()}finally{p=b}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(O,P){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var b=p;p=O;try{return P()}finally{p=b}},e.unstable_scheduleCallback=function(O,P,b){var B=e.unstable_now();switch(typeof b=="object"&&b!==null?(b=b.delay,b=typeof b=="number"&&0<b?B+b:B):b=B,O){case 1:var H=-1;break;case 2:H=250;break;case 5:H=1073741823;break;case 4:H=1e4;break;default:H=5e3}return H=b+H,O={id:u++,callback:P,priorityLevel:O,startTime:b,expirationTime:H,sortIndex:-1},b>B?(O.sortIndex=b,t(c,O),n(l)===null&&O===n(c)&&(x?(h(I),I=-1):x=!0,D(E,b-B))):(O.sortIndex=H,t(l,O),v||f||(v=!0,T(N))),O},e.unstable_shouldYield=$,e.unstable_wrapCallback=function(O){var P=p;return function(){var b=p;p=P;try{return O.apply(this,arguments)}finally{p=b}}}})(pf);df.exports=pf;var my=df.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gy=R,st=my;function F(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ff=new Set,wi={};function qn(e,t){Tr(e,t),Tr(e+"Capture",t)}function Tr(e,t){for(wi[e]=t,e=0;e<t.length;e++)ff.add(t[e])}var qt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),js=Object.prototype.hasOwnProperty,yy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,vu={},xu={};function by(e){return js.call(xu,e)?!0:js.call(vu,e)?!1:yy.test(e)?xu[e]=!0:(vu[e]=!0,!1)}function vy(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function xy(e,t,n,r){if(t===null||typeof t>"u"||vy(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function We(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Re[e]=new We(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Re[t]=new We(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Re[e]=new We(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Re[e]=new We(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Re[e]=new We(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Re[e]=new We(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Re[e]=new We(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Re[e]=new We(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Re[e]=new We(e,5,!1,e.toLowerCase(),null,!1,!1)});var Zl=/[\-:]([a-z])/g;function Jl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Zl,Jl);Re[t]=new We(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Zl,Jl);Re[t]=new We(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Zl,Jl);Re[t]=new We(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Re[e]=new We(e,1,!1,e.toLowerCase(),null,!1,!1)});Re.xlinkHref=new We("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Re[e]=new We(e,1,!1,e.toLowerCase(),null,!0,!0)});function ec(e,t,n,r){var i=Re.hasOwnProperty(t)?Re[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(xy(t,n,i,r)&&(n=null),r||i===null?by(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Yt=gy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,na=Symbol.for("react.element"),or=Symbol.for("react.portal"),sr=Symbol.for("react.fragment"),tc=Symbol.for("react.strict_mode"),$s=Symbol.for("react.profiler"),hf=Symbol.for("react.provider"),mf=Symbol.for("react.context"),nc=Symbol.for("react.forward_ref"),Hs=Symbol.for("react.suspense"),Ws=Symbol.for("react.suspense_list"),rc=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),gf=Symbol.for("react.offscreen"),_u=Symbol.iterator;function Gr(e){return e===null||typeof e!="object"?null:(e=_u&&e[_u]||e["@@iterator"],typeof e=="function"?e:null)}var ye=Object.assign,Qo;function ii(e){if(Qo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Qo=t&&t[1]||""}return`
`+Qo+e}var Xo=!1;function Zo(e,t){if(!e||Xo)return"";Xo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,s=a.length-1;1<=o&&0<=s&&i[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==a[s]){var l=`
`+i[o].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=o&&0<=s);break}}}finally{Xo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?ii(e):""}function _y(e){switch(e.tag){case 5:return ii(e.type);case 16:return ii("Lazy");case 13:return ii("Suspense");case 19:return ii("SuspenseList");case 0:case 2:case 15:return e=Zo(e.type,!1),e;case 11:return e=Zo(e.type.render,!1),e;case 1:return e=Zo(e.type,!0),e;default:return""}}function qs(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case sr:return"Fragment";case or:return"Portal";case $s:return"Profiler";case tc:return"StrictMode";case Hs:return"Suspense";case Ws:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case mf:return(e.displayName||"Context")+".Consumer";case hf:return(e._context.displayName||"Context")+".Provider";case nc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case rc:return t=e.displayName||null,t!==null?t:qs(e.type)||"Memo";case nn:t=e._payload,e=e._init;try{return qs(e(t))}catch{}}return null}function wy(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return qs(t);case 8:return t===tc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function En(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ey(e){var t=yf(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ra(e){e._valueTracker||(e._valueTracker=Ey(e))}function bf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=yf(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ga(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Gs(e,t){var n=t.checked;return ye({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function wu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=En(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function vf(e,t){t=t.checked,t!=null&&ec(e,"checked",t,!1)}function Ks(e,t){vf(e,t);var n=En(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Vs(e,t.type,n):t.hasOwnProperty("defaultValue")&&Vs(e,t.type,En(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Eu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Vs(e,t,n){(t!=="number"||Ga(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ai=Array.isArray;function vr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+En(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ys(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(F(91));return ye({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ku(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(F(92));if(ai(n)){if(1<n.length)throw Error(F(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:En(n)}}function xf(e,t){var n=En(t.value),r=En(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Su(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function _f(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qs(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?_f(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ia,wf=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ia=ia||document.createElement("div"),ia.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ia.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ei(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ci={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ky=["Webkit","ms","Moz","O"];Object.keys(ci).forEach(function(e){ky.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ci[t]=ci[e]})});function Ef(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ci.hasOwnProperty(e)&&ci[e]?(""+t).trim():t+"px"}function kf(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Ef(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Sy=ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xs(e,t){if(t){if(Sy[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(F(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(F(61))}if(t.style!=null&&typeof t.style!="object")throw Error(F(62))}}function Zs(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Js=null;function ic(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var el=null,xr=null,_r=null;function Nu(e){if(e=Vi(e)){if(typeof el!="function")throw Error(F(280));var t=e.stateNode;t&&(t=Ao(t),el(e.stateNode,e.type,t))}}function Sf(e){xr?_r?_r.push(e):_r=[e]:xr=e}function Nf(){if(xr){var e=xr,t=_r;if(_r=xr=null,Nu(e),t)for(e=0;e<t.length;e++)Nu(t[e])}}function Tf(e,t){return e(t)}function Of(){}var Jo=!1;function Cf(e,t,n){if(Jo)return e(t,n);Jo=!0;try{return Tf(e,t,n)}finally{Jo=!1,(xr!==null||_r!==null)&&(Of(),Nf())}}function ki(e,t){var n=e.stateNode;if(n===null)return null;var r=Ao(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(F(231,t,typeof n));return n}var tl=!1;if(qt)try{var Kr={};Object.defineProperty(Kr,"passive",{get:function(){tl=!0}}),window.addEventListener("test",Kr,Kr),window.removeEventListener("test",Kr,Kr)}catch{tl=!1}function Ny(e,t,n,r,i,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(u){this.onError(u)}}var ui=!1,Ka=null,Va=!1,nl=null,Ty={onError:function(e){ui=!0,Ka=e}};function Oy(e,t,n,r,i,a,o,s,l){ui=!1,Ka=null,Ny.apply(Ty,arguments)}function Cy(e,t,n,r,i,a,o,s,l){if(Oy.apply(this,arguments),ui){if(ui){var c=Ka;ui=!1,Ka=null}else throw Error(F(198));Va||(Va=!0,nl=c)}}function Gn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Af(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Tu(e){if(Gn(e)!==e)throw Error(F(188))}function Ay(e){var t=e.alternate;if(!t){if(t=Gn(e),t===null)throw Error(F(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return Tu(i),e;if(a===r)return Tu(i),t;a=a.sibling}throw Error(F(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,s=i.child;s;){if(s===n){o=!0,n=i,r=a;break}if(s===r){o=!0,r=i,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,r=i;break}if(s===r){o=!0,r=a,n=i;break}s=s.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?e:t}function Rf(e){return e=Ay(e),e!==null?If(e):null}function If(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=If(e);if(t!==null)return t;e=e.sibling}return null}var Mf=st.unstable_scheduleCallback,Ou=st.unstable_cancelCallback,Ry=st.unstable_shouldYield,Iy=st.unstable_requestPaint,xe=st.unstable_now,My=st.unstable_getCurrentPriorityLevel,ac=st.unstable_ImmediatePriority,Pf=st.unstable_UserBlockingPriority,Ya=st.unstable_NormalPriority,Py=st.unstable_LowPriority,Lf=st.unstable_IdlePriority,No=null,Pt=null;function Ly(e){if(Pt&&typeof Pt.onCommitFiberRoot=="function")try{Pt.onCommitFiberRoot(No,e,void 0,(e.current.flags&128)===128)}catch{}}var Et=Math.clz32?Math.clz32:By,Dy=Math.log,Fy=Math.LN2;function By(e){return e>>>=0,e===0?32:31-(Dy(e)/Fy|0)|0}var aa=64,oa=4194304;function oi(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Qa(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~i;s!==0?r=oi(s):(a&=o,a!==0&&(r=oi(a)))}else o=n&~i,o!==0?r=oi(o):a!==0&&(r=oi(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Et(t),i=1<<n,r|=e[n],t&=~i;return r}function zy(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Uy(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Et(a),s=1<<o,l=i[o];l===-1?(!(s&n)||s&r)&&(i[o]=zy(s,t)):l<=t&&(e.expiredLanes|=s),a&=~s}}function rl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Df(){var e=aa;return aa<<=1,!(aa&4194240)&&(aa=64),e}function es(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Gi(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Et(t),e[t]=n}function jy(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Et(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function oc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Et(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var oe=0;function Ff(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Bf,sc,zf,Uf,jf,il=!1,sa=[],fn=null,hn=null,mn=null,Si=new Map,Ni=new Map,an=[],$y="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cu(e,t){switch(e){case"focusin":case"focusout":fn=null;break;case"dragenter":case"dragleave":hn=null;break;case"mouseover":case"mouseout":mn=null;break;case"pointerover":case"pointerout":Si.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ni.delete(t.pointerId)}}function Vr(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Vi(t),t!==null&&sc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Hy(e,t,n,r,i){switch(t){case"focusin":return fn=Vr(fn,e,t,n,r,i),!0;case"dragenter":return hn=Vr(hn,e,t,n,r,i),!0;case"mouseover":return mn=Vr(mn,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return Si.set(a,Vr(Si.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Ni.set(a,Vr(Ni.get(a)||null,e,t,n,r,i)),!0}return!1}function $f(e){var t=Pn(e.target);if(t!==null){var n=Gn(t);if(n!==null){if(t=n.tag,t===13){if(t=Af(n),t!==null){e.blockedOn=t,jf(e.priority,function(){zf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ma(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=al(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Js=r,n.target.dispatchEvent(r),Js=null}else return t=Vi(n),t!==null&&sc(t),e.blockedOn=n,!1;t.shift()}return!0}function Au(e,t,n){Ma(e)&&n.delete(t)}function Wy(){il=!1,fn!==null&&Ma(fn)&&(fn=null),hn!==null&&Ma(hn)&&(hn=null),mn!==null&&Ma(mn)&&(mn=null),Si.forEach(Au),Ni.forEach(Au)}function Yr(e,t){e.blockedOn===t&&(e.blockedOn=null,il||(il=!0,st.unstable_scheduleCallback(st.unstable_NormalPriority,Wy)))}function Ti(e){function t(i){return Yr(i,e)}if(0<sa.length){Yr(sa[0],e);for(var n=1;n<sa.length;n++){var r=sa[n];r.blockedOn===e&&(r.blockedOn=null)}}for(fn!==null&&Yr(fn,e),hn!==null&&Yr(hn,e),mn!==null&&Yr(mn,e),Si.forEach(t),Ni.forEach(t),n=0;n<an.length;n++)r=an[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<an.length&&(n=an[0],n.blockedOn===null);)$f(n),n.blockedOn===null&&an.shift()}var wr=Yt.ReactCurrentBatchConfig,Xa=!0;function qy(e,t,n,r){var i=oe,a=wr.transition;wr.transition=null;try{oe=1,lc(e,t,n,r)}finally{oe=i,wr.transition=a}}function Gy(e,t,n,r){var i=oe,a=wr.transition;wr.transition=null;try{oe=4,lc(e,t,n,r)}finally{oe=i,wr.transition=a}}function lc(e,t,n,r){if(Xa){var i=al(e,t,n,r);if(i===null)us(e,t,r,Za,n),Cu(e,r);else if(Hy(i,e,t,n,r))r.stopPropagation();else if(Cu(e,r),t&4&&-1<$y.indexOf(e)){for(;i!==null;){var a=Vi(i);if(a!==null&&Bf(a),a=al(e,t,n,r),a===null&&us(e,t,r,Za,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else us(e,t,r,null,n)}}var Za=null;function al(e,t,n,r){if(Za=null,e=ic(r),e=Pn(e),e!==null)if(t=Gn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Af(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Za=e,null}function Hf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(My()){case ac:return 1;case Pf:return 4;case Ya:case Py:return 16;case Lf:return 536870912;default:return 16}default:return 16}}var sn=null,cc=null,Pa=null;function Wf(){if(Pa)return Pa;var e,t=cc,n=t.length,r,i="value"in sn?sn.value:sn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Pa=i.slice(e,1<r?1-r:void 0)}function La(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function la(){return!0}function Ru(){return!1}function ct(e){function t(n,r,i,a,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?la:Ru,this.isPropagationStopped=Ru,this}return ye(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=la)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=la)},persist:function(){},isPersistent:la}),t}var Dr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},uc=ct(Dr),Ki=ye({},Dr,{view:0,detail:0}),Ky=ct(Ki),ts,ns,Qr,To=ye({},Ki,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:dc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Qr&&(Qr&&e.type==="mousemove"?(ts=e.screenX-Qr.screenX,ns=e.screenY-Qr.screenY):ns=ts=0,Qr=e),ts)},movementY:function(e){return"movementY"in e?e.movementY:ns}}),Iu=ct(To),Vy=ye({},To,{dataTransfer:0}),Yy=ct(Vy),Qy=ye({},Ki,{relatedTarget:0}),rs=ct(Qy),Xy=ye({},Dr,{animationName:0,elapsedTime:0,pseudoElement:0}),Zy=ct(Xy),Jy=ye({},Dr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),eb=ct(Jy),tb=ye({},Dr,{data:0}),Mu=ct(tb),nb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ib={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ab(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ib[e])?!!t[e]:!1}function dc(){return ab}var ob=ye({},Ki,{key:function(e){if(e.key){var t=nb[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=La(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rb[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:dc,charCode:function(e){return e.type==="keypress"?La(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?La(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),sb=ct(ob),lb=ye({},To,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Pu=ct(lb),cb=ye({},Ki,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:dc}),ub=ct(cb),db=ye({},Dr,{propertyName:0,elapsedTime:0,pseudoElement:0}),pb=ct(db),fb=ye({},To,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hb=ct(fb),mb=[9,13,27,32],pc=qt&&"CompositionEvent"in window,di=null;qt&&"documentMode"in document&&(di=document.documentMode);var gb=qt&&"TextEvent"in window&&!di,qf=qt&&(!pc||di&&8<di&&11>=di),Lu=" ",Du=!1;function Gf(e,t){switch(e){case"keyup":return mb.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Kf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var lr=!1;function yb(e,t){switch(e){case"compositionend":return Kf(t);case"keypress":return t.which!==32?null:(Du=!0,Lu);case"textInput":return e=t.data,e===Lu&&Du?null:e;default:return null}}function bb(e,t){if(lr)return e==="compositionend"||!pc&&Gf(e,t)?(e=Wf(),Pa=cc=sn=null,lr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return qf&&t.locale!=="ko"?null:t.data;default:return null}}var vb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!vb[e.type]:t==="textarea"}function Vf(e,t,n,r){Sf(r),t=Ja(t,"onChange"),0<t.length&&(n=new uc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var pi=null,Oi=null;function xb(e){ah(e,0)}function Oo(e){var t=dr(e);if(bf(t))return e}function _b(e,t){if(e==="change")return t}var Yf=!1;if(qt){var is;if(qt){var as="oninput"in document;if(!as){var Bu=document.createElement("div");Bu.setAttribute("oninput","return;"),as=typeof Bu.oninput=="function"}is=as}else is=!1;Yf=is&&(!document.documentMode||9<document.documentMode)}function zu(){pi&&(pi.detachEvent("onpropertychange",Qf),Oi=pi=null)}function Qf(e){if(e.propertyName==="value"&&Oo(Oi)){var t=[];Vf(t,Oi,e,ic(e)),Cf(xb,t)}}function wb(e,t,n){e==="focusin"?(zu(),pi=t,Oi=n,pi.attachEvent("onpropertychange",Qf)):e==="focusout"&&zu()}function Eb(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Oo(Oi)}function kb(e,t){if(e==="click")return Oo(t)}function Sb(e,t){if(e==="input"||e==="change")return Oo(t)}function Nb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var St=typeof Object.is=="function"?Object.is:Nb;function Ci(e,t){if(St(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!js.call(t,i)||!St(e[i],t[i]))return!1}return!0}function Uu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ju(e,t){var n=Uu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Uu(n)}}function Xf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Xf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Zf(){for(var e=window,t=Ga();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ga(e.document)}return t}function fc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Tb(e){var t=Zf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Xf(n.ownerDocument.documentElement,n)){if(r!==null&&fc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=ju(n,a);var o=ju(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ob=qt&&"documentMode"in document&&11>=document.documentMode,cr=null,ol=null,fi=null,sl=!1;function $u(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sl||cr==null||cr!==Ga(r)||(r=cr,"selectionStart"in r&&fc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),fi&&Ci(fi,r)||(fi=r,r=Ja(ol,"onSelect"),0<r.length&&(t=new uc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=cr)))}function ca(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ur={animationend:ca("Animation","AnimationEnd"),animationiteration:ca("Animation","AnimationIteration"),animationstart:ca("Animation","AnimationStart"),transitionend:ca("Transition","TransitionEnd")},os={},Jf={};qt&&(Jf=document.createElement("div").style,"AnimationEvent"in window||(delete ur.animationend.animation,delete ur.animationiteration.animation,delete ur.animationstart.animation),"TransitionEvent"in window||delete ur.transitionend.transition);function Co(e){if(os[e])return os[e];if(!ur[e])return e;var t=ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Jf)return os[e]=t[n];return e}var eh=Co("animationend"),th=Co("animationiteration"),nh=Co("animationstart"),rh=Co("transitionend"),ih=new Map,Hu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Sn(e,t){ih.set(e,t),qn(t,[e])}for(var ss=0;ss<Hu.length;ss++){var ls=Hu[ss],Cb=ls.toLowerCase(),Ab=ls[0].toUpperCase()+ls.slice(1);Sn(Cb,"on"+Ab)}Sn(eh,"onAnimationEnd");Sn(th,"onAnimationIteration");Sn(nh,"onAnimationStart");Sn("dblclick","onDoubleClick");Sn("focusin","onFocus");Sn("focusout","onBlur");Sn(rh,"onTransitionEnd");Tr("onMouseEnter",["mouseout","mouseover"]);Tr("onMouseLeave",["mouseout","mouseover"]);Tr("onPointerEnter",["pointerout","pointerover"]);Tr("onPointerLeave",["pointerout","pointerover"]);qn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qn("onBeforeInput",["compositionend","keypress","textInput","paste"]);qn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var si="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Rb=new Set("cancel close invalid load scroll toggle".split(" ").concat(si));function Wu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Cy(r,t,void 0,e),e.currentTarget=null}function ah(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&i.isPropagationStopped())break e;Wu(i,s,c),a=l}else for(o=0;o<r.length;o++){if(s=r[o],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&i.isPropagationStopped())break e;Wu(i,s,c),a=l}}}if(Va)throw e=nl,Va=!1,nl=null,e}function pe(e,t){var n=t[pl];n===void 0&&(n=t[pl]=new Set);var r=e+"__bubble";n.has(r)||(oh(t,e,2,!1),n.add(r))}function cs(e,t,n){var r=0;t&&(r|=4),oh(n,e,r,t)}var ua="_reactListening"+Math.random().toString(36).slice(2);function Ai(e){if(!e[ua]){e[ua]=!0,ff.forEach(function(n){n!=="selectionchange"&&(Rb.has(n)||cs(n,!1,e),cs(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ua]||(t[ua]=!0,cs("selectionchange",!1,t))}}function oh(e,t,n,r){switch(Hf(t)){case 1:var i=qy;break;case 4:i=Gy;break;default:i=lc}n=i.bind(null,t,n,e),i=void 0,!tl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function us(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;s!==null;){if(o=Pn(s),o===null)return;if(l=o.tag,l===5||l===6){r=a=o;continue e}s=s.parentNode}}r=r.return}Cf(function(){var c=a,u=ic(n),d=[];e:{var p=ih.get(e);if(p!==void 0){var f=uc,v=e;switch(e){case"keypress":if(La(n)===0)break e;case"keydown":case"keyup":f=sb;break;case"focusin":v="focus",f=rs;break;case"focusout":v="blur",f=rs;break;case"beforeblur":case"afterblur":f=rs;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=Iu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=Yy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=ub;break;case eh:case th:case nh:f=Zy;break;case rh:f=pb;break;case"scroll":f=Ky;break;case"wheel":f=hb;break;case"copy":case"cut":case"paste":f=eb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=Pu}var x=(t&4)!==0,S=!x&&e==="scroll",h=x?p!==null?p+"Capture":null:p;x=[];for(var g=c,y;g!==null;){y=g;var E=y.stateNode;if(y.tag===5&&E!==null&&(y=E,h!==null&&(E=ki(g,h),E!=null&&x.push(Ri(g,E,y)))),S)break;g=g.return}0<x.length&&(p=new f(p,v,null,n,u),d.push({event:p,listeners:x}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",p&&n!==Js&&(v=n.relatedTarget||n.fromElement)&&(Pn(v)||v[Gt]))break e;if((f||p)&&(p=u.window===u?u:(p=u.ownerDocument)?p.defaultView||p.parentWindow:window,f?(v=n.relatedTarget||n.toElement,f=c,v=v?Pn(v):null,v!==null&&(S=Gn(v),v!==S||v.tag!==5&&v.tag!==6)&&(v=null)):(f=null,v=c),f!==v)){if(x=Iu,E="onMouseLeave",h="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(x=Pu,E="onPointerLeave",h="onPointerEnter",g="pointer"),S=f==null?p:dr(f),y=v==null?p:dr(v),p=new x(E,g+"leave",f,n,u),p.target=S,p.relatedTarget=y,E=null,Pn(u)===c&&(x=new x(h,g+"enter",v,n,u),x.target=y,x.relatedTarget=S,E=x),S=E,f&&v)t:{for(x=f,h=v,g=0,y=x;y;y=er(y))g++;for(y=0,E=h;E;E=er(E))y++;for(;0<g-y;)x=er(x),g--;for(;0<y-g;)h=er(h),y--;for(;g--;){if(x===h||h!==null&&x===h.alternate)break t;x=er(x),h=er(h)}x=null}else x=null;f!==null&&qu(d,p,f,x,!1),v!==null&&S!==null&&qu(d,S,v,x,!0)}}e:{if(p=c?dr(c):window,f=p.nodeName&&p.nodeName.toLowerCase(),f==="select"||f==="input"&&p.type==="file")var N=_b;else if(Fu(p))if(Yf)N=Sb;else{N=Eb;var w=wb}else(f=p.nodeName)&&f.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(N=kb);if(N&&(N=N(e,c))){Vf(d,N,n,u);break e}w&&w(e,p,c),e==="focusout"&&(w=p._wrapperState)&&w.controlled&&p.type==="number"&&Vs(p,"number",p.value)}switch(w=c?dr(c):window,e){case"focusin":(Fu(w)||w.contentEditable==="true")&&(cr=w,ol=c,fi=null);break;case"focusout":fi=ol=cr=null;break;case"mousedown":sl=!0;break;case"contextmenu":case"mouseup":case"dragend":sl=!1,$u(d,n,u);break;case"selectionchange":if(Ob)break;case"keydown":case"keyup":$u(d,n,u)}var A;if(pc)e:{switch(e){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else lr?Gf(e,n)&&(I="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(I="onCompositionStart");I&&(qf&&n.locale!=="ko"&&(lr||I!=="onCompositionStart"?I==="onCompositionEnd"&&lr&&(A=Wf()):(sn=u,cc="value"in sn?sn.value:sn.textContent,lr=!0)),w=Ja(c,I),0<w.length&&(I=new Mu(I,e,null,n,u),d.push({event:I,listeners:w}),A?I.data=A:(A=Kf(n),A!==null&&(I.data=A)))),(A=gb?yb(e,n):bb(e,n))&&(c=Ja(c,"onBeforeInput"),0<c.length&&(u=new Mu("onBeforeInput","beforeinput",null,n,u),d.push({event:u,listeners:c}),u.data=A))}ah(d,t)})}function Ri(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ja(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=ki(e,n),a!=null&&r.unshift(Ri(e,a,i)),a=ki(e,t),a!=null&&r.push(Ri(e,a,i))),e=e.return}return r}function er(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function qu(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&c!==null&&(s=c,i?(l=ki(n,a),l!=null&&o.unshift(Ri(n,l,s))):i||(l=ki(n,a),l!=null&&o.push(Ri(n,l,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ib=/\r\n?/g,Mb=/\u0000|\uFFFD/g;function Gu(e){return(typeof e=="string"?e:""+e).replace(Ib,`
`).replace(Mb,"")}function da(e,t,n){if(t=Gu(t),Gu(e)!==t&&n)throw Error(F(425))}function eo(){}var ll=null,cl=null;function ul(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var dl=typeof setTimeout=="function"?setTimeout:void 0,Pb=typeof clearTimeout=="function"?clearTimeout:void 0,Ku=typeof Promise=="function"?Promise:void 0,Lb=typeof queueMicrotask=="function"?queueMicrotask:typeof Ku<"u"?function(e){return Ku.resolve(null).then(e).catch(Db)}:dl;function Db(e){setTimeout(function(){throw e})}function ds(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Ti(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Ti(t)}function gn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Vu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Fr=Math.random().toString(36).slice(2),It="__reactFiber$"+Fr,Ii="__reactProps$"+Fr,Gt="__reactContainer$"+Fr,pl="__reactEvents$"+Fr,Fb="__reactListeners$"+Fr,Bb="__reactHandles$"+Fr;function Pn(e){var t=e[It];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Gt]||n[It]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Vu(e);e!==null;){if(n=e[It])return n;e=Vu(e)}return t}e=n,n=e.parentNode}return null}function Vi(e){return e=e[It]||e[Gt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function dr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function Ao(e){return e[Ii]||null}var fl=[],pr=-1;function Nn(e){return{current:e}}function fe(e){0>pr||(e.current=fl[pr],fl[pr]=null,pr--)}function ue(e,t){pr++,fl[pr]=e.current,e.current=t}var kn={},De=Nn(kn),Ye=Nn(!1),Un=kn;function Or(e,t){var n=e.type.contextTypes;if(!n)return kn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Qe(e){return e=e.childContextTypes,e!=null}function to(){fe(Ye),fe(De)}function Yu(e,t,n){if(De.current!==kn)throw Error(F(168));ue(De,t),ue(Ye,n)}function sh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(F(108,wy(e)||"Unknown",i));return ye({},n,r)}function no(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||kn,Un=De.current,ue(De,e),ue(Ye,Ye.current),!0}function Qu(e,t,n){var r=e.stateNode;if(!r)throw Error(F(169));n?(e=sh(e,t,Un),r.__reactInternalMemoizedMergedChildContext=e,fe(Ye),fe(De),ue(De,e)):fe(Ye),ue(Ye,n)}var jt=null,Ro=!1,ps=!1;function lh(e){jt===null?jt=[e]:jt.push(e)}function zb(e){Ro=!0,lh(e)}function Tn(){if(!ps&&jt!==null){ps=!0;var e=0,t=oe;try{var n=jt;for(oe=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}jt=null,Ro=!1}catch(i){throw jt!==null&&(jt=jt.slice(e+1)),Mf(ac,Tn),i}finally{oe=t,ps=!1}}return null}var fr=[],hr=0,ro=null,io=0,ut=[],dt=0,jn=null,$t=1,Ht="";function Rn(e,t){fr[hr++]=io,fr[hr++]=ro,ro=e,io=t}function ch(e,t,n){ut[dt++]=$t,ut[dt++]=Ht,ut[dt++]=jn,jn=e;var r=$t;e=Ht;var i=32-Et(r)-1;r&=~(1<<i),n+=1;var a=32-Et(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,$t=1<<32-Et(t)+i|n<<i|r,Ht=a+e}else $t=1<<a|n<<i|r,Ht=e}function hc(e){e.return!==null&&(Rn(e,1),ch(e,1,0))}function mc(e){for(;e===ro;)ro=fr[--hr],fr[hr]=null,io=fr[--hr],fr[hr]=null;for(;e===jn;)jn=ut[--dt],ut[dt]=null,Ht=ut[--dt],ut[dt]=null,$t=ut[--dt],ut[dt]=null}var ot=null,it=null,he=!1,wt=null;function uh(e,t){var n=ft(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Xu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ot=e,it=gn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ot=e,it=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=jn!==null?{id:$t,overflow:Ht}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ft(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ot=e,it=null,!0):!1;default:return!1}}function hl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ml(e){if(he){var t=it;if(t){var n=t;if(!Xu(e,t)){if(hl(e))throw Error(F(418));t=gn(n.nextSibling);var r=ot;t&&Xu(e,t)?uh(r,n):(e.flags=e.flags&-4097|2,he=!1,ot=e)}}else{if(hl(e))throw Error(F(418));e.flags=e.flags&-4097|2,he=!1,ot=e}}}function Zu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ot=e}function pa(e){if(e!==ot)return!1;if(!he)return Zu(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ul(e.type,e.memoizedProps)),t&&(t=it)){if(hl(e))throw dh(),Error(F(418));for(;t;)uh(e,t),t=gn(t.nextSibling)}if(Zu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){it=gn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}it=null}}else it=ot?gn(e.stateNode.nextSibling):null;return!0}function dh(){for(var e=it;e;)e=gn(e.nextSibling)}function Cr(){it=ot=null,he=!1}function gc(e){wt===null?wt=[e]:wt.push(e)}var Ub=Yt.ReactCurrentBatchConfig;function Xr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,e));var i=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var s=i.refs;o===null?delete s[a]:s[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,e))}return e}function fa(e,t){throw e=Object.prototype.toString.call(t),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ju(e){var t=e._init;return t(e._payload)}function ph(e){function t(h,g){if(e){var y=h.deletions;y===null?(h.deletions=[g],h.flags|=16):y.push(g)}}function n(h,g){if(!e)return null;for(;g!==null;)t(h,g),g=g.sibling;return null}function r(h,g){for(h=new Map;g!==null;)g.key!==null?h.set(g.key,g):h.set(g.index,g),g=g.sibling;return h}function i(h,g){return h=xn(h,g),h.index=0,h.sibling=null,h}function a(h,g,y){return h.index=y,e?(y=h.alternate,y!==null?(y=y.index,y<g?(h.flags|=2,g):y):(h.flags|=2,g)):(h.flags|=1048576,g)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function s(h,g,y,E){return g===null||g.tag!==6?(g=vs(y,h.mode,E),g.return=h,g):(g=i(g,y),g.return=h,g)}function l(h,g,y,E){var N=y.type;return N===sr?u(h,g,y.props.children,E,y.key):g!==null&&(g.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===nn&&Ju(N)===g.type)?(E=i(g,y.props),E.ref=Xr(h,g,y),E.return=h,E):(E=$a(y.type,y.key,y.props,null,h.mode,E),E.ref=Xr(h,g,y),E.return=h,E)}function c(h,g,y,E){return g===null||g.tag!==4||g.stateNode.containerInfo!==y.containerInfo||g.stateNode.implementation!==y.implementation?(g=xs(y,h.mode,E),g.return=h,g):(g=i(g,y.children||[]),g.return=h,g)}function u(h,g,y,E,N){return g===null||g.tag!==7?(g=Bn(y,h.mode,E,N),g.return=h,g):(g=i(g,y),g.return=h,g)}function d(h,g,y){if(typeof g=="string"&&g!==""||typeof g=="number")return g=vs(""+g,h.mode,y),g.return=h,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case na:return y=$a(g.type,g.key,g.props,null,h.mode,y),y.ref=Xr(h,null,g),y.return=h,y;case or:return g=xs(g,h.mode,y),g.return=h,g;case nn:var E=g._init;return d(h,E(g._payload),y)}if(ai(g)||Gr(g))return g=Bn(g,h.mode,y,null),g.return=h,g;fa(h,g)}return null}function p(h,g,y,E){var N=g!==null?g.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return N!==null?null:s(h,g,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case na:return y.key===N?l(h,g,y,E):null;case or:return y.key===N?c(h,g,y,E):null;case nn:return N=y._init,p(h,g,N(y._payload),E)}if(ai(y)||Gr(y))return N!==null?null:u(h,g,y,E,null);fa(h,y)}return null}function f(h,g,y,E,N){if(typeof E=="string"&&E!==""||typeof E=="number")return h=h.get(y)||null,s(g,h,""+E,N);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case na:return h=h.get(E.key===null?y:E.key)||null,l(g,h,E,N);case or:return h=h.get(E.key===null?y:E.key)||null,c(g,h,E,N);case nn:var w=E._init;return f(h,g,y,w(E._payload),N)}if(ai(E)||Gr(E))return h=h.get(y)||null,u(g,h,E,N,null);fa(g,E)}return null}function v(h,g,y,E){for(var N=null,w=null,A=g,I=g=0,U=null;A!==null&&I<y.length;I++){A.index>I?(U=A,A=null):U=A.sibling;var M=p(h,A,y[I],E);if(M===null){A===null&&(A=U);break}e&&A&&M.alternate===null&&t(h,A),g=a(M,g,I),w===null?N=M:w.sibling=M,w=M,A=U}if(I===y.length)return n(h,A),he&&Rn(h,I),N;if(A===null){for(;I<y.length;I++)A=d(h,y[I],E),A!==null&&(g=a(A,g,I),w===null?N=A:w.sibling=A,w=A);return he&&Rn(h,I),N}for(A=r(h,A);I<y.length;I++)U=f(A,h,I,y[I],E),U!==null&&(e&&U.alternate!==null&&A.delete(U.key===null?I:U.key),g=a(U,g,I),w===null?N=U:w.sibling=U,w=U);return e&&A.forEach(function($){return t(h,$)}),he&&Rn(h,I),N}function x(h,g,y,E){var N=Gr(y);if(typeof N!="function")throw Error(F(150));if(y=N.call(y),y==null)throw Error(F(151));for(var w=N=null,A=g,I=g=0,U=null,M=y.next();A!==null&&!M.done;I++,M=y.next()){A.index>I?(U=A,A=null):U=A.sibling;var $=p(h,A,M.value,E);if($===null){A===null&&(A=U);break}e&&A&&$.alternate===null&&t(h,A),g=a($,g,I),w===null?N=$:w.sibling=$,w=$,A=U}if(M.done)return n(h,A),he&&Rn(h,I),N;if(A===null){for(;!M.done;I++,M=y.next())M=d(h,M.value,E),M!==null&&(g=a(M,g,I),w===null?N=M:w.sibling=M,w=M);return he&&Rn(h,I),N}for(A=r(h,A);!M.done;I++,M=y.next())M=f(A,h,I,M.value,E),M!==null&&(e&&M.alternate!==null&&A.delete(M.key===null?I:M.key),g=a(M,g,I),w===null?N=M:w.sibling=M,w=M);return e&&A.forEach(function(W){return t(h,W)}),he&&Rn(h,I),N}function S(h,g,y,E){if(typeof y=="object"&&y!==null&&y.type===sr&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case na:e:{for(var N=y.key,w=g;w!==null;){if(w.key===N){if(N=y.type,N===sr){if(w.tag===7){n(h,w.sibling),g=i(w,y.props.children),g.return=h,h=g;break e}}else if(w.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===nn&&Ju(N)===w.type){n(h,w.sibling),g=i(w,y.props),g.ref=Xr(h,w,y),g.return=h,h=g;break e}n(h,w);break}else t(h,w);w=w.sibling}y.type===sr?(g=Bn(y.props.children,h.mode,E,y.key),g.return=h,h=g):(E=$a(y.type,y.key,y.props,null,h.mode,E),E.ref=Xr(h,g,y),E.return=h,h=E)}return o(h);case or:e:{for(w=y.key;g!==null;){if(g.key===w)if(g.tag===4&&g.stateNode.containerInfo===y.containerInfo&&g.stateNode.implementation===y.implementation){n(h,g.sibling),g=i(g,y.children||[]),g.return=h,h=g;break e}else{n(h,g);break}else t(h,g);g=g.sibling}g=xs(y,h.mode,E),g.return=h,h=g}return o(h);case nn:return w=y._init,S(h,g,w(y._payload),E)}if(ai(y))return v(h,g,y,E);if(Gr(y))return x(h,g,y,E);fa(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,g!==null&&g.tag===6?(n(h,g.sibling),g=i(g,y),g.return=h,h=g):(n(h,g),g=vs(y,h.mode,E),g.return=h,h=g),o(h)):n(h,g)}return S}var Ar=ph(!0),fh=ph(!1),ao=Nn(null),oo=null,mr=null,yc=null;function bc(){yc=mr=oo=null}function vc(e){var t=ao.current;fe(ao),e._currentValue=t}function gl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Er(e,t){oo=e,yc=mr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ve=!0),e.firstContext=null)}function mt(e){var t=e._currentValue;if(yc!==e)if(e={context:e,memoizedValue:t,next:null},mr===null){if(oo===null)throw Error(F(308));mr=e,oo.dependencies={lanes:0,firstContext:e}}else mr=mr.next=e;return t}var Ln=null;function xc(e){Ln===null?Ln=[e]:Ln.push(e)}function hh(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,xc(t)):(n.next=i.next,i.next=n),t.interleaved=n,Kt(e,r)}function Kt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var rn=!1;function _c(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function mh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Wt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Kt(e,n)}return i=r.interleaved,i===null?(t.next=t,xc(r)):(t.next=i.next,i.next=t),r.interleaved=t,Kt(e,n)}function Da(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,oc(e,n)}}function ed(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function so(e,t,n,r){var i=e.updateQueue;rn=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var l=s,c=l.next;l.next=null,o===null?a=c:o.next=c,o=l;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=c:s.next=c,u.lastBaseUpdate=l))}if(a!==null){var d=i.baseState;o=0,u=c=l=null,s=a;do{var p=s.lane,f=s.eventTime;if((r&p)===p){u!==null&&(u=u.next={eventTime:f,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var v=e,x=s;switch(p=t,f=n,x.tag){case 1:if(v=x.payload,typeof v=="function"){d=v.call(f,d,p);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,p=typeof v=="function"?v.call(f,d,p):v,p==null)break e;d=ye({},d,p);break e;case 2:rn=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[s]:p.push(s))}else f={eventTime:f,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(c=u=f,l=d):u=u.next=f,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(u===null&&(l=d),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=u,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Hn|=o,e.lanes=o,e.memoizedState=d}}function td(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(F(191,i));i.call(r)}}}var Yi={},Lt=Nn(Yi),Mi=Nn(Yi),Pi=Nn(Yi);function Dn(e){if(e===Yi)throw Error(F(174));return e}function wc(e,t){switch(ue(Pi,t),ue(Mi,e),ue(Lt,Yi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Qs(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Qs(t,e)}fe(Lt),ue(Lt,t)}function Rr(){fe(Lt),fe(Mi),fe(Pi)}function gh(e){Dn(Pi.current);var t=Dn(Lt.current),n=Qs(t,e.type);t!==n&&(ue(Mi,e),ue(Lt,n))}function Ec(e){Mi.current===e&&(fe(Lt),fe(Mi))}var me=Nn(0);function lo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var fs=[];function kc(){for(var e=0;e<fs.length;e++)fs[e]._workInProgressVersionPrimary=null;fs.length=0}var Fa=Yt.ReactCurrentDispatcher,hs=Yt.ReactCurrentBatchConfig,$n=0,ge=null,Se=null,Te=null,co=!1,hi=!1,Li=0,jb=0;function Ie(){throw Error(F(321))}function Sc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!St(e[n],t[n]))return!1;return!0}function Nc(e,t,n,r,i,a){if($n=a,ge=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Fa.current=e===null||e.memoizedState===null?qb:Gb,e=n(r,i),hi){a=0;do{if(hi=!1,Li=0,25<=a)throw Error(F(301));a+=1,Te=Se=null,t.updateQueue=null,Fa.current=Kb,e=n(r,i)}while(hi)}if(Fa.current=uo,t=Se!==null&&Se.next!==null,$n=0,Te=Se=ge=null,co=!1,t)throw Error(F(300));return e}function Tc(){var e=Li!==0;return Li=0,e}function At(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Te===null?ge.memoizedState=Te=e:Te=Te.next=e,Te}function gt(){if(Se===null){var e=ge.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Te===null?ge.memoizedState:Te.next;if(t!==null)Te=t,Se=e;else{if(e===null)throw Error(F(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Te===null?ge.memoizedState=Te=e:Te=Te.next=e}return Te}function Di(e,t){return typeof t=="function"?t(e):t}function ms(e){var t=gt(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=Se,i=r.baseQueue,a=n.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}r.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,r=r.baseState;var s=o=null,l=null,c=a;do{var u=c.lane;if(($n&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=d,o=r):l=l.next=d,ge.lanes|=u,Hn|=u}c=c.next}while(c!==null&&c!==a);l===null?o=r:l.next=s,St(r,t.memoizedState)||(Ve=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do a=i.lane,ge.lanes|=a,Hn|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function gs(e){var t=gt(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);St(a,t.memoizedState)||(Ve=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function yh(){}function bh(e,t){var n=ge,r=gt(),i=t(),a=!St(r.memoizedState,i);if(a&&(r.memoizedState=i,Ve=!0),r=r.queue,Oc(_h.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||Te!==null&&Te.memoizedState.tag&1){if(n.flags|=2048,Fi(9,xh.bind(null,n,r,i,t),void 0,null),Oe===null)throw Error(F(349));$n&30||vh(n,t,i)}return i}function vh(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ge.updateQueue,t===null?(t={lastEffect:null,stores:null},ge.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function xh(e,t,n,r){t.value=n,t.getSnapshot=r,wh(t)&&Eh(e)}function _h(e,t,n){return n(function(){wh(t)&&Eh(e)})}function wh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!St(e,n)}catch{return!0}}function Eh(e){var t=Kt(e,1);t!==null&&kt(t,e,1,-1)}function nd(e){var t=At();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Di,lastRenderedState:e},t.queue=e,e=e.dispatch=Wb.bind(null,ge,e),[t.memoizedState,e]}function Fi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ge.updateQueue,t===null?(t={lastEffect:null,stores:null},ge.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function kh(){return gt().memoizedState}function Ba(e,t,n,r){var i=At();ge.flags|=e,i.memoizedState=Fi(1|t,n,void 0,r===void 0?null:r)}function Io(e,t,n,r){var i=gt();r=r===void 0?null:r;var a=void 0;if(Se!==null){var o=Se.memoizedState;if(a=o.destroy,r!==null&&Sc(r,o.deps)){i.memoizedState=Fi(t,n,a,r);return}}ge.flags|=e,i.memoizedState=Fi(1|t,n,a,r)}function rd(e,t){return Ba(8390656,8,e,t)}function Oc(e,t){return Io(2048,8,e,t)}function Sh(e,t){return Io(4,2,e,t)}function Nh(e,t){return Io(4,4,e,t)}function Th(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Oh(e,t,n){return n=n!=null?n.concat([e]):null,Io(4,4,Th.bind(null,t,e),n)}function Cc(){}function Ch(e,t){var n=gt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Sc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ah(e,t){var n=gt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Sc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Rh(e,t,n){return $n&21?(St(n,t)||(n=Df(),ge.lanes|=n,Hn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ve=!0),e.memoizedState=n)}function $b(e,t){var n=oe;oe=n!==0&&4>n?n:4,e(!0);var r=hs.transition;hs.transition={};try{e(!1),t()}finally{oe=n,hs.transition=r}}function Ih(){return gt().memoizedState}function Hb(e,t,n){var r=vn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Mh(e))Ph(t,n);else if(n=hh(e,t,n,r),n!==null){var i=$e();kt(n,e,r,i),Lh(n,t,r)}}function Wb(e,t,n){var r=vn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Mh(e))Ph(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,St(s,o)){var l=t.interleaved;l===null?(i.next=i,xc(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=hh(e,t,i,r),n!==null&&(i=$e(),kt(n,e,r,i),Lh(n,t,r))}}function Mh(e){var t=e.alternate;return e===ge||t!==null&&t===ge}function Ph(e,t){hi=co=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Lh(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,oc(e,n)}}var uo={readContext:mt,useCallback:Ie,useContext:Ie,useEffect:Ie,useImperativeHandle:Ie,useInsertionEffect:Ie,useLayoutEffect:Ie,useMemo:Ie,useReducer:Ie,useRef:Ie,useState:Ie,useDebugValue:Ie,useDeferredValue:Ie,useTransition:Ie,useMutableSource:Ie,useSyncExternalStore:Ie,useId:Ie,unstable_isNewReconciler:!1},qb={readContext:mt,useCallback:function(e,t){return At().memoizedState=[e,t===void 0?null:t],e},useContext:mt,useEffect:rd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ba(4194308,4,Th.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ba(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ba(4,2,e,t)},useMemo:function(e,t){var n=At();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=At();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Hb.bind(null,ge,e),[r.memoizedState,e]},useRef:function(e){var t=At();return e={current:e},t.memoizedState=e},useState:nd,useDebugValue:Cc,useDeferredValue:function(e){return At().memoizedState=e},useTransition:function(){var e=nd(!1),t=e[0];return e=$b.bind(null,e[1]),At().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ge,i=At();if(he){if(n===void 0)throw Error(F(407));n=n()}else{if(n=t(),Oe===null)throw Error(F(349));$n&30||vh(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,rd(_h.bind(null,r,a,e),[e]),r.flags|=2048,Fi(9,xh.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=At(),t=Oe.identifierPrefix;if(he){var n=Ht,r=$t;n=(r&~(1<<32-Et(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Li++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=jb++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Gb={readContext:mt,useCallback:Ch,useContext:mt,useEffect:Oc,useImperativeHandle:Oh,useInsertionEffect:Sh,useLayoutEffect:Nh,useMemo:Ah,useReducer:ms,useRef:kh,useState:function(){return ms(Di)},useDebugValue:Cc,useDeferredValue:function(e){var t=gt();return Rh(t,Se.memoizedState,e)},useTransition:function(){var e=ms(Di)[0],t=gt().memoizedState;return[e,t]},useMutableSource:yh,useSyncExternalStore:bh,useId:Ih,unstable_isNewReconciler:!1},Kb={readContext:mt,useCallback:Ch,useContext:mt,useEffect:Oc,useImperativeHandle:Oh,useInsertionEffect:Sh,useLayoutEffect:Nh,useMemo:Ah,useReducer:gs,useRef:kh,useState:function(){return gs(Di)},useDebugValue:Cc,useDeferredValue:function(e){var t=gt();return Se===null?t.memoizedState=e:Rh(t,Se.memoizedState,e)},useTransition:function(){var e=gs(Di)[0],t=gt().memoizedState;return[e,t]},useMutableSource:yh,useSyncExternalStore:bh,useId:Ih,unstable_isNewReconciler:!1};function xt(e,t){if(e&&e.defaultProps){t=ye({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function yl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ye({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Mo={isMounted:function(e){return(e=e._reactInternals)?Gn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=$e(),i=vn(e),a=Wt(r,i);a.payload=t,n!=null&&(a.callback=n),t=yn(e,a,i),t!==null&&(kt(t,e,i,r),Da(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=$e(),i=vn(e),a=Wt(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=yn(e,a,i),t!==null&&(kt(t,e,i,r),Da(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=$e(),r=vn(e),i=Wt(n,r);i.tag=2,t!=null&&(i.callback=t),t=yn(e,i,r),t!==null&&(kt(t,e,r,n),Da(t,e,r))}};function id(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ci(n,r)||!Ci(i,a):!0}function Dh(e,t,n){var r=!1,i=kn,a=t.contextType;return typeof a=="object"&&a!==null?a=mt(a):(i=Qe(t)?Un:De.current,r=t.contextTypes,a=(r=r!=null)?Or(e,i):kn),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Mo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function ad(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Mo.enqueueReplaceState(t,t.state,null)}function bl(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},_c(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=mt(a):(a=Qe(t)?Un:De.current,i.context=Or(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(yl(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Mo.enqueueReplaceState(i,i.state,null),so(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Ir(e,t){try{var n="",r=t;do n+=_y(r),r=r.return;while(r);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function ys(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function vl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Vb=typeof WeakMap=="function"?WeakMap:Map;function Fh(e,t,n){n=Wt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){fo||(fo=!0,Cl=r),vl(e,t)},n}function Bh(e,t,n){n=Wt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){vl(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){vl(e,t),typeof r!="function"&&(bn===null?bn=new Set([this]):bn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function od(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Vb;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=lv.bind(null,e,t,n),t.then(e,e))}function sd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ld(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Wt(-1,1),t.tag=2,yn(n,t,1))),n.lanes|=1),e)}var Yb=Yt.ReactCurrentOwner,Ve=!1;function je(e,t,n,r){t.child=e===null?fh(t,null,n,r):Ar(t,e.child,n,r)}function cd(e,t,n,r,i){n=n.render;var a=t.ref;return Er(t,i),r=Nc(e,t,n,r,a,i),n=Tc(),e!==null&&!Ve?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Vt(e,t,i)):(he&&n&&hc(t),t.flags|=1,je(e,t,r,i),t.child)}function ud(e,t,n,r,i){if(e===null){var a=n.type;return typeof a=="function"&&!Fc(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,zh(e,t,a,r,i)):(e=$a(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&i)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Ci,n(o,r)&&e.ref===t.ref)return Vt(e,t,i)}return t.flags|=1,e=xn(a,r),e.ref=t.ref,e.return=t,t.child=e}function zh(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ci(a,r)&&e.ref===t.ref)if(Ve=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(Ve=!0);else return t.lanes=e.lanes,Vt(e,t,i)}return xl(e,t,n,r,i)}function Uh(e,t,n){var r=t.pendingProps,i=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ue(yr,nt),nt|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ue(yr,nt),nt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,ue(yr,nt),nt|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,ue(yr,nt),nt|=r;return je(e,t,i,n),t.child}function jh(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function xl(e,t,n,r,i){var a=Qe(n)?Un:De.current;return a=Or(t,a),Er(t,i),n=Nc(e,t,n,r,a,i),r=Tc(),e!==null&&!Ve?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Vt(e,t,i)):(he&&r&&hc(t),t.flags|=1,je(e,t,n,i),t.child)}function dd(e,t,n,r,i){if(Qe(n)){var a=!0;no(t)}else a=!1;if(Er(t,i),t.stateNode===null)za(e,t),Dh(t,n,r),bl(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=mt(c):(c=Qe(n)?Un:De.current,c=Or(t,c));var u=n.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||l!==c)&&ad(t,o,r,c),rn=!1;var p=t.memoizedState;o.state=p,so(t,r,o,i),l=t.memoizedState,s!==r||p!==l||Ye.current||rn?(typeof u=="function"&&(yl(t,n,u,r),l=t.memoizedState),(s=rn||id(t,n,s,r,p,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),o.props=r,o.state=l,o.context=c,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,mh(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:xt(t.type,s),o.props=c,d=t.pendingProps,p=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=mt(l):(l=Qe(n)?Un:De.current,l=Or(t,l));var f=n.getDerivedStateFromProps;(u=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==d||p!==l)&&ad(t,o,r,l),rn=!1,p=t.memoizedState,o.state=p,so(t,r,o,i);var v=t.memoizedState;s!==d||p!==v||Ye.current||rn?(typeof f=="function"&&(yl(t,n,f,r),v=t.memoizedState),(c=rn||id(t,n,c,r,p,v,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,v,l)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),o.props=r,o.state=v,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return _l(e,t,n,r,a,i)}function _l(e,t,n,r,i,a){jh(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&Qu(t,n,!1),Vt(e,t,a);r=t.stateNode,Yb.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Ar(t,e.child,null,a),t.child=Ar(t,null,s,a)):je(e,t,s,a),t.memoizedState=r.state,i&&Qu(t,n,!0),t.child}function $h(e){var t=e.stateNode;t.pendingContext?Yu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Yu(e,t.context,!1),wc(e,t.containerInfo)}function pd(e,t,n,r,i){return Cr(),gc(i),t.flags|=256,je(e,t,n,r),t.child}var wl={dehydrated:null,treeContext:null,retryLane:0};function El(e){return{baseLanes:e,cachePool:null,transitions:null}}function Hh(e,t,n){var r=t.pendingProps,i=me.current,a=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ue(me,i&1),e===null)return ml(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Do(o,r,0,null),e=Bn(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=El(n),t.memoizedState=wl,e):Ac(t,o));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return Qb(e,t,o,r,s,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,s=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=xn(i,l),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?a=xn(s,a):(a=Bn(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?El(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=wl,r}return a=e.child,e=a.sibling,r=xn(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ac(e,t){return t=Do({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ha(e,t,n,r){return r!==null&&gc(r),Ar(t,e.child,null,n),e=Ac(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qb(e,t,n,r,i,a,o){if(n)return t.flags&256?(t.flags&=-257,r=ys(Error(F(422))),ha(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=Do({mode:"visible",children:r.children},i,0,null),a=Bn(a,i,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&Ar(t,e.child,null,o),t.child.memoizedState=El(o),t.memoizedState=wl,a);if(!(t.mode&1))return ha(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(F(419)),r=ys(a,r,void 0),ha(e,t,o,r)}if(s=(o&e.childLanes)!==0,Ve||s){if(r=Oe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,Kt(e,i),kt(r,e,i,-1))}return Dc(),r=ys(Error(F(421))),ha(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=cv.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,it=gn(i.nextSibling),ot=t,he=!0,wt=null,e!==null&&(ut[dt++]=$t,ut[dt++]=Ht,ut[dt++]=jn,$t=e.id,Ht=e.overflow,jn=t),t=Ac(t,r.children),t.flags|=4096,t)}function fd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),gl(e.return,t,n)}function bs(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function Wh(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(je(e,t,r.children,n),r=me.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&fd(e,n,t);else if(e.tag===19)fd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ue(me,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&lo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),bs(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&lo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}bs(t,!0,n,null,a);break;case"together":bs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function za(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Vt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Hn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(F(153));if(t.child!==null){for(e=t.child,n=xn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=xn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Xb(e,t,n){switch(t.tag){case 3:$h(t),Cr();break;case 5:gh(t);break;case 1:Qe(t.type)&&no(t);break;case 4:wc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;ue(ao,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ue(me,me.current&1),t.flags|=128,null):n&t.child.childLanes?Hh(e,t,n):(ue(me,me.current&1),e=Vt(e,t,n),e!==null?e.sibling:null);ue(me,me.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Wh(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ue(me,me.current),r)break;return null;case 22:case 23:return t.lanes=0,Uh(e,t,n)}return Vt(e,t,n)}var qh,kl,Gh,Kh;qh=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};kl=function(){};Gh=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Dn(Lt.current);var a=null;switch(n){case"input":i=Gs(e,i),r=Gs(e,r),a=[];break;case"select":i=ye({},i,{value:void 0}),r=ye({},r,{value:void 0}),a=[];break;case"textarea":i=Ys(e,i),r=Ys(e,r),a=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=eo)}Xs(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var s=i[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(wi.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var l=r[c];if(s=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&s[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(a||(a=[]),a.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(wi.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&pe("scroll",e),a||s===l||(a=[])):(a=a||[]).push(c,l))}n&&(a=a||[]).push("style",n);var c=a;(t.updateQueue=c)&&(t.flags|=4)}};Kh=function(e,t,n,r){n!==r&&(t.flags|=4)};function Zr(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Me(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Zb(e,t,n){var r=t.pendingProps;switch(mc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Me(t),null;case 1:return Qe(t.type)&&to(),Me(t),null;case 3:return r=t.stateNode,Rr(),fe(Ye),fe(De),kc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(pa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,wt!==null&&(Il(wt),wt=null))),kl(e,t),Me(t),null;case 5:Ec(t);var i=Dn(Pi.current);if(n=t.type,e!==null&&t.stateNode!=null)Gh(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(F(166));return Me(t),null}if(e=Dn(Lt.current),pa(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[It]=t,r[Ii]=a,e=(t.mode&1)!==0,n){case"dialog":pe("cancel",r),pe("close",r);break;case"iframe":case"object":case"embed":pe("load",r);break;case"video":case"audio":for(i=0;i<si.length;i++)pe(si[i],r);break;case"source":pe("error",r);break;case"img":case"image":case"link":pe("error",r),pe("load",r);break;case"details":pe("toggle",r);break;case"input":wu(r,a),pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},pe("invalid",r);break;case"textarea":ku(r,a),pe("invalid",r)}Xs(n,a),i=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&da(r.textContent,s,e),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&da(r.textContent,s,e),i=["children",""+s]):wi.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&pe("scroll",r)}switch(n){case"input":ra(r),Eu(r,a,!0);break;case"textarea":ra(r),Su(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=eo)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=_f(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[It]=t,e[Ii]=r,qh(e,t,!1,!1),t.stateNode=e;e:{switch(o=Zs(n,r),n){case"dialog":pe("cancel",e),pe("close",e),i=r;break;case"iframe":case"object":case"embed":pe("load",e),i=r;break;case"video":case"audio":for(i=0;i<si.length;i++)pe(si[i],e);i=r;break;case"source":pe("error",e),i=r;break;case"img":case"image":case"link":pe("error",e),pe("load",e),i=r;break;case"details":pe("toggle",e),i=r;break;case"input":wu(e,r),i=Gs(e,r),pe("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ye({},r,{value:void 0}),pe("invalid",e);break;case"textarea":ku(e,r),i=Ys(e,r),pe("invalid",e);break;default:i=r}Xs(n,i),s=i;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?kf(e,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&wf(e,l)):a==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ei(e,l):typeof l=="number"&&Ei(e,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(wi.hasOwnProperty(a)?l!=null&&a==="onScroll"&&pe("scroll",e):l!=null&&ec(e,a,l,o))}switch(n){case"input":ra(e),Eu(e,r,!1);break;case"textarea":ra(e),Su(e);break;case"option":r.value!=null&&e.setAttribute("value",""+En(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?vr(e,!!r.multiple,a,!1):r.defaultValue!=null&&vr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=eo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Me(t),null;case 6:if(e&&t.stateNode!=null)Kh(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(F(166));if(n=Dn(Pi.current),Dn(Lt.current),pa(t)){if(r=t.stateNode,n=t.memoizedProps,r[It]=t,(a=r.nodeValue!==n)&&(e=ot,e!==null))switch(e.tag){case 3:da(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&da(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[It]=t,t.stateNode=r}return Me(t),null;case 13:if(fe(me),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&it!==null&&t.mode&1&&!(t.flags&128))dh(),Cr(),t.flags|=98560,a=!1;else if(a=pa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(F(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(F(317));a[It]=t}else Cr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Me(t),a=!1}else wt!==null&&(Il(wt),wt=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||me.current&1?Ne===0&&(Ne=3):Dc())),t.updateQueue!==null&&(t.flags|=4),Me(t),null);case 4:return Rr(),kl(e,t),e===null&&Ai(t.stateNode.containerInfo),Me(t),null;case 10:return vc(t.type._context),Me(t),null;case 17:return Qe(t.type)&&to(),Me(t),null;case 19:if(fe(me),a=t.memoizedState,a===null)return Me(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Zr(a,!1);else{if(Ne!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=lo(e),o!==null){for(t.flags|=128,Zr(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ue(me,me.current&1|2),t.child}e=e.sibling}a.tail!==null&&xe()>Mr&&(t.flags|=128,r=!0,Zr(a,!1),t.lanes=4194304)}else{if(!r)if(e=lo(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Zr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!he)return Me(t),null}else 2*xe()-a.renderingStartTime>Mr&&n!==1073741824&&(t.flags|=128,r=!0,Zr(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=xe(),t.sibling=null,n=me.current,ue(me,r?n&1|2:n&1),t):(Me(t),null);case 22:case 23:return Lc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?nt&1073741824&&(Me(t),t.subtreeFlags&6&&(t.flags|=8192)):Me(t),null;case 24:return null;case 25:return null}throw Error(F(156,t.tag))}function Jb(e,t){switch(mc(t),t.tag){case 1:return Qe(t.type)&&to(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Rr(),fe(Ye),fe(De),kc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ec(t),null;case 13:if(fe(me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(F(340));Cr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return fe(me),null;case 4:return Rr(),null;case 10:return vc(t.type._context),null;case 22:case 23:return Lc(),null;case 24:return null;default:return null}}var ma=!1,Pe=!1,ev=typeof WeakSet=="function"?WeakSet:Set,q=null;function gr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){be(e,t,r)}else n.current=null}function Sl(e,t,n){try{n()}catch(r){be(e,t,r)}}var hd=!1;function tv(e,t){if(ll=Xa,e=Zf(),fc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,l=-1,c=0,u=0,d=e,p=null;t:for(;;){for(var f;d!==n||i!==0&&d.nodeType!==3||(s=o+i),d!==a||r!==0&&d.nodeType!==3||(l=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(f=d.firstChild)!==null;)p=d,d=f;for(;;){if(d===e)break t;if(p===n&&++c===i&&(s=o),p===a&&++u===r&&(l=o),(f=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=f}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(cl={focusedElem:e,selectionRange:n},Xa=!1,q=t;q!==null;)if(t=q,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,q=e;else for(;q!==null;){t=q;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var x=v.memoizedProps,S=v.memoizedState,h=t.stateNode,g=h.getSnapshotBeforeUpdate(t.elementType===t.type?x:xt(t.type,x),S);h.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(E){be(t,t.return,E)}if(e=t.sibling,e!==null){e.return=t.return,q=e;break}q=t.return}return v=hd,hd=!1,v}function mi(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&Sl(t,n,a)}i=i.next}while(i!==r)}}function Po(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Nl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Vh(e){var t=e.alternate;t!==null&&(e.alternate=null,Vh(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[It],delete t[Ii],delete t[pl],delete t[Fb],delete t[Bb])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Yh(e){return e.tag===5||e.tag===3||e.tag===4}function md(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Yh(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=eo));else if(r!==4&&(e=e.child,e!==null))for(Tl(e,t,n),e=e.sibling;e!==null;)Tl(e,t,n),e=e.sibling}function Ol(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ol(e,t,n),e=e.sibling;e!==null;)Ol(e,t,n),e=e.sibling}var Ce=null,_t=!1;function Zt(e,t,n){for(n=n.child;n!==null;)Qh(e,t,n),n=n.sibling}function Qh(e,t,n){if(Pt&&typeof Pt.onCommitFiberUnmount=="function")try{Pt.onCommitFiberUnmount(No,n)}catch{}switch(n.tag){case 5:Pe||gr(n,t);case 6:var r=Ce,i=_t;Ce=null,Zt(e,t,n),Ce=r,_t=i,Ce!==null&&(_t?(e=Ce,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ce.removeChild(n.stateNode));break;case 18:Ce!==null&&(_t?(e=Ce,n=n.stateNode,e.nodeType===8?ds(e.parentNode,n):e.nodeType===1&&ds(e,n),Ti(e)):ds(Ce,n.stateNode));break;case 4:r=Ce,i=_t,Ce=n.stateNode.containerInfo,_t=!0,Zt(e,t,n),Ce=r,_t=i;break;case 0:case 11:case 14:case 15:if(!Pe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&Sl(n,t,o),i=i.next}while(i!==r)}Zt(e,t,n);break;case 1:if(!Pe&&(gr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){be(n,t,s)}Zt(e,t,n);break;case 21:Zt(e,t,n);break;case 22:n.mode&1?(Pe=(r=Pe)||n.memoizedState!==null,Zt(e,t,n),Pe=r):Zt(e,t,n);break;default:Zt(e,t,n)}}function gd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ev),t.forEach(function(r){var i=uv.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function vt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:Ce=s.stateNode,_t=!1;break e;case 3:Ce=s.stateNode.containerInfo,_t=!0;break e;case 4:Ce=s.stateNode.containerInfo,_t=!0;break e}s=s.return}if(Ce===null)throw Error(F(160));Qh(a,o,i),Ce=null,_t=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){be(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Xh(t,e),t=t.sibling}function Xh(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(vt(t,e),Ot(e),r&4){try{mi(3,e,e.return),Po(3,e)}catch(x){be(e,e.return,x)}try{mi(5,e,e.return)}catch(x){be(e,e.return,x)}}break;case 1:vt(t,e),Ot(e),r&512&&n!==null&&gr(n,n.return);break;case 5:if(vt(t,e),Ot(e),r&512&&n!==null&&gr(n,n.return),e.flags&32){var i=e.stateNode;try{Ei(i,"")}catch(x){be(e,e.return,x)}}if(r&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&vf(i,a),Zs(s,o);var c=Zs(s,a);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?kf(i,d):u==="dangerouslySetInnerHTML"?wf(i,d):u==="children"?Ei(i,d):ec(i,u,d,c)}switch(s){case"input":Ks(i,a);break;case"textarea":xf(i,a);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var f=a.value;f!=null?vr(i,!!a.multiple,f,!1):p!==!!a.multiple&&(a.defaultValue!=null?vr(i,!!a.multiple,a.defaultValue,!0):vr(i,!!a.multiple,a.multiple?[]:"",!1))}i[Ii]=a}catch(x){be(e,e.return,x)}}break;case 6:if(vt(t,e),Ot(e),r&4){if(e.stateNode===null)throw Error(F(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(x){be(e,e.return,x)}}break;case 3:if(vt(t,e),Ot(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ti(t.containerInfo)}catch(x){be(e,e.return,x)}break;case 4:vt(t,e),Ot(e);break;case 13:vt(t,e),Ot(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(Mc=xe())),r&4&&gd(e);break;case 22:if(u=n!==null&&n.memoizedState!==null,e.mode&1?(Pe=(c=Pe)||u,vt(t,e),Pe=c):vt(t,e),Ot(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!u&&e.mode&1)for(q=e,u=e.child;u!==null;){for(d=q=u;q!==null;){switch(p=q,f=p.child,p.tag){case 0:case 11:case 14:case 15:mi(4,p,p.return);break;case 1:gr(p,p.return);var v=p.stateNode;if(typeof v.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(x){be(r,n,x)}}break;case 5:gr(p,p.return);break;case 22:if(p.memoizedState!==null){bd(d);continue}}f!==null?(f.return=p,q=f):bd(d)}u=u.sibling}e:for(u=null,d=e;;){if(d.tag===5){if(u===null){u=d;try{i=d.stateNode,c?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=Ef("display",o))}catch(x){be(e,e.return,x)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(x){be(e,e.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:vt(t,e),Ot(e),r&4&&gd(e);break;case 21:break;default:vt(t,e),Ot(e)}}function Ot(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Yh(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Ei(i,""),r.flags&=-33);var a=md(e);Ol(e,a,i);break;case 3:case 4:var o=r.stateNode.containerInfo,s=md(e);Tl(e,s,o);break;default:throw Error(F(161))}}catch(l){be(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function nv(e,t,n){q=e,Zh(e)}function Zh(e,t,n){for(var r=(e.mode&1)!==0;q!==null;){var i=q,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ma;if(!o){var s=i.alternate,l=s!==null&&s.memoizedState!==null||Pe;s=ma;var c=Pe;if(ma=o,(Pe=l)&&!c)for(q=i;q!==null;)o=q,l=o.child,o.tag===22&&o.memoizedState!==null?vd(i):l!==null?(l.return=o,q=l):vd(i);for(;a!==null;)q=a,Zh(a),a=a.sibling;q=i,ma=s,Pe=c}yd(e)}else i.subtreeFlags&8772&&a!==null?(a.return=i,q=a):yd(e)}}function yd(e){for(;q!==null;){var t=q;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Pe||Po(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Pe)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:xt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&td(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}td(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&Ti(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}Pe||t.flags&512&&Nl(t)}catch(p){be(t,t.return,p)}}if(t===e){q=null;break}if(n=t.sibling,n!==null){n.return=t.return,q=n;break}q=t.return}}function bd(e){for(;q!==null;){var t=q;if(t===e){q=null;break}var n=t.sibling;if(n!==null){n.return=t.return,q=n;break}q=t.return}}function vd(e){for(;q!==null;){var t=q;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Po(4,t)}catch(l){be(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){be(t,i,l)}}var a=t.return;try{Nl(t)}catch(l){be(t,a,l)}break;case 5:var o=t.return;try{Nl(t)}catch(l){be(t,o,l)}}}catch(l){be(t,t.return,l)}if(t===e){q=null;break}var s=t.sibling;if(s!==null){s.return=t.return,q=s;break}q=t.return}}var rv=Math.ceil,po=Yt.ReactCurrentDispatcher,Rc=Yt.ReactCurrentOwner,ht=Yt.ReactCurrentBatchConfig,te=0,Oe=null,Ee=null,Ae=0,nt=0,yr=Nn(0),Ne=0,Bi=null,Hn=0,Lo=0,Ic=0,gi=null,Ke=null,Mc=0,Mr=1/0,Ut=null,fo=!1,Cl=null,bn=null,ga=!1,ln=null,ho=0,yi=0,Al=null,Ua=-1,ja=0;function $e(){return te&6?xe():Ua!==-1?Ua:Ua=xe()}function vn(e){return e.mode&1?te&2&&Ae!==0?Ae&-Ae:Ub.transition!==null?(ja===0&&(ja=Df()),ja):(e=oe,e!==0||(e=window.event,e=e===void 0?16:Hf(e.type)),e):1}function kt(e,t,n,r){if(50<yi)throw yi=0,Al=null,Error(F(185));Gi(e,n,r),(!(te&2)||e!==Oe)&&(e===Oe&&(!(te&2)&&(Lo|=n),Ne===4&&on(e,Ae)),Xe(e,r),n===1&&te===0&&!(t.mode&1)&&(Mr=xe()+500,Ro&&Tn()))}function Xe(e,t){var n=e.callbackNode;Uy(e,t);var r=Qa(e,e===Oe?Ae:0);if(r===0)n!==null&&Ou(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ou(n),t===1)e.tag===0?zb(xd.bind(null,e)):lh(xd.bind(null,e)),Lb(function(){!(te&6)&&Tn()}),n=null;else{switch(Ff(r)){case 1:n=ac;break;case 4:n=Pf;break;case 16:n=Ya;break;case 536870912:n=Lf;break;default:n=Ya}n=om(n,Jh.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Jh(e,t){if(Ua=-1,ja=0,te&6)throw Error(F(327));var n=e.callbackNode;if(kr()&&e.callbackNode!==n)return null;var r=Qa(e,e===Oe?Ae:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=mo(e,r);else{t=r;var i=te;te|=2;var a=tm();(Oe!==e||Ae!==t)&&(Ut=null,Mr=xe()+500,Fn(e,t));do try{ov();break}catch(s){em(e,s)}while(!0);bc(),po.current=a,te=i,Ee!==null?t=0:(Oe=null,Ae=0,t=Ne)}if(t!==0){if(t===2&&(i=rl(e),i!==0&&(r=i,t=Rl(e,i))),t===1)throw n=Bi,Fn(e,0),on(e,r),Xe(e,xe()),n;if(t===6)on(e,r);else{if(i=e.current.alternate,!(r&30)&&!iv(i)&&(t=mo(e,r),t===2&&(a=rl(e),a!==0&&(r=a,t=Rl(e,a))),t===1))throw n=Bi,Fn(e,0),on(e,r),Xe(e,xe()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(F(345));case 2:In(e,Ke,Ut);break;case 3:if(on(e,r),(r&130023424)===r&&(t=Mc+500-xe(),10<t)){if(Qa(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){$e(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=dl(In.bind(null,e,Ke,Ut),t);break}In(e,Ke,Ut);break;case 4:if(on(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-Et(r);a=1<<o,o=t[o],o>i&&(i=o),r&=~a}if(r=i,r=xe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*rv(r/1960))-r,10<r){e.timeoutHandle=dl(In.bind(null,e,Ke,Ut),r);break}In(e,Ke,Ut);break;case 5:In(e,Ke,Ut);break;default:throw Error(F(329))}}}return Xe(e,xe()),e.callbackNode===n?Jh.bind(null,e):null}function Rl(e,t){var n=gi;return e.current.memoizedState.isDehydrated&&(Fn(e,t).flags|=256),e=mo(e,t),e!==2&&(t=Ke,Ke=n,t!==null&&Il(t)),e}function Il(e){Ke===null?Ke=e:Ke.push.apply(Ke,e)}function iv(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!St(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function on(e,t){for(t&=~Ic,t&=~Lo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Et(t),r=1<<n;e[n]=-1,t&=~r}}function xd(e){if(te&6)throw Error(F(327));kr();var t=Qa(e,0);if(!(t&1))return Xe(e,xe()),null;var n=mo(e,t);if(e.tag!==0&&n===2){var r=rl(e);r!==0&&(t=r,n=Rl(e,r))}if(n===1)throw n=Bi,Fn(e,0),on(e,t),Xe(e,xe()),n;if(n===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,In(e,Ke,Ut),Xe(e,xe()),null}function Pc(e,t){var n=te;te|=1;try{return e(t)}finally{te=n,te===0&&(Mr=xe()+500,Ro&&Tn())}}function Wn(e){ln!==null&&ln.tag===0&&!(te&6)&&kr();var t=te;te|=1;var n=ht.transition,r=oe;try{if(ht.transition=null,oe=1,e)return e()}finally{oe=r,ht.transition=n,te=t,!(te&6)&&Tn()}}function Lc(){nt=yr.current,fe(yr)}function Fn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Pb(n)),Ee!==null)for(n=Ee.return;n!==null;){var r=n;switch(mc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&to();break;case 3:Rr(),fe(Ye),fe(De),kc();break;case 5:Ec(r);break;case 4:Rr();break;case 13:fe(me);break;case 19:fe(me);break;case 10:vc(r.type._context);break;case 22:case 23:Lc()}n=n.return}if(Oe=e,Ee=e=xn(e.current,null),Ae=nt=t,Ne=0,Bi=null,Ic=Lo=Hn=0,Ke=gi=null,Ln!==null){for(t=0;t<Ln.length;t++)if(n=Ln[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}Ln=null}return e}function em(e,t){do{var n=Ee;try{if(bc(),Fa.current=uo,co){for(var r=ge.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}co=!1}if($n=0,Te=Se=ge=null,hi=!1,Li=0,Rc.current=null,n===null||n.return===null){Ne=1,Bi=t,Ee=null;break}e:{var a=e,o=n.return,s=n,l=t;if(t=Ae,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=s,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var p=u.alternate;p?(u.updateQueue=p.updateQueue,u.memoizedState=p.memoizedState,u.lanes=p.lanes):(u.updateQueue=null,u.memoizedState=null)}var f=sd(o);if(f!==null){f.flags&=-257,ld(f,o,s,a,t),f.mode&1&&od(a,c,t),t=f,l=c;var v=t.updateQueue;if(v===null){var x=new Set;x.add(l),t.updateQueue=x}else v.add(l);break e}else{if(!(t&1)){od(a,c,t),Dc();break e}l=Error(F(426))}}else if(he&&s.mode&1){var S=sd(o);if(S!==null){!(S.flags&65536)&&(S.flags|=256),ld(S,o,s,a,t),gc(Ir(l,s));break e}}a=l=Ir(l,s),Ne!==4&&(Ne=2),gi===null?gi=[a]:gi.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var h=Fh(a,l,t);ed(a,h);break e;case 1:s=l;var g=a.type,y=a.stateNode;if(!(a.flags&128)&&(typeof g.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(bn===null||!bn.has(y)))){a.flags|=65536,t&=-t,a.lanes|=t;var E=Bh(a,s,t);ed(a,E);break e}}a=a.return}while(a!==null)}rm(n)}catch(N){t=N,Ee===n&&n!==null&&(Ee=n=n.return);continue}break}while(!0)}function tm(){var e=po.current;return po.current=uo,e===null?uo:e}function Dc(){(Ne===0||Ne===3||Ne===2)&&(Ne=4),Oe===null||!(Hn&268435455)&&!(Lo&268435455)||on(Oe,Ae)}function mo(e,t){var n=te;te|=2;var r=tm();(Oe!==e||Ae!==t)&&(Ut=null,Fn(e,t));do try{av();break}catch(i){em(e,i)}while(!0);if(bc(),te=n,po.current=r,Ee!==null)throw Error(F(261));return Oe=null,Ae=0,Ne}function av(){for(;Ee!==null;)nm(Ee)}function ov(){for(;Ee!==null&&!Ry();)nm(Ee)}function nm(e){var t=am(e.alternate,e,nt);e.memoizedProps=e.pendingProps,t===null?rm(e):Ee=t,Rc.current=null}function rm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Jb(n,t),n!==null){n.flags&=32767,Ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ne=6,Ee=null;return}}else if(n=Zb(n,t,nt),n!==null){Ee=n;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ne===0&&(Ne=5)}function In(e,t,n){var r=oe,i=ht.transition;try{ht.transition=null,oe=1,sv(e,t,n,r)}finally{ht.transition=i,oe=r}return null}function sv(e,t,n,r){do kr();while(ln!==null);if(te&6)throw Error(F(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(jy(e,a),e===Oe&&(Ee=Oe=null,Ae=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ga||(ga=!0,om(Ya,function(){return kr(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=ht.transition,ht.transition=null;var o=oe;oe=1;var s=te;te|=4,Rc.current=null,tv(e,n),Xh(n,e),Tb(cl),Xa=!!ll,cl=ll=null,e.current=n,nv(n),Iy(),te=s,oe=o,ht.transition=a}else e.current=n;if(ga&&(ga=!1,ln=e,ho=i),a=e.pendingLanes,a===0&&(bn=null),Ly(n.stateNode),Xe(e,xe()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(fo)throw fo=!1,e=Cl,Cl=null,e;return ho&1&&e.tag!==0&&kr(),a=e.pendingLanes,a&1?e===Al?yi++:(yi=0,Al=e):yi=0,Tn(),null}function kr(){if(ln!==null){var e=Ff(ho),t=ht.transition,n=oe;try{if(ht.transition=null,oe=16>e?16:e,ln===null)var r=!1;else{if(e=ln,ln=null,ho=0,te&6)throw Error(F(331));var i=te;for(te|=4,q=e.current;q!==null;){var a=q,o=a.child;if(q.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(q=c;q!==null;){var u=q;switch(u.tag){case 0:case 11:case 15:mi(8,u,a)}var d=u.child;if(d!==null)d.return=u,q=d;else for(;q!==null;){u=q;var p=u.sibling,f=u.return;if(Vh(u),u===c){q=null;break}if(p!==null){p.return=f,q=p;break}q=f}}}var v=a.alternate;if(v!==null){var x=v.child;if(x!==null){v.child=null;do{var S=x.sibling;x.sibling=null,x=S}while(x!==null)}}q=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,q=o;else e:for(;q!==null;){if(a=q,a.flags&2048)switch(a.tag){case 0:case 11:case 15:mi(9,a,a.return)}var h=a.sibling;if(h!==null){h.return=a.return,q=h;break e}q=a.return}}var g=e.current;for(q=g;q!==null;){o=q;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,q=y;else e:for(o=g;q!==null;){if(s=q,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Po(9,s)}}catch(N){be(s,s.return,N)}if(s===o){q=null;break e}var E=s.sibling;if(E!==null){E.return=s.return,q=E;break e}q=s.return}}if(te=i,Tn(),Pt&&typeof Pt.onPostCommitFiberRoot=="function")try{Pt.onPostCommitFiberRoot(No,e)}catch{}r=!0}return r}finally{oe=n,ht.transition=t}}return!1}function _d(e,t,n){t=Ir(n,t),t=Fh(e,t,1),e=yn(e,t,1),t=$e(),e!==null&&(Gi(e,1,t),Xe(e,t))}function be(e,t,n){if(e.tag===3)_d(e,e,n);else for(;t!==null;){if(t.tag===3){_d(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(bn===null||!bn.has(r))){e=Ir(n,e),e=Bh(t,e,1),t=yn(t,e,1),e=$e(),t!==null&&(Gi(t,1,e),Xe(t,e));break}}t=t.return}}function lv(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=$e(),e.pingedLanes|=e.suspendedLanes&n,Oe===e&&(Ae&n)===n&&(Ne===4||Ne===3&&(Ae&130023424)===Ae&&500>xe()-Mc?Fn(e,0):Ic|=n),Xe(e,t)}function im(e,t){t===0&&(e.mode&1?(t=oa,oa<<=1,!(oa&130023424)&&(oa=4194304)):t=1);var n=$e();e=Kt(e,t),e!==null&&(Gi(e,t,n),Xe(e,n))}function cv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),im(e,n)}function uv(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(t),im(e,n)}var am;am=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ye.current)Ve=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ve=!1,Xb(e,t,n);Ve=!!(e.flags&131072)}else Ve=!1,he&&t.flags&1048576&&ch(t,io,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;za(e,t),e=t.pendingProps;var i=Or(t,De.current);Er(t,n),i=Nc(null,t,r,e,i,n);var a=Tc();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Qe(r)?(a=!0,no(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,_c(t),i.updater=Mo,t.stateNode=i,i._reactInternals=t,bl(t,r,e,n),t=_l(null,t,r,!0,a,n)):(t.tag=0,he&&a&&hc(t),je(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(za(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=pv(r),e=xt(r,e),i){case 0:t=xl(null,t,r,e,n);break e;case 1:t=dd(null,t,r,e,n);break e;case 11:t=cd(null,t,r,e,n);break e;case 14:t=ud(null,t,r,xt(r.type,e),n);break e}throw Error(F(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:xt(r,i),xl(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:xt(r,i),dd(e,t,r,i,n);case 3:e:{if($h(t),e===null)throw Error(F(387));r=t.pendingProps,a=t.memoizedState,i=a.element,mh(e,t),so(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=Ir(Error(F(423)),t),t=pd(e,t,r,n,i);break e}else if(r!==i){i=Ir(Error(F(424)),t),t=pd(e,t,r,n,i);break e}else for(it=gn(t.stateNode.containerInfo.firstChild),ot=t,he=!0,wt=null,n=fh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Cr(),r===i){t=Vt(e,t,n);break e}je(e,t,r,n)}t=t.child}return t;case 5:return gh(t),e===null&&ml(t),r=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,o=i.children,ul(r,i)?o=null:a!==null&&ul(r,a)&&(t.flags|=32),jh(e,t),je(e,t,o,n),t.child;case 6:return e===null&&ml(t),null;case 13:return Hh(e,t,n);case 4:return wc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ar(t,null,r,n):je(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:xt(r,i),cd(e,t,r,i,n);case 7:return je(e,t,t.pendingProps,n),t.child;case 8:return je(e,t,t.pendingProps.children,n),t.child;case 12:return je(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,o=i.value,ue(ao,r._currentValue),r._currentValue=o,a!==null)if(St(a.value,o)){if(a.children===i.children&&!Ye.current){t=Vt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(a.tag===1){l=Wt(-1,n&-n),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),gl(a.return,n,t),s.lanes|=n;break}l=l.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(F(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),gl(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}je(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Er(t,n),i=mt(i),r=r(i),t.flags|=1,je(e,t,r,n),t.child;case 14:return r=t.type,i=xt(r,t.pendingProps),i=xt(r.type,i),ud(e,t,r,i,n);case 15:return zh(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:xt(r,i),za(e,t),t.tag=1,Qe(r)?(e=!0,no(t)):e=!1,Er(t,n),Dh(t,r,i),bl(t,r,i,n),_l(null,t,r,!0,e,n);case 19:return Wh(e,t,n);case 22:return Uh(e,t,n)}throw Error(F(156,t.tag))};function om(e,t){return Mf(e,t)}function dv(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,n,r){return new dv(e,t,n,r)}function Fc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function pv(e){if(typeof e=="function")return Fc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===nc)return 11;if(e===rc)return 14}return 2}function xn(e,t){var n=e.alternate;return n===null?(n=ft(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function $a(e,t,n,r,i,a){var o=2;if(r=e,typeof e=="function")Fc(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case sr:return Bn(n.children,i,a,t);case tc:o=8,i|=8;break;case $s:return e=ft(12,n,t,i|2),e.elementType=$s,e.lanes=a,e;case Hs:return e=ft(13,n,t,i),e.elementType=Hs,e.lanes=a,e;case Ws:return e=ft(19,n,t,i),e.elementType=Ws,e.lanes=a,e;case gf:return Do(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case hf:o=10;break e;case mf:o=9;break e;case nc:o=11;break e;case rc:o=14;break e;case nn:o=16,r=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return t=ft(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function Bn(e,t,n,r){return e=ft(7,e,r,t),e.lanes=n,e}function Do(e,t,n,r){return e=ft(22,e,r,t),e.elementType=gf,e.lanes=n,e.stateNode={isHidden:!1},e}function vs(e,t,n){return e=ft(6,e,null,t),e.lanes=n,e}function xs(e,t,n){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function fv(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=es(0),this.expirationTimes=es(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=es(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Bc(e,t,n,r,i,a,o,s,l){return e=new fv(e,t,n,s,l),t===1?(t=1,a===!0&&(t|=8)):t=0,a=ft(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},_c(a),e}function hv(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:or,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function sm(e){if(!e)return kn;e=e._reactInternals;e:{if(Gn(e)!==e||e.tag!==1)throw Error(F(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Qe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(F(171))}if(e.tag===1){var n=e.type;if(Qe(n))return sh(e,n,t)}return t}function lm(e,t,n,r,i,a,o,s,l){return e=Bc(n,r,!0,e,i,a,o,s,l),e.context=sm(null),n=e.current,r=$e(),i=vn(n),a=Wt(r,i),a.callback=t??null,yn(n,a,i),e.current.lanes=i,Gi(e,i,r),Xe(e,r),e}function Fo(e,t,n,r){var i=t.current,a=$e(),o=vn(i);return n=sm(n),t.context===null?t.context=n:t.pendingContext=n,t=Wt(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=yn(i,t,o),e!==null&&(kt(e,i,o,a),Da(e,i,o)),o}function go(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function wd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function zc(e,t){wd(e,t),(e=e.alternate)&&wd(e,t)}function mv(){return null}var cm=typeof reportError=="function"?reportError:function(e){console.error(e)};function Uc(e){this._internalRoot=e}Bo.prototype.render=Uc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(F(409));Fo(e,t,null,null)};Bo.prototype.unmount=Uc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Wn(function(){Fo(null,e,null,null)}),t[Gt]=null}};function Bo(e){this._internalRoot=e}Bo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<an.length&&t!==0&&t<an[n].priority;n++);an.splice(n,0,e),n===0&&$f(e)}};function jc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function zo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ed(){}function gv(e,t,n,r,i){if(i){if(typeof r=="function"){var a=r;r=function(){var c=go(o);a.call(c)}}var o=lm(t,r,e,0,null,!1,!1,"",Ed);return e._reactRootContainer=o,e[Gt]=o.current,Ai(e.nodeType===8?e.parentNode:e),Wn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var c=go(l);s.call(c)}}var l=Bc(e,0,!1,null,null,!1,!1,"",Ed);return e._reactRootContainer=l,e[Gt]=l.current,Ai(e.nodeType===8?e.parentNode:e),Wn(function(){Fo(t,l,n,r)}),l}function Uo(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i=="function"){var s=i;i=function(){var l=go(o);s.call(l)}}Fo(t,o,e,i)}else o=gv(n,t,e,i,r);return go(o)}Bf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=oi(t.pendingLanes);n!==0&&(oc(t,n|1),Xe(t,xe()),!(te&6)&&(Mr=xe()+500,Tn()))}break;case 13:Wn(function(){var r=Kt(e,1);if(r!==null){var i=$e();kt(r,e,1,i)}}),zc(e,1)}};sc=function(e){if(e.tag===13){var t=Kt(e,134217728);if(t!==null){var n=$e();kt(t,e,134217728,n)}zc(e,134217728)}};zf=function(e){if(e.tag===13){var t=vn(e),n=Kt(e,t);if(n!==null){var r=$e();kt(n,e,t,r)}zc(e,t)}};Uf=function(){return oe};jf=function(e,t){var n=oe;try{return oe=e,t()}finally{oe=n}};el=function(e,t,n){switch(t){case"input":if(Ks(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Ao(r);if(!i)throw Error(F(90));bf(r),Ks(r,i)}}}break;case"textarea":xf(e,n);break;case"select":t=n.value,t!=null&&vr(e,!!n.multiple,t,!1)}};Tf=Pc;Of=Wn;var yv={usingClientEntryPoint:!1,Events:[Vi,dr,Ao,Sf,Nf,Pc]},Jr={findFiberByHostInstance:Pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},bv={bundleType:Jr.bundleType,version:Jr.version,rendererPackageName:Jr.rendererPackageName,rendererConfig:Jr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Rf(e),e===null?null:e.stateNode},findFiberByHostInstance:Jr.findFiberByHostInstance||mv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ya.isDisabled&&ya.supportsFiber)try{No=ya.inject(bv),Pt=ya}catch{}}lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yv;lt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!jc(t))throw Error(F(200));return hv(e,t,null,n)};lt.createRoot=function(e,t){if(!jc(e))throw Error(F(299));var n=!1,r="",i=cm;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Bc(e,1,!1,null,null,n,!1,r,i),e[Gt]=t.current,Ai(e.nodeType===8?e.parentNode:e),new Uc(t)};lt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=Rf(t),e=e===null?null:e.stateNode,e};lt.flushSync=function(e){return Wn(e)};lt.hydrate=function(e,t,n){if(!zo(t))throw Error(F(200));return Uo(null,e,t,!0,n)};lt.hydrateRoot=function(e,t,n){if(!jc(e))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,i=!1,a="",o=cm;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=lm(t,null,e,1,n??null,i,!1,a,o),e[Gt]=t.current,Ai(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Bo(t)};lt.render=function(e,t,n){if(!zo(t))throw Error(F(200));return Uo(null,e,t,!1,n)};lt.unmountComponentAtNode=function(e){if(!zo(e))throw Error(F(40));return e._reactRootContainer?(Wn(function(){Uo(null,null,e,!1,function(){e._reactRootContainer=null,e[Gt]=null})}),!0):!1};lt.unstable_batchedUpdates=Pc;lt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!zo(n))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return Uo(e,t,n,!1,r)};lt.version="18.3.1-next-f1338f8080-20240426";function um(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(um)}catch(e){console.error(e)}}um(),uf.exports=lt;var vv=uf.exports,kd=vv;Us.createRoot=kd.createRoot,Us.hydrateRoot=kd.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function zi(){return zi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},zi.apply(this,arguments)}var cn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(cn||(cn={}));const Sd="popstate";function xv(e){e===void 0&&(e={});function t(r,i){let{pathname:a,search:o,hash:s}=r.location;return Ml("",{pathname:a,search:o,hash:s},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:yo(i)}return wv(t,n,null,e)}function ke(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function $c(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function _v(){return Math.random().toString(36).substr(2,8)}function Nd(e,t){return{usr:e.state,key:e.key,idx:t}}function Ml(e,t,n,r){return n===void 0&&(n=null),zi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Br(t):t,{state:n,key:t&&t.key||r||_v()})}function yo(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Br(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function wv(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=cn.Pop,l=null,c=u();c==null&&(c=0,o.replaceState(zi({},o.state,{idx:c}),""));function u(){return(o.state||{idx:null}).idx}function d(){s=cn.Pop;let S=u(),h=S==null?null:S-c;c=S,l&&l({action:s,location:x.location,delta:h})}function p(S,h){s=cn.Push;let g=Ml(x.location,S,h);c=u()+1;let y=Nd(g,c),E=x.createHref(g);try{o.pushState(y,"",E)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;i.location.assign(E)}a&&l&&l({action:s,location:x.location,delta:1})}function f(S,h){s=cn.Replace;let g=Ml(x.location,S,h);c=u();let y=Nd(g,c),E=x.createHref(g);o.replaceState(y,"",E),a&&l&&l({action:s,location:x.location,delta:0})}function v(S){let h=i.location.origin!=="null"?i.location.origin:i.location.href,g=typeof S=="string"?S:yo(S);return g=g.replace(/ $/,"%20"),ke(h,"No window.location.(origin|href) available to create URL for href: "+g),new URL(g,h)}let x={get action(){return s},get location(){return e(i,o)},listen(S){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(Sd,d),l=S,()=>{i.removeEventListener(Sd,d),l=null}},createHref(S){return t(i,S)},createURL:v,encodeLocation(S){let h=v(S);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:p,replace:f,go(S){return o.go(S)}};return x}var Td;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Td||(Td={}));function Ev(e,t,n){return n===void 0&&(n="/"),kv(e,t,n)}function kv(e,t,n,r){let i=typeof t=="string"?Br(t):t,a=Hc(i.pathname||"/",n);if(a==null)return null;let o=dm(e);Sv(o);let s=null;for(let l=0;s==null&&l<o.length;++l){let c=Fv(a);s=Pv(o[l],c)}return s}function dm(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(a,o,s)=>{let l={relativePath:s===void 0?a.path||"":s,caseSensitive:a.caseSensitive===!0,childrenIndex:o,route:a};l.relativePath.startsWith("/")&&(ke(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=_n([r,l.relativePath]),u=n.concat(l);a.children&&a.children.length>0&&(ke(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),dm(a.children,t,u,c)),!(a.path==null&&!a.index)&&t.push({path:c,score:Iv(c,a.index),routesMeta:u})};return e.forEach((a,o)=>{var s;if(a.path===""||!((s=a.path)!=null&&s.includes("?")))i(a,o);else for(let l of pm(a.path))i(a,o,l)}),t}function pm(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),a=n.replace(/\?$/,"");if(r.length===0)return i?[a,""]:[a];let o=pm(r.join("/")),s=[];return s.push(...o.map(l=>l===""?a:[a,l].join("/"))),i&&s.push(...o),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function Sv(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Mv(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Nv=/^:[\w-]+$/,Tv=3,Ov=2,Cv=1,Av=10,Rv=-2,Od=e=>e==="*";function Iv(e,t){let n=e.split("/"),r=n.length;return n.some(Od)&&(r+=Rv),t&&(r+=Ov),n.filter(i=>!Od(i)).reduce((i,a)=>i+(Nv.test(a)?Tv:a===""?Cv:Av),r)}function Mv(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function Pv(e,t,n){let{routesMeta:r}=e,i={},a="/",o=[];for(let s=0;s<r.length;++s){let l=r[s],c=s===r.length-1,u=a==="/"?t:t.slice(a.length)||"/",d=Lv({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},u),p=l.route;if(!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:_n([a,d.pathname]),pathnameBase:$v(_n([a,d.pathnameBase])),route:p}),d.pathnameBase!=="/"&&(a=_n([a,d.pathnameBase]))}return o}function Lv(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Dv(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,"$1"),s=i.slice(1);return{params:r.reduce((c,u,d)=>{let{paramName:p,isOptional:f}=u;if(p==="*"){let x=s[d]||"";o=a.slice(0,a.length-x.length).replace(/(.)\/+$/,"$1")}const v=s[d];return f&&!v?c[p]=void 0:c[p]=(v||"").replace(/%2F/g,"/"),c},{}),pathname:a,pathnameBase:o,pattern:e}}function Dv(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),$c(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,l)=>(r.push({paramName:s,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function Fv(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return $c(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Hc(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Bv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,zv=e=>Bv.test(e);function Uv(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?Br(e):e,a;if(n)if(zv(n))a=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),$c(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?a=Cd(n.substring(1),"/"):a=Cd(n,t)}else a=t;return{pathname:a,search:Hv(r),hash:Wv(i)}}function Cd(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function _s(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function jv(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function fm(e,t){let n=jv(e);return t?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function hm(e,t,n,r){r===void 0&&(r=!1);let i;typeof e=="string"?i=Br(e):(i=zi({},e),ke(!i.pathname||!i.pathname.includes("?"),_s("?","pathname","search",i)),ke(!i.pathname||!i.pathname.includes("#"),_s("#","pathname","hash",i)),ke(!i.search||!i.search.includes("#"),_s("#","search","hash",i)));let a=e===""||i.pathname==="",o=a?"/":i.pathname,s;if(o==null)s=n;else{let d=t.length-1;if(!r&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),d-=1;i.pathname=p.join("/")}s=d>=0?t[d]:"/"}let l=Uv(i,s),c=o&&o!=="/"&&o.endsWith("/"),u=(a||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||u)&&(l.pathname+="/"),l}const _n=e=>e.join("/").replace(/\/\/+/g,"/"),$v=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Hv=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Wv=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function qv(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const mm=["post","put","patch","delete"];new Set(mm);const Gv=["get",...mm];new Set(Gv);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ui(){return Ui=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ui.apply(this,arguments)}const Wc=R.createContext(null),Kv=R.createContext(null),Kn=R.createContext(null),jo=R.createContext(null),On=R.createContext({outlet:null,matches:[],isDataRoute:!1}),gm=R.createContext(null);function Vv(e,t){let{relative:n}=t===void 0?{}:t;Qi()||ke(!1);let{basename:r,navigator:i}=R.useContext(Kn),{hash:a,pathname:o,search:s}=xm(e,{relative:n}),l=o;return r!=="/"&&(l=o==="/"?r:_n([r,o])),i.createHref({pathname:l,search:s,hash:a})}function Qi(){return R.useContext(jo)!=null}function Xi(){return Qi()||ke(!1),R.useContext(jo).location}function ym(e){R.useContext(Kn).static||R.useLayoutEffect(e)}function bm(){let{isDataRoute:e}=R.useContext(On);return e?sx():Yv()}function Yv(){Qi()||ke(!1);let e=R.useContext(Wc),{basename:t,future:n,navigator:r}=R.useContext(Kn),{matches:i}=R.useContext(On),{pathname:a}=Xi(),o=JSON.stringify(fm(i,n.v7_relativeSplatPath)),s=R.useRef(!1);return ym(()=>{s.current=!0}),R.useCallback(function(c,u){if(u===void 0&&(u={}),!s.current)return;if(typeof c=="number"){r.go(c);return}let d=hm(c,JSON.parse(o),a,u.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:_n([t,d.pathname])),(u.replace?r.replace:r.push)(d,u.state,u)},[t,r,o,a,e])}function vm(){let{matches:e}=R.useContext(On),t=e[e.length-1];return t?t.params:{}}function xm(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=R.useContext(Kn),{matches:i}=R.useContext(On),{pathname:a}=Xi(),o=JSON.stringify(fm(i,r.v7_relativeSplatPath));return R.useMemo(()=>hm(e,JSON.parse(o),a,n==="path"),[e,o,a,n])}function Qv(e,t){return Xv(e,t)}function Xv(e,t,n,r){Qi()||ke(!1);let{navigator:i}=R.useContext(Kn),{matches:a}=R.useContext(On),o=a[a.length-1],s=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let c=Xi(),u;if(t){var d;let S=typeof t=="string"?Br(t):t;l==="/"||(d=S.pathname)!=null&&d.startsWith(l)||ke(!1),u=S}else u=c;let p=u.pathname||"/",f=p;if(l!=="/"){let S=l.replace(/^\//,"").split("/");f="/"+p.replace(/^\//,"").split("/").slice(S.length).join("/")}let v=Ev(e,{pathname:f}),x=nx(v&&v.map(S=>Object.assign({},S,{params:Object.assign({},s,S.params),pathname:_n([l,i.encodeLocation?i.encodeLocation(S.pathname).pathname:S.pathname]),pathnameBase:S.pathnameBase==="/"?l:_n([l,i.encodeLocation?i.encodeLocation(S.pathnameBase).pathname:S.pathnameBase])})),a,n,r);return t&&x?R.createElement(jo.Provider,{value:{location:Ui({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:cn.Pop}},x):x}function Zv(){let e=ox(),t=qv(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return R.createElement(R.Fragment,null,R.createElement("h2",null,"Unexpected Application Error!"),R.createElement("h3",{style:{fontStyle:"italic"}},t),n?R.createElement("pre",{style:i},n):null,null)}const Jv=R.createElement(Zv,null);class ex extends R.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?R.createElement(On.Provider,{value:this.props.routeContext},R.createElement(gm.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function tx(e){let{routeContext:t,match:n,children:r}=e,i=R.useContext(Wc);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),R.createElement(On.Provider,{value:t},r)}function nx(e,t,n,r){var i;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var a;if(!n)return null;if(n.errors)e=n.matches;else if((a=r)!=null&&a.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,s=(i=n)==null?void 0:i.errors;if(s!=null){let u=o.findIndex(d=>d.route.id&&(s==null?void 0:s[d.route.id])!==void 0);u>=0||ke(!1),o=o.slice(0,Math.min(o.length,u+1))}let l=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let u=0;u<o.length;u++){let d=o[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=u),d.route.id){let{loaderData:p,errors:f}=n,v=d.route.loader&&p[d.route.id]===void 0&&(!f||f[d.route.id]===void 0);if(d.route.lazy||v){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((u,d,p)=>{let f,v=!1,x=null,S=null;n&&(f=s&&d.route.id?s[d.route.id]:void 0,x=d.route.errorElement||Jv,l&&(c<0&&p===0?(lx("route-fallback"),v=!0,S=null):c===p&&(v=!0,S=d.route.hydrateFallbackElement||null)));let h=t.concat(o.slice(0,p+1)),g=()=>{let y;return f?y=x:v?y=S:d.route.Component?y=R.createElement(d.route.Component,null):d.route.element?y=d.route.element:y=u,R.createElement(tx,{match:d,routeContext:{outlet:u,matches:h,isDataRoute:n!=null},children:y})};return n&&(d.route.ErrorBoundary||d.route.errorElement||p===0)?R.createElement(ex,{location:n.location,revalidation:n.revalidation,component:x,error:f,children:g(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):g()},null)}var _m=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(_m||{}),wm=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(wm||{});function rx(e){let t=R.useContext(Wc);return t||ke(!1),t}function ix(e){let t=R.useContext(Kv);return t||ke(!1),t}function ax(e){let t=R.useContext(On);return t||ke(!1),t}function Em(e){let t=ax(),n=t.matches[t.matches.length-1];return n.route.id||ke(!1),n.route.id}function ox(){var e;let t=R.useContext(gm),n=ix(),r=Em();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function sx(){let{router:e}=rx(_m.UseNavigateStable),t=Em(wm.UseNavigateStable),n=R.useRef(!1);return ym(()=>{n.current=!0}),R.useCallback(function(i,a){a===void 0&&(a={}),n.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,Ui({fromRouteId:t},a)))},[e,t])}const Ad={};function lx(e,t,n){Ad[e]||(Ad[e]=!0)}function cx(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function en(e){ke(!1)}function ux(e){let{basename:t="/",children:n=null,location:r,navigationType:i=cn.Pop,navigator:a,static:o=!1,future:s}=e;Qi()&&ke(!1);let l=t.replace(/^\/*/,"/"),c=R.useMemo(()=>({basename:l,navigator:a,static:o,future:Ui({v7_relativeSplatPath:!1},s)}),[l,s,a,o]);typeof r=="string"&&(r=Br(r));let{pathname:u="/",search:d="",hash:p="",state:f=null,key:v="default"}=r,x=R.useMemo(()=>{let S=Hc(u,l);return S==null?null:{location:{pathname:S,search:d,hash:p,state:f,key:v},navigationType:i}},[l,u,d,p,f,v,i]);return x==null?null:R.createElement(Kn.Provider,{value:c},R.createElement(jo.Provider,{children:n,value:x}))}function dx(e){let{children:t,location:n}=e;return Qv(Pl(t),n)}new Promise(()=>{});function Pl(e,t){t===void 0&&(t=[]);let n=[];return R.Children.forEach(e,(r,i)=>{if(!R.isValidElement(r))return;let a=[...t,i];if(r.type===R.Fragment){n.push.apply(n,Pl(r.props.children,a));return}r.type!==en&&ke(!1),!r.props.index||!r.props.children||ke(!1);let o={id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Pl(r.props.children,a)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ll(){return Ll=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ll.apply(this,arguments)}function px(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,a;for(a=0;a<r.length;a++)i=r[a],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function fx(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function hx(e,t){return e.button===0&&(!t||t==="_self")&&!fx(e)}const mx=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],gx="6";try{window.__reactRouterVersion=gx}catch{}const yx="startTransition",Rd=ly[yx];function bx(e){let{basename:t,children:n,future:r,window:i}=e,a=R.useRef();a.current==null&&(a.current=xv({window:i,v5Compat:!0}));let o=a.current,[s,l]=R.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},u=R.useCallback(d=>{c&&Rd?Rd(()=>l(d)):l(d)},[l,c]);return R.useLayoutEffect(()=>o.listen(u),[o,u]),R.useEffect(()=>cx(r),[r]),R.createElement(ux,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:o,future:r})}const vx=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",xx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Le=R.forwardRef(function(t,n){let{onClick:r,relative:i,reloadDocument:a,replace:o,state:s,target:l,to:c,preventScrollReset:u,viewTransition:d}=t,p=px(t,mx),{basename:f}=R.useContext(Kn),v,x=!1;if(typeof c=="string"&&xx.test(c)&&(v=c,vx))try{let y=new URL(window.location.href),E=c.startsWith("//")?new URL(y.protocol+c):new URL(c),N=Hc(E.pathname,f);E.origin===y.origin&&N!=null?c=N+E.search+E.hash:x=!0}catch{}let S=Vv(c,{relative:i}),h=_x(c,{replace:o,state:s,target:l,preventScrollReset:u,relative:i,viewTransition:d});function g(y){r&&r(y),y.defaultPrevented||h(y)}return R.createElement("a",Ll({},p,{href:v||S,onClick:x||a?r:g,ref:n,target:l}))});var Id;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Id||(Id={}));var Md;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Md||(Md={}));function _x(e,t){let{target:n,replace:r,state:i,preventScrollReset:a,relative:o,viewTransition:s}=t===void 0?{}:t,l=bm(),c=Xi(),u=xm(e,{relative:o});return R.useCallback(d=>{if(hx(d,n)){d.preventDefault();let p=r!==void 0?r:yo(c)===yo(u);l(e,{replace:p,state:i,preventScrollReset:a,relative:o,viewTransition:s})}},[c,l,u,r,i,n,e,a,o,s])}function wx(){const e=Xi(),t=(n,r)=>{const i=e.pathname===n||e.pathname.startsWith(n+"/");return m.jsx(Le,{to:n,className:`px-4 py-2 rounded-md text-sm font-medium transition-colors ${i?"bg-emerald-600 text-white":"text-gray-400 hover:text-white hover:bg-gray-800"}`,children:r})};return m.jsx("nav",{className:"border-b border-gray-800 bg-gray-950 sticky top-0 z-50",children:m.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between",children:[m.jsxs(Le,{to:"/",className:"flex items-center gap-2",children:[m.jsx("span",{className:"text-emerald-400 font-mono font-bold text-lg",children:"</>"}),m.jsx("span",{className:"font-semibold text-white",children:"Interview Prep"})]}),m.jsxs("div",{className:"flex items-center gap-1",children:[t("/learn","Learn"),t("/practice","Practice"),t("/real-world","Real World"),t("/big-o","Big O")]})]})})}const km="interview-prep-progress";function Ex(){try{const e=localStorage.getItem(km);if(e)return JSON.parse(e)}catch{}return{completedProblems:[],savedCode:{}}}function kx(e){try{localStorage.setItem(km,JSON.stringify(e))}catch{}}function $o(){const[e,t]=R.useState(Ex);R.useEffect(()=>{kx(e)},[e]);const n=R.useCallback(o=>{t(s=>s.completedProblems.includes(o)?s:{...s,completedProblems:[...s.completedProblems,o]})},[]),r=R.useCallback((o,s)=>{t(l=>({...l,savedCode:{...l.savedCode,[o]:s}}))},[]),i=R.useCallback(o=>e.completedProblems.includes(o),[e]),a=R.useCallback(o=>e.savedCode[o]??null,[e]);return{completedProblems:e.completedProblems,markComplete:n,saveCode:r,isComplete:i,getSavedCode:a}}const un=[{id:"palindrome-permutation",title:"Palindrome Permutation",difficulty:"easy",category:"Arrays & Strings",description:`## Palindrome Permutation

Given a string, write a function to check if it is a permutation of a palindrome.

A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

**Example:**
\`\`\`
Input:  "Tact Coa"
Output: True  (permutations: "taco cat", "atco cta", etc.)
\`\`\`

**Constraints:**
- Ignore spaces and case
- Return \`True\` or \`False\`
`,starterCode:`def is_palindrome_permutation(s: str) -> bool:
    """
    Check if s is a permutation of a palindrome.

    A string can form a palindrome if at most one character
    has an odd frequency count.
    """
    # Your code here
    pass
`,testCode:`
# ---- tests ----
def run_tests():
    cases = [
        ("Tact Coa",   True),
        ("racecar",    True),
        ("aabbccdd",   True),
        ("aabbccd",    True),
        ("abc",        False),
        ("aabbccdde",  True),
        ("",           True),
        ("a",          True),
        ("ab",         False),
    ]
    passed = 0
    for s, expected in cases:
        result = is_palindrome_permutation(s)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] is_palindrome_permutation({repr(s)}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def is_palindrome_permutation(s: str) -> bool:
    freq = {}
    for char in s.lower():
        if char == ' ':
            continue
        freq[char] = freq.get(char, 0) + 1

    odd_count = sum(1 for count in freq.values() if count % 2 != 0)
    return odd_count <= 1
`,hints:["A palindrome reads the same forward and backward.","What must be true about character frequencies for a palindrome? (Think: pairs)","At most one character can appear an odd number of times.","Use a dictionary to count character frequencies, ignoring spaces and case."]},{id:"string-compression",title:"String Compression",difficulty:"easy",category:"Arrays & Strings",description:`## String Compression

Implement a method to perform basic string compression using the counts of repeated characters.

For example, the string \`aabcccccaaa\` would become \`a2b1c5a3\`.

If the compressed string would **not** become smaller than the original string, your method should return the original string.

You can assume the string has only uppercase and lowercase letters (a-z).

**Examples:**
\`\`\`
compress("aabcccccaaa") → "a2b1c5a3"
compress("abcd")         → "abcd"   (compressed is longer)
compress("aabb")         → "aabb"   (same length, return original)
\`\`\`
`,starterCode:`def compress_string(s: str) -> str:
    """
    Compress s by encoding consecutive repeats as charCount.
    Return original if compressed version is not shorter.
    """
    if not s:
        return s
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ("aabcccccaaa", "a2b1c5a3"),
        ("abcd",        "abcd"),
        ("aabb",        "aabb"),
        ("a",           "a"),
        ("aaa",         "a3"),
        ("abcdef",      "abcdef"),
        ("aaabbbccc",   "a3b3c3"),
    ]
    passed = 0
    for s, expected in cases:
        result = compress_string(s)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] compress_string({repr(s)}) => {repr(result)} (expected {repr(expected)})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def compress_string(s: str) -> str:
    if not s:
        return s

    parts = []
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            parts.append(s[i-1] + str(count))
            count = 1
    parts.append(s[-1] + str(count))

    compressed = "".join(parts)
    return compressed if len(compressed) < len(s) else s
`,hints:["Iterate through the string tracking the current character and its count.",'When the character changes, append "char + count" to your result.',"Don't forget to append the last character run after the loop ends.","Build with a list and join — string concatenation in a loop is O(n²)."]},{id:"remove-dups",title:"Remove Dups from Linked List",difficulty:"easy",category:"Linked Lists",description:`## Remove Dups

Write code to remove duplicates from an **unsorted** linked list.

**Follow Up:** How would you solve this if a temporary buffer is not allowed?

**Example:**
\`\`\`
Input:  1 → 2 → 3 → 2 → 1
Output: 1 → 2 → 3
\`\`\`

**Note:** For this problem, represent the linked list as a Python list for simplicity and return the deduplicated list.
`,starterCode:`def remove_dups(values: list) -> list:
    """
    Remove duplicates from the list while preserving order.
    First occurrence of each value is kept.

    Example: [1, 2, 3, 2, 1] -> [1, 2, 3]
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ([1, 2, 3, 2, 1],         [1, 2, 3]),
        ([1, 1, 1, 1],             [1]),
        ([],                        []),
        ([1],                       [1]),
        ([1, 2, 3],                 [1, 2, 3]),
        ([3, 1, 2, 1, 3, 2],       [3, 1, 2]),
        ([1, 2, 3, 4, 5, 1, 2],    [1, 2, 3, 4, 5]),
    ]
    passed = 0
    for vals, expected in cases:
        result = remove_dups(vals[:])
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] remove_dups({vals}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def remove_dups(values: list) -> list:
    seen = set()
    result = []
    for v in values:
        if v not in seen:
            seen.add(v)
            result.append(v)
    return result
`,hints:["Use a set to track values you have already seen.","Iterate through the list once; skip values already in the set.","This approach is O(n) time and O(n) space.","Follow-up (no buffer): use two pointers — O(n²) time, O(1) space."]},{id:"stack-min",title:"Stack Min",difficulty:"easy",category:"Stacks & Queues",description:`## Stack Min

Design a stack that, in addition to \`push\` and \`pop\`, has a function \`min\` which returns the minimum element.

**Push**, **pop** and **min** should all operate in **O(1)** time.

**Example:**
\`\`\`
s = MinStack()
s.push(5)
s.push(3)
s.push(7)
s.min()   # → 3
s.pop()   # removes 7
s.pop()   # removes 3
s.min()   # → 5
\`\`\`
`,starterCode:`class MinStack:
    def __init__(self):
        # Your initialization here
        pass

    def push(self, val: int) -> None:
        # Your code here
        pass

    def pop(self) -> int:
        # Your code here
        pass

    def peek(self) -> int:
        # Your code here
        pass

    def min(self) -> int:
        # Return the current minimum in O(1)
        pass

    def is_empty(self) -> bool:
        pass
`,testCode:`
def run_tests():
    passed = 0
    total = 0

    def check(condition, msg):
        nonlocal passed, total
        total += 1
        if condition:
            passed += 1
            print(f"[PASS] {msg}")
        else:
            print(f"[FAIL] {msg}")

    s = MinStack()
    s.push(5)
    s.push(3)
    s.push(7)
    s.push(1)
    check(s.min() == 1, "min() after pushing 5,3,7,1 → 1")
    s.pop()
    check(s.min() == 3, "min() after popping 1 → 3")
    s.pop()
    check(s.min() == 3, "min() after popping 7 → 3")
    s.pop()
    check(s.min() == 5, "min() after popping 3 → 5")

    s2 = MinStack()
    s2.push(2)
    s2.push(2)
    s2.push(2)
    check(s2.min() == 2, "min() with all equal values → 2")
    s2.pop()
    check(s2.min() == 2, "min() after popping duplicate → 2")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,solution:`class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # parallel min tracker

    def push(self, val: int) -> None:
        self.stack.append(val)
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self) -> int:
        self.min_stack.pop()
        return self.stack.pop()

    def peek(self) -> int:
        return self.stack[-1] if self.stack else None

    def min(self) -> int:
        return self.min_stack[-1] if self.min_stack else None

    def is_empty(self) -> bool:
        return len(self.stack) == 0
`,hints:["Maintain a second stack that tracks the minimum at each level.","When you push, push the new minimum onto the min stack too.","When you pop, pop from the min stack as well.","The top of the min stack is always the current minimum."]},{id:"triple-step",title:"Triple Step",difficulty:"easy",category:"Recursion & DP",description:`## Triple Step

A child is running up a staircase with **n** steps and can hop either **1 step**, **2 steps**, or **3 steps** at a time.

Implement a method to count how many possible ways the child can run up the stairs.

**Examples:**
\`\`\`
n=1 → 1   (just 1-step)
n=2 → 2   (1+1 or 2)
n=3 → 4   (1+1+1, 1+2, 2+1, 3)
n=4 → 7
\`\`\`
`,starterCode:`def count_ways(n: int) -> int:
    """
    Count the number of ways to climb n stairs,
    taking 1, 2, or 3 steps at a time.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        (0,  1),
        (1,  1),
        (2,  2),
        (3,  4),
        (4,  7),
        (5,  13),
        (6,  24),
        (10, 274),
    ]
    passed = 0
    for n, expected in cases:
        result = count_ways(n)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] count_ways({n}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def count_ways(n: int) -> int:
    if n < 0:
        return 0
    memo = {0: 1, 1: 1, 2: 2}

    def dp(k):
        if k in memo:
            return memo[k]
        memo[k] = dp(k-1) + dp(k-2) + dp(k-3)
        return memo[k]

    return dp(n)
`,hints:["Think recursively: count_ways(n) = count_ways(n-1) + count_ways(n-2) + count_ways(n-3)","What are the base cases? (n=0, n=1, n=2)","The naive recursion is exponential — add memoization.","Or solve bottom-up with a DP table."]},{id:"one-away",title:"One Away",difficulty:"medium",category:"Arrays & Strings",description:`## One Away

There are three types of edits that can be performed on strings:
- **Insert** a character
- **Remove** a character
- **Replace** a character

Given two strings, write a function to check if they are **one edit (or zero edits) away**.

**Examples:**
\`\`\`
("pale", "ple")   → True   (remove 'a')
("pales", "pale") → True   (remove 's')
("pale", "bale")  → True   (replace 'p' with 'b')
("pale", "bake")  → False  (two replacements)
\`\`\`
`,starterCode:`def one_away(s1: str, s2: str) -> bool:
    """
    Return True if s1 and s2 are at most one edit apart.
    An edit is: insert, remove, or replace one character.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ("pale",  "ple",   True),
        ("pales", "pale",  True),
        ("pale",  "bale",  True),
        ("pale",  "bake",  False),
        ("",      "",      True),
        ("a",     "",      True),
        ("",      "a",     True),
        ("abc",   "abc",   True),
        ("abc",   "abcd",  True),
        ("abc",   "ab",    True),
        ("abc",   "xyz",   False),
        ("a",     "ab",    True),
    ]
    passed = 0
    for s1, s2, expected in cases:
        result = one_away(s1, s2)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] one_away({repr(s1)}, {repr(s2)}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def one_away(s1: str, s2: str) -> bool:
    if abs(len(s1) - len(s2)) > 1:
        return False

    if len(s1) == len(s2):
        # Check for one replacement
        diff = sum(1 for a, b in zip(s1, s2) if a != b)
        return diff <= 1

    # Check for one insert/remove (make s1 the shorter one)
    if len(s1) > len(s2):
        s1, s2 = s2, s1

    i = j = 0
    diff = 0
    while i < len(s1) and j < len(s2):
        if s1[i] != s2[j]:
            diff += 1
            if diff > 1:
                return False
            j += 1  # skip one char in the longer string
        else:
            i += 1
            j += 1
    return True
`,hints:["Split into two cases: same length (replacement only) vs length differs by 1 (insert/remove).","If lengths differ by more than 1, return False immediately.","For same length: count positions where characters differ — must be ≤ 1.","For length difference: use two pointers; when characters differ, only advance the longer string pointer."]},{id:"rotate-matrix",title:"Rotate Matrix",difficulty:"medium",category:"Arrays & Strings",description:`## Rotate Matrix

Given an image represented by an **N×N** matrix, write a method to rotate the image by **90 degrees clockwise**.

Can you do this **in place**?

**Example:**
\`\`\`
Input:           Output (90° CW):
1 2 3            7 4 1
4 5 6    →       8 5 2
7 8 9            9 6 3
\`\`\`
`,starterCode:`def rotate_90_cw(matrix: list) -> list:
    """
    Rotate an NxN matrix 90 degrees clockwise in place.
    Returns the rotated matrix.

    Approach: transpose then reverse each row.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ([[1]],
         [[1]]),
        ([[1,2],[3,4]],
         [[3,1],[4,2]]),
        ([[1,2,3],[4,5,6],[7,8,9]],
         [[7,4,1],[8,5,2],[9,6,3]]),
        ([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],
         [[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]),
    ]
    passed = 0
    for matrix, expected in cases:
        import copy
        m = copy.deepcopy(matrix)
        result = rotate_90_cw(m)
        if result is None:
            result = m
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] rotate input {matrix}")
        print(f"       expected {expected}")
        print(f"       got      {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def rotate_90_cw(matrix: list) -> list:
    n = len(matrix)
    # Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row
    for row in matrix:
        row.reverse()
    return matrix
`,hints:["A 90° clockwise rotation can be broken into two steps.","Step 1: Transpose the matrix (swap [i][j] with [j][i]).","Step 2: Reverse each row.","Work layer by layer from outside in for a pure in-place approach."]},{id:"partition-list",title:"Partition Linked List",difficulty:"medium",category:"Linked Lists",description:`## Partition

Write code to partition a list around a value **x**, such that all elements **less than x** come before all elements **greater than or equal to x**.

The element x can appear anywhere in the "right partition".

**Example:**
\`\`\`
Input:  [3, 5, 8, 5, 10, 2, 1], x = 5
Output: [3, 2, 1, 5, 8, 5, 10]  (any valid partition is acceptable)
\`\`\`
`,starterCode:`def partition(values: list, x: int) -> list:
    """
    Partition values around x so all elements < x come first.
    Relative order within each partition need not be preserved.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    def is_valid_partition(result, x):
        """Verify all elements < x come before all elements >= x."""
        found_ge = False
        for v in result:
            if v >= x:
                found_ge = True
            elif found_ge:
                return False  # found < x after a >= x element
        return True

    cases = [
        ([3, 5, 8, 5, 10, 2, 1], 5),
        ([1, 2, 3, 4, 5],        3),
        ([5, 4, 3, 2, 1],        3),
        ([1],                    5),
        ([],                     5),
        ([3, 3, 3],              3),
    ]
    passed = 0
    for values, x in cases:
        result = partition(values[:], x)

        # check element preservation
        valid = (
            sorted(result) == sorted(values) and
            is_valid_partition(result, x)
        )
        status = "PASS" if valid else "FAIL"
        if valid:
            passed += 1
        print(f"[{status}] partition({values}, x={x}) => {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def partition(values: list, x: int) -> list:
    less = []
    greater_equal = []
    for v in values:
        if v < x:
            less.append(v)
        else:
            greater_equal.append(v)
    return less + greater_equal
`,hints:["Two-list approach: collect elements < x in one list, >= x in another.","Concatenate at the end.",'For a linked list version: create two "mini lists" (less head/tail and greater head/tail), then connect them.']},{id:"sum-lists",title:"Sum Lists",difficulty:"medium",category:"Linked Lists",description:`## Sum Lists

You have two numbers represented as lists, where each element contains a single digit. The digits are stored in **reverse order** (1's digit first).

Write a function that adds the two numbers and returns the sum as a list (also in reverse order).

**Example:**
\`\`\`
Input:  [7, 1, 6] + [5, 9, 2]   →  617 + 295
Output: [2, 1, 9]               →  912
\`\`\`
`,starterCode:`def sum_lists(a: list, b: list) -> list:
    """
    Add two numbers represented as reversed digit lists.

    [7, 1, 6] represents 617
    [5, 9, 2] represents 295
    Result [2, 1, 9] represents 912
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ([7,1,6], [5,9,2], [2,1,9]),
        ([0],     [0],     [0]),
        ([9,9],   [1],     [0,0,1]),
        ([1],     [9,9],   [0,0,1]),
        ([5],     [5],     [0,1]),
        ([1,2,3], [4,5,6], [5,7,9]),
    ]
    passed = 0
    for a, b, expected in cases:
        result = sum_lists(a[:], b[:])
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] sum_lists({a}, {b}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def sum_lists(a: list, b: list) -> list:
    result = []
    carry = 0
    i = j = 0
    while i < len(a) or j < len(b) or carry:
        digit_a = a[i] if i < len(a) else 0
        digit_b = b[j] if j < len(b) else 0
        total = digit_a + digit_b + carry
        result.append(total % 10)
        carry = total // 10
        if i < len(a): i += 1
        if j < len(b): j += 1
    return result
`,hints:["Iterate through both lists simultaneously, adding digit by digit.","Track a carry variable — if sum >= 10, carry 1 to the next position.","Continue while either list has digits OR there's a carry.","The result digit at each position is (a[i] + b[j] + carry) % 10; new carry is (sum) // 10."]},{id:"sort-stack",title:"Sort Stack",difficulty:"medium",category:"Stacks & Queues",description:"## Sort Stack\n\nWrite a program to sort a stack such that the **smallest items are on the top**.\n\nYou can use **one additional temporary stack**, but you may not copy elements into any other data structure (such as an array).\n\nThe stack supports: `push`, `pop`, `peek`, and `is_empty`.\n\n**Example:**\n```\nInput stack (top first): [1, 3, 9, 5, 8]\nOutput stack (top first): [1, 3, 5, 8, 9]\n```\n",starterCode:`def sort_stack(stack: list) -> list:
    """
    Sort the stack (list) so smallest element is at the top (end of list).
    Only use one extra stack (list). No arrays/other data structures.

    stack[-1] is the top.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ([5, 8, 9, 3, 1],  [9, 8, 5, 3, 1]),
        ([1],               [1]),
        ([],                []),
        ([2, 1],            [2, 1]),
        ([1, 2, 3, 4, 5],  [5, 4, 3, 2, 1]),
        ([5, 4, 3, 2, 1],  [5, 4, 3, 2, 1]),
    ]
    passed = 0
    for stack_in, expected in cases:
        result = sort_stack(stack_in[:])
        # expected: bottom to top (index 0 = bottom, last = top which is smallest)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] sort_stack({stack_in}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def sort_stack(stack: list) -> list:
    temp = []
    while stack:
        val = stack.pop()
        # Move elements from temp back to stack that are smaller than val
        while temp and temp[-1] < val:
            stack.append(temp.pop())
        temp.append(val)
    return temp  # temp has largest at bottom, smallest at top
`,hints:["Use a temporary stack to build the sorted order.","Pop from the input stack; while temp's top is less than the value, move it back.","Then push the value onto temp.","Repeat until input is empty — temp will be sorted (smallest on top)."]},{id:"bfs-path",title:"BFS Path Finding",difficulty:"medium",category:"Graphs",description:`## Route Between Nodes

Given a **directed graph**, design an algorithm to find out whether there is a route between two nodes.

**Example:**
\`\`\`
Graph: A→E, B→C, D→E
find_path(A, E) → True
find_path(A, D) → False
\`\`\`

For this problem, the graph is given as an **adjacency dictionary**.
`,starterCode:`from collections import deque

def has_path(graph: dict, start: str, end: str) -> bool:
    """
    Return True if there is a directed path from start to end in graph.

    graph = {'A': ['B', 'C'], 'B': ['D'], ...}
    """
    # Your code here
    pass
`,testCode:`
from collections import deque

def run_tests():
    g = {
        'A': ['E'],
        'B': ['C'],
        'C': [],
        'D': ['E'],
        'E': [],
    }
    cases = [
        (g, 'A', 'E', True),
        (g, 'A', 'D', False),
        (g, 'B', 'C', True),
        (g, 'C', 'B', False),
        (g, 'A', 'A', True),
        (g, 'D', 'E', True),
        (g, 'E', 'A', False),
    ]

    g_cycle = {'X': ['Y'], 'Y': ['Z'], 'Z': ['X']}
    cases.append((g_cycle, 'X', 'Z', True))
    cases.append((g_cycle, 'X', 'W', False))

    passed = 0
    for graph, start, end, expected in cases:
        result = has_path(graph, start, end)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] has_path(graph, {repr(start)}, {repr(end)}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`from collections import deque

def has_path(graph: dict, start: str, end: str) -> bool:
    if start == end:
        return True
    visited = set()
    q = deque([start])
    visited.add(start)
    while q:
        node = q.popleft()
        if node == end:
            return True
        for neighbour in graph.get(node, []):
            if neighbour not in visited:
                visited.add(neighbour)
                q.append(neighbour)
    return False
`,hints:["Use BFS (breadth-first search) with a visited set to avoid cycles.","Start with the source node in a queue.","At each step, dequeue a node, check if it is the target, then enqueue unvisited neighbors.","Return True immediately if you find the target; return False if the queue empties."]},{id:"balanced-bst",title:"Balanced BST from Array",difficulty:"medium",category:"Trees & BSTs",description:`## Minimal Tree

Given a **sorted** (ascending) array with unique integer elements, write an algorithm to create a **binary search tree with minimal height**.

**Example:**
\`\`\`
Input:  [1, 2, 3, 4, 5, 6, 7]

        4
       / \\
      2   6
     / \\ / \\
    1  3 5  7
\`\`\`

Return the height of the resulting tree (for testing purposes).
`,starterCode:`def min_height_bst(arr: list) -> int:
    """
    Build a minimal-height BST from a sorted array.
    Return the height of the resulting BST.

    Height of empty tree = 0
    Height of single node = 1
    """
    # Your code here
    pass
`,testCode:`
import math

def run_tests():
    cases = [
        ([],           0),
        ([1],          1),
        ([1, 2],       2),
        ([1, 2, 3],    2),
        ([1,2,3,4,5,6,7], 3),
        (list(range(1, 16)), 4),   # 15 nodes → height 4
    ]
    passed = 0
    for arr, expected_max_height in cases:
        result = min_height_bst(arr[:])
        # For a minimal BST of n nodes, height should be ceil(log2(n+1))
        n = len(arr)
        min_possible = math.ceil(math.log2(n + 1)) if n > 0 else 0
        valid = (result == expected_max_height) or (n > 0 and result == min_possible)
        status = "PASS" if result == expected_max_height else "FAIL"
        if result == expected_max_height:
            passed += 1
        print(f"[{status}] min_height_bst({arr}) => height={result} (expected {expected_max_height})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def min_height_bst(arr: list) -> int:
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node_val = arr[mid]  # noqa: F841 – used conceptually
        left  = build(lo, mid - 1)
        right = build(mid + 1, hi)
        # return height
        left_h  = left  if isinstance(left,  int) else 0
        right_h = right if isinstance(right, int) else 0
        return 1 + max(left_h, right_h)

    def height(lo, hi):
        if lo > hi:
            return 0
        mid = (lo + hi) // 2
        return 1 + max(height(lo, mid - 1), height(mid + 1, hi))

    if not arr:
        return 0
    return height(0, len(arr) - 1)
`,hints:["To minimize height, always pick the middle element as the root.","Recursively do the same for the left and right halves.","This is essentially a binary search pattern applied to tree construction.","The resulting height will be ceil(log2(n+1)) for n nodes."]},{id:"magic-index",title:"Magic Index",difficulty:"medium",category:"Recursion & DP",description:`## Magic Index

A **magic index** in an array \`A[0..n-1]\` is defined such that \`A[i] == i\`.

Given a **sorted array of distinct integers**, write a method to find a magic index if one exists.

**Examples:**
\`\`\`
[-10, -5, 0, 3, 7]  → 3   (A[3] == 3)
[0, 4, 5, 6, 7]     → 0   (A[0] == 0)
[-10, -9, -2, -1]   → None
\`\`\`

**Follow-up:** What if values are not distinct?
`,starterCode:`def magic_index(arr: list):
    """
    Find index i such that arr[i] == i, or return None.
    Assume sorted array with distinct integers.
    Use binary search: O(log n).
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ([],                        None),
        ([0],                       0),
        ([1],                       None),
        ([0, 1, 2, 3, 4],           0),  # any valid magic index acceptable
        ([0, 4, 5, 6, 7],           0),
        ([-10, -5, 0, 3, 7],        3),
        ([-10, -9, -2, -1, 4, 5, 7], 4),
        ([-10, -9, -2, -1, 4],      4),
        ([-10, -9, -2, -3, 4, 5, 7], None),
    ]
    passed = 0
    for arr, expected in cases:
        result = magic_index(arr[:])
        # For arrays with multiple magic indices, any valid one is acceptable
        if expected is None:
            valid = result is None
        else:
            valid = (result is not None and 0 <= result < len(arr) and arr[result] == result)
        status = "PASS" if valid else "FAIL"
        if valid:
            passed += 1
        print(f"[{status}] magic_index({arr}) => {result} (expected a magic index)")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def magic_index(arr: list):
    def search(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        if arr[mid] == mid:
            return mid
        elif arr[mid] < mid:
            return search(mid + 1, hi)
        else:
            return search(lo, mid - 1)

    return search(0, len(arr) - 1)
`,hints:["This screams binary search — the array is sorted.","If arr[mid] == mid, found it.","If arr[mid] < mid (value is less than index), the magic index must be to the right.","If arr[mid] > mid, the magic index must be to the left."]},{id:"coin-change",title:"Coin Change (Ways)",difficulty:"medium",category:"Recursion & DP",description:`## Coins

Given an infinite number of quarters (25¢), dimes (10¢), nickels (5¢), and pennies (1¢), write code to calculate the number of ways to represent **n cents**.

**Examples:**
\`\`\`
represent(10) → 4
  (10, 5+5, 5+1+1+1+1+1, 1+1+...+1)

represent(0)  → 1  (one way: use no coins)
\`\`\`
`,starterCode:`def represent(n: int) -> int:
    """
    Count the number of ways to make n cents using
    quarters (25), dimes (10), nickels (5), and pennies (1).
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        (0,  1),
        (1,  1),
        (5,  2),
        (10, 4),
        (15, 6),
        (25, 13),
        (100, 242),
    ]
    passed = 0
    for n, expected in cases:
        result = represent(n)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] represent({n}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def represent(n: int) -> int:
    coins = [25, 10, 5, 1]
    dp = [0] * (n + 1)
    dp[0] = 1  # one way to make 0 cents
    for coin in coins:
        for amount in range(coin, n + 1):
            dp[amount] += dp[amount - coin]
    return dp[n]
`,hints:["Classic unbounded knapsack / change-making DP.","dp[amount] = number of ways to make that amount.","For each coin, update amounts from coin to n: dp[a] += dp[a - coin].","Process each coin type in an outer loop to avoid counting permutations as different combinations."]},{id:"topological-sort",title:"Topological Sort (Build Order)",difficulty:"medium",category:"Graphs",description:`## Build Order

You are given a list of **projects** and a list of **dependencies** (pairs where the second project depends on the first). All dependencies must be built before the dependent project.

Find a **build order** that satisfies all dependencies. If no valid order exists (cycle), return \`None\`.

**Example:**
\`\`\`
projects: ["a","b","c","d","e","f"]
dependencies: [("a","d"),("f","b"),("b","d"),("f","a"),("d","c")]
Output: ["f","e","b","a","d","c"]  (one valid order)
\`\`\`
`,starterCode:`def build_order(projects: list, dependencies: list):
    """
    Return a valid build order (list), or None if a cycle exists.
    Uses Kahn's algorithm (BFS topological sort).
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    def is_valid_order(order, projects, dependencies):
        if order is None:
            return False
        if sorted(order) != sorted(projects):
            return False
        pos = {p: i for i, p in enumerate(order)}
        for before, after in dependencies:
            if pos[before] >= pos[after]:
                return False
        return True

    cases = [
        (["a","b","c","d","e","f"],
         [("a","d"),("f","b"),("b","d"),("f","a"),("d","c")],
         True),
        (["a","b","c"],
         [],
         True),
        (["a","b"],
         [("a","b"),("b","a")],
         False),  # cycle
        (["a"],
         [],
         True),
    ]
    passed = 0
    for projects, deps, should_succeed in cases:
        result = build_order(projects[:], deps[:])
        if should_succeed:
            valid = is_valid_order(result, projects, deps)
        else:
            valid = result is None
        status = "PASS" if valid else "FAIL"
        if valid:
            passed += 1
        print(f"[{status}] build_order({projects}) => {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`from collections import deque

def build_order(projects: list, dependencies: list):
    graph = {p: [] for p in projects}
    in_degree = {p: 0 for p in projects}

    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    q = deque([p for p in projects if in_degree[p] == 0])
    order = []

    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)

    return order if len(order) == len(projects) else None
`,hints:["Kahn's algorithm: start with nodes that have no dependencies (in-degree 0).","After 'processing' a node, reduce the in-degree of its dependents.","When a dependent reaches in-degree 0, add it to the queue.","If the final order has fewer nodes than the project list, there is a cycle."]},{id:"loop-detection",title:"Loop Detection",difficulty:"hard",category:"Linked Lists",description:`## Loop Detection

Given a **circular linked list**, implement an algorithm that returns the **node at the beginning of the loop**.

**Definition:** A circular linked list is one where a node's \`next\` pointer points to an earlier node, creating a loop.

**Example:**
\`\`\`
A → B → C → D → E → C  (C is the start of the loop)
Output: C
\`\`\`

For this problem, represent the list as a Python list and an integer \`loop_start\` index. Return the index of the loop start.
`,starterCode:`def find_loop_start(values: list, loop_start_idx: int) -> int:
    """
    Given a list where index loop_start_idx creates a cycle
    (the "tail" connects back to loop_start_idx), find the loop start.

    Use Floyd's cycle detection algorithm.
    Returns the index of the loop start node.
    """
    # Your code here
    # Build an actual linked list and detect the cycle start
    pass
`,testCode:`
def run_tests():
    cases = [
        ([1, 2, 3, 4, 5], 2),       # loop starts at index 2 (value 3)
        ([1, 2, 3, 4, 5], 0),       # loop starts at index 0 (value 1)
        ([1, 2, 3, 4, 5], 4),       # loop starts at index 4 (value 5)
        ([1, 2],          0),
        ([1, 2, 3],       1),
    ]
    passed = 0
    for values, loop_idx in cases:
        result = find_loop_start(values[:], loop_idx)
        status = "PASS" if result == loop_idx else "FAIL"
        if result == loop_idx:
            passed += 1
        print(f"[{status}] find_loop_start({values}, loop_at={loop_idx}) => {result} (expected {loop_idx})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def find_loop_start(values: list, loop_start_idx: int) -> int:
    # Build linked list
    class Node:
        def __init__(self, v): self.v = v; self.next = None

    nodes = [Node(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    nodes[-1].next = nodes[loop_start_idx]  # create loop

    # Floyd's algorithm
    slow = fast = nodes[0]
    while True:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break

    # Find loop start: move one pointer to head
    slow = nodes[0]
    while slow is not fast:
        slow = slow.next
        fast = fast.next

    # Find index
    for i, n in enumerate(nodes):
        if n is slow:
            return i
    return -1
`,hints:["Use Floyd's cycle detection: fast pointer moves 2x, slow moves 1x.","When they meet, reset slow to the head.","Move both at speed 1 — they meet at the loop start.","The math: let F = distance to loop start, C = cycle length. When they first meet, slow has traveled F + k steps."]},{id:"list-of-depths",title:"List of Depths",difficulty:"hard",category:"Trees & BSTs",description:`## List of Depths

Given a binary tree, design an algorithm which creates a list of all the nodes at each depth.

If you have a tree with depth D, you will have D lists.

**Example:**
\`\`\`
       4
      / \\
     2   6
    / \\ / \\
   1  3 5  7

Output:
  Depth 1: [4]
  Depth 2: [2, 6]
  Depth 3: [1, 3, 5, 7]
\`\`\`

Return a list of lists of node values.
`,starterCode:`def list_of_depths(values: list) -> list:
    """
    Build a BST from values (insert in order), then return
    a list of lists: one list per depth level (BFS order).

    list_of_depths([4, 2, 6, 1, 3, 5, 7]) → [[4], [2, 6], [1, 3, 5, 7]]
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ([4, 2, 6, 1, 3, 5, 7],   [[4], [2, 6], [1, 3, 5, 7]]),
        ([1],                      [[1]]),
        ([],                       []),
        ([2, 1, 3],                [[2], [1, 3]]),
        ([5, 3, 7, 2, 4, 6, 8],   [[5], [3, 7], [2, 4, 6, 8]]),
    ]
    passed = 0
    for values, expected in cases:
        result = list_of_depths(values[:])
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] list_of_depths({values})")
        print(f"         expected {expected}")
        print(f"         got      {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`from collections import deque

def list_of_depths(values: list) -> list:
    if not values:
        return []

    # Build BST
    class Node:
        def __init__(self, v): self.v = v; self.left = self.right = None

    def insert(root, v):
        if not root: return Node(v)
        if v < root.v:  root.left  = insert(root.left, v)
        else:           root.right = insert(root.right, v)
        return root

    root = None
    for v in values:
        root = insert(root, v)

    # BFS to collect levels
    result = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.v)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result
`,hints:["BFS naturally visits nodes level by level.","At each BFS iteration, process all nodes currently in the queue (that is one full level).","Use len(queue) at the start of each level to know how many nodes belong to that level — don't process nodes added during this level.","Build the BST by standard insert; then run BFS."]},{id:"validate-bst",title:"Validate BST",difficulty:"hard",category:"Trees & BSTs",description:`## Validate BST

Implement a function to check if a binary tree is a **binary search tree**.

**BST Property:** For every node, all values in the left subtree are strictly less than the node, and all values in the right subtree are strictly greater.

**Examples:**
\`\`\`
       5
      / \\
     3   7     →  True (valid BST)
    / \\
   2   4

       5
      / \\
     3   7     →  False (6 is in left subtree of 7 but > 5)
    / \\
   2   6
\`\`\`
`,starterCode:`def is_valid_bst(values: list) -> bool:
    """
    Build a BST from the given values list by inserting in order,
    then validate that the resulting tree satisfies BST properties.

    Uses the min/max bounds approach.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    # We test is_valid_bst by building valid and invalid trees manually
    class Node:
        def __init__(self, v): self.v = v; self.left = self.right = None

    def check_bst(root, lo=float('-inf'), hi=float('inf')):
        if not root: return True
        if root.v <= lo or root.v >= hi: return False
        return check_bst(root.left, lo, root.v) and check_bst(root.right, root.v, hi)

    # Build valid BST
    root1 = Node(5)
    root1.left = Node(3); root1.right = Node(7)
    root1.left.left = Node(2); root1.left.right = Node(4)

    # Build invalid tree (6 is wrong position)
    root2 = Node(5)
    root2.left = Node(3); root2.right = Node(7)
    root2.left.left = Node(2); root2.left.right = Node(6)  # 6 > 5, wrong side!

    cases = [
        (root1, True),
        (root2, False),
        (Node(1), True),
        (None, True),
    ]

    passed = 0
    for root, expected in cases:
        result = check_bst(root)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        root_val = root.v if root else "None"
        print(f"[{status}] is_valid_bst(root={root_val}) => {result} (expected {expected})")

    # Also test our function via a wrapper
    print("\\nTesting is_valid_bst wrapper:")
    def insert(root, v):
        if not root:
            n = Node(v); return n
        if v < root.v: root.left = insert(root.left, v)
        else: root.right = insert(root.right, v)
        return root

    r = None
    for v in [5, 3, 7, 2, 4]:
        r = insert(r, v)
    result_valid = check_bst(r)
    passed += result_valid
    print(f"[{'PASS' if result_valid else 'FAIL'}] Valid BST from [5,3,7,2,4] => {result_valid}")

    print(f"\\n{passed}/{len(cases)+1} tests passed")

run_tests()
`,solution:`def is_valid_bst(values: list) -> bool:
    class Node:
        def __init__(self, v): self.v = v; self.left = self.right = None

    def insert(root, v):
        if not root: return Node(v)
        if v < root.v: root.left  = insert(root.left, v)
        else:          root.right = insert(root.right, v)
        return root

    def validate(node, lo, hi):
        if not node: return True
        if node.v <= lo or node.v >= hi: return False
        return validate(node.left, lo, node.v) and validate(node.right, node.v, hi)

    root = None
    for v in values:
        root = insert(root, v)

    return validate(root, float('-inf'), float('inf'))
`,hints:["Local parent-child checks are not enough — a node must satisfy ALL ancestor constraints.","Pass down a (min, max) range for each node: left child inherits max=parent, right child inherits min=parent.","Return False immediately if a value falls outside its valid range.","Inorder traversal approach: if the sequence is strictly increasing, it is a valid BST."]},{id:"first-common-ancestor",title:"First Common Ancestor",difficulty:"hard",category:"Trees & BSTs",description:`## First Common Ancestor

Design an algorithm to find the **first common ancestor** of two nodes in a binary tree.

Avoid storing additional nodes in a data structure.

**Note:** This is **not** necessarily a binary search tree.

**Example:**
\`\`\`
       8
      / \\
     3   1
    / \\
   2   4

FCA(2, 4) = 3
FCA(2, 3) = 3
FCA(2, 1) = 8
\`\`\`
`,starterCode:`def first_common_ancestor(root, val_a: int, val_b: int) -> int:
    """
    Find the first common ancestor of nodes with values val_a and val_b.
    root is a TreeNode with .val, .left, .right attributes.
    Returns the value of the common ancestor, or None if not found.
    """
    # Your code here
    pass
`,testCode:`
class TreeNode:
    def __init__(self, v): self.val = v; self.left = self.right = None

def run_tests():
    # Build tree:    8
    #              / \\
    #             3   1
    #            / \\
    #           2   4
    root = TreeNode(8)
    root.left = TreeNode(3)
    root.right = TreeNode(1)
    root.left.left = TreeNode(2)
    root.left.right = TreeNode(4)

    cases = [
        (root, 2, 4, 3),
        (root, 2, 3, 3),
        (root, 2, 1, 8),
        (root, 3, 1, 8),
        (root, 2, 8, 8),
        (root, 3, 4, 3),
    ]
    passed = 0
    for r, a, b, expected in cases:
        result = first_common_ancestor(r, a, b)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] FCA({a}, {b}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,solution:`def first_common_ancestor(root, val_a: int, val_b: int) -> int:
    def helper(node, a, b):
        """Returns (ancestor_node, found_a, found_b)"""
        if not node:
            return None, False, False

        left_anc, la, lb = helper(node.left, a, b)
        if left_anc:
            return left_anc, True, True

        right_anc, ra, rb = helper(node.right, a, b)
        if right_anc:
            return right_anc, True, True

        found_a = la or ra or (node.val == a)
        found_b = lb or rb or (node.val == b)

        if found_a and found_b:
            return node, True, True
        return None, found_a, found_b

    anc, _, _ = helper(root, val_a, val_b)
    return anc.val if anc else None
`,hints:["Post-order DFS: process children before the current node.","Each call reports back whether it found node a and/or node b.","The first node where both a and b have been found (one in each subtree, or one is the current node) is the answer.","Return the ancestor immediately if found — no need to continue searching."]},{id:"permutations",title:"Permutations Without Dups",difficulty:"hard",category:"Recursion & DP",description:`## Permutations Without Dups

Write a method to compute all **permutations** of a string of unique characters.

**Example:**
\`\`\`
permutations("abc") → ["abc", "acb", "bac", "bca", "cab", "cba"]
\`\`\`

Return all permutations as a sorted list.
`,starterCode:`def permutations(s: str) -> list:
    """
    Return all permutations of the string s (unique characters).
    Return as a sorted list of strings.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    cases = [
        ("",    [""]),
        ("a",   ["a"]),
        ("ab",  ["ab", "ba"]),
        ("abc", sorted(["abc","acb","bac","bca","cab","cba"])),
    ]
    passed = 0
    for s, expected in cases:
        result = sorted(permutations(s))
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] permutations({repr(s)}) => {result}")
        if result != expected:
            print(f"         expected {expected}")

    # Check count for length 4
    result4 = permutations("abcd")
    count_ok = len(result4) == 24
    print(f"[{'PASS' if count_ok else 'FAIL'}] len(permutations('abcd')) == 24 => {len(result4)}")
    if count_ok: passed += 1

    print(f"\\n{passed}/{len(cases)+1} tests passed")

run_tests()
`,solution:`def permutations(s: str) -> list:
    if len(s) == 0:
        return [""]
    if len(s) == 1:
        return [s]

    result = []
    for i, char in enumerate(s):
        rest = s[:i] + s[i+1:]
        for perm in permutations(rest):
            result.append(char + perm)
    return result
`,hints:["For each character, 'choose' it as the first character, then recursively permute the rest.","Base case: empty string has one permutation (empty string).","Remove the chosen character from the remaining string and recurse.","Total permutations of n unique chars = n! — verify your output count."]},{id:"event-log-analyzer",title:"Event Log Analyzer",difficulty:"hard",category:"Real World",description:`## Event Log Analyzer

You're given a list of event logs. Each event has:
\`\`\`python
{
    "timestamp": "2024-02-12T10:30:00Z",
    "event_type": "click",
    "user_id": "user123",
    "properties": {"page": "/home"}
}
\`\`\`

**Part 1:** \`summarize(events)\` — Group by event_type, count occurrences.
Returns: \`[{"event_type": "click", "count": 3}, ...]\`

**Part 2:** \`most_active_user(events)\` — Return the user_id with the most events.

**Part 3:** \`events_per_hour(events)\` — Return a dict mapping hour (0-23) to event count.
`,starterCode:`def summarize(events: list) -> list:
    """
    Group events by event_type and count occurrences.
    Return list of {"event_type": ..., "count": ...} sorted by count descending.
    """
    # Your code here
    pass


def most_active_user(events: list) -> str:
    """Return the user_id with the most events."""
    # Your code here
    pass


def events_per_hour(events: list) -> dict:
    """
    Return a dict {hour: count} where hour is 0-23 (int).
    Only include hours that have events.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    events = [
        {"timestamp": "2024-02-12T10:30:00Z", "event_type": "click",    "user_id": "u1", "properties": {}},
        {"timestamp": "2024-02-12T10:45:00Z", "event_type": "click",    "user_id": "u2", "properties": {}},
        {"timestamp": "2024-02-12T11:00:00Z", "event_type": "purchase", "user_id": "u1", "properties": {}},
        {"timestamp": "2024-02-12T14:00:00Z", "event_type": "click",    "user_id": "u1", "properties": {}},
        {"timestamp": "2024-02-12T14:30:00Z", "event_type": "view",     "user_id": "u3", "properties": {}},
        {"timestamp": "2024-02-12T14:45:00Z", "event_type": "view",     "user_id": "u1", "properties": {}},
    ]

    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        status = "PASS" if cond else "FAIL"
        if cond: passed += 1
        print(f"[{status}] {msg}")

    summary = summarize(events)
    summary_dict = {s["event_type"]: s["count"] for s in summary}
    check(summary_dict.get("click") == 3,    "click count == 3")
    check(summary_dict.get("purchase") == 1, "purchase count == 1")
    check(summary_dict.get("view") == 2,     "view count == 2")

    active = most_active_user(events)
    check(active == "u1", f"most_active_user == 'u1' (got {repr(active)})")

    hourly = events_per_hour(events)
    check(hourly.get(10) == 2, f"hour 10 == 2 (got {hourly.get(10)})")
    check(hourly.get(11) == 1, f"hour 11 == 1 (got {hourly.get(11)})")
    check(hourly.get(14) == 3, f"hour 14 == 3 (got {hourly.get(14)})")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,solution:`def summarize(events: list) -> list:
    counts = {}
    for e in events:
        t = e["event_type"]
        counts[t] = counts.get(t, 0) + 1
    return sorted(
        [{"event_type": k, "count": v} for k, v in counts.items()],
        key=lambda x: x["count"], reverse=True
    )

def most_active_user(events: list) -> str:
    counts = {}
    for e in events:
        u = e["user_id"]
        counts[u] = counts.get(u, 0) + 1
    return max(counts, key=counts.get)

def events_per_hour(events: list) -> dict:
    hourly = {}
    for e in events:
        hour = int(e["timestamp"].split("T")[1].split(":")[0])
        hourly[hour] = hourly.get(hour, 0) + 1
    return hourly
`,hints:["Part 1: Use a dictionary to count each event_type.","Part 2: Use a dictionary to count events per user_id, then find the max.",'Part 3: Extract the hour from the timestamp string by splitting on "T" then ":".','Timestamps are ISO 8601 format: "2024-02-12T10:30:00Z" — hour is at position [1] of the time part.']},{id:"rate-limiter",title:"Rate Limiter",difficulty:"hard",category:"Real World",description:`## Rate Limiter System

**Part 1 — Binary Search:** Find the minimum tier for a given request volume.
\`\`\`python
tiers = [
    {"tier": "free",       "max_requests": 100},
    {"tier": "basic",      "max_requests": 1000},
    {"tier": "pro",        "max_requests": 10000},
    {"tier": "enterprise", "max_requests": 100000},
]
find_tier(5000, tiers) → "pro"
\`\`\`

**Part 2 — Recursion:** Calculate total leaf capacity in an infrastructure tree.
\`\`\`python
total_capacity(node) → sum of all leaf max_capacity values
\`\`\`

**Part 3 — Graph:** Calculate total cost of calling an endpoint (including all dependencies).
\`\`\`python
calculate_cost("/user/profile", graph) → 4  (1 + deps)
\`\`\`
`,starterCode:`# Part 1: Binary Search for tier
def find_tier(volume: int, tiers: list) -> str:
    """
    Find the minimum tier that can handle 'volume' requests.
    Tiers are sorted by max_requests ascending.
    Return tier name, or None if volume exceeds all tiers.
    """
    # Your code here
    pass


# Part 2: Recursive capacity
def total_leaf_capacity(node: dict) -> int:
    """
    Sum max_capacity of all LEAF nodes (no children) recursively.
    node = {"name": ..., "max_capacity": ..., "children": [...]}
    """
    # Your code here
    pass


# Part 3: Endpoint cost (DFS with memoization)
def calculate_cost(endpoint: str, graph: dict, memo: dict = None) -> int:
    """
    Total cost = base_cost + sum of all dependency costs.
    graph = {"/ep": {"base_cost": 1, "calls": ["/other", ...]}}
    Return -1 if a circular dependency is detected.
    """
    # Your code here
    pass
`,testCode:`
def run_tests():
    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        status = "PASS" if cond else "FAIL"
        if cond: passed += 1
        print(f"[{status}] {msg}")

    # Part 1
    tiers = [
        {"tier": "free",       "max_requests": 100},
        {"tier": "basic",      "max_requests": 1000},
        {"tier": "pro",        "max_requests": 10000},
        {"tier": "enterprise", "max_requests": 100000},
    ]
    check(find_tier(50,     tiers) == "free",       f"find_tier(50)     => {find_tier(50, tiers)}")
    check(find_tier(100,    tiers) == "free",       f"find_tier(100)    => {find_tier(100, tiers)}")
    check(find_tier(150,    tiers) == "basic",      f"find_tier(150)    => {find_tier(150, tiers)}")
    check(find_tier(5000,   tiers) == "pro",        f"find_tier(5000)   => {find_tier(5000, tiers)}")
    check(find_tier(200000, tiers) is None,         f"find_tier(200000) => {find_tier(200000, tiers)}")

    # Part 2
    infra = {
        "name": "global", "max_capacity": 100000,
        "children": [
            {"name": "us", "max_capacity": 40000, "children": [
                {"name": "us-1", "max_capacity": 20000, "children": []},
                {"name": "us-2", "max_capacity": 20000, "children": []},
            ]},
            {"name": "eu", "max_capacity": 60000, "children": [
                {"name": "eu-1", "max_capacity": 30000, "children": []},
                {"name": "eu-2", "max_capacity": 30000, "children": []},
            ]},
        ]
    }
    check(total_leaf_capacity(infra) == 100000, f"total_leaf_capacity => {total_leaf_capacity(infra)}")
    check(total_leaf_capacity({"name": "single", "max_capacity": 42, "children": []}) == 42, "leaf node => 42")

    # Part 3
    endpoints = {
        "/user/profile":  {"base_cost": 1, "calls": ["/user/settings", "/user/avatar"]},
        "/user/settings": {"base_cost": 1, "calls": []},
        "/user/avatar":   {"base_cost": 2, "calls": []},
        "/user/dashboard":{"base_cost": 1, "calls": ["/user/profile", "/user/notifications"]},
        "/user/notifications": {"base_cost": 3, "calls": ["/user/settings"]},
    }
    check(calculate_cost("/user/profile",  endpoints, {}) == 4, f"calculate_cost(/user/profile)  => {calculate_cost('/user/profile',  endpoints, {})}")
    check(calculate_cost("/user/settings", endpoints, {}) == 1, f"calculate_cost(/user/settings) => {calculate_cost('/user/settings', endpoints, {})}")
    check(calculate_cost("/user/dashboard",endpoints, {}) == 9, f"calculate_cost(/user/dashboard)=> {calculate_cost('/user/dashboard',endpoints, {})}")

    cycle_graph = {"/a": {"base_cost": 1, "calls": ["/b"]}, "/b": {"base_cost": 1, "calls": ["/a"]}}
    check(calculate_cost("/a", cycle_graph, {}) == -1, f"cycle detection => {calculate_cost('/a', cycle_graph, {})}")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,solution:`def find_tier(volume: int, tiers: list) -> str:
    lo, hi = 0, len(tiers) - 1
    result = None
    while lo <= hi:
        mid = (lo + hi) // 2
        if tiers[mid]["max_requests"] >= volume:
            result = tiers[mid]["tier"]
            hi = mid - 1
        else:
            lo = mid + 1
    return result

def total_leaf_capacity(node: dict) -> int:
    if not node["children"]:
        return node["max_capacity"]
    return sum(total_leaf_capacity(child) for child in node["children"])

def calculate_cost(endpoint: str, graph: dict, memo: dict = None) -> int:
    if memo is None:
        memo = {}

    def dfs(ep, visiting):
        if ep in memo:
            return memo[ep]
        if ep not in graph:
            return 0
        if ep in visiting:
            return -1  # cycle

        visiting.add(ep)
        cost = graph[ep]["base_cost"]
        for dep in graph[ep]["calls"]:
            dep_cost = dfs(dep, visiting)
            if dep_cost == -1:
                return -1
            cost += dep_cost
        visiting.discard(ep)
        memo[ep] = cost
        return cost

    return dfs(endpoint, set())
`,hints:["Part 1: Binary search — find the leftmost tier where max_requests >= volume.","Part 2: Recursion base case is a leaf node (no children). Otherwise sum children.","Part 3: DFS with a 'visiting' set for cycle detection. Memoize completed nodes.","Part 3: If you encounter a node already in visiting set, you have a cycle — return -1."]},{id:"agent-workflow",title:"Agent Workflow Dependencies",difficulty:"hard",category:"Real World",description:`## Agent Workflow Dependencies

You're building an AI agent orchestration system. Agents have dependencies — an agent cannot run until all its dependencies complete.

**Part 1:** \`get_execution_order(agents, dependencies)\` — Return a valid execution order using topological sort. Return \`None\` if there's a cycle.

**Part 2:** \`find_critical_path(agents, durations, dependencies)\` — Return the minimum total time to complete all agents (longest path in the DAG).

**Example:**
\`\`\`
agents = ["data_fetch", "preprocess", "model_run", "postprocess"]
dependencies = [
    ("data_fetch", "preprocess"),
    ("preprocess", "model_run"),
    ("model_run",  "postprocess"),
]
get_execution_order(...) → ["data_fetch", "preprocess", "model_run", "postprocess"]
\`\`\`
`,starterCode:`from collections import deque

def get_execution_order(agents: list, dependencies: list):
    """
    Topological sort of agents given dependencies.
    dependencies = [("a", "b")] means a must run before b.
    Return ordered list, or None if cycle detected.
    """
    # Your code here
    pass


def find_critical_path(agents: list, durations: dict, dependencies: list) -> int:
    """
    Find the minimum time to run all agents (longest path in DAG).
    durations = {"agent_name": duration_int}
    Returns the total duration of the critical path.
    """
    # Your code here
    pass
`,testCode:`
from collections import deque

def run_tests():
    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        status = "PASS" if cond else "FAIL"
        if cond: passed += 1
        print(f"[{status}] {msg}")

    def valid_order(order, agents, deps):
        if order is None or sorted(order) != sorted(agents):
            return False
        pos = {a: i for i, a in enumerate(order)}
        return all(pos[b] > pos[a] for a, b in deps)

    agents = ["fetch", "preprocess", "model", "postprocess"]
    deps   = [("fetch","preprocess"),("preprocess","model"),("model","postprocess")]
    order  = get_execution_order(agents, deps)
    check(valid_order(order, agents, deps), f"linear chain order valid: {order}")

    # Parallel agents
    agents2 = ["a","b","c","d"]
    deps2   = [("a","c"),("b","c"),("c","d")]
    order2  = get_execution_order(agents2, deps2)
    check(valid_order(order2, agents2, deps2), f"parallel merge order valid: {order2}")

    # Cycle
    agents3 = ["x","y","z"]
    deps3   = [("x","y"),("y","z"),("z","x")]
    check(get_execution_order(agents3, deps3) is None, "cycle returns None")

    # Critical path
    durations = {"fetch": 3, "preprocess": 2, "model": 5, "postprocess": 1}
    cp = find_critical_path(agents, durations, deps)
    check(cp == 11, f"critical path (3+2+5+1) == 11, got {cp}")

    durations2 = {"a": 2, "b": 4, "c": 3, "d": 1}
    cp2 = find_critical_path(agents2, durations2, deps2)
    check(cp2 == 8, f"parallel critical path (max(2,4)+3+1) == 8, got {cp2}")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,solution:`from collections import deque

def get_execution_order(agents: list, dependencies: list):
    graph = {a: [] for a in agents}
    in_degree = {a: 0 for a in agents}
    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    q = deque([a for a in agents if in_degree[a] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)
    return order if len(order) == len(agents) else None

def find_critical_path(agents: list, durations: dict, dependencies: list) -> int:
    # Topological order first
    order = get_execution_order(agents, dependencies)
    if order is None:
        return -1

    graph = {a: [] for a in agents}
    for before, after in dependencies:
        graph[before].append(after)

    # dp[a] = earliest finish time for agent a
    dp = {a: durations[a] for a in agents}
    for agent in order:
        for neighbor in graph[agent]:
            dp[neighbor] = max(dp[neighbor], dp[agent] + durations[neighbor])

    return max(dp.values())
`,hints:["Part 1: Classic Kahn's topological sort — queue nodes with in-degree 0.","Part 2: Process agents in topological order; dp[agent] = max finish time reaching this agent.","dp[neighbor] = max(dp[neighbor], dp[current] + duration[neighbor])","The critical path length is max(dp.values()) after processing all agents."]}];[...new Set(un.map(e=>e.category))];const tn=un.filter(e=>e.category!=="Real World"),ba=un.filter(e=>e.category==="Real World"),Sx=[...new Set(tn.map(e=>e.category))];function Nx(){const{completedProblems:e}=$o(),t=Math.round(e.length/un.length*100);return m.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-16 text-center",children:[m.jsx("div",{className:"mb-8",children:m.jsx("span",{className:"text-6xl font-mono text-emerald-400",children:"</>"})}),m.jsx("h1",{className:"text-4xl font-bold text-white mb-4",children:"Interview Prep"}),m.jsx("p",{className:"text-gray-400 text-lg mb-12 max-w-xl mx-auto",children:"Master data structures, algorithms, and real-world coding problems. Run Python code directly in your browser."}),m.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-12",children:[m.jsxs(Le,{to:"/learn",className:"bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-emerald-500 transition-colors group",children:[m.jsx("div",{className:"text-3xl mb-4",children:"📚"}),m.jsx("h2",{className:"text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors",children:"Learn"}),m.jsx("p",{className:"text-gray-400 text-sm",children:"10 topics — Hash Tables, Trees, Graphs, DP, and more. Complexity tables and annotated code examples."})]}),m.jsxs(Le,{to:"/practice",className:"bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-emerald-500 transition-colors group",children:[m.jsx("div",{className:"text-3xl mb-4",children:"⚡"}),m.jsx("h2",{className:"text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors",children:"DS&A Practice"}),m.jsxs("p",{className:"text-gray-400 text-sm",children:[un.filter(n=>n.category!=="Real World").length," coding problems with a live Python runner. Easy, medium, and hard."]})]}),m.jsxs(Le,{to:"/real-world",className:"bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-amber-600 transition-colors group",children:[m.jsx("div",{className:"text-3xl mb-4",children:"🏭"}),m.jsx("h2",{className:"text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors",children:"Real World"}),m.jsx("p",{className:"text-gray-400 text-sm",children:"Apply DS&A to realistic engineering problems — event pipelines, rate limiters, workflow schedulers."})]}),m.jsxs(Le,{to:"/big-o",className:"bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-purple-600 transition-colors group",children:[m.jsx("div",{className:"text-3xl mb-4",children:"⏱"}),m.jsx("h2",{className:"text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors",children:"Big O Quiz"}),m.jsx("p",{className:"text-gray-400 text-sm",children:"30 code examples — identify the time and space complexity. Instant right/wrong feedback with explanations."})]})]}),e.length>0&&m.jsxs("div",{className:"bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md mx-auto",children:[m.jsxs("div",{className:"flex justify-between items-center mb-3",children:[m.jsx("span",{className:"text-sm text-gray-400",children:"Your Progress"}),m.jsxs("span",{className:"text-sm font-mono text-emerald-400",children:[e.length," / ",un.length]})]}),m.jsx("div",{className:"w-full bg-gray-800 rounded-full h-2",children:m.jsx("div",{className:"bg-emerald-500 h-2 rounded-full transition-all duration-500",style:{width:`${t}%`}})}),m.jsxs("p",{className:"text-xs text-gray-500 mt-2",children:[t,"% complete"]})]}),m.jsx("div",{className:"mt-16 grid grid-cols-3 gap-8 text-center",children:[{label:"Topics",value:"10"},{label:"Problems",value:String(un.length)},{label:"In-Browser Python",value:"✓"}].map(({label:n,value:r})=>m.jsxs("div",{children:[m.jsx("div",{className:"text-2xl font-bold text-emerald-400 font-mono",children:r}),m.jsx("div",{className:"text-sm text-gray-500 mt-1",children:n})]},n))})]})}const rr=[{id:"big-o-notation",title:"Big O Notation",icon:"O",summary:"The language of algorithm efficiency. Master how to read, write, and calculate time and space complexity.",content:`
## Big O Notation

Big O notation describes **how the runtime or memory usage of an algorithm scales** as the input size \`n\` grows. It lets you compare algorithms without worrying about hardware, language, or constant factors.

> Big O describes the **upper bound** — worst-case growth rate, not exact performance.

---

### Why It Matters

Two solutions can both be "correct" but have wildly different performance at scale:

\`\`\`python
# O(n²) — works fine for n=100, painful for n=1,000,000
def has_duplicate_slow(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# O(n) — same result, scales to millions
def has_duplicate_fast(arr):
    return len(arr) != len(set(arr))
\`\`\`

---

### The 8 Common Complexities

#### O(1) — Constant
Runtime does not depend on input size at all.
\`\`\`python
def get_first(arr):
    return arr[0]             # one operation regardless of len(arr)

def is_even(n):
    return n % 2 == 0         # one modulo, always

def hash_lookup(d, key):
    return d.get(key)         # hash map lookup is O(1) average
\`\`\`

#### O(log n) — Logarithmic
Input is repeatedly **halved** (or multiplied). Common in binary search and trees.
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2   # cut search space in half each time
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
# After k iterations, we've checked 2^k elements → k = log₂(n) iterations
\`\`\`

#### O(n) — Linear
You visit every element once.
\`\`\`python
def find_max(arr):
    m = arr[0]
    for x in arr:    # touch each element once
        if x > m:
            m = x
    return m
\`\`\`

#### O(n log n) — Linearithmic
Typical of efficient sorting algorithms — you do O(log n) levels of work, each level touching all n elements.
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # log n recursive levels
    right = merge_sort(arr[mid:])
    return merge(left, right)      # O(n) merge at each level
# Total: n elements × log n levels = O(n log n)
\`\`\`

#### O(n²) — Quadratic
Two nested loops, each proportional to n.
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):         # outer: n iterations
        for j in range(n - 1): # inner: ~n iterations
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
\`\`\`

#### O(n³) — Cubic
Three nested loops. Quickly becomes impractical.
\`\`\`python
def matrix_multiply(A, B, n):
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):   # three nested loops
                C[i][j] += A[i][k] * B[k][j]
\`\`\`

#### O(2ⁿ) — Exponential
Each additional input element doubles the work. Common in naive recursion without memoization.
\`\`\`python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)  # two recursive calls → binary tree of depth n → 2ⁿ nodes

def power_set(s):
    result = [[]]
    for elem in s:
        result += [sub + [elem] for sub in result]  # doubles each iteration → 2ⁿ subsets
    return result
\`\`\`

#### O(n!) — Factorial
Generating all permutations. The fastest-growing complexity — \`n=20\` gives 2.4 quintillion operations.
\`\`\`python
def permutations(arr, start=0):
    if start == len(arr) - 1:
        yield arr[:]
        return
    for i in range(start, len(arr)):
        arr[start], arr[i] = arr[i], arr[start]
        yield from permutations(arr, start + 1)
        arr[start], arr[i] = arr[i], arr[start]
# n choices for first, n-1 for second… = n! total permutations
\`\`\`

---

### Rules for Calculating Big O

#### Rule 1: Drop Constants
We care about growth rate, not exact multipliers.
\`\`\`python
# O(2n) → O(n)
def two_passes(arr):
    for x in arr: print(x)   # O(n)
    for x in arr: print(x)   # O(n)
# Two loops = O(2n), but we drop the 2 → O(n)
\`\`\`

#### Rule 2: Drop Non-Dominant Terms
Keep only the fastest-growing term.
\`\`\`python
# O(n² + n) → O(n²)
def example(arr):
    n = len(arr)
    for i in range(n):        # O(n)
        for j in range(n):    # O(n²) total
            pass
    for i in range(n):        # O(n) — dominated, drop it
        pass
\`\`\`

| Before simplification | After |
|----------------------|-------|
| O(n² + n) | O(n²) |
| O(2n + 100) | O(n) |
| O(n + log n) | O(n) |
| O(n! + 2ⁿ) | O(n!) |

#### Rule 3: Different Inputs = Different Variables
If two independent arrays are involved, use separate variables.
\`\`\`python
# NOT O(n²) — it's O(a * b)
def print_pairs(arr_a, arr_b):
    for x in arr_a:         # O(a)
        for y in arr_b:     # O(b)
            print(x, y)
# If a == b == n then yes, O(n²). But they're independent.
\`\`\`

#### Rule 4: Multi-Part Algorithms
- **Sequential steps** → **add**: O(a + b)
- **Nested steps** → **multiply**: O(a * b)
\`\`\`python
# Sequential — ADD
def add_example(arr):
    sort(arr)        # O(n log n)
    find_max(arr)    # O(n)
# Total: O(n log n + n) = O(n log n)

# Nested — MULTIPLY
def multiply_example(arr):
    for x in arr:                  # O(n)
        for y in arr:              # O(n) inside
            process(x, y)
# Total: O(n × n) = O(n²)
\`\`\`

---

### Space Complexity

Space complexity counts the **extra memory** your algorithm allocates, not including the input itself.

\`\`\`python
def reverse_copy(arr):
    result = []                # allocates n new elements → O(n) space
    for x in reversed(arr):
        result.append(x)
    return result

def reverse_in_place(arr):
    left, right = 0, len(arr) - 1
    while left < right:        # only two variables → O(1) space
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
\`\`\`

**Call stack counts too!** Recursive functions use O(depth) stack space.
\`\`\`python
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)
# Stack depth = n → O(n) space even though no explicit data structure
\`\`\`

---

### Best, Worst, and Average Case

Big O almost always refers to the **worst case** in interviews, but be precise when asked:

\`\`\`python
def search(arr, target):
    for i, x in enumerate(arr):
        if x == target:
            return i    # ← could return immediately
    return -1
\`\`\`

| Case | Scenario | Complexity |
|------|----------|------------|
| Best | Target is first element | O(1) |
| Average | Target is in the middle on average | O(n/2) = O(n) |
| Worst | Target is last or not found | O(n) |

---

### Amortized Analysis

Some operations are occasionally expensive but cheap on average. The classic example is dynamic array append:
\`\`\`
Most appends: O(1)   — just write to pre-allocated slot
Occasional:   O(n)   — resize (copy all elements to new array)
Amortized:    O(1)   — the cost averages out over many operations
\`\`\`
Python's \`list.append()\` and Java's \`ArrayList.add()\` are both O(1) amortized.

---

### Common Gotchas

**String immutability — concatenation in a loop:**
\`\`\`python
# Looks like O(n) but is actually O(n²) — each += copies the whole string
result = ""
for c in chars:
    result += c

# Fix: use a list and join at the end → O(n)
result = "".join(chars)
\`\`\`

**Recursive Fibonacci without memoization:**
\`\`\`python
fib(n)         # O(2ⁿ) — exponential
fib_memo(n)    # O(n)  — with memoization
fib_dp(n)      # O(n)  — bottom-up DP, O(1) space if you only keep last two
\`\`\`

**Log base doesn't matter:**
\`\`\`
O(log₂ n) = O(log₁₀ n) = O(log n)
# Changing the base only changes by a constant factor, which we drop
\`\`\`

---

### Complexity Quick Reference

| Complexity | Name | n=10 | n=100 | n=1000 | Feasible up to |
|-----------|------|-------|--------|---------|----------------|
| O(1) | Constant | 1 | 1 | 1 | Any |
| O(log n) | Logarithmic | 3 | 7 | 10 | Any |
| O(n) | Linear | 10 | 100 | 1,000 | ~10⁸ |
| O(n log n) | Linearithmic | 33 | 664 | 9,966 | ~10⁶ |
| O(n²) | Quadratic | 100 | 10,000 | 10⁶ | ~10⁴ |
| O(n³) | Cubic | 1,000 | 10⁶ | 10⁹ | ~500 |
| O(2ⁿ) | Exponential | 1,024 | 10³⁰ | ≈∞ | ~20 |
| O(n!) | Factorial | 3.6M | ≈∞ | ≈∞ | ~12 |

---

### Interview Tips

1. **Always state complexity** — unsolicited. "This is O(n) time, O(1) space."
2. **Explain the why** — "O(n log n) because merge sort divides into log n levels and merges O(n) per level."
3. **Consider both time and space** — interviewers will ask if you only give one.
4. **Note the trade-off** — "I could get O(n) time by using O(n) extra space for a hash map."
5. **Simplify before speaking** — O(2n + 5) → say "O(n)".

> Ready to test yourself? Head to the **[Big O Quiz](/big-o)** and work through 30 examples with instant feedback.
    `},{id:"hash-tables",title:"Hash Tables",icon:"#",summary:"O(1) average insert/lookup. Key building block for most interview problems.",content:`
## Hash Tables

A hash table maps **keys to values** using a hash function. Average O(1) insert, delete, and lookup.

### How It Works
1. Hash function converts key → integer index
2. Index into an underlying array (bucket)
3. **Collision resolution**: chaining (linked list at each bucket) or open addressing

### Polynomial Rolling Hash
The classic hash function used for strings:
\`\`\`
hash = hash * 31 + c
\`\`\`
Multiplying by 31 (a prime) before adding each character ensures **order matters** — \`"abc"\` and \`"bac"\` get different hashes. Without the multiply, any anagram would hash to the same value.

### Collision Resolution

**Chaining (Linked Lists per bucket)**
- Worst case O(n) if all keys hash to same bucket
- Can upgrade buckets to BSTs → worst case O(log n), used by Java 8+

**Open Addressing (Linear Probing)**
- All keys stored directly in the array — no chaining
- On collision, check next slots sequentially: i, i+1, i+2... (mod capacity)
- Problem: **clustering** — consecutive filled slots grow, increasing probe time
- Improvements: quadratic probing or double hashing reduce clustering

### Resizing & Load Factor
Hash tables must resize as they fill up:

| Language | Growth factor | Resize threshold (load factor) |
|----------|--------------|-------------------------------|
| Java     | 2×           | 0.75                          |
| Python   | ~1.3–2×      | 0.7–0.8                       |

Resizing wastes some space but keeps average operations O(1).

### BST as Alternative
You can implement a hash map using a **binary search tree** instead of an array:
- Lookup: O(log n) vs O(1) average for array-based
- Benefit: keys are **ordered** → enables range queries and finding neighbours
- Tradeoff: worse lookup, but useful when you need ordered iteration

### Complexity

| Operation | Average | Worst (all collisions) |
|-----------|---------|------------------------|
| Insert    | O(1)    | O(n)                   |
| Delete    | O(1)    | O(n)                   |
| Lookup    | O(1)    | O(n)                   |
| Space     | O(n)    | O(n)                   |

### Python Built-ins

\`\`\`python
# dict — the Python hash table
d = {}
d["key"] = "value"     # insert O(1)
val = d.get("key")     # lookup O(1), None if missing
"key" in d             # membership O(1)
del d["key"]           # delete O(1)

# Counter — frequency map
from collections import Counter
freq = Counter("abracadabra")  # {'a': 5, 'b': 2, ...}

# defaultdict — no KeyError on missing keys
from collections import defaultdict
graph = defaultdict(list)
graph["a"].append("b")
\`\`\`

### Classic Interview Patterns

**Frequency counting**
\`\`\`python
def has_duplicate(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return True
        seen.add(x)
    return False
\`\`\`

**Two Sum**
\`\`\`python
def two_sum(nums, target):
    seen = {}                    # value -> index
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
\`\`\`

**Group anagrams**
\`\`\`python
from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        key = tuple(sorted(w))   # canonical form
        groups[key].append(w)
    return list(groups.values())
\`\`\`

### Key Interview Tips
- **Reach for a dict or set first** when you need fast lookup
- Always ask: "can I trade O(n) space for O(1) lookup?"
- \`frozenset\` or \`tuple\` can be used as dict keys (immutable/hashable)
- Python \`set\` is a hash table without values — ideal for membership tests
- O(1) average is not guaranteed — pathological inputs can degrade to O(n)
    `},{id:"arrays-strings",title:"Arrays & Strings",icon:"[]",summary:"Contiguous memory, O(1) index access. Two pointers & sliding window live here.",content:`
## Arrays & Strings

Arrays store elements in contiguous memory — O(1) random access, O(n) insert/delete at arbitrary positions.

### Static vs Dynamic Arrays
- **Static**: Fixed size at creation (C arrays)
- **Dynamic** (Python list, Java ArrayList): Resize by doubling when full
  - Append: O(1) **amortized** — occasional O(n) resize is averaged out over all appends

### Complexity

| Operation         | Array  | Dynamic Array (Python list) |
|-------------------|--------|-----------------------------|
| Access by index   | O(1)   | O(1)                        |
| Append            | —      | O(1) amortized              |
| Insert at front   | O(n)   | O(n)                        |
| Delete at index   | O(n)   | O(n)                        |
| Search (unsorted) | O(n)   | O(n)                        |
| Search (sorted)   | O(log n) | O(log n)                  |

### String Immutability in Python
Strings are **immutable** — building with \`+=\` in a loop is O(n²) because each concatenation copies the whole string. Use \`list\` + \`"".join()\`:

\`\`\`python
# Bad — O(n^2): each += creates a new string
result = ""
for c in chars:
    result += c

# Good — O(n): build list, join once at the end
parts = []
for c in chars:
    parts.append(c)
result = "".join(parts)
\`\`\`

### Two Pointer Variations

There are three distinct two-pointer patterns:

**1. Opposite ends — sorted array pair problems**
\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:   return [left, right]
        elif s < target:  left += 1
        else:             right -= 1
    return []
\`\`\`

**2. Different speeds — fast/slow (cycle, middle)**
\`\`\`python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
\`\`\`

**3. Same direction with offset — string comparison when lengths differ**
\`\`\`python
def is_one_edit_away_insert(shorter, longer):
    i = j = diff = 0
    while i < len(shorter):
        if shorter[i] != longer[j]:
            diff += 1
            if diff > 1: return False
            j += 1        # skip one char in longer
        else:
            i += 1; j += 1
    return True
\`\`\`

### Sliding Window Pattern
\`\`\`python
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    best = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # slide
        best = max(best, window_sum)
    return best
\`\`\`

### Prefix Sum
\`\`\`python
def subarray_sum(arr, k):
    """Count subarrays summing to k — O(n) with prefix hash."""
    prefix_count = {0: 1}
    total = count = 0
    for x in arr:
        total += x
        count += prefix_count.get(total - k, 0)
        prefix_count[total] = prefix_count.get(total, 0) + 1
    return count
\`\`\`

### In-Place Matrix Rotation
Rotate NxN matrix 90° clockwise **in place** — two approaches:

**Transpose + reverse each row (clean):**
\`\`\`python
def rotate_90_cw(matrix):
    n = len(matrix)
    # Transpose: swap [i][j] with [j][i]
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()
\`\`\`

**Layer-by-layer 4-cycle (classic in-place):**
\`\`\`python
def rotate_layers(matrix):
    n = len(matrix)
    for layer in range(n // 2):
        last = n - layer - 1
        for i in range(layer, last):
            offset = i - layer
            top = matrix[layer][i]
            # left → top
            matrix[layer][i] = matrix[last - offset][layer]
            # bottom → left
            matrix[last - offset][layer] = matrix[last][last - offset]
            # right → bottom
            matrix[last][last - offset] = matrix[i][last]
            # top → right
            matrix[i][last] = top
\`\`\`

**Formula:** \`new_row = old_col\`, \`new_col = size - old_row - 1\`
Time: O(n²), Space: O(1)

### Character Frequency Counting
\`\`\`python
from collections import Counter

# Palindrome permutation check
def is_palindrome_permutation(s):
    freq = Counter(c.lower() for c in s if c != ' ')
    return sum(v % 2 for v in freq.values()) <= 1

# Anagram check
def is_anagram(s, t):
    return Counter(s) == Counter(t)
\`\`\`

### Key Interview Tips
- Off-by-one errors are the #1 bug — always trace boundary conditions on paper
- Consider **sorting first** if order doesn't matter (often unlocks O(n log n))
- Two-pointer technique eliminates a nested loop → O(n²) → O(n)
- For in-place 2D rotation: transpose + reverse-rows is the cleanest approach
    `},{id:"linked-lists",title:"Linked Lists",icon:"→",summary:"Node chains with O(1) insert/delete. Master fast & slow pointers.",content:`
## Linked Lists

Each node holds a value + pointer(s) to next/previous node. No random access — must traverse.

### Why Linked Lists?
- O(1) insert/delete **if you already have a reference to the node** — arrays must shift elements
- Grow and shrink dynamically with no resizing overhead
- Used to implement: **stacks**, **queues**, **hash map buckets**, **LRU caches**

### LRU Cache (classic linked list application)
Combine a **hash map** (O(1) lookup) + **doubly linked list** (O(1) move-to-front):
- Most recently used (MRU) lives at the **head**
- Least recently used (LRU) lives at the **tail** — evicted when cache is full
- On access: O(1) lookup via hash map, then O(1) move node to head via prev/next pointers

### Complexity

| Operation        | Singly  | Doubly  |
|------------------|---------|---------|
| Access by index  | O(n)    | O(n)    |
| Insert at head   | O(1)    | O(1)    |
| Insert at tail   | O(1)*   | O(1)*   |
| Delete (known node) | O(1) | O(1)    |
| Search           | O(n)    | O(n)    |

*With a tail pointer maintained.

### Node Reference vs Value Comparison
\`\`\`python
# Reference comparison — same object in memory (identity)
node_a is node_b       # True only if they ARE the same node

# Value comparison — same data
node_a.value == node_b.value   # True if data matches, even different nodes
\`\`\`
For **intersection** problems, use \`is\` (reference) — two lists intersect when their nodes are the **same object**, not just equal values.

### Python Node Template
\`\`\`python
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None      # singly

class DNode:
    def __init__(self, val):
        self.val = val
        self.next = None      # doubly
        self.prev = None
\`\`\`

### Fast & Slow Pointer (Floyd's Algorithm)
Time: O(n), Space: O(1) — no extra space needed.

\`\`\`python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

def find_cycle_start(head):
    slow = fast = head
    # Phase 1: detect meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None  # no cycle
    # Phase 2: reset slow to head, both advance at speed 1
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow  # cycle start node
\`\`\`

### Reverse a Linked List
\`\`\`python
def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev   # new head
\`\`\`

### Find Middle Node
\`\`\`python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # middle (or right-of-middle for even length)
\`\`\`

### Remove Duplicates (with buffer)
\`\`\`python
def remove_dups(head):
    seen = set()
    prev, curr = None, head
    while curr:
        if curr.val in seen:
            prev.next = curr.next  # skip duplicate
        else:
            seen.add(curr.val)
            prev = curr
        curr = curr.next
\`\`\`

### k-th From End (two-pointer)
\`\`\`python
def kth_from_end(head, k):
    fast = slow = head
    for _ in range(k):        # advance fast k steps
        fast = fast.next
    while fast:               # move both until fast reaches end
        slow = slow.next
        fast = fast.next
    return slow
\`\`\`

### Key Interview Tips
- Always handle **null/empty list** and **single node** as first cases
- Draw pointer reassignments before coding — it's easy to lose a node
- Fast+slow pointer finds: midpoint, cycle start, nth-from-end — all O(n) time O(1) space
- Use a **dummy head node** to simplify edge cases at the front of the list
- For intersection: align lengths first, then walk together until \`node_a is node_b\`
    `},{id:"stacks-queues",title:"Stacks & Queues",icon:"⊏",summary:"LIFO vs FIFO. Stacks power DFS and expression evaluation.",content:`
## Stacks & Queues

**Stack** — Last In, First Out (LIFO). Push/pop from the same end.
**Queue** — First In, First Out (FIFO). Enqueue one end, dequeue the other.

### The Call Stack
Every recursive function call **uses the call stack** implicitly:
- Each call **pushes** the current function state (local variables, return address)
- When the function returns, it **pops** that frame
- Deep or infinite recursion → stack overflow
- This is why iterative solutions with explicit stacks can be more memory-safe

### BFS Uses a Queue
In BFS, when you visit a node you add all its **unvisited neighbours to the end** of the queue. This guarantees level-by-level exploration:
\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = {start}
    q = deque([start])
    while q:
        node = q.popleft()
        for neighbour in graph.get(node, []):
            if neighbour not in visited:
                visited.add(neighbour)
                q.append(neighbour)
\`\`\`

### Python Built-ins
\`\`\`python
# Stack — use list
stack = []
stack.append(x)   # push  O(1)
stack.pop()       # pop   O(1)
stack[-1]         # peek  O(1)

# Queue — ALWAYS use deque (list.pop(0) is O(n)!)
from collections import deque
q = deque()
q.append(x)       # enqueue  O(1)
q.popleft()       # dequeue  O(1)
q[0]              # peek     O(1)
\`\`\`

### Complexity

| Operation | Stack | Queue (deque) |
|-----------|-------|-------|
| Push/Enqueue | O(1) | O(1) |
| Pop/Dequeue  | O(1) | O(1) |
| Peek         | O(1) | O(1) |
| Search       | O(n) | O(n) |

### Min Stack — O(1) min()
Maintain a **parallel min stack** that tracks the current minimum at every level:
\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []   # top = current minimum

    def push(self, val):
        self.stack.append(val)
        # Push new min: either val or keep existing min
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self):
        self.min_stack.pop()
        return self.stack.pop()

    def min(self):
        return self.min_stack[-1]
\`\`\`

The key insight: when pushing, push \`min(val, current_min)\` — not just val. When popping, always pop both stacks together.

### Balanced Parentheses
\`\`\`python
def is_balanced(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in '([{':
            stack.append(c)
        elif c in ')]}':
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0
\`\`\`

### Sort a Stack (using 1 extra stack)
\`\`\`python
def sort_stack(s):
    temp = []
    while s:
        val = s.pop()
        # Move values back from temp that are smaller than val
        while temp and temp[-1] < val:
            s.append(temp.pop())
        temp.append(val)
    return temp  # sorted, smallest on top
\`\`\`
Time: O(n²), Space: O(n).

### Multiple Stacks in One Array
Divide a single array into N equal segments — each segment is a stack:
- Track a \`top[i]\` pointer for each stack
- Handle overflow by resizing the segment or throwing an error
- More complex variant: allow segments to grow dynamically using a linked list of "stack frames"

### Key Interview Tips
- Stack → DFS, expression evaluation, function call simulation, monotonic problems
- Queue → BFS, task scheduling, sliding window maximum
- **Monotonic stack**: keeps elements in monotonic order — powerful for "next greater element"
- Two stacks can simulate a queue (and vice versa) — classic interview question
- \`deque\` supports O(1) at both ends — use it instead of list for queues
    `},{id:"trees-bst",title:"Trees & BSTs",icon:"T",summary:"Hierarchical data. DFS (pre/in/post-order) and BFS. BST enables O(log n) search.",content:`
## Trees & Binary Search Trees

### Tree Taxonomy

| Type | Definition |
|------|-----------|
| **Binary tree** | Each node has at most 2 children |
| **BST** | Binary tree where left < node < right (strict) |
| **Balanced tree** | Heights of subtrees differ by at most 1 — guarantees O(log n) ops. Examples: AVL tree, Red-Black tree |
| **Complete binary tree** | Every level filled except possibly the last, which fills left-to-right |
| **Full binary tree** | Every node has exactly 0 or 2 children |
| **Perfect binary tree** | Full AND complete — all leaves at same level. Has exactly **2^k − 1** nodes where k = number of levels |

### Tree Properties
- **Height**: Longest path from root to leaf (edges)
- **Depth**: Distance from root to a specific node (edges)
- **Level**: Root is level 0, children are level 1, etc.
- **Diameter**: Longest path between any two nodes (may not pass through root)

### BST Complexity

| Operation | Average (balanced) | Worst (skewed) |
|-----------|--------------------|----------------|
| Search    | O(log n)           | O(n)           |
| Insert    | O(log n)           | O(n)           |
| Delete    | O(log n)           | O(n)           |

### Python Node Template
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
\`\`\`

### DFS Traversals
\`\`\`python
def preorder(node):   # current → left → right  (preserves tree structure)
    if not node: return
    print(node.val)
    preorder(node.left)
    preorder(node.right)

def inorder(node):    # left → current → right  (SORTED for BST!)
    if not node: return
    inorder(node.left)
    print(node.val)
    inorder(node.right)

def postorder(node):  # left → right → current  (children before parent)
    if not node: return
    postorder(node.left)
    postorder(node.right)
    print(node.val)
\`\`\`

All traversals can also be done **iteratively** using an explicit stack — avoids Python recursion depth limits on skewed trees.

### BFS (Level-Order)
\`\`\`python
from collections import deque

def level_order(root):
    if not root: return []
    result, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):   # process exactly one level
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result
\`\`\`

### Tree Height & Balance Check
\`\`\`python
def height(node):
    if not node: return 0
    return 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    """O(n) — return -1 if unbalanced, height otherwise."""
    def check(n):
        if not n: return 0
        l = check(n.left)
        r = check(n.right)
        if l == -1 or r == -1 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)
    return check(node) != -1
\`\`\`

### Validate BST (min/max bounds — the right approach)
Local parent-child checks are **not enough** — a node must satisfy ALL ancestor constraints:
\`\`\`python
def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if root.val <= lo or root.val >= hi:
        return False
    return (is_valid_bst(root.left,  lo,       root.val) and
            is_valid_bst(root.right, root.val, hi))
\`\`\`

### Tree Construction: Sorted Array → Minimal BST
Always pick the middle element as root — recursively for each half:
\`\`\`python
def sorted_array_to_bst(arr):
    if not arr: return None
    mid = len(arr) // 2
    node = TreeNode(arr[mid])
    node.left  = sorted_array_to_bst(arr[:mid])
    node.right = sorted_array_to_bst(arr[mid+1:])
    return node
# Time: O(n), Space: O(n) for tree + O(log n) for recursion stack
\`\`\`

You can also reconstruct trees from:
- **Preorder + inorder**: root from preorder, split inorder at root
- **Postorder + inorder**: root from postorder, split inorder at root

### In-Order Successor in BST
Given a node, find the next node in in-order traversal:
\`\`\`python
def inorder_successor(node):
    # Case 1: node has a right subtree
    # → successor is the LEFTMOST node in the right subtree
    if node.right:
        curr = node.right
        while curr.left:
            curr = curr.left
        return curr

    # Case 2: no right subtree
    # → go up parent chain until we come from a LEFT child
    # → that parent is the successor
    child = node
    parent = node.parent
    while parent and child is parent.right:
        child = parent
        parent = parent.parent
    return parent   # None if node is the maximum
# Time: O(h), Space: O(1)
\`\`\`

### Lowest Common Ancestor (LCA)
**With parent pointers:**
1. Get depth of both nodes
2. Move deeper node up until same depth
3. Move both up together until they meet

**Without parent pointers (DFS):**
\`\`\`python
def lca(root, p, q):
    """Returns LCA node if both p and q are in tree."""
    if not root or root is p or root is q:
        return root
    left  = lca(root.left,  p, q)
    right = lca(root.right, p, q)
    if left and right:
        return root   # p in one subtree, q in the other
    return left or right
# Time: O(n), Space: O(h)
\`\`\`

### Subtree Matching
Naive: find T2's root in T1 via BFS, then compare trees simultaneously — O(n × m).

**Better approach (serialize + substring):**
Serialize both trees using preorder with null markers (e.g. \`"4 2 # # 6 # #"\`), then check if T2's serialized form is a **substring** of T1's. Use KMP for O(n + m).

### Binary Heaps

A **min-heap** is a complete binary tree where every parent ≤ its children (root = minimum).
**Max-heap**: every parent ≥ its children (root = maximum).

**Array implementation** (space-efficient):
\`\`\`
Parent at index i → children at 2i+1 and 2i+2
Child at index i  → parent at (i-1)//2
\`\`\`

\`\`\`python
import heapq

# Min-heap in Python
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heapq.heappop(heap)   # → 1 (minimum)

# Max-heap: negate values
heapq.heappush(heap, -val)
max_val = -heapq.heappop(heap)
\`\`\`

| Operation | Time |
|-----------|------|
| Insert (push) | O(log n) |
| Extract min/max | O(log n) |
| Peek | O(1) |

**Use cases:** Dijkstra's algorithm, merge k sorted lists, find k largest/smallest, event simulation.

### Tries (Prefix Trees)
An N-ary tree where each node represents a character. End of word marked with a \`*\` flag.

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self): self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            node = node.children.setdefault(c, TrieNode())
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True
\`\`\`

Lookup is O(k) where k = length of string — similar to a hash map (which still hashes each character).

**Word search / word break:** Build a Trie, run DFS+backtracking from each cell. At each step, check if current path is a valid prefix — **prune early** if not, which drastically reduces search space.

### Key Interview Tips
- **Inorder traversal of a BST produces a sorted sequence** — use this for validation, k-th smallest, etc.
- Pre/post order **preserve tree structure** — useful for serialisation
- Recursive solutions are natural; switch to iterative on skewed trees to avoid stack overflow
- BST deletion: leaf → remove directly; one child → replace; two children → swap with in-order successor then delete successor
- For "find k-th smallest in BST": inorder traversal + counter
    `},{id:"graphs",title:"Graphs",icon:"G",summary:"Nodes + edges. BFS for shortest path, DFS for connectivity. Topological sort for dependencies.",content:`
## Graphs

A graph is a set of **nodes (vertices)** and **edges**. A tree is a special graph — connected and acyclic. Not all graphs are trees.

### Graph Types
- **Directed**: edges have direction (one-way streets)
- **Undirected**: edges are bidirectional
- **Connected graph**: path exists between every pair of vertices
- **Acyclic**: no cycles (a DAG is a Directed Acyclic Graph)
- **Weighted**: edges have numeric weights

### Representations

**Adjacency List** — most common for interviews
\`\`\`python
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D', 'E'],
}
\`\`\`
- Space: O(V + E) — good for sparse graphs
- In undirected graphs, store each edge twice: A→B and B→A
- Iterating neighbours: O(degree of node)

**Adjacency Matrix** — NxN boolean (or weight) matrix
\`\`\`python
# matrix[i][j] = True means edge from i to j
\`\`\`
- Space: O(V²) — good for **dense graphs**
- Fast edge existence check: O(1) via \`matrix[A][B]\`
- Undirected graph matrix is **symmetric**
- Downside: iterating neighbours requires scanning all N columns

| | Adjacency List | Adjacency Matrix |
|--|--|--|
| Space | O(V + E) | O(V²) |
| Edge lookup | O(degree) | O(1) |
| Best for | Sparse graphs | Dense graphs |

### BFS — Shortest Path (unweighted)
\`\`\`python
from collections import deque

def bfs(graph, start, end):
    if start == end: return True
    visited = {start}
    q = deque([start])
    while q:
        node = q.popleft()
        if node == end: return True
        for neighbour in graph.get(node, []):
            if neighbour not in visited:
                visited.add(neighbour)
                q.append(neighbour)
    return False
\`\`\`
BFS is preferred when you need **shortest path** (unweighted). Track parent pointers to reconstruct the path.

### DFS — Connected Components
\`\`\`python
def dfs(graph, node, visited):
    visited.add(node)
    for neighbour in graph.get(node, []):
        if neighbour not in visited:
            dfs(graph, neighbour, visited)

def count_components(graph):
    visited = set()
    count = 0
    for node in graph:
        if node not in visited:
            dfs(graph, node, visited)
            count += 1
    return count
\`\`\`
DFS is preferred when you want to **visit every node** or explore all paths.

### Bidirectional BFS
Run simultaneous BFS from both source and target. Stop when the two frontiers collide.

**Why it's faster:** Instead of exploring to depth d (O(kᵈ) nodes), each side only goes to depth d/2 — total O(kᵈ/²) nodes. Huge win on large graphs.

### Topological Sort (Kahn's Algorithm)
Only works on **DAGs** (directed acyclic graphs). Key insight: *find the tasks with nothing blocking them, do those first.*

\`\`\`python
from collections import deque

def topo_sort(nodes, dependencies):
    graph = {n: [] for n in nodes}
    in_degree = {n: 0 for n in nodes}
    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    # Start with all nodes that have no prerequisites
    q = deque([n for n in nodes if in_degree[n] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbour in graph[node]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                q.append(neighbour)

    return order if len(order) == len(nodes) else None  # None = cycle
# Time: O(V + E)
\`\`\`

**Use cases:** build order, course prerequisites, task scheduling, CI/CD pipeline ordering.

### Cycle Detection

**Directed graph — DFS with 3 colors:**
\`\`\`python
def has_cycle_directed(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {n: WHITE for n in graph}

    def dfs(node):
        color[node] = GRAY         # mark as in-progress
        for nb in graph.get(node, []):
            if color[nb] == GRAY: return True   # back edge = cycle
            if color[nb] == WHITE and dfs(nb): return True
        color[node] = BLACK        # fully processed
        return False

    return any(color[n] == WHITE and dfs(n) for n in graph)
\`\`\`

**Undirected graph:** DFS but track the parent — don't flag the edge back to parent as a cycle.

**Alternative:** Topological sort — if result length < node count, there's a cycle.

### Shortest Path Algorithms

| Algorithm | Handles | Time | Use when |
|-----------|---------|------|----------|
| **BFS** | Unweighted | O(V + E) | Equal-weight edges |
| **Dijkstra** | Non-negative weights | O((V+E) log V) | Standard weighted graph |
| **Bellman-Ford** | Negative weights | O(VE) | Negative edges, detect negative cycles |
| **Floyd-Warshall** | All pairs | O(V³) | Small graphs, all-pairs needed |

\`\`\`python
import heapq

def dijkstra(graph, start):
    """graph[node] = [(neighbor, weight), ...]"""
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]: continue
        for neighbour, weight in graph.get(node, []):
            new_dist = dist[node] + weight
            if new_dist < dist[neighbour]:
                dist[neighbour] = new_dist
                heapq.heappush(heap, (new_dist, neighbour))
    return dist
\`\`\`

### Union-Find (Disjoint Set Union)
Tracks connected components efficiently. Operations: **Find** (with path compression) + **Union** (by rank).

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False   # already same component
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1
        return True
\`\`\`
Amortized O(α(n)) per operation — effectively constant. Used in: Kruskal's MST, cycle detection, connected components.

### Minimum Spanning Tree (MST)

**Kruskal's:** Sort edges by weight, add edge if it doesn't create a cycle (use Union-Find). Time: O(E log E).

**Prim's:** Start from any node, greedily add the minimum-weight edge connecting a new node. Time: O(E log V) with a heap.

### Key Interview Tips
- Always track **visited** to avoid infinite loops
- BFS → shortest path (unweighted); Dijkstra → weighted non-negative
- Topological sort only works on DAGs — check for cycles
- "Islands" grid problems: treat the 2D grid as an implicit graph, BFS/DFS from unvisited cells
- For cycle detection in undirected graphs, track parent to avoid false positives
    `},{id:"recursion-dp",title:"Recursion & DP",icon:"f()",summary:"Divide and conquer. Memoize overlapping subproblems. Tabulate bottom-up.",content:`
## Recursion & Dynamic Programming

**Recursion** breaks a problem into smaller sub-problems.
**DP** = recursion + memoization (top-down) or tabulation (bottom-up) to avoid redundant work.

**When to use DP:** overlapping subproblems + optimal substructure.

### Recursion Template
\`\`\`python
def solve(n):
    # 1. Base case(s) — must exist to terminate
    if n == 0:
        return 1
    # 2. Recursive case — smaller sub-problem
    return n * solve(n - 1)
\`\`\`

### Top-Down DP (Memoization)
Without memo, triple step is **O(3ⁿ)**. With memo it's **O(n)**.

\`\`\`python
# Option 1: lru_cache decorator (cleanest)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Option 2: manual memo dict
def fib(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
\`\`\`

### Bottom-Up DP (Tabulation)
\`\`\`python
def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space-optimised: only need last 2 values
def fib_opt(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\`

### Triple Step (Stair Climbing)
\`\`\`python
@lru_cache(maxsize=None)
def count_ways(n):
    if n < 0: return 0
    if n == 0: return 1       # one way to stand at bottom: do nothing
    return count_ways(n-1) + count_ways(n-2) + count_ways(n-3)
\`\`\`

### Coin Change (number of ways)
Key insight: process each coin in an outer loop to avoid counting permutations as distinct combinations.
\`\`\`python
def coin_change_ways(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1                      # one way to make 0: use no coins
    for coin in coins:
        for amt in range(coin, amount + 1):
            dp[amt] += dp[amt - coin]
    return dp[amount]
\`\`\`

### 0/1 Knapsack
\`\`\`python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]           # skip item i
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                               dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]
\`\`\`

### Powerset Generation (Backtracking)
Generate all 2ⁿ subsets:
\`\`\`python
def powerset(nums):
    result = [[]]
    for n in nums:
        result += [subset + [n] for subset in result]
    return result
# Time: O(2^n), Space: O(2^n)
\`\`\`

### Permutation Generation
\`\`\`python
def permutations(s):
    if len(s) == 0: return [""]
    result = []
    for i, char in enumerate(s):
        rest = s[:i] + s[i+1:]
        for perm in permutations(rest):
            result.append(char + perm)
    return result
# Time: O(n!), Space: O(n!)
\`\`\`

### Backtracking Template
Build solution incrementally, backtrack when a constraint is violated:
\`\`\`python
def backtrack(candidate, result, ...):
    if is_complete(candidate):
        result.append(candidate[:])   # save a copy
        return
    for next_choice in generate_choices(candidate):
        if is_valid(next_choice):
            candidate.append(next_choice)    # make move
            backtrack(candidate, result, ...)
            candidate.pop()                  # undo move (backtrack)
\`\`\`
**Common problems:** N-Queens, Sudoku solver, permutations, combinations, word search.

### Recursive Multiplication (no * operator)
\`\`\`python
def multiply(a, b):
    """Multiply using bit shifts and addition."""
    if b == 0: return 0
    if b == 1: return a
    half = multiply(a, b >> 1)   # b // 2 via right shift
    if b % 2 == 0:
        return half + half
    else:
        return half + half + a   # odd: add one more a
# x * 2 = x << 1 (left shift)
\`\`\`

### DP Pattern Summary

| Pattern | Example problems |
|---------|-----------------|
| **1D DP** | Fibonacci, climbing stairs, house robber |
| **2D DP** | Longest common subsequence, edit distance, unique paths |
| **Knapsack** | Subset sum, coin change, partition equal subsets |
| **Interval DP** | Matrix chain multiplication, burst balloons |

### Key Interview Tips
- Always identify the **recurrence relation** before writing code
- Draw the recursion tree — overlapping sub-trees = use DP
- Top-down is easier to write; bottom-up is more space-efficient
- **State definition** is everything in DP — what does dp[i] represent?
- For backtracking: always undo your move after recursing
    `},{id:"sorting-searching",title:"Sorting & Searching",icon:"↕",summary:"Know O(n log n) sorts cold. Binary search pattern — not just for sorted arrays.",content:`
## Sorting & Searching

### Sorting Complexity

| Algorithm      | Best      | Average   | Worst     | Space  | Stable | Use when |
|----------------|-----------|-----------|-----------|--------|--------|----------|
| Merge Sort     | O(n log n)| O(n log n)| O(n log n)| O(n)   | Yes    | Need stable sort or worst-case guarantee |
| Quick Sort     | O(n log n)| O(n log n)| O(n²)     | O(log n)| No    | General purpose, good average |
| Heap Sort      | O(n log n)| O(n log n)| O(n log n)| O(1)   | No     | In-place with guaranteed O(n log n) |
| Tim Sort (Python) | O(n)  | O(n log n)| O(n log n)| O(n)   | Yes    | Python's built-in — best for real data |
| Counting Sort  | O(n+k)    | O(n+k)    | O(n+k)    | O(k)   | Yes    | Small integer range |
| Radix Sort     | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes    | Fixed-width integers/strings |

**Non-comparison sorts** (Counting, Radix) break the O(n log n) lower bound — they only work on specific data types.

### Python Sort
\`\`\`python
arr.sort()                      # in-place, Timsort O(n log n), stable
sorted_arr = sorted(arr)        # returns new list
arr.sort(key=lambda x: x[1])   # sort by second element
arr.sort(key=lambda x: -x)     # descending (negate for numbers)
arr.sort(reverse=True)          # descending
\`\`\`

### Merge Sort
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
\`\`\`

### Quick Sort
\`\`\`python
def quicksort(arr, lo, hi):
    if lo < hi:
        p = partition(arr, lo, hi)
        quicksort(arr, lo, p - 1)
        quicksort(arr, p + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1
\`\`\`

### Binary Search
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:   return mid
        elif arr[mid] < target:  left = mid + 1
        else:                    right = mid - 1
    return -1

# Find leftmost occurrence (lower bound)
def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target: left = mid + 1
        else:                 right = mid
    return left
\`\`\`

**Magic index insight:** In a sorted array of distinct integers, \`arr[mid] < mid\` means the magic index must be to the **right** (values are too small on the left); \`arr[mid] > mid\` means search the left.

### Binary Search on the Answer
\`\`\`python
# Template: "find minimum X such that condition(X) is True"
# Works when the answer space is monotonic (False, False, ..., True, True, ...)
def binary_search_answer(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid): hi = mid   # might be answer, search left
        else:              lo = mid + 1
    return lo
\`\`\`

**Example uses:** minimum days to complete, koko eating bananas, allocate minimum pages.

### Quick Select — k-th Smallest in O(n) Average
\`\`\`python
import random

def quick_select(arr, k):
    """Find the k-th smallest element (1-indexed). Average O(n)."""
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        pivot_idx = random.randint(lo, hi)
        arr[pivot_idx], arr[hi] = arr[hi], arr[pivot_idx]
        pivot = arr[hi]
        i = lo - 1
        for j in range(lo, hi):
            if arr[j] <= pivot:
                i += 1; arr[i], arr[j] = arr[j], arr[i]
        i += 1
        arr[i], arr[hi] = arr[hi], arr[i]
        if i == k - 1:   return arr[i]
        elif i < k - 1:  lo = i + 1
        else:            hi = i - 1
    return arr[lo]
\`\`\`

### Key Interview Tips
- Python's \`sort()\` is Timsort — stable, O(n log n), and very fast on partially-sorted data
- Binary search works on any **monotonic** condition, not just sorted arrays
- "Find the minimum/maximum value that satisfies X" → binary search on the answer
- Use \`bisect\` module for pre-sorted arrays: \`bisect_left\`, \`bisect_right\` — no need to roll your own
- Quick sort has O(n²) worst case — use median-of-3 pivot or shuffle input to avoid it
    `},{id:"bit-manipulation",title:"Bit Manipulation",icon:"01",summary:"XOR, AND, OR, shifts. Fast and elegant for specific problems.",content:`
## Bit Manipulation

Bitwise operations work directly on binary representations. Fast, constant-space tricks.

### Operators

| Operator | Symbol | Example |
|----------|--------|---------|
| AND      | \`&\`  | \`5 & 3 = 1\`  (101 & 011 = 001) |
| OR       | \`|\`  | \`5 | 3 = 7\`  (101 | 011 = 111) |
| XOR      | \`^\`  | \`5 ^ 3 = 6\`  (101 ^ 011 = 110) |
| NOT      | \`~\`  | \`~5 = -6\` |
| Left shift  | \`<<\` | \`2 << 3 = 16\` (multiply by 2³) |
| Right shift | \`>>\` | \`16 >> 2 = 4\` (divide by 2²) |

Left shift × 1 bit = multiply by 2. Right shift × 1 bit = integer divide by 2.

### Core Bit Operations
\`\`\`python
# Get bit i
(n >> i) & 1          # 1 if bit i is set, 0 otherwise

# Set bit i
n | (1 << i)

# Clear bit i
n & ~(1 << i)

# Toggle bit i
n ^ (1 << i)

# Clear the LOWEST set bit (Brian Kernighan trick)
n & (n - 1)

# Isolate the lowest set bit
n & (-n)
\`\`\`

### Common Tricks
\`\`\`python
# Check if power of 2 (exactly one bit set)
n > 0 and (n & (n - 1)) == 0

# Count set bits (Brian Kernighan's algorithm)
count = 0
while n:
    n &= (n - 1)    # clears the lowest set bit each iteration
    count += 1

# Simpler (Python-specific)
bin(n).count('1')

# XOR trick: find the ONE unique element (all others appear twice)
def find_unique(arr):
    result = 0
    for x in arr:
        result ^= x
    return result     # a ^ a = 0, so duplicates cancel out

# Swap without temp variable
a ^= b
b ^= a
a ^= b

# Recursive multiplication with bit shifts
def multiply(a, b):
    if b == 0: return 0
    half = multiply(a, b >> 1)      # b // 2
    return half + half if b % 2 == 0 else half + half + a
\`\`\`

### Two's Complement
Negative numbers in binary: flip all bits, then add 1.
- \`-1\` = all 1s (\`...11111111\`)
- \`-n = ~n + 1\`
- In Python, integers are arbitrary precision — no overflow risk

### XOR Properties (memorise these)
\`\`\`
a ^ 0 = a          # XOR with 0 is identity
a ^ a = 0          # XOR with self is 0
a ^ b = b ^ a      # commutative
(a ^ b) ^ c = a ^ (b ^ c)   # associative
\`\`\`
XOR is its own inverse — \`(a ^ b) ^ b = a\`.

### Subset Enumeration with Bitmasks
\`\`\`python
def all_subsets(arr):
    n = len(arr)
    for mask in range(1 << n):      # 0 to 2^n - 1
        subset = [arr[i] for i in range(n) if mask & (1 << i)]
        print(subset)
# Time: O(2^n × n), useful for small n (≤ 20)
\`\`\`

### Key Interview Tips
- XOR is your tool for finding a unique/missing element when all others appear in pairs
- Left/right shift is cleaner than writing \`* 2\` or \`// 2\` in bit-manipulation contexts
- \`n & (n-1)\` clearing the lowest set bit is useful for counting set bits and power-of-2 checks
- In Python, \`~n\` gives \`-(n+1)\` due to two's complement — use with care
    `},{id:"interview-patterns",title:"Interview Patterns",icon:"⚡",summary:"Two pointers, sliding window, fast/slow, merge intervals. Pattern recognition wins interviews.",content:`
## Interview Patterns

Recognizing the right pattern is more important than memorizing solutions.

---

### 1. Two Pointers
**When:** Sorted array, find pair with target sum, palindrome check, container with most water.

\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:   return [left, right]
        elif s < target:  left += 1
        else:             right -= 1
    return []
\`\`\`
Time: O(n), Space: O(1).

---

### 2. Sliding Window
**When:** Subarray/substring with constraint (max sum, longest with k distinct chars, etc.)

\`\`\`python
def longest_substring_k_distinct(s, k):
    freq = {}
    left = best = 0
    for right, c in enumerate(s):
        freq[c] = freq.get(c, 0) + 1
        while len(freq) > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                del freq[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best
\`\`\`

---

### 3. Fast & Slow Pointers
**When:** Cycle detection, find middle of linked list, nth from end.

\`\`\`python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
\`\`\`

---

### 4. Merge Intervals
**When:** Overlapping intervals, meeting rooms, merge calendar events.

\`\`\`python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
\`\`\`

---

### 5. Binary Search on Answer
**When:** "Find minimum X such that condition holds" — answer space is monotonic (False...True or True...False).

\`\`\`python
def min_days_to_bloom(bloomDay, m, k):
    def can_bloom(day):
        blooms = flowers = 0
        for d in bloomDay:
            if d <= day:
                flowers += 1
                if flowers == k:
                    blooms += 1; flowers = 0
            else:
                flowers = 0
        return blooms >= m

    lo, hi = min(bloomDay), max(bloomDay)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_bloom(mid): hi = mid
        else:              lo = mid + 1
    return lo
\`\`\`

---

### 6. Monotonic Stack
**When:** Next greater element, largest rectangle in histogram, daily temperatures.

\`\`\`python
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # indices of elements waiting for their "next greater"
    for i, n in enumerate(nums):
        while stack and nums[stack[-1]] < n:
            result[stack.pop()] = n   # n is the answer for stack[-1]
        stack.append(i)
    return result
\`\`\`

---

### 7. Greedy Algorithms
Make the locally optimal choice at each step — works when problems have **greedy choice property** + **optimal substructure**.

\`\`\`python
# Activity selection: maximize non-overlapping intervals
def max_activities(intervals):
    # Sort by end time — earliest finish first
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float('-inf')
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
\`\`\`

**Other greedy problems:** fractional knapsack, Huffman coding, minimum spanning tree (Prim's/Kruskal's), jump game.

---

### 8. Backtracking
**When:** Generate all solutions, combinations, permutations, N-Queens, Sudoku.

\`\`\`python
def backtrack(candidate, result):
    if is_complete(candidate):
        result.append(candidate[:])
        return
    for choice in generate_choices(candidate):
        if is_valid(choice):
            candidate.append(choice)        # make move
            backtrack(candidate, result)
            candidate.pop()                 # undo (backtrack)
\`\`\`

---

### 9. Divide and Conquer
Break into sub-problems, solve recursively, combine. Classic examples: merge sort, quick sort, binary search, closest pair of points.

---

### Iterative vs Recursive

| | Recursive | Iterative |
|--|--|--|
| Code clarity | Often cleaner | More boilerplate |
| Stack overflow | Risk on deep/skewed input | Explicit stack, safe |
| Preferred for | Trees (natural structure) | Large graphs, skewed trees |

---

### Edge Cases Checklist
Before submitting any solution, verify these:
- Empty input (null, empty string, empty array)
- Single element
- All same elements
- Already sorted / reverse sorted
- Cycles in graphs or linked lists
- Disconnected graphs
- Skewed trees (worst case for BST ops)
- Integer overflow (less relevant in Python)

---

### Complexity Quick Reference

| Complexity | Name | Example |
|-----------|------|---------|
| O(1)      | Constant | Hash map lookup |
| O(log n)  | Logarithmic | Binary search, heap ops |
| O(n)      | Linear | Single pass |
| O(n log n)| Linearithmic | Sorting, divide & conquer |
| O(n²)     | Quadratic | Nested loops |
| O(2ⁿ)     | Exponential | Recursion without memo |
| O(n!)     | Factorial | Permutations |

---

### Pattern Recognition Cheat Sheet

| Signal in problem | Try |
|-------------------|-----|
| Sorted array, pair sum | Two pointers |
| Subarray/substring constraint | Sliding window |
| Linked list cycle | Fast & slow |
| Overlapping intervals | Sort + merge |
| Min/max feasibility | Binary search on answer |
| Next greater/smaller | Monotonic stack |
| Make locally optimal choices | Greedy |
| All combinations/paths | DFS + backtracking |
| Dependencies/ordering | Topological sort |
| Shortest path (unweighted) | BFS |
| Shortest path (weighted) | Dijkstra |
| Connected components / cycles | Union-Find |
| Repeated sub-problems | DP (top-down or bottom-up) |
    `}];function Tx({topic:e}){return m.jsx(Le,{to:`/learn/${e.id}`,className:"block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-900/20 group",children:m.jsxs("div",{className:"flex items-start gap-4",children:[m.jsx("div",{className:"w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center font-mono text-emerald-400 font-bold text-sm shrink-0 group-hover:bg-emerald-900/30 transition-colors",children:e.icon}),m.jsxs("div",{children:[m.jsx("h3",{className:"font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1",children:e.title}),m.jsx("p",{className:"text-sm text-gray-400 leading-relaxed",children:e.summary})]})]})})}function Ox(){return m.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-10",children:[m.jsxs("div",{className:"mb-8",children:[m.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Learn"}),m.jsx("p",{className:"text-gray-400",children:"Core data structures and algorithms — concepts, complexity tables, and annotated code examples."})]}),m.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:rr.map(e=>m.jsx(Tx,{topic:e},e.id))})]})}function Cx(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const Ax=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Rx=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Ix={};function Pd(e,t){return(Ix.jsx?Rx:Ax).test(e)}const Mx=/[ \t\n\f\r]/g;function Px(e){return typeof e=="object"?e.type==="text"?Ld(e.value):!1:Ld(e)}function Ld(e){return e.replace(Mx,"")===""}class Zi{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}Zi.prototype.normal={};Zi.prototype.property={};Zi.prototype.space=void 0;function Sm(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new Zi(n,r,t)}function Dl(e){return e.toLowerCase()}class Je{constructor(t,n){this.attribute=n,this.property=t}}Je.prototype.attribute="";Je.prototype.booleanish=!1;Je.prototype.boolean=!1;Je.prototype.commaOrSpaceSeparated=!1;Je.prototype.commaSeparated=!1;Je.prototype.defined=!1;Je.prototype.mustUseProperty=!1;Je.prototype.number=!1;Je.prototype.overloadedBoolean=!1;Je.prototype.property="";Je.prototype.spaceSeparated=!1;Je.prototype.space=void 0;let Lx=0;const J=Vn(),we=Vn(),Fl=Vn(),z=Vn(),ce=Vn(),Sr=Vn(),tt=Vn();function Vn(){return 2**++Lx}const Bl=Object.freeze(Object.defineProperty({__proto__:null,boolean:J,booleanish:we,commaOrSpaceSeparated:tt,commaSeparated:Sr,number:z,overloadedBoolean:Fl,spaceSeparated:ce},Symbol.toStringTag,{value:"Module"})),ws=Object.keys(Bl);class qc extends Je{constructor(t,n,r,i){let a=-1;if(super(t,n),Dd(this,"space",i),typeof r=="number")for(;++a<ws.length;){const o=ws[a];Dd(this,ws[a],(r&Bl[o])===Bl[o])}}}qc.prototype.defined=!0;function Dd(e,t,n){n&&(e[t]=n)}function zr(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const a=new qc(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(a.mustUseProperty=!0),t[r]=a,n[Dl(r)]=r,n[Dl(a.attribute)]=r}return new Zi(t,n,e.space)}const Nm=zr({properties:{ariaActiveDescendant:null,ariaAtomic:we,ariaAutoComplete:null,ariaBusy:we,ariaChecked:we,ariaColCount:z,ariaColIndex:z,ariaColSpan:z,ariaControls:ce,ariaCurrent:null,ariaDescribedBy:ce,ariaDetails:null,ariaDisabled:we,ariaDropEffect:ce,ariaErrorMessage:null,ariaExpanded:we,ariaFlowTo:ce,ariaGrabbed:we,ariaHasPopup:null,ariaHidden:we,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:ce,ariaLevel:z,ariaLive:null,ariaModal:we,ariaMultiLine:we,ariaMultiSelectable:we,ariaOrientation:null,ariaOwns:ce,ariaPlaceholder:null,ariaPosInSet:z,ariaPressed:we,ariaReadOnly:we,ariaRelevant:null,ariaRequired:we,ariaRoleDescription:ce,ariaRowCount:z,ariaRowIndex:z,ariaRowSpan:z,ariaSelected:we,ariaSetSize:z,ariaSort:null,ariaValueMax:z,ariaValueMin:z,ariaValueNow:z,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function Tm(e,t){return t in e?e[t]:t}function Om(e,t){return Tm(e,t.toLowerCase())}const Dx=zr({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Sr,acceptCharset:ce,accessKey:ce,action:null,allow:null,allowFullScreen:J,allowPaymentRequest:J,allowUserMedia:J,alt:null,as:null,async:J,autoCapitalize:null,autoComplete:ce,autoFocus:J,autoPlay:J,blocking:ce,capture:null,charSet:null,checked:J,cite:null,className:ce,cols:z,colSpan:null,content:null,contentEditable:we,controls:J,controlsList:ce,coords:z|Sr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:J,defer:J,dir:null,dirName:null,disabled:J,download:Fl,draggable:we,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:J,formTarget:null,headers:ce,height:z,hidden:Fl,high:z,href:null,hrefLang:null,htmlFor:ce,httpEquiv:ce,id:null,imageSizes:null,imageSrcSet:null,inert:J,inputMode:null,integrity:null,is:null,isMap:J,itemId:null,itemProp:ce,itemRef:ce,itemScope:J,itemType:ce,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:J,low:z,manifest:null,max:null,maxLength:z,media:null,method:null,min:null,minLength:z,multiple:J,muted:J,name:null,nonce:null,noModule:J,noValidate:J,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:J,optimum:z,pattern:null,ping:ce,placeholder:null,playsInline:J,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:J,referrerPolicy:null,rel:ce,required:J,reversed:J,rows:z,rowSpan:z,sandbox:ce,scope:null,scoped:J,seamless:J,selected:J,shadowRootClonable:J,shadowRootDelegatesFocus:J,shadowRootMode:null,shape:null,size:z,sizes:null,slot:null,span:z,spellCheck:we,src:null,srcDoc:null,srcLang:null,srcSet:null,start:z,step:null,style:null,tabIndex:z,target:null,title:null,translate:null,type:null,typeMustMatch:J,useMap:null,value:we,width:z,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:ce,axis:null,background:null,bgColor:null,border:z,borderColor:null,bottomMargin:z,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:J,declare:J,event:null,face:null,frame:null,frameBorder:null,hSpace:z,leftMargin:z,link:null,longDesc:null,lowSrc:null,marginHeight:z,marginWidth:z,noResize:J,noHref:J,noShade:J,noWrap:J,object:null,profile:null,prompt:null,rev:null,rightMargin:z,rules:null,scheme:null,scrolling:we,standby:null,summary:null,text:null,topMargin:z,valueType:null,version:null,vAlign:null,vLink:null,vSpace:z,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:J,disableRemotePlayback:J,prefix:null,property:null,results:z,security:null,unselectable:null},space:"html",transform:Om}),Fx=zr({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:tt,accentHeight:z,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:z,amplitude:z,arabicForm:null,ascent:z,attributeName:null,attributeType:null,azimuth:z,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:z,by:null,calcMode:null,capHeight:z,className:ce,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:z,diffuseConstant:z,direction:null,display:null,dur:null,divisor:z,dominantBaseline:null,download:J,dx:null,dy:null,edgeMode:null,editable:null,elevation:z,enableBackground:null,end:null,event:null,exponent:z,externalResourcesRequired:null,fill:null,fillOpacity:z,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Sr,g2:Sr,glyphName:Sr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:z,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:z,horizOriginX:z,horizOriginY:z,id:null,ideographic:z,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:z,k:z,k1:z,k2:z,k3:z,k4:z,kernelMatrix:tt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:z,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:z,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:z,overlineThickness:z,paintOrder:null,panose1:null,path:null,pathLength:z,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:ce,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:z,pointsAtY:z,pointsAtZ:z,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:tt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:tt,rev:tt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:tt,requiredFeatures:tt,requiredFonts:tt,requiredFormats:tt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:z,specularExponent:z,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:z,strikethroughThickness:z,string:null,stroke:null,strokeDashArray:tt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:z,strokeOpacity:z,strokeWidth:null,style:null,surfaceScale:z,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:tt,tabIndex:z,tableValues:null,target:null,targetX:z,targetY:z,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:tt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:z,underlineThickness:z,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:z,values:null,vAlphabetic:z,vMathematical:z,vectorEffect:null,vHanging:z,vIdeographic:z,version:null,vertAdvY:z,vertOriginX:z,vertOriginY:z,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:z,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Tm}),Cm=zr({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),Am=zr({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Om}),Rm=zr({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),Bx={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},zx=/[A-Z]/g,Fd=/-[a-z]/g,Ux=/^data[-\w.:]+$/i;function jx(e,t){const n=Dl(t);let r=t,i=Je;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&Ux.test(t)){if(t.charAt(4)==="-"){const a=t.slice(5).replace(Fd,Hx);r="data"+a.charAt(0).toUpperCase()+a.slice(1)}else{const a=t.slice(4);if(!Fd.test(a)){let o=a.replace(zx,$x);o.charAt(0)!=="-"&&(o="-"+o),t="data"+o}}i=qc}return new i(r,t)}function $x(e){return"-"+e.toLowerCase()}function Hx(e){return e.charAt(1).toUpperCase()}const Wx=Sm([Nm,Dx,Cm,Am,Rm],"html"),Gc=Sm([Nm,Fx,Cm,Am,Rm],"svg");function qx(e){return e.join(" ").trim()}var Kc={},Bd=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,Gx=/\n/g,Kx=/^\s*/,Vx=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,Yx=/^:\s*/,Qx=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,Xx=/^[;\s]*/,Zx=/^\s+|\s+$/g,Jx=`
`,zd="/",Ud="*",Mn="",e0="comment",t0="declaration";function n0(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(v){var x=v.match(Gx);x&&(n+=x.length);var S=v.lastIndexOf(Jx);r=~S?v.length-S:r+v.length}function a(){var v={line:n,column:r};return function(x){return x.position=new o(v),c(),x}}function o(v){this.start=v,this.end={line:n,column:r},this.source=t.source}o.prototype.content=e;function s(v){var x=new Error(t.source+":"+n+":"+r+": "+v);if(x.reason=v,x.filename=t.source,x.line=n,x.column=r,x.source=e,!t.silent)throw x}function l(v){var x=v.exec(e);if(x){var S=x[0];return i(S),e=e.slice(S.length),x}}function c(){l(Kx)}function u(v){var x;for(v=v||[];x=d();)x!==!1&&v.push(x);return v}function d(){var v=a();if(!(zd!=e.charAt(0)||Ud!=e.charAt(1))){for(var x=2;Mn!=e.charAt(x)&&(Ud!=e.charAt(x)||zd!=e.charAt(x+1));)++x;if(x+=2,Mn===e.charAt(x-1))return s("End of comment missing");var S=e.slice(2,x-2);return r+=2,i(S),e=e.slice(x),r+=2,v({type:e0,comment:S})}}function p(){var v=a(),x=l(Vx);if(x){if(d(),!l(Yx))return s("property missing ':'");var S=l(Qx),h=v({type:t0,property:jd(x[0].replace(Bd,Mn)),value:S?jd(S[0].replace(Bd,Mn)):Mn});return l(Xx),h}}function f(){var v=[];u(v);for(var x;x=p();)x!==!1&&(v.push(x),u(v));return v}return c(),f()}function jd(e){return e?e.replace(Zx,Mn):Mn}var r0=n0,i0=qa&&qa.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Kc,"__esModule",{value:!0});Kc.default=o0;const a0=i0(r0);function o0(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,a0.default)(e),i=typeof t=="function";return r.forEach(a=>{if(a.type!=="declaration")return;const{property:o,value:s}=a;i?t(o,s,a):s&&(n=n||{},n[o]=s)}),n}var Ho={};Object.defineProperty(Ho,"__esModule",{value:!0});Ho.camelCase=void 0;var s0=/^--[a-zA-Z0-9_-]+$/,l0=/-([a-z])/g,c0=/^[^-]+$/,u0=/^-(webkit|moz|ms|o|khtml)-/,d0=/^-(ms)-/,p0=function(e){return!e||c0.test(e)||s0.test(e)},f0=function(e,t){return t.toUpperCase()},$d=function(e,t){return"".concat(t,"-")},h0=function(e,t){return t===void 0&&(t={}),p0(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(d0,$d):e=e.replace(u0,$d),e.replace(l0,f0))};Ho.camelCase=h0;var m0=qa&&qa.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},g0=m0(Kc),y0=Ho;function zl(e,t){var n={};return!e||typeof e!="string"||(0,g0.default)(e,function(r,i){r&&i&&(n[(0,y0.camelCase)(r,t)]=i)}),n}zl.default=zl;var b0=zl;const v0=ko(b0),Im=Mm("end"),Vc=Mm("start");function Mm(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function x0(e){const t=Vc(e),n=Im(e);if(t&&n)return{start:t,end:n}}function bi(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Hd(e.position):"start"in e||"end"in e?Hd(e):"line"in e||"column"in e?Ul(e):""}function Ul(e){return Wd(e&&e.line)+":"+Wd(e&&e.column)}function Hd(e){return Ul(e&&e.start)+"-"+Ul(e&&e.end)}function Wd(e){return e&&typeof e=="number"?e:1}class Fe extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",a={},o=!1;if(n&&("line"in n&&"column"in n?a={place:n}:"start"in n&&"end"in n?a={place:n}:"type"in n?a={ancestors:[n],place:n.position}:a={...n}),typeof t=="string"?i=t:!a.cause&&t&&(o=!0,i=t.message,a.cause=t),!a.ruleId&&!a.source&&typeof r=="string"){const l=r.indexOf(":");l===-1?a.ruleId=r:(a.source=r.slice(0,l),a.ruleId=r.slice(l+1))}if(!a.place&&a.ancestors&&a.ancestors){const l=a.ancestors[a.ancestors.length-1];l&&(a.place=l.position)}const s=a.place&&"start"in a.place?a.place.start:a.place;this.ancestors=a.ancestors||void 0,this.cause=a.cause||void 0,this.column=s?s.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=s?s.line:void 0,this.name=bi(a.place)||"1:1",this.place=a.place||void 0,this.reason=this.message,this.ruleId=a.ruleId||void 0,this.source=a.source||void 0,this.stack=o&&a.cause&&typeof a.cause.stack=="string"?a.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Fe.prototype.file="";Fe.prototype.name="";Fe.prototype.reason="";Fe.prototype.message="";Fe.prototype.stack="";Fe.prototype.column=void 0;Fe.prototype.line=void 0;Fe.prototype.ancestors=void 0;Fe.prototype.cause=void 0;Fe.prototype.fatal=void 0;Fe.prototype.place=void 0;Fe.prototype.ruleId=void 0;Fe.prototype.source=void 0;const Yc={}.hasOwnProperty,_0=new Map,w0=/[A-Z]/g,E0=new Set(["table","tbody","thead","tfoot","tr"]),k0=new Set(["td","th"]),Pm="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function S0(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=M0(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=I0(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?Gc:Wx,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},a=Lm(i,e,void 0);return a&&typeof a!="string"?a:i.create(e,i.Fragment,{children:a||void 0},void 0)}function Lm(e,t,n){if(t.type==="element")return N0(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return T0(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return C0(e,t,n);if(t.type==="mdxjsEsm")return O0(e,t);if(t.type==="root")return A0(e,t,n);if(t.type==="text")return R0(e,t)}function N0(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=Gc,e.schema=i),e.ancestors.push(t);const a=Fm(e,t.tagName,!1),o=P0(e,t);let s=Xc(e,t);return E0.has(t.tagName)&&(s=s.filter(function(l){return typeof l=="string"?!Px(l):!0})),Dm(e,o,a,t),Qc(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function T0(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}ji(e,t.position)}function O0(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);ji(e,t.position)}function C0(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=Gc,e.schema=i),e.ancestors.push(t);const a=t.name===null?e.Fragment:Fm(e,t.name,!0),o=L0(e,t),s=Xc(e,t);return Dm(e,o,a,t),Qc(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function A0(e,t,n){const r={};return Qc(r,Xc(e,t)),e.create(t,e.Fragment,r,n)}function R0(e,t){return t.value}function Dm(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Qc(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function I0(e,t,n){return r;function r(i,a,o,s){const c=Array.isArray(o.children)?n:t;return s?c(a,o,s):c(a,o)}}function M0(e,t){return n;function n(r,i,a,o){const s=Array.isArray(a.children),l=Vc(r);return t(i,a,o,s,{columnNumber:l?l.column-1:void 0,fileName:e,lineNumber:l?l.line:void 0},void 0)}}function P0(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&Yc.call(t.properties,i)){const a=D0(e,i,t.properties[i]);if(a){const[o,s]=a;e.tableCellAlignToStyle&&o==="align"&&typeof s=="string"&&k0.has(t.tagName)?r=s:n[o]=s}}if(r){const a=n.style||(n.style={});a[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function L0(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const a=r.data.estree.body[0];a.type;const o=a.expression;o.type;const s=o.properties[0];s.type,Object.assign(n,e.evaluater.evaluateExpression(s.argument))}else ji(e,t.position);else{const i=r.name;let a;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const s=r.value.data.estree.body[0];s.type,a=e.evaluater.evaluateExpression(s.expression)}else ji(e,t.position);else a=r.value===null?!0:r.value;n[i]=a}return n}function Xc(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:_0;for(;++r<t.children.length;){const a=t.children[r];let o;if(e.passKeys){const l=a.type==="element"?a.tagName:a.type==="mdxJsxFlowElement"||a.type==="mdxJsxTextElement"?a.name:void 0;if(l){const c=i.get(l)||0;o=l+"-"+c,i.set(l,c+1)}}const s=Lm(e,a,o);s!==void 0&&n.push(s)}return n}function D0(e,t,n){const r=jx(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?Cx(n):qx(n)),r.property==="style"){let i=typeof n=="object"?n:F0(e,String(n));return e.stylePropertyNameCase==="css"&&(i=B0(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?Bx[r.property]||r.property:r.attribute,n]}}function F0(e,t){try{return v0(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new Fe("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=Pm+"#cannot-parse-style-attribute",i}}function Fm(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let a=-1,o;for(;++a<i.length;){const s=Pd(i[a])?{type:"Identifier",name:i[a]}:{type:"Literal",value:i[a]};o=o?{type:"MemberExpression",object:o,property:s,computed:!!(a&&s.type==="Literal"),optional:!1}:s}r=o}else r=Pd(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return Yc.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);ji(e)}function ji(e,t){const n=new Fe("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Pm+"#cannot-handle-mdx-estrees-without-createevaluater",n}function B0(e){const t={};let n;for(n in e)Yc.call(e,n)&&(t[z0(n)]=e[n]);return t}function z0(e){let t=e.replace(w0,U0);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function U0(e){return"-"+e.toLowerCase()}const Es={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},j0={};function $0(e,t){const n=j0,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Bm(e,r,i)}function Bm(e,t,n){if(H0(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return qd(e.children,t,n)}return Array.isArray(e)?qd(e,t,n):""}function qd(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=Bm(e[i],t,n);return r.join("")}function H0(e){return!!(e&&typeof e=="object")}const Gd=document.createElement("i");function Zc(e){const t="&"+e+";";Gd.innerHTML=t;const n=Gd.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function Dt(e,t,n,r){const i=e.length;let a=0,o;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);a<r.length;)o=r.slice(a,a+1e4),o.unshift(t,0),e.splice(...o),a+=1e4,t+=1e4}function pt(e,t){return e.length>0?(Dt(e,e.length,0,t),e):t}const Kd={}.hasOwnProperty;function W0(e){const t={};let n=-1;for(;++n<e.length;)q0(t,e[n]);return t}function q0(e,t){let n;for(n in t){const i=(Kd.call(e,n)?e[n]:void 0)||(e[n]={}),a=t[n];let o;if(a)for(o in a){Kd.call(i,o)||(i[o]=[]);const s=a[o];G0(i[o],Array.isArray(s)?s:s?[s]:[])}}}function G0(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);Dt(e,0,0,r)}function zm(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function Nr(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Mt=Cn(/[A-Za-z]/),at=Cn(/[\dA-Za-z]/),K0=Cn(/[#-'*+\--9=?A-Z^-~]/);function jl(e){return e!==null&&(e<32||e===127)}const $l=Cn(/\d/),V0=Cn(/[\dA-Fa-f]/),Y0=Cn(/[!-/:-@[-`{-~]/);function Q(e){return e!==null&&e<-2}function Ze(e){return e!==null&&(e<0||e===32)}function ae(e){return e===-2||e===-1||e===32}const Q0=Cn(new RegExp("\\p{P}|\\p{S}","u")),X0=Cn(/\s/);function Cn(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function Ur(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const a=e.charCodeAt(n);let o="";if(a===37&&at(e.charCodeAt(n+1))&&at(e.charCodeAt(n+2)))i=2;else if(a<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))||(o=String.fromCharCode(a));else if(a>55295&&a<57344){const s=e.charCodeAt(n+1);a<56320&&s>56319&&s<57344?(o=String.fromCharCode(a,s),i=1):o="�"}else o=String.fromCharCode(a);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,o=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function de(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let a=0;return o;function o(l){return ae(l)?(e.enter(n),s(l)):t(l)}function s(l){return ae(l)&&a++<i?(e.consume(l),s):(e.exit(n),t(l))}}const Z0={tokenize:J0};function J0(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(s){if(s===null){e.consume(s);return}return e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),de(e,t,"linePrefix")}function i(s){return e.enter("paragraph"),a(s)}function a(s){const l=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=l),n=l,o(s)}function o(s){if(s===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(s);return}return Q(s)?(e.consume(s),e.exit("chunkText"),a):(e.consume(s),o)}}const e_={tokenize:t_},Vd={tokenize:n_};function t_(e){const t=this,n=[];let r=0,i,a,o;return s;function s(y){if(r<n.length){const E=n[r];return t.containerState=E[1],e.attempt(E[0].continuation,l,c)(y)}return c(y)}function l(y){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&g();const E=t.events.length;let N=E,w;for(;N--;)if(t.events[N][0]==="exit"&&t.events[N][1].type==="chunkFlow"){w=t.events[N][1].end;break}h(r);let A=E;for(;A<t.events.length;)t.events[A][1].end={...w},A++;return Dt(t.events,N+1,0,t.events.slice(E)),t.events.length=A,c(y)}return s(y)}function c(y){if(r===n.length){if(!i)return p(y);if(i.currentConstruct&&i.currentConstruct.concrete)return v(y);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Vd,u,d)(y)}function u(y){return i&&g(),h(r),p(y)}function d(y){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,v(y)}function p(y){return t.containerState={},e.attempt(Vd,f,v)(y)}function f(y){return r++,n.push([t.currentConstruct,t.containerState]),p(y)}function v(y){if(y===null){i&&g(),h(0),e.consume(y);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:a}),x(y)}function x(y){if(y===null){S(e.exit("chunkFlow"),!0),h(0),e.consume(y);return}return Q(y)?(e.consume(y),S(e.exit("chunkFlow")),r=0,t.interrupt=void 0,s):(e.consume(y),x)}function S(y,E){const N=t.sliceStream(y);if(E&&N.push(null),y.previous=a,a&&(a.next=y),a=y,i.defineSkip(y.start),i.write(N),t.parser.lazy[y.start.line]){let w=i.events.length;for(;w--;)if(i.events[w][1].start.offset<o&&(!i.events[w][1].end||i.events[w][1].end.offset>o))return;const A=t.events.length;let I=A,U,M;for(;I--;)if(t.events[I][0]==="exit"&&t.events[I][1].type==="chunkFlow"){if(U){M=t.events[I][1].end;break}U=!0}for(h(r),w=A;w<t.events.length;)t.events[w][1].end={...M},w++;Dt(t.events,I+1,0,t.events.slice(A)),t.events.length=w}}function h(y){let E=n.length;for(;E-- >y;){const N=n[E];t.containerState=N[1],N[0].exit.call(t,e)}n.length=y}function g(){i.write([null]),a=void 0,i=void 0,t.containerState._closeFlow=void 0}}function n_(e,t,n){return de(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Yd(e){if(e===null||Ze(e)||X0(e))return 1;if(Q0(e))return 2}function Jc(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const a=e[i].resolveAll;a&&!r.includes(a)&&(t=a(t,n),r.push(a))}return t}const Hl={name:"attention",resolveAll:r_,tokenize:i_};function r_(e,t){let n=-1,r,i,a,o,s,l,c,u;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;l=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const d={...e[r][1].end},p={...e[n][1].start};Qd(d,-l),Qd(p,l),o={type:l>1?"strongSequence":"emphasisSequence",start:d,end:{...e[r][1].end}},s={type:l>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:p},a={type:l>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:l>1?"strong":"emphasis",start:{...o.start},end:{...s.end}},e[r][1].end={...o.start},e[n][1].start={...s.end},c=[],e[r][1].end.offset-e[r][1].start.offset&&(c=pt(c,[["enter",e[r][1],t],["exit",e[r][1],t]])),c=pt(c,[["enter",i,t],["enter",o,t],["exit",o,t],["enter",a,t]]),c=pt(c,Jc(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),c=pt(c,[["exit",a,t],["enter",s,t],["exit",s,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(u=2,c=pt(c,[["enter",e[n][1],t],["exit",e[n][1],t]])):u=0,Dt(e,r-1,n-r+3,c),n=r+c.length-u-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function i_(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Yd(r);let a;return o;function o(l){return a=l,e.enter("attentionSequence"),s(l)}function s(l){if(l===a)return e.consume(l),s;const c=e.exit("attentionSequence"),u=Yd(l),d=!u||u===2&&i||n.includes(l),p=!i||i===2&&u||n.includes(r);return c._open=!!(a===42?d:d&&(i||!p)),c._close=!!(a===42?p:p&&(u||!d)),t(l)}}function Qd(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const a_={name:"autolink",tokenize:o_};function o_(e,t,n){let r=0;return i;function i(f){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(f),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),a}function a(f){return Mt(f)?(e.consume(f),o):f===64?n(f):c(f)}function o(f){return f===43||f===45||f===46||at(f)?(r=1,s(f)):c(f)}function s(f){return f===58?(e.consume(f),r=0,l):(f===43||f===45||f===46||at(f))&&r++<32?(e.consume(f),s):(r=0,c(f))}function l(f){return f===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(f),e.exit("autolinkMarker"),e.exit("autolink"),t):f===null||f===32||f===60||jl(f)?n(f):(e.consume(f),l)}function c(f){return f===64?(e.consume(f),u):K0(f)?(e.consume(f),c):n(f)}function u(f){return at(f)?d(f):n(f)}function d(f){return f===46?(e.consume(f),r=0,u):f===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(f),e.exit("autolinkMarker"),e.exit("autolink"),t):p(f)}function p(f){if((f===45||at(f))&&r++<63){const v=f===45?p:d;return e.consume(f),v}return n(f)}}const Wo={partial:!0,tokenize:s_};function s_(e,t,n){return r;function r(a){return ae(a)?de(e,i,"linePrefix")(a):i(a)}function i(a){return a===null||Q(a)?t(a):n(a)}}const Um={continuation:{tokenize:c_},exit:u_,name:"blockQuote",tokenize:l_};function l_(e,t,n){const r=this;return i;function i(o){if(o===62){const s=r.containerState;return s.open||(e.enter("blockQuote",{_container:!0}),s.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(o),e.exit("blockQuoteMarker"),a}return n(o)}function a(o){return ae(o)?(e.enter("blockQuotePrefixWhitespace"),e.consume(o),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(o))}}function c_(e,t,n){const r=this;return i;function i(o){return ae(o)?de(e,a,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):a(o)}function a(o){return e.attempt(Um,t,n)(o)}}function u_(e){e.exit("blockQuote")}const jm={name:"characterEscape",tokenize:d_};function d_(e,t,n){return r;function r(a){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(a),e.exit("escapeMarker"),i}function i(a){return Y0(a)?(e.enter("characterEscapeValue"),e.consume(a),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(a)}}const $m={name:"characterReference",tokenize:p_};function p_(e,t,n){const r=this;let i=0,a,o;return s;function s(d){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(d),e.exit("characterReferenceMarker"),l}function l(d){return d===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(d),e.exit("characterReferenceMarkerNumeric"),c):(e.enter("characterReferenceValue"),a=31,o=at,u(d))}function c(d){return d===88||d===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(d),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),a=6,o=V0,u):(e.enter("characterReferenceValue"),a=7,o=$l,u(d))}function u(d){if(d===59&&i){const p=e.exit("characterReferenceValue");return o===at&&!Zc(r.sliceSerialize(p))?n(d):(e.enter("characterReferenceMarker"),e.consume(d),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return o(d)&&i++<a?(e.consume(d),u):n(d)}}const Xd={partial:!0,tokenize:h_},Zd={concrete:!0,name:"codeFenced",tokenize:f_};function f_(e,t,n){const r=this,i={partial:!0,tokenize:N};let a=0,o=0,s;return l;function l(w){return c(w)}function c(w){const A=r.events[r.events.length-1];return a=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,s=w,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),u(w)}function u(w){return w===s?(o++,e.consume(w),u):o<3?n(w):(e.exit("codeFencedFenceSequence"),ae(w)?de(e,d,"whitespace")(w):d(w))}function d(w){return w===null||Q(w)?(e.exit("codeFencedFence"),r.interrupt?t(w):e.check(Xd,x,E)(w)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),p(w))}function p(w){return w===null||Q(w)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),d(w)):ae(w)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),de(e,f,"whitespace")(w)):w===96&&w===s?n(w):(e.consume(w),p)}function f(w){return w===null||Q(w)?d(w):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),v(w))}function v(w){return w===null||Q(w)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),d(w)):w===96&&w===s?n(w):(e.consume(w),v)}function x(w){return e.attempt(i,E,S)(w)}function S(w){return e.enter("lineEnding"),e.consume(w),e.exit("lineEnding"),h}function h(w){return a>0&&ae(w)?de(e,g,"linePrefix",a+1)(w):g(w)}function g(w){return w===null||Q(w)?e.check(Xd,x,E)(w):(e.enter("codeFlowValue"),y(w))}function y(w){return w===null||Q(w)?(e.exit("codeFlowValue"),g(w)):(e.consume(w),y)}function E(w){return e.exit("codeFenced"),t(w)}function N(w,A,I){let U=0;return M;function M(L){return w.enter("lineEnding"),w.consume(L),w.exit("lineEnding"),$}function $(L){return w.enter("codeFencedFence"),ae(L)?de(w,W,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(L):W(L)}function W(L){return L===s?(w.enter("codeFencedFenceSequence"),Y(L)):I(L)}function Y(L){return L===s?(U++,w.consume(L),Y):U>=o?(w.exit("codeFencedFenceSequence"),ae(L)?de(w,V,"whitespace")(L):V(L)):I(L)}function V(L){return L===null||Q(L)?(w.exit("codeFencedFence"),A(L)):I(L)}}}function h_(e,t,n){const r=this;return i;function i(o){return o===null?n(o):(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),a)}function a(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}const ks={name:"codeIndented",tokenize:g_},m_={partial:!0,tokenize:y_};function g_(e,t,n){const r=this;return i;function i(c){return e.enter("codeIndented"),de(e,a,"linePrefix",5)(c)}function a(c){const u=r.events[r.events.length-1];return u&&u[1].type==="linePrefix"&&u[2].sliceSerialize(u[1],!0).length>=4?o(c):n(c)}function o(c){return c===null?l(c):Q(c)?e.attempt(m_,o,l)(c):(e.enter("codeFlowValue"),s(c))}function s(c){return c===null||Q(c)?(e.exit("codeFlowValue"),o(c)):(e.consume(c),s)}function l(c){return e.exit("codeIndented"),t(c)}}function y_(e,t,n){const r=this;return i;function i(o){return r.parser.lazy[r.now().line]?n(o):Q(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i):de(e,a,"linePrefix",5)(o)}function a(o){const s=r.events[r.events.length-1];return s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?t(o):Q(o)?i(o):n(o)}}const b_={name:"codeText",previous:x_,resolve:v_,tokenize:__};function v_(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function x_(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function __(e,t,n){let r=0,i,a;return o;function o(d){return e.enter("codeText"),e.enter("codeTextSequence"),s(d)}function s(d){return d===96?(e.consume(d),r++,s):(e.exit("codeTextSequence"),l(d))}function l(d){return d===null?n(d):d===32?(e.enter("space"),e.consume(d),e.exit("space"),l):d===96?(a=e.enter("codeTextSequence"),i=0,u(d)):Q(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),l):(e.enter("codeTextData"),c(d))}function c(d){return d===null||d===32||d===96||Q(d)?(e.exit("codeTextData"),l(d)):(e.consume(d),c)}function u(d){return d===96?(e.consume(d),i++,u):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(d)):(a.type="codeTextData",c(d))}}class w_{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const a=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&ei(this.left,r),a.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),ei(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),ei(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);ei(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);ei(this.left,n.reverse())}}}function ei(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function Hm(e){const t={};let n=-1,r,i,a,o,s,l,c;const u=new w_(e);for(;++n<u.length;){for(;n in t;)n=t[n];if(r=u.get(n),n&&r[1].type==="chunkFlow"&&u.get(n-1)[1].type==="listItemPrefix"&&(l=r[1]._tokenizer.events,a=0,a<l.length&&l[a][1].type==="lineEndingBlank"&&(a+=2),a<l.length&&l[a][1].type==="content"))for(;++a<l.length&&l[a][1].type!=="content";)l[a][1].type==="chunkText"&&(l[a][1]._isInFirstContentOfListItem=!0,a++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,E_(u,n)),n=t[n],c=!0);else if(r[1]._container){for(a=n,i=void 0;a--;)if(o=u.get(a),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(i&&(u.get(i)[1].type="lineEndingBlank"),o[1].type="lineEnding",i=a);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;i&&(r[1].end={...u.get(i)[1].start},s=u.slice(i,n),s.unshift(r),u.splice(i,n-i+1,s))}}return Dt(e,0,Number.POSITIVE_INFINITY,u.slice(0)),!c}function E_(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const a=[];let o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const s=o.events,l=[],c={};let u,d,p=-1,f=n,v=0,x=0;const S=[x];for(;f;){for(;e.get(++i)[1]!==f;);a.push(i),f._tokenizer||(u=r.sliceStream(f),f.next||u.push(null),d&&o.defineSkip(f.start),f._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(u),f._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),d=f,f=f.next}for(f=n;++p<s.length;)s[p][0]==="exit"&&s[p-1][0]==="enter"&&s[p][1].type===s[p-1][1].type&&s[p][1].start.line!==s[p][1].end.line&&(x=p+1,S.push(x),f._tokenizer=void 0,f.previous=void 0,f=f.next);for(o.events=[],f?(f._tokenizer=void 0,f.previous=void 0):S.pop(),p=S.length;p--;){const h=s.slice(S[p],S[p+1]),g=a.pop();l.push([g,g+h.length-1]),e.splice(g,2,h)}for(l.reverse(),p=-1;++p<l.length;)c[v+l[p][0]]=v+l[p][1],v+=l[p][1]-l[p][0]-1;return c}const k_={resolve:N_,tokenize:T_},S_={partial:!0,tokenize:O_};function N_(e){return Hm(e),e}function T_(e,t){let n;return r;function r(s){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(s)}function i(s){return s===null?a(s):Q(s)?e.check(S_,o,a)(s):(e.consume(s),i)}function a(s){return e.exit("chunkContent"),e.exit("content"),t(s)}function o(s){return e.consume(s),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function O_(e,t,n){const r=this;return i;function i(o){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),de(e,a,"linePrefix")}function a(o){if(o===null||Q(o))return n(o);const s=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?t(o):e.interrupt(r.parser.constructs.flow,n,t)(o)}}function Wm(e,t,n,r,i,a,o,s,l){const c=l||Number.POSITIVE_INFINITY;let u=0;return d;function d(h){return h===60?(e.enter(r),e.enter(i),e.enter(a),e.consume(h),e.exit(a),p):h===null||h===32||h===41||jl(h)?n(h):(e.enter(r),e.enter(o),e.enter(s),e.enter("chunkString",{contentType:"string"}),x(h))}function p(h){return h===62?(e.enter(a),e.consume(h),e.exit(a),e.exit(i),e.exit(r),t):(e.enter(s),e.enter("chunkString",{contentType:"string"}),f(h))}function f(h){return h===62?(e.exit("chunkString"),e.exit(s),p(h)):h===null||h===60||Q(h)?n(h):(e.consume(h),h===92?v:f)}function v(h){return h===60||h===62||h===92?(e.consume(h),f):f(h)}function x(h){return!u&&(h===null||h===41||Ze(h))?(e.exit("chunkString"),e.exit(s),e.exit(o),e.exit(r),t(h)):u<c&&h===40?(e.consume(h),u++,x):h===41?(e.consume(h),u--,x):h===null||h===32||h===40||jl(h)?n(h):(e.consume(h),h===92?S:x)}function S(h){return h===40||h===41||h===92?(e.consume(h),x):x(h)}}function qm(e,t,n,r,i,a){const o=this;let s=0,l;return c;function c(f){return e.enter(r),e.enter(i),e.consume(f),e.exit(i),e.enter(a),u}function u(f){return s>999||f===null||f===91||f===93&&!l||f===94&&!s&&"_hiddenFootnoteSupport"in o.parser.constructs?n(f):f===93?(e.exit(a),e.enter(i),e.consume(f),e.exit(i),e.exit(r),t):Q(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),u):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===null||f===91||f===93||Q(f)||s++>999?(e.exit("chunkString"),u(f)):(e.consume(f),l||(l=!ae(f)),f===92?p:d)}function p(f){return f===91||f===92||f===93?(e.consume(f),s++,d):d(f)}}function Gm(e,t,n,r,i,a){let o;return s;function s(p){return p===34||p===39||p===40?(e.enter(r),e.enter(i),e.consume(p),e.exit(i),o=p===40?41:p,l):n(p)}function l(p){return p===o?(e.enter(i),e.consume(p),e.exit(i),e.exit(r),t):(e.enter(a),c(p))}function c(p){return p===o?(e.exit(a),l(o)):p===null?n(p):Q(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),de(e,c,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),u(p))}function u(p){return p===o||p===null||Q(p)?(e.exit("chunkString"),c(p)):(e.consume(p),p===92?d:u)}function d(p){return p===o||p===92?(e.consume(p),u):u(p)}}function vi(e,t){let n;return r;function r(i){return Q(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):ae(i)?de(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const C_={name:"definition",tokenize:R_},A_={partial:!0,tokenize:I_};function R_(e,t,n){const r=this;let i;return a;function a(f){return e.enter("definition"),o(f)}function o(f){return qm.call(r,e,s,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(f)}function s(f){return i=Nr(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),f===58?(e.enter("definitionMarker"),e.consume(f),e.exit("definitionMarker"),l):n(f)}function l(f){return Ze(f)?vi(e,c)(f):c(f)}function c(f){return Wm(e,u,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(f)}function u(f){return e.attempt(A_,d,d)(f)}function d(f){return ae(f)?de(e,p,"whitespace")(f):p(f)}function p(f){return f===null||Q(f)?(e.exit("definition"),r.parser.defined.push(i),t(f)):n(f)}}function I_(e,t,n){return r;function r(s){return Ze(s)?vi(e,i)(s):n(s)}function i(s){return Gm(e,a,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(s)}function a(s){return ae(s)?de(e,o,"whitespace")(s):o(s)}function o(s){return s===null||Q(s)?t(s):n(s)}}const M_={name:"hardBreakEscape",tokenize:P_};function P_(e,t,n){return r;function r(a){return e.enter("hardBreakEscape"),e.consume(a),i}function i(a){return Q(a)?(e.exit("hardBreakEscape"),t(a)):n(a)}}const L_={name:"headingAtx",resolve:D_,tokenize:F_};function D_(e,t){let n=e.length-2,r=3,i,a;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},a={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},Dt(e,r,n-r+1,[["enter",i,t],["enter",a,t],["exit",a,t],["exit",i,t]])),e}function F_(e,t,n){let r=0;return i;function i(u){return e.enter("atxHeading"),a(u)}function a(u){return e.enter("atxHeadingSequence"),o(u)}function o(u){return u===35&&r++<6?(e.consume(u),o):u===null||Ze(u)?(e.exit("atxHeadingSequence"),s(u)):n(u)}function s(u){return u===35?(e.enter("atxHeadingSequence"),l(u)):u===null||Q(u)?(e.exit("atxHeading"),t(u)):ae(u)?de(e,s,"whitespace")(u):(e.enter("atxHeadingText"),c(u))}function l(u){return u===35?(e.consume(u),l):(e.exit("atxHeadingSequence"),s(u))}function c(u){return u===null||u===35||Ze(u)?(e.exit("atxHeadingText"),s(u)):(e.consume(u),c)}}const B_=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Jd=["pre","script","style","textarea"],z_={concrete:!0,name:"htmlFlow",resolveTo:$_,tokenize:H_},U_={partial:!0,tokenize:q_},j_={partial:!0,tokenize:W_};function $_(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function H_(e,t,n){const r=this;let i,a,o,s,l;return c;function c(_){return u(_)}function u(_){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(_),d}function d(_){return _===33?(e.consume(_),p):_===47?(e.consume(_),a=!0,x):_===63?(e.consume(_),i=3,r.interrupt?t:b):Mt(_)?(e.consume(_),o=String.fromCharCode(_),S):n(_)}function p(_){return _===45?(e.consume(_),i=2,f):_===91?(e.consume(_),i=5,s=0,v):Mt(_)?(e.consume(_),i=4,r.interrupt?t:b):n(_)}function f(_){return _===45?(e.consume(_),r.interrupt?t:b):n(_)}function v(_){const Z="CDATA[";return _===Z.charCodeAt(s++)?(e.consume(_),s===Z.length?r.interrupt?t:W:v):n(_)}function x(_){return Mt(_)?(e.consume(_),o=String.fromCharCode(_),S):n(_)}function S(_){if(_===null||_===47||_===62||Ze(_)){const Z=_===47,ne=o.toLowerCase();return!Z&&!a&&Jd.includes(ne)?(i=1,r.interrupt?t(_):W(_)):B_.includes(o.toLowerCase())?(i=6,Z?(e.consume(_),h):r.interrupt?t(_):W(_)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(_):a?g(_):y(_))}return _===45||at(_)?(e.consume(_),o+=String.fromCharCode(_),S):n(_)}function h(_){return _===62?(e.consume(_),r.interrupt?t:W):n(_)}function g(_){return ae(_)?(e.consume(_),g):M(_)}function y(_){return _===47?(e.consume(_),M):_===58||_===95||Mt(_)?(e.consume(_),E):ae(_)?(e.consume(_),y):M(_)}function E(_){return _===45||_===46||_===58||_===95||at(_)?(e.consume(_),E):N(_)}function N(_){return _===61?(e.consume(_),w):ae(_)?(e.consume(_),N):y(_)}function w(_){return _===null||_===60||_===61||_===62||_===96?n(_):_===34||_===39?(e.consume(_),l=_,A):ae(_)?(e.consume(_),w):I(_)}function A(_){return _===l?(e.consume(_),l=null,U):_===null||Q(_)?n(_):(e.consume(_),A)}function I(_){return _===null||_===34||_===39||_===47||_===60||_===61||_===62||_===96||Ze(_)?N(_):(e.consume(_),I)}function U(_){return _===47||_===62||ae(_)?y(_):n(_)}function M(_){return _===62?(e.consume(_),$):n(_)}function $(_){return _===null||Q(_)?W(_):ae(_)?(e.consume(_),$):n(_)}function W(_){return _===45&&i===2?(e.consume(_),T):_===60&&i===1?(e.consume(_),D):_===62&&i===4?(e.consume(_),B):_===63&&i===3?(e.consume(_),b):_===93&&i===5?(e.consume(_),P):Q(_)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(U_,H,Y)(_)):_===null||Q(_)?(e.exit("htmlFlowData"),Y(_)):(e.consume(_),W)}function Y(_){return e.check(j_,V,H)(_)}function V(_){return e.enter("lineEnding"),e.consume(_),e.exit("lineEnding"),L}function L(_){return _===null||Q(_)?Y(_):(e.enter("htmlFlowData"),W(_))}function T(_){return _===45?(e.consume(_),b):W(_)}function D(_){return _===47?(e.consume(_),o="",O):W(_)}function O(_){if(_===62){const Z=o.toLowerCase();return Jd.includes(Z)?(e.consume(_),B):W(_)}return Mt(_)&&o.length<8?(e.consume(_),o+=String.fromCharCode(_),O):W(_)}function P(_){return _===93?(e.consume(_),b):W(_)}function b(_){return _===62?(e.consume(_),B):_===45&&i===2?(e.consume(_),b):W(_)}function B(_){return _===null||Q(_)?(e.exit("htmlFlowData"),H(_)):(e.consume(_),B)}function H(_){return e.exit("htmlFlow"),t(_)}}function W_(e,t,n){const r=this;return i;function i(o){return Q(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),a):n(o)}function a(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}function q_(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(Wo,t,n)}}const G_={name:"htmlText",tokenize:K_};function K_(e,t,n){const r=this;let i,a,o;return s;function s(b){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(b),l}function l(b){return b===33?(e.consume(b),c):b===47?(e.consume(b),N):b===63?(e.consume(b),y):Mt(b)?(e.consume(b),I):n(b)}function c(b){return b===45?(e.consume(b),u):b===91?(e.consume(b),a=0,v):Mt(b)?(e.consume(b),g):n(b)}function u(b){return b===45?(e.consume(b),f):n(b)}function d(b){return b===null?n(b):b===45?(e.consume(b),p):Q(b)?(o=d,D(b)):(e.consume(b),d)}function p(b){return b===45?(e.consume(b),f):d(b)}function f(b){return b===62?T(b):b===45?p(b):d(b)}function v(b){const B="CDATA[";return b===B.charCodeAt(a++)?(e.consume(b),a===B.length?x:v):n(b)}function x(b){return b===null?n(b):b===93?(e.consume(b),S):Q(b)?(o=x,D(b)):(e.consume(b),x)}function S(b){return b===93?(e.consume(b),h):x(b)}function h(b){return b===62?T(b):b===93?(e.consume(b),h):x(b)}function g(b){return b===null||b===62?T(b):Q(b)?(o=g,D(b)):(e.consume(b),g)}function y(b){return b===null?n(b):b===63?(e.consume(b),E):Q(b)?(o=y,D(b)):(e.consume(b),y)}function E(b){return b===62?T(b):y(b)}function N(b){return Mt(b)?(e.consume(b),w):n(b)}function w(b){return b===45||at(b)?(e.consume(b),w):A(b)}function A(b){return Q(b)?(o=A,D(b)):ae(b)?(e.consume(b),A):T(b)}function I(b){return b===45||at(b)?(e.consume(b),I):b===47||b===62||Ze(b)?U(b):n(b)}function U(b){return b===47?(e.consume(b),T):b===58||b===95||Mt(b)?(e.consume(b),M):Q(b)?(o=U,D(b)):ae(b)?(e.consume(b),U):T(b)}function M(b){return b===45||b===46||b===58||b===95||at(b)?(e.consume(b),M):$(b)}function $(b){return b===61?(e.consume(b),W):Q(b)?(o=$,D(b)):ae(b)?(e.consume(b),$):U(b)}function W(b){return b===null||b===60||b===61||b===62||b===96?n(b):b===34||b===39?(e.consume(b),i=b,Y):Q(b)?(o=W,D(b)):ae(b)?(e.consume(b),W):(e.consume(b),V)}function Y(b){return b===i?(e.consume(b),i=void 0,L):b===null?n(b):Q(b)?(o=Y,D(b)):(e.consume(b),Y)}function V(b){return b===null||b===34||b===39||b===60||b===61||b===96?n(b):b===47||b===62||Ze(b)?U(b):(e.consume(b),V)}function L(b){return b===47||b===62||Ze(b)?U(b):n(b)}function T(b){return b===62?(e.consume(b),e.exit("htmlTextData"),e.exit("htmlText"),t):n(b)}function D(b){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),O}function O(b){return ae(b)?de(e,P,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(b):P(b)}function P(b){return e.enter("htmlTextData"),o(b)}}const eu={name:"labelEnd",resolveAll:X_,resolveTo:Z_,tokenize:J_},V_={tokenize:ew},Y_={tokenize:tw},Q_={tokenize:nw};function X_(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&Dt(e,0,e.length,n),e}function Z_(e,t){let n=e.length,r=0,i,a,o,s;for(;n--;)if(i=e[n][1],a){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(o){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(a=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(o=n);const l={type:e[a][1].type==="labelLink"?"link":"image",start:{...e[a][1].start},end:{...e[e.length-1][1].end}},c={type:"label",start:{...e[a][1].start},end:{...e[o][1].end}},u={type:"labelText",start:{...e[a+r+2][1].end},end:{...e[o-2][1].start}};return s=[["enter",l,t],["enter",c,t]],s=pt(s,e.slice(a+1,a+r+3)),s=pt(s,[["enter",u,t]]),s=pt(s,Jc(t.parser.constructs.insideSpan.null,e.slice(a+r+4,o-3),t)),s=pt(s,[["exit",u,t],e[o-2],e[o-1],["exit",c,t]]),s=pt(s,e.slice(o+1)),s=pt(s,[["exit",l,t]]),Dt(e,a,e.length,s),e}function J_(e,t,n){const r=this;let i=r.events.length,a,o;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){a=r.events[i][1];break}return s;function s(p){return a?a._inactive?d(p):(o=r.parser.defined.includes(Nr(r.sliceSerialize({start:a.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(p),e.exit("labelMarker"),e.exit("labelEnd"),l):n(p)}function l(p){return p===40?e.attempt(V_,u,o?u:d)(p):p===91?e.attempt(Y_,u,o?c:d)(p):o?u(p):d(p)}function c(p){return e.attempt(Q_,u,d)(p)}function u(p){return t(p)}function d(p){return a._balanced=!0,n(p)}}function ew(e,t,n){return r;function r(d){return e.enter("resource"),e.enter("resourceMarker"),e.consume(d),e.exit("resourceMarker"),i}function i(d){return Ze(d)?vi(e,a)(d):a(d)}function a(d){return d===41?u(d):Wm(e,o,s,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(d)}function o(d){return Ze(d)?vi(e,l)(d):u(d)}function s(d){return n(d)}function l(d){return d===34||d===39||d===40?Gm(e,c,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(d):u(d)}function c(d){return Ze(d)?vi(e,u)(d):u(d)}function u(d){return d===41?(e.enter("resourceMarker"),e.consume(d),e.exit("resourceMarker"),e.exit("resource"),t):n(d)}}function tw(e,t,n){const r=this;return i;function i(s){return qm.call(r,e,a,o,"reference","referenceMarker","referenceString")(s)}function a(s){return r.parser.defined.includes(Nr(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(s):n(s)}function o(s){return n(s)}}function nw(e,t,n){return r;function r(a){return e.enter("reference"),e.enter("referenceMarker"),e.consume(a),e.exit("referenceMarker"),i}function i(a){return a===93?(e.enter("referenceMarker"),e.consume(a),e.exit("referenceMarker"),e.exit("reference"),t):n(a)}}const rw={name:"labelStartImage",resolveAll:eu.resolveAll,tokenize:iw};function iw(e,t,n){const r=this;return i;function i(s){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(s),e.exit("labelImageMarker"),a}function a(s){return s===91?(e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),e.exit("labelImage"),o):n(s)}function o(s){return s===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(s):t(s)}}const aw={name:"labelStartLink",resolveAll:eu.resolveAll,tokenize:ow};function ow(e,t,n){const r=this;return i;function i(o){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(o),e.exit("labelMarker"),e.exit("labelLink"),a}function a(o){return o===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(o):t(o)}}const Ss={name:"lineEnding",tokenize:sw};function sw(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),de(e,t,"linePrefix")}}const Ha={name:"thematicBreak",tokenize:lw};function lw(e,t,n){let r=0,i;return a;function a(c){return e.enter("thematicBreak"),o(c)}function o(c){return i=c,s(c)}function s(c){return c===i?(e.enter("thematicBreakSequence"),l(c)):r>=3&&(c===null||Q(c))?(e.exit("thematicBreak"),t(c)):n(c)}function l(c){return c===i?(e.consume(c),r++,l):(e.exit("thematicBreakSequence"),ae(c)?de(e,s,"whitespace")(c):s(c))}}const Ge={continuation:{tokenize:pw},exit:hw,name:"list",tokenize:dw},cw={partial:!0,tokenize:mw},uw={partial:!0,tokenize:fw};function dw(e,t,n){const r=this,i=r.events[r.events.length-1];let a=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,o=0;return s;function s(f){const v=r.containerState.type||(f===42||f===43||f===45?"listUnordered":"listOrdered");if(v==="listUnordered"?!r.containerState.marker||f===r.containerState.marker:$l(f)){if(r.containerState.type||(r.containerState.type=v,e.enter(v,{_container:!0})),v==="listUnordered")return e.enter("listItemPrefix"),f===42||f===45?e.check(Ha,n,c)(f):c(f);if(!r.interrupt||f===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),l(f)}return n(f)}function l(f){return $l(f)&&++o<10?(e.consume(f),l):(!r.interrupt||o<2)&&(r.containerState.marker?f===r.containerState.marker:f===41||f===46)?(e.exit("listItemValue"),c(f)):n(f)}function c(f){return e.enter("listItemMarker"),e.consume(f),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||f,e.check(Wo,r.interrupt?n:u,e.attempt(cw,p,d))}function u(f){return r.containerState.initialBlankLine=!0,a++,p(f)}function d(f){return ae(f)?(e.enter("listItemPrefixWhitespace"),e.consume(f),e.exit("listItemPrefixWhitespace"),p):n(f)}function p(f){return r.containerState.size=a+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(f)}}function pw(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(Wo,i,a);function i(s){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,de(e,t,"listItemIndent",r.containerState.size+1)(s)}function a(s){return r.containerState.furtherBlankLines||!ae(s)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(s)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(uw,t,o)(s))}function o(s){return r.containerState._closeFlow=!0,r.interrupt=void 0,de(e,e.attempt(Ge,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s)}}function fw(e,t,n){const r=this;return de(e,i,"listItemIndent",r.containerState.size+1);function i(a){const o=r.events[r.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===r.containerState.size?t(a):n(a)}}function hw(e){e.exit(this.containerState.type)}function mw(e,t,n){const r=this;return de(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(a){const o=r.events[r.events.length-1];return!ae(a)&&o&&o[1].type==="listItemPrefixWhitespace"?t(a):n(a)}}const ep={name:"setextUnderline",resolveTo:gw,tokenize:yw};function gw(e,t){let n=e.length,r,i,a;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!a&&e[n][1].type==="definition"&&(a=n);const o={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",a?(e.splice(i,0,["enter",o,t]),e.splice(a+1,0,["exit",e[r][1],t]),e[r][1].end={...e[a][1].end}):e[r][1]=o,e.push(["exit",o,t]),e}function yw(e,t,n){const r=this;let i;return a;function a(c){let u=r.events.length,d;for(;u--;)if(r.events[u][1].type!=="lineEnding"&&r.events[u][1].type!=="linePrefix"&&r.events[u][1].type!=="content"){d=r.events[u][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||d)?(e.enter("setextHeadingLine"),i=c,o(c)):n(c)}function o(c){return e.enter("setextHeadingLineSequence"),s(c)}function s(c){return c===i?(e.consume(c),s):(e.exit("setextHeadingLineSequence"),ae(c)?de(e,l,"lineSuffix")(c):l(c))}function l(c){return c===null||Q(c)?(e.exit("setextHeadingLine"),t(c)):n(c)}}const bw={tokenize:vw};function vw(e){const t=this,n=e.attempt(Wo,r,e.attempt(this.parser.constructs.flowInitial,i,de(e,e.attempt(this.parser.constructs.flow,i,e.attempt(k_,i)),"linePrefix")));return n;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEndingBlank"),e.consume(a),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const xw={resolveAll:Vm()},_w=Km("string"),ww=Km("text");function Km(e){return{resolveAll:Vm(e==="text"?Ew:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],a=n.attempt(i,o,s);return o;function o(u){return c(u)?a(u):s(u)}function s(u){if(u===null){n.consume(u);return}return n.enter("data"),n.consume(u),l}function l(u){return c(u)?(n.exit("data"),a(u)):(n.consume(u),l)}function c(u){if(u===null)return!0;const d=i[u];let p=-1;if(d)for(;++p<d.length;){const f=d[p];if(!f.previous||f.previous.call(r,r.previous))return!0}return!1}}}function Vm(e){return t;function t(n,r){let i=-1,a;for(;++i<=n.length;)a===void 0?n[i]&&n[i][1].type==="data"&&(a=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==a+2&&(n[a][1].end=n[i-1][1].end,n.splice(a+2,i-a-2),i=a+2),a=void 0);return e?e(n,r):n}}function Ew(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let a=i.length,o=-1,s=0,l;for(;a--;){const c=i[a];if(typeof c=="string"){for(o=c.length;c.charCodeAt(o-1)===32;)s++,o--;if(o)break;o=-1}else if(c===-2)l=!0,s++;else if(c!==-1){a++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(s=0),s){const c={type:n===e.length||l||s<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:a?o:r.start._bufferIndex+o,_index:r.start._index+a,line:r.end.line,column:r.end.column-s,offset:r.end.offset-s},end:{...r.end}};r.end={...c.start},r.start.offset===r.end.offset?Object.assign(r,c):(e.splice(n,0,["enter",c,t],["exit",c,t]),n+=2)}n++}return e}const kw={42:Ge,43:Ge,45:Ge,48:Ge,49:Ge,50:Ge,51:Ge,52:Ge,53:Ge,54:Ge,55:Ge,56:Ge,57:Ge,62:Um},Sw={91:C_},Nw={[-2]:ks,[-1]:ks,32:ks},Tw={35:L_,42:Ha,45:[ep,Ha],60:z_,61:ep,95:Ha,96:Zd,126:Zd},Ow={38:$m,92:jm},Cw={[-5]:Ss,[-4]:Ss,[-3]:Ss,33:rw,38:$m,42:Hl,60:[a_,G_],91:aw,92:[M_,jm],93:eu,95:Hl,96:b_},Aw={null:[Hl,xw]},Rw={null:[42,95]},Iw={null:[]},Mw=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:Rw,contentInitial:Sw,disable:Iw,document:kw,flow:Tw,flowInitial:Nw,insideSpan:Aw,string:Ow,text:Cw},Symbol.toStringTag,{value:"Module"}));function Pw(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},a=[];let o=[],s=[];const l={attempt:A(N),check:A(w),consume:g,enter:y,exit:E,interrupt:A(w,{interrupt:!0})},c={code:null,containerState:{},defineSkip:x,events:[],now:v,parser:e,previous:null,sliceSerialize:p,sliceStream:f,write:d};let u=t.tokenize.call(c,l);return t.resolveAll&&a.push(t),c;function d($){return o=pt(o,$),S(),o[o.length-1]!==null?[]:(I(t,0),c.events=Jc(a,c.events,c),c.events)}function p($,W){return Dw(f($),W)}function f($){return Lw(o,$)}function v(){const{_bufferIndex:$,_index:W,line:Y,column:V,offset:L}=r;return{_bufferIndex:$,_index:W,line:Y,column:V,offset:L}}function x($){i[$.line]=$.column,M()}function S(){let $;for(;r._index<o.length;){const W=o[r._index];if(typeof W=="string")for($=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===$&&r._bufferIndex<W.length;)h(W.charCodeAt(r._bufferIndex));else h(W)}}function h($){u=u($)}function g($){Q($)?(r.line++,r.column=1,r.offset+=$===-3?2:1,M()):$!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),c.previous=$}function y($,W){const Y=W||{};return Y.type=$,Y.start=v(),c.events.push(["enter",Y,c]),s.push(Y),Y}function E($){const W=s.pop();return W.end=v(),c.events.push(["exit",W,c]),W}function N($,W){I($,W.from)}function w($,W){W.restore()}function A($,W){return Y;function Y(V,L,T){let D,O,P,b;return Array.isArray(V)?H(V):"tokenize"in V?H([V]):B(V);function B(re){return Be;function Be(qe){const Nt=qe!==null&&re[qe],Tt=qe!==null&&re.null,Qt=[...Array.isArray(Nt)?Nt:Nt?[Nt]:[],...Array.isArray(Tt)?Tt:Tt?[Tt]:[]];return H(Qt)(qe)}}function H(re){return D=re,O=0,re.length===0?T:_(re[O])}function _(re){return Be;function Be(qe){return b=U(),P=re,re.partial||(c.currentConstruct=re),re.name&&c.parser.constructs.disable.null.includes(re.name)?ne():re.tokenize.call(W?Object.assign(Object.create(c),W):c,l,Z,ne)(qe)}}function Z(re){return $(P,b),L}function ne(re){return b.restore(),++O<D.length?_(D[O]):T}}}function I($,W){$.resolveAll&&!a.includes($)&&a.push($),$.resolve&&Dt(c.events,W,c.events.length-W,$.resolve(c.events.slice(W),c)),$.resolveTo&&(c.events=$.resolveTo(c.events,c))}function U(){const $=v(),W=c.previous,Y=c.currentConstruct,V=c.events.length,L=Array.from(s);return{from:V,restore:T};function T(){r=$,c.previous=W,c.currentConstruct=Y,c.events.length=V,s=L,M()}}function M(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Lw(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,a=t.end._bufferIndex;let o;if(n===i)o=[e[n].slice(r,a)];else{if(o=e.slice(n,i),r>-1){const s=o[0];typeof s=="string"?o[0]=s.slice(r):o.shift()}a>0&&o.push(e[i].slice(0,a))}return o}function Dw(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const a=e[n];let o;if(typeof a=="string")o=a;else switch(a){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&i)continue;o=" ";break}default:o=String.fromCharCode(a)}i=a===-2,r.push(o)}return r.join("")}function Fw(e){const r={constructs:W0([Mw,...(e||{}).extensions||[]]),content:i(Z0),defined:[],document:i(e_),flow:i(bw),lazy:{},string:i(_w),text:i(ww)};return r;function i(a){return o;function o(s){return Pw(r,a,s)}}}function Bw(e){for(;!Hm(e););return e}const tp=/[\0\t\n\r]/g;function zw(){let e=1,t="",n=!0,r;return i;function i(a,o,s){const l=[];let c,u,d,p,f;for(a=t+(typeof a=="string"?a.toString():new TextDecoder(o||void 0).decode(a)),d=0,t="",n&&(a.charCodeAt(0)===65279&&d++,n=void 0);d<a.length;){if(tp.lastIndex=d,c=tp.exec(a),p=c&&c.index!==void 0?c.index:a.length,f=a.charCodeAt(p),!c){t=a.slice(d);break}if(f===10&&d===p&&r)l.push(-3),r=void 0;else switch(r&&(l.push(-5),r=void 0),d<p&&(l.push(a.slice(d,p)),e+=p-d),f){case 0:{l.push(65533),e++;break}case 9:{for(u=Math.ceil(e/4)*4,l.push(-2);e++<u;)l.push(-1);break}case 10:{l.push(-4),e=1;break}default:r=!0,e=1}d=p+1}return s&&(r&&l.push(-5),t&&l.push(t),l.push(null)),l}}const Uw=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function jw(e){return e.replace(Uw,$w)}function $w(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),a=i===120||i===88;return zm(n.slice(a?2:1),a?16:10)}return Zc(n)||e}const Ym={}.hasOwnProperty;function Hw(e,t,n){return typeof t!="string"&&(n=t,t=void 0),Ww(n)(Bw(Fw(n).document().write(zw()(e,t,!0))))}function Ww(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a(An),autolinkProtocol:U,autolinkEmail:U,atxHeading:a(ze),blockQuote:a(Tt),characterEscape:U,characterReference:U,codeFenced:a(Qt),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:a(Qt,o),codeText:a(jr,o),codeTextData:U,data:U,codeFlowValue:U,definition:a(Xt),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:a(Xn),hardBreakEscape:a(ie),hardBreakTrailing:a(ie),htmlFlow:a(yt,o),htmlFlowData:U,htmlText:a(yt,o),htmlTextData:U,image:a(K),label:o,link:a(An),listItem:a(se),listItemValue:p,listOrdered:a(_e,d),listUnordered:a(_e),paragraph:a(Zn),reference:_,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:a(ze),strong:a(Ft),thematicBreak:a(Hr)},exit:{atxHeading:l(),atxHeadingSequence:N,autolink:l(),autolinkEmail:Nt,autolinkProtocol:qe,blockQuote:l(),characterEscapeValue:M,characterReferenceMarkerHexadecimal:ne,characterReferenceMarkerNumeric:ne,characterReferenceValue:re,characterReference:Be,codeFenced:l(S),codeFencedFence:x,codeFencedFenceInfo:f,codeFencedFenceMeta:v,codeFlowValue:M,codeIndented:l(h),codeText:l(L),codeTextData:M,data:M,definition:l(),definitionDestinationString:E,definitionLabelString:g,definitionTitleString:y,emphasis:l(),hardBreakEscape:l(W),hardBreakTrailing:l(W),htmlFlow:l(Y),htmlFlowData:M,htmlText:l(V),htmlTextData:M,image:l(D),label:P,labelText:O,lineEnding:$,link:l(T),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:Z,resourceDestinationString:b,resourceTitleString:B,resource:H,setextHeading:l(I),setextHeadingLineSequence:A,setextHeadingText:w,strong:l(),thematicBreak:l()}};Qm(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(k){let C={type:"root",children:[]};const j={stack:[C],tokenStack:[],config:t,enter:s,exit:c,buffer:o,resume:u,data:n},G=[];let X=-1;for(;++X<k.length;)if(k[X][1].type==="listOrdered"||k[X][1].type==="listUnordered")if(k[X][0]==="enter")G.push(X);else{const ve=G.pop();X=i(k,ve,X)}for(X=-1;++X<k.length;){const ve=t[k[X][0]];Ym.call(ve,k[X][1].type)&&ve[k[X][1].type].call(Object.assign({sliceSerialize:k[X][2].sliceSerialize},j),k[X][1])}if(j.tokenStack.length>0){const ve=j.tokenStack[j.tokenStack.length-1];(ve[1]||np).call(j,void 0,ve[0])}for(C.position={start:Jt(k.length>0?k[0][1].start:{line:1,column:1,offset:0}),end:Jt(k.length>0?k[k.length-2][1].end:{line:1,column:1,offset:0})},X=-1;++X<t.transforms.length;)C=t.transforms[X](C)||C;return C}function i(k,C,j){let G=C-1,X=-1,ve=!1,Bt,bt,Wr,qr;for(;++G<=j;){const et=k[G];switch(et[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{et[0]==="enter"?X++:X--,qr=void 0;break}case"lineEndingBlank":{et[0]==="enter"&&(Bt&&!qr&&!X&&!Wr&&(Wr=G),qr=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:qr=void 0}if(!X&&et[0]==="enter"&&et[1].type==="listItemPrefix"||X===-1&&et[0]==="exit"&&(et[1].type==="listUnordered"||et[1].type==="listOrdered")){if(Bt){let Jn=G;for(bt=void 0;Jn--;){const zt=k[Jn];if(zt[1].type==="lineEnding"||zt[1].type==="lineEndingBlank"){if(zt[0]==="exit")continue;bt&&(k[bt][1].type="lineEndingBlank",ve=!0),zt[1].type="lineEnding",bt=Jn}else if(!(zt[1].type==="linePrefix"||zt[1].type==="blockQuotePrefix"||zt[1].type==="blockQuotePrefixWhitespace"||zt[1].type==="blockQuoteMarker"||zt[1].type==="listItemIndent"))break}Wr&&(!bt||Wr<bt)&&(Bt._spread=!0),Bt.end=Object.assign({},bt?k[bt][1].start:et[1].end),k.splice(bt||G,0,["exit",Bt,et[2]]),G++,j++}if(et[1].type==="listItemPrefix"){const Jn={type:"listItem",_spread:!1,start:Object.assign({},et[1].start),end:void 0};Bt=Jn,k.splice(G,0,["enter",Jn,et[2]]),G++,j++,Wr=void 0,qr=!0}}}return k[C][1]._spread=ve,j}function a(k,C){return j;function j(G){s.call(this,k(G),G),C&&C.call(this,G)}}function o(){this.stack.push({type:"fragment",children:[]})}function s(k,C,j){this.stack[this.stack.length-1].children.push(k),this.stack.push(k),this.tokenStack.push([C,j||void 0]),k.position={start:Jt(C.start),end:void 0}}function l(k){return C;function C(j){k&&k.call(this,j),c.call(this,j)}}function c(k,C){const j=this.stack.pop(),G=this.tokenStack.pop();if(G)G[0].type!==k.type&&(C?C.call(this,k,G[0]):(G[1]||np).call(this,k,G[0]));else throw new Error("Cannot close `"+k.type+"` ("+bi({start:k.start,end:k.end})+"): it’s not open");j.position.end=Jt(k.end)}function u(){return $0(this.stack.pop())}function d(){this.data.expectingFirstListItemValue=!0}function p(k){if(this.data.expectingFirstListItemValue){const C=this.stack[this.stack.length-2];C.start=Number.parseInt(this.sliceSerialize(k),10),this.data.expectingFirstListItemValue=void 0}}function f(){const k=this.resume(),C=this.stack[this.stack.length-1];C.lang=k}function v(){const k=this.resume(),C=this.stack[this.stack.length-1];C.meta=k}function x(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function S(){const k=this.resume(),C=this.stack[this.stack.length-1];C.value=k.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function h(){const k=this.resume(),C=this.stack[this.stack.length-1];C.value=k.replace(/(\r?\n|\r)$/g,"")}function g(k){const C=this.resume(),j=this.stack[this.stack.length-1];j.label=C,j.identifier=Nr(this.sliceSerialize(k)).toLowerCase()}function y(){const k=this.resume(),C=this.stack[this.stack.length-1];C.title=k}function E(){const k=this.resume(),C=this.stack[this.stack.length-1];C.url=k}function N(k){const C=this.stack[this.stack.length-1];if(!C.depth){const j=this.sliceSerialize(k).length;C.depth=j}}function w(){this.data.setextHeadingSlurpLineEnding=!0}function A(k){const C=this.stack[this.stack.length-1];C.depth=this.sliceSerialize(k).codePointAt(0)===61?1:2}function I(){this.data.setextHeadingSlurpLineEnding=void 0}function U(k){const j=this.stack[this.stack.length-1].children;let G=j[j.length-1];(!G||G.type!=="text")&&(G=$r(),G.position={start:Jt(k.start),end:void 0},j.push(G)),this.stack.push(G)}function M(k){const C=this.stack.pop();C.value+=this.sliceSerialize(k),C.position.end=Jt(k.end)}function $(k){const C=this.stack[this.stack.length-1];if(this.data.atHardBreak){const j=C.children[C.children.length-1];j.position.end=Jt(k.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(C.type)&&(U.call(this,k),M.call(this,k))}function W(){this.data.atHardBreak=!0}function Y(){const k=this.resume(),C=this.stack[this.stack.length-1];C.value=k}function V(){const k=this.resume(),C=this.stack[this.stack.length-1];C.value=k}function L(){const k=this.resume(),C=this.stack[this.stack.length-1];C.value=k}function T(){const k=this.stack[this.stack.length-1];if(this.data.inReference){const C=this.data.referenceType||"shortcut";k.type+="Reference",k.referenceType=C,delete k.url,delete k.title}else delete k.identifier,delete k.label;this.data.referenceType=void 0}function D(){const k=this.stack[this.stack.length-1];if(this.data.inReference){const C=this.data.referenceType||"shortcut";k.type+="Reference",k.referenceType=C,delete k.url,delete k.title}else delete k.identifier,delete k.label;this.data.referenceType=void 0}function O(k){const C=this.sliceSerialize(k),j=this.stack[this.stack.length-2];j.label=jw(C),j.identifier=Nr(C).toLowerCase()}function P(){const k=this.stack[this.stack.length-1],C=this.resume(),j=this.stack[this.stack.length-1];if(this.data.inReference=!0,j.type==="link"){const G=k.children;j.children=G}else j.alt=C}function b(){const k=this.resume(),C=this.stack[this.stack.length-1];C.url=k}function B(){const k=this.resume(),C=this.stack[this.stack.length-1];C.title=k}function H(){this.data.inReference=void 0}function _(){this.data.referenceType="collapsed"}function Z(k){const C=this.resume(),j=this.stack[this.stack.length-1];j.label=C,j.identifier=Nr(this.sliceSerialize(k)).toLowerCase(),this.data.referenceType="full"}function ne(k){this.data.characterReferenceType=k.type}function re(k){const C=this.sliceSerialize(k),j=this.data.characterReferenceType;let G;j?(G=zm(C,j==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):G=Zc(C);const X=this.stack[this.stack.length-1];X.value+=G}function Be(k){const C=this.stack.pop();C.position.end=Jt(k.end)}function qe(k){M.call(this,k);const C=this.stack[this.stack.length-1];C.url=this.sliceSerialize(k)}function Nt(k){M.call(this,k);const C=this.stack[this.stack.length-1];C.url="mailto:"+this.sliceSerialize(k)}function Tt(){return{type:"blockquote",children:[]}}function Qt(){return{type:"code",lang:null,meta:null,value:""}}function jr(){return{type:"inlineCode",value:""}}function Xt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Xn(){return{type:"emphasis",children:[]}}function ze(){return{type:"heading",depth:0,children:[]}}function ie(){return{type:"break"}}function yt(){return{type:"html",value:""}}function K(){return{type:"image",title:null,url:"",alt:null}}function An(){return{type:"link",title:null,url:"",children:[]}}function _e(k){return{type:"list",ordered:k.type==="listOrdered",start:null,spread:k._spread,children:[]}}function se(k){return{type:"listItem",spread:k._spread,checked:null,children:[]}}function Zn(){return{type:"paragraph",children:[]}}function Ft(){return{type:"strong",children:[]}}function $r(){return{type:"text",value:""}}function Hr(){return{type:"thematicBreak"}}}function Jt(e){return{line:e.line,column:e.column,offset:e.offset}}function Qm(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?Qm(e,r):qw(e,r)}}function qw(e,t){let n;for(n in t)if(Ym.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function np(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+bi({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+bi({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+bi({start:t.start,end:t.end})+") is still open")}function Gw(e){const t=this;t.parser=n;function n(r){return Hw(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function Kw(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function Vw(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function Yw(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let a={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(a.data={meta:t.meta}),e.patch(t,a),a=e.applyData(t,a),a={type:"element",tagName:"pre",properties:{},children:[a]},e.patch(t,a),a}function Qw(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Xw(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Zw(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=Ur(r.toLowerCase()),a=e.footnoteOrder.indexOf(r);let o,s=e.footnoteCounts.get(r);s===void 0?(s=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=a+1,s+=1,e.footnoteCounts.set(r,s);const l={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(s>1?"-"+s:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(o)}]};e.patch(t,l);const c={type:"element",tagName:"sup",properties:{},children:[l]};return e.patch(t,c),e.applyData(t,c)}function Jw(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function eE(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function Xm(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),a=i[0];a&&a.type==="text"?a.value="["+a.value:i.unshift({type:"text",value:"["});const o=i[i.length-1];return o&&o.type==="text"?o.value+=r:i.push({type:"text",value:r}),i}function tE(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Xm(e,t);const i={src:Ur(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const a={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,a),e.applyData(t,a)}function nE(e,t){const n={src:Ur(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function rE(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function iE(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Xm(e,t);const i={href:Ur(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const a={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,a),e.applyData(t,a)}function aE(e,t){const n={href:Ur(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function oE(e,t,n){const r=e.all(t),i=n?sE(n):Zm(t),a={},o=[];if(typeof t.checked=="boolean"){const u=r[0];let d;u&&u.type==="element"&&u.tagName==="p"?d=u:(d={type:"element",tagName:"p",properties:{},children:[]},r.unshift(d)),d.children.length>0&&d.children.unshift({type:"text",value:" "}),d.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),a.className=["task-list-item"]}let s=-1;for(;++s<r.length;){const u=r[s];(i||s!==0||u.type!=="element"||u.tagName!=="p")&&o.push({type:"text",value:`
`}),u.type==="element"&&u.tagName==="p"&&!i?o.push(...u.children):o.push(u)}const l=r[r.length-1];l&&(i||l.type!=="element"||l.tagName!=="p")&&o.push({type:"text",value:`
`});const c={type:"element",tagName:"li",properties:a,children:o};return e.patch(t,c),e.applyData(t,c)}function sE(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=Zm(n[r])}return t}function Zm(e){const t=e.spread;return t??e.children.length>1}function lE(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const o=r[i];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const a={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,a),e.applyData(t,a)}function cE(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function uE(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function dE(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function pE(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const o={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],o),i.push(o)}if(n.length>0){const o={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},s=Vc(t.children[1]),l=Im(t.children[t.children.length-1]);s&&l&&(o.position={start:s,end:l}),i.push(o)}const a={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,a),e.applyData(t,a)}function fE(e,t,n){const r=n?n.children:void 0,a=(r?r.indexOf(t):1)===0?"th":"td",o=n&&n.type==="table"?n.align:void 0,s=o?o.length:t.children.length;let l=-1;const c=[];for(;++l<s;){const d=t.children[l],p={},f=o?o[l]:void 0;f&&(p.align=f);let v={type:"element",tagName:a,properties:p,children:[]};d&&(v.children=e.all(d),e.patch(d,v),v=e.applyData(d,v)),c.push(v)}const u={type:"element",tagName:"tr",properties:{},children:e.wrap(c,!0)};return e.patch(t,u),e.applyData(t,u)}function hE(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const rp=9,ip=32;function mE(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const a=[];for(;r;)a.push(ap(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return a.push(ap(t.slice(i),i>0,!1)),a.join("")}function ap(e,t,n){let r=0,i=e.length;if(t){let a=e.codePointAt(r);for(;a===rp||a===ip;)r++,a=e.codePointAt(r)}if(n){let a=e.codePointAt(i-1);for(;a===rp||a===ip;)i--,a=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function gE(e,t){const n={type:"text",value:mE(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function yE(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const bE={blockquote:Kw,break:Vw,code:Yw,delete:Qw,emphasis:Xw,footnoteReference:Zw,heading:Jw,html:eE,imageReference:tE,image:nE,inlineCode:rE,linkReference:iE,link:aE,listItem:oE,list:lE,paragraph:cE,root:uE,strong:dE,table:pE,tableCell:hE,tableRow:fE,text:gE,thematicBreak:yE,toml:va,yaml:va,definition:va,footnoteDefinition:va};function va(){}const Jm=-1,qo=0,xi=1,bo=2,tu=3,nu=4,ru=5,iu=6,eg=7,tg=8,op=typeof self=="object"?self:globalThis,vE=(e,t)=>{const n=(i,a)=>(e.set(a,i),i),r=i=>{if(e.has(i))return e.get(i);const[a,o]=t[i];switch(a){case qo:case Jm:return n(o,i);case xi:{const s=n([],i);for(const l of o)s.push(r(l));return s}case bo:{const s=n({},i);for(const[l,c]of o)s[r(l)]=r(c);return s}case tu:return n(new Date(o),i);case nu:{const{source:s,flags:l}=o;return n(new RegExp(s,l),i)}case ru:{const s=n(new Map,i);for(const[l,c]of o)s.set(r(l),r(c));return s}case iu:{const s=n(new Set,i);for(const l of o)s.add(r(l));return s}case eg:{const{name:s,message:l}=o;return n(new op[s](l),i)}case tg:return n(BigInt(o),i);case"BigInt":return n(Object(BigInt(o)),i);case"ArrayBuffer":return n(new Uint8Array(o).buffer,o);case"DataView":{const{buffer:s}=new Uint8Array(o);return n(new DataView(s),o)}}return n(new op[a](o),i)};return r},sp=e=>vE(new Map,e)(0),tr="",{toString:xE}={},{keys:_E}=Object,ti=e=>{const t=typeof e;if(t!=="object"||!e)return[qo,t];const n=xE.call(e).slice(8,-1);switch(n){case"Array":return[xi,tr];case"Object":return[bo,tr];case"Date":return[tu,tr];case"RegExp":return[nu,tr];case"Map":return[ru,tr];case"Set":return[iu,tr];case"DataView":return[xi,n]}return n.includes("Array")?[xi,n]:n.includes("Error")?[eg,n]:[bo,n]},xa=([e,t])=>e===qo&&(t==="function"||t==="symbol"),wE=(e,t,n,r)=>{const i=(o,s)=>{const l=r.push(o)-1;return n.set(s,l),l},a=o=>{if(n.has(o))return n.get(o);let[s,l]=ti(o);switch(s){case qo:{let u=o;switch(l){case"bigint":s=tg,u=o.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+l);u=null;break;case"undefined":return i([Jm],o)}return i([s,u],o)}case xi:{if(l){let p=o;return l==="DataView"?p=new Uint8Array(o.buffer):l==="ArrayBuffer"&&(p=new Uint8Array(o)),i([l,[...p]],o)}const u=[],d=i([s,u],o);for(const p of o)u.push(a(p));return d}case bo:{if(l)switch(l){case"BigInt":return i([l,o.toString()],o);case"Boolean":case"Number":case"String":return i([l,o.valueOf()],o)}if(t&&"toJSON"in o)return a(o.toJSON());const u=[],d=i([s,u],o);for(const p of _E(o))(e||!xa(ti(o[p])))&&u.push([a(p),a(o[p])]);return d}case tu:return i([s,o.toISOString()],o);case nu:{const{source:u,flags:d}=o;return i([s,{source:u,flags:d}],o)}case ru:{const u=[],d=i([s,u],o);for(const[p,f]of o)(e||!(xa(ti(p))||xa(ti(f))))&&u.push([a(p),a(f)]);return d}case iu:{const u=[],d=i([s,u],o);for(const p of o)(e||!xa(ti(p)))&&u.push(a(p));return d}}const{message:c}=o;return i([s,{name:l,message:c}],o)};return a},lp=(e,{json:t,lossy:n}={})=>{const r=[];return wE(!(t||n),!!t,new Map,r)(e),r},vo=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?sp(lp(e,t)):structuredClone(e):(e,t)=>sp(lp(e,t));function EE(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function kE(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function SE(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||EE,r=e.options.footnoteBackLabel||kE,i=e.options.footnoteLabel||"Footnotes",a=e.options.footnoteLabelTagName||"h2",o=e.options.footnoteLabelProperties||{className:["sr-only"]},s=[];let l=-1;for(;++l<e.footnoteOrder.length;){const c=e.footnoteById.get(e.footnoteOrder[l]);if(!c)continue;const u=e.all(c),d=String(c.identifier).toUpperCase(),p=Ur(d.toLowerCase());let f=0;const v=[],x=e.footnoteCounts.get(d);for(;x!==void 0&&++f<=x;){v.length>0&&v.push({type:"text",value:" "});let g=typeof n=="string"?n:n(l,f);typeof g=="string"&&(g={type:"text",value:g}),v.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+p+(f>1?"-"+f:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(l,f),className:["data-footnote-backref"]},children:Array.isArray(g)?g:[g]})}const S=u[u.length-1];if(S&&S.type==="element"&&S.tagName==="p"){const g=S.children[S.children.length-1];g&&g.type==="text"?g.value+=" ":S.children.push({type:"text",value:" "}),S.children.push(...v)}else u.push(...v);const h={type:"element",tagName:"li",properties:{id:t+"fn-"+p},children:e.wrap(u,!0)};e.patch(c,h),s.push(h)}if(s.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:a,properties:{...vo(o),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(s,!0)},{type:"text",value:`
`}]}}const au=function(e){if(e==null)return CE;if(typeof e=="function")return Go(e);if(typeof e=="object")return Array.isArray(e)?NE(e):TE(e);if(typeof e=="string")return OE(e);throw new Error("Expected function, string, or object as test")};function NE(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=au(e[n]);return Go(r);function r(...i){let a=-1;for(;++a<t.length;)if(t[a].apply(this,i))return!0;return!1}}function TE(e){const t=e;return Go(n);function n(r){const i=r;let a;for(a in e)if(i[a]!==t[a])return!1;return!0}}function OE(e){return Go(t);function t(n){return n&&n.type===e}}function Go(e){return t;function t(n,r,i){return!!(AE(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function CE(){return!0}function AE(e){return e!==null&&typeof e=="object"&&"type"in e}const ng=[],RE=!0,cp=!1,IE="skip";function ME(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const a=au(i),o=r?-1:1;s(e,void 0,[])();function s(l,c,u){const d=l&&typeof l=="object"?l:{};if(typeof d.type=="string"){const f=typeof d.tagName=="string"?d.tagName:typeof d.name=="string"?d.name:void 0;Object.defineProperty(p,"name",{value:"node ("+(l.type+(f?"<"+f+">":""))+")"})}return p;function p(){let f=ng,v,x,S;if((!t||a(l,c,u[u.length-1]||void 0))&&(f=PE(n(l,u)),f[0]===cp))return f;if("children"in l&&l.children){const h=l;if(h.children&&f[0]!==IE)for(x=(r?h.children.length:-1)+o,S=u.concat(h);x>-1&&x<h.children.length;){const g=h.children[x];if(v=s(g,x,S)(),v[0]===cp)return v;x=typeof v[1]=="number"?v[1]:x+o}}return f}}}function PE(e){return Array.isArray(e)?e:typeof e=="number"?[RE,e]:e==null?ng:[e]}function ou(e,t,n,r){let i,a,o;typeof t=="function"&&typeof n!="function"?(a=void 0,o=t,i=n):(a=t,o=n,i=r),ME(e,a,s,i);function s(l,c){const u=c[c.length-1],d=u?u.children.indexOf(l):void 0;return o(l,d,u)}}const Wl={}.hasOwnProperty,LE={};function DE(e,t){const n=t||LE,r=new Map,i=new Map,a=new Map,o={...bE,...n.handlers},s={all:c,applyData:BE,definitionById:r,footnoteById:i,footnoteCounts:a,footnoteOrder:[],handlers:o,one:l,options:n,patch:FE,wrap:UE};return ou(e,function(u){if(u.type==="definition"||u.type==="footnoteDefinition"){const d=u.type==="definition"?r:i,p=String(u.identifier).toUpperCase();d.has(p)||d.set(p,u)}}),s;function l(u,d){const p=u.type,f=s.handlers[p];if(Wl.call(s.handlers,p)&&f)return f(s,u,d);if(s.options.passThrough&&s.options.passThrough.includes(p)){if("children"in u){const{children:x,...S}=u,h=vo(S);return h.children=s.all(u),h}return vo(u)}return(s.options.unknownHandler||zE)(s,u,d)}function c(u){const d=[];if("children"in u){const p=u.children;let f=-1;for(;++f<p.length;){const v=s.one(p[f],u);if(v){if(f&&p[f-1].type==="break"&&(!Array.isArray(v)&&v.type==="text"&&(v.value=up(v.value)),!Array.isArray(v)&&v.type==="element")){const x=v.children[0];x&&x.type==="text"&&(x.value=up(x.value))}Array.isArray(v)?d.push(...v):d.push(v)}}}return d}}function FE(e,t){e.position&&(t.position=x0(e))}function BE(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,a=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const o="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:o}}n.type==="element"&&a&&Object.assign(n.properties,vo(a)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function zE(e,t){const n=t.data||{},r="value"in t&&!(Wl.call(n,"hProperties")||Wl.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function UE(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function up(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function dp(e,t){const n=DE(e,t),r=n.one(e,void 0),i=SE(n),a=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&a.children.push({type:"text",value:`
`},i),a}function jE(e,t){return e&&"run"in e?async function(n,r){const i=dp(n,{file:r,...t});await e.run(i,r)}:function(n,r){return dp(n,{file:r,...e||t})}}function pp(e){if(e)throw e}var Wa=Object.prototype.hasOwnProperty,rg=Object.prototype.toString,fp=Object.defineProperty,hp=Object.getOwnPropertyDescriptor,mp=function(t){return typeof Array.isArray=="function"?Array.isArray(t):rg.call(t)==="[object Array]"},gp=function(t){if(!t||rg.call(t)!=="[object Object]")return!1;var n=Wa.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&Wa.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||Wa.call(t,i)},yp=function(t,n){fp&&n.name==="__proto__"?fp(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},bp=function(t,n){if(n==="__proto__")if(Wa.call(t,n)){if(hp)return hp(t,n).value}else return;return t[n]},$E=function e(){var t,n,r,i,a,o,s=arguments[0],l=1,c=arguments.length,u=!1;for(typeof s=="boolean"&&(u=s,s=arguments[1]||{},l=2),(s==null||typeof s!="object"&&typeof s!="function")&&(s={});l<c;++l)if(t=arguments[l],t!=null)for(n in t)r=bp(s,n),i=bp(t,n),s!==i&&(u&&i&&(gp(i)||(a=mp(i)))?(a?(a=!1,o=r&&mp(r)?r:[]):o=r&&gp(r)?r:{},yp(s,{name:n,newValue:e(u,o,i)})):typeof i<"u"&&yp(s,{name:n,newValue:i}));return s};const Ns=ko($E);function ql(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function HE(){const e=[],t={run:n,use:r};return t;function n(...i){let a=-1;const o=i.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);s(null,...i);function s(l,...c){const u=e[++a];let d=-1;if(l){o(l);return}for(;++d<i.length;)(c[d]===null||c[d]===void 0)&&(c[d]=i[d]);i=c,u?WE(u,s)(...c):o(null,...c)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function WE(e,t){let n;return r;function r(...o){const s=e.length>o.length;let l;s&&o.push(i);try{l=e.apply(this,o)}catch(c){const u=c;if(s&&n)throw u;return i(u)}s||(l&&l.then&&typeof l.then=="function"?l.then(a,i):l instanceof Error?i(l):a(l))}function i(o,...s){n||(n=!0,t(o,...s))}function a(o){i(null,o)}}const Rt={basename:qE,dirname:GE,extname:KE,join:VE,sep:"/"};function qE(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Ji(e);let n=0,r=-1,i=e.length,a;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else r<0&&(a=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let o=-1,s=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else o<0&&(a=!0,o=i+1),s>-1&&(e.codePointAt(i)===t.codePointAt(s--)?s<0&&(r=i):(s=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function GE(e){if(Ji(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function KE(e){Ji(e);let t=e.length,n=-1,r=0,i=-1,a=0,o;for(;t--;){const s=e.codePointAt(t);if(s===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),s===46?i<0?i=t:a!==1&&(a=1):i>-1&&(a=-1)}return i<0||n<0||a===0||a===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function VE(...e){let t=-1,n;for(;++t<e.length;)Ji(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":YE(n)}function YE(e){Ji(e);const t=e.codePointAt(0)===47;let n=QE(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function QE(e,t){let n="",r=0,i=-1,a=0,o=-1,s,l;for(;++o<=e.length;){if(o<e.length)s=e.codePointAt(o);else{if(s===47)break;s=47}if(s===47){if(!(i===o-1||a===1))if(i!==o-1&&a===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(l=n.lastIndexOf("/"),l!==n.length-1){l<0?(n="",r=0):(n=n.slice(0,l),r=n.length-1-n.lastIndexOf("/")),i=o,a=0;continue}}else if(n.length>0){n="",r=0,i=o,a=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,a=0}else s===46&&a>-1?a++:a=-1}return n}function Ji(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const XE={cwd:ZE};function ZE(){return"/"}function Gl(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function JE(e){if(typeof e=="string")e=new URL(e);else if(!Gl(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return e1(e)}function e1(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const Ts=["history","path","basename","stem","extname","dirname"];class ig{constructor(t){let n;t?Gl(t)?n={path:t}:typeof t=="string"||t1(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":XE.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<Ts.length;){const a=Ts[r];a in n&&n[a]!==void 0&&n[a]!==null&&(this[a]=a==="history"?[...n[a]]:n[a])}let i;for(i in n)Ts.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?Rt.basename(this.path):void 0}set basename(t){Cs(t,"basename"),Os(t,"basename"),this.path=Rt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Rt.dirname(this.path):void 0}set dirname(t){vp(this.basename,"dirname"),this.path=Rt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Rt.extname(this.path):void 0}set extname(t){if(Os(t,"extname"),vp(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Rt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){Gl(t)&&(t=JE(t)),Cs(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Rt.basename(this.path,this.extname):void 0}set stem(t){Cs(t,"stem"),Os(t,"stem"),this.path=Rt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new Fe(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function Os(e,t){if(e&&e.includes(Rt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Rt.sep+"`")}function Cs(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function vp(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function t1(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const n1=function(e){const r=this.constructor.prototype,i=r[e],a=function(){return i.apply(a,arguments)};return Object.setPrototypeOf(a,r),a},r1={}.hasOwnProperty;class su extends n1{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=HE()}copy(){const t=new su;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(Ns(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(Is("data",this.frozen),this.namespace[t]=n,this):r1.call(this.namespace,t)&&this.namespace[t]||void 0:t?(Is("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=_a(t),r=this.parser||this.Parser;return As("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),As("process",this.parser||this.Parser),Rs("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(a,o){const s=_a(t),l=r.parse(s);r.run(l,s,function(u,d,p){if(u||!d||!p)return c(u);const f=d,v=r.stringify(f,p);o1(v)?p.value=v:p.result=v,c(u,p)});function c(u,d){u||!d?o(u):a?a(d):n(void 0,d)}}}processSync(t){let n=!1,r;return this.freeze(),As("processSync",this.parser||this.Parser),Rs("processSync",this.compiler||this.Compiler),this.process(t,i),_p("processSync","process",n),r;function i(a,o){n=!0,pp(a),r=o}}run(t,n,r){xp(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?a(void 0,r):new Promise(a);function a(o,s){const l=_a(n);i.run(t,l,c);function c(u,d,p){const f=d||t;u?s(u):o?o(f):r(void 0,f,p)}}}runSync(t,n){let r=!1,i;return this.run(t,n,a),_p("runSync","run",r),i;function a(o,s){pp(o),i=s,r=!0}}stringify(t,n){this.freeze();const r=_a(n),i=this.compiler||this.Compiler;return Rs("stringify",i),xp(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(Is("use",this.frozen),t!=null)if(typeof t=="function")l(t,n);else if(typeof t=="object")Array.isArray(t)?s(t):o(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function a(c){if(typeof c=="function")l(c,[]);else if(typeof c=="object")if(Array.isArray(c)){const[u,...d]=c;l(u,d)}else o(c);else throw new TypeError("Expected usable value, not `"+c+"`")}function o(c){if(!("plugins"in c)&&!("settings"in c))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");s(c.plugins),c.settings&&(i.settings=Ns(!0,i.settings,c.settings))}function s(c){let u=-1;if(c!=null)if(Array.isArray(c))for(;++u<c.length;){const d=c[u];a(d)}else throw new TypeError("Expected a list of plugins, not `"+c+"`")}function l(c,u){let d=-1,p=-1;for(;++d<r.length;)if(r[d][0]===c){p=d;break}if(p===-1)r.push([c,...u]);else if(u.length>0){let[f,...v]=u;const x=r[p][1];ql(x)&&ql(f)&&(f=Ns(!0,x,f)),r[p]=[c,f,...v]}}}}const i1=new su().freeze();function As(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Rs(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Is(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function xp(e){if(!ql(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function _p(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function _a(e){return a1(e)?e:new ig(e)}function a1(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function o1(e){return typeof e=="string"||s1(e)}function s1(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const l1="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",wp=[],Ep={allowDangerousHtml:!0},c1=/^(https?|ircs?|mailto|xmpp)$/i,u1=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function lu(e){const t=d1(e),n=p1(e);return f1(t.runSync(t.parse(n),n),e)}function d1(e){const t=e.rehypePlugins||wp,n=e.remarkPlugins||wp,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Ep}:Ep;return i1().use(Gw).use(n).use(jE,r).use(t)}function p1(e){const t=e.children||"",n=new ig;return typeof t=="string"&&(n.value=t),n}function f1(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,a=t.disallowedElements,o=t.skipHtml,s=t.unwrapDisallowed,l=t.urlTransform||h1;for(const u of u1)Object.hasOwn(t,u.from)&&(""+u.from+(u.to?"use `"+u.to+"` instead":"remove it")+l1+u.id,void 0);return t.className&&(e={type:"element",tagName:"div",properties:{className:t.className},children:e.type==="root"?e.children:[e]}),ou(e,c),S0(e,{Fragment:m.Fragment,components:i,ignoreInvalidStyle:!0,jsx:m.jsx,jsxs:m.jsxs,passKeys:!0,passNode:!0});function c(u,d,p){if(u.type==="raw"&&p&&typeof d=="number")return o?p.children.splice(d,1):p.children[d]={type:"text",value:u.value},d;if(u.type==="element"){let f;for(f in Es)if(Object.hasOwn(Es,f)&&Object.hasOwn(u.properties,f)){const v=u.properties[f],x=Es[f];(x===null||x.includes(u.tagName))&&(u.properties[f]=l(String(v||""),f,u))}}if(u.type==="element"){let f=n?!n.includes(u.tagName):a?a.includes(u.tagName):!1;if(!f&&r&&typeof d=="number"&&(f=!r(u,d,p)),f&&p&&typeof d=="number")return s&&u.children?p.children.splice(d,1,...u.children):p.children.splice(d,1),d}}}function h1(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||c1.test(e.slice(0,t))?e:""}const kp=function(e,t,n){const r=au(n);if(!e||!e.type||!e.children)throw new Error("Expected parent node");if(typeof t=="number"){if(t<0||t===Number.POSITIVE_INFINITY)throw new Error("Expected positive finite number as index")}else if(t=e.children.indexOf(t),t<0)throw new Error("Expected child node or index");for(;++t<e.children.length;)if(r(e.children[t],t,e))return e.children[t]},Yn=function(e){if(e==null)return y1;if(typeof e=="string")return g1(e);if(typeof e=="object")return m1(e);if(typeof e=="function")return cu(e);throw new Error("Expected function, string, or array as `test`")};function m1(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=Yn(e[n]);return cu(r);function r(...i){let a=-1;for(;++a<t.length;)if(t[a].apply(this,i))return!0;return!1}}function g1(e){return cu(t);function t(n){return n.tagName===e}}function cu(e){return t;function t(n,r,i){return!!(b1(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function y1(e){return!!(e&&typeof e=="object"&&"type"in e&&e.type==="element"&&"tagName"in e&&typeof e.tagName=="string")}function b1(e){return e!==null&&typeof e=="object"&&"type"in e&&"tagName"in e}const Sp=/\n/g,Np=/[\t ]+/g,Kl=Yn("br"),Tp=Yn(N1),v1=Yn("p"),Op=Yn("tr"),x1=Yn(["datalist","head","noembed","noframes","noscript","rp","script","style","template","title",S1,T1]),ag=Yn(["address","article","aside","blockquote","body","caption","center","dd","dialog","dir","dl","dt","div","figure","figcaption","footer","form,","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","legend","li","listing","main","menu","nav","ol","p","plaintext","pre","section","ul","xmp"]);function _1(e,t){const n=t||{},r="children"in e?e.children:[],i=ag(e),a=lg(e,{whitespace:n.whitespace||"normal"}),o=[];(e.type==="text"||e.type==="comment")&&o.push(...sg(e,{breakBefore:!0,breakAfter:!0}));let s=-1;for(;++s<r.length;)o.push(...og(r[s],e,{whitespace:a,breakBefore:s?void 0:i,breakAfter:s<r.length-1?Kl(r[s+1]):i}));const l=[];let c;for(s=-1;++s<o.length;){const u=o[s];typeof u=="number"?c!==void 0&&u>c&&(c=u):u&&(c!==void 0&&c>-1&&l.push(`
`.repeat(c)||" "),c=-1,l.push(u))}return l.join("")}function og(e,t,n){return e.type==="element"?w1(e,t,n):e.type==="text"?n.whitespace==="normal"?sg(e,n):E1(e):[]}function w1(e,t,n){const r=lg(e,n),i=e.children||[];let a=-1,o=[];if(x1(e))return o;let s,l;for(Kl(e)||Op(e)&&kp(t,e,Op)?l=`
`:v1(e)?(s=2,l=2):ag(e)&&(s=1,l=1);++a<i.length;)o=o.concat(og(i[a],e,{whitespace:r,breakBefore:a?void 0:s,breakAfter:a<i.length-1?Kl(i[a+1]):l}));return Tp(e)&&kp(t,e,Tp)&&o.push("	"),s&&o.unshift(s),l&&o.push(l),o}function sg(e,t){const n=String(e.value),r=[],i=[];let a=0;for(;a<=n.length;){Sp.lastIndex=a;const l=Sp.exec(n),c=l&&"index"in l?l.index:n.length;r.push(k1(n.slice(a,c).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,""),a===0?t.breakBefore:!0,c===n.length?t.breakAfter:!0)),a=c+1}let o=-1,s;for(;++o<r.length;)r[o].charCodeAt(r[o].length-1)===8203||o<r.length-1&&r[o+1].charCodeAt(0)===8203?(i.push(r[o]),s=void 0):r[o]?(typeof s=="number"&&i.push(s),i.push(r[o]),s=0):(o===0||o===r.length-1)&&i.push(0);return i}function E1(e){return[String(e.value)]}function k1(e,t,n){const r=[];let i=0,a;for(;i<e.length;){Np.lastIndex=i;const o=Np.exec(e);a=o?o.index:e.length,!i&&!a&&o&&!t&&r.push(""),i!==a&&r.push(e.slice(i,a)),i=o?a+o[0].length:a}return i!==a&&!n&&r.push(""),r.join(" ")}function lg(e,t){if(e.type==="element"){const n=e.properties||{};switch(e.tagName){case"listing":case"plaintext":case"xmp":return"pre";case"nobr":return"nowrap";case"pre":return n.wrap?"pre-wrap":"pre";case"td":case"th":return n.noWrap?"nowrap":t.whitespace;case"textarea":return"pre-wrap"}}return t.whitespace}function S1(e){return!!(e.properties||{}).hidden}function N1(e){return e.tagName==="td"||e.tagName==="th"}function T1(e){return e.tagName==="dialog"&&!(e.properties||{}).open}function O1(e){const t=e.regex,n=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),r="decltype\\(auto\\)",i="[a-zA-Z_]\\w*::",o="(?!struct)("+r+"|"+t.optional(i)+"[a-zA-Z_]\\w*"+t.optional("<[^<>]+>")+")",s={className:"type",begin:"\\b[a-z\\d_]*_t\\b"},c={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+"\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)"+"|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},u={className:"number",variants:[{begin:"[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"},{begin:"[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"}],relevance:0},d={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(c,{className:"string"}),{className:"string",begin:/<.*?>/},n,e.C_BLOCK_COMMENT_MODE]},p={className:"title",begin:t.optional(i)+e.IDENT_RE,relevance:0},f=t.optional(i)+e.IDENT_RE+"\\s*\\(",v=["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","private","protected","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq"],x=["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],S=["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","flat_map","flat_set","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"],h=["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"],E={type:x,keyword:v,literal:["NULL","false","nullopt","nullptr","true"],built_in:["_Pragma"],_type_hints:S},N={className:"function.dispatch",relevance:0,keywords:{_hint:h},begin:t.concat(/\b/,/(?!decltype)/,/(?!if)/,/(?!for)/,/(?!switch)/,/(?!while)/,e.IDENT_RE,t.lookahead(/(<[^<>]+>|)\s*\(/))},w=[N,d,s,n,e.C_BLOCK_COMMENT_MODE,u,c],A={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:E,contains:w.concat([{begin:/\(/,end:/\)/,keywords:E,contains:w.concat(["self"]),relevance:0}]),relevance:0},I={className:"function",begin:"("+o+"[\\*&\\s]+)+"+f,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:E,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:r,keywords:E,relevance:0},{begin:f,returnBegin:!0,contains:[p],relevance:0},{begin:/::/,relevance:0},{begin:/:/,endsWithParent:!0,contains:[c,u]},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:E,relevance:0,contains:[n,e.C_BLOCK_COMMENT_MODE,c,u,s,{begin:/\(/,end:/\)/,keywords:E,relevance:0,contains:["self",n,e.C_BLOCK_COMMENT_MODE,c,u,s]}]},s,n,e.C_BLOCK_COMMENT_MODE,d]};return{name:"C++",aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:E,illegal:"</",classNameAliases:{"function.dispatch":"built_in"},contains:[].concat(A,I,N,w,[d,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",end:">",keywords:E,contains:["self",s]},{begin:e.IDENT_RE+"::",keywords:E},{match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],className:{1:"keyword",3:"title.class"}}])}}function C1(e){const t={type:["boolean","byte","word","String"],built_in:["KeyboardController","MouseController","SoftwareSerial","EthernetServer","EthernetClient","LiquidCrystal","RobotControl","GSMVoiceCall","EthernetUDP","EsploraTFT","HttpClient","RobotMotor","WiFiClient","GSMScanner","FileSystem","Scheduler","GSMServer","YunClient","YunServer","IPAddress","GSMClient","GSMModem","Keyboard","Ethernet","Console","GSMBand","Esplora","Stepper","Process","WiFiUDP","GSM_SMS","Mailbox","USBHost","Firmata","PImage","Client","Server","GSMPIN","FileIO","Bridge","Serial","EEPROM","Stream","Mouse","Audio","Servo","File","Task","GPRS","WiFi","Wire","TFT","GSM","SPI","SD"],_hints:["setup","loop","runShellCommandAsynchronously","analogWriteResolution","retrieveCallingNumber","printFirmwareVersion","analogReadResolution","sendDigitalPortPair","noListenOnLocalhost","readJoystickButton","setFirmwareVersion","readJoystickSwitch","scrollDisplayRight","getVoiceCallStatus","scrollDisplayLeft","writeMicroseconds","delayMicroseconds","beginTransmission","getSignalStrength","runAsynchronously","getAsynchronously","listenOnLocalhost","getCurrentCarrier","readAccelerometer","messageAvailable","sendDigitalPorts","lineFollowConfig","countryNameWrite","runShellCommand","readStringUntil","rewindDirectory","readTemperature","setClockDivider","readLightSensor","endTransmission","analogReference","detachInterrupt","countryNameRead","attachInterrupt","encryptionType","readBytesUntil","robotNameWrite","readMicrophone","robotNameRead","cityNameWrite","userNameWrite","readJoystickY","readJoystickX","mouseReleased","openNextFile","scanNetworks","noInterrupts","digitalWrite","beginSpeaker","mousePressed","isActionDone","mouseDragged","displayLogos","noAutoscroll","addParameter","remoteNumber","getModifiers","keyboardRead","userNameRead","waitContinue","processInput","parseCommand","printVersion","readNetworks","writeMessage","blinkVersion","cityNameRead","readMessage","setDataMode","parsePacket","isListening","setBitOrder","beginPacket","isDirectory","motorsWrite","drawCompass","digitalRead","clearScreen","serialEvent","rightToLeft","setTextSize","leftToRight","requestFrom","keyReleased","compassRead","analogWrite","interrupts","WiFiServer","disconnect","playMelody","parseFloat","autoscroll","getPINUsed","setPINUsed","setTimeout","sendAnalog","readSlider","analogRead","beginWrite","createChar","motorsStop","keyPressed","tempoWrite","readButton","subnetMask","debugPrint","macAddress","writeGreen","randomSeed","attachGPRS","readString","sendString","remotePort","releaseAll","mouseMoved","background","getXChange","getYChange","answerCall","getResult","voiceCall","endPacket","constrain","getSocket","writeJSON","getButton","available","connected","findUntil","readBytes","exitValue","readGreen","writeBlue","startLoop","IPAddress","isPressed","sendSysex","pauseMode","gatewayIP","setCursor","getOemKey","tuneWrite","noDisplay","loadImage","switchPIN","onRequest","onReceive","changePIN","playFile","noBuffer","parseInt","overflow","checkPIN","knobRead","beginTFT","bitClear","updateIR","bitWrite","position","writeRGB","highByte","writeRed","setSpeed","readBlue","noStroke","remoteIP","transfer","shutdown","hangCall","beginSMS","endWrite","attached","maintain","noCursor","checkReg","checkPUK","shiftOut","isValid","shiftIn","pulseIn","connect","println","localIP","pinMode","getIMEI","display","noBlink","process","getBand","running","beginSD","drawBMP","lowByte","setBand","release","bitRead","prepare","pointTo","readRed","setMode","noFill","remove","listen","stroke","detach","attach","noTone","exists","buffer","height","bitSet","circle","config","cursor","random","IRread","setDNS","endSMS","getKey","micros","millis","begin","print","write","ready","flush","width","isPIN","blink","clear","press","mkdir","rmdir","close","point","yield","image","BSSID","click","delay","read","text","move","peek","beep","rect","line","open","seek","fill","size","turn","stop","home","find","step","tone","sqrt","RSSI","SSID","end","bit","tan","cos","sin","pow","map","abs","max","min","get","run","put"],literal:["DIGITAL_MESSAGE","FIRMATA_STRING","ANALOG_MESSAGE","REPORT_DIGITAL","REPORT_ANALOG","INPUT_PULLUP","SET_PIN_MODE","INTERNAL2V56","SYSTEM_RESET","LED_BUILTIN","INTERNAL1V1","SYSEX_START","INTERNAL","EXTERNAL","DEFAULT","OUTPUT","INPUT","HIGH","LOW"]},n=O1(e),r=n.keywords;return r.type=[...r.type,...t.type],r.literal=[...r.literal,...t.literal],r.built_in=[...r.built_in,...t.built_in],r._hints=t._hints,n.name="Arduino",n.aliases=["ino"],n.supersetOf="cpp",n}function A1(e){const t=e.regex,n={},r={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]};Object.assign(n,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},r]});const i={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},a=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),o={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,i]};i.contains.push(s);const l={match:/\\"/},c={className:"string",begin:/'/,end:/'/},u={match:/\\'/},d={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},p=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],f=e.SHEBANG({binary:`(${p.join("|")})`,relevance:10}),v={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},x=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],S=["true","false"],h={match:/(\/[a-z._-]+)+/},g=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],y=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],E=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],N=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:x,literal:S,built_in:[...g,...y,"set","shopt",...E,...N]},contains:[f,e.SHEBANG(),v,d,a,o,h,s,l,c,u,n]}}function R1(e){const t=e.regex,n=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),r="decltype\\(auto\\)",i="[a-zA-Z_]\\w*::",o="("+r+"|"+t.optional(i)+"[a-zA-Z_]\\w*"+t.optional("<[^<>]+>")+")",s={className:"type",variants:[{begin:"\\b[a-z\\d_]*_t\\b"},{match:/\batomic_[a-z]{3,6}\b/}]},c={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+"\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)"+"|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},u={className:"number",variants:[{match:/\b(0b[01']+)/},{match:/(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/},{match:/(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/},{match:/(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/}],relevance:0},d={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef elifdef elifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(c,{className:"string"}),{className:"string",begin:/<.*?>/},n,e.C_BLOCK_COMMENT_MODE]},p={className:"title",begin:t.optional(i)+e.IDENT_RE,relevance:0},f=t.optional(i)+e.IDENT_RE+"\\s*\\(",S={keyword:["asm","auto","break","case","continue","default","do","else","enum","extern","for","fortran","goto","if","inline","register","restrict","return","sizeof","typeof","typeof_unqual","struct","switch","typedef","union","volatile","while","_Alignas","_Alignof","_Atomic","_Generic","_Noreturn","_Static_assert","_Thread_local","alignas","alignof","noreturn","static_assert","thread_local","_Pragma"],type:["float","double","signed","unsigned","int","short","long","char","void","_Bool","_BitInt","_Complex","_Imaginary","_Decimal32","_Decimal64","_Decimal96","_Decimal128","_Decimal64x","_Decimal128x","_Float16","_Float32","_Float64","_Float128","_Float32x","_Float64x","_Float128x","const","static","constexpr","complex","bool","imaginary"],literal:"true false NULL",built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"},h=[d,s,n,e.C_BLOCK_COMMENT_MODE,u,c],g={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:S,contains:h.concat([{begin:/\(/,end:/\)/,keywords:S,contains:h.concat(["self"]),relevance:0}]),relevance:0},y={begin:"("+o+"[\\*&\\s]+)+"+f,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:S,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:r,keywords:S,relevance:0},{begin:f,returnBegin:!0,contains:[e.inherit(p,{className:"title.function"})],relevance:0},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:S,relevance:0,contains:[n,e.C_BLOCK_COMMENT_MODE,c,u,s,{begin:/\(/,end:/\)/,keywords:S,relevance:0,contains:["self",n,e.C_BLOCK_COMMENT_MODE,c,u,s]}]},s,n,e.C_BLOCK_COMMENT_MODE,d]};return{name:"C",aliases:["h"],keywords:S,disableAutodetect:!0,illegal:"</",contains:[].concat(g,y,h,[d,{begin:e.IDENT_RE+"::",keywords:S},{className:"class",beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{beginKeywords:"final class struct"},e.TITLE_MODE]}]),exports:{preprocessor:d,strings:c,keywords:S}}}function I1(e){const t=e.regex,n=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),r="decltype\\(auto\\)",i="[a-zA-Z_]\\w*::",o="(?!struct)("+r+"|"+t.optional(i)+"[a-zA-Z_]\\w*"+t.optional("<[^<>]+>")+")",s={className:"type",begin:"\\b[a-z\\d_]*_t\\b"},c={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+"\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)"+"|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},u={className:"number",variants:[{begin:"[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"},{begin:"[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"}],relevance:0},d={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(c,{className:"string"}),{className:"string",begin:/<.*?>/},n,e.C_BLOCK_COMMENT_MODE]},p={className:"title",begin:t.optional(i)+e.IDENT_RE,relevance:0},f=t.optional(i)+e.IDENT_RE+"\\s*\\(",v=["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","private","protected","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq"],x=["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],S=["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","flat_map","flat_set","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"],h=["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"],E={type:x,keyword:v,literal:["NULL","false","nullopt","nullptr","true"],built_in:["_Pragma"],_type_hints:S},N={className:"function.dispatch",relevance:0,keywords:{_hint:h},begin:t.concat(/\b/,/(?!decltype)/,/(?!if)/,/(?!for)/,/(?!switch)/,/(?!while)/,e.IDENT_RE,t.lookahead(/(<[^<>]+>|)\s*\(/))},w=[N,d,s,n,e.C_BLOCK_COMMENT_MODE,u,c],A={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:E,contains:w.concat([{begin:/\(/,end:/\)/,keywords:E,contains:w.concat(["self"]),relevance:0}]),relevance:0},I={className:"function",begin:"("+o+"[\\*&\\s]+)+"+f,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:E,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:r,keywords:E,relevance:0},{begin:f,returnBegin:!0,contains:[p],relevance:0},{begin:/::/,relevance:0},{begin:/:/,endsWithParent:!0,contains:[c,u]},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:E,relevance:0,contains:[n,e.C_BLOCK_COMMENT_MODE,c,u,s,{begin:/\(/,end:/\)/,keywords:E,relevance:0,contains:["self",n,e.C_BLOCK_COMMENT_MODE,c,u,s]}]},s,n,e.C_BLOCK_COMMENT_MODE,d]};return{name:"C++",aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:E,illegal:"</",classNameAliases:{"function.dispatch":"built_in"},contains:[].concat(A,I,N,w,[d,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",end:">",keywords:E,contains:["self",s]},{begin:e.IDENT_RE+"::",keywords:E},{match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],className:{1:"keyword",3:"title.class"}}])}}function M1(e){const t=["bool","byte","char","decimal","delegate","double","dynamic","enum","float","int","long","nint","nuint","object","sbyte","short","string","ulong","uint","ushort"],n=["public","private","protected","static","internal","protected","abstract","async","extern","override","unsafe","virtual","new","sealed","partial"],r=["default","false","null","true"],i=["abstract","as","base","break","case","catch","class","const","continue","do","else","event","explicit","extern","finally","fixed","for","foreach","goto","if","implicit","in","interface","internal","is","lock","namespace","new","operator","out","override","params","private","protected","public","readonly","record","ref","return","scoped","sealed","sizeof","stackalloc","static","struct","switch","this","throw","try","typeof","unchecked","unsafe","using","virtual","void","volatile","while"],a=["add","alias","and","ascending","args","async","await","by","descending","dynamic","equals","file","from","get","global","group","init","into","join","let","nameof","not","notnull","on","or","orderby","partial","record","remove","required","scoped","select","set","unmanaged","value|0","var","when","where","with","yield"],o={keyword:i.concat(a),built_in:t,literal:r},s=e.inherit(e.TITLE_MODE,{begin:"[a-zA-Z](\\.?\\w)*"}),l={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},c={className:"string",begin:/"""("*)(?!")(.|\n)*?"""\1/,relevance:1},u={className:"string",begin:'@"',end:'"',contains:[{begin:'""'}]},d=e.inherit(u,{illegal:/\n/}),p={className:"subst",begin:/\{/,end:/\}/,keywords:o},f=e.inherit(p,{illegal:/\n/}),v={className:"string",begin:/\$"/,end:'"',illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},e.BACKSLASH_ESCAPE,f]},x={className:"string",begin:/\$@"/,end:'"',contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},p]},S=e.inherit(x,{illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},f]});p.contains=[x,v,u,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,l,e.C_BLOCK_COMMENT_MODE],f.contains=[S,v,d,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,l,e.inherit(e.C_BLOCK_COMMENT_MODE,{illegal:/\n/})];const h={variants:[c,x,v,u,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},g={begin:"<",end:">",contains:[{beginKeywords:"in out"},s]},y=e.IDENT_RE+"(<"+e.IDENT_RE+"(\\s*,\\s*"+e.IDENT_RE+")*>)?(\\[\\])?",E={begin:"@"+e.IDENT_RE,relevance:0};return{name:"C#",aliases:["cs","c#"],keywords:o,illegal:/::/,contains:[e.COMMENT("///","$",{returnBegin:!0,contains:[{className:"doctag",variants:[{begin:"///",relevance:0},{begin:"<!--|-->"},{begin:"</?",end:">"}]}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"meta",begin:"#",end:"$",keywords:{keyword:"if else elif endif define undef warning error line region endregion pragma checksum"}},h,l,{beginKeywords:"class interface",relevance:0,end:/[{;=]/,illegal:/[^\s:,]/,contains:[{beginKeywords:"where class"},s,g,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"namespace",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[s,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"record",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[s,g,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"meta",begin:"^\\s*\\[(?=[\\w])",excludeBegin:!0,end:"\\]",excludeEnd:!0,contains:[{className:"string",begin:/"/,end:/"/}]},{beginKeywords:"new return throw await else",relevance:0},{className:"function",begin:"("+y+"\\s+)+"+e.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,end:/\s*[{;=]/,excludeEnd:!0,keywords:o,contains:[{beginKeywords:n.join(" "),relevance:0},{begin:e.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,contains:[e.TITLE_MODE,g],relevance:0},{match:/\(\)/},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,relevance:0,contains:[h,l,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},E]}}const P1=e=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),L1=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","optgroup","option","p","picture","q","quote","samp","section","select","source","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],D1=["defs","g","marker","mask","pattern","svg","switch","symbol","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","linearGradient","radialGradient","stop","circle","ellipse","image","line","path","polygon","polyline","rect","text","use","textPath","tspan","foreignObject","clipPath"],F1=[...L1,...D1],B1=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"].sort().reverse(),z1=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"].sort().reverse(),U1=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"].sort().reverse(),j1=["accent-color","align-content","align-items","align-self","alignment-baseline","all","anchor-name","animation","animation-composition","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","cx","cy","direction","display","dominant-baseline","empty-cells","enable-background","field-sizing","fill","fill-opacity","fill-rule","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flood-color","flood-opacity","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","font-smooth","font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","kerning","left","letter-spacing","lighting-color","line-break","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","marker","marker-end","marker-mid","marker-start","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overlay","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","position-anchor","position-visibility","print-color-adjust","quotes","r","resize","rest","rest-after","rest-before","right","rotate","row-gap","ruby-align","ruby-position","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","shape-rendering","speak","speak-as","src","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","text-wrap","text-wrap-mode","text-wrap-style","timeline-scope","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-behavior","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-modify","user-select","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","white-space-collapse","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","x","y","z-index","zoom"].sort().reverse();function $1(e){const t=e.regex,n=P1(e),r={begin:/-(webkit|moz|ms|o)-(?=[a-z])/},i="and or not only",a=/@-?\w[\w]*(-\w+)*/,o="[a-zA-Z-][a-zA-Z0-9_-]*",s=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE];return{name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[n.BLOCK_COMMENT,r,n.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{className:"selector-class",begin:"\\."+o,relevance:0},n.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+z1.join("|")+")"},{begin:":(:)?("+U1.join("|")+")"}]},n.CSS_VARIABLE,{className:"attribute",begin:"\\b("+j1.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,contains:[n.BLOCK_COMMENT,n.HEXCOLOR,n.IMPORTANT,n.CSS_NUMBER_MODE,...s,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"},contains:[...s,{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]},n.FUNCTION_DISPATCH]},{begin:t.lookahead(/@/),end:"[{;]",relevance:0,illegal:/:/,contains:[{className:"keyword",begin:a},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:i,attribute:B1.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"attribute"},...s,n.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\\b("+F1.join("|")+")\\b"}]}}function H1(e){const t=e.regex;return{name:"Diff",aliases:["patch"],contains:[{className:"meta",relevance:10,match:t.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,/^\*\*\* +\d+,\d+ +\*\*\*\*$/,/^--- +\d+,\d+ +----$/)},{className:"comment",variants:[{begin:t.either(/Index: /,/^index/,/={3,}/,/^-{3}/,/^\*{3} /,/^\+{3}/,/^diff --git/),end:/$/},{match:/^\*{15}$/}]},{className:"addition",begin:/^\+/,end:/$/},{className:"deletion",begin:/^-/,end:/$/},{className:"addition",begin:/^!/,end:/$/}]}}function W1(e){const a={keyword:["break","case","chan","const","continue","default","defer","else","fallthrough","for","func","go","goto","if","import","interface","map","package","range","return","select","struct","switch","type","var"],type:["bool","byte","complex64","complex128","error","float32","float64","int8","int16","int32","int64","string","uint8","uint16","uint32","uint64","int","uint","uintptr","rune"],literal:["true","false","iota","nil"],built_in:["append","cap","close","complex","copy","imag","len","make","new","panic","print","println","real","recover","delete"]};return{name:"Go",aliases:["golang"],keywords:a,illegal:"</",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"string",variants:[e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{begin:"`",end:"`"}]},{className:"number",variants:[{match:/-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/,relevance:0},{match:/-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/,relevance:0},{match:/-?\b0[oO](_?[0-7])*i?/,relevance:0},{match:/-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/,relevance:0},{match:/-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/,relevance:0}]},{begin:/:=/},{className:"function",beginKeywords:"func",end:"\\s*(\\{|$)",excludeEnd:!0,contains:[e.TITLE_MODE,{className:"params",begin:/\(/,end:/\)/,endsParent:!0,keywords:a,illegal:/["']/}]}]}}function q1(e){const t=e.regex,n=/[_A-Za-z][_0-9A-Za-z]*/;return{name:"GraphQL",aliases:["gql"],case_insensitive:!0,disableAutodetect:!1,keywords:{keyword:["query","mutation","subscription","type","input","schema","directive","interface","union","scalar","fragment","enum","on"],literal:["true","false","null"]},contains:[e.HASH_COMMENT_MODE,e.QUOTE_STRING_MODE,e.NUMBER_MODE,{scope:"punctuation",match:/[.]{3}/,relevance:0},{scope:"punctuation",begin:/[\!\(\)\:\=\[\]\{\|\}]{1}/,relevance:0},{scope:"variable",begin:/\$/,end:/\W/,excludeEnd:!0,relevance:0},{scope:"meta",match:/@\w+/,excludeEnd:!0},{scope:"symbol",begin:t.concat(n,t.lookahead(/\s*:/)),relevance:0}],illegal:[/[;<']/,/BEGIN/]}}function G1(e){const t=e.regex,n={className:"number",relevance:0,variants:[{begin:/([+-]+)?[\d]+_[\d_]+/},{begin:e.NUMBER_RE}]},r=e.COMMENT();r.variants=[{begin:/;/,end:/$/},{begin:/#/,end:/$/}];const i={className:"variable",variants:[{begin:/\$[\w\d"][\w\d_]*/},{begin:/\$\{(.*?)\}/}]},a={className:"literal",begin:/\bon|off|true|false|yes|no\b/},o={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:"'''",end:"'''",relevance:10},{begin:'"""',end:'"""',relevance:10},{begin:'"',end:'"'},{begin:"'",end:"'"}]},s={begin:/\[/,end:/\]/,contains:[r,a,i,o,n,"self"],relevance:0},l=/[A-Za-z0-9_-]+/,c=/"(\\"|[^"])*"/,u=/'[^']*'/,d=t.either(l,c,u),p=t.concat(d,"(\\s*\\.\\s*",d,")*",t.lookahead(/\s*=\s*[^#\s]/));return{name:"TOML, also INI",aliases:["toml"],case_insensitive:!0,illegal:/\S/,contains:[r,{className:"section",begin:/\[+/,end:/\]+/},{begin:p,className:"attr",starts:{end:/$/,contains:[r,s,a,i,o,n]}}]}}var ir="[0-9](_*[0-9])*",wa=`\\.(${ir})`,Ea="[0-9a-fA-F](_*[0-9a-fA-F])*",Cp={className:"number",variants:[{begin:`(\\b(${ir})((${wa})|\\.)?|(${wa}))[eE][+-]?(${ir})[fFdD]?\\b`},{begin:`\\b(${ir})((${wa})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${wa})[fFdD]?\\b`},{begin:`\\b(${ir})[fFdD]\\b`},{begin:`\\b0[xX]((${Ea})\\.?|(${Ea})?\\.(${Ea}))[pP][+-]?(${ir})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Ea})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function cg(e,t,n){return n===-1?"":e.replace(t,r=>cg(e,t,n-1))}function K1(e){const t=e.regex,n="[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",r=n+cg("(?:<"+n+"~~~(?:\\s*,\\s*"+n+"~~~)*>)?",/~~~/g,2),l={keyword:["synchronized","abstract","private","var","static","if","const ","for","while","strictfp","finally","protected","import","native","final","void","enum","else","break","transient","catch","instanceof","volatile","case","assert","package","default","public","try","switch","continue","throws","protected","public","private","module","requires","exports","do","sealed","yield","permits","goto","when"],literal:["false","true","null"],type:["char","boolean","long","float","int","byte","short","double"],built_in:["super","this"]},c={className:"meta",begin:"@"+n,contains:[{begin:/\(/,end:/\)/,contains:["self"]}]},u={className:"params",begin:/\(/,end:/\)/,keywords:l,relevance:0,contains:[e.C_BLOCK_COMMENT_MODE],endsParent:!0};return{name:"Java",aliases:["jsp"],keywords:l,illegal:/<\/|#/,contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{begin:/"""/,end:/"""/,className:"string",contains:[e.BACKSLASH_ESCAPE]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{match:[/\b(?:class|interface|enum|extends|implements|new)/,/\s+/,n],className:{1:"keyword",3:"title.class"}},{match:/non-sealed/,scope:"keyword"},{begin:[t.concat(/(?!else)/,n),/\s+/,n,/\s+/,/=(?!=)/],className:{1:"type",3:"variable",5:"operator"}},{begin:[/record/,/\s+/,n],className:{1:"keyword",3:"title.class"},contains:[u,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"new throw return else",relevance:0},{begin:["(?:"+r+"\\s+)",e.UNDERSCORE_IDENT_RE,/\s*(?=\()/],className:{2:"title.function"},keywords:l,contains:[{className:"params",begin:/\(/,end:/\)/,keywords:l,relevance:0,contains:[c,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,Cp,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},Cp,c]}}const Ap="[A-Za-z$_][0-9A-Za-z$_]*",V1=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Y1=["true","false","null","undefined","NaN","Infinity"],ug=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],dg=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],pg=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Q1=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],X1=[].concat(pg,ug,dg);function Z1(e){const t=e.regex,n=(O,{after:P})=>{const b="</"+O[0].slice(1);return O.input.indexOf(b,P)!==-1},r=Ap,i={begin:"<>",end:"</>"},a=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(O,P)=>{const b=O[0].length+O.index,B=O.input[b];if(B==="<"||B===","){P.ignoreMatch();return}B===">"&&(n(O,{after:b})||P.ignoreMatch());let H;const _=O.input.substring(b);if(H=_.match(/^\s*=/)){P.ignoreMatch();return}if((H=_.match(/^\s+extends\s+/))&&H.index===0){P.ignoreMatch();return}}},s={$pattern:Ap,keyword:V1,literal:Y1,built_in:X1,"variable.language":Q1},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},f={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},x={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},g={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:r+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},y=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,v,x,S,{match:/\$\d+/},d];p.contains=y.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(y)});const E=[].concat(g,p.contains),N=E.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(E)}]),w={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N},A={variants:[{match:[/class/,/\s+/,r,/\s+/,/extends/,/\s+/,t.concat(r,"(",t.concat(/\./,r),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,r],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...ug,...dg]}},U={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},M={variants:[{match:[/function/,/\s+/,r,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[w],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function W(O){return t.concat("(?!",O.join("|"),")")}const Y={match:t.concat(/\b/,W([...pg,"super","import"].map(O=>`${O}\\s*\\(`)),r,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(r,/(?![0-9A-Za-z$_(])/))),end:r,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,r,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},w]},T="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",D={match:[/const|var|let/,/\s+/,r,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(T)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[w]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),U,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,v,x,S,g,{match:/\$\d+/},d,I,{scope:"attr",match:r+t.lookahead(":"),relevance:0},D,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[g,e.REGEXP_MODE,{className:"function",begin:T,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:a},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},M,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[w,e.inherit(e.TITLE_MODE,{begin:r,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+r,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[w]},Y,$,A,L,{match:/\$[(.]/}]}}function J1(e){const t={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},n={match:/[{}[\],:]/,className:"punctuation",relevance:0},r=["true","false","null"],i={scope:"literal",beginKeywords:r.join(" ")};return{name:"JSON",aliases:["jsonc"],keywords:{literal:r},contains:[t,n,e.QUOTE_STRING_MODE,i,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}var ar="[0-9](_*[0-9])*",ka=`\\.(${ar})`,Sa="[0-9a-fA-F](_*[0-9a-fA-F])*",ek={className:"number",variants:[{begin:`(\\b(${ar})((${ka})|\\.)?|(${ka}))[eE][+-]?(${ar})[fFdD]?\\b`},{begin:`\\b(${ar})((${ka})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${ka})[fFdD]?\\b`},{begin:`\\b(${ar})[fFdD]\\b`},{begin:`\\b0[xX]((${Sa})\\.?|(${Sa})?\\.(${Sa}))[pP][+-]?(${ar})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Sa})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function tk(e){const t={keyword:"abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",built_in:"Byte Short Char Int Long Boolean Float Double Void Unit Nothing",literal:"true false null"},n={className:"keyword",begin:/\b(break|continue|return|this)\b/,starts:{contains:[{className:"symbol",begin:/@\w+/}]}},r={className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"@"},i={className:"subst",begin:/\$\{/,end:/\}/,contains:[e.C_NUMBER_MODE]},a={className:"variable",begin:"\\$"+e.UNDERSCORE_IDENT_RE},o={className:"string",variants:[{begin:'"""',end:'"""(?=[^"])',contains:[a,i]},{begin:"'",end:"'",illegal:/\n/,contains:[e.BACKSLASH_ESCAPE]},{begin:'"',end:'"',illegal:/\n/,contains:[e.BACKSLASH_ESCAPE,a,i]}]};i.contains.push(o);const s={className:"meta",begin:"@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*"+e.UNDERSCORE_IDENT_RE+")?"},l={className:"meta",begin:"@"+e.UNDERSCORE_IDENT_RE,contains:[{begin:/\(/,end:/\)/,contains:[e.inherit(o,{className:"string"}),"self"]}]},c=ek,u=e.COMMENT("/\\*","\\*/",{contains:[e.C_BLOCK_COMMENT_MODE]}),d={variants:[{className:"type",begin:e.UNDERSCORE_IDENT_RE},{begin:/\(/,end:/\)/,contains:[]}]},p=d;return p.variants[1].contains=[d],d.variants[1].contains=[p],{name:"Kotlin",aliases:["kt","kts"],keywords:t,contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"}]}),e.C_LINE_COMMENT_MODE,u,n,r,s,l,{className:"function",beginKeywords:"fun",end:"[(]|$",returnBegin:!0,excludeEnd:!0,keywords:t,relevance:5,contains:[{begin:e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[e.UNDERSCORE_TITLE_MODE]},{className:"type",begin:/</,end:/>/,keywords:"reified",relevance:0},{className:"params",begin:/\(/,end:/\)/,endsParent:!0,keywords:t,relevance:0,contains:[{begin:/:/,end:/[=,\/]/,endsWithParent:!0,contains:[d,e.C_LINE_COMMENT_MODE,u],relevance:0},e.C_LINE_COMMENT_MODE,u,s,l,o,e.C_NUMBER_MODE]},u]},{begin:[/class|interface|trait/,/\s+/,e.UNDERSCORE_IDENT_RE],beginScope:{3:"title.class"},keywords:"class interface trait",end:/[:\{(]|$/,excludeEnd:!0,illegal:"extends implements",contains:[{beginKeywords:"public protected internal private constructor"},e.UNDERSCORE_TITLE_MODE,{className:"type",begin:/</,end:/>/,excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:/[,:]\s*/,end:/[<\(,){\s]|$/,excludeBegin:!0,returnEnd:!0},s,l]},o,{className:"meta",begin:"^#!/usr/bin/env",end:"$",illegal:`
`},c]}}const nk=e=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),rk=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","optgroup","option","p","picture","q","quote","samp","section","select","source","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],ik=["defs","g","marker","mask","pattern","svg","switch","symbol","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","linearGradient","radialGradient","stop","circle","ellipse","image","line","path","polygon","polyline","rect","text","use","textPath","tspan","foreignObject","clipPath"],ak=[...rk,...ik],ok=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"].sort().reverse(),fg=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"].sort().reverse(),hg=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"].sort().reverse(),sk=["accent-color","align-content","align-items","align-self","alignment-baseline","all","anchor-name","animation","animation-composition","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","cx","cy","direction","display","dominant-baseline","empty-cells","enable-background","field-sizing","fill","fill-opacity","fill-rule","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flood-color","flood-opacity","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","font-smooth","font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","kerning","left","letter-spacing","lighting-color","line-break","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","marker","marker-end","marker-mid","marker-start","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overlay","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","position-anchor","position-visibility","print-color-adjust","quotes","r","resize","rest","rest-after","rest-before","right","rotate","row-gap","ruby-align","ruby-position","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","shape-rendering","speak","speak-as","src","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","text-wrap","text-wrap-mode","text-wrap-style","timeline-scope","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-behavior","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-modify","user-select","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","white-space-collapse","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","x","y","z-index","zoom"].sort().reverse(),lk=fg.concat(hg).sort().reverse();function ck(e){const t=nk(e),n=lk,r="and or not only",i="[\\w-]+",a="("+i+"|@\\{"+i+"\\})",o=[],s=[],l=function(y){return{className:"string",begin:"~?"+y+".*?"+y}},c=function(y,E,N){return{className:y,begin:E,relevance:N}},u={$pattern:/[a-z-]+/,keyword:r,attribute:ok.join(" ")},d={begin:"\\(",end:"\\)",contains:s,keywords:u,relevance:0};s.push(e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,l("'"),l('"'),t.CSS_NUMBER_MODE,{begin:"(url|data-uri)\\(",starts:{className:"string",end:"[\\)\\n]",excludeEnd:!0}},t.HEXCOLOR,d,c("variable","@@?"+i,10),c("variable","@\\{"+i+"\\}"),c("built_in","~?`[^`]*?`"),{className:"attribute",begin:i+"\\s*:",end:":",returnBegin:!0,excludeEnd:!0},t.IMPORTANT,{beginKeywords:"and not"},t.FUNCTION_DISPATCH);const p=s.concat({begin:/\{/,end:/\}/,contains:o}),f={beginKeywords:"when",endsWithParent:!0,contains:[{beginKeywords:"and not"}].concat(s)},v={begin:a+"\\s*:",returnBegin:!0,end:/[;}]/,relevance:0,contains:[{begin:/-(webkit|moz|ms|o)-/},t.CSS_VARIABLE,{className:"attribute",begin:"\\b("+sk.join("|")+")\\b",end:/(?=:)/,starts:{endsWithParent:!0,illegal:"[<=$]",relevance:0,contains:s}}]},x={className:"keyword",begin:"@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",starts:{end:"[;{}]",keywords:u,returnEnd:!0,contains:s,relevance:0}},S={className:"variable",variants:[{begin:"@"+i+"\\s*:",relevance:15},{begin:"@"+i}],starts:{end:"[;}]",returnEnd:!0,contains:p}},h={variants:[{begin:"[\\.#:&\\[>]",end:"[;{}]"},{begin:a,end:/\{/}],returnBegin:!0,returnEnd:!0,illegal:`[<='$"]`,relevance:0,contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,f,c("keyword","all\\b"),c("variable","@\\{"+i+"\\}"),{begin:"\\b("+ak.join("|")+")\\b",className:"selector-tag"},t.CSS_NUMBER_MODE,c("selector-tag",a,0),c("selector-id","#"+a),c("selector-class","\\."+a,0),c("selector-tag","&",0),t.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",begin:":("+fg.join("|")+")"},{className:"selector-pseudo",begin:":(:)?("+hg.join("|")+")"},{begin:/\(/,end:/\)/,relevance:0,contains:p},{begin:"!important"},t.FUNCTION_DISPATCH]},g={begin:i+`:(:)?(${n.join("|")})`,returnBegin:!0,contains:[h]};return o.push(e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,x,S,g,v,h,f,t.FUNCTION_DISPATCH),{name:"Less",case_insensitive:!0,illegal:`[=>'/<($"]`,contains:o}}function uk(e){const t="\\[=*\\[",n="\\]=*\\]",r={begin:t,end:n,contains:["self"]},i=[e.COMMENT("--(?!"+t+")","$"),e.COMMENT("--"+t,n,{contains:[r],relevance:10})];return{name:"Lua",aliases:["pluto"],keywords:{$pattern:e.UNDERSCORE_IDENT_RE,literal:"true false nil",keyword:"and break do else elseif end for goto if in local not or repeat return then until while",built_in:"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"},contains:i.concat([{className:"function",beginKeywords:"function",end:"\\)",contains:[e.inherit(e.TITLE_MODE,{begin:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{className:"params",begin:"\\(",endsWithParent:!0,contains:i}].concat(i)},e.C_NUMBER_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"string",begin:t,end:n,contains:[r],relevance:5}])}}function dk(e){const t={className:"variable",variants:[{begin:"\\$\\("+e.UNDERSCORE_IDENT_RE+"\\)",contains:[e.BACKSLASH_ESCAPE]},{begin:/\$[@%<?\^\+\*]/}]},n={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,t]},r={className:"variable",begin:/\$\([\w-]+\s/,end:/\)/,keywords:{built_in:"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"},contains:[t,n]},i={begin:"^"+e.UNDERSCORE_IDENT_RE+"\\s*(?=[:+?]?=)"},a={className:"meta",begin:/^\.PHONY:/,end:/$/,keywords:{$pattern:/[\.\w]+/,keyword:".PHONY"}},o={className:"section",begin:/^[^\s]+:/,end:/$/,contains:[t]};return{name:"Makefile",aliases:["mk","mak","make"],keywords:{$pattern:/[\w-]+/,keyword:"define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"},contains:[e.HASH_COMMENT_MODE,t,n,r,i,a,o]}}function pk(e){const t=e.regex,n={begin:/<\/?[A-Za-z_]/,end:">",subLanguage:"xml",relevance:0},r={begin:"^[-\\*]{3,}",end:"$"},i={className:"code",variants:[{begin:"(`{3,})[^`](.|\\n)*?\\1`*[ ]*"},{begin:"(~{3,})[^~](.|\\n)*?\\1~*[ ]*"},{begin:"```",end:"```+[ ]*$"},{begin:"~~~",end:"~~~+[ ]*$"},{begin:"`.+?`"},{begin:"(?=^( {4}|\\t))",contains:[{begin:"^( {4}|\\t)",end:"(\\n)$"}],relevance:0}]},a={className:"bullet",begin:"^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",end:"\\s+",excludeEnd:!0},o={begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]},s=/[A-Za-z][A-Za-z0-9+.-]*/,l={variants:[{begin:/\[.+?\]\[.*?\]/,relevance:0},{begin:/\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,relevance:2},{begin:t.concat(/\[.+?\]\(/,s,/:\/\/.*?\)/),relevance:2},{begin:/\[.+?\]\([./?&#].*?\)/,relevance:1},{begin:/\[.*?\]\(.*?\)/,relevance:0}],returnBegin:!0,contains:[{match:/\[(?=\])/},{className:"string",relevance:0,begin:"\\[",end:"\\]",excludeBegin:!0,returnEnd:!0},{className:"link",relevance:0,begin:"\\]\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0},{className:"symbol",relevance:0,begin:"\\]\\[",end:"\\]",excludeBegin:!0,excludeEnd:!0}]},c={className:"strong",contains:[],variants:[{begin:/_{2}(?!\s)/,end:/_{2}/},{begin:/\*{2}(?!\s)/,end:/\*{2}/}]},u={className:"emphasis",contains:[],variants:[{begin:/\*(?![*\s])/,end:/\*/},{begin:/_(?![_\s])/,end:/_/,relevance:0}]},d=e.inherit(c,{contains:[]}),p=e.inherit(u,{contains:[]});c.contains.push(p),u.contains.push(d);let f=[n,l];return[c,u,d,p].forEach(h=>{h.contains=h.contains.concat(f)}),f=f.concat(c,u),{name:"Markdown",aliases:["md","mkdown","mkd"],contains:[{className:"section",variants:[{begin:"^#{1,6}",end:"$",contains:f},{begin:"(?=^.+?\\n[=-]{2,}$)",contains:[{begin:"^[=-]*$"},{begin:"^",end:"\\n",contains:f}]}]},n,a,c,u,{className:"quote",begin:"^>\\s+",contains:f,end:"$"},i,r,l,o,{scope:"literal",match:/&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/}]}}function fk(e){const t={className:"built_in",begin:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},n=/[a-zA-Z@][a-zA-Z0-9_]*/,s={"variable.language":["this","super"],$pattern:n,keyword:["while","export","sizeof","typedef","const","struct","for","union","volatile","static","mutable","if","do","return","goto","enum","else","break","extern","asm","case","default","register","explicit","typename","switch","continue","inline","readonly","assign","readwrite","self","@synchronized","id","typeof","nonatomic","IBOutlet","IBAction","strong","weak","copy","in","out","inout","bycopy","byref","oneway","__strong","__weak","__block","__autoreleasing","@private","@protected","@public","@try","@property","@end","@throw","@catch","@finally","@autoreleasepool","@synthesize","@dynamic","@selector","@optional","@required","@encode","@package","@import","@defs","@compatibility_alias","__bridge","__bridge_transfer","__bridge_retained","__bridge_retain","__covariant","__contravariant","__kindof","_Nonnull","_Nullable","_Null_unspecified","__FUNCTION__","__PRETTY_FUNCTION__","__attribute__","getter","setter","retain","unsafe_unretained","nonnull","nullable","null_unspecified","null_resettable","class","instancetype","NS_DESIGNATED_INITIALIZER","NS_UNAVAILABLE","NS_REQUIRES_SUPER","NS_RETURNS_INNER_POINTER","NS_INLINE","NS_AVAILABLE","NS_DEPRECATED","NS_ENUM","NS_OPTIONS","NS_SWIFT_UNAVAILABLE","NS_ASSUME_NONNULL_BEGIN","NS_ASSUME_NONNULL_END","NS_REFINED_FOR_SWIFT","NS_SWIFT_NAME","NS_SWIFT_NOTHROW","NS_DURING","NS_HANDLER","NS_ENDHANDLER","NS_VALUERETURN","NS_VOIDRETURN"],literal:["false","true","FALSE","TRUE","nil","YES","NO","NULL"],built_in:["dispatch_once_t","dispatch_queue_t","dispatch_sync","dispatch_async","dispatch_once"],type:["int","float","char","unsigned","signed","short","long","double","wchar_t","unichar","void","bool","BOOL","id|0","_Bool"]},l={$pattern:n,keyword:["@interface","@class","@protocol","@implementation"]};return{name:"Objective-C",aliases:["mm","objc","obj-c","obj-c++","objective-c++"],keywords:s,illegal:"</",contains:[t,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.C_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{className:"string",variants:[{begin:'@"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]}]},{className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),{className:"string",begin:/<.*?>/,end:/$/,illegal:"\\n"},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"class",begin:"("+l.keyword.join("|")+")\\b",end:/(\{|$)/,excludeEnd:!0,keywords:l,contains:[e.UNDERSCORE_TITLE_MODE]},{begin:"\\."+e.UNDERSCORE_IDENT_RE,relevance:0}]}}function hk(e){const t=e.regex,n=["abs","accept","alarm","and","atan2","bind","binmode","bless","break","caller","chdir","chmod","chomp","chop","chown","chr","chroot","class","close","closedir","connect","continue","cos","crypt","dbmclose","dbmopen","defined","delete","die","do","dump","each","else","elsif","endgrent","endhostent","endnetent","endprotoent","endpwent","endservent","eof","eval","exec","exists","exit","exp","fcntl","field","fileno","flock","for","foreach","fork","format","formline","getc","getgrent","getgrgid","getgrnam","gethostbyaddr","gethostbyname","gethostent","getlogin","getnetbyaddr","getnetbyname","getnetent","getpeername","getpgrp","getpriority","getprotobyname","getprotobynumber","getprotoent","getpwent","getpwnam","getpwuid","getservbyname","getservbyport","getservent","getsockname","getsockopt","given","glob","gmtime","goto","grep","gt","hex","if","index","int","ioctl","join","keys","kill","last","lc","lcfirst","length","link","listen","local","localtime","log","lstat","lt","ma","map","method","mkdir","msgctl","msgget","msgrcv","msgsnd","my","ne","next","no","not","oct","open","opendir","or","ord","our","pack","package","pipe","pop","pos","print","printf","prototype","push","q|0","qq","quotemeta","qw","qx","rand","read","readdir","readline","readlink","readpipe","recv","redo","ref","rename","require","reset","return","reverse","rewinddir","rindex","rmdir","say","scalar","seek","seekdir","select","semctl","semget","semop","send","setgrent","sethostent","setnetent","setpgrp","setpriority","setprotoent","setpwent","setservent","setsockopt","shift","shmctl","shmget","shmread","shmwrite","shutdown","sin","sleep","socket","socketpair","sort","splice","split","sprintf","sqrt","srand","stat","state","study","sub","substr","symlink","syscall","sysopen","sysread","sysseek","system","syswrite","tell","telldir","tie","tied","time","times","tr","truncate","uc","ucfirst","umask","undef","unless","unlink","unpack","unshift","untie","until","use","utime","values","vec","wait","waitpid","wantarray","warn","when","while","write","x|0","xor","y|0"],r=/[dualxmsipngr]{0,12}/,i={$pattern:/[\w.]+/,keyword:n.join(" ")},a={className:"subst",begin:"[$@]\\{",end:"\\}",keywords:i},o={begin:/->\{/,end:/\}/},s={scope:"attr",match:/\s+:\s*\w+(\s*\(.*?\))?/},l={scope:"variable",variants:[{begin:/\$\d/},{begin:t.concat(/[$%@](?!")(\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,"(?![A-Za-z])(?![@$%])")},{begin:/[$%@](?!")[^\s\w{=]|\$=/,relevance:0}],contains:[s]},c={className:"number",variants:[{match:/0?\.[0-9][0-9_]+\b/},{match:/\bv?(0|[1-9][0-9_]*(\.[0-9_]+)?|[1-9][0-9_]*)\b/},{match:/\b0[0-7][0-7_]*\b/},{match:/\b0x[0-9a-fA-F][0-9a-fA-F_]*\b/},{match:/\b0b[0-1][0-1_]*\b/}],relevance:0},u=[e.BACKSLASH_ESCAPE,a,l],d=[/!/,/\//,/\|/,/\?/,/'/,/"/,/#/],p=(x,S,h="\\1")=>{const g=h==="\\1"?h:t.concat(h,S);return t.concat(t.concat("(?:",x,")"),S,/(?:\\.|[^\\\/])*?/,g,/(?:\\.|[^\\\/])*?/,h,r)},f=(x,S,h)=>t.concat(t.concat("(?:",x,")"),S,/(?:\\.|[^\\\/])*?/,h,r),v=[l,e.HASH_COMMENT_MODE,e.COMMENT(/^=\w/,/=cut/,{endsWithParent:!0}),o,{className:"string",contains:u,variants:[{begin:"q[qwxr]?\\s*\\(",end:"\\)",relevance:5},{begin:"q[qwxr]?\\s*\\[",end:"\\]",relevance:5},{begin:"q[qwxr]?\\s*\\{",end:"\\}",relevance:5},{begin:"q[qwxr]?\\s*\\|",end:"\\|",relevance:5},{begin:"q[qwxr]?\\s*<",end:">",relevance:5},{begin:"qw\\s+q",end:"q",relevance:5},{begin:"'",end:"'",contains:[e.BACKSLASH_ESCAPE]},{begin:'"',end:'"'},{begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE]},{begin:/\{\w+\}/,relevance:0},{begin:"-?\\w+\\s*=>",relevance:0}]},c,{begin:"(\\/\\/|"+e.RE_STARTERS_RE+"|\\b(split|return|print|reverse|grep)\\b)\\s*",keywords:"split return print reverse grep",relevance:0,contains:[e.HASH_COMMENT_MODE,{className:"regexp",variants:[{begin:p("s|tr|y",t.either(...d,{capture:!0}))},{begin:p("s|tr|y","\\(","\\)")},{begin:p("s|tr|y","\\[","\\]")},{begin:p("s|tr|y","\\{","\\}")}],relevance:2},{className:"regexp",variants:[{begin:/(m|qr)\/\//,relevance:0},{begin:f("(?:m|qr)?",/\//,/\//)},{begin:f("m|qr",t.either(...d,{capture:!0}),/\1/)},{begin:f("m|qr",/\(/,/\)/)},{begin:f("m|qr",/\[/,/\]/)},{begin:f("m|qr",/\{/,/\}/)}]}]},{className:"function",beginKeywords:"sub method",end:"(\\s*\\(.*?\\))?[;{]",excludeEnd:!0,relevance:5,contains:[e.TITLE_MODE,s]},{className:"class",beginKeywords:"class",end:"[;{]",excludeEnd:!0,relevance:5,contains:[e.TITLE_MODE,s,c]},{begin:"-\\w\\b",relevance:0},{begin:"^__DATA__$",end:"^__END__$",subLanguage:"mojolicious",contains:[{begin:"^@@.*",end:"$",className:"comment"}]}];return a.contains=v,o.contains=v,{name:"Perl",aliases:["pl","pm"],keywords:i,contains:v}}function mk(e){const t=e.regex,n=/(?![A-Za-z0-9])(?![$])/,r=t.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,n),i=t.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,n),a=t.concat(/[A-Z]+/,n),o={scope:"variable",match:"\\$+"+r},s={scope:"meta",variants:[{begin:/<\?php/,relevance:10},{begin:/<\?=/},{begin:/<\?/,relevance:.1},{begin:/\?>/}]},l={scope:"subst",variants:[{begin:/\$\w+/},{begin:/\{\$/,end:/\}/}]},c=e.inherit(e.APOS_STRING_MODE,{illegal:null}),u=e.inherit(e.QUOTE_STRING_MODE,{illegal:null,contains:e.QUOTE_STRING_MODE.contains.concat(l)}),d={begin:/<<<[ \t]*(?:(\w+)|"(\w+)")\n/,end:/[ \t]*(\w+)\b/,contains:e.QUOTE_STRING_MODE.contains.concat(l),"on:begin":(V,L)=>{L.data._beginMatch=V[1]||V[2]},"on:end":(V,L)=>{L.data._beginMatch!==V[1]&&L.ignoreMatch()}},p=e.END_SAME_AS_BEGIN({begin:/<<<[ \t]*'(\w+)'\n/,end:/[ \t]*(\w+)\b/}),f=`[ 	
]`,v={scope:"string",variants:[u,c,d,p]},x={scope:"number",variants:[{begin:"\\b0[bB][01]+(?:_[01]+)*\\b"},{begin:"\\b0[oO][0-7]+(?:_[0-7]+)*\\b"},{begin:"\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"},{begin:"(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"}],relevance:0},S=["false","null","true"],h=["__CLASS__","__DIR__","__FILE__","__FUNCTION__","__COMPILER_HALT_OFFSET__","__LINE__","__METHOD__","__NAMESPACE__","__TRAIT__","die","echo","exit","include","include_once","print","require","require_once","array","abstract","and","as","binary","bool","boolean","break","callable","case","catch","class","clone","const","continue","declare","default","do","double","else","elseif","empty","enddeclare","endfor","endforeach","endif","endswitch","endwhile","enum","eval","extends","final","finally","float","for","foreach","from","global","goto","if","implements","instanceof","insteadof","int","integer","interface","isset","iterable","list","match|0","mixed","new","never","object","or","private","protected","public","readonly","real","return","string","switch","throw","trait","try","unset","use","var","void","while","xor","yield"],g=["Error|0","AppendIterator","ArgumentCountError","ArithmeticError","ArrayIterator","ArrayObject","AssertionError","BadFunctionCallException","BadMethodCallException","CachingIterator","CallbackFilterIterator","CompileError","Countable","DirectoryIterator","DivisionByZeroError","DomainException","EmptyIterator","ErrorException","Exception","FilesystemIterator","FilterIterator","GlobIterator","InfiniteIterator","InvalidArgumentException","IteratorIterator","LengthException","LimitIterator","LogicException","MultipleIterator","NoRewindIterator","OutOfBoundsException","OutOfRangeException","OuterIterator","OverflowException","ParentIterator","ParseError","RangeException","RecursiveArrayIterator","RecursiveCachingIterator","RecursiveCallbackFilterIterator","RecursiveDirectoryIterator","RecursiveFilterIterator","RecursiveIterator","RecursiveIteratorIterator","RecursiveRegexIterator","RecursiveTreeIterator","RegexIterator","RuntimeException","SeekableIterator","SplDoublyLinkedList","SplFileInfo","SplFileObject","SplFixedArray","SplHeap","SplMaxHeap","SplMinHeap","SplObjectStorage","SplObserver","SplPriorityQueue","SplQueue","SplStack","SplSubject","SplTempFileObject","TypeError","UnderflowException","UnexpectedValueException","UnhandledMatchError","ArrayAccess","BackedEnum","Closure","Fiber","Generator","Iterator","IteratorAggregate","Serializable","Stringable","Throwable","Traversable","UnitEnum","WeakReference","WeakMap","Directory","__PHP_Incomplete_Class","parent","php_user_filter","self","static","stdClass"],E={keyword:h,literal:(V=>{const L=[];return V.forEach(T=>{L.push(T),T.toLowerCase()===T?L.push(T.toUpperCase()):L.push(T.toLowerCase())}),L})(S),built_in:g},N=V=>V.map(L=>L.replace(/\|\d+$/,"")),w={variants:[{match:[/new/,t.concat(f,"+"),t.concat("(?!",N(g).join("\\b|"),"\\b)"),i],scope:{1:"keyword",4:"title.class"}}]},A=t.concat(r,"\\b(?!\\()"),I={variants:[{match:[t.concat(/::/,t.lookahead(/(?!class\b)/)),A],scope:{2:"variable.constant"}},{match:[/::/,/class/],scope:{2:"variable.language"}},{match:[i,t.concat(/::/,t.lookahead(/(?!class\b)/)),A],scope:{1:"title.class",3:"variable.constant"}},{match:[i,t.concat("::",t.lookahead(/(?!class\b)/))],scope:{1:"title.class"}},{match:[i,/::/,/class/],scope:{1:"title.class",3:"variable.language"}}]},U={scope:"attr",match:t.concat(r,t.lookahead(":"),t.lookahead(/(?!::)/))},M={relevance:0,begin:/\(/,end:/\)/,keywords:E,contains:[U,o,I,e.C_BLOCK_COMMENT_MODE,v,x,w]},$={relevance:0,match:[/\b/,t.concat("(?!fn\\b|function\\b|",N(h).join("\\b|"),"|",N(g).join("\\b|"),"\\b)"),r,t.concat(f,"*"),t.lookahead(/(?=\()/)],scope:{3:"title.function.invoke"},contains:[M]};M.contains.push($);const W=[U,I,e.C_BLOCK_COMMENT_MODE,v,x,w],Y={begin:t.concat(/#\[\s*\\?/,t.either(i,a)),beginScope:"meta",end:/]/,endScope:"meta",keywords:{literal:S,keyword:["new","array"]},contains:[{begin:/\[/,end:/]/,keywords:{literal:S,keyword:["new","array"]},contains:["self",...W]},...W,{scope:"meta",variants:[{match:i},{match:a}]}]};return{case_insensitive:!1,keywords:E,contains:[Y,e.HASH_COMMENT_MODE,e.COMMENT("//","$"),e.COMMENT("/\\*","\\*/",{contains:[{scope:"doctag",match:"@[A-Za-z]+"}]}),{match:/__halt_compiler\(\);/,keywords:"__halt_compiler",starts:{scope:"comment",end:e.MATCH_NOTHING_RE,contains:[{match:/\?>/,scope:"meta",endsParent:!0}]}},s,{scope:"variable.language",match:/\$this\b/},o,$,I,{match:[/const/,/\s/,r],scope:{1:"keyword",3:"variable.constant"}},w,{scope:"function",relevance:0,beginKeywords:"fn function",end:/[;{]/,excludeEnd:!0,illegal:"[$%\\[]",contains:[{beginKeywords:"use"},e.UNDERSCORE_TITLE_MODE,{begin:"=>",endsParent:!0},{scope:"params",begin:"\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0,keywords:E,contains:["self",Y,o,I,e.C_BLOCK_COMMENT_MODE,v,x]}]},{scope:"class",variants:[{beginKeywords:"enum",illegal:/[($"]/},{beginKeywords:"class interface trait",illegal:/[:($"]/}],relevance:0,end:/\{/,excludeEnd:!0,contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"namespace",relevance:0,end:";",illegal:/[.']/,contains:[e.inherit(e.UNDERSCORE_TITLE_MODE,{scope:"title.class"})]},{beginKeywords:"use",relevance:0,end:";",contains:[{match:/\b(as|const|function)\b/,scope:"keyword"},e.UNDERSCORE_TITLE_MODE]},v,x]}}function gk(e){return{name:"PHP template",subLanguage:"xml",contains:[{begin:/<\?(php|=)?/,end:/\?>/,subLanguage:"php",contains:[{begin:"/\\*",end:"\\*/",skip:!0},{begin:'b"',end:'"',skip:!0},{begin:"b'",end:"'",skip:!0},e.inherit(e.APOS_STRING_MODE,{illegal:null,className:null,contains:null,skip:!0}),e.inherit(e.QUOTE_STRING_MODE,{illegal:null,className:null,contains:null,skip:!0})]}]}}function yk(e){return{name:"Plain text",aliases:["text","txt"],disableAutodetect:!0}}function bk(e){const t=e.regex,n=new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*","u"),r=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],s={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:r,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},l={className:"meta",begin:/^(>>>|\.\.\.) /},c={className:"subst",begin:/\{/,end:/\}/,keywords:s,illegal:/#/},u={begin:/\{\{/,relevance:0},d={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,l,u,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,l,u,c]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,u,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,u,c]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},p="[0-9](_?[0-9])*",f=`(\\b(${p}))?\\.(${p})|\\b(${p})\\.`,v=`\\b|${r.join("|")}`,x={className:"number",relevance:0,variants:[{begin:`(\\b(${p})|(${f}))[eE][+-]?(${p})[jJ]?(?=${v})`},{begin:`(${f})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${v})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${v})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${v})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${v})`},{begin:`\\b(${p})[jJ](?=${v})`}]},S={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:s,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},h={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:["self",l,x,d,e.HASH_COMMENT_MODE]}]};return c.contains=[d,x,l],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:s,illegal:/(<\/|\?)|=>/,contains:[l,x,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},d,S,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,n],scope:{1:"keyword",3:"title.function"},contains:[h]},{variants:[{match:[/\bclass/,/\s+/,n,/\s*/,/\(\s*/,n,/\s*\)/]},{match:[/\bclass/,/\s+/,n]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[x,h,d]}]}}function vk(e){return{aliases:["pycon"],contains:[{className:"meta.prompt",starts:{end:/ |$/,starts:{end:"$",subLanguage:"python"}},variants:[{begin:/^>>>(?=[ ]|$)/},{begin:/^\.\.\.(?=[ ]|$)/}]}]}}function xk(e){const t=e.regex,n=/(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/,r=t.either(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,/0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,/(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/),i=/[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/,a=t.either(/[()]/,/[{}]/,/\[\[/,/[[\]]/,/\\/,/,/);return{name:"R",keywords:{$pattern:n,keyword:"function if in break next repeat else for while",literal:"NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",built_in:"LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"},contains:[e.COMMENT(/#'/,/$/,{contains:[{scope:"doctag",match:/@examples/,starts:{end:t.lookahead(t.either(/\n^#'\s*(?=@[a-zA-Z]+)/,/\n^(?!#')/)),endsParent:!0}},{scope:"doctag",begin:"@param",end:/$/,contains:[{scope:"variable",variants:[{match:n},{match:/`(?:\\.|[^`\\])+`/}],endsParent:!0}]},{scope:"doctag",match:/@[a-zA-Z]+/},{scope:"keyword",match:/\\[a-zA-Z]+/}]}),e.HASH_COMMENT_MODE,{scope:"string",contains:[e.BACKSLASH_ESCAPE],variants:[e.END_SAME_AS_BEGIN({begin:/[rR]"(-*)\(/,end:/\)(-*)"/}),e.END_SAME_AS_BEGIN({begin:/[rR]"(-*)\{/,end:/\}(-*)"/}),e.END_SAME_AS_BEGIN({begin:/[rR]"(-*)\[/,end:/\](-*)"/}),e.END_SAME_AS_BEGIN({begin:/[rR]'(-*)\(/,end:/\)(-*)'/}),e.END_SAME_AS_BEGIN({begin:/[rR]'(-*)\{/,end:/\}(-*)'/}),e.END_SAME_AS_BEGIN({begin:/[rR]'(-*)\[/,end:/\](-*)'/}),{begin:'"',end:'"',relevance:0},{begin:"'",end:"'",relevance:0}]},{relevance:0,variants:[{scope:{1:"operator",2:"number"},match:[i,r]},{scope:{1:"operator",2:"number"},match:[/%[^%]*%/,r]},{scope:{1:"punctuation",2:"number"},match:[a,r]},{scope:{2:"number"},match:[/[^a-zA-Z0-9._]|^/,r]}]},{scope:{3:"operator"},match:[n,/\s+/,/<-/,/\s+/]},{scope:"operator",relevance:0,variants:[{match:i},{match:/%[^%]*%/}]},{scope:"punctuation",relevance:0,match:a},{begin:"`",end:"`",contains:[{begin:/\\./}]}]}}function _k(e){const t=e.regex,n="([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",r=t.either(/\b([A-Z]+[a-z0-9]+)+/,/\b([A-Z]+[a-z0-9]+)+[A-Z]+/),i=t.concat(r,/(::\w+)*/),o={"variable.constant":["__FILE__","__LINE__","__ENCODING__"],"variable.language":["self","super"],keyword:["alias","and","begin","BEGIN","break","case","class","defined","do","else","elsif","end","END","ensure","for","if","in","module","next","not","or","redo","require","rescue","retry","return","then","undef","unless","until","when","while","yield",...["include","extend","prepend","public","private","protected","raise","throw"]],built_in:["proc","lambda","attr_accessor","attr_reader","attr_writer","define_method","private_constant","module_function"],literal:["true","false","nil"]},s={className:"doctag",begin:"@[A-Za-z]+"},l={begin:"#<",end:">"},c=[e.COMMENT("#","$",{contains:[s]}),e.COMMENT("^=begin","^=end",{contains:[s],relevance:10}),e.COMMENT("^__END__",e.MATCH_NOTHING_RE)],u={className:"subst",begin:/#\{/,end:/\}/,keywords:o},d={className:"string",contains:[e.BACKSLASH_ESCAPE,u],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{begin:/%[qQwWx]?\(/,end:/\)/},{begin:/%[qQwWx]?\[/,end:/\]/},{begin:/%[qQwWx]?\{/,end:/\}/},{begin:/%[qQwWx]?</,end:/>/},{begin:/%[qQwWx]?\//,end:/\//},{begin:/%[qQwWx]?%/,end:/%/},{begin:/%[qQwWx]?-/,end:/-/},{begin:/%[qQwWx]?\|/,end:/\|/},{begin:/\B\?(\\\d{1,3})/},{begin:/\B\?(\\x[A-Fa-f0-9]{1,2})/},{begin:/\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/},{begin:/\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/},{begin:/\B\?\\(c|C-)[\x20-\x7e]/},{begin:/\B\?\\?\S/},{begin:t.concat(/<<[-~]?'?/,t.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,contains:[e.BACKSLASH_ESCAPE,u]})]}]},p="[1-9](_?[0-9])*|0",f="[0-9](_?[0-9])*",v={className:"number",relevance:0,variants:[{begin:`\\b(${p})(\\.(${f}))?([eE][+-]?(${f})|r)?i?\\b`},{begin:"\\b0[dD][0-9](_?[0-9])*r?i?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*r?i?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*r?i?\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"},{begin:"\\b0(_?[0-7])+r?i?\\b"}]},x={variants:[{match:/\(\)/},{className:"params",begin:/\(/,end:/(?=\))/,excludeBegin:!0,endsParent:!0,keywords:o}]},w=[d,{variants:[{match:[/class\s+/,i,/\s+<\s+/,i]},{match:[/\b(class|module)\s+/,i]}],scope:{2:"title.class",4:"title.class.inherited"},keywords:o},{match:[/(include|extend)\s+/,i],scope:{2:"title.class"},keywords:o},{relevance:0,match:[i,/\.new[. (]/],scope:{1:"title.class"}},{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},{relevance:0,match:r,scope:"title.class"},{match:[/def/,/\s+/,n],scope:{1:"keyword",3:"title.function"},contains:[x]},{begin:e.IDENT_RE+"::"},{className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"(!|\\?)?:",relevance:0},{className:"symbol",begin:":(?!\\s)",contains:[d,{begin:n}],relevance:0},v,{className:"variable",begin:"(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"},{className:"params",begin:/\|(?!=)/,end:/\|/,excludeBegin:!0,excludeEnd:!0,relevance:0,keywords:o},{begin:"("+e.RE_STARTERS_RE+"|unless)\\s*",keywords:"unless",contains:[{className:"regexp",contains:[e.BACKSLASH_ESCAPE,u],illegal:/\n/,variants:[{begin:"/",end:"/[a-z]*"},{begin:/%r\{/,end:/\}[a-z]*/},{begin:"%r\\(",end:"\\)[a-z]*"},{begin:"%r!",end:"![a-z]*"},{begin:"%r\\[",end:"\\][a-z]*"}]}].concat(l,c),relevance:0}].concat(l,c);u.contains=w,x.contains=w;const M=[{begin:/^\s*=>/,starts:{end:"$",contains:w}},{className:"meta.prompt",begin:"^("+"[>?]>"+"|"+"[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]"+"|"+"(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>"+")(?=[ ])",starts:{end:"$",keywords:o,contains:w}}];return c.unshift(l),{name:"Ruby",aliases:["rb","gemspec","podspec","thor","irb"],keywords:o,illegal:/\/\*/,contains:[e.SHEBANG({binary:"ruby"})].concat(M).concat(c).concat(w)}}function wk(e){const t=e.regex,n=/(r#)?/,r=t.concat(n,e.UNDERSCORE_IDENT_RE),i=t.concat(n,e.IDENT_RE),a={className:"title.function.invoke",relevance:0,begin:t.concat(/\b/,/(?!let|for|while|if|else|match\b)/,i,t.lookahead(/\s*\(/))},o="([ui](8|16|32|64|128|size)|f(32|64))?",s=["abstract","as","async","await","become","box","break","const","continue","crate","do","dyn","else","enum","extern","false","final","fn","for","if","impl","in","let","loop","macro","match","mod","move","mut","override","priv","pub","ref","return","self","Self","static","struct","super","trait","true","try","type","typeof","union","unsafe","unsized","use","virtual","where","while","yield"],l=["true","false","Some","None","Ok","Err"],c=["drop ","Copy","Send","Sized","Sync","Drop","Fn","FnMut","FnOnce","ToOwned","Clone","Debug","PartialEq","PartialOrd","Eq","Ord","AsRef","AsMut","Into","From","Default","Iterator","Extend","IntoIterator","DoubleEndedIterator","ExactSizeIterator","SliceConcatExt","ToString","assert!","assert_eq!","bitflags!","bytes!","cfg!","col!","concat!","concat_idents!","debug_assert!","debug_assert_eq!","env!","eprintln!","panic!","file!","format!","format_args!","include_bytes!","include_str!","line!","local_data_key!","module_path!","option_env!","print!","println!","select!","stringify!","try!","unimplemented!","unreachable!","vec!","write!","writeln!","macro_rules!","assert_ne!","debug_assert_ne!"],u=["i8","i16","i32","i64","i128","isize","u8","u16","u32","u64","u128","usize","f32","f64","str","char","bool","Box","Option","Result","String","Vec"];return{name:"Rust",aliases:["rs"],keywords:{$pattern:e.IDENT_RE+"!?",type:u,keyword:s,literal:l,built_in:c},illegal:"</",contains:[e.C_LINE_COMMENT_MODE,e.COMMENT("/\\*","\\*/",{contains:["self"]}),e.inherit(e.QUOTE_STRING_MODE,{begin:/b?"/,illegal:null}),{className:"symbol",begin:/'[a-zA-Z_][a-zA-Z0-9_]*(?!')/},{scope:"string",variants:[{begin:/b?r(#*)"(.|\n)*?"\1(?!#)/},{begin:/b?'/,end:/'/,contains:[{scope:"char.escape",match:/\\('|\w|x\w{2}|u\w{4}|U\w{8})/}]}]},{className:"number",variants:[{begin:"\\b0b([01_]+)"+o},{begin:"\\b0o([0-7_]+)"+o},{begin:"\\b0x([A-Fa-f0-9_]+)"+o},{begin:"\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)"+o}],relevance:0},{begin:[/fn/,/\s+/,r],className:{1:"keyword",3:"title.function"}},{className:"meta",begin:"#!?\\[",end:"\\]",contains:[{className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE]}]},{begin:[/let/,/\s+/,/(?:mut\s+)?/,r],className:{1:"keyword",3:"keyword",4:"variable"}},{begin:[/for/,/\s+/,r,/\s+/,/in/],className:{1:"keyword",3:"variable",5:"keyword"}},{begin:[/type/,/\s+/,r],className:{1:"keyword",3:"title.class"}},{begin:[/(?:trait|enum|struct|union|impl|for)/,/\s+/,r],className:{1:"keyword",3:"title.class"}},{begin:e.IDENT_RE+"::",keywords:{keyword:"Self",built_in:c,type:u}},{className:"punctuation",begin:"->"},a]}}const Ek=e=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),kk=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","optgroup","option","p","picture","q","quote","samp","section","select","source","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],Sk=["defs","g","marker","mask","pattern","svg","switch","symbol","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","linearGradient","radialGradient","stop","circle","ellipse","image","line","path","polygon","polyline","rect","text","use","textPath","tspan","foreignObject","clipPath"],Nk=[...kk,...Sk],Tk=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"].sort().reverse(),Ok=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"].sort().reverse(),Ck=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"].sort().reverse(),Ak=["accent-color","align-content","align-items","align-self","alignment-baseline","all","anchor-name","animation","animation-composition","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","cx","cy","direction","display","dominant-baseline","empty-cells","enable-background","field-sizing","fill","fill-opacity","fill-rule","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flood-color","flood-opacity","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","font-smooth","font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","kerning","left","letter-spacing","lighting-color","line-break","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","marker","marker-end","marker-mid","marker-start","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overlay","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","position-anchor","position-visibility","print-color-adjust","quotes","r","resize","rest","rest-after","rest-before","right","rotate","row-gap","ruby-align","ruby-position","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","shape-rendering","speak","speak-as","src","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","text-wrap","text-wrap-mode","text-wrap-style","timeline-scope","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-behavior","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-modify","user-select","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","white-space-collapse","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","x","y","z-index","zoom"].sort().reverse();function Rk(e){const t=Ek(e),n=Ck,r=Ok,i="@[a-z-]+",a="and or not only",s={className:"variable",begin:"(\\$"+"[a-zA-Z-][a-zA-Z0-9_-]*"+")\\b",relevance:0};return{name:"SCSS",case_insensitive:!0,illegal:"[=/|']",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,t.CSS_NUMBER_MODE,{className:"selector-id",begin:"#[A-Za-z0-9_-]+",relevance:0},{className:"selector-class",begin:"\\.[A-Za-z0-9_-]+",relevance:0},t.ATTRIBUTE_SELECTOR_MODE,{className:"selector-tag",begin:"\\b("+Nk.join("|")+")\\b",relevance:0},{className:"selector-pseudo",begin:":("+r.join("|")+")"},{className:"selector-pseudo",begin:":(:)?("+n.join("|")+")"},s,{begin:/\(/,end:/\)/,contains:[t.CSS_NUMBER_MODE]},t.CSS_VARIABLE,{className:"attribute",begin:"\\b("+Ak.join("|")+")\\b"},{begin:"\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"},{begin:/:/,end:/[;}{]/,relevance:0,contains:[t.BLOCK_COMMENT,s,t.HEXCOLOR,t.CSS_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,t.IMPORTANT,t.FUNCTION_DISPATCH]},{begin:"@(page|font-face)",keywords:{$pattern:i,keyword:"@page @font-face"}},{begin:"@",end:"[{;]",returnBegin:!0,keywords:{$pattern:/[a-z-]+/,keyword:a,attribute:Tk.join(" ")},contains:[{begin:i,className:"keyword"},{begin:/[a-z-]+(?=:)/,className:"attribute"},s,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,t.HEXCOLOR,t.CSS_NUMBER_MODE]},t.FUNCTION_DISPATCH]}}function Ik(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}function Mk(e){const t=e.regex,n=e.COMMENT("--","$"),r={scope:"string",variants:[{begin:/'/,end:/'/,contains:[{match:/''/}]}]},i={begin:/"/,end:/"/,contains:[{match:/""/}]},a=["true","false","unknown"],o=["double precision","large object","with timezone","without timezone"],s=["bigint","binary","blob","boolean","char","character","clob","date","dec","decfloat","decimal","float","int","integer","interval","nchar","nclob","national","numeric","real","row","smallint","time","timestamp","varchar","varying","varbinary"],l=["add","asc","collation","desc","final","first","last","view"],c=["abs","acos","all","allocate","alter","and","any","are","array","array_agg","array_max_cardinality","as","asensitive","asin","asymmetric","at","atan","atomic","authorization","avg","begin","begin_frame","begin_partition","between","bigint","binary","blob","boolean","both","by","call","called","cardinality","cascaded","case","cast","ceil","ceiling","char","char_length","character","character_length","check","classifier","clob","close","coalesce","collate","collect","column","commit","condition","connect","constraint","contains","convert","copy","corr","corresponding","cos","cosh","count","covar_pop","covar_samp","create","cross","cube","cume_dist","current","current_catalog","current_date","current_default_transform_group","current_path","current_role","current_row","current_schema","current_time","current_timestamp","current_path","current_role","current_transform_group_for_type","current_user","cursor","cycle","date","day","deallocate","dec","decimal","decfloat","declare","default","define","delete","dense_rank","deref","describe","deterministic","disconnect","distinct","double","drop","dynamic","each","element","else","empty","end","end_frame","end_partition","end-exec","equals","escape","every","except","exec","execute","exists","exp","external","extract","false","fetch","filter","first_value","float","floor","for","foreign","frame_row","free","from","full","function","fusion","get","global","grant","group","grouping","groups","having","hold","hour","identity","in","indicator","initial","inner","inout","insensitive","insert","int","integer","intersect","intersection","interval","into","is","join","json_array","json_arrayagg","json_exists","json_object","json_objectagg","json_query","json_table","json_table_primitive","json_value","lag","language","large","last_value","lateral","lead","leading","left","like","like_regex","listagg","ln","local","localtime","localtimestamp","log","log10","lower","match","match_number","match_recognize","matches","max","member","merge","method","min","minute","mod","modifies","module","month","multiset","national","natural","nchar","nclob","new","no","none","normalize","not","nth_value","ntile","null","nullif","numeric","octet_length","occurrences_regex","of","offset","old","omit","on","one","only","open","or","order","out","outer","over","overlaps","overlay","parameter","partition","pattern","per","percent","percent_rank","percentile_cont","percentile_disc","period","portion","position","position_regex","power","precedes","precision","prepare","primary","procedure","ptf","range","rank","reads","real","recursive","ref","references","referencing","regr_avgx","regr_avgy","regr_count","regr_intercept","regr_r2","regr_slope","regr_sxx","regr_sxy","regr_syy","release","result","return","returns","revoke","right","rollback","rollup","row","row_number","rows","running","savepoint","scope","scroll","search","second","seek","select","sensitive","session_user","set","show","similar","sin","sinh","skip","smallint","some","specific","specifictype","sql","sqlexception","sqlstate","sqlwarning","sqrt","start","static","stddev_pop","stddev_samp","submultiset","subset","substring","substring_regex","succeeds","sum","symmetric","system","system_time","system_user","table","tablesample","tan","tanh","then","time","timestamp","timezone_hour","timezone_minute","to","trailing","translate","translate_regex","translation","treat","trigger","trim","trim_array","true","truncate","uescape","union","unique","unknown","unnest","update","upper","user","using","value","values","value_of","var_pop","var_samp","varbinary","varchar","varying","versioning","when","whenever","where","width_bucket","window","with","within","without","year"],u=["abs","acos","array_agg","asin","atan","avg","cast","ceil","ceiling","coalesce","corr","cos","cosh","count","covar_pop","covar_samp","cume_dist","dense_rank","deref","element","exp","extract","first_value","floor","json_array","json_arrayagg","json_exists","json_object","json_objectagg","json_query","json_table","json_table_primitive","json_value","lag","last_value","lead","listagg","ln","log","log10","lower","max","min","mod","nth_value","ntile","nullif","percent_rank","percentile_cont","percentile_disc","position","position_regex","power","rank","regr_avgx","regr_avgy","regr_count","regr_intercept","regr_r2","regr_slope","regr_sxx","regr_sxy","regr_syy","row_number","sin","sinh","sqrt","stddev_pop","stddev_samp","substring","substring_regex","sum","tan","tanh","translate","translate_regex","treat","trim","trim_array","unnest","upper","value_of","var_pop","var_samp","width_bucket"],d=["current_catalog","current_date","current_default_transform_group","current_path","current_role","current_schema","current_transform_group_for_type","current_user","session_user","system_time","system_user","current_time","localtime","current_timestamp","localtimestamp"],p=["create table","insert into","primary key","foreign key","not null","alter table","add constraint","grouping sets","on overflow","character set","respect nulls","ignore nulls","nulls first","nulls last","depth first","breadth first"],f=u,v=[...c,...l].filter(N=>!u.includes(N)),x={scope:"variable",match:/@[a-z0-9][a-z0-9_]*/},S={scope:"operator",match:/[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,relevance:0},h={match:t.concat(/\b/,t.either(...f),/\s*\(/),relevance:0,keywords:{built_in:f}};function g(N){return t.concat(/\b/,t.either(...N.map(w=>w.replace(/\s+/,"\\s+"))),/\b/)}const y={scope:"keyword",match:g(p),relevance:0};function E(N,{exceptions:w,when:A}={}){const I=A;return w=w||[],N.map(U=>U.match(/\|\d+$/)||w.includes(U)?U:I(U)?`${U}|0`:U)}return{name:"SQL",case_insensitive:!0,illegal:/[{}]|<\//,keywords:{$pattern:/\b[\w\.]+/,keyword:E(v,{when:N=>N.length<3}),literal:a,type:s,built_in:d},contains:[{scope:"type",match:g(o)},y,h,x,r,i,e.C_NUMBER_MODE,e.C_BLOCK_COMMENT_MODE,n,S]}}function mg(e){return e?typeof e=="string"?e:e.source:null}function ni(e){return le("(?=",e,")")}function le(...e){return e.map(n=>mg(n)).join("")}function Pk(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ue(...e){return"("+(Pk(e).capture?"":"?:")+e.map(r=>mg(r)).join("|")+")"}const uu=e=>le(/\b/,e,/\w$/.test(e)?/\b/:/\B/),Lk=["Protocol","Type"].map(uu),Rp=["init","self"].map(uu),Dk=["Any","Self"],Ms=["actor","any","associatedtype","async","await",/as\?/,/as!/,"as","borrowing","break","case","catch","class","consume","consuming","continue","convenience","copy","default","defer","deinit","didSet","distributed","do","dynamic","each","else","enum","extension","fallthrough",/fileprivate\(set\)/,"fileprivate","final","for","func","get","guard","if","import","indirect","infix",/init\?/,/init!/,"inout",/internal\(set\)/,"internal","in","is","isolated","nonisolated","lazy","let","macro","mutating","nonmutating",/open\(set\)/,"open","operator","optional","override","package","postfix","precedencegroup","prefix",/private\(set\)/,"private","protocol",/public\(set\)/,"public","repeat","required","rethrows","return","set","some","static","struct","subscript","super","switch","throws","throw",/try\?/,/try!/,"try","typealias",/unowned\(safe\)/,/unowned\(unsafe\)/,"unowned","var","weak","where","while","willSet"],Ip=["false","nil","true"],Fk=["assignment","associativity","higherThan","left","lowerThan","none","right"],Bk=["#colorLiteral","#column","#dsohandle","#else","#elseif","#endif","#error","#file","#fileID","#fileLiteral","#filePath","#function","#if","#imageLiteral","#keyPath","#line","#selector","#sourceLocation","#warning"],Mp=["abs","all","any","assert","assertionFailure","debugPrint","dump","fatalError","getVaList","isKnownUniquelyReferenced","max","min","numericCast","pointwiseMax","pointwiseMin","precondition","preconditionFailure","print","readLine","repeatElement","sequence","stride","swap","swift_unboxFromSwiftValueWithType","transcode","type","unsafeBitCast","unsafeDowncast","withExtendedLifetime","withUnsafeMutablePointer","withUnsafePointer","withVaList","withoutActuallyEscaping","zip"],gg=Ue(/[/=\-+!*%<>&|^~?]/,/[\u00A1-\u00A7]/,/[\u00A9\u00AB]/,/[\u00AC\u00AE]/,/[\u00B0\u00B1]/,/[\u00B6\u00BB\u00BF\u00D7\u00F7]/,/[\u2016-\u2017]/,/[\u2020-\u2027]/,/[\u2030-\u203E]/,/[\u2041-\u2053]/,/[\u2055-\u205E]/,/[\u2190-\u23FF]/,/[\u2500-\u2775]/,/[\u2794-\u2BFF]/,/[\u2E00-\u2E7F]/,/[\u3001-\u3003]/,/[\u3008-\u3020]/,/[\u3030]/),yg=Ue(gg,/[\u0300-\u036F]/,/[\u1DC0-\u1DFF]/,/[\u20D0-\u20FF]/,/[\uFE00-\uFE0F]/,/[\uFE20-\uFE2F]/),Ps=le(gg,yg,"*"),bg=Ue(/[a-zA-Z_]/,/[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,/[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,/[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,/[\u1E00-\u1FFF]/,/[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,/[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,/[\u2C00-\u2DFF\u2E80-\u2FFF]/,/[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,/[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,/[\uFE47-\uFEFE\uFF00-\uFFFD]/),xo=Ue(bg,/\d/,/[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),Ct=le(bg,xo,"*"),Na=le(/[A-Z]/,xo,"*"),zk=["attached","autoclosure",le(/convention\(/,Ue("swift","block","c"),/\)/),"discardableResult","dynamicCallable","dynamicMemberLookup","escaping","freestanding","frozen","GKInspectable","IBAction","IBDesignable","IBInspectable","IBOutlet","IBSegueAction","inlinable","main","nonobjc","NSApplicationMain","NSCopying","NSManaged",le(/objc\(/,Ct,/\)/),"objc","objcMembers","propertyWrapper","requires_stored_property_inits","resultBuilder","Sendable","testable","UIApplicationMain","unchecked","unknown","usableFromInline","warn_unqualified_access"],Uk=["iOS","iOSApplicationExtension","macOS","macOSApplicationExtension","macCatalyst","macCatalystApplicationExtension","watchOS","watchOSApplicationExtension","tvOS","tvOSApplicationExtension","swift"];function jk(e){const t={match:/\s+/,relevance:0},n=e.COMMENT("/\\*","\\*/",{contains:["self"]}),r=[e.C_LINE_COMMENT_MODE,n],i={match:[/\./,Ue(...Lk,...Rp)],className:{2:"keyword"}},a={match:le(/\./,Ue(...Ms)),relevance:0},o=Ms.filter(ie=>typeof ie=="string").concat(["_|0"]),s=Ms.filter(ie=>typeof ie!="string").concat(Dk).map(uu),l={variants:[{className:"keyword",match:Ue(...s,...Rp)}]},c={$pattern:Ue(/\b\w+/,/#\w+/),keyword:o.concat(Bk),literal:Ip},u=[i,a,l],d={match:le(/\./,Ue(...Mp)),relevance:0},p={className:"built_in",match:le(/\b/,Ue(...Mp),/(?=\()/)},f=[d,p],v={match:/->/,relevance:0},x={className:"operator",relevance:0,variants:[{match:Ps},{match:`\\.(\\.|${yg})+`}]},S=[v,x],h="([0-9]_*)+",g="([0-9a-fA-F]_*)+",y={className:"number",relevance:0,variants:[{match:`\\b(${h})(\\.(${h}))?([eE][+-]?(${h}))?\\b`},{match:`\\b0x(${g})(\\.(${g}))?([pP][+-]?(${h}))?\\b`},{match:/\b0o([0-7]_*)+\b/},{match:/\b0b([01]_*)+\b/}]},E=(ie="")=>({className:"subst",variants:[{match:le(/\\/,ie,/[0\\tnr"']/)},{match:le(/\\/,ie,/u\{[0-9a-fA-F]{1,8}\}/)}]}),N=(ie="")=>({className:"subst",match:le(/\\/,ie,/[\t ]*(?:[\r\n]|\r\n)/)}),w=(ie="")=>({className:"subst",label:"interpol",begin:le(/\\/,ie,/\(/),end:/\)/}),A=(ie="")=>({begin:le(ie,/"""/),end:le(/"""/,ie),contains:[E(ie),N(ie),w(ie)]}),I=(ie="")=>({begin:le(ie,/"/),end:le(/"/,ie),contains:[E(ie),w(ie)]}),U={className:"string",variants:[A(),A("#"),A("##"),A("###"),I(),I("#"),I("##"),I("###")]},M=[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}],$={begin:/\/[^\s](?=[^/\n]*\/)/,end:/\//,contains:M},W=ie=>{const yt=le(ie,/\//),K=le(/\//,ie);return{begin:yt,end:K,contains:[...M,{scope:"comment",begin:`#(?!.*${K})`,end:/$/}]}},Y={scope:"regexp",variants:[W("###"),W("##"),W("#"),$]},V={match:le(/`/,Ct,/`/)},L={className:"variable",match:/\$\d+/},T={className:"variable",match:`\\$${xo}+`},D=[V,L,T],O={match:/(@|#(un)?)available/,scope:"keyword",starts:{contains:[{begin:/\(/,end:/\)/,keywords:Uk,contains:[...S,y,U]}]}},P={scope:"keyword",match:le(/@/,Ue(...zk),ni(Ue(/\(/,/\s+/)))},b={scope:"meta",match:le(/@/,Ct)},B=[O,P,b],H={match:ni(/\b[A-Z]/),relevance:0,contains:[{className:"type",match:le(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/,xo,"+")},{className:"type",match:Na,relevance:0},{match:/[?!]+/,relevance:0},{match:/\.\.\./,relevance:0},{match:le(/\s+&\s+/,ni(Na)),relevance:0}]},_={begin:/</,end:/>/,keywords:c,contains:[...r,...u,...B,v,H]};H.contains.push(_);const Z={match:le(Ct,/\s*:/),keywords:"_|0",relevance:0},ne={begin:/\(/,end:/\)/,relevance:0,keywords:c,contains:["self",Z,...r,Y,...u,...f,...S,y,U,...D,...B,H]},re={begin:/</,end:/>/,keywords:"repeat each",contains:[...r,H]},Be={begin:Ue(ni(le(Ct,/\s*:/)),ni(le(Ct,/\s+/,Ct,/\s*:/))),end:/:/,relevance:0,contains:[{className:"keyword",match:/\b_\b/},{className:"params",match:Ct}]},qe={begin:/\(/,end:/\)/,keywords:c,contains:[Be,...r,...u,...S,y,U,...B,H,ne],endsParent:!0,illegal:/["']/},Nt={match:[/(func|macro)/,/\s+/,Ue(V.match,Ct,Ps)],className:{1:"keyword",3:"title.function"},contains:[re,qe,t],illegal:[/\[/,/%/]},Tt={match:[/\b(?:subscript|init[?!]?)/,/\s*(?=[<(])/],className:{1:"keyword"},contains:[re,qe,t],illegal:/\[|%/},Qt={match:[/operator/,/\s+/,Ps],className:{1:"keyword",3:"title"}},jr={begin:[/precedencegroup/,/\s+/,Na],className:{1:"keyword",3:"title"},contains:[H],keywords:[...Fk,...Ip],end:/}/},Xt={match:[/class\b/,/\s+/,/func\b/,/\s+/,/\b[A-Za-z_][A-Za-z0-9_]*\b/],scope:{1:"keyword",3:"keyword",5:"title.function"}},Xn={match:[/class\b/,/\s+/,/var\b/],scope:{1:"keyword",3:"keyword"}},ze={begin:[/(struct|protocol|class|extension|enum|actor)/,/\s+/,Ct,/\s*/],beginScope:{1:"keyword",3:"title.class"},keywords:c,contains:[re,...u,{begin:/:/,end:/\{/,keywords:c,contains:[{scope:"title.class.inherited",match:Na},...u],relevance:0}]};for(const ie of U.variants){const yt=ie.contains.find(An=>An.label==="interpol");yt.keywords=c;const K=[...u,...f,...S,y,U,...D];yt.contains=[...K,{begin:/\(/,end:/\)/,contains:["self",...K]}]}return{name:"Swift",keywords:c,contains:[...r,Nt,Tt,Xt,Xn,ze,Qt,jr,{beginKeywords:"import",end:/$/,contains:[...r],relevance:0},Y,...u,...f,...S,y,U,...D,...B,H,ne]}}const _o="[A-Za-z$_][0-9A-Za-z$_]*",vg=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],xg=["true","false","null","undefined","NaN","Infinity"],_g=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],wg=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Eg=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],kg=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Sg=[].concat(Eg,_g,wg);function $k(e){const t=e.regex,n=(O,{after:P})=>{const b="</"+O[0].slice(1);return O.input.indexOf(b,P)!==-1},r=_o,i={begin:"<>",end:"</>"},a=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(O,P)=>{const b=O[0].length+O.index,B=O.input[b];if(B==="<"||B===","){P.ignoreMatch();return}B===">"&&(n(O,{after:b})||P.ignoreMatch());let H;const _=O.input.substring(b);if(H=_.match(/^\s*=/)){P.ignoreMatch();return}if((H=_.match(/^\s+extends\s+/))&&H.index===0){P.ignoreMatch();return}}},s={$pattern:_o,keyword:vg,literal:xg,built_in:Sg,"variable.language":kg},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},f={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},x={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},g={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:r+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},y=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,v,x,S,{match:/\$\d+/},d];p.contains=y.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(y)});const E=[].concat(g,p.contains),N=E.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(E)}]),w={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N},A={variants:[{match:[/class/,/\s+/,r,/\s+/,/extends/,/\s+/,t.concat(r,"(",t.concat(/\./,r),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,r],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[..._g,...wg]}},U={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},M={variants:[{match:[/function/,/\s+/,r,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[w],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function W(O){return t.concat("(?!",O.join("|"),")")}const Y={match:t.concat(/\b/,W([...Eg,"super","import"].map(O=>`${O}\\s*\\(`)),r,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(r,/(?![0-9A-Za-z$_(])/))),end:r,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,r,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},w]},T="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",D={match:[/const|var|let/,/\s+/,r,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(T)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[w]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),U,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,v,x,S,g,{match:/\$\d+/},d,I,{scope:"attr",match:r+t.lookahead(":"),relevance:0},D,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[g,e.REGEXP_MODE,{className:"function",begin:T,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:a},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},M,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[w,e.inherit(e.TITLE_MODE,{begin:r,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+r,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[w]},Y,$,A,L,{match:/\$[(.]/}]}}function Hk(e){const t=e.regex,n=$k(e),r=_o,i=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],a={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},o={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:i},contains:[n.exports.CLASS_REFERENCE]},s={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},l=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],c={$pattern:_o,keyword:vg.concat(l),literal:xg,built_in:Sg.concat(i),"variable.language":kg},u={className:"meta",begin:"@"+r},d=(x,S,h)=>{const g=x.contains.findIndex(y=>y.label===S);if(g===-1)throw new Error("can not find mode to replace");x.contains.splice(g,1,h)};Object.assign(n.keywords,c),n.exports.PARAMS_CONTAINS.push(u);const p=n.contains.find(x=>x.scope==="attr"),f=Object.assign({},p,{match:t.concat(r,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,p,f]),n.contains=n.contains.concat([u,a,o,f]),d(n,"shebang",e.SHEBANG()),d(n,"use_strict",s);const v=n.contains.find(x=>x.label==="func.def");return v.relevance=0,Object.assign(n,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),n}function Wk(e){const t=e.regex,n={className:"string",begin:/"(""|[^/n])"C\b/},r={className:"string",begin:/"/,end:/"/,illegal:/\n/,contains:[{begin:/""/}]},i=/\d{1,2}\/\d{1,2}\/\d{4}/,a=/\d{4}-\d{1,2}-\d{1,2}/,o=/(\d|1[012])(:\d+){0,2} *(AM|PM)/,s=/\d{1,2}(:\d{1,2}){1,2}/,l={className:"literal",variants:[{begin:t.concat(/# */,t.either(a,i),/ *#/)},{begin:t.concat(/# */,s,/ *#/)},{begin:t.concat(/# */,o,/ *#/)},{begin:t.concat(/# */,t.either(a,i),/ +/,t.either(o,s),/ *#/)}]},c={className:"number",relevance:0,variants:[{begin:/\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/},{begin:/\b\d[\d_]*((U?[SIL])|[%&])?/},{begin:/&H[\dA-F_]+((U?[SIL])|[%&])?/},{begin:/&O[0-7_]+((U?[SIL])|[%&])?/},{begin:/&B[01_]+((U?[SIL])|[%&])?/}]},u={className:"label",begin:/^\w+:/},d=e.COMMENT(/'''/,/$/,{contains:[{className:"doctag",begin:/<\/?/,end:/>/}]}),p=e.COMMENT(null,/$/,{variants:[{begin:/'/},{begin:/([\t ]|^)REM(?=\s)/}]});return{name:"Visual Basic .NET",aliases:["vb"],case_insensitive:!0,classNameAliases:{label:"symbol"},keywords:{keyword:"addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",built_in:"addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",type:"boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",literal:"true false nothing"},illegal:"//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",contains:[n,r,l,c,u,d,p,{className:"meta",begin:/[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,end:/$/,keywords:{keyword:"const disable else elseif enable end externalsource if region then"},contains:[p]}]}}function qk(e){e.regex;const t=e.COMMENT(/\(;/,/;\)/);t.contains.push("self");const n=e.COMMENT(/;;/,/$/),r=["anyfunc","block","br","br_if","br_table","call","call_indirect","data","drop","elem","else","end","export","func","global.get","global.set","local.get","local.set","local.tee","get_global","get_local","global","if","import","local","loop","memory","memory.grow","memory.size","module","mut","nop","offset","param","result","return","select","set_global","set_local","start","table","tee_local","then","type","unreachable"],i={begin:[/(?:func|call|call_indirect)/,/\s+/,/\$[^\s)]+/],className:{1:"keyword",3:"title.function"}},a={className:"variable",begin:/\$[\w_]+/},o={match:/(\((?!;)|\))+/,className:"punctuation",relevance:0},s={className:"number",relevance:0,match:/[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/},l={match:/(i32|i64|f32|f64)(?!\.)/,className:"type"},c={className:"keyword",match:/\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/};return{name:"WebAssembly",keywords:{$pattern:/[\w.]+/,keyword:r},contains:[n,t,{match:[/(?:offset|align)/,/\s*/,/=/],className:{1:"keyword",3:"operator"}},a,o,i,e.QUOTE_STRING_MODE,l,c,s]}}function Gk(e){const t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r=/[\p{L}0-9._:-]+/u,i={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=e.inherit(a,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),l=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),c={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:r,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[i]},{begin:/'/,end:/'/,contains:[i]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,l,s,o,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,o,l,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},i,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[l]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[c],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[c],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:c}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}function Kk(e){const t="true false yes no null",n="[\\w#;/?:@&=+$,.~*'()[\\]]+",r={className:"attr",variants:[{begin:/[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/},{begin:/"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/},{begin:/'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/}]},i={className:"template-variable",variants:[{begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]},a={className:"string",relevance:0,begin:/'/,end:/'/,contains:[{match:/''/,scope:"char.escape",relevance:0}]},o={className:"string",relevance:0,variants:[{begin:/"/,end:/"/},{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,i]},s=e.inherit(o,{variants:[{begin:/'/,end:/'/,contains:[{begin:/''/,relevance:0}]},{begin:/"/,end:/"/},{begin:/[^\s,{}[\]]+/}]}),p={className:"number",begin:"\\b"+"[0-9]{4}(-[0-9][0-9]){0,2}"+"([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?"+"(\\.[0-9]*)?"+"([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?"+"\\b"},f={end:",",endsWithParent:!0,excludeEnd:!0,keywords:t,relevance:0},v={begin:/\{/,end:/\}/,contains:[f],illegal:"\\n",relevance:0},x={begin:"\\[",end:"\\]",contains:[f],illegal:"\\n",relevance:0},S=[r,{className:"meta",begin:"^---\\s*$",relevance:10},{className:"string",begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!\\w+!"+n},{className:"type",begin:"!<"+n+">"},{className:"type",begin:"!"+n},{className:"type",begin:"!!"+n},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:t,keywords:{literal:t}},p,{className:"number",begin:e.C_NUMBER_RE+"\\b",relevance:0},v,x,a,o],h=[...S];return h.pop(),h.push(s),f.contains=h,{name:"YAML",case_insensitive:!0,aliases:["yml"],contains:S}}const Vk={arduino:C1,bash:A1,c:R1,cpp:I1,csharp:M1,css:$1,diff:H1,go:W1,graphql:q1,ini:G1,java:K1,javascript:Z1,json:J1,kotlin:tk,less:ck,lua:uk,makefile:dk,markdown:pk,objectivec:fk,perl:hk,php:mk,"php-template":gk,plaintext:yk,python:bk,"python-repl":vk,r:xk,ruby:_k,rust:wk,scss:Rk,shell:Ik,sql:Mk,swift:jk,typescript:Hk,vbnet:Wk,wasm:qk,xml:Gk,yaml:Kk};function Ng(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],r=typeof n;(r==="object"||r==="function")&&!Object.isFrozen(n)&&Ng(n)}),e}class Pp{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Tg(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function dn(e,...t){const n=Object.create(null);for(const r in e)n[r]=e[r];return t.forEach(function(r){for(const i in r)n[i]=r[i]}),n}const Yk="</span>",Lp=e=>!!e.scope,Qk=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,i)=>`${r}${"_".repeat(i+1)}`)].join(" ")}return`${t}${e}`};class Xk{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Tg(t)}openNode(t){if(!Lp(t))return;const n=Qk(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Lp(t)&&(this.buffer+=Yk)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Dp=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class du{constructor(){this.rootNode=Dp(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Dp({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{du._collapse(n)}))}}class Zk extends du{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const r=t.root;n&&(r.scope=`language:${n}`),this.add(r)}toHTML(){return new Xk(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function $i(e){return e?typeof e=="string"?e:e.source:null}function Og(e){return Qn("(?=",e,")")}function Jk(e){return Qn("(?:",e,")*")}function eS(e){return Qn("(?:",e,")?")}function Qn(...e){return e.map(n=>$i(n)).join("")}function tS(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function pu(...e){return"("+(tS(e).capture?"":"?:")+e.map(r=>$i(r)).join("|")+")"}function Cg(e){return new RegExp(e.toString()+"|").exec("").length-1}function nS(e,t){const n=e&&e.exec(t);return n&&n.index===0}const rS=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function fu(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;const i=n;let a=$i(r),o="";for(;a.length>0;){const s=rS.exec(a);if(!s){o+=a;break}o+=a.substring(0,s.index),a=a.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?o+="\\"+String(Number(s[1])+i):(o+=s[0],s[0]==="("&&n++)}return o}).map(r=>`(${r})`).join(t)}const iS=/\b\B/,Ag="[a-zA-Z]\\w*",hu="[a-zA-Z_]\\w*",Rg="\\b\\d+(\\.\\d+)?",Ig="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Mg="\\b(0b[01]+)",aS="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",oS=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=Qn(t,/.*\b/,e.binary,/\b.*/)),dn({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},Hi={begin:"\\\\[\\s\\S]",relevance:0},sS={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Hi]},lS={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Hi]},cS={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ko=function(e,t,n={}){const r=dn({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=pu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:Qn(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},uS=Ko("//","$"),dS=Ko("/\\*","\\*/"),pS=Ko("#","$"),fS={scope:"number",begin:Rg,relevance:0},hS={scope:"number",begin:Ig,relevance:0},mS={scope:"number",begin:Mg,relevance:0},gS={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Hi,{begin:/\[/,end:/\]/,relevance:0,contains:[Hi]}]},yS={scope:"title",begin:Ag,relevance:0},bS={scope:"title",begin:hu,relevance:0},vS={begin:"\\.\\s*"+hu,relevance:0},xS=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ta=Object.freeze({__proto__:null,APOS_STRING_MODE:sS,BACKSLASH_ESCAPE:Hi,BINARY_NUMBER_MODE:mS,BINARY_NUMBER_RE:Mg,COMMENT:Ko,C_BLOCK_COMMENT_MODE:dS,C_LINE_COMMENT_MODE:uS,C_NUMBER_MODE:hS,C_NUMBER_RE:Ig,END_SAME_AS_BEGIN:xS,HASH_COMMENT_MODE:pS,IDENT_RE:Ag,MATCH_NOTHING_RE:iS,METHOD_GUARD:vS,NUMBER_MODE:fS,NUMBER_RE:Rg,PHRASAL_WORDS_MODE:cS,QUOTE_STRING_MODE:lS,REGEXP_MODE:gS,RE_STARTERS_RE:aS,SHEBANG:oS,TITLE_MODE:yS,UNDERSCORE_IDENT_RE:hu,UNDERSCORE_TITLE_MODE:bS});function _S(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function wS(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ES(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=_S,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function kS(e,t){Array.isArray(e.illegal)&&(e.illegal=pu(...e.illegal))}function SS(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function NS(e,t){e.relevance===void 0&&(e.relevance=1)}const TS=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=Qn(n.beforeMatch,Og(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},OS=["of","and","for","in","not","or","if","then","parent","list","value"],CS="keyword";function Pg(e,t,n=CS){const r=Object.create(null);return typeof e=="string"?i(n,e.split(" ")):Array.isArray(e)?i(n,e):Object.keys(e).forEach(function(a){Object.assign(r,Pg(e[a],t,a))}),r;function i(a,o){t&&(o=o.map(s=>s.toLowerCase())),o.forEach(function(s){const l=s.split("|");r[l[0]]=[a,AS(l[0],l[1])]})}}function AS(e,t){return t?Number(t):RS(e)?0:1}function RS(e){return OS.includes(e.toLowerCase())}const Fp={},zn=e=>{console.error(e)},Bp=(e,...t)=>{console.log(`WARN: ${e}`,...t)},nr=(e,t)=>{Fp[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Fp[`${e}/${t}`]=!0)},wo=new Error;function Lg(e,t,{key:n}){let r=0;const i=e[n],a={},o={};for(let s=1;s<=t.length;s++)o[s+r]=i[s],a[s+r]=!0,r+=Cg(t[s-1]);e[n]=o,e[n]._emit=a,e[n]._multi=!0}function IS(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw zn("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),wo;if(typeof e.beginScope!="object"||e.beginScope===null)throw zn("beginScope must be object"),wo;Lg(e,e.begin,{key:"beginScope"}),e.begin=fu(e.begin,{joinWith:""})}}function MS(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw zn("skip, excludeEnd, returnEnd not compatible with endScope: {}"),wo;if(typeof e.endScope!="object"||e.endScope===null)throw zn("endScope must be object"),wo;Lg(e,e.end,{key:"endScope"}),e.end=fu(e.end,{joinWith:""})}}function PS(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function LS(e){PS(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),IS(e),MS(e)}function DS(e){function t(o,s){return new RegExp($i(o),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=Cg(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(l=>l[1]);this.matcherRe=t(fu(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(s);if(!l)return null;const c=l.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const l=new n;return this.rules.slice(s).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function i(o){const s=new r;return o.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),o.terminatorEnd&&s.addRule(o.terminatorEnd,{type:"end"}),o.illegal&&s.addRule(o.illegal,{type:"illegal"}),s}function a(o,s){const l=o;if(o.isCompiled)return l;[wS,SS,LS,TS].forEach(u=>u(o,s)),e.compilerExtensions.forEach(u=>u(o,s)),o.__beforeBegin=null,[ES,kS,NS].forEach(u=>u(o,s)),o.isCompiled=!0;let c=null;return typeof o.keywords=="object"&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),c=o.keywords.$pattern,delete o.keywords.$pattern),c=c||/\w+/,o.keywords&&(o.keywords=Pg(o.keywords,e.case_insensitive)),l.keywordPatternRe=t(c,!0),s&&(o.begin||(o.begin=/\B|\b/),l.beginRe=t(l.begin),!o.end&&!o.endsWithParent&&(o.end=/\B|\b/),o.end&&(l.endRe=t(l.end)),l.terminatorEnd=$i(l.end)||"",o.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(o.end?"|":"")+s.terminatorEnd)),o.illegal&&(l.illegalRe=t(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map(function(u){return FS(u==="self"?o:u)})),o.contains.forEach(function(u){a(u,l)}),o.starts&&a(o.starts,s),l.matcher=i(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=dn(e.classNameAliases||{}),a(e)}function Dg(e){return e?e.endsWithParent||Dg(e.starts):!1}function FS(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return dn(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Dg(e)?dn(e,{starts:e.starts?dn(e.starts):null}):Object.isFrozen(e)?dn(e):e}var BS="11.11.1";class zS extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ls=Tg,zp=dn,Up=Symbol("nomatch"),US=7,Fg=function(e){const t=Object.create(null),n=Object.create(null),r=[];let i=!0;const a="Could not find the language '{}', did you forget to load/include a language module?",o={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Zk};function l(T){return s.noHighlightRe.test(T)}function c(T){let D=T.className+" ";D+=T.parentNode?T.parentNode.className:"";const O=s.languageDetectRe.exec(D);if(O){const P=I(O[1]);return P||(Bp(a.replace("{}",O[1])),Bp("Falling back to no-highlight mode for this block.",T)),P?O[1]:"no-highlight"}return D.split(/\s+/).find(P=>l(P)||I(P))}function u(T,D,O){let P="",b="";typeof D=="object"?(P=T,O=D.ignoreIllegals,b=D.language):(nr("10.7.0","highlight(lang, code, ...args) has been deprecated."),nr("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),b=T,P=D),O===void 0&&(O=!0);const B={code:P,language:b};V("before:highlight",B);const H=B.result?B.result:d(B.language,B.code,O);return H.code=B.code,V("after:highlight",H),H}function d(T,D,O,P){const b=Object.create(null);function B(k,C){return k.keywords[C]}function H(){if(!K.keywords){_e.addText(se);return}let k=0;K.keywordPatternRe.lastIndex=0;let C=K.keywordPatternRe.exec(se),j="";for(;C;){j+=se.substring(k,C.index);const G=ze.case_insensitive?C[0].toLowerCase():C[0],X=B(K,G);if(X){const[ve,Bt]=X;if(_e.addText(j),j="",b[G]=(b[G]||0)+1,b[G]<=US&&(Zn+=Bt),ve.startsWith("_"))j+=C[0];else{const bt=ze.classNameAliases[ve]||ve;ne(C[0],bt)}}else j+=C[0];k=K.keywordPatternRe.lastIndex,C=K.keywordPatternRe.exec(se)}j+=se.substring(k),_e.addText(j)}function _(){if(se==="")return;let k=null;if(typeof K.subLanguage=="string"){if(!t[K.subLanguage]){_e.addText(se);return}k=d(K.subLanguage,se,!0,An[K.subLanguage]),An[K.subLanguage]=k._top}else k=f(se,K.subLanguage.length?K.subLanguage:null);K.relevance>0&&(Zn+=k.relevance),_e.__addSublanguage(k._emitter,k.language)}function Z(){K.subLanguage!=null?_():H(),se=""}function ne(k,C){k!==""&&(_e.startScope(C),_e.addText(k),_e.endScope())}function re(k,C){let j=1;const G=C.length-1;for(;j<=G;){if(!k._emit[j]){j++;continue}const X=ze.classNameAliases[k[j]]||k[j],ve=C[j];X?ne(ve,X):(se=ve,H(),se=""),j++}}function Be(k,C){return k.scope&&typeof k.scope=="string"&&_e.openNode(ze.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(ne(se,ze.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),se=""):k.beginScope._multi&&(re(k.beginScope,C),se="")),K=Object.create(k,{parent:{value:K}}),K}function qe(k,C,j){let G=nS(k.endRe,j);if(G){if(k["on:end"]){const X=new Pp(k);k["on:end"](C,X),X.isMatchIgnored&&(G=!1)}if(G){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return qe(k.parent,C,j)}function Nt(k){return K.matcher.regexIndex===0?(se+=k[0],1):(Hr=!0,0)}function Tt(k){const C=k[0],j=k.rule,G=new Pp(j),X=[j.__beforeBegin,j["on:begin"]];for(const ve of X)if(ve&&(ve(k,G),G.isMatchIgnored))return Nt(C);return j.skip?se+=C:(j.excludeBegin&&(se+=C),Z(),!j.returnBegin&&!j.excludeBegin&&(se=C)),Be(j,k),j.returnBegin?0:C.length}function Qt(k){const C=k[0],j=D.substring(k.index),G=qe(K,k,j);if(!G)return Up;const X=K;K.endScope&&K.endScope._wrap?(Z(),ne(C,K.endScope._wrap)):K.endScope&&K.endScope._multi?(Z(),re(K.endScope,k)):X.skip?se+=C:(X.returnEnd||X.excludeEnd||(se+=C),Z(),X.excludeEnd&&(se=C));do K.scope&&_e.closeNode(),!K.skip&&!K.subLanguage&&(Zn+=K.relevance),K=K.parent;while(K!==G.parent);return G.starts&&Be(G.starts,k),X.returnEnd?0:C.length}function jr(){const k=[];for(let C=K;C!==ze;C=C.parent)C.scope&&k.unshift(C.scope);k.forEach(C=>_e.openNode(C))}let Xt={};function Xn(k,C){const j=C&&C[0];if(se+=k,j==null)return Z(),0;if(Xt.type==="begin"&&C.type==="end"&&Xt.index===C.index&&j===""){if(se+=D.slice(C.index,C.index+1),!i){const G=new Error(`0 width match regex (${T})`);throw G.languageName=T,G.badRule=Xt.rule,G}return 1}if(Xt=C,C.type==="begin")return Tt(C);if(C.type==="illegal"&&!O){const G=new Error('Illegal lexeme "'+j+'" for mode "'+(K.scope||"<unnamed>")+'"');throw G.mode=K,G}else if(C.type==="end"){const G=Qt(C);if(G!==Up)return G}if(C.type==="illegal"&&j==="")return se+=`
`,1;if($r>1e5&&$r>C.index*3)throw new Error("potential infinite loop, way more iterations than matches");return se+=j,j.length}const ze=I(T);if(!ze)throw zn(a.replace("{}",T)),new Error('Unknown language: "'+T+'"');const ie=DS(ze);let yt="",K=P||ie;const An={},_e=new s.__emitter(s);jr();let se="",Zn=0,Ft=0,$r=0,Hr=!1;try{if(ze.__emitTokens)ze.__emitTokens(D,_e);else{for(K.matcher.considerAll();;){$r++,Hr?Hr=!1:K.matcher.considerAll(),K.matcher.lastIndex=Ft;const k=K.matcher.exec(D);if(!k)break;const C=D.substring(Ft,k.index),j=Xn(C,k);Ft=k.index+j}Xn(D.substring(Ft))}return _e.finalize(),yt=_e.toHTML(),{language:T,value:yt,relevance:Zn,illegal:!1,_emitter:_e,_top:K}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:T,value:Ls(D),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:Ft,context:D.slice(Ft-100,Ft+100),mode:k.mode,resultSoFar:yt},_emitter:_e};if(i)return{language:T,value:Ls(D),illegal:!1,relevance:0,errorRaised:k,_emitter:_e,_top:K};throw k}}function p(T){const D={value:Ls(T),illegal:!1,relevance:0,_top:o,_emitter:new s.__emitter(s)};return D._emitter.addText(T),D}function f(T,D){D=D||s.languages||Object.keys(t);const O=p(T),P=D.filter(I).filter(M).map(Z=>d(Z,T,!1));P.unshift(O);const b=P.sort((Z,ne)=>{if(Z.relevance!==ne.relevance)return ne.relevance-Z.relevance;if(Z.language&&ne.language){if(I(Z.language).supersetOf===ne.language)return 1;if(I(ne.language).supersetOf===Z.language)return-1}return 0}),[B,H]=b,_=B;return _.secondBest=H,_}function v(T,D,O){const P=D&&n[D]||O;T.classList.add("hljs"),T.classList.add(`language-${P}`)}function x(T){let D=null;const O=c(T);if(l(O))return;if(V("before:highlightElement",{el:T,language:O}),T.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",T);return}if(T.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(T)),s.throwUnescapedHTML))throw new zS("One of your code blocks includes unescaped HTML.",T.innerHTML);D=T;const P=D.textContent,b=O?u(P,{language:O,ignoreIllegals:!0}):f(P);T.innerHTML=b.value,T.dataset.highlighted="yes",v(T,O,b.language),T.result={language:b.language,re:b.relevance,relevance:b.relevance},b.secondBest&&(T.secondBest={language:b.secondBest.language,relevance:b.secondBest.relevance}),V("after:highlightElement",{el:T,result:b,text:P})}function S(T){s=zp(s,T)}const h=()=>{E(),nr("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function g(){E(),nr("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let y=!1;function E(){function T(){E()}if(document.readyState==="loading"){y||window.addEventListener("DOMContentLoaded",T,!1),y=!0;return}document.querySelectorAll(s.cssSelector).forEach(x)}function N(T,D){let O=null;try{O=D(e)}catch(P){if(zn("Language definition for '{}' could not be registered.".replace("{}",T)),i)zn(P);else throw P;O=o}O.name||(O.name=T),t[T]=O,O.rawDefinition=D.bind(null,e),O.aliases&&U(O.aliases,{languageName:T})}function w(T){delete t[T];for(const D of Object.keys(n))n[D]===T&&delete n[D]}function A(){return Object.keys(t)}function I(T){return T=(T||"").toLowerCase(),t[T]||t[n[T]]}function U(T,{languageName:D}){typeof T=="string"&&(T=[T]),T.forEach(O=>{n[O.toLowerCase()]=D})}function M(T){const D=I(T);return D&&!D.disableAutodetect}function $(T){T["before:highlightBlock"]&&!T["before:highlightElement"]&&(T["before:highlightElement"]=D=>{T["before:highlightBlock"](Object.assign({block:D.el},D))}),T["after:highlightBlock"]&&!T["after:highlightElement"]&&(T["after:highlightElement"]=D=>{T["after:highlightBlock"](Object.assign({block:D.el},D))})}function W(T){$(T),r.push(T)}function Y(T){const D=r.indexOf(T);D!==-1&&r.splice(D,1)}function V(T,D){const O=T;r.forEach(function(P){P[O]&&P[O](D)})}function L(T){return nr("10.7.0","highlightBlock will be removed entirely in v12.0"),nr("10.7.0","Please use highlightElement now."),x(T)}Object.assign(e,{highlight:u,highlightAuto:f,highlightAll:E,highlightElement:x,highlightBlock:L,configure:S,initHighlighting:h,initHighlightingOnLoad:g,registerLanguage:N,unregisterLanguage:w,listLanguages:A,getLanguage:I,registerAliases:U,autoDetection:M,inherit:zp,addPlugin:W,removePlugin:Y}),e.debugMode=function(){i=!1},e.safeMode=function(){i=!0},e.versionString=BS,e.regex={concat:Qn,lookahead:Og,either:pu,optional:eS,anyNumberOfTimes:Jk};for(const T in Ta)typeof Ta[T]=="object"&&Ng(Ta[T]);return Object.assign(e,Ta),e},Pr=Fg({});Pr.newInstance=()=>Fg({});var jS=Pr;Pr.HighlightJS=Pr;Pr.default=Pr;const $S=ko(jS),jp={},HS="hljs-";function WS(e){const t=$S.newInstance();return e&&a(e),{highlight:n,highlightAuto:r,listLanguages:i,register:a,registerAlias:o,registered:s};function n(l,c,u){const d=u||jp,p=typeof d.prefix=="string"?d.prefix:HS;if(!t.getLanguage(l))throw new Error("Unknown language: `"+l+"` is not registered");t.configure({__emitter:qS,classPrefix:p});const f=t.highlight(c,{ignoreIllegals:!0,language:l});if(f.errorRaised)throw new Error("Could not highlight with `Highlight.js`",{cause:f.errorRaised});const v=f._emitter.root,x=v.data;return x.language=f.language,x.relevance=f.relevance,v}function r(l,c){const d=(c||jp).subset||i();let p=-1,f=0,v;for(;++p<d.length;){const x=d[p];if(!t.getLanguage(x))continue;const S=n(x,l,c);S.data&&S.data.relevance!==void 0&&S.data.relevance>f&&(f=S.data.relevance,v=S)}return v||{type:"root",children:[],data:{language:void 0,relevance:f}}}function i(){return t.listLanguages()}function a(l,c){if(typeof l=="string")t.registerLanguage(l,c);else{let u;for(u in l)Object.hasOwn(l,u)&&t.registerLanguage(u,l[u])}}function o(l,c){if(typeof l=="string")t.registerAliases(typeof c=="string"?c:[...c],{languageName:l});else{let u;for(u in l)if(Object.hasOwn(l,u)){const d=l[u];t.registerAliases(typeof d=="string"?d:[...d],{languageName:u})}}}function s(l){return!!t.getLanguage(l)}}class qS{constructor(t){this.options=t,this.root={type:"root",children:[],data:{language:void 0,relevance:0}},this.stack=[this.root]}addText(t){if(t==="")return;const n=this.stack[this.stack.length-1],r=n.children[n.children.length-1];r&&r.type==="text"?r.value+=t:n.children.push({type:"text",value:t})}startScope(t){this.openNode(String(t))}endScope(){this.closeNode()}__addSublanguage(t,n){const r=this.stack[this.stack.length-1],i=t.root.children;n?r.children.push({type:"element",tagName:"span",properties:{className:[n]},children:i}):r.children.push(...i)}openNode(t){const n=this,r=t.split(".").map(function(o,s){return s?o+"_".repeat(s):n.options.classPrefix+o}),i=this.stack[this.stack.length-1],a={type:"element",tagName:"span",properties:{className:r},children:[]};i.children.push(a),this.stack.push(a)}closeNode(){this.stack.pop()}finalize(){}toHTML(){return""}}const GS={};function mu(e){const t=e||GS,n=t.aliases,r=t.detect||!1,i=t.languages||Vk,a=t.plainText,o=t.prefix,s=t.subset;let l="hljs";const c=WS(i);if(n&&c.registerAlias(n),o){const u=o.indexOf("-");l=u===-1?o:o.slice(0,u)}return function(u,d){ou(u,"element",function(p,f,v){if(p.tagName!=="code"||!v||v.type!=="element"||v.tagName!=="pre")return;const x=KS(p);if(x===!1||!x&&!r||x&&a&&a.includes(x))return;Array.isArray(p.properties.className)||(p.properties.className=[]),p.properties.className.includes(l)||p.properties.className.unshift(l);const S=_1(p,{whitespace:"pre"});let h;try{h=x?c.highlight(x,S,{prefix:o}):c.highlightAuto(S,{prefix:o,subset:s})}catch(g){const y=g;if(x&&/Unknown language/.test(y.message)){d.message("Cannot highlight as `"+x+"`, it’s not registered",{ancestors:[v,p],cause:y,place:p.position,ruleId:"missing-language",source:"rehype-highlight"});return}throw y}!x&&h.data&&h.data.language&&p.properties.className.push("language-"+h.data.language),h.children.length>0&&(p.children=h.children)})}}function KS(e){const t=e.properties.className;let n=-1;if(!Array.isArray(t))return;let r;for(;++n<t.length;){const i=String(t[n]);if(i==="no-highlight"||i==="nohighlight")return!1;!r&&i.slice(0,5)==="lang-"&&(r=i.slice(5)),!r&&i.slice(0,9)==="language-"&&(r=i.slice(9))}return r}function VS(){const{topicId:e}=vm(),t=bm(),n=rr.findIndex(o=>o.id===e),r=rr[n];if(!r)return m.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-10 text-center",children:[m.jsx("p",{className:"text-gray-400",children:"Topic not found."}),m.jsx(Le,{to:"/learn",className:"text-emerald-400 hover:underline mt-4 inline-block",children:"Back to Learn"})]});const i=n>0?rr[n-1]:null,a=n<rr.length-1?rr[n+1]:null;return m.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-10",children:[m.jsxs("nav",{className:"mb-6 flex items-center gap-2 text-sm text-gray-500",children:[m.jsx(Le,{to:"/learn",className:"hover:text-emerald-400 transition-colors",children:"Learn"}),m.jsx("span",{children:"/"}),m.jsx("span",{className:"text-gray-300",children:r.title})]}),m.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[m.jsx("div",{className:"w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center font-mono text-emerald-400 font-bold",children:r.icon}),m.jsxs("div",{children:[m.jsx("h1",{className:"text-3xl font-bold text-white",children:r.title}),m.jsx("p",{className:"text-gray-400 mt-1",children:r.summary})]})]}),m.jsx("div",{className:"bg-gray-900 border border-gray-800 rounded-xl p-8",children:m.jsx(lu,{className:"prose-dark",rehypePlugins:[mu],components:{table:({children:o})=>m.jsx("div",{className:"overflow-x-auto my-4",children:m.jsx("table",{className:"min-w-full border border-gray-700 rounded-lg overflow-hidden text-sm",children:o})}),th:({children:o})=>m.jsx("th",{className:"bg-gray-800 border border-gray-700 px-4 py-2 text-left text-gray-200 font-semibold",children:o}),td:({children:o})=>m.jsx("td",{className:"border border-gray-700 px-4 py-2 text-gray-300",children:o}),code:({className:o,children:s,...l})=>o?m.jsx("code",{className:o,...l,children:s}):m.jsx("code",{className:"bg-gray-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono",...l,children:s}),a:({href:o,children:s})=>o&&(o.startsWith("/")||o.startsWith("#"))?m.jsx(Le,{to:o,className:"text-emerald-400 hover:underline",children:s}):m.jsx("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"text-emerald-400 hover:underline",children:s})},children:r.content})}),m.jsxs("div",{className:"flex justify-between mt-8",children:[i?m.jsxs("button",{onClick:()=>t(`/learn/${i.id}`),className:"flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors",children:[m.jsx("span",{children:"←"}),m.jsx("span",{children:i.title})]}):m.jsx("div",{}),a?m.jsxs("button",{onClick:()=>t(`/learn/${a.id}`),className:"flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors",children:[m.jsx("span",{children:a.title}),m.jsx("span",{children:"→"})]}):m.jsx("div",{})]})]})}const $p={easy:0,medium:1,hard:2},Hp={easy:"text-emerald-400 bg-emerald-900/30 border-emerald-800",medium:"text-yellow-400 bg-yellow-900/30 border-yellow-800",hard:"text-red-400 bg-red-900/30 border-red-800"};function YS(){const[e,t]=R.useState("all"),[n,r]=R.useState("all"),{completedProblems:i,isComplete:a}=$o(),o=tn.filter(c=>e==="all"||c.difficulty===e).filter(c=>n==="all"||c.category===n).sort((c,u)=>$p[c.difficulty]-$p[u.difficulty]),s=i.filter(c=>tn.some(u=>u.id===c)),l=Math.round(s.length/tn.length*100);return m.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-10",children:[m.jsxs("div",{className:"mb-8",children:[m.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Practice"}),m.jsxs("p",{className:"text-gray-400",children:[tn.length," DS&A problems with a live Python code runner. For real-world system design problems,"," ",m.jsx(Le,{to:"/real-world",className:"text-emerald-400 hover:underline",children:"see Real World"}),"."]})]}),m.jsxs("div",{className:"bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8",children:[m.jsxs("div",{className:"flex justify-between items-center mb-2",children:[m.jsx("span",{className:"text-sm text-gray-400",children:"DS&A Progress"}),m.jsxs("span",{className:"text-sm font-mono text-emerald-400",children:[s.length," / ",tn.length," solved"]})]}),m.jsx("div",{className:"w-full bg-gray-800 rounded-full h-2",children:m.jsx("div",{className:"bg-emerald-500 h-2 rounded-full transition-all duration-500",style:{width:`${l}%`}})}),m.jsx("div",{className:"flex gap-4 mt-3 text-xs text-gray-500",children:["easy","medium","hard"].map(c=>{const u=tn.filter(p=>p.difficulty===c).length,d=tn.filter(p=>p.difficulty===c&&a(p.id)).length;return m.jsxs("span",{children:[m.jsx("span",{className:Hp[c].split(" ")[0],children:c}),": ",d,"/",u]},c)})})]}),m.jsxs("div",{className:"flex flex-wrap gap-3 mb-6",children:[m.jsx("div",{className:"flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1",children:["all","easy","medium","hard"].map(c=>m.jsx("button",{onClick:()=>t(c),className:`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${e===c?"bg-gray-700 text-white":"text-gray-400 hover:text-white"}`,children:c},c))}),m.jsxs("select",{value:n,onChange:c=>r(c.target.value),className:"bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-emerald-500",children:[m.jsx("option",{value:"all",children:"All Categories"}),Sx.map(c=>m.jsx("option",{value:c,children:c},c))]})]}),m.jsx("div",{className:"space-y-2",children:o.map(c=>{const u=a(c.id);return m.jsxs(Le,{to:`/practice/${c.id}`,className:"flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 hover:border-emerald-500 transition-all group",children:[m.jsxs("div",{className:"flex items-center gap-4",children:[m.jsx("div",{className:`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${u?"bg-emerald-500 border-emerald-500":"border-gray-600 group-hover:border-emerald-600"}`,children:u&&m.jsx("svg",{className:"w-3 h-3 text-white",fill:"currentColor",viewBox:"0 0 20 20",children:m.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})})}),m.jsxs("div",{children:[m.jsx("span",{className:"text-white font-medium group-hover:text-emerald-400 transition-colors",children:c.title}),m.jsx("span",{className:"text-gray-500 text-sm ml-2",children:c.category})]})]}),m.jsx("span",{className:`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${Hp[c.difficulty]}`,children:c.difficulty})]},c.id)})}),o.length===0&&m.jsx("div",{className:"text-center py-12 text-gray-500",children:"No problems match the selected filters."})]})}function Wp(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function QS(e){if(Array.isArray(e))return e}function XS(e,t,n){return(t=iN(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ZS(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,i,a,o,s=[],l=!0,c=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(l=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(u){c=!0,i=u}finally{try{if(!l&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(c)throw i}}return s}}function JS(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function qp(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Gp(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?qp(Object(n),!0).forEach(function(r){XS(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qp(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function eN(e,t){if(e==null)return{};var n,r,i=tN(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function tN(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function nN(e,t){return QS(e)||ZS(e,t)||aN(e,t)||JS()}function rN(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function iN(e){var t=rN(e,"string");return typeof t=="symbol"?t:t+""}function aN(e,t){if(e){if(typeof e=="string")return Wp(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Wp(e,t):void 0}}function oN(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Kp(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Vp(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Kp(Object(n),!0).forEach(function(r){oN(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Kp(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function sN(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduceRight(function(i,a){return a(i)},r)}}function li(e){return function t(){for(var n=this,r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return i.length>=e.length?e.apply(this,i):function(){for(var o=arguments.length,s=new Array(o),l=0;l<o;l++)s[l]=arguments[l];return t.apply(n,[].concat(i,s))}}}function Eo(e){return{}.toString.call(e).includes("Object")}function lN(e){return!Object.keys(e).length}function Wi(e){return typeof e=="function"}function cN(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function uN(e,t){return Eo(t)||wn("changeType"),Object.keys(t).some(function(n){return!cN(e,n)})&&wn("changeField"),t}function dN(e){Wi(e)||wn("selectorType")}function pN(e){Wi(e)||Eo(e)||wn("handlerType"),Eo(e)&&Object.values(e).some(function(t){return!Wi(t)})&&wn("handlersType")}function fN(e){e||wn("initialIsRequired"),Eo(e)||wn("initialType"),lN(e)&&wn("initialContent")}function hN(e,t){throw new Error(e[t]||e.default)}var mN={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},wn=li(hN)(mN),Oa={changes:uN,selector:dN,handler:pN,initial:fN};function gN(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Oa.initial(e),Oa.handler(t);var n={current:e},r=li(vN)(n,t),i=li(bN)(n),a=li(Oa.changes)(e),o=li(yN)(n);function s(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(u){return u};return Oa.selector(c),c(n.current)}function l(c){sN(r,i,a,o)(c)}return[s,l]}function yN(e,t){return Wi(t)?t(e.current):t}function bN(e,t){return e.current=Vp(Vp({},e.current),t),t}function vN(e,t,n){return Wi(t)?t(e.current):Object.keys(n).forEach(function(r){var i;return(i=t[r])===null||i===void 0?void 0:i.call(t,e.current[r])}),n}var xN={create:gN},_N={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs"}};function wN(e){return function t(){for(var n=this,r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return i.length>=e.length?e.apply(this,i):function(){for(var o=arguments.length,s=new Array(o),l=0;l<o;l++)s[l]=arguments[l];return t.apply(n,[].concat(i,s))}}}function EN(e){return{}.toString.call(e).includes("Object")}function kN(e){return e||Yp("configIsRequired"),EN(e)||Yp("configType"),e.urls?(SN(),{paths:{vs:e.urls.monacoBase}}):e}function SN(){console.warn(Bg.deprecation)}function NN(e,t){throw new Error(e[t]||e.default)}var Bg={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},Yp=wN(NN)(Bg),TN={config:kN},ON=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return function(i){return n.reduceRight(function(a,o){return o(a)},i)}};function zg(e,t){return Object.keys(t).forEach(function(n){t[n]instanceof Object&&e[n]&&Object.assign(t[n],zg(e[n],t[n]))}),Gp(Gp({},e),t)}var CN={type:"cancelation",msg:"operation is manually canceled"};function Ds(e){var t=!1,n=new Promise(function(r,i){e.then(function(a){return t?i(CN):r(a)}),e.catch(i)});return n.cancel=function(){return t=!0},n}var AN=["monaco"],RN=xN.create({config:_N,isInitialized:!1,resolve:null,reject:null,monaco:null}),Ug=nN(RN,2),ea=Ug[0],Vo=Ug[1];function IN(e){var t=TN.config(e),n=t.monaco,r=eN(t,AN);Vo(function(i){return{config:zg(i.config,r),monaco:n}})}function MN(){var e=ea(function(t){var n=t.monaco,r=t.isInitialized,i=t.resolve;return{monaco:n,isInitialized:r,resolve:i}});if(!e.isInitialized){if(Vo({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),Ds(Fs);if(window.monaco&&window.monaco.editor)return jg(window.monaco),e.resolve(window.monaco),Ds(Fs);ON(PN,DN)(FN)}return Ds(Fs)}function PN(e){return document.body.appendChild(e)}function LN(e){var t=document.createElement("script");return e&&(t.src=e),t}function DN(e){var t=ea(function(r){var i=r.config,a=r.reject;return{config:i,reject:a}}),n=LN("".concat(t.config.paths.vs,"/loader.js"));return n.onload=function(){return e()},n.onerror=t.reject,n}function FN(){var e=ea(function(n){var r=n.config,i=n.resolve,a=n.reject;return{config:r,resolve:i,reject:a}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(n){var r=n.m||n;jg(r),e.resolve(r)},function(n){e.reject(n)})}function jg(e){ea().monaco||Vo({monaco:e})}function BN(){return ea(function(e){var t=e.monaco;return t})}var Fs=new Promise(function(e,t){return Vo({resolve:e,reject:t})}),$g={config:IN,init:MN,__getMonacoInstance:BN},zN={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},Bs=zN,UN={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},jN=UN;function $N({children:e}){return pn.createElement("div",{style:jN.container},e)}var HN=$N,WN=HN;function qN({width:e,height:t,isEditorReady:n,loading:r,_ref:i,className:a,wrapperProps:o}){return pn.createElement("section",{style:{...Bs.wrapper,width:e,height:t},...o},!n&&pn.createElement(WN,null,r),pn.createElement("div",{ref:i,style:{...Bs.fullWidth,...!n&&Bs.hide},className:a}))}var GN=qN,Hg=R.memo(GN);function KN(e){R.useEffect(e,[])}var Wg=KN;function VN(e,t,n=!0){let r=R.useRef(!0);R.useEffect(r.current||!n?()=>{r.current=!1}:e,t)}var rt=VN;function _i(){}function br(e,t,n,r){return YN(e,r)||QN(e,t,n,r)}function YN(e,t){return e.editor.getModel(qg(e,t))}function QN(e,t,n,r){return e.editor.createModel(t,n,r?qg(e,r):void 0)}function qg(e,t){return e.Uri.parse(t)}function XN({original:e,modified:t,language:n,originalLanguage:r,modifiedLanguage:i,originalModelPath:a,modifiedModelPath:o,keepCurrentOriginalModel:s=!1,keepCurrentModifiedModel:l=!1,theme:c="light",loading:u="Loading...",options:d={},height:p="100%",width:f="100%",className:v,wrapperProps:x={},beforeMount:S=_i,onMount:h=_i}){let[g,y]=R.useState(!1),[E,N]=R.useState(!0),w=R.useRef(null),A=R.useRef(null),I=R.useRef(null),U=R.useRef(h),M=R.useRef(S),$=R.useRef(!1);Wg(()=>{let L=$g.init();return L.then(T=>(A.current=T)&&N(!1)).catch(T=>(T==null?void 0:T.type)!=="cancelation"&&console.error("Monaco initialization: error:",T)),()=>w.current?V():L.cancel()}),rt(()=>{if(w.current&&A.current){let L=w.current.getOriginalEditor(),T=br(A.current,e||"",r||n||"text",a||"");T!==L.getModel()&&L.setModel(T)}},[a],g),rt(()=>{if(w.current&&A.current){let L=w.current.getModifiedEditor(),T=br(A.current,t||"",i||n||"text",o||"");T!==L.getModel()&&L.setModel(T)}},[o],g),rt(()=>{let L=w.current.getModifiedEditor();L.getOption(A.current.editor.EditorOption.readOnly)?L.setValue(t||""):t!==L.getValue()&&(L.executeEdits("",[{range:L.getModel().getFullModelRange(),text:t||"",forceMoveMarkers:!0}]),L.pushUndoStop())},[t],g),rt(()=>{var L,T;(T=(L=w.current)==null?void 0:L.getModel())==null||T.original.setValue(e||"")},[e],g),rt(()=>{let{original:L,modified:T}=w.current.getModel();A.current.editor.setModelLanguage(L,r||n||"text"),A.current.editor.setModelLanguage(T,i||n||"text")},[n,r,i],g),rt(()=>{var L;(L=A.current)==null||L.editor.setTheme(c)},[c],g),rt(()=>{var L;(L=w.current)==null||L.updateOptions(d)},[d],g);let W=R.useCallback(()=>{var D;if(!A.current)return;M.current(A.current);let L=br(A.current,e||"",r||n||"text",a||""),T=br(A.current,t||"",i||n||"text",o||"");(D=w.current)==null||D.setModel({original:L,modified:T})},[n,t,i,e,r,a,o]),Y=R.useCallback(()=>{var L;!$.current&&I.current&&(w.current=A.current.editor.createDiffEditor(I.current,{automaticLayout:!0,...d}),W(),(L=A.current)==null||L.editor.setTheme(c),y(!0),$.current=!0)},[d,c,W]);R.useEffect(()=>{g&&U.current(w.current,A.current)},[g]),R.useEffect(()=>{!E&&!g&&Y()},[E,g,Y]);function V(){var T,D,O,P;let L=(T=w.current)==null?void 0:T.getModel();s||((D=L==null?void 0:L.original)==null||D.dispose()),l||((O=L==null?void 0:L.modified)==null||O.dispose()),(P=w.current)==null||P.dispose()}return pn.createElement(Hg,{width:f,height:p,isEditorReady:g,loading:u,_ref:I,className:v,wrapperProps:x})}var ZN=XN;R.memo(ZN);function JN(e){let t=R.useRef();return R.useEffect(()=>{t.current=e},[e]),t.current}var eT=JN,Ca=new Map;function tT({defaultValue:e,defaultLanguage:t,defaultPath:n,value:r,language:i,path:a,theme:o="light",line:s,loading:l="Loading...",options:c={},overrideServices:u={},saveViewState:d=!0,keepCurrentModel:p=!1,width:f="100%",height:v="100%",className:x,wrapperProps:S={},beforeMount:h=_i,onMount:g=_i,onChange:y,onValidate:E=_i}){let[N,w]=R.useState(!1),[A,I]=R.useState(!0),U=R.useRef(null),M=R.useRef(null),$=R.useRef(null),W=R.useRef(g),Y=R.useRef(h),V=R.useRef(),L=R.useRef(r),T=eT(a),D=R.useRef(!1),O=R.useRef(!1);Wg(()=>{let B=$g.init();return B.then(H=>(U.current=H)&&I(!1)).catch(H=>(H==null?void 0:H.type)!=="cancelation"&&console.error("Monaco initialization: error:",H)),()=>M.current?b():B.cancel()}),rt(()=>{var H,_,Z,ne;let B=br(U.current,e||r||"",t||i||"",a||n||"");B!==((H=M.current)==null?void 0:H.getModel())&&(d&&Ca.set(T,(_=M.current)==null?void 0:_.saveViewState()),(Z=M.current)==null||Z.setModel(B),d&&((ne=M.current)==null||ne.restoreViewState(Ca.get(a))))},[a],N),rt(()=>{var B;(B=M.current)==null||B.updateOptions(c)},[c],N),rt(()=>{!M.current||r===void 0||(M.current.getOption(U.current.editor.EditorOption.readOnly)?M.current.setValue(r):r!==M.current.getValue()&&(O.current=!0,M.current.executeEdits("",[{range:M.current.getModel().getFullModelRange(),text:r,forceMoveMarkers:!0}]),M.current.pushUndoStop(),O.current=!1))},[r],N),rt(()=>{var H,_;let B=(H=M.current)==null?void 0:H.getModel();B&&i&&((_=U.current)==null||_.editor.setModelLanguage(B,i))},[i],N),rt(()=>{var B;s!==void 0&&((B=M.current)==null||B.revealLine(s))},[s],N),rt(()=>{var B;(B=U.current)==null||B.editor.setTheme(o)},[o],N);let P=R.useCallback(()=>{var B;if(!(!$.current||!U.current)&&!D.current){Y.current(U.current);let H=a||n,_=br(U.current,r||e||"",t||i||"",H||"");M.current=(B=U.current)==null?void 0:B.editor.create($.current,{model:_,automaticLayout:!0,...c},u),d&&M.current.restoreViewState(Ca.get(H)),U.current.editor.setTheme(o),s!==void 0&&M.current.revealLine(s),w(!0),D.current=!0}},[e,t,n,r,i,a,c,u,d,o,s]);R.useEffect(()=>{N&&W.current(M.current,U.current)},[N]),R.useEffect(()=>{!A&&!N&&P()},[A,N,P]),L.current=r,R.useEffect(()=>{var B,H;N&&y&&((B=V.current)==null||B.dispose(),V.current=(H=M.current)==null?void 0:H.onDidChangeModelContent(_=>{O.current||y(M.current.getValue(),_)}))},[N,y]),R.useEffect(()=>{if(N){let B=U.current.editor.onDidChangeMarkers(H=>{var Z;let _=(Z=M.current.getModel())==null?void 0:Z.uri;if(_&&H.find(ne=>ne.path===_.path)){let ne=U.current.editor.getModelMarkers({resource:_});E==null||E(ne)}});return()=>{B==null||B.dispose()}}return()=>{}},[N,E]);function b(){var B,H;(B=V.current)==null||B.dispose(),p?d&&Ca.set(a,M.current.saveViewState()):(H=M.current.getModel())==null||H.dispose(),M.current.dispose()}return pn.createElement(Hg,{width:f,height:v,isEditorReady:N,loading:l,_ref:$,className:x,wrapperProps:S})}var nT=tT,rT=R.memo(nT),iT=rT;function aT({value:e,onChange:t,onEditorMount:n}){const r=R.useRef(null),i=a=>{r.current=a,n&&n(()=>a.getValue())};return m.jsx("div",{className:"h-full w-full overflow-hidden rounded-lg",children:m.jsx(iT,{height:"100%",defaultLanguage:"python",value:e,onChange:a=>t(a??""),onMount:i,theme:"vs-dark",options:{fontSize:13,fontFamily:'"JetBrains Mono", "Fira Code", monospace',fontLigatures:!0,minimap:{enabled:!1},scrollBeyondLastLine:!1,lineNumbers:"on",renderLineHighlight:"line",tabSize:4,insertSpaces:!0,wordWrap:"on",automaticLayout:!0,padding:{top:12,bottom:12}}})})}let zs=null,Aa=null;async function Qp(){return zs||Aa||(Aa=(async()=>{const e=await window.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"});return zs=e,e})(),Aa)}function oT(){const[e,t]=R.useState("idle"),n=R.useRef(null);return R.useEffect(()=>{if(t("loading"),window.loadPyodide)Qp().then(i=>{n.current=i,t("ready")}).catch(()=>t("error"));else{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js",i.onload=()=>{Qp().then(a=>{n.current=a,t("ready")}).catch(()=>t("error"))},i.onerror=()=>t("error"),document.head.appendChild(i)}},[]),{status:e,runCode:async i=>{const a=n.current;if(!a)return{stdout:"",stderr:"",error:"Pyodide not loaded yet."};const o=`
import sys
import io

_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture

_exec_error = None
try:
${i.split(`
`).map(s=>"    "+s).join(`
`)}
except Exception as _e:
    _exec_error = str(_e)
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

(_stdout_capture.getvalue(), _stderr_capture.getvalue(), _exec_error)
`;try{const s=await a.runPythonAsync(o),[l,c,u]=s;return{stdout:l,stderr:c,error:u}}catch(s){return{stdout:"",stderr:"",error:s instanceof Error?s.message:String(s)}}}}}function sT({getCode:e,testCode:t,onResult:n,onAllPassed:r}){const{status:i,runCode:a}=oT(),[o,s]=R.useState(!1),l=R.useCallback(async()=>{if(i!=="ready"||o)return;s(!0);const u=e()+`

`+t,d=await a(u);if(n(d),!d.error&&d.stdout){const p=d.stdout.split(`
`),f=p.some(x=>x.startsWith("[FAIL]"));p.some(x=>x.startsWith("[PASS]"))&&!f&&r()}s(!1)},[i,o,e,t,a,n,r]);return m.jsxs("div",{className:"flex items-center gap-2",children:[m.jsx("button",{onClick:l,disabled:i!=="ready"||o,className:`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${i==="ready"&&!o?"bg-emerald-600 hover:bg-emerald-500 text-white":"bg-gray-700 text-gray-400 cursor-not-allowed"}`,children:o?m.jsxs(m.Fragment,{children:[m.jsx("div",{className:"w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"}),"Running..."]}):m.jsxs(m.Fragment,{children:[m.jsx("span",{children:"▶"}),"Run Tests"]})}),i==="loading"&&m.jsx("span",{className:"text-xs text-gray-500 animate-pulse",children:"Loading Python runtime..."}),i==="error"&&m.jsx("span",{className:"text-xs text-red-400",children:"Failed to load Python runtime"}),i==="ready"&&m.jsx("span",{className:"text-xs text-gray-600",children:"Python ready"})]})}function lT({result:e,isRunning:t}){if(t)return m.jsx("div",{className:"h-full flex items-center justify-center",children:m.jsxs("div",{className:"text-center",children:[m.jsx("div",{className:"w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"}),m.jsx("p",{className:"text-gray-400 text-sm",children:"Running tests..."})]})});if(!e)return m.jsx("div",{className:"h-full flex items-center justify-center",children:m.jsxs("div",{className:"text-center text-gray-600",children:[m.jsx("p",{className:"text-4xl mb-3",children:"▶"}),m.jsx("p",{className:"text-sm",children:'Click "Run Tests" to execute your code'})]})});const n=e.stdout.split(`
`).filter(o=>o.trim()),r=n.filter(o=>o.startsWith("[PASS]")).length,i=n.filter(o=>o.startsWith("[FAIL]")).length,a=!!e.error;return m.jsxs("div",{className:"h-full flex flex-col overflow-hidden",children:[!a&&(r>0||i>0)&&m.jsx("div",{className:`px-4 py-2 text-sm font-medium border-b ${i===0?"bg-emerald-900/30 border-emerald-800 text-emerald-400":"bg-red-900/30 border-red-800 text-red-400"}`,children:i===0?`All ${r} tests passed`:`${i} failed, ${r} passed`}),m.jsxs("div",{className:"flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1",children:[a&&m.jsxs("div",{className:"bg-red-900/20 border border-red-800 rounded-lg p-3 mb-3",children:[m.jsx("p",{className:"text-red-400 font-semibold mb-1",children:"Error"}),m.jsx("pre",{className:"text-red-300 whitespace-pre-wrap",children:e.error})]}),n.map((o,s)=>{const l=o.startsWith("[PASS]"),c=o.startsWith("[FAIL]"),u=o.startsWith("[INFO]")||o.startsWith("Running")||o.startsWith("===");return m.jsx("div",{className:`px-2 py-0.5 rounded ${l?"text-emerald-400":c?"text-red-400 bg-red-900/10":u?"text-blue-400":"text-gray-300"}`,children:o},s)}),e.stderr&&m.jsxs("div",{className:"mt-2 text-yellow-500 text-xs",children:[m.jsx("p",{className:"font-semibold mb-1",children:"stderr:"}),m.jsx("pre",{className:"whitespace-pre-wrap",children:e.stderr})]})]})]})}const cT={easy:"text-emerald-400 bg-emerald-900/30 border-emerald-800",medium:"text-yellow-400 bg-yellow-900/30 border-yellow-800",hard:"text-red-400 bg-red-900/30 border-red-800"};function uT(){const{problemId:e}=vm(),t=un.find(g=>g.id===e),{isComplete:n,markComplete:r,saveCode:i,getSavedCode:a}=$o(),[o,s]=R.useState(""),[l,c]=R.useState(null),[u,d]=R.useState(!1),[p,f]=R.useState(null),v=R.useRef(null);R.useEffect(()=>{if(!t)return;const g=a(t.id);s(g??t.starterCode),c(null),d(!1),f(null)},[e]);const x=R.useCallback(g=>{s(g),t&&i(t.id,g)},[t,i]),S=R.useCallback(()=>{t&&r(t.id)},[t,r]);if(!t)return m.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-10 text-center",children:[m.jsx("p",{className:"text-gray-400",children:"Problem not found."}),m.jsx(Le,{to:"/practice",className:"text-emerald-400 hover:underline mt-4 inline-block",children:"Back to Practice"})]});const h=n(t.id);return m.jsxs("div",{className:"h-[calc(100vh-3.5rem)] flex flex-col",children:[m.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-950 shrink-0",children:[m.jsxs("div",{className:"flex items-center gap-3",children:[m.jsx(Le,{to:"/practice",className:"text-gray-400 hover:text-white transition-colors text-sm",children:"← Practice"}),m.jsx("span",{className:"text-gray-700",children:"/"}),m.jsx("span",{className:"text-white font-medium text-sm",children:t.title}),m.jsx("span",{className:`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${cT[t.difficulty]}`,children:t.difficulty}),m.jsx("span",{className:"text-xs text-gray-500",children:t.category})]}),h&&m.jsxs("div",{className:"flex items-center gap-1.5 text-emerald-400 text-sm",children:[m.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 20 20",children:m.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}),"Solved"]})]}),m.jsxs("div",{className:"flex-1 flex overflow-hidden",children:[m.jsx("div",{className:"w-[340px] shrink-0 flex flex-col border-r border-gray-800 overflow-y-auto bg-gray-950",children:m.jsxs("div",{className:"p-5 flex-1",children:[m.jsx(lu,{className:"prose-dark text-sm",rehypePlugins:[mu],components:{code:({className:g,children:y,...E})=>g?m.jsx("code",{className:g,...E,children:y}):m.jsx("code",{className:"bg-gray-800 text-emerald-400 px-1 py-0.5 rounded text-xs font-mono",...E,children:y})},children:t.description}),t.hints.length>0&&m.jsxs("div",{className:"mt-6",children:[m.jsx("p",{className:"text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2",children:"Hints"}),m.jsx("div",{className:"space-y-2",children:t.hints.map((g,y)=>m.jsxs("div",{className:"border border-gray-800 rounded-lg overflow-hidden",children:[m.jsxs("button",{onClick:()=>f(p===y?null:y),className:"w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:text-white transition-colors",children:[m.jsxs("span",{children:["Hint ",y+1]}),m.jsx("span",{children:p===y?"▲":"▼"})]}),p===y&&m.jsx("div",{className:"px-3 pb-3 text-xs text-gray-300 border-t border-gray-800 pt-2",children:g})]},y))})]})]})}),m.jsxs("div",{className:"flex-1 flex flex-col overflow-hidden border-r border-gray-800",children:[m.jsxs("div",{className:"flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900 shrink-0",children:[m.jsxs("div",{className:"flex items-center gap-2",children:[m.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-red-500/60"}),m.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-yellow-500/60"}),m.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-green-500/60"}),m.jsx("span",{className:"text-xs text-gray-500 ml-2 font-mono",children:"solution.py"})]}),m.jsx("button",{onClick:()=>x(t.starterCode),className:"text-xs text-gray-500 hover:text-gray-300 transition-colors",children:"Reset"})]}),m.jsx("div",{className:"flex-1 overflow-hidden",children:m.jsx(aT,{value:o,onChange:x,onEditorMount:g=>{v.current=g}})}),m.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-gray-900 shrink-0",children:[m.jsx(sT,{getCode:()=>{var g;return((g=v.current)==null?void 0:g.call(v))??o},testCode:t.testCode,onResult:c,onAllPassed:S}),m.jsx("button",{onClick:()=>d(!u),className:"text-xs text-gray-500 hover:text-gray-300 transition-colors",children:u?"Hide Solution":"Show Solution"})]}),u&&m.jsxs("div",{className:"border-t border-gray-800 bg-gray-950 p-4 max-h-64 overflow-y-auto",children:[m.jsx("p",{className:"text-xs text-yellow-500 mb-2 font-semibold",children:"Solution"}),m.jsx("pre",{className:"text-xs font-mono text-gray-300 whitespace-pre-wrap",children:t.solution})]})]}),m.jsxs("div",{className:"w-[320px] shrink-0 flex flex-col bg-gray-950",children:[m.jsx("div",{className:"px-4 py-2 border-b border-gray-800 bg-gray-900 shrink-0",children:m.jsx("span",{className:"text-xs text-gray-500 font-semibold uppercase tracking-wider",children:"Test Output"})}),m.jsx("div",{className:"flex-1 overflow-hidden",children:m.jsx(lT,{result:l,isRunning:!1})})]})]})]})}const dT={easy:"text-emerald-400 bg-emerald-900/30 border-emerald-800",medium:"text-yellow-400 bg-yellow-900/30 border-yellow-800",hard:"text-red-400 bg-red-900/30 border-red-800"},pT={"event-log-analyzer":["Data Processing","Hash Maps","Datetime"],"rate-limiter":["System Design","Sliding Window","Concurrency"],"agent-workflow":["Graphs","Topological Sort","DAG"]};function fT(){const{completedProblems:e,isComplete:t}=$o(),n=e.filter(i=>ba.some(a=>a.id===i)),r=Math.round(n.length/ba.length*100);return m.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-10",children:[m.jsxs("div",{className:"mb-8",children:[m.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[m.jsx("span",{className:"text-3xl",children:"🏭"}),m.jsx("h1",{className:"text-3xl font-bold text-white",children:"Real World Problems"})]}),m.jsx("p",{className:"text-gray-400 max-w-2xl",children:"Apply your DS&A skills to realistic engineering problems. These are open-ended challenges based on systems you'd actually build — event pipelines, rate limiters, workflow schedulers, and more."})]}),m.jsxs("div",{className:"bg-amber-900/20 border border-amber-800/50 rounded-xl p-5 mb-8",children:[m.jsxs("h2",{className:"text-amber-300 font-semibold mb-2 flex items-center gap-2",children:[m.jsx("span",{children:"⚡"})," How Real World Problems are Different"]}),m.jsxs("ul",{className:"text-sm text-amber-200/80 space-y-1.5 list-none",children:[m.jsx("li",{children:"• Problems have multiple parts that build on each other"}),m.jsx("li",{children:'• No single "right" algorithm — design decisions matter'}),m.jsx("li",{children:"• Edge cases are intentionally left for you to discover"}),m.jsx("li",{children:"• Focus on clean, production-quality Python code"})]})]}),m.jsxs("div",{className:"bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8",children:[m.jsxs("div",{className:"flex justify-between items-center mb-2",children:[m.jsx("span",{className:"text-sm text-gray-400",children:"Real World Progress"}),m.jsxs("span",{className:"text-sm font-mono text-emerald-400",children:[n.length," / ",ba.length," solved"]})]}),m.jsx("div",{className:"w-full bg-gray-800 rounded-full h-2",children:m.jsx("div",{className:"bg-amber-500 h-2 rounded-full transition-all duration-500",style:{width:`${r}%`}})})]}),m.jsx("div",{className:"space-y-4",children:ba.map((i,a)=>{const o=t(i.id),s=pT[i.id]??[];return m.jsx(Le,{to:`/practice/${i.id}`,className:"block bg-gray-900 border border-gray-800 rounded-xl px-6 py-5 hover:border-amber-600 transition-all group",children:m.jsxs("div",{className:"flex items-start justify-between gap-4",children:[m.jsxs("div",{className:"flex items-start gap-4",children:[m.jsx("div",{className:`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono ${o?"bg-emerald-500 border-emerald-500 text-white":"border-gray-600 text-gray-500 group-hover:border-amber-600"}`,children:o?m.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 20 20",children:m.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}):a+1}),m.jsxs("div",{children:[m.jsx("h3",{className:"text-white font-semibold text-lg group-hover:text-amber-400 transition-colors",children:i.title}),m.jsxs("div",{className:"flex flex-wrap items-center gap-2 mt-2",children:[m.jsx("span",{className:`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${dT[i.difficulty]}`,children:i.difficulty}),s.map(l=>m.jsx("span",{className:"text-xs px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400",children:l},l))]})]})]}),m.jsx("span",{className:"text-gray-600 group-hover:text-amber-600 transition-colors shrink-0 mt-1",children:"→"})]})},i.id)})}),m.jsx("div",{className:"mt-10 pt-6 border-t border-gray-800",children:m.jsx(Le,{to:"/practice",className:"text-sm text-gray-500 hover:text-emerald-400 transition-colors",children:"← Back to DS&A Practice"})})]})}const Xp=["O(1)","O(log n)","O(n)","O(n log n)","O(n²)","O(n³)","O(2ⁿ)","O(n!)"],ri=[{id:1,title:"Linear Search",category:"Loops",code:"```python\ndef find_element(arr, target):\n    for x in arr:\n        if x == target:\n            return True\n    return False\n```",timeComplexity:"O(n)",spaceComplexity:"O(1)",timeExplanation:"We visit each element at most once. Worst case: all n elements are checked.",spaceExplanation:"Only a loop variable — no extra memory proportional to input size."},{id:2,title:"Pair Sum Check (Brute Force)",category:"Loops",code:`\`\`\`python
def has_pair_sum(arr, target):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                return True
    return False
\`\`\``,timeComplexity:"O(n²)",spaceComplexity:"O(1)",timeExplanation:"Two nested loops — the outer runs n times, the inner runs up to n times → O(n²) comparisons.",spaceExplanation:"Only index variables. No data structures scaling with n."},{id:3,title:"Triple Sum Check",category:"Loops",code:`\`\`\`python
def triple_sum(arr, target):
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if arr[i] + arr[j] + arr[k] == target:
                    return True
    return False
\`\`\``,timeComplexity:"O(n³)",spaceComplexity:"O(1)",timeExplanation:"Three nested loops, each running up to n times → O(n³) iterations.",spaceExplanation:"Only index variables used — constant extra space."},{id:4,title:"Two Independent Loops",category:"Loops",code:`\`\`\`python
def process(arr):
    total = 0
    for x in arr:
        total += x

    result = []
    for x in arr:
        result.append(x * 2)

    return total, result
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"Two separate loops, each O(n). O(n) + O(n) = O(2n) = O(n). They don't multiply.",spaceExplanation:"`result` grows linearly with input size → O(n) space."},{id:5,title:"Halving Loop",category:"Loops",code:`\`\`\`python
def count_halvings(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count
\`\`\``,timeComplexity:"O(log n)",spaceComplexity:"O(1)",timeExplanation:"n is halved each iteration. It takes log₂(n) steps to reach 1.",spaceExplanation:"Only `count` and `n` are stored — constant space."},{id:6,title:"Binary Search (Iterative)",category:"Searching",code:`\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\``,timeComplexity:"O(log n)",spaceComplexity:"O(1)",timeExplanation:"Search space is halved each iteration → log₂(n) iterations.",spaceExplanation:"Only a few pointer variables — no call stack growth."},{id:7,title:"Binary Search (Recursive)",category:"Searching",code:`\`\`\`python
def binary_search(arr, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, right)
    else:
        return binary_search(arr, target, left, mid - 1)
\`\`\``,timeComplexity:"O(log n)",spaceComplexity:"O(log n)",timeExplanation:"Same as iterative — search space halves each call → O(log n) calls.",spaceExplanation:"Each recursive call adds a frame to the call stack. Depth = O(log n)."},{id:8,title:"Factorial (Recursive)",category:"Recursion",code:"```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n```",timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"One recursive call per integer from n down to 1 → n total calls.",spaceExplanation:"Call stack depth is n — each call waits for the next to return."},{id:9,title:"Fibonacci (Naive Recursive)",category:"Recursion",code:"```python\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n```",timeComplexity:"O(2ⁿ)",spaceComplexity:"O(n)",timeExplanation:"Each call spawns two more calls, creating a binary tree of depth n → ~2ⁿ nodes.",spaceExplanation:"Maximum call stack depth is n (the leftmost branch fib(n) → fib(n-1) → ...)."},{id:10,title:"Fibonacci (Memoized)",category:"Recursion",code:`\`\`\`python
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"Each subproblem is computed once and cached → n unique subproblems.",spaceExplanation:"Memo dict stores n entries + call stack depth up to n → O(n)."},{id:11,title:"Merge Sort",category:"Sorting",code:`\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)  # O(n) merge step
\`\`\``,timeComplexity:"O(n log n)",spaceComplexity:"O(n)",timeExplanation:"The array is divided log n times (tree height), and each level does O(n) merge work → O(n log n).",spaceExplanation:"Auxiliary arrays at each merge level total O(n) at any point in time."},{id:12,title:"Bubble Sort",category:"Sorting",code:`\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
\`\`\``,timeComplexity:"O(n²)",spaceComplexity:"O(1)",timeExplanation:"Two nested loops: O(n) outer × O(n) inner comparisons = O(n²).",spaceExplanation:"Sorted in-place using only a temp swap variable."},{id:13,title:"Insertion Sort",category:"Sorting",code:`\`\`\`python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
\`\`\``,timeComplexity:"O(n²)",spaceComplexity:"O(1)",timeExplanation:"Worst case: each element shifts past all previous elements → O(n²) total shifts.",spaceExplanation:"Sorted in-place — only `key` and index variables."},{id:14,title:"Fast Power (Divide & Conquer)",category:"Recursion",code:`\`\`\`python
def power(base, exp):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = power(base, exp // 2)
        return half * half
    return base * power(base, exp - 1)
\`\`\``,timeComplexity:"O(log n)",spaceComplexity:"O(log n)",timeExplanation:"exp is halved each even step → O(log n) recursive calls.",spaceExplanation:"Call stack depth matches recursion depth → O(log n)."},{id:15,title:"Two Pointers",category:"Data Structures",code:`\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (left, right)
        elif s < target:
            left += 1
        else:
            right -= 1
    return None
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(1)",timeExplanation:"Two pointers move toward each other; combined they traverse at most n elements.",spaceExplanation:"Only two pointer variables — no auxiliary data structure."},{id:16,title:"Find Duplicates with Hash Set",category:"Data Structures",code:`\`\`\`python
def has_duplicate(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return True
        seen.add(x)
    return False
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"One pass through the array; each hash set operation is O(1) average.",spaceExplanation:"`seen` can grow to hold up to n elements."},{id:17,title:"Build Prefix Sum Array",category:"Data Structures",code:`\`\`\`python
def prefix_sum(arr):
    n = len(arr)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + arr[i]
    return prefix
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"One pass through arr to fill n+1 values.",spaceExplanation:"`prefix` array has n+1 elements → O(n) extra space."},{id:18,title:"Hash Map Lookup",category:"Data Structures",code:`\`\`\`python
def two_sum(nums, target):
    seen = {}  # {value: index}
    for i, x in enumerate(nums):
        complement = target - x
        if complement in seen:
            return [seen[complement], i]
        seen[x] = i
    return []
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"Single pass; each hash map lookup/insert is O(1) average → O(n) total.",spaceExplanation:"`seen` stores up to n key-value pairs."},{id:19,title:"Matrix Transpose In-Place",category:"Data Structures",code:`\`\`\`python
def transpose(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    return matrix
\`\`\``,timeComplexity:"O(n²)",spaceComplexity:"O(1)",timeExplanation:"We swap each pair (i,j) where j > i — roughly n²/2 swaps → O(n²).",spaceExplanation:"In-place swap using tuple unpacking — no extra array needed."},{id:20,title:"Matrix Multiplication (n×n)",category:"Data Structures",code:`\`\`\`python
def multiply(A, B, n):
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    return C
\`\`\``,timeComplexity:"O(n³)",spaceComplexity:"O(n²)",timeExplanation:"Three nested loops each of size n → O(n³) multiplications.",spaceExplanation:"Result matrix C has n² entries."},{id:21,title:"Power Set",category:"Math & Combinatorics",code:"```python\ndef power_set(s):\n    result = [[]]\n    for elem in s:\n        result += [subset + [elem] for subset in result]\n    return result\n```",timeComplexity:"O(2ⁿ)",spaceComplexity:"O(2ⁿ)",timeExplanation:"Each element doubles the number of subsets → 2ⁿ subsets generated.",spaceExplanation:"Storing all 2ⁿ subsets in result."},{id:22,title:"Generate All Permutations",category:"Math & Combinatorics",code:`\`\`\`python
def permutations(arr, start=0):
    if start == len(arr) - 1:
        yield arr[:]
        return
    for i in range(start, len(arr)):
        arr[start], arr[i] = arr[i], arr[start]
        yield from permutations(arr, start + 1)
        arr[start], arr[i] = arr[i], arr[start]
\`\`\``,timeComplexity:"O(n!)",spaceComplexity:"O(n)",timeExplanation:"There are n! permutations of n elements, and we visit each one once.",spaceExplanation:"Permutations are generated in-place; call stack depth is n."},{id:23,title:"Count Digits",category:"Math & Combinatorics",code:`\`\`\`python
def count_digits(n):
    if n == 0:
        return 1
    count = 0
    while n > 0:
        n //= 10
        count += 1
    return count
\`\`\``,timeComplexity:"O(log n)",spaceComplexity:"O(1)",timeExplanation:"We divide by 10 each iteration — the number of decimal digits is ⌊log₁₀(n)⌋ + 1.",spaceExplanation:"Only `count` and `n` stored."},{id:24,title:"Sum to n (Closed Form)",category:"Math & Combinatorics",code:"```python\ndef sum_to_n(n):\n    return n * (n + 1) // 2\n```",timeComplexity:"O(1)",spaceComplexity:"O(1)",timeExplanation:"A single arithmetic formula — no loops or recursion.",spaceExplanation:"No extra memory allocated regardless of n."},{id:25,title:"Is Power of Two",category:"Math & Combinatorics",code:"```python\ndef is_power_of_two(n):\n    return n > 0 and (n & (n - 1)) == 0\n```",timeComplexity:"O(1)",spaceComplexity:"O(1)",timeExplanation:"A single bitwise AND operation. Powers of 2 have exactly one bit set, so n & (n-1) clears it.",spaceExplanation:"No memory allocation — just a bitwise check."},{id:26,title:"Reverse a String",category:"Strings",code:`\`\`\`python
def reverse_string(s):
    result = []
    for c in s:
        result.append(c)
    result.reverse()
    return "".join(result)
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(n)",timeExplanation:"We visit each character once → O(n). The join at the end is also O(n).",spaceExplanation:"`result` holds a copy of all n characters."},{id:27,title:"Check Palindrome",category:"Strings",code:`\`\`\`python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(1)",timeExplanation:"Two pointers meet in the middle — at most n/2 comparisons.",spaceExplanation:"Only two index variables used."},{id:28,title:"String Concatenation in Loop",category:"Strings",code:'```python\ndef build_string(chars):\n    result = ""\n    for c in chars:\n        result += c  # creates a new string each time\n    return result\n```',timeComplexity:"O(n²)",spaceComplexity:"O(n)",timeExplanation:"In Python (and many languages), strings are immutable. Each `+=` copies the existing string → 1 + 2 + ... + n = O(n²) total work.",spaceExplanation:"Final string is length n. Intermediate copies are garbage-collected → O(n) peak."},{id:29,title:"Sliding Window (Fixed Size)",category:"Data Structures",code:`\`\`\`python
def max_subarray_sum(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum
\`\`\``,timeComplexity:"O(n)",spaceComplexity:"O(1)",timeExplanation:"Initial window build is O(k), then one pass of n-k steps. Total O(n).",spaceExplanation:"Only `window_sum` and `max_sum` — no auxiliary array."},{id:30,title:"Heap Insert",category:"Data Structures",code:`\`\`\`python
def heap_insert(heap, val):
    heap.append(val)
    i = len(heap) - 1
    while i > 0:
        parent = (i - 1) // 2
        if heap[parent] > heap[i]:
            heap[parent], heap[i] = heap[i], heap[parent]
            i = parent
        else:
            break
\`\`\``,timeComplexity:"O(log n)",spaceComplexity:"O(1)",timeExplanation:"We bubble up from leaf to root. Heap height = O(log n) swaps in the worst case.",spaceExplanation:"In-place operation — only `i` and `parent` index variables."}],hT={Loops:"bg-blue-900/40 text-blue-300 border-blue-800",Searching:"bg-purple-900/40 text-purple-300 border-purple-800",Recursion:"bg-orange-900/40 text-orange-300 border-orange-800",Sorting:"bg-pink-900/40 text-pink-300 border-pink-800","Data Structures":"bg-teal-900/40 text-teal-300 border-teal-800","Math & Combinatorics":"bg-yellow-900/40 text-yellow-300 border-yellow-800",Strings:"bg-indigo-900/40 text-indigo-300 border-indigo-800"};function mT(){const[e,t]=R.useState(0),[n,r]=R.useState(""),[i,a]=R.useState(""),[o,s]=R.useState(!1),[l,c]=R.useState({}),u=ri[e],d=Object.keys(l).length,p=Object.values(l).filter(E=>E.timeOk&&E.spaceOk).length,f=n===u.timeComplexity,v=i===u.spaceComplexity;function x(){!n||!i||(s(!0),c(E=>({...E,[u.id]:{timeOk:f,spaceOk:v}})))}function S(E){t(E),r(""),a(""),s(!1)}function h(){e<ri.length-1&&S(e+1)}function g(){e>0&&S(e-1)}const y=l[u.id];return m.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-10",children:[m.jsxs("div",{className:"mb-8",children:[m.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[m.jsx("span",{className:"text-3xl",children:"⏱"}),m.jsx("h1",{className:"text-3xl font-bold text-white",children:"Big O Complexity Quiz"})]}),m.jsx("p",{className:"text-gray-400 max-w-2xl",children:"Read each code snippet and identify its time and space complexity. Select your answers and check to see if you're right. Work through all 30 examples to master complexity analysis."})]}),m.jsxs("div",{className:"bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 flex items-center justify-between",children:[m.jsxs("div",{className:"flex items-center gap-6",children:[m.jsxs("div",{children:[m.jsx("span",{className:"text-xs text-gray-500 uppercase tracking-wider",children:"Progress"}),m.jsxs("div",{className:"text-lg font-mono text-white mt-0.5",children:[e+1," ",m.jsxs("span",{className:"text-gray-500",children:["/ ",ri.length]})]})]}),m.jsx("div",{className:"w-px h-8 bg-gray-700"}),m.jsxs("div",{children:[m.jsx("span",{className:"text-xs text-gray-500 uppercase tracking-wider",children:"Score"}),m.jsxs("div",{className:"text-lg font-mono text-emerald-400 mt-0.5",children:[p," ",m.jsxs("span",{className:"text-gray-500",children:["/ ",d," checked"]})]})]})]}),m.jsx("div",{className:"hidden md:flex gap-1 flex-wrap max-w-xs justify-end",children:ri.map((E,N)=>{const w=l[E.id];return m.jsx("button",{onClick:()=>S(N),title:E.title,className:`w-3 h-3 rounded-full transition-colors ${N===e?"bg-white ring-1 ring-emerald-400":w?w.timeOk&&w.spaceOk?"bg-emerald-500":"bg-red-500":"bg-gray-700 hover:bg-gray-500"}`},E.id)})})]}),m.jsxs("div",{className:"bg-gray-900 border border-gray-800 rounded-xl overflow-hidden",children:[m.jsxs("div",{className:"px-6 py-4 border-b border-gray-800 flex items-center justify-between",children:[m.jsxs("div",{className:"flex items-center gap-3",children:[m.jsxs("span",{className:"text-gray-500 font-mono text-sm",children:["#",u.id]}),m.jsx("h2",{className:"text-white font-semibold",children:u.title}),m.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full border ${hT[u.category]??"bg-gray-800 text-gray-400 border-gray-700"}`,children:u.category})]}),y&&!o&&m.jsx("span",{className:`text-xs px-2.5 py-1 rounded-full border ${y.timeOk&&y.spaceOk?"bg-emerald-900/30 text-emerald-400 border-emerald-800":"bg-red-900/30 text-red-400 border-red-800"}`,children:y.timeOk&&y.spaceOk?"✓ Correct":"✗ Incorrect"})]}),m.jsx("div",{className:"px-6 pt-4 pb-2",children:m.jsx(lu,{rehypePlugins:[mu],components:{pre:({children:E})=>m.jsx("pre",{className:"bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed",children:E})},children:u.code})}),m.jsx("div",{className:"px-6 py-4",children:m.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[m.jsxs("div",{children:[m.jsx("label",{className:"block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider",children:"Time Complexity"}),m.jsxs("select",{value:n,onChange:E=>{o||r(E.target.value)},disabled:o,className:`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${o?f?"border-emerald-500 text-emerald-400":"border-red-500 text-red-400":"border-gray-700 text-gray-300 focus:border-emerald-500"}`,children:[m.jsx("option",{value:"",children:"Select complexity…"}),Xp.map(E=>m.jsx("option",{value:E,children:E},E))]}),o&&m.jsxs("div",{className:`mt-2 text-xs px-3 py-2 rounded-lg ${f?"bg-emerald-900/30 text-emerald-300 border border-emerald-800":"bg-red-900/30 text-red-300 border border-red-800"}`,children:[f?m.jsxs(m.Fragment,{children:["✓ Correct — ",u.timeComplexity]}):m.jsxs(m.Fragment,{children:["✗ Answer: ",m.jsx("strong",{children:u.timeComplexity})]}),m.jsx("p",{className:"mt-1 text-gray-400",children:u.timeExplanation})]})]}),m.jsxs("div",{children:[m.jsx("label",{className:"block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider",children:"Space Complexity"}),m.jsxs("select",{value:i,onChange:E=>{o||a(E.target.value)},disabled:o,className:`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${o?v?"border-emerald-500 text-emerald-400":"border-red-500 text-red-400":"border-gray-700 text-gray-300 focus:border-emerald-500"}`,children:[m.jsx("option",{value:"",children:"Select complexity…"}),Xp.map(E=>m.jsx("option",{value:E,children:E},E))]}),o&&m.jsxs("div",{className:`mt-2 text-xs px-3 py-2 rounded-lg ${v?"bg-emerald-900/30 text-emerald-300 border border-emerald-800":"bg-red-900/30 text-red-300 border border-red-800"}`,children:[v?m.jsxs(m.Fragment,{children:["✓ Correct — ",u.spaceComplexity]}):m.jsxs(m.Fragment,{children:["✗ Answer: ",m.jsx("strong",{children:u.spaceComplexity})]}),m.jsx("p",{className:"mt-1 text-gray-400",children:u.spaceExplanation})]})]})]})}),m.jsxs("div",{className:"px-6 py-4 border-t border-gray-800 flex items-center justify-between gap-4",children:[m.jsx("button",{onClick:g,disabled:e===0,className:"px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",children:"← Prev"}),m.jsx("div",{className:"flex gap-3",children:o?m.jsx("div",{className:`px-6 py-2 rounded-lg text-sm font-semibold ${f&&v?"bg-emerald-900/50 text-emerald-300 border border-emerald-700":"bg-red-900/50 text-red-300 border border-red-700"}`,children:f&&v?"🎉 Both correct!":f||v?"⚠ Partially correct":"✗ Try again next time"}):m.jsx("button",{onClick:x,disabled:!n||!i,className:"px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors",children:"Check Answer"})}),m.jsx("button",{onClick:h,disabled:e===ri.length-1,className:"px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",children:"Next →"})]})]}),m.jsxs("div",{className:"mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6",children:[m.jsx("h3",{className:"text-white font-semibold mb-4",children:"Big O Quick Reference"}),m.jsx("div",{className:"overflow-x-auto",children:m.jsxs("table",{className:"w-full text-sm",children:[m.jsx("thead",{children:m.jsxs("tr",{className:"border-b border-gray-700",children:[m.jsx("th",{className:"text-left text-gray-400 font-medium pb-2 pr-4",children:"Complexity"}),m.jsx("th",{className:"text-left text-gray-400 font-medium pb-2 pr-4",children:"Name"}),m.jsx("th",{className:"text-left text-gray-400 font-medium pb-2 pr-4",children:"n=10"}),m.jsx("th",{className:"text-left text-gray-400 font-medium pb-2",children:"Example"})]})}),m.jsx("tbody",{className:"divide-y divide-gray-800",children:[{complexity:"O(1)",name:"Constant",n10:"1",example:"Hash map lookup, array index"},{complexity:"O(log n)",name:"Logarithmic",n10:"3",example:"Binary search, heap ops"},{complexity:"O(n)",name:"Linear",n10:"10",example:"Single loop, linear scan"},{complexity:"O(n log n)",name:"Linearithmic",n10:"33",example:"Merge sort, heap sort"},{complexity:"O(n²)",name:"Quadratic",n10:"100",example:"Nested loops, bubble sort"},{complexity:"O(n³)",name:"Cubic",n10:"1,000",example:"Triple nested loops, naive matrix mult"},{complexity:"O(2ⁿ)",name:"Exponential",n10:"1,024",example:"Naive fibonacci, power set"},{complexity:"O(n!)",name:"Factorial",n10:"3,628,800",example:"All permutations, TSP brute force"}].map(({complexity:E,name:N,n10:w,example:A})=>m.jsxs("tr",{children:[m.jsx("td",{className:"py-2 pr-4 font-mono text-emerald-400",children:E}),m.jsx("td",{className:"py-2 pr-4 text-gray-300",children:N}),m.jsx("td",{className:"py-2 pr-4 text-gray-400 font-mono",children:w}),m.jsx("td",{className:"py-2 text-gray-500",children:A})]},E))})]})})]})]})}function gT(){return m.jsx(bx,{children:m.jsxs("div",{className:"min-h-screen bg-gray-950 flex flex-col",children:[m.jsx(wx,{}),m.jsx("main",{className:"flex-1",children:m.jsxs(dx,{children:[m.jsx(en,{path:"/",element:m.jsx(Nx,{})}),m.jsx(en,{path:"/learn",element:m.jsx(Ox,{})}),m.jsx(en,{path:"/learn/:topicId",element:m.jsx(VS,{})}),m.jsx(en,{path:"/practice",element:m.jsx(YS,{})}),m.jsx(en,{path:"/practice/:problemId",element:m.jsx(uT,{})}),m.jsx(en,{path:"/real-world",element:m.jsx(fT,{})}),m.jsx(en,{path:"/big-o",element:m.jsx(mT,{})})]})})]})})}Us.createRoot(document.getElementById("root")).render(m.jsx(pn.StrictMode,{children:m.jsx(gT,{})}));

import{k as ot,l as rt,m as it,n as lt,a as me,g as st,p as at,q as ut,r as ft,o as Z,t as ct,b as be,s as dt,d as ht}from"./index-c476d94f.js";import{r as b,o as H,Y as ee,d as te,A as V,X as Be,t as vt,c as z,z as pe,p as mt,m as bt,Z as pt,k as w,_ as yt,u as wt,T as _t,G as gt,H as Ot,F as Et,J as ye}from"./index-916bfcc9.js";var Fe=function(){if(typeof Map<"u")return Map;function e(t,n){var o=-1;return t.some(function(r,l){return r[0]===n?(o=l,!0):!1}),o}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(n){var o=e(this.__entries__,n),r=this.__entries__[o];return r&&r[1]},t.prototype.set=function(n,o){var r=e(this.__entries__,n);~r?this.__entries__[r][1]=o:this.__entries__.push([n,o])},t.prototype.delete=function(n){var o=this.__entries__,r=e(o,n);~r&&o.splice(r,1)},t.prototype.has=function(n){return!!~e(this.__entries__,n)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(n,o){o===void 0&&(o=null);for(var r=0,l=this.__entries__;r<l.length;r++){var s=l[r];n.call(o,s[1],s[0])}},t}()}(),R=typeof window<"u"&&typeof document<"u"&&window.document===document,I=function(){return typeof global<"u"&&global.Math===Math?global:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()}(),Ct=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(I):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}}(),Tt=2;function Mt(e,t){var n=!1,o=!1,r=0;function l(){n&&(n=!1,e()),o&&f()}function s(){Ct(l)}function f(){var u=Date.now();if(n){if(u-r<Tt)return;o=!0}else n=!0,o=!1,setTimeout(s,t);r=u}return f}var Pt=20,St=["top","right","bottom","left","width","height","size","weight"],xt=typeof MutationObserver<"u",zt=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=Mt(this.refresh.bind(this),Pt)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var n=this.observers_,o=n.indexOf(t);~o&&n.splice(o,1),!n.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(n){return n.gatherActive(),n.hasActive()});return t.forEach(function(n){return n.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!R||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),xt?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!R||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var n=t.propertyName,o=n===void 0?"":n,r=St.some(function(l){return!!~o.indexOf(l)});r&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),Le=function(e,t){for(var n=0,o=Object.keys(t);n<o.length;n++){var r=o[n];Object.defineProperty(e,r,{value:t[r],enumerable:!1,writable:!1,configurable:!0})}return e},P=function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||I},$e=N(0,0,0,0);function k(e){return parseFloat(e)||0}function we(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return t.reduce(function(o,r){var l=e["border-"+r+"-width"];return o+k(l)},0)}function At(e){for(var t=["top","right","bottom","left"],n={},o=0,r=t;o<r.length;o++){var l=r[o],s=e["padding-"+l];n[l]=k(s)}return n}function Bt(e){var t=e.getBBox();return N(0,0,t.width,t.height)}function Ft(e){var t=e.clientWidth,n=e.clientHeight;if(!t&&!n)return $e;var o=P(e).getComputedStyle(e),r=At(o),l=r.left+r.right,s=r.top+r.bottom,f=k(o.width),u=k(o.height);if(o.boxSizing==="border-box"&&(Math.round(f+l)!==t&&(f-=we(o,"left","right")+l),Math.round(u+s)!==n&&(u-=we(o,"top","bottom")+s)),!$t(e)){var c=Math.round(f+l)-t,d=Math.round(u+s)-n;Math.abs(c)!==1&&(f-=c),Math.abs(d)!==1&&(u-=d)}return N(r.left,r.top,f,u)}var Lt=function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof P(e).SVGGraphicsElement}:function(e){return e instanceof P(e).SVGElement&&typeof e.getBBox=="function"}}();function $t(e){return e===P(e).document.documentElement}function Dt(e){return R?Lt(e)?Bt(e):Ft(e):$e}function jt(e){var t=e.x,n=e.y,o=e.width,r=e.height,l=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,s=Object.create(l.prototype);return Le(s,{x:t,y:n,width:o,height:r,top:n,right:t+o,bottom:r+n,left:t}),s}function N(e,t,n,o){return{x:e,y:t,width:n,height:o}}var Wt=function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=N(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=Dt(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e}(),Vt=function(){function e(t,n){var o=jt(n);Le(this,{target:t,contentRect:o})}return e}(),It=function(){function e(t,n,o){if(this.activeObservations_=[],this.observations_=new Fe,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=n,this.callbackCtx_=o}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof P(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;n.has(t)||(n.set(t,new Wt(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof P(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;!n.has(t)||(n.delete(t),n.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(n){n.isActive()&&t.activeObservations_.push(n)})},e.prototype.broadcastActive=function(){if(!!this.hasActive()){var t=this.callbackCtx_,n=this.activeObservations_.map(function(o){return new Vt(o.target,o.broadcastRect())});this.callback_.call(t,n,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),De=typeof WeakMap<"u"?new WeakMap:new Fe,je=function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=zt.getInstance(),o=new It(t,n,this);De.set(this,o)}return e}();["observe","unobserve","disconnect"].forEach(function(e){je.prototype[e]=function(){var t;return(t=De.get(this))[e].apply(t,arguments)}});var We=function(){return typeof I.ResizeObserver<"u"?I.ResizeObserver:je}();const Ve=typeof window>"u"?global:window,kt=Ve.requestAnimationFrame,_e=Ve.cancelAnimationFrame;function ge(e){let t=0;const n=(...o)=>{t&&_e(t),t=kt(()=>{e(...o),t=0})};return n.cancel=()=>{_e(t),t=0},n}var Ht=Object.defineProperty,Oe=Object.getOwnPropertySymbols,Nt=Object.prototype.hasOwnProperty,Gt=Object.prototype.propertyIsEnumerable,Ee=(e,t,n)=>t in e?Ht(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,qt=(e,t)=>{for(var n in t||(t={}))Nt.call(t,n)&&Ee(e,n,t[n]);if(Oe)for(var n of Oe(t))Gt.call(t,n)&&Ee(e,n,t[n]);return e};const Yt=(e,t)=>{const n=qt({},e);for(const o of t)o in n&&delete n[o];return n};var Kt=Object.defineProperty,Ce=Object.getOwnPropertySymbols,Ut=Object.prototype.hasOwnProperty,Xt=Object.prototype.propertyIsEnumerable,Te=(e,t,n)=>t in e?Kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,A=(e,t)=>{for(var n in t||(t={}))Ut.call(t,n)&&Te(e,n,t[n]);if(Ce)for(var n of Ce(t))Xt.call(t,n)&&Te(e,n,t[n]);return e};const Jt=()=>{const{height:e,width:t}=rt();return{width:Math.min(t,window.innerWidth),height:Math.min(e,window.innerHeight)}},Me=(e,t)=>{var n,o;const r=e.getBoundingClientRect();return{top:r.top,bottom:r.bottom,left:r.left,right:r.right,scrollTop:r.top-t.top,scrollBottom:r.bottom-t.top,scrollLeft:r.left-t.left,scrollRight:r.right-t.left,width:(n=e.offsetWidth)!=null?n:e.clientWidth,height:(o=e.offsetHeight)!=null?o:e.clientHeight}},Zt=e=>{switch(e){case"top":case"tl":case"tr":return"top";case"bottom":case"bl":case"br":return"bottom";case"left":case"lt":case"lb":return"left";case"right":case"rt":case"rb":return"right";default:return"top"}},W=(e,t)=>{switch(t){case"top":switch(e){case"bottom":return"top";case"bl":return"tl";case"br":return"tr";default:return e}case"bottom":switch(e){case"top":return"bottom";case"tl":return"bl";case"tr":return"br";default:return e}case"left":switch(e){case"right":return"left";case"rt":return"lt";case"rb":return"lb";default:return e}case"right":switch(e){case"left":return"right";case"lt":return"rt";case"lb":return"rb";default:return e}default:return e}},Qt=(e,t,{containerRect:n,triggerRect:o,popupRect:r,offset:l,translate:s})=>{const f=Zt(e),u=Jt(),c={top:n.top+t.top,bottom:u.height-(n.top+t.top+r.height),left:n.left+t.left,right:u.width-(n.left+t.left+r.width)};let d=e;if(f==="top"&&c.top<0)if(o.top>r.height)t.top=-n.top;else{const v=B("bottom",o,r,{offset:l,translate:s});u.height-(n.top+v.top+r.height)>0&&(d=W(e,"bottom"),t.top=v.top)}if(f==="bottom"&&c.bottom<0)if(u.height-o.bottom>r.height)t.top=-n.top+(u.height-r.height);else{const v=B("top",o,r,{offset:l,translate:s});n.top+v.top>0&&(d=W(e,"top"),t.top=v.top)}if(f==="left"&&c.left<0)if(o.left>r.width)t.left=-n.left;else{const v=B("right",o,r,{offset:l,translate:s});u.width-(n.left+v.left+r.width)>0&&(d=W(e,"right"),t.left=v.left)}if(f==="right"&&c.right<0)if(u.width-o.right>r.width)t.left=-n.left+(u.width-r.width);else{const v=B("left",o,r,{offset:l,translate:s});n.left+v.left>0&&(d=W(e,"left"),t.left=v.left)}return(f==="top"||f==="bottom")&&(c.left<0?t.left=-n.left:c.right<0&&(t.left=-n.left+(u.width-r.width))),(f==="left"||f==="right")&&(c.top<0?t.top=-n.top:c.bottom<0&&(t.top=-n.top+(u.height-r.height))),{popupPosition:t,position:d}},B=(e,t,n,{offset:o=0,translate:r=[0,0]}={})=>{var l;const s=(l=ot(r)?r:r[e])!=null?l:[0,0];switch(e){case"top":return{left:t.scrollLeft+Math.round(t.width/2)-Math.round(n.width/2)+s[0],top:t.scrollTop-n.height-o+s[1]};case"tl":return{left:t.scrollLeft+s[0],top:t.scrollTop-n.height-o+s[1]};case"tr":return{left:t.scrollRight-n.width+s[0],top:t.scrollTop-n.height-o+s[1]};case"bottom":return{left:t.scrollLeft+Math.round(t.width/2)-Math.round(n.width/2)+s[0],top:t.scrollBottom+o+s[1]};case"bl":return{left:t.scrollLeft+s[0],top:t.scrollBottom+o+s[1]};case"br":return{left:t.scrollRight-n.width+s[0],top:t.scrollBottom+o+s[1]};case"left":return{left:t.scrollLeft-n.width-o+s[0],top:t.scrollTop+Math.round(t.height/2)-Math.round(n.height/2)+s[1]};case"lt":return{left:t.scrollLeft-n.width-o+s[0],top:t.scrollTop+s[1]};case"lb":return{left:t.scrollLeft-n.width-o+s[0],top:t.scrollBottom-n.height+s[1]};case"right":return{left:t.scrollRight+o+s[0],top:t.scrollTop+Math.round(t.height/2)-Math.round(n.height/2)+s[1]};case"rt":return{left:t.scrollRight+o+s[0],top:t.scrollTop+s[1]};case"rb":return{left:t.scrollRight+o+s[0],top:t.scrollBottom-n.height+s[1]};default:return{left:0,top:0}}},Rt=e=>{let t="0";["top","bottom"].includes(e)?t="50%":["left","lt","lb","tr","br"].includes(e)&&(t="100%");let n="0";return["left","right"].includes(e)?n="50%":["top","tl","tr","lt","rt"].includes(e)&&(n="100%"),`${t} ${n}`},en=(e,t,n,o,{offset:r=0,translate:l=[0,0],customStyle:s={},autoFitPosition:f=!1}={})=>{let u=e,c=B(e,n,o,{offset:r,translate:l});if(f){const v=Qt(e,c,{containerRect:t,popupRect:o,triggerRect:n,offset:r,translate:l});c=v.popupPosition,u=v.position}return{style:A({left:`${c.left}px`,top:`${c.top}px`},s),position:u}},tn=(e,t,n,{customStyle:o={}})=>{if(["top","tl","tr","bottom","bl","br"].includes(e)){let l=Math.abs(t.scrollLeft+t.width/2-n.scrollLeft);return l>n.width-8&&(t.width>n.width?l=n.width/2:l=n.width-8),["top","tl","tr"].includes(e)?A({left:`${l}px`,bottom:"0",transform:"translate(-50%,50%) rotate(45deg)"},o):A({left:`${l}px`,top:"0",transform:"translate(-50%,-50%) rotate(45deg)"},o)}let r=Math.abs(t.scrollTop+t.height/2-n.scrollTop);return r>n.height-8&&(t.height>n.height?r=n.height/2:r=n.height-8),["left","lt","lb"].includes(e)?A({top:`${r}px`,right:"0",transform:"translate(50%,-50%) rotate(45deg)"},o):A({top:`${r}px`,left:"0",transform:"translate(-50%,-50%) rotate(45deg)"},o)},nn=e=>e.scrollHeight>e.offsetHeight||e.scrollWidth>e.offsetWidth,Pe=e=>{var t;const n=[];let o=e;for(;o&&o!==document.documentElement;)nn(o)&&n.push(o),o=(t=o.parentElement)!=null?t:void 0;return n},Ie=()=>{const e={},t=b(),n=()=>{const o=it(e.value);o!==t.value&&(t.value=o)};return H(()=>n()),ee(()=>n()),{children:e,firstElement:t}};var Se=te({name:"ResizeObserver",props:{watchOnUpdated:Boolean},emits:["resize"],setup(e,{emit:t,slots:n}){const{children:o,firstElement:r}=Ie();let l;const s=u=>{!u||(l=new We(c=>{const d=c[0];t("resize",d)}),l.observe(u))},f=()=>{l&&(l.disconnect(),l=null)};return V(r,u=>{l&&f(),u&&s(u)}),Be(()=>{l&&f()}),()=>{var u;return o.value=(u=n.default)==null?void 0:u.call(n),o.value}}});function on(e,t){const n=b(e[t]);return ee(()=>{const o=e[t];n.value!==o&&(n.value=o)}),n}const xe=Symbol("ArcoTrigger"),rn=({elementRef:e,onResize:t})=>{let n;return{createResizeObserver:()=>{!e.value||(n=new We(l=>{const s=l[0];lt(t)&&t(s)}),n.observe(e.value))},destroyResizeObserver:()=>{n&&(n.disconnect(),n=null)}}};var ln=te({name:"ClientOnly",setup(e,{slots:t}){const n=b(!1);return H(()=>n.value=!0),()=>{var o;return n.value?(o=t.default)==null?void 0:o.call(t):null}}});const sn=({popupContainer:e,visible:t,defaultContainer:n="body",documentContainer:o})=>{const r=b(e.value),l=b(),s=()=>{const f=me(e.value),u=f?e.value:n,c=f!=null?f:o?document.documentElement:me(n);u!==r.value&&(r.value=u),c!==l.value&&(l.value=c)};return H(()=>s()),V(t,f=>{r.value!==e.value&&f&&s()}),{teleportContainer:r,containerRef:l}};var an=Object.defineProperty,un=Object.defineProperties,fn=Object.getOwnPropertyDescriptors,ze=Object.getOwnPropertySymbols,cn=Object.prototype.hasOwnProperty,dn=Object.prototype.propertyIsEnumerable,Ae=(e,t,n)=>t in e?an(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,hn=(e,t)=>{for(var n in t||(t={}))cn.call(t,n)&&Ae(e,n,t[n]);if(ze)for(var n of ze(t))dn.call(t,n)&&Ae(e,n,t[n]);return e},vn=(e,t)=>un(e,fn(t));const mn=["onClick","onMouseenter","onMouseleave","onFocusin","onFocusout","onContextmenu"];var Q=te({name:"Trigger",inheritAttrs:!1,props:{popupVisible:{type:Boolean,default:void 0},defaultPopupVisible:{type:Boolean,default:!1},trigger:{type:[String,Array],default:"hover"},position:{type:String,default:"bottom"},disabled:{type:Boolean,default:!1},popupOffset:{type:Number,default:0},popupTranslate:{type:[Array,Object]},showArrow:{type:Boolean,default:!1},alignPoint:{type:Boolean,default:!1},popupHoverStay:{type:Boolean,default:!0},blurToClose:{type:Boolean,default:!0},clickToClose:{type:Boolean,default:!0},clickOutsideToClose:{type:Boolean,default:!0},unmountOnClose:{type:Boolean,default:!0},contentClass:{type:[String,Array,Object]},contentStyle:{type:Object},arrowClass:{type:[String,Array,Object]},arrowStyle:{type:Object},popupStyle:{type:Object},animationName:{type:String,default:"fade-in"},duration:{type:[Number,Object]},mouseEnterDelay:{type:Number,default:100},mouseLeaveDelay:{type:Number,default:100},focusDelay:{type:Number,default:0},autoFitPopupWidth:{type:Boolean,default:!1},autoFitPopupMinWidth:{type:Boolean,default:!1},autoFixPosition:{type:Boolean,default:!0},popupContainer:{type:[String,Object]},updateAtScroll:{type:Boolean,default:!1},autoFitTransformOrigin:{type:Boolean,default:!1},hideEmpty:{type:Boolean,default:!1},openedClass:{type:[String,Array,Object]},autoFitPosition:{type:Boolean,default:!0},renderToBody:{type:Boolean,default:!0},preventFocus:{type:Boolean,default:!1},scrollToClose:{type:Boolean,default:!1},scrollToCloseDistance:{type:Number,default:0}},emits:{"update:popupVisible":e=>!0,popupVisibleChange:e=>!0,show:()=>!0,hide:()=>!0,resize:()=>!0},setup(e,{emit:t,slots:n,attrs:o}){const{popupContainer:r}=vt(e),l=st("trigger"),s=z(()=>Yt(o,mn)),f=pe(at,void 0),u=z(()=>[].concat(e.trigger)),c=new Set,d=pe(xe,void 0),{children:v,firstElement:S}=Ie(),C=b(),ne=b(e.defaultPopupVisible),F=b(e.position),oe=b({}),re=b({}),ie=b({}),ke=b(),_=b({top:0,left:0});let L=null,$=null;const h=z(()=>{var i;return(i=e.popupVisible)!=null?i:ne.value}),{teleportContainer:He,containerRef:G}=sn({popupContainer:r,visible:h,documentContainer:!0}),{zIndex:Ne}=ut("popup",{visible:h});let x=0,g=!1,q=!1;const Ge=()=>{x&&(window.clearTimeout(x),x=0)},Y=i=>{if(e.alignPoint){const{pageX:a,pageY:m}=i;_.value={top:m,left:a}}},O=()=>{if(!S.value||!C.value||!G.value)return;const i=G.value.getBoundingClientRect(),a=e.alignPoint?{top:_.value.top,bottom:_.value.top,left:_.value.left,right:_.value.left,scrollTop:_.value.top,scrollBottom:_.value.top,scrollLeft:_.value.left,scrollRight:_.value.left,width:0,height:0}:Me(S.value,i),m=()=>Me(C.value,i),T=m(),{style:E,position:M}=en(e.position,i,a,T,{offset:e.popupOffset,translate:e.popupTranslate,customStyle:e.popupStyle,autoFitPosition:e.autoFitPosition});e.autoFitTransformOrigin&&(re.value={transformOrigin:Rt(M)}),e.autoFitPopupMinWidth?E.minWidth=`${a.width}px`:e.autoFitPopupWidth&&(E.width=`${a.width}px`),F.value!==M&&(F.value=M),oe.value=E,e.showArrow&&ye(()=>{ie.value=tn(M,a,m(),{customStyle:e.arrowStyle})})},p=(i,a)=>{if(i===h.value&&x===0)return;const m=()=>{ne.value=i,t("update:popupVisible",i),t("popupVisibleChange",i),i&&ye(()=>{O()})};i||(L=null,$=null),a?(Ge(),i!==h.value&&(x=window.setTimeout(m,a))):m()},qe=i=>{var a;(a=o.onClick)==null||a.call(o,i),!(e.disabled||h.value&&!e.clickToClose)&&(u.value.includes("click")?(Y(i),p(!h.value)):u.value.includes("contextMenu")&&h.value&&p(!1))},le=i=>{var a;(a=o.onMouseenter)==null||a.call(o,i),!(e.disabled||!u.value.includes("hover"))&&(Y(i),p(!0,e.mouseEnterDelay))},se=i=>{d==null||d.onMouseenter(i),le(i)},ae=i=>{var a;(a=o.onMouseleave)==null||a.call(o,i),!(e.disabled||!u.value.includes("hover"))&&p(!1,e.mouseLeaveDelay)},ue=i=>{d==null||d.onMouseleave(i),ae(i)},Ye=i=>{var a;(a=o.onFocusin)==null||a.call(o,i),!(e.disabled||!u.value.includes("focus"))&&p(!0,e.focusDelay)},Ke=i=>{var a;(a=o.onFocusout)==null||a.call(o,i),!(e.disabled||!u.value.includes("focus"))&&(!e.blurToClose||p(!1))},Ue=i=>{var a;(a=o.onContextmenu)==null||a.call(o,i),!(e.disabled||!u.value.includes("contextMenu")||h.value&&!e.clickToClose)&&(Y(i),p(!h.value),i.preventDefault())};mt(xe,bt({onMouseenter:se,onMouseleave:ue,addChildRef:i=>{c.add(i),d==null||d.addChildRef(i)},removeChildRef:i=>{c.delete(i),d==null||d.removeChildRef(i)}}));const K=()=>{be(document.documentElement,"mousedown",U),g=!1},fe=on(n,"content"),Xe=z(()=>{var i;return e.hideEmpty&&ft((i=fe.value)==null?void 0:i.call(fe))}),U=i=>{var a,m,T;if(!(((a=S.value)==null?void 0:a.contains(i.target))||((m=C.value)==null?void 0:m.contains(i.target)))){for(const E of c)if((T=E.value)!=null&&T.contains(i.target))return;K(),p(!1)}},ce=(i,a)=>{const[m,T]=i,{scrollTop:E,scrollLeft:M}=a;return Math.abs(E-m)>=e.scrollToCloseDistance||Math.abs(M-T)>=e.scrollToCloseDistance},D=ge(i=>{if(h.value)if(e.scrollToClose||(f==null?void 0:f.scrollToClose)){const a=i.target;L||(L=[a.scrollTop,a.scrollLeft]),ce(L,a)?p(!1):O()}else O()}),de=()=>{be(window,"scroll",he),q=!1},he=ge(i=>{const a=i.target.documentElement;$||($=[a.scrollTop,a.scrollLeft]),ce($,a)&&(p(!1),de())}),X=()=>{h.value&&O()},Je=()=>{X(),t("resize")},Ze=i=>{e.preventFocus&&i.preventDefault()};d==null||d.addChildRef(C);const Qe=z(()=>h.value?e.openedClass:void 0);let y;V(h,i=>{if(e.clickOutsideToClose&&(!i&&g?K():i&&!g&&(Z(document.documentElement,"mousedown",U),g=!0)),(e.scrollToClose||(f==null?void 0:f.scrollToClose))&&(Z(window,"scroll",he),q=!0),e.updateAtScroll||(f==null?void 0:f.updateAtScroll)){if(i){y=Pe(S.value);for(const a of y)a.addEventListener("scroll",D)}else if(y){for(const a of y)a.removeEventListener("scroll",D);y=void 0}}i&&(J.value=!0)}),V(()=>[e.autoFitPopupWidth,e.autoFitPopupMinWidth],()=>{h.value&&O()});const{createResizeObserver:Re,destroyResizeObserver:et}=rn({elementRef:G,onResize:X});H(()=>{if(Re(),h.value&&(O(),e.clickOutsideToClose&&!g&&(Z(document.documentElement,"mousedown",U),g=!0),e.updateAtScroll||(f==null?void 0:f.updateAtScroll))){y=Pe(S.value);for(const i of y)i.addEventListener("scroll",D)}}),ee(()=>{h.value&&O()}),pt(()=>{p(!1)}),Be(()=>{if(d==null||d.removeChildRef(C),et(),g&&K(),q&&de(),y){for(const i of y)i.removeEventListener("scroll",D);y=void 0}});const J=b(h.value),j=b(!1),ve=()=>{j.value=!0},tt=()=>{j.value=!1,h.value&&t("show")},nt=()=>{j.value=!1,h.value||(J.value=!1,t("hide"))};return()=>{var i,a;return v.value=(a=(i=n.default)==null?void 0:i.call(n))!=null?a:[],ct(v.value,{class:Qe.value,onClick:qe,onMouseenter:le,onMouseleave:ae,onFocusin:Ye,onFocusout:Ke,onContextmenu:Ue}),w(Et,null,[e.autoFixPosition?w(Se,{onResize:Je},{default:()=>[v.value]}):v.value,w(ln,null,{default:()=>[w(yt,{to:He.value,disabled:!e.renderToBody},{default:()=>[(!e.unmountOnClose||h.value||J.value)&&!Xe.value&&w(Se,{onResize:X},{default:()=>[w("div",wt({ref:C,class:[`${l}-popup`,`${l}-position-${F.value}`],style:vn(hn({},oe.value),{zIndex:Ne.value,pointerEvents:j.value?"none":"auto"}),"trigger-placement":F.value,onMouseenter:se,onMouseleave:ue,onMousedown:Ze},s.value),[w(_t,{name:e.animationName,duration:e.duration,appear:!0,onBeforeEnter:ve,onAfterEnter:tt,onBeforeLeave:ve,onAfterLeave:nt},{default:()=>{var m;return[gt(w("div",{class:`${l}-popup-wrapper`,style:re.value},[w("div",{class:[`${l}-content`,e.contentClass],style:e.contentStyle},[(m=n.content)==null?void 0:m.call(n)]),e.showArrow&&w("div",{ref:ke,class:[`${l}-arrow`,e.arrowClass],style:ie.value},null)]),[[Ot,h.value]])]}})])]})]})]})])}}});const _n=Object.assign(Q,{install:(e,t)=>{dt(e,t);const n=ht(t);e.component(n+Q.name,Q)}});export{Se as R,_n as T,_e as c,We as i,Yt as o,kt as r,ge as t,on as u};
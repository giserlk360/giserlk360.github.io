import{g as d,e as k,_ as m}from"./index-c476d94f.js";import{d as f,c as r,b as p,h as v,j as y,n as $,g as u}from"./index-916bfcc9.js";const h=f({name:"IconEye",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=d("icon"),o=r(()=>[n,`${n}-eye`,{[`${n}-spin`]:e.spin}]),s=r(()=>{const i={};return e.size&&(i.fontSize=k(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:o,innerStyle:s,onClick:i=>{t("click",i)}}}}),g=["stroke-width","stroke-linecap","stroke-linejoin"],C=u("path",{"clip-rule":"evenodd",d:"M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z"},null,-1),b=u("path",{d:"M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"},null,-1),_=[C,b];function w(e,t,n,o,s,l){return p(),v("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:y(e.cls),style:$(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...i)=>e.onClick&&e.onClick(...i))},_,14,g)}var a=m(h,[["render",w]]);const I=Object.assign(a,{install:(e,t)=>{var n;const o=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(o+a.name,a)}}),z=f({name:"IconPlus",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=d("icon"),o=r(()=>[n,`${n}-plus`,{[`${n}-spin`]:e.spin}]),s=r(()=>{const i={};return e.size&&(i.fontSize=k(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:o,innerStyle:s,onClick:i=>{t("click",i)}}}}),S=["stroke-width","stroke-linecap","stroke-linejoin"],j=u("path",{d:"M5 24h38M24 5v38"},null,-1),L=[j];function N(e,t,n,o,s,l){return p(),v("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:y(e.cls),style:$(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...i)=>e.onClick&&e.onClick(...i))},L,14,S)}var c=m(z,[["render",N]]);const E=Object.assign(c,{install:(e,t)=>{var n;const o=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(o+c.name,c)}});export{E as I,I as a};
import{U as B,r as v,A as M,o as N,a as P,b as S,e as I,a1 as V,h as k,g as y,f as g,k as i,K as p,a2 as F,D as L,a3 as E,a4 as R}from"./index-6163c59b.js";import{_ as C}from"./_plugin-vue_export-helper-c4cb8a60.js";import{M as z}from"./index-7edc1596.js";import{B as J}from"./index-078b55c4.js";import{F as T,a as $}from"./index-020e0618.js";import"./index-adf085d9.js";import{I as A}from"./index-6552a476.js";import"./pick-375641d0.js";import"./index-3eb6fbb9.js";import"./index-ce5ef787.js";import"./index-1139756c.js";import"./use-cursor-cf62255a.js";const x=B("svgmap",()=>{let l=v("./svg/320000.svg"),e=v({bounds:[[115.7468,29.7782],[122.8148,35.3539]],dimensions:[941,770],data:[{name:"\u5357\u4EAC",value:[118.7794,32.0395]},{name:"\u82CF\u5DDE",value:[120.5905,31.3094]},{name:"\u5357\u901A",value:[120.89,32.0049]}]});function r(c){l.value=c}function t(c){e.value=c}return{svgUrl:l,updateSvgUrl:r,pointConfig:e,updatePointConfig:t}});const D={__name:"EchartsSvg",setup(l){const e=x(),r=v(),t=v(),c=async(o,s)=>{try{const n=await fetch(s);if(n.status==200){const h=await n.text();return V(o,{svg:h}),!0}else z.error("\u65E0\u5730\u56FE\u8D44\u6E90\uFF01\uFF01\uFF01")}catch(n){return console.log(n),!1}},d=async()=>{const o=e.svgUrl;t.value=a(),await c(t.value.geo.map,o)&&b()},a=()=>({geo:{left:0,top:0,right:0,bottom:0,map:"svgMap",roam:!0,layoutCenter:["50%","50%"],layoutSize:"100%",itemStyle:{borderWidth:0,color:"transparent"},select:{label:{show:!0,color:"#fff",fontSize:12},itemStyle:{color:"#ffff33",borderColor:"#ebc11e",borderWidth:4}},label:{show:!1},emphasis:{focus:"none",itemStyle:{areaColor:"#2080D7",borderColor:"#2B91B7",borderWidth:2,opacity:1,shadowColor:"rgba(74, 188, 251, 0.4)",shadowBlur:3,shadowOffsetX:3,shadowOffsetY:5},label:{show:!1,color:"#fff",fontSize:12}},tooltip:{show:!0,padding:0,formatter:function(o){return o.name}}},tooltip:{show:!0},series:[{type:"scatter",coordinateSystem:"geo",geoIndex:0,data:[]}]}),f=()=>{var o;(o=r.value)==null||o.setOption(t.value,!0)},u=o=>{const s=e.pointConfig.bounds[0],n=e.pointConfig.bounds[1],h=e.pointConfig.dimensions[0],w=e.pointConfig.dimensions[1],O=h/(n[0]-s[0]),U=w/(n[1]-s[1]);return _(o,n,s,U,O)},_=(o,s,n,h,w)=>[Math.abs(o[0]-n[0])*w,Math.abs(o[1]-s[1])*h],b=()=>{const s=e.pointConfig.data.map(n=>({name:n.name,value:u(n.value),symbol:"image://imgs/point.png",symbolSize:[35,35]}));t.value.series[0].data=s,f()},m=o=>{const s=[o.event.offsetX,o.event.offsetY],n=r.value.convertFromPixel({geoIndex:0},s);console.log("\u{1F680} ~ clickMap ~ dataPoint:",n)};return M(()=>e.svgUrl,()=>{d()}),M(()=>e.pointConfig,()=>{b()},{immediate:!1,deep:!0}),N(()=>{d()}),(o,s)=>{const n=P("v-chart");return S(),I(n,{ref_key:"svgMapRef",ref:r,autoresize:"",class:"map-content",onClick:m},null,512)}}},W=C(D,[["__scopeId","data-v-eed71dd9"]]);const j={class:"tools"},X={__name:"Tools",setup(l){const e=x(),r=v(null),t=d=>{const a=d.target.files[0];if(!a)return;const f=new FileReader;f.onload=u=>{const _=URL.createObjectURL(new Blob([u.target.result]));console.log("\u{1F680} ~ uploadFile ~ url:",_),e.updateSvgUrl(_),window.addEventListener("beforeunload",function(){URL.revokeObjectURL(_)})},f.readAsText(a)},c=()=>{r.value.click()};return(d,a)=>(S(),k("div",j,[y("div",{class:"btn-group"},[y("div",{class:"btn",onClick:c},"\u4E0A\u4F20svg")]),y("input",{ref_key:"fileInput",ref:r,type:"file",accept:".svg",style:{display:"none"},onChange:t},null,544)]))}},Y=C(X,[["__scopeId","data-v-49065650"]]);const G=l=>(E("data-v-e3547ac9"),l=l(),R(),l),K=G(()=>y("div",{class:"title"},"\u7ECF\u7EAC\u5EA6\u6253\u70B9",-1)),q={__name:"PointsInfo",setup(l){const e=x(),r={autorefresh:!0,smartIndent:!0,tabSize:4,mode:"application/json",theme:"dracula",matchBrackets:!0,lineWrapping:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter","CodeMirror-lint-markers"],lint:!1,lineNumbers:!0,indentUnit:2,foldGutter:!0,styleActiveLine:!0},t=v({bounds:JSON.stringify(e.pointConfig.bounds),dimensions:JSON.stringify(e.pointConfig.dimensions),data:JSON.stringify(e.pointConfig.data,null,2)}),c=()=>{console.log(t);const d={...t.value};e.updatePointConfig({bounds:JSON.parse(d.bounds),dimensions:JSON.parse(d.dimensions),data:JSON.parse(d.data)})};return(d,a)=>{const f=A,u=$,_=J,b=T;return S(),I(b,{model:p(t),class:"formLayout",onSubmit:c},{default:g(()=>[K,i(u,{field:"bounds",label:"\u56DB\u81F3\u8303\u56F4"},{default:g(()=>[i(f,{modelValue:p(t).bounds,"onUpdate:modelValue":a[0]||(a[0]=m=>p(t).bounds=m),placeholder:"\u8BF7\u8F93\u5165\u56DB\u81F3\u8303\u56F4[[\u5DE6\u4E0B\u89D2\u7ECF\u7EAC\u5EA6], [\u53F3\u4E0A\u89D2\u7ECF\u7EAC\u5EA6]]"},null,8,["modelValue"])]),_:1}),i(u,{field:"dimensions",label:"svg\u5C3A\u5BF8"},{default:g(()=>[i(f,{modelValue:p(t).dimensions,"onUpdate:modelValue":a[1]||(a[1]=m=>p(t).dimensions=m),placeholder:"\u8BF7\u8F93\u5165svg\u5C3A\u5BF8[\u5BBD, \u9AD8]"},null,8,["modelValue"])]),_:1}),i(u,{field:"data",label:"\u70B9\u6570\u636E"},{default:g(()=>[i(p(F),{value:p(t).data,"onUpdate:value":a[2]||(a[2]=m=>p(t).data=m),options:r,height:300},null,8,["value"])]),_:1}),i(u,null,{default:g(()=>[i(_,{"html-type":"submit",onClick:c},{default:g(()=>[L("\u786E\u5B9A")]),_:1})]),_:1})]),_:1},8,["model"])}}},H=C(q,[["__scopeId","data-v-e3547ac9"]]);const Q={class:"mapView w-full min-h-[calc(100vh-58px)]"},Z={__name:"index",setup(l){return(e,r)=>(S(),k("div",Q,[i(W),i(Y),i(H)]))}},pe=C(Z,[["__scopeId","data-v-2baf9efd"]]);export{pe as default};
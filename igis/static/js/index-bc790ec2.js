import{g as S,e as z,_ as $,B as I}from"./index-c476d94f.js";import{d as E,c as x,b as v,h as y,j as L,n as T,g as c,P as B,r as b,o as M,k as a,f as u,K as d,D as f,x as N,a4 as j,a5 as Z,a6 as D}from"./index-916bfcc9.js";import{_ as g}from"./_plugin-vue_export-helper-c4cb8a60.js";import{I as P,M as R}from"./index-405f3ec9.js";import{I as O}from"./index-224c2051.js";import"./constant-18157b1b.js";const V=E({name:"IconCaretRight",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const o=S("icon"),l=x(()=>[o,`${o}-caret-right`,{[`${o}-spin`]:e.spin}]),n=x(()=>{const i={};return e.size&&(i.fontSize=z(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:l,innerStyle:n,onClick:i=>{t("click",i)}}}}),K=["stroke-width","stroke-linecap","stroke-linejoin"],U=c("path",{d:"M34.829 23.063c.6.48.6 1.394 0 1.874L17.949 38.44c-.785.629-1.949.07-1.949-.937V10.497c0-1.007 1.164-1.566 1.95-.937l16.879 13.503Z",fill:"currentColor",stroke:"none"},null,-1),A=[U];function W(e,t,o,l,n,p){return v(),y("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:L(e.cls),style:T(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...i)=>e.onClick&&e.onClick(...i))},A,14,K)}var h=$(V,[["render",W]]);const Y=Object.assign(h,{install:(e,t)=>{var o;const l=(o=t==null?void 0:t.iconPrefix)!=null?o:"";e.component(l+h.name,h)}}),k=B("codeeditor",()=>{let e=b(`
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  </head>
  <body>
    <div id="map" style="height: 100vh"></div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"><\/script>
    <script>
      var map = L.map("map", {
        crs: L.CRS.EPSG4326,
      }).setView([32, 118], 4);

      const tdtKey = "1d109683f4d84198e37a38c442d68311";

      loadTdtXYZ();
      function loadTdtXYZ() {
        const tdt_url_bottom =
          "https://t{s}.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=";
        const tdt_url_label =
          "https://t{s}.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=";
        const layer_bottom = L.tileLayer(tdt_url_bottom + tdtKey, {
          zoomOffset: 1,
          tileSize: 256,
          minZoom: 3,
          maxZoom: 17,
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        });
        const layer_label = L.tileLayer(tdt_url_label + tdtKey, {
          zoomOffset: 1,
          tileSize: 256,
          minZoom: 3,
          maxZoom: 17,
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        });
        layer_bottom.addTo(map);
        layer_label.addTo(map);
      }
    <\/script>
  </body>
</html>

`);function t(o){e.value=o}return{code:e,updateCode:t}});const F=e=>(Z("data-v-6339e4ff"),e=e(),D(),e),G={class:"experience-editor"},X={class:"experience-editor-header"},q=F(()=>c("div",{class:"experience-editor-header-title"},"\u6E90\u4EE3\u7801\u7F16\u8F91\u5668",-1)),H={class:"experience-editor-header-right"},J={class:"experience-editor-header-right-box"},Q={class:"experience-editor-header-right-box"},ee={class:"experience-editor-header-right-box"},te={__name:"ExperienceEditor",setup(e){const t=window.html_beautify,o=k(),l={autorefresh:!0,smartIndent:!1,tabSize:4,mode:"htmlmixed",theme:"dracula",matchBrackets:!0,lineWrapping:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter","CodeMirror-lint-markers"],lint:!0,lineNumbers:!0,indentUnit:0,foldGutter:!0,styleActiveLine:!0};let n=b("");const p=m=>{const r=t(m,{indent_size:2});n.value=r},i=()=>{console.log("play"),o.updateCode(n.value)},C=()=>{console.log("copy"),navigator.clipboard.writeText(n.value),R.success("\u590D\u5236\u6210\u529F")},w=(m,r)=>{console.log("\u{1F680} ~ download ~ text:",r);var s=document.createElement("a");s.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(r)),s.setAttribute("download",m),s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s)};return M(()=>{p(o.code)}),(m,r)=>{const s=I;return v(),y("div",G,[c("div",X,[q,c("div",H,[c("div",J,[a(s,{onClick:C},{icon:u(()=>[a(d(P))]),default:u(()=>[f("\u590D\u5236")]),_:1})]),c("div",Q,[a(s,{onClick:i},{icon:u(()=>[a(d(Y))]),default:u(()=>[f("\u8FD0\u884C")]),_:1})]),c("div",ee,[a(s,{onClick:r[0]||(r[0]=_=>w("index.html",d(n)))},{icon:u(()=>[a(d(O))]),default:u(()=>[f("\u4E0B\u8F7D")]),_:1})])])]),a(d(j),{value:d(n),"onUpdate:value":r[1]||(r[1]=_=>N(n)?n.value=_:n=_),options:l,class:"experience-editor-code"},null,8,["value"])])}}},oe=g(te,[["__scopeId","data-v-6339e4ff"]]);const ne={class:"experience-main w-full min-h-[calc(100vh-58px)]"},se=["srcdoc"],ie={__name:"index",setup(e){const t=k();return(o,l)=>(v(),y("div",ne,[a(oe,{class:"w-40%"}),c("iframe",{srcdoc:d(t).code,unselectable:"on",frameborder:"0",scrolling:"no",class:"w-60%",allowfullscreen:""},null,8,se)]))}},me=g(ie,[["__scopeId","data-v-90991fb3"]]);export{me as default};

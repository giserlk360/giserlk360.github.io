import{i as c}from"./index-a59e5c67.js";import{h as f,j as m}from"./index-c476d94f.js";import{d as v,r as d,c as p,A as b,o as z,y as R,I as O}from"./index-916bfcc9.js";var w=v({name:"ResizeObserver",emits:["resize"],setup(C,{emit:u,slots:i}){let r;const n=d(),t=p(()=>f(n.value)?n.value.$el:n.value),a=e=>{!e||(r=new c(s=>{const o=s[0];u("resize",o)}),r.observe(e))},l=()=>{r&&(r.disconnect(),r=null)};return b(t,e=>{r&&l(),e&&a(e)}),z(()=>{t.value&&a(t.value)}),R(()=>{l()}),()=>{var e,s;const o=m((s=(e=i.default)==null?void 0:e.call(i))!=null?s:[]);return o?O(o,{ref:n},!0):null}}});export{w as R};
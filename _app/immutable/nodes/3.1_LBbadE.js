import{s as g,e as v,t as m,c as b,b as $,d as p,f as _,i as x,h as c,j as h,n as d,k as E}from"../chunks/scheduler.55dBM0Ge.js";import{S,i as j}from"../chunks/index.CPNlBEJs.js";import{p as k}from"../chunks/stores.sxtXGBE7.js";function q(n){var f;let e,s=n[0].status+"",r,o,i=((f=n[0].error)==null?void 0:f.message)+"",l;return{c(){e=v("h1"),r=m(s),o=m(": "),l=m(i)},l(a){e=b(a,"H1",{});var t=$(e);r=p(t,s),o=p(t,": "),l=p(t,i),t.forEach(_)},m(a,t){x(a,e,t),c(e,r),c(e,o),c(e,l)},p(a,[t]){var u;t&1&&s!==(s=a[0].status+"")&&h(r,s),t&1&&i!==(i=((u=a[0].error)==null?void 0:u.message)+"")&&h(l,i)},i:d,o:d,d(a){a&&_(e)}}}function y(n,e,s){let r;return E(n,k,o=>s(0,r=o)),[r]}class z extends S{constructor(e){super(),j(this,e,y,q,g,{})}}export{z as component};
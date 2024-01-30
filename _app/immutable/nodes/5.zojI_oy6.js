import{A as _,B as J,C as M,D as v,s as w,a as G,y as R,g as N,i as I,f as m,e as p,t as Z,c as k,b as E,d as D,q as u,r as S,h as g,n as b}from"../chunks/scheduler.55dBM0Ge.js";import{g as W,a as B,e as Y,t as f,S as j,i as U,c as P,b as Q,m as y,d as L}from"../chunks/index.CPNlBEJs.js";import{P as X}from"../chunks/_page.Z2c-c_VN.js";import{p as H}from"../chunks/entry.xoxieVKz.js";function F(c,e){const l=e.token={};function r(t,a,n,s){if(e.token!==l)return;e.resolved=s;let o=e.ctx;n!==void 0&&(o=o.slice(),o[n]=s);const i=t&&(e.current=t)(o);let d=!1;e.block&&(e.blocks?e.blocks.forEach((A,h)=>{h!==a&&A&&(W(),B(A,1,1,()=>{e.blocks[h]===A&&(e.blocks[h]=null)}),Y())}):e.block.d(1),i.c(),f(i,1),i.m(e.mount(),e.anchor),d=!0),e.block=i,e.blocks&&(e.blocks[a]=i),d&&v()}if(_(c)){const t=J();if(c.then(a=>{M(t),r(e.then,1,e.value,a),M(null)},a=>{if(M(t),r(e.catch,2,e.error,a),M(null),!e.hasCatch)throw a}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,c),!0;e.resolved=c}}const O="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyQTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyQjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTI4OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTI5OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m4QGuQAAAyRJREFUeNrEl21ojWEYx895TDPbMNlBK46IUiNmPvHBSUjaqc0H8pF5+aDUKPEBqU2NhRQpX5Rv5jWlDIWlMCv7MMSWsWwmb3tpXub4XXWdPHvc9/Gc41nu+nedc7/8r/99PffLdYdDPsvkwsgkTBwsA/PADJCnzX2gHTwBt8Hl7p537/3whn04XoDZDcpBlk+9P8AFcAghzRkJwPF4zGGw0Y9QS0mAM2AnQj77FqCzrtcwB1Hk81SYojHK4DyGuQ6mhIIrBWB9Xm7ug/6B/nZrBHBegrkFxoVGpnwBMSLR9EcEcC4qb8pP14BWcBcUgewMnF3T34VqhWMFkThLJAalwnENOAKiHpJq1FZgI2AT6HZtuxZwR9GidSHtI30jOrbawxlVX78/AbNfhHlomEUJJI89O2MqeE79T8/nk8nMBm/dK576hZgmA3cp/R4l9/UeSxiHLVIlNm4nFfT0bxyuIj7LHRTKai+zdJobwMKzcZSJb0ePV5PKN+BqAAKE47UlMnERELMM3EdYP/yrd+XYb2mOiYBiQ8OQnoRBlXrl9JZix7D1pHTazu4MoyBcnYamqAjIMTR8G4FT8LuhLsexXYYjICBiqhQBvYb6fLZIJCjPypVvaOoVAW2WcasCnL2Nq82xHJNSqlCeFcDshaPK0twkAhosjZL31QYw+1rlMpWGMArl23SBsZZO58F2tlJXmjOXS+s4WGvpMiBJT/I2PInZ6lIs9/hBsNS1hS6BG0DSqmYEDRlCXQrmy50P1oDRKTSegmNbUsA0zDMwRhPJXeCE3vWLPQMvan6X8AgIa1vcR4AkGZkDR4ejJ1UHpsaVI0g2LInpOsNFUud1rhxSV+fzC9Woz2EZkWQuja7/B+jUrgtIMpy9YCW4n4K41YfzRneW5E1KJTe4B2Zq1Q5EHEtj4U3AfEzR5SVY4l7QYQPJdN2as7RKBF0BPZqqH4VgMAMBL8Byxr7y8zCZiDlnOcEKIPmUpgB5Z2ww5RdOiiRiNajUmWda5IG6WbhsyY2fx6m8gLcoJDJFkH219M3We1+cnda93pfycZpIJEL/s/wSYADmOAwAQgdpBAAAAABJRU5ErkJggg==";function x(c){c[0]=c[1].data}function T(c){let e,l,r,t,a,n,s,o;return{c(){e=p("section"),l=p("p"),r=Z("Find me on "),t=p("a"),a=Z(`GitHub
        `),n=p("img"),this.h()},l(i){e=k(i,"SECTION",{});var d=E(e);l=k(d,"P",{});var A=E(l);r=D(A,"Find me on "),t=k(A,"A",{class:!0,target:!0,rel:!0,href:!0,"aria-label":!0,"data-bcup-haslogintext":!0});var h=E(t);a=D(h,`GitHub
        `),n=k(h,"IMG",{class:!0,src:!0,alt:!0}),h.forEach(m),A.forEach(m),d.forEach(m),this.h()},h(){u(n,"class","inline w-6 h-6 align-bottom rounded-full mask-image"),S(n.src,s=O)||u(n,"src",s),u(n,"alt","Github"),u(t,"class","icon"),u(t,"target","_blank"),u(t,"rel","noopener"),u(t,"href",o=c[0].dev.links.github),u(t,"aria-label","github"),u(t,"data-bcup-haslogintext","no")},m(i,d){I(i,e,d),g(e,l),g(l,r),g(l,t),g(t,a),g(t,n)},p(i,d){d&1&&o!==(o=i[0].dev.links.github)&&u(t,"href",o)},d(i){i&&m(e)}}}function C(c){let e;return{c(){e=p("div")},l(l){e=k(l,"DIV",{}),E(e).forEach(m)},m(l,r){I(l,e,r)},i:b,o:b,d(l){l&&m(e)}}}function z(c){x(c);let e,l,r;return l=new X({props:{data:c[0],format:"compact",pagination:!1}}),{c(){e=p("section"),P(l.$$.fragment)},l(t){e=k(t,"SECTION",{});var a=E(e);Q(l.$$.fragment,a),a.forEach(m)},m(t,a){I(t,e,a),y(l,e,null),r=!0},i(t){r||(f(l.$$.fragment,t),r=!0)},o(t){B(l.$$.fragment,t),r=!1},d(t){t&&m(e),L(l)}}}function V(c){return{c:b,l:b,m:b,i:b,o:b,d:b}}function q(c){let e,l,r,t=c[0].dev.links.github&&T(c),a={ctx:c,current:null,token:null,hasCatch:!0,pending:V,then:z,catch:C,value:1,blocks:[,,,]};return F(H("/project/list/1/?format=compact"),a),{c(){t&&t.c(),e=G(),l=R(),a.block.c()},l(n){t&&t.l(n),e=N(n),l=R(),a.block.l(n)},m(n,s){t&&t.m(n,s),I(n,e,s),I(n,l,s),a.block.m(n,a.anchor=s),a.mount=()=>l.parentNode,a.anchor=l,r=!0},p(n,[s]){c=n,c[0].dev.links.github?t?t.p(c,s):(t=T(c),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i(n){r||(f(a.block),r=!0)},o(n){for(let s=0;s<3;s+=1){const o=a.blocks[s];B(o)}r=!1},d(n){n&&(m(e),m(l)),t&&t.d(n),a.block.d(n),a.token=null,a=null}}}function K(c,e,l){let{data:r}=e;return c.$$set=t=>{"data"in t&&l(0,r=t.data)},[r]}class ae extends j{constructor(e){super(),U(this,e,K,q,w,{data:0})}}export{ae as component};
(this["webpackJsonpgenesis-test"]=this["webpackJsonpgenesis-test"]||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),i=a.n(o),c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function s(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var l=a(158),u=a(161),p=a(163),m=a(168),g=a(108),f=a(164),d=a(166),h=a(167),b=a(62),v=a.n(b).a.create({baseURL:"https://api.github.com"});v.interceptors.request.use((function(e){return e.params=e.params||{},e.params.per_page=30,e}));var y=v,E={per_page:30,sort:"stars",order:"desc"},w=[{label:"DESC",order:"desc"},{label:"ASC",order:"asc"}],O=a(47),S=a.n(O),j=a(63),k=a(15),x=function(e,t){var a=Object(n.useState)(!1),r=Object(k.a)(a,2),o=r[0],c=r[1],s=Object(n.useState)({}),l=Object(k.a)(s,2),u=l[0],p=l[1],m=Object(n.useState)(),g=Object(k.a)(m,2),f=g[0],d=g[1];return{response:u,errorMessage:f,loading:o,fetchData:Object(n.useCallback)(function(){var a=Object(j.a)(S.a.mark((function a(n){var r;return S.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c(!0),d(null),a.prev=2,a.next=5,e.get(t,{params:n});case 5:r=a.sent,i.a.unstable_batchedUpdates((function(){p(r.data),c(!1)})),a.next=20;break;case 9:a.prev=9,a.t0=a.catch(2),a.t1=a.t0.response.status,a.next=403===a.t1?14:422===a.t1?16:18;break;case 14:return d("You exceeded rate limit 30 request per minute. Please try again later."),a.abrupt("break",19);case 16:return d("Only the first 1000 search results are available."),a.abrupt("break",19);case 18:d("Oops! Something went wrong. Please try again later.");case 19:c(!1);case 20:case"end":return a.stop()}}),a,null,[[2,9]])})));return function(e){return a.apply(this,arguments)}}(),[e,t])}},W=a(34),N=a(74),C=function(e){var t=Object(n.useState)(Object(W.a)(Object(W.a)({},function(){var e=new URLSearchParams(window.location.search);return Object(N.a)(e.entries()).reduce((function(e,t){var a=Object(k.a)(t,2),n=a[0],r=a[1];return e[n]=r,e}),{})}()),e)),a=Object(k.a)(t,2),r=a[0],o=a[1];return{params:r,updateParams:function(e){o((function(t){if(function(e,t){return Object.keys(t).every((function(a){return t[a]===e[a]}))}(t,e))return t;var a=Object(W.a)(Object(W.a)({},t),e),n=new URLSearchParams(Object.entries(a));return window.history.pushState({params:a},null,"".concat(window.location.pathname,"?").concat(n.toString())),a}))}}},R=a(165),T=a(153),z=a(157),I=a(70),P=a.n(I),_=r.a.memo((function(e){var t=e.onSubmit,a=e.value,o=void 0===a?"":a,i=Object(n.useState)(o),c=Object(k.a)(i,2),s=c[0],l=c[1];return r.a.createElement("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),s&&t(s)}},r.a.createElement(T.a,{container:!0,spacing:2},r.a.createElement(T.a,{item:!0,xs:12,sm:9,md:10},r.a.createElement(R.a,{id:"seach-field",label:"Enter repository name",type:"search",fullWidth:!0,variant:"outlined",value:s,onChange:function(e){l(e.target.value)}})),r.a.createElement(T.a,{item:!0,sm:3,md:2,container:!0,alignItems:"stretch"},r.a.createElement(z.a,{type:"submit",variant:"contained",color:"primary",size:"large",fullWidth:!0,endIcon:r.a.createElement(P.a,null)},"Find"))))})),A=a(73),U=a(169),q=r.a.memo((function(e){var t=e.options,a=void 0===t?[]:t,o=e.onChange,i=void 0===o?function(){}:o,c=Object(n.useState)(null),s=Object(k.a)(c,2),l=s[0],u=s[1],p=Object(n.useState)(a[0].label),m=Object(k.a)(p,2),g=m[0],f=m[1];return r.a.createElement("div",null,r.a.createElement(z.a,{"aria-haspopup":"true",onClick:function(e){u(e.currentTarget)}},"Stars: ",g),r.a.createElement(A.a,{anchorEl:l,keepMounted:!0,open:Boolean(l),onClose:function(e){u(null)}},a.map((function(e){return r.a.createElement(U.a,{key:e.label,onClick:function(){!function(e){f(e.label),i(e.order),u(null)}(e)}},e.label)}))))})),B=a(159),L=a(160),M=a(162),D=a(71),F=a.n(D),H=a(72),J=a.n(H),V=Object(l.a)((function(e){return{root:{position:"relative"},content:{padding:e.spacing(1)},stars:{position:"absolute",bottom:e.spacing(1.5),right:e.spacing(1),display:"flex",alignItems:"center",maxWidth:e.typography.pxToRem(60),fontSize:e.typography.pxToRem(12)},starsIcon:{marginRight:e.spacing(.25)}}})),Y=r.a.memo((function(e){var t=e.repository,a=V(),n=t.html_url,o=t.name,i=t.owner,c=t.stargazers_count;return r.a.createElement(B.a,{className:a.root},r.a.createElement(L.a,{className:a.content},r.a.createElement(u.a,{color:"primary",noWrap:!0},o),r.a.createElement(u.a,{className:a.stars},r.a.createElement(F.a,{className:a.starsIcon,fontSize:"small"}),c),r.a.createElement(u.a,{color:"textSecondary",variant:"caption"},"Author: ",i.login)),r.a.createElement(M.a,null,r.a.createElement(z.a,{variant:"outlined",color:"primary",href:n,size:"small",target:"_blank",endIcon:r.a.createElement(J.a,null)},"View on")))})),$=r.a.memo((function(e){var t=e.repositories;return r.a.createElement(T.a,{container:!0,spacing:2},t.map((function(e){return r.a.createElement(T.a,{key:e.id,item:!0,xs:12,sm:6,md:4,lg:2},r.a.createElement(Y,{repository:e}))})))})),G=Object(l.a)((function(e){return{container:{marginTop:e.spacing(2)},h1:{fontSize:e.typography.pxToRem(28),fontWeight:e.typography.fontWeightBold},paper:{padding:e.spacing(2)},section:{marginTop:e.spacing(3)},sectionHeading:{marginBottom:e.spacing(2),fontSize:e.typography.pxToRem(18),fontWeight:e.typography.fontWeightBold},pagination:{marginTop:e.spacing(2)},loading:{zIndex:e.zIndex.drawer+1,color:"#fff"},sorting:{float:"right",fontSize:e.typography.pxToRem(14),fontWeight:e.typography.fontWeightRegular},alert:{marginBottom:e.spacing(3)}}})),K=function(){var e=G(),t=C(E),a=t.params,o=t.updateParams,i=x(y,"/search/repositories"),c=i.loading,s=i.response,l=i.errorMessage,b=i.fetchData;Object(n.useEffect)((function(){a.q&&b(a)}),[a]);var v,O;return r.a.createElement(p.a,{className:e.container,maxWidth:"lg"},l&&r.a.createElement(d.a,{className:e.alert,severity:"warning"},l),r.a.createElement(u.a,{className:e.h1,variant:"h1"},"Find your repo"),r.a.createElement(g.a,{className:"".concat(e.paper," ").concat(e.section)},r.a.createElement(_,{onSubmit:function(e){o({q:e,page:1})},value:a.q||""})),c&&r.a.createElement(m.a,{className:e.loading,open:c},r.a.createElement(f.a,{color:"inherit"})),!!s.items&&r.a.createElement("div",{className:e.section},r.a.createElement("div",{className:e.sorting},r.a.createElement(q,{options:w,onChange:function(e){o({order:e,page:1})}})),r.a.createElement(u.a,{className:e.sectionHeading,variant:"h2"},"Search results"),r.a.createElement($,{repositories:s.items}),r.a.createElement(h.a,{className:e.pagination,onChange:function(e,t){!function(e){o({page:e})}(t)},count:(v=s.total_count,O=E.per_page,Math.ceil(Math.min(1e3,v)/O)),color:"primary",page:parseInt(a.page,10)||1})))};!function(e){if("serviceWorker"in navigator){if(new URL("/find-your-repo",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/find-your-repo","/service-worker.js");c?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):s(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):s(t,e)}))}}(),i.a.render(r.a.createElement(K,null),document.querySelector("#root"))},80:function(e,t,a){e.exports=a(107)}},[[80,1,2]]]);
//# sourceMappingURL=main.04376d35.chunk.js.map
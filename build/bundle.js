var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function u(t){t.parentNode.removeChild(t)}function i(t){return document.createElement(t)}function l(){return t=" ",document.createTextNode(t);var t}function s(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function d(t,e){(null!=e||t.value)&&(t.value=e)}let p;function h(t){p=t}const g=[],m=[],$=[],b=[],y=Promise.resolve();let v=!1;function x(t){$.push(t)}let w=!1;const _=new Set;function A(){if(!w){w=!0;do{for(let t=0;t<g.length;t+=1){const e=g[t];h(e),k(e.$$)}for(g.length=0;m.length;)m.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];_.has(e)||(_.add(e),e())}$.length=0}while(g.length);for(;b.length;)b.pop()();v=!1,w=!1,_.clear()}}function k(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(x)}}const E=new Set;function L(t,e){-1===t.$$.dirty[0]&&(g.push(t),v||(v=!0,y.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(a,c,i,l,s,f,d=[-1]){const g=p;h(a);const m=c.props||{},$=a.$$={fragment:null,ctx:null,props:f,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(g?g.$$.context:[]),callbacks:n(),dirty:d};let b=!1;if($.ctx=i?i(a,m,(t,e,...n)=>{const r=n.length?n[0]:e;return $.ctx&&s($.ctx[t],$.ctx[t]=r)&&($.bound[t]&&$.bound[t](r),b&&L(a,t)),e}):[],$.update(),b=!0,r($.before_update),$.fragment=!!l&&l($.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);$.fragment&&$.fragment.l(t),t.forEach(u)}else $.fragment&&$.fragment.c();c.intro&&((y=a.$$.fragment)&&y.i&&(E.delete(y),y.i(v))),function(t,n,a){const{fragment:c,on_mount:u,on_destroy:i,after_update:l}=t.$$;c&&c.m(n,a),x(()=>{const n=u.map(e).filter(o);i?i.push(...n):r(n),t.$$.on_mount=[]}),l.forEach(x)}(a,c.target,c.anchor),A()}var y,v;h(g)}function P(e){let n,o,a,p,h;return{c(){n=i("main"),o=i("textarea"),a=l(),p=i("button"),p.textContent="encode",f(o,"cols","40"),f(o,"rows","20"),f(n,"class","svelte-1tky8bj")},m(t,u,i){!function(t,e,n){t.insertBefore(e,n||null)}(t,n,u),c(n,o),d(o,e[0]),c(n,a),c(n,p),i&&r(h),h=[s(o,"input",e[3]),s(p,"click",e[1])]},p(t,[e]){1&e&&d(o,t[0])},i:t,o:t,d(t){t&&u(n),r(h)}}}function C(t,e,n){const r="# Cheesecake de zapallo\n## Parte blanca\n- 19g de chocolate amargo\n- 45g de azucar de mentira\n- 100 gramos de pure de zapagoo\n- [24g/3] claras de huevo\n- baking powder\n\n## Parte negra\n- 4g pure de zapallo\n- 5g cream cheese\n- 8g azucar de mentira\n- 3g yema";let{plaintext:o="Loading..."}=e;var a;return 0===location.hash.length?o=r:(a=location.hash.substr(1),new Promise((t,e)=>{fetch("data:application/octet-stream;base64,"+a).then(t=>t.blob()).then((function(n){var r=new FileReader;r.onload=()=>{var n=Array.from(new Uint8Array(r.result));LZMA.decompress(n,(n,r)=>{r?e(r):t(n)})},r.readAsArrayBuffer(n)}))})).then(t=>n(0,o=t)),t.$set=t=>{"plaintext"in t&&n(0,o=t.plaintext)},[o,function(){var t;(t=o,new Promise((e,n)=>{LZMA.compress(t,1,(t,r)=>{if(r)n(r);else{var o=new FileReader;o.onload=()=>{var t=o.result.substr(o.result.indexOf(",")+1);e(t)},o.readAsDataURL(new Blob([new Uint8Array(t)]))}})})).then(t=>{console.log("encoded",t)})},r,function(){o=this.value,n(0,o)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}{constructor(t){super(),z(this,t,C,P,a,{plaintext:0})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map

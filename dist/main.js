!function(e){var r={};function o(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=r,o.d=function(e,r,n){o.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,r){if(1&r&&(e=o(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)o.d(n,t,function(r){return e[r]}.bind(null,t));return n},o.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(r,"a",r),r},o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},o.p="",o(o.s=0)}([function(e,r,o){"use strict";function n(e,r,o,n,t){for(var u=n;u<t;u++)o[u]+=e.power,r[u].push(e.id)}function t(e,r,o,n,t){for(var u=e;u<=r-o+1;u++){for(var i=0,a=0;i<o;)a+=n[u+i],i++;t.push(a)}}function u(e,r,o,u,i,f){var l=i.duration,c=i.power,d=(i.id,[]);if(o<u){for(;r[o]+c>a&&o+l<=u;)o+=1;t(o,u,l,e,d),n(i,f,r,v=o+d.indexOf(Math.min.apply(null,d)),v+l)}else{var p=function(e,r){for(var o=[],n=0;n<e.length+r+1;n++)n<e.length?o[n]=e[n]:o[n]=e[n-e.length];return o}(e,u);t(o,p.length-1,l,p,d);var v,s=(v=o+d.indexOf(Math.min.apply(null,d)))<e.length?v:v-e.length,m=v+l<e.length?v+l:v+l-e.length;s<m?n(i,f,r,s,m):(n(i,f,r,s,r.length),n(i,f,r,0,m))}}o.r(r),o.d(r,"MAX_POWER",function(){return a});var i={devices:[{id:"F972B82BA56A70CC579945773B6866FB",name:"Посудомоечная машина",power:950,duration:3,mode:"night"},{id:"C515D887EDBBE669B2FDAC62F571E9E9",name:"Духовка",power:2e3,duration:2,mode:"day"},{id:"02DDD23A85DADDD71198305330CC386D",name:"Холодильник",power:50,duration:24},{id:"1E6276CC231716FE8EE8BC908486D41E",name:"Термостат",power:50,duration:24},{id:"7D9DC84AD110500D284B33C82FE6E85E",name:"Кондиционер",power:850,duration:1}],rates:[{from:7,to:10,value:6.46},{from:10,to:17,value:5.38},{from:17,to:21,value:6.46},{from:21,to:23,value:5.38},{from:23,to:7,value:1.79}],maxPower:1100};const a=i.maxPower;var f=function(e){for(var r=e.devices,o={},n=[],t=function(e){for(var r=[],o=0;o<24;o++)for(var n=0;n<e.length;n++)o<e[n].to&&o>=e[n].from?r[o]=e[n].value:e[n].from>e[n].to&&(o<e[n].to||o>=e[n].from)&&(r[o]=e[n].value);return r}(e.rates),i=0;i<24;i++)o[i]=[],n[i]=0;r=function(e){return e.sort(function(e,r){return e.power>r.power?-1:e.power<r.power?1:0})}(r),console.log(r),function(e,r,o){e.forEach(e=>{24===e.duration&&Object.keys(r).forEach(function(n,t){r[n].push(e.id),o[t]+=e.power})})}(r,o,n),function(e,r,o,n){e.forEach(e=>{24!==e.duration&&("night"===e.mode?u(n,o,21,7,e,r):"day"===e.mode?u(n,o,7,21,e,r):u(n,o,0,23,e,r))})}(r,o,n,t),Object.keys(o).forEach(function(e){o[e].sort()});var a={},f=0;for(i=0;i<r.length;i++){for(var l=0;l<Object.keys(o).length;l++)o[l].forEach(e=>{e===r[i].id&&(a[e]?a[e]=(Number(a[e])+r[i].power*t[l]/1e3).toFixed(4):a[e]=(r[i].power*t[l]/1e3).toFixed(4))});f+=Number(a[r[i].id])}return{schedule:o,consumedEnergy:{value:f.toFixed(4),devices:a}}}(i);console.log(f)}]);
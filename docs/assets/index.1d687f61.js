const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const h of i)if(h.type==="childList")for(const d of h.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(i){const h={};return i.integrity&&(h.integrity=i.integrity),i.referrerpolicy&&(h.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?h.credentials="include":i.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function r(i){if(i.ep)return;i.ep=!0;const h=o(i);fetch(i.href,h)}};T();const b="/images/viper.png",k="/images/enemy_small.png",D="/images/viper_single_shot.png";let I=!1,L,A,R;async function w(t){return new Promise(e=>{const o=new Image;o.addEventListener("load",()=>{e(o)}),o.src=t})}Promise.all([w(b),w(k),w(D)]).then(([t,e,o])=>{L=t,A=e,R=o,I=!0});const c=document.querySelector("#my-canvas"),s=c.getContext("2d");let p=[];const O=.4;for(let t=0;t<20;t+=1){const e=Math.random()*c.width,o=Math.random()*c.height,r=1+Math.random()*3;p.push({x:e,y:o,width:r,height:r})}function q(){for(const t of p)t.y+=O,t.y>c.height&&(t.x=Math.random()*c.width,t.y=0)}function N(){s.fillStyle="#000000",s.fillRect(0,0,c.width,c.height),s.fillStyle="#cdcdcd";for(const t of p)s.fillRect(t.x,t.y,t.width,t.height)}const U=["#D364EB","#C4F4F6","#AAD1CE"];let M=[];function _(t,e){const o=[];for(let r=0;r<10;r+=1){const i=Math.random()*2*Math.PI,h=Math.cos(i),d=Math.sin(i),n=10+3*Math.random(),l=B(U);o.push({x:0,y:0,vx:h,vy:d,size:n,color:l})}return{x:t,y:e,fires:o,duration:30,time:0}}function B(t){const e=Math.floor(Math.random()*t.length);return t[e]}const v=36;let a={x:c.width/2,y:c.height-v/2,width:v,height:v,speed:.1},g=[],f=[];const G=5,H=200,K=.2,V=4,W=12;let C=0;const m=32,S=.1;for(let t=0;t<5;t+=1){const o={x:t*(m+5)+m/2,y:m/2,width:m,height:m,velocity:S};g.push(o)}function X(t,e){const o=t.width/2,r=c.width-t.width/2;let i=t.x+t.velocity*e;i>r?(t.x=r-i%r,t.velocity=-1*S):i<o?(t.x=o+o-i,t.velocity=S):t.x=i}function $(t,e){return Math.max(t.x-t.width/2,e.x-e.width/2)<Math.min(t.x+t.width/2,e.x+e.width/2)&&Math.max(t.y-t.height/2,e.y-e.height/2)<Math.min(t.y+t.height/2,e.y+e.height/2)}let x={ArrowLeft:!1,ArrowRight:!1,Space:!1};window.addEventListener("keydown",t=>{x[t.code]=!0});window.addEventListener("keyup",t=>{x[t.code]=!1});function j(t){const e=t.x-t.width/2,o=t.y-t.height/2;s.drawImage(L,e,o,t.width,t.height)}function J(t){const e=t.x-t.width/2,o=t.y-t.height/2;s.drawImage(A,e,o,t.width,t.height)}function Q(t){const e=t.x-t.width/2,o=t.y-t.height/2;s.drawImage(R,e,o,t.width,t.height)}function Y(t){s.font="24px serif",s.fillStyle="#00000077",s.fillRect(0,0,c.width,c.height),s.fillStyle="white",s.fillText("\u304A\u3081\u3067\u3068\u3046",10,50),s.fillText(`\u3042\u306A\u305F\u306E\u8A18\u9332\u306F${t}\u79D2\u3067\u3059`,10,80)}const Z=Date.now();let z=0,F;(function t(){if(F=requestAnimationFrame(t),!I)return;const o=Date.now()-Z,r=o-z;if(g.length===0){const n=Math.floor(o/1e3);Y(n),cancelAnimationFrame(F);return}q();const i=[];for(const n of f)n.y+=-n.speed*r,n.x>=0&&n.x<=c.width&&n.y>=0&&n.y<=c.height&&i.push(n);f=i;const h=[];for(const n of g){X(n,r);let l=!0;for(const u of f)if($(u,n)){l=!1;const y=_(u.x,u.y);M.push(y);break}l&&h.push(n)}if(g=h,x.ArrowLeft&&(a.x-=a.speed*r),x.ArrowRight&&(a.x+=a.speed*r),x.Space&&f.length<G&&C+H<o){const n=a.x,l=a.y;f.push({x:n,y:l,width:V,height:W,speed:K}),C=o}a.x=Math.max(a.width/2,Math.min(c.width-a.width/2,a.x)),a.y=Math.max(a.height/2,Math.min(c.height-a.height/2,a.y)),N(),j(a),g.forEach(J),f.forEach(Q);const d=[];for(const n of M){s.save(),s.translate(n.x,n.y);for(const l of n.fires){const{x:u,y,size:E,color:P}=l;s.fillStyle=P,s.fillRect(u,y,E,E),l.x+=l.vx,l.y+=l.vy,l.size*=.95}s.restore(),n.time+=1,n.duration>n.time&&d.push(n)}M=d,z=o})();

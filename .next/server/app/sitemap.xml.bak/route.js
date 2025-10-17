"use strict";(()=>{var e={};e.id=659,e.ids=[659],e.modules={10846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},29294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},79428:e=>{e.exports=require("buffer")},29021:e=>{e.exports=require("fs")},33873:e=>{e.exports=require("path")},76760:e=>{e.exports=require("node:path")},1708:e=>{e.exports=require("node:process")},73136:e=>{e.exports=require("node:url")},23467:(e,t,r)=>{r.r(t),r.d(t,{patchFetch:()=>h,routeModule:()=>p,serverHooks:()=>m,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>g});var o={};r.r(o),r.d(o,{GET:()=>u,dynamic:()=>c});var n=r(42706),i=r(28203),s=r(45994),a=r(48692),l=r(43327);let c="force-static";async function u(){let e=(0,a.zX)();return new Response((0,l.vB)(e),{headers:{"Content-Type":"application/xml"}})}let p=new n.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/sitemap.xml.bak/route",pathname:"/sitemap.xml.bak",filename:"route",bundlePath:"app/sitemap.xml.bak/route"},resolvedPagePath:"/Users/massabkhan/veloce/v-site/src/app/sitemap.xml.bak/route.ts",nextConfigOutput:"export",userland:o}),{workAsyncStorage:d,workUnitAsyncStorage:g,serverHooks:m}=p;function h(){return(0,s.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:g})}},42706:(e,t,r)=>{e.exports=r(44870)},48692:(e,t,r)=>{r.d(t,{N7:()=>$,QU:()=>q,gw:()=>b,r:()=>S,x8:()=>v,zX:()=>y});var o=r(29021),n=r.n(o),i=r(33873),s=r.n(i),a=r(9064),l=r.n(a),c=r(43375),u=r(66374),p=r(62373),d=r(84318),g=r(12838),m=r(61752),h=r(73390),f=r(50339);let w=s().join(process.cwd(),"src/content/blogs"),x=s().join(process.cwd(),"src/content/authors");function y(){try{return n().readdirSync(w).filter(e=>e.endsWith(".md")).map(e=>{let t=e.replace(/\.md$/,""),r=s().join(w,e),o=n().readFileSync(r,"utf8"),{data:i}=l()(o);return{slug:t,...i,readTime:k(o)}}).filter(e=>!1!==e.published).sort((e,t)=>e.date<t.date?1:-1)}catch(e){return console.error("Error reading blog posts:",e),[]}}async function $(e){try{let t=s().join(w,`${e}.md`),r=n().readFileSync(t,"utf8"),{data:o,content:i}=l()(r),a=await (0,u.l)().use(p.A).use(c.A).use(d.A,{allowDangerousHtml:!0}).use(m.A).use(h.A,{behavior:"wrap",properties:{className:["anchor-link"],ariaLabel:"Link to section"}}).use(g.A,{detect:!0,ignoreMissing:!0}).use(f.A,{allowDangerousHtml:!0}).process(i);return{slug:e,title:o.title,date:o.date,author:o.author,excerpt:o.excerpt,content:a.toString(),tags:o.tags||[],categories:o.categories||[],coverImage:o.coverImage,readTime:k(i),published:!1!==o.published}}catch(t){return console.error(`Error reading post ${e}:`,t),null}}function b(e){try{let t=s().join(x,`${e}.md`),r=n().readFileSync(t,"utf8"),{data:o}=l()(r);return{slug:e,...o}}catch(t){return console.error(`Error reading author ${e}:`,t),null}}function v(e,t=3){let r=y(),o=e.tags,n=e.categories;return r.filter(t=>t.slug!==e.slug).map(e=>{let t=e.tags.filter(e=>o.includes(e)).length,r=e.categories.filter(e=>n.includes(e)).length;return{post:e,score:2*t+r}}).filter(e=>e.score>0).sort((e,t)=>t.score-e.score).slice(0,t).map(e=>e.post)}function k(e){return Math.ceil(e.split(/\s+/).length/200)}function q(){let e=y(),t=new Set;return e.forEach(e=>{e.categories.forEach(e=>t.add(e))}),Array.from(t).sort()}function S(){let e=y(),t=new Set;return e.forEach(e=>{e.tags.forEach(e=>t.add(e))}),Array.from(t).sort()}},43327:(e,t,r)=>{function o(e){return("string"==typeof e?new Date(e):e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}function n(e,t){let r=encodeURIComponent(e),o=encodeURIComponent(t);return{twitter:`https://twitter.com/intent/tweet?url=${r}&text=${o}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${r}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${r}`}}function i(e){let t="https://veloceai.co",r=new Date().toISOString();return`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[{url:"",priority:"1.0",changefreq:"weekly"},{url:"/blog",priority:"0.9",changefreq:"daily"},{url:"/about",priority:"0.8",changefreq:"monthly"}].map(e=>`  <url>
    <loc>${t}${e.url}</loc>
    <lastmod>${r}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join("\n")}
${e.map(e=>`  <url>
    <loc>${t}/blog/${e.slug}</loc>
    <lastmod>${new Date(e.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
</urlset>`}function s(e){let t="https://veloceai.co",r=new Date().toISOString();return`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>VeloceAI Blog</title>
    <description>AI support bot development insights and best practices</description>
    <link>${t}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${r}</lastBuildDate>
    <atom:link href="${t}/rss.xml" rel="self" type="application/rss+xml"/>
    ${e.map(e=>`    <item>
      <title>${e.title}</title>
      <description>${e.excerpt}</description>
      <link>${t}/blog/${e.slug}</link>
      <guid>${t}/blog/${e.slug}</guid>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <author>${e.author}</author>
    </item>`).join("\n")}
  </channel>
</rss>`}r.d(t,{P1:()=>n,Yq:()=>o,cG:()=>s,vB:()=>i})}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[994,119],()=>r(23467));module.exports=o})();
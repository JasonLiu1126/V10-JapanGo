let role=localStorage.getItem("safe_role")||"Joe Black";
let currentPos=null,currentArea=null;
const boughtKey="japango_bought_v10", favKey="japango_fav_v10";
function esc(s){return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}
function go(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}
function openLink(url){location.href=url}
function getList(k){return JSON.parse(localStorage.getItem(k)||"[]")}
function toggleList(k,name){let a=getList(k);a=a.includes(name)?a.filter(x=>x!==name):[...a,name];localStorage.setItem(k,JSON.stringify(a));renderAll()}
function setRole(r){role=r;localStorage.setItem("safe_role",r);renderAll()}
function todayDay(){const t=new Date().toISOString().slice(0,10);return DATA.days.find(d=>d.date===t)||DATA.days[0]}
function hav(a,b,c,d){const R=6371,x=(c-a)*Math.PI/180,y=(d-b)*Math.PI/180;const z=Math.sin(x/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(y/2)**2;return R*2*Math.atan2(Math.sqrt(z),Math.sqrt(1-z))}
function distValue(i){if(!currentPos||!i||i.lat==null||i.lng==null)return null;return hav(currentPos.lat,currentPos.lng,Number(i.lat),Number(i.lng))}
function distText(i){const km=distValue(i);if(km==null)return "";return km<1?Math.round(km*1000)+"m":km.toFixed(1)+"km"}
function walkText(i){const km=distValue(i);if(km==null)return "";return `步行約${Math.max(1,Math.round(km/4.5*60))}分鐘`}
function distBadge(i){const d=distText(i);return d?`<span class="pill">距離 ${d}</span><span class="pill">${walkText(i)}</span>`:""}
function nearestArea(){if(!currentPos)return null;return DATA.areas.map(a=>({...a,_dist:hav(currentPos.lat,currentPos.lng,a.lat,a.lng)})).sort((a,b)=>a._dist-b._dist)[0]}
function clearOldCache(){if("serviceWorker" in navigator){navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()))}if(window.caches){caches.keys().then(ns=>ns.forEach(n=>caches.delete(n)))}alert("已清除舊快取，請重新整理。")}
function locateMe(){if(!navigator.geolocation){alert("此瀏覽器不支援定位");return}const s=document.getElementById("gpsStatus");if(s)s.textContent="定位中...";navigator.geolocation.getCurrentPosition(p=>{currentPos={lat:p.coords.latitude,lng:p.coords.longitude};currentArea=nearestArea();syncAreaSelect();if(s)s.textContent=`已定位：目前推定接近「${currentArea.name}」`;renderAll();go("guide")},e=>{if(s)s.textContent="定位失敗："+e.message;alert("定位未授權或失敗："+e.message)},{enableHighAccuracy:true,timeout:10000,maximumAge:60000})}
function setDemo(name){const a=DATA.areas.find(x=>x.name===name);currentArea=a;currentPos={lat:a.lat,lng:a.lng};syncAreaSelect();document.getElementById("gpsStatus").textContent=`Demo：目前推定接近「${a.name}」`;renderAll();go("guide")}
function manualArea(name){if(name)setDemo(name)}
function syncAreaSelect(){const s=document.getElementById("areaSelect"); if(s&&currentArea)s.value=currentArea.name}
function populateSelects(){const area=document.getElementById("areaSelect"); if(area && area.options.length<2){DATA.areas.forEach(a=>{let o=document.createElement("option");o.value=a.name;o.textContent=a.name;area.appendChild(o)})}const mall=document.getElementById("mallSelect"); if(mall && mall.options.length<1){DATA.malls.forEach((m,i)=>{let o=document.createElement("option");o.value=i;o.textContent=m.name;mall.appendChild(o)})}}
function itemScore(i){let score=i.score||0; const d=distValue(i); const day=todayDay(); if(currentArea&&i.area.includes(currentArea.name))score+=20; if(d!=null){ if(d<0.3)score+=30; else if(d<0.8)score+=20; else if(d<2.5)score+=10; else score-=20;} if(day.keys.some(k=>(i.name+i.cat+i.place).includes(k)))score+=25; if(i.role.includes(role))score+=10; if(getList(boughtKey).includes(i.name))score-=100; return score}
function filteredItems(){let arr=DATA.items.slice(); const type=document.getElementById("typeFilter")?.value||"all"; const cat=document.getElementById("catFilter")?.value||"all"; const sort=document.getElementById("sortFilter")?.value||"ai"; const q=(document.getElementById("searchBox")?.value||"").toLowerCase(); arr=arr.filter(i=>i.role.includes(role)||i.role.includes("全家")); if(type!=="all")arr=arr.filter(i=>i.type===type); if(cat!=="all")arr=arr.filter(i=>i.cat===cat); if(q)arr=arr.filter(i=>(i.name+i.cat+i.place+i.why).toLowerCase().includes(q)); if(sort==="limited")arr.sort((a,b)=>(b.limited-a.limited)||itemScore(b)-itemScore(a)); else if(sort==="distance")arr.sort((a,b)=>(distValue(a)??9999)-(distValue(b)??9999)); else if(sort==="score")arr.sort((a,b)=>(b.score||0)-(a.score||0)); else if(sort==="today"){const day=todayDay(); arr.sort((a,b)=>Number(day.keys.some(k=>(b.name+b.cat+b.place).includes(k)))-Number(day.keys.some(k=>(a.name+a.cat+a.place).includes(k)))||itemScore(b)-itemScore(a));} else arr.sort((a,b)=>itemScore(b)-itemScore(a)); return arr}
function itemCard(i){const bought=getList(boughtKey).includes(i.name), fav=getList(favKey).includes(i.name); const d=distValue(i); let level=d==null?"":d<0.3?"<span class='pill good'>現在附近</span>":d<0.8?"<span class='pill good'>順路可走</span>":d<2.5?"<span class='pill mid'>附近可排</span>":"<span class='pill'>搭車/搜尋</span>";return `<div class="card"><img class="photo" src="${i.img}"><span class="pill">${esc(i.type)}</span><span class="pill">${esc(i.cat)}</span>${i.limited?'<span class="pill limited">🇯🇵 日本限定</span>':''}${level}<span class="score">${Math.round(itemScore(i))}分</span><h3>${esc(i.name)}</h3>${distBadge(i)}<p>${esc(i.why)}</p><span class="pill">價格：${esc(i.price)}</span><span class="pill">地點：${esc(i.place)}</span><div class="btns"><button class="btn ${bought?'ghost':'pink'}" onclick="toggleList('${boughtKey}','${String(i.name).replaceAll("'","\\'")}')">${bought?'已買':'加入已買'}</button><button class="btn ${fav?'ghost':'blue'}" onclick="toggleList('${favKey}','${String(i.name).replaceAll("'","\\'")}')">${fav?'已收藏':'收藏'}</button><button class="btn map" onclick="openLink('${gmap(i.q||i.name)}')">Google</button></div></div>`}
function routeMatch(dest){const from=currentArea?.name;if(!from)return null;if(from===dest.area)return {title:`${from} → ${dest.name}`,options:[{label:"步行",best:true,mode:"🚶 Walk",time:walkText(dest)||"約5～15分鐘",fare:"¥0",stops:"近距離",transfer:"0次",steps:[`目前接近 ${from}`,`直接步行前往 ${dest.name}`,dest.note||""].filter(Boolean)}]};return DATA.routes.find(r=>r.from===from&&r.to===dest.area)}
function optionHtml(o){return `<div class="option ${o.best?'best':''}"><h4>${o.best?'⭐ ':''}${esc(o.label)}</h4><span class="pill">${esc(o.mode)}</span><span class="pill">時間：${esc(o.time)}</span><span class="pill">票價：${esc(o.fare)}</span><span class="pill">站數：${esc(o.stops)}</span><span class="pill">轉乘：${esc(o.transfer)}</span>${(o.steps||[]).map(s=>`<div class="step">${esc(s)}</div>`).join("")}</div>`}
function routeCard(dest){const r=routeMatch(dest); if(!r)return `<div class="card"><img class="photo" src="${img(dest.name)}"><span class="pill">${esc(dest.type)}</span><h3>${esc(dest.name)}</h3>${distBadge(dest)}<div class="warn">這段尚未內建多方案，請用 Google 即時路線。</div><div class="btns"><button class="btn map" onclick="openLink('${gdir(currentArea?.name||'現在位置',dest.q)}')">Google 即時路線</button></div></div>`;return `<div class="card"><img class="photo" src="${img(dest.name)}"><span class="pill">${esc(dest.type)}</span><h3>${esc(dest.name)}</h3>${distBadge(dest)}<div class="aiHero"><b>${esc(r.title)}</b><br><span class="small">參考票價，現場以 Google / 車站為準。</span></div>${r.options.map(optionHtml).join("")}<div class="btns"><button class="btn map" onclick="openLink('${gdir(currentArea?.name||'現在位置',dest.q)}')">Google 即時路線</button><button class="btn apple" onclick="openLink('${amap(dest.q)}')">Apple</button></div></div>`}

function isAppleDevice(){
  return /iPhone|iPad|Macintosh|Mac OS/i.test(navigator.userAgent);
}
function weatherCityForDay(d){
  if(d.city.includes("大阪")) return DATA.weatherCities["大阪"];
  if(d.city.includes("橫濱")) return DATA.weatherCities["橫濱"];
  if(d.city.includes("東京")) return DATA.weatherCities["東京"];
  if(d.area.includes("成田")) return DATA.weatherCities["成田"];
  return DATA.weatherCities["大阪"];
}
function weatherLink(city){
  if(isAppleDevice()){
    return "https://weather.apple.com/";
  }
  return "https://www.google.com/search?q="+encodeURIComponent(city.google);
}
function weatherIcon(code){
  if(code===0) return "☀️";
  if([1,2].includes(code)) return "🌤️";
  if(code===3) return "☁️";
  if([45,48].includes(code)) return "🌫️";
  if([51,53,55,56,57].includes(code)) return "🌦️";
  if([61,63,65,66,67,80,81,82].includes(code)) return "🌧️";
  if([95,96,99].includes(code)) return "⛈️";
  return "🌤️";
}
function fallbackWeather(city){
  const name=city.jp;
  const hot=name==="大阪"||name==="東京";
  return [
    {title:"今日",icon:"🌤️",hi:hot?33:31,lo:hot?27:25,rain:40,humidity:78,note:"夏季參考值"},
    {title:"明日",icon:"🌦️",hi:hot?34:32,lo:hot?27:25,rain:50,humidity:80,note:"夏季參考值"}
  ];
}
async function loadWeather(){
  const box=document.getElementById("weatherBox");
  if(!box) return;
  const d=todayDay();
  const city=weatherCityForDay(d);
  box.innerHTML=`<section><h2>今日 / 明日天氣</h2><div class="card"><p>讀取 ${city.jp} 天氣中...</p></div></section>`;
  let dataArr=fallbackWeather(city);
  let sourceNote="若讀取失敗，顯示夏季參考值；點下方按鈕查看即時天氣。";
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=relative_humidity_2m&forecast_days=2&timezone=Asia%2FTokyo`;
    const res=await fetch(url,{cache:"no-store"});
    const w=await res.json();
    const hums=(w.hourly&&w.hourly.relative_humidity_2m)||[];
    const avgHum = hums.length ? Math.round(hums.slice(0,24).reduce((a,b)=>a+b,0)/Math.min(24,hums.length)) : null;
    dataArr=[0,1].map((i)=>({
      title:i===0?"今日":"明日",
      icon:weatherIcon(w.daily.weather_code[i]),
      hi:Math.round(w.daily.temperature_2m_max[i]),
      lo:Math.round(w.daily.temperature_2m_min[i]),
      rain:w.daily.precipitation_probability_max[i] ?? "-",
      humidity:avgHum ?? "-",
      note:"即時預報"
    }));
    sourceNote="天氣資料由免金鑰天氣服務即時讀取；實際以點開的天氣頁/App為準。";
  }catch(e){}
  box.innerHTML=`<section><h2>今日 / 明日天氣｜${city.jp}</h2>
  <div class="weatherGrid">${dataArr.map(w=>`<div class="weatherCard">
    <span class="pill">${w.title}</span><span class="pill">${w.note}</span>
    <div class="weatherBig">${w.icon} ${w.lo}°C / ${w.hi}°C</div>
    <div class="weatherMeta">
      <span>降雨機率：${w.rain}%</span>
      <span>濕度：${w.humidity}%</span>
      <span>地點：${city.jp}</span>
      <span>適用：Google / iPhone</span>
    </div>
  </div>`).join("")}</div>
  <div class="card"><p class="small">${sourceNote}</p>
    <div class="btns">
      <button class="btn map" onclick="openLink('${"https://www.google.com/search?q="+encodeURIComponent(city.google)}')">Google 天氣</button>
      <button class="btn apple" onclick="openLink('https://weather.apple.com/')">Apple 天氣</button>
      <button class="btn ghost" onclick="loadWeather()">重新整理天氣</button>
    </div>
  </div></section>`;
}

function renderToday(){const d=todayDay();document.getElementById("rolePill").textContent="角色："+role;document.getElementById("todayBox").innerHTML=`<div class="card"><img class="photo" src="${d.photo}"><span class="pill">今天：${esc(d.label)}</span><span class="pill">${esc(d.city)}・${esc(d.area)}</span><h3>${esc(d.hotel.name)}</h3><p>${esc(d.next)}</p><ul>${d.plan.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><div class="btns"><button class="btn map" onclick="locateMe()">更新定位</button><button class="btn map" onclick="openLink('${gmap(d.center)}')">今日地圖</button></div><h3>今日地圖快捷</h3><div class="btns">${(d.mapLinks||[]).map(m=>`<button class="btn ghost" onclick="openLink('${gmap(m.q)}')">${esc(m.label)}</button>`).join("")}</div></div>`}
function renderGuide(){const arr=filteredItems().slice(0,30);document.getElementById("guideBox").innerHTML=arr.length?arr.map(itemCard).join(""):`<div class="empty">沒有符合條件的資料。</div>`}
function renderRoute(){const d=todayDay();const todays=(typeof PLACE_DB!=="undefined"?PLACE_DB:DATA.destinations).filter(x=>(x.day||[]).includes(d.day));document.getElementById("routeBox").innerHTML=(currentArea?`<div class="aiHero"><h3>目前位置：${esc(currentArea.name)}</h3></div>`:`<div class="aiHero"><h3>先定位或選 Demo 區域</h3></div>`)+`<h3>今天目的地</h3>`+todays.map(routeCard).join("")+`<h3>全部常用目的地</h3>`+DATA.destinations.filter(x=>!todays.includes(x)).map(routeCard).join("")}
function renderDays(){document.getElementById("daysList").innerHTML=DATA.days.map(d=>`<div class="card"><img class="photo" src="${d.photo}"><span class="pill">Day ${d.day}</span><span class="pill">${esc(d.city)}・${esc(d.area)}</span><h3>${esc(d.label)}｜${esc(d.hotel.name)}</h3><ul>${d.plan.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p><b>下一步：</b>${esc(d.next)}</p><div class="btns"><button class="btn map" onclick="openLink('${gmap(d.center)}')">今日 Google</button><button class="btn apple" onclick="openLink('${amap(d.center)}')">今日 Apple</button></div></div>`).join("")}
function renderMall(){const idx=Number(document.getElementById("mallSelect")?.value||0);const m=DATA.malls[idx];document.getElementById("mallBox").innerHTML=`<div class="card"><h3>${esc(m.name)}</h3><span class="pill">${esc(m.area)}</span><div class="btns"><button class="btn map" onclick="openLink('${gmap(m.q)}')">Google</button></div>${m.floors.map(f=>`<div class="mallFloor"><h4>${esc(f.floor)}</h4><ul>${f.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>`}
function renderLists(){const bought=getList(boughtKey), fav=getList(favKey);document.getElementById("listsBox").innerHTML=`<div class="card"><h3>已買 ${bought.length} 項</h3><ul>${bought.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><button class="btn red" onclick="localStorage.removeItem('${boughtKey}');renderAll()">清空已買</button></div><div class="card"><h3>收藏 ${fav.length} 項</h3><ul>${fav.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><button class="btn red" onclick="localStorage.removeItem('${favKey}');renderAll()">清空收藏</button></div>`}

function placeForDay(d){
  return (typeof PLACE_DB!=="undefined"?PLACE_DB:[]).filter(p=>(p.day||[]).includes(d.day));
}
function placeInfoCard(p){
  return `<div class="card">
    <img class="photo" src="${p.img}">
    <span class="pill">${esc(p.type)}</span><span class="pill">${esc(p.area)}</span><span class="pill">${esc(p.time||"")}</span>
    <h3>${esc(p.name)}</h3>
    ${distBadge(p)}
    <p>${esc(p.note||"")}</p>
    <div class="infoGrid">
      <div><b>地址</b><br>${esc(p.address||"")}</div>
      <div><b>電話</b><br>${p.phone?`<a href="tel:${esc(p.phone)}">${esc(p.phone)}</a>`:"-"}</div>
      <div><b>營業</b><br>${esc(p.hours||"請以官方/Google為準")}</div>
      <div><b>區域</b><br>${esc(p.area)}</div>
    </div>
    ${routeCard(p)}
    <div class="btns">
      <button class="btn map" onclick="openLink('${gmap(p.q||p.name)}')">Google Maps</button>
      <button class="btn apple" onclick="openLink('${amap(p.q||p.name)}')">Apple Maps</button>
      ${p.phone?`<button class="btn ghost" onclick="openLink('tel:${p.phone}')">撥電話</button>`:""}
      ${p.site?`<button class="btn blue" onclick="openLink('${p.site}')">官方網站</button>`:""}
    </div>
  </div>`;
}
function renderPlaceCards(){
  const box=document.getElementById("placeCardsBox");
  if(!box) return;
  const d=todayDay();
  const arr=placeForDay(d);
  box.innerHTML=`<div class="aiHero"><h3>${esc(d.label)}｜${esc(d.city)} ${esc(d.area)}</h3><p>每一站都恢復完整 Google / Apple / 地址 / 電話 / 交通卡。</p><div class="placeFlow">${arr.map(p=>`<span>${esc(p.time)} ${esc(p.name)}</span>`).join("")}</div></div>`+arr.map(placeInfoCard).join("");
}

function renderAll(){populateSelects();syncAreaSelect();renderToday();loadWeather();renderGuide();renderRoute();renderDays();renderPlaceCards();renderMall();renderLists()}
populateSelects();renderAll();

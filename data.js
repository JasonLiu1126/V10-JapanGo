
const img=q=>"https://tse1.mm.bing.net/th?q="+encodeURIComponent(q)+"&w=900&h=700&c=7";
const gmap=q=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q);
const amap=q=>"https://maps.apple.com/?q="+encodeURIComponent(q);
const gdir=(from,to)=>"https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(from)+"&destination="+encodeURIComponent(to)+"&travelmode=transit";

const DATA={
areas:[
{name:"梅田",lat:34.7047,lng:135.4968},{name:"心齋橋",lat:34.6737,lng:135.501},{name:"USJ",lat:34.6654,lng:135.4323},{name:"港未來",lat:35.4579,lng:139.6328},{name:"橫濱關內",lat:35.4412,lng:139.6365},{name:"錦糸町",lat:35.6961,lng:139.8157},{name:"淺草",lat:35.7148,lng:139.7967},{name:"台場",lat:35.6252,lng:139.7757},{name:"銀座",lat:35.6697,lng:139.7647},{name:"成田",lat:35.773,lng:140.3929}
],
days:[
{day:1,date:"2026-07-01",label:"7/1（三）",city:"大阪",area:"KIX・臨空城・弁天町",photo:img("Rinku Premium Outlets Osaka"),hotel:{name:"ART 大阪灣酒店",q:"Art Hotel Osaka Bay Tower"},plan:["抵達 KIX","臨空城 Premium Outlets","Check in ART 大阪灣酒店"],next:"臨空城先買鞋與外套",center:"Rinku Premium Outlets",keys:["鞋","外套","Outlet"],mapLinks:[{label:"KIX 關西機場",q:"Kansai International Airport Terminal 1"},{label:"臨空城 Outlet",q:"Rinku Premium Outlets"}]},
{day:2,date:"2026-07-02",label:"7/2（四）",city:"大阪",area:"USJ",photo:img("Universal Studios Japan Super Nintendo World"),hotel:{name:"ART 大阪灣酒店",q:"Art Hotel Osaka Bay Tower"},plan:["大阪環球影城","早點出門搶任天堂整理券"],next:"任天堂區優先，紀念品預算先講好。",center:"Universal Studios Japan",keys:["USJ限定","Nintendo","小孩"],mapLinks:[{label:"USJ 大阪環球影城",q:"Universal Studios Japan"}]},
{day:3,date:"2026-07-03",label:"7/3（五）",city:"大阪",area:"梅田・難波・心齋橋",photo:img("Umeda Osaka LUCUA Grand Front shopping"),hotel:{name:"阪急大阪龍仕柏酒店",q:"Hotel Hankyu Respire Osaka"},plan:["Check in 阪急大阪龍仕柏酒店","ORIHICA / LUCUA / Loft","心齋橋","17:00 / 19:00 LaBless 頭髮"],next:"ORIHICA → LUCUA → Grand Front → LaBless。",center:"Hotel Hankyu Respire Osaka",keys:["ORIHICA","SUQQU","DECORTÉ","IPSA","LaBless"],mapLinks:[{label:"ORIHICA",q:"ORIHICA DIAMOR大阪店"},{label:"LUCUA",q:"LUCUA Osaka"},{label:"LaBless",q:"LaBless ONE LaLaBless グランフロント大阪北館 B1F"}]},
{day:4,date:"2026-07-04",label:"7/4（六）",city:"大阪",area:"梅田・萬博公園",photo:img("Expo 70 Commemorative Park Osaka Tower of the Sun"),hotel:{name:"阪急大阪龍仕柏酒店",q:"Hotel Hankyu Respire Osaka"},plan:["10:00 頭髮","早上補梅田","萬博公園"],next:"早上補梅田；下午萬博。",center:"Expo 70 Commemorative Park Osaka",keys:["GLOBAL WORK","WORKMAN","防曬"],mapLinks:[{label:"萬博公園",q:"Expo '70 Commemorative Park Osaka"}]},
{day:5,date:"2026-07-05",label:"7/5（日）",city:"橫濱",area:"大阪 → 橫濱",photo:img("Shinkansen Osaka to Yokohama"),hotel:{name:"Hotel Comento Yokohama Kannai",q:"Hotel Comento Yokohama Kannai"},plan:["Check out","17:00 新幹線","Check in Hotel Comento"],next:"移動日，不買重物。",center:"Hotel Comento Yokohama Kannai",keys:["行李","便利商店","移動"],mapLinks:[{label:"新大阪站",q:"Shin-Osaka Station"},{label:"新橫濱站",q:"Shin-Yokohama Station"}]},
{day:6,date:"2026-07-06",label:"7/6（一）",city:"橫濱",area:"港未來",photo:img("Yokohama Minato Mirai Red Brick Warehouse night"),hotel:{name:"Hotel Comento Yokohama Kannai",q:"Hotel Comento Yokohama Kannai"},plan:["杯麵博物館","紅磚倉庫","橫濱空中纜車","港未來夜景"],next:"MARK IS 補買，晚上拍照。",center:"MARK IS Minato Mirai",keys:["MARK IS","Loft","紅磚倉庫"],mapLinks:[{label:"杯麵博物館",q:"Cup Noodles Museum Yokohama"},{label:"MARK IS",q:"MARK IS Minato Mirai"}]},
{day:7,date:"2026-07-07",label:"7/7（二）",city:"橫濱",area:"八景島・中華街",photo:img("Yokohama Hakkeijima Sea Paradise Chinatown"),hotel:{name:"Hotel Comento Yokohama Kannai",q:"Hotel Comento Yokohama Kannai"},plan:["飯店早餐","八景島","中華街晚餐"],next:"景點日，不排重購物。",center:"Yokohama Chinatown",keys:["八景島","中華街"],mapLinks:[{label:"八景島",q:"Yokohama Hakkeijima Sea Paradise"}]},
{day:8,date:"2026-07-08",label:"7/8（三）",city:"東京",area:"錦糸町",photo:img("Kinshicho Tokyo PARCO shopping"),hotel:{name:"MIMARU Tokyo Kinshicho",q:"MIMARU Tokyo Kinshicho"},plan:["飯店早餐","Check out","Check in 放行李","錦糸町補貨"],next:"東京補貨日。",center:"MIMARU Tokyo Kinshicho",keys:["PARCO","藥妝","UNIQLO"],mapLinks:[{label:"錦糸町 PARCO",q:"Kinshicho PARCO"}]},
{day:9,date:"2026-07-09",label:"7/9（四）",city:"東京",area:"淺草・台場",photo:img("Asakusa Sensoji Odaiba DiverCity Gundam"),hotel:{name:"MIMARU Tokyo Kinshicho",q:"MIMARU Tokyo Kinshicho"},plan:["淺草寺","10:40 前到淺草碼頭","Tokyo Cruise Emeraldas 11:00","台場","DiverCity / 鋼彈"],next:"台場輕鬆逛。",center:"DiverCity Tokyo Plaza",keys:["DiverCity","鋼彈","台場"],mapLinks:[{label:"淺草寺",q:"Senso-ji Temple"},{label:"DiverCity",q:"DiverCity Tokyo Plaza"}]},
{day:10,date:"2026-07-10",label:"7/10（五）",city:"東京",area:"麻布台・豐洲・銀座",photo:img("Ginza Six Uniqlo Ginza Tokyo shopping"),hotel:{name:"MIMARU Tokyo Kinshicho",q:"MIMARU Tokyo Kinshicho"},plan:["teamLab 麻布台","豐洲千客萬來","mont-bell 東京京橋店","UNIQLO 銀座"],next:"銀座收尾。",center:"UNIQLO Ginza",keys:["UNIQLO","GINZA SIX","SHIRO","THREE","POLA"],mapLinks:[{label:"teamLab",q:"teamLab Borderless Azabudai Hills"},{label:"UNIQLO銀座",q:"UNIQLO Ginza"}]},
{day:11,date:"2026-07-11",label:"7/11（六）",city:"東京",area:"成田返台",photo:img("Narita Airport Terminal 2 duty free"),hotel:{name:"返台",q:"Narita Airport Terminal 2"},plan:["成田機場 T2 → 桃園機場 T2"],next:"只補免稅與伴手禮。",center:"Narita Airport Terminal 2",keys:["免稅","伴手禮"],mapLinks:[{label:"成田機場 T2",q:"Narita Airport Terminal 2"}]}
],
destinations:[
{name:"LaBless ONE＆LaLaBless",area:"梅田",q:"LaBless ONE LaLaBless グランフロント大阪北館 B1F",lat:34.7064,lng:135.4949,type:"剪頭髮",day:[3,4],note:"大阪府大阪市北区大深町3-1 グランフロント大阪北館 B1F"},
{name:"ORIHICA DIAMOR大阪店",area:"梅田",q:"ORIHICA DIAMOR大阪店",lat:34.6997,lng:135.4975,type:"購物",day:[3]},
{name:"LUCUA Osaka",area:"梅田",q:"LUCUA Osaka",lat:34.7046,lng:135.4956,type:"購物",day:[3,4]},
{name:"Universal Studios Japan",area:"USJ",q:"Universal Studios Japan",lat:34.6654,lng:135.4323,type:"景點",day:[2]},
{name:"DiverCity Tokyo Plaza",area:"台場",q:"DiverCity Tokyo Plaza",lat:35.6252,lng:139.7757,type:"購物",day:[9]},
{name:"UNIQLO 銀座",area:"銀座",q:"UNIQLO Ginza",lat:35.6697,lng:139.7647,type:"購物",day:[10]},
{name:"成田機場 T2",area:"成田",q:"Narita Airport Terminal 2",lat:35.773,lng:140.3929,type:"機場",day:[11]}
],
routes:[
{from:"心齋橋",to:"梅田",title:"心齋橋 / 難波 → 梅田 / LaBless",options:[{label:"御堂筋線最快",best:true,mode:"🚇 Osaka Metro",time:"約15～22分鐘",fare:"約 ¥240",stops:"3站",transfer:"0次",steps:["心齋橋站","御堂筋線往梅田 / 新大阪方向","梅田站下車","步行到 Grand Front 北館 B1F"]}]},
{from:"梅田",to:"心齋橋",title:"梅田 → 心齋橋 / 難波",options:[{label:"御堂筋線最快",best:true,mode:"🚇 Osaka Metro",time:"約12～18分鐘",fare:"約 ¥240",stops:"3站",transfer:"0次",steps:["梅田站","御堂筋線往天王寺方向","心齋橋站下車"]}]},
{from:"梅田",to:"USJ",title:"梅田 / 大阪站 → USJ",options:[{label:"JR 少轉乘",best:true,mode:"🚆 JR",time:"約15～25分鐘",fare:"約 ¥190～¥230",stops:"約5站",transfer:"0～1次",steps:["JR 大阪站","大阪環狀線往西九条","西九条轉 JR 夢咲線","Universal City站"]}]},
{from:"USJ",to:"梅田",title:"USJ → 梅田 / LaBless",options:[{label:"JR 回大阪站",best:true,mode:"🚆 JR",time:"約20～30分鐘",fare:"約 ¥190～¥230",stops:"約5站",transfer:"0～1次",steps:["Universal City站","JR 夢咲線到西九条","轉大阪環狀線到大阪站"]}]},
{from:"錦糸町",to:"淺草",title:"錦糸町 → 淺草",options:[{label:"半藏門線＋都營淺草線",best:true,mode:"🚇",time:"約20～30分鐘",fare:"約 ¥220～¥300",stops:"約3～5站",transfer:"1次",steps:["錦糸町搭半藏門線到押上","押上轉都營淺草線","淺草站"]}]},
{from:"淺草",to:"台場",title:"淺草 → 台場",options:[{label:"Tokyo Cruise",best:true,mode:"🚢",time:"船約40～60分鐘",fare:"約 ¥1,500～¥2,200",stops:"水路",transfer:"0次",steps:["Asakusa Pier","Tokyo Cruise / Emeraldas","台場"]}]},
{from:"錦糸町",to:"銀座",title:"錦糸町 → 銀座",options:[{label:"JR＋步行/Metro",best:true,mode:"🚆/🚇",time:"約20～30分鐘",fare:"約 ¥220～¥300",stops:"約4～7站",transfer:"0～1次",steps:["錦糸町站","JR 到東京 / 有樂町","步行或轉 Metro 到銀座"]}]}
],
items:[
{id:"orihica",name:"ORIHICA Easy Care 襯衫 / Smart Slacks",type:"shopping",role:["Joe Black"],area:["梅田"],cat:"男裝",score:98,limited:false,price:"約 ¥3,990～¥7,990",why:"抗皺、可洗，適合上班與商務休閒。",place:"ORIHICA DIAMOR大阪店",q:"ORIHICA DIAMOR大阪店",lat:34.6997,lng:135.4975,img:img("ORIHICA easy care shirt smart slacks men"),radius:1.2},
{id:"ocean",name:"OCEAN TRICO Powder Wax",type:"shopping",role:["Joe Black"],area:["梅田","銀座","錦糸町"],cat:"髮品",score:96,limited:false,price:"約 ¥1,500",why:"霧面、自然蓬鬆、不黏膩。",place:"Loft / Hands / 藥妝",q:"OCEAN TRICO Powder Wax Loft Osaka",lat:34.704,lng:135.497,img:img("OCEAN TRICO Powder Wax"),radius:1.5},
{id:"uno",name:"UNO BB Cream / Face Color Creator",type:"shopping",role:["Joe Black"],area:["梅田","銀座","錦糸町"],cat:"男士美容",score:95,limited:false,price:"約 ¥900～¥1,500",why:"自然修飾暗沉，旅行與上班都實用。",place:"Loft / 藥妝 / @cosme",q:"UNO BB Cream Japan",lat:34.704,lng:135.497,img:img("UNO BB Cream Face Color Creator"),radius:1.5},
{id:"workman",name:"WORKMAN 機能外套",type:"shopping",role:["Joe Black"],area:["梅田","心齋橋"],cat:"男裝",score:97,limited:true,price:"約 ¥2,900～¥5,800",why:"透氣、防潑水、輕量，CP值高。",place:"Workman / Workman Colors",q:"Workman Colors Osaka",lat:34.704,lng:135.497,img:img("WORKMAN jacket Japan"),radius:2.0},
{id:"suqqu",name:"SUQQU / DECORTÉ / IPSA",type:"shopping",role:["Susan Parrish"],area:["梅田","銀座"],cat:"美妝",score:98,limited:false,price:"約 ¥5,000～¥18,000",why:"日本櫃點齊、色號多，阪急梅田/銀座最順。",place:"阪急梅田 / 銀座百貨",q:"SUQQU DECORTE IPSA Hankyu Umeda",lat:34.7035,lng:135.4987,img:img("SUQQU DECORTE IPSA cosmetics Japan"),radius:1.5},
{id:"lululun",name:"LULULUN / Quality 1st 面膜",type:"drugstore",role:["Susan Parrish","Joe Black"],area:["梅田","銀座","錦糸町","港未來"],cat:"保養",score:95,limited:false,price:"約 ¥1,500～¥2,500",why:"回飯店敷很實用，也適合帶回台灣。",place:"藥妝 / Loft / @cosme",q:"LULULUN Quality 1st mask Japan",lat:34.704,lng:135.497,img:img("LULULUN Quality 1st face mask Japan"),radius:2.0},
{id:"ete",name:"ete / STAR JEWELRY 飾品",type:"shopping",role:["Susan Parrish"],area:["梅田","銀座"],cat:"飾品",score:94,limited:false,price:"約 ¥8,000～¥30,000",why:"日本設計感，耳環項鍊戒指都適合紀念。",place:"LUCUA / Grand Front / GINZA SIX",q:"ete jewelry LUCUA Osaka",lat:34.7046,lng:135.4956,img:img("ete STAR JEWELRY Japan"),radius:1.2},
{id:"pokemon",name:"Pokemon Center 限定商品",type:"kids",role:["小孩"],area:["梅田","台場","錦糸町"],cat:"玩具",score:99,limited:true,price:"約 ¥1,000～¥8,000",why:"日本限定與地區限定最值得，小孩最有感。",place:"Pokemon Center / 台場 / 梅田",q:"Pokemon Center Osaka DX",lat:34.7032,lng:135.4958,img:img("Pokemon Center Japan limited goods"),radius:2.0},
{id:"nintendo",name:"Nintendo / USJ 任天堂限定",type:"kids",role:["小孩","Joe Black"],area:["USJ","台場"],cat:"玩具",score:99,limited:true,price:"約 ¥1,500～¥10,000",why:"USJ/台場限定商品回台難買。",place:"USJ / DiverCity / Nintendo Store",q:"Super Nintendo World Universal Studios Japan shop",lat:34.6654,lng:135.4323,img:img("Super Nintendo World merchandise Japan"),radius:2.0},
{id:"harbs",name:"HARBS 梅田",type:"food",role:["Joe Black","Susan Parrish","小孩"],area:["梅田"],cat:"甜點",score:93,limited:false,price:"約 ¥1,500～¥2,500",why:"購物中場休息，蛋糕很適合太太與小孩。",place:"HARBS Umeda",q:"HARBS Umeda Osaka",lat:34.7046,lng:135.4956,img:img("HARBS Umeda Osaka cake"),radius:1.0},
{id:"diverfood",name:"DiverCity Food Court",type:"food",role:["Joe Black","Susan Parrish","小孩"],area:["台場"],cat:"親子快吃",score:95,limited:false,price:"約 ¥1,000～¥2,000",why:"台場親子行程最方便，流動快。",place:"DiverCity",q:"DiverCity Tokyo Plaza food court",lat:35.6252,lng:139.7757,img:img("DiverCity Tokyo Plaza food court"),radius:1.5},
{id:"buttersand",name:"PRESS BUTTER SAND",type:"souvenir",role:["Joe Black","Susan Parrish"],area:["銀座","成田"],cat:"伴手禮",score:94,limited:true,price:"約 ¥1,200～¥3,000",why:"好分送、質感好，機場可補。",place:"東京車站 / 成田",q:"PRESS BUTTER SAND Tokyo",lat:35.6812,lng:139.7671,img:img("PRESS BUTTER SAND Japan"),radius:3.0}
],
malls:[
{name:"LUCUA Osaka",area:"梅田",q:"LUCUA Osaka",floors:[{floor:"B1 / 1F",items:["HARBS：甜點休息","Cosme Kitchen：女生保養小物"]},{floor:"2F-5F",items:["green label relaxing：女生上班休閒","ete：飾品","ABC MART：鞋"]},{floor:"周邊",items:["ORIHICA DIAMOR大阪店","Grand Front / LaBless"]}]},
{name:"Grand Front Osaka",area:"梅田",q:"Grand Front Osaka",floors:[{floor:"北館 B1F",items:["LaBless ONE＆LaLaBless：剪頭髮"]},{floor:"商場",items:["餐廳、咖啡、質感服飾","適合剪髮等待時家人逛"]}]},
{name:"DiverCity Tokyo Plaza",area:"台場",q:"DiverCity Tokyo Plaza",floors:[{floor:"戶外",items:["鋼彈拍照"]},{floor:"館內",items:["Food Court：親子快吃","玩具 / 鋼彈 / 休閒服"]}]},
{name:"GINZA SIX / 銀座",area:"銀座",q:"GINZA SIX",floors:[{floor:"百貨",items:["SUQQU / DECORTÉ / IPSA","SHIRO / THREE / POLA","精品與香水"]},{floor:"周邊",items:["UNIQLO Ginza","資生堂 Parlour","mont-bell 東京京橋"]}]}
],
weatherCities:{
"大阪":{name:"Osaka",jp:"大阪",lat:34.6937,lng:135.5023,google:"Osaka weather",apple:"Osaka Japan weather"},
"橫濱":{name:"Yokohama",jp:"橫濱",lat:35.4437,lng:139.6380,google:"Yokohama weather",apple:"Yokohama Japan weather"},
"東京":{name:"Tokyo",jp:"東京",lat:35.6762,lng:139.6503,google:"Tokyo weather",apple:"Tokyo Japan weather"},
"成田":{name:"Narita",jp:"成田",lat:35.7730,lng:140.3929,google:"Narita Airport weather",apple:"Narita Airport weather"}
}

};

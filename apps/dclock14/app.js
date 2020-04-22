// eliminate ide undefined errors
let g;
let Bangle;



// segment font
require("./fonts").add(Graphics);
let init = true;
const pos = {
  hrmin:{ x:  24, y:  30 },
  sec:  { x: 190, y:  54 },
  date: { x:  10, y:  90 },
  ts:   { x:  40, y: 120 },
  doy:  { x:  40, y: 150 },
  pcy:  { x:  40, y: 180 },
  et:   { x:  56, y: 210 }
};
const col = {
  hrmin:( 0 << 11) | (55 << 5),
  sec:  ( 0 << 11) | (47 << 5) | (31 << 0),
  date: (31 << 11) | (55 << 5),
  et:   (31 << 11) | (31 << 5),
  ts:   ( 0 << 11) | (31 << 5) | (31 << 0),
  doy:  (31 << 11) | ( 0 << 5) | (31 << 0),
  pcy:  (31 << 11) | (15 << 5) | (0 << 0)
};
const months = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
const dpm = (m,y) => (m==2&&ly(y))?29:[31,28,31,30,31,30,31,31,30,31,30,31][m];
const weekdays = ["So","Mo","Di","Mi","Do","Fr","Sa"];
const ly = (y) => !!((!(y%4) && y%100) ||(!(y%400)));
const spy = (y) => (ly(y)?366:365)*24*60*60;
const spm = (m,y) => dpm(m,y)*24*60*60;
const doy = (d,m,y) => [0,31,59,90,120,151,181,212,243,273,304,334][m]+d+((m>2 && ly(y))?1:0);
const onMinute = (now) => {
  // time
  let h = now.getHours();
  let m = now.getMinutes();
  g.setFont8x15Huge();
  g.setColor(col.hrmin);
  g.drawString((h<10?"0":"")+h+":"+(m<10?"0":"")+m, pos.hrmin.x, pos.hrmin.y, true);
  // date
  g.setFont8x15Large();
  g.setColor(col.date);
  g.drawString(weekdays[now.getDay()]+" "+(now.getDate() < 10?" ":"")+now.getDate()+"."+months[now.getMonth()]+"."+now.getFullYear(), pos.date.x, pos.date.y, true);
};

const onSecond = () => {
  let now = new Date();
  if(init || now.getSeconds() == 0) {
    onMinute(now);
    init = false;
  }
  // seconds
  g.setFont8x15Large();
  let s = now.getSeconds();
  g.setColor(col.sec);
  g.drawString((s<10?"0":"")+s, pos.sec.x, pos.sec.y, true);
  // ET
  let et = now.getTime() * 20.571428571428573;
  let em = parseInt((et/60e3)%60);
  let eh = parseInt((et/3600e3)%24);
  let ex = "ET "+(eh<10?"0":"")+eh+":"+(em<10?"0":"")+em;
  g.setColor(col.et);
  g.drawString(ex, pos.et.x, pos.et.y, true);
  // TS
  g.setColor(col.ts);
  g.drawString(Math.floor(now.getTime()/1000),pos.ts.x, pos.ts.y, true);
  // percentages
  let dy = now.getDate(), mo = now.getMonth(), yr = now.getFullYear();
  let ndoy = doy(dy,mo,yr);
  let pcd = (now.getHours()*3600 + now.getMinutes()*60+now.getSeconds())/(24*3600);
  g.setColor(col.doy);
  g.drawString("D "+(ndoy<100?ndoy<10?"  ":" ":"")+(ndoy+pcd).toFixed(4).replace("."," "),pos.doy.x, pos.doy.y, true);
  let pcy = (pcd+ndoy-1)/(ly(yr)?366:365);
  g.setColor(col.pcy);
  g.drawString("Y  "+pcy.toFixed(7).slice(2), pos.pcy.x, pos.pcy.y, true);
};

const startTimers = () => {
  timer = setInterval(onSecond, 1000);
};

Bangle.on('lcdPower', (on) => {
  if (on) {
    // g.clear();
    init = true;
    drawAll();
    startTimers();
    Bangle.drawWidgets();
  } else {
    if (timer) {
      clearInterval(timer);
    }
  }
});

g.clear();
g.setFont8x15();
startTimers();
onSecond();
Bangle.loadWidgets();
Bangle.drawWidgets();
g.setFont8x15();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });
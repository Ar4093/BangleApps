// eliminate ide undefined errors
let g;
let Bangle;

// segment font
function dc(a,s) {
  let e=s;
  for(let x of a)
    e = e.replace(new RegExp(x[0],"g"),x[1]);
  return e;
}
const seg_s = atob(dc([ ["!","AAM"], ['"',"wMD"], ["%","wAD"], ["&","AAD"], ["=","AAA"], ["@","AMD"], ["#","wMA"] ],
  '================PwMPwM======f4APw======APwAf4==Af/+P/8AM!AP/8P/8AM!AP/8f/+==f4Av8B""//////""gP9AH+==============f/+v/9""//////""gMB=======PwAPw======Af/+vz9%%%%%%gAB====gAB%%%%%%vz9f/+==============AA!!!AP/8P/8AM!!=======&8AD8======AA!!!!!!!!=======A!!======AH+AP8AM!!!!!AP8Af4==Af/+vz9%%%%%%vz9f/+==========Pz8f/+==AH+gP9""""""v8Bf4===AgMB""""""v/9f/+==f4AP0!!!!!!AP/8f/+==f4Av8B""""""gP9AH+==f/+v/9""""""gP9AH+==f4AvwAwAAwAAwAAwAAwAAwAAvz8f/+==f/+v/9""""""v/9f/+==f4Av8B""""""v/9f/+======AzAAz==========AAz8Az8==================AA!B@@@@@@AMB================gMA##wMMwMM##v8Af4==============Af/+v/8######v/8f/+===gAB%%//////""v/9f/+==f/+vz9%%%%%%gAB====gAB%%//////%%vz9f/+==f/+v/9""""""gMB===f/+v/8######gM===Af/+vz9%%%%%%gD9AH+==f/+P/8AM!!!!!AP/8f/+===gAB%%//////%%gAB===AH+AD9&&&&&&Pz9f/+==f/+Pz8=BhgDhwHA4OAcMAM====f/+Pz9&&&&&&AAB===f/+vz8wAAwAA/wA/wAwAAwAAvz8f/+==f/+vz8wAAwAAwAAwAAwAAwAAvz8f/+==f/+vz9%%%%%%vz9f/+==f/+v/8######v8Af4==Af/+vz9%%wD/wD/%%vz9f/+==f/+v/8#wNgwNwwM4wMcwMMv8Af4==Af4Av8B""""""gP9AH+===gAAwAAwAA/z8/z8wAAwAAg===AAf/+Pz9&&&&&&Pz9f/+==f/+Pz8=!AAcAA4ABwABgPwAf4==Af/+Pz9&&AD/AD/&&Pz9f/+===cAOfh+D/wAeAAeAD/wfh+cAO===f4AP8B@@@@@@P/9f/+==AH+gD9wYDw4DxwDzgD3AD2ADgAB===f/+vz9%%%%%%gAB===f4AP8!!!!!!AAP8AH+===gAB%%%%%%vz9f/+==f4AvwAwAAwAAwAAwAAwAAwAAvwAf4====B&&&&&&AAB===============f/+v/8######v/8f/+==f/+P/9@@@@@@AP9AH+==AH+AP9@@@@@@AMB===AH+AP9@@@@@@P/9f/+==f/+v/9""""""v8Bf4==Af/+v/8######gM===Af4Av8B""""""v/9f/+==f/+P/8AM!!!!!AAP8AH+======Az8Az8======AH+AD9&&&&&&Pz9f/+==f/+Pz8=BhgDhwHA4OAcMAM====f/+Pz9&&&&&&AAB===AH+AP8AM!AAP8AP8AM!AAP8AH+==AH+AP8AM!!!!!AAP8AH+==AH+AP9@@@@@@AP9AH+==f/+v/8######v8Af4==Af4Av8A######v/8f/+==AH+AP8AM!!!!!!===Af4Av8B""""""gP9AH+==f/+P/9@@@@@@AMB===AH+AD9&&&&&&AD9AH+==AH+AD8=!AAcAA4ABwABg====AH+AD9&&AD/AD/&&AD9AH+===cAOfh+D/wAeAAeAD/wfh+cAO===f4AP8B@@@@@@P/9f/+==AA!BAMbAMbAMzAMzANjANjAMB===f/+vz9%%%%%%gAB=======Pz8Pz8=======gAB%%%%%%vz9f/+=='));
Graphics.prototype.setSegFont = function() { this.setFontCustom(seg_s, 32, 12, 18); };
const weekdays = ["MO","DI","MI","DO","FR","SA","SO"];
const months = ["JAN","FEB","MAR","APR","MAI","JUN","JUL","AUG","SEP","OKT","NOV","DEZ"];
const monthdays = (m,ly) => [0,31,59,90,120,151,181,212,243,273,304,334][m]+(ly&&m>2?1:0);
const ly = y => y%4?false:y%100?true:y%400?false:true;
// http://forum.espruino.com/conversations/345155/#comment15172813
const locale = require('locale');
const p = Math.PI / 2;
const pRad = Math.PI / 180;
const faceWidth = 100; // watch face radius (240/2 - 24px for widget area)
const widgetHeight=24+1;
let timer = null;
let currentDate = new Date();
let lastbeat = -1;
let init = true;
const centerX = g.getWidth() / 2;
const centerY = (g.getHeight() / 2) + widgetHeight/2;

const seconds = (angle,after) => {
  const a = angle * pRad;
  const x = centerX + Math.sin(a) * faceWidth;
  const y = centerY - Math.cos(a) * faceWidth;

  // if 15 degrees, make hour marker larger
  const radius = after ? ((angle % 15) ? 0 : 2) : ((angle % 15) ? 1 : 3);
  if(radius > 0) g.fillCircle(x,y,radius);
};

const hand = (angle, r1, r2) => {
  const a = angle * pRad;
  const r3 = 3;

  g.fillPoly([
    Math.round(centerX + Math.sin(a) * r1),
    Math.round(centerY - Math.cos(a) * r1),
    Math.round(centerX + Math.sin(a + p) * r3),
    Math.round(centerY - Math.cos(a + p) * r3),
    Math.round(centerX + Math.sin(a) * r2),
    Math.round(centerY - Math.cos(a) * r2),
    Math.round(centerX + Math.sin(a - p) * r3),
    Math.round(centerY - Math.cos(a - p) * r3)
  ]);
};

const drawAll = () => {
  g.clear();
  currentDate = new Date();
  // draw hands first
  onMinute();
  // draw seconds
  const currentSec = currentDate.getSeconds();
  // draw all secs

  for (let i = 0; i < 60; i++) {
    if (i > currentSec) {
      g.setColor(0, 0.3, 0.6);
    } else {
      g.setColor(0.0, 0.5, 1);
    }
    seconds((360 * i) / 60, i>currentSec);
  }
  onSecond();

};

const drawET = () => {
  let et = currentDate.getTime() * 20.571428571428573;
  let em = parseInt((et/60e3)%60);
  let eh = parseInt((et/3600e3)%24);
  let ex = (eh<10?" ":"")+eh+":"+(em<10?"0":"")+em;
  g.setColor(1, 0.3, 0);
  g.drawString("ET", 212, 196);
  g.drawString(ex, 176, 216, true);
};

const resetSeconds = () => {
  g.setColor(0, 0.3, 0.6);
  for (let i = 0; i < 60; i++) {
    seconds((360 * i) / 60);
  }
};

const getBeat = () => {
  return Math.floor( (currentDate.getHours() + currentDate.getMinutes()/60 + currentDate.getSeconds() / 3600)*1000/24 );
};

const onSecond = () => {
  g.setColor(0, 0.5, 1);
  seconds((360 * currentDate.getSeconds()) / 60, false);
  if (currentDate.getSeconds() === 59) {
    resetSeconds();
    onMinute();
  }
  g.setColor(1, 0.8, 0);
  currentDate = new Date();
  seconds((360 * currentDate.getSeconds()) / 60, false);
  drawET();
  if(init || lastbeat < getBeat()) {
    g.setColor(0.5,0,1);
    lastbeat = getBeat();
    g.drawString((lastbeat < 100?lastbeat<10?"00":"0":"")+lastbeat, 6, 216);
  }
  init = false;
};

const drawDate = () => {
  // pad left date
  const dateString = ((currentDate.getDate() < 10) ? '0' : '') + currentDate.getDate();
  const dateDisplay = `${months[currentDate.getMonth()]}${dateString}`;
  const dayofyear = monthdays(currentDate.getMonth(), ly(currentDate.getFullYear())) + currentDate.getDate();
  g.setColor(0,1,0);
  g.drawString(weekdays[currentDate.getDay()], 4, widgetHeight+26, true);
  g.setColor(1,1,0);
  g.drawString(dateString, 4, widgetHeight+4, true);
  g.setColor(0,1,1);
  g.drawString(months[currentDate.getMonth()], 28, widgetHeight+4, true);
  g.setColor(1,0,1);
  g.drawString((dayofyear<100?dayofyear<10?"00":"0":"")+dayofyear, 6, 196, true);
};
const onMinute = () => {
  if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
    g.clear();
    resetSeconds();
  }
  // clear existing hands
  g.setColor(0, 0, 0);
  // Hour
  hand((360 * (currentDate.getHours() + currentDate.getMinutes() / 60)) / 12, -8, faceWidth - 35);
  // Minute
  hand((360 * currentDate.getMinutes()) / 60, -8, faceWidth - 10);

  // get new date, then draw new hands
  currentDate = new Date();
  drawDate();
  g.setColor(1, 0.5, 0);
  // Hour
  hand((360 * (currentDate.getHours() + currentDate.getMinutes() / 60)) / 12, -8, faceWidth - 35);
  g.setColor(0, 0.8, 0);
  // Minute
  hand((360 * currentDate.getMinutes()) / 60, -8, faceWidth - 10);
  /*if (currentDate.getHours() >= 0 && currentDate.getMinutes() === 0) {
    Bangle.buzz();
  }*/
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
    g.setSegFont();
  } else {
    if (timer) {
      clearInterval(timer);
    }
  }
});

g.clear();
g.setSegFont();
resetSeconds();
startTimers();
drawAll();
Bangle.loadWidgets();
Bangle.drawWidgets();
g.setSegFont();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });

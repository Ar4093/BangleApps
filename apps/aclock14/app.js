// eliminate ide undefined errors
let g;
let Bangle;
// font
const font815 = atob("AAAAAAAAAAAAAAAAAAAAAAAAAfzD+YAAAAAAAAAAAADwAeAAAAeADwAAAAAACID/4f/ARAf/D/4CIAAAAAAwgPGHMc4zhjwEMAAAOBhw8AeAPAHgDw4YHAAAAeBn4fhCeIe+Bj4AxAAAAAAAABADYAeADgAAAAAAAAAAAH8D/44DkAEAAAAAAAAAAgAnAcf/A/gAAAAAAgA1gH8AOABwA/gGsAEAAAAEAAgA/gH8AEAAgAAAAAAACAEwA8AHAAAAAAAAAgAEAAgAEAAgAEAAAAAAAAAAAAHAA4AAAAAAAAAAAAwAeAPAHgDwB4A8AGAAH8B/wYTCEIZDB/wH8AAAAAAgIMBD/4f/AAIABAAAAABg4cPCDIQxD8IPBAAAAABgwcHCEIQhD/4PeAAABwAeAGQBiAf/D/4AQAAAAAD4wfHCIIRBCP4Q+AAAAAA/wP/DIIRBCP4A+AAAAACAAQACD4R/D8AeAAAAAAB7wf/CMIQxD/4PeAAAAAB4AfhCEIQjD/wP8AAAAAAAAAABw4OHAAAAAAAAAAAACAExw8OHAAAAAAAAAAAEABwAbAGMBgwICAAAAAARACIARACIARACIAAAAABAQMGAxgDYAOAAgAAAAADAA4AEOYjzHwAcAAAAP+D/4QBCPIR5D/IPwAAAAAA/4P/DEAYgB/4H/AAAAAD/4f/CEIRxD74OOAAAAAB/wf/CAIQBDg4MGAAAAAD/4f/CAIYDB/wH8AAAAAD/4f/CEIQhCEIQBAAAAAD/4f/CIARACIAQAAAAAAB/wf/CAIQhDn4M/AAAAAD/4f/AEAAgD/4f/AAAAACAIQBD/4f/CAIQBAAAAAAAwAHAAIABD/4f+AAAf/D/4AgAOAHcDx4YDAAAAAD/4f/AAIABAAIABAAAf/D/4OAAcAOAD/4f/AAAf/D/4HgAOAA8D/4f/AAAAAB/wf/CAIQBD/4P+AAAAAD/4f/CEAQgD8APAAAAAAB/wf/CAIQBj/+P+QAAAAD/4f/CEAQwD/4PPAAAAABwwfHCMIQxDj4MOAAAAACAAQAD/4f/CAAQAAAAAAD/wf/AAIABD/4f+AAAAAD+Af8AB4APD/gfwAAAf/D/4AOAHAAOD/4f/AAAYDDg4GMAfAD4AxgcHDAYYADwAHAAP4B/A4AeADAAAACA4QfCHIThD4IcBAAAAAAAA//n/8gAkAEAAAAAwAHgAPAAeAA8AB4ADwAGAAAAAgAkAE//n/8AAAAADAB4AcAGAAcAB4ADAAAAABAAIABAAIABAAIABAAAAAAAAgAGAAYABgAAAAAAAAABwBfAKIBRAP4A/AAAAAD/4f/AIIBBAP4A+AAAAAAHwB/AIIBBAMYAiAAAAAAHwB/AIIBBD/4f/AAAAAAHwB/AJIBJAPIA4AAAAAAIAP/D/4RACIARAAAAAAAHwB/AIIBBAP+B/wAAAAD/4f/AIABAAP4A/AAAAAAIABADP4Z/AAIABAAAAAAAAAAAAAZ/zP+AAAAAAAD/4f/ABAAcAO4BjAAAAACAAQAD/4f/AAIABAAAB/AP4AgAHwBgAP4A/AAAAAAP4B/AIABAAP4A/AAAAAAHwB/AIIBBAP4A+AAAAAAP+B/wIIBBAP4A+AAAAAAHwB/AIIBBAP+B/wAAAAAP4B/AIABAAOAAwAAAAAAGIB5AJIBJAJ4BGAAAAAAIAP+B/4BBAIIBBAAAAAAPwB/AAIABAP4B/AAAAAAPgB+AAYADAPwB8AAAB8AP4ADADwADAP4B8AAABjAO4AcABAAcAO4BjAAAAAAPwB/AAIABAP+B/wAAAAAIYBHAJoBZAOIBhAAAAgAEAAgD/4/fkAEgAgAAAAAAAAAH/+//wAAAAAAAgAkAE/fj/4AgAEAAgAAAAwAMABAAOAAQAGABgAAA");
Graphics.prototype.setFont8x15 = function() {
  this.setFontCustom(font815, 32, 8, 15);
};
const weekdays = ["SO","MO","DI","MI","DO","FR","SA"];
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
  let ex = "ET"+(eh<10?" ":"")+eh+":"+(em<10?"0":"")+em;
  g.setColor(1, 0.3, 0);
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
  g.setFont8x15();
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
    g.drawString((lastbeat < 100?lastbeat<10?"00":"0":"")+lastbeat, 6, 216, true);
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
  } else {
    if (timer) {
      clearInterval(timer);
    }
  }
});

g.clear();
g.setFont8x15();
resetSeconds();
startTimers();
drawAll();
Bangle.loadWidgets();
Bangle.drawWidgets();
g.setFont8x15();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });
WIDGETS = {};

(() => {
  function draw() {
    let batt = E.getBattery();
    g.reset(); // reset the graphics context to defaults (color/font/etc)
      // add your code
    g.setFont("6x8",2);
    let txt = batt == 100 ? "\x95\x95" : ((batt<10?" ":"")+batt);
    g.drawString(txt,this.x, this.y+5, true);
    // outline
    if(Bangle && Bangle.isCharging()) g.setColor(1,0.8,0);
    else g.setColor(1,1,1);
    g.drawRect(this.x+24,this.y+4,this.x+31,this.y+22);
    g.fillRect(this.x+26,this.y+2,this.x+29,this.y+3);
    // fill
    if(batt >= 30) g.setColor(0,0.8,0);
    else if(batt >= 10) g.setColor(1,0.8,0);
    else g.setColor(1,0,0);
    if(batt > 0) g.fillRect(this.x+26,this.y+6+15-batt/100*15,this.x+29,this.y+20);
  }

  // add your widget
  WIDGETS.pbattery={
    area:"tr", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: 32, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})();

setInterval(() => WIDGETS.pbattery.draw(WIDGETS.pbattery), 5*60000);

Bangle.drawWidgets();
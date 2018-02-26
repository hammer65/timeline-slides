function Player(rate, line, width) {
  this.rate = rate;
  this.width = width;
  this.line = line;
  this.ref = null;
  this.playing = false;
}

Player.rand = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

Player.prototype.frame = function(go) {
  if (go) {

  }
}

Player.prototype.play = function() {
  var self = this;
  this.playing = true;
  console.log('playing');
  this.ref = setInterval(() => {
    // console.log(self);
    self.frame(Player.rand(0, 2));
  }, this.rate);
}

Player.prototype.stop = function() {
  console.log('stopping');
  this.playing = false;
  clearInterval(this.ref);
}

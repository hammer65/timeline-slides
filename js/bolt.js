function Bolt(width, height, points) {
  this.start;
  this.width = width;
  this.avgLen = 12;
  this.points = points + 1;
  this.pointStr = '';
  this.currPos = 0;
  this.branches = [];
}

Bolt.prototype.xValue = function(skew) {
  return Bolt.rand(this.sideRng.l + skew, this.sideRng.r + skew);
}

Bolt.prototype.yValue = function() {
  var center;
  var range;
  if (this.currPos === 0) {
    range = Bolt.range(this.avgLen, this.avgLen);
  } else {
    center = this.currPos + this.avgLen;
    range = Bolt.range(center, this.avgLen);
  }
  var yVal = Bolt.rand(range[0], range[1]);
  this.currPos = yVal;
  return yVal;
}

Bolt.prototype.point = function(x) {
  var y = this.yValue();
  if (Boolean(Bolt.rand(0, 2))) {
    // console.log(this.branches.push);
    this.branches.push([x, y]);
  }
  return x + ',' + y;
}

Bolt.prototype.generate = function() {
  this.start = this.start ? this.start : Bolt.rand(5, this.width - 5);
  this.sideRng = { l: this.start - 10, r: this.start + 10 };
  this.pointStr = '';
  this.branches = [];
  var sideSkew = Bolt.sideSkew();
  var s = sideSkew;
  var pointArr = [this.start + ',0'];
  for (var i = 0;i < this.points;i++) {
    pointArr.push(this.point(this.xValue(s)));
    s += sideSkew;
  }
  this.pointStr = pointArr.join(' ');
  this.currPos = 0;
  return this.pointStr;
}

Bolt.sideSkew = function() {
  var skew = Boolean(Bolt.rand(0, 2));
  return skew ? Bolt.rand(-10, 10) : 0;
}

Bolt.range = function(center, range) {
  var increment = range / 2;
  return [center - increment, center + increment];
}

Bolt.rand = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

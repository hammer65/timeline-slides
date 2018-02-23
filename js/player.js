function SlideShow(id, config) {
  this.currentSlide = null;
  this.init(id, config);
}

function secToTime(secs) {
  var hours   = Math.floor(secs / 3600);
  var minutes = Math.floor((secs - (hours * 3600)) / 60);
  var seconds = secs - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}

SlideShow.hide = function(el) {
  el.style.display = 'none';
}

SlideShow.show = function(el) {
  el.style.display = 'block'
}

SlideShow.prototype.handleTimeChange = function(time) {
  var formattedTime = secToTime(Math.round(time, 2));
  this.timeDisplay.innerHTML = formattedTime;
  var id = this.getElementId(formattedTime);
  if (id) {
    console.log(this.currentSlide);
    if (this.currentSlide) SlideShow.hide(this.currentSlide);
    this.currentSlide = document.querySelector('#' + id)
    SlideShow.show(this.currentSlide);
  }
}

SlideShow.prototype.getElementId = function(time) {
  return this.config[time] || null;
}

SlideShow.prototype.init = function(id, config) {
  this.player = document.querySelector('#' + id);
  this.timeDisplay = document.querySelector('#time');
  this.time = 0;
  this.config = config;
  if (config[0]) {
    var id = config[0];
    this.currentSlide = document.querySelector('#' + id)
    SlideShow.show(this.currentSlide);
  }
  var self = this;
  this.player.addEventListener('timeupdate', function(e) {
    self.handleTimeChange(e.target.currentTime);
  });
}

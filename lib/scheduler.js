'use strict'
var cronParser = require('cron-parser');
 
function Scheduler(cronTime, options, onTick){
  this.cronInterval = cronParser.parseExpression(cronTime);
  this.onTick = onTick;
  return this;
};

Scheduler.prototype.start = function(){
  var timeNow = new Date().getTime();
  var remainingTime = this.cronInterval.next().getTime() - timeNow;
  this.timer = this._setTimeout(remainingTime);
};

Scheduler.prototype.stop = function(){
  clearTimeout(this.timer)
}

Scheduler.prototype._setTimeout = function(remainingTime){
  var _this = this;
  setTimeout(function(){
    _this.onTick();
    var remainingTime = _this.cronInterval.next().getTime() - new Date().getTime();
    _this.timer = _this._setTimeout(remainingTime);
  }, remainingTime);
};
 
module.exports = Scheduler;
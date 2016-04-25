'use strict'
var cronParser = require('cron-parser');
 
function Scheduler(time, onTick){
  if (!(time instanceof Date)){
    try{
      this.cronInterval = cronParser.parseExpression(time);
    } catch(e){
      onTick("Please provide a date object or a sting in the Crontab format");
    }
  } else {
    this.dateTime = time;
  }

  this.onTick = onTick;
  return this;
};

Scheduler.prototype.start = function(){
  var timeNow = new Date().getTime();
  var remainingTime;

  if(this.cronInterval){

    remainingTime = this.cronInterval.next().getTime() - timeNow;
    setCronTimer.call(this, remainingTime);
  } else {

    remainingTime = this.dateTime.getTime() - timeNow;

    if(remainingTime > 0){  //dont run set timer if timer provided was in the past
      setDateTimer.call(this, remainingTime);
    }
  }
};

Scheduler.prototype.stop = function(){
  clearTimeout(this.timer);
}

var setDateTimer = function(remainingTime){
  var _this = this;

  _this.setLongTimeout(function(){
    _this.onTick();
  }, remainingTime);
}

var setCronTimer = function(remainingTime){
  var _this = this;

  _this.setLongTimeout(function(){
    _this.onTick();
    var remainingTime = _this.cronInterval.next().getTime() - new Date().getTime();
    _this.timer = setCronTimer.call(_this, remainingTime);
  }, remainingTime);
};

//settime out will trigger immediatly if remaining time provided is greater than 2147483647
//this function handles the case where time remaining is greater than 2147483647
Scheduler.prototype.setLongTimeout = function(callback, timeout_ms){
  var _this = this;

  if(timeout_ms > 2147483647) {   
    _this.timer = setTimeout(function(){ 
      _this.setLongTimeout(callback, (timeout_ms - 2147483647)); 
    }, 2147483647);
  }
  else {
    _this.timer = setTimeout(callback, timeout_ms);     
  }
}
 
module.exports = Scheduler;

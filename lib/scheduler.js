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
    this.setCronTimer(remainingTime);
  } else {

    remainingTime = this.dateTime.getTime() - timeNow;
    
    if(remainingTime > 0){
      this.setDateTimer(remainingTime);
    }
  }
};

Scheduler.prototype.stop = function(){
  clearTimeout(this.timer);
}

Scheduler.prototype.setDateTimer = function(remainingTime){
  var _this = this;
  this.timer = setTimeout(function(){
    _this.onTick();
  }, remainingTime);
}

Scheduler.prototype.setCronTimer = function(remainingTime){
  var _this = this;
  this.timer = setTimeout(function(){
    _this.onTick();
    var remainingTime = _this.cronInterval.next().getTime() - new Date().getTime();
    _this.timer = _this.setCronTimer(remainingTime);
  }, remainingTime);
};
/*
Scheduler.prototype.setLongTimeout = function(timeout_in_ms, callback){
  var _this = this;
  if(timeout_in_ms > 2147483647)
  {    
    _this.timer = setTimeout(function(){ 
      _this.setLongTimeout((timeout_in_ms - 2147483647), callback); 
    }, 2147483647);
  }
  else 
  {     
    _this.timer = setTimeout(callback, timeout_ms);     
  }
}*/
 
module.exports = Scheduler;
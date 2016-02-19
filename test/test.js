'use strict'
var chai = require('chai');
var sinon      = require('sinon');
var scheduler = require('./../lib/scheduler');
var clock;

describe('Scheduler', function(){
	beforeEach(function(){
		clock = sinon.useFakeTimers();
	});

	afterEach(function(){
		clock.restore();
	});

	it("should time out after 500 ms from now", function(){
		var now = new Date().getTime();
		var future = new Date(now + 500);
		var timeOut = false;
		var task = new scheduler(future, function(){
			timeOut = true;
		});
		task.start();

		chai.assert(timeOut === false, "time out is true before time is up");
		clock.tick(510);
		chai.assert(timeOut === true, "time out is false after time is up");
	});

	it("should time out every minute when give * * * * * cron format", function(){
		var timeOut = 0;
		var task = new scheduler('* * * * *', function(){
			timeOut++;
		});
		task.start();

		chai.assert.equal(timeOut, 0, "# of time out is not 0 before time out");
		clock.tick(59000);
		chai.assert.equal(timeOut, 1, "# of time out is not 1 after time out");
		clock.tick(60000);
		chai.assert.equal(timeOut, 2, "# of time out is not 2 after 2nd time out");
	});

	it("should not trigger timeout function when cancel is called", function(){
		var timeOut = 0;
		var task = new scheduler('* * * * *', function(){
			timeOut++;
		});
		task.start();
		task.stop();

		chai.assert.equal(timeOut, 0, "# of time out is not 0 before time out");
		clock.tick(60000);
		chai.assert.equal(timeOut, 0, "time out occured after cancel is called");
	});

	it("timeout should not trigger immediate if timeout is longer than 2147483647ms", function(){
		var now = new Date().getTime();
		var future = new Date(now + 3000000000);
		var timeOut = false;
		var task = new scheduler(future, function(){
			timeOut = true;
		});
		task.start();

		chai.assert(timeOut === false, "time out is true before time is up");
		clock.tick(1000);
		chai.assert(timeOut === false, "time out is true after 2000000000 ms");

	});

});

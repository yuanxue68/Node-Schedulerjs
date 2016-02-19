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

	it("should time out after 500 ms", function(){
		var timeOut = false;
		setTimeout(function () {
        timeOut = true;
    }, 500);
		chai.assert(timeOut === false, "time out is true before time is up");
		clock.tick(510);
		chai.assert(timeOut === true, "time out is false after time is up");
	});

	it("should time out more than once when reoccuring tag is true", function(){
	});

	it("should time out every minute when give * * * * * cron format", function(){

	});
});

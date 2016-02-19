#Installation:
Using npm:
	'$ npm install schedulejs'

#Usage:
You can pass in a Javascript Date Object or a String in Crontab format:

Using Date Object:
```javascript
var scheduler = require('node-schedulerjs');#Node-Schedulerjs
A simple scheduler to help you schedule functions using javascript Date object or Crontab formatted string

#Installation:
Using npm:
```javascript
npm install node-schedulerjs
```

#Usage:
You can pass in a Javascript Date Object or a string in Crontab format:

Using Date Object:
```javascript
var scheduler = require('node-schedulerjs');

var now = new Date().getTime();
var future = new Date(now + 5000);
var task = new scheduler(future, function(){
	console.log("triggers after 5 seconds");
});
task.start();
```

Using Crontab format string:
```javascript
var scheduler = require('node-schedulerjs');

var task = new scheduler('* * * * *', function(){
	console.log("triggers every miniute");
});
task.start();
```
if you want to stop a scheduled task:
```javascript
var scheduler = require('node-schedulerjs');

var task = new scheduler('* * * * *', function(){
	console.log("triggers every miniute");
});
task.start();
task.stop(); // no statement will be printed since we stopped the task;
```
## License

Licensed under MIT license




var now = new Date().getTime();
var future = new Date(now + 5000);
var task = new scheduler(future, function(){
	console.log("triggers after 5 seconds");
});
task.start();
```

Using Crontab format String:
```javascript
var scheduler = require('node-schedulerjs');

var task = new scheduler('* * * * *', function(){
	console.log("triggers every miniute");
});
task.start();
```
if you want to stop a scheduled task:
```javascript
var scheduler = require('node-schedulerjs');

var task = new scheduler('* * * * *', function(){
	console.log("triggers every miniute");
});
task.start();
task.stop(); // no statement will be printed since we stopped the task;
```
## License

Licensed under MIT license



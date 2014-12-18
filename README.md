# Javascript Async Bootstrapper

Loads .js files async and executes queued code when all tagged files are loaded.

Usage:

```html
<script id="bootstrapper" src="bootstrapper.js" data-load="file1.js|file2.js|file3.js"></script>
```

It is very important that ID of the script tag is called "bootstrapper".

This will load file1, 2, and 3 async, and if you use the ready function to queue up code, it will only be executed after all files are loaded.

Example:
```html
<!doctype html>
<html>
	<head>
		<title>Bootstrapper Test</title>
		<script id="bootstrapper" src="bootstrapper.js" data-load="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	</head>
	<body>
		<div id="victory">
			BEFORE LOAD
		</div>
		<script>
			// This document ready wrapper will queue the code until jQuery is loaded, then execute it.
			bsReady(function () {
				$('div#victory').test('AFTER ASYNC LOAD');
			});
		</script>
	</body>
</html>
```

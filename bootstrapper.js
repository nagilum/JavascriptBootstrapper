/**
 * @file
 * Loads .js files async and executes queued code when all tagged files are loaded.
 */

var bsQueue = [],
    bsFiles = 0,
    bsLoaded = 0;

/**
 * Executes the first item of code in the queue.
 */
function bsExecuteQueue() {
    if (bsQueue.length === 0)
        return;

    // Only execute the first item if it's a function.
    if (typeof bsQueue[0] === 'function')
        bsQueue[0]();

    // Remove the first item from the queue.
    bsQueue.shift();

    // Check for more items.
    if (bsQueue.length > 0)
        bsExecuteQueue();
}

/**
 * Find the executing script tag and load attributed JS files.
 */
function bsInit() {
    var tag = document.getElementById('bootstrapper'),
        urls = (tag ? tag.getAttribute('data-load').split('|') : []),
        head = document.getElementsByTagName('head')[0];

    bsFiles = urls.length;

    urls.forEach(function(url) {
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = url;
        script.async = true;

        script.onreadystatechange = function () { bsStartExecuting(); };
        script.onload = function () { bsStartExecuting(); };

        head.appendChild(script);
    });
}

/**
 * Execute code if all JS files are loaded, adds to queue if not.
 *
 * @param code code
 *   Code to execute.
 */
function bsReady(code) {
    // Add to queue.
    bsQueue.push(code);

    // Check for finished loading.
    if (bsLoaded === bsFiles)
        bsExecuteQueue();
}

/**
 * Check if all files are loaded and start executing the queue.
 */
function bsStartExecuting() {
    bsLoaded++;

    if (bsLoaded === bsFiles)
        bsExecuteQueue();
}

// All is ready, let kick this party off!
bsInit();
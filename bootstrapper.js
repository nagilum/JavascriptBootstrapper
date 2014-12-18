(function() {
    var queue = [],
        totalFiles = 0,
        filesLoaded = 0;

    /**
     * Executes the first item of code in the queue.
     */
    function executeQueue() {
        if (queue.length === 0)
            return;

        // Only execute the first item if it's a function.
        if (typeof queue[0] === 'function')
            queue[0]();

        // Remove the first item from the queue.
        queue.shift();

        // Check for more items.
        if (queue.length > 0)
            executeQueue();
    }

    /**
     * Find the executing script tag and load attributed JS files.
     */
    function init() {
        var tag = document.getElementById('bootstrapper'),
            urls = (tag ? tag.getAttribute('data-load').split('|') : []),
            head = document.getElementsByTagName('head')[0];

        totalFiles = urls.length;

        urls.forEach(function (url) {
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = url;
            script.async = false;
            script.onload = function() {
                filesLoaded++;

                if (filesLoaded === totalFiles)
                    executeQueue();
            };

            head.appendChild(script);
        });
    }

    /**
     * Execute code if all JS files are loaded, adds to queue if not.
     *
     * @param code code
     *   Code to execute.
     */
    window.queueCode = function (code) {
        // Add to queue.
        queue.push(code);

        // Check for finished loading.
        if (filesLoaded === totalFiles)
            executeQueue();
    }

    // All is ready, let kick this party off!
    init();
})();
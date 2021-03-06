// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === "undefined") {
	const { worker } = require("../src/examples/mocks");

	// Start the mocking when each story is loaded.
	// Repetitive calls to the `.start()` method do not register a new worker,
	// but check whether there's an existing once, reusing it, if so.
	if (location.origin.includes("localhost:6006")) {
		worker.start();
	} else {
		worker.start({
			serviceWorker: {
				url: "/rx-query/assets/mockServiceWorker.js",
			},
		});
	}
}

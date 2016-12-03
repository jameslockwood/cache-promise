export default function cachePromise(targetFunction, options = {}) {

	const deleteWhenResolved = getBoolean(options.deleteWhenResolved, true)
	const deleteWhenRejected = getBoolean(options.deleteWhenRejected, true)
	const ttl = options.ttl || null;
	let cache = new Map();

	function getBoolean(val, defaultVal) {
		return typeof val === 'boolean' ? val : defaultVal;
	}

	function invalidateAsync(key) {
		return ttl && setTimeout(function() {
			cache.delete(key);
		}, ttl);
	}

	return function(...args) {
		let key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}
		let promise = targetFunction(args);
		cache.set(key, promise);
		promise.then(
			function resolved() {
				return deleteWhenResolved && cache.delete(key);
			},
			function rejected() {
				return deleteWhenRejected && cache.delete(key);
			});
		invalidateAsync(key, ttl);
		return promise;
	};

}
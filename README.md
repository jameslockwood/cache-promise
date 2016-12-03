# cache-promise

Memoizes functions which return a promise.

```
import cachePromise from 'cache-promise';

// example function which you wish to cache the promise
function myPromiseFunction(){
	return new Promise((resolve, reject) => {
		resolve();
	});
}

let cachedFn = cachePromise(myPromiseFunction);
```

By default, subsequent calls to the function will return the same promise until the promise has resolved or rejected.  The behaviour can be modified by providing a config object.

```
cachePromise(fn, {
	deleteWhenResolved: false,	// Invalidates cache when the promise has resolved. Enabled by default.
	deleteWhenRejected: false,	// Invalidates cache when the promise has rejected. Enabled by default.
	ttl: 3000					// Cache TTL (in milliseconds).  Disabled by default
});

```

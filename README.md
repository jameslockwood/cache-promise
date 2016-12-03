# cache-promise

Memoizes functions which returns a promise.  Configurable to cache the result

```
import cachePromise from 'cache-promise';

function fn(){
	return new Promise((resolve, reject) => {
		resolve();
	});
}

cachePromise(fn);
```

By default, subsequent calls to the function will return the same promise until the promise has resolved or rejected.  The behaviour can be modified by providing a config object.

```
cachePromise(fn, {
	deleteWhenResolved: false,	// Invalidates cache when the promise has resolved. Enabled by default.
	deleteWhenRejected: false,	// Invalidates cache when the promise has rejected. Enabled by default.
	ttl: 3000					// Cache TTL (in milliseconds).  Disabled by default
});

```

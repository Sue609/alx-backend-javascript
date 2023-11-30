PROMISES
JavaScript is single threaded, meaning that two bits of script cannot run at
the same time; they have to run one after another. In browsers, JavaScript
shares a thread with a load of other stuff that differs from browser to
browser. But typically JavaScript is in the same queue as painting, updating
styles, and handling user actions (such as highlighting text and interacting
with form controls). Activity in one of these things delays the others.

As a human being, you're multithreaded. You can type with multiple fingers,
you can drive and hold a conversation at the same time. The only blocking
function we have to deal with is sneezing, where all current activity must be
suspended for the duration of the sneeze. That's pretty annoying, especially
when you're driving and trying to hold a conversation. You don't want to write
code that's sneezy.

You've probably used events and callbacks to get around this. Here are events:

    
    
    var img1 = document.querySelector('.img-1');
    
    img1.addEventListener('load', function() {
      // woo yey image loaded
    });
    
    img1.addEventListener('error', function() {
      // argh everything's broken
    });
    

This isn't sneezy at all. We get the image, add a couple of listeners, then
JavaScript can stop executing until one of those listeners is called.

Unfortunately, in the example above, it's possible that the events happened
before we started listening for them, so we need to work around that using the
"complete" property of images:

    
    
    var img1 = document.querySelector('.img-1');
    
    function loaded() {
      // woo yey image loaded
    }
    
    if (img1.complete) {
      loaded();
    }
    else {
      img1.addEventListener('load', loaded);
    }
    
    img1.addEventListener('error', function() {
      // argh everything's broken
    });
    

This doesn't catch images that errored before we got a chance to listen for
them; unfortunately the DOM doesn't give us a way to do that. Also, this is
loading one image. Things get even more complex if we want to know when a set
of images have loaded.


    

At their most basic, promises are a bit like event listeners except:

  * A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from success to failure or vice versa.
  * If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier.

This is extremely useful for async success/failure, because you're less
interested in the exact time something became available, and more interested
in reacting to the outcome.

## Promise terminology

Domenic Denicola proof read the first draft of this article and graded me "F"
for terminology. He put me in detention, forced me to copy out States and
Fates 100 times, and wrote a worried letter to my parents. Despite that, I
still get a lot of the terminology mixed up, but here are the basics:

A promise can be:

  * **fulfilled** \- The action relating to the promise succeeded
  * **rejected** \- The action relating to the promise failed
  * **pending** \- Hasn't fulfilled or rejected yet
  * **settled** \- Has fulfilled or rejected

The spec also uses the term **thenable** to describe an object that is
promise-like, in that it has a `then` method. This term reminds me of ex-
England Football Manager Terry Venables so I'll be using it as little as
possible.

## Promises arrive in JavaScript!

Promises have been around for a while in the form of libraries, such as:

  * Q
  * when
  * WinJS
  * RSVP.js

The above and JavaScript promises share a common, standardized behaviour
called Promises/A+. If you're a jQuery user, they have something similar
called Deferreds. However, Deferreds aren't Promise/A+ compliant, which makes
them subtly different and less useful, so beware. jQuery also has a Promise
type, but this is just a subset of Deferred and has the same issues.

Although promise implementations follow a standardized behaviour, their
overall APIs differ. JavaScript promises are similar in API to RSVP.js. Here's
how you create a promise:

    
    
    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…
    
      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });
    

The promise constructor takes one argument, a callback with two parameters,
resolve and reject. Do something within the callback, perhaps async, then call
resolve if everything worked, otherwise call reject.

Like `throw` in plain old JavaScript, it's customary, but not required, to
reject with an Error object. The benefit of Error objects is they capture a
stack trace, making debugging tools more helpful.

Here's how you use that promise:

    
    
    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });
    

`then()` takes two arguments, a callback for a success case, and another for
the failure case. Both are optional, so you can add a callback for the success
or failure case only.

JavaScript promises started out in the DOM as "Futures", renamed to
"Promises", and finally moved into JavaScript. Having them in JavaScript
rather than the DOM is great because they'll be available in non-browser JS
contexts such as Node.js (whether they make use of them in their core APIs is
another question).

Although they're a JavaScript feature, the DOM isn't afraid to use them. In
fact, all new DOM APIs with async success/failure methods will use promises.
This is happening already with Quota Management, Font Load Events,
ServiceWorker, Web MIDI, Streams, and more.

Right, let's code some things. Say we want to:

  1. Start a spinner to indicate loading
  2. Fetch some JSON for a story, which gives us the title, and urls for each chapter
  3. Add title to the page
  4. Fetch each chapter
  5. Add the story to the page
  6. Stop the spinner

… but also tell the user if something went wrong along the way. We'll want to
stop the spinner at that point too, else it'll keep on spinning, get dizzy,
and crash into some other UI.

Of course, you wouldn't use JavaScript to deliver a story, serving as HTML is
faster, but this pattern is pretty common when dealing with APIs: Multiple
data fetches, then do something when it's all done.

To start with, let's deal with fetching data from the network:


### Transforming values

You can transform values simply by returning the new value:

    
    
    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });
    
    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })
    

As a practical example, let's go back to:

    
    
    get('story.json').then(function(response) {
      console.log("Success!", response);
    })
    

The response is JSON, but we're currently receiving it as plain text. We could
alter our get function to use the JSON `responseType`, but we could also solve
it in promises land:

    
    
    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })

## Error handling

As we saw earlier, `then()` takes two arguments, one for success, one for
failure (or fulfill and reject, in promises-speak):

    
    
    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })
    

You can also use `catch()`:

    
    
    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })
    

There's nothing special about `catch()`, it's just sugar for `then(undefined,
func)`, but it's more readable. Note that the two code examples above do not
behave the same, the latter is equivalent to:

    
    
    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })
    

The difference is subtle, but extremely useful. Promise rejections skip
forward to the next `then()` with a rejection callback (or `catch()`, since
it's equivalent). With `then(func1, func2)`, `func1` or `func2` will be
called, never both. But with `then(func1).catch(func2)`, both will be called
if `func1` rejects, as they're separate steps in the chain.

### JavaScript exceptions and promises

Rejections happen when a promise is explicitly rejected, but also implicitly
if an error is thrown in the constructor callback:

    
    
    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // invalid JSON, so this implicitly rejects:
      resolve(JSON.parse("This ain't JSON"));
    });
    
    jsonPromise.then(function(data) {
      // This never happens:
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })
    

This means it's useful to do all your promise-related work inside the promise
constructor callback, so errors are automatically caught and become
rejections.

The same goes for errors thrown in `then()` callbacks.

    
    
    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })
    


`Promise.all` takes an array of promises and creates a promise that fulfills
when all of them successfully complete. You get an array of results (whatever
the promises fulfilled to) in the same order as the promises you passed in.
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "d4fb430a272a791b8671a48b770df3c4"
  },
  {
    "url": "assets/css/0.styles.79226024.css",
    "revision": "1d2dd05b9a3f5b2a2ce69130b9945c46"
  },
  {
    "url": "assets/img/relationalSchema.4d0bdb0b.png",
    "revision": "4d0bdb0b4bb3551211c4ab0253c38a6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/user_add.444e76a5.png",
    "revision": "444e76a5d6323929d2d13926ba3b8e9b"
  },
  {
    "url": "assets/img/user_delete.2c352521.png",
    "revision": "2c352521d7f0fa584ed27ccacc1c7ead"
  },
  {
    "url": "assets/img/user_get_all.4923449b.png",
    "revision": "4923449bac0a5e7732f48259828a4441"
  },
  {
    "url": "assets/img/user_get_id.9ebc27d1.png",
    "revision": "9ebc27d12be4c1c67d7cd3309a29db2b"
  },
  {
    "url": "assets/img/user_update.16a2d81e.png",
    "revision": "16a2d81edd35b08f4d5eb842812fc613"
  },
  {
    "url": "assets/js/10.ede44feb.js",
    "revision": "a5fdc61680aa686098ead5585865520b"
  },
  {
    "url": "assets/js/11.cf759c35.js",
    "revision": "4a4cbe9dba2fe96205db2667a78b4de9"
  },
  {
    "url": "assets/js/12.dcaae35a.js",
    "revision": "43fa593a39277d240494bb4077ec736e"
  },
  {
    "url": "assets/js/13.b9d8189b.js",
    "revision": "80e88bfa85ba402b2c0971aed6d08279"
  },
  {
    "url": "assets/js/14.f1f9576e.js",
    "revision": "d2cc03f4dd624415723c52769c7b6fe0"
  },
  {
    "url": "assets/js/15.a1150af9.js",
    "revision": "eac604ff9653af21fe4e4794c561f7d1"
  },
  {
    "url": "assets/js/16.b4438fab.js",
    "revision": "80d237b15950bacae244c6626b2eef82"
  },
  {
    "url": "assets/js/17.d6af12fb.js",
    "revision": "37edb37a0204665338563e4c4cdaff9d"
  },
  {
    "url": "assets/js/18.6669db86.js",
    "revision": "f230ce4faebadae55e7bb8ed621e256c"
  },
  {
    "url": "assets/js/19.4bc6ea83.js",
    "revision": "d947a11f262b741db97581a23d41db4f"
  },
  {
    "url": "assets/js/2.a78ea678.js",
    "revision": "96cf7e616365ba1d7ef3f6fa6c3cfaae"
  },
  {
    "url": "assets/js/20.e9c57bd0.js",
    "revision": "95f733656560225f79d29bdcab26677f"
  },
  {
    "url": "assets/js/21.fa4fafea.js",
    "revision": "2b5a367b4f1c2066b72b8a5375dd6b57"
  },
  {
    "url": "assets/js/22.0ce00be1.js",
    "revision": "9b1d37564b5244ae1e61b963a8a69e4f"
  },
  {
    "url": "assets/js/23.aaf82449.js",
    "revision": "ae384a2f34acca7768cbd10f1ce35a70"
  },
  {
    "url": "assets/js/24.7714a237.js",
    "revision": "8e0c816977c09efbcc239ee171bdce2e"
  },
  {
    "url": "assets/js/26.8925e476.js",
    "revision": "60c5ae44e9de26fbdaa7a983ce917288"
  },
  {
    "url": "assets/js/3.1988a510.js",
    "revision": "fe96fb31153dc665b460d75389e28951"
  },
  {
    "url": "assets/js/4.61a9770f.js",
    "revision": "7785a8a500c3b2dc064811b814ecc32e"
  },
  {
    "url": "assets/js/5.2f633d58.js",
    "revision": "1ca04c2f67208cdc138ff2bdb723dd11"
  },
  {
    "url": "assets/js/6.a5eceeec.js",
    "revision": "ccffa3b74a48481f4deecbdf9fdfb1ab"
  },
  {
    "url": "assets/js/7.987f5f89.js",
    "revision": "5dd096a048e9bd2b58f2104d1ff0aaae"
  },
  {
    "url": "assets/js/8.cd2e3176.js",
    "revision": "b6c4db4fa28fc934f623035634c9d82b"
  },
  {
    "url": "assets/js/9.8b667cab.js",
    "revision": "7f44f36e25e9cc48e262a648b04ed443"
  },
  {
    "url": "assets/js/app.700fe140.js",
    "revision": "c34f01a9b0e43f3d3ccfd75bc06c8eac"
  },
  {
    "url": "conclusion/index.html",
    "revision": "fd76cc9e060a01836fa1aa3e405f1b60"
  },
  {
    "url": "design/index.html",
    "revision": "5d061f345cc7a292fa316a981494867f"
  },
  {
    "url": "index.html",
    "revision": "329aed4af5b7f25637623d18791af9d7"
  },
  {
    "url": "intro/index.html",
    "revision": "d0d6bd7a664f53860a318f32209f6f56"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "dc58faab5fb3ddf0f9366e67e5388471"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "6c29fc79421aadb6303f0a8deff9bcbd"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "e1d2ced331ec8bd699df0495dc2ac482"
  },
  {
    "url": "software/index.html",
    "revision": "f73972ab3e5041c5b8b6b74aa976f09c"
  },
  {
    "url": "test/index.html",
    "revision": "83e7caea597b3aa4c77bddda732a0395"
  },
  {
    "url": "use cases/index.html",
    "revision": "8dbc7f853dfbf1982f519c8e2315a56f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

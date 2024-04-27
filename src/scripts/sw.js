// eslint-disable-next-line import/no-extraneous-dependencies
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import {
  Route,
  registerRoute,
} from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

// Cache Ouresto pages
const ourestoPages = new Route(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'ouresto-pages-cache',
  }),
);

// Cache restaurant list API by Dicoding
const restaurantListdbApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list') && url.href.includes('list'),
  new CacheFirst({
    cacheName: 'restaurant-db-dicoding-list',
  }),
);

// Cache image item restaurant by Dicoding
const restaurantSmallImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/') && url.href.includes('images/small/'),
  new CacheFirst({
    cacheName: 'restaurant-db-dicoding-small-image',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

// Cache image item restaurant by Dicoding
const restaurantMediumImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/') && url.href.includes('images/medium/'),
  new CacheFirst({
    cacheName: 'restaurant-db-dicoding-medium-image',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

// Cache restaurant detail API by Dicoding
const restaurantDetaildbApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/detail/') && url.href.includes('detail'),
  new NetworkFirst({
    cacheName: 'restaurant-db-dicoding-detail',
  }),
);

// Cache URL Google Font request
const ourestoGoogleFonts = new Route(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'ouresto-google-fonts-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  }),
);

// Cache for CSS, JS, and Web Worker file request
const assetsStatic = new Route(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'resthunter-assets-cache',
  }),
);

registerRoute(ourestoPages);
registerRoute(restaurantListdbApi);
registerRoute(restaurantSmallImageApi);
registerRoute(restaurantMediumImageApi);
registerRoute(restaurantDetaildbApi);
registerRoute(ourestoGoogleFonts);
registerRoute(assetsStatic);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

cleanupOutdatedCaches();

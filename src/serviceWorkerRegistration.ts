// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if ('serviceWorker' in navigator) {
    try {
      const publicUrl = new URL(
        process.env.PUBLIC_URL || '',
        window.location.href
      );
      if (publicUrl.origin !== window.location.origin) {
        console.warn('Service worker origin mismatch - skipping registration');
        return;
      }

      window.addEventListener('load', async () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        if (isLocalhost) {
          await checkValidServiceWorker(swUrl, config);
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'Web app served cache-first by service worker. See https://cra.link/PWA'
            );
          });
        } else {
          await registerValidSW(swUrl, config);
        }
      });
    } catch (error) {
      console.error('Error during service worker registration:', error);
    }
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  return navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content available; please refresh.');
              config?.onUpdate?.(registration);
            } else {
              console.log('Content is cached for offline use.');
              config?.onSuccess?.(registration);
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

async function checkValidServiceWorker(swUrl: string, config?: Config) {
  try {
    const response = await fetch(swUrl, {
      headers: { 'Service-Worker': 'script' }
    });
    const contentType = response.headers.get('content-type');

    if (
      response.status === 404 ||
      (contentType && !contentType.includes('javascript'))
    ) {
      await navigator.serviceWorker.ready;
      await unregister();
      window.location.reload();
    } else {
      await registerValidSW(swUrl, config);
    }
  } catch (error) {
    console.log('No internet connection. App running in offline mode.');
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => {
        console.error('Error unregistering service worker:', error);
      });
  }
}

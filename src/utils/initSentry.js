import * as Sentry from '@sentry/browser';

export function initSentry() {
  if (SENTRY_URL !== 'false') {
    Sentry.init({
      dsn: SENTRY_URL,
    });

    const originalErrorLogger = console.error;
    console.error = function consoleErrorCustom(...args) {
      Sentry.captureException(...args);

      return originalErrorLogger(...args);
    };
  }
}

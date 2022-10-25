const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN, 'localhost'],
  },
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,

    // This option will automatically provide performance monitoring for Next.js
    // data-fetching methods and API routes, making the manual wrapping of API
    // routes via `withSentry` redundant.
    autoInstrumentServerFunctions: true,
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

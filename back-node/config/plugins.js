module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        sizeLimit: 100 * 1024 * 1024,
        localServer: {
          maxage: 300000,
        },
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-sendinblue",
      providerOptions: {
        sendinblue_api_key: env("SIB_API_KEY", "xkeysib-0987654321-abcdef"),
        sendinblue_default_replyto: env(
          "SIB_DEFAULT_REPLY_TO",
          "contact@example.com"
        ),
        sendinblue_default_from: env(
          "SIB_DEFAULT_FROM",
          "no-reply@example.com"
        ),
        sendinblue_default_from_name: env(
          "SIB_DEFAULT_FROM_NAME",
          "Sender Name"
        ),
      },
    },
  },
  sentry: {
    enabled: true,
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
      enabled: true,
    },
  },
});

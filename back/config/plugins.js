module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        disturbance: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
});

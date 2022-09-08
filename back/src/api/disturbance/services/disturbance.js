"use strict";

/**
 * disturbance service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::disturbance.disturbance",
  ({ strapi }) => ({
    blurMedia(files) {
      const formData = new FormData();
      formData.append("input_media", files);
      formData.append("input_media", files);

      fetch(
        `${process.env("BLURIT_API_URL")}/innovation-service/anonymization`,
        {
          body: files,
        }
      );
    },

    sendMail(disturbance) {
      return strapi.service("api::sendmail.sendmail").send(
        "jojo@gmail.com",
        "jordan.thegamedan65@gmail.com",
        // TODO
        "Nouvelle perturbation sur TODO",
        `Une perturbation a été signalée dans votre secteur ${JSON.stringify(
          disturbance
        )}`
      );
    },
  })
);

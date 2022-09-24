"use strict";
const { parseMultipartData } = require("@strapi/utils");
/**
 *  disturbance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::disturbance.disturbance",
  ({ strapi }) => ({
    async create(ctx) {
      if (!ctx.is("multipart")) {
        return;
      }

      const { files } = parseMultipartData(ctx);

      if (!files) {
        return ctx.badRequest("no files found in request");
      }

      try {
        const blurWaitingKey = await strapi
          .service("api::disturbance.disturbance")
          .blurMedia(files.evidences);

        ctx.request.body.blurWaitingKey = blurWaitingKey;
        const response = await super.create(ctx);

        if (response.data.attributes.priority !== "low") {
          strapi.service("api::disturbance.disturbance").sendMail(response);
        }

        return response;
      } catch (error) {
        return ctx.badRequest(error);
      }
    },
  })
);

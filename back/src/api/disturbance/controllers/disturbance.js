"use strict";

/**
 *  disturbance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::disturbance.disturbance",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const response = await super.create(ctx);

        const {
          data: { attributes },
        } = response;

        if (attributes.priority !== "low") {
          strapi.service("api::disturbance.disturbance").sendMail(response);
        }

        return response;
      } catch (error) {
        return ctx.badRequest(error);
      }
    },
  })
);

'use strict';

/**
 * disturbance service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::disturbance.disturbance');

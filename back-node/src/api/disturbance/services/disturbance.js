"use strict";
const axios = require("axios");
const FormData = require("form-data");

/**
 * disturbance service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::disturbance.disturbance",
  ({ strapi }) => ({
    async blurMedia(evidences) {
      const {
        data: { token },
      } = await axios.post(`https://api.services.wassa.io/login`, {
        clientId:
          "U2FsdGVkX19yGPmiU5HNKoqLkYLdVG/cJsqM2gwFlVR0fEMFJGOfFmoPFx9qIoSq/eUu775PpGB/KBTQvNF6N2DS0iDuduurVSbfEr1bdL9smgzPdBYyKMlXUZJ4vC+Y8aBi9bHUDGC2ucWdI3BidrVMgT4F9k2zOTJbmTpqDKEtf7NSQoeWUUnTAw/YS7X0sl7AcPQRMl0feb+BC9COf8wdHwn3GbeD1p6fsj9H2WKIX/E7E6QvCGPrKtEnedJ+LXFGpcRVy+FuKsUuRyQu9tBOTx3DHiuApdwZaGgpAVPOR+cb1P85f7BlTAYKKlC+HSDOywcJ9RB6Veb1YQisx/7ZHnfpfMJWBx3ifBT3W/81SRmOFW6MIxAuU4B0ps2YPiqx+GoBMwk57bRPRd9tWzEc6vPzhFNhzguN9/ukZ7w=",
        secretId:
          "U2FsdGVkX18aZpfOhlR2W6zFAoC5YqliTpK+QeW+hm88mvTsVbkExcaVoSf7ej4O4Nnt0GbyLKmAa1bj8wYMGIk0YfQi54pPVslvv0wKqMBl2w2gPhQ5CK7o6wucMbxwOqFr0w6tvEfiQj+YGAJwZqaaEQmSyeSohuCeGBy/fvZEn1CYjKYsHTZcbXxOl3cOejIbsQAK2Fe6zR2VRapHBQ==",
      });

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      // https://github.com/form-data/form-data/issues/359
      const formData = new FormData();

      // console.log(" Array.from(evidences)", evidences);

      // Array.from(evidences).forEach((file) => {
      //   console.log("file", file);
      // });
      formData.append("input_media", evidences, evidences.name);
      formData.append("activation_faces_blur", JSON.stringify(true));
      formData.append("output_detections_url", JSON.stringify(true));

      const {
        data: { anonymization_job_id },
      } = await axios.post(
        `https://api.services.wassa.io/innovation-service/anonymization`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...formData.getHeaders(),
          },
        }
      );

      return anonymization_job_id;
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

module.exports = {
    register(app) {
        app.customFields.register({
          name: "color",
          pluginId: "color-picker", // the custom field is created by a color-picker plugin
          type: "string", // the color will be stored as a string
          intlLabel: {
            id: "color-picker.color.label",
            defaultMessage: "Color",
          },
          intlDescription: {
            id: "color-picker.color.description",
            defaultMessage: "Select any color",
          },
          icon: ColorIcon,
          components: {
            Input: async () => import(/* webpackChunkName: "input-component" */ "./Input"),
          },
          options: {
            base: [
              /*
                Declare settings to be added to the "Base settings" section
                of the field in the Content-Type Builder
              */ 
              {
                sectionTitle: { // Add a "Format" settings section
                  id: 'color-picker.color.section.format',
                  defaultMessage: 'Format',
                },
                items: [ // Add settings items to the section
                  {
                    /*
                      Add a "Color format" dropdown
                      to choose between 2 different format options
                      for the color value: hexadecimal or RGBA
                    */
                    intlLabel: {
                      id: 'color-picker.color.format.label',
                      defaultMessage: 'Color format',
                    },
                    name: 'options.format',
                    type: 'select',
                    value: 'hex', // option selected by default
                    options: [ // List all available "Color format" options
                      {
                        key: 'hex',
                        value: 'hex',
                        metadatas: {
                          intlLabel: {
                            id: 'color-picker.color.format.hex',
                            defaultMessage: 'Hexadecimal',
                          },
                        },
                      },
                      {
                        key: 'rgba',
                        value: 'rgba',
                        metadatas: {
                          intlLabel: {
                            id: 'color-picker.color.format.rgba',
                            defaultMessage: 'RGBA',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            advanced: [
              /*
                Declare settings to be added to the "Advanced settings" section
                of the field in the Content-Type Builder
              */ 
            ],
            validator: args => ({
              format: yup.string().required({
                id: 'options.color-picker.format.error',
                defaultMessage: 'The color format is required',
              }),
            })
            }),
          },
        });
    }
}
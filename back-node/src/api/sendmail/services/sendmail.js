module.exports = {
  send: (from, to, subject, text) => {
    return strapi.plugin("email").service("email").send({
      from,
      to,
      subject,
      text,
    });
  },
};

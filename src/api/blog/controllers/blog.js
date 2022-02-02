const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const fs = require("fs");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.blog.create(data, { files });
    } else {
      entity = await strapi.services.blog.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.blog });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.blog.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.blog.update(
        { id },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.blog });
  },
};

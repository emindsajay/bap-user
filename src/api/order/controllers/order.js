'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.filters = { ...ctx.query.filters, user_id: parseInt(ctx.state.user.id) }
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    async create(ctx) {
        ctx.request.body = { ...ctx.request.body, user_id: ctx.state.user.id, publishedAt: new Date() }
        return await super.create(ctx);
    }
}));

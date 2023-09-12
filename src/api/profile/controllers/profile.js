'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ strapi }) => ({
    async find(ctx) {
        const profile = strapi.db.query('api::profile.profile').findOne({ where: { 'user_id': ctx.state.user.id }, populate: { resume: true } });
        if (!profile)
            ctx.response.status = 404;
        return profile;
    },

    async create(ctx) {
        if (!ctx.state.user || !ctx.state.user.id)
            ctx.response.status = 401;

        const data = { ...ctx.request.body, user_id: ctx.state.user.id, publishedAt: new Date() };
        const files = ctx.request.files;

        const extProfile = await strapi.db.query('api::profile.profile').findOne({ where: { 'user_id': ctx.state.user.id } });

        if (!extProfile) {
            await strapi.entityService.create('api::profile.profile', { data, files });
            ctx.response.status = 200
            return;
        }
        await strapi.entityService.update('api::profile.profile', extProfile.id, { data, files });
        ctx.response.status = 200
        return;
    }
}));

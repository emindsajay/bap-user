module.exports = (plugin) => {
    plugin.controllers.user.self = async (ctx) => {
        if (!ctx.state.user || !ctx.state.user) {
            return ctx.response.status = 401
        }
        ctx.body = ctx.state.user
        ctx.response.status = 200;
    }
}
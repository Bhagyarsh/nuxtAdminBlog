import { actions as AdminActions } from "./adminPost"


export const actions = {

    async nuxtServerInit(vuexContext, context) {
        const user = await vuexContext.state.auth.user
        if (user && user.role === 1)
            await Promise.all([
                AdminActions.nuxtServerInit(vuexContext, context)
            ])
    },
}


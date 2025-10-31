import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
        }),
        registration: builder.mutation({
            query: (userInfo) => {
                console.log("inside base api=>", userInfo);
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body: userInfo,
                }
            },
        }),
    })
});

export const {
    useLoginMutation,
    useRegistrationMutation,
} = authApi;
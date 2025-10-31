import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";
import type { RootState } from "../store";




const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api',
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers;
    }
})

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    // console.log(result);

    if (result.error?.status == 404) {
        toast.error("User not found")
    }

    if (result.error?.status == 401) {
        //*send refresh token
        console.log('sending refresh token');
        const res = await fetch('http://localhost:5000/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await res.json();

        if (data.data.accessToken) {

            const user = (api.getState() as RootState).auth.token;

            api.dispatch(setUser({
                user,
                token: data.data.accessToken,
            }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result;
}


export const baseApi = createApi({
    reducerPath: 'baseApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://sporting-goods-db.vercel.app' }),
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['bikes', 'user', 'booking', 'subscriptions'],
    endpoints: () => ({}),
});
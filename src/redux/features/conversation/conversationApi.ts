import { baseApi } from "../../api/baseApi";

const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyConversations: builder.query({
            query: () => ({
                url: "/conversations",
                method: "GET",
            }),
            providesTags: ["conversation"],
        }),


    }),
});

export const { useGetMyConversationsQuery } = conversationApi;

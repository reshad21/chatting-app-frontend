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


        createConversation: builder.mutation({
            query: (payload) => ({
                url: "/conversation",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["conversation"],
        }),


    }),
});

export const { useGetMyConversationsQuery, useCreateConversationMutation } = conversationApi;

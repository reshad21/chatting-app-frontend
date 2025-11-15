import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // get chat history
        getMessages: builder.query({
            query: (conversationId) => ({
                url: `/messages/${conversationId}`,
                method: "GET",
            }),
            providesTags: ["messages"],
        }),

        // send message
        sendMessage: builder.mutation({
            query: (payload) => ({
                url: `/messages`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["messages", "conversation"],
        }),


    }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;

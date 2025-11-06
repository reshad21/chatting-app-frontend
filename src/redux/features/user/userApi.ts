import type { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),

    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/users/all-users`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "user", id }],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useGetProfileQuery } = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:4000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    //get categories
    getCategories: builder.query({
      // get 'http://localhost:4000/api/categories'
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),
    //get labels
    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),
    addTransaction: builder.mutation({
      // post'http://localhost:4000/api/transaction'
      query: (initialTransaction) => ({
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // delete 'http://localhost:4000/api/transaction'
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;

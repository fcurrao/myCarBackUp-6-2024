import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { realtime_database_url } from "../Database/firebaseConfig"
 

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({baseUrl: realtime_database_url}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProducts: builder.query({
            query: () => `products.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const productsTransformed = Object.values(response)
                return (productsTransformed)
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const productTransformed = Object.values(response).pop()
                return (productTransformed)
            }
        }),
        postCart: builder.mutation({
            query: (order) => ({
                url: `orders.json`,
                method: `POST`,
                body: order
            })
        }),
        getOrder: builder.query({
            query: () => `orders.json`
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        postProfileImage: builder.mutation({
            query: ({image, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
        }),
        getFavoriteAdress: builder.query({
            query: (localId) => `favorite/${localId}.json`,
        }),
        postFavoriteAdress: builder.mutation({
            query: ({favorite, localId}) => ({
                url: `favorite/${localId}.json`,
                method: "PUT",
                body: {
                    favorite: favorite
                },
            }),
        }),
        getServices: builder.query({
            query: (localId) => `services/${localId}.json`,
        }),
        postServices: builder.mutation({
            query: ({services, localId}) => ({
                url: `services/${localId}.json`,
                method: "PUT",
                body: services,
            }),
        }),
        getNotes: builder.query({
            query: (localId) => `notes/${localId}.json`,
        }),
        postNotes: builder.mutation({
            query: ({notes, localId}) => ({
                url: `notes/${localId}.json`,
                method: "PUT",
                body: notes,
            }),
        }),
        getUserLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
        }),
        getUserLocation2: builder.query({
            query: (localId) => `locations2/${localId}.json`,
        }),
        postUserLocation: builder.mutation({
            query: ({location, localId}) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    favorite: location.favorite,
                    inputtextoa: location.inputtextoa,
                    inputtextob: location.inputtextob,
                }
            })
        }),
        postUserLocation2: builder.mutation({
            query: ({location, localId}) => ({
                url: `locations2/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    inputtextoa: location.inputtextoa,
                    inputtextob: location.inputtextob,
                }
            })
        }),
    })
})

export const {
    useGetCategoriesQuery, 
    useGetProductsQuery, 
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    usePostCartMutation,
    useGetOrderQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetFavoriteAdressQuery,
    usePostFavoriteAdressMutation,
    useGetServicesQuery,
    useLazyGetServicesQuery,
    usePostServicesMutation,
    useGetNotesQuery,
    usePostNotesMutation,
    useGetUserLocationQuery,
    useGetUserLocation2Query,
    usePostUserLocationMutation,
    usePostUserLocation2Mutation,
} = shopApi

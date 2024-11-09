import {gql } from "@apollo/client";

export const GET_MEDIA = gql`
query ($id: Int, $page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
    }
    media (id: $id) {
      id
      status
      coverImage {
        medium
      }
      title {
        romaji
      }
      description
      siteUrl
    }
  }
}

`;
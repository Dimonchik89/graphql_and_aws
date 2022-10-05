import { gql } from "@apollo/client"

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            id,
            name,
            photo
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($input: UserInput!) {
        createUser (input: $input) {
            id,
            name,
            photo
        }
    }
`
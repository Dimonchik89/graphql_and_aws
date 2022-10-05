import { gql } from "@apollo/client"

export const UPLOAD = gql`
    mutation upload($file: Upload!) {
        singleUpload(file: $file) {
            filename
        }
    }
`

export const FILE_UPLOAD = gql`
    mutation fileUpload($file: Upload!) {
        fileUpload(file: $file) {
            ETag
            Location
            Key
            key
            Bucket
        }
    }
`
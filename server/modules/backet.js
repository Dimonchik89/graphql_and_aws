const AWS = require("aws-sdk");

const backet = "newtechshop"
// const s3 = new AWS.S3({
//     endpoint: `http://localhost:4000/graphql`,
//     accessKeyId: "AKIA2JWGDKJHFFJASOMY",
//     secretAccessKey: "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",
//     sslEnabled: false,
//     s3ForcePathStyle: true,
// })

const s3 = new AWS.S3({
    region: "eu-north-1",
    credentials: {
        accessKeyId: "AKIA2JWGDKJHFFJASOMY",
        secretAccessKey: "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",
    }
})

module.exports = {
    s3
}
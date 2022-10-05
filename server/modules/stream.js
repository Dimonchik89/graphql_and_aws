const stream = require('stream');
const { s3 } = require("./backet");

const createUploadStream = (key) => {
    const pass = new stream.PassThrough();
    return {
        writeStream: pass,
        promise: s3
            .upload({
                Bucket: "newtechshop/images_graphql",
                Key: key,
                Body: pass
            })
            .promise(),
    }
}

module.exports = { createUploadStream }
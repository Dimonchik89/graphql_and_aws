const { ApolloError } = require("apollo-server-express");
const  GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const path = require("path");
const fs = require("fs");
const { finished } = require('stream/promises');
const { createUploadStream } = require("../modules/stream");
const { v4: uuidv4 } = require('uuid');

const users = [];

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        getMessage: () => "Hello",
        getUsers: () => users
    },
    Mutation: {
        singleUpload: async (parent, {file}) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
            console.log(file);
            const stream = createReadStream();
            const pathName = path.join(__dirname, `../static/${filename}`);
            const out = fs.createWriteStream(pathName);
            stream.pipe(out)
            await finished(out)
            return { filename, mimetype, encoding }
        },
        createUser: async (parent, { input }) => {
            const {id, name, photo} = await input;
            const { createReadStream, filename } = await photo;
            const stream = createReadStream();
            const pathName = path.join(__dirname, `../static/${filename}`);
            const out = fs.createWriteStream(pathName);
            const newUser = { id, name, photo: pathName }
            users.push(newUser)
            stream.pipe(out)
            await finished(out)
            return newUser
        },
        fileUpload: async (parent, { file }) => {
            const { filename, createReadStream } = await file;
            const stream = createReadStream();
            let result;
      
            try {
              const uploadStream = createUploadStream(`${uuidv4()}_${filename}`);
              stream.pipe(uploadStream.writeStream);
              result = await uploadStream.promise;
            } catch (error) {
              console.log(
                `[Error]: Message: ${error.message}, Stack: ${error.stack}`
              );
              throw new ApolloError("Error uploading file");
            }
      
          return result;
        },  
    }
}

module.exports = resolvers
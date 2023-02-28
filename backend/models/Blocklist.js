const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require('uuid');

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "accessKeyId": "ncaoduc",
    "secretAccessKey": "ncaoduc",
    "region": "us-east-1",
    "endpoint": "http://localhost:8000"
});

dynamoose.aws.ddb.local();

const blockListSchema = new dynamoose.Schema({
    email: { type: "String", unique: true, required: true },
    _id: {
        type: String,
        default: () => uuidv4(),
    },
    mobile: { type: "String", required: true },
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
    password: { type: "String", required: true },
    ssn: { type: "String", required: true },
},
    // {
    //     "timestamps": {
    //         "createdAt": {
    //             "created_at": {
    //                 "type": {
    //                     "value": Date,
    //                 }
    //             }
    //         },
    //         "updatedAt": {
    //             "updated": {
    //                 "type": {
    //                     "value": Date,
    //                 }
    //             }
    //         }
    //     }
    // }
);

const BlockList = dynamoose.model("BlockList", blockListSchema);
module.exports = BlockList;
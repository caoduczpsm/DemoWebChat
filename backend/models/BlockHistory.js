const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require('uuid');

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "accessKeyId": "ncaoduc",
    "secretAccessKey": "ncaoduc",
    "region": "us-east-1",
    "endpoint": "http://localhost:8000"
});

dynamoose.aws.ddb.local();

const blockHistorySchema = new dynamoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4(),
        hashKey: true,
    },
    author: { type: "String", unique: true, required: true },
    reason: { type: "String", required: true },
    blockstate: { type: "String" },
},
    {
        "timestamps": {
            "createdAt": {
                "created_at": {
                    "type": {
                        "value": Date,
                    }
                }
            },
            "updatedAt": {
                "updated": {
                    "type": {
                        "value": Date,
                    }
                }
            }
        }
    }
);

const BlockHistory = dynamoose.model("BlockHistory", blockHistorySchema);
module.exports = BlockHistory;
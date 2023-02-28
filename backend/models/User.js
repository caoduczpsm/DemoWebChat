const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require('uuid');

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "accessKeyId": "ncaoduc",
    "secretAccessKey": "ncaoduc",
    "region": "us-east-1",
    "endpoint": "http://localhost:8000"
});

dynamoose.aws.ddb.local();

const userSchema = new dynamoose.Schema({
    email: { type: "String", unique: true, required: true },
    _id: {
        type: String,
        default: () => uuidv4(),
    },
    name: { type: "String", required: true },
    password: { type: "String", required: true },
    pic: {
        type: "String",
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
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

const User = dynamoose.model("User", userSchema);

module.exports = User;
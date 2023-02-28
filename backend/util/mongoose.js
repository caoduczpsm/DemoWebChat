module.exports = {
    multipleDynamooseToObject: function (dynamooseArrays) {
        return dynamooseArrays.map((dynamoose) => dynamoose.toObject());
    },

    dynamooseToObject: function (dynamoose) {
        return dynamoose ? dynamoose.toObject() : dynamoose;
    },
};
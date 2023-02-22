const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const conversationSchema = mongoose.Schema({
    message: { type: String },
    senderId: { type: String },
    senderName: { type: String },
    receiverId: { type: String },
    receiverName: { type: String },
}, { timestamps: true }
);

conversationSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
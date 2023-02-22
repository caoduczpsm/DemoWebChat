const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const chatSchema = mongoose.Schema({
    message: { type: String },
    senderId: { type: String },
    senderName: { type: String },
    receiverId: { type: String },
    receiverName: { type: String },
}, { timestamps: true }
);

chatSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
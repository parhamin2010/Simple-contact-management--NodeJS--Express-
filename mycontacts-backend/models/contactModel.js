const mongoos = require('mongoose');
const contactSchema = mongoos.Schema({
    user_id:{
        type: mongoos.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        require: [true, "Please add contact name"]
    },
    email:{
        type: String,
        require: [true, "Please add email"]
    },
    phone:{
        type: String,
        require: [true, "Please add phone number"]
    }
}, {
    timestamps: true
});

module.exports = mongoos.model("Contacts", contactSchema);
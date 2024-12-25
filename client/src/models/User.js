import {Schema, models, model} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    image:{
        type: String,
    },
    id: {
        type: String,
    },
    givenName: {
        type: String,
    },
    familyName: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isWorker : {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    googleUser: {
        type: Boolean,
        default: false,
    },
});

const User = models.User || model("User", UserSchema);

export default User;

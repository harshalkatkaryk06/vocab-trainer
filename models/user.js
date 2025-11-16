import mongoose from 'mongoose';
const createUser = new mongoose.Schema({
    username:{type: String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true, unique:true},
    userid: {type: String, unique:true},
    age: {type: Number, required: true}
},{collection: 'users'});

const user = mongoose.model('User',createUser);
export default user;

const { create_jwt_token } = require("../../utils/jwt/create_token");
const {User} = require("../models/user");

exports.dbCreateUserHelper = async(object)=>{
    try {
        let user = new User(object);
        let savedUser = await user.save();

        savedUser = savedUser.toObject();
        return Promise.resolve(savedUser);

    }
    catch (error) {
        if(error.code==11000){
            return Promise.reject({message:'USER_CONFLICT'})
        }
        return Promise.reject(error);
    }
}

exports.dbLoginUserHelper = async (object) => {
    try {
        let user = await User.findOne(object).lean();
        if(user==null){
            return Promise.reject({message:"USER_NOT_FOUND"});
        }
        let accessToken = await create_jwt_token( process.env.ACCESS_TOKEN_SECRET, '24h', { "email": user.email, "userId": user._id})
        return Promise.resolve(accessToken);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

exports.dbFindUserHelper = async (object) => {
    try {
        let user = await User.findOne(object).lean();
        if(user==null){
            return Promise.reject({message:"USER_NOT_FOUND"});
        }
        return Promise.resolve(user);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

exports.dbFindAllUserHelper = async (object) => {
    try {
        let user = await User.find().lean();
        return Promise.resolve(user);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

exports.dbFindUserAndUpdateHelper = async (match,object) => {
    try {
        
        let updatedUser = await User.findOneAndUpdate(match,object, { returnOriginal: false, runValidators: true }).lean();
        return Promise.resolve(updatedUser);
    }
    catch (error) {
        return Promise.reject(error);
    }
}
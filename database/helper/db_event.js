const {Event} = require("../models/event");
exports.dbCreateEventHelper = async(object)=>{
    try {
        let event = new Event(object);
        let savedEvent = await event.save();

        savedEvent = savedEvent.toObject();
        return Promise.resolve(savedEvent);

    }
    catch (error) {
        if(error.code==11000){
            return Promise.reject({message:'USER_CONFLICT'})
        }
        return Promise.reject(error);
    }
},
exports.dbFindEventHelper = async (object) => {
    try {
        let event = await Event.findOne(object).lean();
        if(event==null){
            return Promise.reject({message:"EVENT_NOT_FOUND"});
        }
        return Promise.resolve(event);
    }
    catch (error) {
        return Promise.reject(error);
    }
},
exports.dbFindAllEventHelper = async (object) => {
    try {
        let event = await Event.find().lean();
        return Promise.resolve(event);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

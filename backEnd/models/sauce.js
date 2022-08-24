const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

    _id:{type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required :true},
    description: {type: String, required: true},
    heat: {type: Number, required: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    imageUrl: {type: String, required: true},
    mainPepper: {type: String, required: true},
    usersLiked: {type: String, required: false},
    usersDisliked: {type: String, required: false},
    userId: {type: String, required: true}
});

module.exports = mongoose.model('Sauce', sauceSchema);
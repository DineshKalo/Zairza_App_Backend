const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    wing: {
        type: String,
        enum: ['Hardware', 'Software', 'Design'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    links: { 
        url: {
            type: String
        }
    },
});

module.exports = mongoose.model("Blogs", blogSchema);


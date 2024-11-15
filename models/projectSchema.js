const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date_and_time: {
        type: Date,
        required: true
    },
    wing: {
        type: String,
        enum: ['Hardware', 'Software', 'Design'],
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed'],
        required: true
    },
    project_img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    senior_incharge: {
        type: String,
        required: true
    },
    links: [{ 
        name: {
            type: String
        },
        url: {
            type: String
        }
    }],
});

module.exports = mongoose.model("Projects", projectSchema);


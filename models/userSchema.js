const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    registration_number: {
        type: String,
        required: true
    },
    branch: {
        type: String
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
        minlength: 6
    },
    skills: [{ //domains
        type: String
    }],
    projects: [{
        name: {
            type: String
        },
        github: {
            type: String
        },
        tech_stack: [{
            type: String
        }],
        description: {
            type: String
        }
    }], 
    internships: [{
        role: {
            type: String
        },
        company: {
            type: String
        }
    }], 
    zairza_id: {
        type: String,
        unique: true
    },
    batch: {
        type: String
    },
    blogs: [{
        description: {
            type: String
        },
        title: {
            type: String
        },
        link: {
            type: String
        }
    }],
    social_handles: [{ //links
        name: {
            type: String
        },
        link: {
            type: String
        }
    }],
    achievements: [{ 
        name: {
            type: String
        }
    }],
    photoUrl: {
        type: String
    }
});

const User = mongoose.model('Profiles', userSchema);

module.exports = User;
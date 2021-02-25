const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    project: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    link: { type: String, required: true },
    github: { type: String, required: true },
    img: { type: String, required: true }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
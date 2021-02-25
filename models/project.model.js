const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
mongoose.connection.once('open', () => {
   console.log('MongoDB database connection established successfully!');
});

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
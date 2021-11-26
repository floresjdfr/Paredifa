import mongoose from 'mongoose';

const aboutUsSchema = mongoose.Schema(
    {
        university: String,
        school: String,
        course: String,
        professor: String,
        cycle: String,
        authors: [
            {
                id: String,
                name: String,
                hour: String,
            },
        ],
        group: String,
        version: String,
    },
    { collection: 'aboutUs' },
)

const aboutUsModel = mongoose.model('aboutUsModel', aboutUsSchema);

export default aboutUsModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {type: String, required: [true, 'category must be set']},
    title: {type: String, required: [true, 'title must be set']},
    hostName: {type: Schema.Types.ObjectId, ref:'User'},
    startDate: {type: Date, required: [true, 'startDate must be set']},
    endDate: {type: Date, required: [true, 'endDate must be set']},
    location: {type: String, required: [true, 'location must be set']},
    content: {type: String, required: [true, 'content must be set'], 
    minLength: [10, 'The content should have at least 10 characters']},
    image: {type: String, required: [true, 'image must be set']}
}
);

eventSchema.statics.getDistinctCategories = function() {
    return this.distinct('category');
}

//Collection name is events in database
module.exports = mongoose.model('Event', eventSchema);

const mongoose =require("mongoose");
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    content: {type: String, required: true},
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0}
}, {
    timestamps: true
});

module.exports = mongoose.model("Question",QuestionSchema);
export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plansSchema = new Schema({
    title:{
        type: 'string',
        required: 'true',
    },
    dueDate:{
        type: 'string',
        required: 'true'
    },
    description:{
        type:'string'
    }
},{timestamp:true});

module.exports = mongoose.model('plan', plansSchema);
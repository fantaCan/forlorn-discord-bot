import mongoose from 'mongoose';
import chalk from 'chalk';
import data from '../configs/db.js';

export default async function(){
    const options = {
        keepAlive: true
    }
    mongoose.set('strictQuery', false);
    await mongoose.connect(data.mongo_URI, options).then(function(){
        const message = chalk.magenta("[|] Connected to database!")
        console.log(message)
    })
}
import mongoose from 'mongoose';

const connectDatabase = () => {
    const mongoDbUrl = `${process.env.MONGODB_URI}`;
    console.log(`Connecting to ${mongoDbUrl}`);
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose
        .connect(mongoDbUrl, {})
        .then(() => {
            console.log('Successfully connected to the database');
        })
        .catch((err) => {
            console.log(
                `Could not connect to the database. Exiting now...\n${err}`
            );
            process.exit();
        });
};

export default connectDatabase;

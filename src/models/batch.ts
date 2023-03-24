import mongoose from "mongoose";

export async function batchFactory(): mongoose.Model<mongoose.Document>{

    const BatchSchema = new mongoose.Schema({
        reactorId: {
            type: String
        },
        batchId: {
            type: String
        },
    }, {
        strict: false
    });


    mongoose.set('debug', true);
    mongoose.set('bufferCommands', false);
    await mongoose.connect("mongodb://myUserAdmin:45470665Afm@192.168.100.34:27017/iiotsuite?authSource=admin", {
        bufferCommands: false,
        autoIndex: false,
    });

    return mongoose.models.production_batches || mongoose.model("production_batches", BatchSchema);

}
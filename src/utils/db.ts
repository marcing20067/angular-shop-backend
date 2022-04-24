import mongoose from "mongoose";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.utmte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export default mongoose.connect(uri);

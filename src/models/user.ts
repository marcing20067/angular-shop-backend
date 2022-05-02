import mongoose from 'mongoose';
const { Schema } = mongoose;

interface User {
  _id?: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { required: true, type: String },
  password: { required: true, type: String },
});

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // 'user' or 'admin'
});

// Hash password before saving
UserSchema.pre('save', async function() {
  try {
    if (!this.isModified('password')) return;
    if (!this.password) {
      throw new Error('Password is required for hashing');
    }
    console.log('Hashing password of length:', this.password.length);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Password successfully hashed');
  } catch (err) {
    console.error('Error inside pre-save hook:', err);
    throw err;
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

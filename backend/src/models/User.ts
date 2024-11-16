import mongoose from 'mongoose';

// Chat Schema
const chatSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // Unique identifier for each chat
    default: () => new mongoose.Types.ObjectId(), // Auto-generate ObjectId
  },
  role: {
    type: String,
    enum: ['user', 'bot'], // 'user' for user messages, 'bot' for chatbot responses
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Auto-generated timestamp for each chat message
  },
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters long
    },
    chats: { type: [chatSchema], default: [] } // Embedded Chat Schema with unique ID
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Export models
const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema);

export { User, Chat };

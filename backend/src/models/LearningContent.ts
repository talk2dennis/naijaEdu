import mongoose, { Document, Schema } from "mongoose";

// define interface for quiz
export interface IQuizQuestion {
    question: string,
    option: string[],
    correctAnswer: string
};


// define interface for learning content for schema
export interface ILearningContent extends Document {
    userId: string;
    topic: string;
    explanation: string,
    quizQuestions: IQuizQuestion[],
    createdAt: Date,
    updatedAt: Date
};

// define the quiz schema
const quizQuestionSchema: Schema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
}, { _id: false });

// define the learning content schema
const LearningContentSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  topic: { type: String, required: true, trim: true },
  explanation: { type: String, required: true },
  quizQuestions: { type: [quizQuestionSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// pre-save hook to update the updatedAt field
LearningContentSchema.pre<ILearningContent>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// create the model
const LearningContent = mongoose.model<ILearningContent>('LearningContent', LearningContentSchema);

export default LearningContent;
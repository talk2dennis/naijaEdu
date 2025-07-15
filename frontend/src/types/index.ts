export interface IUser {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    token?: string;
    isAdmin?: boolean;
    isAuthenticated?: boolean;
    profilePicture?: string;
    content: IContent[];
    followers: string[];
    following: string[];
}



export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IContent {
  _id: string;
  topic: string;
  explanation: string;
  quizQuestions: IQuizQuestion[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}


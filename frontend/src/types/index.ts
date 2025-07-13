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
    followers?: string[];
    following?: string[];
}

// interface IMovie 
export interface IContent {
    _id: string;
    topic: string;
    question: string[];
    answers: string[]
}

// frontend/src/data/object.tsx
// interface for how it works steps
export interface IHowItWorksStep {
  id: number;
  title: string;
  description: string;
}

export const howItWorksSteps: IHowItWorksStep[] = [
  {
    id: 1,
    title: "Register or Sign In",
    description: "Create an account to use the chat feature. Sign in easily with Google or register using your email, username, and password.",
  },
  {
    id: 2,
    title: "Start Chatting",
    description: "Click the Start Chat button and type in any topic you want a simple explanation for.",
  },
  {
    id: 3,
    title: "Listen to Explanation",
    description: "Click the speaker icon to hear the AI-generated voice read out the explanation for you.",
  },
  {
    id: 4,
    title: "Generate and Attempt Quiz",
    description: "Click the Generate Quiz button to take a short quiz based on the topic. Your score will be shown at the end.",
  },
  {
    id: 5,
    title: "Share with Others",
    description: "Easily share the explanation on your favorite social media platforms.",
  },
];
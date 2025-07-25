import "./css/About.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="intro">
        <h1>About NaijaEdu</h1>
        <p>
          NaijaEdu is your AI-powered learning companion. Ask questions on any topic you want to learn, get instant, easy-to-understand content generated by AI, and test your knowledge with interactive quizzes. Learning has never been this engaging and personalized!
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
            <li>🤖 Ask questions on any topic and get instant AI-generated explanations</li>
            <li>📝 Take interactive quizzes to test your knowledge</li>
            <li>📚 Access personalized learning recommendations</li>
            <li>⭐ Save your favorite topics and revisit them anytime</li>
            <li>🔔 Track your learning progress and achievements</li>
        </ul>
      </section>

      <section className="usage">
        <h2>How to Use</h2>
        <p>
          Sign up for a free account to unlock personalized learning features like saving your favorite topics and tracking your progress. Use the homepage to ask questions on any subject, explore AI-generated explanations, and take quizzes to reinforce your understanding. Click on any topic for more details and revisit your saved content anytime.
        </p>
      </section>

      <section className="developer">
        <h2>Meet the Developer</h2>
        <p>
          Hi, I'm Adigwe Dennis, a passionate software engineer and full-stack developer with expertise in React, React Native, TypeScript, Node.js, Express, and RESTful API design. I built NaijaEdu to make learning more accessible and engaging for everyone, with a special focus on making learning personalized and fun, particularly for younger ones. My goal is to leverage AI to create a personalized learning experience that adapts to each user's needs and interests.
        </p>
        <p>
          I love building modern, scalable, and user-friendly web applications. You can connect with me via my portfolio or professional networks.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
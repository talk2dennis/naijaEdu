import "./css/About.css";

const PrivacyPage = () => {
  return (
    <div className="about-page">
      <section className="intro">
        <h1>Privacy Policy</h1>
        <p>
          At NaijaEdu, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
        </p>
      </section>

      <section className="features">
        <h2>What We Collect</h2>
        <ul>
          <li>Email address and username when you sign up</li>
          <li>Your list of searched topics and quizzes</li>
          <li>Basic analytics to improve the platform</li>
        </ul>
      </section>

      <section className="usage">
        <h2>How We Use Your Data</h2>
        <p>
          We use your data to personalize your NaijaEdu experience such as saving your learning journey, your quizzes, and learning preferences. Your information helps us recommend relevant content and improve our services. We do <strong>not</strong> share or sell your personal data to third parties. All usage is strictly for enhancing your learning journey on NaijaEdu.
        </p>
      </section>

      <section className="developer">
        <h2>Security</h2>
        <p>
          We implement security measures to ensure your data remains safe. Access is limited and protected by authentication mechanisms.
        </p>
        <p>
          You can contact us at any time regarding your data, or request deletion of your account.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;


// About.js
import React from 'react';

function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        Welcome to our application! We are passionate about providing top-notch services to our users.
        Our team is dedicated to bringing you the best experience possible.
      </p>
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="path_to_image.jpg" alt="Team Member" />
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="path_to_image.jpg" alt="Team Member" />
            <h3>John Smith</h3>
            <p>Lead Developer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
    </div>
  );
}

export default About;

import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import ContactForm from './ContactForm';
import ResumeCTA from './ResumeCTA';

const ContactSection = () => {
  // Social link configurations (placeholder structures ready to be driven by backend API in future phases)
  const socials = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:portfolio@aditya.com',
  };

  return (
    <Section id="contact" className="contact-section">
      <Container>
        <div className="contact-grid">
          {/* Left Column: Typography, Resume download, and Social handles */}
          <div className="contact-info">
            <h2 className="editorial-heading">
              LET'S BUILD <br />
              SOMETHING <br />
              <span className="accent-gradient">GREAT</span>
            </h2>
            <p className="contact-intro">
              Whether it's an internship, collaboration, freelance opportunity, or simply a conversation about technology, I'd love to hear from you.
            </p>

            {/* Optional active resume download link */}
            <ResumeCTA />

            {/* Social Network list */}
            <div className="contact-socials" role="navigation" aria-label="Social connections">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                GitHub
              </a>
              <span className="social-divider" aria-hidden="true">/</span>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                LinkedIn
              </a>
              <span className="social-divider" aria-hidden="true">/</span>
              <a href={socials.email} className="contact-social-link">
                Email
              </a>
            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactSection;

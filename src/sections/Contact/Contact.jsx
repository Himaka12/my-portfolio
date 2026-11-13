import { useState } from 'react';
import { SectionHeader } from '../../components/common';
import Button from '../../components/Button';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = 'alex.dev@example.com'; // [Editable Placeholder]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    // In a real application or serverless function, trigger email dispatch here
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader
          eyebrow="05 // GET IN TOUCH"
          title="Let's build something remarkable together."
          description="Whether you have an internship opportunity, an open-source collaboration, or simply want to talk tech—my inbox is always open."
        />

        <div className="contact-grid">
          {/* Left Column: Direct Outreach & Socials */}
          <div className="contact-details">
            <div className="contact-card email-card">
              <span className="contact-card-label">DIRECT EMAIL</span>
              <div className="email-display-row">
                <a href={`mailto:${contactEmail}`} className="email-link">
                  {contactEmail}
                </a>
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <p className="email-hint">Feel free to email me directly anytime.</p>
            </div>

            {/* Availability Card */}
            <div className="contact-card availability-card">
              <div className="availability-header">
                <span className="status-dot"></span>
                <span className="availability-title">Current Status</span>
              </div>
              <p className="availability-text">
                Actively seeking Software Engineering Internships &amp; Research Opportunities for 2025 / 2026.
              </p>
            </div>

            {/* Social Network Links */}
            <div className="contact-card socials-card">
              <span className="contact-card-label">PROFESSIONAL PROFILES</span>
              <div className="contact-social-list">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-profile-item"
                >
                  <span className="profile-name">GitHub</span>
                  <span className="profile-handle">@github-profile</span>
                  <span className="profile-arrow">↗</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-profile-item"
                >
                  <span className="profile-name">LinkedIn</span>
                  <span className="profile-handle">/in/linkedin-profile</span>
                  <span className="profile-arrow">↗</span>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-profile-item"
                >
                  <span className="profile-name">X (Twitter)</span>
                  <span className="profile-handle">@x-handle</span>
                  <span className="profile-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form-card">
              <h3 className="form-heading">Send a Message</h3>
              <p className="form-subheading">I typically respond within 24 hours.</p>

              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent Successfully</h4>
                  <p>
                    Thank you for reaching out, {formData.name}. I look forward to connecting with you!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name" className="field-label">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email" className="field-label">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="ada@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject" className="field-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Internship opportunity / Project inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      className="field-input"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className="field-label">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Hello, I’d love to discuss..."
                      value={formData.message}
                      onChange={handleChange}
                      className="field-textarea"
                    ></textarea>
                  </div>

                  <Button type="submit" variant="primary" size="lg" icon="→">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

import React, { useState } from 'react';
import Button from '../ui/Button';
import ContactSuccess from './ContactSuccess';
import { contactService } from '../../services/contactService';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus('idle');
    try {
      await contactService.submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return <ContactSuccess onReset={() => setStatus('idle')} />;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form glass-panel" noValidate>
      {status === 'error' && (
        <div className="contact-form-error-banner" role="alert">
          Unable to send message. Please verify your connection and try again.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'input-error' : ''}`}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="form-error-text" role="alert">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="form-error-text" role="alert">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`form-input ${errors.subject ? 'input-error' : ''}`}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <span className="form-error-text" role="alert">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="form-error-text" role="alert">{errors.message}</span>}
      </div>

      <Button
        onClick={handleSubmit}
        variant="primary"
        disabled={isSubmitting}
        className="form-submit-btn"
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;

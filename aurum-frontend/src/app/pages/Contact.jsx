import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { contactAPI } from '../../services/api';
import contactVideo from '../../assets/v12.mp4';

const INPUT_STYLE = {
  background: 'transparent',
  border: '1px solid rgba(201,164,92,0.25)',
  color: '#f5f0e8',
  outline: 'none',
  padding: '12px 14px',
  fontSize: '0.85rem',
  width: '100%',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: '#8a7a6a',
  marginBottom: '6px',
  display: 'block',
};

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    lines: ['12 Rue du Faubourg Saint-Honoré', 'Paris, France 75008'],
  },
  {
    icon: Phone,
    label: 'Call Us',
    lines: ['+33 1 42 65 00 00', 'Mon–Fri: 9:00 – 18:00 CET'],
  },
  {
    icon: Mail,
    label: 'Email Us',
    lines: ['hello@aurum-parfum.com', 'concierge@aurum-parfum.com'],
  },
  {
    icon: Clock,
    label: 'Hours',
    lines: ['Monday – Saturday', '10:00 AM – 7:00 PM'],
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Map 'name' to 'fullName' for the API
      await contactAPI.submit({
        fullName: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      });
      setSent(true);
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Header */}
      <div className="py-16 px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>
          Get in Touch
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
          Contact Us
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mt-4 text-sm max-w-md mx-auto" style={{ color: '#8a7a6a' }}>
          Our dedicated concierge team is here to assist you with anything you need.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>Our Details</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.3 }}>
              We'd Love to<br /><em>Hear From You</em>
            </h2>
            <div className="w-10 h-px mt-5" style={{ background: '#c9a45c' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {contactInfo.map(({ icon: Icon, label, lines }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-5"
                style={{ border: '1px solid rgba(201,164,92,0.12)', background: '#0d0b0f' }}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-3 rounded-sm"
                  style={{ background: 'rgba(201,164,92,0.1)', color: '#c9a45c' }}>
                  <Icon size={15} />
                </div>
                <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#c9a45c' }}>{label}</p>
                {lines.map((line) => (
                  <p key={line} className="text-sm" style={{ color: '#8a7a6a' }}>{line}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden"
            style={{ height: '220px', background: '#0d0b0f', border: '1px solid rgba(201,164,92,0.12)' }}
          >
            <video 
              src={contactVideo} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-30 video-grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={28} className="mx-auto mb-2" style={{ color: '#c9a45c' }} />
                <p className="text-xs uppercase tracking-widest" style={{ color: '#c9a45c' }}>Paris, France</p>
                <p className="text-xs mt-1" style={{ color: '#8a7a6a' }}>12 Rue du Faubourg Saint-Honoré</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>Send a Message</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.3, marginBottom: '2rem' }}>
            How Can We<br /><em>Help You?</em>
          </h2>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(201,164,92,0.1)', border: '2px solid rgba(201,164,92,0.4)' }}>
                <Check size={28} style={{ color: '#c9a45c' }} />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#f5f0e8' }}>
                Message Sent
              </h3>
              <p className="mt-3 text-sm" style={{ color: '#8a7a6a' }}>
                Thank you for reaching out. Our concierge team will respond within 24 hours.
              </p>
              <button onClick={() => setSent(false)} className="mt-8 text-xs uppercase tracking-widest" style={{ color: '#c9a45c' }}>
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={LABEL_STYLE}>Full Name *</label>
                  <input required value={form.name} onChange={setField('name')} style={INPUT_STYLE}
                    onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Email Address *</label>
                  <input type="email" required value={form.email} onChange={setField('email')} style={INPUT_STYLE}
                    onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                </div>
              </div>

              <div>
                <label style={LABEL_STYLE}>Subject</label>
                <select value={form.subject} onChange={setField('subject')}
                  style={{ ...INPUT_STYLE, background: '#0d0b0f', cursor: 'pointer' }}>
                  <option value="">Select a topic</option>
                  <option>Order Inquiry</option>
                  <option>Product Information</option>
                  <option>Returns & Exchanges</option>
                  <option>Bespoke Fragrance</option>
                  <option>Corporate Gifting</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label style={LABEL_STYLE}>Message *</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={setField('message')}
                  placeholder="Tell us how we can help you..."
                  style={{ ...INPUT_STYLE, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm" style={{ color: '#ef4444' }}>
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{ background: '#c9a45c', color: '#080608' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}


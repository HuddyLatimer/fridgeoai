"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Bug, Wrench } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "bug",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xzzjwdee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", type: "bug", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      alert("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo1.png"
                alt="FridgeoAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold gradient-text">FridgeoAI</span>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Contact Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about FridgeoAI? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-black">Report an Issue</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">Thank you! Your message has been sent successfully.</p>
                  <p className="text-green-700 text-sm mt-1">We'll get back to you as soon as possible.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Issue Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Please describe the issue or provide your feedback..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-black">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help! Whether you found a bug, have a feature request, or just want to share feedback, we'd love to hear from you.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary-light/10 p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-4 rounded-lg">
                    <Mail className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-xl mb-2">Email Us</h3>
                    <a
                      href="mailto:fridgeoai@proton.me"
                      className="text-primary hover:underline font-semibold text-lg"
                    >
                      fridgeoai@proton.me
                    </a>
                    <p className="text-gray-600 text-sm mt-2">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                  <Bug className="text-primary" size={24} />
                  Found a Bug?
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Help us improve FridgeoAI by reporting bugs you encounter. Please include:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• What you were trying to do</li>
                  <li>• What happened instead</li>
                  <li>• Screenshot if possible</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                  <Wrench className="text-primary" size={24} />
                  Have an Idea?
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  We love feature requests! Tell us what would make FridgeoAI better for you.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary-light/10 p-6 rounded-2xl">
                <h3 className="font-bold text-black mb-2">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/#features"
                    className="text-primary hover:underline font-semibold text-sm block"
                  >
                    View Features →
                  </Link>
                  <Link
                    href="/#how-it-works"
                    className="text-primary hover:underline font-semibold text-sm block"
                  >
                    How It Works →
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline font-semibold text-sm block"
                  >
                    Privacy Policy →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FridgeoAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

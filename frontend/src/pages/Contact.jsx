import { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";
import contactBanner from "../assets/dashboard-banner.jpg";

const SocialIcon = ({ path }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d={path} />
  </svg>
);

const icons = {
  instagram:
    "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12",
  linkedin:
    "M4.98 3.5C3.34 3.5 2 4.84 2 6.48s1.34 2.98 2.98 2.98h.03C6.66 9.46 8 8.12 8 6.48 8 4.84 6.65 3.5 4.98 3.5M2.4 21.5h5.16V8.9H2.4v12.6M9.98 8.9v12.6h5.16v-6.62c0-1.77.34-3.48 2.53-3.48 2.16 0 2.19 2.02 2.19 3.6v6.5H25V13.72c0-4.9-1.05-8.68-6.8-8.68-2.75 0-4.6 1.51-5.36 2.94h-.07V8.9H9.98",
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("https://learnsphere-production-14f7.up.railway.app/api/contact", formData);
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <div className="relative h-56 overflow-hidden">
        <img src={contactBanner} alt="Contact Us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/85 to-primary-dark/50 flex items-center justify-center">
          <div className="text-center animate-[fadeIn_0.5s_ease-in-out]">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">Get in Touch</h1>
            <p className="text-white/80">We'd love to hear from you</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Email</p>
              <p className="font-medium text-gray-800">team.techverseagency@gmail.com</p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Phone</p>
              <p className="font-medium text-gray-800">+92 300 1234567</p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Address</p>
              <p className="font-medium text-gray-800">Gujrat,Punjab, Pakistan</p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5">
            <p className="text-gray-400 text-xs mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/techverseagency_?igsh=bmhiMDRibWZ3eDY0" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition">
                <SocialIcon path={icons.instagram} />
              </a>
              <a href="https://www.facebook.com/share/1AnNedBCFn/" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition">
                <SocialIcon path={icons.facebook} />
              </a>
              <a href="https://www.linkedin.com/in/techverse-agency-77b35241a?" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition">
                <SocialIcon path={icons.linkedin} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark mb-1">Send us a message</h2>
          <p className="text-gray-500 text-sm mb-6">
            Have a question? Fill out the form and we'll get back to you soon.
          </p>

          {submitted ? (
            <p className="text-center text-primary-dark font-medium bg-primary/10 rounded-lg py-4 animate-[fadeIn_0.4s_ease-in-out]">
              Thank you! Your message has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />

              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />

              <label className="text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
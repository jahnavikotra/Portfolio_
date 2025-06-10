import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { AiFillInstagram } from 'react-icons/ai';
import { SiLeetcode } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import ParticleField from '../components/ParticleField'; 



const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-10 h-10 text-black dark:text-white"
    aria-hidden="true"
  >
    <path d="M14.76 10.34L20.66 3h-1.92l-4.81 5.79L10.34 3H3l6.32 9.07L3 21h1.92l5.06-6.1 3.64 6.1H21l-6.24-10.66zM5.23 4.27h3.16l9.24 15.46h-3.16L5.23 4.27z" />
  </svg>
);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    emailjs.init("i9xpnv3bcijH7LknW"); // Replace with actual public key

    const section = sectionRef.current;
    const form = formRef.current;

    if (section) {
      gsap.fromTo(
        section.querySelector('.contact-content'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            scrub: 1
          }
        }
      );
    }

    if (form) {
      const formFields = form.querySelectorAll('.form-field');
      formFields.forEach((field, index) => {
        gsap.fromTo(
          field,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: field,
              start: 'top 95%',
              end: 'top 75%',
              toggleActions: 'play reverse play reverse',
              scrub: 1,
              once: false
            }
          }
        );
      });
    }

    // Refresh ScrollTrigger after layout changes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    try {
      const result = await emailjs.send(
        'service_il0k5kw',
        'template_5zbal2b',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'jahnavikotra49@gmail.com',
        },
        'i9xpnv3bcijH7LknW'
      );

      console.log('Email sent successfully:', result);

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="contact-content">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-gray-300 text-center mb-8">Get In Touch</h2>
          <p className="text-xl text-black dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Let's create something amazing together!
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-black dark:text-gray-300">Let's Connect</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white-400 dark:bg-[#222222] rounded-full flex items-center justify-center">
                      <MdEmail className="w-6 h-6 text-black dark:text-gray-300" />
                    </div>
                    <div>
                      <div className="text-black dark:text-gray-300">Email</div>
                      <div className="text-black dark:text-gray-300">jahnavikotra49@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white-400 dark:bg-[#222222] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">📍</span>
                    </div>
                    <div>
                      <div className="text-black dark:text-gray-300">Location</div>
                      <div className="text-black dark:text-gray-300">India</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">Follow Me</h4>
                <div className="flex items-center space-x-6">
                  <a
                    href="https://www.instagram.com/jahnavi__gopal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white text-5xl hover:text-pink-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <AiFillInstagram />
                  </a>
                  <a
                    href="https://x.com/Jahnavi_kotra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4x1 text-black dark:text-white hover:text-blue-500 transition-colors duration-300"
                    aria-label=" (Twitter)"
                  >
                    <XIcon />
                  </a>
                  <a
                    href="https://leetcode.com/u/jahnavikotra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4xl text-black dark:text-white hover:text-yellow-600 transition-colors durarion-300"
                    aria-label="LeetCode"
                  >
                    <SiLeetcode />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <label htmlFor="name" className="block text-black dark:text-gray-300 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-[#F0F4FA] dark:bg-[#222222] border-2 border-[#E0E7FF] dark:border-black rounded-lg focus:border-[#CBD5F1] dark:focus:border-gray-400 focus:outline-none transition-colors text-black dark:text-white disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-black dark:text-gray-300 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-[#F0F4FA] dark:bg-[#222222] border-2 dark:border-black rounded-lg focus:border-[#CBD5F1] dark:focus:border-gray-400 focus:outline-none transition-colors text-black dark:text-white disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-black dark:text-gray-300 mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#F0F4FA] dark:bg-[#222222] border-2 dark:border-black rounded-lg focus:border-[#CBD5F1] dark:focus:border-gray-400  focus:outline-none transition-colors text-black dark:text-white resize-none disabled:opacity-50 mb-6"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-6"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-20 pt-4 border-t border-black dark:border-gray-700">
        <p className="text-black dark:text-gray-400 mt-4 mb-0">
          ©2025 Copyright: JK.
        </p>
      </div>
    </section>
  );
};

export default Contact;

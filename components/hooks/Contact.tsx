'use client'
import React, { useState } from 'react'
import { CgMail } from 'react-icons/cg';
import { FaClock, FaFacebook, FaInstagram, FaMapPin, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/Card';
import { Input } from '../UI/Input';
import { Textarea } from '../UI/Textarea';
import { Button } from '../UI/Button';
import { BiSend } from 'react-icons/bi';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: FaMapPin,
      title: 'Address',
      content: '1550 Eleventh Ave, York, PA 17402',
      link: 'https://maps.google.com',
    },
    {
      icon: FaPhone,
      title: 'Phone',
      content: '717-251-1272',
      link: 'tel:+44XXXXXXXXXX',
    },
    {
      icon: CgMail,
      title: 'Email',
      content: 'info@rccgyork.net',
      link: 'mailto:info@rccgyork.net',
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      content: 'Sun: 3:00 PM - 7:00 PM',
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/share/19MTnpMvoe', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
    // { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="py-24 bg-linear-to-br from-red-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-red-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl " />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-100 to-red-50 text-red-700 rounded-full mb-6">
            <CgMail className="w-4 h-4" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out with questions or to plan your visit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className='relative z-10'>
            <Card className="border-0 shadow-2xl bg-white z-10">
              <CardHeader>
                <CardTitle className="text-3xl">Send Us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 z-10">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="border-gray-300 focus:border-red-700 focus:ring-red-100"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="border-gray-300 focus:border-red-700 focus:ring-red-100"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-gray-300 focus:border-red-700 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-gray-300 focus:border-red-700 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message *"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="border-gray-300 focus:border-red-700 focus:ring-red-100"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 shadow-lg hover:shadow-xl transition-all group"
                    size="lg"
                  >
                    Send Message
                    <BiSend className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={info.title}
                    className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-linear-to-br from-red-100 to-red-200 shadow-lg">
                          <Icon className="h-6 w-6 text-red-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-600 hover:text-red-700 transition-colors"
                              target={info.link.startsWith('http') ? '_blank' : undefined}
                              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Map Card */}
            <Card className="border-0 shadow-xl overflow-hidden bg-white">
              <div className="h-64 bg-linear-to-br from-red-100 to-red-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                <div className="text-center text-red-700 z-10">
                  <FaMapPin className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">RCCG York</p>
                  <p className="text-sm">Champions' Chapel</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>

            {/* Social Media Card */}
            <Card className="bg-linear-to-br from-red-700 via-red-800 to-red-900 text-white border-0 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              <CardContent className="pt-8 pb-8 relative z-10">
                <h3 className="text-2xl mb-4">Connect on Social Media</h3>
                <p className="text-red-100 mb-6">
                  Follow us for daily inspiration, live streams, and community updates.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white hover:text-red-700 transition-all hover:scale-110 shadow-lg"
                        aria-label={social.label}
                      >
                        <Icon className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact

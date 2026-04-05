"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import { MapPin, Phone, Mail, ArrowRight, Calculator, Send, Loader2, Upload, X, Clock } from 'lucide-react';

interface ContactDetails {
  companyName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  email: string;
  description: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{url: string; public_id: string} | null>(null);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residential',
    subject: '',
    message: '',
    budget: 'not-sure'
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch('https://api.rkinteriorstudio.in/api/contact-details');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setContactDetails(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
    } finally {
      setLoadingContact(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');

    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);

      const response = await fetch('https://api.rkinteriorstudio.in/api/upload', {
        method: 'POST',
        body: formDataObj
      });

      const data = await response.json();

      if (data.success && data.url) {
        setUploadedImage({
          url: data.url,
          public_id: data.public_id
        });
      } else {
        setErrorMessage('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const submissionData = {
        ...formData,
        imageUrl: uploadedImage?.url || null
      };

      const response = await fetch('https://api.rkinteriorstudio.in/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'residential',
          subject: '',
          message: '',
          budget: 'not-sure'
        });
        setUploadedImage(null);
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        setErrorMessage(data.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />

      {/* 1. CENTERED HERO SECTION */}
      <main className="relative pt-40 pb-16 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-px w-12 bg-[#a68a6b]"></div>
              <span className="text-[#a68a6b] font-bold uppercase tracking-widest text-sm">
                Get in Touch
              </span>
              <div className="h-px w-12 bg-[#a68a6b]"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6">
              Let&apos;s build something <br className="hidden md:block" />
              <span className="text-[#a68a6b] italic">extraordinary</span> together.
            </h1>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              Whether you have a clear vision or just a blank canvas, our team is ready to help you bring your architectural dreams to life.
            </p>
          </motion.div>
        </div>
      </main>

      {/* 2. CENTERED ESTIMATE CTA CARD */}
      <section className="pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-zinc-900 rounded-sm shadow-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between group border border-zinc-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#a68a6b]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#a68a6b]/20 transition-colors duration-700"></div>

            <div className="relative z-10 flex items-center mb-6 md:mb-0 text-center md:text-left">
              <div className="hidden md:flex items-center justify-center w-16 h-16 bg-[#a68a6b]/20 rounded-full mr-6">
                <Calculator className="w-8 h-8 text-[#a68a6b]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-white mb-2">Want a quick cost projection?</h3>
                <p className="text-zinc-400 font-light">Use our smart calculator to get an instant estimate for your project.</p>
              </div>
            </div>

            <Link 
              href="/calculator"
              className="relative z-10 bg-[#a68a6b] hover:bg-[#8e7358] text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center shrink-0 group-hover:scale-105"
            >
              Calculate Estimate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. CONTACT FORM & INFO SECTION */}
      <section className="pb-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Studio Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="p-4 bg-white shadow-sm border border-zinc-100 rounded-sm mr-6 group-hover:border-[#a68a6b] transition-colors">
                    <MapPin className="w-6 h-6 text-[#a68a6b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Headquarters</h4>
                    <p className="text-slate-600 font-light leading-relaxed">
                      {loadingContact ? (
                        <span>Loading...</span>
                      ) : contactDetails ? (
                        <>
                          {contactDetails.address.street}<br />
                          {contactDetails.address.city}, {contactDetails.address.state}<br />
                          {contactDetails.address.zipCode}, {contactDetails.address.country}
                        </>
                      ) : (
                        <>
                          123 Design Boulevard<br />
                          Suite 400, New York<br />
                          NY 10001, USA
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-4 bg-white shadow-sm border border-zinc-100 rounded-sm mr-6 group-hover:border-[#a68a6b] transition-colors">
                    <Phone className="w-6 h-6 text-[#a68a6b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Call Us</h4>
                    <a
                      href={`tel:${contactDetails?.phone || '+1234567890'}`}
                      className="text-slate-600 font-light hover:text-[#a68a6b] transition-colors"
                    >
                      {loadingContact ? 'Loading...' : (contactDetails?.phone || '+1 (234) 567-890')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-4 bg-white shadow-sm border border-zinc-100 rounded-sm mr-6 group-hover:border-[#a68a6b] transition-colors">
                    <Mail className="w-6 h-6 text-[#a68a6b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Email Us</h4>
                    <a
                      href={`mailto:${contactDetails?.email || 'hello@architecture.com'}`}
                      className="text-slate-600 font-light hover:text-[#a68a6b] transition-colors"
                    >
                      {loadingContact ? 'Loading...' : (contactDetails?.email || 'hello@architecture.com')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-4 bg-white shadow-sm border border-zinc-100 rounded-sm mr-6 group-hover:border-[#a68a6b] transition-colors">
                    <Clock className="w-6 h-6 text-[#a68a6b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Business Hours</h4>
                    <div className="text-slate-600 font-light leading-relaxed space-y-1">
                      {loadingContact ? (
                        <span>Loading...</span>
                      ) : contactDetails ? (
                        <>
                          {Object.entries(contactDetails.businessHours).map(([day, hours]) => (
                            <div key={day} className="capitalize">
                              <span className="font-medium text-slate-800">{day}:</span>{' '}
                              {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <div>Monday - Friday: 09:00 - 18:00</div>
                          <div>Saturday: 10:00 - 16:00</div>
                          <div>Sunday: Closed</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-zinc-100">
                <h3 className="text-2xl font-serif text-slate-900 mb-6">Send a Message</h3>
                
                {errorMessage && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-sm text-sm">
                    {errorMessage}
                  </div>
                )}

                {isSubmitted && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-sm text-sm">
                    ✅ Message sent successfully! Check your email for confirmation.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2 font-medium">Your Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2 font-medium">Email Address</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2 font-medium">Phone (Optional)</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2 font-medium">Budget Range</label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors"
                      >
                        <option value="not-sure">Not sure yet</option>
                        <option value="under-5lakh">Under 5 Lakh</option>
                        <option value="5-10-lakh">5-10 Lakh</option>
                        <option value="10-25-lakh">10-25 Lakh</option>
                        <option value="25-50-lakh">25-50 Lakh</option>
                        <option value="50-lakh-plus">50 Lakh+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2 font-medium">Project Type</label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="renovation">Renovation</option>
                        <option value="interior">Interior Design</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2 font-medium">Subject</label>
                      <input 
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors"
                        placeholder="Project title..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 mb-2 font-medium">Project Details</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 text-slate-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#a68a6b] focus:ring-1 focus:ring-[#a68a6b] transition-colors resize-none"
                      placeholder="Tell us about your vision, requirements, timeline..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 mb-2 font-medium">Attach Reference Image (Optional)</label>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                    
                    {!uploadedImage ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full border-2 border-dashed border-zinc-300 rounded-sm p-6 text-center hover:border-[#a68a6b] hover:bg-[#a68a6b]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Upload className="w-6 h-6 text-[#a68a6b] mx-auto mb-2" />
                        {isUploading ? (
                          <p className="text-sm text-zinc-600">Uploading...</p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-slate-900">Click to upload reference image</p>
                            <p className="text-xs text-zinc-500">JPG, PNG up to 10MB</p>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="relative inline-block w-full">
                        <div className="w-full bg-zinc-50 border border-zinc-200 rounded-sm p-4 flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <img 
                              src={uploadedImage.url} 
                              alt="Preview" 
                              className="w-16 h-16 object-cover rounded-sm"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">Image uploaded ✅</p>
                              <p className="text-xs text-zinc-500">Ready to submit with your message</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="ml-2 p-1 hover:bg-red-100 rounded transition-colors"
                          >
                            <X className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isUploading || isSubmitted}
                    className="w-full bg-slate-900 hover:bg-[#a68a6b] text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:hover:bg-slate-900"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Sending...</>
                    ) : isSubmitted ? (
                      <span className="text-white">Message Sent! Check your email</span>
                    ) : (
                      <>Send Message <Send className="w-4 h-4 ml-3" /></>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
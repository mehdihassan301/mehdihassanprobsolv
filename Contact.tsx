import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };
    
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
            }, 5000); // Auto-hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
                    <p className="text-gray-400 mt-2">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
                </div>
                <div className="max-w-3xl mx-auto glassmorphism rounded-lg p-8 md:p-12 fade-in">
                    
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isSubmitted ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                        {isSubmitted && (
                            <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg text-center flex justify-between items-center" role="alert">
                                <span className="block sm:inline">Thank you! Your message has been sent successfully.</span>
                                <button onClick={() => setIsSubmitted(false)} aria-label="Close success message" className="p-1">
                                    <svg className="fill-current h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="Your Name"
                                    aria-label="Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="your.email@example.com"
                                    aria-label="Email"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="Your message here..."
                                aria-label="Message"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/50"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

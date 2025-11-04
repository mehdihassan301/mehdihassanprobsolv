
import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="fade-in">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Me</h2>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            As the founder of ProbSolv, our journey is driven by a passion for leveraging technology to solve real-world business challenges. With professionak experience in web design, AI integration, and digital service automation, I specialize in creating solutions that are not only visually stunning but also incredibly efficient.
                        </p>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Our mission is to empower businesses by simplifying complexity. I believe that smart technology should be accessible to everyone, enabling entrepreneurs and companies to streamline operations, enhance customer engagement, and unlock new growth opportunities.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                             From crafting high-converting websites to implementing sophisticated AI-driven automation, We are dedicated to delivering excellence and innovation in every project.
                        </p>
                    </div>
                    <div className="flex justify-center items-center fade-in">
                        <div className="relative w-80 h-80 md:w-96 md:h-96">
                            <div className="absolute inset-0 bg-indigo-600 rounded-full transform rotate-6"></div>
                            <img 
                                src="https://picsum.photos/seed/mehdihassan/400/400" 
                                alt="Mehdi Hassan" 
                                className="relative w-full h-full object-cover rounded-full shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

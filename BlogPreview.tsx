import React from 'react';
import { blogPosts } from '../data/blogData';

const BlogPreview: React.FC = () => {
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <section id="blog-preview" className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Latest from the Blog</h2>
                    <p className="text-gray-400 mt-2">Insights on design, automation, and business growth.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <div 
                            key={post.id} 
                            className="fade-in group" 
                            style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="glassmorphism rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-600/30">
                                <div className="overflow-hidden">
                                    <img loading="lazy" src={post.image} alt={post.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-sm text-indigo-400 mb-2">{post.category}</span>
                                    <h3 className="text-xl font-bold text-white mb-3 flex-grow">{post.title}</h3>
                                    <p className="text-gray-400 mb-4 text-sm">{post.excerpt}</p>
                                    <a href={`/blog-details.html?id=${post.id}`} className="text-indigo-400 font-semibold hover:text-white transition-colors mt-auto">
                                        Read More &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 fade-in">
                    <a 
                        href="/blog.html"
                        className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/50"
                    >
                        View All Blogs
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
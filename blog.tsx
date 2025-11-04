import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';
import Newsletter from './components/Newsletter';
import { blogPosts } from './data/blogData';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
    const sectionsRef = useRef<HTMLElement[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

    const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

    const filteredPosts = useMemo(() => {
        return blogPosts
            .filter(post => {
                const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
                const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
            });
    }, [searchTerm, selectedCategory]);

    const handleLoadMore = () => {
        setVisiblePosts(prev => prev + POSTS_PER_PAGE);
    };
    
    useEffect(() => {
        // Reset visible posts when filter changes
        setVisiblePosts(POSTS_PER_PAGE);
    }, [searchTerm, selectedCategory]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        const sections = document.querySelectorAll('.fade-in');
        sections.forEach((section) => {
            if (section instanceof HTMLElement) {
                sectionsRef.current.push(section);
                observer.observe(section);
            }
        });
        return () => {
            sectionsRef.current.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div className="bg-[#0a0a1a] min-h-screen overflow-x-hidden">
            <Header />
            <main>
                <section id="blog-hero" className="pt-32 pb-16 text-center bg-black/20 fade-in">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white">Insights & Tutorials</h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-4">Web Design • AI Automation • Business Growth — by Mehdi Hassan</p>
                    </div>
                </section>

                <section id="blog-grid" className="py-20 md:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Filter and Search Section */}
                        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center fade-in">
                            <div className="relative w-full md:max-w-xs">
                                <input 
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {categories.map(category => (
                                    <button 
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Blog Post Grid */}
                        {filteredPosts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                                    <div 
                                        key={post.id} 
                                        className="fade-in group" 
                                        style={{ transitionDelay: `${Math.min(index, POSTS_PER_PAGE - 1) * 100}ms` }}>
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
                        ) : (
                            <div className="text-center py-16 fade-in">
                                <h3 className="text-2xl font-bold text-white">No posts found</h3>
                                <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}

                        {/* Load More Button */}
                        {visiblePosts < filteredPosts.length && (
                             <div className="text-center mt-12 fade-in">
                                <button
                                    onClick={handleLoadMore}
                                    className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/50"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                
                <Newsletter />
            </main>
            <Footer />
            <GoToTopButton />
        </div>
    );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BlogPage />
  </React.StrictMode>
);
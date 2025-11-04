import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';
import Sidebar from './components/Sidebar';
import { blogPosts, BlogPost } from './data/blogData';

const updateMetaTags = (post: BlogPost) => {
    document.title = `${post.title} - Mehdi Hassan`;
    
    const setMeta = (selector: string, content: string, isProperty = true) => {
        const el = document.querySelector(isProperty ? `meta[property="${selector}"]` : `meta[name="${selector}"]`);
        if (el) el.setAttribute('content', content);
    };
    
    const setCanonical = () => {
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', `https://www.probsolv.online/blog-details.html?id=${post.id}`);
    };

    setMeta('og:title', `${post.title} | ProbSolv Blog`);
    setMeta('twitter:title', `${post.title} | ProbSolv Blog`);
    setMeta('description', post.excerpt, false);
    setMeta('og:description', post.excerpt);
    setMeta('twitter:description', post.excerpt);
    setMeta('og:image', post.image);
    setMeta('twitter:image', post.image);
    setMeta('og:url', `https://www.probsolv.online/blog-details.html?id=${post.id}`);
    
    setCanonical();

    // Update or create JSON-LD schema
    let schemaScript = document.getElementById('article-schema');
    if (!schemaScript) {
        // FIX: Using a new constant `newScript` ensures its type is correctly inferred as HTMLScriptElement,
        // resolving the error when setting the `type` property.
        const newScript = document.createElement('script');
        newScript.type = 'application/ld+json';
        newScript.id = 'article-schema';
        document.head.appendChild(newScript);
        schemaScript = newScript;
    }
    schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "author": {
            "@type": "Person",
            "name": post.author,
            "url": "https://www.probsolv.online"
        },
        "publisher": {
            "@type": "Organization",
            "name": "ProbSolv",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.probsolv.online/assets/logo.png"
            }
        },
        "datePublished": new Date(post.date).toISOString()
    });
};


const BlogDetailsPage: React.FC = () => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const sectionsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');
        if (postId) {
            const foundPost = blogPosts.find(p => p.id === parseInt(postId, 10));
            if (foundPost) {
                setPost(foundPost);
                updateMetaTags(foundPost);
            } else {
                setPost(null);
                document.title = "Post Not Found - Mehdi Hassan";
            }
        }
    }, [window.location.search]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];
        return blogPosts
            .filter(p => p.category === post.category && p.id !== post.id)
            .slice(0, 3);
    }, [post]);

    useEffect(() => {
        if (!post) return;
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
    }, [post]);

    if (!post) {
        return (
             <div className="bg-[#0a0a1a] min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center text-center px-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
                        <p className="text-gray-400 mb-8">The blog post you are looking for does not exist or could not be loaded.</p>
                        <a href="/blog.html" className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition-all duration-300">
                            &larr; Back to Blog
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a1a] min-h-screen overflow-x-hidden">
            <Header />
            <main>
                <article className="pt-32 pb-20 md:pb-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                       <header className="text-center mb-12 fade-in">
                            <span className="text-indigo-400 font-semibold">{post.category}</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4 max-w-4xl mx-auto">{post.title}</h1>
                            <div className="flex items-center justify-center space-x-4 text-gray-400">
                                <img src="https://picsum.photos/seed/mehdihassan/40/40" alt="Mehdi Hassan" className="w-10 h-10 rounded-full"/>
                                <div>
                                    <p className="font-semibold text-white">By {post.author}</p>
                                    <p className="text-sm">{post.date}</p>
                                </div>
                            </div>
                        </header>
                        <img loading="lazy" src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-12 shadow-2xl shadow-black/30 fade-in" />
                        <div className="grid lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8">
                                <div 
                                    className="prose-custom prose-lg max-w-none fade-in"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                ></div>
                                <div className="mt-16 fade-in">
                                    <a href="/blog.html" className="text-indigo-400 font-semibold hover:text-white transition-colors text-lg">
                                        &larr; Back to All Posts
                                    </a>
                                </div>
                            </div>
                             <div className="lg:col-span-4">
                                <Sidebar />
                            </div>
                        </div>

                        {/* Related Posts Section */}
                        {relatedPosts.length > 0 && (
                            <section className="mt-20 md:mt-32 border-t border-gray-800 pt-16 fade-in">
                                <h2 className="text-3xl font-bold text-white text-center mb-12">Related Posts</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedPosts.map((relatedPost) => (
                                        <div key={relatedPost.id} className="group">
                                            <div className="glassmorphism rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-600/30">
                                                <div className="overflow-hidden">
                                                    <img loading="lazy" src={relatedPost.image} alt={relatedPost.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <h3 className="text-lg font-bold text-white mb-3 flex-grow">{relatedPost.title}</h3>
                                                    <a href={`/blog-details.html?id=${relatedPost.id}`} className="text-indigo-400 font-semibold hover:text-white transition-colors mt-auto text-sm">
                                                        Read More &rarr;
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </article>
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
    <BlogDetailsPage />
  </React.StrictMode>
);
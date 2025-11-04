import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import WhyChooseMe from './components/WhyChooseMe';
import BlogPreview from './components/BlogPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';

const App: React.FC = () => {
    const sectionsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const sections = document.querySelectorAll('.fade-in');
        sections.forEach((section) => {
            if (section instanceof HTMLElement) {
                sectionsRef.current.push(section);
                observer.observe(section);
            }
        });

        return () => {
            sectionsRef.current.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="bg-[#0a0a1a] min-h-screen overflow-x-hidden">
            <Header />
            <main>
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <Testimonials />
                <WhyChooseMe />
                <Faq />
                <BlogPreview />
                <Contact />
            </main>
            <Footer />
            <GoToTopButton />
        </div>
    );
};

export default App;

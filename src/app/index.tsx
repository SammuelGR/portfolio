import Header from './Header/Header';
import Hero from './Hero/Hero';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';
import About from './About/About';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <Experience />

        <Projects />

        <About />

        <Contact />
      </main>

      <Footer />
    </>
  );
}

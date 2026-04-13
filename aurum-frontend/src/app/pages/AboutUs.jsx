import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// Import all videos from src/assets folder using Vite's glob import
const videoFiles = import.meta.glob('aurum-frontend/src/assets/v11.mp4', { eager: true });
const allVideos = Object.values(videoFiles).map((module) => module.default);

// Get a random video for the hero section
const heroVideo = allVideos[Math.floor(Math.random() * allVideos.length)];
const valuesVideo = '../../assets/9582013-uhd_3840_2160_30fps.mp4';
const IMG1 = 'https://images.unsplash.com/photo-1542461606-241f9dc580dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG2 = 'https://images.unsplash.com/photo-1709095458514-573bc6277d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const IMG3 = 'https://images.unsplash.com/photo-1758633854736-8973bcd84dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const timeline = [
  { year: '1924', title: 'The Beginning', text: 'Henri Aurum establishes his first atelier on Rue du Faubourg Saint-Honoré in Paris, creating perfumes exclusively for European royalty.' },
  { year: '1947', title: 'Post-War Renaissance', text: 'After the Second World War, AURUM reopens and creates "Lumière Nouvelle" — a scent of hope and renewal that becomes an international sensation.' },
  { year: '1965', title: 'The Oud Discovery', text: 'Third-generation master perfumer Éloise Aurum discovers Cambodian oud on a journey to Southeast Asia, forever changing AURUM\'s creative direction.' },
  { year: '1991', title: 'Global Expansion', text: 'AURUM opens flagship boutiques in London, Tokyo, New York, and Dubai, bringing French luxury fragrance to the world stage.' },
  { year: '2010', title: 'Digital Artistry', text: 'AURUM embraces the digital era while maintaining its artisan values, creating an unprecedented fusion of technology and traditional perfumery.' },
  { year: '2024', title: 'Centenary Collection', text: 'To celebrate 100 years of excellence, AURUM releases its most ambitious collection yet — eight masterpieces distilling a century of olfactory mastery.' },
];

const values = [
  { title: 'Rare Ingredients', text: 'We travel to the furthest corners of the world to source only the most extraordinary raw materials, ensuring each fragrance is truly exceptional.' },
  { title: 'Master Craftsmanship', text: 'Every formula is created by master perfumers with decades of experience, trained in the great French tradition of haute parfumerie.' },
  { title: 'Sustainable Luxury', text: 'We are committed to responsible sourcing, protecting the natural ecosystems that provide us with our most precious ingredients.' },
  { title: 'Timeless Beauty', text: 'We do not follow trends. We create fragrances designed to be worn and cherished for a lifetime, transcending fashion and time.' },
];

export default function AboutUs() {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: '70vh', minHeight: '400px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] mb-4"
              style={{ color: '#c9a45c' }}
            >
              Est. 1924 · Paris, France
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.1 }}
            >
              Our Story
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-16 h-px mx-auto mt-5"
              style={{ background: '#c9a45c' }}
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="leading-loose" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#c8bcae', fontStyle: 'italic' }}>
            "A fragrance is not merely a scent. It is a memory, an identity, an invisible signature that precedes you and lingers long after you have gone. At AURUM, we have devoted a century to crafting those invisible signatures."
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest" style={{ color: '#c9a45c' }}>— Éloise Aurum, Master Perfumer</p>
        </FadeIn>
      </section>

      {/* Our Maison */}
      <section className="py-0 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <img src={IMG1} alt="Perfume Ingredients" className="w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
              <div className="absolute -bottom-4 -right-4 p-4 hidden md:block"
                style={{ border: '1px solid rgba(201,164,92,0.2)', background: '#0d0b0f' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#c9a45c', lineHeight: 1 }}>100</p>
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: '#8a7a6a' }}>Years of Excellence</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>La Maison AURUM</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.3 }}>
              A Century of<br /><em>Olfactory Excellence</em>
            </h2>
            <div className="w-10 h-px my-5" style={{ background: '#c9a45c' }} />
            <p className="text-sm leading-loose mb-5" style={{ color: '#8a7a6a' }}>
              Founded in Paris in 1924 by master perfumer Henri Aurum, our Maison was built on a single principle: that a truly great fragrance is the most intimate form of luxury. For a century, four generations of the Aurum family have upheld this belief, creating scents that have graced the collections of heads of state, celebrated artists, and discerning collectors worldwide.
            </p>
            <p className="text-sm leading-loose" style={{ color: '#8a7a6a' }}>
              Today, under the creative direction of Éloise Aurum, we continue this extraordinary journey — combining ancestral savoir-faire with the rarest ingredients from across the globe to create fragrances of transcendent beauty.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Video */}
        <video 
          src={valuesVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover video-grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(13,11,15,0.9)' }} />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] mb-2 text-center" style={{ color: '#c9a45c' }}>What We Stand For</p>
            <h2 className="text-center mb-14" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#f5f0e8' }}>
              Our Philosophy
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <FadeIn key={val.title} delay={i * 0.1}>
                <div className="p-6" style={{ border: '1px solid rgba(201,164,92,0.12)', background: 'rgba(8,6,8,0.5)' }}>
                  <div className="w-8 h-px mb-5" style={{ background: '#c9a45c' }} />
                  <h3 className="mb-3 text-sm" style={{ fontFamily: 'Playfair Display, serif', color: '#f5f0e8' }}>{val.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b5f52' }}>{val.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier images */}
      <section className="py-4 px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[IMG2, IMG3, IMG1].map((img, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={img}
                  alt="AURUM Atelier"
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.6s' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        {/* Background Video */}
        <video 
          src={valuesVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover video-grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(13,11,15,0.7)' }} />
        
        {/* Content */}
        <div className="relative z-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>Begin Your Journey</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8' }}>
              Discover Your<br /><em>Signature Scent</em>
            </h2>
            <p className="mt-4 mb-10 text-sm max-w-md mx-auto" style={{ color: '#c8bcae' }}>
              Explore our collection and find the fragrance that speaks to your soul.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-10 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90"
              style={{ background: '#c9a45c', color: '#080608' }}
            >
              Explore Collection <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}


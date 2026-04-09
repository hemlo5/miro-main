import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import { CustomVideo } from './components/CustomVideo';
import { AnimatedText } from './components/ui/animated-shiny-text';
import { CinematicFooter } from './components/ui/motion-footer';

export default function App() {
  return (
    <div className="relative bg-black min-h-screen text-white font-sans selection:bg-white/30 overflow-x-hidden">
      <main className="relative z-10 w-full bg-black flex flex-col shadow-2xl rounded-b-3xl border-b border-white/10">
        {/* Hero Section */}
        <section className="sticky top-0 h-screen flex flex-col bg-black overflow-hidden z-0">
          <CustomVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260404_050931_6b868bbb-85a4-498d-921e-e815d5a55906.mp4"
            muted
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover translate-y-[calc(17%+100px)]"
          />

          {/* Hero Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center -translate-y-[5%] text-center px-6">
            <AnimatedText 
              text="HEMLO"
              className="py-0 mb-4 ml-[0.2em]"
              textClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] whitespace-nowrap"
              gradientColors="linear-gradient(90deg, rgba(255,255,255,0.4), #fff, rgba(255,255,255,0.4))"
              gradientAnimationDuration={2}
              hoverEffect={true}
            />
            <p className="text-xl md:text-2xl text-white/80 tracking-wide">
              Take a peek into future
            </p>
          </div>

        </section>

        <div className="relative z-10 bg-black">
          <AboutSection />
        </div>

        <div className="sticky top-0 h-screen flex flex-col justify-center bg-black z-0">
          <FeaturedVideoSection />
        </div>

        <div className="relative z-10 bg-black pb-20">
          <PhilosophySection />
          <ServicesSection />
        </div>
      </main>
      
      <CinematicFooter />
    </div>
  );
}

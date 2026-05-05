import './App.css'
import CookieBanner from './components/CookieBanner'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import VideoSection from './components/VideoSection'
import ProfessorSection from './components/ProfessorSection'
import ClassesSection from './components/ClassesSection'
import MethodSection from './components/MethodSection'
import GallerySection from './components/GallerySection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <ProfessorSection />
        <ClassesSection />
        <MethodSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  )
}

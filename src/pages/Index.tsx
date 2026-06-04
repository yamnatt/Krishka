import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Dashboard from '@/components/Dashboard';
import SoilReportAnalyzer from '@/components/SoilReportAnalyzer';
import CropYieldPredictor from '@/components/CropYieldPredictor';
import ProductivityTracker from '@/components/ProductivityTracker';
import AIModelShowcase from '@/components/AIModelShowcase';
import AIChatbot from '@/components/AIChatbot';
import CommunityChat from '@/components/CommunityChat';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, MapPin } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const IndexPage = () => {
  const navigate = useNavigate();

  return (
    // ...existing code...
    <div className="flex flex-wrap gap-6 justify-center mt-8">
      <Button size="xl" onClick={() => navigate('/ai-model-demo')}>Specialized AI Models</Button>
      <Button size="xl" onClick={() => navigate('/dashboard')}>Farming Dashboard</Button>
      <Button size="xl" onClick={() => navigate('/prediction-parameters')}>Prediction Parameters</Button>
      <Button size="xl" onClick={() => navigate('/chatbot')}>AI Chatbot</Button>
    </div>
    // ...existing code...
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <AIModelShowcase />
        <Dashboard />
        <SoilReportAnalyzer />
        <CropYieldPredictor />
        <ProductivityTracker />


        <section id="community" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold gradient-text mb-4">
                Farmers Community
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with thousands of farmers across India. Share experiences,
                ask questions, and learn from each other in our vibrant community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-soft">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2,500+ Active Farmers</h3>
                <p className="text-muted-foreground">Join farmers from every state in India</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-soft">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
                <p className="text-muted-foreground">Share messages, images, and voice notes instantly</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-soft">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Location-based</h3>
                <p className="text-muted-foreground">Connect with farmers in your region and beyond</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3"
                onClick={() => {
                  const chatButton = document.querySelector('[data-community-chat]');
                  if (chatButton) {
                    chatButton.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Join Community Chat
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AIChatbot />

      <CommunityChat />

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">K</span>
              </div>
              <span className="text-xl font-heading font-bold gradient-text">Krishika</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Smart Farming, Better Harvests - Empowering Indian farmers with AI technology
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 Krishika. Made with ❤️ for Indian farmers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

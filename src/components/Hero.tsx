import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-farmland.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Indian farmland at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Smart Farming
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-slide-up">
            <span className="gradient-text">Smart Farming,</span>
            <br />
            <span className="text-foreground">Better Harvests</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-slide-up">
            Empower your farming with AI-driven insights. Monitor crops, predict yields, 
            and optimize harvests with Krishika – your digital farming assistant designed for Indian agriculture.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8 animate-slide-up">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">
                
              </div>
              <div className="text-sm text-muted-foreground">Yield Increase</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-1">
                
              </div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-accent mb-1">
                
              </div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button variant="hero" size="xl" className="group">
              Start Smart Farming
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 mt-12 animate-slide-up">
            <div className="flex items-center text-muted-foreground text-sm">
              <TrendingUp className="w-4 h-4 mr-2 text-success" />
              Real-time Analytics
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Shield className="w-4 h-4 mr-2 text-accent" />
              Data Secure
            </div>
            <div className="text-muted-foreground text-sm">
              Trusted by farmers across India
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block animate-fade-in">
        <div className="space-y-4">
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-medium border border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm font-medium">Crop Health: Excellent</span>
            </div>
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-medium border border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm font-medium">Irrigation Alert</span>
            </div>
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-medium border border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm font-medium">Weather: Sunny 28°C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
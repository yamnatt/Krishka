import { 
  Satellite, 
  Brain, 
  CloudRain, 
  TrendingUp, 
  Smartphone, 
  Users,
  Leaf,
  BarChart3 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = () => {
  const features = [
    {
      icon: Satellite,
      title: 'Crop Monitoring',
      description: 'Real-time satellite imagery and NDVI analysis to monitor crop health and growth patterns.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Advanced machine learning models predict yield, disease outbreaks, and optimal harvest times.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: CloudRain,
      title: 'Weather Intelligence',
      description: 'Hyperlocal weather forecasts and alerts to help you plan farming activities better.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: TrendingUp,
      title: 'Yield Optimization',
      description: 'Data-driven recommendations to maximize crop yield and improve farming efficiency.',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description: 'Access all features on your smartphone, designed for farmers on the go.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      title: 'Farmer Community',
      description: 'Connect with fellow farmers, share knowledge, and learn from collective experiences.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Leaf className="w-4 h-4 mr-2" />
            Platform Features
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Everything You Need for
            <span className="gradient-text"> Smart Farming</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Krishika combines cutting-edge technology with deep agricultural knowledge 
            to give you the insights you need for better harvests.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-medium border border-border">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                
              </div>
              <div className="text-muted-foreground">Active Farmers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">
                
              </div>
              <div className="text-muted-foreground">Acres Monitored</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">
                
              </div>
              <div className="text-muted-foreground">Yield Improvement</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-success mb-2">
                
              </div>
              <div className="text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of farmers who are already using Krishika to optimize their harvests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <BarChart3 className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
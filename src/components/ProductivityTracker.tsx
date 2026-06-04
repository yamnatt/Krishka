import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  CheckCircle, 
  ArrowUp, 
  Users,
  Leaf,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProductivityMetrics {
  currentIncrease: number;
  targetIncrease: number;
  farmersUsing: number;
  totalSavings: number;
  yieldImprovement: number;
  waterSaved: number;
  fertilizerOptimized: number;
  pestReduction: number;
}

const ProductivityTracker = () => {
  const [metrics, setMetrics] = useState<ProductivityMetrics>({
    currentIncrease: 12.5,
    targetIncrease: 10,
    farmersUsing: 2500,
    totalSavings: 1250000,
    yieldImprovement: 35,
    waterSaved: 40,
    fertilizerOptimized: 25,
    pestReduction: 60
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const achievements = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Target Exceeded",
      description: "12.5% productivity increase vs 10% target",
      status: "achieved",
      color: "text-green-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Farmers Impacted",
      description: "2,500+ farmers using the platform",
      status: "active",
      color: "text-blue-600"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Yield Improvement",
      description: "35% average yield increase",
      status: "excellent",
      color: "text-green-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Resource Optimization",
      description: "40% water saved, 25% fertilizer optimized",
      status: "sustainable",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold gradient-text mb-4">
            Productivity Impact Tracker
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time tracking of our impact on Indian farmers. See how we're achieving 
            the 10% productivity increase target through data-driven insights.
          </p>
        </div>

        {/* Main Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {metrics.currentIncrease}%
              </div>
              <div className="text-sm text-muted-foreground mb-2">Productivity Increase</div>
              <Badge variant="outline" className="text-green-600">
                Target: {metrics.targetIncrease}%
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {metrics.farmersUsing.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {metrics.yieldImprovement}%
              </div>
              <div className="text-sm text-muted-foreground">Yield Improvement</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                ₹{metrics.totalSavings.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Savings</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Tracking */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Target Achievement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Productivity Increase</span>
                    <span>{metrics.currentIncrease}% / {metrics.targetIncrease}%</span>
                  </div>
                  <Progress 
                    value={(metrics.currentIncrease / metrics.targetIncrease) * 100} 
                    className="h-3"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {metrics.currentIncrease > metrics.targetIncrease ? 
                      `Exceeded target by ${(metrics.currentIncrease - metrics.targetIncrease).toFixed(1)}%` : 
                      `${(metrics.targetIncrease - metrics.currentIncrease).toFixed(1)}% remaining to target`
                    }
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {metrics.currentIncrease >= metrics.targetIncrease ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                  )}
                  <span className="text-sm">
                    {metrics.currentIncrease >= metrics.targetIncrease ? 
                      "Target Achieved!" : 
                      "Working towards target"
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Resource Optimization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Water Saved</span>
                    <span>{metrics.waterSaved}%</span>
                  </div>
                  <Progress value={metrics.waterSaved} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fertilizer Optimized</span>
                    <span>{metrics.fertilizerOptimized}%</span>
                  </div>
                  <Progress value={metrics.fertilizerOptimized} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Pest Reduction</span>
                    <span>{metrics.pestReduction}%</span>
                  </div>
                  <Progress value={metrics.pestReduction} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className={`transition-all duration-500 ${isAnimating ? 'animate-fade-in' : ''}`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${achievement.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <div className={achievement.color}>
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <Badge 
                  variant={achievement.status === 'achieved' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {achievement.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <ArrowUp className="w-4 h-4 mr-2" />
            Join 2,500+ farmers achieving 12.5% productivity increase
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductivityTracker;

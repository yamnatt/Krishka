import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Droplets, 
  Zap, 
  Bug, 
  Leaf, 
  MapPin,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface YieldPrediction {
  crop: string;
  predictedYield: number;
  confidence: number;
  historicalAverage: number;
  improvement: number;
  recommendations: {
    irrigation: string;
    fertilization: string;
    pestControl: string;
    timing: string;
  };
  weatherFactors: {
    rainfall: number;
    temperature: number;
    humidity: number;
    impact: 'positive' | 'negative' | 'neutral';
  };
  soilHealth: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    status: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

const CropYieldPredictor = () => {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedRegion, setSelectedRegion] = useState('Odisha');
  const [prediction, setPrediction] = useState<YieldPrediction | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const { toast } = useToast();

  const crops = [
    'Rice', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 'Soybean', 
    'Groundnut', 'Mustard', 'Potato', 'Tomato', 'Onion', 'Chili'
  ];

  const regions = [
    'Odisha', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 
    'Karnataka', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan'
  ];

  const generateYieldPrediction = async () => {
    setIsPredicting(true);
    
    // Simulate AI processing with historical data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseYield = Math.floor(Math.random() * 3000) + 2000; // 2000-5000 kg/ha
    const predictedYield = Math.floor(baseYield * (1 + Math.random() * 0.3)); // Up to 30% increase
    const historicalAverage = baseYield;
    const improvement = ((predictedYield - historicalAverage) / historicalAverage) * 100;
    
    const newPrediction: YieldPrediction = {
      crop: selectedCrop,
      predictedYield,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      historicalAverage,
      improvement,
      recommendations: {
        irrigation: getIrrigationRecommendation(selectedCrop, selectedRegion),
        fertilization: getFertilizationRecommendation(selectedCrop),
        pestControl: getPestControlRecommendation(selectedCrop),
        timing: getTimingRecommendation(selectedCrop)
      },
      weatherFactors: {
        rainfall: Math.floor(Math.random() * 200) + 100,
        temperature: Math.floor(Math.random() * 10) + 25,
        humidity: Math.floor(Math.random() * 30) + 60,
        impact: Math.random() > 0.3 ? 'positive' : 'neutral'
      },
      soilHealth: {
        nitrogen: Math.floor(Math.random() * 100) + 150,
        phosphorus: Math.floor(Math.random() * 40) + 20,
        potassium: Math.floor(Math.random() * 100) + 100,
        ph: Math.random() * 2 + 6,
        status: Math.random() > 0.5 ? 'good' : 'excellent'
      }
    };
    
    setPrediction(newPrediction);
    setIsPredicting(false);
    
    toast({
      title: "Yield Prediction Complete!",
      description: `Predicted ${predictedYield} kg/ha for ${selectedCrop} in ${selectedRegion}`,
    });
  };

  const getIrrigationRecommendation = (crop: string, region: string) => {
    const recommendations = {
      'Rice': 'Implement alternate wetting and drying (AWD) technique. Water every 3-4 days during vegetative stage.',
      'Wheat': 'Apply 2-3 irrigations at critical growth stages. First irrigation at crown root initiation.',
      'Maize': 'Provide 4-5 irrigations with 50-75mm water each. Critical at tasseling and silking stage.',
      'Sugarcane': 'Maintain soil moisture at 80% field capacity. Irrigate every 10-12 days during growth.',
      'Cotton': 'Apply 6-8 irrigations with 60-80mm water each. Critical at flowering and boll development.',
      'default': 'Maintain consistent soil moisture. Monitor soil water content regularly.'
    };
    return recommendations[crop as keyof typeof recommendations] || recommendations.default;
  };

  const getFertilizationRecommendation = (crop: string) => {
    const recommendations = {
      'Rice': 'Apply 120kg N, 60kg P2O5, 60kg K2O per hectare. Split N application: 50% basal, 25% tillering, 25% panicle initiation.',
      'Wheat': 'Apply 150kg N, 75kg P2O5, 75kg K2O per hectare. Use zinc sulphate 25kg/ha for better yield.',
      'Maize': 'Apply 180kg N, 80kg P2O5, 80kg K2O per hectare. Include micronutrients like zinc and boron.',
      'Sugarcane': 'Apply 250kg N, 100kg P2O5, 150kg K2O per hectare. Use organic manure 10-15 tonnes/ha.',
      'Cotton': 'Apply 100kg N, 50kg P2O5, 50kg K2O per hectare. Include secondary nutrients like sulphur.',
      'default': 'Apply balanced NPK fertilizer based on soil test results. Include organic matter for better soil health.'
    };
    return recommendations[crop as keyof typeof recommendations] || recommendations.default;
  };

  const getPestControlRecommendation = (crop: string) => {
    const recommendations = {
      'Rice': 'Monitor for brown planthopper, stem borer. Use neem-based pesticides. Practice crop rotation.',
      'Wheat': 'Watch for aphids, rust diseases. Apply fungicides at flag leaf stage. Use resistant varieties.',
      'Maize': 'Control fall armyworm, stem borer. Use Bt varieties. Apply biological control agents.',
      'Sugarcane': 'Monitor for top borer, red rot. Use pheromone traps. Practice field sanitation.',
      'Cotton': 'Control bollworm, whitefly. Use Bt cotton. Apply integrated pest management.',
      'default': 'Implement integrated pest management. Use resistant varieties and biological control.'
    };
    return recommendations[crop as keyof typeof recommendations] || recommendations.default;
  };

  const getTimingRecommendation = (crop: string) => {
    const recommendations = {
      'Rice': 'Sow during June-July for kharif season. Transplant 25-30 days after sowing.',
      'Wheat': 'Sow during November-December. Optimal temperature 20-25°C for germination.',
      'Maize': 'Sow during June-July for kharif, October-November for rabi. Avoid waterlogging.',
      'Sugarcane': 'Plant during February-March or October-November. Use healthy setts.',
      'Cotton': 'Sow during May-June. Ensure proper spacing 60x30 cm for better yield.',
      'default': 'Follow recommended sowing time for your region. Consider weather conditions.'
    };
    return recommendations[crop as keyof typeof recommendations] || recommendations.default;
  };

  const loadHistoricalData = () => {
    // Simulate loading historical agricultural data
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
      yield: Math.floor(Math.random() * 1000) + 2000,
      rainfall: Math.floor(Math.random() * 300) + 50,
      temperature: Math.floor(Math.random() * 15) + 20,
      crop: selectedCrop
    }));
    setHistoricalData(data);
  };

  useEffect(() => {
    loadHistoricalData();
  }, [selectedCrop]);

  return (
    <section id="predictions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold gradient-text mb-4">
            AI Crop Yield Predictor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Predict crop yields using historical data, weather patterns, and soil health metrics. 
            Get actionable recommendations to increase productivity by 10% or more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Prediction Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Crop</label>
                  <select 
                    value={selectedCrop} 
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  >
                    {crops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Region</label>
                  <select 
                    value={selectedRegion} 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <Button 
                  onClick={generateYieldPrediction}
                  disabled={isPredicting}
                  className="w-full"
                  size="lg"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Predict Yield
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Historical Data Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Historical Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalData.slice(0, 6).map((data, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{data.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(data.yield / 3000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{data.yield} kg/ha</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {prediction && (
              <>
                {/* Yield Prediction Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span>Yield Prediction Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {prediction.predictedYield.toLocaleString()} kg/ha
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Predicted yield for {prediction.crop} in {prediction.region}
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="text-green-600">
                            +{prediction.improvement.toFixed(1)}% vs Historical
                          </Badge>
                          <Badge variant="outline">
                            {prediction.confidence}% Confidence
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Historical Average</span>
                              <span>{prediction.historicalAverage.toLocaleString()} kg/ha</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Predicted Yield</span>
                              <span>{prediction.predictedYield.toLocaleString()} kg/ha</span>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span>Irrigation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prediction.recommendations.irrigation}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span>Fertilization</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prediction.recommendations.fertilization}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bug className="w-5 h-5 text-red-500" />
                        <span>Pest Control</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prediction.recommendations.pestControl}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span>Timing</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prediction.recommendations.timing}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Weather & Soil Factors */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span>Weather Factors</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Rainfall</span>
                          <span className="text-sm font-medium">{prediction.weatherFactors.rainfall}mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Temperature</span>
                          <span className="text-sm font-medium">{prediction.weatherFactors.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Humidity</span>
                          <span className="text-sm font-medium">{prediction.weatherFactors.humidity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Impact</span>
                          <Badge variant={prediction.weatherFactors.impact === 'positive' ? 'default' : 'secondary'}>
                            {prediction.weatherFactors.impact}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Leaf className="w-5 h-5 text-green-500" />
                        <span>Soil Health</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Nitrogen</span>
                          <span className="text-sm font-medium">{prediction.soilHealth.nitrogen} kg/ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Phosphorus</span>
                          <span className="text-sm font-medium">{prediction.soilHealth.phosphorus} kg/ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Potassium</span>
                          <span className="text-sm font-medium">{prediction.soilHealth.potassium} kg/ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">pH Level</span>
                          <span className="text-sm font-medium">{prediction.soilHealth.ph.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant={prediction.soilHealth.status === 'excellent' ? 'default' : 'secondary'}>
                            {prediction.soilHealth.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Share Results
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropYieldPredictor;

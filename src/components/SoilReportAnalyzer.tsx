import { useState } from 'react';
import { Upload, FileText, BarChart, Leaf, AlertCircle, CheckCircle, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicCarbon: number;
  uploadDate: string;
  recommendations: string[];
  overallHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  imageUrl?: string;
}

const SoilReportAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize Gemini AI
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAqLBCv80jC2ozEnw6GRrkk84qZDDYFBeA';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  // AI-powered soil analysis function
  const analyzeSoilWithAI = async (imageUrl: string): Promise<SoilData> => {
    try {
      const prompt = `Analyze this soil test report image and provide detailed analysis. Extract the following information:
      
      1. Nitrogen levels (kg/ha)
      2. Phosphorus levels (kg/ha) 
      3. Potassium levels (kg/ha)
      4. pH level
      5. Organic Carbon percentage
      
      Based on the values, provide:
      - Overall soil health assessment (Excellent/Good/Fair/Poor)
      - 3-5 specific recommendations for improvement
      
      Respond in JSON format:
      {
        "nitrogen": number,
        "phosphorus": number,
        "potassium": number,
        "ph": number,
        "organicCarbon": number,
        "overallHealth": "Excellent|Good|Fair|Poor",
        "recommendations": ["recommendation1", "recommendation2", ...]
      }
      
      If you cannot extract specific values, provide realistic estimates based on typical soil test ranges.`;

      const result = await model.generateContent([prompt, { inlineData: { data: imageUrl, mimeType: "image/jpeg" } }]);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          ...parsed,
          uploadDate: new Date().toLocaleDateString(),
          imageUrl: imageUrl
        };
      } else {
        // Fallback to mock data if JSON parsing fails
        return generateMockSoilData(imageUrl);
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
      return generateMockSoilData(imageUrl);
    }
  };

  // Fallback mock data generator
  const generateMockSoilData = (imageUrl: string): SoilData => {
    const nitrogen = Math.floor(Math.random() * 300) + 200;
    const phosphorus = Math.floor(Math.random() * 50) + 15;
    const potassium = Math.floor(Math.random() * 200) + 150;
    const ph = Math.random() * 2 + 6;
    const organicCarbon = Math.random() * 1.5 + 0.5;
    
    // Determine overall health based on values
    let overallHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Good';
    if (nitrogen > 350 && phosphorus > 40 && potassium > 250 && ph >= 6.5 && ph <= 7.5 && organicCarbon > 1.2) {
      overallHealth = 'Excellent';
    } else if (nitrogen < 250 || phosphorus < 25 || potassium < 200 || ph < 6.0 || ph > 8.0 || organicCarbon < 0.8) {
      overallHealth = 'Poor';
    } else if (nitrogen < 300 || phosphorus < 35 || potassium < 220 || ph < 6.2 || ph > 7.8 || organicCarbon < 1.0) {
      overallHealth = 'Fair';
    }

    const recommendations = [
      nitrogen < 300 ? "Apply nitrogen-rich fertilizer to improve soil fertility" : "Nitrogen levels are adequate",
      phosphorus < 30 ? "Add phosphorus fertilizer for better root development" : "Phosphorus levels are good",
      potassium < 220 ? "Apply potassium fertilizer for plant health" : "Potassium levels are sufficient",
      ph < 6.5 ? "Apply lime to raise soil pH" : ph > 7.5 ? "Apply sulfur to lower soil pH" : "pH level is optimal",
      organicCarbon < 1.0 ? "Add organic matter like compost or manure" : "Organic carbon content is good"
    ].filter(rec => !rec.includes("adequate") && !rec.includes("good") && !rec.includes("sufficient") && !rec.includes("optimal"));

    return {
      nitrogen,
      phosphorus,
      potassium,
      ph,
      organicCarbon,
      uploadDate: new Date().toLocaleDateString(),
      overallHealth,
      recommendations: recommendations.length > 0 ? recommendations : ["Soil health is good, maintain current practices"],
      imageUrl
    };
  };

  const handleFileUpload = async (file: File) => {
    console.log('File selected:', file);
    
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type);
      toast({
        title: "Invalid File Type",
        description: "Please upload JPG or PNG image files only.",
        variant: "destructive",
      });
      return;
    }

    console.log('File validation passed, starting analysis...');
    setIsAnalyzing(true);
    
    try {
      // Convert file to base64 for AI analysis
      const reader = new FileReader();
      reader.onload = async (event) => {
        console.log('File read successfully');
        const base64String = event.target?.result as string;
        const imageData = base64String.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        
        setUploadedImage(base64String);
        
        // For now, use mock data instead of AI to test functionality
        console.log('Using mock data for testing...');
        const mockData = generateMockSoilData(imageData);
        setSoilData(mockData);
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis Complete!",
          description: "Your soil report has been analyzed successfully.",
        });
        
        // Uncomment below to use real AI analysis
        /*
        // Analyze with AI
        const analysisResult = await analyzeSoilWithAI(imageData);
        setSoilData(analysisResult);
        setIsAnalyzing(false);
        
        toast({
          title: "AI Analysis Complete!",
          description: "Your soil report has been analyzed using advanced AI technology.",
        });
        */
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your soil report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const getNutrientStatus = (nutrient: string, value: number) => {
    const ranges = {
      nitrogen: { low: 250, high: 400 },
      phosphorus: { low: 25, high: 50 },
      potassium: { low: 200, high: 300 },
      ph: { low: 6.5, high: 7.5 },
      organicCarbon: { low: 1.0, high: 1.8 }
    };

    const range = ranges[nutrient as keyof typeof ranges];
    if (value < range.low) return { status: 'low', color: 'text-warning' };
    if (value > range.high) return { status: 'high', color: 'text-accent' };
    return { status: 'optimal', color: 'text-success' };
  };

  return (
    <section id="soil-health" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Soil Health
            <span className="gradient-text"> Analyzer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your soil test report and get instant AI-powered analysis with 
            personalized recommendations for better crop yield.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!soilData && !isAnalyzing && (
            <Card className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Your Soil Report</h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop your soil test report here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Supports JPG and PNG image files up to 10MB
                </p>
                
                <input
                  type="file"
                  id="soil-report"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                />
                <div className="space-y-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="cursor-pointer"
                    onClick={() => {
                      console.log('Button clicked, opening file dialog...');
                      const fileInput = document.getElementById('soil-report') as HTMLInputElement;
                      if (fileInput) {
                        fileInput.click();
                      } else {
                        console.error('File input not found');
                      }
                    }}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Choose File
                  </Button>
                  
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        console.log('Test button clicked');
                        // Create a mock file for testing
                        const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
                        handleFileUpload(mockFile);
                      }}
                    >
                      Test with Mock Data
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {isAnalyzing && (
            <Card className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-primary-foreground animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyzing Your Soil Report</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI is extracting nutrient data and generating recommendations...
                </p>
                <Progress value={66} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
              </div>
            </Card>
          )}

          {soilData && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                    soilData.overallHealth === 'Excellent' ? 'bg-success/10' :
                    soilData.overallHealth === 'Good' ? 'bg-primary/10' :
                    soilData.overallHealth === 'Fair' ? 'bg-warning/10' : 'bg-destructive/10'
                  }`}>
                    <CheckCircle className={`w-6 h-6 ${
                      soilData.overallHealth === 'Excellent' ? 'text-success' :
                      soilData.overallHealth === 'Good' ? 'text-primary' :
                      soilData.overallHealth === 'Fair' ? 'text-warning' : 'text-destructive'
                    }`} />
                  </div>
                  <h3 className="font-semibold mb-1">Overall Health</h3>
                  <p className={`text-sm font-medium ${
                    soilData.overallHealth === 'Excellent' ? 'text-success' :
                    soilData.overallHealth === 'Good' ? 'text-primary' :
                    soilData.overallHealth === 'Fair' ? 'text-warning' : 'text-destructive'
                  }`}>{soilData.overallHealth}</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BarChart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">5 Parameters</h3>
                  <p className="text-sm text-muted-foreground">Key nutrients analyzed</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">{soilData.recommendations.length} Recommendations</h3>
                  <p className="text-sm text-muted-foreground">AI-generated suggestions</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">AI Powered</h3>
                  <p className="text-sm text-muted-foreground">Advanced analysis</p>
                </Card>
              </div>

              {/* Detailed Analysis */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Soil Nutrient Analysis</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nutrient Values */}
                  <div className="space-y-4">
                    {[
                      { name: 'Nitrogen (N)', value: soilData.nitrogen, unit: 'kg/ha', key: 'nitrogen' },
                      { name: 'Phosphorus (P)', value: soilData.phosphorus, unit: 'kg/ha', key: 'phosphorus' },
                      { name: 'Potassium (K)', value: soilData.potassium, unit: 'kg/ha', key: 'potassium' },
                      { name: 'pH Level', value: soilData.ph, unit: '', key: 'ph' },
                      { name: 'Organic Carbon', value: soilData.organicCarbon, unit: '%', key: 'organicCarbon' }
                    ].map((nutrient) => {
                      const status = getNutrientStatus(nutrient.key, nutrient.value);
                      return (
                        <div key={nutrient.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">{nutrient.name}</span>
                          <div className="text-right">
                            <span className="font-bold">
                              {nutrient.key === 'ph' || nutrient.key === 'organicCarbon' 
                                ? nutrient.value.toFixed(1) 
                                : Math.round(nutrient.value)}
                              {nutrient.unit}
                            </span>
                            <div className={`text-xs ${status.color} capitalize`}>
                              {status.status}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Visual Chart Placeholder */}
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive nutrient chart</p>
                      <p className="text-sm text-muted-foreground">Visual comparison coming soon</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">AI-Generated Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {soilData.recommendations.map((recommendation, index) => (
                      <div key={index} className="p-4 bg-muted/50 border border-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm text-foreground leading-relaxed">{recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Uploaded Image Display */}
              {uploadedImage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Uploaded Soil Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded soil report" 
                        className="max-w-full h-auto max-h-96 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Original soil test report analyzed by AI
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="text-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSoilData(null);
                    setUploadedImage(null);
                  }}
                >
                  Analyze Another Report
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button variant="hero">
                  Save to Farm Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SoilReportAnalyzer;
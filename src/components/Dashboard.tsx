import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  RefreshCw,
  Plus,
  BarChart3,
  CloudRain,
  Camera,
  Languages,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Field {
  id: number;
  name: string;
  crop: string;
  area: number;
  health: number;
  status: string;
  color: string;
  lastChecked: string;
  diseases?: string[];
  coordinates?: { lat: number; lng: number };
}

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isEditingField, setIsEditingField] = useState<number | null>(null);
  const [newField, setNewField] = useState({ name: '', crop: '', area: 0 });
  const [weatherData, setWeatherData] = useState({
    temperature: 32,
    humidity: 72,
    windSpeed: 8,
    condition: 'Partly Cloudy',
    lastUpdated: new Date()
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [farmAlerts, setFarmAlerts] = useState([
    { id: 1, type: 'warning', message: 'Irrigation recommended for Field 3', time: '2 hours ago', isRead: false },
    { id: 2, type: 'success', message: 'Pest treatment successful in Field 1', time: '1 day ago', isRead: true },
    { id: 3, type: 'info', message: 'Harvest predicted in 2 weeks', time: '2 days ago', isRead: true },
    { id: 4, type: 'warning', message: 'Disease detected in Field 3 - Cotton', time: '1 hour ago', isRead: false }
  ]);

  const [fields, setFields] = useState<Field[]>([
    { 
      id: 1, 
      name: 'Field 1', 
      crop: 'Rice', 
      area: 4.5, 
      health: 95, 
      status: 'Excellent', 
      color: 'bg-success', 
      lastChecked: '2 hours ago',
      coordinates: { lat: 20.2961, lng: 85.8245 }
    },
    { 
      id: 2, 
      name: 'Field 2', 
      crop: 'Wheat', 
      area: 3.8, 
      health: 87, 
      status: 'Good', 
      color: 'bg-primary', 
      lastChecked: '4 hours ago',
      coordinates: { lat: 20.3000, lng: 85.8300 }
    },
    { 
      id: 3, 
      name: 'Field 3', 
      crop: 'Cotton', 
      area: 4.2, 
      health: 73, 
      status: 'Fair', 
      color: 'bg-warning', 
      lastChecked: '1 day ago',
      diseases: ['Bacterial Blight'],
      coordinates: { lat: 20.2950, lng: 85.8200 }
    }
  ]);

  const [farmStats, setFarmStats] = useState({
    totalArea: 12.5,
    activeFields: 3,
    predictedYield: 15,
    totalCrops: 3
  });

  const [availableCrops] = useState(['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Tomato', 'Potato', 'Onion']);

  const { toast } = useToast();

  // Language translations
  const translations = {
    en: {
      dashboard: 'Dashboard',
      currentWeather: 'Current Weather',
      farmOverview: 'Farm Overview',
      cropHealth: 'Crop Health Status',
      recentAlerts: 'Recent Alerts',
      quickActions: 'Quick Actions',
      totalArea: 'Total Area',
      activeFields: 'Active Fields',
      predictedYield: 'Predicted Yield',
      totalCrops: 'Total Crops',
      addField: 'Add Field',
      editField: 'Edit Field',
      deleteField: 'Delete Field',
      checkDisease: 'Check Disease',
      fieldName: 'Field Name',
      selectCrop: 'Select Crop',
      area: 'Area (Acres)'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      currentWeather: 'वर्तमान मौसम',
      farmOverview: 'खेत का अवलोकन',
      cropHealth: 'फसल स्वास्थ्य स्थिति',
      recentAlerts: 'हाल की सूचनाएं',
      quickActions: 'त्वरित क्रियाएं',
      totalArea: 'कुल क्षेत्र',
      activeFields: 'सक्रिय खेत',
      predictedYield: 'अनुमानित उपज',
      totalCrops: 'कुल फसलें',
      addField: 'खेत जोड़ें',
      editField: 'खेत संपादित करें',
      deleteField: 'खेत हटाएं',
      checkDisease: 'रोग जांचें',
      fieldName: 'खेत का नाम',
      selectCrop: 'फसल चुनें',
      area: 'क्षेत्र (एकड़)'
    },
    te: {
      dashboard: 'డాష్‌బోర్డ్',
      currentWeather: 'ప్రస్తుత వాతావరణం',
      farmOverview: 'వ్యవసాయ అవలోకనం',
      cropHealth: 'పంట ఆరోగ్య స్థితి',
      recentAlerts: 'ఇటీవలి హెచ్చరికలు',
      quickActions: 'ద్రుత చర్యలు',
      totalArea: 'మొత్తం ప్రాంతం',
      activeFields: 'క్రియాశీల క్షేత్రాలు',
      predictedYield: 'అంచనా దిగుబడి',
      totalCrops: 'మొత్తం పంటలు',
      addField: 'క్షేత్రం జోడించండి',
      editField: 'క్షేత్రం సవరించండి',
      deleteField: 'క్షేత్రం తొలగించండి',
      checkDisease: 'వ్యాధి తనిఖీ',
      fieldName: 'క్షేత్రం పేరు',
      selectCrop: 'పంట ఎంచుకోండి',
      area: 'ప్రాంతం (ఎకరాలు)'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  // Simulate weather data refresh
  const refreshWeatherData = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newWeatherData = {
        temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
        humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
        windSpeed: Math.floor(Math.random() * 10) + 8, // 8-18 km/h
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        lastUpdated: new Date()
      };
      
      setWeatherData(newWeatherData);
      setIsRefreshing(false);
      
      toast({
        title: "Weather Updated",
        description: "Latest weather data has been refreshed.",
      });
    }, 1500);
  };

  // Add new field
  const addNewField = () => {
    if (!newField.name || !newField.crop || !newField.area) {
      toast({
        title: "Error",
        description: "Please fill in all field details.",
        variant: "destructive"
      });
      return;
    }

    const newFieldData: Field = {
      id: fields.length + 1,
      name: newField.name,
      crop: newField.crop,
      area: newField.area,
      health: Math.floor(Math.random() * 30) + 70,
      status: 'Good',
      color: 'bg-primary',
      lastChecked: 'Just now',
      coordinates: { lat: 20.2900 + Math.random() * 0.02, lng: 85.8200 + Math.random() * 0.02 }
    };
    
    setFields(prev => [...prev, newFieldData]);
    setFarmStats(prev => ({
      ...prev,
      activeFields: prev.activeFields + 1,
      totalArea: prev.totalArea + newField.area,
      totalCrops: new Set([...fields.map(f => f.crop), newField.crop]).size
    }));
    
    setNewField({ name: '', crop: '', area: 0 });
    
    toast({
      title: "New Field Added",
      description: `${newField.name} has been added to your farm monitoring.`,
    });
  };

  // Edit field
  const editField = (fieldId: number) => {
    setIsEditingField(fieldId);
  };

  // Save field changes
  const saveFieldChanges = (fieldId: number, updatedData: Partial<Field>) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updatedData } : field
    ));
    setIsEditingField(null);
    
    toast({
      title: "Field Updated",
      description: "Field information has been updated successfully.",
    });
  };

  // Delete field
  const deleteField = (fieldId: number) => {
    const fieldToDelete = fields.find(f => f.id === fieldId);
    if (fieldToDelete) {
      setFields(prev => prev.filter(f => f.id !== fieldId));
      setFarmStats(prev => ({
        ...prev,
        activeFields: prev.activeFields - 1,
        totalArea: prev.totalArea - fieldToDelete.area,
        totalCrops: new Set(fields.filter(f => f.id !== fieldId).map(f => f.crop)).size
      }));
      
      toast({
        title: "Field Deleted",
        description: `${fieldToDelete.name} has been removed from your farm.`,
      });
    }
  };

  // Check disease for a field
  const checkDisease = (fieldId: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    // Simulate disease detection
    const diseases = ['Healthy', 'Bacterial Blight', 'Fungal Infection', 'Pest Damage', 'Nutrient Deficiency'];
    const detectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
    
    if (detectedDisease !== 'Healthy') {
      setFields(prev => prev.map(f => 
        f.id === fieldId 
          ? { ...f, diseases: [detectedDisease], health: Math.max(60, f.health - 15) }
          : f
      ));
      
      // Add alert
      const newAlert = {
        id: farmAlerts.length + 1,
        type: 'warning' as const,
        message: `Disease detected in ${field.name} - ${field.crop}: ${detectedDisease}`,
        time: 'Just now',
        isRead: false
      };
      
      setFarmAlerts(prev => [newAlert, ...prev]);
      
      toast({
        title: "Disease Detected",
        description: `${detectedDisease} found in ${field.name}`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Field Healthy",
        description: `No diseases detected in ${field.name}`,
      });
    }
  };

  // Simulate scheduling task
  const scheduleTask = () => {
    toast({
      title: "Task Scheduled",
      description: "New task has been added to your farming calendar.",
    });
  };

  // Simulate viewing reports
  const viewReports = () => {
    toast({
      title: "Reports Opened",
      description: "Detailed farm reports are now available.",
    });
  };

  // Mark alert as read
  const markAlertAsRead = (alertId: number) => {
    setFarmAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'Partly Cloudy': return <CloudRain className="w-12 h-12 text-blue-400" />;
      case 'Cloudy': return <CloudRain className="w-12 h-12 text-gray-500" />;
      case 'Light Rain': return <CloudRain className="w-12 h-12 text-blue-600" />;
      default: return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Your Farming
              <span className="gradient-text"> {t.dashboard}</span>
          </h2>
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5 text-blue-500" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a complete overview of your farm's performance, weather conditions, 
            and actionable insights all in one place.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Weather & Location */}
          <div className="space-y-6">
            {/* Weather Card */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-medium">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{t.currentWeather}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refreshWeatherData}
                      disabled={isRefreshing}
                      className="text-primary-foreground hover:bg-primary-foreground/20 p-1 h-auto"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
                    <div className="text-primary-foreground/80">{weatherData.condition}</div>
                    <div className="text-xs text-primary-foreground/60 mt-1">
                      Updated {weatherData.lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                  {getWeatherIcon(weatherData.condition)}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <Droplets className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">{weatherData.humidity}%</div>
                    <div className="text-xs text-primary-foreground/60">Humidity</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <Wind className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">{weatherData.windSpeed} km/h</div>
                    <div className="text-xs text-primary-foreground/60">Wind</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <Thermometer className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">High {weatherData.temperature + 4}°</div>
                    <div className="text-xs text-primary-foreground/60">Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.farmOverview}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.totalArea}</span>
                  <span className="font-medium">{farmStats.totalArea} Acres</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.activeFields}</span>
                  <span className="font-medium">{farmStats.activeFields} Fields</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.predictedYield}</span>
                  <span className="font-medium text-success">+{farmStats.predictedYield}% ↗</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.totalCrops}</span>
                  <span className="font-medium">{farmStats.totalCrops} Types</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Crop Health */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{t.cropHealth}</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        {t.addField}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.addField}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">{t.fieldName}</label>
                          <Input
                            value={newField.name}
                            onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter field name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t.selectCrop}</label>
                          <Select value={newField.crop} onValueChange={(value) => setNewField(prev => ({ ...prev, crop: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crop" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCrops.map(crop => (
                                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t.area}</label>
                          <Input
                            type="number"
                            value={newField.area}
                            onChange={(e) => setNewField(prev => ({ ...prev, area: parseFloat(e.target.value) || 0 }))}
                            placeholder="Enter area in acres"
                          />
                        </div>
                        <Button onClick={addNewField} className="w-full">
                          {t.addField}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field) => (
                  <div key={field.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{field.name} - {field.crop}</span>
                        {field.diseases && field.diseases.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {field.diseases[0]}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                          field.status === 'Excellent' ? 'bg-success/10 text-success' :
                          field.status === 'Good' ? 'bg-primary/10 text-primary' :
                        'bg-warning/10 text-warning'
                      }`}>
                          {field.status}
                      </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => editField(field.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => checkDisease(field.id)}
                        >
                          <Camera className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteField(field.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${field.color}`}
                        style={{ width: `${field.health}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Health Score: {field.health}%</span>
                      <span>Area: {field.area} acres</span>
                      <span>Checked: {field.lastChecked}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Yield Prediction Chart Placeholder */}
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Yield Prediction</h3>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-muted-foreground">Interactive Chart</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+18.5%</div>
                <div className="text-sm text-muted-foreground">Expected increase this season</div>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Tasks */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.recentAlerts}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {farmAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        alert.isRead ? 'bg-muted/30' : 'bg-warning/10 border border-warning/20'
                      }`}
                      onClick={() => markAlertAsRead(alert.id)}
                    >
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-success mt-0.5" />}
                      {alert.type === 'info' && <TrendingUp className="w-5 h-5 text-accent mt-0.5" />}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${alert.isRead ? 'text-foreground' : 'text-warning'}`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-auto py-3 flex-col"
                    onClick={scheduleTask}
                  >
                    <Calendar className="w-5 h-5 mb-1" />
                    <span className="text-xs">Schedule Task</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                        <Plus className="w-5 h-5 mb-1" />
                        <span className="text-xs">{t.addField}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.addField}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">{t.fieldName}</label>
                          <Input
                            value={newField.name}
                            onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter field name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t.selectCrop}</label>
                          <Select value={newField.crop} onValueChange={(value) => setNewField(prev => ({ ...prev, crop: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crop" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCrops.map(crop => (
                                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t.area}</label>
                          <Input
                            type="number"
                            value={newField.area}
                            onChange={(e) => setNewField(prev => ({ ...prev, area: parseFloat(e.target.value) || 0 }))}
                            placeholder="Enter area in acres"
                          />
                        </div>
                        <Button onClick={addNewField} className="w-full">
                          {t.addField}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-auto py-3 flex-col"
                    onClick={viewReports}
                  >
                    <BarChart3 className="w-5 h-5 mb-1" />
                    <span className="text-xs">View Reports</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-auto py-3 flex-col"
                    onClick={refreshWeatherData}
                    disabled={isRefreshing}
                  >
                    <Sun className="w-5 h-5 mb-1" />
                    <span className="text-xs">Refresh Weather</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground">
              <h4 className="text-lg font-semibold mb-2">Upgrade to Pro</h4>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Get advanced analytics, satellite imagery, and AI recommendations.
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
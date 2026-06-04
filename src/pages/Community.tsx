import { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Plus,
  Heart,
  Share2,
  MoreVertical,
  Crop,
  Tractor,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunityChat from '@/components/CommunityChat';

interface Farmer {
  id: string;
  name: string;
  location: string;
  state: string;
  avatar?: string;
  isOnline: boolean;
  crops: string[];
  experience: string;
  rating: number;
  posts: number;
  followers: number;
  bio: string;
  joinDate: string;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: Farmer;
  timestamp: Date;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
}

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock farmers data
  const farmers: Farmer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      location: 'Ludhiana',
      state: 'Punjab',
      isOnline: true,
      crops: ['Wheat', 'Rice', 'Maize'],
      experience: '15 years',
      rating: 4.8,
      posts: 45,
      followers: 234,
      bio: 'Passionate about sustainable farming and helping fellow farmers.',
      joinDate: '2022-03-15'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      location: 'Karnal',
      state: 'Haryana',
      isOnline: true,
      crops: ['Cotton', 'Sugarcane', 'Mustard'],
      experience: '12 years',
      rating: 4.9,
      posts: 38,
      followers: 189,
      bio: 'Organic farming enthusiast and crop rotation expert.',
      joinDate: '2022-01-20'
    },
    {
      id: '3',
      name: 'Amit Singh',
      location: 'Lucknow',
      state: 'Uttar Pradesh',
      isOnline: false,
      crops: ['Potato', 'Tomato', 'Onion'],
      experience: '8 years',
      rating: 4.6,
      posts: 29,
      followers: 156,
      bio: 'Vegetable farming specialist with focus on high-yield techniques.',
      joinDate: '2022-05-10'
    },
    {
      id: '4',
      name: 'Sunita Devi',
      location: 'Patna',
      state: 'Bihar',
      isOnline: true,
      crops: ['Rice', 'Maize', 'Pulses'],
      experience: '20 years',
      rating: 4.9,
      posts: 67,
      followers: 312,
      bio: 'Traditional farming methods combined with modern technology.',
      joinDate: '2021-11-08'
    },
    {
      id: '5',
      name: 'Vikram Patel',
      location: 'Ahmedabad',
      state: 'Gujarat',
      isOnline: true,
      crops: ['Groundnut', 'Cotton', 'Wheat'],
      experience: '18 years',
      rating: 4.7,
      posts: 52,
      followers: 278,
      bio: 'Expert in irrigation management and water conservation.',
      joinDate: '2022-02-14'
    }
  ];

  // Mock discussions data
  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Best practices for wheat cultivation in North India',
      content: 'I\'ve been experimenting with different wheat varieties and found that HD-2967 gives excellent yield in our region. The key is proper soil preparation and timely irrigation...',
      author: farmers[0],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8,
      tags: ['Wheat', 'Cultivation', 'North India'],
      isLiked: false
    },
    {
      id: '2',
      title: 'Organic pest control methods that actually work',
      content: 'After years of trial and error, I\'ve found that neem oil mixed with garlic extract works wonders for most common pests. Here\'s my detailed recipe...',
      author: farmers[1],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 31,
      comments: 12,
      tags: ['Organic', 'Pest Control', 'Natural'],
      isLiked: true
    },
    {
      id: '3',
      title: 'Weather forecast accuracy for crop planning',
      content: 'How reliable are weather forecasts for planning irrigation and harvesting? I\'ve been using multiple apps but getting conflicting information...',
      author: farmers[2],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 15,
      comments: 6,
      tags: ['Weather', 'Planning', 'Irrigation'],
      isLiked: false
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">
              Farmers Community
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Connect with thousands of farmers across India. Share knowledge, 
              ask questions, and grow together in our vibrant community.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search farmers, discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filter by State</label>
                  <select 
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full p-2 border border-border rounded-md"
                  >
                    <option value="all">All States</option>
                    <option value="punjab">Punjab</option>
                    <option value="haryana">Haryana</option>
                    <option value="up">Uttar Pradesh</option>
                    <option value="bihar">Bihar</option>
                    <option value="gujarat">Gujarat</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Farmers</span>
                  <span className="font-semibold text-green-600">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Discussions Today</span>
                  <span className="font-semibold text-blue-600">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Questions Answered</span>
                  <span className="font-semibold text-purple-600">156</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="farmers">Farmers</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
              </TabsList>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Recent Discussions</h2>
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Button>
                </div>

                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={discussion.author.avatar} />
                            <AvatarFallback>
                              {getInitials(discussion.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{discussion.author.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {discussion.author.location}, {discussion.author.state}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatTime(discussion.timestamp)}
                              </span>
                            </div>
                            
                            <h4 className="text-lg font-medium hover:text-green-600 cursor-pointer">
                              {discussion.title}
                            </h4>
                            
                            <p className="text-muted-foreground line-clamp-2">
                              {discussion.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`p-1 h-auto ${discussion.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                                  >
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                  <span className="text-sm">{discussion.likes}</span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{discussion.comments}</span>
                                </div>
                                
                                <Button variant="ghost" size="sm" className="p-1 h-auto">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Farmers Tab */}
              <TabsContent value="farmers" className="space-y-6">
                <h2 className="text-2xl font-semibold">Active Farmers</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {farmers.map((farmer) => (
                    <Card key={farmer.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={farmer.avatar} />
                              <AvatarFallback className="text-lg">
                                {getInitials(farmer.name)}
                              </AvatarFallback>
                            </Avatar>
                            {farmer.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{farmer.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{farmer.rating}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{farmer.location}, {farmer.state}</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{farmer.bio}</p>
                            
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-muted-foreground">{farmer.experience} experience</span>
                              <span className="text-muted-foreground">{farmer.posts} posts</span>
                              <span className="text-muted-foreground">{farmer.followers} followers</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              {farmer.crops.map((crop) => (
                                <Badge key={crop} variant="outline" className="text-xs">
                                  <Crop className="w-3 h-3 mr-1" />
                                  {crop}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-2 pt-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Live Chat Tab */}
              <TabsContent value="chat" className="space-y-6">
                <div className="text-center py-8">
                  <h2 className="text-2xl font-semibold mb-4">Live Community Chat</h2>
                  <p className="text-muted-foreground mb-6">
                    Join the conversation with farmers across India. Share experiences, 
                    ask questions, and learn from each other in real-time.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    onClick={() => {
                      // This would open the community chat
                      const chatButton = document.querySelector('[data-community-chat]') as HTMLElement;
                      if (chatButton) {
                        chatButton.click();
                      }
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Open Live Chat
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Community Chat Component */}
      <CommunityChat />
    </div>
  );
};

export default Community;

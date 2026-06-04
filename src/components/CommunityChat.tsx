import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Image, 
  Mic, 
  MicOff, 
  X, 
  Users, 
  MapPin, 
  Phone,
  MoreVertical,
  Smile,
  Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Farmer {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  isOnline: boolean;
  crops: string[];
}

interface Message {
  id: string;
  text?: string;
  image?: string;
  voice?: string;
  type: 'text' | 'image' | 'voice';
  sender: Farmer;
  timestamp: Date;
  isRead: boolean;
}

const CommunityChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock farmers data
  const farmers: Farmer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      location: 'Punjab',
      isOnline: true,
      crops: ['Wheat', 'Rice']
    },
    {
      id: '2',
      name: 'Priya Sharma',
      location: 'Haryana',
      isOnline: true,
      crops: ['Cotton', 'Sugarcane']
    },
    {
      id: '3',
      name: 'Amit Singh',
      location: 'Uttar Pradesh',
      isOnline: false,
      crops: ['Potato', 'Tomato']
    },
    {
      id: '4',
      name: 'Sunita Devi',
      location: 'Bihar',
      isOnline: true,
      crops: ['Rice', 'Maize']
    },
    {
      id: '5',
      name: 'Vikram Patel',
      location: 'Gujarat',
      isOnline: true,
      crops: ['Groundnut', 'Cotton']
    }
  ];

  // Mock messages
  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Namaste everyone! How is the wheat harvest going this season?',
      type: 'text',
      sender: farmers[0],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: '2',
      text: 'Good morning! The yield looks promising this year. Weather has been favorable.',
      type: 'text',
      sender: farmers[1],
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: '3',
      text: 'Has anyone tried the new organic fertilizer? I heard great results from my neighbor.',
      type: 'text',
      sender: farmers[2],
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      isRead: true
    },
    {
      id: '4',
      text: 'Yes! I used it last month. My tomato plants are growing much better now.',
      type: 'text',
      sender: farmers[3],
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: 'text',
      sender: farmers[0], // Current user
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImage(imageUrl);
        
        const newMessage: Message = {
          id: Date.now().toString(),
          image: imageUrl,
          type: 'image',
          sender: farmers[0],
          timestamp: new Date(),
          isRead: false
        };

        setMessages(prev => [...prev, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle actual voice recording
    if (!isRecording) {
      setTimeout(() => {
        const newMessage: Message = {
          id: Date.now().toString(),
          voice: 'voice-message.mp3',
          type: 'voice',
          sender: farmers[0],
          timestamp: new Date(),
          isRead: false
        };
        setMessages(prev => [...prev, newMessage]);
        setIsRecording(false);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      {/* Floating Community Button */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-50" data-community-chat>
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-elegant"
          >
            <Users className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-elegant border-2">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Farmers Community</h3>
                  <p className="text-xs opacity-80">India • 1,247 farmers online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1 h-auto text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Online Farmers */}
            <div className="p-3 border-b border-border bg-muted/30">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <span className="text-xs text-muted-foreground mr-2">Online:</span>
                {farmers.filter(f => f.isOnline).map((farmer) => (
                  <div key={farmer.id} className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{farmer.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === farmers[0].id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender.id === farmers[0].id ? 'order-2' : 'order-1'}`}>
                    {message.sender.id !== farmers[0].id && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(message.sender.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-foreground">
                          {message.sender.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {message.sender.location}
                        </Badge>
                      </div>
                    )}
                    
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender.id === farmers[0].id
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {message.type === 'text' && (
                        <div className="text-sm leading-relaxed">{message.text}</div>
                      )}
                      
                      {message.type === 'image' && message.image && (
                        <div className="space-y-2">
                          <img 
                            src={message.image} 
                            alt="Shared image" 
                            className="rounded-lg max-w-full h-auto max-h-48 object-cover"
                          />
                          {message.text && (
                            <div className="text-sm leading-relaxed">{message.text}</div>
                          )}
                        </div>
                      )}
                      
                      {message.type === 'voice' && (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-4 bg-current rounded-full animate-pulse"></div>
                            <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-xs opacity-80">Voice message</span>
                        </div>
                      )}
                      
                      <div className={`text-xs mt-2 opacity-60`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex space-x-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2"
                >
                  <Image className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceRecord}
                  className={`p-2 ${isRecording ? 'text-red-500' : ''}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Connect with farmers across India • Share knowledge & experiences
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default CommunityChat;

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Only initialize genAI if apiKey exists
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;

  useEffect(() => {
    if (!apiKey) {
      setError('API Key is missing. Please add VITE_GEMINI_API_KEY to your environment variables.');
    }
  }, [apiKey]);

  const languages = {
    english: { name: 'English', flag: '🇬🇧' },
    hindi: { name: 'हिंदी', flag: '🇮🇳' },
    telugu: { name: 'తెలుగు', flag: '🇮🇳' },
    odia: { name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  };

  const getSystemPrompt = (language: string) => {
    const prompts = {
      english: `You are Krishika AI, an expert farming assistant. You help farmers with crop diseases, soil health, irrigation, yield optimization, and sustainable farming practices.

IMPORTANT: Keep your responses MEDIUM LENGTH (2-4 paragraphs maximum). Be concise but informative. Focus on the most important points and practical solutions. Avoid overly detailed explanations unless specifically asked for more details.

Always provide practical, actionable advice based on scientific farming principles. Be encouraging and supportive.`,
      hindi: `आप कृषिका AI हैं, एक विशेषज्ञ कृषि सहायक। आप किसानों की मदद करते हैं फसल रोग, मिट्टी स्वास्थ्य, सिंचाई, उत्पादन अनुकूलन और टिकाऊ कृषि प्रथाओं में।

महत्वपूर्ण: अपने जवाब मध्यम लंबाई (अधिकतम 2-4 पैराग्राफ) में रखें। संक्षिप्त लेकिन जानकारीपूर्ण बनें। सबसे महत्वपूर्ण बिंदुओं और व्यावहारिक समाधानों पर ध्यान दें।

हमेशा वैज्ञानिक कृषि सिद्धांतों के आधार पर व्यावहारिक, क्रियाशील सलाह दें। उत्साहजनक और सहायक बनें।`,
      telugu: `మీరు కృషిక AI, ఒక నిపుణ వ్యవసాయ సహాయకుడు. మీరు రైతులకు పంట వ్యాధులు, నేల ఆరోగ్యం, నీటిపారుదల, దిగుబడి ఆప్టిమైజేషన్ మరియు స్థిరమైన వ్యవసాయ పద్ధతులలో సహాయపడతారు.

ముఖ్యమైనది: మీ సమాధానాలను మధ్యమ పొడవు (గరిష్ఠ 2-4 పేరాలు)లో ఉంచండి. సంక్షిప్తమైనది కానీ సమాచారప్రదమైనది. అత్యంత ముఖ్యమైన అంశాలపై మరియు ఆచరణాత్మక పరిష్కారాలపై దృష్టి పెట్టండి.

ఎల్లప్పుడూ శాస్త్రీయ వ్యవసాయ సూత్రాల ఆధారంగా ఆచరణాత్మక, చర్యాత్మక సలహాలను అందించండి.`,
      odia: `ଆପଣ କୃଷିକା AI, ଜଣେ ବିଶେଷଜ୍ଞ କୃଷି ସହାୟକ। ଆପଣ କୃଷକମାନଙ୍କୁ ଫସଲ ରୋଗ, ମାଟି ସ୍ୱାସ୍ଥ୍ୟ, ସିଞ୍ଚାଇ, ଫଳନ ଅନୁକୂଳନ ଏବଂ ଟିକାଉ କୃଷି ପ୍ରଥାରେ ସାହାଯ୍ୟ କରନ୍ତି।

ମୁଖ୍ୟ: ଆପଣଙ୍କର ଉତ୍ତରଗୁଡ଼ିକୁ ମଧ୍ୟମ ଦୈର୍ଘ୍ୟ (ସର୍ବାଧିକ 2-4 ଅନୁଚ୍ଛେଦ)ରେ ରଖନ୍ତୁ। ସଂକ୍ଷିପ୍ତ କିନ୍ତୁ ସୂଚନାପୂର୍ଣ୍ଣ। ସବୁଠାରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ବିନ୍ଦୁ ଏବଂ ବ୍ୟବହାରିକ ସମାଧାନ ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ।

ସର୍ବଦା ବିଜ୍ଞାନିକ କୃଷି ସିଦ୍ଧାନ୍ତ ଉପରେ ଆଧାରିତ ବ୍ୟବହାରିକ, କାର୍ଯ୍ୟାତ୍ମକ ପରାମର୍ଶ ପ୍ରଦାନ କରନ୍ତୁ।`
    };
    return prompts[language as keyof typeof prompts] || prompts.english;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = {
        english: "Hello! I'm Krishika AI, your farming assistant. How can I help you today?",
        hindi: "नमस्ते! मैं कृषिका AI हूं, आपका कृषि सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
        telugu: "హలో! నేను కృషిక AI, మీ వ్యవసాయ సహాయకుడు. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?"
      };

      const welcomeMessage: Message = {
        id: '1',
        text: welcomeMessages[currentLanguage as keyof typeof welcomeMessages] || welcomeMessages.english,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages([welcomeMessage]);
    }
  }, [currentLanguage]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    try {
      setError(null);

      const systemPrompt = getSystemPrompt(currentLanguage);
      const prompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nPlease respond in ${currentLanguage === 'hindi' ? 'Hindi' : currentLanguage === 'telugu' ? 'Telugu' : 'English'}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setError('Sorry, I encountered an error. Please try again.');

      const fallbackResponses = {
        english: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        hindi: "मुझे खेद है, मुझे अभी कनेक्ट करने में समस्या हो रही है। कृपया कुछ समय बाद फिर से कोशिश करें।",
        telugu: "క్షమించండి, నేను ప్రస్తుతం కనెక్ట్ అవ్వడంలో సమస్య ఉంది. దయచేసి కొంచెం సమయం తర్వాత మళ్లీ ప్రయత్నించండి."
      };

      return fallbackResponses[currentLanguage as keyof typeof fallbackResponses] || fallbackResponses.english;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      if (!model) {
        throw new Error("Chatbot model not initialized (missing API key)");
      }

      const botResponseText = await getBotResponse(inputText);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-primary hover:bg-gradient-primary/90 shadow-elegant"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-elegant border-2">
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Krishika AI</h3>
                  <p className="text-xs opacity-80">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="text-xs bg-primary-foreground/20 border border-primary-foreground/30 rounded px-2 py-1 text-primary-foreground"
                >
                  {Object.entries(languages).map(([key, lang]) => (
                    <option key={key} value={key} className="text-foreground">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1 h-auto text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                      }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="text-sm leading-relaxed">{message.text}</div>
                    </div>
                    <div className={`text-xs mt-2 opacity-60`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentLanguage === 'hindi' ? 'अपना प्रश्न यहाँ लिखें...' :
                      currentLanguage === 'telugu' ? 'మీ ప్రశ్న ఇక్కడ టైప్ చేయండి...' :
                        'Type your question here...'
                  }
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  size="sm"
                  variant="hero"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {currentLanguage === 'hindi' ? 'AI से संचालित • हमेशा सीखता रहता है' :
                  currentLanguage === 'telugu' ? 'AI శక్తితో • ఎల్లప్పుడూ నేర్చుకుంటుంది' :
                    'AI-powered • Always learning'}
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ThumbsDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChatSkeleton } from '@/components/common/LoadingSkeleton';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
  placeholder?: string;
}

export const ChatInterface = ({ 
  title = "Legal Document Assistant",
  placeholder = "Ask about legal documents required for your business..." 
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your legal document assistant. I can help you understand what legal documents are required for starting different types of businesses. What type of business are you looking to start?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // In production, integrate with your backend API
      // const response = await fetch('http://localhost:8000/api/query/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     query: input, 
      //     user_id: user?.id 
      //   })
      // });

      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = generateMockResponse(input.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('restaurant') || lowerQuery.includes('food')) {
      return `For starting a restaurant or food business, you'll typically need:

**Essential Documents:**
• Business License and Registration
• Food Service License
• Liquor License (if applicable)
• Health Department Permits
• Fire Department Permit
• Signage Permits

**Additional Requirements:**
• Workers' Compensation Insurance
• General Liability Insurance
• Food Handler's Permits for staff
• Sales Tax Registration

**Location Specific:**
The exact requirements vary by location. Would you like me to provide more specific information for a particular country or state?`;
    }
    
    if (lowerQuery.includes('tech') || lowerQuery.includes('software') || lowerQuery.includes('startup')) {
      return `For a technology or software startup, you'll need:

**Core Business Documents:**
• Articles of Incorporation/Company Registration
• Operating Agreement or Bylaws
• Business License
• Tax Registration (EIN/Tax ID)

**Tech-Specific Considerations:**
• Intellectual Property Documentation
• Software Licensing Agreements
• Data Privacy Compliance (GDPR, CCPA)
• Terms of Service & Privacy Policy

**For SaaS/Online Services:**
• Website Terms & Conditions
• User Data Processing Agreements
• API Terms of Use (if applicable)

Would you like more details about any of these categories or information for a specific jurisdiction?`;
    }
    
    if (lowerQuery.includes('retail') || lowerQuery.includes('store')) {
      return `For a retail business, here are the essential documents:

**Basic Requirements:**
• Business Registration/License
• Sales Tax Permit
• Reseller's License
• Zoning Permits

**Product-Specific:**
• Product Liability Insurance
• Import/Export Documentation (if applicable)
• Product Safety Certifications

**Location Requirements:**
• Occupancy Permits
• Signage Permits
• Fire Safety Certificates

The specific requirements depend on your location and type of products. What type of retail business are you planning?`;
    }

    return `I understand you're asking about "${query}". 

For most businesses, the fundamental legal documents typically include:

**Universal Requirements:**
• Business Registration/License
• Tax Registration
• Operating Agreements
• Insurance Documentation

**Industry-Specific Needs:**
The additional documents depend on your specific industry, location, and business structure.

Could you provide more details about:
• What type of business you're starting?
• Which country/state you're located in?
• Your planned business structure (LLC, Corporation, etc.)?

This will help me give you more targeted and accurate information.`;
  };

  const handleFeedback = (messageId: string) => {
    setFeedbackMessageId(messageId);
    setIsFeedbackDialogOpen(true);
  };

  const submitFeedback = async () => {
    if (!feedbackMessage.trim() || !feedbackMessageId) return;

    try {
      // In production, integrate with your backend
      // const response = await fetch(`http://localhost:8000/api/feedback/${user?.id}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     message_id: feedbackMessageId,
      //     feedback: feedbackMessage,
      //     timestamp: new Date().toISOString()
      //   })
      // });

      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback! It helps us improve.',
      });

      setFeedbackMessage('');
      setFeedbackMessageId(null);
      setIsFeedbackDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Get instant help with legal document requirements
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} chat-message`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start space-x-3`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-3'
                    : 'bg-accent text-accent-foreground mr-3'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Content */}
              <Card
                className={`${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border shadow-sm'
                } transition-smooth relative group`}
                onDoubleClick={() => message.role === 'assistant' && handleFeedback(message.id)}
              >
                <CardContent className="p-3">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  
                  {/* Feedback button for assistant messages */}
                  {message.role === 'assistant' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border shadow-sm"
                      onClick={() => handleFeedback(message.id)}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {loading && <ChatSkeleton />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 transition-smooth"
            disabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className="gradient-primary text-primary-foreground btn-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          Double-click on any response to provide feedback
        </p>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Help us improve by letting us know what was wrong with this response:
            </p>
            <Textarea
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Please describe what was inaccurate or unhelpful..."
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsFeedbackDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={submitFeedback}
                disabled={!feedbackMessage.trim()}
                className="gradient-primary text-primary-foreground"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
import { ChatInterface } from '@/components/chat/ChatInterface';

export const AdminChat = () => {
  return (
    <div className="h-[calc(100vh-12rem)]">
      <ChatInterface
        title="Admin Query Interface"
        placeholder="Test the legal document assistant (admin access)..."
      />
    </div>
  );
};
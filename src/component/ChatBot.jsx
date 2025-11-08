// components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Search,
  Paperclip,
  Smile,
  Mic,
  Check,
  CheckCheck,
  Bot,
  Trash2,
  MoreVertical,
} from "lucide-react";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const menuRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [inputMessage]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "👋 Hello! I'm your Vaccine Information Assistant! 💉🏥\n\nI specialize in providing comprehensive information about vaccination in Bangladesh. Here's what I can help you with:\n\n**📚 Frequently Asked Questions:**\n• What vaccines are and how they work\n• Vaccine safety and ingredients  \n• Myth busting and facts\n\n**📋 Citizens Guidance:**\n• How to prepare for vaccination\n• After-vaccination care\n• Special cases guidance\n\n**👶 Child Vaccination:**\n• Complete vaccination schedule\n• Age-appropriate guidance\n\n**📍 Practical Information:**\n• Where to get vaccinated\n• Cost and availability\n\n**🚨 Emergency Support:**\n• Emergency contacts\n• Problem reporting\n\nWhat would you like to know about vaccination today?",
          sender: "bot",
          timestamp: new Date(),
          status: "read",
          type: "welcome",
        },
      ]);
    }
  }, [isOpen]);

  // Clear chat function
  const clearChat = () => {
    setMessages([]);
    setConversationId(null);
    setShowMenu(false);

    // Reset to welcome message after clearing
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          text: "👋 Hello! I'm your Vaccine Information Assistant! 💉🏥\n\nI specialize in providing comprehensive information about vaccination in Bangladesh. Here's what I can help you with:\n\n**📚 Frequently Asked Questions:**\n• What vaccines are and how they work\n• Vaccine safety and ingredients  \n• Myth busting and facts\n\n**📋 Citizens Guidance:**\n• How to prepare for vaccination\n• After-vaccination care\n• Special cases guidance\n\n**👶 Child Vaccination:**\n• Complete vaccination schedule\n• Age-appropriate guidance\n\n**📍 Practical Information:**\n• Where to get vaccinated\n• Cost and availability\n\n**🚨 Emergency Support:**\n• Emergency contacts\n• Problem reporting\n\nWhat would you like to know about vaccination today?",
          sender: "bot",
          timestamp: new Date(),
          status: "read",
          type: "welcome",
        },
      ]);
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          user_id: `user_${Date.now()}`,
          conversation_id: conversationId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (!conversationId) {
          setConversationId(data.conversation_id);
        }

        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
          status: "read",
          intent: data.intent,
          category: data.category,
          confidence: data.confidence,
          source: data.source,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Failed to get response from server");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting right now. 😔\n\nPlease try again in a moment or contact the national health helpline: **16263**\n\nYou can also try:\n• Checking your internet connection\n• Refreshing the page\n• Asking your question again",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
        status: "read",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  // Pre-generated FAQ questions
  const faqQuestions = [
    {
      question: "Are vaccines safe for children?",
      query: "are vaccines safe for children",
      icon: "👶",
    },
    {
      question: "What is the vaccination schedule?",
      query: "child vaccination schedule",
      icon: "📅",
    },
    {
      question: "What are common side effects?",
      query: "vaccine side effects",
      icon: "🌡️",
    },
    {
      question: "Where can I get vaccinated?",
      query: "where to get vaccinated",
      icon: "📍",
    },
    {
      question: "Are vaccines free in Bangladesh?",
      query: "vaccination cost",
      icon: "💰",
    },
  ];

  const quickActions = [
    { icon: "💉", text: "What is Vaccine?", query: "what is vaccination" },
    { icon: "🛡️", text: "Vaccine Safety", query: "are vaccines safe" },
    {
      icon: "📅",
      text: "Preparation",
      query: "how to prepare for vaccination",
    },
    { icon: "🏠", text: "After Care", query: "what to do after vaccination" },
    { icon: "📍", text: "Find Centers", query: "where to get vaccinated" },
    { icon: "🚨", text: "Emergency", query: "emergency contact" },
    { icon: "💰", text: "Cost Info", query: "vaccination cost" },
  ];

  const handleQuickAction = (query) => {
    setInputMessage(query);
    setTimeout(() => {
      if (inputMessage === query) {
        handleSendMessage();
      }
    }, 100);
  };

  const handleFAQClick = (faq) => {
    setInputMessage(faq.query);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const formatMessage = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <strong key={index} className="text-black font-semibold">
            {line.replace(/\*\*/g, "")}
          </strong>
        );
      }
      if (
        line.startsWith("•") ||
        line.startsWith("✅") ||
        line.startsWith("❌")
      ) {
        return (
          <div key={index} className="flex items-start ml-1 text-black">
            <span className="mr-2 flex-shrink-0">{line.charAt(0)}</span>
            <span>{line.substring(1)}</span>
          </div>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      if (line.includes("|") && line.includes("---")) {
        return null;
      }
      if (line.includes("|") && !line.includes("---")) {
        return (
          <div
            key={index}
            className="font-mono text-xs bg-gray-50 p-1 rounded my-1 text-black"
          >
            {line.replace(/\|/g, " | ")}
          </div>
        );
      }
      return (
        <div key={index} className="text-black">
          {line}
        </div>
      );
    });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chatbot Modal - Not Full Page */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Chat Container Only - No Backdrop */}
            <motion.div
              className="fixed bottom-20 right-6 z-50 w-96 h-[550px] flex flex-col"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Chat Container - WhatsApp Style */}
              <div className="relative bg-white rounded-2xl shadow-2xl w-full h-full flex flex-col border border-gray-300">
                {/* Header - WhatsApp Green */}
                <div className="bg-[#008069] text-white p-4 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">
                          Vaccine Assistant
                        </h3>
                        <p className="text-xs text-white opacity-90">
                          {isLoading ? "typing..." : "online • FAQ Expert"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200">
                        <Search className="w-4 h-4" />
                      </button>

                      {/* More Options Menu */}
                      <div className="relative" ref={menuRef}>
                        <button
                          onClick={() => setShowMenu(!showMenu)}
                          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {showMenu && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                            >
                              {/* Clear Chat Option */}
                              <button
                                onClick={clearChat}
                                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                                <span>Clear Chat</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="bg-gray-50 border-b border-gray-200 p-3">
                  <div className="flex space-x-2 overflow-x-auto pb-1">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickAction(action.query)}
                        className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                      >
                        <span className="text-sm">{action.icon}</span>
                        <span className="text-xs font-medium">
                          {action.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto bg-[#e5ddd6] bg-opacity-50 p-4 space-y-2">
                  {/* Pre-generated FAQ Questions - Only show when there's only the welcome message */}
                  {messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2 mb-4"
                    >
                      <p className="text-sm text-gray-600 font-medium mb-2">
                        💡 Quick FAQ Questions:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {faqQuestions.map((faq, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleFAQClick(faq)}
                            className="flex items-center space-x-3 bg-white border border-gray-200 rounded-xl p-3 text-left hover:bg-gray-50 transition-all duration-200 w-full"
                          >
                            <span className="text-lg flex-shrink-0">
                              {faq.icon}
                            </span>
                            <span className="text-sm text-black font-medium flex-1">
                              {faq.question}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 ${
                          message.sender === "user"
                            ? "bg-[#d9fdd3] rounded-br-none"
                            : message.isError
                            ? "bg-red-50 border border-red-200 rounded-bl-none"
                            : "bg-white rounded-bl-none"
                        }`}
                      >
                        <div className="text-sm leading-relaxed">
                          {formatMessage(message.text)}
                        </div>

                        {/* Message Metadata */}
                        <div
                          className={`flex items-center justify-end space-x-1 mt-1 ${
                            message.sender === "user"
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          <span className="text-xs">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.sender === "user" &&
                            (message.status === "sent" ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <CheckCheck className="w-3 h-3 text-blue-500" />
                            ))}
                          {message.sender === "bot" && message.category && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full ml-1">
                              {message.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl rounded-bl-none p-3 max-w-[85%]">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0.2,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0.4,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            Finding the best answer...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Larger Text Input */}
                <div className="bg-gray-100 p-4 rounded-b-2xl border-t border-gray-200">
                  <div className="flex items-end space-x-3">
                    {/* Attachment Button */}
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                      <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Emoji Button */}
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                      <Smile className="w-5 h-5" />
                    </button>

                    {/* Larger Text Input */}
                    <div className="flex-1">
                      <textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message ..."
                        className="w-full border-0 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-base placeholder-gray-500 transition-all duration-200 bg-white text-black"
                        rows="1"
                        style={{
                          minHeight: "50px",
                          maxHeight: "120px",
                        }}
                      />
                    </div>

                    {/* Voice/Send Button */}
                    {inputMessage.trim() ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <button className="p-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                        <Mic className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Helper Text */}
                  <p className="text-xs text-gray-500 text-center mt-3">
                    💡 Try asking in English or Bengali • Press Enter to send
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};



import React, { useState } from "react";
import "./FAQChatbot.css";

const faqs = [
  {
    question: "What is Ecoloops?",
    answer:
      "Ecoloops is a smart platform that makes shopping more sustainable and rewarding.\n\nEcoloops helps you make eco-conscious choices in your daily shopping by:\n1️⃣ Rewarding you with coins when you buy sustainably\n2️⃣ Giving you credits for returning recyclable packaging\n\nWelcome to the future where sustainability meets rewards and convenience.\nWelcome to EcoLoops! 🌱"
  },
  // other FAQs...

  {
    question: "How do I sign up and get started?",
    answer:
      "Getting started is super simple:\n1️⃣ Click on the 'Sign Up' button on the homepage\n2️⃣ Fill out your details (name, email, etc.)\n3️⃣ Verify your account and you're in!\n\nTime to shop smart and earn rewards! 💚"
  },
  {
    question: "Where can I check what I’ve ordered?",
    answer:
      "To view your order history:\n1️⃣ Click on your profile icon (top right)\n2️⃣ Select 'Order History' from the menu\n3️⃣ You'll see a timeline of all your purchases and returns!"
  },
  {
    question: "What are these EcoCoins everyone talks about?",
    answer:
      "EcoCoins are our way of saying 'thank you' for shopping sustainably 🌿\n\nYou can earn them by:\n1️⃣ Buying eco-friendly products\n2️⃣ Scheduling packaging returns\n3️⃣ Referring your friends to EcoLoops\n\nLater, you can redeem them for discounts, rewards, or donations!"
  },
  {
    question: "How does EcoLoops actually help the planet?",
    answer:
      "Great question! Here's how:\n1️⃣ It reduces packaging waste through scheduled returns\n2️⃣ Promotes eco-conscious shopping habits\n3️⃣ Helps distribute surplus goods to NGOs\n\nYour everyday actions, multiplied by many users, create real change 🌍"
  },
  {
    question: "How can I return used packaging?",
    answer:
      "Returning is super flexible:\n1️⃣ Choose your return option in the app\n2️⃣ Schedule a pickup at your convenience\n3️⃣ Earn EcoCoins once the packaging is collected\n\n♻️ It’s easy, on your terms!"
  },
  {
    question: "Oops! I forgot to schedule a return — now what?",
    answer:
      "No worries at all! You can:\n1️⃣ Schedule your return anytime through your dashboard\n2️⃣ Keep in mind that some rewards may reduce over time\n\nThe sooner you schedule it, the better for you — and the planet!"
  },
  {
    question: "How does EcoLoops support NGOs?",
    answer:
      "We're glad you asked!\n\nEcoLoops helps NGOs by:\n1️⃣ Offering near-expiry products at discounted or no cost\n2️⃣ Allowing EcoCoin donations from users\n3️⃣ Connecting surplus goods with verified nonprofits\n\nTogether, we reduce waste AND uplift communities ❤️"
  },
  {
    question: "Can I donate my rewards to a cause?",
    answer:
      "Absolutely! Spread the good vibes 🎁\n\nHere’s how:\n1️⃣ Go to your EcoWallet\n2️⃣ Tap on 'Donate EcoCoins'\n3️⃣ Choose an NGO and confirm your donation\n\nEvery coin counts — literally!"
  },
  {
    question: "Can I see how eco-friendly I’ve been?",
    answer:
      "You bet! Head to your EcoDashboard to view:\n1️⃣ Total EcoCoins earned\n2️⃣ Amount of waste you’ve helped reduce\n3️⃣ Your personal EcoScore and milestones\n\nTrack your impact and wear that green badge proudly! 🌱"
  }
];


const FAQChatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about Ecoloops." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);

    // Find a matching FAQ
    const found = faqs.find(faq =>
      faq.question.toLowerCase().includes(input.toLowerCase())
    );
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: found ? found.answer : "Sorry, I don't know the answer to that yet."
        }
      ]);
    }, 500);
    setInput("");
  };

  return (
    <div className="faq-chatbot">
      <div className="faq-chatbot-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`faq-chatbot-msg ${msg.from}`}>
           {typeof msg.text === "string" ? (
  msg.text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ))
) : (
  msg.text // if it's already JSX
)}

          </div>
        ))}
      </div>
      <div className="faq-chatbot-input">
        <input
          type="text"
          value={input}
          placeholder="Type your question..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default FAQChatbot;
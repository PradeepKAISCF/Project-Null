import React from 'react'
import { useState } from 'react'

import './Chatbot.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}


const Chatbot = () => {

    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm Gome! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleSend = async (message) => {
        const newMessage = {
          message,
          direction: 'outgoing',
          sender: "user"
        };
    
        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);
    
        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat
    
        let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message}
        });
    
    
        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,  // The system message DEFINES the logic of our chatGPT
            ...apiMessages // The messages from our chat with ChatGPT
          ]
        }
    
        /* await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data);
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        }); */
    
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer  ${API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
          });
        
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data = await response.json();
        
          if (data.choices && data.choices.length > 0) {
            setMessages([...chatMessages, {
              message: data.choices[0].message.content,
              sender: "ChatGPT"
            }]);
          } else {
            // Handle the case where data.choices is empty or undefined
            console.error('Invalid response from the API:', data);
          }
        
          setIsTyping(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle the error gracefully, e.g., display an error message to the user
          // and possibly retry the request or take other appropriate action.
        }
        
      }

  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className="home-container-2">
        <div className="App">
      <div style={{ position:"relative", height: "600px"  }}>
        <MainContainer style={{backgroundColor: 'yellow'}}>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Gome is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
        </div>
    </div>
  )
}

export default Chatbot

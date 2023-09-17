Array.from(document.getElementsByTagName('input')).forEach((e , i)=>{
    e.addEventListener('keyup', (el)=>{
        if (e.value.length > 0) {
            document.getElementsByClassName('bi-caret-down-fill')[i].style.transform = "rotate(180deg)";
        } else {
            document.getElementsByClassName('bi-caret-down-fill')[i].style.transform = "rotate(0deg)";
        }
    })
})

let menu_btn = document.getElementsByClassName('bi-three-dots')[0];
let menu_bx = document.getElementById('menu_bx');


menu_btn.addEventListener('click', ()=>{
    menu_bx.classList.toggle('ul_active');
})


document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    const voiceInputButton = document.getElementById("voice-input-button");
    let flag=0;

    const conversationHistory = [];
let userMessage = null; 
const API_KEY = "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"; 
const inputInitHeight = chatInput.scrollHeight;

    const createChatMessage = (message, role) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", role);
        chatLi.innerHTML = `<p>${message}</p>`;
        chatbox.appendChild(chatLi);
    };

    
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">travel</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 
}

    const generateResponse = (chatElement) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = chatElement.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: conversationHistory,
            })
        }
    
        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
            const responseMessage = data.choices[0].message.content.trim();
                messageElement.textContent = responseMessage;
                
                conversationHistory.push({ role: "assistant", content: responseMessage });
                
                chatbox.scrollTo(0, chatbox.scrollHeight);
            messageElement.textContent = data.choices[0].message.content.trim();
        }).catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleUserMessage = () => {
         userMessage = chatInput.value.trim();
        if (userMessage) {
            createChatMessage(userMessage, "outgoing");
            chatInput.value = "";
            chatbox.scrollTop = chatbox.scrollHeight; 


            if (userMessage.toLowerCase() === "hello") {
                createChatMessage("Hi there!", "incoming");
            } else if (userMessage.toLowerCase() === "how are you?") {
                createChatMessage("I'm just a bot, but I'm doing well! How can I assist you?", "incoming");
            } else if (userMessage.toLowerCase().includes("best time to visit bhubaneswar")) {
                createChatMessage("The best time to visit bhubaneswar is during the winter months, from October to March. The weather is pleasant, and you can explore the city comfortably.", "incoming");
            } else if (userMessage.toLowerCase().includes("top tourist attractions in bhubaneswar")) {
                createChatMessage("bhubaneswar offers a rich cultural experience. Some top tourist attractions include the Lingaraj Temple, Udayagiri and Khandagiri Caves, Nandankanan Zoological Park, and the State Museum.", "incoming");
            } else if (userMessage.toLowerCase().includes("local cuisine in bhubaneswar")) {
                createChatMessage("bhubaneswar is famous for its Odia cuisine. Don't miss trying dishes like Dalma, Pakhala, and various seafood preparations. You can also enjoy delicious street food like Chhena Poda and Rasgulla.", "incoming");
            }
            

            else {
             
                createChatMessage("I don't have resposne to this question,please enter again to get the solution from our AI", "incoming");
                createChatMessage("Please enter the same again...")
                flag++;
            }
        }
    };

 
    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if(!userMessage) return;
    
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
    
         conversationHistory.push({ role: "user", content: userMessage });
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        setTimeout(() => {
            const incomingChatLi = createChatLi("Writing....", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
               }


    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey &&flag==0) {
            e.preventDefault();
            handleUserMessage();
        }
        else if(e.key === "Enter" && !e.shiftKey && flag!=0){
            e.preventDefault();
            handleChat();
        }
    });
console.log(flag)
    if(flag==0)
    sendChatBtn.addEventListener("click", handleUserMessage);
else{
    sendChatBtn.addEventListener("click", handleChat);
}
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});


if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    recognition.continuous = false;
    recognition.interimResults = false;
  
    const handleVoiceInput = () => {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        recognition.stop();
      };
    };
  
    voiceInputButton.addEventListener("click", handleVoiceInput);voiceInputButton.addEventListener("click", handleVoiceInput);

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    recognition.continuous = false;
    recognition.interimResults = false;
  
    const handleVoiceInput = () => {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        recognition.stop();
      };
    };
  
    voiceInputButton.addEventListener("click", handleVoiceInput);
  } else {
    voiceInputButton.style.display = "none"; 
    console.log("Voice input is not supported in this browser.");
  }
  

  } else {
    voiceInputButton.style.display = "none";
    console.log("Voice input is not supported in this browser.");
  }
    

const popupContainer = document.querySelector('.popup-container');
const okButton = document.getElementById('okButton');

window.onload = function() {
    popupContainer.style.display = 'flex';
};

okButton.addEventListener('click', function() {
    popupContainer.style.display = 'none';
});

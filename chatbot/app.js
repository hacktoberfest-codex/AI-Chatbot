document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    
    
    const createChatMessage = (message, role) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", role);
        chatLi.innerHTML = `<p>${message}</p>`;
        chatbox.appendChild(chatLi);
    };

    
    const handleUserMessage = () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            createChatMessage(userMessage, "outgoing");
            chatInput.value = "";
            chatbox.scrollTop = chatbox.scrollHeight; 

document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const optionContainer = document.getElementById("option-container");
    const options = optionContainer.querySelectorAll(".option-button");

    options.forEach(option => {
        option.addEventListener("click", function() {
            const response = option.getAttribute("data-response");
            let description = "";

            options.forEach(opt => {
                if (opt !== option && !opt.classList.contains("sub-option")) {
                    opt.style.display = "none";
                }
            });

            const messageDiv = document.createElement("div");
            messageDiv.classList.add("bot-message");

            switch (response) {
                case "destination":
                    description = "Welcome to Destination Planning! We can help you explore various travel destinations, create itineraries, and provide tips for a memorable trip.";
                    break;
                case "bookings":
                    description = "Ready to book your adventure? We can assist with flights, accommodations, and more. What would you like to book?";
                    break;
                case "essentials":
                    description = "Travel essentials are important. We can provide information on packing tips and travel insurance. How can we assist you today?";
                    break;
                default:
                    messageDiv.innerText = "I'm here to assist you with your travel needs.";
                    break;
            }

            messageDiv.innerText = description;

            chatMessages.appendChild(messageDiv);

            if (response === "destination") {
                createSubOptions(optionContainer, "Explore Destinations", [
                    { label: "Beach Destinations", description: "Explore beautiful beach destinations for a relaxing getaway." },
                    { label: "Mountain Destinations", description: "Discover stunning mountain destinations for adventure and serenity." }
                ]);
              
            } else if (response === "bookings") {
                createSubOptions(optionContainer, "Flights", [
                    { label: "Domestic Flights", description: "Book domestic flights to your desired destination." },
                    { label: "International Flights", description: "Explore international flight options for your next journey." }
                ]);
                
            } else if (response === "essentials") {
                createSubOptions(optionContainer, "Packing Tips", [
                    { label: "Beach Vacation", description: "Get packing tips for your beach vacation." },
                    { label: "Ski Trip", description: "Prepare for your ski trip with essential packing advice." }
                ]);
             
            }
        });
    });

    const subOptions = optionContainer.querySelectorAll(".sub-option");
    subOptions.forEach(subOption => {
        subOption.addEventListener("click", function() {
            console.log("Sub-option clicked: " + subOption.getAttribute("data-response"));           
             const response = subOption.getAttribute("data-response");
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("bot-message");
            switch (response) {
                case "beach destinations":
                    messageDiv.innerText = "Beach destinations offer sun, sand, and relaxation. Puri in India is known for its beautiful beaches and cultural attractions.";
                    break;
                case "mountain destinations":
                    messageDiv.innerText = "Mountain destinations provide breathtaking views and adventure. Consider visiting Shimla or Manali in India for a mountain getaway.";
                    break;
                default:
                    messageDiv.innerText = "I'm here to assist you with your travel needs.";
                    break;
            }

            chatMessages.appendChild(messageDiv);
        });
    });
});

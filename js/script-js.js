const INAPPROPRIATE_WORDS = [
    'fuck', 'shit', 'cunt', 'dick', 'pussy', 'bastard', 
    'asshole', 'bitch', 'nigger', 'faggot', 'whore', 
    'retard', 'idiot', 'stupid', 'dumb', 'moron', 
    'hate', 'kill', 'rape', 'racist', 'sexist'
];

const knowledgeBase = {
    'occupational therapy definition': {
        response: 'Occupational Therapy (OT) is a client-centered health profession that focuses on enabling individuals to participate in daily life activities (occupations) that are meaningful and purposeful to them.',
        keywords: ['definition', 'what is', 'occupation', 'meaning'],
        specialties: [
            'Pediatric OT', 
            'Hand Therapy', 
            'Mental Health', 
            'Neurological Rehabilitation'
        ]
    },
    'pediatric occupational therapy': {
        response: 'Pediatric Occupational Therapy assists children in developing skills necessary for daily functioning, including fine motor skills, sensory processing, social interaction, and self-care abilities.',
        keywords: ['children', 'pediatric', 'development', 'skills'],
        interventions: [
            'Sensory Integration',
            'Fine Motor Skills Training',
            'Social Skills Development'
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    function containsInappropriateLanguage(text) {
        return INAPPROPRIATE_WORDS.some(word => 
            text.toLowerCase().includes(word)
        );
    }

    function createMessage(message, type = 'bot') {
        const messageEl = document.createElement('div');
        messageEl.className = type === 'bot' ? 'bot-message' : 'user-message';
        messageEl.innerHTML = message;
        return messageEl;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Check for inappropriate language
        if (containsInappropriateLanguage(message)) {
            chatMessages.appendChild(createMessage(message, 'user'));
            chatMessages.appendChild(createMessage(
                '⚠️ Please use respectful language. Inappropriate content is not allowed.'
            ));
            userInput.value = '';
            return;
        }

        // User message
        chatMessages.appendChild(createMessage(message, 'user'));

        // Bot response
        let responseFound = false;
        for (let topic in knowledgeBase) {
            if (knowledgeBase[topic].keywords.some(keyword => 
                message.toLowerCase().includes(keyword)
            )) {
                const response = `
                    <p>${knowledgeBase[topic].response}</p>
                    <div class="reference-notice">
                        ⚠️ Important: Always verify medical information with healthcare professionals.
                    </div>
                `;
                chatMessages.appendChild(createMessage(response));
                responseFound = true;
                break;
            }
        }

        if (!responseFound) {
            const fallbackResponse = `
                <p>I couldn't find specific information. Try asking about:
                    <ul>
                        <li>Occupational Therapy Definition</li>
                        <li>Pediatric Occupational Therapy</li>
                    </ul>
                </p>
                <div class="reference-notice">
                    ⚠️ Information is for educational purposes only. Consult healthcare professionals.
                </div>
            `;
            chatMessages.appendChild(createMessage(fallbackResponse));
        }

        userInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

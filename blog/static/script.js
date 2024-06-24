function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let videoFiles = [];
const csrftoken = getCookie('csrftoken');
function submitText() {
    const textInput = document.getElementById('textInput').value;
    document.getElementById('displayText').textContent = textInput;
    const keywordsDisplay = document.getElementById('keywordsDisplay');
    keywordsDisplay.innerHTML = '';
    fetch('http://127.0.0.1:8000/',{
        method: 'POST',
        Headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({text: textInput})
    })
    .then(response => response.json())
    .then(data => {
        data.words.forEach((item) => {
            const span = document.createElement('span');
            span.textContent = item;
            keywordsDisplay.appendChild(span);
        })
        videoFiles = data.words.map(item => `data/${item}.mp4`);
        console.log(videoFiles);
        playVideos();
})
    
}
function playVideo(videoFile) {
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.src = videoFile;
        video.muted = true
        video.width = 500;
        video.height = 300
        video.id = 'image-container';
        video.autoplay = true;

        const graphicBlock = document.getElementById('image-container');
        graphicBlock.parentNode.replaceChild(video, graphicBlock);

        video.onended = () => {
            setTimeout(resolve, 0.00001); // Resolve promise immediately after video ends
        };
    });
}
async function playVideos() {
    const keywordsDisplay = document.getElementById('keywordsDisplay');
    const spans = keywordsDisplay.querySelectorAll('span');
    for (let i = 0; i < videoFiles.length; i++) {
        // if (i > 0) {
        //     spans[i - 1].classList.remove('highlight');
        // }
        spans[i].classList.add('highlight');
        await playVideo(videoFiles[i]); // Wait for the video to end before continuing
    }
    // Remove highlight from the last letter after all videos are played
    // spans[videoFiles.length - 1].classList.remove('highlight');
}



function startMic() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support speech recognition. Try using Google Chrome.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onstart = function() {
        console.log('Voice recognition started. Try speaking into the microphone.');
    };

    recognition.onresult = function(event) {
        const textInput = document.getElementById('textInput');
        textInput.value = event.results[0][0].transcript;
        recognition.stop();
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ', event.error);
        recognition.stop();
    };

    recognition.onend = function() {
        console.log('Voice recognition ended.');
    };
}
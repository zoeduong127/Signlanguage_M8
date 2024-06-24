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
        video.controls = true;
        video.width = 400;
        video.height = 300
        video.id = 'image-container';

        const graphicBlock = document.getElementById('image-container');
        graphicBlock.parentNode.replaceChild(video, graphicBlock);

        video.onended = resolve; // Resolve the promise when the video ends
        video.play();
    });
}
async function playVideos() {
    for (const videoFile of videoFiles) {
        console.log(videoFile);
        await playVideo(videoFile); // Wait for the video to end before continuing
    }
}



function startMic() {
    // palceholder for audio recording start
    console.log('Mic ON');
}
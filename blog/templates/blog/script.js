function submitText() {
    const textInput = document.getElementById('textInput').value;
    document.getElementById('displayText').textContent = textInput;

    const keywords = textInput.split(' '); // Simple split by spaces
    const keywordsDisplay = document.getElementById('keywordsDisplay');
    keywordsDisplay.innerHTML = '';
    keywords.forEach(keyword => {
        const span = document.createElement('span');
        span.textContent = keyword;
        keywordsDisplay.appendChild(span);
    });
}


function startMic() {
    // palceholder for audio recording start
    console.log('Mic ON');
}
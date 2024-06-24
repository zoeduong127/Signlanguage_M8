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
    .then(response => console.log(response),response.json())
    .then(data => {
        console.log(data);
        data.forEach((item) => {
            const span = document.createElement('span');
            span.textContent = item;
            keywordsDisplay.appendChild(span);
    })})
    
}


function startMic() {
    // palceholder for audio recording start
    console.log('Mic ON');
}
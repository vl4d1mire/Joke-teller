const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

function toggleButton() {
    button.disabled = !button.disabled
}

function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20')
    VoiceRSS.speech({
        key: '894ee78d9e494714a6d4dadcc5151643',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,sexist,explicit'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke
        }
        tellMe(joke)
        toggleButton()
    } catch (e) {
        console.log(e)
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)

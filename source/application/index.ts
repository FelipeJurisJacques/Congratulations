import Home from './views/home'
import Video from './views/video'

const parameters = new URLSearchParams(window.location.search)
if (parameters.get('v')) {
    new Video(window, window.document.body)
} else {
    new Home(window, window.document.body)
}
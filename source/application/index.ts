import Home from './views/home'
import Video from './views/video'

const parameters = new URLSearchParams(window.location.search)
if (parameters.get('v')) {
    const view = new Video()
    window.document.body.insertAdjacentHTML('beforeend', view.render())
    view.handler()
} else {
    const view = new Home()
    window.document.body.insertAdjacentHTML('beforeend', view.render())
    view.handler()
}
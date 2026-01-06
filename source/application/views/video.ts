export default class Video {
    private file: null | string = null
    private video: null | string = null

    public render(): string {
        const parameters = new URLSearchParams(window.location.search)
        const date = new Date()
        date.setMonth(date.getMonth() + 6)
        this.file = parameters.get('v')
        this.video = `./assets/videos/${this.file}.mp4`
        const vBg = document.querySelector('.video-bg') as HTMLVideoElement
        const vMain = document.querySelector('.video-main') as HTMLVideoElement
        vMain.onplay = () => vBg.play()
        vMain.onpause = () => vBg.pause()
        return `
            <h1 class="title">
                Feliz ${date.getFullYear()}
            </h1>
            <p class="message">
                Um ano novo cheio de realizações te espera!
            </p>
            <div class="video-container">
                <video class="video-bg" autoplay muted loop playsinline>
                    <source src="${this.video}" type="video/mp4">
                </video>
                <video class="video-main" autoplay muted loop playsinline>
                    <source src="${this.video}" type="video/mp4">
                </video>
            </div>
        `
    }

    public handler(): void {
        setTimeout(() => {
            if (window.navigator.share !== undefined) {
                window.document.body.insertAdjacentHTML('beforeend', `<button class="share">
                    Celebre com seus amigos
                </button>`)
            }
        }, 3000)
        window.addEventListener('click', event => {
            if (event.target) {
                if (event.target instanceof HTMLButtonElement) {
                    if (event.target.className === 'share') {
                        window.navigator.share({
                            title: 'Celebre esse momento comigo',
                            // url: `${window.location.origin}?e=${type}`,
                            url: `${window.location.origin}?v=${this.file}`,
                        })
                    }
                }
            }
        })
    }
}
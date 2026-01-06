class Home {
    render() {
        const videos = [
            'ny1.mp4',
            'ny2.mp4',
            'ny3.mp4',
            'ny4.mp4',
            'ny5.mp4',
        ];
        const images = [
            'ny1.jpg',
            'ny2.jpg',
            'ny3.jpg',
            'ny4.jpg',
            'ny5.jpg',
        ];
        let html = '';
        for (let i = 0; i < videos.length; i++) {
            html += `<video autoplay loop muted poster="./assets/images/${images[i]}">
                <source src="./assets/videos/${videos[i]}" type="video/mp4">
            </video>`;
        }
        return html;
    }
    handler() { }
}

class Video {
    file = null;
    video = null;
    render() {
        const parameters = new URLSearchParams(window.location.search);
        const date = new Date();
        date.setMonth(date.getMonth() + 6);
        this.file = parameters.get('v');
        this.video = `./assets/videos/${this.file}.mp4`;
        const vBg = document.querySelector('.video-bg');
        const vMain = document.querySelector('.video-main');
        vMain.onplay = () => vBg.play();
        vMain.onpause = () => vBg.pause();
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
        `;
    }
    handler() {
        setTimeout(() => {
            if (window.navigator.share !== undefined) {
                window.document.body.insertAdjacentHTML('beforeend', `<button class="share">
                    Celebre com seus amigos
                </button>`);
            }
        }, 3000);
        window.addEventListener('click', event => {
            if (event.target) {
                if (event.target instanceof HTMLButtonElement) {
                    if (event.target.className === 'share') {
                        window.navigator.share({
                            title: 'Celebre esse momento comigo',
                            // url: `${window.location.origin}?e=${type}`,
                            url: `${window.location.origin}?v=${this.file}`,
                        });
                    }
                }
            }
        });
    }
}

const parameters = new URLSearchParams(window.location.search);
if (parameters.get('v')) {
    const view = new Video();
    window.document.body.insertAdjacentHTML('beforeend', view.render());
    view.handler();
}
else {
    const view = new Home();
    window.document.body.insertAdjacentHTML('beforeend', view.render());
    view.handler();
}

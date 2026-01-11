class View {
    _window;
    _container;
    constructor(window, container) {
        this._window = window;
        this._container = container;
        this.build();
    }
    get window() { return this._window; }
    handler() { }
    render() { return ''; }
    get stylesheets() { return []; }
    build() {
        for (let stylesheet of this.stylesheets) {
            this.window.document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${stylesheet}" />`);
        }
        this._container.innerHTML = this.render();
        this.handler();
    }
    rebuild() { this._container.innerHTML = this.render(); }
}

class Manifest {
    static data;
    static async getAssets() {
        const data = await this.getData();
        return data.assets ? data.assets : {};
    }
    static async getData() {
        if (!Manifest.data) {
            const response = await fetch(`${window.location.origin}/manifest.json`);
            Manifest.data = await response.json();
        }
        return Manifest.data;
    }
}

class Home extends View {
    content = '';
    render() {
        return this.content;
    }
    handler() {
        Manifest.getAssets().then(data => {
            if (typeof data === 'object'
                && data.videos
                && data.thumbnails
                && Array.isArray(data.videos)
                && Array.isArray(data.thumbnails)) {
                this.content = '';
                for (let i = 0; i < data.videos.length; i++) {
                    this.content += `<video autoplay loop muted poster="${data.thumbnails[i]}">
                            <source src="${data.videos[i]}" type="video/mp4">
                        </video>`;
                }
                this.rebuild();
                console.log(this.content);
                this.content = '';
            }
        });
    }
}

class Video extends View {
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
    new Video(window, window.document.body);
}
else {
    new Home(window, window.document.body);
}

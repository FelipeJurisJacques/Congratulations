let video = '';
const parameters = new URLSearchParams(window.location.search);
parameters.get('e');
// switch (type) {
//     case 'ny':
const date = new Date();
date.setMonth(date.getMonth() + 6);
video = './assets/videos/nw1.mp4';
window.document.body.insertAdjacentHTML('beforeend', `
    <h1 class="title">
        Feliz ${date.getFullYear()}
    </h1>
    <p class="message">
        Um ano novo cheio de realizações te espera!
    </p>
`);
//         break
//     default:
//         break
// }
if (video) {
    window.document.body.insertAdjacentHTML('beforeend', `<div class="video-container">
        <video class="video-bg" autoplay muted loop playsinline>
            <source src="${video}" type="video/mp4">
        </video>
        <video class="video-main" autoplay muted loop playsinline>
            <source src="${video}" type="video/mp4">
        </video>
    </div>`);
    const vBg = document.querySelector('.video-bg');
    const vMain = document.querySelector('.video-main');
    vMain.onplay = () => vBg.play();
    vMain.onpause = () => vBg.pause();
    setTimeout(() => {
        if (window.navigator.share !== undefined) {
            window.document.body.insertAdjacentHTML('beforeend', `<button class="share">
            Celebre com seus amigos
        </button>`);
        }
    }, 3000);
}
window.addEventListener('click', event => {
    if (event.target) {
        if (event.target instanceof HTMLButtonElement) {
            if (event.target.className === 'share') {
                window.navigator.share({
                    url: `${window.location.origin}`,
                    title: 'Celebre esse momento comigo',
                    // url: `${window.location.origin}?e=${type}`,
                });
            }
        }
    }
});

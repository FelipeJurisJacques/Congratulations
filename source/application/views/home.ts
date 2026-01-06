export default class Home {
    public render(): string {
        const videos = [
            'ny1.mp4',
            'ny2.mp4',
            'ny3.mp4',
            'ny4.mp4',
            'ny5.mp4',
        ]
        const images = [
            'ny1.jpg',
            'ny2.jpg',
            'ny3.jpg',
            'ny4.jpg',
            'ny5.jpg',
        ]
        let html = ''
        for (let i = 0; i < videos.length; i++) {
            html += `<video autoplay loop muted poster="./assets/images/${images[i]}">
                <source src="./assets/videos/${videos[i]}" type="video/mp4">
            </video>`
        }
        return html
    }

    public handler(): void { }
}
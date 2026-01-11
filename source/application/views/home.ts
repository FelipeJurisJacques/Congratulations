import View from '../../../engine/abstracts/view'
import Manifest from '../../../engine/helpers/manifest'

export default class Home extends View {
    private content: string = ''

    public render(): string {
        return this.content
    }

    public handler(): void {
        Manifest.getAssets().then(data => {
            if (
                typeof data === 'object'
                && data.videos
                && data.thumbnails
                && Array.isArray(data.videos)
                && Array.isArray(data.thumbnails)
            ) {
                this.content = ''
                for (let i = 0; i < data.videos.length; i++) {
                    this.content += `<video autoplay loop muted poster="${data.thumbnails[i]}">
                            <source src="${data.videos[i]}" type="video/mp4">
                        </video>`
                }
                this.rebuild()
                console.log(this.content)
                this.content = ''
            }
        })
    }
}
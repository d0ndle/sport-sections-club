// шапка сайта с кнопкой «Домой», есть на обеих страницах
export class ClubHeaderComponent {
    constructor(parent) {
        this.parent = parent
    }

    addListeners(listener) {
        document
            .getElementById('home-button')
            .addEventListener('click', listener)
    }

    getHTML() {
        return (
            `
                <header class="club-header">
                    <div class="container d-flex align-items-center justify-content-between">
                        <span class="club-header__title">Спортивные секции клуба</span>
                        <button id="home-button" class="btn club-btn club-btn--light" type="button">Домой</button>
                    </div>
                </header>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}

// поле фильтрации секций по названию вида спорта
export class SectionsFilterComponent {
    constructor(parent) {
        this.parent = parent
    }

    addListeners(listener) {
        // событие input срабатывает на каждый введённый или стёртый символ
        document
            .getElementById('sections-filter')
            .addEventListener('input', listener)
    }

    getHTML(filterText) {
        return (
            `
                <input id="sections-filter" class="form-control club-filter" type="search"
                       placeholder="Найти секцию: футбол, хоккей..." value="${filterText}">
            `
        )
    }

    render(filterText, listener) {
        const html = this.getHTML(filterText)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}

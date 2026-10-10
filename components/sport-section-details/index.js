// подробная информация о секции на странице «Подробнее»
export class SportSectionDetailsComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(sportSection) {
        return (
            `
                <div class="card club-details">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${sportSection.imageSrc}" class="img-fluid club-details__image" alt="${sportSection.sportName}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h2 class="club-details__title">${sportSection.sportName}</h2>
                                <p class="card-text">${sportSection.description}</p>
                                <ul class="list-unstyled club-details__facts">
                                    <li><b>Тренер:</b> ${sportSection.coachName}</li>
                                    <li><b>Возраст:</b> ${sportSection.ageGroup}</li>
                                    <li><b>Расписание:</b> ${sportSection.schedule}</li>
                                </ul>
                                <p class="club-card__price">${sportSection.monthlyPrice} ₽ / мес.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(sportSection) {
        const html = this.getHTML(sportSection)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}

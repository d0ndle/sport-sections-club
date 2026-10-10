// mock-данные: коллекция (массив) спортивных секций клуба.
// В ЛР5 вместо этого массива данные будут приходить с бэкенда.
const sportSections = [
    {
        id: 1,
        sportName: 'Футбол',
        coachName: 'Игорь Акинфеев',
        ageGroup: '7–12 лет',
        monthlyPrice: 4500,
        schedule: 'Пн, Ср, Пт — 17:00',
        description: 'Детская футбольная школа: техника владения мячом, тактика, игровые тренировки на поле с натуральным газоном.',
        imageSrc: 'images/football.svg',
    },
    {
        id: 2,
        sportName: 'Хоккей',
        coachName: 'Сергей Фёдоров',
        ageGroup: '6–14 лет',
        monthlyPrice: 6000,
        schedule: 'Вт, Чт — 16:30, Сб — 10:00',
        description: 'Катание, владение клюшкой и шайбой, силовая подготовка. Тренировки на льду ледовой арены клуба.',
        imageSrc: 'images/hockey.svg',
    },
    {
        id: 3,
        sportName: 'Баскетбол',
        coachName: 'Андрей Кириленко',
        ageGroup: '9–16 лет',
        monthlyPrice: 4000,
        schedule: 'Пн, Ср — 18:00',
        description: 'Ведение, передачи, броски и командная игра. Подготовка к выступлениям в юношеской лиге.',
        imageSrc: 'images/basketball.svg',
    },
    {
        id: 4,
        sportName: 'Волейбол',
        coachName: 'Екатерина Гамова',
        ageGroup: '10–17 лет',
        monthlyPrice: 3500,
        schedule: 'Вт, Пт — 17:30',
        description: 'Подача, приём, блок и нападающий удар. Занятия в зале и на пляжных площадках летом.',
        imageSrc: 'images/volleyball.svg',
    },
    {
        id: 5,
        sportName: 'Плавание',
        coachName: 'Александр Попов',
        ageGroup: '5–15 лет',
        monthlyPrice: 5000,
        schedule: 'Пн–Пт — 08:00',
        description: 'Обучение плаванию с нуля и спортивные группы: кроль, брасс, баттерфляй, старты и повороты.',
        imageSrc: 'images/swimming.svg',
    },
    {
        id: 6,
        sportName: 'Самбо',
        coachName: 'Фёдор Емельяненко',
        ageGroup: '8–18 лет',
        monthlyPrice: 3000,
        schedule: 'Ср, Сб — 15:00',
        description: 'Борьба и самооборона: страховка, броски, болевые приёмы. Сдача нормативов на пояса.',
        imageSrc: 'images/sambo.svg',
    },
]

// список секций, у которых название вида спорта содержит строку фильтра
export function getSportSections(filterText = '') {
    const normalizedFilter = filterText.trim().toLowerCase()
    return sportSections.filter(sportSection =>
        sportSection.sportName.toLowerCase().includes(normalizedFilter)
    )
}

// одна секция по id (id из data-атрибута приходит строкой, поэтому приводим к числу)
export function getSportSectionById(id) {
    return sportSections.find(sportSection => sportSection.id === Number(id))
}

// «Добавить»: копия первой секции с новым id
export function addSportSectionCopy() {
    if (sportSections.length === 0) return
    const maxId = Math.max(...sportSections.map(sportSection => sportSection.id))
    // spread-оператор копирует все поля первой секции, id перезаписываем
    sportSections.push({ ...sportSections[0], id: maxId + 1 })
}

// «Удалить»: убираем секцию из коллекции
export function removeSportSection(id) {
    const index = sportSections.findIndex(sportSection => sportSection.id === Number(id))
    if (index !== -1) {
        sportSections.splice(index, 1)
    }
}

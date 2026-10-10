import { SectionsPage } from './pages/sections/index.js'

// корневой элемент, в который рисуются страницы
const root = document.getElementById('root')

const sectionsPage = new SectionsPage(root)
sectionsPage.render()

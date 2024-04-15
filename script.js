import { getPlanets } from './StarWarsService.js'

// Background parallax

const container = document.querySelector('.container')

function parallax(event) {
  let _width = window.innerWidth / 2
  let _height = window.innerHeight / 2
  let _mouseX = event.clientX
  let _mouseY = event.clientY
  let _depth = `${50 - (_mouseX - _width) * 0.01}% ${
    50 - (_mouseY - _height) * 0.01
  }%`

  container.style.backgroundPosition = _depth
}

document.addEventListener('mousemove', parallax)

// Modal

const modalButton = document.querySelector('.modalButton')
const modalBackground = document.querySelector('.modalBackground')
const modal = document.querySelector('.modal')
const modalCloseButton = document.querySelector('.modalCloseButton')

function openModal() {
  modal.classList.add('isVisible')
  modalBackground.classList.add('isVisible')
}

function closeModal() {
  modal.classList.remove('isVisible')
  modalBackground.classList.remove('isVisible')
}

modalButton.addEventListener('click', openModal)
modalBackground.addEventListener('click', closeModal)
modalCloseButton.addEventListener('click', closeModal)

// Inserting Planet Data

const insertPlanetData = async () => {
  const previousButton = document.querySelector('.previous-button')
  const nextButton = document.querySelector('.next-button')
  const sliderWrapper = document.querySelector('.slider-wrapper')
  const sliderNav = document.querySelector('.slider-nav')

  const planets = await getPlanets([1, 4, 8, 9, 10, 11, 13, 14, 17, 36])

  let planetData = ''
  let navData = ''
  let index = 0

  for (const [i, planet] of planets.entries()) {
    planetData += `
      <div class="slider">
        <img class="planet-image" src="./assets/${planet.name}.png" alt="${planet.name}" draggable="false" />

        <div class="content">
          <h1 class="title">${planet.name}</h1>

          <ul class="description">
            <li><strong>Diameter:</strong> ${planet.diameter}km</li>
            <li><strong>Rotation period:</strong> ${planet.rotation_period}h</li>
            <li><strong>Population:</strong> ${planet.population}</li>
            <li><strong>Climate:</strong> ${planet.climate}</li>
          </ul>
        </div>
      </div>
    `

    navData += `<button class="nav-button" data-index="${i}"></button>`
  }

  sliderWrapper.innerHTML = planetData
  sliderNav.innerHTML = navData

  // Updating Active Planet and Infinite Slider Logic

  const sliders = document.querySelectorAll('.slider')
  const navButtons = document.querySelectorAll('.nav-button')

  const updateActivePlanet = () => {
    for (const [i, slider] of sliders.entries()) {
      if (i === index) {
        slider.classList.add('isActive')
        navButtons[i].classList.add('isActive')
      } else {
        slider.classList.remove('isActive')
        navButtons[i].classList.remove('isActive')
      }

      if (i > index) {
        slider.classList.remove('previous')
        slider.classList.add('next')
      } else if (i < index) {
        slider.classList.remove('next')
        slider.classList.add('previous')
      } else {
        slider.classList.remove('next', 'previous')
      }
    }

    const firstSlider = 0
    const lastSlider = sliders.length - 1

    if (index === lastSlider) {
      sliders[firstSlider].classList.remove('previous')
      sliders[firstSlider].classList.add('next')
    } else if (index === firstSlider) {
      sliders[lastSlider].classList.remove('next')
      sliders[lastSlider].classList.add('previous')
    }
  }

  updateActivePlanet()

  // Arrow navigation

  const previous = () => {
    if (index - 1 < 0) {
      index = planets.length - 1
    } else {
      index--
    }

    updateActivePlanet()
  }

  const next = () => {
    if (index + 1 >= planets.length) {
      index = 0
    } else {
      index++
    }

    updateActivePlanet()
  }

  previousButton.addEventListener('click', previous)
  nextButton.addEventListener('click', next)

  // Navigation

  const navigate = (event) => {
    const navIndex = Number(event.target.dataset.index)
    index = navIndex

    updateActivePlanet()
  }

  for (const navButton of navButtons) {
    navButton.addEventListener('click', navigate)
  }
}

insertPlanetData()

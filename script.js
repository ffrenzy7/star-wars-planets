import { getPlanets } from './StarWarsService.js'

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
      <div class="slider ${i === index ? 'isActive' : ''}">
        <img class="planet-image" src="./assets/${planet.name}.png" alt="${
      planet.name
    }" />

        <div class="content">
          <h1 class="title">${planet.name}</h1>

          <ul class="description">
            <li><strong>Diameter:</strong> ${planet.diameter}km</li>
            <li><strong>Rotation period:</strong> ${
              planet.rotation_period
            }h</li>
            <li><strong>Population:</strong> ${planet.population}</li>
            <li><strong>Climate:</strong> ${planet.climate}</li>
          </ul>
        </div>
      </div>
    `

    navData += `<button class="nav-button ${
      i === index ? 'isActive' : ''
    }" data-index="${i}"></button>`
  }

  sliderWrapper.innerHTML = planetData
  sliderNav.innerHTML = navData

  const sliders = document.querySelectorAll('.slider')
  const navButtons = document.querySelectorAll('.nav-button')

  const updateActivePlanet = (direction) => {
    for (const [i, slider] of sliders.entries()) {
      if (slider.classList.contains('isActive')) {
        slider.classList.add('lastActive')
      } else if (slider.classList.contains('lastActive')) {
        slider.classList.remove('lastActive')
      }

      if (i === index) {
        slider.classList.add('isActive')
        navButtons[i].classList.add('isActive')
      } else {
        slider.classList.remove('isActive')
        navButtons[i].classList.remove('isActive')
      }
    }

    sliderWrapper.classList.remove('previous', 'next')
    sliderWrapper.classList.add(direction)
  }

  const previous = () => {
    if (index - 1 < 0) {
      index = planets.length - 1
    } else {
      index--
    }

    updateActivePlanet('previous')
  }

  const next = () => {
    if (index + 1 >= planets.length) {
      index = 0
    } else {
      index++
    }

    updateActivePlanet('next')
  }

  const navigate = (event) => {
    const navIndex = Number(event.target.dataset.index)
    let direction = ''

    if (index < navIndex) {
      direction = 'next'
    } else if (index > navIndex) {
      direction = 'previous'
    } else {
      return
    }

    index = navIndex

    updateActivePlanet(direction)
  }

  previousButton.addEventListener('click', previous)
  nextButton.addEventListener('click', next)

  for (const navButton of navButtons) {
    navButton.addEventListener('click', navigate)
  }
}

insertPlanetData()

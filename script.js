import { getPlanets } from './StarWarsService.js'

const insertPlanetData = async () => {
  const previousButton = document.querySelector('.previous-button')
  const nextButton = document.querySelector('.next-button')
  const sliderWrapper = document.querySelector('.slider-wrapper')

  const planets = await getPlanets([1, 4, 8, 9, 10, 11, 13, 14, 17, 36])

  let planetData = ''
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
            <li>Diameter: ${planet.diameter}</li>
            <li>Rotation period: ${planet.rotation_period}</li>
            <li>Population: ${planet.population}</li>
            <li>Climate: ${planet.climate}</li>
          </ul>
        </div>
      </div>
    `
  }

  sliderWrapper.innerHTML = planetData

  const sliders = document.querySelectorAll('.slider')

  const updateActivePlanet = () => {
    for (const [i, slider] of sliders.entries()) {
      if (i === index) {
        slider.classList.add('isActive')
      } else {
        slider.classList.remove('isActive')
      }
    }
  }

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
}

insertPlanetData()

import { getPlanets } from './StarWarsService.js'

const insertPlanetData = async () => {
  const previousButton = document.querySelector('.previous')
  const nextButton = document.querySelector('.next')
  const container = document.querySelector('.container')

  const planets = await getPlanets([1, 4, 8, 9, 10, 11, 13, 14, 17, 36])

  let planetData = ''
  let index = 0

  for (const [i, planet] of planets.entries()) {
    planetData += `
      <div class="content ${i === index ? 'isActive' : ''}">
        <img class="planet" src="./assets/${planet.name}.png" alt="${
      planet.name
    }" />

        <div class="text">
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

  container.innerHTML = planetData

  const contents = document.querySelectorAll('.content')

  const updateActivePlanet = () => {
    for (const [i, content] of contents.entries()) {
      if (i === index) {
        content.classList.add('isActive')
      } else {
        content.classList.remove('isActive')
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

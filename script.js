import { getPlanets } from './StarWarsService.js'

const insertPlanetData = async () => {
  const previous = document.querySelector('.previous')
  const next = document.querySelector('.next')
  const container = document.querySelector('.container')
  const planets = await getPlanets([1, 4, 8, 9, 10, 11, 13, 14, 17, 36])

  const arrowNavigation = () => {
    // FAZER ALGUMA CARNICA AQUI PRA SETA FUNFAR
  }

  // previous.addEventListener('click', bunda())
  // next.addEventListener('click', bunda())

  for (const planet of planets) {
    container.innerHTML += `
      <div class="content">
        <img class="planet" src="./assets/planet-placeholder.webp" alt="" />

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
}

insertPlanetData()

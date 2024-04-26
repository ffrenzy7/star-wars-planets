import { getPlanets } from './StarWarsService.js'

const container = document.querySelector('.container')
const modalButton = document.querySelector('.modalButton')
const modalBackground = document.querySelector('.modalBackground')
const modal = document.querySelector('.modal')
const modalCloseButton = document.querySelector('.modalCloseButton')
const previousButton = document.querySelector('.previousButton')
const nextButton = document.querySelector('.nextButton')
const sliderWrapper = document.querySelector('.sliderWrapper')
const sliderNav = document.querySelector('.sliderNav')
const form = document.querySelector('.form')
const inputs = document.querySelectorAll('.inputValidate')
const inputName = document.querySelector('.inputValidate[name="name"]')
const inputSign = document.querySelector('.inputValidate[name="sign"]')
const keyQuestion = document.querySelector('.keyQuestion')
const notificationBar = document.querySelector('.notificationBar')
const formResult = document.querySelector('.formResult')
const closeResultButton = document.querySelector('.closeResultButton')

container.addEventListener('mousemove', parallax)
modalButton.addEventListener('click', openModal)
modalBackground.addEventListener('click', closeModal)
modalCloseButton.addEventListener('click', closeModal)

// Background parallax

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

// Modal

function openModal() {
  notificationBar.close()
  form.reset()
  modal.classList.add('isVisible')
  modalBackground.classList.add('isVisible')
}

function closeModal() {
  modal.classList.remove('isVisible')
  modalBackground.classList.remove('isVisible')
}

// Inserting Planet Data

const insertPlanetData = async () => {
  const planets = await getPlanets([1, 4, 8, 9, 10, 11, 13, 14, 17, 36])

  let planetData = ''
  let navData = ''
  let index = 0

  for (const [i, planet] of planets.entries()) {
    planetData += `
      <div class="slider">
        <img class="planetImage" src="./assets/${planet.name}.png" alt="${planet.name}" draggable="false" />

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

    navData += `<button class="navButton" data-index="${i}"></button>`
  }

  sliderWrapper.innerHTML = planetData
  sliderNav.innerHTML = navData

  // Updating Active Planet and Infinite Slider Logic

  const sliders = document.querySelectorAll('.slider')
  const navButtons = document.querySelectorAll('.navButton')

  const updateActivePlanet = () => {
    notificationBar.close()

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

  // Form

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    let hasError = false

    inputs.forEach((input) => {
      const errorMessage = document.querySelector(
        `.errorMessage[data-name='${input.name}']`,
      )

      if (!input.checkValidity()) {
        hasError = true

        if (input.type === 'radio') {
          input.parentElement.classList.add('shake')
        } else {
          input.classList.add('shake')
        }

        errorMessage.style.display = 'block'

        setTimeout(function () {
          input.parentElement.classList.remove('shake')
          input.classList.remove('shake')
        }, 1200)
      } else {
        errorMessage.style.display = 'none'
      }
    })

    if (hasError) return

    const inputPath = document.querySelector(
      '.inputValidate[name="path"]:checked',
    )
    const keyAnswer = keyQuestion.options[keyQuestion.selectedIndex]

    closeModal()
    index = Number(keyAnswer.value)
    updateActivePlanet()

    const messageResult = `Hey ${inputName.value}! So, you are ${
      inputSign.value
    } huh? Since you choose the path of the ${
      inputPath.value === 'light' ? 'Jedi' : 'Sith'
    } and is a fan of ${keyAnswer.text}, the best planet for you is ${
      planets[index].name
    }!
    `

    if (inputPath.value === 'light') {
      notificationBar.style.backgroundColor = 'cornflowerblue'
    } else {
      notificationBar.style.backgroundColor = 'coral'
    }

    closeResultButton.addEventListener('click', () => {
      notificationBar.close()
    })

    formResult.innerHTML = messageResult

    notificationBar.show()
  })
}

insertPlanetData()

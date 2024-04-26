'use strict'

// const apiUrl = 'https://swapi.dev/api' OLD API
const apiUrl = 'https://swapi.info/api'

const getPlanets = async (planetsIds = []) => {
  const requestsData = []
  const requestsJson = []

  for (const planetId of planetsIds) {
    requestsData.push(fetch(`${apiUrl}/planets/${planetId}`))
  }

  const responsesData = await Promise.all(requestsData)

  for (const responseData of responsesData) {
    requestsJson.push(responseData.json())
  }

  const planetsData = await Promise.all(requestsJson)

  return planetsData
}

export { getPlanets }

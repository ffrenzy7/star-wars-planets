const apiUrl = 'https://swapi.dev/api'

const getPlanets = async (planetsIds = []) => {
  const requestPromises = []
  const responsePromises = []

  for (const planetId of planetsIds) {
    requestPromises.push(fetch(`${apiUrl}/planets/${planetId}`))
  }

  const responses = await Promise.all(requestPromises)

  for (const response of responses) {
    responsePromises.push(response.json())
  }

  const objects = await Promise.all(responsePromises)

  console.log(objects)

  return objects
}

export { getPlanets }

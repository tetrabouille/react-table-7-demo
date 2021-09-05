import faker from 'faker'

faker.locale = 'fr'

const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => ({
  id: faker.datatype.uuid(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  age: faker.random.number(),
  email: faker.internet.email(),
  birth_date: faker.date.past(),
  country: faker.address.country(),
  phone: faker.phone.phoneNumber(),
})

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newPerson(),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }))
  }

  return makeDataLevel()
}

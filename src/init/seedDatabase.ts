import { faker } from '@faker-js/faker'
import VideoModel from '../database/models/Video'

const seedDatabase = async () => {
  let data = []
  for (let index = 0; index < 1000; index++) {
    const video = {
      name: faker.random.randomWords(2),
      url: faker.internet.url(),
      thumbnailUrl: faker.internet.url(),
      isPrivate: Math.random() < 0.5,
      timesViewed: faker.datatype.number({
        min: 0,
        max: 999,
      }),
    }
    data.push(video)
  }
  await VideoModel.deleteMany({})
  await VideoModel.insertMany(data)
}

export default seedDatabase

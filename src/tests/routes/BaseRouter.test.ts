import app from '../../server'
import request from 'supertest'

// afterEach((done) => {
//   app.close()
//   done()
// })

let data = [
  {
    _id: '604b000bbe9418965b1c274f',
    name: 'Camilin',
    type: 'contractor',
    role: 'Super Senior Software Engineer',
    tag: 'Typescript React',
    createdAt: '2021-03-12T05:45:47.593Z',
    updatedAt: '2021-03-12T05:45:47.593Z',
    __v: 0,
  },
]

let payload = {
  name: 'Camilin',
  type: 'contractor',
  role: 'Software Engineer',
  tag: 'C++',
}

let payloadUpdate = {
  data: {
    name: 'CamilinUpdated',
    type: 'employee',
    role: 'Software Engineer Maximum',
    tag: 'C++ C#',
  },
}

let notFoundId = '604ae309b8036f7b28dfe575'
let newId = ''

describe('routes/BaseRouter', () => {
  it('should get all videos with filters', async () => {
    const response = await request(app).get('/api/v1/videos?limit=1')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(data)
  })

  // it('should post a new member', async () => {
  //   const response = await request(server).post('/api/v1/videos').send(payload)
  //   newId = response.body._id
  //   expect(response.status).toEqual(200)
  //   expect(response.type).toEqual('application/json')
  // expect(response.body).toHaveProperty('_id')
  // expect(response.body).toHaveProperty('name', payload.name)
  // expect(response.body).toHaveProperty('type', payload.type)
  // expect(response.body).toHaveProperty('role', payload.role)
  // expect(response.body).toHaveProperty('tag', payload.tag)
  // })

  // it('should update an specific member', async () => {
  //   const response = await request(server)
  //     .patch(`/api/v1/members/${newId}`)
  //     .send(payloadUpdate)
  //   expect(response.status).toEqual(200)
  //   expect(response.type).toEqual('text/plain')
  //   expect(response.text).toEqual(`Record with ID ${newId} updated`)
  // })

  // it('should not delete an specific member', async () => {
  //   const response = await request(server).delete(
  //     `/api/v1/members/${notFoundId}`
  //   )
  //   expect(response.status).toEqual(404)
  //   expect(response.type).toEqual('text/plain')
  //   expect(response.text).toEqual('No record deleted')
  // })

  // it('should delete an specific member', async () => {
  //   const response = await request(server).delete(`/api/v1/members/${newId}`)
  //   expect(response.status).toEqual(200)
  //   expect(response.type).toEqual('text/plain')
  //   expect(response.text).toEqual(`Record with ID ${newId} deleted`)
  // })
})

import { rest } from 'msw'

const handlers = [
  rest.get('http://localhost:3030/scoops', (request, response, context) => {
    return response(
      context.json([
        { name: 'Chocolate', imagePath: 'images/chocolate.png' },
        { name: 'Vanilla', imagePath: 'images/vanilla.png' }
      ])
    )
  })
]

export default handlers

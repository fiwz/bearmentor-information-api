import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  // return c.text(`You want see ${page} of ${id}`)
  return c.json({
    message: 'Testing routes',
    query: c.req.query(),
    param: c.req.param(),
  })
})

app.post('/posts', (c) => c.text('Created!', 201))

app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`))

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

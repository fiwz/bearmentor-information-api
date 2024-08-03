import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

interface Series {
  id: string
  title: string
  year: number
  description: string
  cast: string[]
}

let series: Series[] = [
  {
    id: 'e0d72c95-dfa1-4991-9616-84d98de358d9',
    title: 'Friends',
    year: 1994,
    description:
      'Follow the lives of six reckless adults living in Manhattan, as they indulge in adventures which make their lives both troublesome and happening.',
    cast: [
      'Jennifer Aniston',
      'Courteney Cox',
      'Lisa Kudrow',
      'Matt LeBlanc',
      'Matthew Perry',
      'David Schwimmer',
    ],
  },
]

app.get('/series', (c) => {
  return c.json({
    message: 'Success',
    data: series.reverse(),
  })
})

app.get('/series/:id', (c) => {
  const item = series.find((s) => s.id === c.req.param('id'))

  if (item) {
    return c.json({
      message: 'Success',
      data: item,
    })
  }

  return c.json(
    {
      error: 'Series not found!',
    },
    404
  )
})

app.post('/series', async (c) => {
  const body = await c.req.json()
  series.push({ ...body, id: crypto.randomUUID() })
  return c.json(
    {
      message: 'New series has been added!',
      data: body,
    },
    201
  )
})

app.delete('/series/:id', (c) => {
  const item = series.find((s) => s.id === c.req.param('id'))
  if (!item) {
    return c.json(
      {
        error: 'Series not found!',
      },
      404
    )
  }

  series = series.filter((s) => s.id !== c.req.param('id'))
  return c.json({
    message: 'Series has been successfully deleted!',
    data: [],
  })
})

app.put('/series/:id', async (c) => {
  const body = await c.req.json()
  const item = series.find((s) => s.id === c.req.param('id'))
  if (!item) {
    return c.json(
      {
        error: 'Series not found!',
      },
      404
    )
  }

  series = series.map((s) => {
    if (s.id === c.req.param('id')) {
      s = { ...s, ...body }
    }
    return s
  })

  return c.json({
    message: 'Series has been successfully updated!',
    data: series.find((s) => s.id === c.req.param('id')),
  })
})

app.get('/testing-routes/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')

  if (c.req.header('Content/Type') === 'application/json') {
    return c.json({
      message: 'Testing routes',
      query: c.req.query(),
      param: c.req.param(),
    })
  } else {
    return c.text(`You want see ${page} of ${id}`)
  }
})

const port = 3000
console.info(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

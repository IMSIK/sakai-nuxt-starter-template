export default defineEventHandler((event) => {
  if (event.req.url?.startsWith('/.well-known')) {
    event.res.statusCode = 204
    return ''
  }
})

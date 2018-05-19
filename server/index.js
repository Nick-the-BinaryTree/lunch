const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-body')

const app = new Koa()
const router = new Router()

let idCount = 0, users = []

const getUserIndex = (id) => {
  console.log(users.length)
  for (let i = 0; i < users.length; i++) {
    console.log(users[i].id + " " + typeof users[i].id)
    if (id === users[i].id)
      return i
    }
  return null
}

router.get('/user/:id', ctx => {
  ctx.body = users[getUserIndex(ctx.params.id)]
})

router.post('/user/new', ctx => {
  if (!ctx.request.body.name) {
    ctx.body = "No name for new user"
    return
  }
  users.push({id: ''+idCount, name: ctx.request.body.name})
  idCount++
  ctx.body = users[users.length-1]
})

router.post('/user/:id', ctx => {
  if (ctx.request.body && ctx.request.body.prefers && ctx.params.id) {
    console.log(ctx.params.id + " " + typeof ctx.params.id + " " + getUserIndex(ctx.params.id))
    users[getUserIndex(ctx.params.id)].prefers = ctx.request.body.prefers
    console.log("got here 2")
    ctx.body = users[getUserIndex(ctx.params.id)].prefers
    return
  }
  ctx.body = "No preferance update"
})

app.use(BodyParser()).use(router.allowedMethods()).use(router.routes())

app.listen(3000)

const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-body')

const app = new Koa()
const router = new Router()

let idCount = 0
let users = [{id: '5', name: 'Jake', prefers: ['Starbucks', 'Dunkin', 'Hipster Brew']},
  {id: '6', name: 'Katie', prefers: ['Subway', 'Dunkin', 'Starbucks', 'Nebraska Steak']}]

const getUserIndex = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (id === users[i].id)
      return i
    }
  return null
}

const findOverlap = (id) => {
  const searcher = users[getUserIndex(id)], matches = []

  if (!searcher.prefers) return

  for (let i = 0; i < users.length; i++) {
    if (id === users[i].id || !users[i].prefers) {
      continue
    }

    const candidate = users[i]
    const knownCandidatePrefs = {}
    let k = 0;

    for (let j = 0; j < searcher.prefers.length; j++) {
      if (searcher.prefers[j] in knownCandidatePrefs) {
        matches.push({id: candidate.id, name: candidate.name,
          venue: searcher.prefers[j] })
      } else {
        for (; k < candidate.prefers.length; k++) {
          if (searcher.prefers[j] === candidate.prefers[k]) {
            matches.push({id: candidate.id, name: candidate.name,
              venue: searcher.prefers[j] })
          } else {
            knownCandidatePrefs[candidate.prefers[k]] = true
          }
        }
      }
    }
  }
  return matches
}

const randomPick = (matches) => {
  if (!matches) return null
  return matches[Math.floor(Math.random()*matches.length)]
}

router.get('/user/:id', ctx => {
  // ctx.set({"Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
  ctx.body = users[getUserIndex(ctx.params.id)]
})

router.get('/user/:id/search', ctx => {
  ctx.body = randomPick(findOverlap(ctx.params.id))
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
    users[getUserIndex(ctx.params.id)].prefers = ctx.request.body.prefers
    ctx.body = users[getUserIndex(ctx.params.id)].prefers
    return
  }
  ctx.body = "No preference update"
})

app.use(async (ctx, next) => {
  ctx.set({"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
  await next()
})

app.use(BodyParser()).use(router.allowedMethods()).use(router.routes())

app.listen(3000)

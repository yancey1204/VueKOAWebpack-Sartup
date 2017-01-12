import Koa from 'koa'
import koaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import serve from 'koa-static'
import webpack from 'webpack'
import webpackMiddleware from 'koa-webpack-dev-middleware'
import webpackConfig from './webpack.config'

const router = koaRouter()
const app = new Koa()

app
    .use(webpackMiddleware(webpack(webpackConfig), {
        noInfo: true,
        stats: { colors: true }
    }))
    .use(serve('dist'))
    .use(views(__dirname))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

router
    .get('/', (ctx, next) => {
        return ctx.render('./index')
    })
    .get('/:id', (ctx, next) => {
        ctx.body = `The id is ${ctx.params.id}`
    })
    .post('/', (ctx, next) => {
        ctx.body = {
            requestBody: ctx.request.body
        }
    })

app.listen(9000, () => console.log('server started 9000'))

export default app

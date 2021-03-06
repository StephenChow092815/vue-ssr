// entry-client.js
import { createApp } from './main'

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 找出两个匹配列表的差异组件，不做重复的数据读取工作
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    if (!activated.length) {
      return next()
    }
    Promise.all(
      activated.map((c) => {
        if (c.extendOptions && c.extendOptions.asyncData) {
          return c.extendOptions.asyncData({
            store,
            route: to,
            options: {},
          })
        }
      })
    )
      .then(() => {
        next()
      })
      .catch(next)
  })
  app.$mount('#app')
})

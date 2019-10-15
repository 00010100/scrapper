import chalk from 'chalk'
import queue from 'async/queue'

import {arrayFromLength, PuppeteerHandler} from './helpers'
import {listPageHandler} from './handlers'

const URL = 'https://auto.ria.com/search/?body.id[0]=3&year[0].gte=2014&categories.main.id=1&brand.id[0]=84&model.id[0]=785&price.currency=1&engine.gte=1.8&abroad.not=0&custom.not=1&damage.not=1&spareParts=0&size=100&page='
// const URL = 'https://auto.ria.com/search/?body.id[0]=3&year[0].gte=2014&categories.main.id=1&brand.id[0]=29&model.id[0]=295&price.currency=1&abroad.not=0&custom.not=1&damage.not=1&spareParts=0&size=100&page='
const pages = 2

const concurrency = 10
const startTime = new Date()

export const p = new PuppeteerHandler()
export const taskQueue = queue(async(task, done) => {
  try {
    await task()
    console.log(chalk.bold.magenta('Task completed, tasks left: ' + taskQueue.length() + '\n'))
    done()
  } catch (err) {
    throw err
  }
}, concurrency)

taskQueue.drain(function() {
  const endTime = new Date()
  console.log(chalk.green.bold(`All items completed [${(endTime - startTime) / 1000}s]\n`))
  p.closeBrowser()
  process.exit()
});

(function main() {
  arrayFromLength(pages).forEach(page => {
    taskQueue.push(
      () => listPageHandler(p, `${URL}${page}`),
      err => {
        if (err) {
          console.log(err)
          throw new Error(`Error getting data from page #${page}`)
        }
        console.log(chalk.green.bold(`Completed getting data from page #${page}\n`))
      }
    )
  })
})()

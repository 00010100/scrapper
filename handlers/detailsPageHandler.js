import cherio from 'cherio'
import chalk from 'chalk'

import {taskQueue, p} from '../index'
import {saveData} from '../handlers'

const task = async initialData => {
  try {
    const detailContent = await p.getPageContent(initialData.url)
    const $ = cherio.load(detailContent)
    const color = $('.description-car .technical-info .car-color').parent().text().trim()

    await saveData({
      ...initialData,
      color
    })
  } catch (err) {
    console.log(chalk.red('An error has occured \n'))
    console.log(err)
  }
}

export function listItemsHandler(data) {
  data.forEach(initialData => {
    taskQueue.push(
      () => task(initialData),
      err => {
        if (err) {
          console.log(err)
          throw new Error(`Error getting data from url[ ${initialData.url} ]`)
        }
        console.log(chalk.green.bold(`Success getting data from: \n${initialData.url}\n`))
      }
    )
  })
}

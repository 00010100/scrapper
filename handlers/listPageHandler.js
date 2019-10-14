import cherio from 'cherio'
import chalk from 'chalk'

import {listItemsHandler, saveData} from '../handlers'

export async function listPageHandler(p, url) {
  try {
    console.log(chalk.green('Getting data from: ') + chalk.green.bold(url))
    const pageContent = await p.getPageContent(url)
    const $ = cherio.load(pageContent)
    const carsItems = []

    $('.ticket-item').each((i, item) => {
      carsItems.push(listItemsHandler($, item))
    })

    for (const car of carsItems) {
      await saveData(car)
    }
  } catch (err) {
    console.log(chalk.red('An error has occured \n'))
    console.log(err)
  }
}

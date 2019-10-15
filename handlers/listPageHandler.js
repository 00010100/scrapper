import cheerio from 'cheerio'
import chalk from 'chalk'

import {listItemsHandler} from '../handlers'
import {parseData} from '../helpers'

export async function listPageHandler(p, url) {
  try {
    console.log(chalk.green('Getting data from: ') + chalk.green.bold(url))
    const pageContent = await p.getPageContent(url)
    const $ = cheerio.load(pageContent)
    const carsItems = []

    $('.ticket-item').each((i, item) => {
      carsItems.push(parseData($, item))
    })

    await listItemsHandler(carsItems)
  } catch (err) {
    console.log(chalk.red('An error has occured \n'))
    console.log(err)
  }
}

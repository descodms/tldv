import { Client } from '@notionhq/client'

export default class NotionService {
  private key: string = process.env.NOTION_KEY || ''
  private databaseId: string = process.env.NOTION_DATABASE_ID || ''
  private notion: Client = new Client({ auth: this.key })

  constructor() {}

  async addItem(url: string) {
    try {
      const response: any = await this.notion.pages.create({
        parent: { database_id: this.databaseId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: url,
                },
              },
            ],
          },
        },
      })
      console.log(response)
      console.log('Success! Entry added.')
    } catch (error) {
      console.error(error)
    }
  }
}

import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function run() {
  const payload = await getPayload({ config: await configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } }
  })
  if (result.docs.length > 0) {
    for (const doc of result.docs) {
      await payload.delete({
        collection: 'pages',
        id: doc.id
      })
      console.log(`Deleted page with id ${doc.id}`)
    }
  } else {
    console.log('No home page found')
  }
  process.exit(0)
}

run()

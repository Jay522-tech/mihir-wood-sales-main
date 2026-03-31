import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function check() {
  const payload = await getPayload({ config: configPromise })
  const reviews = await payload.find({
    collection: 'reviews',
    limit: 100,
  })
  console.log('Reviews count:', reviews.totalDocs)
  reviews.docs.forEach(r => console.log('- ', r.customerName, ':', r.content))
  process.exit(0)
}

check()

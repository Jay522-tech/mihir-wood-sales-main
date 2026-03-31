import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })

    const categoryId = '69c61239e9f0eaa50a968e94';
    const mediaId = '69c62e6fe9f0eaa50a969ac3'; // one of the media items we found earlier

    console.log('Fetching category before update...');
    let cat = await payload.findByID({
        collection: 'categories',
        id: categoryId,
    });
    console.log('Before image:', cat.image);

    console.log('Updating category with image...');
    cat = await payload.update({
        collection: 'categories',
        id: categoryId,
        data: {
            image: mediaId,
        },
    });

    console.log('After update, image:', cat.image);

    process.exit(0);
}

run().catch(console.error);

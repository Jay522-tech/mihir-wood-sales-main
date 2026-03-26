import type { Media, Store, StoreArchiveBlock as StoreArchiveProps } from '@/payload-types'
import React from 'react'
import type { DefaultDocumentIDType } from 'payload'

export const StoreArchive: React.FC<
    StoreArchiveProps & {
        id?: DefaultDocumentIDType
    }
> = ({ id, stores, title }) => {
    if (!stores || stores.length === 0) return null

    return (
        <section className="container pb-4" id={`block-${id}`}>
            {title && <h2 className="mb-8 text-2xl font-bold">{title}</h2>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stores.map((store, index) => {
                    const storeData = typeof store === 'object' ? store : null
                    if (!storeData) return null

                    return (
                        <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-neutral-900" key={index}>
                            {storeData.image && typeof storeData.image === 'object' && (
                                <img
                                    alt={storeData.name}
                                    className="h-48 w-full object-cover"
                                    src={(storeData.image as Media).url!}
                                />
                            )}
                            <div className="p-6">
                                <h4 className="mb-2 text-xl font-bold">{storeData.name}</h4>
                                <p className="mb-4 text-neutral-600 dark:text-neutral-400">{storeData.address}</p>
                                <div className="space-y-1 text-sm">
                                    {storeData.phone && (
                                        <p>
                                            <span className="font-bold">Phone:</span> {storeData.phone}
                                        </p>
                                    )}
                                    {storeData.email && (
                                        <p>
                                            <span className="font-bold">Email:</span> {storeData.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

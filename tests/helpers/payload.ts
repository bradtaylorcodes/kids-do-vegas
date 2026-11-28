import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

export const getTestPayload = async (): Promise<Payload> => getPayload({ config })

/** Removes every user so each test starts from an empty Users collection. */
export const clearUsers = async (payload: Payload): Promise<void> => {
  await payload.delete({ collection: 'users', where: {}, overrideAccess: true })
}

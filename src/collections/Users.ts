import type { Access, CollectionConfig } from 'payload'

import { isEditor, userIsEditor } from '../access/isEditor'

/** Creating a user is allowed only while no user exists: the first sign-up becomes the Editor. */
const noUserExistsYet: Access = async ({ req }) => {
  const { totalDocs } = await req.payload.count({ collection: 'users', req })
  return totalDocs === 0
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: ({ req }) => userIsEditor(req.user),
    create: noUserExistsYet,
    read: isEditor,
    update: isEditor,
    delete: isEditor,
    unlock: isEditor,
  },
  fields: [
    {
      // Only the Editor can sign in to the admin, so the role is fixed.
      name: 'role',
      type: 'select',
      options: [{ label: 'Editor', value: 'editor' }],
      defaultValue: 'editor',
      saveToJWT: true,
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
      },
    },
  ],
}

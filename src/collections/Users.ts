import type { CollectionConfig } from 'payload'

import { isEditor, userIsEditor } from '../access/isEditor'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: ({ req }) => userIsEditor(req.user),
    // The API never creates users. The Editor comes from `pnpm create-editor` (production)
    // or `pnpm seed` (local); both skip access rules. The admin's /create-first-user page
    // also skips this rule, but Payload only allows it while no user exists.
    create: () => false,
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

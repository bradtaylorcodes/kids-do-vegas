import type { Access, PayloadRequest } from 'payload'

type MaybeUser = PayloadRequest['user'] | undefined

export const userIsEditor = (user: MaybeUser): boolean =>
  Boolean(user && 'role' in user && user.role === 'editor')

export const isEditor: Access = ({ req }) => userIsEditor(req.user)

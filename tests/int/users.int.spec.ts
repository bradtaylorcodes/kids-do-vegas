import {
  createLocalReq,
  getAccessResults,
  registerFirstUserOperation,
  type Payload,
  type TypedUser,
} from 'payload'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { clearUsers, getTestPayload } from '../helpers/payload'

const editor = { email: 'editor@example.com', password: 'correct-horse-battery' }

let payload: Payload

beforeAll(async () => {
  payload = await getTestPayload()
})

afterAll(async () => {
  await payload.destroy()
})

beforeEach(async () => {
  await clearUsers(payload)
})

describe('creating users', () => {
  it('refuses a visitor creating a user, even when no user exists', async () => {
    await expect(
      payload.create({ collection: 'users', data: editor, overrideAccess: false }),
    ).rejects.toThrow(/not allowed/i)
  })

  it('refuses the Editor creating another user', async () => {
    const user = await payload.create({ collection: 'users', data: editor, overrideAccess: true })

    await expect(
      payload.create({
        collection: 'users',
        data: { email: 'second@example.com', password: 'another-long-password' },
        user,
        overrideAccess: false,
      }),
    ).rejects.toThrow(/not allowed/i)
  })

  it("lets the admin's first-user page register the Editor while no user exists", async () => {
    const req = await createLocalReq({}, payload)

    const { user } = await registerFirstUserOperation({
      collection: payload.collections.users,
      data: { ...editor, role: 'editor' },
      req,
    })

    expect(user).toMatchObject({ email: editor.email, role: 'editor' })
  })

  it("refuses the admin's first-user page once a user exists", async () => {
    await payload.create({ collection: 'users', data: editor, overrideAccess: true })
    const req = await createLocalReq({}, payload)

    await expect(
      registerFirstUserOperation({
        collection: payload.collections.users,
        data: { email: 'intruder@example.com', password: 'let-me-in-please', role: 'editor' },
        req,
      }),
    ).rejects.toThrow(/not allowed/i)
  })

  it('gives every user the Editor role', async () => {
    const user = await payload.create({ collection: 'users', data: editor, overrideAccess: true })

    expect(user).toMatchObject({ role: 'editor' })
  })
})

describe('reaching the admin', () => {
  const adminAccessFor = async (user: TypedUser | null) => {
    const req = await createLocalReq({ user: user ?? undefined }, payload)
    const { canAccessAdmin } = await getAccessResults({ req })
    return { canAccessAdmin, req }
  }

  const createEditor = () =>
    payload.create({ collection: 'users', data: editor, overrideAccess: true })

  it('lets the Editor into the admin and its operations', async () => {
    const user = await createEditor()
    const { canAccessAdmin } = await adminAccessFor({ ...user, collection: 'users' })

    expect(canAccessAdmin).toBe(true)
    const users = await payload.find({ collection: 'users', user, overrideAccess: false })
    expect(users.docs.map((u) => u.email)).toEqual([editor.email])
  })

  it('ignores an attempt to change the role', async () => {
    const user = await createEditor()

    const updated = await payload.update({
      collection: 'users',
      id: user.id,
      data: { role: 'member' as never }, // 'as never': the type only allows 'editor'
      user,
      overrideAccess: false,
    })

    expect(updated.role).toBe('editor')
  })

  it('refuses a signed-in user without the Editor role', async () => {
    const created = await createEditor()
    const notEditor = { ...created, collection: 'users', role: 'member' } as unknown as TypedUser
    const { canAccessAdmin } = await adminAccessFor(notEditor)

    expect(canAccessAdmin).toBeFalsy()
    await expect(
      payload.find({ collection: 'users', user: notEditor, overrideAccess: false }),
    ).rejects.toThrow(/not allowed/i)
    await expect(
      payload.update({
        collection: 'users',
        id: created.id,
        data: { email: 'taken-over@example.com' },
        user: notEditor,
        overrideAccess: false,
      }),
    ).rejects.toThrow(/not allowed/i)
    await expect(
      payload.delete({
        collection: 'users',
        id: created.id,
        user: notEditor,
        overrideAccess: false,
      }),
    ).rejects.toThrow(/not allowed/i)
  })

  it('refuses a visitor who is not signed in', async () => {
    await createEditor()
    const { canAccessAdmin } = await adminAccessFor(null)

    expect(canAccessAdmin).toBeFalsy()
    await expect(payload.find({ collection: 'users', overrideAccess: false })).rejects.toThrow(
      /not allowed/i,
    )
  })
})

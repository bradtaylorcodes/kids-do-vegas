import { expect, test } from '@playwright/test'

import { localEditor } from '../../src/seed/localEditor'
import { login } from '../helpers/login'

test.describe('Admin sign-in', () => {
  test('the local Editor can sign in to the admin', async ({ page }) => {
    await login(page, localEditor)

    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible()
  })

  test('a visitor who is not signed in is sent to the login page', async ({ page }) => {
    await page.goto('/admin')

    await expect(page).toHaveURL(/\/admin\/login/)
    await expect(page.locator('#field-email')).toBeVisible()
  })

  test('a visitor who is not signed in cannot read users through the API', async ({ request }) => {
    const response = await request.get('/api/users')

    expect(response.status()).toBe(403)
  })

  test('wrong credentials are refused', async ({ page }) => {
    await login(page, { email: localEditor.email, password: 'not-the-password' })

    await expect(page.getByText(/email or password.*incorrect/i)).toBeVisible()
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('nobody can create another user once the Editor exists', async ({ page }) => {
    await page.goto('/admin/create-first-user')

    await expect(page).toHaveURL(/\/admin\/login/)
  })
})

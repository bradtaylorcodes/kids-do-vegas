import type { Page } from '@playwright/test'

export interface Credentials {
  email: string
  password: string
}

/** Signs in through the admin login form. */
export async function login(page: Page, user: Credentials): Promise<void> {
  await page.goto('/admin/login')
  await page.fill('#field-email', user.email)
  await page.fill('#field-password', user.password)
  await page.click('button[type="submit"]')
}

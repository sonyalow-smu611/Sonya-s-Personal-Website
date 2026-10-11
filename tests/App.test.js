import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import App from '../src/App.vue'

const contact = { name: 'Test Shopkeeper', email: 'shop@example.com', github: 'https://github.com/shop', linkedin: 'https://linkedin.com/in/shop' }
const item = (name, title, links = []) => ({ name, title, meta: `${title} meta`, body: `${title} body`, links })
const baskets = [
  { id: 'skills', kind: 'Fruits', category: 'Skills', items: [item('Banana', 'Languages'), item('Apple', 'Frameworks')] },
  { id: 'projects', kind: 'Snacks', category: 'Projects', sticker: 'new-thumb', items: [
    item('Chips', 'Cafe app', [{ label: 'Devpost', href: 'https://devpost.com/chips' }, { label: 'GitHub', href: null }]),
    item('Popcorn', 'Agent workflow'),
  ] },
]
const open = () => mount(App, { props: { baskets, contact } })

const basketButton = (page, category) => page.findAll('button').find((b) => b.attributes('aria-label')?.includes(`${category} basket`))
const itemButton = (page, name) => page.get('#bagging').findAll('button').find((b) => b.text().includes(name))
const baggedItems = (page) => page.get('#bagging').findAll('li').map((li) => li.text())
const details = (page) => page.get('#bagging [aria-live]')

test('the shop opens with its name and the shopkeeper', () => {
  const page = open()
  expect(page.get('h1').text()).toBe("sonya's space")
  expect(page.text()).toContain('Test Shopkeeper')
})

test('hero links point to the shopkeeper', () => {
  const hrefs = open().get('#top').findAll('a').map((a) => a.attributes('href'))
  expect(hrefs).toEqual(expect.arrayContaining(['https://github.com/shop', 'https://linkedin.com/in/shop', 'mailto:shop@example.com', '#top']))
})

test('the first basket is on the counter when the shop opens', () => {
  const page = open()
  expect(basketButton(page, 'Skills').attributes('aria-pressed')).toBe('true')
  expect(basketButton(page, 'Projects').attributes('aria-pressed')).toBe('false')
  expect(baggedItems(page).join(' ')).toContain('Banana')
})

test('clicking a basket unpacks its items into the bagging area', async () => {
  const page = open()
  await basketButton(page, 'Projects').trigger('click')
  expect(basketButton(page, 'Projects').attributes('aria-pressed')).toBe('true')
  expect(page.get('#bagging h2').text()).toBe('Projects')
  const items = baggedItems(page).join(' ')
  expect(items).toContain('Chips')
  expect(items).toContain('Popcorn')
  expect(items).not.toContain('Banana')
})

test('the second copy of the belt is clickable but hidden from keyboard and screen readers', async () => {
  const page = open()
  const copies = page.findAll('li[aria-hidden="true"]')
  expect(copies).toHaveLength(baskets.length)
  copies.forEach((li) => expect(li.get('button').attributes('tabindex')).toBe('-1'))
  await copies[1].get('button').trigger('click')
  expect(page.get('#bagging h2').text()).toBe('Projects')
})

test('the first item is scanned by default and its details are announced', () => {
  const page = open()
  expect(itemButton(page, 'Banana').attributes('aria-pressed')).toBe('true')
  expect(details(page).attributes('aria-live')).toBe('polite')
  expect(details(page).text()).toContain('Languages body')
})

test('clicking an item shows its details and links', async () => {
  const page = open()
  await basketButton(page, 'Projects').trigger('click')
  await itemButton(page, 'Chips').trigger('click')
  expect(details(page).text()).toContain('Cafe app meta')
  const links = details(page).findAll('a')
  expect(links.map((a) => [a.text(), a.attributes('href')])).toEqual([['Devpost ↗', 'https://devpost.com/chips']]) // GitHub has no URL yet, so it is left out
  await itemButton(page, 'Popcorn').trigger('click')
  expect(itemButton(page, 'Popcorn').attributes('aria-pressed')).toBe('true')
  expect(itemButton(page, 'Chips').attributes('aria-pressed')).toBe('false')
  expect(details(page).text()).toContain('Agent workflow body')
})

test('switching baskets goes back to the first item', async () => {
  const page = open()
  await itemButton(page, 'Apple').trigger('click')
  await basketButton(page, 'Projects').trigger('click')
  await basketButton(page, 'Skills').trigger('click')
  expect(itemButton(page, 'Banana').attributes('aria-pressed')).toBe('true')
  expect(details(page).text()).toContain('Languages body')
})

test('the receipt links to every way to connect', () => {
  const rows = open().get('#receipt').findAll('a').map((a) => [a.text().replace(/\s|✓/g, ''), a.attributes('href')])
  expect(rows).toEqual([
    ['EMAIL', 'mailto:shop@example.com'],
    ['LINKEDIN', 'https://linkedin.com/in/shop'],
    ['GITHUB', 'https://github.com/shop'],
  ])
})

test('stickers appear only where the shop data puts them, hidden from assistive tech', async () => {
  const page = open()
  const stickerIn = (category) => basketButton(page, category).findAll('img.sticker')
  expect(stickerIn('Skills')).toHaveLength(0)
  const [sticker] = stickerIn('Projects')
  expect(sticker.attributes('src')).toBe('/stickers/new-thumb.webp')
  expect(sticker.attributes('alt')).toBe('')
  expect(sticker.attributes('aria-hidden')).toBe('true')
  page.findAll('.corner-sticker').forEach((s) => expect(s.attributes('aria-hidden')).toBe('true'))
  expect(page.findAll('.corner-sticker')).toHaveLength(3)
})

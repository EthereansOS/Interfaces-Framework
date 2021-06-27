import { ipfsUrlTemplates, ipfsUrlChanger } from '../../../test-data/context'

import formatLink from './formatLink'

describe('formatLink', () => {
  const context = { ipfsUrlChanger, ipfsUrlTemplates }

  test('if the link is an array, return the first element', () => {
    const link = ['http://test', 'test2']
    const formatted = formatLink({ context }, link)
    expect(formatted).toEqual('//test')
  })

  test('if the link is ipfs use the ipfs changer', () => {
    const link = 'ipfs://test'
    const formatted = formatLink({ context }, link)
    expect(formatted).toEqual('//gateway.ipfs.io/ipfs/test')
  })

  test('the heading "/" are removed without protocol', () => {
    const link = ['//////test', 'test2']
    const formatted = formatLink({ context }, link)
    expect(formatted).toEqual('//test')
  })

  test('the heading "/" are removed with protocol', () => {
    const link = '//////https://test'
    const formatted = formatLink({ context }, link)
    expect(formatted).toEqual('//test')
  })
})

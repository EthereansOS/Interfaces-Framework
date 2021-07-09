import extractComment from './extractComment'
const context = {}
describe('extractComments', () => {
  it('empty code', () => {
    const code = null
    const result = ''
    expect(extractComment({ context }, code)).toBe(result)
  })

  it('extact comments', () => {
    const code = `some code 
/* Description:
 with a comment for description
 */
 other code
 
/* Discussion:
 https://some.com
 */
 other code
 
/* Update:
 with a comment for update 
 */
 other code
 
`
    const result = {
      Description: 'with a comment for description',
      Discussion: '//some.com',
      Update: 'with a comment for update',
    }
    expect(
      extractComment(
        {
          context: {
            ipfsUrlTemplates: ['ipfs://ipfs/', 'ipfs://'],
            ipfsUrlChanger: 'https://gateway.ipfs.io/ipfs/',
          },
        },
        code
      )
    ).toEqual(result)
  })
})

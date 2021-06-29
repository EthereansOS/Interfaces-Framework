import { sortByMarketCap, sortFromFirst, sortFromLast } from './List'

describe('sort methods', () => {
  it('should return the array sorted by the "unlockedMarketCapDollar" field', async () => {
    const mockOrgsList = [
      {
        unlockedMarketCapDollar: 1,
      },
      { unlockedMarketCapDollar: 2 },
      {
        unlockedMarketCapDollar: 3,
      },
    ]

    const sortedOrgs = sortByMarketCap(
      [...mockOrgsList],
      'unlockedMarketCapDollar'
    )

    expect(sortedOrgs).toEqual([
      { unlockedMarketCapDollar: 3 },
      { unlockedMarketCapDollar: 2 },
      { unlockedMarketCapDollar: 1 },
    ])
  })

  it('should return the array sorted by the "lockedMarketCapDollar" field', async () => {
    const mockOrgsList = [
      {
        lockedMarketCapDollar: 1,
      },
      { lockedMarketCapDollar: 2 },
      {
        lockedMarketCapDollar: 3,
      },
    ]

    const sortedOrgs = sortByMarketCap(
      [...mockOrgsList],
      'lockedMarketCapDollar'
    )

    expect(sortedOrgs).toEqual([
      { lockedMarketCapDollar: 3 },
      { lockedMarketCapDollar: 2 },
      { lockedMarketCapDollar: 1 },
    ])
  })

  it('should return the array sorted by the "totalMarketCapDollar" field', async () => {
    const mockOrgsList = [
      {
        totalMarketCapDollar: 1,
      },
      { totalMarketCapDollar: 2 },
      {
        totalMarketCapDollar: 3,
      },
    ]

    const sortedOrgs = sortByMarketCap(
      [...mockOrgsList],
      'totalMarketCapDollar'
    )

    expect(sortedOrgs).toEqual([
      { totalMarketCapDollar: 3 },
      { totalMarketCapDollar: 2 },
      { totalMarketCapDollar: 1 },
    ])
  })

  it('should return the array sorted by creation order (ASC = from oldest to latest)', async () => {
    const mockOrgsList = [
      {
        key: '8012846_log_c68f40e7',
      },
      { key: '8439412_log_51b8463a' },
      {
        key: '8581989_log_2bb1f038',
      },
    ]

    const sortedOrgs = sortFromFirst([...mockOrgsList])

    expect(sortedOrgs).toEqual([
      { key: '8012846_log_c68f40e7' },
      { key: '8439412_log_51b8463a' },
      { key: '8581989_log_2bb1f038' },
    ])
  })

  it('should return the array sorted by creation order (DESC = from latest to oldest)', async () => {
    const mockOrgsList = [
      {
        key: '8012846_log_c68f40e7',
      },
      { key: '8439412_log_51b8463a' },
      {
        key: '8581989_log_2bb1f038',
      },
    ]

    const sortedOrgs = sortFromLast([...mockOrgsList])

    expect(sortedOrgs).toEqual([
      { key: '8581989_log_2bb1f038' },
      { key: '8439412_log_51b8463a' },
      { key: '8012846_log_c68f40e7' },
    ])
  })
})

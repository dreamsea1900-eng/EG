'use client'
import { ToggleGroup, ToggleGroupItem } from '@/lib/shadcn/ToggleGroup'
import { type VipRankingRow } from '../../useVipController'
import useRankingSectionController, { type RankingTab } from './useRankingSectionController'

interface Props {
  rows: VipRankingRow[]
}

// 註：原 index.html 的分類列只是視覺樣式（最新投注固定為 active 樣式，其他 3 個無 onClick），
// 這裡改用 ToggleGroup 接上真實的 activeTab 狀態，讓 4 個分類可以實際切換——
// 是這次 TSX 化過程中唯一新增「真互動」的地方，其餘皆為靜態結構的逐一對應轉換。
export default function RankingSection({ rows }: Props) {
  const { tabs, activeTab, onActiveTabChange } = useRankingSectionController()

  return (
    <section className='flex flex-col items-end gap-brand-3 pb-brand-6 md:pb-brand-15'>
      <ToggleGroup
        type='single'
        value={activeTab}
        onValueChange={(value) => value && onActiveTabChange(value as RankingTab)}
        variant='outline'
        spacing={5}
        className='h-[60px] w-full min-w-0 justify-end overflow-x-auto rounded-brand-md border-none bg-gradient-to-b from-brand-grey-01 to-brand-bg px-brand-4'
      >
        {tabs.map((tab) => (
          <ToggleGroupItem
            key={tab}
            value={tab}
            className='shrink-0 border-none bg-transparent text-brand-h5 font-medium text-brand-grey-02 data-[state=on]:font-bold data-[state=on]:text-brand-white'
          >
            {tab}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p className='text-brand-h4 font-bold capitalize text-brand-white'>{activeTab}</p>

      {/* Desktop: 5 欄 */}
      <div className='hidden w-full flex-col items-center md:flex'>
        <div className='flex h-[60px] w-full items-center rounded-t-brand-lg border-b border-white/10 bg-gradient-to-b from-brand-grey-01 to-brand-bg px-brand-3 text-brand-h5 font-medium capitalize text-brand-grey-02'>
          <div className='flex-1'>贏分</div>
          <div className='flex-1 text-center'>贏分倍數</div>
          <div className='flex-1 text-center'>總投注數</div>
          <div className='flex-1 text-center'>玩家</div>
          <div className='flex-1 text-right'>遊戲</div>
        </div>
        <div className='flex w-full flex-col'>
          {rows.map((row, index) => (
            <RankingRowDesktop key={index} row={row} />
          ))}
        </div>
      </div>

      {/* Mobile: 2 欄 */}
      <div className='flex w-full flex-col items-center md:hidden'>
        <div className='flex h-[60px] w-full items-center justify-between rounded-t-brand-lg border-b border-white/10 bg-gradient-to-b from-brand-grey-01 to-brand-bg px-brand-2 text-brand-h5 font-medium capitalize text-brand-grey-02'>
          <div>贏分</div>
          <div className='text-right'>遊戲</div>
        </div>
        <div className='flex w-full flex-col'>
          {rows.map((row, index) => (
            <RankingRowMobile key={index} row={row} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RankingRowDesktop({ row }: { row: VipRankingRow }) {
  return (
    <div className='flex h-[60px] w-full items-center border-t border-white/10 bg-gradient-to-b from-brand-grey-01 to-brand-bg px-brand-3'>
      <div className='flex flex-1 items-center gap-brand-2'>
        <span className='text-brand-h5 font-medium text-brand-white'>EGP</span>
        <span className='text-brand-h5 font-medium text-brand-secondary-02'>{row.win}</span>
      </div>
      <div className='flex-1 text-center text-brand-h5 font-medium text-brand-white'>{row.multiplier}</div>
      <div className='flex flex-1 items-center justify-center gap-brand-2'>
        <span className='text-brand-h5 font-medium text-brand-white'>EGP</span>
        <span className='text-brand-h5 font-medium text-brand-white'>{row.bet}</span>
      </div>
      <div className='flex-1 text-center text-brand-h5 font-medium text-brand-white'>{row.player}</div>
      <div className='flex flex-1 items-center justify-end gap-brand-2'>
        <span className='text-brand-h5 font-medium text-brand-white whitespace-nowrap'>{row.game}</span>
        <img src={row.gameImageUrl} alt='' className='size-[50px] rounded-[6.667px] object-cover' />
      </div>
    </div>
  )
}

function RankingRowMobile({ row }: { row: VipRankingRow }) {
  return (
    <div className='flex h-[60px] w-full items-center justify-between border-t border-white/10 bg-gradient-to-b from-brand-grey-01 to-brand-bg px-brand-2'>
      <div className='flex items-center gap-brand-1'>
        <span className='text-brand-h5 font-medium text-brand-white'>EGP</span>
        <span className='text-brand-h5 font-medium text-brand-secondary-02'>{row.win}</span>
      </div>
      <div className='flex items-center justify-end gap-brand-1'>
        <span className='text-brand-h5 font-medium text-brand-white whitespace-nowrap'>{row.game}</span>
        <img src={row.gameImageUrl} alt='' className='size-[50px] rounded-brand-md object-cover' />
      </div>
    </div>
  )
}

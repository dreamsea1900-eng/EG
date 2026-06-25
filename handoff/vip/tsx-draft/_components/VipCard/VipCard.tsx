import { cn } from '@/lib/tailwind/utils'
import { type VipCardData, type VipPrivilegeItem } from '../../useVipController'

// TODO: Figma 暫存 asset 連結，7 天後失效，正式交付前需下載至 /public（見 ../../../notes.md「待確認事項 5」）
const CARD_CHECK_ICON_URL = 'https://www.figma.com/api/mcp/asset/51ab7ed4-2c02-4e24-b76e-d597e2d99d0a'
const CARD_QUESTION_ICON_URL = 'https://www.figma.com/api/mcp/asset/8486b469-0cae-40da-aa53-d7371cd7c546'

// TODO: 對應 EG/handoff/vip/img/ 內的素材，需放入 web-casino-eg 的 /public/vip/ 後路徑才會生效
const VIP_ICON_S = '/vip/vip-icon-s.svg'

interface Props {
  card: VipCardData
  privilegeItems: VipPrivilegeItem[]
}

export default function VipCard({ card, privilegeItems }: Props) {
  const tagClass = cn(
    'rounded-brand-md px-brand-2 py-brand-2 text-brand-h5 font-extrabold italic',
    card.locked
      ? 'bg-brand-grey-02 text-brand-bg'
      : 'bg-gradient-to-b from-brand-secondary-01 to-brand-secondary-02 text-brand-bg',
  )
  const rewardLabelClass = cn(
    'w-full text-brand-h5 font-medium',
    card.locked
      ? 'text-brand-grey-02'
      : 'bg-gradient-to-b from-brand-secondary-01 to-brand-secondary-02 bg-clip-text text-transparent',
  )

  return (
    <div
      className={cn(
        'flex w-[280px] shrink-0 flex-col items-center gap-brand-3 rounded-brand-xl border border-white/10 bg-gradient-to-b from-brand-grey-03 to-brand-bg px-brand-3 py-brand-4 backdrop-blur-[18px] md:w-[300px]',
        card.locked && 'opacity-50',
      )}
    >
      <div className='flex w-full flex-col items-start gap-brand-2'>
        <div className='flex w-full items-start justify-between'>
          <span className={tagClass}>{card.level}</span>
          <div className='relative h-[80px] w-[70px]'>
            <img src={VIP_ICON_S} alt='' className='absolute inset-0 size-full' />
          </div>
        </div>
        <div className='flex w-full flex-col items-end text-right capitalize'>
          <p className='w-full text-brand-h1 font-bold text-brand-white'>{card.reward}</p>
          <p className={rewardLabelClass}>升等獎勵</p>
        </div>
      </div>

      <div className='flex w-full flex-col items-end gap-brand-2'>
        {card.progress.map((row) => (
          <div key={row.label} className='flex h-[24px] items-center justify-end gap-brand-1'>
            <p className='text-brand-h5 font-medium capitalize text-brand-white whitespace-nowrap'>
              {row.value}：{row.label}
            </p>
            <span className='flex size-[24px] items-center justify-center rounded-brand-4xl bg-brand-grey-01'>
              <img src={CARD_CHECK_ICON_URL} alt='' className='size-[12px]' />
            </span>
          </div>
        ))}
      </div>

      <div className='flex w-full flex-col items-center gap-brand-2'>
        <div className='flex w-full items-center justify-center gap-brand-2'>
          <div className='h-px min-w-0 flex-1 bg-white/10' />
          <p className='shrink-0 bg-gradient-to-b from-brand-secondary-01 to-brand-secondary-02 bg-clip-text text-brand-h5 font-medium text-transparent whitespace-nowrap'>
            VIP Privilege
          </p>
          <div className='h-px min-w-0 flex-1 bg-white/10' />
        </div>
        {privilegeItems.map((item) => (
          <div key={item.text} className='flex w-full items-center justify-end gap-brand-1'>
            <span className='shrink-0 rounded-brand-sm bg-gradient-to-b from-brand-yellow-02 to-brand-yellow-03 px-brand-1 py-[2px] text-brand-h7 font-medium text-brand-white whitespace-nowrap'>
              {item.tag}
            </span>
            <p className='flex-1 text-right text-brand-h6 font-medium text-brand-white'>{item.text}</p>
            <img src={CARD_QUESTION_ICON_URL} alt='' className='size-[20px]' />
          </div>
        ))}
      </div>
    </div>
  )
}

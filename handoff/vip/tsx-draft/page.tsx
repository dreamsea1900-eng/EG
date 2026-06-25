'use client'
import { cn } from '@/lib/tailwind/utils'
import RankingSection from './_components/RankingSection/RankingSection'
import VipCard from './_components/VipCard/VipCard'
import useVipController, {
  type VipCardData,
  type VipPrivilegeItem,
  type VipProgressItem,
} from './useVipController'

// TODO: Figma 暫存 asset 連結，7 天後失效，正式交付前需下載至 /public（見 ../notes.md「待確認事項 5」）
const INFO_ICON_URL = 'https://www.figma.com/api/mcp/asset/da15f278-0d3c-4338-9c63-45c5b520b2b4'

// TODO: 對應 EG/handoff/vip/img/ 內的素材，需放入 web-casino-eg 的 /public/vip/ 後路徑才會生效
const VIP_ICON_L = '/vip/vip-icon-l.svg'

// 註：水平 padding 由 src/app/[lang]/layout.tsx 的 container query（@max-8xl:px-brand-3）統一處理，
// 此處不重複套用，否則 < 1520px 時會疊加成 32px（見 ../notes.md「與工程 Layout 整合注意」一節的結論，
// 該結論未涵蓋與 layout.tsx 的疊加風險，已實際比對 layout.tsx 後修正）。
export default function Page() {
  const { memberLevel, memberId, progressItems, vipCards, privilegeItems, rankingRows } =
    useVipController()

  return (
    <div className='flex flex-col gap-brand-6 md:gap-brand-15'>
      <VipLevelSection level={memberLevel} memberId={memberId} progressItems={progressItems} />
      <VipRewardSection cards={vipCards} privilegeItems={privilegeItems} />
      <RankingSection rows={rankingRows} />
    </div>
  )
}

function VipLevelSection({
  level,
  memberId,
  progressItems,
}: {
  level: string
  memberId: string
  progressItems: VipProgressItem[]
}) {
  return (
    <>
      {/* Mobile (< md) */}
      <section className='flex justify-center pt-[35px] md:hidden'>
        <div className='relative w-full'>
          <div className='absolute right-[16px] -top-[35px] z-10 h-[163px] w-[140px]'>
            <img src={VIP_ICON_L} alt='VIP icon' className='absolute inset-0 size-full' />
          </div>

          <div className='relative w-full overflow-hidden rounded-[30px] px-brand-3 pb-brand-4 pt-[64px]'>
            <DecorFrameMobile />

            <img
              src={INFO_ICON_URL}
              alt=''
              className='absolute left-[16px] top-[16px] z-10 size-[20px]'
            />

            <div className='relative z-10 flex flex-col gap-brand-1'>
              <p className='text-brand-h2 font-extrabold italic text-brand-white'>{level}</p>
              <p className='text-brand-h5 font-bold capitalize text-brand-grey-02'>{memberId}</p>
            </div>

            <div className='relative z-10 mt-brand-3 flex flex-col items-end gap-brand-2'>
              {progressItems.map((item) => (
                <ProgressRow
                  key={item.label}
                  item={item}
                  heightClass='h-[16px]'
                  labelClass='text-brand-h6'
                  valueClass='text-brand-h7'
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop (md+) */}
      <section className='hidden md:flex md:justify-center'>
        <div className='relative isolate w-full max-w-[1200px]'>
          <DecorFrameDesktop />

          <img
            src={INFO_ICON_URL}
            alt=''
            className='absolute left-[24px] top-[74px] z-10 size-[26px]'
          />

          <div className='relative z-10 flex w-full items-end justify-center gap-brand-11 px-brand-8'>
            <div className='flex min-w-0 flex-1 flex-col items-end gap-brand-3'>
              <div className='flex w-full items-end justify-start gap-brand-5'>
                <p className='text-brand-h1 font-extrabold italic text-brand-white'>{level}</p>
                <p className='text-brand-h3 font-bold capitalize text-brand-grey-02'>{memberId}</p>
              </div>

              <div className='flex w-full flex-col items-end gap-brand-2'>
                {progressItems.map((item) => (
                  <ProgressRow
                    key={item.label}
                    item={item}
                    heightClass='h-[18px]'
                    labelClass='text-brand-h4'
                    valueClass='text-brand-h7'
                  />
                ))}
              </div>
            </div>

            <div className='relative h-[350px] w-[300px] shrink-0'>
              <img src={VIP_ICON_L} alt='VIP icon' className='absolute inset-0 size-full' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// 註：設計為刻意的「靠右填充」效果（與 src/lib/shadcn/Progress.tsx 預設依 dir 切換方向的行為不同，
// 後者在 LTR 文件下會靠左填充），故維持自訂 markup、未套用 shadcn Progress 元件。
// 如果 FD 認為應統一用 Progress 元件，需要先確認這個「固定靠右」需求要怎麼處理。
function ProgressRow({
  item,
  heightClass,
  labelClass,
  valueClass,
}: {
  item: VipProgressItem
  heightClass: string
  labelClass: string
  valueClass: string
}) {
  return (
    <div className='flex w-full flex-col items-end gap-brand-2'>
      <p className={cn('w-full text-right font-medium capitalize text-brand-white', labelClass)}>
        {item.label}
      </p>
      <div className={cn('relative w-full overflow-hidden rounded-full bg-white/10', heightClass)}>
        <div
          className='absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-brand-primary to-brand-blue-02'
          style={{ width: `${item.percent}%` }}
        />
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center font-medium text-brand-white',
            valueClass,
          )}
        >
          {item.display}
        </div>
      </div>
    </div>
  )
}

function DecorFrameMobile() {
  return (
    <div className='absolute inset-0 flex'>
      <svg
        className='h-full w-[48px] flex-none'
        viewBox='0 0 48 300'
        preserveAspectRatio='xMinYMid slice'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <filter
            id='m_filter'
            x='0'
            y='0'
            width='343'
            height='304'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='4' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0.870588 0 0 0 0 1 0 0 0 0.67 0'
            />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow' />
          </filter>
          <radialGradient
            id='m_radial'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(171.5) rotate(90) scale(300 228.639)'
          >
            <stop stopColor='#003C58' />
            <stop offset='0.783619' stopColor='#1B1E28' />
          </radialGradient>
          <linearGradient
            id='m_border'
            x1='189.63'
            y1='3.45476e-07'
            x2='210.537'
            y2='278.023'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#8EECFF' stopOpacity='0.8' />
            <stop offset='0.485896' stopColor='white' stopOpacity='0.4' />
            <stop offset='0.804874' stopColor='#1B1E28' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='m_fade'
            x1='171'
            y1='206'
            x2='171.385'
            y2='268.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1B1E28' stopOpacity='0' />
            <stop offset='1' stopColor='#1B1E28' />
          </linearGradient>
        </defs>
        <g filter='url(#m_filter)'>
          <rect width='343' height='300' rx='30' fill='url(#m_radial)' />
          <rect x='1' y='1' width='341' height='298' rx='29' stroke='url(#m_border)' strokeWidth='2' />
        </g>
        <rect y='217' width='343' height='83' fill='url(#m_fade)' />
      </svg>

      <svg
        className='h-full min-w-0 flex-1'
        viewBox='48 0 247 300'
        preserveAspectRatio='none'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#m_filter)'>
          <rect width='343' height='300' rx='30' fill='url(#m_radial)' />
          <rect x='1' y='1' width='341' height='298' rx='29' stroke='url(#m_border)' strokeWidth='2' />
        </g>
        <rect y='217' width='343' height='83' fill='url(#m_fade)' />
      </svg>

      <svg
        className='h-full w-[48px] flex-none'
        viewBox='295 0 48 300'
        preserveAspectRatio='xMaxYMid slice'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#m_filter)'>
          <rect width='343' height='300' rx='30' fill='url(#m_radial)' />
          <rect x='1' y='1' width='341' height='298' rx='29' stroke='url(#m_border)' strokeWidth='2' />
        </g>
        <rect y='217' width='343' height='83' fill='url(#m_fade)' />
      </svg>
    </div>
  )
}

function DecorFrameDesktop() {
  return (
    <svg
      className='absolute left-0 top-[50px] z-0 w-full'
      viewBox='0 0 1200 300'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_i_9955_28957)'>
        <rect width='1200' height='300' rx='30' fill='url(#paint0_radial_9955_28957)' />
        <rect
          x='1'
          y='1'
          width='1198'
          height='298'
          rx='29'
          stroke='url(#paint1_linear_9955_28957)'
          strokeWidth='2'
        />
      </g>
      <rect y='217' width='1200' height='83' fill='url(#paint2_linear_9955_28957)' />
      <defs>
        <filter
          id='filter0_i_9955_28957'
          x='0'
          y='0'
          width='1200'
          height='304'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='4' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.870588 0 0 0 0 1 0 0 0 0.67 0'
          />
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow_9955_28957' />
        </filter>
        <radialGradient
          id='paint0_radial_9955_28957'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(600) rotate(90) scale(300 799.904)'
        >
          <stop stopColor='#003C58' />
          <stop offset='0.783619' stopColor='#1B1E28' />
        </radialGradient>
        <linearGradient
          id='paint1_linear_9955_28957'
          x1='663.429'
          y1='3.45476e-07'
          x2='669.436'
          y2='279.466'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#8EECFF' stopOpacity='0.8' />
          <stop offset='0.485896' stopColor='white' stopOpacity='0.4' />
          <stop offset='0.804874' stopColor='#1B1E28' stopOpacity='0' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_9955_28957'
          x1='598.251'
          y1='206'
          x2='598.361'
          y2='268.502'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1B1E28' stopOpacity='0' />
          <stop offset='1' stopColor='#1B1E28' />
        </linearGradient>
      </defs>
    </svg>
  )
}

function VipRewardSection({
  cards,
  privilegeItems,
}: {
  cards: VipCardData[]
  privilegeItems: VipPrivilegeItem[]
}) {
  return (
    <section className='flex flex-col gap-brand-4'>
      <div className='flex items-center justify-end gap-brand-2'>
        <p className='text-brand-h5 font-bold capitalize text-brand-white md:text-brand-h3'>VIP獎勵</p>
        <svg
          className='h-[25px] w-auto shrink-0 md:h-[30px]'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M25.5 22.3496V24.4502H4.5V22.3496H25.5ZM20.251 10.7998L25.501 7.65039V20.25H4.5V7.65039L9.75 10.7998L15 4.5L20.251 10.7998Z'
            fill='white'
          />
        </svg>
      </div>

      <div className='relative min-w-0'>
        <div className='flex min-w-0 gap-[18px] overflow-x-auto pb-brand-2'>
          {cards.map((card, index) => (
            <VipCard key={`${card.level}-${index}`} card={card} privilegeItems={privilegeItems} />
          ))}
        </div>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-l from-transparent to-[#1b1e28]' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#1b1e28]' />
      </div>
    </section>
  )
}


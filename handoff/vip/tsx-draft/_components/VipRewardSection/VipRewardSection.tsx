'use client'
import { Button } from '@/lib/shadcn/Button'
import { cn } from '@/lib/tailwind/utils'
import { SvgComponent } from '@/components/SvgComponent'
import { type VipCardData, type VipPrivilegeItem } from '../../useVipController'
import VipCard from '../VipCard/VipCard'
import useVipRewardSectionController from './useVipRewardSectionController'

interface Props {
  cards: VipCardData[]
  privilegeItems: VipPrivilegeItem[]
}

export default function VipRewardSection({ cards, privilegeItems }: Props) {
  const { emblaRef, showLeftMask, showRightMask, scrollPrev, scrollNext } =
    useVipRewardSectionController()

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

        {/* 註：仿照 GameRow 加上 prev/next 按鈕，沿用同樣的 icon/disabled/rtl 處理方式 */}
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='icon-sm'
            onClick={scrollPrev}
            disabled={!showLeftMask}
            className={cn(
              'h-[20px] w-[20px] rounded-sm md:h-[36px] md:w-[36px]',
              showLeftMask ? 'bg-white/10' : 'bg-white/5',
            )}
          >
            <SvgComponent
              name='chevron-left'
              className={cn(
                'h-[16.67px] w-[16.67px] rtl:rotate-180 md:h-[30px] md:w-[30px]',
                showLeftMask ? 'text-white/40' : 'text-white/20',
              )}
            />
          </Button>
          <Button
            variant='ghost'
            size='icon-sm'
            onClick={scrollNext}
            disabled={!showRightMask}
            className={cn(
              'h-[20px] w-[20px] rounded-sm md:h-[36px] md:w-[36px]',
              showRightMask ? 'bg-white/10' : 'bg-white/5',
            )}
          >
            <SvgComponent
              name='chevron-right'
              className={cn(
                'h-[16.67px] w-[16.67px] rtl:rotate-180 md:h-[30px] md:w-[30px]',
                showRightMask ? 'text-white/40' : 'text-white/20',
              )}
            />
          </Button>
        </div>
      </div>

      <div className='relative min-w-0'>
        <div ref={emblaRef} className='overflow-hidden'>
          <div className='flex gap-[18px] pb-brand-2'>
            {cards.map((card, index) => (
              <VipCard key={`${card.level}-${index}`} card={card} privilegeItems={privilegeItems} />
            ))}
          </div>
        </div>
        <div
          aria-hidden='true'
          className={cn(
            'bg-brand-mask-left pointer-events-none absolute inset-y-0 left-0 z-10 w-24 transition-opacity duration-200',
            showLeftMask ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden='true'
          className={cn(
            'bg-brand-mask-right pointer-events-none absolute inset-y-0 right-0 z-10 w-24 transition-opacity duration-200',
            showRightMask ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    </section>
  )
}

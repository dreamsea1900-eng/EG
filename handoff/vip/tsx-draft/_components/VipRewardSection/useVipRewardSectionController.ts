'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { useDirection } from '@/lib/shadcn/Direction'

// 註：Embla 已依 direction 自動處理 RTL 的 prev/next 對應，這裡不需要再手動判斷方向
// （見 web-casino-eg GameRow/useGameRowController.ts 的同類實作與其註解）
export default function useVipRewardSectionController() {
  const dir = useDirection()
  const isRTL = dir === 'rtl'
  const [showLeftMask, setShowLeftMask] = useState(false)
  const [showRightMask, setShowRightMask] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    direction: isRTL ? 'rtl' : 'ltr',
  })

  const syncMasks = useCallback(() => {
    if (!emblaApi) return
    setShowLeftMask(emblaApi.canScrollPrev())
    setShowRightMask(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const id = setTimeout(syncMasks, 0)
    emblaApi.on('scroll', syncMasks)
    emblaApi.on('reInit', syncMasks)
    emblaApi.on('select', syncMasks)
    return () => {
      clearTimeout(id)
      emblaApi.off('scroll', syncMasks)
      emblaApi.off('reInit', syncMasks)
      emblaApi.off('select', syncMasks)
    }
  }, [emblaApi, syncMasks])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return {
    emblaRef,
    showLeftMask,
    showRightMask,
    scrollPrev,
    scrollNext,
  }
}

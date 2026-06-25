'use client'
import { useState } from 'react'

export const RANKING_TABS = ['贏分榜', '倍數榜', '累積流水', '最新投注'] as const
export type RankingTab = (typeof RANKING_TABS)[number]

export default function useRankingSectionController() {
  const [activeTab, setActiveTab] = useState<RankingTab>('最新投注')

  return {
    tabs: RANKING_TABS,
    activeTab,
    onActiveTabChange: setActiveTab,
  }
}

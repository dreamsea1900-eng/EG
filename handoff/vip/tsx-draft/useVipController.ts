'use client'
import { useMemo } from 'react'

export interface VipProgressItem {
  label: string
  percent: number
  display: string
}

export interface VipCardProgressRow {
  label: string
  value: string
}

export interface VipCardData {
  level: string
  reward: string
  locked: boolean
  progress: VipCardProgressRow[]
}

export interface VipPrivilegeItem {
  tag: string
  text: string
}

export interface VipRankingRow {
  win: string
  multiplier: string
  bet: string
  player: string
  game: string
  gameImageUrl: string
}

// TODO(待工程端確認真實數值): LV/ID 與三項進度為設計稿估讀值，見 ../notes.md「待確認事項 3」
const MEMBER_LEVEL = 'LV. 2'
const MEMBER_ID = 'ID1234567890'

type RawProgressItem = { label: string; current: number; target: number; isCurrency: boolean }

const RAW_PROGRESS_ITEMS: RawProgressItem[] = [
  { label: '存款次數', current: 4, target: 1212, isCurrency: false },
  { label: '存款總額', current: 1500, target: 12321, isCurrency: true },
  { label: '總投注額度', current: 716.7, target: 213123, isCurrency: true },
]

function formatProgressNumber(value: number, isCurrency: boolean) {
  return isCurrency ? value.toFixed(2) : String(value)
}

// TODO(待工程端確認真實數值): VIP2~VIP5 卡片數值為畫面估讀，見 ../notes.md「待確認事項 3」
export const VIP_CARDS: VipCardData[] = [
  {
    level: 'VIP 6',
    reward: '1000.00',
    locked: true,
    progress: [
      { label: '存款次數', value: '4' },
      { label: '存款總額', value: '1000.00' },
      { label: '總投注額度', value: '1000.00' },
    ],
  },
  {
    level: 'VIP 5',
    reward: '1000.00',
    locked: true,
    progress: [
      { label: '存款次數', value: '4' },
      { label: '存款總額', value: '1000.00' },
      { label: '總投注額度', value: '1000.00' },
    ],
  },
  {
    level: 'VIP 4',
    reward: '600.00',
    locked: true,
    progress: [
      { label: '存款次數', value: '3' },
      { label: '存款總額', value: '600.00' },
      { label: '總投注額度', value: '600.00' },
    ],
  },
  {
    level: 'VIP 3',
    reward: '400.00',
    locked: true,
    progress: [
      { label: '存款次數', value: '2' },
      { label: '存款總額', value: '400.00' },
      { label: '總投注額度', value: '400.00' },
    ],
  },
  {
    level: 'VIP 2',
    reward: '400.00',
    locked: false,
    progress: [
      { label: '存款次數', value: '2' },
      { label: '存款總額', value: '400.00' },
      { label: '總投注額度', value: '400.00' },
    ],
  },
  {
    level: 'VIP 1',
    reward: '300.00',
    locked: false,
    progress: [
      { label: '存款次數', value: '1' },
      { label: '存款總額', value: '200.00' },
      { label: '總投注額度', value: '100.00' },
    ],
  },
]

export const VIP_PRIVILEGE_ITEMS: VipPrivilegeItem[] = [
  { tag: '最高2%', text: '每日打碼回饋' },
  { tag: '最高2%', text: '每週存款回饋' },
  { tag: '最高2%', text: '指定日期返現' },
]

// TODO: 4 個分類目前共用同一份假資料，待後端 API 確定後依 activeTab 分別 fetch（見 services/api/<domain>）
const MOCK_RANKING_ROWS: VipRankingRow[] = Array.from({ length: 10 }, () => ({
  win: '2.00',
  multiplier: '0.00x',
  bet: '2.00',
  player: '12xx456',
  game: 'Mafia mayhem',
  // TODO: Figma 暫存連結 7 天後失效，正式交付前需下載至 /public（見 ../notes.md「待確認事項 5」）
  gameImageUrl: 'https://www.figma.com/api/mcp/asset/7564c12b-a045-4e98-b97e-5f058c7cd316',
}))

export default function useVipController() {
  const progressItems = useMemo<VipProgressItem[]>(
    () =>
      RAW_PROGRESS_ITEMS.map(({ label, current, target, isCurrency }) => ({
        label,
        percent: Math.min(100, (current / target) * 100),
        display: `${formatProgressNumber(current, isCurrency)} / ${formatProgressNumber(target, isCurrency)}`,
      })),
    [],
  )

  return {
    memberLevel: MEMBER_LEVEL,
    memberId: MEMBER_ID,
    progressItems,
    vipCards: VIP_CARDS,
    privilegeItems: VIP_PRIVILEGE_ITEMS,
    rankingRows: MOCK_RANKING_ROWS,
  }
}

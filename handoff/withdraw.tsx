"use client"

/**
 * 錢包 / 提款（Withdraw）— shadcn/ui 元件結構版
 * 來源 Figma node: 101:194（檔案 nVdOZ0m47ytmqdGAsSZ9G9）
 *
 * 使用前準備：
 * 1. 已透過 `npx shadcn@latest add button input label tabs card` 安裝對應元件
 * 2. 將下方「Design Token CSS Variables」併入專案的 globals.css :root（或對應到既有語意化 token）
 * 3. 圖片資源目前為 Figma 暫存連結（7 天後失效），請替換為正式素材路徑
 *
 * ------------------------------------------------------------------
 * Design Token CSS Variables（建議併入 globals.css :root，或映射到
 * shadcn 語意化變數，如 --background / --primary / --destructive）
 * ------------------------------------------------------------------
 *  --brand-bg: #1b1e28;
 *  --brand-grey-01: #323745;
 *  --brand-grey-02: #9aa3ba;
 *  --brand-primary: #00deff;
 *  --brand-secondary-02: #69d876;
 *  --brand-warn: #e53935;
 *  --white-100: #ffffff;
 *  --white-40: rgba(255,255,255,0.4);
 *  --white-20: rgba(255,255,255,0.2);
 *  --white-10: rgba(255,255,255,0.1);
 */

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const bankIcon = "https://www.figma.com/api/mcp/asset/ecee7b6e-5ed6-400f-9a0e-e4ba0d848aef"

const QUICK_AMOUNTS = [
  { label: "max", active: false },
  { label: "50%", active: false },
  { label: "25%", active: false },
  { label: "min", active: true },
] as const

const MIN_WITHDRAW = 200

export default function Withdraw() {
  const [amount, setAmount] = useState(0)
  const isBelowMin = amount > 0 && amount < MIN_WITHDRAW

  return (
    <div className="flex min-h-screen w-[375px] flex-col items-center gap-4 border border-[var(--white-10)] bg-[var(--brand-bg)] p-4 text-[var(--white-100)]">
      {/* Top bar — Button(ghost, icon) + 標題 */}
      <header className="relative flex w-full items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label="關閉"
          className="absolute left-0 h-[30px] w-[30px] rounded-[216px] border-[0.6px] border-[var(--white-40)] bg-black/50 text-[var(--white-100)] hover:bg-black/60"
        >
          <X className="h-[14px] w-[14px]" />
        </Button>
        <h1 className="text-[20px] font-normal leading-[28px]">錢包</h1>
      </header>

      {/* Tabs — 提款 / 存款 */}
      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0">
          <TabsTrigger
            value="withdraw"
            className="h-10 rounded-md text-sm font-normal text-[var(--white-100)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--white-100)] data-[state=inactive]:border data-[state=inactive]:border-[var(--brand-grey-01)] data-[state=inactive]:bg-white/5"
          >
            提款
          </TabsTrigger>
          <TabsTrigger
            value="deposit"
            className="h-10 rounded-md text-sm font-normal text-[var(--white-100)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--white-100)] data-[state=inactive]:border data-[state=inactive]:border-[var(--brand-grey-01)] data-[state=inactive]:bg-white/5"
          >
            存款
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Form section */}
      <section className="flex w-full flex-col gap-4">
        <p className="w-full text-right text-base leading-6">提款資訊</p>

        {/* 銀行代碼 */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="bank-code" className="w-full text-right text-sm font-medium">
            銀行代碼
          </Label>
          <div className="flex h-10 items-center justify-between gap-1 rounded-md border border-[var(--white-20)] bg-white/5 px-2">
            <Input
              id="bank-code"
              readOnly
              value="bank"
              className="h-auto border-0 bg-transparent p-0 text-right text-sm shadow-none focus-visible:ring-0"
            />
            <span className="h-[26px] w-[26px] shrink-0 overflow-hidden rounded-full bg-[var(--white-100)]">
              <img src={bankIcon} alt="Kasikorn Bank" className="h-full w-full object-cover" />
            </span>
          </div>
        </div>

        {/* 帳戶名稱 */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="account-name" className="w-full text-right text-sm font-medium">
            帳戶名稱
          </Label>
          <Input
            id="account-name"
            className="h-10 rounded-md border-[var(--white-20)] bg-white/5 text-right text-sm"
          />
        </div>

        {/* 帳號 */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="account-number" className="w-full text-right text-sm font-medium">
            帳號
          </Label>
          <Input
            id="account-number"
            className="h-10 rounded-md border-[var(--white-20)] bg-white/5 text-right text-sm"
          />
        </div>

        {/* 提款金額（錯誤態） */}
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center justify-between gap-1">
            <span className="text-sm text-[var(--brand-grey-02)]">
              <span className="text-[var(--brand-warn)]">{MIN_WITHDRAW.toFixed(2)}</span> ：最低
            </span>
            <Label htmlFor="withdraw-amount" className="text-sm font-medium">
              提款金額
            </Label>
          </div>
          <Input
            id="withdraw-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-invalid={isBelowMin}
            className="h-10 rounded-md border-[var(--white-20)] bg-white/5 text-right text-xs aria-[invalid=true]:border-[var(--brand-warn)]"
          />
          {isBelowMin && (
            <p className="text-right text-xs text-[#ff3b30]">錯誤訊息顯示區</p>
          )}
        </div>

        {/* 快速金額按鈕組 — Button(outline) 群組 */}
        <div className="flex w-full flex-wrap gap-1.5" role="group" aria-label="快速選擇提款金額">
          {QUICK_AMOUNTS.map(({ label, active }) => (
            <Button
              key={label}
              variant="outline"
              data-state={active ? "active" : "inactive"}
              className="h-10 flex-1 rounded-md border-[var(--white-10)] bg-gradient-to-b from-[var(--brand-grey-01)] to-[var(--brand-bg)] text-sm font-normal text-[var(--white-100)] hover:bg-white/10 data-[state=active]:border-[var(--brand-secondary-02)] data-[state=active]:text-[var(--brand-secondary-02)]"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* 主要 CTA */}
        <Button
          disabled={isBelowMin}
          className="h-10 w-full rounded-md bg-gradient-to-l from-[var(--brand-primary)] to-[#3a9ff3] text-sm font-normal text-[var(--white-100)] disabled:opacity-50"
        >
          提款
        </Button>

        {/* 注意事項 — Card */}
        <Card className="w-full gap-0 border-0 bg-white/5 py-0 backdrop-blur-[6px]">
          <CardContent className="flex flex-col gap-0 p-2 text-right text-xs text-white/50">
            <p className="m-0">หมายเหตุ</p>
            <ol className="m-0 list-decimal py-0 pl-5 text-right">
              <li>ถอนขั้นต่ำ 200.00 บาท</li>
              <li>
                สำหรับการถอนเงินที่มากกว่า 500,000.00 THB กรุณาติดต่อฝ่ายบริการลูกค้า{" "}
                <a
                  href="https://line.me/R/ti/p/@201ludux?ts=09181739&oat_content=url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[var(--brand-primary)] underline"
                >
                  คลิกที่นี่
                </a>
              </li>
              <li>ทำเทิร์นโอเวอร์ครบ 1 เท่าของยอดเงินที่ฝาก</li>
            </ol>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

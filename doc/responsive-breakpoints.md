# Responsive Breakpoints 規則

來源：`web-casino-eg/src/app/globals.css`、元件程式碼（無獨立規範文件，由此整理）

---

## Breakpoints 定義

| 名稱 | 寬度 |
|---|---|
| `xs` | 520px |
| `sm` | 768px |
| `md` | **1024px**（主要斷點） |
| `lg` | 1280px |
| `xl` | 1640px |

---

## 元件適配慣例

**主要斷點為 `md`（1024px）**，手機與桌機的切換幾乎都在此發生：

| 適配項目 | 手機（< 1024px） | 桌機（≥ 1024px） |
|---|---|---|
| 元件高度 | `h-brand-6`（36px） | `md:h-12.5`（50px） |
| 字級 | `text-sm` / `text-brand-h7` | `md:text-base` / `md:text-brand-h6` |
| Modal 寬度 | `max-w-[350px]` | `md:max-w-[600px]` |
| 內距 | `px-brand-4` / `py-10` | `md:px-[80px]` / `md:py-14` |
| 版面方向 | `flex-col` | `lg:flex-row` |
| 顯示／隱藏 | `md:hidden`（手機限定） | `hidden md:block`（桌機限定） |

**次要斷點用途：**
- `sm`（768px）：部分 grid 欄數（`sm:grid-cols-2`）與 utility 按鈕 padding 微調
- `lg`（1280px）：版面從垂直轉水平（`flex-col` → `lg:flex-row`）、grid 欄數增加

---

## Container Query Padding 機制（與 Sidebar 互動）

`main` 內容區（`max-width: 1520px`）外層的左右安全邊距，是用 **container query** 實作，不是固定 viewport breakpoint：

- 容器：`layout.tsx` 的 `<div className='@container ...'>`，與 `<AppSidebar />` 同層，量的是「viewport 減去 sidebar 寬度」後的剩餘寬度，不是 viewport 本身
- 邏輯：`@max-8xl:px-brand-3` —— 容器寬度 < `--container-8xl`（1520px）時加 16px padding；達到 1520px 後 padding 歸零（內容已被 `max-width:1520px` 撐滿，不需要再留邊）
- Sidebar 寬度會讓「viewport 達到 1520px」與「容器達到 1520px」不是同一件事：sidebar 展開（300px）時，viewport 約需 ~1820px 容器才會吃滿 1520px；sidebar 收合（60px icon）時約需 ~1580px

**設計端產出狀態二 HTML（無 sidebar context 的獨立 preview）時**：padding 歸零的門檻請直接對齊 `1520px`（即 `--container-8xl` 本身的數值），不要憑印象套用其他斷點。Sidebar 造成的視窗寬度位移屬於工程整合細節，交付時不需要在 HTML 裡模擬，但數值本身（1520）必須對齊——VIP 頁面曾把門檻寫成 `min-[1240px]:px-0`，後修正為 `min-[1520px]:px-0`，即是這類落差的實例。

## 對 Figma 設計稿的影響

- 設計稿需準備**兩個版本**：手機（< 1024px）與桌機（≥ 1024px）
- 主要斷點以 **1024px** 為準，非常見的 768px
- 工程端無統一 responsive 規格文件，各元件適配規則散落於程式碼中；若特定元件的適配方式不確定，需直接與工程師確認

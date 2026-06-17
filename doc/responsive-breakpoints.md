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

## 對 Figma 設計稿的影響

- 設計稿需準備**兩個版本**：手機（< 1024px）與桌機（≥ 1024px）
- 主要斷點以 **1024px** 為準，非常見的 768px
- 工程端無統一 responsive 規格文件，各元件適配規則散落於程式碼中；若特定元件的適配方式不確定，需直接與工程師確認

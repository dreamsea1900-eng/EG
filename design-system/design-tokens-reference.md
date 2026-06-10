# Design Tokens Reference（非 Figma 變數類）

這份文件記錄 `web-casino-eg` 的 `src/app/globals.css` 中**無法／不適合做成 Figma Variable**的設計 token——
原因是 Figma Variables 只支援 Color / Number / String / Boolean 四種型別，無法表示「複合值」（如 box-shadow 的 offset+blur+spread+color、漸層的多色停駐點、aspect-ratio 的計算式）。

這些 token 在 Figma 繪製時**不會有對應的可綁定變數**，但在「狀態二」產出 HTML/CSS 時，請直接套用以下對照值，確保與 `web-casino-eg` 一致。

> 與 `design-tokens.json`（Primitive + Semantic collections）配合使用，兩者皆來源自 `web-casino-eg` 的 `globals.css`。

---

## Z-Index

| Token | 值 | 備註 |
|---|---|---|
| `--z-index-topmost-modal` | 9999 | |
| `--z-index-modal` | 1500 | 目前專案沒有引用到 |
| `--z-index-modal-mask` | 1490 | 目前專案沒有引用到 |
| `--z-index-footer-fixed` | 1400 | 目前專案沒有引用到 |
| `--z-index-footer-menu-dropdown` | 1400 | 舊專案內沒有任何引用 |
| `--z-index-game-full-screen` | 1300 | |
| `--z-index-search-result-box` | 1200 | 舊專案內沒有任何引用 |
| `--z-index-search-input` | 1200 | 舊專案內沒有任何引用 |
| `--z-index-search-mask` | 1190 | 目前專案沒有引用到 |
| `--z-index-mobile-tabbar` | 40 | |
| `--z-index-sidebar` | 30 | |
| `--z-index-sider-mask` | 25 | 舊專案內沒有任何引用 |
| `--z-index-container-body` | 1 | 舊專案內沒有任何引用 |

設計稿上若有 Modal / Sidebar / Mobile TabBar / 全螢幕遊戲等堆疊層級需求，可參考此表標註對應層級，但不需要在 Figma 建立對應 Variable。

---

## Breakpoints（Tailwind / Radix）

| Token | 值 |
|---|---|
| `--breakpoint-xs` | 520px |
| `--breakpoint-sm` | 768px |
| `--breakpoint-md` | 1024px |
| `--breakpoint-lg` | 1280px |
| `--breakpoint-xl` | 1640px |

## Container Query

| Token | 值 |
|---|---|
| `--container-8xl` | 95rem（= 1520px） |

---

## Banner 尺寸與 Aspect Ratio

| Token | 值 |
|---|---|
| `--spacing-banner-a-w` / `-h` | 1920px / 450px |
| `--spacing-banner-b-w` / `-h` | 750px / 480px |
| `--spacing-banner-c-w` / `-h` | 900px / 375px |
| `--aspect-banner-a` | calc(1920/450) |
| `--aspect-banner-b` | calc(750/480) |
| `--aspect-banner-c` | calc(900/375) |

設計稿的 Banner 元件請依此比例配置，並以這三組命名（a/b/c）標註對應的 Banner 類型。

---

## 漸層 Gradient

| Token | 定義 | 對應顏色（已在 design-tokens.json） |
|---|---|---|
| `--color-brand-gradient-y` | `180deg, var(--color-brand-blue-01), var(--color-brand-blue-02)` | `Color/Brand/Blue/01` → `Color/Brand/Blue/02`，180deg 直向漸層 |

設計稿若使用此漸層，請標註「Brand Gradient Y（Blue/01 → Blue/02，180deg）」，產 code 時對應 `bg-linear-(--color-brand-gradient-y)` 或等效寫法。

---

## Shadow

| Token | 值 |
|---|---|
| `--shadow-brand-01` | `0 4px 4px 0 rgb(0 0 0 / 25%)` |
| `--shadow-brand-primary` | `0 0 40px 0 var(--color-brand-primary)`（即 `Color/Brand/Primary`，目前 = Blue/01 #00deff） |

---

## 其他

| Token | 值 | 說明 |
|---|---|---|
| `--mobile-tabbar-height` | 59px | Mobile 版底部 TabBar 高度，版面設計時需預留 |

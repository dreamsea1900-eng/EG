# Design Tokens Reference（非 Figma 變數類）

這份文件記錄 `web-casino-eg` 的 `src/app/globals.css` 中**無法／不適合做成 Figma Variable**的設計 token——
原因是 Figma Variables 只支援 Color / Number / String / Boolean 四種型別，無法表示「複合值」（如 box-shadow 的 offset+blur+spread+color、漸層的多色停駐點、aspect-ratio 的計算式）。

這些 token 在 Figma 繪製時**不會有對應的可綁定變數**，但在「狀態二」產出 HTML/CSS 時，請直接套用以下對照值，確保與 `web-casino-eg` 一致。

> 與 `design-tokens.json`（Primitive collection）配合使用，兩者皆來源自 `web-casino-eg` 的 `globals.css`。

---

## Figma Variable 命名對應規則

`design-tokens.json`（Primitive collection）與來源 Figma 檔案（埃及站 `WWZXpJ3eZ6Wb3m3J52vJ0N`）的 Primitive 變數命名，已於 2026-06-12 完成對齊（重新命名 71 個變數），兩端命名規則現已一致：

- `Color/` 前綴：所有顏色變數統一加上 `Color/` 前綴（如 `Color/Brand/BG`、`Color/White/100`、`Color/Brand/Grey/01`）
- `Brand/` 前綴：Radius / Spacing / Height / Font Size / Line Height 統一加上 `Brand/` 前綴（如 `Radius/Brand/sm`、`Spacing/Brand/0`），對應 CSS 變數命名（`--radius-brand-sm` 等）

**尚未對齊的例外：Font Weight（9 個）**——design-tokens.json 用語意命名（`Font Weight/thin`~`Font Weight/black`），埃及站用數值命名（`Font Weight/100`~`Font Weight/900`），兩者數值一一對應但名稱不同，**目前刻意不調整**（改錯命名對應有導致字重定義錯置的風險）。比對時請以數值為準：

| 埃及站名稱 | design-tokens.json 名稱 | 數值 |
|---|---|---|
| `Font Weight/100` | `Font Weight/thin` | 100 |
| `Font Weight/200` | `Font Weight/extralight` | 200 |
| `Font Weight/300` | `Font Weight/light` | 300 |
| `Font Weight/400` | `Font Weight/normal` | 400 |
| `Font Weight/500` | `Font Weight/medium` | 500 |
| `Font Weight/600` | `Font Weight/semibold` | 600 |
| `Font Weight/700` | `Font Weight/bold` | 700 |
| `Font Weight/800` | `Font Weight/extrabold` | 800 |
| `Font Weight/900` | `Font Weight/black` | 900 |

若未來新增變數或發現其他「看起來不吻合」的命名，建議先比對數值/色值，再判斷是命名規則差異還是真正的脫節。

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

> ⚠️ 下表除 `--color-brand-gradient-y` 外，其餘為依據 Figma Color Styles（`figma-color-styles-todo.md`）草擬之暫定對應，角度標示、命名規則、透明色寫法尚未經工程端確認，未來可能整批調整（詳見 memory: project_eg_design_tokens_sync）。

| Token | 定義 | 對應顏色（已在 design-tokens.json） | 對應 Figma Color Style |
|---|---|---|---|
| `--color-brand-gradient-y` | `180deg, var(--color-brand-blue-01), var(--color-brand-blue-02)` | `Color/Brand/Blue/01` → `Color/Brand/Blue/02`，180deg 直向漸層 | `Button/Straight` |
| `--color-brand-gradient-x` | `90deg, var(--color-brand-blue-01), var(--color-brand-blue-02)`（方向待確認，亦可能為 270deg） | 同上，水平方向 | `Button/Horizontal` |
| `--color-brand-gradient-mask` | `180deg, transparent, var(--color-brand-bg)`（透明端寫法待工程端決定） | `Color/Brand/BG 0%`（0% alpha）→ `Color/Brand/BG` | `Mask` |
| `--color-brand-gradient-frame-list` | `180deg, var(--color-brand-grey-01), var(--color-brand-bg)` | `Color/Brand/Grey/01` → `Color/Brand/BG` | `Frame/List` |
| `--color-brand-gradient-frame-card` | `180deg, var(--color-brand-grey-03), var(--color-brand-bg)` | `Color/Brand/Grey/03` → `Color/Brand/BG` | `Frame/Card` |
| `--color-brand-gradient-frame-stroke` | `180deg, var(--color-brand-yellow-04), var(--color-brand-secondary-01)` | `Color/Brand/Yellow/04` → `Color/Brand/Secondary-01` | `Frame/Stroke_Y` |
| `--color-brand-gradient-secondary` | `180deg, var(--color-brand-secondary-01), var(--color-brand-secondary-02)` | `Color/Brand/Secondary-01` → `Color/Brand/Secondary-02` | `Button/Secondary` |
| `--color-brand-gradient-yellow-btn` | `180deg, var(--color-brand-yellow-02), var(--color-brand-yellow-03)` | `Color/Brand/Yellow/02` → `Color/Brand/Yellow/03` | `Button/Yellow_btn` |

設計稿若使用上述漸層，請依「對應 Figma Color Style」欄標註對應名稱；產 code 時對應 `bg-linear-(--color-brand-gradient-*)` 或等效寫法。

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

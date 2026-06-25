# VIP TSX 草稿 — 交接說明

來源：`../index.html` + `../notes.md`。本資料夾為**未驗證草稿**，從未放進 `web-casino-eg` 跑過 `tsc`/ESLint，請review、調整後才使用，不要直接 merge。

對照 `src/app/[lang]/promotions/`（page.tsx + usePromotionsController.ts）的既有寫法拆出來，
結構性翻譯（HTML → JSX、shadcn 元件替換）以外，有 4 個判斷點需要你確認：

## 1. Padding 疊加風險（已修正，建議覆核）

`notes.md`「與工程 Layout 整合注意」一節的結論說「不需要移除任何頁面層級的水平 padding」，
但實際比對 `src/app/[lang]/layout.tsx` 後發現：水平 padding（`@max-8xl:px-brand-3`，門檻 1520px）
已經在 layout 層統一處理。如果 `page.tsx` 照原 `index.html` 把外層 wrapper 的
`px-brand-3 min-[1520px]:px-0` 整個搬進來，會在 < 1520px 時疊加成雙倍 padding。

草稿已拿掉這層，`page.tsx` 根節點只保留 `flex flex-col gap-brand-6 md:gap-brand-15`（頁面自己需要的垂直間距）。
**請覆核這個判斷是否正確**——`notes.md` 的結論可能需要同步更新。

## 2. 互動範圍盤點

整頁唯一需要真實 state 的地方：排行榜的 4 個分類切換（`贏分榜/倍數榜/累積流水/最新投注`）。
原 `index.html` 這裡只是視覺樣式（最新投注固定看起來是 active，其他 3 個沒有 onClick）。
草稿改用 `ToggleGroup`（`type='single'`）接上 `activeTab` 狀態，是唯一新增「真互動」的地方，
其餘（卡片列表、進度條、表格列）都是純資料 render，沒有額外狀態。

## 3. Progress 元件衝突（前提已更正，待重新評估）

原判斷「這個設計是不論語系都固定靠右填充，跟 `Progress` 元件 `useDirection()` 預設行為衝突」**前提有誤**。
填充方向實際應隨語系方向鏡像（LTR／RTL 互換），不是寫死靠右；本頁「VIP 獎勵卡片」元件已有 Figma LTR
對照節點驗證過這種鏡像（見 `../notes.md`「設計還原度修正（第六輪）」），但 Section 1 進度條本身尚未
取得對應 LTR 節點核對，方向細節待確認。

也就是說，「跟 `Progress` 元件預設行為衝突」這個避用理由不成立，是否改用 `Progress` 元件需要重新評估
（與 current/target 百分比真實計算是兩件獨立的事，後者不受此更正影響，維持原樣）。

## 4. 尚未解決（原樣繼承自 notes.md）

- 圖片用 Figma 暫存連結（`https://www.figma.com/api/mcp/asset/...`），7 天後失效，需下載至 `/public`
- VIP2~VIP5 卡片數值、三項進度的 current/target 為畫面估讀值，待確認確切數字
- 排行榜 4 個分類目前共用同一份假資料，待後端 API 確定後依 `activeTab` 分別 fetch

## 5. 這次沒處理、需要額外注意

**RTL 沒有驗證過**。設計來源是埃及站，專案本身需支援阿拉伯語 RTL，
但草稿裡的 `left-`/`right-`/`text-right` 是直接照搬原始 HTML 的寫死方向，
沒有比對過其他已驗證 RTL 頁面的處理方式（例如絕對定位元素是否需要 `rtl:` 覆寫）。
請在阿拉伯語模式下實際測過再確認是否需要調整。

附帶發現：`src/components/RewardDropdown/RewardDropdown.tsx` 的 `Badge` 用了
`inset-e-brand-0`（邏輯定位屬性，會隨 RTL 自動翻轉），證實專案內有處理 RTL 定位的既有慣例，
之後補 RTL 時可以參考這個寫法，而不是用 `rtl:` 手動覆寫每一處。

## 6. 卡片底部現成元件評估

**標籤「最高2%」→ 建議用 `Badge`，但需新增 variant**

`src/lib/shadcn/Badge.tsx` 已有 `variant='brand'`（`from-[#D4CC3D] to-brand-secondary-02` 黃→綠漸層、
`rounded-full`、`text-xs`），但跟 Figma 規格（`brand-yellow-02 → brand-yellow-03`、`rounded-brand-sm`、
`text-brand-h7`）不符。建議跟 FD 提議在 `Badge` 新增一個 variant（例如 `promo`）對應這個規格，
而不是各頁各自用 className 覆蓋——符合 `web-casino-eg/CLAUDE.md`「重複出現的覆蓋樣式應收斂進元件本身」
的原則。草稿目前維持手刻 `<span>`，未套用 `Badge`。

**問號圖示 → `Tooltip` 元件存在，但全專案零使用**

`src/lib/shadcn/Tooltip.tsx` 已建好，但搜尋 `src/components`、`src/app` 沒有任何地方實際用過。
如果這個問號的設計意圖是 hover/點擊顯示說明文字，這會是第一個實際案例，沒有現成慣例可以照抄；
如果只是裝飾用途，維持目前的純 `<img>` 即可。**需先確認設計意圖**，草稿沒有自行假設為互動元件。

**卡片整體容器 → 評估後不建議用 `Card`**

`src/lib/shadcn/Card.tsx` 是未客製過的標準 shadcn 預設（`bg-card`/`shadow-sm`/`py-6`/`gap-6`，
搭配 `CardHeader`/`CardFooter` 標題＋說明＋操作的語意分區）。VIP 卡片的視覺（漸層背景、
`backdrop-blur`、品牌 token 間距）與內部分區（標籤+圖示／金額／checklist／權益清單）跟這個模型
完全不符，套用等於要蓋掉所有預設值、還要硬塞進不合適的語意框架，成本高於維持現有自訂 `<div>`。
草稿維持原狀，不套用 `Card`。

# VIP 主體 — 狀態二產出備註

來源：Figma `WWZXpJ3eZ6Wb3m3J52vJ0N`，node `9955:28696`（layout：title + VIP + Ranking）
產出：`index.html`（可直接用瀏覽器開啟預覽）、`VipMain.tsx`（React + shadcn 規範）

## 待確認事項

1. **`text-button-primary-01` (#fffefe)**：設計稿中部分文字色綁定此變數，但不在 `shadcn/SKILL.md` 的 token 對照表中。
   因數值與 `--color-brand-white` (#ffffff) 幾乎相同，本次產出暫對應為 `brand-white`，請工程端確認是否需新增獨立 token。

2. **VIP獎勵卡片間距 18px**：卡片 slider 的卡片間距（318px 中心距 - 300px 卡寬 = 18px）不在 `brand spacing` 量表（2/4/8/16/24...）中，
   本次以 `gap-[18px]` 處理，未套用 brand token。

3. **VIP2 ~ VIP5 卡片數值**：僅 `VIP 6`（`9955:28720`）與 `VIP 1`（`9955:28725`）已實際抓取確認；
   中間 4 張卡片（`9955:28721`~`9955:28724`）的升等獎勵金額與存款/投注數值，是依縮圖畫面估讀，**待確認確切數值**。

4. **進度條填充寬度**：3 條進度條（存款次數/存款總額/總投注額度）在設計稿中皆為固定 102px（≈ 674px 的 15.1%），
   屬靜態示意；實際串接時應改為依當前值/目標值動態計算百分比。

5. **圖片資源**：目前 HTML/TSX 中的圖片皆引用 Figma 暫存 asset 網址（**7 天後失效**），
   正式交付前需下載並改為專案內 `/public` 路徑。

## RWD 處理備註

來源（行動版）：Figma `9955:28734`（Mobile_VIP，375px），對應子節點：
`9955:28742`（VIPCards mobile）、`9955:28763`（VIPCard mobile, 280px）、
`9955:28758`（VIP獎勵標題 mobile）、`9955:28765`（Mobile_排行榜，343px）。

斷點：採用 Tailwind `lg`（1024px）作為手機版／桌面版的唯一切換點
（Figma 僅提供 375px 與 1920px 兩份設計稿，無平板版）。

1. **Section 1（VIP 等級進度）**：手機版與桌面版的 DOM 結構差異較大
   （菱形圖示在「LV/ID」旁 vs. 在等級條右側、裝飾外框在文件流中 vs. 絕對定位於背景），
   因此採用「兩組各自獨立的區塊」（`lg:hidden` / `hidden lg:flex`），
   而非用 CSS 重排單一結構，避免後續維護時產生 hack。

2. **進度條尺寸**：桌面版高度 18px、label 用 `text-brand-h4`；
   行動版高度 16px、label 用 `text-brand-h6`。填充寬度兩版皆保留原本的
   靜態 `15.1%`（行動版 Figma 實際為另一組靜態值 ~79.9%，但兩者皆屬待動態化的
   佔位資料，見上方第4點，故統一沿用同一數值，減少無意義的 magic number）。

3. **VIP 鑽石圖示**：桌面版 300x350px；行動版縮小為 140x163px，
   改用對應的行動版 asset（`imgEllipse2=826f14de...`、`imgAaa1=8501448d...`）。

4. **裝飾外框**：桌面版／行動版共用同一份 `/Documents/vip_frame.svg`（1200×300 viewBox）。
   桌面版用預設 `preserveAspectRatio`（`meet`）等比縮放滿版顯示；行動版因寬高比與原圖
   差異過大，改用 9-slice 方式處理，詳見下方「設計還原度修正（第五輪）」。

5. **VIP獎勵標題**：文字桌面版 `text-brand-h3`（24px）、行動版 `text-brand-h5`（16px）；
   圖示桌面版 30px、行動版 25px，已改為響應式 class。

6. **VIP獎勵卡片寬度**：桌面版 300px、行動版 280px，
   已改為 `w-[280px] lg:w-[300px]`，卡片內容與資料維持共用。

7. **排行榜表格**：行動版 Figma 僅有「贏分／遊戲」2 欄，
   桌面版為「贏分／贏分倍數／總投注數／玩家／遊戲」5 欄，結構差異大，
   因此產出兩組各自的表格（`hidden lg:flex` 桌面 / `lg:hidden` 行動），
   共用同一份 `rankingRows` JS 資料，分別渲染至
   `#ranking-rows-desktop`、`#ranking-rows-mobile`。
   Tab bar 與「最新投注」標題兩版樣式相同，維持共用一份，
   並加上 `overflow-x-auto` 避免窄螢幕時 4 個分類擠壓變形。

## 設計還原度修正（第二輪，依 Figma metadata 重新核對）

依 `get_metadata`（node `9955:28696`）取得的精確座標，修正以下與設計稿不符之處：

1. **Section 1（VIP 等級進度）整體寬度**：原誤用 `px-brand-8`（56px margin，內容寬 ~1808px），
   實際設計為 **1200px 置中卡片**（1920px 畫面左右各 360px margin）。
   已改為 `w-[1200px] mx-auto`，使裝飾外框 / 鑽石 / 進度條的長寬比例與設計稿一致
   （先前因內容過寬，外框顯得過於扁平）。

2. **裝飾外框位置**：相對 Content 頂端應為 `top: 50px`、高度 400px
   （外框底部會延伸至 Content 底部下方 100px，形成鑽石/進度條「浮」在外框上半部的效果）。
   原誤用 `top-[74px]`，已修正為 `top-[50px]`，並改為 `left-0 right-0`（隨 1200px 容器滿寬）。

3. **info icon 位置**：原誤用 `left-brand-8 top-[88px]`（56px, 88px），
   實際座標為 `(24px, 74px)`，已修正為 `left-[24px] top-[74px]`。

4. **VIP獎勵／排行榜區塊寬度**：原誤用 `px-brand-8`（56px margin，內容寬 ~1808px），
   實際設計為左右各 200px margin（內容寬 1520px，恰為 `brand-15`），
   已將 `lg:px-brand-8` 改為 `lg:px-brand-15`。

5. **進度條填充方向（已確認修正）**：3 條進度條（存款次數/存款總額/總投注額度）的填充
   應為**靠右對齊**（`right-0`），原誤用 `left-0`，桌面版與行動版共 6 處填充 div 已全數修正。

6. **VIP 卡片文字對齊**：重新核對 VIP5（`9955:28721`）的 Figma 程式碼，
   數值與「升等獎勵」皆為 `text-right` + `items-end`，與已實作的 VIP6/VIP1 一致，
   推斷使用者截圖中「置左」的視覺印象來自 RTL 原稿畫面的呈現方式，
   程式碼層級的對齊方式（靠右）維持不變。

7. 上述修正僅針對桌面版（Section 1 為絕對定位版面，受寬度影響最大）；
   行動版 Section 1 的 343px 內容寬（375px - 32px = `px-brand-3` x2）本身已與設計稿一致，未調整。

## 設計還原度修正（第三輪）

1. **LV.2 / ID 置左**：桌面版 LV/ID row 從 `justify-end` 改為 `justify-start`，
   符合 Figma metadata 顯示的 LV.2 文字 x=0（bar-list 左對齊）。

2. **裝飾外框換 SVG**：移除原 CSS `radial-gradient` 外框 div，改為內嵌 `/Documents/vip_frame.svg`
   的 SVG 程式碼。SVG 自帶邊框漸層（頂部青藍→中間白→底部透明）與底部背景色覆蓋漸層，
   高度從 400px 修正為 300px（SVG 本身即含底部 83px 漸層遮罩）。

3. **i 圖示換為 Figma asset**：原 CSS 樣式文字 `<div>` 替換為
   `https://www.figma.com/api/mcp/asset/7ea588cd-4daa-4949-9454-d9233870f85a`
   的 `<img>`（26×26px），即設計稿中的 `icon_info-b` 元件，帶有藍色光暈效果。
   （注意：7 天後連結失效，正式交付前需下載至 `/public`）

4. **VIP 獎勵卡片右側漸層淡出**：在 `#vip-cards` 外層加 `relative min-w-0` 容器，
   右側疊加 `pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#1b1e28]`
   漸層遮罩，代表有更多卡片可橫向滑動。

## 設計還原度修正（第四輪）

1. **VIP獎勵標題 icon**：原用 `🎮` emoji，後換為 Figma 的 `icon_main_providers` 圖片，
   但該圖示語意不符（providers 是遊戲商標誌，非 VIP 主題），已改為 `icon_main_vip-club`
   （id `155:5129`，皇冠/獎杯造型），並直接內嵌為 inline `<path>`（非 `<img>` 暫存連結，
   無 7 天失效問題）。**注意**：Figma 原稿（節點 `9955:28716` 內的 icon instance）本身仍綁定
   `icon_main_providers`，尚未同步修正，僅 `index.html` 程式碼已更新為正確圖示。

2. **VIP 獎勵卡片 diamond 圖示**：全部 Figma asset URL 已重新取得（節點 VIP1=`9955:28725`、VIP6=`9955:28720`）。
   更新的 4 個 URL 常數：
   - `cardCheckIcon`（勾選圖示）、`cardQuestionIcon`（問號圖示）：來自 VIP1 fetch
   - `cardVipIconUnlocked`：ellipse/icon 來自 VIP1，
   - `cardVipIconLocked`：ellipse/icon 來自 VIP6
   7 天後再次失效，需屆時重抓或下載至 `/public`。

3. **VIP 獎勵卡片左側漸層遮罩**：在 `relative min-w-0` 容器左側加上
   `pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-l from-transparent to-[#1b1e28]`，
   與右側遮罩對稱。

4. **縮放拉伸修正**：
   - outer `<div>` 加 `overflow-x-hidden`，防止固定寬度元素在視窗縮小時造成橫向捲軸。
   - Section 1 內層容器：`w-[1200px]` → `w-full max-w-[1200px]`，
     使其在 1024~1199px 視窗下填滿可用寬度而不溢出。
   - 裝飾外框 SVG：移除固定 `width="1200" height="300"` 屬性，改為 `class="w-full"`
     保留 `viewBox="0 0 1200 300"` 讓 SVG 等比縮放隨容器自適應。

## 設計還原度修正（第五輪）

1. **行動版裝飾外框改為 9-slice（cap-stretch-cap）**：

   行動版卡片寬度（343px）與 `vip_frame.svg` 原始比例（1200×300，4:1）差異過大：
   整張等比縮放（`meet`）會讓裝飾框縮得太小（高度僅約 86px，下方需另加 CSS 底色補滿）；
   改用 `slice` 滿版裁切則會把 SVG 自帶的圓角裁到可視範圍外，需另用 CSS 邊框/圓角補強，
   兩個版本都嘗試過，效果皆不理想。

   最終改用 **9-slice** 概念：將原圖左右各切 **48px** 作為「固定角」
   （含完整圓角弧形 + 邊框漸層，以 `preserveAspectRatio="xMinYMid slice"` /
   `xMaxYMid slice` 原尺寸渲染，不被拉伸），中間挖空段（viewBox `48~1152`）
   則以 `preserveAspectRatio="none"` 自由拉伸填滿剩餘寬度。
   三段為 sibling `<svg>`，以 `flex` 排列（左右 `flex-none w-[48px]`、中間 `flex-1 min-w-0`）。

   `<defs>`（inner-shadow filter + 3 個 gradient）只在左段宣告一次，
   中段／右段透過 `url(#m_radial)` 等 id 跨 sibling svg 引用同一份
   （HTML 文件內 id 為全域命名空間，不需重複定義）。

   效果：圓角與邊框漸層維持 SVG 原生繪製的正圓比例，任何寬度下都不會因非等比縮放而變形；
   中央放射光暈隨寬度自由伸縮（會有輕微形變，但屬柔和漸層、無硬邊瑕疵，視覺上可接受）。
   此做法取代先前「整張 meet 縮小 + CSS 深色底色補」與「slice 裁切 + CSS 邊框補」兩版嘗試。

2. **9-slice 素材來源改為 Figma 手機原生 `vip_frame_s.svg`**（node `9955:28960`，343×300 viewBox）：
   初版 9-slice 沿用桌機 `vip_frame.svg`（1200×300）的漸層數值去切片，等於用桌機比例「推算」
   手機該有的光暈強度——換算後在最常見的手機寬度（343px）反而最不準（中間光暈被壓縮至約
   22% 大小），在少見的寬螢幕手機（接近 1024px 斷點）才最接近原始比例，取捨方向錯誤。

   改用設計師針對 343px 寬獨立調校的 `vip_frame_s.svg` 數值後（`gradientTransform`、邊框/底部
   漸層座標皆對應 343 寬重新计算），cap 切片改為 viewBox `0~48` / `48~295` / `295~343`，
   邏輯不變，只換數據來源。效果：最常見的手機尺寸（343px 上下）光暈還原度最準確，
   只有少數落在斷點邊緣的寬螢幕手機/平板才會有中間段被拉伸變寬的情形。

## 尚未處理（待後續回來處理）

- `Header_Desktop`、`sidebar`、`footer_desktop`、`FloatButton`（全站共用元件，建議先確認工程端是否已有現成元件可重用，再決定是否需要重新產出）

## 與工程 Layout 整合注意（RWD Padding）

工程端在 `src/app/[lang]/layout.tsx` 以 **container query** 統一處理全站外層 padding，
邏輯如下（`APP_CONTENT_MAX_WIDTH = 1520px`）：

| Container 寬度 | Layout 處理 | 效果 |
|---|---|---|
| < 1520px（`@max-8xl`）| `px-brand-3`（16px） | 兩側各 16px 保護邊距 |
| ≥ 1520px | 無 padding | 由 `max-w-[1520px] mx-auto` 置中 |

**VIP 頁面各 Section 的 padding 在此基礎上的行為：**

| Section | Handoff 中的 class | 整合後問題 | 建議處理 |
|---|---|---|---|
| Section 2/3（手機）| `px-brand-3`（16px）| layout 已提供 16px，疊加變 **32px**（過寬）| 工程整合時移除頁面的 `px-brand-3` |
| Section 2/3（桌面）| `px-brand-15`（200px）| `main` 已是 1520px，再加 200px 兩側 → 內容只剩 **1120px**（過窄）| 工程整合時移除頁面的 `px-brand-15` |
| Section 1（手機）| `px-brand-3`（16px）| 同 Section 2/3 手機版，疊加變 32px | 工程整合時移除 |
| Section 1（桌面）| `max-w-[1200px] mx-auto` | 1520px main 內置中 1200px = 各 160px 內縮，加上 viewport 各 200px = 各 360px，與設計稿一致 ✓ | **保留**，無需調整 |

**設計稿數字驗證（桌面 1920px）：**

- Figma：Section 2/3 左右各 200px → 內容 1520px
- 工程整合：`main` = 1520px，移除 `px-brand-15` → 內容自然填滿 1520px ✓
- Figma：Section 1 左右各 360px → 內容 1200px
- 工程整合：`main` = 1520px，Section 1 `max-w-[1200px] mx-auto` → 160px + (1920-1520)/2 = 160+200 = 360px ✓

**結論：工程整合時，除 Section 1 桌面版外，所有頁面自身的水平 padding 均應移除，由 layout 統一管理。**

## Token 綁定狀態

本頁面（VIP 主體）的顏色/字級/間距/圓角已大致完成狀態一綁定，對應到 EG Primitive token
（`Color/Brand/*`、`Font Size/Brand/*`、`Spacing/Brand/*`、`Radius/Brand/*`）。

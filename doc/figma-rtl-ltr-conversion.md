# Figma RTL → LTR 版本轉換流程（EG 實作案例）

> 通用方法論已抽象化為全域 skill：`~/.claude/skills/figma-rtl-to-ltr/conversion-guide.md`。本檔案記錄該方法論在 EG（埃及站，fileKey `WWZXpJ3eZ6Wb3m3J52vJ0N`）的實際執行案例與具體數值，可作為操作範例參考。
>
> 已於 2026-06-12 在「Deposit-QR Payment」頁面（node-id 9839:35585）驗證完成。

## 識別 RTL 特徵

- 共用元件（如 `gateway`）若有 `Direction=LTR` / `Direction=RTL` 變體（component variant property），RTL 版通常是 `Direction=RTL`
- Title row 文字 `textAlignHorizontal` 為 `RIGHT`
- Title row 排列為「badge 圖示＋標題文字置右、chevron 收合箭頭置左」（內容從右側起始）

## 轉換步驟

1. **複製整個 frame**，重新命名加註 `(LTR)`，放置於畫布空白處（例如原 frame 下方 `y + height + 100`），原 frame 保留不動
2. **共用元件變體切換**：對有 `Direction` variant property 的 instance（如 `gateway`）呼叫 `node.setProperties({ "Direction": "LTR" })`
3. **Title row 鏡像**：這類 row 通常是 `layoutMode: HORIZONTAL` 的 auto-layout，子層 `layoutPositioning` 為 `AUTO`（直接改 `x` 無效，會被自動排版蓋掉）。正確做法是用 `insertChild()` **反轉子層順序**（例如原順序 `[icon, text, badge]` → 改為 `[badge, text, icon]`），並將文字 `textAlignHorizontal` 從 `RIGHT` 改為 `LEFT`（記得先對該文字的 styled segments 執行 `loadFontAsync`）
4. **頂部列（top bar，含 cancel 按鈕＋標題文字）鏡像**：同樣用 `insertChild()` 反轉順序（標題文字移到第一個、cancel 按鈕移到最後）。**但若該 frame 靠 `paddingLeft`/`paddingRight` 不對稱來讓標題視覺置中**（例如 `paddingLeft=0, paddingRight=30` 搭配 icon 寬度=30），單純反轉順序會讓標題偏移——必須**同時把 `paddingLeft` 與 `paddingRight` 的值互換**，才能維持標題置中、icon 移到對側
5. **分頁按鈕（如 tagger_btn 提款/存款）順序交換**：這類通常是 `primaryAxisAlignItems: MIN` 的簡單水平排列，直接用 `insertChild()` 交換兩者順序即可，不需處理 padding
6. 每一步完成後用 `node.screenshot()` 截圖驗證視覺結果

## 注意事項

- 執行前依全域規範向使用者確認計畫與 token 預估
- 每個 `use_figma` 呼叫盡量聚焦單一類型操作（例如：先複製＋變體切換，再處理 title row 鏡像，再處理 top bar），方便逐步驗證
- **截圖快取問題**：多行文字（含換行）且為 auto-layout `layoutGrow` 撐滿寬度的文字節點，修改 `textAlignHorizontal` 後 `get_screenshot()` 可能未即時反映（畫面仍顯示舊對齊方式），但屬性值已正確寫入。遇到此情況以 API 重新查詢屬性值為準，請使用者在 Figma App 內直接確認即可（詳見全域 `conversion-guide.md` 注意事項）

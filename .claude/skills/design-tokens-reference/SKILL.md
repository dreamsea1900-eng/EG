---
name: design-tokens-reference
description: EG（web-casino-eg）專案中無法用 Figma Variable 表示的複合型設計 token（Z-Index、Breakpoints、Container Query、Banner 尺寸、Gradient、Shadow 等）查詢方法與命名對應規則。在進行 Token 綁定（狀態一）確認命名、或產出 HTML/CSS（狀態二）對應 token 值時使用。
---

# Design Tokens Reference（非 Figma 變數類）

Figma Variables 只支援 Color / Number / String / Boolean 四種型別，無法表示「複合值」
（如 box-shadow 的 offset+blur+spread+color、漸層的多色停駐點、aspect-ratio 的計算式）。
這類 token 在 Figma 繪製時**不會有對應的可綁定變數**，但在「狀態二」產出 HTML/CSS 時仍需正確套用，
確保與 `web-casino-eg` 的 `src/app/globals.css` 一致。

## 需要檢查的複合值類別

- **Z-Index**：Modal / Sidebar / Mobile TabBar / 全螢幕遊戲等堆疊層級
- **Breakpoints**：Tailwind / Radix 斷點數值
- **Container Query**：版面容器寬度門檻
- **Banner 尺寸與 Aspect Ratio**：各類 Banner 的寬高比例
- **Gradient**：漸層色標定義
- **Shadow**：陰影定義
- **其他**：如 Mobile TabBar 高度等零散複合值

設計稿上若用到上述任何一類，請依此份清單核對是否有對應 token，**不要憑直覺寫死數字**。

## Figma Variable 命名對應規則

`design-tokens.json` 與來源 Figma 檔案的 Primitive 變數命名需保持一致（`Color/` 前綴、`Brand/` 前綴等規則），
但 Font Weight 因歷史原因兩端命名不同（語意命名 vs 數值命名），比對時以數值為準，不要直接比對名稱字串。

---

> 完整數值、Figma Variable 命名對應規則與 Font Weight 對照表，定義於
> `design-system/design-tokens-reference.md`，**使用前務必先讀取該檔案**，
> 並與 `design-tokens.json`（Primitive collection）配合使用。

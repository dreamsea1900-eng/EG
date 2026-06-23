# Figma Color Styles 對照表（Mask / Frame / Button）

> 來源：Figma 檔案 `WWZXpJ3eZ6Wb3m3J52vJ0N`，頁面「✅ Promotion_Join popup_V.1.0 +LTR版」（node-id 4788:125911）下的 Local Paint Styles
> 本表整理 Mask、Frame、Button 三類 Color Style 的漸層／單色定義，並對照 `design-tokens.json`（Primitive collection）中既有 token
> 2026-06-12：埃及站 Primitive 變數命名已對齊 design-tokens.json（詳見 design-tokens-reference.md「Figma Variable 命名對應規則」），下表「顏色定義」欄已改用對齊後的新變數名稱

| Color Style 名稱 | 類型 | 顏色定義（Stop 0 → Stop 1） | 對應 design-tokens.json Token | 備註 |
|---|---|---|---|---|
| `Mask` | 線性漸層 | `Color/Brand/BG 0%`（#1b1e28 @ 0%）→ `Color/Brand/BG`（#1b1e28 @ 100%） | 同左 | 漸層遮罩兩端需綁定**不同**變數（同一變數會被解析為同一 alpha，導致漸層失效）；`BG 0%` 與 `BG` 同層放在 `Color/Brand` 資料夾下 |
| `Frame/List` | 線性漸層 | `Color/Brand/Grey/01`（#323745）→ `Color/Brand/BG`（#1b1e28） | 同左 | 兩端皆已有對應 token |
| `Frame/Card` | 線性漸層 | `Color/Brand/Grey/03`（#212c3e）→ `Color/Brand/BG`（#1b1e28） | 同左 | 兩端皆已有對應 token |
| `Frame/Stroke_Y` | 線性漸層 | `Color/Brand/Yellow/04`（#c38100）→ `Color/Brand/Yellow/01`（#fce405） | `Color/Brand/Yellow/04` → `Color/Brand/Secondary-01` | 兩端皆已有對應 token（`Secondary-01` 為 `Yellow/01` 的 alias） |
| `Button/Straight` | 線性漸層 | `Color/Brand/Blue/01`（#00deff）→ `Color/Brand/Blue/02`（#3a9ff3） | `Color/Brand/Primary` → `Color/Brand/Blue/02` | 兩端皆已有對應 token（已補綁變數；`Primary` 為 `Blue/01` 的 alias） |
| `Button/Horizontal` | 線性漸層 | 同 `Button/Straight`，僅漸層方向為水平 | 同上 | 兩端皆已有對應 token（已補綁變數） |
| `Button/Secondary` | 線性漸層 | `Color/Brand/Yellow/01`（#fce405）→ `Color/Brand/Secondary-02`（#69d876） | `Color/Brand/Secondary-01` → `Color/Brand/Secondary-02` | 兩端皆已有對應 token（`Secondary-01` 為 `Yellow/01` 的 alias） |
| `Button/Yellow_btn` | 線性漸層 | `Color/Brand/Yellow/02`（#e8ae00）→ `Color/Brand/Yellow/03`（#e87e00） | 同左 | 兩端皆已有對應 token |
| `Button/Disabled` | 線性漸層 | #667c8e → #425668 | ⚠️ 待新增 token | `design-tokens.json` 中無對應顏色，需新增 Primitive token 後才能綁定 |

## 待辦事項

- **`Button/Disabled`**：`design-tokens.json` 中尚無 #667c8e / #425668 對應的 Primitive token，待命名與新增後回頭補上對應關係

## 建立方式備註

- 對照表用途與已併入 `design-tokens-reference.md` 的 Text Styles 對照表相同：作為綁定 Token（狀態一）時的命名與用途參考
- 完成對應綁定後，可將此檔案標記為已完成或刪除

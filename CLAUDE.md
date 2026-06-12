# EG站_v1.2 專案設定

## 角色與工作流程

使用者是**介面設計師**，負責的專案流程如下：

1. **接收規格** → 在 Figma 繪製介面
2. **狀態一**：將介面元素綁定 Design System Token（顏色、圓角、文字樣式等變數）
3. **狀態二**：產出符合前端框架（shadcn/ui）規範的 HTML 程式碼，交付給工程師銜接

此 CLAUDE.md 與下列檔案，作為後續 **Figma MCP 操作**與**程式碼產出任務**的依據。

## 專案資源

### Design System Token 來源
`design-system/design-tokens.json`
— 由 Figma Variable Collections 匯出的設計系統資料（顏色、字級、間距等 token 定義），
綁定 Token（狀態一）時應以此檔案內容為準。

### 工程師模組（程式碼產出依據）
`.claude/skills/shadcn/SKILL.md`
— shadcn/ui 元件與專案管理技能，產出 HTML/前端程式碼（狀態二）時自動載入並依循其規範
（元件選用、`components.json`、registry、styling 慣例）。

## 未來擴充規劃

此專案會持續調整與擴充，後續任務應將以下方向納入考量：

- **字級 style 調整**：`design-system/design-tokens.json` 中的 Typography token 定義可能變動，
  需同步檢視綁定規則與輸出樣式
- **CSS token 名稱調整**：Design Token 對應到 CSS 變數的命名規則可能變更，
  需確保 Figma 綁定與程式碼輸出兩端命名一致
- **加入工程師提供的「程式框架 SKILL」**：未來會有額外的前端框架技能文件加入
  `.claude/skills/`，需與現有 shadcn 模組協調，避免規則衝突

## Figma MCP 操作注意事項

- 進行 Token 綁定前，先讀取 `design-system/design-tokens.json` 確認當前 Variable 定義
- 產出 HTML 程式碼時，遵循 `.claude/skills/shadcn/SKILL.md` 的元件與樣式規範
- 若 Token 命名或字級規則有更新，優先以本檔案與 `design-system/` 下最新資料為準
- 為頁面套用 Token 綁定（狀態一）並一一對應時，文字圖層需同時套用對應的 Figma Text Styles
  （`Text/H2/Bold` ~ `Text/H8/Regular`，定義於 `design-system/figma-text-styles-todo.md`）
- 未來建立新的 Variable Collections（Primitive/Semantic）時，應一併建立對應的 Figma Text Styles 與 Color Styles
- 將 RTL 頁面製作為 LTR 版本時，套用全域 `figma-rtl-to-ltr` skill（`~/.claude/skills/figma-rtl-to-ltr/`）的標準流程；`design-system/figma-rtl-ltr-conversion.md` 為本專案的實作案例記錄，可作為操作範例參考

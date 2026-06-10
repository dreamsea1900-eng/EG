# Figma Text Styles 對照表

> ✅ 已完成（已建立於 Figma 檔案 `ffElLQAdQgdYalwkic9RjG`，命名為 `Text/H2/Bold` ~ `Text/H8/Regular`）
> 此表保留作為 Text Style 命名與用途的對照文件

依 `web-casino-eg` 程式碼中 `text-brand-h*` + `font-*` 實際使用頻率整理出以下 12 組 Text Style，字型家族統一為 Inter（與既有 Login Modal 文字一致）：

| Text Style 名稱 | Font Size/Line Height | Font Weight | Tailwind Class | 用途 |
|---|---|---|---|---|
| H2 / Bold | 32 / 40 | Bold (700) | `text-brand-h2 font-bold` | 主要區塊標題 |
| H3 / Bold | 24 / 32 | Bold (700) | `text-brand-h3 font-bold` | 卡片／分頁標題 |
| H3 / Regular | 24 / 32 | Regular (400) | `text-brand-h3` | 次要標題 |
| H4 / Bold | 20 / 28 | Bold (700) | `text-brand-h4 font-bold` | 小節標題 |
| H4 / Regular | 20 / 28 | Regular (400) | `text-brand-h4` | 次要文字 |
| H5 / Medium | 16 / 24 | Medium (500) | `text-brand-h5 font-medium` | 主要內文（強調）|
| H5 / Regular | 16 / 24 | Regular (400) | `text-brand-h5` | 主要內文 |
| H6 / Medium | 14 / 20 | Medium (500) | `text-brand-h6 font-medium` | 次要內文（強調）、按鈕文字 |
| H6 / Regular | 14 / 20 | Regular (400) | `text-brand-h6` | 次要內文 |
| H7 / Medium | 12 / 16 | Medium (500) | `text-brand-h7 font-medium` | 標籤、輔助說明（強調）|
| H7 / Regular | 12 / 16 | Regular (400) | `text-brand-h7` | 標籤、輔助說明（最高頻）|
| H8 / Regular | 10 / 10 | Regular (400) | `text-brand-h8` | 極小文字（如 Badge 數字）|

## 建立方式備註

- 透過 `figma.createTextStyle()` 建立，設定 `fontSize`、`lineHeight`、`fontName`
- 命名建議依現有 Primitive 變數命名慣例，例如 `Text/H7/Regular`、`Text/H4/Bold`
- 完成後可將此檔案標記為已完成或刪除

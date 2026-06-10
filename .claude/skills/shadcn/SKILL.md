---
name: shadcn
description: Manages shadcn components and projects — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when working with shadcn/ui, component registries, presets, --preset codes, or any project with a components.json file. Also triggers for "shadcn init", "create an app with --preset", or "switch to --preset".
user-invocable: false
allowed-tools: Bash(npx shadcn@latest *), Bash(pnpm dlx shadcn@latest *), Bash(bunx --bun shadcn@latest *)
---

# shadcn/ui

A framework for building ui, components and design systems. Components are added as source code to the user's project via the CLI.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest` — based on the project's `packageManager`. Examples below use `npx shadcn@latest` but substitute the correct runner for the project.

## Current Project Context

```json
!`npx shadcn@latest info --json`
```

The JSON above contains the project config and installed components. Use `npx shadcn@latest docs <component>` to get documentation and example URLs for any component.

## Principles

1. **Use existing components first.** Use `npx shadcn@latest search` to check registries before writing custom UI. Check community registries too.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls. Dashboard = Sidebar + Card + Chart + Table.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## EG 設計系統 Token 對照（Figma ↔ Tailwind）

> 完整 token 定義見 `design-system/design-tokens.json`（Figma Variables：Primitive + Semantic collections）與 `design-system/design-tokens-reference.md`（z-index、breakpoint、container query、banner aspect-ratio、gradient、shadow 等複合值）。兩者皆來源自 `web-casino-eg` 的 `globals.css`/`utility.css`。**產出 HTML（狀態二）時，優先使用下列 brand token class，而非 shadcn 預設的數字尺寸（如 `p-4`、`text-sm`）**，以與 `web-casino-eg` 保持一致。

### Primitive — 品牌色

| Figma 變數 | CSS 變數 | Tailwind class |
|---|---|---|
| `Color/Brand/Grey/01` | `--color-brand-grey-01` | `bg-brand-grey-01` / `text-brand-grey-01` / `border-brand-grey-01` |
| `Color/Brand/Grey/02` | `--color-brand-grey-02` | `*-brand-grey-02` |
| `Color/Brand/Grey/03` | `--color-brand-grey-03` | `*-brand-grey-03` |
| `Color/Brand/Blue/01` | `--color-brand-blue-01` | `*-brand-blue-01` |
| `Color/Brand/Blue/02` | `--color-brand-blue-02` | `*-brand-blue-02` |
| `Color/Brand/Yellow/01~04` | `--color-brand-yellow-01~04` | `*-brand-yellow-01~04` |
| `Color/Brand/Secondary-02` | `--color-brand-secondary-02` | `*-brand-secondary-02` |
| `Color/Brand/Warn` | `--color-brand-warn` | `*-brand-warn` |
| `Color/Brand/BG` | `--color-brand-bg` | `*-brand-bg`（= Semantic `background`） |
| `Color/White/100` | `--color-brand-white` | `*-brand-white`（= Semantic `foreground`） |
| `Color/Brand/Mask` | `--color-brand-mask` | `*-brand-mask`（黑 70%） |
| `Color/Brand/Primary`（alias→Blue/01） | `--color-brand-primary` | `*-brand-primary` |
| `Color/Brand/Secondary-01`（alias→Yellow/01） | `--color-brand-secondary-01` | `*-brand-secondary-01` |

`*-` 代表 `bg-` / `text-` / `border-` / `fill-` 等依用途代換。

### Primitive — White 透明度（17 級）

| Figma 變數 | Tailwind class |
|---|---|
| `Color/White/4~80`（4,5,6,8,9,10,12,15,16,20,30,40,50,55,65,70,80） | `white/{N}` 或 `brand-white/{N}`（opacity modifier，無獨立 CSS 變數） |

### Primitive — Radius

| Figma 變數 | CSS 變數 | px | Tailwind class |
|---|---|---|---|
| `Radius/Brand/sm` | `--radius-brand-sm` | 4 | `rounded-brand-sm` |
| `Radius/Brand/md` | `--radius-brand-md` | 8 | `rounded-brand-md` |
| `Radius/Brand/lg` | `--radius-brand-lg` | 16 | `rounded-brand-lg` |
| `Radius/Brand/xl` | `--radius-brand-xl` | 24 | `rounded-brand-xl` |
| `Radius/Brand/2xl` | `--radius-brand-2xl` | 32 | `rounded-brand-2xl` |
| `Radius/Brand/3xl` | `--radius-brand-3xl` | 128 | `rounded-brand-3xl` |
| `Radius/Brand/4xl` | `--radius-brand-4xl` | 360 | `rounded-brand-4xl` |

### Primitive — Spacing（0-17）

| Figma 變數 | CSS 變數 | px | Tailwind class |
|---|---|---|---|
| `Spacing/Brand/0` | `--spacing-brand-0` | 2 | `-brand-0`（如 `p-brand-0`、`gap-brand-0`、`w-brand-0`...） |
| `Spacing/Brand/1` | `--spacing-brand-1` | 4 | `-brand-1` |
| `Spacing/Brand/2` | `--spacing-brand-2` | 8 | `-brand-2` |
| `Spacing/Brand/3` | `--spacing-brand-3` | 16 | `-brand-3` |
| `Spacing/Brand/4` | `--spacing-brand-4` | 24 | `-brand-4` |
| `Spacing/Brand/5` | `--spacing-brand-5` | 32 | `-brand-5` |
| `Spacing/Brand/6` | `--spacing-brand-6` | 40 | `-brand-6` |
| `Spacing/Brand/7` | `--spacing-brand-7` | 48 | `-brand-7` |
| `Spacing/Brand/8` | `--spacing-brand-8` | 56 | `-brand-8` |
| `Spacing/Brand/9` | `--spacing-brand-9` | 64 | `-brand-9` |
| `Spacing/Brand/10` | `--spacing-brand-10` | 72 | `-brand-10` |
| `Spacing/Brand/11` | `--spacing-brand-11` | 80 | `-brand-11` |
| `Spacing/Brand/12` | `--spacing-brand-12` | 88 | `-brand-12` |
| `Spacing/Brand/13` | `--spacing-brand-13` | 96 | `-brand-13` |
| `Spacing/Brand/14` | `--spacing-brand-14` | 104 | `-brand-14` |
| `Spacing/Brand/15` | `--spacing-brand-15` | 200 | `-brand-15` |
| `Spacing/Brand/16` | `--spacing-brand-16` | 320 | `-brand-16` |
| `Spacing/Brand/17` | `--spacing-brand-17` | 400 | `-brand-17` |

套用方式：將 `-brand-N` 接在 `p`/`m`/`gap`/`w`/`h`/`top`/`left`... 等 spacing 類 utility 後面，例如 `p-brand-4`、`gap-brand-2`、`mt-brand-10`。

### Primitive — Height（元件高度）

| Figma 變數 | CSS 變數 | px | Tailwind class |
|---|---|---|---|
| `Height/Brand/2xs` | `--height-brand-2xs` | 28 | `h-brand-2xs` |
| `Height/Brand/xs` | `--height-brand-xs` | 32 | `h-brand-xs` |
| `Height/Brand/sm` | `--height-brand-sm` | 36 | `h-brand-sm` |
| `Height/Brand/md` | `--height-brand-md` | 40 | `h-brand-md` |
| `Height/Brand/lg` | `--height-brand-lg` | 44 | `h-brand-lg` |
| `Height/Brand/xl` | `--height-brand-xl` | 52 | `h-brand-xl` |
| `Height/Brand/2xl`（新增） | `--height-brand-2xl` | 60 | `h-brand-2xl`（globals.css 尚未正式定義，程式碼目前用 `h-[60px]`；產 code 時優先用此變數，待工程端補上定義） |

### Primitive — 字級 / 行高（h1-h8）

| Figma 變數 | CSS 變數 | 字級/行高 (px) | Tailwind class |
|---|---|---|---|
| `Font Size/Brand/h1` + `Line Height/Brand/h1` | `--text-brand-h1` + `--text-brand-h1--line-height` | 40 / 48 | `text-brand-h1` |
| `Font Size/Brand/h2` + `Line Height/Brand/h2` | `--text-brand-h2` + `--text-brand-h2--line-height` | 32 / 40 | `text-brand-h2` |
| `Font Size/Brand/h3` + `Line Height/Brand/h3` | `--text-brand-h3` + `--text-brand-h3--line-height` | 24 / 32 | `text-brand-h3` |
| `Font Size/Brand/h4` + `Line Height/Brand/h4` | `--text-brand-h4` + `--text-brand-h4--line-height` | 20 / 28 | `text-brand-h4` |
| `Font Size/Brand/h5` + `Line Height/Brand/h5` | `--text-brand-h5` + `--text-brand-h5--line-height` | 16 / 24 | `text-brand-h5` |
| `Font Size/Brand/h6` + `Line Height/Brand/h6` | `--text-brand-h6` + `--text-brand-h6--line-height` | 14 / 20 | `text-brand-h6` |
| `Font Size/Brand/h7` + `Line Height/Brand/h7` | `--text-brand-h7` + `--text-brand-h7--line-height` | 12 / 16 | `text-brand-h7` |
| `Font Size/Brand/h8` + `Line Height/Brand/h8` | `--text-brand-h8` + `--text-brand-h8--line-height` | 10 / 10 | `text-brand-h8` |

### Primitive — 字重（語意命名）

| Figma 變數 | CSS 變數 | 數值 | Tailwind class |
|---|---|---|---|
| `Font Weight/thin` | `--font-weight-thin` | 100 | `font-thin` |
| `Font Weight/extralight` | `--font-weight-extralight` | 200 | `font-extralight` |
| `Font Weight/light` | `--font-weight-light` | 300 | `font-light` |
| `Font Weight/normal` | `--font-weight-normal` | 400 | `font-normal` |
| `Font Weight/medium` | `--font-weight-medium` | 500 | `font-medium` |
| `Font Weight/semibold` | `--font-weight-semibold` | 600 | `font-semibold` |
| `Font Weight/bold` | `--font-weight-bold` | 700 | `font-bold` |
| `Font Weight/extrabold` | `--font-weight-extrabold` | 800 | `font-extrabold` |
| `Font Weight/black` | `--font-weight-black` | 900 | `font-black` |

### Semantic — shadcn 語意色（Dark = 本專案實際使用；Light = 預留未來主題，待品牌化）

| Figma 變數 | CSS 變數 | Tailwind class |
|---|---|---|
| `background` | `--background` | `bg-background` |
| `foreground` | `--foreground` | `text-foreground` |
| `card` / `card-foreground` | `--card` / `--card-foreground` | `bg-card` / `text-card-foreground` |
| `popover` / `popover-foreground` | `--popover` / `--popover-foreground` | `bg-popover` / `text-popover-foreground` |
| `primary` / `primary-foreground` | `--primary` / `--primary-foreground` | `bg-primary` / `text-primary-foreground` |
| `secondary` / `secondary-foreground` | `--secondary` / `--secondary-foreground` | `bg-secondary` / `text-secondary-foreground` |
| `muted` / `muted-foreground` | `--muted` / `--muted-foreground` | `bg-muted` / `text-muted-foreground` |
| `accent` / `accent-foreground` | `--accent` / `--accent-foreground` | `bg-accent` / `text-accent-foreground` |
| `destructive` | `--destructive` | `bg-destructive` / `text-destructive` |
| `border` | `--border` | `border-border`（或簡寫 `border`） |
| `input` | `--input` | `border-input` / `bg-input` |
| `ring` | `--ring` | `ring-ring` |
| `chart-1~5` | `--chart-1~5` | `bg-chart-1~5` / `fill-chart-1~5`（Chart 元件用） |
| `sidebar` / `sidebar-foreground` | `--sidebar` / `--sidebar-foreground` | `bg-sidebar` / `text-sidebar-foreground` |
| `sidebar-primary` / `sidebar-primary-foreground` | `--sidebar-primary` / `--sidebar-primary-foreground` | `bg-sidebar-primary` / `text-sidebar-primary-foreground` |
| `sidebar-accent` / `sidebar-accent-foreground` | `--sidebar-accent` / `--sidebar-accent-foreground` | `bg-sidebar-accent` / `text-sidebar-accent-foreground` |
| `sidebar-border` | `--sidebar-border` | `border-sidebar-border` |
| `sidebar-ring` | `--sidebar-ring` | `ring-sidebar-ring` |

> 複合值（z-index、breakpoint、container query、banner aspect-ratio、gradient、shadow）不在 Figma Variables 中，請參考 `design-system/design-tokens-reference.md`。

## Critical Rules

These rules are **always enforced**. Each links to a file with Incorrect/Correct code pairs.

### Styling & Tailwind → [styling.md](./rules/styling.md)

- **`className` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`. For vertical stacks, `flex flex-col gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`, `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal ternaries.
- **No manual `z-index` on overlay components.** Dialog, Sheet, Popover, etc. handle their own stacking.

### Forms & Inputs → [forms.md](./rules/forms.md)

- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*` or `grid gap-*` for form layout.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.** Never raw `Input`/`Textarea` inside `InputGroup`.
- **Buttons inside inputs use `InputGroup` + `InputGroupAddon`.**
- **Option sets (2–7 choices) use `ToggleGroup`.** Don't loop `Button` with manual active state.
- **`FieldSet` + `FieldLegend` for grouping related checkboxes/radios.** Don't use a `div` with a heading.
- **Field validation uses `data-invalid` + `aria-invalid`.** `data-invalid` on `Field`, `aria-invalid` on the control. For disabled: `data-disabled` on `Field`, `disabled` on the control.

### Component Structure → [composition.md](./rules/composition.md)

- **Items always inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`. `CommandItem` → `CommandGroup`.
- **Use `asChild` (radix) or `render` (base) for custom triggers.** Check `base` field from `npx shadcn@latest info`. → [base-vs-radix.md](./rules/base-vs-radix.md)
- **Dialog, Sheet, and Drawer always need a Title.** `DialogTitle`, `SheetTitle`, `DrawerTitle` required for accessibility. Use `className="sr-only"` if visually hidden.
- **Use full Card composition.** `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`. Don't dump everything in `CardContent`.
- **Button has no `isPending`/`isLoading`.** Compose with `Spinner` + `data-icon` + `disabled`.
- **`TabsTrigger` must be inside `TabsList`.** Never render triggers directly in `Tabs`.
- **`Avatar` always needs `AvatarFallback`.** For when the image fails to load.

### Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

- **Use existing components before custom markup.** Check if a component exists before writing a styled `div`.
- **Callouts use `Alert`.** Don't build custom styled divs.
- **Empty states use `Empty`.** Don't build custom empty state markup.
- **Toast via `sonner`.** Use `toast()` from `sonner`.
- **Use `Separator`** instead of `<hr>` or `<div className="border-t">`.
- **Use `Skeleton`** for loading placeholders. No custom `animate-pulse` divs.
- **Use `Badge`** instead of custom styled spans.

### Icons → [icons.md](./rules/icons.md)

- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"` or `data-icon="inline-end"` on the icon.
- **No sizing classes on icons inside components.** Components handle icon sizing via CSS. No `size-4` or `w-4 h-4`.
- **Pass icons as objects, not string keys.** `icon={CheckIcon}`, not a string lookup.

### CLI

- **Never decode preset codes or build preset URLs manually.** Use `npx shadcn@latest preset decode <code>`, `preset url <code>`, or `preset open <code>`. For project-aware preset detection, use `npx shadcn@latest preset resolve`.
- **Apply preset codes directly with the CLI.** Use `npx shadcn@latest apply <code>` for existing projects, or `npx shadcn@latest init --preset <code>` when initializing.

## Key Patterns

These are the most common patterns that differentiate correct shadcn/ui code. For edge cases, see the linked rule files above.

```tsx
// Form layout: FieldGroup + Field, not div + Label.
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>

// Validation: data-invalid on Field, aria-invalid on the control.
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldDescription>Invalid email.</FieldDescription>
</Field>

// Icons in buttons: data-icon, no sizing classes.
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// Spacing: gap-*, not space-y-*.
<div className="flex flex-col gap-4">  // correct
<div className="space-y-4">           // wrong

// Equal dimensions: size-*, not w-* h-*.
<Avatar className="size-10">   // correct
<Avatar className="w-10 h-10"> // wrong

// Status colors: Badge variants or semantic tokens, not raw colors.
<Badge variant="secondary">+20.1%</Badge>    // correct
<span className="text-emerald-600">+20.1%</span> // wrong
```

## Component Selection

| Need                       | Use                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| Button/action              | `Button` with appropriate variant                                                                   |
| Form inputs                | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` |
| Toggle between 2–5 options | `ToggleGroup` + `ToggleGroupItem`                                                                   |
| Data display               | `Table`, `Card`, `Badge`, `Avatar`                                                                  |
| Navigation                 | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination`                                     |
| Overlays                   | `Dialog` (modal), `Sheet` (side panel), `Drawer` (bottom sheet), `AlertDialog` (confirmation)       |
| Feedback                   | `sonner` (toast), `Alert`, `Progress`, `Skeleton`, `Spinner`                                        |
| Command palette            | `Command` inside `Dialog`                                                                           |
| Charts                     | `Chart` (wraps Recharts)                                                                            |
| Layout                     | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`, `Collapsible`                          |
| Empty states               | `Empty`                                                                                             |
| Menus                      | `DropdownMenu`, `ContextMenu`, `Menubar`                                                            |
| Tooltips/info              | `Tooltip`, `HoverCard`, `Popover`                                                                   |

## Key Fields

The injected project context contains these key fields:

- **`aliases`** → use the actual alias prefix for imports (e.g. `@/`, `~/`), never hardcode.
- **`isRSC`** → when `true`, components using `useState`, `useEffect`, event handlers, or browser APIs need `"use client"` at the top of the file. Always reference this field when advising on the directive.
- **`tailwindVersion`** → `"v4"` uses `@theme inline` blocks; `"v3"` uses `tailwind.config.js`.
- **`tailwindCssFile`** → the global CSS file where custom CSS variables are defined. Always edit this file, never create a new one.
- **`style`** → component visual treatment (e.g. `nova`, `vega`).
- **`base`** → primitive library (`radix` or `base`). Affects component APIs and available props.
- **`iconLibrary`** → determines icon imports. Use `lucide-react` for `lucide`, `@tabler/icons-react` for `tabler`, etc. Never assume `lucide-react`.
- **`resolvedPaths`** → exact file-system destinations for components, utils, hooks, etc.
- **`framework`** → routing and file conventions (e.g. Next.js App Router vs Vite SPA).
- **`packageManager`** → use this for any non-shadcn dependency installs (e.g. `pnpm add date-fns` vs `npm install date-fns`).
- **`preset`** → resolved preset code and values for the current project. Use `npx shadcn@latest preset resolve --json` when you only need preset information.

See [cli.md — `info` command](./cli.md) for the full field reference.

## Component Docs, Examples, and Usage

Run `npx shadcn@latest docs <component>` to get the URLs for a component's documentation, examples, and API reference. Fetch these URLs to get the actual content.

```bash
npx shadcn@latest docs button dialog select
```

**When creating, fixing, debugging, or using a component, always run `npx shadcn@latest docs` and fetch the URLs first.** This ensures you're working with the correct API and usage patterns rather than guessing.

## Workflow

1. **Get project context** — already injected above. Run `npx shadcn@latest info` again if you need to refresh.
2. **Check installed components first** — before running `add`, always check the `components` list from project context or list the `resolvedPaths.ui` directory. Don't import components that haven't been added, and don't re-add ones already installed.
3. **Find components** — `npx shadcn@latest search`.
4. **Get docs and examples** — run `npx shadcn@latest docs <component>` to get URLs, then fetch them. Use `npx shadcn@latest view` to browse registry items you haven't installed. To preview changes to installed components, use `npx shadcn@latest add --diff`.
5. **Install or update** — `npx shadcn@latest add`. When updating existing components, use `--dry-run` and `--diff` to preview changes first (see [Updating Components](#updating-components) below).
6. **Fix imports in third-party components** — After adding components from community registries (e.g. `@bundui`, `@magicui`), check the added non-UI files for hardcoded import paths like `@/components/ui/...`. These won't match the project's actual aliases. Use `npx shadcn@latest info` to get the correct `ui` alias (e.g. `@workspace/ui/components`) and rewrite the imports accordingly. The CLI rewrites imports for its own UI files, but third-party registry components may use default paths that don't match the project.
7. **Review added components** — After adding a component or block from any registry, **always read the added files and verify they are correct**. Check for missing sub-components (e.g. `SelectItem` without `SelectGroup`), missing imports, incorrect composition, or violations of the [Critical Rules](#critical-rules). Also replace any icon imports with the project's `iconLibrary` from the project context (e.g. if the registry item uses `lucide-react` but the project uses `hugeicons`, swap the imports and icon names accordingly). Fix all issues before moving on.
8. **Registry must be explicit** — When the user asks to add a block or component, **do not guess the registry**. If no registry is specified (e.g. user says "add a login block" without specifying `@shadcn`, `@tailark`, etc.), ask which registry to use. Never default to a registry on behalf of the user.
9. **Switching presets** — Ask the user first: **overwrite**, **partial**, **merge**, or **skip**?
   - **Inspect current preset**: `npx shadcn@latest preset resolve`. Use `--json` when you need structured values.
   - **Inspect incoming preset**: `npx shadcn@latest preset decode <code>`. Use `preset url <code>` or `preset open <code>` to share or open the preset builder.
   - **Overwrite**: `npx shadcn@latest apply <code>`. Overwrites detected components, fonts, and CSS variables.
   - **Partial**: `npx shadcn@latest apply <code> --only theme,font`. Updates only the selected preset parts without reinstalling UI components. Supported values are `theme` and `font`; comma-separated combinations are allowed. `icon` is intentionally not supported, because icon changes may require full component reinstall and transforms.
   - **Merge**: `npx shadcn@latest init --preset <code> --force --no-reinstall`, then run `npx shadcn@latest info` to list installed components, then for each installed component use `--dry-run` and `--diff` to [smart merge](#updating-components) it individually.
   - **Skip**: `npx shadcn@latest init --preset <code> --force --no-reinstall`. Only updates config and CSS, leaves components as-is.
   - **Important**: Always run preset commands inside the user's project directory. `apply` only works in an existing project with a `components.json` file. The CLI automatically preserves the current base (`base` vs `radix`) from `components.json`. If you must use a scratch/temp directory (e.g. for `--dry-run` comparisons), pass `--base <current-base>` explicitly — preset codes do not encode the base.

## Updating Components

When the user asks to update a component from upstream while keeping their local changes, use `--dry-run` and `--diff` to intelligently merge. **NEVER fetch raw files from GitHub manually — always use the CLI.**

1. Run `npx shadcn@latest add <component> --dry-run` to see all files that would be affected.
2. For each file, run `npx shadcn@latest add <component> --diff <file>` to see what changed upstream vs local.
3. Decide per file based on the diff:
   - No local changes → safe to overwrite.
   - Has local changes → read the local file, analyze the diff, and apply upstream updates while preserving local modifications.
   - User says "just update everything" → use `--overwrite`, but confirm first.
4. **Never use `--overwrite` without the user's explicit approval.**

## Quick Reference

```bash
# Create a new project.
npx shadcn@latest init --name my-app --preset base-nova
npx shadcn@latest init --name my-app --preset a2r6bw --template vite

# Create a monorepo project.
npx shadcn@latest init --name my-app --preset base-nova --monorepo
npx shadcn@latest init --name my-app --preset base-nova --template next --monorepo

# Initialize existing project.
npx shadcn@latest init --preset base-nova
npx shadcn@latest init --defaults  # shortcut: --template=next --preset=nova (base style implied)

# Apply a preset to an existing project.
npx shadcn@latest apply a2r6bw
npx shadcn@latest apply a2r6bw --only theme
npx shadcn@latest apply a2r6bw --only font
npx shadcn@latest apply a2r6bw --only theme,font

# Inspect preset codes and project preset state.
npx shadcn@latest preset decode a2r6bw
npx shadcn@latest preset url a2r6bw
npx shadcn@latest preset open a2r6bw
npx shadcn@latest preset resolve
npx shadcn@latest preset resolve --json

# Add components.
npx shadcn@latest add button card dialog
npx shadcn@latest add @magicui/shimmer-button
npx shadcn@latest add --all

# Preview changes before adding/updating.
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff button.tsx
npx shadcn@latest add @acme/form --view button.tsx

# Search registries.
npx shadcn@latest search @shadcn -q "sidebar"
npx shadcn@latest search @tailark -q "stats"

# Get component docs and example URLs.
npx shadcn@latest docs button dialog select

# View registry item details (for items not yet installed).
npx shadcn@latest view @shadcn/button
```

**Named presets:** `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`
**Templates:** `next`, `vite`, `start`, `react-router`, `astro` (all support `--monorepo`) and `laravel` (not supported for monorepo)
**Preset codes:** Version-prefixed base62 strings (e.g. `a2r6bw` or `b0`), from [ui.shadcn.com](https://ui.shadcn.com).

## Detailed References

- [rules/forms.md](./rules/forms.md) — FieldGroup, Field, InputGroup, ToggleGroup, FieldSet, validation states
- [rules/composition.md](./rules/composition.md) — Groups, overlays, Card, Tabs, Avatar, Alert, Empty, Toast, Separator, Skeleton, Badge, Button loading
- [rules/icons.md](./rules/icons.md) — data-icon, icon sizing, passing icons as objects
- [rules/styling.md](./rules/styling.md) — Semantic colors, variants, className, spacing, size, truncate, dark mode, cn(), z-index
- [rules/base-vs-radix.md](./rules/base-vs-radix.md) — asChild vs render, Select, ToggleGroup, Slider, Accordion
- [cli.md](./cli.md) — Commands, flags, presets, templates
- [customization.md](./customization.md) — Theming, CSS variables, extending components

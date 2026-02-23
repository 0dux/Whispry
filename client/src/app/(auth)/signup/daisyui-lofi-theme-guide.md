# DaisyUI "Lofi" Theme — Color Reference Guide

The lofi theme is a **light, monochrome** theme. All primary/secondary/accent colors are shades of black/dark gray — no hues. It's minimalist & clean.

> [!IMPORTANT]
> In lofi, `primary`, `secondary`, and `accent` are all dark grays, so visual distinction comes from **weight** (size, boldness, position) — not color. The status colors (`info`, `success`, `warning`, `error`) ARE colorful.

---

## Base Colors (page backgrounds & general text)

| Color          | Actual Value          | When to Use                                                                                       |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------- |
| `base-100`     | Pure white `#FFFFFF`  | Main page background. Use: `bg-base-100`                                                          |
| `base-200`     | Light gray `#F5F5F5`  | Slightly recessed areas, card backgrounds, sidebars. Use: `bg-base-200`                           |
| `base-300`     | Medium gray `#EBEBEB` | Borders, dividers, disabled backgrounds, table stripes. Use: `bg-base-300`, `border-base-300`     |
| `base-content` | Pure black `#000000`  | Default text color on base backgrounds. Body text, headings, paragraphs. Use: `text-base-content` |

---

## Brand / Action Colors

| Color               | Actual Value                            | When to Use                                                                                                                                         |
| ------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primary`           | Very dark gray `#0D0D0D` (almost black) | **THE main action color.** CTAs, submit buttons, active nav links, focused inputs, key highlights. Use: `btn-primary`, `bg-primary`, `text-primary` |
| `primary-content`   | White `#FFFFFF`                         | Text/icons ON primary backgrounds. Auto-applied by DaisyUI on `btn-primary`, etc. Use: `text-primary-content`                                       |
| `secondary`         | Dark gray `#191919`                     | Secondary actions. "Cancel" buttons, less important actions, tags, badges, secondary nav. Use: `btn-secondary`, `bg-secondary`                      |
| `secondary-content` | White `#FFFFFF`                         | Text/icons ON secondary backgrounds.                                                                                                                |
| `accent`            | Dark gray `#262626`                     | Visual highlights, decorative elements, tooltips, chips, hover states, tertiary actions. Use: `btn-accent`, `bg-accent`                             |
| `accent-content`    | White `#FFFFFF`                         | Text/icons ON accent backgrounds.                                                                                                                   |
| `neutral`           | Black `#000000`                         | Footers, navbars, dark sections, modal overlays. The darkest UI element. Use: `bg-neutral`, `btn-neutral`                                           |
| `neutral-content`   | White `#FFFFFF`                         | Text/icons ON neutral backgrounds.                                                                                                                  |

---

## Status / Feedback Colors

| Color     | Actual Value            | When to Use                                                                                                                     |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `info`    | Light blue `#6FB9E5`    | Informational alerts, help tooltips, "i" icons. Use: `alert-info`, `badge-info`                                                 |
| `success` | Light green `#6EE2A1`   | Success messages, "saved" confirmations, progress complete, valid inputs. Use: `alert-success`, `badge-success`                 |
| `warning` | Yellow/orange `#E2C86E` | Warning messages, "are you sure?" prompts, expiring sessions. Use: `alert-warning`, `badge-warning`                             |
| `error`   | Red/coral `#E26E6E`     | Error messages, form validation failures, destructive actions ("Delete account"). Use: `alert-error`, `btn-error`, `text-error` |

---

## Quick Rules of Thumb

1. **Page background** → `bg-base-100` (or `bg-base-200` for sections)
2. **Cards / containers** → `bg-base-200` with `border-base-300`
3. **Body text** → `text-base-content` (auto on base backgrounds)
4. **Main CTA buttons** → `btn-primary` (e.g. "Sign Up", "Submit")
5. **Secondary buttons** → `btn-secondary` (e.g. "Cancel", "Back")
6. **Links / highlights** → `text-primary` or `text-accent`
7. **Input borders** → `border-base-300`, `focus:border-primary`
8. **Navbar / Footer** → `bg-neutral text-neutral-content`
9. **Validation errors** → `text-error` or `alert-error`
10. **Success feedback** → `text-success` or `alert-success`

---

## Form Element Classes (for this signup page)

| Element       | DaisyUI Classes                                                     |
| ------------- | ------------------------------------------------------------------- |
| Labels        | `text-base-content` (default body text, black in lofi)              |
| Inputs        | `input input-bordered` (auto `border-base-300`, focus uses primary) |
| Submit button | `btn btn-primary` ("Sign Up" — main CTA)                            |
| Cancel button | `btn btn-secondary` or `btn btn-ghost`                              |
| Error text    | `text-error` (red — for validation messages)                        |
| Success text  | `text-success` (green — for "account created!")                     |
| Links         | `link link-primary` ("Already have an account? Log in")             |

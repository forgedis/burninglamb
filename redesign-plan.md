# Redesign Plan — Approach section + new blocks

## Summary of changes (Old → New design)

Based on Figma file: `https://figma.com/design/J55ycJ6BkNEU7gTZy7uFpH/Untitled`

---

## 1. `Approach.js` — section changes

### Remove
- The **photo/image block** (`approach-image` div with `approach-bg.jpg` and services overlay) is removed entirely
- The **bio paragraph** ("I'm a 26-year-old Designer...") is removed from the top-right of the title grid
- The "How will we work together?" subtitle text is removed

### Swap / Move
- The **collaboration paragraph** ("The design process is built on continuous collaboration...") moves **up** — it now sits directly next to the "APPROACH" title (top-right position)

### Typography from Figma
- **"Approach" title**: `font-heading` (Dirtyline), 42px, lowercase, tracking 0.84px, color `#fbf7f0` (light cream)
- **Collaboration paragraph**: `font-['Darker_Grotesque:Medium']`, 18px, leading 1.2, color `#fbf7f0`

### Result structure
```
[APPROACH title (42px, Dirtyline)]     [The design process paragraph (18px, Darker Grotesque)]
[phases list: Brief / Ideation / Concepting / Feedback / Final Delivery]
```

---

## 2. New component: `PromoSection.js` (after Approach phases)

Orange background interactive/promo block placed **between Approach phases and the Launch section**.

### Visual elements from Figma
- **Background**: Full-width orange `#f04823` (rectangle 0:1012, width 1440px, height 1028px)
- **Image collage** (0:1061): 4 overlapping screenshots on the left side
  - Images positioned with slight diagonal offset (staggered)
  - Each image: ~349px width, ~190px height, rounded corners
  - Screenshot sources (from Figma, will need local versions):
    - `Screenshot 2026-03-24 at 17.09.57 1`
    - `Screenshot 2026-03-24 at 17.03.58 1`
    - `Screenshot 2026-03-24 at 16.52.55 1`
    - `Screenshot 2026-03-24 at 16.53.50 1`
- **Text** (0:1060): centered, black text on orange
  - "Web design tailored to your needs"
  - Font: `Dirtyline_36Daysoftype_2022:Regular`
  - Size: 100px, leading 0.9, lowercase, tracking 2px, text-center
- **CTA button** (0:1059): `TELL US MORE →`
  - Background: black
  - Text: orange `#f04823`
  - Font: Dirtyline, 34px, lowercase
  - Width: 388px, height: 84px, rounded corners
  - Arrow icon on the right

### Layout from Figma
- Section starts at y=5554, height 1028px
- Images on left (x=83 to x=781 range)
- Text centered (x=401, y=5942, width 639)
- Button centered below text (x=526, y=6253)

### Notes
- Images: will need to replace Figma screenshots with actual project images from `/public/images/`
- CTA href: TBD (user to confirm — likely scrolls to form below)

---

## 3. Rework `BigButton` "Launch your project" → `LaunchSection.js`

In the new design, the "LAUNCH YOUR PROJECT" BigButton becomes a full two-column section.

### Section background from Figma
- Black background (implied from context, white text labels)
- Section starts at y=6646

### Left column (0:1013)
- Large heading text: `launch your project`
- Font: `Dirtyline_36Daysoftype_2022:Regular`
- Size: 130px, leading none, lowercase, tracking 2.6px, color white
- Position: x=30, y=6706, width 643

### Right column — contact form (0:1014)
Form container: x=837, y=6695, width 573, height 530

**Field 1: Your data ***
- Label: "Your data *" (white text, orange asterisk)
- Input: border 0.5px solid white, rounded 8px, padding px-20 py-24
- Placeholder: "Name or Company" (gray #929292)

**Field 2: Where can we contact you? ***
- Label: "Where can we contact you? *"
- Radio options (inline): Email (selected, orange), Telegram, Whatsapp
  - Email radio: filled circle (orange `#f04823`), label text orange
  - Telegram/Whatsapp radios: empty circle (white outline), label text white
- Input below: same style as field 1, placeholder: "E-mail"

**Field 3: What are you interested in? ***
- Label: "What are you interested in? *"
- Checkbox pills (flex-wrap, gap 8px):
  - Motion design, Logo, Branding, Web Design, App Design, Development, Other
  - Style: border 0.5px solid white, rounded-full (50px), px-20 py-16, white text

**Field 4: Tell us more about your project...**
- Label: "Tell us more about your project..."
- Textarea: same style as inputs (border white, rounded 8px, px-20 py-24)
- Placeholder: "Project Details" (with 2 line breaks)

**Submit button** (0:1058)
- Background: orange `#f04823`
- Text: "Submit" (black, Dirtyline, 34px, lowercase)
- Width: 388px, height 84px, rounded 4px
- Arrow icon on right

### Typography from Figma
- Labels: `font-['Darker_Grotesque:Medium']`, 20px, white
- Inputs/textarea: 20px, placeholder gray `#929292`
- Asterisk: orange `#f04823`

### Form submission
- TBD: user to confirm endpoint (email service / API / Formspree / etc.)

---

## 4. `Footer.js` — minor text change

- **Heading**: `"Got some questions?"` → `"Contact us directly"` (0:999)
  - Font: Dirtyline, 42px, lowercase, tracking 0.84px, color `#fbf7f0`
- Social buttons: currently shows Telegram, Instagram, Dribbble → Figma shows only one social button component (0:1010)
  - Confirm if Instagram/Dribbble should be hidden or if all three should remain

---

## 5. `Services.js` section — position / removal

In the new Figma design, the Services section is **not visible between Approach and Launch**.
- Options: remove it, or move it elsewhere (hero/intro area?)
- **Confirm with user before removing**

---

## 6. `page.js` — new order

```jsx
<Intro />
<Projects />
<BigButton id="view-more-projects" ... />   // "View more projects"
<Approach />                                 // modified (no photo, swapped paragraph)
<PromoSection />                             // NEW — orange "Web Design Tailored To Your Needs"
// Services removed or repositioned
<LaunchSection />                            // replaces BigButton "Launch your project" + form
<Footer />
```

---

## 7. Design tokens from Figma

**Colors:**
- Primary orange: `#f04823` (used for buttons, accents, promo section background)
- Text light: `#fbf7f0` (cream/white-ish for headings)
- Text gray: `#929292` (for placeholders)
- Black: `#000000` (for backgrounds)
- White: `#ffffff` (for labels, borders)

**Fonts:**
- `Dirtyline_36Daysoftype_2022:Regular` — display font for headings (Approach, Web design tailored, launch your project, Submit)
- `Darker_Grotesque:Medium` — body font for paragraphs, labels, form text

---

## 8. Animations (to be specified by user)

User will provide animation spec. Potential candidates:
- Approach paragraph text: fade-in / slide-in on scroll
- Phases list: staggered reveal per row (with hover effect showing orange background as in Figma)
- PromoSection text: large text word-by-word entrance
- PromoSection images: parallax or staggered slide-in
- Form fields: stagger fade-in
- "LAUNCH YOUR PROJECT" title: character-by-character or line-by-line reveal

Currently using **AOS** (`aos` package). May need **GSAP** or **Framer Motion** for more complex animations.

---

## Open questions for user

1. What should the `TELL US MORE →` button link to? (scroll to form? external link?)
2. Which project images to use in the PromoSection collage? (Figma has placeholder screenshots)
3. Should the Services section be removed or relocated?
4. Form submission: what backend/service? (Formspree, custom API, etc.)
5. Footer social buttons: keep all three or just Telegram?
6. Animation library preference: keep AOS, switch to GSAP, or add Framer Motion?

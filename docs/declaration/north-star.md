# Serina's Blog — North Star

| | |
|---|---|
| description | Serina's Blog's north star — testable outcome declarations from the user's perspective |
| tags | serinas-blog, north-star, outcomes, declarations |
| audience | human 70 / agent 30 |
| purpose | north-star, 100 |

---

Her husband opens Serina's Blog on his phone after dinner, curious what Serina has been making this week. A short hello sits at the top — who she is, what she makes, why this place exists — followed by a quiet **"this week"** strip: today's mood, a quote she's holding close (this week: *BRAVING*, Brené Brown), and what she's been listening to. Three small windows follow: a resin piece she's proud of, the first line of a story she's writing, a photo of somewhere she went last week. A table of contents names the rooms she can wander into — Writing, Art, Code, Travel & Food, Neurodivergent. He taps the heart on the resin piece, follows the story-window into the Writing room, reads the new post, and closes the tab feeling like he's spent a few minutes with her. Nothing crowded him. Nothing flashed. The page breathed.

This is what Serina's Blog must let him do. The declarations below are the testable form of that experience. A design that serves a declaration is justified. One that does not needs a reason.

---

## Declarations

### Arrival and first impression

1. A first-time visitor can identify who Serina is, what she does, and what the blog is about within the first thirty seconds on the home page — without scrolling beyond one phone screen.
2. The home page shows what Serina is "currently" in a single glance — today's mood, the quote she's holding close this week, and what she's been listening to — without requiring a tap.
3. Within ten seconds of landing, a visitor can see three pieces of recent work across different mediums (a piece of art, a snippet of writing, a photo from somewhere she's been) and tap into the one that calls to them.
4. The five rooms — Writing, Art, Code, Travel & Food, Neurodivergent — are visible on the home page without scrolling on a standard phone, named clearly enough that no visitor wonders what's inside any of them.
5. A first-time visitor can leave the home page in under a minute with a clear sense of what kind of person made this site, even if they don't read a single post.
6. The home page does not change layout based on time of day, recent activity, or visitor identity — every visitor sees the same calm structure in the same place.

### Accessibility and quiet design

**Section promise:** *The site does not trigger anything or hurt anyone.*

1. A reader landing on the home page knows what the site is and where the main rooms are within the first phone-screen, without scrolling, without parsing decoration.
2. Every post and page reads comfortably one-handed on a phone — strong contrast, comfortable line length, tap targets large enough not to fumble.
3. Nothing on the site moves on its own, with one deliberate exception: a single, slow, low-contrast ambient glow may drift behind the home-page masthead. It is decorative, hidden from assistive tech, honours reduced-motion (going still when motion is turned down), never flashes, and is the only self-starting motion anywhere on the site. Beyond it: no auto-playing video, no fading banners, no rotating carousels, no scroll-jacking. *The page still breathes.*
4. The site honours the reader's reduced-motion setting — when their phone has motion turned down, decorative transitions go quiet.
5. Typography respects dyslexia-aware defaults — clear sans-serif body, line height of 1.6 or more, no italic body text, no full justification.
6. No information is carried by colour alone, and meaningful colour pairings are checked against common forms of colour-blindness (protanopia, deuteranopia, tritanopia).
7. Navigation lives in the same place on every page. A reader who has been to one room can find any other room without thinking.
8. A reader can spend twenty quiet minutes on the site without sensory fatigue — no element competes for attention, no two animations run at once, no sounds play unless the reader started them.
9. Calm, never oppressive colours. Muted, low-saturation palette where decoration is concerned; strong contrast reserved for text and meaningful interactive states. No jewel-tone neons clashing, no harsh red-on-green pairings, nothing that pulses or vibrates against an adjacent colour.
10. Nothing flashes. No element flashes, flickers, or strobes; nothing transitions faster than three times per second. The site meets the WCAG seizure-safety threshold.

### Reading and going deeper

1. A reader can tap any teaser on the home page and arrive at the full post or piece in under one second on a typical phone connection.
2. Every post reads straight through on a phone without horizontal scrolling, pinch-zooming, or hidden text that requires interaction to reveal.
3. From any post or section page, a reader can return to the room it belongs to, or to the home page, in one tap from a fixed location.
4. Each room (Writing, Art, Code, Travel & Food, Neurodivergent) shows its posts in reverse chronological order, with the date of each post visible without hovering or tapping.
5. The Writing room contains a single clear door into the Where Petals Fall universe (serinas-universe). A reader who chooses to step through knows they are leaving the blog and entering the world bible — no surprise teleport.
6. Older posts remain reachable. Archives are not hidden behind effort — no infinite scroll that loses position, no "load more" that costs ten taps to reach a post from a year ago.
7. A reader can read any post without creating an account, dismissing a popup, or being interrupted by a "subscribe" overlay.

### Appreciation, not noise

1. A reader can express appreciation for any post or featured piece with a single tap — a heart — without needing an account, identity, or login.
2. Heart counts are not a popularity metric. There is no "most-popular" sort, no "trending" page, no algorithmic prominence based on reactions. Hearts are quiet appreciation, not currency.
3. The site has no public comments section, and the absence is not labelled, apologised for, or framed as "comments coming soon" — it simply isn't a place where comments live.
4. The site has no newsletter signup, no "subscribe" button, no follow prompt, no email capture, no exit-intent popup. Readers who want to come back, come back.
5. Sharing a post uses the reader's phone-native share sheet — no custom social-media share buttons, no tracking pixels carried by sharing.

### Protecting the work

**Section promise:** *Serina's creative work remains hers. The site does everything reasonable to prevent silent theft and commercial reuse.*

1. Every piece of original creative work carries a clear copyright notice — "© Serina McFall, all rights reserved" — and a usage policy: use requires Serina's permission; she decides case-by-case (free use, paid licence, or no). No use is granted by default.
2. No high-resolution master images are served from the public site. Every image is downsampled to web-display quality; full-resolution masters live offline. A scraper that pulls an image walks away with a screen-quality copy, never print-quality.
3. Every original artwork is visibly attributed — a signature, mark, or integrated watermark that survives cropping, recompression, and basic editing — so it cannot be cleanly presented as someone else's.
4. AI training crawlers are explicitly opted out. The site's `robots.txt` and per-page meta tags signal `noai`, `noimageai`, and refuse known AI-training user agents (GPTBot, ClaudeBot, Google-Extended, CCBot, anthropic-ai, Bytespider, and the list as it grows).
5. Hot-linking is blocked. An image embedded on another site by URL alone does not load — the asset server returns a placeholder or a "see this image on Serina's Blog" replacement.
6. A reader who wants to license a piece can find the usage policy in one tap from any artwork — not buried in a footer.

### Keeping it alive (the publishing workflow)

1. Writing a new post means opening her editor, creating a markdown file, adding text and images, saving. No separate publishing tool, no admin UI, no logging in.
2. Publishing is a single `git push`. There is no manual deploy step, no "build and copy files" ritual, no FTP, no clicking "publish" in a dashboard.
3. Updating the mood line, Quote of the Week, or Currently listening takes under thirty seconds — edit one file, save, push.
4. A post can include images by dropping the file beside the markdown and referencing it by name. No upload-to-CDN ceremony, no separate image-management screen.
5. The site builds and deploys without manual steps. Once she pushes, the live site reflects the change within a few minutes.
6. Drafts are possible. She can write a post and choose when it goes live without it appearing on the live site in the meantime.
7. Her spelling is her business. Any spellcheck happens in her editor at her invitation; the site itself never publicly flags typos or "corrects" anything she wrote.
8. Past posts can be edited without breaking links. Fixing a typo or rewriting a paragraph doesn't change the post's URL — bookmarks and shared links keep working.

### Identity and voice

1. The visual language is consistent with the Where Petals Fall universe — xianxia-meets-watercolour, soft teals, dusty pinks, moonlight, lanterns, cherry blossoms. The blog and the universe feel like rooms in the same house.
2. Nothing on the site is ever offensive. Every post, image, quote, and embedded piece of media is content Serina would be comfortable showing her children, her parents, and a stranger from a community she cares about. No slurs, no demeaning content, no punching-down humour, no content that ages badly.
3. The writing sounds like Serina, not like a polished marketing brand. First-person where it fits, casual where it fits, vulnerable where it fits. The voice is BRAVING — brave, real, generous, non-performative.
4. Neurodivergent identity is present, not hidden. The Neurodivergent room is named plainly, not euphemised. AuDHD writing sits alongside art and travel — it's part of who Serina is, not a separate "issues" category.
5. The site shows what Serina is actually doing, not a curated highlight reel. A "currently making" line is welcome; "10 productivity hacks I learned" is not.
6. The site does not perform. No "thrilled to announce", no LinkedIn-style achievement broadcasting, no humble-brag — updates are sharing, not announcing.
7. Decorative imagery supports the voice, never overwhelms it. A single cherry blossom in the background can drift in quietly; ten cherry blossoms in motion would not.
8. Trust is shown, not claimed. The site doesn't advertise its own values — no "authentic", "real", or "honest" badges. The absence of dark patterns is the proof.

---

## What We Won't Accept

1. Popups, modals, overlays, or content walls that interrupt reading — including newsletter signups, exit-intent prompts, age gates the law doesn't require, and cookie banners beyond the legal minimum.
2. Auto-playing media. No video, audio, GIFs, or animation that begins without the reader's tap — except the single ambient masthead glow permitted in Accessibility & quiet design #3, which is decorative, reduced-motion-aware, and non-flashing.
3. Public comments, in any form. Not "coming soon", not gated, not moderated-but-open. The absence *is* the policy.
4. Newsletter signup, email capture, "subscribe" buttons, or follow prompts. RSS is acceptable (pull, not push); push channels are not.
5. Custom social-media share buttons that load third-party tracking scripts. Only the phone-native share sheet.
6. Third-party advertisements, sponsored content, affiliate links, or income-disclosure footers. The site does not exist to extract money from a reader's attention.
7. Urgency, scarcity, pressure, or startle design — no countdown timers, no "only 3 left", no fake-personalisation, no flashing CTAs, no scroll-jacking, no notification-style alerts faked into the page.
8. Dark patterns of any kind — consent-bait, "are you sure?" badgering, hostile unsubscribe flows, confused-consent dialogs.
9. Offensive content, ever. No slurs, no demeaning material, no punching-down humour, no content that ages badly. Not in posts, not in quotes, not in embedded media.
10. High-resolution master images on public URLs. Web-display quality only.
11. Hot-linkable images. External embedding by URL alone returns a placeholder, not the asset.
12. Quiet access for AI-training crawlers. GPTBot, ClaudeBot, CCBot, Google-Extended, anthropic-ai, Bytespider, and named successors are explicitly refused.
13. Breaking URLs. Editing a post never changes its address.
14. Performative marketing voice — no "thrilled to announce", no LinkedIn-style achievement broadcasting, no humble-bragging, no faux-modesty.
15. The site advertising its own values. No "authentic", "honest", "accessible", or "trauma-informed" badges. The proof is the absence of the things above, not the claim.

---

## How to Use This Document

This north star is the evaluation target for designs and plans across all of Serina's Blog. Every design decision should be traceable to one or more declarations above. A design that serves a declaration is justified. A design that doesn't needs a reason above.

When a declaration here conflicts with a design proposal, the declaration wins or the declaration is amended explicitly — not silently superseded.

When the product diverges from a declaration in production, that is a bug or a north-star revision. It is never "the way it ended up working."

---

## Acknowledged gaps in v1

*A design that doesn't serve a declaration needs a reason. These are the v1 gaps and their reasons.*

- **Appreciation #1 (heart reactions):** Not implemented in v1. **Reason:** the persistence layer requires backend code Serina hasn't yet learned (Dev Academy Unit 04 — Express Server and JSON APIs). The feature lands in v2, built by Serina herself when she can build the backend with full understanding. Choosing this over a third-party service preserves the "no third-party tracking" stance.
- **Protecting #6 contact path / Won't Accept friction:** The art-licensing usage policy says "ask Serina" but the contact channel is a placeholder in v1. **Reason:** Serina's choice of "minimal disturbance" requires careful thought about which channel; deferred to v2 when the right async, batchable channel can be chosen. The placeholder names the limitation honestly.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New works in the Recent Work grid: Madame Kim (2024), Diamond Whales (2025), and Life Changing Care (2024).

## [2026.07.27] - 2026-07-27

### Fixed
- Resolved all unresolved git merge conflict markers left in `index.html` (work experience, footer, and WhatsApp link sections).
- Fixed missing closing `</div>` in the case-study popup markup.

## [2026.08.08] - 2026-08-08

### Performance
- Split inline CSS and JavaScript into separate `styles.css` and `script.js` files for maintainability and caching.
- Converted all 77 PNG images to WebP (~91% reduction: 46.9 MB → 4.4 MB).
- Added `loading="lazy"` + `decoding="async"` to below-the-fold images (client marquee, recent work).
- Added `fetchpriority="high"` to the first featured-work image.
- Removed the unused Space Mono font and trimmed Instrument Sans to the weights actually used (`400;500;600;700`).

### Added
- Meta description, Open Graph tags, and theme-color for social sharing.
- SVG favicon.
- `@media (prefers-reduced-motion: reduce)` support that collapses scroll animations for accessibility.
- `.gitignore` entries for `.DS_Store`, `.gdoc` files, and `node_modules`.

### Changed
- Untracked `.DS_Store` files from the repository.

### Removed
- Original PNG source files after WebP conversion.
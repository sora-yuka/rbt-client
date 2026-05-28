## The easy way to pick UI colors

#### The rule for background lightness is driven by depth: elements that are physically closer to the user hit by light must be lighter (darker in case of light theme).

- Dark mode setup:
    - --bg-dark: (Base Background): Set this to the absolute lowes lightness (e.g., 0% to 5%).
    - --bg (Card/Surfaces): Step the lightness up slightly (e.g., 5%) so it sits on top of the base.
    - --bg-light (Raised/Important Elements): Set to the highest lightess of your background shades (e.g., 10%) to make if feel closest to the user.

For light mode flip the values starting with 90%

#### The rule for text lightness is driven by contrast without harshness. You want high legibility, but you must avoid straining the user's eyes.

- --text (Headings/Important text): Use a high-contrast shade, but never use 100% white in dark mode (or 0% black in light mode) as it is too harsh. Pick a sharp but slightly softened value (e.g., 90% lightness in dark mode).
- --text-muted (Body text): Drop the lightness down further (e.g., 70% lightness in dark mode). This ensures it remains fully legible but sits softly in the background layout, keeping it "out of your face".

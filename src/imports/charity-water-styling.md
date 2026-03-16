Brand Styling (Based on charity: water)
4
Primary Colors

💛 Yellow: #FFC907

💙 Blue: #2E9DF7

🤍 White: #FFFFFF

🖤 Dark Text: #333333

Typography Style

Bold, friendly sans-serif

Large headers

Clean whitespace

Rounded buttons

Tone: hopeful, bright, action-driven

🧱 Wireframe Layout (Main Game Screen)
 -------------------------------------------------
| charity: water logo              Score: 12 💧  |
|------------------------------------------------|
|                                               |
|      [ 10 x 10 GAME GRID AREA ]              |
|                                               |
|   🟦 Water Source (Top Tile)                 |
|                                               |
|   🟫 Dirt Blocks (Clickable)                 |
|   ⬛ Rock Blocks (Unclickable)               |
|                                               |
|                       🟨 Village Tank        |
|                                               |
|------------------------------------------------|
|  Level 1     Release Water Button (Yellow)   |
 -------------------------------------------------
🖥 Figma Wireframe Structure
1️⃣ Header Section

Height: 80px
Background: White
Bottom border: Light gray

Left:

charity: water logo

Right:

Score counter

💧 icon next to number

2️⃣ Game Grid Container

Centered card

Width: 600px

Background: Light blue (#EAF6FF)

Rounded corners (16px)

Soft drop shadow

Grid inside:

10 x 10 squares

Each tile: 50px x 50px

4px gap

Tile Styles
Type	Color	Style
Water Source	Blue (#2E9DF7)	Animated shimmer
Dirt	Sandy beige (#E6C79C)	Clickable hover effect
Rock	Dark gray (#555)	No hover
Empty	Light blue	Path
Village Tank	Yellow (#FFC907)	Slight glow
🟡 Buttons
“Release Water” Button

Background: #FFC907

Text: Dark gray

Padding: 16px 32px

Border-radius: 50px

Hover: Slight darker yellow

📱 Start Screen Wireframe
 -----------------------------------------
|             charity: water             |
|                                         |
|        FLOW FOR GOOD                   |
|                                         |
|  Help guide clean water to a village   |
|                                         |
|      [ Start Game ] (Yellow button)    |
|                                         |
|  "771 million people lack clean water" |
 -----------------------------------------

Background:

Soft blue gradient

Subtle water wave SVG at bottom

🏆 Win Screen Wireframe
 -----------------------------------------
|         🎉 Water Reached the Village!  |
|                                         |
|  You helped provide clean water to     |
|  5 people today 💧                     |
|                                         |
|  [ Play Again ]                        |
|  [ Learn How You Can Help ]            |
 -----------------------------------------

“Learn” button links to charitywater.org

🧠 UX Interaction Flow

Player clicks dirt tiles → they disappear.

Player presses “Release Water”.

Blue animation flows downward.

If path exists → win screen.

If not → “The water couldn’t reach the village. Try again.”

🎨 Layout Sections for Figma

Create frames for:

Start Screen

Game Screen

Win Screen

Lose Modal

Mobile Version (optional)

Use:

8px spacing grid

Rounded UI

Minimal icons

Clean shadows
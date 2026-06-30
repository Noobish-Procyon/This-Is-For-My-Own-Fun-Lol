/* ============================================
   TILE-BASED MOVEMENT SYSTEM — Arcane Academy RPG
   Adds:
   - 10x10 overworld grid
   - Player movement with arrow keys
   - Zone tiles, NPC tiles, boss tiles
   - Auto-trigger events when stepping on tiles
   ============================================ */

const MAP_WIDTH = 10;
const MAP_HEIGHT = 10;

// Player starting position
let playerPos = { x: 5, y: 5 };

// Map layout (10x10 grid)
const worldMap = [
  "..........",
  "..F....E..",
  "..........",
  "...C......",
  "..........",
  "......R...",
  "..........",
  "..G.......",
  "..........",
  ".....H...."
];

/*
Legend:
F = Forest zone
C = Cave zone
R = Ruins zone
E = Elder NPC
G = Guardian NPC
H = Hydra boss
. = empty tile
*/

// Draw the tile map
function drawTileMap() {
  const mapEl = document.getElementById("map");
  mapEl.innerHTML = "";

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tile = document.createElement("div");
      tile.className = "map-tile";

      const char = worldMap[y][x];

      if (x === playerPos.x && y === playerPos.y) {
        tile.style.background = "#4f46e5";
        tile.textContent = "You";
      } else {
        tile.textContent = char === "." ? "" : char;
      }

      mapEl.appendChild(tile);
    }
    mapEl.appendChild(document.createElement("br"));
  }
}

// Handle movement
function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  // Bounds check
  if (newX < 0 || newX >= MAP_WIDTH) return;
  if (newY < 0 || newY >= MAP_HEIGHT) return;

  playerPos.x = newX;
  playerPos.y = newY;

  checkTileEvent();
  drawTileMap();
}

// Trigger events based on tile
function checkTileEvent() {
  const char = worldMap[playerPos.y][playerPos.x];

  switch (char) {
    case "F":
      startZoneBattle("forest");
      break;
    case "C":
      startZoneBattle("cave");
      break;
    case "R":
      startZoneBattle("ruins");
      break;
    case "E":
      talkTo("elder");
      break;
    case "G":
      talkTo("guardian");
      break;
    case "H":
      startBossBattle("Crystal Hydra");
      break;
    default:
      log("You walk across the land...");
  }
}

// Keyboard controls
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
});

// Export globally
window.drawTileMap = drawTileMap;
window.movePlayer = movePlayer;

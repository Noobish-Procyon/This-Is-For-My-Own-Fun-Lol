/* ============================================
   OVERWORLD MAP SYSTEM — Arcane Academy RPG
   Handles:
   - Map tiles
   - Zone selection
   - Entering battles
   - Triggering bosses
   - Triggering NPCs + quests
   ============================================ */

const mapZones = [
  { name: "Forest", id: "forest", type: "zone" },
  { name: "Cave", id: "cave", type: "zone" },
  { name: "Ruins", id: "ruins", type: "zone" },

  // NPCs
  { name: "Elder", id: "elder", type: "npc" },
  { name: "Scholar", id: "scholar", type: "npc" },
  { name: "Guardian", id: "guardian", type: "npc" },

  // Boss tile
  { name: "Hydra Lair", id: "hydra", type: "boss" }
];

// Draw map tiles
function drawMap() {
  const mapEl = document.getElementById("map");
  mapEl.innerHTML = "";

  mapZones.forEach(zone => {
    const tile = document.createElement("div");
    tile.className = "map-tile";
    tile.textContent = zone.name;

    tile.onclick = () => handleMapClick(zone);

    mapEl.appendChild(tile);
  });
}

// Handle clicking a map tile
function handleMapClick(zone) {
  if (zone.type === "zone") {
    startZoneBattle(zone.id);
  }

  if (zone.type === "npc") {
    talkTo(zone.id);
  }

  if (zone.type === "boss") {
    startBossBattle("Crystal Hydra");
  }
}

// Start a normal battle
function startZoneBattle(zoneId) {
  const enemy = spawnEnemy(zoneId);
  if (!enemy) {
    log("No enemies found.");
    return;
  }

  window.currentEnemy = enemy;

  document.getElementById("enemyName").textContent = enemy.name;
  document.getElementById("enemyHp").textContent = enemy.currentHp;

  log(`A wild ${enemy.name} appears in the ${zoneId}!`);

  generateNewQuestion();
  updateSpellList();
}

// Start a boss battle
function startBossBattle(bossName) {
  const boss = spawnBoss(bossName);
  if (!boss) {
    log("Boss not found.");
    return;
  }

  window.currentBoss = boss;

  document.getElementById("enemyName").textContent = boss.name;
  document.getElementById("enemyHp").textContent = boss.currentHp;

  log(`🔥 Boss Battle: ${boss.name} begins!`);

  generateNewQuestion();
  updateSpellList();
}

// Export globally
window.drawMap = drawMap;
window.startZoneBattle = startZoneBattle;
window.startBossBattle = startBossBattle;

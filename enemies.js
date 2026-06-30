/* ============================================
   ENEMY + BOSS SYSTEM — Arcane Academy RPG
   Handles:
   - Normal enemies
   - Elemental weaknesses
   - Bosses with phases
   - Zone-based enemy selection
   ============================================ */

// ===============================
// NORMAL ENEMIES
// ===============================
const enemyTypes = {
  forest: [
    { name: "Fire Imp", hp: 35, element: "fire", weak: "ice" },
    { name: "Leaf Sprite", hp: 30, element: "nature", weak: "fire" }
  ],

  cave: [
    { name: "Ice Golem", hp: 45, element: "ice", weak: "fire" },
    { name: "Stone Beast", hp: 50, element: "earth", weak: "arcane" }
  ],

  ruins: [
    { name: "Mind Wraith", hp: 40, element: "mind", weak: "arcane" },
    { name: "Shadow Lurker", hp: 55, element: "dark", weak: "light" }
  ]
};

// ===============================
// BOSS DEFINITIONS
// ===============================
const bosses = {
  "Crystal Hydra": {
    name: "Crystal Hydra",
    maxHp: 120,
    hp: 120,
    phase: 1,
    element: "crystal",
    weak: "arcane",

    attacks: [
      { phase: 1, dmg: 10, text: "The Hydra lashes out with crystal claws!" },
      { phase: 2, dmg: 18, text: "The Hydra unleashes a barrage of crystal beams!" },
      { phase: 3, dmg: 25, text: "The Hydra roars and shatters the ground beneath you!" }
    ]
  }
};

// ===============================
// SPAWN NORMAL ENEMY BY ZONE
// ===============================
function spawnEnemy(zoneName) {
  const zone = enemyTypes[zoneName];
  if (!zone) {
    console.error("Unknown zone:", zoneName);
    return null;
  }

  // Pick a random enemy from the zone
  const base = zone[Math.floor(Math.random() * zone.length)];

  // Deep clone so we don't modify the original
  const enemy = structuredClone(base);

  enemy.currentHp = enemy.hp;

  return enemy;
}

// ===============================
// SPAWN BOSS
// ===============================
function spawnBoss(name) {
  if (!bosses[name]) {
    console.error("Unknown boss:", name);
    return null;
  }

  const boss = structuredClone(bosses[name]);
  boss.currentHp = boss.maxHp;
  boss.phase = 1;

  return boss;
}

// ===============================
// BOSS PHASE LOGIC
// ===============================
function bossAttack(boss) {
  // Phase transitions
  if (boss.currentHp <= boss.maxHp * 0.66 && boss.phase === 1) {
    boss.phase = 2;
    log("⚠ The boss enters Phase 2!");
  }

  if (boss.currentHp <= boss.maxHp * 0.33 && boss.phase === 2) {
    boss.phase = 3;
    log("⚠ The boss enters Phase 3!");
  }

  // Find attack for current phase
  const atk = boss.attacks.find(a => a.phase === boss.phase);

  // Deal damage
  const dmg = atk.dmg;
  save.hp -= dmg;

  log(`${atk.text} It deals ${dmg} damage!`);

  updateUI();
}

// Export globally
window.enemyTypes = enemyTypes;
window.bosses = bosses;
window.spawnEnemy = spawnEnemy;
window.spawnBoss = spawnBoss;
window.bossAttack = bossAttack;

/* ============================================
   COMBAT SYSTEM — Arcane Academy RPG
   Handles:
   - Spell casting
   - Damage formulas
   - Elemental synergy
   - Enemy turns
   - Boss turns
   - Win/Lose logic
   ============================================ */

// ===============================
// SPELL LIST (with elements)
// ===============================
const spells = [
  { name: "Spark Bolt", levelReq: 1, base: 6, element: "arcane" },
  { name: "Flame Rune", levelReq: 2, base: 10, element: "fire" },
  { name: "Frost Shard", levelReq: 3, base: 14, element: "ice" },
  { name: "Logic Nova", levelReq: 4, base: 18, element: "mind" }
];

// ===============================
// ELEMENTAL SYNERGY TABLE
// ===============================
const elementalSynergy = {
  fire:     { weakTo: "water", strongAgainst: "ice" },
  ice:      { weakTo: "fire", strongAgainst: "nature" },
  nature:   { weakTo: "ice", strongAgainst: "earth" },
  earth:    { weakTo: "nature", strongAgainst: "arcane" },
  arcane:   { weakTo: "dark", strongAgainst: "mind" },
  mind:     { weakTo: "arcane", strongAgainst: "dark" },
  dark:     { weakTo: "light", strongAgainst: "arcane" },
  light:    { weakTo: "dark", strongAgainst: "shadow" },
  crystal:  { weakTo: "arcane", strongAgainst: "earth" }
};

// ===============================
// UPDATE SPELL DROPDOWN
// ===============================
function updateSpellList() {
  const sel = document.getElementById("spellSelect");
  sel.innerHTML = "";

  spells.forEach(sp => {
    if (save.level >= sp.levelReq) {
      const opt = document.createElement("option");
      opt.value = sp.name;
      opt.textContent = `${sp.name} (Lvl ${sp.levelReq})`;
      sel.appendChild(opt);
    }
  });
}

// ===============================
// GENERATE NEW QUESTION
// ===============================
function generateNewQuestion() {
  const subject = document.getElementById("subjectSelect").value;
  currentQ = generateQuestion(subject);
  document.getElementById("question").textContent = currentQ.text;
}

// ===============================
// CAST SPELL
// ===============================
function castSpell() {
  const ans = document.getElementById("answer").value.toLowerCase().trim();

  if (ans !== currentQ.answer) {
    log("Incorrect! Your spell fizzles.");
    enemyTurn();
    return;
  }

  const spellName = document.getElementById("spellSelect").value;
  const spell = spells.find(s => s.name === spellName);

  let dmg = spell.base + Math.floor(Math.random() * 4);

  // Elemental synergy
  const synergy = elementalSynergy[spell.element];
  const enemy = window.currentEnemy || window.currentBoss;

  if (enemy) {
    if (synergy && synergy.strongAgainst === enemy.element) {
      dmg *= 2;
      log(`Super effective! ${spell.name} deals double damage!`);
    }
    if (synergy && synergy.weakTo === enemy.element) {
      dmg = Math.floor(dmg * 0.5);
      log(`Not very effective... ${spell.name} is weakened.`);
    }
  }

  // Apply damage
  if (window.currentEnemy) {
    window.currentEnemy.currentHp -= dmg;
    animateEnemyHit();
    log(`Correct! You cast ${spell.name} for ${dmg} damage.`);
    document.getElementById("enemyHp").textContent = window.currentEnemy.currentHp;

    if (window.currentEnemy.currentHp <= 0) {
      winBattle();
    } else {
      enemyTurn();
    }
  }

  if (window.currentBoss) {
    window.currentBoss.currentHp -= dmg;
    animateEnemyHit();
    log(`Correct! You cast ${spell.name} for ${dmg} damage.`);
    document.getElementById("enemyHp").textContent = window.currentBoss.currentHp;

    if (window.currentBoss.currentHp <= 0) {
      winBossBattle();
    } else {
      bossTurn();
    }
  }
}

// ===============================
// ENEMY TURN
// ===============================
function enemyTurn() {
  const enemy = window.currentEnemy;
  if (!enemy) return;

  const dmg = Math.floor(Math.random() * 8) + 4;
  save.hp -= Math.max(1, dmg - save.stats.defense);

  animatePlayerHit();
  log(`${enemy.name} hits you for ${dmg} damage!`);

  updateUI();

  if (save.hp <= 0) {
    loseBattle();
  } else {
    generateNewQuestion();
  }
}

// ===============================
// BOSS TURN
// ===============================
function bossTurn() {
  const boss = window.currentBoss;
  if (!boss) return;

  bossAttack(boss); // from enemies.js

  if (save.hp <= 0) {
    loseBattle();
  } else {
    generateNewQuestion();
  }
}

// ===============================
// WIN / LOSE LOGIC
// ===============================
function winBattle() {
  log(`You defeated the ${window.currentEnemy.name}! +25 XP`);
  gainXp(25);

  if (Math.random() < 0.4) {
    addItem("Potion");
  }

  window.currentEnemy = null;
  updateUI();
  saveGame();
}

function winBossBattle() {
  log(`🔥 You defeated the boss! +200 XP`);
  gainXp(200);
  addItem("Arcane Blade");

  window.currentBoss = null;
  updateUI();
  saveGame();
}

function loseBattle() {
  log("You were defeated...");
  window.currentEnemy = null;
  window.currentBoss = null;
  updateUI();
}

// ===============================
// ANIMATIONS
// ===============================
function animateEnemyHit() {
  const el = document.getElementById("enemyHp");
  el.classList.add("enemy-hit");
  setTimeout(() => el.classList.remove("enemy-hit"), 300);
}

function animatePlayerHit() {
  const el = document.getElementById("hp");
  el.classList.add("player-hit");
  setTimeout(() => el.classList.remove("player-hit"), 300);
}

// Export globally
window.castSpell = castSpell;
window.generateNewQuestion = generateNewQuestion;
window.updateSpellList = updateSpellList;

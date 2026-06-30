/* ============================================
   SAVE SYSTEM — Arcane Academy RPG
   Handles:
   - Creating save data
   - Loading save data
   - Writing to localStorage
   - Resetting save
   ============================================ */

// Default save structure
const defaultSave = {
  hp: 60,
  maxHp: 60,
  level: 1,
  xp: 0,
  xpToNext: 40,
  gold: 50,
  inventory: ["Potion"],

  // Equipment slots
  equipment: {
    weapon: null,
    armor: null
  },

  // Base stats (modified by equipment)
  stats: {
    attack: 5,
    defense: 2
  },

  // Quest progress
  quests: {}
};

// Load save or create new one
let save = JSON.parse(localStorage.getItem("arcaneSave")) || structuredClone(defaultSave);

// Save to localStorage
function saveGame() {
  localStorage.setItem("arcaneSave", JSON.stringify(save));
}

// Reset save completely
function resetGame() {
  save = structuredClone(defaultSave);
  saveGame();
  console.log("Game reset.");
}

// Export save object for other scripts
window.save = save;
window.saveGame = saveGame;
window.resetGame = resetGame;

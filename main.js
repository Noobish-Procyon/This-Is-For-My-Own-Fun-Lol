/* ============================================
   MAIN GAME CONTROLLER — Arcane Academy RPG
   Handles:
   - Initialization
   - UI setup
   - Button wiring
   - Map loading
   - Battle start
   - Global game flow
   ============================================ */

window.onload = () => {
  console.log("Arcane Academy RPG Loaded.");

  updateStats();   // from player.js
  updateUI();      // from player.js
  drawMap();       // from map.js

  setupButtons();
};

// ===============================
// BUTTON SETUP
// ===============================
function setupButtons() {
  const castBtn = document.getElementById("castBtn");
  castBtn.onclick = () => castSpell();

  // Optional: Add inventory buttons later
}

// ===============================
// GLOBAL LOG FUNCTION
// ===============================
function log(msg) {
  document.getElementById("log").textContent = msg;
}

// ===============================
// DEBUG COMMANDS (Optional)
// ===============================
window.debug = {
  giveGold(amount = 100) {
    save.gold += amount;
    updateUI();
    saveGame();
    log(`Debug: Added ${amount} gold.`);
  },

  giveItem(item = "Potion") {
    save.inventory.push(item);
    updateUI();
    saveGame();
    log(`Debug: Added item ${item}.`);
  },

  levelUp() {
    gainXp(save.xpToNext);
    updateUI();
    saveGame();
    log("Debug: Level up!");
  }
};

// ===============================
// GAME START MESSAGE
// ===============================
log("Welcome to Arcane Academy! Choose a zone on the map to begin.");

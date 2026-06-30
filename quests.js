/* ============================================
   QUEST + NPC DIALOGUE SYSTEM — Arcane Academy RPG
   Handles:
   - Quest definitions
   - Quest progress
   - Rewards
   - NPC dialogue
   ============================================ */

// ===============================
// QUEST DEFINITIONS
// ===============================
const questList = {
  "Find the Crystal": {
    id: "Find the Crystal",
    description: "Retrieve the lost crystal from the Cave.",
    rewardGold: 50,
    rewardXp: 40,
    rewardItem: "Potion",
    completed: false
  },

  "Defeat the Hydra": {
    id: "Defeat the Hydra",
    description: "Challenge and defeat the Crystal Hydra in the Ruins.",
    rewardGold: 120,
    rewardXp: 120,
    rewardItem: "Arcane Blade",
    completed: false
  }
};

// ===============================
// NPC DIALOGUE
// ===============================
const npcDialogue = {
  elder: [
    "Welcome, apprentice.",
    "Darkness spreads across the land.",
    "Your first task: Find the Crystal.",
    "Return to me once you have it."
  ],

  scholar: [
    "Knowledge is the greatest weapon.",
    "Study well, and your spells will grow stronger."
  ],

  guardian: [
    "The Hydra sleeps within the Ruins.",
    "Only the brave dare face it."
  ]
};

// ===============================
// SHOW NPC DIALOGUE (Timed)
// ===============================
function talkTo(npcName) {
  const lines = npcDialogue[npcName];
  if (!lines) {
    log("This NPC has nothing to say.");
    return;
  }

  let i = 0;
  log(lines[i]);

  const interval = setInterval(() => {
    i++;
    if (i >= lines.length) {
      clearInterval(interval);
      return;
    }
    log(lines[i]);
  }, 1500);
}

// ===============================
// START A QUEST
// ===============================
function startQuest(questName) {
  const quest = questList[questName];
  if (!quest) {
    log("Unknown quest.");
    return;
  }

  if (save.quests[questName]?.completed) {
    log("You already completed this quest.");
    return;
  }

  save.quests[questName] = { started: true, completed: false };
  log(`Quest started: ${quest.description}`);
  saveGame();
}

// ===============================
// COMPLETE A QUEST
// ===============================
function completeQuest(questName) {
  const quest = questList[questName];
  if (!quest) {
    log("Unknown quest.");
    return;
  }

  if (!save.quests[questName]?.started) {
    log("You haven't started this quest yet.");
    return

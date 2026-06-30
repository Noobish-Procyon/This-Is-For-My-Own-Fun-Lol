/* ============================================
   ITEMS + SHOP SYSTEM — Arcane Academy RPG
   Handles:
   - Weapons
   - Armor
   - Consumables
   - Shop inventory + prices
   - Buying items
   - Adding to inventory
   - Using items (Potions)
   ============================================ */

// ===============================
// WEAPONS
// ===============================
const items = {
  weapons: [
    { name: "Wooden Wand", attack: 2 },
    { name: "Crystal Staff", attack: 5 },
    { name: "Arcane Blade", attack: 10 }
  ],

  // ===============================
  // ARMOR
  // ===============================
  armor: [
    { name: "Cloth Robe", defense: 1 },
    { name: "Mage Coat", defense: 3 },
    { name: "Astral Armor", defense: 6 }
  ],

  // ===============================
  // SHOP ITEMS
  // ===============================
  shop: {
    items: ["Potion", "Wooden Wand", "Cloth Robe"],
    prices: {
      "Potion": 20,
      "Wooden Wand": 40,
      "Cloth Robe": 35
    }
  }
};

// ===============================
// ADD ITEM TO INVENTORY
// ===============================
function addItem(itemName) {
  save.inventory.push(itemName);
  log(`You obtained: ${itemName}`);
  updateUI();
  saveGame();
}

// ===============================
// USE ITEM (Potions, etc.)
// ===============================
function useItem(itemName) {
  if (!save.inventory.includes(itemName)) {
    log("You don't have that item.");
    return;
  }

  if (itemName === "Potion") {
    save.hp = Math.min(save.maxHp, save.hp + 20);
    log("You used a Potion and restored 20 HP!");

    // Remove one potion
    const index = save.inventory.indexOf("Potion");
    save.inventory.splice(index, 1);

    updateUI();
    saveGame();
    return;
  }

  log("That item cannot be used right now.");
}

// ===============================
// BUY ITEM FROM SHOP
// ===============================
function buy(itemName) {
  const shop = items.shop;

  if (!shop.items.includes(itemName)) {
    log("This shop doesn't sell that item.");
    return;
  }

  const price = shop.prices[itemName];

  if (save.gold < price) {
    log("Not enough gold.");
    return;
  }

  save.gold -= price;
  save.inventory.push(itemName);

  log(`You bought: ${itemName} for ${price} gold.`);
  updateUI();
  saveGame();
}

// ===============================
// CHECK IF ITEM IS WEAPON OR ARMOR
// ===============================
function isWeapon(itemName) {
  return items.weapons.some(w => w.name === itemName);
}

function isArmor(itemName) {
  return items.armor.some(a => a.name === itemName);
}

// Export globally
window.items = items;
window.addItem = addItem;
window.useItem = useItem;
window.buy = buy;
window.isWeapon = isWeapon;
window.isArmor = isArmor;

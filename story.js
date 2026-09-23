/* Original adventure inspired by classic gamebooks.
   Not Lone Wolf / Project Aon content. */

window.EMBERWAKE = {
  title: "Emberwake",
  subtitle: "The Last Light of Vellhaven",
  start: "harbor",
  synonyms: {
    look: ["examine", "inspect", "search", "check", "see"],
    talk: ["speak", "ask", "question", "greet"],
    attack: ["fight", "kill", "strike", "hit", "combat", "slay"],
    run: ["flee", "escape", "leave", "retreat"],
    take: ["get", "grab", "pick", "loot", "steal"],
    buy: ["purchase", "trade", "pay"],
    help: ["aid", "save", "rescue"],
    sneak: ["hide", "stealth", "creep", "quiet"],
    north: ["forward", "ahead"],
    drink: ["sip", "use potion", "heal"],
    map: ["chart", "path"]
  },
  sections: {
    harbor: {
      title: "Vellhaven Docks",
      text: [
        "Rain needles the black water. Vellhaven’s last lanterns hiss on the pier while the ferry <em>Ashwake</em> groans against its ropes.",
        "A dockmaster with a burned cheek watches you. “The marsh road is closed. If you want the inner keep before dawn, you ride this boat — or you drown trying.”",
        "Somewhere in the fog, a bell rings once. Not a harbor bell. Something hungrier."
      ],
      options: [
        { section: "ferry", text: "Board the ferry and pay the fare.", words: ["board", "ferry", "boat", "pay", "ride"] },
        { section: "warehouse", text: "Slip into the warehouse for a quieter way aboard.", words: ["warehouse", "sneak", "slip", "steal", "hide"] },
        { section: "tavern", text: "Ask questions at the salt-stained tavern.", words: ["tavern", "talk", "ask", "questions", "drink"] }
      ]
    },
    tavern: {
      title: "The Drowned Lantern",
      text: [
        "Inside, the air smells of tar and boiled crab. A one-eyed sailor traces a wet circle on the table.",
        "“Marsh-wights took the north causeway,” she says. “Captain Ryn of the <em>Ashwake</em> still sails, but she wants coin or a blade she can trust.”",
        "A cracked bottle of emberwine glows behind the bar. The keep mutters that one sip steadies a shaking hand."
      ],
      options: [
        { section: "buy_wine", text: "Buy the emberwine for 4 gold.", words: ["buy", "wine", "emberwine", "drink", "potion"] },
        { section: "ferry", text: "Go to the ferry and offer your sword.", words: ["ferry", "sword", "offer", "captain", "ryn"] },
        { section: "harbor", text: "Return to the docks.", words: ["return", "docks", "harbor", "back"] }
      ]
    },
    buy_wine: {
      title: "A Warm Bargain",
      special: "buyWine",
      text: ["The keep wraps the bottle in sailcloth. “Don’t waste it on a toast.”"],
      options: [
        { section: "ferry", text: "Take the bottle to the ferry.", words: ["ferry", "leave", "go"] },
        { section: "harbor", text: "Step back into the rain.", words: ["harbor", "docks", "rain"] }
      ]
    },
    warehouse: {
      title: "Rope and Shadow",
      text: [
        "Stacked crates. Rat-scratch. A sleeping watchman with a rusted billhook across his knees.",
        "A hatch in the floor drops toward the ferry’s cargo hold. A brass key hangs from the watchman’s belt."
      ],
      options: [
        { section: "steal_key", text: "Lift the key without waking him.", words: ["key", "steal", "lift", "sneak", "take"] },
        { section: "cargo", text: "Drop through the hatch into the hold.", words: ["hatch", "drop", "hold", "cargo", "climb"] },
        { section: "harbor", text: "Leave before you are seen.", words: ["leave", "run", "harbor", "back"] }
      ]
    },
    steal_key: {
      title: "Cold Brass",
      special: "stealKey",
      text: ["The key comes free. The watchman snorts, turns, and does not wake."],
      options: [
        { section: "cargo", text: "Use the hatch.", words: ["hatch", "hold", "cargo", "go"] }
      ]
    },
    cargo: {
      title: "The Belly of Ashwake",
      text: [
        "You land among grain sacks and a locked iron locker stamped with a wolf-and-flame seal.",
        "The ship rolls. Footsteps creak above. If you linger, someone will find you."
      ],
      options: [
        { section: "locker", text: "Try the iron locker.", words: ["locker", "lock", "open", "key", "iron"] },
        { section: "caught", text: "Climb to the deck and announce yourself.", words: ["deck", "climb", "announce", "talk", "captain"] },
        { section: "hide_cargo", text: "Bury yourself in the sacks and wait.", words: ["hide", "wait", "sacks", "sneak"] }
      ]
    },
    locker: {
      title: "Wolf and Flame",
      special: "openLocker",
      text: ["The locker answers — or it does not."],
      options: [
        { section: "deck", text: "Climb to the deck.", words: ["deck", "climb", "up"] }
      ]
    },
    hide_cargo: {
      title: "Grain and Breath",
      text: [
        "Boots pass. A voice: “If the marsh takes another passenger, we turn back.”",
        "When the hold goes quiet you can slip up unseen, or keep hiding until the ship is too far from shore to throw you off."
      ],
      options: [
        { section: "deck", text: "Slip up to the deck.", words: ["deck", "slip", "up", "climb"] },
        { section: "stowaway", text: "Stay hidden until open water.", words: ["hide", "stay", "wait", "stowaway"] }
      ]
    },
    caught: {
      title: "Steel on Wood",
      special: "caughtOnDeck",
      text: ["Lantern light pins you. Captain Ryn’s saber is already drawn."],
      options: [
        { section: "fight_ryn", text: "Fight your way onto the crew.", words: ["fight", "attack", "saber", "combat"] },
        { section: "parley", text: "Talk fast and offer service.", words: ["talk", "parley", "offer", "service", "surrender"] }
      ]
    },
    stowaway: {
      title: "Open Water",
      text: [
        "The river widens into black marsh. When they find you, Ryn does not smile.",
        "“Stowaways row,” she says, “or they swim with the wights.”"
      ],
      options: [
        { section: "row", text: "Take an oar.", words: ["row", "oar", "work", "serve"] },
        { section: "fight_ryn", text: "Refuse and reach for a weapon.", words: ["refuse", "fight", "weapon", "attack"] }
      ]
    },
    ferry: {
      title: "Passage",
      special: "boardFerry",
      text: [
        "Ryn studies your hands the way a butcher studies a joint of meat.",
        "“Two gold, or you work the watch. The marsh does not care which.”"
      ],
      options: [
        { section: "pay_fare", text: "Pay two gold.", words: ["pay", "gold", "fare", "coin"] },
        { section: "row", text: "Join the watch and keep your coin.", words: ["watch", "work", "row", "serve", "join"] },
        { section: "harbor", text: "Walk away from the gangplank.", words: ["leave", "away", "harbor", "walk"] }
      ]
    },
    pay_fare: {
      title: "Coin on the Rail",
      special: "payFare",
      text: ["The coins disappear into a leather purse. “Stay amidships. Don’t feed the fog.”"],
      options: [
        { section: "deck", text: "Take your place on deck.", words: ["deck", "place", "go"] }
      ]
    },
    parley: {
      title: "A Useful Blade",
      text: [
        "Ryn lowers the saber an inch. “Then prove it. Something is clinging under the hull. Cut it free before it crawls up.”"
      ],
      options: [
        { section: "hull", text: "Go over the side with a boarding axe.", words: ["hull", "axe", "cut", "over", "side"] },
        { section: "row", text: "Refuse the hull and take an oar instead.", words: ["refuse", "oar", "row"] }
      ]
    },
    row: {
      title: "The Watch",
      text: [
        "Blisters bloom. The marsh breathes. Pale shapes pace the reeds, keeping pace with the boat.",
        "A crewman whispers that the keep’s beacon is dark. Without that light, the inner channel is a grave."
      ],
      options: [
        { section: "deck", text: "Finish the watch and join Ryn on deck.", words: ["deck", "ryn", "finish", "join"] }
      ]
    },
    deck: {
      title: "Black Channel",
      text: [
        "Fog eats the shoreline. The beacon that should mark the keep is a dead coal on the hill.",
        "Ryn points with her chin. “Wights in the water. A saboteur on my boat. And you, standing there like a question.”",
        "Something wet slaps the starboard rail."
      ],
      options: [
        { section: "wight", text: "Attack whatever is climbing aboard.", words: ["attack", "wight", "combat", "starboard", "kill"] },
        { section: "hull", text: "Drop over the side and check the hull.", words: ["hull", "over", "side", "check"] },
        { section: "beacon_talk", text: "Convince Ryn to make for the dark beacon.", words: ["beacon", "talk", "convince", "keep", "light"] }
      ]
    },
    wight: {
      title: "River-Wight",
      combat: {
        name: "River-Wight",
        skill: 8,
        endurance: 10,
        win: "after_wight",
        lose: "death_water"
      },
      text: [
        "It is almost a person. Reed-hair, fish-white eyes, hands like grappling hooks.",
        "The deck becomes a circle of shouting and wet wood."
      ]
    },
    after_wight: {
      title: "Ichor on the Planks",
      special: "afterWight",
      text: [
        "The thing unravels into riverweed and black water. The crew stares at you with a new kind of silence.",
        "Ryn wipes her saber. “The beacon. If you can walk, you can climb.”"
      ],
      options: [
        { section: "shore", text: "Take the skiff to the beacon hill.", words: ["skiff", "beacon", "shore", "hill", "climb"] }
      ]
    },
    hull: {
      title: "Under the Waterline",
      special: "hullEvent",
      text: ["Cold takes your bones. What clings to the hull is not rope."],
      options: [
        { section: "deck", text: "Haul yourself back to the deck.", words: ["deck", "back", "climb"] }
      ]
    },
    beacon_talk: {
      title: "A Captain’s Bet",
      text: [
        "Ryn laughs once, no humor in it. “Fine. We beach at the old stairs. You go first. If the light dies with you, at least I know where not to send the next fool.”"
      ],
      options: [
        { section: "shore", text: "Take the skiff.", words: ["skiff", "shore", "go", "beacon"] }
      ]
    },
    shore: {
      title: "The Drowned Stairs",
      text: [
        "Stone steps climb through willow and bone-white lichen. The beacon tower leans like a drunk.",
        "A torn banner of the keep lies in the mud. Beside it, a traveler’s pack — still buckled."
      ],
      options: [
        { section: "pack", text: "Search the pack.", words: ["pack", "search", "loot", "take"] },
        { section: "tower", text: "Climb straight to the tower.", words: ["tower", "climb", "beacon", "straight"] },
        { section: "reeds", text: "Circle through the reeds and look for another way in.", words: ["reeds", "circle", "sneak", "another"] }
      ]
    },
    pack: {
      title: "Someone Else’s Luck",
      special: "searchPack",
      text: ["The pack has a story. You take what still matters."],
      options: [
        { section: "tower", text: "Climb the tower.", words: ["tower", "climb", "go"] }
      ]
    },
    reeds: {
      title: "Another Mouth",
      text: [
        "The reeds open on a postern gate, half drowned. A chain is pulled taut from inside — someone, or something, is holding it."
      ],
      options: [
        { section: "cut_chain", text: "Hack the chain and force the gate.", words: ["hack", "chain", "force", "gate", "attack"] },
        { section: "tower", text: "Abandon the gate and take the stairs.", words: ["stairs", "tower", "abandon", "leave"] }
      ]
    },
    cut_chain: {
      title: "The Holding Hand",
      combat: {
        name: "Drowned Porter",
        skill: 9,
        endurance: 12,
        win: "inner_yard",
        lose: "death_mud"
      },
      text: [
        "The chain-hand belongs to a keep porter whose lungs have learned a new trade. He does not speak. He pulls."
      ]
    },
    tower: {
      title: "Dead Coal",
      text: [
        "The beacon bowl is cold. Beside it, a brass wick-box and a note written in a shaking hand:",
        "<em>Do not light it unless the river is clear. Light draws them. Dark starves them. Choose.</em>",
        "Below, the <em>Ashwake</em> waits in the channel like a floating wound."
      ],
      options: [
        { section: "light", text: "Light the beacon.", words: ["light", "beacon", "fire", "ignite"] },
        { section: "dark", text: "Leave it dark and descend to the keep.", words: ["dark", "leave", "descend", "keep"] },
        { section: "signal_ryn", text: "Signal Ryn with a shielded lantern instead.", words: ["signal", "ryn", "lantern", "shielded"] }
      ]
    },
    light: {
      title: "A Shout of Fire",
      special: "lightBeacon",
      text: ["Flame leaps. The marsh answers."],
      options: [
        { section: "keep_assault", text: "Run for the keep while the light holds.", words: ["run", "keep", "assault"] }
      ]
    },
    dark: {
      title: "Starvation of Light",
      text: [
        "You leave the bowl cold. The wights wander, confused, thinning toward the water.",
        "The keep’s inner door is unguarded — and unlit. You will have to feel your way."
      ],
      options: [
        { section: "inner_yard", text: "Enter the keep in darkness.", words: ["enter", "keep", "dark", "yard"] }
      ]
    },
    signal_ryn: {
      title: "A Narrow Language",
      special: "signalRyn",
      text: [
        "Three short flashes. The ferry turns, not toward the beacon but toward a hidden quay only a captain would know."
      ],
      options: [
        { section: "inner_yard", text: "Meet the crew at the hidden quay.", words: ["quay", "crew", "meet", "yard"] }
      ]
    },
    keep_assault: {
      title: "Drawn Like Moths",
      combat: {
        name: "Wight Pack",
        skill: 10,
        endurance: 14,
        win: "inner_yard",
        lose: "death_light"
      },
      text: [
        "They come uphill in a wet tide. The beacon did its work too well."
      ]
    },
    inner_yard: {
      title: "The Keep That Forgot Dawn",
      text: [
        "Courtyard flagstones shine with river silt. The great hall doors hang open. A single figure waits on the steps in a rain-dark cloak: the steward of Vellhaven, or what is left of the office.",
        "“The ember in the crypt keeps the wights from the last well,” the steward says. “If you take it to the beacon, the channel lives. If you take it down the well, the town lives a little longer in the dark. I cannot lift it. I already tried.”"
      ],
      options: [
        { section: "crypt", text: "Descend to the crypt and take the ember.", words: ["crypt", "ember", "descend", "take"] },
        { section: "well", text: "Go to the well and listen first.", words: ["well", "listen", "water"] },
        { section: "refuse", text: "Refuse the choice and walk back to the river.", words: ["refuse", "leave", "river", "walk"] }
      ]
    },
    crypt: {
      title: "The Ember",
      special: "takeEmber",
      text: [
        "The ember is not fire exactly. It is a coal that remembers being a star. It burns nothing but hesitation."
      ],
      options: [
        { section: "ending_channel", text: "Carry it to the beacon and open the channel.", words: ["beacon", "channel", "carry", "light"] },
        { section: "ending_town", text: "Carry it to the well and seal the dark.", words: ["well", "town", "seal", "dark"] }
      ]
    },
    well: {
      title: "The Last Water",
      text: [
        "Voices rise from the well — not ghosts, villagers, packed in the cistern like stored grain.",
        "A child asks if the boat came. You can lie. You can tell the truth. You can drop a promise down the stone throat."
      ],
      options: [
        { section: "crypt", text: "Promise them light and go for the ember.", words: ["promise", "ember", "crypt", "light"] },
        { section: "ending_town", text: "Stay and guard the well through the night.", words: ["stay", "guard", "well", "night"] },
        { section: "refuse", text: "Climb out and leave them the silence.", words: ["leave", "climb", "refuse"] }
      ]
    },
    refuse: {
      title: "The River Keeps Its Own",
      ending: "quiet",
      text: [
        "You walk back through willow and rain. The <em>Ashwake</em> is already a rumor on the water.",
        "Vellhaven will decide without you. Some stories are survived by leaving them unfinished.",
        "<strong>Ending: The Unspent Coin.</strong>"
      ]
    },
    ending_channel: {
      title: "A Road of Fire",
      ending: "channel",
      special: "endChannel",
      text: [
        "The beacon drinks the ember and becomes a blade of orange across the marsh. Wights burn like wet paper.",
        "Ryn’s ferry finds the channel. Refugees will have a road. The well below will go cold by winter.",
        "<strong>Ending: The Open Channel.</strong>"
      ]
    },
    ending_town: {
      title: "A Held Breath",
      ending: "town",
      special: "endTown",
      text: [
        "You seat the ember in the well-mouth. The water takes on a faint copper glow. The villagers stop shivering.",
        "Outside, the channel stays blind. Ships will wreck. The town, for now, drinks and lives.",
        "<strong>Ending: The Hidden Well.</strong>"
      ]
    },
    death_water: {
      title: "Taken Under",
      ending: "death",
      text: ["The rail kisses your spine. The river closes its mouth. You taste iron and then nothing.", "<strong>You have died.</strong>"]
    },
    death_mud: {
      title: "The Gate Wins",
      ending: "death",
      text: ["The chain finds your throat. Mud fills the rest.", "<strong>You have died.</strong>"]
    },
    death_light: {
      title: "Too Bright",
      ending: "death",
      text: ["They find you by the fire you made. The beacon keeps burning after you stop.", "<strong>You have died.</strong>"]
    },
    fight_ryn: {
      title: "Captain of Ashwake",
      combat: {
        name: "Captain Ryn",
        skill: 11,
        endurance: 16,
        win: "ryn_falls",
        lose: "death_water"
      },
      text: ["Ryn is faster than the rumor of her. The crew does not help either of you."]
    },
    ryn_falls: {
      title: "Command by Blood",
      special: "tookShip",
      text: [
        "Ryn yields on one knee, furious and alive. “The ship is yours if you can keep it. I would rather live than love this wreck.”",
        "The marsh does not care who holds the tiller."
      ],
      options: [
        { section: "deck", text: "Take command and turn toward the beacon.", words: ["command", "beacon", "deck", "sail"] }
      ]
    }
  }
};

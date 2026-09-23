(function () {
  const SAVE_KEY = "emberwake-save-v1";
  const book = window.EMBERWAKE;

  const state = {
    section: book.start,
    name: "Stranger",
    skill: 10,
    endurance: 20,
    enduranceMax: 20,
    gold: 8,
    inventory: ["Short sword", "Weathercloak"],
    flags: {},
    log: "",
    history: []
  };

  const $ = (id) => document.getElementById(id);

  function rand(n) {
    return 1 + Math.floor(Math.random() * n);
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function stem(word) {
    return word.toLowerCase().replace(/[^a-z']/g, "").replace(/(ing|ed|es|s)$/g, "");
  }

  function expand(token) {
    const out = new Set([stem(token)]);
    Object.entries(book.synonyms).forEach(([canon, list]) => {
      const family = [canon, ...list].map(stem);
      if (family.includes(stem(token))) family.forEach((w) => out.add(w));
    });
    return out;
  }

  function scoreOption(inputTokens, option) {
    const bags = inputTokens.map(expand);
    let score = 0;
    option.words.forEach((word) => {
      const target = stem(word);
      bags.forEach((bag) => {
        if (bag.has(target)) score += 1;
      });
    });
    return score;
  }

  function setLog(msg, cls) {
    state.log = msg;
    const el = $("log");
    el.className = "log " + (cls || "");
    el.innerHTML = msg || "";
  }

  function renderChart() {
    $("stat-skill").textContent = state.skill;
    $("stat-endurance").textContent = state.endurance + " / " + state.enduranceMax;
    $("stat-gold").textContent = state.gold;
    $("hp-bar").style.width = (100 * state.endurance) / state.enduranceMax + "%";
    $("inventory").innerHTML = state.inventory.length
      ? state.inventory
          .map((item) => {
            const usable = /wine|potion|salve/i.test(item);
            return `<span class="chip${usable ? " use" : ""}" data-item="${item}">${item}</span>`;
          })
          .join("")
      : `<span class="chip">Empty pockets</span>`;
    $("flags").innerHTML = Object.keys(state.flags)
      .filter((k) => state.flags[k])
      .map((k) => `<span class="chip">${prettyFlag(k)}</span>`)
      .join("") || `<span class="chip">No marks yet</span>`;
  }

  function prettyFlag(k) {
    return ({
      emberwine: "Emberwine",
      brassKey: "Brass key",
      wolfSeal: "Wolf-seal letter",
      hullCut: "Hull cleared",
      beaconLit: "Beacon lit",
      rynAlly: "Ryn’s trust",
      tookShip: "Took the ship",
      ember: "The Ember"
    }[k] || k);
  }

  function addItem(item) {
    if (!state.inventory.includes(item)) state.inventory.push(item);
  }

  function spendGold(n) {
    if (state.gold < n) return false;
    state.gold -= n;
    return true;
  }

  function specials(name, sect) {
    const fn = {
      buyWine() {
        if (state.flags.emberwine) {
          setLog("You already bought the bottle.", "gold");
          return;
        }
        if (!spendGold(4)) {
          setLog("The keep waits. You do not have 4 gold.", "bad");
          go("tavern", true);
          return;
        }
        state.flags.emberwine = true;
        addItem("Emberwine");
        setLog("Spent 4 gold. Emberwine added to your pack.", "good");
      },
      stealKey() {
        const sneak = rand(10) + Math.floor(state.skill / 4);
        if (sneak >= 6) {
          state.flags.brassKey = true;
          addItem("Brass key");
          setLog("The key is yours. Nobody woke.", "good");
        } else {
          setLog("The watchman jerks awake. You bolt for the hatch.", "bad");
          state.endurance = clamp(state.endurance - 2, 1, state.enduranceMax);
          sect.text = ["He swings the billhook. You take a scrape and drop through the hatch anyway."];
        }
      },
      openLocker() {
        if (state.flags.brassKey) {
          state.flags.wolfSeal = true;
          addItem("Wolf-seal letter");
          state.gold += 3;
          setLog("The locker yields a sealed letter and 3 gold.", "good");
          sect.text = ["The key fits. Inside: a wolf-and-flame letter and a thin purse."];
        } else {
          setLog("The lock laughs at your fingernails.", "bad");
          sect.text = ["Without a key the locker stays shut. Footsteps press you upward."];
        }
      },
      caughtOnDeck() {
        setLog("You are seen. Words or steel — pick one.", "gold");
      },
      boardFerry() {
        if (state.flags.wolfSeal) {
          setLog("Ryn notices the seal on your letter and nods once.", "good");
          state.flags.rynAlly = true;
        }
      },
      payFare() {
        if (!spendGold(2)) {
          setLog("Not enough coin. You are pointed at an oar.", "bad");
          go("row", true);
          return;
        }
        setLog("Paid 2 gold for a passenger’s place.", "gold");
      },
      afterWight() {
        state.flags.rynAlly = true;
        if (state.endurance < state.enduranceMax) state.endurance += 1;
      },
      hullEvent() {
        const cut = rand(10) + (state.inventory.includes("Short sword") ? 2 : 0);
        if (cut >= 7) {
          state.flags.hullCut = true;
          setLog("You cut the clinging mass free. The ship rides lighter.", "good");
          sect.text = ["Barnacle-flesh and riverweed peel away. Something screams without a mouth."];
          if (state.endurance < state.enduranceMax) state.endurance += 1;
        } else {
          state.endurance = clamp(state.endurance - 3, 1, state.enduranceMax);
          setLog("The water bites back. You lose 3 endurance.", "bad");
          sect.text = ["A pale arm finds your ankle. You kick free and climb, colder than when you went in."];
        }
      },
      searchPack() {
        addItem("Traveler’s salve");
        state.gold += 2;
        setLog("Found a traveler’s salve and 2 gold.", "good");
      },
      lightBeacon() {
        state.flags.beaconLit = true;
        setLog("The marsh turns toward the fire.", "gold");
      },
      signalRyn() {
        state.flags.rynAlly = true;
        setLog("Ryn answers with a single lantern wink.", "good");
      },
      takeEmber() {
        state.flags.ember = true;
        addItem("The Ember");
        setLog("The Ember sits in your palm and does not burn it.", "gold");
      },
      tookShip() {
        state.flags.tookShip = true;
        state.gold += 5;
        setLog("The purse on the rail is yours now. +5 gold.", "gold");
      },
      endChannel() {
        if (state.flags.rynAlly) setLog("Ryn salutes with two fingers and takes the refugees through.", "good");
      },
      endTown() {
        if (state.inventory.includes("The Ember") || state.flags.ember) {
          setLog("The well keeps what you gave it.", "good");
        }
      }
    };
    if (name && fn[name]) fn[name]();
  }

  function go(id, skipHistory) {
    const sect = book.sections[id];
    if (!sect) return;
    if (!skipHistory) state.history.push(state.section);
    state.section = id;
    specials(sect.special, sect);
    renderSection();
    saveSilent();
  }

  function renderSection() {
    const sect = book.sections[state.section];
    $("section-title").textContent = sect.title;
    $("section-id").textContent = "Section · " + state.section;
    $("story-text").innerHTML = (sect.text || []).map((p) => `<p>${p}</p>`).join("");
    renderChart();

    const box = $("choices");
    box.innerHTML = "";

    if (sect.combat && !state.flags["beat:" + sect.combat.name]) {
      box.innerHTML = `<button class="choice" data-combat="1">Begin combat with the ${sect.combat.name}</button>`;
      $("command").disabled = true;
      return;
    }

    $("command").disabled = false;

    if (sect.ending) {
      box.innerHTML = `<button class="choice" id="restart">Begin again</button>`;
      return;
    }

    (sect.options || []).forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.innerHTML = `${opt.text}<small>try: ${opt.words.slice(0, 3).join(", ")}</small>`;
      btn.addEventListener("click", () => go(opt.section));
      box.appendChild(btn);
    });
  }

  function parseCommand(raw) {
    const sect = book.sections[state.section];
    if (!sect || sect.ending || sect.combat) return;
    const text = raw.trim().toLowerCase();
    if (!text) return;

    if (/^(help|\?)$/.test(text)) {
      setLog("Type what you want to do, or click a choice. Try look, talk, attack, sneak, buy, run.", "gold");
      return;
    }
    if (/^(inv|inventory|i)$/.test(text)) {
      setLog("You carry: " + state.inventory.join(", "), "gold");
      return;
    }
    if (/^(stats|status)$/.test(text)) {
      setLog(`Skill ${state.skill}, Endurance ${state.endurance}/${state.enduranceMax}, Gold ${state.gold}`, "gold");
      return;
    }
    if (/drink|potion|wine|salve|heal/.test(text)) {
      useHeal();
      return;
    }

    const tokens = text.split(/\s+/);
    let best = null;
    let bestScore = 0;
    let tie = false;
    (sect.options || []).forEach((opt) => {
      const s = scoreOption(tokens, opt);
      if (s > bestScore) {
        best = opt;
        bestScore = s;
        tie = false;
      } else if (s === bestScore && s > 0) {
        tie = true;
      }
    });

    if (!best || bestScore === 0) {
      setLog("The world does not understand that. Try a shorter command, or click a choice.", "bad");
      return;
    }
    if (tie) {
      setLog("That could mean more than one thing. Add another word.", "gold");
      return;
    }
    setLog("You " + raw.trim() + ".", "");
    go(best.section);
  }

  function useHeal() {
    const wine = state.inventory.indexOf("Emberwine");
    const salve = state.inventory.indexOf("Traveler’s salve");
    if (wine === -1 && salve === -1) {
      setLog("You have nothing to drink or bind a wound with.", "bad");
      return;
    }
    if (state.endurance >= state.enduranceMax) {
      setLog("You are already whole.", "gold");
      return;
    }
    if (wine !== -1) {
      state.inventory.splice(wine, 1);
      state.endurance = clamp(state.endurance + 6, 0, state.enduranceMax);
      setLog("The emberwine burns going down. +6 Endurance.", "good");
    } else {
      state.inventory.splice(salve, 1);
      state.endurance = clamp(state.endurance + 4, 0, state.enduranceMax);
      setLog("The salve smells of pine and iron. +4 Endurance.", "good");
    }
    renderChart();
    saveSilent();
  }

  function openCombat(cfg) {
    const overlay = $("combat-screen");
    overlay.classList.add("open");
    let enemyEP = cfg.endurance;
    const log = [];
    const write = () => {
      $("combat-title").textContent = cfg.name;
      $("combat-log").textContent = log.join("\n");
      $("combat-you").textContent = state.endurance;
      $("combat-them").textContent = enemyEP;
    };
    log.push(`${cfg.name} · skill ${cfg.skill}  |  You · skill ${state.skill}`);
    write();

    $("combat-strike").onclick = () => {
      const you = rand(10) + state.skill;
      const them = rand(10) + cfg.skill;
      if (you > them) {
        const dmg = 2 + (you - them > 6 ? 2 : 0);
        enemyEP -= dmg;
        log.push(`Your blow lands (${you} vs ${them}). ${cfg.name} takes ${dmg}.`);
      } else if (them > you) {
        const dmg = 2 + (them - you > 6 ? 2 : 0);
        state.endurance = clamp(state.endurance - dmg, 0, state.enduranceMax);
        log.push(`They hit (${them} vs ${you}). You take ${dmg}.`);
      } else {
        log.push(`Blades catch. No blood this pass (${you}).`);
      }
      write();
      renderChart();
      if (enemyEP <= 0) {
        log.push(`The ${cfg.name} falls.`);
        write();
        state.flags["beat:" + cfg.name] = true;
        setTimeout(() => {
          overlay.classList.remove("open");
          setLog("Victory.", "good");
          go(cfg.win, true);
        }, 700);
      } else if (state.endurance <= 0) {
        log.push("Your knees find the deck.");
        write();
        setTimeout(() => {
          overlay.classList.remove("open");
          go(cfg.lose, true);
        }, 700);
      }
    };

    $("combat-flee").onclick = () => {
      if (rand(10) >= 6) {
        overlay.classList.remove("open");
        setLog("You break away, breathing hard.", "gold");
        state.endurance = clamp(state.endurance - 1, 1, state.enduranceMax);
        renderSection();
      } else {
        state.endurance = clamp(state.endurance - 2, 0, state.enduranceMax);
        log.push("Fleeing fails. They catch you for 2 more.");
        write();
        if (state.endurance <= 0) {
          overlay.classList.remove("open");
          go(cfg.lose, true);
        }
      }
    };
  }

  function saveSilent() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function load() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      setLog("No saved game yet.", "gold");
      return false;
    }
    Object.assign(state, JSON.parse(raw));
    renderSection();
    setLog("Game restored.", "good");
    return true;
  }

  function restart() {
    state.section = book.start;
    state.skill = 8 + rand(5);
    state.enduranceMax = 16 + rand(8);
    state.endurance = state.enduranceMax;
    state.gold = 6 + rand(6);
    state.inventory = ["Short sword", "Weathercloak"];
    state.flags = {};
    state.history = [];
    setLog("A new stranger steps onto the dock.", "gold");
    renderSection();
    saveSilent();
  }

  function bind() {
    $("cmd-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = $("command").value;
      $("command").value = "";
      parseCommand(v);
    });
    $("choices").addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      if (t.id === "restart") restart();
      if (t.dataset.combat) {
        const sect = book.sections[state.section];
        openCombat(sect.combat);
      }
    });
    $("inventory").addEventListener("click", (e) => {
      const chip = e.target.closest(".use");
      if (chip) useHeal();
    });
    $("btn-save").addEventListener("click", () => {
      saveSilent();
      setLog("Progress carved into local memory.", "good");
    });
    $("btn-load").addEventListener("click", load);
    $("btn-new").addEventListener("click", restart);
    $("start-game").addEventListener("click", () => {
      $("title-screen").classList.remove("open");
      restart();
    });
    $("continue-game").addEventListener("click", () => {
      $("title-screen").classList.remove("open");
      if (!load()) restart();
    });
  }

  bind();
  if (localStorage.getItem(SAVE_KEY)) $("continue-game").style.display = "block";
})();

// Variabili
let triggerButton = document.getElementById("button");
let addTradeButton = document.getElementById("addTradeButton");
let counter = 0;

// Triggeratori
addTradeButton.onclick = () => {
  let trade = `<div class="trade">
            <br/>
            <div class="inputInfo">
              <label for="Tipo-Moneta-${counter}">Tipo moneta</label>
              <select name="" id="Tipo-Moneta-${counter}">
                <option
                  value='display:{Name:"{\"text\":\"Iron Block (Beta)\"}"},SkullOwner:{Id:[I;-1273404245,-1758966597,-1508271075,-833688128],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjU2MjljMWM3N2FlYTJiMGNlYmNmMzMzNjU1ZTY4ZGIxMzRmNDg0MWMwOGQ5ZTg3NWMzMDc0YWMzMGUyYTZkZSJ9fX0="}]}}'
                >
                  ferro
                </option>
                <option
                  value='display:{Name:"{\"text\":\"Golden Blank\"}"},SkullOwner:{Id:[I;-2055602587,-531214450,-1555823654,-1254945024],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzUxMTM3ZTExNDQzYThmYmIwNWZjZDNjY2MxYWY5YmQyMzAzOTE4ZjM1NDQ4MTg1ZTNlZDk2ZWYxODRkYSJ9fX0="}]}}'
                >
                  oro
                </option>
                <option
                  value='display:{Name:"{\"text\":\"Diamond Block\"}"},SkullOwner:{Id:[I;189941930,1156075107,-1303444300,-811366351],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjM0NjMwOWRiYjRhYWI2ZjlkMTRhNjI3ZmI3M2Y0ODE0MTY1ODM3YjQyMzg1ZjA2NDMyZDY4MDIzYTg0NDVkIn19fQ=="}]}}'
                >
                  diamante
                </option>
                <option
                  value='display:{Name:"{\"text\":\"Block of Netherite\"}"},SkullOwner:{Id:[I;1156551679,-1088599583,-1500868190,-421557710],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjc5NTdmODk1ZDdiYzUzNDIzYTM1YWFjNTlkNTg0YjQxY2MzMGUwNDAyNjljOTU1ZTQ1MWZlNjgwYTFjYzA0OSJ9fX0="}]}}'
                >
                  netherite
                </option>
              </select>
            </div>
            <div class="inputInfo">
              <label for="Quantità-Monete-${counter}">Quantità monete</label>
              <input type="number" id="Quantità-Monete-${counter}" />
            </div>
            <div class="inputInfo">
              <label for="Oggetto-Vendita-${counter}">Oggetto in vendita</label>
              <input type="text" id="Oggetto-Vendita-${counter}" />
            </div>
            <div class="inputInfo">
              <label for="Quantità-Oggetti-Venduti-${counter}"
                >Quantità oggetti venduti</label
              >
              <input type="number" id="Quantità-Oggetti-Venduti-${counter}" />
            </div>
            <br />
          </div>`;
  $(".trades").append(trade);
  counter++;
};

triggerButton.onclick = () => {
  console.log(createCommand());
  document.getElementById("output").value = createCommand();
};

// Funzioni
function createCommand() {
  let villagerPosition = document.getElementById("posizione").value;
  let villagerProfession = document.getElementById("Professione").value;
  let villagerType = document.getElementById("Tipo").value;
  let villagerRotation = document.getElementById("Rotazione").value;
  let villagerName = document.getElementById("Nome").value;
  let recipes = "";

  // Questo ciclo for serve a identificare tutti i trade che vuoi creare e ad aggiungerli alla recipes
  for (let i = 0; i < $(".trade").length; i++) {
    // Quantità soldi per comprare nella valuta indicata (ferro, oro, diamante, netherite).
    let quantityBuy = $("#Quantità-Monete-" + i).val();
    // Quantità oggetti comprati fra quelli selezionati nell'input apposito
    let quantitySold = $("#Quantità-Oggetti-Venduti-" + i).val();

    let soldItemInput = $("#Oggetto-Vendita-" + i).val();
    let buyItem = $("#Tipo-Moneta-" + i).val();
    let soldItem;

    // Se item e' una testa presa dal sito allora la IF qui sotto lo vede e affida a item solo la porzione di stringa che serve a noi,
    // diversamente il codice non e' ancora stato implementato
    if (soldItemInput.slice(0, 5) === "/give") {
      // /give @p minecraft:player_head{...} 1     Questo e' quello che prendi dal sito delle teste,
      // quello che realmente ti interessa e' al posto dei puntini in mezzo alle graffe
      soldItem = soldItemInput.slice(31, -3);
    }

    // Se buyItem non e' una testa, per ora, per come e' scritto il codice, dovrai fare modifiche...
    // allo stesso modo in futuro potresti implementare diversi modi per comprare oltre a quelli che hai messo forzatamente (ferro, oro, diamante, netherite).

    // Se vorrai creare scambi fra tutti gli oggetti e non solo teste allora le stringhe sotto vanno modificate
    let recipeBuy = `{buy:{id:"minecraft:player_head", Count:${quantityBuy}b, tag:{${buyItem}}},`;
    let recipeSell = `sell:{id:"minecraft:player_head", Count:${quantitySold}b, tag:{${soldItem}},rewardExp:0b,maxUses:9999999}`;
    if (recipes === "") {
      recipes = recipeBuy + recipeSell;
    } else {
      recipes += "," + recipeBuy + recipeSell;
    }
  }

  // DEVI creare una variabile chiamata recipes IMPORTANTE, dentro alla quale ci stanno tutte le ricette, se singola {}, se molte {},{},{}...

  let command = `/summon villager ${villagerPosition} {VillagerData:{profession:${villagerProfession},level:99,type:${villagerType}},Invulnerable:1,PersistenceRequired:1,NoAI:1,Rotation:[${villagerRotation},0f],CustomName:"\\"${villagerName}\\"",Offers:{Recipes:[${recipes}]}}`;
  return command;
}

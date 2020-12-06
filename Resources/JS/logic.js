// Variabili
let triggerButton = document.getElementById("button");
let addTradeButton = document.getElementById("addTradeButton");
let auto = document.getElementById("automatizza");
let counter = 0; // Serve in seguito per attribuire gli ID corretti

//----------------------//

// Triggeratori (il primo crea l'HTML degli scambi incrementando un counter che incrementera' tutti gli ID)
addTradeButton.onclick = () => {
  function trade() {
    let trade = `<div class="trade n${counter}">
            <br/>
            <hr align="left" size="1" width="50" color="gray" noshade />
            <div class="inputInfo">
              <!-- Dopo Trade n. hai messo counter + 1 per evitare che partisse da 0, invece in tutti gli altri ti serve che parta da 0 -->
              <p class="numeroTrade" id="numeroTrade-${counter}">Trade n.${
      counter + 1
    }</p>
            </div>
            <div class="inputInfo">
              <label for="Note-Personali-${counter}">Note personali - Facoltativo</label>
              <input type="text" id="Note-Personali-${counter}" />
            </div>
            <div class="inputInfo">
              <label for="Tipo-Moneta-${counter}">Tipo moneta</label>
              <input list="moneta-${counter}" id="Tipo-Moneta-${counter}">
                <datalist id="moneta-${counter}">
                  <option value="Testa Ferro" />
                  <option value="Testa Oro" />
                  <option value="Testa Diamante" />
                  <option value="Testa Netherite" />
                </datalist>
            </div>
            <div class="inputInfo">
              <label for="Quantità-Monete-${counter}">Quantità monete</label>
              <input type="number" id="Quantità-Monete-${counter}" />
            </div>
            <div class="inputInfo">
              <label for="Oggetto-Vendita-${counter}">Oggetto in vendita</label>
              <input list="prodotto-${counter}" id="Oggetto-Vendita-${counter}">
                <datalist id="prodotto-${counter}">
                  <option value="Testa Ferro" />
                  <option value="Testa Oro" />
                  <option value="Testa Diamante" />
                  <option value="Testa Netherite" />
                  <option value="Sh+MapArt" />
                </datalist>
            </div>
            <div class="inputInfo">
              <label for="Quantità-Oggetti-Venduti-${counter}"
                >Quantità oggetti venduti</label
              >
              <input type="number" id="Quantità-Oggetti-Venduti-${counter}" />
            </div>
            <button class="removeTrade" id="removeTradeButton-${counter}" onclick="changeDisplay(${counter})">Rimuovi</button>
            <br />
          </div>`;
    $(".trades").append(trade);
    for (let item of itemID) {
      $(`#moneta-${counter}`).append('<option value="' + item + '"></option>');
      $(`#prodotto-${counter}`).append(
        '<option value="' + item + '"></option>'
      );
    }
    $(".linkTrades").append(
      `<a href="#numeroTrade-${counter}">${counter + 1}    </a>`
    );
    counter++;
  }
  // Questo IF - ELSE serve a mettere un trade alla volta oppure ad aggiungerne in un colpo il numero selezionato
  if ($("#numberOfTrades").val() === "") {
    trade();
  } else {
    for (let i = 0; i < parseInt($("#numberOfTrades").val()); i++) {
      trade();
    }
    $("#numberOfTrades").val("");
  }
};

triggerButton.onclick = () => {
  if ($("#output").val().split("\n")[0] === "AUTO") {
    return $(".hiddenBox").css("display", "flex");
  }
  document.getElementById("output").value = createCommand();
};

auto.addEventListener("click", function () {
  automatizza();
  $("#Tipo-Moneta-hiddenBox").val("");
  $("#Quantità-Monete-hiddenBox").val("");
  $(".hiddenBox").css("display", "none");
});

//-------------------------//

// Funzioni
// Funzione che crea il comando da incollare nel command block
function createCommand() {
  let villagerPosition = document.getElementById("posizione").value;
  let villagerProfession = document.getElementById("Professione").value;
  let villagerType = document.getElementById("Tipo").value;
  let villagerRotation = document.getElementById("Rotazione").value;
  let villagerName = document.getElementById("Nome").value;
  let recipes = "";

  // IF che ti permette di avvisare l'utente e stoppare il programma se i campi obbligatori non sono stati compilati
  if (
    !villagerPosition ||
    !villagerProfession ||
    !villagerType ||
    !villagerRotation ||
    !villagerName
  ) {
    return alert("Compila prima i primi 5 campi obbligatori");
  }

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
    if (soldItemInput.slice(0, 5) === "/give") {
      // /give @p minecraft:player_head{...} 1     Questo e' quello che prendi dal sito delle teste,
      // quello che realmente ti interessa e' al posto dei puntini in mezzo alle graffe
      soldItem = soldItemInput.slice(31, -3);
    } else {
      soldItem = soldItemInput;
    }

    // Creiamo un controllo per vedere se un trade e' stato annullato, se $('.n'+i)[0].attributes[1] non fosse === a undefined,
    // vorrebbe dire che all'interno ci sarebbe una proprietà cosi' $('.n6')[0].attributes[1].value === 'display: none;' e se fosse,
    // allora vogliamo che il trade non sia preso in considerazione.
    if ($(".n" + i)[0].attributes[1] === undefined) {
      /* Esempi di villager e relativo trade:

        /summon villager ~ ~ ~ {Offers:{Recipes:[{buy:{id:"minecraft:stone",Count:64b},sell:{id:"minecraft:diamond",Count:2b}}]}}
        {buy:{id:"minecraft:stone",Count:64b},sell:{id:"minecraft:diamond",Count:2b}}

        /summon villager ~ ~ ~ {Offers:{Recipes:[{buy:{id:"minecraft:stone",Count:64b},sell:{id:"minecraft:diamond",Count:2b}},{buy:{id:'minecraft:stone',Count:64b},sell:{id:'minecraft:diamond',Count:2b}}]}}
        {buy:{id:"minecraft:stone",Count:64b},sell:{id:"minecraft:diamond",Count:2b}},{buy:{id:'minecraft:stone',Count:64b},sell:{id:'minecraft:diamond',Count:2b}}

      */

      let recipeSell;
      let recipeBuy;

      if (buyItem.slice(0, 7) === "display") {
        recipeBuy = `{buy:{id:"minecraft:player_head", Count:${quantityBuy}b, tag:{${buyItem}}},`;
      } else if (buyItem === "Testa Ferro") {
        recipeBuy = `{buy:{id:"minecraft:player_head", Count:${quantityBuy}b, tag:{display:{Name:"{\\"text\\":\\"Iron Block (Beta)\\"}"},SkullOwner:{Id:[I;-1273404245,-1758966597,-1508271075,-833688128],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjU2MjljMWM3N2FlYTJiMGNlYmNmMzMzNjU1ZTY4ZGIxMzRmNDg0MWMwOGQ5ZTg3NWMzMDc0YWMzMGUyYTZkZSJ9fX0="}]}}}},`;
      } else if (buyItem === "Testa Oro") {
        recipeBuy = `{buy:{id:"minecraft:player_head", Count:${quantityBuy}b, tag:{display:{Name:"{\\"text\\":\\"Golden Blank\\"}"},SkullOwner:{Id:[I;-2055602587,-531214450,-1555823654,-1254945024],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzUxMTM3ZTExNDQzYThmYmIwNWZjZDNjY2MxYWY5YmQyMzAzOTE4ZjM1NDQ4MTg1ZTNlZDk2ZWYxODRkYSJ9fX0="}]}}}},`;
      } else if (buyItem === "Testa Diamante") {
        recipeBuy = `{buy:{id:"minecraft:player_head", Count:${quantityBuy}b, tag:{display:{Name:"{\\"text\\":\\"Diamond Block\\"}"},SkullOwner:{Id:[I;189941930,1156075107,-1303444300,-811366351],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjM0NjMwOWRiYjRhYWI2ZjlkMTRhNjI3ZmI3M2Y0ODE0MTY1ODM3YjQyMzg1ZjA2NDMyZDY4MDIzYTg0NDVkIn19fQ=="}]}}}},`;
      } else if (buyItem === "Testa Netherite") {
        recipeBuy = `{buy:{id:"minecraft:player_head", Count:${quantityBuy}b, tag:{display:{Name:"{\\"text\\":\\"Block of Netherite\\"}"},SkullOwner:{Id:[I;1156551679,-1088599583,-1500868190,-421557710],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjc5NTdmODk1ZDdiYzUzNDIzYTM1YWFjNTlkNTg0YjQxY2MzMGUwNDAyNjljOTU1ZTQ1MWZlNjgwYTFjYzA0OSJ9fX0="}]}}}},`;
      } else {
        recipeBuy = `{buy:{id:"${buyItem}", Count:${quantityBuy}b},`;
      }
      //---
      if (soldItem.slice(0, 7) === "display") {
        recipeSell = `sell:{id:"minecraft:player_head", Count:${quantitySold}b, tag:{${soldItem}}},rewardExp:0b,maxUses:9999999}`;
      } else if (soldItem === "Testa Ferro") {
        recipeSell = `sell:{id:"minecraft:player_head", Count:${quantitySold}b, tag:{display:{Name:"{\\"text\\":\\"Iron Block (Beta)\\"}"},SkullOwner:{Id:[I;-1273404245,-1758966597,-1508271075,-833688128],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjU2MjljMWM3N2FlYTJiMGNlYmNmMzMzNjU1ZTY4ZGIxMzRmNDg0MWMwOGQ5ZTg3NWMzMDc0YWMzMGUyYTZkZSJ9fX0="}]}}}},rewardExp:0b,maxUses:9999999}`;
      } else if (soldItem === "Testa Oro") {
        recipeSell = `sell:{id:"minecraft:player_head", Count:${quantitySold}b, tag:{display:{Name:"{\\"text\\":\\"Golden Blank\\"}"},SkullOwner:{Id:[I;-2055602587,-531214450,-1555823654,-1254945024],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzUxMTM3ZTExNDQzYThmYmIwNWZjZDNjY2MxYWY5YmQyMzAzOTE4ZjM1NDQ4MTg1ZTNlZDk2ZWYxODRkYSJ9fX0="}]}}}},rewardExp:0b,maxUses:9999999}`;
      } else if (soldItem === "Testa Diamante") {
        recipeSell = `sell:{id:"minecraft:player_head", Count:${quantitySold}b, tag:{display:{Name:"{\\"text\\":\\"Diamond Block\\"}"},SkullOwner:{Id:[I;189941930,1156075107,-1303444300,-811366351],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjM0NjMwOWRiYjRhYWI2ZjlkMTRhNjI3ZmI3M2Y0ODE0MTY1ODM3YjQyMzg1ZjA2NDMyZDY4MDIzYTg0NDVkIn19fQ=="}]}}}},rewardExp:0b,maxUses:9999999}`;
      } else if (soldItem === "Testa Netherite") {
        recipeSell = `sell:{id:"minecraft:player_head", Count:${quantitySold}b, tag:{display:{Name:"{\\"text\\":\\"Block of Netherite\\"}"},SkullOwner:{Id:[I;1156551679,-1088599583,-1500868190,-421557710],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjc5NTdmODk1ZDdiYzUzNDIzYTM1YWFjNTlkNTg0YjQxY2MzMGUwNDAyNjljOTU1ZTQ1MWZlNjgwYTFjYzA0OSJ9fX0="}]}}}},rewardExp:0b,maxUses:9999999}`;
      } else if (soldItem.slice(0, 9) === "Sh+MapArt") {
        // Sh+MapArt-nomeSH-primoNum-SecondoNum
        let nomeSH = soldItem.split("-")[1];
        let primoNum = parseInt(soldItem.split("-")[2]);
        let secondoNum = parseInt(soldItem.split("-")[3]);
        let numMapArt = secondoNum - primoNum + 1;
        let recSlotSH = "";
        for (let i = 0; i < numMapArt; i++) {
          if (recSlotSH === "") {
            recSlotSH = `{Slot:${i}b,id:"minecraft:filled_map",Count:1b,tag:{map:${
              primoNum + i
            }}}`;
          } else {
            recSlotSH += `,{Slot:${i}b,id:"minecraft:filled_map",Count:1b,tag:{map:${
              primoNum + i
            }}}`;
          }
        }
        recipeSell = `sell:{id:"minecraft:purple_shulker_box",Count:1b,tag:{display:{Name:'{"text":"${nomeSH}","color":"gold","italic":true}'},BlockEntityTag:{Items:[${recSlotSH}]}}},rewardExp:0b,maxUses:9999999}`;
      } else {
        recipeSell = `sell:{id:"${soldItem}", Count:${quantitySold}b},rewardExp:0b,maxUses:9999999}`;
      }
      //---
      if (recipes === "") {
        recipes = recipeBuy + recipeSell;
      } else {
        recipes += "," + recipeBuy + recipeSell;
      }
    }
  }

  let command = `/summon villager ${villagerPosition} {VillagerData:{profession:${villagerProfession},level:99,type:${villagerType}},Invulnerable:1,PersistenceRequired:1,NoAI:1,Rotation:[${villagerRotation},0f],CustomName:"\\"${villagerName}\\"",Offers:{Recipes:[${recipes}]}}`;
  return command;
}

// Funzione che copia il testo premendo un pulsante
function copyText() {
  var copyText = document.getElementById("output");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

// Funzione che cambia il display in none,
// se il display è none vuol dire che il trade non verra' preso
// in considerazione per creare il codice del comando. (num sarebbe il counter)
function changeDisplay(num) {
  $(".n" + num).css("display", "none");
}

// Funzione che se immetti tutte le teste da excell direttamente nel texarea e
// azionando la funzione lei ti autocompila tutto per fare un villager vendi teste in automatico
function tradeTeste(typeMoney, numMoney) {
  let arr = $("#output").val().split("\n").slice(1);
  $("#output").val("");
  $(`#numberOfTrades`).val(arr.length);
  $(`#addTradeButton`).click();
  let j = 0; // Questa ti serve per avere un iteratore da 0 diverso da i nel ciclo sucessivo
  for (let i = counter - arr.length; i < counter; i++ && j++) {
    $(`#Tipo-Moneta-${i}`).val(typeMoney);
    $(`#Quantità-Monete-${i}`).val(numMoney);
    $(`#Oggetto-Vendita-${i}`).val(arr[j]);
    $(`#Quantità-Oggetti-Venduti-${i}`).val(1);
  }
  // $(`#button`).click();
}

// Funzione che ti fa ritornare alla visualizzazione principale innescando l'automatizzazione della
// crezione dei trade
function automatizza() {
  tradeTeste(
    $("#Tipo-Moneta-hiddenBox").val(),
    $("#Quantità-Monete-hiddenBox").val()
  );
}

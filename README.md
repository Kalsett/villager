**ISTRUZIONI PER L'USO**

- Tutti i campi vanno compilati ad eccezzione di quelli facoltativi.

- Nel campo "Tipo di Moneta" si possono selezionare sia le "teste-moneta" che useremo nel server, sia
  i normali elementi di minecraft.

- Nel campo "Oggetto in vendita" si possono selezionare sia le "teste-moneta" che useremo nel server, sia
  i normali elementi di minecraft, sia le teste che si trovano nel sito sottostante. (Per immettere
  correttamente la testa selezionata dal sito, basta incollare il link 1.16 suggerito dal
  sito stesso nella sua interezza).

- Nel campo "Oggetto in vendita", oltre alle opzioni precedenti, si possonono anche creare delle shulker con dentro
  delle mapArt da un certo numero ad un altro, per farlo basta selezionare la voce Sh+MapArt ed aggiungere
  manualmente ad essa 3 paramatri divisi da un TRATTINO: il nome della mapArt, il numero della prima mapArt e
  il numero dell'ultima mapArt che si vuole nella shulker.
  Sh+MapArt-Calcio Specorato-1004-1018
  Se la shulker contenesse solo una mapArt allora ripeti il primo numero anche nella posizione del secondo numero:
  Sh+MapArt-Nome Shulker-2010-2010

- Per sciegliere le teste andare su: https://minecraft-heads.com/.

- Se vuoi puoi anche creare un potente automatismo, scivendo nel textarea (l'input di testo piu' grande) la parola AUTO e a capo icolonnando ciò che vuoi
  che il villager venda, una volta premuto crea il comando, anziche' creare subito il comando, il programma creerà e compilerà per te tutti i trade.
  Questo è un esempio di automatismo che crea una autocompilazione che vende tre mapArt in shulkerbox:

  AUTO
  Sh+MapArt-Calcio Specorato-1004-1018
  Sh+MapArt-Calcio Specorato-1004-1018
  Sh+MapArt-Calcio Specorato-1004-1018

  Nell'automatismo, puoi usare qualsiasi opzione elencata prima (teste, mapArt, item di minecraft) e puoi creare anche più automatismi, basta che ne fai uno alla volta.
  Alla fine quando avrai tutti i tuoi trade ti basta schiacciare nuovamente 'Crea il comando'.

- Se il codice sotto viene copiato e incollato nella console della pagina https://minecraft.gamehosting.it/panel/index.php?r=server/log&id=44173, cambiando il nome del player e i numeri di inizio e fine delle map art e premendo INVIO si crea un automatismo che obbliga il server a givvare al player le mapart in blocco. Ad esempio per come e' scritto ora "createListaComandi("Kalsett", 7020, 7029)", l'automatismo dara' a Kalsett le mapArt dalla 7020 alla 7029.

  function createListaComandi(player, num1, num2) {
  let listaComandi = [];
  let delta = num2 - num1 + 1;
  for (let i = 0; i < delta; i++) {
  listaComandi.push(`give ${player} filled_map{map:${num1 + i}} 1`);
  }
  return listaComandi;
  }
  ​
  let listaComandi = createListaComandi("Kalsett", 7020, 7029);
  ​
  for (let com of listaComandi) {
  document.getElementById("command").value = com;
  document.getElementById("yt4").click();
  document.getElementById("command").value = "";
  }

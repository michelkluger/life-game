// Every line of game text, as [English, French, Portuguese, German]. {0} {1} are filled in by the engine.
export type Line = readonly string[];
export const same = (s: string): Line => [s, s, s, s];
export const LANGS = ['English', 'Français', 'Português', 'Deutsch'].map(same);

export const TXT = {
  langPrompt: [`Choose your language`, `Choisis ta langue`, `Escolha seu idioma`, `Wähle deine Sprache`],
  yes: [`Yes`, `Oui`, `Sim`, `Ja`],
  no: [`No`, `Non`, `Não`, `Nein`],
  welcomeBack: [`Welcome back.`, `Te revoilà.`, `Bem-vindo de volta.`, `Willkommen zurück.`],
  cont: [`Continue`, `Continuer`, `Continuar`, `Weiter`],
  newGame: [`New game`, `Nouvelle partie`, `Novo jogo`, `Neues Spiel`],
  hud: [`{0} · Day {1} · CHF {2} · rent in {3}d`, `{0} · Jour {1} · CHF {2} · loyer dans {3}j`, `{0} · Dia {1} · CHF {2} · aluguel em {3}d`, `{0} · Tag {1} · CHF {2} · Miete in {3}T`],
  mFlat: [`Your flat`, `Ton appart`, `Seu apê`, `Deine Wohnung`],
  mZurich: same(`Zürich`),
  mMarseille: same(`Marseille`),
  mCamp: [`Scout camp, 2007`, `Camp scout, 2007`, `Acampamento escoteiro, 2007`, `Pfadilager, 2007`],
  lblHome: [`Home`, `Chez toi`, `Casa`, `Zuhause`],

  intro1: [
    `Zurich, November. You are between jobs, which is the polite phrase.`,
    `Zurich, novembre. Tu es « entre deux emplois », comme on dit poliment.`,
    `Zurique, novembro. Você está "entre empregos", que é o jeito educado de dizer.`,
    `Zürich, November. Du bist «zwischen zwei Stellen», wie man höflich sagt.`],
  intro2: [
    `Rent is CHF 1,850, due on day 10. Your sister and nieces are in Marseille. Your parents are in Brazil. You are in a flat with a box you never unpacked.`,
    `Le loyer : CHF 1 850, à payer le jour 10. Ta sœur et tes nièces sont à Marseille. Tes parents sont au Brésil. Toi, tu es dans un appart avec un carton jamais déballé.`,
    `O aluguel é CHF 1.850 e vence no dia 10. Sua irmã e suas sobrinhas estão em Marselha. Seus pais estão no Brasil. Você está num apê com uma caixa que nunca abriu.`,
    `Die Miete: CHF 1'850, fällig an Tag 10. Deine Schwester und deine Nichten sind in Marseille. Deine Eltern sind in Brasilien. Du bist in einer Wohnung mit einer Kiste, die du nie ausgepackt hast.`],
  intro3: [
    `Arrow keys move. Walk into people and things to interact. Space continues. Hold Shift outdoors to ride your bike. M mutes the music. L changes language.`,
    `Flèches pour bouger. Fonce dans les gens et les objets pour interagir. Espace pour continuer. Maintiens Maj dehors pour prendre le vélo. M coupe la musique. L change la langue.`,
    `Setas para andar. Esbarre em pessoas e coisas para interagir. Espaço continua. Segure Shift na rua para pedalar. M silencia a música. L troca o idioma.`,
    `Pfeiltasten zum Laufen. Lauf in Leute und Dinge hinein, um zu interagieren. Leertaste für weiter. Draussen Shift halten fürs Velo. M schaltet die Musik aus. L wechselt die Sprache.`],
  end1: [
    `Job: found. Cake: delivered. For one evening, nothing is overdue.`,
    `Boulot : trouvé. Gâteau : livré. Pour un soir, rien n'est en retard.`,
    `Emprego: conseguido. Bolo: entregue. Por uma noite, nada está atrasado.`,
    `Job: gefunden. Kuchen: geliefert. Einen Abend lang ist nichts überfällig.`],
  end2: [
    `That is the end of this build. Still to come: Brazil, paragliding, running, dating, and the rest of the box.`,
    `C'est la fin de cette version. À venir : le Brésil, le parapente, la course, les rencards et le reste du carton.`,
    `Fim desta versão. Ainda por vir: Brasil, parapente, corrida, encontros e o resto da caixa.`,
    `Das ist das Ende dieser Version. Es folgen: Brasilien, Gleitschirm, Laufen, Dates und der Rest der Kiste.`],

  bedQ: [`Sleep until tomorrow?`, `Dormir jusqu'à demain ?`, `Dormir até amanhã?`, `Bis morgen schlafen?`],
  bedSleep: [`You sleep. Zurich remains expensive.`, `Tu dors. Zurich reste chère.`, `Você dorme. Zurique continua cara.`, `Du schläfst. Zürich bleibt teuer.`],
  pc1: [
    `Job portal. 42 applications sent. 3 replies. 2 were automated. The third was a typo.`,
    `Portail d'emploi. 42 candidatures envoyées. 3 réponses. 2 automatiques. La troisième était une faute de frappe.`,
    `Portal de vagas. 42 candidaturas enviadas. 3 respostas. 2 automáticas. A terceira foi um erro de digitação.`,
    `Jobportal. 42 Bewerbungen verschickt. 3 Antworten. 2 automatisch. Die dritte war ein Tippfehler.`],
  pc2: [
    `One real lead: Gletscher Labs, in the north-east of town, wants to "have a chat".`,
    `Une vraie piste : Gletscher Labs, au nord-est de la ville, veut « discuter ».`,
    `Uma pista de verdade: a Gletscher Labs, no nordeste da cidade, quer "bater um papo".`,
    `Eine echte Spur: Gletscher Labs, im Nordosten der Stadt, möchte «sich mal austauschen».`],
  boxLater: [
    `Under the scarf: a mission patch, and a parka that still smells of diesel. Those memories come in a later build.`,
    `Sous le foulard : un écusson de mission et une parka qui sent encore le diesel. Ces souvenirs viendront dans une prochaine version.`,
    `Debaixo do lenço: um emblema de missão e uma parca que ainda cheira a diesel. Essas memórias vêm numa próxima versão.`,
    `Unter dem Halstuch: ein Missionsabzeichen und ein Parka, der noch nach Diesel riecht. Diese Erinnerungen kommen in einer späteren Version.`],
  boxClosed: [
    `A moving box you never unpacked. Three flats ago. Not today.`,
    `Un carton de déménagement jamais déballé. Depuis trois apparts. Pas aujourd'hui.`,
    `Uma caixa de mudança que você nunca abriu. Faz três apartamentos. Hoje não.`,
    `Eine Umzugskiste, nie ausgepackt. Seit drei Wohnungen. Heute nicht.`],
  boxOpen1: [`You open the box. On top: a faded scout scarf.`, `Tu ouvres le carton. Sur le dessus : un foulard scout délavé.`, `Você abre a caixa. Em cima: um lenço de escoteiro desbotado.`, `Du öffnest die Kiste. Zuoberst: ein ausgebleichtes Pfadi-Halstuch.`],
  boxOpen2: [
    `São Paulo state, 2007. You are seventeen, a scout leader, and responsible for eleven children and one frog.`,
    `État de São Paulo, 2007. Tu as dix-sept ans, tu es chef scout, responsable de onze enfants et d'une grenouille.`,
    `Interior de São Paulo, 2007. Você tem dezessete anos, é chefe escoteiro e responsável por onze crianças e um sapo.`,
    `Bundesstaat São Paulo, 2007. Du bist siebzehn, Pfadileiter und verantwortlich für elf Kinder und einen Frosch.`],

  swim1: [
    `You walk into the lake fully dressed. It is nine degrees. There is no reason for this.`,
    `Tu entres dans le lac tout habillé. Il fait neuf degrés. Il n'y a aucune raison à cela.`,
    `Você entra no lago de roupa e tudo. Nove graus. Não há motivo nenhum para isso.`,
    `Du gehst komplett angezogen in den See. Neun Grad. Es gibt keinen Grund dafür.`],
  swim2: [
    `A swan judges you. In Zurich, even the swans have a C permit.`,
    `Un cygne te juge. À Zurich, même les cygnes ont un permis C.`,
    `Um cisne te julga. Em Zurique, até os cisnes têm permissão C.`,
    `Ein Schwan mustert dich. In Zürich haben sogar die Schwäne einen C-Ausweis.`],
  swimmer1: [
    `"Lake is nine degrees. Refreshing! And it is free. Go on, walk in."`,
    `« Le lac est à neuf degrés. Vivifiant ! Et c'est gratuit. Vas-y, entre. »`,
    `"O lago está a nove graus. Revigorante! E é de graça. Vai, entra."`,
    `«Der See hat neun Grad. Erfrischend! Und gratis. Los, geh rein.»`],
  swimmer2: [`Free. The most beautiful word in Zurich.`, `Gratuit. Le plus beau mot de Zurich.`, `De graça. A palavra mais bonita de Zurique.`, `Gratis. Das schönste Wort in Zürich.`],

  nb1: same(`"Grüezi. Wänd Sie es Sackgeld verdiene?"`),
  nb2: [
    `(Your neighbour repeats it in High German, slowly, as if to a child.)`,
    `(Ta voisine répète en bon allemand, lentement, comme à un enfant.)`,
    `(Sua vizinha repete em alemão padrão, devagar, como se falasse com uma criança.)`,
    `(Deine Nachbarin wiederholt es auf Hochdeutsch, langsam, wie für ein Kind.)`],
  nbQ: [
    `"My new wardrobe has 214 screws and no instructions. 120 francs if it stands." (takes the day)`,
    `« Ma nouvelle armoire a 214 vis et pas de notice. 120 francs si elle tient debout. » (prend la journée)`,
    `"Meu guarda-roupa novo tem 214 parafusos e nenhum manual. 120 francos se ficar de pé." (leva o dia todo)`,
    `«Mein neuer Schrank hat 214 Schrauben und keine Anleitung. 120 Franken, wenn er steht.» (dauert den ganzen Tag)`],
  nbHow: [
    `She did keep one page: a sequence of arrows. Memorise it, then repeat it with the arrow keys.`,
    `Elle a gardé une seule page : une suite de flèches. Mémorise-la, puis refais-la avec les flèches.`,
    `Ela guardou uma página: uma sequência de setas. Decore e repita com as setas do teclado.`,
    `Eine Seite hat sie behalten: eine Folge von Pfeilen. Merk sie dir und wiederhole sie mit den Pfeiltasten.`],
  nbWin: [
    `It stands. One screw is left over. She pays you 120 francs in exact change and a look that says the wardrobe leans.`,
    `Elle tient. Il reste une vis. Elle te paie 120 francs, au centime près, avec un regard qui dit que l'armoire penche.`,
    `Ficou de pé. Sobrou um parafuso. Ela paga 120 francos trocadinhos e um olhar que diz que o guarda-roupa está torto.`,
    `Er steht. Eine Schraube bleibt übrig. Sie zahlt dir 120 Franken, passend, mit einem Blick, der sagt: Der Schrank ist schief.`],
  nbFail: [
    `Six hours in, it is a bookshelf. She does not pay for bookshelves. Come back tomorrow.`,
    `Après six heures, c'est une étagère. Elle ne paie pas pour les étagères. Reviens demain.`,
    `Seis horas depois, virou uma estante. Ela não paga por estantes. Volte amanhã.`,
    `Nach sechs Stunden ist es ein Bücherregal. Für Bücherregale zahlt sie nicht. Komm morgen wieder.`],
  nbDone: [
    `"The wardrobe leans. We do not speak of it."`,
    `« L'armoire penche. Nous n'en parlons pas. »`,
    `"O guarda-roupa está torto. Não falamos sobre isso."`,
    `«Der Schrank ist schief. Wir reden nicht darüber.»`],
  watch: [`Watch...`, `Regarde...`, `Observe...`, `Schau zu...`],
  repeat: [`Your turn:`, `À toi :`, `Sua vez:`, `Du bist dran:`],

  offEmployed: [
    `Gletscher Labs. You work here now. The coffee is free. That is how they get you.`,
    `Gletscher Labs. Tu travailles ici maintenant. Le café est gratuit. C'est comme ça qu'ils t'ont.`,
    `Gletscher Labs. Você trabalha aqui agora. O café é de graça. É assim que eles te pegam.`,
    `Gletscher Labs. Du arbeitest jetzt hier. Der Kaffee ist gratis. So kriegen sie dich.`],
  offQ: [
    `Gletscher Labs. Go in for the interview? (takes the day)`,
    `Gletscher Labs. Entrer pour l'entretien ? (prend la journée)`,
    `Gletscher Labs. Entrar para a entrevista? (leva o dia todo)`,
    `Gletscher Labs. Zum Vorstellungsgespräch reingehen? (dauert den ganzen Tag)`],
  offWin1: [`"When can you start?"`, `« Vous pouvez commencer quand ? »`, `"Quando você pode começar?"`, `«Wann können Sie anfangen?»`],
  offWin2: [
    `You got the job. A CHF 3,000 signing bonus lands in your account. You check the balance four times to be sure.`,
    `Tu as le poste. Une prime de CHF 3 000 arrive sur ton compte. Tu vérifies le solde quatre fois pour être sûr.`,
    `O emprego é seu. Um bônus de CHF 3.000 cai na conta. Você confere o saldo quatro vezes para ter certeza.`,
    `Du hast den Job. Ein Bonus von CHF 3'000 landet auf deinem Konto. Du prüfst den Kontostand viermal, zur Sicherheit.`],
  offLose1: [
    `"We will be in touch." They will not be in touch.`,
    `« On vous recontacte. » Ils ne recontacteront pas.`,
    `"A gente entra em contato." Eles não vão entrar em contato.`,
    `«Wir melden uns.» Sie werden sich nicht melden.`],
  offLose2: [
    `You walk home replaying every answer. Somewhere in the flat is a box of things from when you knew what you were doing.`,
    `Tu rentres en repassant chaque réponse. Quelque part dans l'appart, il y a un carton de l'époque où tu savais ce que tu faisais.`,
    `Você volta para casa repassando cada resposta. Em algum canto do apê há uma caixa da época em que você sabia o que estava fazendo.`,
    `Du gehst heim und spielst jede Antwort nochmal durch. Irgendwo in der Wohnung steht eine Kiste aus der Zeit, als du wusstest, was du tust.`],

  hbBroke: [
    `Zurich HB. A ticket to Marseille is CHF 89. You do not have CHF 89. The railway does not do pity.`,
    `Zurich HB. Le billet pour Marseille coûte CHF 89. Tu n'as pas CHF 89. Les chemins de fer ne font pas dans la pitié.`,
    `Zurique HB. A passagem para Marselha custa CHF 89. Você não tem CHF 89. A ferrovia não trabalha com pena.`,
    `Zürich HB. Ein Billett nach Marseille kostet CHF 89. Du hast keine CHF 89. Die Bahn kennt kein Mitleid.`],
  hbQ: [
    `Zurich HB. Ticket to Marseille, CHF 89? (takes the day)`,
    `Zurich HB. Billet pour Marseille, CHF 89 ? (prend la journée)`,
    `Zurique HB. Passagem para Marselha, CHF 89? (leva o dia todo)`,
    `Zürich HB. Billett nach Marseille, CHF 89? (dauert den ganzen Tag)`],
  hb1: [
    `The train leaves at 07:34. Not 07:35. This is Switzerland.`,
    `Le train part à 07h34. Pas 07h35. On est en Suisse.`,
    `O trem sai às 07:34. Não às 07:35. Isto é a Suíça.`,
    `Der Zug fährt um 07:34. Nicht 07:35. Das ist die Schweiz.`],
  hb2: [
    `Seven hours of window, wondering how a continent this small puts everyone you love this far away.`,
    `Sept heures de fenêtre, à te demander comment un continent si petit met si loin tous ceux que tu aimes.`,
    `Sete horas de janela, pensando em como um continente tão pequeno deixa tão longe todo mundo que você ama.`,
    `Sieben Stunden Fenster und die Frage, wie ein so kleiner Kontinent alle, die du liebst, so weit wegstellen kann.`],
  dodgeIntro: [
    `Geneva. Your connection leaves in four minutes from the far end of the station. Up and Down to dodge. Run.`,
    `Genève. Ta correspondance part dans quatre minutes, à l'autre bout de la gare. Haut et Bas pour esquiver. Cours.`,
    `Genebra. Sua conexão sai em quatro minutos, do outro lado da estação. Cima e Baixo para desviar. Corra.`,
    `Genf. Dein Anschluss fährt in vier Minuten, am anderen Ende des Bahnhofs. Hoch und Runter zum Ausweichen. Lauf.`],
  dodgeBack: [
    `Lyon. The same four minutes, in the other direction. Up and Down to dodge.`,
    `Lyon. Les mêmes quatre minutes, dans l'autre sens. Haut et Bas pour esquiver.`,
    `Lyon. Os mesmos quatro minutos, no sentido contrário. Cima e Baixo para desviar.`,
    `Lyon. Dieselben vier Minuten, in die andere Richtung. Hoch und Runter zum Ausweichen.`],
  dodgeHud: [`Connection in {0}s · collisions {1}/3`, `Correspondance dans {0}s · collisions {1}/3`, `Conexão em {0}s · trombadas {1}/3`, `Anschluss in {0}s · Zusammenstösse {1}/3`],
  dodgeOk: [
    `You make it with eleven seconds to spare and the heart rate of a hummingbird.`,
    `Tu y arrives avec onze secondes d'avance et le pouls d'un colibri.`,
    `Você consegue com onze segundos de folga e o coração de um beija-flor.`,
    `Du schaffst es mit elf Sekunden Reserve und dem Puls eines Kolibris.`],
  dodgeMiss: [
    `Three suitcases later, the doors close in your face. The next train is tomorrow. You sleep at the station, upright. (one extra day)`,
    `Trois valises plus tard, les portes se ferment sous ton nez. Prochain train demain. Tu dors à la gare, assis. (un jour de plus)`,
    `Três malas depois, as portas fecham na sua cara. O próximo trem é amanhã. Você dorme na estação, sentado. (um dia a mais)`,
    `Drei Koffer später schliessen die Türen vor deiner Nase. Der nächste Zug fährt morgen. Du schläfst am Bahnhof, im Sitzen. (ein Tag mehr)`],

  gareQ: [
    `Gare Saint-Charles. Train back to Zurich, CHF 89? (takes the day)`,
    `Gare Saint-Charles. Train retour pour Zurich, CHF 89 ? (prend la journée)`,
    `Gare Saint-Charles. Trem de volta para Zurique, CHF 89? (leva o dia todo)`,
    `Gare Saint-Charles. Zug zurück nach Zürich, CHF 89? (dauert den ganzen Tag)`],
  gareBroke: [
    `Your card is declined. Your sister buys the ticket. You will hear about this at every family dinner until 2040.`,
    `Ta carte est refusée. Ta sœur paie le billet. Tu en entendras parler à chaque repas de famille jusqu'en 2040.`,
    `Seu cartão é recusado. Sua irmã paga a passagem. Você vai ouvir sobre isso em todo almoço de família até 2040.`,
    `Deine Karte wird abgelehnt. Deine Schwester kauft das Billett. Das hörst du bei jedem Familienessen bis 2040.`],
  gare1: [
    `The train is 25 minutes late and nobody minds. You mind a little. You have been in Zurich too long.`,
    `Le train a 25 minutes de retard et tout le monde s'en fiche. Toi, ça te gêne un peu. Tu vis à Zurich depuis trop longtemps.`,
    `O trem está 25 minutos atrasado e ninguém liga. Você liga um pouco. Faz tempo demais que mora em Zurique.`,
    `Der Zug hat 25 Minuten Verspätung und niemanden stört es. Dich stört es ein bisschen. Du bist schon zu lange in Zürich.`],

  patIdle: [`The pâtisserie. It smells like a better life.`, `La pâtisserie. Ça sent une vie meilleure.`, `A pâtisserie. Tem cheiro de uma vida melhor.`, `Die Pâtisserie. Es riecht nach einem besseren Leben.`],
  patQ: [
    `"Bonjour ! One birthday cake, 28. Yes, we take francs. No, you will not like the rate."`,
    `« Bonjour ! Un gâteau d'anniversaire, 28. Oui, on prend les francs suisses. Non, le taux ne va pas vous plaire. »`,
    `"Bonjour! Um bolo de aniversário, 28. Sim, aceitamos francos. Não, você não vai gostar do câmbio."`,
    `«Bonjour! Eine Geburtstagstorte, 28. Ja, wir nehmen Franken. Nein, der Kurs wird Ihnen nicht gefallen.»`],
  patFree: [
    `The baker looks at your card, then at you, and hands over yesterday's cake for free. Marseille.`,
    `Le pâtissier regarde ta carte, puis toi, et te donne le gâteau d'hier. Gratuit. Marseille.`,
    `O confeiteiro olha o cartão, olha você, e te dá o bolo de ontem de graça. Marselha.`,
    `Der Konditor schaut auf deine Karte, dann auf dich, und gibt dir die Torte von gestern gratis. Marseille.`],
  patGot: [`You now carry a cake through a city of scooters.`, `Te voilà avec un gâteau dans une ville de scooters.`, `Agora você carrega um bolo por uma cidade de scooters.`, `Jetzt trägst du eine Torte durch eine Stadt voller Roller.`],

  sis1: [
    `"You came! The birthday is today and I forgot the cake. Do not look at me like that."`,
    `« Tu es venu ! L'anniversaire, c'est aujourd'hui et j'ai oublié le gâteau. Ne me regarde pas comme ça. »`,
    `"Você veio! O aniversário é hoje e eu esqueci o bolo. Não me olha assim."`,
    `«Du bist da! Der Geburtstag ist heute und ich habe die Torte vergessen. Schau mich nicht so an.»`],
  sis2: [
    `"The pâtisserie is up by the station. Go, go."`,
    `« La pâtisserie est en haut, près de la gare. Allez, file. »`,
    `"A pâtisserie fica lá em cima, perto da estação. Vai, vai."`,
    `«Die Pâtisserie ist oben beim Bahnhof. Los, los.»`],
  sisDone: [
    `"Stay longer next time. I am not saying it. I am just saying it."`,
    `« Reste plus longtemps la prochaine fois. Je dis rien. Je dis juste. »`,
    `"Fica mais da próxima vez. Não estou dizendo nada. Só estou dizendo."`,
    `«Bleib nächstes Mal länger. Ich sag ja nichts. Ich sag's nur.»`],
  sisWin1: [`"You saved the day. You should live closer."`, `« Tu as sauvé la journée. Tu devrais habiter plus près. »`, `"Você salvou o dia. Devia morar mais perto."`, `«Du hast den Tag gerettet. Du solltest näher wohnen.»`],
  sisWin2: [
    `Candles, singing in three languages, none of them in tune.`,
    `Des bougies, des chants en trois langues, tous faux.`,
    `Velas, parabéns em três línguas, nenhuma afinada.`,
    `Kerzen, Gesang in drei Sprachen, keine davon im Ton.`],
  sisWin3: [
    `Your nieces hand you a drawing: you, a train, and a very large dog you do not own. It is going on the fridge.`,
    `Tes nièces te tendent un dessin : toi, un train et un très gros chien que tu n'as pas. Il ira sur le frigo.`,
    `Suas sobrinhas te entregam um desenho: você, um trem e um cachorro enorme que você não tem. Vai para a geladeira.`,
    `Deine Nichten geben dir eine Zeichnung: du, ein Zug und ein sehr grosser Hund, den du nicht hast. Sie kommt an den Kühlschrank.`],
  partner: [
    `"Pastis? It is eleven in the morning, so technically yes."`,
    `« Un pastis ? Il est onze heures du matin, donc techniquement oui. »`,
    `"Um pastis? São onze da manhã, então tecnicamente sim."`,
    `«Ein Pastis? Es ist elf Uhr morgens, also technisch gesehen ja.»`],
  n1a: [`"Did you bring a present? Is the present cake?"`, `« Tu as apporté un cadeau ? C'est un gâteau, le cadeau ? »`, `"Você trouxe presente? O presente é bolo?"`, `«Hast du ein Geschenk dabei? Ist das Geschenk Kuchen?»`],
  n1b: [`"Next time stay for TEN days."`, `« La prochaine fois tu restes DIX jours. »`, `"Da próxima vez fica DEZ dias."`, `«Nächstes Mal bleibst du ZEHN Tage.»`],
  n2a: [
    `"She kept asking when you arrive. I was not asking. I was only wondering."`,
    `« Elle demandait tout le temps quand tu arrives. Moi je demandais pas. Je me demandais juste. »`,
    `"Ela ficava perguntando quando você chega. Eu não perguntei. Só fiquei pensando."`,
    `«Sie hat dauernd gefragt, wann du kommst. Ich hab nicht gefragt. Ich hab's mich nur gefragt.»`],
  n2b: [`"The dog in the drawing is called Michel too."`, `« Le chien du dessin s'appelle Michel aussi. »`, `"O cachorro do desenho também se chama Michel."`, `«Der Hund auf der Zeichnung heisst auch Michel.»`],

  leader1: [
    `"Michel! Storm is coming and the little ones' tent is down. Find the rope and fix it."`,
    `« Michel ! L'orage arrive et la tente des petits est par terre. Trouve la corde et répare ça. »`,
    `"Michel! Vem tempestade e a barraca dos pequenos caiu. Acha a corda e conserta."`,
    `«Michel! Ein Gewitter kommt und das Zelt der Kleinen liegt am Boden. Such das Seil und bring das in Ordnung.»`],
  leader2: [`"A scout is always...? Exactly. Go."`, `« Un scout est toujours... ? Exactement. File. »`, `"Escoteiro está sempre...? Exatamente. Vai."`, `«Ein Pfadi ist allzeit...? Genau. Los.»`],
  rope: [`You got the rope. It is damp, like everything else here.`, `Tu as la corde. Elle est humide, comme tout le reste ici.`, `Você pegou a corda. Está úmida, como todo o resto aqui.`, `Du hast das Seil. Es ist feucht, wie alles hier.`],
  kid: [
    `"My sock is wet. Both socks. Also the frog is gone."`,
    `« Ma chaussette est mouillée. Les deux. Et la grenouille a disparu. »`,
    `"Minha meia tá molhada. As duas. E o sapo sumiu."`,
    `«Meine Socke ist nass. Beide. Und der Frosch ist weg.»`],
  tentNeed: [
    `A collapsed tent and eleven worried faces. It needs rope.`,
    `Une tente effondrée et onze visages inquiets. Il faut de la corde.`,
    `Uma barraca caída e onze carinhas preocupadas. Precisa de corda.`,
    `Ein eingestürztes Zelt und elf besorgte Gesichter. Es braucht ein Seil.`],
  tentHow: [
    `Four knots, in the right order. Memorise the arrows, then repeat them.`,
    `Quatre nœuds, dans le bon ordre. Mémorise les flèches, puis refais-les.`,
    `Quatro nós, na ordem certa. Decore as setas e repita.`,
    `Vier Knoten, in der richtigen Reihenfolge. Merk dir die Pfeile und wiederhole sie.`],
  tentFail: [
    `The knot slips. Eleven faces get more worried. Try again.`,
    `Le nœud glisse. Onze visages s'inquiètent un peu plus. Réessaie.`,
    `O nó escorrega. Onze carinhas ficam mais preocupadas. Tente de novo.`,
    `Der Knoten rutscht. Elf Gesichter werden noch besorgter. Versuch's nochmal.`],
  tent1: [
    `Clove hitch, taut-line, done. The tent stands as the rain arrives.`,
    `Nœud de cabestan, nœud de tendeur, terminé. La tente tient quand la pluie arrive.`,
    `Volta do fiel, nó de esticar, pronto. A barraca fica de pé bem quando a chuva chega.`,
    `Mastwurf, Spannknoten, fertig. Das Zelt steht, als der Regen kommt.`],
  tent2: [
    `You remember now: nobody is ever ready. You just tie the next knot.`,
    `Ça te revient : personne n'est jamais prêt. On fait juste le nœud suivant.`,
    `Agora você lembra: ninguém nunca está pronto. A gente só dá o próximo nó.`,
    `Jetzt weisst du es wieder: Niemand ist je bereit. Man macht einfach den nächsten Knoten.`],
  tent3: [`You learned BE PREPARED.`, `Tu as appris TOUJOURS PRÊT.`, `Você aprendeu SEMPRE ALERTA.`, `Du hast ALLZEIT BEREIT gelernt.`],
  tent4: [
    `You wake up in Zurich with the scarf in your hand.`,
    `Tu te réveilles à Zurich, le foulard à la main.`,
    `Você acorda em Zurique com o lenço na mão.`,
    `Du wachst in Zürich auf, das Halstuch in der Hand.`],

  rent: [
    `Rent day. CHF 1,850 leaves your account without saying goodbye.`,
    `Jour du loyer. CHF 1 850 quittent ton compte sans dire au revoir.`,
    `Dia do aluguel. CHF 1.850 saem da sua conta sem se despedir.`,
    `Miettag. CHF 1'850 verlassen dein Konto, ohne sich zu verabschieden.`],
  rentSalary: [`At least the salary arrived first.`, `Au moins, le salaire est arrivé avant.`, `Pelo menos o salário caiu antes.`, `Immerhin kam der Lohn zuerst.`],
  overdrawn: [
    `You are overdrawn. No tickets, no cake, until you earn it back.`,
    `Tu es à découvert. Ni billets ni gâteau tant que tu n'as pas remonté la pente.`,
    `Você está no vermelho. Nada de passagem nem de bolo até sair dessa.`,
    `Du bist im Minus. Keine Billette, keine Torte, bis du es wieder verdient hast.`],

  fightTitle: [`INTERVIEW`, `ENTRETIEN`, `ENTREVISTA`, `VORSTELLUNGSGESPRÄCH`],
  fightPrompt: [
    `Your confidence {0}/{1} · Their skepticism {2}/30`,
    `Ta confiance {0}/{1} · Leur scepticisme {2}/30`,
    `Sua confiança {0}/{1} · Ceticismo deles {2}/30`,
    `Dein Selbstvertrauen {0}/{1} · Ihre Skepsis {2}/30`],
  mvPython: same(`Python`),
  mvPythonL: [
    `You whiteboard a clean solution. They nod at the type hints.`,
    `Tu écris une solution propre au tableau. Ils hochent la tête devant les annotations de type.`,
    `Você escreve uma solução limpa no quadro. Eles aprovam os type hints com a cabeça.`,
    `Du schreibst eine saubere Lösung ans Whiteboard. Bei den Type Hints nicken sie.`],
  mvGerman: [`German`, `Allemand`, `Alemão`, `Deutsch`],
  mvGermanL: [
    `You answer auf Deutsch. They reply in Swiss German. You nod as if that were the same language.`,
    `Tu réponds auf Deutsch. Ils répondent en suisse allemand. Tu hoches la tête comme si c'était la même langue.`,
    `Você responde auf Deutsch. Eles respondem em suíço-alemão. Você concorda com a cabeça como se fosse a mesma língua.`,
    `Du antwortest auf Hochdeutsch. Sie antworten auf Schweizerdeutsch. Du nickst, als wäre das dieselbe Sprache.`],
  mvCharm: [`Charm`, `Charme`, `Charme`, `Charme`],
  mvCharmL: [
    `You tell the Antarctica story. It works on everyone except HR.`,
    `Tu racontes l'histoire de l'Antarctique. Ça marche sur tout le monde sauf les RH.`,
    `Você conta a história da Antártida. Funciona com todo mundo, menos com o RH.`,
    `Du erzählst die Antarktis-Geschichte. Sie wirkt bei allen ausser bei HR.`],
  mvPrepared: [`Be Prepared`, `Toujours prêt`, `Sempre Alerta`, `Allzeit bereit`],
  mvPreparedL: [
    `You stop performing and just tie the next knot: clear answer, honest gap, real question back.`,
    `Tu arrêtes de jouer un rôle et tu fais juste le nœud suivant : réponse claire, trou assumé, vraie question en retour.`,
    `Você para de representar e só dá o próximo nó: resposta clara, lacuna assumida, uma pergunta de verdade de volta.`,
    `Du hörst auf zu schauspielern und machst einfach den nächsten Knoten: klare Antwort, ehrliche Lücke, echte Gegenfrage.`],
  q1: [`"Where do you see yourself in five years?"`, `« Où vous voyez-vous dans cinq ans ? »`, `"Onde você se vê daqui a cinco anos?"`, `«Wo sehen Sie sich in fünf Jahren?»`],
  q2: [`"Walk me through this gap in your CV."`, `« Parlez-moi de ce trou dans votre CV. »`, `"Me explica essa lacuna no seu currículo."`, `«Erklären Sie mir diese Lücke im Lebenslauf.»`],
  q3: [
    `"We use a framework you have never heard of. Thoughts?"`,
    `« On utilise un framework dont vous n'avez jamais entendu parler. Un avis ? »`,
    `"Usamos um framework do qual você nunca ouviu falar. O que acha?"`,
    `«Wir nutzen ein Framework, von dem Sie noch nie gehört haben. Gedanken dazu?»`],
} satisfies Record<string, Line>;

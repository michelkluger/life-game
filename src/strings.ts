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
    `The box is empty, the job is yours, the cake got eaten. For one evening, nothing is overdue.`,
    `Le carton est vide, le poste est à toi, le gâteau est mangé. Pour un soir, rien n'est en retard.`,
    `A caixa está vazia, o emprego é seu, o bolo foi comido. Por uma noite, nada está atrasado.`,
    `Die Kiste ist leer, der Job gehört dir, die Torte ist gegessen. Einen Abend lang ist nichts überfällig.`],
  end2: [
    `That is the end of this build. Still to come: Brazil, paragliding, running, dating, and the futures you can choose.`,
    `C'est la fin de cette version. À venir : le Brésil, le parapente, la course, les rencards et les futurs à choisir.`,
    `Fim desta versão. Ainda por vir: Brasil, parapente, corrida, encontros e os futuros que você pode escolher.`,
    `Das ist das Ende dieser Version. Es folgen: Brasilien, Gleitschirm, Laufen, Dates und die Zukünfte, die du wählen kannst.`],

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

  // ---- Activity tracker ----
  actWalk: [`Walk`, `Marche`, `Caminhada`, `Gehen`],
  actRide: [`Ride`, `Vélo`, `Pedal`, `Velo`],
  actSwim: [`Swim`, `Nage`, `Natação`, `Schwimmen`],
  actTitleWalk: [`Afternoon Walk`, `Marche de l'après-midi`, `Caminhada da tarde`, `Nachmittagsspaziergang`],
  actTitleRide: [`Afternoon Ride`, `Sortie vélo de l'après-midi`, `Pedal da tarde`, `Nachmittagsausfahrt`],
  actTitleSwim: [`Afternoon Swim`, `Nage de l'après-midi`, `Natação da tarde`, `Nachmittagsschwimmen`],
  actDist: [`Distance`, `Distance`, `Distância`, `Distanz`],
  actTime: [`Time`, `Durée`, `Tempo`, `Zeit`],
  actSpeed: [`Avg speed`, `Vitesse moy.`, `Vel. média`, `Ø Tempo`],
  actKudos: [`{0} kudos`, `{0} kudos`, `{0} kudos`, `{0} Kudos`],

  // ---- More memories from the box ----
  mSvalbard: same(`Svalbard, 2015`),
  mVienna: [`Vienna, 2016`, `Vienne, 2016`, `Viena, 2016`, `Wien, 2016`],
  mMunich: [`Munich, 2018`, `Munich, 2018`, `Munique, 2018`, `München, 2018`],
  mAntarctica: [`Antarctica, 2019`, `Antarctique, 2019`, `Antártida, 2019`, `Antarktis, 2019`],
  boxEmpty: [
    `The box is empty now. Whatever comes next is not in a box.`,
    `Le carton est vide. La suite n'est pas dans un carton.`,
    `A caixa está vazia. O que vem agora não está numa caixa.`,
    `Die Kiste ist jetzt leer. Was als Nächstes kommt, liegt in keiner Kiste.`],
  boxSvalHint: [
    `Next in the box: a patch from an Arctic university. It feels cold. You have not been properly cold in years. The lake is right there.`,
    `Ensuite dans le carton : un écusson d'une université arctique. Il est froid. Tu n'as pas eu vraiment froid depuis des années. Le lac est juste là.`,
    `O próximo na caixa: um emblema de uma universidade do Ártico. Está frio. Faz anos que você não passa frio de verdade. O lago está logo ali.`,
    `Als Nächstes in der Kiste: ein Aufnäher einer arktischen Uni. Er fühlt sich kalt an. Dir war seit Jahren nicht mehr richtig kalt. Der See ist gleich da drüben.`],
  boxSvalOpen: [
    `You pick up the patch with wet hands. Svalbard, January 2015. 78 degrees north, and the sun has not risen in two months.`,
    `Tu prends l'écusson, les mains mouillées. Svalbard, janvier 2015. 78 degrés nord, et le soleil ne s'est pas levé depuis deux mois.`,
    `Você pega o emblema com as mãos molhadas. Svalbard, janeiro de 2015. 78 graus norte, e o sol não nasce há dois meses.`,
    `Du nimmst den Aufnäher mit nassen Händen. Spitzbergen, Januar 2015. 78 Grad Nord, und die Sonne ist seit zwei Monaten nicht aufgegangen.`],
  boxVieHint: [
    `Next in the box: a Vienna tram ticket from your first engineering job. It means nothing to a man without one. Get a job first.`,
    `Ensuite dans le carton : un ticket de tram viennois, de ton premier poste d'ingénieur. Il ne dit rien à un homme sans poste. Trouve d'abord un boulot.`,
    `O próximo na caixa: um bilhete de bonde de Viena, do seu primeiro emprego de engenheiro. Não diz nada a um homem sem emprego. Arrume um primeiro.`,
    `Als Nächstes in der Kiste: ein Wiener Tramticket aus deinem ersten Ingenieursjob. Einem Mann ohne Job sagt es nichts. Such dir erst einen.`],
  boxVieOpen: [
    `The tram ticket. Vienna, 2016. First real job: flight software for a rocket. You are twenty-six and own one good shirt.`,
    `Le ticket de tram. Vienne, 2016. Premier vrai poste : logiciel de vol pour une fusée. Tu as vingt-six ans et une seule bonne chemise.`,
    `O bilhete de bonde. Viena, 2016. Primeiro emprego de verdade: software de voo para um foguete. Você tem vinte e seis anos e uma camisa boa.`,
    `Das Tramticket. Wien, 2016. Erster richtiger Job: Flugsoftware für eine Rakete. Du bist sechsundzwanzig und besitzt ein gutes Hemd.`],
  boxMunHint: [
    `Next in the box: a fire brigade pager. It stays silent. It only seems to care when candles are involved.`,
    `Ensuite dans le carton : un bip de pompier volontaire. Il reste muet. Il ne semble réagir qu'en présence de bougies.`,
    `O próximo na caixa: um pager do corpo de bombeiros. Fica mudo. Parece que só se importa quando há velas por perto.`,
    `Als Nächstes in der Kiste: ein Feuerwehr-Pager. Er bleibt stumm. Er scheint sich nur für Kerzen zu interessieren.`],
  boxMunOpen: [
    `The pager. Munich, 2018. By day you fly navigation satellites. By night you are a volunteer firefighter. You sleep on Sundays.`,
    `Le bip. Munich, 2018. Le jour, tu pilotes des satellites de navigation. La nuit, tu es pompier volontaire. Tu dors le dimanche.`,
    `O pager. Munique, 2018. De dia você pilota satélites de navegação. De noite é bombeiro voluntário. Você dorme aos domingos.`,
    `Der Pager. München, 2018. Tagsüber fliegst du Navigationssatelliten. Nachts bist du bei der Freiwilligen Feuerwehr. Du schläfst sonntags.`],
  boxAntHint: [
    `Last in the box: the parka. Antarctica taught you to wait, and you have not waited for anything yet. Pay a month's rent first.`,
    `Dernier objet du carton : la parka. L'Antarctique t'a appris à attendre, et tu n'as encore rien attendu. Paie d'abord un mois de loyer.`,
    `Por último na caixa: a parca. A Antártida te ensinou a esperar, e você ainda não esperou por nada. Pague um mês de aluguel primeiro.`,
    `Zuletzt in der Kiste: der Parka. Die Antarktis hat dich Warten gelehrt, und du hast noch auf nichts gewartet. Zahl erst eine Monatsmiete.`],
  boxAntOpen: [
    `The parka still smells of diesel. Antarctica, 2019. The nearest shop is four thousand kilometres away and it is closed.`,
    `La parka sent encore le diesel. Antarctique, 2019. Le magasin le plus proche est à quatre mille kilomètres, et il est fermé.`,
    `A parca ainda cheira a diesel. Antártida, 2019. A loja mais próxima fica a quatro mil quilômetros, e está fechada.`,
    `Der Parka riecht noch nach Diesel. Antarktis, 2019. Der nächste Laden ist viertausend Kilometer entfernt und hat zu.`],

  svProf1: [
    `"Welcome to the top of the world. The underwater robot is at the ice hole and its cable is frozen in. Go and free it."`,
    `« Bienvenue au sommet du monde. Le robot sous-marin est au trou dans la glace et son câble est gelé. Va le libérer. »`,
    `"Bem-vindo ao topo do mundo. O robô submarino está no buraco no gelo e o cabo congelou. Vá soltá-lo."`,
    `«Willkommen am oberen Ende der Welt. Der Unterwasserroboter ist am Eisloch und sein Kabel ist eingefroren. Geh ihn befreien.»`],
  svProf2: [
    `"Rule one: nobody leaves town without a polar bear guard. Rule two: see rule one."`,
    `« Règle un : personne ne quitte la ville sans garde anti-ours polaire. Règle deux : voir règle un. »`,
    `"Regra um: ninguém sai da cidade sem um guarda contra urso-polar. Regra dois: veja a regra um."`,
    `«Regel eins: Niemand verlässt den Ort ohne Eisbärenwache. Regel zwei: siehe Regel eins.»`],
  svGuard: [
    `"I am your polar bear guard. If we meet a bear, I handle it. If you see me running, try to keep up."`,
    `« Je suis ta garde anti-ours. Si on croise un ours, je gère. Si tu me vois courir, essaie de suivre. »`,
    `"Sou seu guarda contra urso-polar. Se aparecer um urso, eu resolvo. Se me vir correndo, tente acompanhar."`,
    `«Ich bin deine Eisbärenwache. Wenn wir einen Bären treffen, kümmere ich mich. Wenn du mich rennen siehst, versuch mitzuhalten.»`],
  svNoGuard: [
    `You remember rule one. You go and find the guard first.`,
    `Tu te souviens de la règle un. Tu vas d'abord chercher la garde.`,
    `Você lembra da regra um. Vai primeiro procurar o guarda.`,
    `Dir fällt Regel eins ein. Du suchst zuerst die Wache.`],
  svBear: [
    `A polar bear. Or a snowdrift. You decide it is a snowdrift and walk the other way with great dignity.`,
    `Un ours polaire. Ou une congère. Tu décides que c'est une congère et tu repars dans l'autre sens avec beaucoup de dignité.`,
    `Um urso-polar. Ou um monte de neve. Você decide que é um monte de neve e vai embora com muita dignidade.`,
    `Ein Eisbär. Oder eine Schneewehe. Du beschliesst, es ist eine Schneewehe, und gehst mit grosser Würde in die andere Richtung.`],
  svHole: [
    `The cable is free. Now steer the robot up through the drifting ice. Up and Down.`,
    `Le câble est libéré. Maintenant, remonte le robot entre les glaces dérivantes. Haut et Bas.`,
    `O cabo está solto. Agora pilote o robô entre os blocos de gelo. Cima e Baixo.`,
    `Das Kabel ist frei. Jetzt steuere den Roboter durch das Treibeis nach oben. Hoch und Runter.`],
  dodgeHudSea: [`Surface in {0}s · bumps {1}/3`, `Surface dans {0}s · chocs {1}/3`, `Superfície em {0}s · batidas {1}/3`, `Oberfläche in {0}s · Stösse {1}/3`],
  svFail: [
    `The robot comes up dented and offended. Try again.`,
    `Le robot remonte cabossé et vexé. Réessaie.`,
    `O robô sobe amassado e ofendido. Tente de novo.`,
    `Der Roboter taucht verbeult und beleidigt auf. Versuch's nochmal.`],
  sv1: [
    `The robot surfaces with a sea angel stuck to its camera. Marine biology: technically achieved.`,
    `Le robot refait surface avec un ange de mer collé à la caméra. Biologie marine : techniquement accomplie.`,
    `O robô sobe com um anjo-do-mar grudado na câmera. Biologia marinha: tecnicamente concluída.`,
    `Der Roboter taucht mit einem Seeengel an der Kamera auf. Meeresbiologie: technisch gesehen erledigt.`],
  sv2: [
    `You learned COLD BLOOD: cold water no longer slows you down.`,
    `Tu as appris SANG-FROID : l'eau froide ne te ralentit plus.`,
    `Você aprendeu SANGUE FRIO: água gelada não te deixa mais lento.`,
    `Du hast KALTES BLUT gelernt: Kaltes Wasser bremst dich nicht mehr.`],
  sv3: [
    `You wake up in Zurich. The radiator is on. You turn it down, out of respect.`,
    `Tu te réveilles à Zurich. Le radiateur est allumé. Tu le baisses, par respect.`,
    `Você acorda em Zurique. O aquecedor está ligado. Você abaixa, por respeito.`,
    `Du wachst in Zürich auf. Die Heizung läuft. Du drehst sie runter, aus Respekt.`],

  viBoss1: [
    `"Servus! First day. The rocket's flight computer misses its timing by four milliseconds. The review is at three. No pressure."`,
    `« Servus ! Premier jour. L'ordinateur de vol de la fusée rate son timing de quatre millisecondes. La revue est à quinze heures. Aucune pression. »`,
    `"Servus! Primeiro dia. O computador de voo do foguete erra o tempo por quatro milissegundos. A revisão é às três. Sem pressão."`,
    `«Servus! Erster Tag. Der Flugcomputer der Rakete verfehlt sein Timing um vier Millisekunden. Das Review ist um drei. Kein Stress.»`],
  viBoss2: [
    `"But nobody here debugs before coffee. The Kaffeehaus is across the square."`,
    `« Mais ici, personne ne débogue avant le café. Le Kaffeehaus est de l'autre côté de la place. »`,
    `"Mas aqui ninguém depura antes do café. O Kaffeehaus fica do outro lado da praça."`,
    `«Aber hier debuggt niemand vor dem Kaffee. Das Kaffeehaus ist gegenüber.»`],
  viCol: [
    `"You learned German in Brazil? Very good. Here we speak something else."`,
    `« Tu as appris l'allemand au Brésil ? Très bien. Ici, on parle autre chose. »`,
    `"Você aprendeu alemão no Brasil? Muito bem. Aqui a gente fala outra coisa."`,
    `«Du hast Deutsch in Brasilien gelernt? Sehr gut. Hier reden wir was anderes.»`],
  viWaiter1: [
    `The waiter sees you. The waiter looks away. This is Vienna.`,
    `Le serveur te voit. Le serveur détourne le regard. On est à Vienne.`,
    `O garçom te vê. O garçom desvia o olhar. Isto é Viena.`,
    `Der Ober sieht dich. Der Ober schaut weg. Das ist Wien.`],
  viWaiter2: [
    `"Entschuldigung?" The waiter polishes a spoon that is already clean.`,
    `« Entschuldigung ? » Le serveur astique une cuillère déjà propre.`,
    `"Entschuldigung?" O garçom lustra uma colher que já está limpa.`,
    `«Entschuldigung?» Der Ober poliert einen Löffel, der schon sauber ist.`],
  viWaiter3: [
    `On the third try he brings a Melange and a glass of water, with the air of a man granting an audience.`,
    `Au troisième essai, il apporte un Melange et un verre d'eau, avec l'air d'un homme qui accorde une audience.`,
    `Na terceira tentativa ele traz um Melange e um copo d'água, com ar de quem concede uma audiência.`,
    `Beim dritten Versuch bringt er eine Melange und ein Glas Wasser, mit der Miene eines Mannes, der eine Audienz gewährt.`],
  viWaiterDone: [
    `"Pay? Later. Nobody has ever paid quickly here."`,
    `« Payer ? Plus tard. Personne n'a jamais payé vite ici. »`,
    `"Pagar? Depois. Ninguém nunca pagou rápido aqui."`,
    `«Zahlen? Später. Hier hat noch nie jemand schnell gezahlt.»`],
  viNoCoffee: [
    `You stare at the timing logs. The logs stare back. You need that coffee.`,
    `Tu fixes les journaux de timing. Les journaux te fixent. Il te faut ce café.`,
    `Você encara os logs de tempo. Os logs encaram de volta. Você precisa daquele café.`,
    `Du starrst auf die Timing-Logs. Die Logs starren zurück. Du brauchst diesen Kaffee.`],
  viTermHow: [
    `The boot sequence has to run in exactly the right order. Memorise the arrows, then repeat them.`,
    `La séquence de démarrage doit s'exécuter exactement dans le bon ordre. Mémorise les flèches, puis refais-les.`,
    `A sequência de inicialização precisa rodar exatamente na ordem certa. Decore as setas e repita.`,
    `Die Boot-Sequenz muss in genau der richtigen Reihenfolge laufen. Merk dir die Pfeile und wiederhole sie.`],
  viFail: [
    `Deadline missed by four milliseconds. In real-time systems, late is wrong. Try again.`,
    `Échéance ratée de quatre millisecondes. En temps réel, en retard veut dire faux. Réessaie.`,
    `Prazo perdido por quatro milissegundos. Em tempo real, atrasado é errado. Tente de novo.`,
    `Deadline um vier Millisekunden verpasst. In Echtzeitsystemen ist zu spät falsch. Versuch's nochmal.`],
  vi1: [
    `The timing holds. The boss says "passt", which is the highest praise available in Austria.`,
    `Le timing tient. Le chef dit « passt », le plus grand compliment disponible en Autriche.`,
    `O tempo fecha. O chefe diz "passt", o maior elogio disponível na Áustria.`,
    `Das Timing hält. Der Chef sagt «passt», das höchste Lob, das es in Österreich gibt.`],
  vi2: [
    `You learned REAL-TIME NERVES: crowds in stations move slower for you.`,
    `Tu as appris NERFS TEMPS RÉEL : les foules dans les gares bougent plus lentement pour toi.`,
    `Você aprendeu NERVOS DE TEMPO REAL: as multidões nas estações ficam mais lentas para você.`,
    `Du hast ECHTZEIT-NERVEN gelernt: Menschenmengen in Bahnhöfen bewegen sich für dich langsamer.`],
  vi3: [
    `You wake up in Zurich, craving a coffee that costs less than seven francs.`,
    `Tu te réveilles à Zurich avec l'envie d'un café à moins de sept francs.`,
    `Você acorda em Zurique com vontade de um café que custe menos de sete francos.`,
    `Du wachst in Zürich auf und sehnst dich nach einem Kaffee unter sieben Franken.`],

  muOps1: [
    `Night shift at the satellite control centre. Two dozen navigation satellites, one of them sulking.`,
    `Service de nuit au centre de contrôle des satellites. Deux douzaines de satellites de navigation, dont un qui boude.`,
    `Turno da noite no centro de controle de satélites. Duas dúzias de satélites de navegação, um deles emburrado.`,
    `Nachtschicht im Satellitenkontrollzentrum. Zwei Dutzend Navigationssatelliten, einer davon schmollt.`],
  muOps2: [
    `Send the recovery commands in the right order. Memorise the arrows, then repeat them.`,
    `Envoie les commandes de récupération dans le bon ordre. Mémorise les flèches, puis refais-les.`,
    `Envie os comandos de recuperação na ordem certa. Decore as setas e repita.`,
    `Sende die Recovery-Kommandos in der richtigen Reihenfolge. Merk dir die Pfeile und wiederhole sie.`],
  muFail: [
    `The satellite ignores you with 23,000 kilometres of contempt. Try again.`,
    `Le satellite t'ignore avec 23 000 kilomètres de mépris. Réessaie.`,
    `O satélite te ignora com 23.000 quilômetros de desprezo. Tente de novo.`,
    `Der Satellit ignoriert dich mit 23'000 Kilometern Verachtung. Versuch's nochmal.`],
  mu1: [
    `The satellite comes back. Somewhere a phone finds its blue dot again, and nobody says thank you.`,
    `Le satellite revient. Quelque part, un téléphone retrouve son point bleu, et personne ne dit merci.`,
    `O satélite volta. Em algum lugar um celular reencontra seu pontinho azul, e ninguém agradece.`,
    `Der Satellit meldet sich zurück. Irgendwo findet ein Handy seinen blauen Punkt wieder, und niemand sagt Danke.`],
  mu2: [
    `Your pager goes off. Fire brigade. The station is across town and the truck leaves in twelve seconds. Up and Down. Run.`,
    `Ton bip sonne. Les pompiers. La caserne est à l'autre bout de la ville et le camion part dans douze secondes. Haut et Bas. Cours.`,
    `Seu pager toca. Bombeiros. O quartel fica do outro lado da cidade e o caminhão sai em doze segundos. Cima e Baixo. Corra.`,
    `Dein Pager geht los. Feuerwehr. Die Wache ist am anderen Ende der Stadt und das Auto fährt in zwölf Sekunden. Hoch und Runter. Lauf.`],
  dodgeHudStreet: [`Truck leaves in {0}s · collisions {1}/3`, `Départ du camion dans {0}s · collisions {1}/3`, `Caminhão sai em {0}s · trombadas {1}/3`, `Abfahrt in {0}s · Zusammenstösse {1}/3`],
  muLate: [
    `You arrive as the truck pulls out. They let you roll up the hoses afterwards.`,
    `Tu arrives quand le camion démarre. Ils te laissent enrouler les tuyaux après coup.`,
    `Você chega quando o caminhão está saindo. Deixam você enrolar as mangueiras depois.`,
    `Du kommst an, als das Auto losfährt. Du darfst danach die Schläuche aufrollen.`],
  muOnTime: [
    `You make the truck. Lights, siren, the whole childhood dream.`,
    `Tu attrapes le camion. Gyrophares, sirène, tout le rêve d'enfant.`,
    `Você alcança o caminhão. Luzes, sirene, o sonho de criança completo.`,
    `Du erwischst das Auto. Blaulicht, Sirene, der ganze Kindheitstraum.`],
  mu3: [
    `The emergency is a pot of Weisswurst forgotten on the stove. The pot is beyond saving. The owner is fine.`,
    `L'urgence : une casserole de Weisswurst oubliée sur le feu. La casserole est perdue. Le propriétaire va bien.`,
    `A emergência é uma panela de Weisswurst esquecida no fogão. A panela não tem salvação. O dono está bem.`,
    `Der Notfall ist ein Topf Weisswürste, vergessen auf dem Herd. Der Topf ist nicht zu retten. Dem Besitzer geht es gut.`],
  mu4: [
    `You learned STAY CALM UNDER ALARM: puzzle arrows stay on screen longer.`,
    `Tu as appris CALME SOUS ALARME : les flèches des énigmes restent affichées plus longtemps.`,
    `Você aprendeu CALMA SOB ALARME: as setas dos enigmas ficam mais tempo na tela.`,
    `Du hast RUHE BEI ALARM gelernt: Rätselpfeile bleiben länger sichtbar.`],
  mu5: [
    `You wake up in Zurich. Your phone buzzes. It is only the rent reminder.`,
    `Tu te réveilles à Zurich. Ton téléphone vibre. Ce n'est que le rappel du loyer.`,
    `Você acorda em Zurique. O celular vibra. É só o lembrete do aluguel.`,
    `Du wachst in Zürich auf. Dein Handy vibriert. Es ist nur die Mietzins-Erinnerung.`],
  muCol: [
    `"In nineteen months nothing has ever gone wrong on my shift. Enjoy yours."`,
    `« En dix-neuf mois, rien n'a jamais mal tourné pendant mon service. Profite du tien. »`,
    `"Em dezenove meses nunca deu nada errado no meu turno. Aproveite o seu."`,
    `«In neunzehn Monaten ist in meiner Schicht nie etwas schiefgegangen. Viel Spass in deiner.»`],
  muBav: [
    `"Grüß Gott. A Brazilian in Bavaria guarding Europe's satellites. Have a pretzel."`,
    `« Grüß Gott. Un Brésilien en Bavière qui veille sur les satellites de l'Europe. Prends un bretzel. »`,
    `"Grüß Gott. Um brasileiro na Baviera cuidando dos satélites da Europa. Pega um pretzel."`,
    `«Grüß Gott. Ein Brasilianer in Bayern, der Europas Satelliten hütet. Nimm a Brezn.»`],

  anBoss1: [
    `"The weather mast has stopped reporting and the wind is picking up. Follow the flag line. Do not leave the flag line."`,
    `« Le mât météo ne transmet plus et le vent se lève. Suis la ligne de fanions. Ne quitte pas la ligne de fanions. »`,
    `"O mastro meteorológico parou de transmitir e o vento está aumentando. Siga a linha de bandeiras. Não saia da linha de bandeiras."`,
    `«Der Wettermast sendet nicht mehr und der Wind nimmt zu. Folge der Flaggenlinie. Verlass die Flaggenlinie nicht.»`],
  anBoss2: [
    `"If you lose the flags, stop and walk back the way you came. Antarctica does not negotiate."`,
    `« Si tu perds les fanions, arrête-toi et reviens sur tes pas. L'Antarctique ne négocie pas. »`,
    `"Se perder as bandeiras, pare e volte por onde veio. A Antártida não negocia."`,
    `«Wenn du die Flaggen verlierst, bleib stehen und geh zurück, wie du gekommen bist. Die Antarktis verhandelt nicht.»`],
  anPenguin: [
    `A penguin watches you work. It has seen engineers before. It is not impressed.`,
    `Un manchot te regarde travailler. Il a déjà vu des ingénieurs. Il n'est pas impressionné.`,
    `Um pinguim observa você trabalhar. Ele já viu engenheiros antes. Não está impressionado.`,
    `Ein Pinguin schaut dir bei der Arbeit zu. Er hat schon Ingenieure gesehen. Er ist nicht beeindruckt.`],
  anFlag: [
    `A flag. The next one is somewhere out in the white.`,
    `Un fanion. Le suivant est quelque part dans le blanc.`,
    `Uma bandeira. A próxima está em algum lugar no branco.`,
    `Eine Flagge. Die nächste ist irgendwo da draussen im Weiss.`],
  anMastQ: [
    `The data logger is dead at minus thirty. What do you do?`,
    `L'enregistreur de données est mort par moins trente. Que fais-tu ?`,
    `O registrador de dados morreu a trinta abaixo de zero. O que você faz?`,
    `Der Datenlogger ist bei minus dreissig tot. Was tust du?`],
  anOptA: [`Reflash the firmware`, `Reflasher le firmware`, `Regravar o firmware`, `Firmware neu flashen`],
  anOptB: [`Warm the battery inside your parka`, `Réchauffer la batterie dans ta parka`, `Aquecer a bateria dentro da parca`, `Die Batterie im Parka aufwärmen`],
  anOptC: [`Hit it`, `Taper dessus`, `Bater nele`, `Draufhauen`],
  anWrongA: [
    `You reflash it with numb fingers. It is still dead, but now with newer firmware.`,
    `Tu le reflashes, les doigts engourdis. Il est toujours mort, mais avec un firmware plus récent.`,
    `Você regrava com os dedos dormentes. Continua morto, mas agora com firmware mais novo.`,
    `Du flashst ihn mit tauben Fingern neu. Er ist immer noch tot, aber jetzt mit neuerer Firmware.`],
  anWrongC: [
    `You hit it. It is still dead. You feel slightly better.`,
    `Tu tapes dessus. Il est toujours mort. Tu te sens un peu mieux.`,
    `Você bate nele. Continua morto. Você se sente um pouco melhor.`,
    `Du haust drauf. Er ist immer noch tot. Du fühlst dich etwas besser.`],
  an1: [
    `Ten minutes against your chest and the battery wakes up. The logger blinks. Data flows north again.`,
    `Dix minutes contre ta poitrine et la batterie se réveille. L'enregistreur clignote. Les données repartent vers le nord.`,
    `Dez minutos junto ao peito e a bateria acorda. O registrador pisca. Os dados voltam a fluir para o norte.`,
    `Zehn Minuten an deiner Brust und die Batterie wacht auf. Der Logger blinkt. Die Daten fliessen wieder nach Norden.`],
  an2: [
    `You learned PATIENCE. You also keep the parka.`,
    `Tu as appris la PATIENCE. Et tu gardes la parka.`,
    `Você aprendeu PACIÊNCIA. E fica com a parca.`,
    `Du hast GEDULD gelernt. Den Parka behältst du auch.`],
  an3: [
    `You wake up in Zurich. Outside it is four degrees and people are complaining.`,
    `Tu te réveilles à Zurich. Dehors il fait quatre degrés et les gens se plaignent.`,
    `Você acorda em Zurique. Lá fora faz quatro graus e as pessoas estão reclamando.`,
    `Du wachst in Zürich auf. Draussen sind es vier Grad und die Leute beschweren sich.`],
} satisfies Record<string, Line>;

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
    `The box is empty, the job is yours, the cake got eaten and your aunt has been faced. For one evening, nothing is overdue.`,
    `Le carton est vide, le poste est à toi, le gâteau est mangé et tu as affronté ta tante. Pour un soir, rien n'est en retard.`,
    `A caixa está vazia, o emprego é seu, o bolo foi comido e a tia foi enfrentada. Por uma noite, nada está atrasado.`,
    `Die Kiste ist leer, der Job gehört dir, die Torte ist gegessen und die Tante überstanden. Einen Abend lang ist nichts überfällig.`,
  ],
  end2: [
    `Whenever you are ready, open the laptop at home and decide what comes next. Or keep living: everything you do still changes the answer.`,
    `Quand tu seras prêt, ouvre l'ordinateur à la maison et décide de la suite. Ou continue à vivre : tout ce que tu fais change encore la réponse.`,
    `Quando estiver pronto, abra o laptop em casa e decida o que vem agora. Ou continue vivendo: tudo o que você faz ainda muda a resposta.`,
    `Wenn du so weit bist, klapp zu Hause den Laptop auf und entscheide, wie es weitergeht. Oder leb weiter: Alles, was du tust, ändert die Antwort noch.`,
  ],

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
    `She did keep the parts list. Match every part to its twin before your patience runs out: arrows move, Space turns a card.`,
    `Elle a gardé la liste des pièces. Associe chaque pièce à sa jumelle avant de perdre patience : flèches pour bouger, Espace pour retourner une carte.`,
    `Ela guardou a lista de peças. Junte cada peça com o seu par antes de perder a paciência: setas movem, Espaço vira uma carta.`,
    `Die Teileliste hat sie behalten. Finde zu jedem Teil das passende, bevor dir die Geduld ausgeht: Pfeile bewegen, Leertaste dreht eine Karte um.`,
  ],
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
    `Zurich HB. A ticket to Marseille is CHF {0}. You do not have CHF {0}. The railway does not do pity.`,
    `Zurich HB. Le billet pour Marseille coûte CHF {0}. Tu n'as pas CHF {0}. Les chemins de fer ne font pas dans la pitié.`,
    `Zurique HB. A passagem para Marselha custa CHF {0}. Você não tem CHF {0}. A ferrovia não trabalha com pena.`,
    `Zürich HB. Ein Billett nach Marseille kostet CHF {0}. Du hast keine CHF {0}. Die Bahn kennt kein Mitleid.`,
  ],
  hbQ: [
    `Zurich HB. Ticket to Marseille, CHF {0}? (takes the day)`,
    `Zurich HB. Billet pour Marseille, CHF {0} ? (prend la journée)`,
    `Zurique HB. Passagem para Marselha, CHF {0}? (leva o dia todo)`,
    `Zürich HB. Billett nach Marseille, CHF {0}? (dauert den ganzen Tag)`,
  ],
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
    `Lyon. Your train is on platform C. No, F. No, B. Press the arrow for each platform change the moment it appears.`,
    `Lyon. Ton train est voie C. Non, F. Non, B. Appuie sur la flèche de chaque changement de voie dès qu'il s'affiche.`,
    `Lyon. Seu trem está na plataforma C. Não, F. Não, B. Aperte a seta de cada mudança de plataforma assim que aparecer.`,
    `Lyon. Dein Zug fährt auf Gleis C. Nein, F. Nein, B. Drück für jede Gleisänderung den passenden Pfeil, sobald sie erscheint.`,
  ],
  dodgeHud: [`Connection in {0}s · collisions {1}/3`, `Correspondance dans {0}s · collisions {1}/3`, `Conexão em {0}s · trombadas {1}/3`, `Anschluss in {0}s · Zusammenstösse {1}/3`],
  dodgeOk: [
    `You make it with eleven seconds to spare and the heart rate of a hummingbird.`,
    `Tu y arrives avec onze secondes d'avance et le pouls d'un colibri.`,
    `Você consegue com onze segundos de folga e o coração de um beija-flor.`,
    `Du schaffst es mit elf Sekunden Reserve und dem Puls eines Kolibris.`],
  dodgeMiss: [
    `The doors close in your face. The next train is tomorrow. You sleep at the station, upright. (one extra day)`,
    `Les portes se ferment sous ton nez. Prochain train demain. Tu dors à la gare, assis. (un jour de plus)`,
    `As portas fecham na sua cara. O próximo trem é amanhã. Você dorme na estação, sentado. (um dia a mais)`,
    `Die Türen schliessen vor deiner Nase. Der nächste Zug fährt morgen. Du schläfst am Bahnhof, im Sitzen. (ein Tag mehr)`,
  ],

  gareQ: [
    `Gare Saint-Charles. Train back to Zurich, CHF {0}? (takes the day)`,
    `Gare Saint-Charles. Train retour pour Zurich, CHF {0} ? (prend la journée)`,
    `Gare Saint-Charles. Trem de volta para Zurique, CHF {0}? (leva o dia todo)`,
    `Gare Saint-Charles. Zug zurück nach Zürich, CHF {0}? (dauert den ganzen Tag)`,
  ],
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

  // ---- Minigame instructions shown while playing ----
  pairsHud: [`Match the pairs · {0}s left`, `Trouve les paires · {0}s restantes`, `Encontre os pares · {0}s restantes`, `Finde die Paare · noch {0}s`],
  timingHud: [`Space in the green · {0}/{1} · misses {2}/{3}`, `Espace dans le vert · {0}/{1} · ratés {2}/{3}`, `Espaço no verde · {0}/{1} · erros {2}/{3}`, `Leertaste im Grünen · {0}/{1} · Fehler {2}/{3}`],
  trackHud: [`Link {0}% · {1}s left`, `Liaison {0}% · {1}s restantes`, `Link {0}% · {1}s restantes`, `Verbindung {0}% · noch {1}s`],
  whackHud: [`Flames out {0}/{1} · missed {2}/{3}`, `Flammes éteintes {0}/{1} · ratées {2}/{3}`, `Chamas apagadas {0}/{1} · erros {2}/{3}`, `Flammen gelöscht {0}/{1} · verpasst {2}/{3}`],
  whackHudTrain: [`Platform changes {0}/{1} · missed {2}/{3}`, `Changements de voie {0}/{1} · ratés {2}/{3}`, `Mudanças de plataforma {0}/{1} · erros {2}/{3}`, `Gleisänderungen {0}/{1} · verpasst {2}/{3}`],
  collectHud: [`Samples {0}/{1} · battery {2}s`, `Échantillons {0}/{1} · batterie {2}s`, `Amostras {0}/{1} · bateria {2}s`, `Proben {0}/{1} · Akku {2}s`],
  balanceHud: [`Hold it steady: Left and Right · {0}s`, `Tiens-le droit : Gauche et Droite · {0}s`, `Segure firme: Esquerda e Direita · {0}s`, `Halt ihn gerade: Links und Rechts · {0}s`],
  anMastHow: [
    `The mast is swaying in the gusts. Hold it upright with Left and Right while you open the logger.`,
    `Le mât tangue dans les rafales. Tiens-le droit avec Gauche et Droite pendant que tu ouvres l'enregistreur.`,
    `O mastro balança com as rajadas. Segure-o de pé com Esquerda e Direita enquanto abre o registrador.`,
    `Der Mast schwankt in den Böen. Halt ihn mit Links und Rechts aufrecht, während du den Logger öffnest.`],
  anMastFall: [
    `A gust takes it. The mast lies down in the snow, slowly, as if it had been wanting to. You stand it back up. Try again.`,
    `Une rafale l'emporte. Le mât se couche dans la neige, lentement, comme s'il n'attendait que ça. Tu le redresses. Réessaie.`,
    `Uma rajada leva. O mastro deita na neve, devagar, como se estivesse querendo. Você o levanta de novo. Tente de novo.`,
    `Eine Böe erwischt ihn. Der Mast legt sich in den Schnee, langsam, als hätte er darauf gewartet. Du stellst ihn wieder auf. Versuch's nochmal.`],

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
    `The cable is free. Fly the robot with the arrow keys and collect six samples before the battery dies. Mind the jellyfish.`,
    `Le câble est libéré. Pilote le robot avec les flèches et récolte six échantillons avant que la batterie ne lâche. Attention aux méduses.`,
    `O cabo está solto. Pilote o robô com as setas e colete seis amostras antes que a bateria acabe. Cuidado com as águas-vivas.`,
    `Das Kabel ist frei. Steuere den Roboter mit den Pfeiltasten und sammle sechs Proben, bevor der Akku leer ist. Achtung, Quallen.`,
  ],
  svFail: [
    `The battery dies with the robot halfway down. You haul it up by hand, like a very expensive fish. Try again.`,
    `La batterie lâche avec le robot à mi-profondeur. Tu le remontes à la main, comme un poisson très cher. Réessaie.`,
    `A bateria acaba com o robô no meio do caminho. Você puxa na mão, como um peixe muito caro. Tente de novo.`,
    `Der Akku ist leer, als der Roboter auf halber Tiefe hängt. Du ziehst ihn von Hand hoch, wie einen sehr teuren Fisch. Versuch's nochmal.`,
  ],
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
    `The flight computer has to fire at exactly the right moment. Press Space while the marker is in the green. Three times, and it gets tighter.`,
    `L'ordinateur de vol doit déclencher exactement au bon moment. Appuie sur Espace quand le curseur est dans le vert. Trois fois, et ça se resserre.`,
    `O computador de voo precisa disparar exatamente na hora certa. Aperte Espaço quando o marcador estiver no verde. Três vezes, e vai apertando.`,
    `Der Flugcomputer muss genau im richtigen Moment auslösen. Drück die Leertaste, wenn der Marker im Grünen ist. Dreimal, und es wird enger.`,
  ],
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
    `Point the dish at it. Keep the ring on the satellite with the arrow keys until the link locks.`,
    `Pointe l'antenne dessus. Garde le cercle sur le satellite avec les flèches jusqu'à ce que la liaison se verrouille.`,
    `Aponte a antena para ele. Mantenha o círculo no satélite com as setas até o link travar.`,
    `Richte die Antenne darauf aus. Halte den Ring mit den Pfeiltasten auf dem Satelliten, bis die Verbindung steht.`,
  ],
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
    `Your pager goes off. Fire brigade. A kitchen is burning: press the arrow for each flame the moment it flares up.`,
    `Ton bip sonne. Les pompiers. Une cuisine brûle : appuie sur la flèche de chaque flamme dès qu'elle surgit.`,
    `Seu pager toca. Bombeiros. Uma cozinha pegando fogo: aperte a seta de cada chama assim que ela aparecer.`,
    `Dein Pager geht los. Feuerwehr. Eine Küche brennt: Drück für jede Flamme den passenden Pfeil, sobald sie auflodert.`,
  ],
  muLate: [
    `You soak everything except the fire. A colleague puts it out and will mention it at every barbecue until you retire.`,
    `Tu arroses tout sauf le feu. Un collègue l'éteint et en reparlera à chaque barbecue jusqu'à ta retraite.`,
    `Você molha tudo, menos o fogo. Um colega apaga e vai lembrar disso em todo churrasco até você se aposentar.`,
    `Du machst alles nass ausser dem Feuer. Ein Kollege löscht es und erwähnt das bei jedem Grillfest bis zu deiner Pensionierung.`,
  ],
  muOnTime: [
    `Fire out in under a minute. Lights, siren, the whole childhood dream.`,
    `Feu éteint en moins d'une minute. Gyrophares, sirène, tout le rêve d'enfant.`,
    `Fogo apagado em menos de um minuto. Luzes, sirene, o sonho de criança completo.`,
    `Feuer aus in unter einer Minute. Blaulicht, Sirene, der ganze Kindheitstraum.`,
  ],
  mu3: [
    `The cause: a pot of Weisswurst forgotten on the stove. The pot is beyond saving. The owner is fine.`,
    `La cause : une casserole de Weisswurst oubliée sur le feu. La casserole est perdue. Le propriétaire va bien.`,
    `A causa: uma panela de Weisswurst esquecida no fogão. A panela não tem salvação. O dono está bem.`,
    `Die Ursache: ein Topf Weisswürste, vergessen auf dem Herd. Der Topf ist nicht zu retten. Dem Besitzer geht es gut.`,
  ],
  mu4: [
    `You learned STAY CALM UNDER ALARM: you are allowed one more mistake in timing and reaction games.`,
    `Tu as appris CALME SOUS ALARME : tu as droit à une erreur de plus dans les jeux de timing et de réflexes.`,
    `Você aprendeu CALMA SOB ALARME: você pode errar uma vez a mais nos jogos de tempo e reflexo.`,
    `Du hast RUHE BEI ALARM gelernt: In Timing- und Reaktionsspielen darfst du dir einen Fehler mehr erlauben.`,
  ],
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
  // ---- Zurich: more people ----
  zTourist1: [
    `"Excuse me, where can one eat cheaply around here?"`,
    `« Excusez-moi, où peut-on manger pas cher par ici ? »`,
    `"Com licença, onde dá para comer barato por aqui?"`,
    `«Entschuldigung, wo kann man hier günstig essen?»`],
  zTourist2: [
    `You look at each other for a long moment. Then you both start laughing.`,
    `Vous vous regardez un long moment. Puis vous éclatez de rire tous les deux.`,
    `Vocês se olham por um bom tempo. Depois os dois caem na risada.`,
    `Ihr schaut euch lange an. Dann fangt ihr beide an zu lachen.`],
  zBanker: [
    `A banker shouts into his phone: "No. NO. Sell the yen!" He covers the mic. "Sorry. I was ordering lunch."`,
    `Un banquier hurle dans son téléphone : « Non. NON. Vendez le yen ! » Il couvre le micro. « Pardon. Je commandais à déjeuner. »`,
    `Um banqueiro grita ao telefone: "Não. NÃO. Vende o iene!" Ele tapa o microfone. "Desculpa. Estava pedindo o almoço."`,
    `Ein Banker brüllt ins Handy: «Nein. NEIN. Verkauf den Yen!» Er hält das Mikro zu. «Entschuldigung. Ich habe Mittagessen bestellt.»`],
  zDog: [
    `This is Rösti. He is a Bernese mountain dog and he has a better pension plan than you.`,
    `Voici Rösti. C'est un bouvier bernois et il a un meilleur plan de retraite que toi.`,
    `Este é o Rösti. É um boiadeiro de Berna e tem um plano de previdência melhor que o seu.`,
    `Das ist Rösti. Er ist ein Berner Sennenhund und hat eine bessere Pensionskasse als du.`],
  zLate: [
    `"Sorry, sorry, the tram. Bouldering on Thursday? I'll be there at seven. So, eight."`,
    `« Pardon, pardon, le tram. Bloc jeudi ? J'y serai à sept heures. Donc huit. »`,
    `"Desculpa, desculpa, o bonde. Escalada na quinta? Chego às sete. Ou seja, oito."`,
    `«Sorry, sorry, das Tram. Bouldern am Donnerstag? Ich bin um sieben da. Also acht.»`],
  zMusician: [
    `An alphorn player performs outside the bank. Nobody tips. Everybody films.`,
    `Un joueur de cor des Alpes joue devant la banque. Personne ne donne. Tout le monde filme.`,
    `Um tocador de trompa alpina se apresenta em frente ao banco. Ninguém dá gorjeta. Todo mundo filma.`,
    `Ein Alphornbläser spielt vor der Bank. Niemand gibt etwas. Alle filmen.`],
  zRecycle: [
    `"Glass goes out on the first Tuesday. Not on Sunday. Never on Sunday. I saw you."`,
    `« Le verre, c'est le premier mardi. Pas le dimanche. Jamais le dimanche. Je vous ai vu. »`,
    `"Vidro é na primeira terça. Domingo não. Nunca no domingo. Eu vi você."`,
    `«Glas kommt am ersten Dienstag raus. Nicht am Sonntag. Nie am Sonntag. Ich habe Sie gesehen.»`],
  zExpat1: [
    `"Cara, three years here and I still dream about pão de queijo. If you ever fly home, bring me some. I pay in gratitude."`,
    `« Cara, trois ans ici et je rêve encore de pão de queijo. Si tu rentres un jour au pays, rapporte-m'en. Je paie en gratitude. »`,
    `"Cara, três anos aqui e eu ainda sonho com pão de queijo. Se você for pra casa um dia, traz pra mim. Pago em gratidão."`,
    `«Cara, drei Jahre hier und ich träume immer noch von Pão de Queijo. Wenn du mal heimfliegst, bring mir welche mit. Ich zahle in Dankbarkeit.»`],
  zExpat2: [
    `He opens the tupperware and goes quiet. "This is the best day I have had in Switzerland." It includes his wedding.`,
    `Il ouvre le tupperware et se tait. « C'est mon plus beau jour en Suisse. » Mariage compris.`,
    `Ele abre o tupperware e fica em silêncio. "Este é o melhor dia que eu tive na Suíça." Contando o casamento.`,
    `Er öffnet die Tupperdose und wird still. «Das ist mein schönster Tag in der Schweiz.» Die Hochzeit eingerechnet.`],
  zExpatDone: [`"Next time bring guaraná."`, `« La prochaine fois, rapporte du guaraná. »`, `"Da próxima vez traz guaraná."`, `«Nächstes Mal bring Guaraná mit.»`],

  // ---- Airport and the flight home ----
  lblAirport: [`Airport`, `Aéroport`, `Aeroporto`, `Flughafen`],
  apBroke: [
    `Zurich Airport. São Paulo and back: CHF 1,200. Your account says no, in three national languages.`,
    `Aéroport de Zurich. São Paulo aller-retour : CHF 1 200. Ton compte dit non, dans trois langues nationales.`,
    `Aeroporto de Zurique. São Paulo ida e volta: CHF 1.200. Sua conta diz não, em três línguas nacionais.`,
    `Flughafen Zürich. São Paulo retour: CHF 1'200. Dein Konto sagt Nein, in drei Landessprachen.`],
  apQ: [
    `Zurich Airport. Fly to São Paulo to see your parents? Return ticket CHF 1,200. (two days each way)`,
    `Aéroport de Zurich. Prendre l'avion pour São Paulo voir tes parents ? Aller-retour CHF 1 200. (deux jours par trajet)`,
    `Aeroporto de Zurique. Voar para São Paulo ver seus pais? Ida e volta CHF 1.200. (dois dias cada trecho)`,
    `Flughafen Zürich. Nach São Paulo zu deinen Eltern fliegen? Retourticket CHF 1'200. (zwei Tage pro Weg)`],
  apChocQ: [
    `Duty-free. Swiss chocolate for the family, CHF 35? Arriving without it is technically legal.`,
    `Duty-free. Du chocolat suisse pour la famille, CHF 35 ? Arriver sans est techniquement légal.`,
    `Duty-free. Chocolate suíço para a família, CHF 35? Chegar sem ele é tecnicamente permitido.`,
    `Duty-free. Schweizer Schokolade für die Familie, CHF 35? Ohne anzukommen ist rein rechtlich erlaubt.`],
  apFly1: [
    `Eleven hours in seat 47E, between a crying baby and a man explaining crypto.`,
    `Onze heures au siège 47E, entre un bébé qui pleure et un homme qui explique la crypto.`,
    `Onze horas na poltrona 47E, entre um bebê chorando e um homem explicando cripto.`,
    `Elf Stunden auf Sitz 47E, zwischen einem weinenden Baby und einem Mann, der Krypto erklärt.`],
  apFly2: [
    `You land. The air is warm and smells of rain and frying. Something in your chest unclenches.`,
    `Tu atterris. L'air est chaud, il sent la pluie et la friture. Quelque chose se desserre dans ta poitrine.`,
    `Você pousa. O ar é quente e cheira a chuva e fritura. Alguma coisa no peito se solta.`,
    `Du landest. Die Luft ist warm und riecht nach Regen und Frittiertem. Etwas in deiner Brust lässt los.`],

  // ---- Paragliding ----
  pgInstr: [
    `"Grüezi. Paragliding course, CHF 300. You run off the mountain, I shout advice from the ground."`,
    `« Grüezi. Stage de parapente, CHF 300. Tu cours et tu sautes de la montagne, je crie des conseils d'en bas. »`,
    `"Grüezi. Curso de parapente, CHF 300. Você corre e pula da montanha, eu grito conselhos lá de baixo."`,
    `«Grüezi. Gleitschirmkurs, CHF 300. Du rennst vom Berg, ich rufe von unten Ratschläge.»`],
  pgQ: [`Take the course for CHF 300?`, `Faire le stage pour CHF 300 ?`, `Fazer o curso por CHF 300?`, `Den Kurs für CHF 300 machen?`],
  pgBroke: [
    `"No money, no flying. Gravity is free. The wing is not."`,
    `« Pas d'argent, pas de vol. La gravité est gratuite. L'aile, non. »`,
    `"Sem dinheiro, sem voo. A gravidade é de graça. A vela, não."`,
    `«Kein Geld, kein Flug. Die Schwerkraft ist gratis. Der Schirm nicht.»`],
  pgHow: [
    `Hold Up to climb, let go to sink. Stay off the peaks and out of the clouds. Land in one piece.`,
    `Maintiens Haut pour monter, relâche pour descendre. Évite les sommets et les nuages. Atterris entier.`,
    `Segure Cima para subir, solte para descer. Fique longe dos picos e das nuvens. Pouse inteiro.`,
    `Halte Hoch zum Steigen, lass los zum Sinken. Bleib weg von Gipfeln und Wolken. Lande in einem Stück.`],
  glideHud: [`Landing in {0}s · scrapes {1}/3`, `Atterrissage dans {0}s · accrochages {1}/3`, `Pouso em {0}s · raspões {1}/3`, `Landung in {0}s · Streifer {1}/3`],
  pgFail: [
    `You land in a tree. A cow watches. The instructor makes a note. Try again.`,
    `Tu atterris dans un arbre. Une vache regarde. Le moniteur prend une note. Réessaie.`,
    `Você pousa numa árvore. Uma vaca observa. O instrutor anota alguma coisa. Tente de novo.`,
    `Du landest in einem Baum. Eine Kuh schaut zu. Der Fluglehrer macht sich eine Notiz. Versuch's nochmal.`],
  pgWin1: [
    `You touch down on the meadow as if you meant it. "Not bad," says the instructor, which in Swiss means magnificent.`,
    `Tu te poses dans le pré comme si c'était voulu. « Pas mal », dit le moniteur, ce qui en suisse veut dire magnifique.`,
    `Você pousa no gramado como se fosse de propósito. "Nada mal", diz o instrutor, o que em suíço significa magnífico.`,
    `Du setzt auf der Wiese auf, als wäre es Absicht. «Nicht schlecht», sagt der Fluglehrer, was auf Schweizerisch grossartig heisst.`],
  pgWin2: [
    `You are a licensed pilot now. From up there, the rent looks very small.`,
    `Tu es pilote breveté. De là-haut, le loyer a l'air tout petit.`,
    `Agora você é piloto habilitado. Lá de cima, o aluguel parece bem pequeno.`,
    `Du bist jetzt brevetierter Pilot. Von da oben sieht die Miete sehr klein aus.`],
  pgAgain: [
    `"Another flight? It is free now. The mountain is already paid for."`,
    `« Encore un vol ? C'est gratuit maintenant. La montagne est déjà payée. »`,
    `"Mais um voo? Agora é de graça. A montanha já está paga."`,
    `«Noch ein Flug? Der ist jetzt gratis. Der Berg ist schon bezahlt.»`],
  pgAgainWin: [
    `Twenty minutes of silence above the city. Landing fee: zero. The best deal in Zurich.`,
    `Vingt minutes de silence au-dessus de la ville. Taxe d'atterrissage : zéro. La meilleure affaire de Zurich.`,
    `Vinte minutos de silêncio acima da cidade. Taxa de pouso: zero. O melhor negócio de Zurique.`,
    `Zwanzig Minuten Stille über der Stadt. Landegebühr: null. Das beste Angebot in Zürich.`],

  // ---- The river race ----
  runOrg: [
    `"Limmat Run! One hundred metres of glory along the river. Entry is CHF 40 and includes a banana."`,
    `« Course de la Limmat ! Cent mètres de gloire le long de la rivière. Inscription CHF 40, banane comprise. »`,
    `"Corrida do Limmat! Cem metros de glória à beira do rio. A inscrição é CHF 40 e inclui uma banana."`,
    `«Limmatlauf! Hundert Meter Ruhm am Fluss entlang. Startgeld CHF 40, inklusive Banane.»`],
  runQ: [`Enter the race for CHF 40?`, `S'inscrire à la course pour CHF 40 ?`, `Entrar na corrida por CHF 40?`, `Für CHF 40 mitlaufen?`],
  runBroke: [`"No forty francs, no banana."`, `« Pas de quarante francs, pas de banane. »`, `"Sem quarenta francos, sem banana."`, `«Keine vierzig Franken, keine Banane.»`],
  runHow: [
    `Alternate Left and Right as fast as you can. Three others are running too.`,
    `Alterne Gauche et Droite aussi vite que possible. Trois autres courent aussi.`,
    `Alterne Esquerda e Direita o mais rápido que puder. Outros três também correm.`,
    `Wechsle Links und Rechts ab, so schnell du kannst. Drei andere laufen auch mit.`],
  mashHud: [`{0} m to go · position {1}/4`, `Encore {0} m · position {1}/4`, `Faltam {0} m · posição {1}/4`, `Noch {0} m · Platz {1}/4`],
  runWin: [
    `First place! You win a medal, a banana, and the right to mention it for six months.`,
    `Première place ! Tu gagnes une médaille, une banane et le droit d'en parler pendant six mois.`,
    `Primeiro lugar! Você ganha uma medalha, uma banana e o direito de comentar isso por seis meses.`,
    `Erster Platz! Du gewinnst eine Medaille, eine Banane und das Recht, sechs Monate lang davon zu erzählen.`],
  runLose: [
    `You finish in place {0}. A man in jeans beat you. You get the banana anyway.`,
    `Tu finis à la place {0}. Un homme en jean t'a battu. Tu as quand même la banane.`,
    `Você termina em {0}º lugar. Um homem de calça jeans ganhou de você. A banana você leva mesmo assim.`,
    `Du wirst {0}. Ein Mann in Jeans war schneller. Die Banane bekommst du trotzdem.`],

  // ---- Marseille: the port, pétanque, the ball ----
  maIce1: [
    `"Pastis without ice is a crime here. Be an angel: the fishmonger down at the port has ice."`,
    `« Un pastis sans glaçons, ici, c'est un crime. Sois un ange : le poissonnier du port a de la glace. »`,
    `"Pastis sem gelo é crime por aqui. Seja um anjo: o peixeiro lá no porto tem gelo."`,
    `«Pastis ohne Eis ist hier ein Verbrechen. Sei ein Engel: Der Fischhändler unten am Hafen hat Eis.»`],
  maIce2: [
    `"Santé. You may marry into this family." "I am already in it." "Then you may stay."`,
    `« Santé. Tu peux entrer dans cette famille. » « J'y suis déjà. » « Alors tu peux rester. »`,
    `"Santé. Você pode entrar para esta família." "Eu já estou nela." "Então pode ficar."`,
    `«Santé. Du darfst in diese Familie einheiraten.» «Ich bin schon drin.» «Dann darfst du bleiben.»`],
  maFish: [
    `"Fresh fish! Caught this morning. Which morning, I am not at liberty to say."`,
    `« Poisson frais ! Pêché ce matin. Quel matin, je ne suis pas autorisé à le dire. »`,
    `"Peixe fresco! Pescado hoje de manhã. Qual manhã, não estou autorizado a dizer."`,
    `«Frischer Fisch! Heute Morgen gefangen. Welcher Morgen, darf ich nicht sagen.»`],
  maFishIce: [
    `"Ice? For pastis? Then it is free. For fish I would have charged you."`,
    `« De la glace ? Pour le pastis ? Alors c'est gratuit. Pour du poisson, j'aurais fait payer. »`,
    `"Gelo? Para o pastis? Então é de graça. Para peixe eu cobraria."`,
    `«Eis? Für Pastis? Dann ist es gratis. Für Fisch hätte ich was verlangt.»`],
  pe1: [
    `Three old men are playing pétanque. "Hé, le Suisse! You throw?"`,
    `Trois vieux jouent à la pétanque. « Hé, le Suisse ! Tu tires ? »`,
    `Três senhores jogam pétanque. "Hé, le Suisse! Vai jogar?"`,
    `Drei alte Männer spielen Pétanque. «Hé, le Suisse! Wirfst du?»`],
  peHow: [
    `Press Space while the marker is in the green. Three throws.`,
    `Appuie sur Espace quand le curseur est dans le vert. Trois lancers.`,
    `Aperte Espaço quando o marcador estiver no verde. Três arremessos.`,
    `Drück die Leertaste, wenn der Marker im Grünen ist. Drei Würfe.`],
  peFail: [
    `Your boule lands in a different arrondissement. "It is the wind," they say kindly. There is no wind.`,
    `Ta boule atterrit dans un autre arrondissement. « C'est le vent », disent-ils gentiment. Il n'y a pas de vent.`,
    `Sua bola cai em outro bairro. "É o vento", dizem com gentileza. Não tem vento.`,
    `Deine Kugel landet in einem anderen Arrondissement. «Das ist der Wind», sagen sie freundlich. Es geht kein Wind.`],
  peWin: [
    `Three perfect throws. "Not bad for a Swiss." "I am Brazilian." "Not bad for a Swiss Brazilian."`,
    `Trois lancers parfaits. « Pas mal pour un Suisse. » « Je suis brésilien. » « Pas mal pour un Suisse brésilien. »`,
    `Três arremessos perfeitos. "Nada mal para um suíço." "Sou brasileiro." "Nada mal para um suíço brasileiro."`,
    `Drei perfekte Würfe. «Nicht schlecht für einen Schweizer.» «Ich bin Brasilianer.» «Nicht schlecht für einen Schweizer Brasilianer.»`],
  peDone: [`"Come back when you feel like losing, petit."`, `« Reviens quand tu auras envie de perdre, petit. »`, `"Volte quando quiser perder, petit."`, `«Komm wieder, wenn du verlieren willst, petit.»`],
  peOther: [`"He cheats. I cheat better."`, `« Il triche. Moi, je triche mieux. »`, `"Ele rouba. Eu roubo melhor."`, `«Er schummelt. Ich schummle besser.»`],
  maBall1: [
    `"Our ball fell in the sea. Maman says we can't go in. But you're a grown-up. Sort of."`,
    `« Notre ballon est tombé dans la mer. Maman dit qu'on n'a pas le droit d'y aller. Mais toi, tu es un adulte. Enfin, presque. »`,
    `"Nossa bola caiu no mar. A mamãe disse que a gente não pode entrar. Mas você é adulto. Mais ou menos."`,
    `«Unser Ball ist ins Meer gefallen. Maman sagt, wir dürfen nicht rein. Aber du bist erwachsen. So halb.»`],
  maBallSee: [
    `A ball floats in the harbour. It looks like it belongs to someone small.`,
    `Un ballon flotte dans le port. Il a l'air d'appartenir à quelqu'un de petit.`,
    `Uma bola boia no porto. Parece ser de alguém pequeno.`,
    `Im Hafen treibt ein Ball. Er sieht aus, als gehöre er jemand Kleinem.`],
  maBallGet: [
    `You swim out and get the ball. A seagull applauds, or wants your sandwich.`,
    `Tu nages jusqu'au ballon et tu le récupères. Une mouette applaudit, ou veut ton sandwich.`,
    `Você nada até lá e pega a bola. Uma gaivota aplaude, ou quer o seu sanduíche.`,
    `Du schwimmst raus und holst den Ball. Eine Möwe applaudiert, oder sie will dein Sandwich.`],
  maBall2: [
    `"You're the best uncle." "I'm your only uncle." "Still."`,
    `« T'es le meilleur tonton. » « Je suis ton seul tonton. » « Quand même. »`,
    `"Você é o melhor tio." "Eu sou seu único tio." "Mesmo assim."`,
    `«Du bist der beste Onkel.» «Ich bin dein einziger Onkel.» «Trotzdem.»`],
  maBoat: [
    `A fishing boat called "Fada". Its owner is asleep in it. It is two in the afternoon.`,
    `Un bateau de pêche nommé « Fada ». Son propriétaire dort dedans. Il est quatorze heures.`,
    `Um barco de pesca chamado "Fada". O dono dorme dentro dele. São duas da tarde.`,
    `Ein Fischerboot namens «Fada». Sein Besitzer schläft darin. Es ist zwei Uhr nachmittags.`],

  // ---- Brazil ----
  mBrazil: [`São Paulo, Brazil`, `São Paulo, Brésil`, `São Paulo, Brasil`, `São Paulo, Brasilien`],
  brMom1: [
    `"My son! You are so thin. Do they not have food in Switzerland? Go and sit with your aunt. Eat."`,
    `« Mon fils ! Tu es tout maigre. Il n'y a pas de nourriture en Suisse ? Va t'asseoir avec ta tante. Mange. »`,
    `"Meu filho! Você está tão magro. Não tem comida na Suíça? Vai sentar com a sua tia. Come."`,
    `«Mein Sohn! Du bist so dünn. Gibt es in der Schweiz nichts zu essen? Setz dich zu deiner Tante. Iss.»`],
  brMom2: [
    `"Take this for the journey." It is a tupperware of pão de queijo the size of a suitcase.`,
    `« Prends ça pour le voyage. » C'est un tupperware de pão de queijo de la taille d'une valise.`,
    `"Leva isso para a viagem." É um tupperware de pão de queijo do tamanho de uma mala.`,
    `«Nimm das für die Reise mit.» Es ist eine Tupperdose Pão de Queijo, so gross wie ein Koffer.`],
  brMomDone: [`"Call more. A message is not a call."`, `« Appelle plus souvent. Un message, ce n'est pas un appel. »`, `"Liga mais. Mensagem não é ligação."`, `«Ruf öfter an. Eine Nachricht ist kein Anruf.»`],
  brDad1: [
    `"There you are. Come, the mango tree behind the old section is loaded. Best mangoes in the city: quiet neighbours, nobody steals them. I shake, you catch. Not the green ones. And not with your head." Left and Right to move.`,
    `« Te voilà. Viens, le manguier derrière la vieille section est chargé. Les meilleures mangues de la ville : des voisins tranquilles, personne ne les vole. Je secoue, tu attrapes. Pas les vertes. Et pas avec la tête. » Gauche et Droite pour bouger.`,
    `"Olha você aí. Vem, a mangueira atrás da quadra antiga está carregada. As melhores mangas da cidade: vizinhança quieta, ninguém rouba. Eu balanço, você pega. As verdes não. E não com a cabeça." Esquerda e Direita para andar.`,
    `«Da bist du ja. Komm, der Mangobaum hinter dem alten Teil hängt voll. Die besten Mangos der Stadt: ruhige Nachbarn, niemand klaut sie. Ich schüttle, du fängst. Nicht die grünen. Und nicht mit dem Kopf.» Links und Rechts zum Laufen.`,
  ],
  catchHud: [`Mangoes {0}/{1} · bumps {2}/{3}`, `Mangues {0}/{1} · bosses {2}/{3}`, `Mangas {0}/{1} · galos {2}/{3}`, `Mangos {0}/{1} · Beulen {2}/{3}`],
  brDadFail: [
    `A green mango gets you square on the head. Your father laughs for a full minute. Try again.`,
    `Une mangue verte t'arrive en plein sur le crâne. Ton père rit pendant une minute entière. Réessaie.`,
    `Uma manga verde acerta você bem na cabeça. Seu pai ri por um minuto inteiro. Tente de novo.`,
    `Eine grüne Mango trifft dich mitten auf den Kopf. Dein Vater lacht eine volle Minute. Versuch's nochmal.`],
  brDadWin: [
    `A full basket. Your father nods at it for a long time. In this family, that is a speech.`,
    `Un panier plein. Ton père hoche longuement la tête. Dans cette famille, c'est un discours.`,
    `Um cesto cheio. Seu pai fica um tempão balançando a cabeça. Nesta família, isso é um discurso.`,
    `Ein voller Korb. Dein Vater nickt ihn lange an. In dieser Familie ist das eine Rede.`],
  brDadDone: [
    `"I planted that tree my first year here. All these years of shade for people who cannot thank me. Do not tell your mother I got emotional."`,
    `« J'ai planté cet arbre ma première année ici. Toutes ces années d'ombre pour des gens qui ne peuvent pas me remercier. Ne dis pas à ta mère que j'étais ému. »`,
    `"Plantei essa árvore no meu primeiro ano aqui. Todos esses anos de sombra para gente que não pode me agradecer. Não conta para a sua mãe que eu me emocionei."`,
    `«Den Baum habe ich in meinem ersten Jahr hier gepflanzt. All die Jahre Schatten für Leute, die sich nicht bedanken können. Sag deiner Mutter nicht, dass ich gerührt war.»`,
  ],
  brUncle: [
    `"In Switzerland, do they have picanha?" "They have something they call picanha." He lays down the tongs in sorrow.`,
    `« En Suisse, ils ont de la picanha ? » « Ils ont un truc qu'ils appellent picanha. » Il pose la pince, accablé.`,
    `"Na Suíça tem picanha?" "Tem uma coisa que eles chamam de picanha." Ele larga o pegador, em luto.`,
    `«Gibt es in der Schweiz Picanha?» «Es gibt etwas, das sie Picanha nennen.» Er legt die Grillzange nieder, in Trauer.`],
  brCousin: [
    `"Is it true the trains leave on time?" "To the second." "That sounds stressful."`,
    `« C'est vrai que les trains partent à l'heure ? » « À la seconde. » « Ça a l'air stressant. »`,
    `"É verdade que os trens saem na hora?" "No segundo." "Parece estressante."`,
    `«Stimmt es, dass die Züge pünktlich fahren?» «Auf die Sekunde.» «Klingt stressig.»`],
  brDog: [
    `A caramel-coloured street dog adopts you on sight. Nobody knows whose he is. He is everybody's.`,
    `Un chien des rues couleur caramel t'adopte au premier regard. Personne ne sait à qui il est. Il est à tout le monde.`,
    `Um vira-lata caramelo te adota na hora. Ninguém sabe de quem ele é. Ele é de todo mundo.`,
    `Ein karamellfarbener Strassenhund adoptiert dich auf den ersten Blick. Niemand weiss, wem er gehört. Er gehört allen.`],
  brAunt1: [
    `"There he is! Sit by me. I have questions." The Sunday lunch interrogation begins.`,
    `« Le voilà ! Assieds-toi à côté de moi. J'ai des questions. » L'interrogatoire du déjeuner dominical commence.`,
    `"Olha ele aí! Senta aqui do meu lado. Tenho umas perguntas." Começa o interrogatório do almoço de domingo.`,
    `«Da ist er ja! Setz dich zu mir. Ich habe Fragen.» Das Verhör beim Sonntagsessen beginnt.`],
  lunchTitle: [`SUNDAY LUNCH`, `DÉJEUNER DU DIMANCHE`, `ALMOÇO DE DOMINGO`, `SONNTAGSESSEN`],
  lunchPrompt: [
    `Your composure {0}/{1} · Her curiosity {2}/30`,
    `Ton sang-froid {0}/{1} · Sa curiosité {2}/30`,
    `Sua compostura {0}/{1} · Curiosidade dela {2}/30`,
    `Deine Fassung {0}/{1} · Ihre Neugier {2}/30`],
  lmPhotos: [`Show photos`, `Montrer des photos`, `Mostrar fotos`, `Fotos zeigen`],
  lmPhotosL: [
    `You show mountain photos. "Beautiful. And who took this one of you?"`,
    `Tu montres des photos de montagne. « Magnifique. Et celle-ci, qui l'a prise ? »`,
    `Você mostra fotos das montanhas. "Que lindo. E esta aqui, quem tirou?"`,
    `Du zeigst Bergfotos. «Wunderschön. Und wer hat das hier von dir gemacht?»`],
  lmFood: [`Praise the food`, `Complimenter le repas`, `Elogiar a comida`, `Das Essen loben`],
  lmFoodL: [
    `"Nobody makes beans like this." She softens. Your plate is refilled as a reward.`,
    `« Personne ne fait les haricots comme ça. » Elle s'adoucit. Ton assiette est remplie en récompense.`,
    `"Ninguém faz um feijão desses." Ela amolece. Seu prato é reabastecido como prêmio.`,
    `«Niemand macht Bohnen wie du.» Sie wird weich. Zur Belohnung wird dein Teller nachgefüllt.`],
  lmFootball: [`Football`, `Football`, `Futebol`, `Fussball`],
  lmFootballL: [
    `You bring up the national team. Three uncles start shouting at once. You gain a minute.`,
    `Tu lances le sujet de la sélection. Trois oncles se mettent à crier en même temps. Tu gagnes une minute.`,
    `Você puxa o assunto da seleção. Três tios começam a gritar ao mesmo tempo. Você ganha um minuto.`,
    `Du bringst die Nationalmannschaft ins Spiel. Drei Onkel schreien gleichzeitig los. Du gewinnst eine Minute.`],
  lmChoc: [`Swiss chocolate`, `Chocolat suisse`, `Chocolate suíço`, `Schweizer Schokolade`],
  lmChocL: [
    `You put the Swiss chocolate on the table. Silence. Then negotiations over who gets the big bar.`,
    `Tu poses le chocolat suisse sur la table. Silence. Puis négociations pour savoir qui aura la grande tablette.`,
    `Você põe o chocolate suíço na mesa. Silêncio. Depois, negociações sobre quem fica com a barra grande.`,
    `Du legst die Schweizer Schokolade auf den Tisch. Stille. Dann Verhandlungen, wer die grosse Tafel bekommt.`],
  lq1: [
    `"And the girlfriends? Nobody? In all of Europe?"`,
    `« Et les copines ? Personne ? Dans toute l'Europe ? »`,
    `"E as namoradas? Ninguém? Na Europa inteira?"`,
    `«Und die Freundinnen? Keine? In ganz Europa?»`],
  lq2: [`"When are you coming back for good?"`, `« Tu rentres quand, pour de bon ? »`, `"Quando é que você volta de vez?"`, `«Wann kommst du endgültig zurück?»`],
  lq3: [
    `"Are you eating properly? You look like a tourist."`,
    `« Tu manges correctement ? Tu as l'air d'un touriste. »`,
    `"Você está comendo direito? Está com cara de turista."`,
    `«Isst du auch richtig? Du siehst aus wie ein Tourist.»`],
  brAuntWin1: [
    `"He is doing well, this one," she announces to the table. You are approved until Christmas.`,
    `« Il s'en sort bien, celui-là », annonce-t-elle à la tablée. Tu es validé jusqu'à Noël.`,
    `"Esse aqui está indo bem", ela anuncia para a mesa. Você está aprovado até o Natal.`,
    `«Der macht das gut», verkündet sie der ganzen Tafel. Du bist bis Weihnachten genehmigt.`],
  brAuntWin2: [
    `She presses a folded banknote into your hand, like when you were eight. It is still fifty reais.`,
    `Elle glisse un billet plié dans ta main, comme quand tu avais huit ans. C'est toujours cinquante reais.`,
    `Ela põe uma nota dobrada na sua mão, como quando você tinha oito anos. Continua sendo cinquenta reais.`,
    `Sie drückt dir einen gefalteten Geldschein in die Hand, wie damals mit acht. Es sind immer noch fünfzig Reais.`],
  brAuntLose: [
    `You fold. You promise to visit more, call more, eat more and marry soon. Lunch continues.`,
    `Tu craques. Tu promets de venir plus souvent, d'appeler plus, de manger plus et de te marier bientôt. Le déjeuner continue.`,
    `Você se rende. Promete visitar mais, ligar mais, comer mais e casar logo. O almoço continua.`,
    `Du gibst auf. Du versprichst, öfter zu kommen, öfter anzurufen, mehr zu essen und bald zu heiraten. Das Essen geht weiter.`],
  brAuntDone: [
    `"Next time bring a girlfriend. Or at least more chocolate."`,
    `« La prochaine fois, amène une copine. Ou au moins plus de chocolat. »`,
    `"Da próxima vez traz uma namorada. Ou pelo menos mais chocolate."`,
    `«Nächstes Mal bring eine Freundin mit. Oder wenigstens mehr Schokolade.»`],
  brAirQ: [
    `Guarulhos airport. Fly back to Zurich? (two days)`,
    `Aéroport de Guarulhos. Rentrer à Zurich ? (deux jours)`,
    `Aeroporto de Guarulhos. Voltar para Zurique? (dois dias)`,
    `Flughafen Guarulhos. Zurück nach Zürich fliegen? (zwei Tage)`],
  brAir1: [
    `Your mother cries at departures. Your father studies the ceiling. You promise to come back sooner, and mean it.`,
    `Ta mère pleure aux départs. Ton père étudie le plafond. Tu promets de revenir plus vite, et tu le penses.`,
    `Sua mãe chora no embarque. Seu pai estuda o teto. Você promete voltar mais cedo, e é sincero.`,
    `Deine Mutter weint beim Abflug. Dein Vater studiert die Decke. Du versprichst, früher wiederzukommen, und meinst es so.`],

  // ---- Memory: Wiener Neustadt, 2017 ----
  mWiener: same(`Wiener Neustadt, 2017`),
  boxWnHint: [
    `Next in the box: a headlight module. Your own bike light has barely been used. Ride three kilometres first.`,
    `Ensuite dans le carton : un module de phare. Ta propre lampe de vélo n'a presque pas servi. Roule d'abord trois kilomètres.`,
    `O próximo na caixa: um módulo de farol. A luz da sua bicicleta mal foi usada. Pedale três quilômetros primeiro.`,
    `Als Nächstes in der Kiste: ein Scheinwerfermodul. Dein eigenes Velolicht wurde kaum benutzt. Fahr erst drei Kilometer.`],
  boxWnOpen: [
    `The headlight module. Wiener Neustadt, 2017. You test car headlights with computer vision. The cars are worth more than your degree.`,
    `Le module de phare. Wiener Neustadt, 2017. Tu testes des phares de voiture par vision par ordinateur. Les voitures valent plus que ton diplôme.`,
    `O módulo de farol. Wiener Neustadt, 2017. Você testa faróis de carro com visão computacional. Os carros valem mais que o seu diploma.`,
    `Das Scheinwerfermodul. Wiener Neustadt, 2017. Du testest Autoscheinwerfer mit Computer Vision. Die Autos sind mehr wert als dein Abschluss.`],
  wnBoss: [
    `"Morning. The new matrix headlight fails its test. Every LED has to be on. Get the test bench key from the porter."`,
    `« Bonjour. Le nouveau phare matriciel échoue au test. Toutes les LED doivent être allumées. Va chercher la clé du banc d'essai chez le concierge. »`,
    `"Bom dia. O novo farol matricial não passa no teste. Todos os LEDs têm de estar acesos. Pegue a chave da bancada com o porteiro."`,
    `«Morgen. Der neue Matrix-Scheinwerfer fällt beim Test durch. Jede LED muss leuchten. Hol den Prüfstandschlüssel beim Portier.»`],
  wnCol: [
    `A colleague eats a Leberkässemmel at nine in the morning, with total commitment. "Mahlzeit."`,
    `Un collègue mange un Leberkässemmel à neuf heures du matin, avec un engagement total. « Mahlzeit. »`,
    `Um colega come um Leberkässemmel às nove da manhã, com total dedicação. "Mahlzeit."`,
    `Ein Kollege isst um neun Uhr morgens eine Leberkässemmel, mit voller Hingabe. «Mahlzeit.»`],
  wnPorter1: [
    `"The key? For that you need form A38. From HR."`,
    `« La clé ? Pour ça, il vous faut le formulaire A38. Aux RH. »`,
    `"A chave? Para isso você precisa do formulário A38. No RH."`,
    `«Der Schlüssel? Dafür brauchen Sie Formular A38. Von der Personalabteilung.»`],
  wnHr1: [`"Form A38 is issued by the porter."`, `« Le formulaire A38 est délivré par le concierge. »`, `"O formulário A38 é emitido pelo porteiro."`, `«Formular A38 stellt der Portier aus.»`],
  wnPorter2: [
    `"HR said that? Then I need form A39. Also from HR."`,
    `« Les RH ont dit ça ? Alors il me faut le formulaire A39. Aux RH aussi. »`,
    `"O RH disse isso? Então eu preciso do formulário A39. Também no RH."`,
    `«Das hat die Personalabteilung gesagt? Dann brauche ich Formular A39. Auch von dort.»`],
  wnHr2: [
    `HR sighs, opens a drawer full of keys and hands you one. "There are no forms. He just likes visitors."`,
    `Les RH soupirent, ouvrent un tiroir plein de clés et t'en tendent une. « Il n'y a pas de formulaires. Il aime juste les visites. »`,
    `O RH suspira, abre uma gaveta cheia de chaves e te entrega uma. "Não existe formulário. Ele só gosta de visita."`,
    `Die Personalabteilung seufzt, öffnet eine Schublade voller Schlüssel und gibt dir einen. «Es gibt keine Formulare. Er mag einfach Besuch.»`],
  wnPorterDone: [`"Come back anytime. Bring forms."`, `« Revenez quand vous voulez. Avec des formulaires. »`, `"Volte quando quiser. Traga formulários."`, `«Kommen Sie jederzeit wieder. Bringen Sie Formulare mit.»`],
  wnHrDone: [`"Was there anything else? No? Wonderful."`, `« Autre chose ? Non ? Merveilleux. »`, `"Mais alguma coisa? Não? Maravilha."`, `«Sonst noch etwas? Nein? Wunderbar.»`],
  wnNoKey: [
    `The test bench is locked. The key is with the porter. Probably.`,
    `Le banc d'essai est fermé à clé. La clé est chez le concierge. Probablement.`,
    `A bancada de testes está trancada. A chave está com o porteiro. Provavelmente.`,
    `Der Prüfstand ist abgeschlossen. Der Schlüssel ist beim Portier. Wahrscheinlich.`],
  wnHow: [
    `Each press flips one LED and its neighbours. Arrows move, Space presses. Light all nine.`,
    `Chaque pression inverse une LED et ses voisines. Flèches pour bouger, Espace pour appuyer. Allume les neuf.`,
    `Cada toque inverte um LED e os vizinhos. Setas movem, Espaço aperta. Acenda os nove.`,
    `Jeder Druck schaltet eine LED und ihre Nachbarn um. Pfeile bewegen, Leertaste drückt. Bring alle neun zum Leuchten.`],
  lightsHud: [`Light all nine · {0}s left`, `Allume les neuf · {0}s restantes`, `Acenda os nove · {0}s restantes`, `Alle neun an · noch {0}s`],
  wnFail: [
    `The headlight blinks an insult in Morse code. Try again.`,
    `Le phare clignote une insulte en morse. Réessaie.`,
    `O farol pisca um insulto em código Morse. Tente de novo.`,
    `Der Scheinwerfer blinkt eine Beleidigung im Morsecode. Versuch's nochmal.`],
  wn1: [
    `Nine LEDs, steady. The boss looks at them, then at you. "Passt scho." You have peaked.`,
    `Neuf LED, stables. Le chef les regarde, puis te regarde. « Passt scho. » Tu as atteint ton sommet.`,
    `Nove LEDs, firmes. O chefe olha para eles, depois para você. "Passt scho." Você chegou ao auge.`,
    `Neun LEDs, stabil. Der Chef schaut sie an, dann dich. «Passt scho.» Mehr geht nicht.`],
  wn2: [
    `You learned FULL BEAM: you ride your bike even faster.`,
    `Tu as appris PLEINS PHARES : tu roules encore plus vite à vélo.`,
    `Você aprendeu FAROL ALTO: você pedala ainda mais rápido.`,
    `Du hast FERNLICHT gelernt: Du fährst noch schneller Velo.`],
  wn3: [
    `You wake up in Zurich. Your bike light is still broken, but now you know why.`,
    `Tu te réveilles à Zurich. Ta lampe de vélo est toujours cassée, mais maintenant tu sais pourquoi.`,
    `Você acorda em Zurique. A luz da bicicleta continua quebrada, mas agora você sabe por quê.`,
    `Du wachst in Zürich auf. Dein Velolicht ist immer noch kaputt, aber jetzt weisst du, warum.`],

  // ---- Memory: Zurich, 2020 ----
  mBank: same(`Zürich, 2020`),
  boxBkHint: [
    `Last in the box: a bank badge. It only respects people with five thousand francs in their account.`,
    `Dernier objet du carton : un badge de banque. Il ne respecte que les gens qui ont cinq mille francs sur leur compte.`,
    `Por último na caixa: um crachá de banco. Ele só respeita quem tem cinco mil francos na conta.`,
    `Zuletzt in der Kiste: ein Bankbadge. Er respektiert nur Leute mit fünftausend Franken auf dem Konto.`],
  boxBkOpen: [
    `The badge. Zurich, 2020. You have moved to the most expensive city on earth, in a pandemic, to work for a bank, from your kitchen.`,
    `Le badge. Zurich, 2020. Tu as emménagé dans la ville la plus chère du monde, en pleine pandémie, pour travailler pour une banque, depuis ta cuisine.`,
    `O crachá. Zurique, 2020. Você se mudou para a cidade mais cara do mundo, numa pandemia, para trabalhar num banco, da sua cozinha.`,
    `Der Badge. Zürich, 2020. Du bist in die teuerste Stadt der Welt gezogen, mitten in einer Pandemie, um für eine Bank zu arbeiten, von deiner Küche aus.`],
  bkIt1: [
    `"Welcome to Three Keys Bank. Here is your laptop, your token and a forty-page guide to the VPN. Please never come to the office."`,
    `« Bienvenue chez Three Keys Bank. Voici votre portable, votre jeton et un guide de quarante pages pour le VPN. Ne venez jamais au bureau, s'il vous plaît. »`,
    `"Bem-vindo ao Three Keys Bank. Aqui estão seu laptop, seu token e um guia de quarenta páginas para a VPN. Por favor, nunca venha ao escritório."`,
    `«Willkommen bei der Three Keys Bank. Hier sind Ihr Laptop, Ihr Token und eine vierzigseitige Anleitung fürs VPN. Bitte kommen Sie nie ins Büro.»`],
  bkItDone: [
    `"Have you tried turning it off and never on again?"`,
    `« Vous avez essayé de l'éteindre et de ne plus jamais le rallumer ? »`,
    `"Já tentou desligar e nunca mais ligar?"`,
    `«Haben Sie versucht, ihn auszuschalten und nie wieder ein?»`],
  bkQueue: [
    `Forty people queue for a flat viewing. The flat is 31 square metres. Someone has brought their parents as references.`,
    `Quarante personnes font la queue pour visiter un appartement. Il fait 31 mètres carrés. Quelqu'un a amené ses parents comme références.`,
    `Quarenta pessoas na fila para visitar um apartamento. Ele tem 31 metros quadrados. Alguém trouxe os pais como referência.`,
    `Vierzig Leute stehen für eine Wohnungsbesichtigung an. Die Wohnung hat 31 Quadratmeter. Jemand hat die Eltern als Referenz mitgebracht.`],
  bkAgent1: [
    `"Dossier? Debt register extract? No? Then you are just a man in a stairwell. The district office issues it."`,
    `« Dossier ? Extrait du registre des poursuites ? Non ? Alors vous n'êtes qu'un homme dans une cage d'escalier. Le bureau de district le délivre. »`,
    `"Dossiê? Certidão negativa de dívidas? Não? Então você é só um homem numa escada. O cartório do distrito emite."`,
    `«Dossier? Betreibungsauszug? Nein? Dann sind Sie nur ein Mann im Treppenhaus. Den gibt es beim Kreisbüro.»`],
  bkOfficeIdle: [
    `The district office. You have no reason to be here, which has never stopped anyone.`,
    `Le bureau de district. Tu n'as aucune raison d'être ici, ce qui n'a jamais arrêté personne.`,
    `O cartório do distrito. Você não tem motivo para estar aqui, o que nunca impediu ninguém.`,
    `Das Kreisbüro. Du hast keinen Grund, hier zu sein, was noch nie jemanden aufgehalten hat.`],
  bkOffice1: [`You take a number: 847. Now serving: 12.`, `Tu prends un numéro : 847. Numéro appelé : 12.`, `Você pega uma senha: 847. Atendendo agora: 12.`, `Du ziehst eine Nummer: 847. Aufgerufen wird: 12.`],
  bkOffice2: [
    `Now serving: 13. A man is asking about dog tax.`,
    `Numéro appelé : 13. Un homme pose des questions sur l'impôt sur les chiens.`,
    `Atendendo agora: 13. Um homem pergunta sobre o imposto de cachorro.`,
    `Aufgerufen wird: 13. Ein Mann erkundigt sich nach der Hundesteuer.`],
  bkOffice3: [
    `Your number comes up. The extract costs CHF 17 and proves you owe nobody anything, yet.`,
    `Ton numéro est appelé. L'extrait coûte CHF 17 et prouve que tu ne dois rien à personne, pour l'instant.`,
    `Sua senha é chamada. A certidão custa CHF 17 e prova que você não deve nada a ninguém, por enquanto.`,
    `Deine Nummer wird aufgerufen. Der Auszug kostet CHF 17 und beweist, dass du niemandem etwas schuldest, noch nicht.`],
  bkOfficeDone: [`Now serving: 848. Not you.`, `Numéro appelé : 848. Pas toi.`, `Atendendo agora: 848. Não é você.`, `Aufgerufen wird: 848. Nicht du.`],
  bkAgent2: [
    `"Ah, the extract. That flat is gone. But I have another: smaller, darker, three hundred more. You take it?" You take it.`,
    `« Ah, l'extrait. Cet appartement est parti. Mais j'en ai un autre : plus petit, plus sombre, trois cents de plus. Vous le prenez ? » Tu le prends.`,
    `"Ah, a certidão. Aquele apartamento já foi. Mas tenho outro: menor, mais escuro, trezentos a mais. Fica com ele?" Você fica.`,
    `«Ah, der Auszug. Die Wohnung ist weg. Aber ich habe eine andere: kleiner, dunkler, dreihundert mehr. Nehmen Sie sie?» Du nimmst sie.`],
  bkAgentDone: [
    `"Laundry day is Thursday, 14:00 to 14:45. Do not negotiate."`,
    `« Le jour de lessive, c'est jeudi, de 14h00 à 14h45. Ne négociez pas. »`,
    `"O dia de lavar roupa é quinta, das 14:00 às 14:45. Não negocie."`,
    `«Waschtag ist Donnerstag, 14:00 bis 14:45. Nicht verhandeln.»`],
  bkNoLaptop: [
    `The compliance system needs your laptop. IT is by the side of the building.`,
    `Le système de conformité a besoin de ton portable. L'informatique est sur le côté du bâtiment.`,
    `O sistema de compliance precisa do seu laptop. A TI fica na lateral do prédio.`,
    `Das Compliance-System braucht deinen Laptop. Die IT ist seitlich am Gebäude.`],
  bkNoFlat: [
    `You open the laptop and realise you have nowhere to put it down. Find a flat first.`,
    `Tu ouvres le portable et tu réalises que tu n'as nulle part où le poser. Trouve d'abord un appartement.`,
    `Você abre o laptop e percebe que não tem onde apoiá-lo. Arrume um apartamento primeiro.`,
    `Du klappst den Laptop auf und merkst, dass du ihn nirgends hinstellen kannst. Such dir erst eine Wohnung.`],
  bkHow: [
    `Financial crime screening. Left arrow: looks fine. Right arrow: suspicious. Be quick.`,
    `Contrôle anti-criminalité financière. Flèche gauche : rien à signaler. Flèche droite : suspect. Fais vite.`,
    `Triagem de crimes financeiros. Seta esquerda: tudo certo. Seta direita: suspeito. Seja rápido.`,
    `Prüfung auf Finanzkriminalität. Pfeil links: unauffällig. Pfeil rechts: verdächtig. Mach schnell.`],
  sortHud: [`Reviewed {0}/{1} · mistakes {2}/{3}`, `Traités {0}/{1} · erreurs {2}/{3}`, `Analisados {0}/{1} · erros {2}/{3}`, `Geprüft {0}/{1} · Fehler {2}/{3}`],
  sortOk: [`← looks fine`, `← rien à signaler`, `← tudo certo`, `← unauffällig`],
  sortBad: [`suspicious →`, `suspect →`, `suspeito →`, `verdächtig →`],
  bkFail: [
    `You approve the prince and block a grandmother's knitting club. Compliance would like a word. Try again.`,
    `Tu valides le prince et tu bloques le club de tricot d'une grand-mère. La conformité aimerait te parler. Réessaie.`,
    `Você aprova o príncipe e bloqueia o clube de tricô de uma vovó. O compliance quer uma palavrinha. Tente de novo.`,
    `Du winkst den Prinzen durch und sperrst den Strickclub einer Grossmutter. Compliance hätte gern ein Wort mit dir. Versuch's nochmal.`],
  bk1: [
    `A clean sheet. Your manager sends a thumbs-up emoji. In banking, this counts as a hug.`,
    `Sans faute. Ton manager envoie un pouce levé. Dans la banque, ça compte comme une accolade.`,
    `Sem erros. Seu gerente manda um emoji de joinha. No banco, isso conta como um abraço.`,
    `Fehlerfrei. Dein Chef schickt ein Daumen-hoch-Emoji. In der Bank zählt das als Umarmung.`],
  bk2: [
    `You learned HALF-FARE: train tickets now cost half. It is the most Swiss thing about you.`,
    `Tu as appris le DEMI-TARIF : les billets de train coûtent moitié prix. C'est ce que tu as de plus suisse.`,
    `Você aprendeu MEIA TARIFA: as passagens de trem agora custam a metade. É a coisa mais suíça em você.`,
    `Du hast HALBTAX gelernt: Zugbillette kosten jetzt die Hälfte. Es ist das Schweizerischste an dir.`],
  bk3: [
    `You wake up in Zurich, the present one. Same city, same prices, better bicycle.`,
    `Tu te réveilles à Zurich, celle d'aujourd'hui. Même ville, mêmes prix, meilleur vélo.`,
    `Você acorda em Zurique, a de hoje. Mesma cidade, mesmos preços, bicicleta melhor.`,
    `Du wachst in Zürich auf, dem heutigen. Gleiche Stadt, gleiche Preise, besseres Velo.`],
  // ---- Brazil: grandma, and the friends' birthday party ----
  brGran1: [
    `"My grandson! Let me look at you. Handsome. Thin, but handsome. Bring me mangoes from the tree at your father's work and I will make the sweet you like."`,
    `« Mon petit-fils ! Laisse-moi te regarder. Beau. Maigre, mais beau. Apporte-moi des mangues de l'arbre du travail de ton père et je te ferai la confiture que tu aimes. »`,
    `"Meu neto! Deixa eu olhar pra você. Bonito. Magro, mas bonito. Me traz manga do pé lá do serviço do seu pai que eu faço o doce que você gosta."`,
    `«Mein Enkel! Lass dich anschauen. Hübsch. Dünn, aber hübsch. Bring mir Mangos vom Baum bei der Arbeit deines Vaters, dann mache ich dir die Süssspeise, die du magst.»`,
  ],
  brGran2: [
    `She makes the mango sweet from memory, talking the whole time. You realise you would pay any airfare for this kitchen.`,
    `Elle prépare la confiture de mangue de mémoire, sans s'arrêter de parler. Tu réalises que tu paierais n'importe quel billet d'avion pour cette cuisine.`,
    `Ela faz o doce de manga de cabeça, falando o tempo todo. Você percebe que pagaria qualquer passagem por esta cozinha.`,
    `Sie kocht die Mango-Süssspeise aus dem Kopf und redet die ganze Zeit. Dir wird klar: Für diese Küche würdest du jeden Flugpreis zahlen.`],
  brGran3: [
    `"Now fix my phone. The WhatsApp disappeared." The brightness was at zero. You are now the family genius.`,
    `« Maintenant, répare mon téléphone. Le WhatsApp a disparu. » La luminosité était à zéro. Te voilà le génie de la famille.`,
    `"Agora arruma meu celular. O zap sumiu." O brilho estava no zero. Agora você é o gênio da família.`,
    `«Jetzt reparier mein Handy. Das WhatsApp ist verschwunden.» Die Helligkeit stand auf null. Du bist jetzt das Familiengenie.`],
  brGranDone: [
    `"God bless you. Take a coat." "It is thirty degrees." "Take it."`,
    `« Que Dieu te bénisse. Prends une veste. » « Il fait trente degrés. » « Prends-la. »`,
    `"Deus te abençoe. Leva um casaco." "Está fazendo trinta graus." "Leva."`,
    `«Gott segne dich. Nimm eine Jacke mit.» «Es hat dreissig Grad.» «Nimm sie.»`],
  brPartyEmpty: [
    `"You came! Wait. Empty-handed? To a birthday? Your grandmother raised you better than this."`,
    `« Tu es venu ! Attends. Les mains vides ? À un anniversaire ? Ta grand-mère t'a mieux élevé que ça. »`,
    `"Você veio! Peraí. De mão abanando? Num aniversário? Sua avó te educou melhor que isso."`,
    `«Du bist gekommen! Moment. Mit leeren Händen? Zu einem Geburtstag? Deine Grossmutter hat dich besser erzogen.»`],
  brPartyIn: [
    `"Grandma's mango sweet! You may enter. Also, the children were promised that the uncle from Switzerland plays tag."`,
    `« La confiture de mangue de mamie ! Tu peux entrer. Au fait, on a promis aux enfants que le tonton de Suisse jouerait à chat. »`,
    `"O doce de manga da vó! Pode entrar. Ah, e as crianças foram avisadas de que o tio da Suíça brinca de pega-pega."`,
    `«Omas Mango-Süssspeise! Du darfst rein. Übrigens: Den Kindern wurde versprochen, dass der Onkel aus der Schweiz Fangen spielt.»`],
  brTagAgain: [
    `"They want a rematch. They have been training. You have been eating."`,
    `« Ils veulent une revanche. Ils se sont entraînés. Toi, tu as mangé. »`,
    `"Eles querem revanche. Eles treinaram. Você comeu."`,
    `«Sie wollen eine Revanche. Sie haben trainiert. Du hast gegessen.»`],
  brTagHow: [
    `You are it. Arrow keys to run. Tag all eight before they get bored.`,
    `C'est toi le chat. Flèches pour courir. Touche les huit avant qu'ils se lassent.`,
    `Tá com você. Setas para correr. Pegue os oito antes que eles enjoem.`,
    `Du bist dran. Pfeiltasten zum Rennen. Fang alle acht, bevor ihnen langweilig wird.`],
  tagHud: [`Tagged {0}/{1} · {2}s left`, `Touchés {0}/{1} · {2}s restantes`, `Pegos {0}/{1} · {2}s restantes`, `Gefangen {0}/{1} · noch {2}s`],
  brTagFail: [
    `Eight small children have outrun a grown engineer. One of them pats your arm. Try again.`,
    `Huit petits enfants ont semé un ingénieur adulte. L'un d'eux te tapote le bras. Réessaie.`,
    `Oito crianças pequenas deixaram um engenheiro adulto para trás. Uma delas dá tapinhas no seu braço. Tente de novo.`,
    `Acht kleine Kinder sind einem erwachsenen Ingenieur davongelaufen. Eines tätschelt dir den Arm. Versuch's nochmal.`],
  brTagWin: [
    `All eight caught. You are a legend to people under six, and you cannot feel your legs.`,
    `Les huit attrapés. Tu es une légende pour les moins de six ans, et tu ne sens plus tes jambes.`,
    `Os oito pegos. Você é uma lenda para quem tem menos de seis anos, e não sente mais as pernas.`,
    `Alle acht gefangen. Für Menschen unter sechs bist du eine Legende, und du spürst deine Beine nicht mehr.`],
  brParabens: [
    `Everyone sings Parabéns, with the clapping part that speeds up until nobody can keep time. The birthday child cries. It is perfect.`,
    `Tout le monde chante Parabéns, avec les applaudissements qui accélèrent jusqu'à ce que plus personne ne suive. L'enfant fêté pleure. C'est parfait.`,
    `Todo mundo canta Parabéns, com as palmas que vão acelerando até ninguém mais acompanhar. O aniversariante chora. Está perfeito.`,
    `Alle singen Parabéns, mit dem Klatschen, das immer schneller wird, bis keiner mehr mitkommt. Das Geburtstagskind weint. Es ist perfekt.`],
  brHostDone: [
    `"Stay for the second cake. There is always a second cake. And take a plate home, your grandmother will ask."`,
    `« Reste pour le deuxième gâteau. Il y a toujours un deuxième gâteau. Et emporte une assiette, ta grand-mère va demander. »`,
    `"Fica para o segundo bolo. Sempre tem um segundo bolo. E leva um pratinho, sua avó vai perguntar."`,
    `«Bleib für die zweite Torte. Es gibt immer eine zweite Torte. Und nimm einen Teller mit, deine Grossmutter wird fragen.»`],
  brFriend1: [
    `"We have three kids now. We have not slept since 2019. You look so... rested. Is that what a weekend does?"`,
    `« On a trois enfants maintenant. On n'a pas dormi depuis 2019. Tu as l'air tellement... reposé. C'est ça, l'effet d'un week-end ? »`,
    `"A gente tem três filhos agora. Não dormimos desde 2019. Você parece tão... descansado. É isso que um fim de semana faz?"`,
    `«Wir haben jetzt drei Kinder. Wir haben seit 2019 nicht geschlafen. Du siehst so... ausgeruht aus. Macht das ein Wochenende?»`],
  brFriend2: [
    `"The group chat has 4,812 unread messages. Do not read them. It is all stickers, school fees and one funeral."`,
    `« Le groupe a 4 812 messages non lus. Ne les lis pas. Ce ne sont que des stickers, des frais de scolarité et un enterrement. »`,
    `"O grupo tem 4.812 mensagens não lidas. Não leia. É tudo figurinha, mensalidade de escola e um velório."`,
    `«Der Gruppenchat hat 4'812 ungelesene Nachrichten. Lies sie nicht. Es sind nur Sticker, Schulgebühren und eine Beerdigung.»`],
  brFriend3: [
    `"We all had kids at the same time, like a software release. You are still on the old version. It is fine. It is stable."`,
    `« On a tous eu des enfants en même temps, comme une mise à jour logicielle. Toi, tu es resté sur l'ancienne version. C'est bien. C'est stable. »`,
    `"Todo mundo teve filho ao mesmo tempo, tipo atualização de software. Você continua na versão antiga. Tudo bem. É estável."`,
    `«Wir haben alle gleichzeitig Kinder bekommen, wie ein Software-Release. Du bist noch auf der alten Version. Ist okay. Die ist stabil.»`],
  brKid1: [
    `"Is it true that in Switzerland the cows wear bells? Why? Do they have meetings?"`,
    `« C'est vrai qu'en Suisse les vaches ont des cloches ? Pourquoi ? Elles ont des réunions ? »`,
    `"É verdade que na Suíça as vacas usam sino? Por quê? Elas têm reunião?"`,
    `«Stimmt es, dass die Kühe in der Schweiz Glocken tragen? Warum? Haben die Sitzungen?»`],
  brKid2: [`"Tio. Tio. Tio. Tio. Tio." You turn around. "Hi."`, `« Tonton. Tonton. Tonton. Tonton. Tonton. » Tu te retournes. « Salut. »`, `"Tio. Tio. Tio. Tio. Tio." Você se vira. "Oi."`, `«Onkel. Onkel. Onkel. Onkel. Onkel.» Du drehst dich um. «Hallo.»`],
  brTableNo: [
    `The cake table, heavy with brigadeiros. An aunt you have never met slaps your hand. "Only after the Parabéns."`,
    `La table du gâteau, couverte de brigadeiros. Une tante que tu n'as jamais vue te tape sur la main. « Pas avant le Parabéns. »`,
    `A mesa do bolo, cheia de brigadeiro. Uma tia que você nunca viu dá um tapa na sua mão. "Só depois do Parabéns."`,
    `Der Tortentisch, voller Brigadeiros. Eine Tante, die du noch nie gesehen hast, haut dir auf die Finger. «Erst nach dem Parabéns.»`],
  brTableYes: [
    `You eat seven brigadeiros. Nobody is counting. Everybody is counting.`,
    `Tu manges sept brigadeiros. Personne ne compte. Tout le monde compte.`,
    `Você come sete brigadeiros. Ninguém está contando. Todo mundo está contando.`,
    `Du isst sieben Brigadeiros. Niemand zählt mit. Alle zählen mit.`],
  lblCemetery: [`Jewish Cemetery`, `Cimetière juif`, `Cemitério Israelita`, `Jüdischer Friedhof`],
  brCemSign: [
    `The Jewish cemetery. Your father has looked after the community's cemeteries for as long as you can remember. He says the neighbours are quiet and nobody has ever complained.`,
    `Le cimetière juif. Ton père s'occupe des cimetières de la communauté depuis toujours. Il dit que les voisins sont calmes et que personne ne s'est jamais plaint.`,
    `O cemitério israelita. Seu pai cuida dos cemitérios da comunidade desde que você se entende por gente. Ele diz que a vizinhança é quieta e que ninguém nunca reclamou.`,
    `Der jüdische Friedhof. Dein Vater kümmert sich um die Friedhöfe der Gemeinde, seit du denken kannst. Er sagt, die Nachbarn seien ruhig und beschwert habe sich noch nie jemand.`],
  brTomb: [
    `An old stone, well kept, with small pebbles left on top by visitors. You add one. Somebody sweeps here every morning. You know who.`,
    `Une vieille pierre, bien entretenue, avec des petits cailloux posés dessus par les visiteurs. Tu en ajoutes un. Quelqu'un balaie ici chaque matin. Tu sais qui.`,
    `Uma lápide antiga, bem cuidada, com pedrinhas deixadas em cima pelos visitantes. Você põe mais uma. Alguém varre aqui toda manhã. Você sabe quem.`,
    `Ein alter Stein, gut gepflegt, mit kleinen Steinchen obendrauf, von Besuchern hingelegt. Du legst einen dazu. Jemand fegt hier jeden Morgen. Du weisst, wer.`],
  // ---- The laptop: jobs, dating, and deciding what comes next ----
  pcMenu: [`Your laptop.`, `Ton ordinateur.`, `Seu laptop.`, `Dein Laptop.`],
  pcJobs: [`Job portal`, `Portail d'emploi`, `Portal de vagas`, `Jobportal`],
  pcDating: [`Dating app`, `Appli de rencontres`, `App de namoro`, `Dating-App`],
  pcDecide: [`Decide what comes next`, `Décider de la suite`, `Decidir o que vem agora`, `Entscheiden, wie es weitergeht`],
  pcMatch1: [
    `Three hundred swipes. One match. Her profile says "fluent in sarcasm" and has a photo with a goat.`,
    `Trois cents swipes. Un match. Son profil dit « bilingue en sarcasme » et montre une photo avec une chèvre.`,
    `Trezentos swipes. Um match. O perfil dela diz "fluente em sarcasmo" e tem uma foto com uma cabra.`,
    `Dreihundert Swipes. Ein Match. In ihrem Profil steht «fliessend sarkastisch», dazu ein Foto mit einer Ziege.`],
  pcMatch2: [
    `She suggests coffee by the lake. Today. You own nothing to wear that is not a Berkelium T-shirt.`,
    `Elle propose un café au bord du lac. Aujourd'hui. Tu n'as rien à te mettre qui ne soit pas un t-shirt Berkélium.`,
    `Ela sugere um café na beira do lago. Hoje. Você não tem nada para vestir que não seja uma camiseta de Berquélio.`,
    `Sie schlägt Kaffee am See vor. Heute. Du besitzt nichts zum Anziehen, das kein Berkelium-T-Shirt ist.`],
  pcMatchWaiting: [
    `Your match is waiting by the lake. The app reminds you every four minutes.`,
    `Ton match t'attend au bord du lac. L'appli te le rappelle toutes les quatre minutes.`,
    `Seu match está esperando na beira do lago. O app te lembra a cada quatro minutos.`,
    `Dein Match wartet am See. Die App erinnert dich alle vier Minuten daran.`],
  pcDatingDone: [
    `You deleted the app. The phone feels lighter.`,
    `Tu as supprimé l'appli. Le téléphone paraît plus léger.`,
    `Você apagou o app. O celular parece mais leve.`,
    `Du hast die App gelöscht. Das Handy fühlt sich leichter an.`],
  decide1: [
    `You close every other tab. What do you actually want?`,
    `Tu fermes tous les autres onglets. Qu'est-ce que tu veux vraiment ?`,
    `Você fecha todas as outras abas. O que você quer de verdade?`,
    `Du schliesst alle anderen Tabs. Was willst du eigentlich?`],
  endSeen: [
    `Futures seen: {0} of {1}. Which one you get depends on what you do. You can keep living and decide again.`,
    `Futurs vus : {0} sur {1}. Celui que tu obtiens dépend de ce que tu fais. Tu peux continuer à vivre et décider à nouveau.`,
    `Futuros vistos: {0} de {1}. Qual você recebe depende do que você faz. Dá para continuar vivendo e decidir de novo.`,
    `Gesehene Zukünfte: {0} von {1}. Welche du bekommst, hängt davon ab, was du tust. Du kannst weiterleben und neu entscheiden.`],
  boxEmpty2: [
    `The box is still empty. It is humming slightly. Probably the fridge.`,
    `Le carton est toujours vide. Il bourdonne légèrement. Sûrement le frigo.`,
    `A caixa continua vazia. Está zumbindo um pouco. Deve ser a geladeira.`,
    `Die Kiste ist immer noch leer. Sie summt leise. Wahrscheinlich der Kühlschrank.`],

  // ---- The date ----
  date1: [
    `She is early. In Zurich this is called on time. "So. You are the one with the element on his shirt."`,
    `Elle est en avance. À Zurich, on appelle ça être à l'heure. « Alors. C'est toi, celui avec l'élément sur le t-shirt. »`,
    `Ela chegou cedo. Em Zurique isso se chama chegar na hora. "Então. É você o do elemento na camiseta."`,
    `Sie ist zu früh. In Zürich nennt man das pünktlich. «So. Du bist also der mit dem Element auf dem Shirt.»`],
  dq1: [`"What do you do when you are not working?"`, `« Tu fais quoi quand tu ne travailles pas ? »`, `"O que você faz quando não está trabalhando?"`, `«Was machst du, wenn du nicht arbeitest?»`],
  dq1a: [`List every sport, with weekly distances`, `Énumérer chaque sport, avec les distances hebdomadaires`, `Listar cada esporte, com as distâncias semanais`, `Jede Sportart aufzählen, mit Wochenkilometern`],
  dq1b: [`Ask what she does first`, `Lui demander d'abord ce qu'elle fait, elle`, `Perguntar primeiro o que ela faz`, `Erst fragen, was sie macht`],
  dq1c: [`"I jump off mountains."`, `« Je saute des montagnes. »`, `"Eu pulo de montanhas."`, `«Ich springe von Bergen.»`],
  dr1a: [
    `You are four minutes into your running statistics. She has checked the time twice.`,
    `Tu en es à quatre minutes de statistiques de course. Elle a regardé l'heure deux fois.`,
    `Você está há quatro minutos nas suas estatísticas de corrida. Ela já olhou as horas duas vezes.`,
    `Du bist seit vier Minuten bei deinen Laufstatistiken. Sie hat zweimal auf die Uhr geschaut.`],
  dr1b: [
    `She talks about her pottery for ten minutes. You learn the word "glaze". You are doing great.`,
    `Elle parle de sa poterie pendant dix minutes. Tu apprends le mot « émail ». Tu t'en sors très bien.`,
    `Ela fala da cerâmica dela por dez minutos. Você aprende a palavra "esmalte". Você está indo muito bem.`,
    `Sie erzählt zehn Minuten von ihrer Töpferei. Du lernst das Wort «Glasur». Du machst das grossartig.`],
  dr1c: [
    `"With a parachute?" "Sort of." She is interested, and slightly worried.`,
    `« Avec un parachute ? » « En quelque sorte. » Elle est intéressée, et un peu inquiète.`,
    `"De paraquedas?" "Mais ou menos." Ela fica interessada, e um pouco preocupada.`,
    `«Mit Fallschirm?» «So ähnlich.» Sie ist interessiert und leicht besorgt.`],
  dq2: [`"And your family, are they here?"`, `« Et ta famille, elle est ici ? »`, `"E a sua família, mora aqui?"`, `«Und deine Familie, ist die hier?»`],
  dq2a: [`"Everyone I love is a train or a plane away."`, `« Tous ceux que j'aime sont à un train ou un avion d'ici. »`, `"Todo mundo que eu amo está a um trem ou a um avião daqui."`, `«Alle, die ich liebe, sind einen Zug oder einen Flug entfernt.»`],
  dq2b: [`Explain your tax situation across three countries`, `Expliquer ta situation fiscale dans trois pays`, `Explicar sua situação fiscal em três países`, `Deine Steuersituation in drei Ländern erklären`],
  dq2c: [`Show the drawings from your nieces`, `Montrer les dessins de tes nièces`, `Mostrar os desenhos das sobrinhas`, `Die Zeichnungen deiner Nichten zeigen`],
  dr2a: [
    `It comes out more honest than planned. She puts her cup down. "That must be hard." It is. It also worked.`,
    `C'est sorti plus sincère que prévu. Elle pose sa tasse. « Ça doit être dur. » Ça l'est. Et ça a marché.`,
    `Sai mais sincero do que o planejado. Ela apoia a xícara. "Deve ser difícil." É. E também funcionou.`,
    `Es klingt ehrlicher als geplant. Sie stellt die Tasse ab. «Das ist sicher schwer.» Ist es. Es hat auch funktioniert.`],
  dr2b: [
    `You say "withholding tax" on a first date. Somewhere, a violin stops.`,
    `Tu dis « impôt à la source » à un premier rendez-vous. Quelque part, un violon s'arrête.`,
    `Você diz "imposto retido na fonte" num primeiro encontro. Em algum lugar, um violino para de tocar.`,
    `Du sagst «Quellensteuer» beim ersten Date. Irgendwo verstummt eine Geige.`],
  dr2c: [
    `She studies the very large dog you do not own. "He seems nice."`,
    `Elle examine le très gros chien que tu n'as pas. « Il a l'air gentil. »`,
    `Ela examina o cachorro enorme que você não tem. "Ele parece legal."`,
    `Sie betrachtet den sehr grossen Hund, den du nicht hast. «Der wirkt nett.»`],
  dq3: [`"So what are you looking for?"`, `« Et tu cherches quoi, au juste ? »`, `"E o que você está procurando?"`, `«Und was suchst du so?»`],
  dq3a: [`"A flat under two thousand francs."`, `« Un appartement à moins de deux mille francs. »`, `"Um apartamento por menos de dois mil francos."`, `«Eine Wohnung unter zweitausend Franken.»`],
  dq3b: [`"Honestly? I have a box at home I only just unpacked."`, `« Honnêtement ? J'ai un carton chez moi que je viens à peine de déballer. »`, `"Sinceramente? Tenho uma caixa em casa que só agora eu abri."`, `«Ehrlich? Ich habe zu Hause eine Kiste, die ich gerade erst ausgepackt habe.»`],
  dq3c: [`"Depends. What is your salary?"`, `« Ça dépend. Tu gagnes combien ? »`, `"Depende. Quanto você ganha?"`, `«Kommt drauf an. Was verdienst du?»`],
  dr3a: [
    `She laughs. "Aren't we all." A solid joke. Not an answer.`,
    `Elle rit. « Comme tout le monde. » Bonne blague. Pas une réponse.`,
    `Ela ri. "Quem não está." Boa piada. Não é uma resposta.`,
    `Sie lacht. «Wer nicht.» Guter Witz. Keine Antwort.`],
  dr3b: [
    `You tell her about the box. She does not run. She asks what was in it.`,
    `Tu lui parles du carton. Elle ne s'enfuit pas. Elle demande ce qu'il y avait dedans.`,
    `Você conta da caixa. Ela não sai correndo. Pergunta o que tinha dentro.`,
    `Du erzählst ihr von der Kiste. Sie läuft nicht weg. Sie fragt, was drin war.`],
  dr3c: [
    `You meant it as a joke about Zurich. It did not land as a joke about Zurich.`,
    `C'était une blague sur Zurich. Elle n'a pas été reçue comme une blague sur Zurich.`,
    `Era para ser uma piada sobre Zurique. Não foi recebida como uma piada sobre Zurique.`,
    `Es war als Witz über Zürich gemeint. Es kam nicht als Witz über Zürich an.`],
  dateWin1: [
    `She says she would like to do this again. You say "me too" in a normal voice, which is the hardest thing you have done all year.`,
    `Elle dit qu'elle aimerait remettre ça. Tu réponds « moi aussi » d'une voix normale, ce qui est la chose la plus difficile que tu aies faite de l'année.`,
    `Ela diz que gostaria de repetir. Você responde "eu também" com voz normal, a coisa mais difícil que você fez no ano.`,
    `Sie sagt, sie würde das gern wiederholen. Du sagst «ich auch» mit normaler Stimme, das Schwierigste, was du dieses Jahr getan hast.`],
  dateWin2: [
    `On the way home you notice the lake. It was there the whole time.`,
    `En rentrant, tu remarques le lac. Il était là depuis le début.`,
    `No caminho de casa você repara no lago. Ele estava lá o tempo todo.`,
    `Auf dem Heimweg fällt dir der See auf. Er war die ganze Zeit da.`],
  dateLose: [
    `"You are really nice." The four coldest words in any language. The app offers you more matches.`,
    `« Tu es vraiment gentil. » Les quatre mots les plus froids de toutes les langues. L'appli te propose d'autres matchs.`,
    `"Você é muito legal." As quatro palavras mais frias de qualquer idioma. O app te oferece mais matches.`,
    `«Du bist echt nett.» Die vier kältesten Wörter jeder Sprache. Die App bietet dir weitere Matches an.`],

  // ---- Climbing with the friend who is always late ----
  zLate2: [`"Thursday. Seven. I will be there. Probably."`, `« Jeudi. Sept heures. J'y serai. Probablement. »`, `"Quinta. Sete. Vou estar lá. Provavelmente."`, `«Donnerstag. Sieben. Ich bin da. Wahrscheinlich.»`],
  zLate3: [
    `"You topped the yellow one? Without me? I was nearly there. I was on the tram."`,
    `« Tu as sorti la jaune ? Sans moi ? J'y étais presque. J'étais dans le tram. »`,
    `"Você fechou a amarela? Sem mim? Eu estava quase chegando. Estava no bonde."`,
    `«Du hast die Gelbe getoppt? Ohne mich? Ich war fast da. Ich war im Tram.»`],
  gymIdle: [
    `A bouldering hall. It smells of chalk and optimism.`,
    `Une salle de bloc. Ça sent la magnésie et l'optimisme.`,
    `Um ginásio de boulder. Cheira a magnésio e otimismo.`,
    `Eine Boulderhalle. Es riecht nach Magnesia und Optimismus.`],
  gym1: [
    `Your friend said seven. It is twenty to eight. You chalk up alone.`,
    `Ton ami avait dit sept heures. Il est huit heures moins vingt. Tu te magnésies tout seul.`,
    `Seu amigo disse sete. São vinte para as oito. Você passa o magnésio sozinho.`,
    `Dein Freund hat sieben gesagt. Es ist zwanzig vor acht. Du chalkst dich allein ein.`],
  gymHow: [
    `Read the route from the bottom: press the arrow shown on each hold, in order. A wrong arrow and you slip.`,
    `Lis la voie depuis le bas : appuie sur la flèche de chaque prise, dans l'ordre. Une mauvaise flèche et tu glisses.`,
    `Leia a via de baixo para cima: aperte a seta de cada agarra, na ordem. Seta errada e você escorrega.`,
    `Lies die Route von unten: Drück an jedem Griff den gezeigten Pfeil, der Reihe nach. Falscher Pfeil und du rutschst ab.`],
  climbHud: [`Holds {0}/{1} · slips {2}/{3} · {4}s`, `Prises {0}/{1} · glissades {2}/{3} · {4}s`, `Agarras {0}/{1} · escorregões {2}/{3} · {4}s`, `Griffe {0}/{1} · Rutscher {2}/{3} · {4}s`],
  gymFail: [
    `You peel off the wall and land on the mat like a dropped sandwich. Try again.`,
    `Tu te décolles du mur et tu atterris sur le tapis comme un sandwich tombé. Réessaie.`,
    `Você descola da parede e cai no colchão feito um sanduíche derrubado. Tente de novo.`,
    `Du löst dich von der Wand und landest auf der Matte wie ein fallen gelassenes Sandwich. Versuch's nochmal.`],
  gymWin: [
    `You top out just as your friend walks in. "Did I miss anything?" "Everything." "Cool. Beer?"`,
    `Tu sors la voie pile quand ton ami arrive. « J'ai raté quelque chose ? » « Tout. » « Cool. Une bière ? »`,
    `Você chega ao topo bem quando seu amigo entra. "Perdi alguma coisa?" "Tudo." "Legal. Cerveja?"`,
    `Du toppst genau, als dein Freund reinkommt. «Hab ich was verpasst?» «Alles.» «Cool. Bier?»`],
  gymDone: [
    `The yellow route. You own it now. Emotionally.`,
    `La voie jaune. Elle est à toi maintenant. Émotionnellement.`,
    `A via amarela. Agora ela é sua. Emocionalmente.`,
    `Die gelbe Route. Sie gehört jetzt dir. Emotional.`],

  // ---- Commitments: each one pulls the future its way ----
  uni1: [
    `"A doctorate is three good stories and a literature review. Come back when you have the stories."`,
    `« Un doctorat, c'est trois bonnes histoires et une revue de littérature. Revenez quand vous aurez les histoires. »`,
    `"Um doutorado são três boas histórias e uma revisão bibliográfica. Volte quando tiver as histórias."`,
    `«Ein Doktorat besteht aus drei guten Geschichten und einem Literaturüberblick. Kommen Sie wieder, wenn Sie die Geschichten haben.»`],
  uni2: [
    `"So you fixed a logger at minus thirty and flew satellites, and now you want to study ice. Sit down."`,
    `« Donc vous avez réparé un enregistreur par moins trente et piloté des satellites, et maintenant vous voulez étudier la glace. Asseyez-vous. »`,
    `"Então você consertou um registrador a trinta abaixo de zero e pilotou satélites, e agora quer estudar gelo. Sente-se."`,
    `«Sie haben also bei minus dreissig einen Logger repariert und Satelliten geflogen, und jetzt wollen Sie Eis erforschen. Setzen Sie sich.»`],
  uniQ: [`"Why a doctorate, at your age?"`, `« Pourquoi un doctorat, à votre âge ? »`, `"Por que um doutorado, na sua idade?"`, `«Warum ein Doktorat, in Ihrem Alter?»`],
  uniA1: [`"I like not knowing things."`, `« J'aime ne pas savoir. »`, `"Eu gosto de não saber as coisas."`, `«Ich mag es, Dinge nicht zu wissen.»`],
  uniA2: [`"For the salary."`, `« Pour le salaire. »`, `"Pelo salário."`, `«Wegen des Lohns.»`],
  uniA3: [`"I keep fixing things in the cold. I want to know why they break."`, `« Je répare sans arrêt des choses dans le froid. Je veux savoir pourquoi elles cassent. »`, `"Eu vivo consertando coisas no frio. Quero saber por que elas quebram."`, `«Ich repariere ständig Dinge in der Kälte. Ich will wissen, warum sie kaputtgehen.»`],
  uniR1: [`"Good. You will be very happy here."`, `« Bien. Vous serez très heureux ici. »`, `"Ótimo. Você vai ser muito feliz aqui."`, `«Gut. Sie werden hier sehr glücklich sein.»`],
  uniR2: [
    `She laughs for a long time. "Oh, you are funny. You will fit in."`,
    `Elle rit longtemps. « Oh, vous êtes drôle. Vous allez vous plaire ici. »`,
    `Ela ri por um bom tempo. "Ah, você é engraçado. Vai se dar bem aqui."`,
    `Sie lacht lange. «Oh, Sie sind lustig. Sie passen hierher.»`],
  uniR3: [
    `She writes something down. It is the first time a professor has written down something you said.`,
    `Elle note quelque chose. C'est la première fois qu'un professeur note ce que tu dis.`,
    `Ela anota alguma coisa. É a primeira vez que um professor anota algo que você disse.`,
    `Sie schreibt etwas auf. Zum ersten Mal notiert eine Professorin etwas, das du gesagt hast.`],
  uni3: [
    `"Send me two pages by Friday." You have a research proposal to write. You feel twenty-five and terrified. It is wonderful.`,
    `« Envoyez-moi deux pages d'ici vendredi. » Tu as un projet de recherche à écrire. Tu te sens vingt-cinq ans et terrifié. C'est merveilleux.`,
    `"Me mande duas páginas até sexta." Você tem um projeto de pesquisa para escrever. Sente-se com vinte e cinco anos e apavorado. É maravilhoso.`,
    `«Schicken Sie mir bis Freitag zwei Seiten.» Du hast ein Forschungsproposal zu schreiben. Du fühlst dich wie fünfundzwanzig und hast Angst. Es ist wunderbar.`],
  uniDone: [`"Two pages. Friday. I have not forgotten."`, `« Deux pages. Vendredi. Je n'ai pas oublié. »`, `"Duas páginas. Sexta. Eu não esqueci."`, `«Zwei Seiten. Freitag. Ich habe es nicht vergessen.»`],
  zStartup1: [
    `"Cara. Hear me out. Pão de Queijo Zürich GmbH. The Swiss have never tasted happiness. I need CHF 2,000 and someone who can build a website."`,
    `« Cara. Écoute-moi. Pão de Queijo Zürich GmbH. Les Suisses n'ont jamais goûté au bonheur. Il me faut CHF 2 000 et quelqu'un qui sait faire un site web. »`,
    `"Cara. Me escuta. Pão de Queijo Zürich GmbH. Os suíços nunca provaram a felicidade. Preciso de CHF 2.000 e de alguém que saiba fazer um site."`,
    `«Cara. Hör zu. Pão de Queijo Zürich GmbH. Die Schweizer haben noch nie Glück geschmeckt. Ich brauche CHF 2'000 und jemanden, der eine Website bauen kann.»`],
  zStartupQ: [
    `Put CHF 2,000 into the pão de queijo business?`,
    `Mettre CHF 2 000 dans l'affaire de pão de queijo ?`,
    `Colocar CHF 2.000 no negócio de pão de queijo?`,
    `CHF 2'000 ins Pão-de-Queijo-Geschäft stecken?`],
  zStartupBroke: [
    `"No money? Then we are both founders already."`,
    `« Pas d'argent ? Alors on est déjà deux fondateurs. »`,
    `"Sem dinheiro? Então já somos dois fundadores."`,
    `«Kein Geld? Dann sind wir beide schon Gründer.»`],
  zStartup2: [
    `You are now co-founder and CTO of a cheese-bread company. Your first ticket reads "logo???".`,
    `Te voilà cofondateur et CTO d'une entreprise de pains au fromage. Ton premier ticket s'intitule « logo ??? ».`,
    `Agora você é cofundador e CTO de uma empresa de pão de queijo. Seu primeiro ticket diz "logo???".`,
    `Du bist jetzt Mitgründer und CTO einer Käsebrötchen-Firma. Dein erstes Ticket heisst «Logo???».`],
  zStartupDone: [
    `"We sold out at the Saturday market. A lady asked if it is gluten-free. It is! We are going to be rich, or at least fed."`,
    `« On a tout vendu au marché du samedi. Une dame a demandé si c'était sans gluten. Ça l'est ! On va être riches, ou au moins nourris. »`,
    `"Vendemos tudo na feira de sábado. Uma senhora perguntou se é sem glúten. É! A gente vai ficar rico, ou pelo menos alimentado."`,
    `«Am Samstagsmarkt waren wir ausverkauft. Eine Dame hat gefragt, ob es glutenfrei ist. Ist es! Wir werden reich, oder wenigstens satt.»`],
  maMoveQ: [
    `"There is a flat free two streets from us. Small, loud, perfect. Shall I ask about it?"`,
    `« Il y a un appartement libre à deux rues de chez nous. Petit, bruyant, parfait. Je me renseigne ? »`,
    `"Tem um apartamento vago a duas ruas da gente. Pequeno, barulhento, perfeito. Quer que eu pergunte?"`,
    `«Zwei Strassen von uns ist eine Wohnung frei. Klein, laut, perfekt. Soll ich nachfragen?»`],
  maMoveYes: [
    `"I am calling the landlord. The girls are going to scream." The girls scream.`,
    `« J'appelle le propriétaire. Les filles vont hurler. » Les filles hurlent.`,
    `"Vou ligar para o proprietário. As meninas vão gritar." As meninas gritam.`,
    `«Ich rufe den Vermieter an. Die Mädchen werden kreischen.» Die Mädchen kreischen.`],
  brMoveQ: [
    `"Your room is still your room. Are you coming back for good, one of these days?"`,
    `« Ta chambre est toujours ta chambre. Tu reviens pour de bon, un de ces jours ? »`,
    `"Seu quarto continua sendo seu quarto. Você volta de vez, um dia desses?"`,
    `«Dein Zimmer ist immer noch dein Zimmer. Kommst du eines Tages endgültig zurück?»`],
  brMoveYes: [
    `"Soon, mãe. I mean it." She does not answer. She goes to check that the room has clean sheets.`,
    `« Bientôt, mãe. Je suis sérieux. » Elle ne répond pas. Elle va vérifier que la chambre a des draps propres.`,
    `"Logo, mãe. É sério." Ela não responde. Vai conferir se o quarto está com lençol limpo.`,
    `«Bald, mãe. Ich meine es ernst.» Sie antwortet nicht. Sie geht nachsehen, ob das Zimmer frisch bezogen ist.`],
  brMoveNo: [
    `"Not yet, mãe." She nods, and packs more pão de queijo.`,
    `« Pas encore, mãe. » Elle hoche la tête et emballe encore du pão de queijo.`,
    `"Ainda não, mãe." Ela faz que sim com a cabeça e embala mais pão de queijo.`,
    `«Noch nicht, mãe.» Sie nickt und packt noch mehr Pão de Queijo ein.`],

  // ---- The futures: title and two lines each ----
  endT_science: [`FUTURE: THE LAB`, `FUTUR : LE LABO`, `FUTURO: O LABORATÓRIO`, `ZUKUNFT: DAS LABOR`],
  endA_science: [
    `You take the doctorate. The salary is a third of the bank's and the questions are ten times better.`,
    `Tu fais le doctorat. Le salaire est le tiers de celui de la banque et les questions sont dix fois meilleures.`,
    `Você faz o doutorado. O salário é um terço do do banco e as perguntas são dez vezes melhores.`,
    `Du machst das Doktorat. Der Lohn ist ein Drittel dessen bei der Bank und die Fragen sind zehnmal besser.`],
  endB_science: [
    `Four years later you defend a thesis about ice in front of your parents, who understand none of it and cry anyway.`,
    `Quatre ans plus tard, tu soutiens une thèse sur la glace devant tes parents, qui n'y comprennent rien et pleurent quand même.`,
    `Quatro anos depois você defende uma tese sobre gelo na frente dos seus pais, que não entendem nada e choram mesmo assim.`,
    `Vier Jahre später verteidigst du eine Dissertation über Eis vor deinen Eltern, die nichts davon verstehen und trotzdem weinen.`],
  endT_founder: [`FUTURE: THE COMPANY`, `FUTUR : LA BOÎTE`, `FUTURO: A EMPRESA`, `ZUKUNFT: DIE FIRMA`],
  endA_founder: [
    `Pão de Queijo Zürich GmbH opens its third stand. You are CTO, courier, and the one who fixes the oven.`,
    `Pão de Queijo Zürich GmbH ouvre son troisième stand. Tu es CTO, livreur et celui qui répare le four.`,
    `A Pão de Queijo Zürich GmbH abre a terceira barraca. Você é CTO, entregador e quem conserta o forno.`,
    `Die Pão de Queijo Zürich GmbH eröffnet ihren dritten Stand. Du bist CTO, Kurier und der, der den Ofen repariert.`],
  endB_founder: [
    `A Swiss newspaper calls it "surprisingly joyful". Your grandmother demands royalties for the recipe.`,
    `Un journal suisse parle d'une affaire « étonnamment joyeuse ». Ta grand-mère réclame des droits d'auteur pour la recette.`,
    `Um jornal suíço chama de "surpreendentemente alegre". Sua avó exige royalties pela receita.`,
    `Eine Schweizer Zeitung nennt es «überraschend fröhlich». Deine Grossmutter verlangt Tantiemen für das Rezept.`],
  endT_marseille: [`FUTURE: TWO STREETS AWAY`, `FUTUR : À DEUX RUES`, `FUTURO: A DUAS RUAS`, `ZUKUNFT: ZWEI STRASSEN WEITER`],
  endA_marseille: [
    `You move to Marseille. The flat is small and loud, and your nieces let themselves in.`,
    `Tu emménages à Marseille. L'appartement est petit et bruyant, et tes nièces entrent sans frapper.`,
    `Você se muda para Marselha. O apartamento é pequeno e barulhento, e suas sobrinhas entram sem bater.`,
    `Du ziehst nach Marseille. Die Wohnung ist klein und laut, und deine Nichten kommen einfach rein.`],
  endB_marseille: [
    `You work remotely, badly, between school runs. Nobody says "you should live closer" any more. They say "you are late".`,
    `Tu télétravailles, mal, entre deux trajets d'école. Plus personne ne dit « tu devrais habiter plus près ». On dit « tu es en retard ».`,
    `Você trabalha remoto, mal, entre uma ida e outra à escola. Ninguém mais diz "você devia morar mais perto". Dizem "você está atrasado".`,
    `Du arbeitest remote, schlecht, zwischen den Schulwegen. Niemand sagt mehr «du solltest näher wohnen». Sie sagen «du bist zu spät».`],
  endT_brazil: [`FUTURE: HOME`, `FUTUR : À LA MAISON`, `FUTURO: EM CASA`, `ZUKUNFT: DAHEIM`],
  endA_brazil: [
    `You go back. The mango tree has grown. So has the queue for Sunday lunch.`,
    `Tu rentres. Le manguier a grandi. La file pour le déjeuner du dimanche aussi.`,
    `Você volta. A mangueira cresceu. A fila do almoço de domingo também.`,
    `Du gehst zurück. Der Mangobaum ist gewachsen. Die Schlange beim Sonntagsessen auch.`],
  endB_brazil: [
    `You miss the trains for a month. Then your grandmother puts a plate in front of you, and you stop counting what you miss.`,
    `Les trains te manquent pendant un mois. Puis ta grand-mère pose une assiette devant toi, et tu arrêtes de compter ce qui te manque.`,
    `Você sente falta dos trens por um mês. Aí sua avó põe um prato na sua frente, e você para de contar do que sente falta.`,
    `Einen Monat lang fehlen dir die Züge. Dann stellt dir deine Grossmutter einen Teller hin, und du hörst auf zu zählen, was dir fehlt.`],
  endT_zurich: [`FUTURE: THE CITY THAT GREW ON YOU`, `FUTUR : LA VILLE QUI T'A EU`, `FUTURO: A CIDADE QUE TE CONQUISTOU`, `ZUKUNFT: DIE STADT, DIE DICH GEKRIEGT HAT`],
  endA_zurich: [
    `You stay. One day you catch yourself complaining that a train is two minutes late, and you realise you are home.`,
    `Tu restes. Un jour, tu te surprends à râler parce qu'un train a deux minutes de retard, et tu comprends que tu es chez toi.`,
    `Você fica. Um dia se pega reclamando de um trem dois minutos atrasado, e percebe que está em casa.`,
    `Du bleibst. Eines Tages ertappst du dich dabei, dich über zwei Minuten Zugverspätung zu ärgern, und merkst: Du bist zu Hause.`],
  endB_zurich: [
    `The rent is still absurd. The lake is still free. And these days somebody waits by it.`,
    `Le loyer est toujours absurde. Le lac est toujours gratuit. Et désormais, quelqu'un t'y attend.`,
    `O aluguel continua absurdo. O lago continua de graça. E agora tem alguém esperando lá.`,
    `Die Miete ist immer noch absurd. Der See ist immer noch gratis. Und inzwischen wartet dort jemand.`],
  endT_antarctica: [`SECRET FUTURE: SOUTH`, `FUTUR SECRET : LE SUD`, `FUTURO SECRETO: SUL`, `GEHEIME ZUKUNFT: SÜDEN`],
  endA_antarctica: [
    `You sign up for the winter. Fourteen months, twelve people, one washing machine.`,
    `Tu signes pour l'hivernage. Quatorze mois, douze personnes, une machine à laver.`,
    `Você se inscreve para o inverno. Catorze meses, doze pessoas, uma máquina de lavar.`,
    `Du meldest dich für die Überwinterung. Vierzehn Monate, zwölf Leute, eine Waschmaschine.`],
  endB_antarctica: [
    `The penguin from last time recognises you. It is still not impressed.`,
    `Le manchot de la dernière fois te reconnaît. Il n'est toujours pas impressionné.`,
    `O pinguim da outra vez te reconhece. Continua não impressionado.`,
    `Der Pinguin vom letzten Mal erkennt dich wieder. Er ist immer noch nicht beeindruckt.`],
  endT_sky: [`SECRET FUTURE: NEVER LANDED`, `FUTUR SECRET : JAMAIS REDESCENDU`, `FUTURO SECRETO: NUNCA POUSOU`, `GEHEIME ZUKUNFT: NIE GELANDET`],
  endA_sky: [
    `One evening the thermal is too good and you simply keep going. Over the Alps, over the sea.`,
    `Un soir, le thermique est trop bon et tu continues, tout simplement. Par-dessus les Alpes, par-dessus la mer.`,
    `Uma tarde a térmica está boa demais e você simplesmente continua. Por cima dos Alpes, por cima do mar.`,
    `Eines Abends ist die Thermik zu gut und du fliegst einfach weiter. Über die Alpen, über das Meer.`],
  endB_sky: [
    `They say that on clear days you can see a small navy dot above Marseille, waving.`,
    `On dit que par temps clair, on aperçoit au-dessus de Marseille un petit point bleu marine qui fait coucou.`,
    `Dizem que em dia claro dá para ver um pontinho azul-marinho sobre Marselha, acenando.`,
    `Man sagt, an klaren Tagen sehe man über Marseille einen kleinen dunkelblauen Punkt, der winkt.`],
  endT_astronaut: [`SECRET FUTURE: UP`, `FUTUR SECRET : LÀ-HAUT`, `FUTURO SECRETO: LÁ EM CIMA`, `GEHEIME ZUKUNFT: NACH OBEN`],
  endA_astronaut: [
    `The space agency wanted someone who has flown satellites, survived the ice, runs fast and can fix anything with numb fingers. It is a short list.`,
    `L'agence spatiale cherchait quelqu'un qui a piloté des satellites, survécu à la glace, court vite et répare tout avec les doigts gelés. La liste est courte.`,
    `A agência espacial queria alguém que pilotou satélites, sobreviveu ao gelo, corre rápido e conserta qualquer coisa com os dedos dormentes. A lista é curta.`,
    `Die Raumfahrtagentur suchte jemanden, der Satelliten geflogen, das Eis überlebt hat, schnell läuft und mit tauben Fingern alles repariert. Die Liste ist kurz.`],
  endB_astronaut: [
    `From orbit you see Zurich, Marseille and São Paulo within the same hour. For once, everyone you love is on the way.`,
    `Depuis l'orbite, tu vois Zurich, Marseille et São Paulo dans la même heure. Pour une fois, tous ceux que tu aimes sont sur le chemin.`,
    `Da órbita você vê Zurique, Marselha e São Paulo na mesma hora. Pela primeira vez, todo mundo que você ama fica no caminho.`,
    `Aus dem Orbit siehst du Zürich, Marseille und São Paulo innerhalb einer Stunde. Ausnahmsweise liegen alle, die du liebst, auf dem Weg.`],
  endT_time: [`SECRET FUTURE: THE BOX`, `FUTUR SECRET : LE CARTON`, `FUTURO SECRETO: A CAIXA`, `GEHEIME ZUKUNFT: DIE KISTE`],
  endA_time: [
    `The fifth time you look into the empty box, it looks back. It was never a moving box.`,
    `La cinquième fois que tu regardes dans le carton vide, il te regarde aussi. Ça n'a jamais été un carton de déménagement.`,
    `Na quinta vez que você olha para dentro da caixa vazia, ela olha de volta. Nunca foi uma caixa de mudança.`,
    `Als du zum fünften Mal in die leere Kiste schaust, schaut sie zurück. Es war nie eine Umzugskiste.`],
  endB_time: [
    `You climb in. It is 2007. You are seventeen, it is about to rain, and this time you know exactly where the rope is.`,
    `Tu grimpes dedans. On est en 2007. Tu as dix-sept ans, il va pleuvoir, et cette fois tu sais exactement où est la corde.`,
    `Você entra. É 2007. Você tem dezessete anos, vai chover, e desta vez sabe exatamente onde está a corda.`,
    `Du steigst hinein. Es ist 2007. Du bist siebzehn, gleich regnet es, und diesmal weisst du genau, wo das Seil liegt.`],
} satisfies Record<string, Line>;



// Transactions for the bank's sorting game. `bad` means it should be flagged as suspicious.
export const SORT_ITEMS: { bad: boolean; text: Line }[] = [
  { bad: false, text: [`CHF 4.80 · coffee`, `CHF 4.80 · café`, `CHF 4.80 · café`, `CHF 4.80 · Kaffee`] },
  { bad: false, text: [`CHF 1,850 · rent`, `CHF 1 850 · loyer`, `CHF 1.850 · aluguel`, `CHF 1'850 · Miete`] },
  { bad: false, text: [`CHF 89 · train to Marseille`, `CHF 89 · train pour Marseille`, `CHF 89 · trem para Marselha`, `CHF 89 · Zug nach Marseille`] },
  { bad: false, text: [`CHF 12.50 · groceries`, `CHF 12.50 · courses`, `CHF 12.50 · mercado`, `CHF 12.50 · Einkauf`] },
  { bad: false, text: [`CHF 40 · running race, incl. banana`, `CHF 40 · course à pied, banane comprise`, `CHF 40 · corrida, com banana`, `CHF 40 · Volkslauf, inkl. Banane`] },
  { bad: true, text: [`CHF 9,999 · "consulting" · every Tuesday`, `CHF 9 999 · « conseil » · tous les mardis`, `CHF 9.999 · "consultoria" · toda terça`, `CHF 9'999 · «Beratung» · jeden Dienstag`] },
  { bad: true, text: [`CHF 2,000,000 · gift from a prince`, `CHF 2 000 000 · cadeau d'un prince`, `CHF 2.000.000 · presente de um príncipe`, `CHF 2'000'000 · Geschenk eines Prinzen`] },
  { bad: true, text: [`CHF 50,000 · cash · "found it"`, `CHF 50 000 · espèces · « trouvé par terre »`, `CHF 50.000 · dinheiro vivo · "achei"`, `CHF 50'000 · bar · «gefunden»`] },
  { bad: true, text: [`CHF 700,000 · yacht · paid by a bakery`, `CHF 700 000 · yacht · payé par une boulangerie`, `CHF 700.000 · iate · pago por uma padaria`, `CHF 700'000 · Jacht · bezahlt von einer Bäckerei`] },
  { bad: true, text: [`CHF 1 · sent 80,000 times · same account`, `CHF 1 · envoyé 80 000 fois · même compte`, `CHF 1 · enviado 80.000 vezes · mesma conta`, `CHF 1 · 80'000 Mal überwiesen · gleiches Konto`] },
];

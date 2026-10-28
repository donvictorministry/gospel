/* verse.js: 20 popular Bible verses, each in nine languages. Proofread the Hausa, Yoruba, Igbo and Swahili with native speakers. */
var VERSES = [
  {
    "ref": {
      "en": "John 3:16",
      "es": "Juan 3:16",
      "fr": "Jean 3:16",
      "pt": "João 3:16",
      "sw": "Yohana 3:16",
      "de": "Johannes 3:16",
      "ha": "Yohanna 3:16",
      "yo": "Johannu 3:16",
      "ig": "Jọn 3:16"
    },
    "text": {
      "en": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      "es": "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
      "fr": "Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle.",
      "pt": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigénito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      "sw": "Kwa maana jinsi hii Mungu aliupenda ulimwengu, hata akamtoa Mwanawe pekee, ili killa mtu amwaminiye asipotee, bali awe na uzima wa milele.",
      "de": "Denn also hat Gott die Welt geliebt, daß er seinen eingeborenen Sohn gab, auf daß alle, die an ihn glauben, nicht verloren werden, sondern das ewige Leben haben.",
      "ha": "Gama Allah ya yi wa duniya ƙauna ƙwarai, har ya ba da Ɗansa tilo, domin duk wanda ya gaskata da shi kada ya halaka, amma ya sami rai na har abada.",
      "yo": "Nitori Ọlọrun fẹ araiye tobẹ̃ gẹgẹ, ti o fi Ọmọ bibi rẹ̀ kanṣoṣo funni, pe ki ẹnikẹni ti o ba gbà a gbọ́ ma bã segbe, bikoṣe ki o le ni ìye ainipẹkun.",
      "ig": "N’ihi na Chineke hụrụ ụwa n’anya otú a, nke mere o ji nye Ọkpara ọ muru nanị ya, ka onye ọ bụla nke kwere na ya ghara ila n’iyi, kama ka o nwe ndụ ebighi ebi."
    }
  },
  {
    "ref": {
      "en": "Psalm 23:1",
      "es": "Salmos 23:1",
      "fr": "Psaumes 23:1",
      "pt": "Salmos 23:1",
      "sw": "Zaburi 23:1",
      "de": "Psalm 23:1",
      "ha": "Zabura 23:1",
      "yo": "Orin Dafidi 23:1",
      "ig": "Abụ Ọma 23:1"
    },
    "text": {
      "en": "The LORD is my shepherd; I shall not want.",
      "es": "Jehová es mi pastor; nada me faltará.",
      "fr": "L’Éternel est mon berger: je ne manquerai de rien.",
      "pt": "O Senhor é o meu pastor, nada me faltará.",
      "sw": "Bwana ndiye mchungaji wangu, sitapungukiwa na kitu.",
      "de": "Der HERR ist mein Hirte, mir wird nichts mangeln.",
      "ha": "Ubangiji shi ne makiyayina, ba zan rasa kome ba.",
      "yo": "OLUWA ni oluṣọ-agutan mi; emi kì yio ṣe alaini.",
      "ig": "Jehova bụ onye ọzụzụ atụrụ m; agaghị m-ada ụkọ ihe ọ bụla."
    }
  },
  {
    "ref": {
      "en": "Philippians 4:13",
      "es": "Filipenses 4:13",
      "fr": "Philippiens 4:13",
      "pt": "Filipenses 4:13",
      "sw": "Wafilipi 4:13",
      "de": "Philipper 4:13",
      "ha": "Filibiyawa 4:13",
      "yo": "Filippi 4:13",
      "ig": "Filipaị 4:13"
    },
    "text": {
      "en": "I can do all things through Christ which strengtheneth me.",
      "es": "Todo lo puedo en Cristo que me fortalece.",
      "fr": "Je puis tout par celui qui me fortifie.",
      "pt": "Posso todas as coisas naquele que me fortalece.",
      "sw": "Naweza kufanya mambo yote katika yeye anitiaye nguvu.",
      "de": "Ich vermag alles durch den, der mich mächtig macht, Christus.",
      "ha": "Zan iya yin kome ta wurin Almasihu wanda yake ƙarfafa ni.",
      "yo": "Emi le ṣe ohun gbogbo nipasẹ Kristi ti nmu mi lagbara.",
      "ig": "Enwere m ike ime ihe niile site na Kristi nke na-eme ka m sie ike."
    }
  },
  {
    "ref": {
      "en": "Jeremiah 29:11",
      "es": "Jeremías 29:11",
      "fr": "Jérémie 29:11",
      "pt": "Jeremias 29:11",
      "sw": "Yeremia 29:11",
      "de": "Jeremia 29:11",
      "ha": "Irmiya 29:11",
      "yo": "Jeremiah 29:11",
      "ig": "Jeremaya 29:11"
    },
    "text": {
      "en": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      "es": "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
      "fr": "Car je connais les projets que j’ai formés sur vous, dit l’Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l’espérance.",
      "pt": "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
      "sw": "Maana nayajua mawazo ninayowawazia ninyi, asema BWANA, ni mawazo ya amani, wala si ya mabaya; ili kuwapa ninyi tumaini siku zenu za mwisho.",
      "de": "Denn ich weiß wohl, was ich für Gedanken über euch habe, spricht der HERR: Gedanken des Friedens und nicht des Leides, daß ich euch gebe das Ende, des ihr wartet.",
      "ha": "Gama na san shirye-shiryen da nake yi dominku, in ji Ubangiji, shirye-shiryen salama ne, ba na sharri ba, don in ba ku zuwa mai kyau da bege.",
      "yo": "Nitori emi mọ èro ti mo rò si nyin, li Oluwa wi, èro alafia, kì iṣe ti ibi, lati fun nyin ni ireti ikẹhin.",
      "ig": "N’ihi na amawom echiche nke m na-eche gi, ka Jehova kwuru, echiche nke udo, ọ bụghị nke ihe ọjọọ, inye unu ọgwụgwụ nke unu na-atụ anya ya."
    }
  },
  {
    "ref": {
      "en": "Proverbs 3:5",
      "es": "Proverbios 3:5",
      "fr": "Proverbes 3:5",
      "pt": "Provérbios 3:5",
      "sw": "Mithali 3:5",
      "de": "Sprüche 3:5",
      "ha": "Misalai 3:5",
      "yo": "Owe 3:5",
      "ig": "Ilu 3:5"
    },
    "text": {
      "en": "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
      "es": "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
      "fr": "Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse.",
      "pt": "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
      "sw": "Mtumaini BWANA kwa moyo wako wote, wala usizitegemee akili zako mwenyewe.",
      "de": "Verlaß dich auf den HERRN von ganzem Herzen, und verlaß dich nicht auf deinen Verstand.",
      "ha": "Ka dogara ga Ubangiji da dukan zuciyarka, kada ka dogara ga ganewarka.",
      "yo": "Fi gbogbo àiya rẹ gbẹkẹle Oluwa; má si ṣe gbẹkẹle oye ara rẹ.",
      "ig": "Tụkwasị Jehova obi gị nile, adaberekwala n’ọmụma nke gị."
    }
  },
  {
    "ref": {
      "en": "Romans 8:28",
      "es": "Romanos 8:28",
      "fr": "Romains 8:28",
      "pt": "Romanos 8:28",
      "sw": "Warumi 8:28",
      "de": "Römer 8:28",
      "ha": "Romawa 8:28",
      "yo": "Romu 8:28",
      "ig": "Ndị Rom 8:28"
    },
    "text": {
      "en": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      "es": "Y sabemos que á los que á Dios aman, todas las cosas les ayudan á bien, es á saber, á los que conforme al propósito son llamados.",
      "fr": "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      "pt": "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
      "sw": "Nasi tunajua ya kuwa katika mambo yote Mungu hufanya kazi pamoja na wale wampendao, katika kuwapatia mema, yaani, wale walioitwa kwa kusudi lake.",
      "de": "Wir wissen aber, daß denen, die Gott lieben, alle Dinge zum Besten dienen, denen, die nach dem Vorsatz berufen sind.",
      "ha": "Mun kuma sani cewa, a cikin kowane abu Allah yana aiki domin amfanin waɗanda suke ƙaunarsa, waɗanda aka kira bisa ga nufinsa.",
      "yo": "Awa si mọ pe ohun gbogbo nṣiṣẹ pọ̀ si rere fun awọn ti o fẹ Ọlọrun, fun awọn ti a pè gẹgẹ bi ipinnu rẹ̀.",
      "ig": "Ma ọ bụ na anyị matara na ihe niile na-arụkọ ọrụ ọnụ maka ezi ihe nye ndị hụrụ Chineke n’anya, ndị akpọrọ dịka nzube ya si dị."
    }
  },
  {
    "ref": {
      "en": "Isaiah 41:10",
      "es": "Isaías 41:10",
      "fr": "Ésaïe 41:10",
      "pt": "Isaías 41:10",
      "sw": "Isaya 41:10",
      "de": "Jesaja 41:10",
      "ha": "Ishaya 41:10",
      "yo": "Isaiah 41:10",
      "ig": "Aịsaya 41:10"
    },
    "text": {
      "en": "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.",
      "es": "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré.",
      "fr": "Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu; je te fortifie, je viens à ton secours.",
      "pt": "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo.",
      "sw": "Usiogope, kwa maana mimi nipo pamoja nawe; usifadhaike, kwa maana mimi ni Mungu wako; nitakutia nguvu, naam, nitakusaidia.",
      "de": "Fürchte dich nicht, ich bin mit dir; weiche nicht, denn ich bin dein Gott; ich stärke dich, ich helfe dir auch.",
      "ha": "Kada ka ji tsoro, gama ina tare da kai; kada ka damu, gama ni ne Allahnka. Zan ƙarfafa ka, zan taimake ka.",
      "yo": "Má bẹ̀ru; nitori mo wà pẹlu rẹ: má fòya; nitori emi ni Ọlọrun rẹ: emi o fun ọ ni agbara; nitõtọ, emi o ràn ọ lọwọ.",
      "ig": "Atụla egwu, n’ihi na m nọnyeere gị; ewela ụjọ, n’ihi na m bụ Chineke gị: M ga-eme gị ka i sie ike; e, m ga-enyere gị aka."
    }
  },
  {
    "ref": {
      "en": "Matthew 11:28",
      "es": "Mateo 11:28",
      "fr": "Matthieu 11:28",
      "pt": "Mateus 11:28",
      "sw": "Mathayo 11:28",
      "de": "Matthäus 11:28",
      "ha": "Matiyu 11:28",
      "yo": "Matteu 11:28",
      "ig": "Matiu 11:28"
    },
    "text": {
      "en": "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      "es": "Venid á mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
      "fr": "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      "pt": "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
      "sw": "Njoni kwangu, ninyi nyote msumbukao na wenye kulemewa na mizigo, nami nitawapumzisha.",
      "de": "Kommet her zu mir alle, die ihr mühselig und beladen seid; ich will euch erquicken.",
      "ha": "Ku zo wurina, dukanku masu wahala da masu nauyin kaya, ni kuwa zan ba ku hutawa.",
      "yo": "Ẹ wá sọdọ mi, gbogbo ẹnyin ti nṣe lãla, ti a si di ẹrù wuwo le lori, emi o si fun nyin ni isimi.",
      "ig": "Bịakwutenụ m, unu niile ndị na-adọgbu onwe unu n’ọrụ, ndị a kwasịkwara ibu arọ, m ga-emekwa ka unu zuru ike."
    }
  },
  {
    "ref": {
      "en": "Psalm 46:1",
      "es": "Salmos 46:1",
      "fr": "Psaumes 46:2",
      "pt": "Salmos 46:1",
      "sw": "Zaburi 46:1",
      "de": "Psalm 46:2",
      "ha": "Zabura 46:1",
      "yo": "Orin Dafidi 46:1",
      "ig": "Abụ Ọma 46:1"
    },
    "text": {
      "en": "God is our refuge and strength, a very present help in trouble.",
      "es": "Dios es nuestro amparo y fortaleza, pronto auxilio en las tribulaciones.",
      "fr": "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.",
      "pt": "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
      "sw": "Mungu ndiye kimbilio letu na nguvu zetu, msaada utakaopatikana tele wakati wa mateso.",
      "de": "Gott ist unsre Zuversicht und Stärke, eine Hilfe in den großen Nöten, die uns getroffen haben.",
      "ha": "Allah ne mafakarmu da ƙarfinmu, mataimaki ne wanda a kullum yake kusa cikin wahala.",
      "yo": "Ọlọrun ni àbo ati agbara wa, ìrànlọwọ lọwọlọwọ ni igba ipọnju.",
      "ig": "Chineke bụ ebe mgbaba anyị na ike anyị, onye inyeaka dị nso n’oge nsogbu."
    }
  },
  {
    "ref": {
      "en": "Joshua 1:9",
      "es": "Josué 1:9",
      "fr": "Josué 1:9",
      "pt": "Josué 1:9",
      "sw": "Yoshua 1:9",
      "de": "Josua 1:9",
      "ha": "Joshuwa 1:9",
      "yo": "Joṣua 1:9",
      "ig": "Joshua 1:9"
    },
    "text": {
      "en": "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      "es": "Esfuérzate y sé valiente; no pavorezcas ni desmayes, porque Jehová tu Dios será contigo en donde quiera que fueres.",
      "fr": "Fortifie-toi et prends courage. Ne t’effraie point et ne t’épouvante point, car l’Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
      "pt": "Esforça-te, e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor teu Deus é contigo, por onde quer que andares.",
      "sw": "Uwe hodari na moyo wa ujasiri; usitishike, wala usifadhaike; kwa kuwa BWANA, Mungu wako, yu pamoja nawe kila uendako.",
      "de": "Sei getrost und unverzagt. Laß dir nicht grauen und entsetze dich nicht; denn der HERR, dein Gott, ist mit dir in allem, was du tun wirst.",
      "ha": "Ka ƙarfafa, ka yi ƙarfin hali. Kada ka ji tsoro, kada ka karaya, gama Ubangiji Allahnka yana tare da kai duk inda ka tafi.",
      "yo": "Mura giri ki o si ṣe ọkàn rere; má foya, bẹ̃ni ki o má si fòya: nitori Oluwa Ọlọrun rẹ wà pẹlu rẹ nibikibi ti iwọ ba nlọ.",
      "ig": "Eme ike, nwekwa obi ike; atụla egwu, ujọ egbula gị: n’ihi na Jehova bụ Chineke gị nọnyeere gị ebe ọ bụla i na-aga."
    }
  },
  {
    "ref": {
      "en": "Romans 5:8",
      "es": "Romanos 5:8",
      "fr": "Romains 5:8",
      "pt": "Romanos 5:8",
      "sw": "Warumi 5:8",
      "de": "Römer 5:8",
      "ha": "Romawa 5:8",
      "yo": "Romu 5:8",
      "ig": "Ndị Rom 5:8"
    },
    "text": {
      "en": "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
      "es": "Mas Dios encarece su caridad para con nosotros, porque siendo aún pecadores, Cristo murió por nosotros.",
      "fr": "Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.",
      "pt": "Mas Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores.",
      "sw": "Lakini Mungu aonyesha pendo lake yeye mwenyewe kwetu sisi, kwa kuwa, tulipokuwa tungali wenye dhambi, Kristo alikufa kwa ajili yetu.",
      "de": "Darum preist Gott seine Liebe gegen uns, daß Christus für uns gestorben ist, da wir noch Sünder waren.",
      "ha": "Amma Allah ya nuna ƙaunarsa gare mu, gama tun muna masu zunubi, Almasihu ya mutu dominmu.",
      "yo": "Ṣugbọn Ọlọrun fi ifẹ On si wa han, nitori nigbati awa jẹ ẹlẹṣẹ, Kristi ku fun wa.",
      "ig": "Ma Chineke na-egosi ịhụnanya ya n’ebe anyị nọ, n’ihi na mgbe anyị ka bụ ndị mmehie, Kraịst nwụrụ maka anyị."
    }
  },
  {
    "ref": {
      "en": "Matthew 6:33",
      "es": "Mateo 6:33",
      "fr": "Matthieu 6:33",
      "pt": "Mateus 6:33",
      "sw": "Mathayo 6:33",
      "de": "Matthäus 6:33",
      "ha": "Matiyu 6:33",
      "yo": "Matteu 6:33",
      "ig": "Matiu 6:33"
    },
    "text": {
      "en": "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      "es": "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
      "fr": "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.",
      "pt": "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
      "sw": "Bali utafuteni kwanza ufalme wake, na haki yake; na hayo yote mtazidishiwa.",
      "de": "Trachtet am ersten nach dem Reich Gottes und nach seiner Gerechtigkeit, so wird euch solches alles zufallen.",
      "ha": "Amma ku fara neman mulkin Allah da adalcinsa, za a kuma ƙara muku dukan waɗannan abubuwa.",
      "yo": "Ṣugbọn ẹ tète kọ́ wá ijọba Ọlọrun, ati ododo rẹ̀; a o si fi gbogbo nkan wọnyi kún u fun nyin.",
      "ig": "Ma buru ụzọ chọọ ọchịchị Chineke na ezi omume ya, a ga-atụkwasịkwa unu ihe ndị a niile."
    }
  },
  {
    "ref": {
      "en": "Isaiah 40:31",
      "es": "Isaías 40:31",
      "fr": "Ésaïe 40:31",
      "pt": "Isaías 40:31",
      "sw": "Isaya 40:31",
      "de": "Jesaja 40:31",
      "ha": "Ishaya 40:31",
      "yo": "Isaiah 40:31",
      "ig": "Aịsaya 40:31"
    },
    "text": {
      "en": "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      "es": "Mas los que esperan á Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
      "fr": "Mais ceux qui se confient en l’Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point, ils marchent, et ne se fatiguent point.",
      "pt": "Mas os que esperam no Senhor renovarão as suas forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
      "sw": "Bali wao wamngojeao BWANA watapata nguvu mpya; watapanda juu kwa mbawa kama tai; watapiga mbio, wala hawatachoka; watakwenda kwa miguu, wala hawatalegea.",
      "de": "Aber die auf den HERRN harren, kriegen neue Kraft, daß sie auffahren mit Flügeln wie Adler, daß sie laufen und nicht matt werden, daß sie wandeln und nicht müde werden.",
      "ha": "Amma waɗanda suke dogara ga Ubangiji za su sabunta ƙarfinsu. Za su tashi sama da fikafikai kamar gaggafa, za su yi gudu ba za su gaji ba, za su yi tafiya ba za su suma ba.",
      "yo": "Ṣugbọn awọn ti o duro de Oluwa yio tun agbara wọn ṣe; nwọn o fi iyẹ gùn soke bi idì; nwọn o sare, agara kì yio si da wọn; nwọn o rin, kì yio si rẹ̀ wọn.",
      "ig": "Ma ndị na-echere Jehova ga-enweta ume ọhụrụ; ha ga-esi na nku efeli elu dị ka ugo; ha ga-agba ọsọ, ike agwụghịkwa ha; ha ga-eje ije, ha agaghị ada mba."
    }
  },
  {
    "ref": {
      "en": "Psalm 119:105",
      "es": "Salmos 119:105",
      "fr": "Psaumes 119:105",
      "pt": "Salmos 119:105",
      "sw": "Zaburi 119:105",
      "de": "Psalm 119:105",
      "ha": "Zabura 119:105",
      "yo": "Orin Dafidi 119:105",
      "ig": "Abụ Ọma 119:105"
    },
    "text": {
      "en": "Thy word is a lamp unto my feet, and a light unto my path.",
      "es": "Lámpara es á mis pies tu palabra, y lumbrera á mi camino.",
      "fr": "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.",
      "pt": "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.",
      "sw": "Neno lako ni taa ya miguu yangu, na mwanga wa njia yangu.",
      "de": "Dein Wort ist meines Fußes Leuchte und ein Licht auf meinem Wege.",
      "ha": "Maganarka fitila ce ga ƙafafuna, haske ne ga hanyata.",
      "yo": "Ọrọ rẹ ni fitila fun ẹsẹ mi, ati imọlẹ si ipa mi.",
      "ig": "Okwu gị bụ oriọna nye ụkwụ m, na ìhè nye ụzọ m."
    }
  },
  {
    "ref": {
      "en": "Romans 10:9",
      "es": "Romanos 10:9",
      "fr": "Romains 10:9",
      "pt": "Romanos 10:9",
      "sw": "Warumi 10:9",
      "de": "Römer 10:9",
      "ha": "Romawa 10:9",
      "yo": "Romu 10:9",
      "ig": "Ndị Rom 10:9"
    },
    "text": {
      "en": "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
      "es": "Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.",
      "fr": "Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l’a ressuscité des morts, tu seras sauvé.",
      "pt": "Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo.",
      "sw": "Ya kwamba ukimkiri Yesu kwa kinywa chako kuwa Bwana, na kuamini moyoni mwako ya kuwa Mungu alimfufua katika wafu, utaokoka.",
      "de": "Denn so du mit deinem Munde bekennst Jesum, daß er der HERR sei, und glaubst in deinem Herzen, daß ihn Gott von den Toten auferweckt hat, so wirst du selig.",
      "ha": "In ka yi shaida da bakinka cewa Yesu Ubangiji ne, ka kuma gaskata a zuciyarka cewa Allah ya tashe shi daga matattu, za a cece ka.",
      "yo": "Pe bi iwọ ba fi ẹnu rẹ jẹwọ Jesu li Oluwa, ti iwọ ba si gbagbọ li ọkàn rẹ pe, Ọlọrun ti gbé e dide kuro ninu oku, a o gbà ọ là.",
      "ig": "Na ọ bụrụ na i ji ọnụ gị kwupụta Jisọs dị ka Onyenwe anyị, kwerekwa n’obi gị na Chineke mere ka ọ si n’ọnwụ bilie, a ga-azọpụta gị."
    }
  },
  {
    "ref": {
      "en": "John 14:6",
      "es": "Juan 14:6",
      "fr": "Jean 14:6",
      "pt": "João 14:6",
      "sw": "Yohana 14:6",
      "de": "Johannes 14:6",
      "ha": "Yohanna 14:6",
      "yo": "Johannu 14:6",
      "ig": "Jọn 14:6"
    },
    "text": {
      "en": "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      "es": "Dícele Jesús: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
      "fr": "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
      "pt": "Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai, senão por mim.",
      "sw": "Yesu akamwambia, Mimi ndimi njia, na kweli, na uzima; mtu haji kwa Baba, ila kwa njia yangu.",
      "de": "Jesus spricht zu ihm: Ich bin der Weg und die Wahrheit und das Leben; niemand kommt zum Vater denn durch mich.",
      "ha": "Yesu ya ce masa, Ni ne hanya, ni ne gaskiya, ni ne rai. Ba mai zuwa wurin Uba sai ta wurina.",
      "yo": "Jesu wi fun u pe, Emi ni ọna, ati otitọ, ati iye: kò si ẹniti o le tọ Baba wá, bikoṣe nipasẹ mi.",
      "ig": "Jisọs sịrị ya, Abụ m ụzọ, na eziokwu, na ndụ: ọ dịghị onye na-abịakwute Nna, ma ọ bụghị site na m."
    }
  },
  {
    "ref": {
      "en": "Ephesians 2:8",
      "es": "Efesios 2:8",
      "fr": "Éphésiens 2:8",
      "pt": "Efésios 2:8",
      "sw": "Waefeso 2:8",
      "de": "Epheser 2:8",
      "ha": "Afisawa 2:8",
      "yo": "Efesu 2:8",
      "ig": "Ndị Efesọs 2:8"
    },
    "text": {
      "en": "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.",
      "es": "Porque por gracia sois salvos por la fe; y esto no de vosotros, pues es don de Dios.",
      "fr": "Car c’est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c’est le don de Dieu.",
      "pt": "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
      "sw": "Maana mmeokolewa kwa neema, kwa njia ya imani; wala hiyo haikutokana na nafsi zenu; ni kipawa cha Mungu.",
      "de": "Denn aus Gnade seid ihr selig geworden durch den Glauben, und dasselbe nicht aus euch: Gottes Gabe ist es.",
      "ha": "Gama ta wurin alheri ne aka cece ku, ta wurin bangaskiya. Wannan kuwa ba daga gare ku ba ne, baiwar Allah ce.",
      "yo": "Nitori nipa oore-ọfẹ li a ti gbà nyin là nipa igbagbọ́; eyini kì si iṣe ti ara nyin: ẹ̀bun Ọlọrun ni.",
      "ig": "N’ihi na ọ bụ site n’amara ka e si zọpụta unu, site na okwukwe; nke a abụghịkwa nke unu, ọ bụ onyinye Chineke."
    }
  },
  {
    "ref": {
      "en": "2 Timothy 1:7",
      "es": "2 Timoteo 1:7",
      "fr": "2 Timothée 1:7",
      "pt": "2 Timóteo 1:7",
      "sw": "2 Timotheo 1:7",
      "de": "2 Timotheus 1:7",
      "ha": "2 Timoti 1:7",
      "yo": "2 Timoteu 1:7",
      "ig": "2 Timoti 1:7"
    },
    "text": {
      "en": "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
      "es": "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, y de amor, y de dominio propio.",
      "fr": "Car ce n’est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d’amour et de sagesse.",
      "pt": "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
      "sw": "Maana Mungu hakutupa roho ya woga; bali ya nguvu na ya upendo na ya moyo wa kuzingatia.",
      "de": "Denn Gott hat uns nicht gegeben den Geist der Furcht, sondern der Kraft und der Liebe und der Besonnenheit.",
      "ha": "Gama Allah bai ba mu ruhun tsoro ba, sai dai na iko, da ƙauna, da kuma kamewa.",
      "yo": "Nitori Ọlọrun kò fun wa li ẹmi ibẹ̀ru; bikoṣe ti agbara, ati ti ifẹ, ati ti ọkàn aiyà.",
      "ig": "N’ihi na Chineke enyeghị anyị mmụọ egwu; kama nke ike, na nke ịhụnanya, na nke uche ọcha."
    }
  },
  {
    "ref": {
      "en": "Psalm 27:1",
      "es": "Salmos 27:1",
      "fr": "Psaumes 27:1",
      "pt": "Salmos 27:1",
      "sw": "Zaburi 27:1",
      "de": "Psalm 27:1",
      "ha": "Zabura 27:1",
      "yo": "Orin Dafidi 27:1",
      "ig": "Abụ Ọma 27:1"
    },
    "text": {
      "en": "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
      "es": "Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
      "fr": "L’Éternel est ma lumière et mon salut: de qui aurais-je crainte? L’Éternel est le soutien de ma vie: de qui aurais-je peur?",
      "pt": "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
      "sw": "BWANA ni nuru yangu na wokovu wangu; nimwogope nani? BWANA ni ngome ya uzima wangu; nimhofu nani?",
      "de": "Der HERR ist mein Licht und mein Heil; vor wem sollte ich mich fürchten? Der HERR ist meines Lebens Kraft; vor wem sollte mir grauen?",
      "ha": "Ubangiji shi ne haskena da cetona; wa zan ji tsoro? Ubangiji shi ne ƙarfin raina; wa zai tsorata ni?",
      "yo": "Oluwa ni imọlẹ ati igbala mi; tali emi o bẹ̀ru? Oluwa ni odi agbara ẹmi mi; aiya tali yio fò mi?",
      "ig": "Jehova bụ ìhè m na nzọpụta m; onye ka m ga-atụ egwu? Jehova bụ ike nke ndụ m; onye ka m ga-atụ ụjọ ya?"
    }
  },
  {
    "ref": {
      "en": "Hebrews 11:1",
      "es": "Hebreos 11:1",
      "fr": "Hébreux 11:1",
      "pt": "Hebreus 11:1",
      "sw": "Waebrania 11:1",
      "de": "Hebräer 11:1",
      "ha": "Ibraniyawa 11:1",
      "yo": "Heberu 11:1",
      "ig": "Ndị Hibru 11:1"
    },
    "text": {
      "en": "Now faith is the substance of things hoped for, the evidence of things not seen.",
      "es": "Es pues la fe la sustancia de las cosas que se esperan, la demostración de las cosas que no se ven.",
      "fr": "Or la foi est une ferme assurance des choses qu’on espère, une démonstration de celles qu’on ne voit pas.",
      "pt": "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.",
      "sw": "Basi imani ni kuwa na hakika ya mambo yatarajiwayo, ni bayana ya mambo yasiyoonekana.",
      "de": "Es ist aber der Glaube eine gewisse Zuversicht des, das man hoffet, und nicht zweifeln an dem, das man nicht siehet.",
      "ha": "Bangaskiya ita ce tabbatar da abubuwan da muke bege, da kuma tabbacin abubuwan da ba a gani.",
      "yo": "Njẹ igbagbọ́ ni ọ̀rọ ohun ti a nrepo, ìri ohun ti a kò ri.",
      "ig": "Ma okwukwe bụ ịdị nnọọ n’ezi ihe a na-atụ anya ya, bụ ihe e gosiri na ihe a na-ahụghị anya."
    }
  }
];

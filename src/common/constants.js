import State from './State';

export const DEBUG = false;

export const AttachmentAction = {
  Discard: 'discard',
  ToHand: 'toHand'
}


export const TYPES = {
  Character: 'character',
  Location: 'location',
  Attachment: 'attachment',
  Plot: 'plot',
  Event: 'event'
}

export const FROMARRAY = {
  Deck: 'deck',
  Hand: 'hand',
  Chars: 'chars',
  Places: 'places',
  Discarded: 'discardedList',
  Deads: 'deadList'
}

export const Decks = {

    //Stark/Greyjoy
    StaGre: {
        cards: [
            "01_141",
            "01_142",
            "01_143",
            "01_144",
            "01_145",
            "01_146",
            "01_147",
            "01_148",
            "01_149",
            "01_150",
            "01_151",
            "01_152",
            "01_153",
            "01_154",
            "01_155",
            "01_156",
            // "01_156",
            "01_157",
            "01_158",
            "01_159",
            "01_65",
            "01_66",
            "01_67",
            "01_68",
            "01_69",
            "01_70",
            "01_71",
            "01_72",
            "01_73",
            "01_74",
            "01_75",
            "01_76",
            "01_77",
            "01_78",
            "01_79",
            "01_80",
            // "01_80",
            "01_81",
            "01_82",
            "01_83",
            "01_39",
            "01_40",
            "01_32",
            "01_28",
            "01_30",
            "01_29",
            "01_35"
        ],
        // trame
        plots: [
            "01_8",
            "01_9",
            "01_16",
            "01_26",
            // "01_17",
            // "01_19",
            "01_22",
            "01_23",
            "01_25"
        ]
    },




    // baratheon/night watch
    BarNig: {
        cards: [
            "01_46",
            "01_47",
            "01_48",
            "01_49",
            "01_50",
            "01_51",
            "01_52",
            "01_53",
            "01_54",
            "01_55",
            "01_56",
            "01_57",
            "01_58",
            // "01_59",
            "01_59",
            "01_60",
            "01_61",
            "01_62",
            "01_63",
            "01_64",
            "01_122",
            "01_123",
            "01_124",
            "01_125",
            "01_126",
            "01_127",
            "01_128",
            "01_129",
            "01_130",
            "01_131",
            "01_132",
            "01_133",
            "01_134",
            "01_135",
            "01_136",
            "01_137",
            "01_138",
            "01_139",
            "01_140",
            "01_39",
            "01_40",
            "01_30",
            "01_42",
            "01_31",
            "01_38",
            "01_37",
            "01_43"
        ],
        // trame
        plots: [
            "01_6",
            "01_11",
            "01_12",
            "01_14",
            "01_15",
            "01_16",
            "01_26"
        ]
    },




    // targaryen - martell
    TarMar: {
        cards: [
            "01_160",
            "01_161",
            "01_162",
            "01_163",
            "01_164",
            "01_165",
            "01_166",
            "01_167",
            "01_168",
            "01_169",
            "01_170",
            "01_171",
            "01_172",
            "01_173",
            "01_174",
            // "01_175",
            "01_175",
            "01_176",
            "01_177",
            "01_178",
            "01_103",
            "01_104",
            "01_105",
            "01_106",
            "01_107",
            "01_108",
            "01_109",
            "01_110",
            "01_111",
            "01_112",
            "01_113",
            "01_114",
            "01_115",
            "01_116",
            "01_117",
            "01_118",
            // "01_118",
            "01_119",
            "01_120",
            "01_121",
            "01_39",
            "01_40",
            "01_42",
            "01_31",
            "01_35",
            "01_36",
            "01_41",
            "01_29"
        ],
        // trame
        plots: [
            // 1,
            "01_16",
            "01_2",
            "01_4",
            "01_5",
            "01_10",
            // 18,
            "01_26",
            "01_22"
        ]
    },





    // lannister - tyrell
    LanTyr: {
        cards: !DEBUG ? [
            "01_84",
            "01_85",
            "01_86",
            "01_87",
            "01_88",
            "01_89",
            "01_90",
            "01_91",
            "01_92",
            "01_93",
            "01_94",
            "01_95",
            "01_96",
            "01_97",
            "01_98",
            "01_99",
            // "01_99",
            "01_100",
            "01_101",
            "01_102",
            "01_179",
            "01_180",
            "01_181",
            "01_182",
            "01_183",
            "01_184",
            "01_185",
            "01_186",
            "01_187",
            "01_188",
            "01_189",
            "01_190",
            "01_191",
            "01_192",
            "01_193",
            "01_194",
            // "01_194",
            "01_195",
            "01_196",
            "01_197",
            "01_39",
            "01_40",
            "01_45",
            "01_33",
            "01_43",
            "01_34",
            "01_44",
            "01_28"
        ] : [
            "01_95",
            "01_96",//
            "01_97",
            "01_98",
            "01_99",
            "01_182",
            "01_183",
            "01_184",
            "01_185",
            "01_186",
            "01_187",
            "01_188",
            "01_189",
            "01_190",
            "01_191",//
            "01_33",//
            "01_34",//
        ],
        plots: [
            // trame
            "01_3",
            "01_7",
            "01_13",
            "01_20",
            "01_21",
            "01_24",
            "01_26"
        ]
    }
}


export const debugState=new State([197, 182, 183, 184], Decks.LanTyr.cards, [179, 180], [91, 98], Decks.LanTyr.plots,
  [2, 3], [{ charId: '91', attachments: ['33', '191'] },
  { charId: '84', attachments: [] },
  { charId: '187', attachments: [] },
  { charId: '188', attachments: [] },
  { charId: '94', attachments: [] },
  { charId: '95', attachments: [] }], [97, 98], 0, 0, FROMARRAY.Discarded, 'LanTyr', null, null, null
);


export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
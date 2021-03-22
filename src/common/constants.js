import State from './State';

export const DEBUG = true;

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
        cards: [141,
            142,
            143,
            144,
            145,
            146,
            147,
            148,
            149,
            150,
            151,
            152,
            153,
            154,
            155,
            156,
            156,
            157,
            158,
            159,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            80,
            81,
            82,
            83,
            39,
            40,
            32,
            28,
            30,
            29,
            35],
        // trame
        plots: [8,
            9,
            17,
            19,
            22,
            23,
            25
        ]
    },




    // baratheon/night watch
    BarNig: {
        cards: [
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            59,
            60,
            61,
            62,
            63,
            64,
            122,
            123,
            124,
            125,
            126,
            127,
            128,
            129,
            130,
            131,
            132,
            133,
            134,
            135,
            136,
            137,
            138,
            139,
            140,
            39,
            40,
            30,
            42,
            31,
            38,
            37,
            43
        ],
        // trame
        plots: [
            6,
            11,
            12,
            14,
            15,
            16,
            26
        ]
    },




    // targaryen - martell
    TarMar: {
        cards: [
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            174,
            175,
            175,
            176,
            177,
            178,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            118,
            119,
            120,
            121,
            39,
            40,
            42,
            31,
            35,
            36,
            41,
            29
        ],
        // trame
        plots: [
            // 1,
            16,
            2,
            4,
            5,
            10,
            // 18,
            26,
            22
        ]
    },





    // lannister - tyrell
    LanTyr: {
        cards: !DEBUG ? [
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            99,
            100,
            101,
            102,
            179,
            180,
            181,
            182,
            183,
            184,
            185,
            186,
            187,
            188,
            189,
            190,
            191,
            192,
            193,
            194,
            194,
            195,
            196,
            197,
            39,
            40,
            45,
            33,
            43,
            34,
            44,
            28
        ] : [
            95,
            96,//
            97,
            98,
            99,
            182,
            183,
            184,
            185,
            186,
            187,
            188,
            189,
            190,
            191,//
            33,//
            34,//
        ],
        plots: [
            // trame
            3,
            7,
            13,
            20,
            21,
            24,
            26
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
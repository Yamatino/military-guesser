const db = [
  {
    id: 1,
    name: "M1A2 Abrams",
    category: "Land",
    year: 1992,
    country: "United States",
    difficulty: "easy",
    image: "m1a2_abrams.jpg",
    aliases: ["M1 Abrams", "Abrams tank", "M1A1 Abrams"]
  },
  {
    id: 2,
    name: "F-22 Raptor",
    category: "Air",
    year: 2005,
    country: "United States",
    difficulty: "easy",
    image: "f22_raptor.jpg",
    aliases: ["F22", "Raptor"]
  },
  {
    id: 3,
    name: "HMS Queen Elizabeth",
    category: "Sea",
    year: 2017,
    country: "United Kingdom",
    difficulty: "medium",
    image: "hms_queen_elizabeth.jpg",
    aliases: ["Queen Elizabeth", "R08"]
  },
  {
    id: 4,
    name: "Su-27 Flanker",
    category: "Air",
    year: 1985,
    country: "Russia",
    difficulty: "medium",
    image: "su27_flanker.jpg",
    aliases: ["Sukhoi Su-27", "Flanker"]
  },
  {
    id: 5,
    name: "Leopard 2",
    category: "Land",
    year: 1979,
    country: "Germany",
    difficulty: "easy",
    image: "leopard_2.jpg",
    aliases: ["Leopard II", "Leopard tank"]
  },
  {
    id: 6,
    name: "Type 99",
    category: "Land",
    year: 2001,
    country: "China",
    difficulty: "medium",
    image: "type_99.jpg",
    aliases: ["ZTZ-99", "Type 99 tank"]
  },
  {
    id: 7,
    name: "Dassault Rafale",
    category: "Air",
    year: 2001,
    country: "France",
    difficulty: "medium",
    image: "dassault_rafale.jpg",
    aliases: ["Rafale"]
  },
  {
    id: 8,
    name: "USS Zumwalt",
    category: "Sea",
    year: 2016,
    country: "United States",
    difficulty: "medium",
    image: "uss_zumwalt.jpg",
    aliases: ["Zumwalt", "DDG-1000"]
  },
  {
    id: 9,
    name: "AK-47",
    category: "Infantry",
    year: 1948,
    country: "Russia",
    difficulty: "easy",
    image: "ak47.jpg",
    aliases: ["Kalashnikov", "Avtomat Kalashnikova"]
  },
  {
    id: 10,
    name: "MQ-9 Reaper",
    category: "Air",
    year: 2007,
    country: "United States",
    difficulty: "medium",
    image: "mq9_reaper.jpg",
    aliases: ["Reaper drone", "Predator B"]
  },
  {
    id: 11,
    name: "B-2 Spirit",
    category: "Air",
    year: 1997,
    country: "United States",
    difficulty: "easy",
    image: "b2_spirit.jpg",
    aliases: ["Stealth Bomber", "B2"]
  },
  {
    id: 12,
    name: "Challenger 2",
    category: "Land",
    year: 1998,
    country: "United Kingdom",
    difficulty: "easy",
    image: "challenger_2.jpg",
    aliases: ["Challenger II", "FV4034"]
  },
  {
    id: 13,
    name: "Kirov-class Battlecruiser",
    category: "Sea",
    year: 1980,
    country: "Russia",
    difficulty: "medium",
    image: "kirov_class.jpg",
    aliases: ["Pyotr Velikiy", "Admiral Lazarev", "Kirov"]
  },
  {
    id: 14,
    name: "JAS 39 Gripen",
    category: "Air",
    year: 1996,
    country: "Sweden",
    difficulty: "medium",
    image: "jas39_gripen.jpg",
    aliases: ["Gripen"]
  },
  {
    id: 15,
    name: "Merkava IV",
    category: "Land",
    year: 2004,
    country: "Israel",
    difficulty: "medium",
    image: "merkava_iv.jpg",
    aliases: ["Merkava Mark 4", "Merkava 4"]
  },
  {
    id: 16,
    name: "Arleigh Burke-class Destroyer",
    category: "Sea",
    year: 1991,
    country: "United States",
    difficulty: "medium",
    image: "arleigh_burke.jpg",
    aliases: ["Arleigh Burke", "DDG-51"]
  },
  {
    id: 17,
    name: "T-90",
    category: "Land",
    year: 1993,
    country: "Russia",
    difficulty: "easy",
    image: "t90.jpg",
    aliases: ["T-90A", "T90"]
  },
  {
    id: 18,
    name: "Eurofighter Typhoon",
    category: "Air",
    year: 2003,
    country: "European Consortium",
    difficulty: "medium",
    image: "eurofighter_typhoon.jpg",
    aliases: ["Typhoon", "EF-2000"]
  },
  {
    id: 19,
    name: "M4 Carbine",
    category: "Infantry",
    year: 1994,
    country: "United States",
    difficulty: "easy",
    image: "m4_carbine.jpg",
    aliases: ["M4A1", "M4 rifle", "Carbine"]
  },
  {
    id: 20,
    name: "K2 Black Panther",
    category: "Land",
    year: 2014,
    country: "South Korea",
    difficulty: "medium",
    image: "k2_black_panther.jpg",
    aliases: ["K2 tank", "Black Panther"]
  },
  {
    id: 21,
    name: "Charles de Gaulle",
    category: "Sea",
    year: 2001,
    country: "France",
    difficulty: "medium",
    image: "charles_de_gaulle.jpg",
    aliases: ["R91", "CdG"]
  },
  {
    id: 22,
    name: "AH-64 Apache",
    category: "Air",
    year: 1986,
    country: "United States",
    difficulty: "easy",
    image: "ah64_apache.jpg",
    aliases: ["Apache helicopter", "AH-64D"]
  },
  {
    id: 23,
    name: "Uzi",
    category: "Infantry",
    year: 1950,
    country: "Israel",
    difficulty: "easy",
    image: "uzi.jpg",
    aliases: ["Uzi submachine gun"]
  },
  {
    id: 24,
    name: "Type 45 Destroyer",
    category: "Sea",
    year: 2009,
    country: "United Kingdom",
    difficulty: "medium",
    image: "type_45_destroyer.jpg",
    aliases: ["Daring-class", "HMS Daring", "Type 45"]
  },
  {
    id: 25,
    name: "S-400 Triumf",
    category: "Air",
    year: 2007,
    country: "Russia",
    difficulty: "hard",
    image: "s400_triumf.jpg",
    aliases: ["S-400", "Triumf", "SA-21 Growler"]
  },
  {
    id: 26,
    name: "T-14 Armata",
    category: "Land",
    year: 2015,
    country: "Russia",
    difficulty: "medium",
    image: "t14_armata.jpg",
    aliases: ["Armata"]
  },
  {
    id: 27,
    name: "M2 Bradley",
    category: "Land",
    year: 1981,
    country: "United States",
    difficulty: "medium",
    image: "m2_bradley.jpg",
    aliases: ["Bradley IFV"]
  },
  {
    id: 28,
    name: "CV90",
    category: "Land",
    year: 1993,
    country: "Sweden",
    difficulty: "hard",
    image: "cv90.jpg",
    aliases: ["Combat Vehicle 90"]
  },
  {
    id: 29,
    name: "BMP-2",
    category: "Land",
    year: 1980,
    country: "Russia",
    difficulty: "medium",
    image: "bmp2.jpg",
    aliases: ["BMP"]
  },
  {
    id: 30,
    name: "Stryker",
    category: "Land",
    year: 2002,
    country: "United States",
    difficulty: "medium",
    image: "stryker.jpg",
    aliases: ["M1126 Stryker"]
  },
  {
    id: 31,
    name: "Boxer AFV",
    category: "Land",
    year: 2008,
    country: "Germany",
    difficulty: "hard",
    image: "boxer_afv.jpg",
    aliases: ["Boxer"]
  },
  {
    id: 32,
    name: "KF51 Panther",
    category: "Land",
    year: 2022,
    country: "Germany",
    difficulty: "hard",
    image: "kf51_panther.jpg",
    aliases: ["KF51"]
  },
  {
    id: 33,
    name: "Type 10",
    category: "Land",
    year: 2010,
    country: "Japan",
    difficulty: "hard",
    image: "type_10.jpg",
    aliases: ["Type 10 tank"]
  },
  {
    id: 34,
    name: "Ariete",
    category: "Land",
    year: 1995,
    country: "Italy",
    difficulty: "hard",
    image: "ariete.jpg",
    aliases: ["C1 Ariete"]
  },
  {
    id: 35,
    name: "Al-Khalid",
    category: "Land",
    year: 2001,
    country: "Pakistan",
    difficulty: "hard",
    image: "al_khalid.jpg",
    aliases: ["MBT 2000"]
  },
  {
    id: 36,
    name: "Oplot-M",
    category: "Land",
    year: 2009,
    country: "Ukraine",
    difficulty: "hard",
    image: "oplot_m.jpg",
    aliases: ["Oplot"]
  },
  {
    id: 37,
    name: "PT-91 Twardy",
    category: "Land",
    year: 1995,
    country: "Poland",
    difficulty: "hard",
    image: "pt91_twardy.jpg",
    aliases: ["Twardy"]
  },
  {
    id: 38,
    name: "T-80U",
    category: "Land",
    year: 1985,
    country: "Russia",
    difficulty: "medium",
    image: "t80u.jpg",
    aliases: ["T-80"]
  },
  {
    id: 39,
    name: "M109 Paladin",
    category: "Land",
    year: 1992,
    country: "United States",
    difficulty: "medium",
    image: "m109_paladin.jpg",
    aliases: ["M109", "Paladin"]
  },
  {
    id: 40,
    name: "CAESAR",
    category: "Land",
    year: 2008,
    country: "France",
    difficulty: "hard",
    image: "caesar.jpg",
    aliases: ["CAESAR howitzer"]
  },
  {
    id: 41,
    name: "PzH 2000",
    category: "Land",
    year: 1998,
    country: "Germany",
    difficulty: "hard",
    image: "pzh_2000.jpg",
    aliases: ["Panzerhaubitze 2000"]
  },
  {
    id: 42,
    name: "K9 Thunder",
    category: "Land",
    year: 1999,
    country: "South Korea",
    difficulty: "medium",
    image: "k9_thunder.jpg",
    aliases: ["K9"]
  },
  {
    id: 43,
    name: "Archer Artillery",
    category: "Land",
    year: 2016,
    country: "Sweden",
    difficulty: "hard",
    image: "archer_artillery.jpg",
    aliases: ["Archer"]
  },
  {
    id: 44,
    name: "BM-30 Smerch",
    category: "Land",
    year: 1989,
    country: "Russia",
    difficulty: "hard",
    image: "bm30_smerch.jpg",
    aliases: ["Smerch"]
  },
  {
    id: 45,
    name: "HIMARS",
    category: "Land",
    year: 2010,
    country: "United States",
    difficulty: "easy",
    image: "himars.jpg",
    aliases: ["M142 HIMARS"]
  },
  {
    id: 46,
    name: "F-35 Lightning II",
    category: "Air",
    year: 2015,
    country: "United States",
    difficulty: "easy",
    image: "f35_lightning_ii.jpg",
    aliases: ["F-35", "Lightning II"]
  },
  {
    id: 47,
    name: "Su-35 Flanker-E",
    category: "Air",
    year: 2008,
    country: "Russia",
    difficulty: "medium",
    image: "su35_flanker_e.jpg",
    aliases: ["Su-35", "Flanker-E"]
  },
  {
    id: 48,
    name: "MiG-29 Fulcrum",
    category: "Air",
    year: 1983,
    country: "Russia",
    difficulty: "easy",
    image: "mig29_fulcrum.jpg",
    aliases: ["MiG-29", "Fulcrum"]
  },
  {
    id: 49,
    name: "Mirage 2000",
    category: "Air",
    year: 1984,
    country: "France",
    difficulty: "easy",
    image: "mirage_2000.jpg",
    aliases: ["Mirage"]
  },
  {
    id: 50,
    name: "Saab 37 Viggen",
    category: "Air",
    year: 1971,
    country: "Sweden",
    difficulty: "medium",
    image: "saab_37_viggen.jpg",
    aliases: ["Viggen"]
  },
  {
    id: 51,
    name: "F-15 Eagle",
    category: "Air",
    year: 1976,
    country: "United States",
    difficulty: "easy",
    image: "f15_eagle.jpg",
    aliases: ["F-15", "Eagle"]
  },
  {
    id: 52,
    name: "F-16 Fighting Falcon",
    category: "Air",
    year: 1978,
    country: "United States",
    difficulty: "easy",
    image: "f16_fighting_falcon.jpg",
    aliases: ["F-16", "Fighting Falcon", "Viper"]
  },
  {
    id: 53,
    name: "F/A-18 Super Hornet",
    category: "Air",
    year: 1999,
    country: "United States",
    difficulty: "medium",
    image: "fa18_super_hornet.jpg",
    aliases: ["Super Hornet", "F-18"]
  },
  {
    id: 54,
    name: "AV-8B Harrier II",
    category: "Air",
    year: 1985,
    country: "United Kingdom",
    difficulty: "medium",
    image: "av8b_harrier_ii.jpg",
    aliases: ["Harrier", "AV-8B"]
  },
  {
    id: 55,
    name: "A-10 Thunderbolt II",
    category: "Air",
    year: 1977,
    country: "United States",
    difficulty: "easy",
    image: "a10_thunderbolt_ii.jpg",
    aliases: ["A-10", "Warthog"]
  },
  {
    id: 56,
    name: "B-1 Lancer",
    category: "Air",
    year: 1986,
    country: "United States",
    difficulty: "medium",
    image: "b1_lancer.jpg",
    aliases: ["B-1", "Lancer", "Bone"]
  },
  {
    id: 57,
    name: "B-52 Stratofortress",
    category: "Air",
    year: 1955,
    country: "United States",
    difficulty: "easy",
    image: "b52_stratofortress.jpg",
    aliases: ["B-52", "Stratofortress"]
  },
  {
    id: 58,
    name: "Tu-95 Bear",
    category: "Air",
    year: 1956,
    country: "Russia",
    difficulty: "easy",
    image: "tu95_bear.jpg",
    aliases: ["Tu-95", "Bear"]
  },
  {
    id: 59,
    name: "Tu-160 Blackjack",
    category: "Air",
    year: 1987,
    country: "Russia",
    difficulty: "medium",
    image: "tu160_blackjack.jpg",
    aliases: ["Tu-160", "Blackjack"]
  },
  {
    id: 60,
    name: "V-22 Osprey",
    category: "Air",
    year: 2007,
    country: "United States",
    difficulty: "medium",
    image: "v22_osprey.jpg",
    aliases: ["Osprey"]
  },
  {
    id: 61,
    name: "CH-47 Chinook",
    category: "Air",
    year: 1962,
    country: "United States",
    difficulty: "easy",
    image: "ch47_chinook.jpg",
    aliases: ["Chinook"]
  },
  {
    id: 62,
    name: "UH-60 Black Hawk",
    category: "Air",
    year: 1979,
    country: "United States",
    difficulty: "easy",
    image: "uh60_black_hawk.jpg",
    aliases: ["Black Hawk", "UH-60"]
  },
  {
    id: 63,
    name: "Mi-24 Hind",
    category: "Air",
    year: 1972,
    country: "Russia",
    difficulty: "medium",
    image: "mi24_hind.jpg",
    aliases: ["Hind", "Mi-24"]
  },
  {
    id: 64,
    name: "Mi-28 Havoc",
    category: "Air",
    year: 2009,
    country: "Russia",
    difficulty: "medium",
    image: "mi28_havoc.jpg",
    aliases: ["Mi-28", "Havoc"]
  },
  {
    id: 65,
    name: "Ka-52 Alligator",
    category: "Air",
    year: 1995,
    country: "Russia",
    difficulty: "medium",
    image: "ka52_alligator.jpg",
    aliases: ["Ka-52", "Alligator"]
  },
  {
    id: 66,
    name: "Nimitz-class Carrier",
    category: "Sea",
    year: 1975,
    country: "United States",
    difficulty: "easy",
    image: "nimitz_class_carrier.jpg",
    aliases: ["Nimitz", "CVN-68"]
  },
  {
    id: 67,
    name: "Gerald R. Ford-class",
    category: "Sea",
    year: 2017,
    country: "United States",
    difficulty: "medium",
    image: "gerald_r_ford_class.jpg",
    aliases: ["Ford-class", "CVN-78"]
  },
  {
    id: 68,
    name: "Kuznetsov-class Carrier",
    category: "Sea",
    year: 1985,
    country: "Russia",
    difficulty: "medium",
    image: "kuznetsov_class_carrier.jpg",
    aliases: ["Admiral Kuznetsov"]
  },
  {
    id: 69,
    name: "Liaoning",
    category: "Sea",
    year: 2012,
    country: "China",
    difficulty: "medium",
    image: "liaoning.jpg",
    aliases: ["Type 001"]
  },
  {
    id: 70,
    name: "Shandong",
    category: "Sea",
    year: 2019,
    country: "China",
    difficulty: "medium",
    image: "shandong.jpg",
    aliases: ["Type 002"]
  },
  {
    id: 71,
    name: "INS Vikrant",
    category: "Sea",
    year: 2022,
    country: "India",
    difficulty: "hard",
    image: "ins_vikrant.jpg",
    aliases: ["Vikrant", "R11"]
  },
  {
    id: 72,
    name: "Izumo-class",
    category: "Sea",
    year: 2015,
    country: "Japan",
    difficulty: "hard",
    image: "izumo_class.jpg",
    aliases: ["JS Izumo"]
  },
  {
    id: 73,
    name: "Sejong the Great-class",
    category: "Sea",
    year: 2008,
    country: "South Korea",
    difficulty: "hard",
    image: "sejong_the_great_class.jpg",
    aliases: ["Sejong the Great", "KDX-III"]
  },
  {
    id: 74,
    name: "Atago-class",
    category: "Sea",
    year: 2007,
    country: "Japan",
    difficulty: "hard",
    image: "atago_class.jpg",
    aliases: ["JS Atago"]
  },
  {
    id: 75,
    name: "Horizon-class",
    category: "Sea",
    year: 2007,
    country: "France",
    difficulty: "hard",
    image: "horizon_class.jpg",
    aliases: ["Horizon"]
  },
  {
    id: 76,
    name: "Type 052D Destroyer",
    category: "Sea",
    year: 2014,
    country: "China",
    difficulty: "hard",
    image: "type_052d_destroyer.jpg",
    aliases: ["Luyang III", "Type 052D"]
  },
  {
    id: 77,
    name: "Type 055 Destroyer",
    category: "Sea",
    year: 2020,
    country: "China",
    difficulty: "hard",
    image: "type_055_destroyer.jpg",
    aliases: ["Renhai", "Type 055"]
  },
  {
    id: 78,
    name: "Oscar-class Submarine",
    category: "Sea",
    year: 1980,
    country: "Russia",
    difficulty: "hard",
    image: "oscar_class_submarine.jpg",
    aliases: ["Oscar II", "Project 949A"]
  },
  {
    id: 79,
    name: "Ohio-class Submarine",
    category: "Sea",
    year: 1981,
    country: "United States",
    difficulty: "medium",
    image: "ohio_class_submarine.jpg",
    aliases: ["Ohio", "SSGN"]
  },
  {
    id: 80,
    name: "Virginia-class Submarine",
    category: "Sea",
    year: 2004,
    country: "United States",
    difficulty: "medium",
    image: "virginia_class_submarine.jpg",
    aliases: ["Virginia", "SSN-774"]
  },
  {
    id: 81,
    name: "Astute-class Submarine",
    category: "Sea",
    year: 2010,
    country: "United Kingdom",
    difficulty: "hard",
    image: "astute_class_submarine.jpg",
    aliases: ["Astute"]
  },
  {
    id: 82,
    name: "Yasen-class Submarine",
    category: "Sea",
    year: 2013,
    country: "Russia",
    difficulty: "hard",
    image: "yasen_class_submarine.jpg",
    aliases: ["Severodvinsk", "Yasen-M"]
  },
  {
    id: 83,
    name: "Scorpene-class Submarine",
    category: "Sea",
    year: 2005,
    country: "France",
    difficulty: "hard",
    image: "scorpene_class_submarine.jpg",
    aliases: ["Scorpene"]
  },
  {
    id: 84,
    name: "Gotland-class Submarine",
    category: "Sea",
    year: 1996,
    country: "Sweden",
    difficulty: "hard",
    image: "gotland_class_submarine.jpg",
    aliases: ["Gotland"]
  },
  {
    id: 85,
    name: "Visby-class Corvette",
    category: "Sea",
    year: 2000,
    country: "Sweden",
    difficulty: "hard",
    image: "visby_class_corvette.jpg",
    aliases: ["Visby"]
  },
  {
    id: 86,
    name: "M16 Rifle",
    category: "Infantry",
    year: 1964,
    country: "United States",
    difficulty: "easy",
    image: "m16_rifle.jpg",
    aliases: ["M16", "M16A4"]
  },
  {
    id: 87,
    name: "FN SCAR",
    category: "Infantry",
    year: 2004,
    country: "Belgium",
    difficulty: "medium",
    image: "fn_scar.jpg",
    aliases: ["SCAR", "SCAR-L", "SCAR-H"]
  },
  {
    id: 88,
    name: "G36",
    category: "Infantry",
    year: 1997,
    country: "Germany",
    difficulty: "medium",
    image: "g36.jpg",
    aliases: ["G36C", "G36K"]
  },
  {
    id: 89,
    name: "AUG A3",
    category: "Infantry",
    year: 2005,
    country: "Austria",
    difficulty: "medium",
    image: "aug_a3.jpg",
    aliases: ["Steyr AUG", "AUG"]
  },
  {
    id: 90,
    name: "FAMAS",
    category: "Infantry",
    year: 1978,
    country: "France",
    difficulty: "medium",
    image: "famas.jpg",
    aliases: ["FAMAS F1"]
  },
  {
    id: 91,
    name: "QBZ-95",
    category: "Infantry",
    year: 1995,
    country: "China",
    difficulty: "medium",
    image: "qbz_95.jpg",
    aliases: ["Type 95", "QBZ"]
  },
  {
    id: 92,
    name: "MG3",
    category: "Infantry",
    year: 1960,
    country: "Germany",
    difficulty: "medium",
    image: "mg3.jpg",
    aliases: ["MG 3"]
  },
  {
    id: 93,
    name: "FN MAG",
    category: "Infantry",
    year: 1958,
    country: "Belgium",
    difficulty: "medium",
    image: "fn_mag.jpg",
    aliases: ["MAG", "M240"]
  },
  {
    id: 94,
    name: "PKM",
    category: "Infantry",
    year: 1969,
    country: "Russia",
    difficulty: "medium",
    image: "pkm.jpg",
    aliases: ["PK machine gun"]
  },
  {
    id: 95,
    name: "M249 SAW",
    category: "Infantry",
    year: 1984,
    country: "Belgium",
    difficulty: "medium",
    image: "m249_saw.jpg",
    aliases: ["M249", "SAW"]
  },
  {
    id: 96,
    name: "Barrett M82",
    category: "Infantry",
    year: 1989,
    country: "United States",
    difficulty: "easy",
    image: "barrett_m82.jpg",
    aliases: ["M82", "Barrett"]
  },
  {
    id: 97,
    name: "Dragunov SVD",
    category: "Infantry",
    year: 1963,
    country: "Russia",
    difficulty: "medium",
    image: "dragunov_svd.jpg",
    aliases: ["SVD", "Dragunov"]
  },
  {
    id: 98,
    name: "RPG-7",
    category: "Infantry",
    year: 1961,
    country: "Russia",
    difficulty: "easy",
    image: "rpg7.jpg",
    aliases: ["RPG"]
  },
  {
    id: 99,
    name: "Javelin",
    category: "Infantry",
    year: 1996,
    country: "United States",
    difficulty: "easy",
    image: "javelin.jpg",
    aliases: ["FGM-148 Javelin"]
  },
  {
    id: 100,
    name: "NLAW",
    category: "Infantry",
    year: 2009,
    country: "United Kingdom",
    difficulty: "medium",
    image: "nlaw.jpg",
    aliases: ["MBT LAW"]
  }
];

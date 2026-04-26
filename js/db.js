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
  },
  {
    id: 101,
    name: "M4 Sherman",
    category: "Land",
    year: 1942,
    country: "United States",
    difficulty: "easy",
    image: "m4_sherman.jpg",
    aliases: ["Sherman tank"]
  },
  {
    id: 102,
    name: "T-34",
    category: "Land",
    year: 1940,
    country: "Russia",
    difficulty: "easy",
    image: "t34.jpg",
    aliases: ["T-34-85"]
  },
  {
    id: 103,
    name: "Tiger I",
    category: "Land",
    year: 1942,
    country: "Germany",
    difficulty: "easy",
    image: "tiger_i.jpg",
    aliases: ["Tiger tank", "Panzer VI"]
  },
  {
    id: 104,
    name: "Panther",
    category: "Land",
    year: 1943,
    country: "Germany",
    difficulty: "medium",
    image: "panther.jpg",
    aliases: ["Panzer V"]
  },
  {
    id: 105,
    name: "Panzer IV",
    category: "Land",
    year: 1939,
    country: "Germany",
    difficulty: "medium",
    image: "panzer_iv.jpg",
    aliases: ["PzKpfw IV", "Panzer 4"]
  },
  {
    id: 106,
    name: "Churchill Tank",
    category: "Land",
    year: 1941,
    country: "United Kingdom",
    difficulty: "medium",
    image: "churchill_tank.jpg",
    aliases: ["Churchill VII", "A22 Churchill"]
  },
  {
    id: 107,
    name: "Cromwell Tank",
    category: "Land",
    year: 1943,
    country: "United Kingdom",
    difficulty: "medium",
    image: "cromwell_tank.jpg",
    aliases: ["Cromwell"]
  },
  {
    id: 108,
    name: "IS-2",
    category: "Land",
    year: 1944,
    country: "Russia",
    difficulty: "medium",
    image: "is2.jpg",
    aliases: ["Iosif Stalin tank", "JS-2"]
  },
  {
    id: 109,
    name: "KV-1",
    category: "Land",
    year: 1939,
    country: "Russia",
    difficulty: "medium",
    image: "kv1.jpg",
    aliases: ["Kliment Voroshilov"]
  },
  {
    id: 110,
    name: "M3 Lee",
    category: "Land",
    year: 1941,
    country: "United States",
    difficulty: "hard",
    image: "m3_lee.jpg",
    aliases: ["M3 Grant"]
  },
  {
    id: 111,
    name: "M26 Pershing",
    category: "Land",
    year: 1945,
    country: "United States",
    difficulty: "medium",
    image: "m26_pershing.jpg",
    aliases: ["Pershing tank"]
  },
  {
    id: 112,
    name: "Jagdpanther",
    category: "Land",
    year: 1944,
    country: "Germany",
    difficulty: "hard",
    image: "jagdpanther.jpg",
    aliases: ["Sd.Kfz. 173"]
  },
  {
    id: 113,
    name: "StuG III",
    category: "Land",
    year: 1940,
    country: "Germany",
    difficulty: "medium",
    image: "stug_iii.jpg",
    aliases: ["Sturmgeschutz III"]
  },
  {
    id: 114,
    name: "Sherman Firefly",
    category: "Land",
    year: 1944,
    country: "United Kingdom",
    difficulty: "hard",
    image: "sherman_firefly.jpg",
    aliases: ["Firefly"]
  },
  {
    id: 115,
    name: "Matilda II",
    category: "Land",
    year: 1939,
    country: "United Kingdom",
    difficulty: "hard",
    image: "matilda_ii.jpg",
    aliases: ["Matilda tank"]
  },
  {
    id: 116,
    name: "Valentine Tank",
    category: "Land",
    year: 1938,
    country: "United Kingdom",
    difficulty: "hard",
    image: "valentine_tank.jpg",
    aliases: ["Valentine"]
  },
  {
    id: 117,
    name: "Crusader Tank",
    category: "Land",
    year: 1939,
    country: "United Kingdom",
    difficulty: "hard",
    image: "crusader_tank.jpg",
    aliases: ["Crusader"]
  },
  {
    id: 118,
    name: "M10 Wolverine",
    category: "Land",
    year: 1942,
    country: "United States",
    difficulty: "hard",
    image: "m10_wolverine.jpg",
    aliases: ["M10 GMC"]
  },
  {
    id: 119,
    name: "M18 Hellcat",
    category: "Land",
    year: 1943,
    country: "United States",
    difficulty: "medium",
    image: "m18_hellcat.jpg",
    aliases: ["Hellcat"]
  },
  {
    id: 120,
    name: "M36 Jackson",
    category: "Land",
    year: 1944,
    country: "United States",
    difficulty: "hard",
    image: "m36_jackson.jpg",
    aliases: ["Jackson"]
  },
  {
    id: 121,
    name: "SU-85",
    category: "Land",
    year: 1943,
    country: "Russia",
    difficulty: "hard",
    image: "su85.jpg",
    aliases: ["SU-85"]
  },
  {
    id: 122,
    name: "SU-100",
    category: "Land",
    year: 1944,
    country: "Russia",
    difficulty: "hard",
    image: "su100.jpg",
    aliases: ["SU-100"]
  },
  {
    id: 123,
    name: "Hetzer",
    category: "Land",
    year: 1944,
    country: "Germany",
    difficulty: "hard",
    image: "hetzer.jpg",
    aliases: ["Jagdpanzer 38"]
  },
  {
    id: 124,
    name: "King Tiger",
    category: "Land",
    year: 1944,
    country: "Germany",
    difficulty: "medium",
    image: "king_tiger.jpg",
    aliases: ["Tiger II", "Konigstiger"]
  },
  {
    id: 125,
    name: "Marder III",
    category: "Land",
    year: 1942,
    country: "Germany",
    difficulty: "hard",
    image: "marder_iii.jpg",
    aliases: ["Marder"]
  },
  {
    id: 126,
    name: "P-51 Mustang",
    category: "Air",
    year: 1942,
    country: "United States",
    difficulty: "easy",
    image: "p51_mustang.jpg",
    aliases: ["Mustang"]
  },
  {
    id: 127,
    name: "Spitfire",
    category: "Air",
    year: 1938,
    country: "United Kingdom",
    difficulty: "easy",
    image: "spitfire.jpg",
    aliases: ["Supermarine Spitfire"]
  },
  {
    id: 128,
    name: "Messerschmitt Bf 109",
    category: "Air",
    year: 1937,
    country: "Germany",
    difficulty: "easy",
    image: "messerschmitt_bf109.jpg",
    aliases: ["Bf 109", "Me 109"]
  },
  {
    id: 129,
    name: "Focke-Wulf Fw 190",
    category: "Air",
    year: 1941,
    country: "Germany",
    difficulty: "medium",
    image: "focke_wulf_fw190.jpg",
    aliases: ["Fw 190"]
  },
  {
    id: 130,
    name: "Mitsubishi A6M Zero",
    category: "Air",
    year: 1940,
    country: "Japan",
    difficulty: "easy",
    image: "mitsubishi_a6m_zero.jpg",
    aliases: ["Zero", "A6M Zero"]
  },
  {
    id: 131,
    name: "B-17 Flying Fortress",
    category: "Air",
    year: 1938,
    country: "United States",
    difficulty: "easy",
    image: "b17_flying_fortress.jpg",
    aliases: ["Flying Fortress", "B17"]
  },
  {
    id: 132,
    name: "Avro Lancaster",
    category: "Air",
    year: 1942,
    country: "United Kingdom",
    difficulty: "easy",
    image: "avro_lancaster.jpg",
    aliases: ["Lancaster"]
  },
  {
    id: 133,
    name: "Ju 87 Stuka",
    category: "Air",
    year: 1936,
    country: "Germany",
    difficulty: "medium",
    image: "ju87_stuka.jpg",
    aliases: ["Stuka", "Junkers Ju 87"]
  },
  {
    id: 134,
    name: "P-47 Thunderbolt",
    category: "Air",
    year: 1942,
    country: "United States",
    difficulty: "medium",
    image: "p47_thunderbolt.jpg",
    aliases: ["Thunderbolt"]
  },
  {
    id: 135,
    name: "Hawker Hurricane",
    category: "Air",
    year: 1937,
    country: "United Kingdom",
    difficulty: "medium",
    image: "hawker_hurricane.jpg",
    aliases: ["Hurricane"]
  },
  {
    id: 136,
    name: "Il-2 Sturmovik",
    category: "Air",
    year: 1941,
    country: "Russia",
    difficulty: "medium",
    image: "il2_sturmovik.jpg",
    aliases: ["Sturmovik", "Ilyushin Il-2"]
  },
  {
    id: 137,
    name: "B-24 Liberator",
    category: "Air",
    year: 1941,
    country: "United States",
    difficulty: "medium",
    image: "b24_liberator.jpg",
    aliases: ["Liberator", "B24"]
  },
  {
    id: 138,
    name: "B-29 Superfortress",
    category: "Air",
    year: 1944,
    country: "United States",
    difficulty: "easy",
    image: "b29_superfortress.jpg",
    aliases: ["Superfortress", "B29"]
  },
  {
    id: 139,
    name: "Me 262",
    category: "Air",
    year: 1944,
    country: "Germany",
    difficulty: "medium",
    image: "me262.jpg",
    aliases: ["Messerschmitt Me 262", "Schwalbe"]
  },
  {
    id: 140,
    name: "P-38 Lightning",
    category: "Air",
    year: 1941,
    country: "United States",
    difficulty: "medium",
    image: "p38_lightning.jpg",
    aliases: ["Lightning"]
  },
  {
    id: 141,
    name: "F4U Corsair",
    category: "Air",
    year: 1942,
    country: "United States",
    difficulty: "medium",
    image: "f4u_corsair.jpg",
    aliases: ["Corsair", "Vought F4U"]
  },
  {
    id: 142,
    name: "SBD Dauntless",
    category: "Air",
    year: 1940,
    country: "United States",
    difficulty: "hard",
    image: "sbd_dauntless.jpg",
    aliases: ["Dauntless"]
  },
  {
    id: 143,
    name: "TBF Avenger",
    category: "Air",
    year: 1942,
    country: "United States",
    difficulty: "hard",
    image: "tbf_avenger.jpg",
    aliases: ["Avenger", "Grumman TBF"]
  },
  {
    id: 144,
    name: "Yak-3",
    category: "Air",
    year: 1944,
    country: "Russia",
    difficulty: "hard",
    image: "yak3.jpg",
    aliases: ["Yakovlev Yak-3"]
  },
  {
    id: 145,
    name: "Yak-9",
    category: "Air",
    year: 1942,
    country: "Russia",
    difficulty: "hard",
    image: "yak9.jpg",
    aliases: ["Yakovlev Yak-9"]
  },
  {
    id: 146,
    name: "La-5",
    category: "Air",
    year: 1942,
    country: "Russia",
    difficulty: "hard",
    image: "la5.jpg",
    aliases: ["Lavochkin La-5"]
  },
  {
    id: 147,
    name: "B-25 Mitchell",
    category: "Air",
    year: 1941,
    country: "United States",
    difficulty: "medium",
    image: "b25_mitchell.jpg",
    aliases: ["Mitchell", "B25"]
  },
  {
    id: 148,
    name: "Heinkel He 111",
    category: "Air",
    year: 1935,
    country: "Germany",
    difficulty: "hard",
    image: "heinkel_he111.jpg",
    aliases: ["He 111"]
  },
  {
    id: 149,
    name: "Dornier Do 17",
    category: "Air",
    year: 1937,
    country: "Germany",
    difficulty: "hard",
    image: "dornier_do17.jpg",
    aliases: ["Do 17", "Flying Pencil"]
  },
  {
    id: 150,
    name: "Curtiss P-40 Warhawk",
    category: "Air",
    year: 1938,
    country: "United States",
    difficulty: "hard",
    image: "curtiss_p40_warhawk.jpg",
    aliases: ["P-40", "Warhawk", "Tomahawk"]
  },
  {
    id: 151,
    name: "USS Enterprise",
    category: "Sea",
    year: 1936,
    country: "United States",
    difficulty: "easy",
    image: "uss_enterprise.jpg",
    aliases: ["CV-6", "Enterprise"]
  },
  {
    id: 152,
    name: "Bismarck",
    category: "Sea",
    year: 1940,
    country: "Germany",
    difficulty: "easy",
    image: "bismarck.jpg",
    aliases: ["Bismarck battleship"]
  },
  {
    id: 153,
    name: "Yamato",
    category: "Sea",
    year: 1941,
    country: "Japan",
    difficulty: "easy",
    image: "yamato.jpg",
    aliases: ["Yamato battleship"]
  },
  {
    id: 154,
    name: "HMS Hood",
    category: "Sea",
    year: 1920,
    country: "United Kingdom",
    difficulty: "easy",
    image: "hms_hood.jpg",
    aliases: ["Hood"]
  },
  {
    id: 155,
    name: "USS Missouri",
    category: "Sea",
    year: 1944,
    country: "United States",
    difficulty: "easy",
    image: "uss_missouri.jpg",
    aliases: ["Mighty Mo", "BB-63"]
  },
  {
    id: 156,
    name: "USS Arizona",
    category: "Sea",
    year: 1915,
    country: "United States",
    difficulty: "medium",
    image: "uss_arizona.jpg",
    aliases: ["BB-39"]
  },
  {
    id: 157,
    name: "HMS Ark Royal",
    category: "Sea",
    year: 1937,
    country: "United Kingdom",
    difficulty: "medium",
    image: "hms_ark_royal.jpg",
    aliases: ["Ark Royal"]
  },
  {
    id: 158,
    name: "USS Lexington",
    category: "Sea",
    year: 1925,
    country: "United States",
    difficulty: "medium",
    image: "uss_lexington.jpg",
    aliases: ["CV-2", "Lady Lex"]
  },
  {
    id: 159,
    name: "IJN Akagi",
    category: "Sea",
    year: 1927,
    country: "Japan",
    difficulty: "medium",
    image: "ijn_akagi.jpg",
    aliases: ["Akagi"]
  },
  {
    id: 160,
    name: "IJN Kaga",
    category: "Sea",
    year: 1928,
    country: "Japan",
    difficulty: "hard",
    image: "ijn_kaga.jpg",
    aliases: ["Kaga"]
  },
  {
    id: 161,
    name: "USS North Carolina",
    category: "Sea",
    year: 1941,
    country: "United States",
    difficulty: "hard",
    image: "uss_north_carolina.jpg",
    aliases: ["BB-55"]
  },
  {
    id: 162,
    name: "HMS King George V",
    category: "Sea",
    year: 1939,
    country: "United Kingdom",
    difficulty: "hard",
    image: "hms_king_george_v.jpg",
    aliases: ["KGV"]
  },
  {
    id: 163,
    name: "HMS Prince of Wales",
    category: "Sea",
    year: 1939,
    country: "United Kingdom",
    difficulty: "hard",
    image: "hms_prince_of_wales.jpg",
    aliases: ["POW"]
  },
  {
    id: 164,
    name: "USS Indianapolis",
    category: "Sea",
    year: 1931,
    country: "United States",
    difficulty: "hard",
    image: "uss_indianapolis.jpg",
    aliases: ["CA-35"]
  },
  {
    id: 165,
    name: "U-boat Type VII",
    category: "Sea",
    year: 1936,
    country: "Germany",
    difficulty: "easy",
    image: "uboat_type_vii.jpg",
    aliases: ["Type VII U-boat", "U-boat"]
  },
  {
    id: 166,
    name: "I-400 Submarine",
    category: "Sea",
    year: 1944,
    country: "Japan",
    difficulty: "hard",
    image: "i400_submarine.jpg",
    aliases: ["I-400"]
  },
  {
    id: 167,
    name: "HMS Warspite",
    category: "Sea",
    year: 1915,
    country: "United Kingdom",
    difficulty: "hard",
    image: "hms_warspite.jpg",
    aliases: ["Warspite"]
  },
  {
    id: 168,
    name: "USS Essex",
    category: "Sea",
    year: 1942,
    country: "United States",
    difficulty: "medium",
    image: "uss_essex.jpg",
    aliases: ["CV-9"]
  },
  {
    id: 169,
    name: "M1 Garand",
    category: "Infantry",
    year: 1936,
    country: "United States",
    difficulty: "easy",
    image: "m1_garand.jpg",
    aliases: ["Garand", "M1 rifle"]
  },
  {
    id: 170,
    name: "Mosin-Nagant",
    category: "Infantry",
    year: 1891,
    country: "Russia",
    difficulty: "easy",
    image: "mosin_nagant.jpg",
    aliases: ["Mosin", "M1891"]
  },
  {
    id: 171,
    name: "Kar98k",
    category: "Infantry",
    year: 1935,
    country: "Germany",
    difficulty: "easy",
    image: "kar98k.jpg",
    aliases: ["Kar 98k", "Mauser 98k"]
  },
  {
    id: 172,
    name: "Lee-Enfield",
    category: "Infantry",
    year: 1895,
    country: "United Kingdom",
    difficulty: "easy",
    image: "lee_enfield.jpg",
    aliases: ["SMLE", "Enfield"]
  },
  {
    id: 173,
    name: "MP40",
    category: "Infantry",
    year: 1940,
    country: "Germany",
    difficulty: "easy",
    image: "mp40.jpg",
    aliases: ["Maschinenpistole 40", "Schmeisser"]
  },
  {
    id: 174,
    name: "Thompson M1A1",
    category: "Infantry",
    year: 1921,
    country: "United States",
    difficulty: "easy",
    image: "thompson_m1a1.jpg",
    aliases: ["Tommy Gun", "Thompson"]
  },
  {
    id: 175,
    name: "M1911 Pistol",
    category: "Infantry",
    year: 1911,
    country: "United States",
    difficulty: "medium",
    image: "m1911_pistol.jpg",
    aliases: ["Colt 1911", "M1911"]
  },
  {
    id: 176,
    name: "Bren Gun",
    category: "Infantry",
    year: 1938,
    country: "United Kingdom",
    difficulty: "medium",
    image: "bren_gun.jpg",
    aliases: ["Bren"]
  },
  {
    id: 177,
    name: "MG42",
    category: "Infantry",
    year: 1942,
    country: "Germany",
    difficulty: "easy",
    image: "mg42.jpg",
    aliases: ["Maschinengewehr 42"]
  },
  {
    id: 178,
    name: "DP-27",
    category: "Infantry",
    year: 1928,
    country: "Russia",
    difficulty: "medium",
    image: "dp27.jpg",
    aliases: ["Degtyaryov", "DP machine gun"]
  },
  {
    id: 179,
    name: "PPSh-41",
    category: "Infantry",
    year: 1941,
    country: "Russia",
    difficulty: "easy",
    image: "ppsh41.jpg",
    aliases: ["PPSh", "Papasha"]
  },
  {
    id: 180,
    name: "STG 44",
    category: "Infantry",
    year: 1944,
    country: "Germany",
    difficulty: "medium",
    image: "stg44.jpg",
    aliases: ["Sturmgewehr 44", "MP43"]
  },
  {
    id: 181,
    name: "M2 Browning",
    category: "Infantry",
    year: 1921,
    country: "United States",
    difficulty: "medium",
    image: "m2_browning.jpg",
    aliases: ["Browning .50 cal", "M2HB"]
  },
  {
    id: 182,
    name: "Panzerschreck",
    category: "Infantry",
    year: 1943,
    country: "Germany",
    difficulty: "hard",
    image: "panzerschreck.jpg",
    aliases: ["Raketenpanzerbuchse"]
  },
  {
    id: 183,
    name: "PIAT",
    category: "Infantry",
    year: 1943,
    country: "United Kingdom",
    difficulty: "hard",
    image: "piat.jpg",
    aliases: ["Projector Infantry Anti Tank"]
  },
  {
    id: 184,
    name: "M48 Patton",
    category: "Land",
    year: 1953,
    country: "United States",
    difficulty: "medium",
    image: "m48_patton.jpg",
    aliases: ["Patton tank"]
  },
  {
    id: 185,
    name: "M60 Patton",
    category: "Land",
    year: 1960,
    country: "United States",
    difficulty: "medium",
    image: "m60_patton.jpg",
    aliases: ["M60 tank"]
  },
  {
    id: 186,
    name: "Centurion",
    category: "Land",
    year: 1946,
    country: "United Kingdom",
    difficulty: "medium",
    image: "centurion.jpg",
    aliases: ["FV4007"]
  },
  {
    id: 187,
    name: "Chieftain",
    category: "Land",
    year: 1966,
    country: "United Kingdom",
    difficulty: "medium",
    image: "chieftain.jpg",
    aliases: ["FV4201"]
  },
  {
    id: 188,
    name: "AMX-30",
    category: "Land",
    year: 1966,
    country: "France",
    difficulty: "hard",
    image: "amx30.jpg",
    aliases: ["AMX 30"]
  },
  {
    id: 189,
    name: "T-54",
    category: "Land",
    year: 1949,
    country: "Russia",
    difficulty: "medium",
    image: "t54.jpg",
    aliases: ["T-54 tank"]
  },
  {
    id: 190,
    name: "T-55",
    category: "Land",
    year: 1958,
    country: "Russia",
    difficulty: "easy",
    image: "t55.jpg",
    aliases: ["T-55 tank"]
  },
  {
    id: 191,
    name: "T-62",
    category: "Land",
    year: 1961,
    country: "Russia",
    difficulty: "medium",
    image: "t62.jpg",
    aliases: ["T-62 tank"]
  },
  {
    id: 192,
    name: "T-72",
    category: "Land",
    year: 1973,
    country: "Russia",
    difficulty: "easy",
    image: "t72.jpg",
    aliases: ["T-72 tank"]
  },
  {
    id: 193,
    name: "T-64",
    category: "Land",
    year: 1966,
    country: "Russia",
    difficulty: "hard",
    image: "t64.jpg",
    aliases: ["T-64 tank"]
  },
  {
    id: 194,
    name: "M113",
    category: "Land",
    year: 1960,
    country: "United States",
    difficulty: "medium",
    image: "m113.jpg",
    aliases: ["M113 APC"]
  },
  {
    id: 195,
    name: "BMP-1",
    category: "Land",
    year: 1966,
    country: "Russia",
    difficulty: "medium",
    image: "bmp1.jpg",
    aliases: ["BMP"]
  },
  {
    id: 196,
    name: "FV107 Scimitar",
    category: "Land",
    year: 1971,
    country: "United Kingdom",
    difficulty: "hard",
    image: "fv107_scimitar.jpg",
    aliases: ["Scimitar"]
  },
  {
    id: 197,
    name: "M551 Sheridan",
    category: "Land",
    year: 1966,
    country: "United States",
    difficulty: "hard",
    image: "m551_sheridan.jpg",
    aliases: ["Sheridan tank"]
  },
  {
    id: 198,
    name: "PT-76",
    category: "Land",
    year: 1951,
    country: "Russia",
    difficulty: "hard",
    image: "pt76.jpg",
    aliases: ["PT-76"]
  },
  {
    id: 199,
    name: "F-86 Sabre",
    category: "Air",
    year: 1949,
    country: "United States",
    difficulty: "medium",
    image: "f86_sabre.jpg",
    aliases: ["Sabre", "F86"]
  },
  {
    id: 200,
    name: "MiG-15",
    category: "Air",
    year: 1949,
    country: "Russia",
    difficulty: "medium",
    image: "mig15.jpg",
    aliases: ["Mikoyan MiG-15"]
  },
  {
    id: 201,
    name: "MiG-17",
    category: "Air",
    year: 1952,
    country: "Russia",
    difficulty: "hard",
    image: "mig17.jpg",
    aliases: ["Fresco"]
  },
  {
    id: 202,
    name: "MiG-21",
    category: "Air",
    year: 1959,
    country: "Russia",
    difficulty: "easy",
    image: "mig21.jpg",
    aliases: ["Fishbed"]
  },
  {
    id: 203,
    name: "MiG-23",
    category: "Air",
    year: 1970,
    country: "Russia",
    difficulty: "medium",
    image: "mig23.jpg",
    aliases: ["Flogger"]
  },
  {
    id: 204,
    name: "MiG-25",
    category: "Air",
    year: 1970,
    country: "Russia",
    difficulty: "medium",
    image: "mig25.jpg",
    aliases: ["Foxbat"]
  },
  {
    id: 205,
    name: "F-4 Phantom II",
    category: "Air",
    year: 1960,
    country: "United States",
    difficulty: "easy",
    image: "f4_phantom_ii.jpg",
    aliases: ["F-4", "Phantom"]
  },
  {
    id: 206,
    name: "F-104 Starfighter",
    category: "Air",
    year: 1958,
    country: "United States",
    difficulty: "hard",
    image: "f104_starfighter.jpg",
    aliases: ["F104", "Starfighter"]
  },
  {
    id: 207,
    name: "F-111 Aardvark",
    category: "Air",
    year: 1967,
    country: "United States",
    difficulty: "hard",
    image: "f111_aardvark.jpg",
    aliases: ["F-111", "Aardvark"]
  },
  {
    id: 208,
    name: "F-14 Tomcat",
    category: "Air",
    year: 1974,
    country: "United States",
    difficulty: "easy",
    image: "f14_tomcat.jpg",
    aliases: ["F-14", "Tomcat"]
  },
  {
    id: 209,
    name: "A-6 Intruder",
    category: "Air",
    year: 1963,
    country: "United States",
    difficulty: "hard",
    image: "a6_intruder.jpg",
    aliases: ["A-6", "Intruder"]
  },
  {
    id: 210,
    name: "EA-6B Prowler",
    category: "Air",
    year: 1971,
    country: "United States",
    difficulty: "hard",
    image: "ea6b_prowler.jpg",
    aliases: ["Prowler", "EA-6B"]
  },
  {
    id: 211,
    name: "SR-71 Blackbird",
    category: "Air",
    year: 1966,
    country: "United States",
    difficulty: "easy",
    image: "sr71_blackbird.jpg",
    aliases: ["SR-71", "Blackbird"]
  },
  {
    id: 212,
    name: "U-2 Spy Plane",
    category: "Air",
    year: 1956,
    country: "United States",
    difficulty: "medium",
    image: "u2_spy_plane.jpg",
    aliases: ["U-2", "Dragon Lady"]
  },
  {
    id: 213,
    name: "C-130 Hercules",
    category: "Air",
    year: 1956,
    country: "United States",
    difficulty: "easy",
    image: "c130_hercules.jpg",
    aliases: ["C-130", "Hercules"]
  },
  {
    id: 214,
    name: "USS Forrestal",
    category: "Sea",
    year: 1955,
    country: "United States",
    difficulty: "hard",
    image: "uss_forrestal.jpg",
    aliases: ["CVA-59"]
  },
  {
    id: 215,
    name: "HMS Hermes",
    category: "Sea",
    year: 1959,
    country: "United Kingdom",
    difficulty: "hard",
    image: "hms_hermes.jpg",
    aliases: ["R12"]
  },
  {
    id: 216,
    name: "Kiev-class Carrier",
    category: "Sea",
    year: 1975,
    country: "Russia",
    difficulty: "medium",
    image: "kiev_class_carrier.jpg",
    aliases: ["Kiev", "Project 1143"]
  },
  {
    id: 217,
    name: "Invincible-class",
    category: "Sea",
    year: 1980,
    country: "United Kingdom",
    difficulty: "hard",
    image: "invincible_class.jpg",
    aliases: ["Invincible", "R05"]
  },
  {
    id: 218,
    name: "Ticonderoga-class Cruiser",
    category: "Sea",
    year: 1983,
    country: "United States",
    difficulty: "medium",
    image: "ticonderoga_class_cruiser.jpg",
    aliases: ["Ticonderoga", "CG-47"]
  },
  {
    id: 219,
    name: "Krivak-class Frigate",
    category: "Sea",
    year: 1969,
    country: "Russia",
    difficulty: "hard",
    image: "krivak_class_frigate.jpg",
    aliases: ["Krivak"]
  },
  {
    id: 220,
    name: "Knox-class Frigate",
    category: "Sea",
    year: 1969,
    country: "United States",
    difficulty: "hard",
    image: "knox_class_frigate.jpg",
    aliases: ["Knox"]
  },
  {
    id: 221,
    name: "Oliver Hazard Perry-class",
    category: "Sea",
    year: 1977,
    country: "United States",
    difficulty: "hard",
    image: "oliver_hazard_perry_class.jpg",
    aliases: ["OHP", "Perry-class"]
  },
  {
    id: 222,
    name: "Los Angeles-class Submarine",
    category: "Sea",
    year: 1976,
    country: "United States",
    difficulty: "medium",
    image: "los_angeles_class_submarine.jpg",
    aliases: ["Los Angeles", "SSN-688"]
  },
  {
    id: 223,
    name: "Alfa-class Submarine",
    category: "Sea",
    year: 1977,
    country: "Russia",
    difficulty: "hard",
    image: "alfa_class_submarine.jpg",
    aliases: ["Alfa", "Project 705"]
  },
  {
    id: 224,
    name: "M14 Rifle",
    category: "Infantry",
    year: 1959,
    country: "United States",
    difficulty: "medium",
    image: "m14_rifle.jpg",
    aliases: ["M14"]
  },
  {
    id: 225,
    name: "L1A1 SLR",
    category: "Infantry",
    year: 1954,
    country: "United Kingdom",
    difficulty: "hard",
    image: "l1a1_slr.jpg",
    aliases: ["L1A1", "FN FAL"]
  },
  {
    id: 226,
    name: "CETME Model L",
    category: "Infantry",
    year: 1987,
    country: "Spain",
    difficulty: "hard",
    image: "cetme_model_l.jpg",
    aliases: ["Model L", "CETME L"]
  },
  {
    id: 227,
    name: "Vz. 58",
    category: "Infantry",
    year: 1959,
    country: "Czechoslovakia",
    difficulty: "hard",
    image: "vz58.jpg",
    aliases: ["Vz 58", "Sa vz. 58"]
  },
  {
    id: 228,
    name: "RPK",
    category: "Infantry",
    year: 1961,
    country: "Russia",
    difficulty: "medium",
    image: "rpk.jpg",
    aliases: ["Ruchnoy Pulemyot Kalashnikova"]
  },
  {
    id: 229,
    name: "M60 Machine Gun",
    category: "Infantry",
    year: 1957,
    country: "United States",
    difficulty: "medium",
    image: "m60_machine_gun.jpg",
    aliases: ["M60", "M60 GPMG"]
  },
  {
    id: 230,
    name: "M72 LAW",
    category: "Infantry",
    year: 1963,
    country: "United States",
    difficulty: "medium",
    image: "m72_law.jpg",
    aliases: ["LAW", "M72"]
  },
  {
    id: 231,
    name: "Carl Gustaf",
    category: "Infantry",
    year: 1948,
    country: "Sweden",
    difficulty: "medium",
    image: "carl_gustaf.jpg",
    aliases: ["Carl Gustaf M1", "M48"]
  },
  {
    id: 232,
    name: "M1A2 SEP v3",
    category: "Land",
    year: 2020,
    country: "United States",
    difficulty: "hard",
    image: "m1a2_sep_v3.jpg",
    aliases: ["M1A2 SEP", "Abrams SEP v3"]
  },
  {
    id: 233,
    name: "Type 96B",
    category: "Land",
    year: 2016,
    country: "China",
    difficulty: "hard",
    image: "type_96b.jpg",
    aliases: ["ZTZ-96B"]
  },
  {
    id: 234,
    name: "VT-4",
    category: "Land",
    year: 2017,
    country: "China",
    difficulty: "hard",
    image: "vt4.jpg",
    aliases: ["MBT-3000"]
  },
  {
    id: 235,
    name: "Altay",
    category: "Land",
    year: 2023,
    country: "Turkey",
    difficulty: "hard",
    image: "altay.jpg",
    aliases: ["Altay tank"]
  },
  {
    id: 236,
    name: "ZTZ-96",
    category: "Land",
    year: 1997,
    country: "China",
    difficulty: "hard",
    image: "ztz96.jpg",
    aliases: ["Type 96"]
  },
  {
    id: 237,
    name: "ZBL-08",
    category: "Land",
    year: 2009,
    country: "China",
    difficulty: "hard",
    image: "zbl08.jpg",
    aliases: ["VN1", "Type 08"]
  },
  {
    id: 238,
    name: "KF41 Lynx",
    category: "Land",
    year: 2018,
    country: "Germany",
    difficulty: "hard",
    image: "kf41_lynx.jpg",
    aliases: ["Lynx IFV", "KF41"]
  },
  {
    id: 239,
    name: "J-20",
    category: "Air",
    year: 2017,
    country: "China",
    difficulty: "medium",
    image: "j20.jpg",
    aliases: ["Chengdu J-20"]
  },
  {
    id: 240,
    name: "Su-57",
    category: "Air",
    year: 2020,
    country: "Russia",
    difficulty: "medium",
    image: "su57.jpg",
    aliases: ["Felon", "PAK FA"]
  },
  {
    id: 241,
    name: "H-6N",
    category: "Air",
    year: 2019,
    country: "China",
    difficulty: "hard",
    image: "h6n.jpg",
    aliases: ["H-6N"]
  },
  {
    id: 242,
    name: "Bayraktar TB2",
    category: "Air",
    year: 2014,
    country: "Turkey",
    difficulty: "medium",
    image: "bayraktar_tb2.jpg",
    aliases: ["TB2", "Bayraktar"]
  },
  {
    id: 243,
    name: "Type 075 LHD",
    category: "Sea",
    year: 2021,
    country: "China",
    difficulty: "hard",
    image: "type_075_lhd.jpg",
    aliases: ["Yushen-class", "Type 075"]
  },
  {
    id: 244,
    name: "HMS Glasgow",
    category: "Sea",
    year: 2024,
    country: "United Kingdom",
    difficulty: "hard",
    image: "hms_glasgow.jpg",
    aliases: ["Type 26", "Glasgow frigate"]
  },
  {
    id: 245,
    name: "Fujian",
    category: "Sea",
    year: 2022,
    country: "China",
    difficulty: "medium",
    image: "fujian.jpg",
    aliases: ["Type 003", "CV-18"]
  },
  {
    id: 246,
    name: "INS Arighaat",
    category: "Sea",
    year: 2024,
    country: "India",
    difficulty: "hard",
    image: "ins_arighaat.jpg",
    aliases: ["Arighaat", "S4"]
  },
  {
    id: 247,
    name: "MCX Spear",
    category: "Infantry",
    year: 2023,
    country: "United States",
    difficulty: "hard",
    image: "mcx_spear.jpg",
    aliases: ["SIG MCX Spear", "XM7"]
  },
  {
    id: 248,
    name: "QBZ-191",
    category: "Infantry",
    year: 2019,
    country: "China",
    difficulty: "hard",
    image: "qbz191.jpg",
    aliases: ["Type 191", "QBZ"]
  },
  {
    id: 249,
    name: "CZ Bren 2",
    category: "Infantry",
    year: 2015,
    country: "Czech Republic",
    difficulty: "hard",
    image: "cz_bren_2.jpg",
    aliases: ["Bren 2"]
  },
  {
    id: 250,
    name: "M320 Grenade Launcher",
    category: "Infantry",
    year: 2009,
    country: "United States",
    difficulty: "hard",
    image: "m320_grenade_launcher.jpg",
    aliases: ["M320"]
  },
  {
    id: 251,
    name: "IWI Tavor X95",
    category: "Infantry",
    year: 2009,
    country: "Israel",
    difficulty: "medium",
    image: "tavor_x95.jpg",
    aliases: ["Tavor", "X95", "MTAR-21"]
  },
  {
    id: 252,
    name: "IWI Negev NG7",
    category: "Infantry",
    year: 2012,
    country: "Israel",
    difficulty: "hard",
    image: "negev_ng7.jpg",
    aliases: ["Negev", "NG7"]
  },
  {
    id: 253,
    name: "IWI Uzi Pro",
    category: "Infantry",
    year: 2010,
    country: "Israel",
    difficulty: "hard",
    image: "uzi_pro.jpg",
    aliases: ["Uzi Pro", "Micro Uzi Pro"]
  },
  {
    id: 254,
    name: "INSAS Rifle",
    category: "Infantry",
    year: 1998,
    country: "India",
    difficulty: "medium",
    image: "insas_rifle.jpg",
    aliases: ["INSAS", "Indian Small Arms System"]
  },
  {
    id: 255,
    name: "ASMI SMG",
    category: "Infantry",
    year: 2021,
    country: "India",
    difficulty: "hard",
    image: "asmi_smg.jpg",
    aliases: ["ASMI"]
  },
  {
    id: 256,
    name: "Beretta ARX-160",
    category: "Infantry",
    year: 2008,
    country: "Italy",
    difficulty: "medium",
    image: "beretta_arx160.jpg",
    aliases: ["ARX-160", "Beretta ARX"]
  },
  {
    id: 257,
    name: "Benelli M4",
    category: "Infantry",
    year: 1999,
    country: "Italy",
    difficulty: "medium",
    image: "benelli_m4.jpg",
    aliases: ["Benelli M4 Super 90", "M1014"]
  },
  {
    id: 258,
    name: "CZ Scorpion EVO 3",
    category: "Infantry",
    year: 2009,
    country: "Czech Republic",
    difficulty: "medium",
    image: "cz_scorpion_evo3.jpg",
    aliases: ["Scorpion EVO 3", "EVO 3"]
  },
  {
    id: 259,
    name: "CZ 805 BREN",
    category: "Infantry",
    year: 2009,
    country: "Czech Republic",
    difficulty: "hard",
    image: "cz_805_bren.jpg",
    aliases: ["CZ 805", "Bren 2"]
  },
  {
    id: 260,
    name: "MSBS Grot",
    category: "Infantry",
    year: 2017,
    country: "Poland",
    difficulty: "hard",
    image: "msbs_grot.jpg",
    aliases: ["Grot", "MSBS"]
  },
  {
    id: 261,
    name: "UKM-2000",
    category: "Infantry",
    year: 2000,
    country: "Poland",
    difficulty: "hard",
    image: "ukm_2000.jpg",
    aliases: ["UKM-2000P", "UKM"]
  },
  {
    id: 262,
    name: "Fort-221",
    category: "Infantry",
    year: 2008,
    country: "Ukraine",
    difficulty: "hard",
    image: "fort_221.jpg",
    aliases: ["Fort 221", "TAR-21 Ukraine"]
  },
  {
    id: 263,
    name: "Zbroyar Z-10",
    category: "Infantry",
    year: 2014,
    country: "Ukraine",
    difficulty: "hard",
    image: "zbroyar_z10.jpg",
    aliases: ["Z-10", "Zbroyar"]
  },
  {
    id: 264,
    name: "STAR Z-84",
    category: "Infantry",
    year: 1984,
    country: "Spain",
    difficulty: "hard",
    image: "star_z84.jpg",
    aliases: ["Z-84"]
  },
  {
    id: 266,
    name: "MPT-76",
    category: "Infantry",
    year: 2014,
    country: "Turkey",
    difficulty: "medium",
    image: "mpt_76.jpg",
    aliases: ["MPT", "MPT-55"]
  },
  {
    id: 267,
    name: "JNG-90",
    category: "Infantry",
    year: 2008,
    country: "Turkey",
    difficulty: "hard",
    image: "jng_90.jpg",
    aliases: ["JNG-90 Bora", "Bora sniper"]
  },
  {
    id: 268,
    name: "Vektor R4",
    category: "Infantry",
    year: 1980,
    country: "South Africa",
    difficulty: "hard",
    image: "vektor_r4.jpg",
    aliases: ["R4", "Vektor R5"]
  },
  {
    id: 269,
    name: "NTW-20",
    category: "Infantry",
    year: 1995,
    country: "South Africa",
    difficulty: "hard",
    image: "ntw_20.jpg",
    aliases: ["NTW", "Denel NTW-20"]
  },
  {
    id: 270,
    name: "Milkor MGL",
    category: "Infantry",
    year: 1981,
    country: "South Africa",
    difficulty: "hard",
    image: "milkor_mgl.jpg",
    aliases: ["MGL", "Multiple Grenade Launcher"]
  },
  {
    id: 271,
    name: "IMBEL MD97",
    category: "Infantry",
    year: 1997,
    country: "Brazil",
    difficulty: "hard",
    image: "imbel_md97.jpg",
    aliases: ["MD97", "IMBEL"]
  },
  {
    id: 272,
    name: "Taurus PT92",
    category: "Infantry",
    year: 1983,
    country: "Brazil",
    difficulty: "medium",
    image: "taurus_pt92.jpg",
    aliases: ["PT92", "Taurus"]
  },
  {
    id: 273,
    name: "F88 Austeyr",
    category: "Infantry",
    year: 1988,
    country: "Australia",
    difficulty: "medium",
    image: "f88_austeyr.jpg",
    aliases: ["Austeyr", "F88"]
  },
  {
    id: 274,
    name: "EF88",
    category: "Infantry",
    year: 2016,
    country: "Australia",
    difficulty: "hard",
    image: "ef88.jpg",
    aliases: ["Enhanced F88", "Lithgow EF88"]
  },
  {
    id: 275,
    name: "C8 Carbine",
    category: "Infantry",
    year: 1994,
    country: "Canada",
    difficulty: "medium",
    image: "c8_carbine.jpg",
    aliases: ["C8", "Colt Canada C8"]
  },
  {
    id: 276,
    name: "PGW LRT-3",
    category: "Infantry",
    year: 2005,
    country: "Canada",
    difficulty: "hard",
    image: "pgw_lrt3.jpg",
    aliases: ["LRT-3", "PGW Defence"]
  },
  {
    id: 277,
    name: "Sako TRG",
    category: "Infantry",
    year: 2000,
    country: "Finland",
    difficulty: "hard",
    image: "sako_trg.jpg",
    aliases: ["TRG-42", "TRG-22", "Sako"]
  },
  {
    id: 278,
    name: "SIG SG 550",
    category: "Infantry",
    year: 1990,
    country: "Switzerland",
    difficulty: "hard",
    image: "sig_sg550.jpg",
    aliases: ["SG 550", "Sturmgewehr 90", "SIG"]
  },
  {
    id: 279,
    name: "FN P90",
    category: "Infantry",
    year: 1990,
    country: "Belgium",
    difficulty: "medium",
    image: "fn_p90.jpg",
    aliases: ["P90", "Project 90"]
  },
  {
    id: 280,
    name: "FN Five-seven",
    category: "Infantry",
    year: 1998,
    country: "Belgium",
    difficulty: "hard",
    image: "fn_fiveseven.jpg",
    aliases: ["Five-seven", "FN 5-7"]
  },
  {
    id: 281,
    name: "Eurocopter Tiger",
    category: "Air",
    year: 2003,
    country: "European Consortium",
    difficulty: "hard",
    image: "eurocopter_tiger.jpg",
    aliases: ["Tiger", "EC 665"]
  },
  {
    id: 282,
    name: "NH90",
    category: "Air",
    year: 2007,
    country: "European Consortium",
    difficulty: "hard",
    image: "nh90.jpg",
    aliases: ["NHIndustries NH90"]
  },
  {
    id: 283,
    name: "Mi-8 Hip",
    category: "Air",
    year: 1967,
    country: "Russia",
    difficulty: "medium",
    image: "mi8_hip.jpg",
    aliases: ["Mi-8", "Hip", "Mi-17"]
  },
  {
    id: 284,
    name: "AH-1Z Viper",
    category: "Air",
    year: 2000,
    country: "United States",
    difficulty: "medium",
    image: "ah1z_viper.jpg",
    aliases: ["AH-1Z", "Viper", "SuperCobra"]
  },
  {
    id: 285,
    name: "Rooivalk",
    category: "Air",
    year: 1998,
    country: "South Africa",
    difficulty: "hard",
    image: "rooivalk.jpg",
    aliases: ["Denel Rooivalk"]
  },
  {
    id: 286,
    name: "T-129 ATAK",
    category: "Air",
    year: 2014,
    country: "Turkey",
    difficulty: "medium",
    image: "t129_atak.jpg",
    aliases: ["T129", "ATAK"]
  },
  {
    id: 287,
    name: "HAL Dhruv",
    category: "Air",
    year: 2002,
    country: "India",
    difficulty: "hard",
    image: "hal_dhruv.jpg",
    aliases: ["Dhruv", "ALH"]
  },
  {
    id: 288,
    name: "LCH Prachand",
    category: "Air",
    year: 2022,
    country: "India",
    difficulty: "hard",
    image: "lch_prachand.jpg",
    aliases: ["LCH", "Prachand"]
  },
  {
    id: 289,
    name: "KAI Surion",
    category: "Air",
    year: 2013,
    country: "South Korea",
    difficulty: "hard",
    image: "kai_surion.jpg",
    aliases: ["Surion", "KUH-1"]
  },
  {
    id: 290,
    name: "AW159 Wildcat",
    category: "Air",
    year: 2014,
    country: "United Kingdom",
    difficulty: "hard",
    image: "aw159_wildcat.jpg",
    aliases: ["Wildcat", "Lynx Wildcat"]
  },
  {
    id: 291,
    name: "AW101 Merlin",
    category: "Air",
    year: 2000,
    country: "United Kingdom",
    difficulty: "medium",
    image: "aw101_merlin.jpg",
    aliases: ["Merlin", "EH101"]
  },
  {
    id: 292,
    name: "CH-53 Sea Stallion",
    category: "Air",
    year: 1966,
    country: "United States",
    difficulty: "medium",
    image: "ch53_sea_stallion.jpg",
    aliases: ["CH-53", "Sea Stallion"]
  },
  {
    id: 293,
    name: "AS565 Panther",
    category: "Air",
    year: 1986,
    country: "France",
    difficulty: "hard",
    image: "as565_panther.jpg",
    aliases: ["Panther", "Dauphin"]
  },
  {
    id: 294,
    name: "MQ-1 Predator",
    category: "Air",
    year: 1995,
    country: "United States",
    difficulty: "medium",
    image: "mq1_predator.jpg",
    aliases: ["Predator", "RQ-1"]
  },
  {
    id: 295,
    name: "RQ-4 Global Hawk",
    category: "Air",
    year: 2001,
    country: "United States",
    difficulty: "hard",
    image: "rq4_global_hawk.jpg",
    aliases: ["Global Hawk"]
  },
  {
    id: 296,
    name: "Hermes 450",
    category: "Air",
    year: 2003,
    country: "Israel",
    difficulty: "medium",
    image: "hermes_450.jpg",
    aliases: ["Hermes"]
  },
  {
    id: 297,
    name: "Heron TP",
    category: "Air",
    year: 2010,
    country: "Israel",
    difficulty: "hard",
    image: "heron_tp.jpg",
    aliases: ["Heron", "Eitan"]
  },
  {
    id: 298,
    name: "TAI Anka",
    category: "Air",
    year: 2013,
    country: "Turkey",
    difficulty: "medium",
    image: "tai_anka.jpg",
    aliases: ["Anka", "Anka-S"]
  },
  {
    id: 299,
    name: "KUS-FS",
    category: "Air",
    year: 2021,
    country: "South Korea",
    difficulty: "hard",
    image: "kus_fs.jpg",
    aliases: ["KUS-FS", "Mongoose"]
  },
  {
    id: 300,
    name: "Fotros",
    category: "Air",
    year: 2013,
    country: "Iran",
    difficulty: "hard",
    image: "fotros.jpg",
    aliases: ["Iranian Fotros", "Fotros UAV"]
  },
  {
    id: 301,
    name: "C-17 Globemaster III",
    category: "Air",
    year: 1995,
    country: "United States",
    difficulty: "medium",
    image: "c17_globemaster_iii.jpg",
    aliases: ["C-17", "Globemaster"]
  },
  {
    id: 302,
    name: "A400M Atlas",
    category: "Air",
    year: 2013,
    country: "European Consortium",
    difficulty: "hard",
    image: "a400m_atlas.jpg",
    aliases: ["A400M", "Atlas"]
  },
  {
    id: 303,
    name: "C-2 Kawasaki",
    category: "Air",
    year: 2016,
    country: "Japan",
    difficulty: "hard",
    image: "c2_kawasaki.jpg",
    aliases: ["C-2", "Kawasaki C-2"]
  },
  {
    id: 304,
    name: "Embraer KC-390",
    category: "Air",
    year: 2019,
    country: "Brazil",
    difficulty: "hard",
    image: "embraer_kc390.jpg",
    aliases: ["KC-390", "Millennium"]
  },
  {
    id: 305,
    name: "BAE Hawk",
    category: "Air",
    year: 1976,
    country: "United Kingdom",
    difficulty: "medium",
    image: "bae_hawk.jpg",
    aliases: ["Hawk", "T1 Hawk"]
  },
  {
    id: 306,
    name: "Arjun Mk1",
    category: "Land",
    year: 2004,
    country: "India",
    difficulty: "hard",
    image: "arjun_mk1.jpg",
    aliases: ["Arjun", "MBT Arjun"]
  },
  {
    id: 307,
    name: "K21",
    category: "Land",
    year: 2009,
    country: "South Korea",
    difficulty: "medium",
    image: "k21.jpg",
    aliases: ["K21 IFV", "NIFV"]
  },
  {
    id: 308,
    name: "K1A2",
    category: "Land",
    year: 1998,
    country: "South Korea",
    difficulty: "hard",
    image: "k1a2.jpg",
    aliases: ["K1A1", "K1 tank"]
  },
  {
    id: 309,
    name: "Sabra",
    category: "Land",
    year: 2007,
    country: "Turkey",
    difficulty: "hard",
    image: "sabra.jpg",
    aliases: ["Sabra Mk II", "M60T"]
  },
  {
    id: 310,
    name: "Tulpar",
    category: "Land",
    year: 2014,
    country: "Turkey",
    difficulty: "hard",
    image: "tulpar.jpg",
    aliases: ["Tulpar IFV"]
  },
  {
    id: 311,
    name: "Kaplan MT",
    category: "Land",
    year: 2017,
    country: "Turkey",
    difficulty: "hard",
    image: "kaplan_mt.jpg",
    aliases: ["Kaplan", "Harimau"]
  },
  {
    id: 312,
    name: "PL-01",
    category: "Land",
    year: 2018,
    country: "Poland",
    difficulty: "hard",
    image: "pl01.jpg",
    aliases: ["PL-01", "PL-01 Concept"]
  },
  {
    id: 313,
    name: "Borsuk",
    category: "Land",
    year: 2023,
    country: "Poland",
    difficulty: "hard",
    image: "borsuk.jpg",
    aliases: ["Borsuk IFV"]
  },
  {
    id: 314,
    name: "Krab",
    category: "Land",
    year: 2012,
    country: "Poland",
    difficulty: "medium",
    image: "krab.jpg",
    aliases: ["AHS Krab"]
  },
  {
    id: 315,
    name: "BTR-4 Bucephalus",
    category: "Land",
    year: 2009,
    country: "Ukraine",
    difficulty: "hard",
    image: "btr4_bucephalus.jpg",
    aliases: ["BTR-4", "Bucephalus"]
  },
  {
    id: 316,
    name: "Patria AMV",
    category: "Land",
    year: 2004,
    country: "Finland",
    difficulty: "medium",
    image: "patria_amv.jpg",
    aliases: ["AMV", "Patria"]
  },
  {
    id: 317,
    name: "Type 16 MCV",
    category: "Land",
    year: 2016,
    country: "Japan",
    difficulty: "medium",
    image: "type_16_mcv.jpg",
    aliases: ["Type 16", "MCV"]
  },
  {
    id: 318,
    name: "Type 89 IFV",
    category: "Land",
    year: 1989,
    country: "Japan",
    difficulty: "hard",
    image: "type_89_ifv.jpg",
    aliases: ["Type 89", "FV"]
  },
  {
    id: 319,
    name: "Strv 103",
    category: "Land",
    year: 1967,
    country: "Sweden",
    difficulty: "medium",
    image: "strv_103.jpg",
    aliases: ["S-Tank", "Stridsvagn 103"]
  },
  {
    id: 320,
    name: "B1 Centauro",
    category: "Land",
    year: 1991,
    country: "Italy",
    difficulty: "medium",
    image: "b1_centauro.jpg",
    aliases: ["Centauro"]
  },
  {
    id: 321,
    name: "Freccia",
    category: "Land",
    year: 2002,
    country: "Italy",
    difficulty: "hard",
    image: "freccia.jpg",
    aliases: ["Freccia IFV", "VBM Freccia"]
  },
  {
    id: 322,
    name: "Centauro II",
    category: "Land",
    year: 2020,
    country: "Italy",
    difficulty: "hard",
    image: "centauro_ii.jpg",
    aliases: ["Centauro 2", "VBM Centauro II"]
  },
  {
    id: 323,
    name: "EE-9 Cascavel",
    category: "Land",
    year: 1974,
    country: "Brazil",
    difficulty: "medium",
    image: "ee9_cascavel.jpg",
    aliases: ["Cascavel"]
  },
  {
    id: 324,
    name: "LAV III",
    category: "Land",
    year: 1999,
    country: "Canada",
    difficulty: "medium",
    image: "lav_iii.jpg",
    aliases: ["LAV III", "Kodiak"]
  },
  {
    id: 325,
    name: "Bushmaster PMV",
    category: "Land",
    year: 1997,
    country: "Australia",
    difficulty: "medium",
    image: "bushmaster_pmv.jpg",
    aliases: ["Bushmaster", "PMV"]
  },
  {
    id: 326,
    name: "Rooikat",
    category: "Land",
    year: 1989,
    country: "South Africa",
    difficulty: "medium",
    image: "rooikat.jpg",
    aliases: ["Rooikat AFV"]
  },
  {
    id: 327,
    name: "G6 Rhino",
    category: "Land",
    year: 1988,
    country: "South Africa",
    difficulty: "medium",
    image: "g6_rhino.jpg",
    aliases: ["G6", "Rhino", "G6 SPG"]
  },
  {
    id: 328,
    name: "MIM-104 Patriot",
    category: "Land",
    year: 1984,
    country: "United States",
    difficulty: "medium",
    image: "mim104_patriot.jpg",
    aliases: ["Patriot", "MIM-104"]
  },
  {
    id: 329,
    name: "Iron Dome",
    category: "Land",
    year: 2011,
    country: "Israel",
    difficulty: "medium",
    image: "iron_dome.jpg",
    aliases: ["Iron Dome", "Kippat Barzel"]
  },
  {
    id: 330,
    name: "Pantsir-S1",
    category: "Land",
    year: 2003,
    country: "Russia",
    difficulty: "medium",
    image: "pantsir_s1.jpg",
    aliases: ["Pantsir", "SA-22 Greyhound"]
  },
  {
    id: 331,
    name: "Wasp-class",
    category: "Sea",
    year: 1989,
    country: "United States",
    difficulty: "medium",
    image: "wasp_class.jpg",
    aliases: ["Wasp", "LHD-1"]
  },
  {
    id: 332,
    name: "America-class",
    category: "Sea",
    year: 2014,
    country: "United States",
    difficulty: "hard",
    image: "america_class.jpg",
    aliases: ["America", "LHA-6"]
  },
  {
    id: 333,
    name: "Dokdo-class",
    category: "Sea",
    year: 2007,
    country: "South Korea",
    difficulty: "medium",
    image: "dokdo_class.jpg",
    aliases: ["Dokdo", "LPH-6111"]
  },
  {
    id: 334,
    name: "Mistral-class",
    category: "Sea",
    year: 2006,
    country: "France",
    difficulty: "medium",
    image: "mistral_class.jpg",
    aliases: ["Mistral", "BPC"]
  },
  {
    id: 335,
    name: "Juan Carlos I",
    category: "Sea",
    year: 2010,
    country: "Spain",
    difficulty: "hard",
    image: "juan_carlos_i.jpg",
    aliases: ["Juan Carlos", "L-61"]
  },
  {
    id: 336,
    name: "Canberra-class",
    category: "Sea",
    year: 2014,
    country: "Australia",
    difficulty: "hard",
    image: "canberra_class.jpg",
    aliases: ["Canberra", "L02"]
  },
  {
    id: 337,
    name: "Makassar-class",
    category: "Sea",
    year: 2007,
    country: "Indonesia",
    difficulty: "hard",
    image: "makassar_class.jpg",
    aliases: ["Makassar", "LPD"]
  },
  {
    id: 338,
    name: "Albion-class",
    category: "Sea",
    year: 2003,
    country: "United Kingdom",
    difficulty: "hard",
    image: "albion_class.jpg",
    aliases: ["Albion", "L14"]
  },
  {
    id: 339,
    name: "Osumi-class",
    category: "Sea",
    year: 1998,
    country: "Japan",
    difficulty: "medium",
    image: "osumi_class.jpg",
    aliases: ["Osumi", "LST-4001"]
  },
  {
    id: 340,
    name: "FREMM",
    category: "Sea",
    year: 2006,
    country: "European Consortium",
    difficulty: "medium",
    image: "fremm.jpg",
    aliases: ["FREMM", "European Multi-Mission Frigate"]
  },
  {
    id: 341,
    name: "La Fayette-class",
    category: "Sea",
    year: 1996,
    country: "France",
    difficulty: "medium",
    image: "lafayette_class.jpg",
    aliases: ["La Fayette", "FLF"]
  },
  {
    id: 342,
    name: "Formidable-class",
    category: "Sea",
    year: 2007,
    country: "Singapore",
    difficulty: "hard",
    image: "formidable_class.jpg",
    aliases: ["Formidable", "RSS Formidable"]
  },
  {
    id: 343,
    name: "Anzac-class",
    category: "Sea",
    year: 1996,
    country: "Australia",
    difficulty: "medium",
    image: "anzac_class.jpg",
    aliases: ["Anzac", "FFH"]
  },
  {
    id: 344,
    name: "Halifax-class",
    category: "Sea",
    year: 1992,
    country: "Canada",
    difficulty: "hard",
    image: "halifax_class.jpg",
    aliases: ["Halifax", "FFH 330"]
  },
  {
    id: 345,
    name: "Hydra-class",
    category: "Sea",
    year: 1992,
    country: "Greece",
    difficulty: "hard",
    image: "hydra_class.jpg",
    aliases: ["Hydra", "MEKO 200HN"]
  },
  {
    id: 346,
    name: "Barbaros-class",
    category: "Sea",
    year: 1997,
    country: "Turkey",
    difficulty: "medium",
    image: "barbaros_class.jpg",
    aliases: ["Barbaros", "MEKO 200T"]
  },
  {
    id: 347,
    name: "Sovremenny-class",
    category: "Sea",
    year: 1980,
    country: "Russia",
    difficulty: "medium",
    image: "sovremenny_class.jpg",
    aliases: ["Sovremenny", "Project 956"]
  },
  {
    id: 348,
    name: "Kolkata-class",
    category: "Sea",
    year: 2014,
    country: "India",
    difficulty: "medium",
    image: "kolkata_class.jpg",
    aliases: ["Kolkata", "Project 15A"]
  },
  {
    id: 349,
    name: "Shivalik-class",
    category: "Sea",
    year: 2010,
    country: "India",
    difficulty: "hard",
    image: "shivalik_class.jpg",
    aliases: ["Shivalik", "Project 17"]
  },
  {
    id: 350,
    name: "Talwar-class",
    category: "Sea",
    year: 2003,
    country: "India",
    difficulty: "medium",
    image: "talwar_class.jpg",
    aliases: ["Talwar", "Project 11356"]
  },
  {
    id: 351,
    name: "TAM",
    category: "Land",
    year: 1979,
    country: "Argentina",
    difficulty: "medium",
    image: "tam.jpg",
    aliases: ["Tanque Argentino Mediano"]
  },
  {
    id: 352,
    name: "IA-58 Pucará",
    category: "Air",
    year: 1969,
    country: "Argentina",
    difficulty: "medium",
    image: "ia58_pucara.jpg",
    aliases: ["Pucará", "FMA IA-58"]
  },
  {
    id: 353,
    name: "IA-63 Pampa",
    category: "Air",
    year: 1988,
    country: "Argentina",
    difficulty: "hard",
    image: "ia63_pampa.jpg",
    aliases: ["Pampa", "FMA IA-63"]
  },
  {
    id: 354,
    name: "ARA General Belgrano",
    category: "Sea",
    year: 1951,
    country: "Argentina",
    difficulty: "medium",
    image: "ara_general_belgrano.jpg",
    aliases: ["General Belgrano", "ARA Belgrano"]
  },
  {
    id: 355,
    name: "Su-25 Frogfoot",
    category: "Air",
    year: 1981,
    country: "Russia",
    difficulty: "medium",
    image: "su25_frogfoot.jpg",
    aliases: ["Su-25", "Frogfoot"]
  },
  {
    id: 356,
    name: "MiG-31 Foxhound",
    category: "Air",
    year: 1981,
    country: "Russia",
    difficulty: "medium",
    image: "mig31_foxhound.jpg",
    aliases: ["MiG-31", "Foxhound"]
  },
  {
    id: 357,
    name: "Su-24 Fencer",
    category: "Air",
    year: 1974,
    country: "Russia",
    difficulty: "medium",
    image: "su24_fencer.jpg",
    aliases: ["Su-24", "Fencer"]
  },
  {
    id: 358,
    name: "Tu-22M Backfire",
    category: "Air",
    year: 1972,
    country: "Russia",
    difficulty: "medium",
    image: "tu22m_backfire.jpg",
    aliases: ["Tu-22M", "Backfire"]
  },
  {
    id: 359,
    name: "An-225 Mriya",
    category: "Air",
    year: 1988,
    country: "Russia",
    difficulty: "easy",
    image: "an225_mriya.jpg",
    aliases: ["Mriya", "Antonov An-225"]
  },
  {
    id: 360,
    name: "An-124 Ruslan",
    category: "Air",
    year: 1986,
    country: "Russia",
    difficulty: "medium",
    image: "an124_ruslan.jpg",
    aliases: ["Ruslan", "Antonov An-124"]
  },
  {
    id: 361,
    name: "Mi-26 Halo",
    category: "Air",
    year: 1983,
    country: "Russia",
    difficulty: "medium",
    image: "mi26_halo.jpg",
    aliases: ["Halo", "Mi-26"]
  },
  {
    id: 362,
    name: "Su-30 Flanker-C",
    category: "Air",
    year: 1996,
    country: "Russia",
    difficulty: "medium",
    image: "su30_flanker_c.jpg",
    aliases: ["Su-30", "Flanker-C"]
  },
  {
    id: 363,
    name: "Su-34 Fullback",
    category: "Air",
    year: 2014,
    country: "Russia",
    difficulty: "medium",
    image: "su34_fullback.jpg",
    aliases: ["Su-34", "Fullback"]
  },
  {
    id: 364,
    name: "Ka-50 Black Shark",
    category: "Air",
    year: 1995,
    country: "Russia",
    difficulty: "medium",
    image: "ka50_black_shark.jpg",
    aliases: ["Black Shark", "Ka-50"]
  },
  {
    id: 365,
    name: "Yak-38 Forger",
    category: "Air",
    year: 1976,
    country: "Russia",
    difficulty: "hard",
    image: "yak38_forger.jpg",
    aliases: ["Yak-38", "Forger"]
  },
  {
    id: 366,
    name: "Tu-16 Badger",
    category: "Air",
    year: 1954,
    country: "Russia",
    difficulty: "medium",
    image: "tu16_badger.jpg",
    aliases: ["Tu-16", "Badger"]
  },
  {
    id: 367,
    name: "JF-17 Thunder",
    category: "Air",
    year: 2007,
    country: "Pakistan",
    difficulty: "medium",
    image: "jf17_thunder.jpg",
    aliases: ["JF-17", "Thunder"]
  },
  {
    id: 368,
    name: "MOWAG Piranha",
    category: "Land",
    year: 1972,
    country: "Switzerland",
    difficulty: "medium",
    image: "mowag_piranha.jpg",
    aliases: ["Piranha"]
  },
  {
    id: 369,
    name: "L-39 Albatros",
    category: "Air",
    year: 1968,
    country: "Czech Republic",
    difficulty: "medium",
    image: "l39_albatros.jpg",
    aliases: ["L-39", "Albatros"]
  },
  {
    id: 370,
    name: "HAL Tejas",
    category: "Air",
    year: 2015,
    country: "India",
    difficulty: "medium",
    image: "hal_tejas.jpg",
    aliases: ["Tejas", "LCA"]
  },
  {
    id: 371,
    name: "Glock 17",
    category: "Infantry",
    year: 1982,
    country: "Austria",
    difficulty: "easy",
    image: "glock_17.jpg",
    aliases: ["Glock", "G17"]
  },
  {
    id: 372,
    name: "Saab 35 Draken",
    category: "Air",
    year: 1960,
    country: "Sweden",
    difficulty: "medium",
    image: "saab35_draken.jpg",
    aliases: ["Draken", "J 35"]
  },
  {
    id: 373,
    name: "Mirage III",
    category: "Air",
    year: 1961,
    country: "France",
    difficulty: "medium",
    image: "mirage_iii.jpg",
    aliases: ["Mirage 3"]
  },
  {
    id: 374,
    name: "KAI FA-50",
    category: "Air",
    year: 2010,
    country: "South Korea",
    difficulty: "medium",
    image: "kai_fa50.jpg",
    aliases: ["FA-50", "Golden Eagle"]
  },
  {
    id: 375,
    name: "Bionix AFV",
    category: "Land",
    year: 1997,
    country: "Singapore",
    difficulty: "hard",
    image: "bionix_afv.jpg",
    aliases: ["Bionix"]
  },
  {
    id: 376,
    name: "HESA Saeqeh",
    category: "Air",
    year: 2006,
    country: "Iran",
    difficulty: "hard",
    image: "hesa_saeqeh.jpg",
    aliases: ["Saeqeh"]
  },
  {
    id: 377,
    name: "ASCOD AFV",
    category: "Land",
    year: 2002,
    country: "Spain",
    difficulty: "hard",
    image: "ascod_afv.jpg",
    aliases: ["ASCOD"]
  },
  {
    id: 378,
    name: "AMOS mortar system",
    category: "Land",
    year: 2013,
    country: "Finland",
    difficulty: "hard",
    image: "amos_mortar_system.jpg",
    aliases: ["AMOS"]
  }
];
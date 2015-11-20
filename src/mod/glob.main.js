//require("interact");
var Storage = require("tfw.storage").local;
var Glass = require("glob.glass");


var ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var LEVELS = "CZ2BV7F26V6I25Y9P28V9X2939Y2949Z2959O28UA729D6J25ZLX2JZA829E9N28TA929FAI29O9M28S9L28RAJ29P6K2608127HAT29ZCO2BK7R277CP2BLCQ2BMJ52HHCR2BN7Q2769W2926L261D02BW7H26XD12BX7G26WDA2C6DB2C77726NDL2CHIV2H7FR2ED6M2627626MFS2EEFT2EF7526LG22EO7426KG32EP6X26DIU2H66W26C6V26B6U26A6T269GD2EZ6N2639Z29WCZ2CVAI2AFD02CW7H27F9L29I9X29UD12CX7G27E8127Z6L26J7F27DA72A4DA2D6IV2IP772756I26G9N29KDB2D7AJ2AGDL2DH9P29MAT2AQFR2FM762749O29LCO2CK7R27PFS2FN6K26I75273FT2FOJ52IZA82A5G22FX742729Y29V6M26KCP2CLG32FYIU2IO6X26V6J26H6W26UCQ2CMLX2LQ6V26TA92A66U26SCR2CN6T26R7Q27O9M29J6N26L9W29TGD2G8G32FWCZ2CTCR2CMFS2FM9M29I9P29L6N26KD02CUCQ2CL9W29RAI2AB7H27B6T26P76271CP2CKFR2FL6U26Q6J26GA82A29L29H752706V26RDL2DD9X29S6I26FD12CV6W26SJ52IX7R27KFT2FN9N29J6K26H7G27A6L26ILX2LP9O29K6X26TIU2IN9Y29TCO2CJGD2G57Q27JA72A17F279DB2D4AT2ALDA2D3IV2IO6M26J772727426Z8127TAJ2AC9Z29UG22FVA92A36T366A7399DL3CCA83997G36Q6J35W7536G9N38P7R370CR3BI9Y38Z9P38P6W3666M35W6V3666K35W7H36Q7636G9O38P6X3666L35W7736G9Z38Z6N35W6U366A93999P39C6L3697636A6W36A6T3677736BA739A9Z39C6X36B6V3696N36BDL3CD7H36B6K368A839B6M36A9O39B9X38ZJ53HEAT39T7436GD13BS8137AIU3H4G23ELAJ39JFR3EBFT3EBGD3EVCP3BI9L38PCO3BIDB3C2IV3H47Q370FS3EB7F36QCZ3BSLX3JXG33ELAI39J9M399DA3CC6I366D03CC9W399CQ3CC9Y39BCR3CD9W38Z7G36A75369D03BSCQ3BI6I35W6J3679N39ADA3C29M38P7R36B6U368A939CIV3IFFS3FDFR3FCFT3FECP3CB7Q36AJ53IFG23FD9X39ADB3CDD13CDAJ39C9L398IU3IEG33FEAT39CCO3CA74368CZ3CBGD3FE7F3698136BAI39BLX3LGIV4H6AI49KCZ4BTDB4C4CP4BK8147B9O48RIU4H5D14BV7446HGD4EWG24EM9X491LX4JYAT49U7Q471AJ49LJ54HFCO4BJ6K45YG34ENFR4ECFS4ED9L48QFT4EE7F46RA74796T43XA844IDL4AL9O4976K465DA4AB6I43N9W46ZD047A9M43YCQ4496W46Q9W48XD04BQ9M48O6I45VCQ4BHDA4BZCR4BJ7R4757G46U7546J9Y4919N48Q6J45X9X4489L46PLX4IXFR4CTCO49R6K46FIU4FVG34AC9O49HDB4CB74467FS4FBD14CAGD4FDG24FCCP4C9FT4FBAJ49AIV4IDCZ4CAAT49B7F4687Q469AI49A8146AJ54IEFR4FB9L4976K45Z9X4989O48TIU4IDCR49VLX4LF9N46S6J43PCO4C9G34FC9Y44B9M46R7R4697G4689O46TCQ49U754679W449DA44U6K43Q9M4979W498CQ4C9DA4CB7546I7G46S7R472CO460G343LFR48TLX4EF9L437IU4BMJ5495GD43VG246CFT43BCZ43JFS462CP439IV48V9Y4986J4657646K9N497CR4C9CO4BFG34EILX4JRFR4E79L48N9X48YIU4GZ7746L764677G46C6V46P7R46N754616X46R6L45Z6I43OD047C6N4619P48S7646J7H46V9Z4926K45XD147D9O48QDB44V7746I6L45Y6L43R6V467FS4E96X469GD4EUCZ4BR6N4607H46RFT4EAIV4H1CP4BHG24EJJ54HB9P48R9Z4906M45Z774706I465D04CA6L46G6L4657F46BAJ48V8146X7Q46MAI48U74460AT495774677R47N754716M46G7G47CAT49W7Q4747446I8147F6N46I7F46T7H479AJ49M9P49I9Z49RAI49L6L46F9N49H6J46F9Y49SCR4CJD144J6W468DB47K774739P48U7H46T9Z4936N462DL4C36J45Y9P49J9N48SD14CT9Y492CR4BMDB4D39Z49T6N46J7H47DA848R6T45XA7490J54G56L460CZ4A1G24D3GD4DDCP470FS4A26M461IV4D4FT47BCO4BGIU4H09L48OG34EKFR4E8LX4JS9P49H6N46H6X46PCZ4C1FS4ETCP4BRGD4F4IV4HVFT4EKJ54I5G24F3D14BTDB4C37746K7446F9P497FS4CVG24ADCP49TAI49H7H46881479AT49R7Q46ZJ54DF7F46PAJ49IGD47W6M46HFT4CWIV4FX6N465CZ47B9Z498A74976T465A8498DL4C99X44AIU4FWLX4IYFR4CU6M460G34AE9L46QCO49S9W490CQ4BL9O49I9M48R6K46G9X48QDA4C377463G24EHJ54H9FS4E87445YCP4BGCZ4BPFT4E9GD4ER81461AJ48S7Q460AI491IV4H06M43S7F45ZAT492CR58V9X49R9Y53K6J5377646Z9N561AI47J814517F44HAJ44SAT47T744477Q44R6L46H7H46DD04BU6I45X6M465764726N43T9X4909Z44C9P46U7646HCQ59R7F47B9M56P6M46IAT4AN74470AI4ACDA54T7Q47M8147X9W548AJ4ADD056CD14BR6I53676462DB4C0LX4L6CO4C09L48YIU4I4G34EUFR4F2765686X567DL5D36T56FA859IA759R7655YDB4BTD14BJ7R56T7556R7756TDB5C96M53AG257JFT54J9P563CP548CZ56BJ55BXLX5H7D157BG3595CO58S6N5689X53JFS5BMIU5EEGD56NIV5EFFR5BLDB5ACCQ5BR9Z53LAT5996N53B9M58YAJ5999W59HDA5CT9L55Z6N53NDB5CK6K5387H569765656N5699X5976V5657655W7F5677755WDB54TJ55DE7656S815697Q568IV5FV6K5669O5627456P9O5409Y5716J53OCR54A9N53ZCP5C0G25FLFT5ETGD554FS57BCZ54JDB53VIV5AD9O56P9N56PAI598CR59R9Y5487755Y6J53NFT5CTJ55ANCP59R74566G25ACD15C1CQ58U9W53I9M5606M53RDA53U9L53Y7R56G7H5667555W7G566CP5497555Y7R56I7F56Z6L53QD157ACO570G354ULX5G6IU5D4FR5A2FR54HFT54KD156DIU54R7Q56ILX5518156SCO547G357K8156Q7Q56G7R66KAI58S756606M5686K53PJ55IN756657R6679Y68Y6X6659N68NCR6BF7R66L7565ZAI5A2J557T6V65W6L566FT5BN6L5396K53N6M567FS5CT7R6737566HCR6CL9Y69R6T65WG257L9N69IAT5ABAJ59S9P5986M53NCP58T6L5676J666CZ5CJ9P56P9Y66ZCR6499N63Y7455W7H5659O5989Z597GD5FV9Y68X9L53X9N68OCR6BHCZ57A6L53N9Z5729O66Q9Z59977569AI58PCR6BS9N68Z7F5669Y69J9X5706J65V9P541G25947666P6K65V8156T7Q56S7566P7R66R9P599775666T65V7456QGD57V6N53SDL6BZ75649A868OA768X9Z5486X85W7Q5798157JAT58Z6L65XAJ58P6M66FFS54IIV54S9P66QAJ5A3AT5A37R67L9Z66ZD15C97566ZFS5F27666F7R6636M65Y6M65XAI5A19P63Y7766FIV5I46L65V9O68NGD5ALCZ5796N66F9P68N9P68O75739A768PDL6BICO6BPA868Z6K63O6M63PCQ6BG8166D7465X9O6907664A6N66A6M6696L63PCQ6CK9X68X9O68O7H65W7Q66K9O63Y9X68ND16BP776659P68Q7F65XA8797DB6CT77662766707Q67K77661FT6EJ8166VLX6G5IU6D37766JFR6A1G364S9Z649AT6A27665XAJ6A18167V9P6916K6677Q66J6N63QA7798DL7CB7H66P6N65Y9M68N7666IAJ68UAT6939Z6479W6388165ZDB64R9Y78OCR7BZ6L668CO66ZCP6BQAT6986N65ZAJ697AI68Y7R7607F66GD16CJ8166PDA63K6L63O7H667J56BN9N76R7F66H7665Z6N66G77660816709M69HCZ6619Z68P9P69K7766PFS67AAI697766607465Z9N78YIV6GZ75748DB6AB7766ZAI68T9Z68XD16CBGD6517R77B8167D9W78OJ56ALDA7BHDA7BT9Z68YG36F2DA7BPLX6K1FR6EH76661IU6H97764B8166J7R7667Q6679P66R9Y799IV6INCR7CC7Q66QCQ79T9O69J6N63RDB6CU9W78Q7F6659N7997Q66HCP6BF776717R75WAJ68O7Q672GD6FL7Q6629X66ZAI68Q7Q66F7R75Y9X69H6M63Q9M7989L68X8166R7Q65Y9Z69S76747CQ748CZ64H9Z69K75747AI67K75766DB63BCR79U9Y749DA74R7776RAI68ZA888PAT68XDL87T9M73XA784HCQ7BF9O78YAT6539M78X7Q66RAI68RFS6FL74648AJ68RCR7CAFT6FMFS6E79Y79ADB6BI9O799746657R84TIV6HA7465VD16BFA788QCP6CJDL8BT7R871G26F1G268U9N798AI68N9Y79HCR7BR9M76Q6N65X7F75Y6M73O777477774A9W7979X69ID16BI9N78X7773B9W78Y7R861816687585X9X647GD66DDA7C99Z79H9N83XAT6909X68P6N7667673A7R8659Y88RAI63ACR8C3FT6E8DA7C19N8907R87J9W7479W78N777689O73X7H86GAI69I74738AJ67L7F76F9Z74AA788Z76766DL8C2AT79KAI69S7R86PAJ763DB6BP6N73P7R86JDA8BID16799W88P9N86Q7R8799Z770J56HT9O79ACQ7CBA898X9P78YAT73L9M88Z7H95YCO7BZ9Y88P7586Q6M766CO7BQ9O73Z7586FG37FBCQ7BZDB6BZ6M75VCZ6C99N88RAT79S7R862CQ86Z6N75V7Q76P7676Q9X799A798O9P78ZDB7BG6N767CO7BH9Y890FS6EI9Y84ADL9BHCQ8C081766IU7I3LX7L5A799H9Y88SCR89SCZ7BGFT7F1AI762G37ESDA8C075968CR8BL767497Q75W9P740AJ790IV6AC9P76TDL9CTCZ7BQG37EAFR7F17685VCR86Z9P73XGD7EHAJ78Y9M88Q9Y88Q7785X817609O76S9P79A9Z79BAJ798CP7CA9M938CQ8BQJ57HAIV7HUGD7EACR8C0817657595V7R93B7Q7669O891DA8BS81767D17A19P79BFT7CVGD7EM7F85W9M93ZAJ79HAT7527F85V7686RDB7C1IV7H3A7A8N77849CZ7BJ81771AJ7919O88XAT78RAT79H9Z79A7Q765AJ77JCR971CP747J57HCIU7HULX7KW768489Y98NAI74SDB7CA9X88RAT7976N83ODA87J7Q75ZGD7ETFR7ESCZ7C09N9407786H7785Z9N939FT7FDDLABP7786SFR7EACP7BP7R94SGD7F19X88OJ57I3CQ8707R94R9P88XG37EBIV7H97R968CZ7BZAT891FT74I9Z88QG27EKDB7CCCR948CP7BZDLBCACR973GD7ELFS7ES9Z89ICQ8C2DB7BKCR970CQ8BKDA9CJCQ8BPIU7H3LX7JW7Q77AG37EJFT7E7G27E78176ZAJ8AB7785V9Z84B9P86SAI74RIV7HJCQ947D17BQG27FBAJ88QAJ88ZFR8EI9O88ZFT7ERD17C0CO838CP79SAT88S9Y93ACR963J57H57RA6HFR8619O88SGD7ES7RA6QGD77T7RA7ADB7BFJ57HLG27ECLX8BN9Y997IU88U9O86RFS7EHIV7H2GD7FB9X849CO8488186IG38ABFS7FCCZ7BHDB74S769697Q84SCZ7BIFS7EJCQ962G27E8AI8999Z8918186GDB7BRAT88P9P8908185XCZ7BF9Z88OJ57GZFR8E99O93A9X939DLC518185WAT851CQ972G27ES9O9417RA6ZG27EIJ57HKAT89JIV7HL9Z88T7Q85XLX8JVIU8HKFS7EA7RA5ZCRAC19P83ZFS7ERDA9CAJ57DDIU8H2DLCBJ9YA47LX8DD7Q85VCP8C1D18BGFR87A7796QFR879CP8BJIU8ABG27AB779489Z88SGD7E9LX8DEG38EHDAABGAT83BCZ8397796AFS74HCRABGIV74R9P892GD7FCLX8KMG383BAJ98N9P88TFT8A1IV7IE9P93B8186HGD7F3CQACJ9Z98RCRACKDB8BQCP86ZDLCBS9YA9I7Q861IV7FWFS7CU9P942DB8BJAI88ODLDBGIU8ACJ57ID7Q93AFT8EHGD8ECAT98YDAA4SJ57HDJ57H0G284R9YB70FT8EDAT98OAI89R9Z93BFT879D184I7RB6AAJ99B8195YFR94IFT8A2CP961DAABRGD8EJG39E8G28EBIU962AI890G283KAT99I7RB5VDLDCJLX9KVCRABQCP9719Z98NAJ98XAJ97KFR9ERJ58H1DLEBFJ58HUJ5852GD853GD83LCZ84IAT98NAT98QAJ94RIV863FT8EIIU9HTG284SAT9A1AT98TG394T8196FAJ99RIU97KDABBJDAB3AIV8HBG28E981A5VG28F2IV8I5CQBCALX98VLX9AMIV8I3FR939DB8BUCQB71DABBFFT8F4FT8F2J586DDB8BSCRBCB9ZA9JCQCBSIV87KFS879GD87UDB84UGD8EBAT99ACQCC1CQCBJFS83ACRB72CQC9S7RC5XGD8E7FS8F3G28ETCQD4ACQD3AAIA8X9ZB717RC6FG294TDB8BHAJAA2AJA9KFS84JCRCBPIV8HT7RC6SFT94HFS8F1G2962G3AETCRCC2GD8EKJ58HVG3A7JAJA92G3BF1DB93LCRCBKFS8ECFS98UIUBHAJ583LCRCBTCRC9TFT9A4G29ERG293AFS9A1FT97AIUBH1FT98VCRD3BLXBJUIV87LCRD47J58I4IUB7JJ5853G297KIV87JFS9A3AJC8TGD963AJC9TCRD4BAJD4TIV8H5J58H4IUCHJAJD3BLXBKCFTAESJ598VLXBALIV83BIV94TIUC3ADBACJIUC4SG2AEAIV9BNFTAFLLXCKLLXC63FTBFCFTBA3GD93BLXC7TLXCK2DBB7JJ593BIV9HKLXC7UIV9D3J597VJ597ULXCJTFTCEUFTCF3FTCCUJ59AMLXD3BJ5951LXDKBFTCECGDA52FTD63FTD7CIV9D5IV9ABLXD52GDAE8J5AHJJ5AH2GDBF2J5A63J5BH3";

var glasses = {};
var stages =
    [0, 168, 280, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1570, 1637];


var state = {src: null, dst: null};
var currentLevel = null;

/**
 * Just a shortcut for `getElementById()`.
 */
function $(id) {
    var e = window.document.getElementById(id);
    if (!e) {
        console.error("Unable to find element with this id: \"" + id + "\"");
    }
    return e;
}

function tag(name, attribs, styles) {
    if (typeof attribs === 'undefined') attribs = {};
    if (typeof styles === 'undefined') styles = {};
    var e = document.createElement(name);
    var key, val;
    for (key in attribs) {
        val = attribs[key];
        e.setAttribute(key, val);
    }
    for (key in styles) {
        val = styles[key];
        e.style[key] = val;
    }
    return e;
}

function div(attribs, styles) {
    return tag("div", attribs, styles);
}

function show(id) {
    location.hash = '/book/' + id;
};

function updateLevelsList() {
    var container = document.getElementById("levels");
    container.innerHTML = "";
    var msg, btn, activated, stage;
    for (stage = 0 ; stage < stages.length ; stage++) {
        activated = (stage <= Storage.get("stage", 0));
        btn = tag("button");
        btn.className = "level";
        btn.textContent = stage + 1;
        if (!activated) {
            btn.setAttribute("disabled", "true");
        } else {
            btn.addEventListener(
                "click",
                (function(j) {
                    return function() {
                        initLevel(j);
                    };
                })(stage),
                false
            );
        }
        container.appendChild(btn);
        if (!activated) {
            msg = div();
            msg.textContent = "Pour activer un nouveau niveau, vous devez totaliser 100 points !";
            container.appendChild(msg);
            msg = div();
            msg.innerHTML = "Votre score actuel : <b>" + Storage.get("score", 0) + "</b>";
            container.appendChild(msg);
            break;
        }
    }
}

function initLevel(stage) {
    console.log("Current stage: ", stage);
    $('game-bar-face').className = 'svg-sobre';
    var ok = stage == Storage.get("stage", 0);
    var levelNumber = Math.min(
        LEVELS.length  / 5 - 1,
        stages[stage] + Math.floor(Math.random() * (stages[stage + 1] - stages[stage]))
    );
    console.log("Current level: ", levelNumber);
    var level = parseLevel(levelNumber);
    // Mélanger les verres.
    var k1, k2, tmp;
    for (k1 = 0 ; k1 < 3 ; k1++) {
        k2 = Math.floor(Math.random() * 3);
        if (k1 != k2) {
            ["target", "current", "capacity"].forEach(
                function(category) {
                    tmp = level[category][k1];
                    level[category][k1] = level[category][k2];
                    level[category][k2] = tmp;
                }
            );
        }
    }
    level.ok = ok;
    currentLevel = level;
    state = {
        src: null,
        dst: null
    };
    // Create the three glasses.
    ["A", "B", "C"].forEach(function(glass, idxGlass) {
        var id = 'glass-' + glass;
        var container = $(id);
        container.innerHTML = '';
        var glassSVG = new Glass(
            level.capacity[idxGlass],
            0,
            level.target[idxGlass]
        );
        glassSVG.appendTo(container);
        glasses[glass] = glassSVG;
    });

    updateLevelDisplay(level);
    $("info").innerHTML = "Essayez de trouver la solution en <b>" + level.best + "</b> coups !";
    show("game");
}

function parseLevel(levelNumber) {
    var code = LEVELS.substr(levelNumber * 5, 5);
    var digits = decode(code);
    var numberInit = digits[0] * ALPHABET.length + digits[1];
    var steps = digits[2];
    var numberTarget = digits[3] * ALPHABET.length + digits[4];
    var init0 = numberInit % 10;
    numberInit = (numberInit - init0) / 10;
    var init1 = numberInit % 10;
    var init2 = (numberInit - init1) / 10;
    var target0 = numberTarget % 10;
    numberTarget = (numberTarget - target0) / 10;
    var target1 = numberTarget % 10;
    var target2 = (numberTarget - target1) / 10;
    return {
        capacity: [init2, init1, init0],
        current: [init2, init1, init0],
        target: [target2, target1, target0],
        steps: 0,
        best: steps
    };
}

function decode(code) {
    var c, arr = [];
    for (var i = 0 ; i < code.length ; i++) {
        c = code.charAt(i);
        arr.push(ALPHABET.indexOf(c));
    }
    return arr;
}

function updateLevelDisplay(level) {
    var categories = ["current", "capacity", "target"];
    ["A", "B", "C"].forEach(function(glass, idxGlass) {
        glasses[glass].content(level.current[idxGlass]);
    });
    $("info").innerHTML = level.steps + " / " + level.best;
}

/**
 * If `srcIdx` == `dstIdx` we have to empty the glass `srcIdx`.
 * Otherwise, we have to transfert the content of `srcIdx` into `dstIdx`.
 * When  we  empty a  glass,  that  means  that the  bartender  drinks
 * it. Then, he gets drunker.
 */
function move(srcIdx, dstIdx) {
    console.log("Move", srcIdx, dstIdx);
    var level = currentLevel;
    if (srcIdx == dstIdx) {
        level.current[srcIdx] = 0;
        makeBartenderDrunker();
    } else {
        var v = Math.min(level.current[srcIdx], level.capacity[dstIdx] - level.current[dstIdx]);
        if (v == 0) return;
        level.current[srcIdx] -= v;
        level.current[dstIdx] += v;
    }
    level.steps++;
    updateLevelDisplay(level);
    var i, ok = 0;
    for (i = 0 ; i < 3 ; i++) {
        if (level.current[i] == level.target[i]) ok++;
    }
    if (ok == 3) {
        var msg = "";
        if (level.ok) {
            if (level.steps > level.best) {
                msg += "Bravo ! Vous gagnez 3 points.<br/>";
                Storage.set("score", Storage.get("score", 0) + 3);
            } else {
                msg += "Excellent ! Vous gagnez 10 points.<br/>";
                Storage.set("score", Storage.get("score", 0) + 10);
            }
            if (Storage.get("score", 0) > 99) {
                Storage.set("score", 0);
                Storage.set("stage", Storage.get("stage", 0) + 1);
                msg += "Vous venez de débloquer un nouveau niveau !!";
            }
        } else {
            if (level.steps > level.best) {
                msg += "Bravo !<br/>";
            } else {
                msg += "Excellent !<br/>";
            }
        }
        $("info").innerHTML = "<big>" + msg + "</big>";
        var screen = div();
        screen.className = "full-screen";
        var slot = function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            document.body.removeChild(screen);
            updateLevelsList();
            show("level-selection");
        };
        document.body.appendChild(screen);
        screen.addEventListener("touchstart", slot, false);
        screen.addEventListener("mousedown", slot, false);
    }
}

function makeBartenderDrunker() {
    var bartender = $('game-bar-face');
    switch (bartender.className) {
    case 'svg-sobre':
        bartender.className = 'svg-mitige';
        break;
    case 'svg-mitige':
        bartender.className = 'svg-fait';
        break;        
    }
}


updateLevelsList();

["A", "B", "C"].forEach(
    function(id) {
        var e = $('glass-' + id);
        interact(e)
            .draggable({
                inertia: true,
                onmove: function(event) {
                    var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                    // update the position attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            })
            .on("dragstart", function(evt) {
                console.log("start", evt);
                e.className = "show";
            })
            .on("dragend", function(evt) {
                console.log("end", evt);
                e.className = "";
                evt.target.style.webkitTransform =
                    evt.target.style.transform =
                    'translate(0px,0px)';
                evt.target.setAttribute('data-x', 0);
                evt.target.setAttribute('data-y', 0);
            })
            .dropzone({
                overlap: .2,
                ondrop: function (evt) {
                    var srcId = evt.relatedTarget.getAttribute("id").substr(6, 1);
                    var dstId = evt.target.getAttribute("id").substr(6, 1);
                    move("ABC".indexOf(srcId), "ABC".indexOf(dstId));
                }
            });
    }
);

interact("#glass-0")
    .dropzone({
        ondrop: function(evt) {
            var srcId = evt.relatedTarget.getAttribute("id").substr(6, 1);
            move("ABC".indexOf(srcId), "ABC".indexOf(srcId));
        }
    });


window.Main = {
    show: show
};

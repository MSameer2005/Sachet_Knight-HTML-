//chiave
let key = false;

//numero di oggetti (varia in base alla stanza)
let Nog;

//finire il gioco
let end_game = false;

//animazione
let animazione = false;

var interagibile = false;

//livello
var livello = 1;

//personaggio
var myGamePiece;

//puoi muoverti (per non far muovere il personaggio quando chiude gli occhi)
puoi = true;

//non far uscire il personaggio fuori dal bordo di gioco
let left = true;
let right = true;

//puoi andare a sinistra
let vai_s = false;

//contatori animazioni
let contd = 0;
let conts = 0;

//animazioni
let cambio = false;
let cambioS = false;

//mostra le interfacce quando è true
let hide_off = false;

//obiettivi per passare avanti con il livello 
let obiettivo1 = false;
let obiettivo2 = false;
let obiettivo3 = false;
let obiettivo4 = false;

var n_ob = 0;
const print_c = new Audio(src = "../Game/Audio/Next.mp3");
const print_d = new Audio(src = "../Game/Audio/ErrorSound.mp3");
var end_text = false;
var indice_caratteri = 0;
var tempo_;
var fine_s = false;
let next = true;
let indice_t = 0;
let for_no_missing_text = 0; //(="a capo"; )="'" ; ; 
let hai_premuto = false;

let text = '{"employees":[' +
    '{"Name":"Narratore","text":"Un dì, avvenne un fatto, una disgrazia ne fu macchiato l)onore del più nobile dei cavalieri, rinchiuso per un)accusa falsa./","scelta":"no","fine":"no","ending_game":"no"},' +
    '{"Name":"Sacchetto","text":"Un imbroglio, una truffa, sono stato incastrato ecco. (Ma non possono avermi scoperto, non sono (nemmeno colpevole, devo uscire di qui./","scelta":"no","fine":"no","ending_game":"no"},' +
    '{"Name":"Obiettivi","text":"(1-Guardati in giro(2-Guarda dall)uscio(3-Aspetta(4-Batti sulla porta/","scelta":"si","fine":"si","n_obiettivi":"4","ending_game":"no"},' +
    '{"Name":"Guardia","text":"Cosa? Dov)è finito?/","scelta":"no","fine":"no","ending_game":"no"},' +
    '{"Name":"Guardia","text":"MALEDIZIONE!!!!!!!!/","scelta":"no","fine":"no","ending_game":"si"},' +
    '{"Name":"Sacchetto","text":"Perfetto, sono fuori ed una guardia è bloccata nella mia cella.(Ora devo andare nell)anticamera e sarò fuori dalle segrete./","scelta":"no","fine":"si","ending_game":"no"}]}';

var obj = JSON.parse(text);

let passaggio_di_livello = false;

//per il testo
terminato = false;

//variabili per le animazioni
let finita = false;
let control = -1;
let cambia_direzione = false;
let visibile = true;
let time_animation;
let gh = 0;
let st = 0;

//VARIABILI capire cosa bisogna fare con l'interazione basandosi sul livello
let audio = new Audio(src = "../Game/Audio/toc_toc.mp3");
let h = 0;
hai_bussato = false;

//fermati per le animazioni
let animation_fermo = false;
//o uno o l'altro
let controllo = false;
//indentificatore di quale sia 
let n_indentifica = 0;

//eseguire solo una volta
let uno = true;

//oggetti nel gioco
let peppino;
let interagibili;

//le x degli oggetti interagibili
let x_temp;

//variabili della funzione svolgi compito
let haifatto = false;
let scritta;
let una_sola = true;
let v = 0;
let f = 0;
let g = 0;
let avanti_=false;

//capire quando è interagibile
let sei_arrivato = false;

//bottone interagisci
let premuto = false;

//cheat prossimo livello
function next_level_cheat() {
    livello++;
    passaggio_di_livello = true;
}

//sbloccare tutti gli obiettivi
function cheat_on() {
    obiettivo1 = true;
    obiettivo2 = true;
    obiettivo3 = true;
    obiettivo4 = true;
}

//scrivere
function scrivi() {

    if (end_text == true) {
        if (next == true && obj.employees[indice_t].fine != "si") {
            next = false;
            if (for_no_missing_text != 0) {
                indice_t++;
            } else {
                for_no_missing_text++;
            }
            end_text = false;
            if (obj.employees[indice_t].Name == "Obiettivi") {
                document.getElementById("Obiettivi").innerHTML = obj.employees[indice_t].Name + " : ";
                document.getElementById("Obiettivi").innerHTML += "<br>";
                n_ob = parseInt(obj.employees[indice_t].n_obiettivi);

            } else {
                document.getElementById("Text").innerHTML = obj.employees[indice_t].Name + " : ";
            }
        }
    } else {
        if (passaggio_di_livello == false) {
            if (obj.employees[indice_t].fine == "si") {
                terminato = true;
            } else {
                terminato = false;
            }
        } else {
            passaggio_di_livello = false;
            if (obj.employees[indice_t].ending_game == "no") {
                terminato = true;
            } else {
                end_game = true;
            }
        }

    }
    stampa_lenta();
}

//esempio per stampare un carattere alla volta: document.getElementById("demo").innerHTML = obj.name[0];
function stampa_lenta() {
    tempo_ = new Date(Date.now())
    if (end_text == false) {
        if (tempo_.getMilliseconds() >= 1 && obj.employees[indice_t].text[indice_caratteri] != '/' && next == false) {
            if (obj.employees[indice_t].Name == "Obiettivi") {
                if (obj.employees[indice_t].text[indice_caratteri] != '(' && obj.employees[indice_t].text[indice_caratteri] != ')') {
                    document.getElementById("Obiettivi").innerHTML += obj.employees[indice_t].text[indice_caratteri];
                } else {
                    if (obj.employees[indice_t].text[indice_caratteri] == ")") {
                        document.getElementById("Obiettivi").innerHTML += "'";
                    } else {
                        if (obj.employees[indice_t].text[indice_caratteri] == "(") {
                            document.getElementById("Obiettivi").innerHTML += "<br>";
                        }
                    }
                }
            } else {
                if (obj.employees[indice_t].text[indice_caratteri] != '(' && obj.employees[indice_t].text[indice_caratteri] != ')') {
                    document.getElementById("Text").innerHTML += obj.employees[indice_t].text[indice_caratteri];
                } else {
                    if (obj.employees[indice_t].text[indice_caratteri] == ")") {
                        document.getElementById("Text").innerHTML += "'";
                    } else {

                        if (obj.employees[indice_t].text[indice_caratteri] == "(") {
                            document.getElementById("Text").innerHTML += "<br>"
                        }
                    }
                }
            }
            indice_caratteri++;
        } else {
            indice_caratteri = 0;
            end_text = true;
        }
    } else {
        if (obj.employees[indice_t].scelta == "si" && uno) {
            //document.getElementById("Text").innerHTML += "<br>-----------------------------------"
            uno = false;
        }
    }
}

//pulsante per andare avanti con i dialoghi
function avanti() {
    if (next == false && end_text == true) {
        print_c.play();
        next = true;
    } else {
        print_d.play();
        setTimeout(2000);
    }
}

//game in avvio
function startGame() {
    myGamePiece = new component(/*150*/ 187, /*250*/ 312, src = "../Game/IMG/Frame/frame 1.png", 0, 625, "image");
    myGameArea.start();
}

//mostra le varie interazioni in base al livello
function mostra() {
    switch (livello) {
        case 1: {
            Nog = 1;
            peppino = new oggetto( 100,  50, src = "../Game/IMG/Util/nulla.png",  896,  315, "image");
            interagibili = new oggetto( 50,  50, src = "../Game/IMG/Util/nulla.png", 895,  315, "image");
            if (hide_off) {
                interagibili.image.src = "../Game/IMG/Util/rotella.png";
            } else {
                interagibili.image.src = "../Game/IMG/Util/nulla.png";
            }
        } break;
        case 2: {
            Nog = 2;
            peppino = new oggetto( 40,  40, src = "../Game/IMG/Util/nulla.png",  700,  425, "image");
            interagibili = new oggetto( 40,  40, src = "../Game/IMG/Util/nulla.png",  1270, 435, "image");
            if (hide_off) {
                peppino.image.src = "../Game/IMG/Util/rotella.png";
                interagibili.image.src = "../Game/IMG/Util/rotella.png";
            } else {
                interagibili.image.src = "../Game/IMG/Util/nulla.png";
                peppino.image.src = "../Game/IMG/Util/nulla.png";
            }
        } break;
        case 3: {
            Nog = 1;
            interagibili = new oggetto( 40,  40, src = "../Game/IMG/Util/nulla.png",  1185, 435, "image");
            peppino = new oggetto( 40,  40, src = "../Game/IMG/Util/nulla.png",  -1,  425, "image");
            if (hide_off) {
                interagibili.image.src = "../Game/IMG/Util/rotella.png";
            } else {
                interagibili.image.src = "../Game/IMG/Util/nulla.png";
            }
        } break;
        case 4: {
            Nog = 2;
            peppino = new oggetto( 40, 40, src = "../Game/IMG/Util/nulla.png", 235, 442, "image");
            interagibili = new oggetto( 40,  40, src = "../Game/IMG/Util/nulla.png",  1185,  600, "image");
            if(key){
                peppino = new oggetto( 40, 40, src = "../Game/IMG/Util/nulla.png", -1, 442, "image");
            }
            if (hide_off) {
                if(key==false){
                    peppino.image.src = "../Game/IMG/Util/rotella.png";
                }else{
                    peppino.image.src = "../Game/IMG/Util/nulla.png";
                    
                }
               
                interagibili.image.src = "../Game/IMG/Util/rotella.png";
            } else {
                interagibili.image.src = "../Game/IMG/Util/nulla.png";
                peppino.image.src = "../Game/IMG/Util/nulla.png";
            }
        } break;
        case 5: {
            Nog = 1;
            interagibili = new oggetto( 40,  40, src = "../Game/IMG/Util/nulla.png", 1160, 600, "image");
        } break;
    }
}

//per svolgere gli obbiettivi in base al livello
function svolgi_compito() {
    switch (livello) {
        case 1: {
            scrivi();
            if (puoi == true && animazione == false) {
                myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/cella1.png)";
            }
            if ((right == false || haifatto == true) && terminato == true && end_text && obiettivo1 == false && uno == false) {
                haifatto == true
                if (left == true && una_sola) {
                    obiettivo1 = true;
                    haifatto = false;
                    scritta = "1 - Sacchetto : E' una cella normale, la poca luce rende difficile distinguere la forma del muro,non c'è nulla all'interno.";
                    document.getElementById("Text").innerHTML += "<br>" + scritta;
                    terminato = false;
                }
            }
            if (obiettivo2 && v == 0 && end_text && terminato) {
                scritta = "2 - Sacchetto : non c'è nessuno.";
                document.getElementById("Text").innerHTML += "<br>" + scritta;
                v++;
            }
            fermo = new Date(Date.now());
            if (terminato && fermo.getMilliseconds() >= 500 && obiettivo3 == false) {
                obiettivo3 = true;
                scritta = "3 - non arriva nessuno";
                document.getElementById("Text").innerHTML += "<br>" + scritta;
            }
        } break;
        case 2: {
            if(avanti_==false){
                avanti_=true;
                next=true;
            }
            if (g == 0) {
                g++;
                myGamePiece = new component(187, 312, src = "../Game/IMG/Frame/frame 1.png", 420, 625, "image");
                obiettivo1 = false;
                obiettivo2 = false;
                obiettivo3 = false;
                obiettivo4 = false;
                document.getElementById("Text").innerHTML = "";
                document.getElementById("Obiettivi").innerHTML = "";
                v = 0;
            }
            scrivi();
            if (puoi == true && animazione == false) {
                myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/corridoio.png)";
                if (obiettivo1 && v == 0 && n_indentifica == 1) {
                    if (key != true) {
                        scritta = "Sacchetto : questa porta è chiusa a chiave.";
                        document.getElementById("Text").innerHTML = scritta;
                        v++;
                        haifatto = false;
                    }
                }
                if (obiettivo2 && haifatto == false && n_indentifica == 2) {
                    scritta = "Guardia : LIBERAMI SUBITO PRIGIONIERO!!!!!!";
                    document.getElementById("Text").innerHTML = scritta;
                    haifatto = true;
                    v = 0;
                }
            }
            if (right == false) {
                livello++;
                g = 0;
            }
        } break;
        case 3: {
            if (puoi == true && animazione == false) {
                myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/scala_a_pioli.png)";
            }
            if (left == false) {
                livello--;
                myGamePiece = new component(187, 312, src = "../Game/IMG/Frame/frame 1.png", 1400, 625, "image");
            }
            if (g == 0) {
                g++;
                myGamePiece = new component(187, 312, src = "../Game/IMG/Frame/frame 1.png", 50, 625, "image");
                v = 0;
            }
            scrivi();
        } break;
        case 4: {
            if (puoi == true && animazione == false) {
                if (key == true) {
                    myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/sopra_key_off.png)";
                } else {
                    myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/sopra_key_on.png)";
                }
            }
        } break;
        case 5: {
            if (puoi == true && animazione == false) {
                myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/cancello.png)";
                animazione = true;
            }
        } break;
    }
    mostra();
}

//crea l'area di gioco
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1625;
        this.canvas.height = 625;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

//creatore personaggi
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitLeft();
        this.hitRight();
        this.intervista();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.hitLeft = function () {
        if (this.x == 0) {
            this.x = 0;
            left = false;
        } else {
            left = true;
        }
    }
    this.hitRight = function () {
        if (this.x == /*1150*/ 1450) {
            this.x = /*1150*/ 1450;
            right = false;
        } else {
            right = true;
        }
    }
    this.animation = function () {
        if (/*this.x ==  1300*/(1300 - 100) < this.x && this.x < (1300 + 50)) {//(x_o - 100) < this.x && this.x < (x_o + 50)
            this.x = 1300;
            let animation_fermo = false;
        } else {
            let animation_fermo = true;
        }
    }
    this.intervista = function () {
        switch (Nog) {
            case 1: {
                x_temp = interagibili.x;
                if ((x_temp - 200) < this.x && this.x < x_temp) {
                    interagibile = true;
                } else {
                    interagibile = false;
                }
            } break;
            case 2: {
                if (controllo == false) {
                    x_temp = interagibili.x;
                    if ((x_temp - 200) < this.x && this.x < x_temp) {
                        n_indentifica = 1;
                        interagibile = true;
                    } else {
                        interagibile = false;
                        controllo = true;
                    }
                } else {
                    x_temp = peppino.x;
                    if ((x_temp - 200) < this.x && this.x < x_temp) {
                        n_indentifica = 2;
                        interagibile = true;

                    } else {
                        interagibile = false;
                        controllo = false;
                    }
                }
            } break;
        }
    }
}

//creatore oggetti
function oggetto(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

//cancella il movimento
function clearmove() {
    if (vai_s) {
        myGamePiece.image.src = "../Game/IMG/Frame/frame 1 s.png";
    } else {
        myGamePiece.image.src = "../Game/IMG/Frame/frame 1.png";
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

//pulsante per interagire
function Butt_Interagsci() {
    //interagibile = true;
    if (interagibile) {
        switch (livello) {
            case 1: {
                if (premuto == false) {
                    premuto = true;
                } else {
                    if (hide_off == false) {
                        premuto = false;
                    }
                }
                puoi = false;
                //imag_hide = true;

            } break;
            case 2: {
                if (premuto == false) {
                    premuto = true;
                    //porta chiusa: interagibili 1270,435   n_indentifica =1
                    if (n_indentifica == 1) {
                        if (interagibile == true) {
                            obiettivo1 = true;
                            if (key) {
                                livello = 5;
                            }
                            puoi = true;
                            premuto = false;
                        }
                    } else {
                        //porta chiusa (cavaliere): peppino 700,425     n_indentifica= 2
                        if (n_indentifica == 2) {
                            if (interagibile == true) {
                                obiettivo2 = true;
                                puoi = true;
                                premuto = false;
                            }
                        }
                    }
                } else {
                    if (hide_off == false) {
                        premuto = false;
                    }
                }
            } break;
            case 3: {
                //scala salita
                if (premuto == false) {
                    premuto = true;
                    livello++;
                    puoi = true;
                    premuto = false;
                } else {
                    if (hide_off == false) {
                        premuto = false;
                        //puoi = true;
                    }
                }
            } break;
            case 4: {
                //chiave   n_indentifica =1 peppino
                if (n_indentifica == 2) {
                    if (interagibile == true) {
                        premuto = false;
                        obiettivo3 = true;
                        key = true;
                        document.getElementById("Text").innerHTML = "hai trovato la chiave universale";
                        puoi = true;
                    }
                } else {
                    //scala n_indentifica= 2
                    if (n_indentifica == 1) {
                        if (interagibile == true) {
                            premuto = false;
                            obiettivo4 = true;
                            myGamePiece = new component(187, 312, src = "../Game/IMG/Frame/frame 1 s.png", 1085, 625, "image");
                            livello--;
                            puoi = true;

                        }
                    }
                }
            } break;
        }
    } else {
        puoi = true;
        //imag_hide = false;
    }
}

//capire cosa bisogna fare con l'interazione basandosi sul livello
function funzione() {
    switch (livello) {
        case 1: {
            if (obiettivo1 == true && obiettivo2 == true && obiettivo3 == true && h == 0) {
                //indice_t++;
                audio.play();
                h++;
                hai_bussato = true;
                premuto = false;
                animazione = true;
            } else {
                if (hai_bussato == false) {
                    myGameArea.canvas.style = "background-image:url(../Game/IMG/Ambiente/uscio.png)";
                    myGamePiece.image.src = "../Game/IMG/Util/nulla.png";

                    obiettivo2 = true;


                } else {
                    premuto = false;
                }
            }
        } break;
        case 5: {
            myGamePiece = new component(100, 100, src = "../Game/IMG/Frame/frame 1.png", 150, 625, "image");
            animazione = true;
        } break;
    }
}

//animazioni
function animazioni() {
    switch (livello) {
        case 1: {
            if (visibile) {
                //il personaggio va a destra
                starts = new Date(Date.now());
                if (starts.getMilliseconds() <= 700 && right == true && animation_fermo == false) {
                    if (cambio == true) {
                        myGamePiece.image.src = "../Game/IMG/Frame/frame 6.png";
                    } else {
                        myGamePiece.image.src = "../Game/IMG/Frame/frame 3.png";
                    }
                    myGamePiece.speedX = 5;
                    vai_s = false;
                    CamminataD();

                } else {
                    if (starts.getMilliseconds() > 900) {
                        //myGamePiece.image.src = "../Game/IMG/Frame/frame 1 s.png";
                        finita = true
                    }
                }
                if (finita) {
                    //animazione_cella_1_frame_0.png
                    if ((starts.getMilliseconds() >= 300) && (starts.getMilliseconds() <= 400) && control == -1) {
                        myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/animazione_cella_1_frame_0.png)";
                        control++;
                    }
                    //starts = new Date(Date.now());
                    if ((starts.getMilliseconds() >= 500) && (starts.getMilliseconds() <= 700) && control == 0) {
                        myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/animazione_cella_1_frame_1.png)";
                        control++;
                        next = true;
                        indice_t++;
                        starts = new Date(Date.now());
                    }
                    if ((starts.getMilliseconds() >= 300) && (starts.getMilliseconds() <= 400) && control == 1) {
                        myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/animazione_cella_1_frame_2.png)";
                        control++;
                    }
                    if ((starts.getMilliseconds() >= 500) && (starts.getMilliseconds()) && control == 2) {
                        myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/animazione_cella_1_frame_3.png)";
                        control++;
                        starts = new Date(Date.now());
                    }
                    if ((starts.getMilliseconds() >= 300) && (starts.getMilliseconds() <= 400) && control == 3) {
                        myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/animazione_cella_1_frame_4.png)";
                        control++;
                        cambia_direzione = true
                    }
                }
                if (cambia_direzione) {
                    if (interagibile != true && left == true && right == true && animation_fermo == false) {
                        if (cambio == true) {
                            myGamePiece.image.src = "../Game/IMG/Frame/frame 6 s.png";
                        } else {
                            myGamePiece.image.src = "../Game/IMG/Frame/frame 3 s.png";
                        }
                        myGamePiece.speedX = -5;
                        vai_s = false;
                        CamminataS();
                    } else {
                        visibile = false;
                    }
                }
            } else {

                starts = new Date(Date.now());
                myGamePiece.image.src = "../Game/IMG/Util/nulla.png";
                myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/animazione_cella_1_frame_5.png)";
                if (starts.getMilliseconds() >= 500) {
                    livello++;
                    let passaggio_di_livello = true;
                    animazione = false;
                    v = 0;
                    passaggio_di_livello = true;
                }

            }


        } break;
        case 5: {
            //creare il personaggio solo una volta 
            if (st == 0) {
                myGamePiece = new component(100, 100, src = "../Game/IMG/Frame/frame 1.png", 150, 625, "image");
                st++;
            }
            //specifiche animazione
            starts = new Date(Date.now());
            if (starts.getMilliseconds() <= 1400 && right == true && animation_fermo == false) {
                if (cambio == true) {
                    myGamePiece.image.src = "../Game/IMG/Frame/frame 6.png";
                } else {
                    myGamePiece.image.src = "../Game/IMG/Frame/frame 3.png";
                }
                myGamePiece.speedX = 5;
                vai_s = false;
                CamminataD();
                if (interagibile) {
                    myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/cancello_on.png)";
                } else {
                    myGameArea.canvas.style = "background-image: url(../Game/IMG/Ambiente/cancello.png)"
                }
            }

            if (right == false) {
                end_game = true;
            }

        } break;
    }

}

//spostamento personaggio
function updateGameArea() {
    if (end_game == false) {
        svolgi_compito();
        myGameArea.clear();
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;

        if (interagibile) {
            document.getElementById("Interagisci").innerHTML = "Interagibile";
        } else {
            document.getElementById("Interagisci").innerHTML = "Non Interagibile";
        }

        //interagibile_ver();
        if (animazione == false) {
            if (premuto) {
                funzione();
            }
            if (puoi == true && premuto == false) {

                if (myGameArea.keys && myGameArea.keys[65] && myGameArea.keys[68]) {
                    //per non buggare le animazioni 
                    if (vai_s == true) {
                        myGamePiece.image.src = "../Game/IMG/Frame/frame 1 s.png";
                    } else {
                        myGamePiece.image.src = "../Game/IMG/Frame/frame 1.png";
                    }
                } else {
                    //movimento a sinistra
                    if ((myGameArea.keys && myGameArea.keys[65]) && left == true) {
                        if (cambioS == true) {
                            myGamePiece.image.src = "../Game/IMG/Frame/frame 6 s.png";
                        } else {
                            myGamePiece.image.src = "../Game/IMG/Frame/frame 3 s.png";
                        }
                        myGamePiece.speedX = -5;
                        vai_s = true;
                        CamminataS();
                    } else {
                        clearmove();
                        //movimento a destra
                        if (myGameArea.keys && myGameArea.keys[68] && right == true) {
                            if (cambio == true) {
                                myGamePiece.image.src = "../Game/IMG/Frame/frame 6.png";
                            } else {
                                myGamePiece.image.src = "../Game/IMG/Frame/frame 3.png";
                            }
                            myGamePiece.speedX = 5;
                            vai_s = false;
                            CamminataD();
                        } else {
                            clearmove();
                        }
                    }
                }
            }
        } else {
            animazioni();
        }
        //chiudi gli occhi
        if (myGameArea.keys && myGameArea.keys[81] && premuto != true) {
            if (vai_s == true) {
                myGamePiece.image.src = "../Game/IMG/Frame/frame 20 s.png";
                hide_off = true;

            } else {
                myGamePiece.image.src = "../Game/IMG/Frame/frame 20.png";
                hide_off = true;
            }
            puoi = false;
        } else {
            puoi = true;
            hide_off = false;
        }
        myGamePiece.newPos();
        myGamePiece.update();
        interagibili.update();
        peppino.update();
    } else {
        myWindow = window.open("../Crediti/Crediti.html");
        end_game = false;
        livello = 4;
       
    }
}

//cambio di frame per il movimento a destra
function CamminataD() {
    startd = new Date(Date.now())
    if (startd.getMilliseconds() >= 500) {
        myGamePiece.image.src = "../Game/IMG/Frame/frame 4.png";
        contd++;
        if (contd % 2 == 0) {
            cambio = true;
        } else {
            cambio = false;
        }
    }
}

//cambio di frame per il movimento a sinistra
function CamminataS() {
    starts = new Date(Date.now())
    if (starts.getMilliseconds() >= 500) {
        myGamePiece.image.src = "../Game/IMG/Frame/frame 4 s.png";
        conts++;
        if (conts % 2 == 0) {
            cambioS = true;
        } else {
            cambioS = false;
        }
    }
}
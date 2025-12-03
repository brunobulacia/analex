import { Token } from "./token.js";
import { Cinta } from "./cinta.js";

export class Analex {
  #M; // Cinta
  #R; // Token
  #ac; // String
  #pos; // int - Posición de inicio del lexema del preanalisis(), calculado en el dt().
  //       Use Cinta.getPos() o sea pos=M.getPos();

  #tpc() {
    const tpc = [
      Token.VAR,
      Token.ARRAY,
      Token.VOID,
      Token.IF,
      Token.ELSE,
      Token.TO,
      Token.DO,
      Token.WHILE,
      Token.READLN,
      Token.PRINTLN,
      Token.UNTIL,
      Token.FALSE,
      Token.TRUE,
      Token.RETURN,
      Token.MAIN,
    ];

    const palabrasReservadas = [
      "var",
      "array",
      "void",
      "if",
      "else",
      "to",
      "do",
      "while",
      "readln",
      "println",
      "until",
      "false",
      "true",
      "return",
      "main",
    ];

    for (let i = 0; i < palabrasReservadas.length; i++) {
      if (this.#ac === palabrasReservadas[i]) {
        this.#R.set(tpc[i], 0);
        return;
      }
    }

    const tipos = [Token.CHAR, Token.BOOLEAN, Token.INTEGER];

    const palabrasTipos = ["char", "boolean", "integer"];

    for (let i = 0; i < palabrasTipos.length; i++) {
      if (this.#ac === palabrasTipos[i]) {
        this.#R.set(Token.TIPO, tipos[i]);
        return;
      }
    }

    const opLogicosDivMod = [
      Token.AND,
      Token.OR,
      Token.NOT,
      Token.MOD,
      Token.DIV,
    ];

    const lexemasOpLogicosDivMod = ["and", "or", "not", "mod", "div"];

    for (let i = 0; i < lexemasOpLogicosDivMod.length; i++) {
      if (this.#ac === lexemasOpLogicosDivMod[i]) {
        this.#R.set(opLogicosDivMod[i], 0);
        return;
      }
    }

    this.#R.set(Token.ID, -1);
  }

  constructor(codigo) {
    this.#M = new Cinta(codigo);
    this.#R = new Token();
    this.init();
  }

  init() {
    this.avanzar();
  }

  preanalisis() {
    return this.#R;
  }

  lexema() {
    return this.#ac;
  }

  pos() {
    return this.#pos;
  }

  avanzar() {
    this.#dt();
  }

  #dt() {
    let estado = 0;
    let cc;
    this.#ac = "";

    while (true) {
      cc = this.#M.cc();
      switch (estado) {
        case 0:
          if (this.#espacio(cc)) {
            this.#M.avanzar();
            estado = 0;
          } else if (this.#letra(cc)) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 1;
          } else if (this.#digito(cc)) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 2;
          } else if (cc === Cinta.COMILLA) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 5;
          } else if (Token.getNomToken(String.fromCharCode(cc)) !== -1) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 7;
          } else if (cc === Cinta.ADMIRACION) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 8;
          } else if (cc === Cinta.MENOR) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 11;
          } else if (cc === Cinta.MAYOR) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 15;
          } else if (cc === Cinta.IGUAL) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 18;
          } else if (cc === Cinta.DOSPUNTOS) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 21;
          } else if (cc === Cinta.PUNTO) {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 24;
          } else if (cc === Cinta.DIV) {
            this.#M.avanzar();
            estado = 26;
          } else if (cc == Cinta.EOF) {
            estado = 888;
          } else {
            this.#pos = this.#M.getPos();
            this.#ac = String.fromCharCode(cc);
            estado = 999; 
          }
          break;

        case 1:
          if (this.#letra(cc) || this.#digito(cc)) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 1;
          } else {
            estado = 3;
          }
          break;

        case 2:
          if (this.#digito(cc)) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 2;
          } else if (this.#letra(cc)) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 1;
          } else {
            estado = 4;
          }
          break;

        case 3:
          this.#tpc();
          return;

        case 4:
          this.#R.set(Token.NUM, Number(this.lexema()));
          return;

        case 5:
          if (cc !== Cinta.EOF && cc !== Cinta.EOLN && cc !== Cinta.COMILLA) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 5;
          } else if (cc === Cinta.COMILLA) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 6;
          } else {
            estado = 999;
          }
          break;

        case 6:
          this.#R.set(Token.STRINGctte, 0);
          return;

        case 7:
          this.#R.set(Token.getNomToken(this.#ac), 0);
          return;

        case 8:
          if (cc === Cinta.IGUAL) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 10;
          } else {
            estado = 9;
          }
          break;

        case 9:
          this.#R.set(Token.NOT, 0);
          return;

        case 10:
          this.#R.set(Token.OPREL, Token.DIS);
          return;

        case 11:
          if (cc === Cinta.IGUAL) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 12;
          } else if (cc === Cinta.MAYOR) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 13;
          } else {
            estado = 14;
          }
          break;

        case 12:
          this.#R.set(Token.OPREL, Token.MEI);
          return;

        case 13:
          this.#R.set(Token.OPREL, Token.DIS);
          return;

        case 14:
          this.#R.set(Token.OPREL, Token.MEN);
          return;

        case 15:
          if (cc === Cinta.IGUAL) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 16;
          } else {
            estado = 17;
          }
          break;

        case 16:
          this.#R.set(Token.OPREL, Token.MAI);
          return;

        case 17:
          this.#R.set(Token.OPREL, Token.MAY);
          return;

        case 18:
          if (cc === Cinta.IGUAL) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 19;
          } else {
            estado = 20;
          }
          break;

        case 19:
          this.#R.set(Token.OPREL, Token.IGUAL);
          return;

        case 20:
          this.#R.set(Token.ASSIGN, 0);
          return;

        case 21:
          if (cc === Cinta.IGUAL) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 22;
          } else {
            estado = 23;
          }
          break;

        case 22:
          this.#R.set(Token.ASSIGN, 0);
          return;

        case 23:
          this.#R.set(Token.DOSPUNTOS, 0);
          return;

        case 24:
          if (cc === Cinta.PUNTO) {
            this.#ac = this.#ac + String.fromCharCode(cc);
            this.#M.avanzar();
            estado = 25;
          } else {
            estado = 999;
          }
          break;

        case 25:
          this.#R.set(Token.DOTS, 0);
          return;

        case 26:
          if (cc === Cinta.DIV) {
            this.#M.avanzar();
            estado = 30;
          } else if (cc === Cinta.POR) {
            this.#M.avanzar();
            estado = 28;
          } else {
            estado = 27;
          }
          break;

        case 27:
          this.#R.set(Token.DIV, 0);
          return;

        case 28:
          if (cc !== Cinta.POR && cc !== Cinta.EOF) {
            this.#M.avanzar();
            estado = 28;
          } else if (cc === Cinta.POR) {
            this.#M.avanzar();
            estado = 29;
          } else {
            estado = 999;
          }
          break;

        case 29:
          if (cc === Cinta.DIV) {
            this.#M.avanzar();
            estado = 0;
          } else {
            estado = 28;
          }
          break;

        case 30:
          if (cc !== Cinta.EOLN && cc !== Cinta.EOF) {
            this.#M.avanzar();
            estado = 30;
          } else {
            estado = 0;
          }
        break;

        case 888:
          this.#R.set(Token.FIN, 0);
          return;

        case 999:
          this.#R.set(Token.ERROR, 0);
          return;
      }
    }
  }

  // Métodos auxiliares
  #espacio(cc) {
    const SPACE = 32;
    const TAB = 9;
    return cc === Cinta.EOLN || cc === SPACE || cc === TAB;
  }

  #digito(cc) {
    return 48 <= cc && cc <= 57; // '0' = 48, '9' = 57 en ASCII
  }

  #letra(cc) {
    // Convertir a mayúsculas y verificar si es una letra
    const ccUpper = String.fromCharCode(cc).toUpperCase().charCodeAt(0);
    return 65 <= ccUpper && ccUpper <= 90; // 'A' = 65, 'Z' = 90 en ASCII
  }
}

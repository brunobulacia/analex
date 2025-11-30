import { Token } from "./token.js";
import { Cinta } from "./cinta.js";

export class Analex {
    #M;      // Cinta
    #R;      // Token  
    #ac;     // String
    #pos;    // int - Posición de inicio del lexema del preanalisis(), calculado en el dt().
             //       Use Cinta.getPos() o sea pos=M.getPos();

    constructor(c) {
        this.#M = c;
        this.#R = new Token();
        this.init();
    }

    init() {
        this.#M.init();
        this.avanzar();  // Calcular el primer preanalisis.
    }

    preanalisis() {
        return this.#R;
    }

    lexema() {
        return this.#ac;
    }

    avanzar() {
        this.#dt();
    }

    #dt() {
        let estado = 0;
        this.#ac = "";
        while (true) {
            const cc = this.#M.cc();
            switch (estado) {
                case 0:
                 
            }
        }
    }

    resaltar() {  
        this.comunicate(this.#pos, this.lexema());
    }

    comunicate(pos, lexema) { 

    }

    // Métodos auxiliares
    #espacio(cc) {
        const SPACE = 32;
        const TAB = 9;
        return (cc === Cinta.EOLN || cc === SPACE || cc === TAB);
    }

    #digito(cc) {
        return (48 <= cc && cc <= 57);  // '0' = 48, '9' = 57 en ASCII
    }

    #letra(cc) {
        // Convertir a mayúsculas y verificar si es una letra
        const ccUpper = String.fromCharCode(cc).toUpperCase().charCodeAt(0);
        return (65 <= ccUpper && ccUpper <= 90);  // 'A' = 65, 'Z' = 90 en ASCII
    }
}
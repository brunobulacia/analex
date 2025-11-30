import { Token } from "./token.js";
import { Cinta } from "./cinta.js";

export class Analex {
    #M;      // Cinta
    #R;      // Token  
    #ac;     // String
    #pos;    // int - Posición de inicio del lexema del preanalisis(), calculado en el dt().
             //       Use Cinta.getPos() o sea pos=M.getPos();

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

    avanzar() {
        this.#dt();
    }

    resaltar() {  // Para resaltar el lexema del Preanalisis en el progFuente.
        this.comunicate(this.#pos, this.lexema());
    }

    comunicate(pos, lexema) {  // Overridable. Para la Interfaz.
        // Método vacío que puede ser sobrescrito
    }


    //DT PARA SOLO RECONOCER LETRAS, osea: SDASFASFASDAS, sdadasd
    #dt() {
        let estado = 0;
        let c;
        this.#ac = "";
        this.#pos = this.#M.getPos(); // Guardar posición inicial
        
        console.log("Iniciando análisis léxico...");
        console.log(`Contenido de la cinta: "${this.#M.getContenido()}"`);
        console.log(`Posición inicial del cabezal: ${this.#M.getPos()}`);
        
        while (true) {
            c = this.#M.cc();
            console.log(`Estado: ${estado}, Carácter: ${c} (${c === 0 ? 'EOF' : String.fromCharCode(c)}), Posición: ${this.#M.getPos()}, Acumulador: "${this.#ac}"`);
            
            switch (estado) {
                case 0:
                    if (this.#espacio(c)) {
                        console.log("Es espacio, avanzando...");
                        this.#M.avanzar();
                        estado = 0;
                    }
                    else if (this.#letra(c)) {
                        console.log("Es letra, comenzando palabra...");
                        this.#ac = String.fromCharCode(c);
                        this.#M.avanzar();
                        estado = 1;
                    } else if (c == Cinta.EOF) {
                        console.log("Es EOF");
                        estado = 2;
                    } else {
                        console.log("Es otro carácter (ERROR)");
                        estado = 4;
                    }
                    break;
                    
                case 1: 
                    if (this.#letra(c)) {
                        this.#ac = this.#ac + String.fromCharCode(c);
                        this.#M.avanzar();
                        estado = 1;
                    } else {
                        estado = 3;
                    }
                    break;

                case 2: 
                    this.#R.set(Token.FIN, 0);
                    return;

                case 3: 
                    this.#R.set(Token.ID, this.#ac);
                    return;

                case 4: 
                    this.#R.set(Token.ERROR, 0);
                    return;
            }
        }
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
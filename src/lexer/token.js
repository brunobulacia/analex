export class Token {
    static FIN = 0;
    static ERROR = 1;
    
    static VAR = 2;
    static ARRAY = 3;
    static VOID = 4;
    static IF = 5;
    static ELSE = 6;
    static TO = 7;
    static DO = 8;
    static WHILE = 9;
    static READLN = 10;
    static PRINTLN = 11;
    static UNTIL = 12;
    static FALSE = 13;
    static TRUE = 14;
    static RETURN = 15;
    static MAIN = 16;
    
    static COMA = 17;       // ","
    static PTOCOMA = 18;    // ";"
    static CA = 19;         // "["
    static CC = 20;         // "]"
    static PA = 21;         // "("
    static PC = 22;         // ")"
    static LA = 23;         // "{"
    static LC = 24;         // "}"
    
    static POR = 25;        // "*"
    static MOD = 26;        // "%" y "mod"
    static MAS = 27;        // "+"
    static MENOS = 28;      // "-"
    static DIV = 29;        // "/" y "div" 
    static NOT = 30;        // "!" y "not"
    static AND = 31;        // "and"    
    static OR = 32;         // "or"
    
    static DOTS = 33;       // ".."
    static DOSPUNTOS = 34;  // ":"
    static ASSIGN = 35;     // ":=" y "="
    
    static NUM = 36;
    static ID = 37;
    static STRINGctte = 38;
    static OPREL = 39;
    static TIPO = 40;
    
    // Atributos del token OPREL
    static IGUAL = 0;       // "=="
    static MEN = 1;
    static MAY = 2;
    static MEI = 3;
    static MAI = 4;
    static DIS = 5;         // "!=" y "<>"
    
    // Atributos del token TIPO
    static CHAR = -4;
    static BOOLEAN = -3;
    static INTEGER = -2;
    



    // Arrays estáticos para toString
    static #DESCONOCIDO = "??";
    static #OPRELstr = ["IGUAL", "MEN", "MAY", "MEI", "MAI", "DIS"];
    static #TIPOstr = ["CHAR", "BOOLEAN", "INTEGER"];
    static #NOMtokenSTR = [
        "FIN", "ERROR",
        "VAR", "ARRAY", "VOID", "IF", "ELSE", "TO", "DO", "WHILE", "READLN", "PRINTLN",
        "UNTIL", "FALSE", "TRUE", "RETURN", "MAIN",
        "COMA", "PTOCOMA", "CA", "CC", "PA", "PC", "LA", "LC", "POR", "MOD", "MAS", "MENOS",
        "DIV", "NOT", "AND", "OR", "DOTS", "DOSPUNTOS", "ASSIGN",
        "NUM", "ID", "STRINGctte", "OPREL", "TIPO"
    ];
    
    /**
     * Devuelve el nombre del Token cuyo lexema es cc (lexema de longitud 1) y
     * cc no es sublexema del lexema de otro token.
     * Si cc no cumple esta condición, return -1
     */
    static getNomToken(cc) {
        const lexem = [',', ';', '[', ']', '(', ')', '{', '}', '*', '%', '+', '-'];
        const nom = [Token.COMA, Token.PTOCOMA, Token.CA, Token.CC, Token.PA, Token.PC, 
                    Token.LA, Token.LC, Token.POR, Token.MOD, Token.MAS, Token.MENOS];
        
        for (let i = 0; i < lexem.length; i++) {
            if (lexem[i] === cc) {
                return nom[i];
            }
        }
        return -1;
    }
    
    // Campos de la clase (privados)
    #nom;
    #atr;
    
    constructor(nombre = Token.FIN, atributo = 0) {
        this.#nom = nombre;
        this.#atr = atributo;
    }
    
    set(nombre, atributo) {
        this.#nom = nombre;
        this.#atr = atributo;
    }
    
    setNom(nom) {
        this.#nom = nom;
    }
    
    setAtr(atr) {
        this.#atr = atr;
    }
    
    getNom() {
        return this.#nom;
    }
    
    getAtr() {
        return this.#atr;
    }
    
    toString() {
        return `<${this.#get(Token.#NOMtokenSTR, this.#nom)},${this.#atrToString(this.#nom)}>`;
    }
    
    #atrToString(nom) {
        if (Token.FIN <= nom && nom <= Token.ASSIGN) {
            return "_";
        }
        
        if (nom === Token.OPREL) {
            return this.#get(Token.#OPRELstr, this.#atr);
        }
        
        if (nom === Token.TIPO) {
            return this.#get(Token.#TIPOstr, this.#atr - Token.CHAR);
        }
        
        return String(this.#atr);
    }
    
    #get(array, index) {
        try {
            return array[index] || Token.#DESCONOCIDO;
        } catch (e) {
            return Token.#DESCONOCIDO;
        }
    }
}
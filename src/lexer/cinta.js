export class Cinta {
    // Constantes estáticas
    static CR = 13;    // Carry-Return
    static LF = 10;    // Line-Feed
    static EOF = 0;
    static EOLN = Cinta.LF;  // Usar EOLN de Linux

    // Campos principales de la clase (privados)
    #celdas;   // String
    #cabezal;  // number

    // Campos secundarios
    #fila;     // number
    #col;      // number
    #charAnt;  // char

    constructor(progFuente = "") {
        this.init(progFuente);
    }

    /**
     * (Re)Carga la cinta con un nuevo programa fuente y pone el cabezal
     * al principio de la cinta.
     * @param {string} progFuente el nuevo código fuente a secuenciar.
     */
    init(progFuente) {
        this.#celdas = (progFuente == null ? "" : progFuente);
        this.#initRewind();
    }

    #initRewind() { // Rewind
        this.#fila = 0;
        this.#col = 0;
        this.#charAnt = Cinta.EOF;
        
        this.#cabezal = 0;
        this.#ignoreCR();
    }

    cc() {
        if (this.#cabezal < this.#celdas.length) {
            return this.#celdas.charCodeAt(this.#cabezal);
        }
        return Cinta.EOF;
    }

    avanzar() {
        const c = this.cc();
        if (c === Cinta.EOF) {
            throw new Error("Cinta.avanzar: No se puede avanzar más allá del EOF.");
        }

        if (this.#charAnt === Cinta.EOLN) { // Se terminó de secuenciar la fila actual
            this.#fila++;
            this.#col = 0;
        }

        this.#charAnt = c;
        this.#forward();
        this.#ignoreCR();
    }

    /**
     * Devuelve la fila donde se encuentra el cabezal. Las filas se enumeran
     * desde el cero
     * @return {number} la fila donde se encuentra el cabezal
     */
    getFila() {
        return this.#fila;
    }

    getColumna() {
        return this.#col;
    }

    /**
     * Devuelve el número de celda donde se encuentra el cabezal. Las celdas
     * se enumeran desde el 0.
     * @return {number} la posición del cabezal.
     */
    getPos() {
        return this.#cabezal;
    }

    /**
     * Devuelve el contenido completo de la cinta (para debugging)
     * @return {string} el contenido de la cinta
     */
    getContenido() {
        return this.#celdas;
    }

    // Mueve el cabezal, con la intención de pasar los Carry-returns
    #ignoreCR() {
        while (this.cc() === Cinta.CR) {
            this.#forward();
        }
    }

    // Mueve el cabezal una posición a la derecha
    #forward() {
        this.#cabezal++;
        this.#col++;
    }
}

import { Analex } from "./lexer/analex.js";
import { Cinta } from "./lexer/cinta.js";
document.addEventListener('DOMContentLoaded', () => {

    let cinta;
    let analex
    const initButton = document.getElementById('init-button');
    const advanceButton = document.getElementById('advance-button');
    const sourceCodeInput = document.getElementById('source-code');
    let preanalisis = document.getElementById('preanalisis');
    let lexema = document.getElementById('lexema');

    initButton.addEventListener('click', () => {
        const codigo = sourceCodeInput.value;
        console.log("Inicializando con código:", codigo);
        analex = new Analex(codigo);
        
        let token = analex.preanalisis();
        preanalisis.value = token.toString();
        lexema.value = analex.lexema();
        
        console.log("Analex inicializado.");
        console.log(`Primer token: ${token.toString()}, Lexema: "${analex.lexema()}"`);
    });


    advanceButton.addEventListener('click', () => {
        if (!analex) {
            console.error("Analex no está inicializado. Por favor, presione el botón Init primero.");
            return;
        }
        analex.avanzar();
        let token = analex.preanalisis();

        preanalisis.value = token.toString();
        lexema.value = analex.lexema();
        console.log(`Token: ${token.toString()}, Lexema: ${analex.lexema()}`);

    });


});
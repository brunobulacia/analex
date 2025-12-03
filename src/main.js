import { Analex } from "./lexer/analex.js";
document.addEventListener('DOMContentLoaded', () => {

    let analex;
    const initButton = document.getElementById('init-button');
    const advanceButton = document.getElementById('advance-button');
    const sourceCodeInput = document.getElementById('source-code');
    let preanalisis = document.getElementById('preanalisis');
    let lexema = document.getElementById('lexema');

    initButton.addEventListener('click', () => {
        const codigo = sourceCodeInput.value;

        analex = new Analex(codigo);
        let token = analex.preanalisis();
        preanalisis.value = token.toString();
        lexema.value = analex.lexema();

        let posicionInicial = analex.pos();
        let longitudLexema = lexema.value.length;
        let posicionFinal = posicionInicial + longitudLexema;

        sourceCodeInput.setSelectionRange(posicionInicial, posicionFinal);
        sourceCodeInput.focus();
    });

    advanceButton.addEventListener('click', () => {
        if (!analex) {
            return;
        }
        analex.avanzar();
        let token = analex.preanalisis();
        preanalisis.value = token.toString();
        lexema.value = analex.lexema();

        let posicionInicial = analex.pos();
        let longitudLexema = lexema.value.length;
        let posicionFinal = posicionInicial + longitudLexema;
        
        sourceCodeInput.setSelectionRange(posicionInicial, posicionFinal);
        sourceCodeInput.focus();
    });
});
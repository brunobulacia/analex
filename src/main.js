import { Analex } from "./lexer/analex.js";
import { Cinta } from "./lexer/cinta.js";
document.addEventListener('DOMContentLoaded', () => {

    let cinta;
    let analex
    const initButton = document.getElementById('init-button');
    const advanceButton = document.getElementById('advance-button');
    const sourceCodeInput = document.getElementById('source-code');


    initButton.addEventListener('click', () => {
        cinta = new Cinta(sourceCodeInput.value);
        analex = new Analex(cinta);
        console.log("Analex inicializado.");
    });

    


});
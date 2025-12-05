import { Analex } from "./lexer/analex.js";
document.addEventListener('DOMContentLoaded', () => {

    let analex;
    const initButton = document.getElementById('init-button');
    const advanceButton = document.getElementById('advance-button');
    const sourceCodeInput = document.getElementById('source-code');
    const loadFileButton = document.getElementById('load-file-button');
    const saveFileButton = document.getElementById('save-file-button');
    const fileInput = document.getElementById('file-input');
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
        if (!analex || analex.getError() == true) {
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

    loadFileButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
                sourceCodeInput.value = e.target.result;
                analex = null;
                preanalisis.value = '';
                lexema.value = '';
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, selecciona un archivo .txt válido');
        }
        event.target.value = '';
    });

    saveFileButton.addEventListener('click', () => {
        const content = sourceCodeInput.value;
        if (content.trim() === '') {
            alert('No hay contenido para guardar');
            return;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `codigo-fuente-${timestamp}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    });
});
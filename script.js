// Variables para almacenar los datos arrastrados
const dropZones = document.querySelectorAll(".drop-zone");
const resultElement = document.getElementById("result");

dropZones.forEach(zone => {
    zone.addEventListener("dragover", event => event.preventDefault());

    zone.addEventListener("drop", event => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const type = event.dataTransfer.getData("type");
        
        if (zone.dataset.type === type) {
            zone.textContent = data;
            zone.dataset.value = data;

            calculate(); // Intentar calcular si ya hay suficientes datos
        }
    });
});

// Arrastrar elementos
const dragItems = document.querySelectorAll(".drag-item");
dragItems.forEach(item => {
    item.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text", item.textContent);
        event.dataTransfer.setData("type", item.parentElement.id === "numbers" ? "number" : "operator");
    });
});

// Cálculo
function calculate() {
    // Convertir a número de forma explícita
    const num1 = parseFloat(document.getElementById("num1").dataset.value);
    const num2 = parseFloat(document.getElementById("num2").dataset.value);
    const operator = document.getElementById("operator").dataset.value;

    // Verificar si ambos números y el operador son válidos
    if (!isNaN(num1) && !isNaN(num2) && operator) {
        let result;
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            default:
                result = "Operación no válida";
        }
        resultElement.textContent = `Resultado: ${result}`;
    } else {
        resultElement.textContent = "Resultado: --";
    }
}

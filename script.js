let display = document.getElementById('display');

function appendToDisplay(value) {
    // Replace period with comma for decimal input
    if (value === '.') {
        value = ',';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        // Replace all commas with periods for calculation
        let expression = display.value.replace(/,/g, '.');
        let result = eval(expression);
        // Round to 10 decimal places and remove trailing zeros
        result = Number(result.toFixed(10)).toString();
        // Replace period with comma in the result
        display.value = result.replace('.', ',');
    } catch (error) {
        display.value = 'Error';
    }
}

// Tastatureingaben verarbeiten
document.addEventListener('keydown', function(event) {
    // Verhindere die Standardaktion für bestimmte Tasten
    if (event.key === 'Enter' || event.key === '=' || 
        (event.key >= '0' && event.key <= '9') || 
        event.key === '+' || event.key === '-' || 
        event.key === '*' || event.key === '/' || 
        event.key === '.' || event.key === ',' || 
        event.key === 'Escape') {
        event.preventDefault();
    }

    // Ziffern und Operatoren
    if (event.key >= '0' && event.key <= '9' || 
        event.key === '+' || event.key === '-' || 
        event.key === '*' || event.key === '/' || 
        event.key === '.' || event.key === ',') {
        appendToDisplay(event.key);
    }
    // Enter oder Gleichheitszeichen für Berechnung
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    }
    // Escape oder 'c' zum Löschen
    else if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {
        clearDisplay();
    }
    // Backspace zum Löschen des letzten Zeichens
    else if (event.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
});

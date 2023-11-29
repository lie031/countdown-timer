document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');

    const startButton = document.querySelector('.start');
    const resetButton = document.querySelector('.reset');
    const pauseButton = document.querySelector('.pause');

    const upArrows = document.querySelectorAll('.up-arrow');
    const downArrows = document.querySelectorAll('.down-arrow');

    // Valores iniciales del temporizador
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // Función para actualizar la visualización del temporizador
    function updateDisplay() {
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Funciones para incrementar y decrementar los valores del temporizador
    function incrementHours() {
        hours = (hours + 1) % 25;
        updateDisplay();
    }

    function decrementHours() {
        hours = (hours - 1 + 25) % 25;
        updateDisplay();
    }

    function incrementMinutes() {
        minutes = (minutes + 1) % 61;
        updateDisplay();
    }

    function decrementMinutes() {
        minutes = (minutes - 1 + 61) % 61;
        updateDisplay();
    }

    function incrementSeconds() {
        seconds = (seconds + 1) % 61;
        updateDisplay();
    }

    function decrementSeconds() {
        seconds = (seconds - 1 + 61) % 61;
        updateDisplay();
    }

    let intervalId; // Variable para almacenar el ID del intervalo
    // Función para iniciar el temporizador
    function startTimer() {
        if (!intervalId) {
            intervalId = setInterval(function () {
                // Decrementa los segundos
                if (seconds > 0) {
                    seconds--;
                } else {
                    // Si los segundos llegan a cero, verifica los minutos y las horas
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        } else {
                            // Si todo llega a cero, detén el temporizador
                            clearInterval(intervalId);
                            intervalId = null;
                        }
                    }
                }
                updateDisplay(); // Actualiza la visualización después de cada decremento
            }, 1000); // Actualiza cada 1000 ms (1 segundo)
        }
    }

    // Función para reiniciar el temporizador
    function resetTimer() {
        clearInterval(intervalId); // Detiene el temporizador actual (si existe)
        intervalId = null; // Restablece la variable de intervalo a null

        // Restablece los valores de horas, minutos y segundos a cero
        hours = 0;
        minutes = 0;
        seconds = 0;
        updateDisplay();
    }

    function pauseTimer(){
        clearInterval(intervalId);
        intervalId = null;
    }

    // Asigna eventos a los botones y flechas
    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);
    pauseButton.addEventListener('click', pauseTimer);

    upArrows[0].addEventListener('click', incrementHours);
    downArrows[0].addEventListener('click', decrementHours);
    upArrows[1].addEventListener('click', incrementMinutes);
    downArrows[1].addEventListener('click', decrementMinutes);
    upArrows[2].addEventListener('click', incrementSeconds);
    downArrows[2].addEventListener('click', decrementSeconds);

    // Inicializa la visualización del temporizador
    updateDisplay();

});
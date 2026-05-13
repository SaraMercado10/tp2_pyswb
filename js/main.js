// MODO OSCURO
const toggle = document.getElementById("darkModeToggle");
if(toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        // Cambiar icono según el modo
        const icon = toggle.querySelector("i");
        if(document.body.classList.contains("dark")) {
            icon.classList.replace("bi-moon-stars", "bi-sun");
        } else {
            icon.classList.replace("bi-sun", "bi-moon-stars");
        }
    });
}

// CONTADOR ANIMADO
const contador = document.getElementById("contador");
let iniciado = false;

const animarContador = () => {
    if (!contador) return;
    const posicion = contador.getBoundingClientRect().top;
    const pantalla = window.innerHeight;

    if (posicion < pantalla && !iniciado) {
        iniciado = true;
        let valor = 0;
        const max = 500;
        const intervalo = setInterval(() => {
            valor += 5;
            contador.textContent = valor;
            if (valor >= max) {
                contador.textContent = max;
                clearInterval(intervalo);
            }
        }, 20);
    }
};

window.addEventListener("scroll", animarContador);
//window.addEventListener("load", animarContador);

// FILTROS DE DESTINOS
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".filtro-btn");
    const destinos = document.querySelectorAll(".destino");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const filtro = boton.dataset.filter;

            // Cambiar estado activo de botones
            botones.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            // Lógica de filtrado
            destinos.forEach(dest => {
                if (filtro === "all" || dest.classList.contains(filtro)) {
                    dest.classList.remove("d-none"); // Clase de Bootstrap
                    dest.style.display = "block";
                } else {
                    dest.classList.add("d-none");
                    dest.style.display = "none";
                }
            });
        });
    });
});

$(document).ready(function() {
    
    // SISTEMA DE RATING con jQuery (Esto sí lo mantienes)
    $('.rating-stars i').on('click', function() {
        let value = $(this).data('value'); 
        let parent = $(this).parent(); 

        // Limpiar estrellas
        parent.find('i').removeClass('active bi-star-fill').addClass('bi-star');

        // Pintar hasta la estrella clickeada
        parent.find('i').each(function() {
            if ($(this).data('value') <= value) {
                $(this).addClass('active bi-star-fill').removeClass('bi-star');
            }
        });
    });

});

$(document).ready(function() {
    
    // ACTIVAR TOOLTIPS DE BOOTSTRAP
    // Esta línea busca todos los elementos con data-bs-toggle="tooltip" y los inicializa
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // HOVER DINÁMICO EXTRA (Opcional con jQuery)
    $('.table-hover tbody tr').hover(
        function() {
            $(this).css('transition', 'all 0.3s');
            $(this).find('td').css('transform', 'scale(1.02)');
        }, 
        function() {
            $(this).find('td').css('transform', 'scale(1)');
        }
    );

});

$(document).ready(function() {
    
    // 1. INICIALIZAR ANIMACIONES AL HACER SCROLL
    AOS.init({
        duration: 800, // Duración de la animación en ms
        once: true     // Que la animación solo ocurra una vez
    });

    // 2. FILTRO DE BLOG CON JQUERY
    $('.filter-blog').on('click', function() {
        const filter = $(this).data('filter');
        
        $('.filter-blog').removeClass('active btn-primary').addClass('btn-outline-primary');
        $(this).addClass('active btn-primary').removeClass('btn-outline-primary');

        if (filter === 'all') {
            $('.post-item').fadeIn(400);
        } else {
            $('.post-item').hide();
            $(`.post-item.${filter}`).fadeIn(400);
        }
    });


    // 3. COMENTARIOS SIMULADOS
    $('#commentForm').on('submit', function(e) {
        e.preventDefault();
        const text = $('#commentText').val();
        
        if(text.trim() !== "") {
            const nuevoComentario = `
                <div class="d-flex mb-4 animate__animated animate__fadeIn">
                    <div class="flex-shrink-0"><i class="bi bi-person-circle fs-2 text-primary"></i></div>
                    <div class="ms-3">
                        <div class="fw-bold">Viajero Anónimo</div>
                        ${text}
                    </div>
                </div>
            `;
            $('#commentsList').prepend(nuevoComentario);
            $('#commentText').val("");
        }
    });
});

// validación en tiempo real
$('.contactoo input, .contactoo textarea').on('input', function() {
    if ($(this).val().trim() === "") {
        $(this).addClass('is-invalid').removeClass('is-valid');
    } else {
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('.contactoo').on('submit', function(e) {
    e.preventDefault();

    let valido = true;

    // recorrer todos los campos
    $('.contactoo input, .contactoo textarea').each(function() {
        if ($(this).val().trim() === "") {
            $(this).addClass('is-invalid').removeClass('is-valid');
            valido = false;
        }
    });

    // si hay algo vacío → NO sigue
    if (!valido) return;

    // ✔ todo completo → mostrar spinner
    $('#spinner').removeClass('d-none');

    setTimeout(() => {
        $('#spinner').addClass('d-none');

        let modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
    }, 1500);
});
// cerrar modal
$('#cerrarModal').on('click', function() {
    $('#modal').fadeOut();
});

//pishing
/*
$(document).ready(function() {

  $("#btnSeguro").click(function() {
    $("#resultado")
      .text("❌ Incorrecto. Este es un intento de phishing.")
      .css("color", "red");
  });

  $("#btnNoSeguro").click(function() {
    $("#resultado")
      .text("✔ Correcto. Es un mensaje de phishing.")
      .css("color", "green");
  });

});*/
$(document).ready(function() {
    
    // Validación en tiempo real del email del footer
    $('#emailFooter').on('input', function() {
        const email = $(this).val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (regex.test(email)) {
            $(this).addClass('is-valid').removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid').removeClass('is-valid');
        }
    });

    // Sanitización al enviar el formulario
    $('#formFooter').on('submit', function(e) {
        e.preventDefault();
        let emailRaw = $('#emailFooter').val();
        
        // REQUISITO: Sanitización (quitamos caracteres sospechosos)
        let emailLimpio = emailRaw.replace(/[<>]/g, ""); 
        
        alert("¡Gracias por suscribirte! Tu correo " + emailLimpio + " ha sido registrado.");
        this.reset();
        $('#emailFooter').removeClass('is-valid');
    });

});
$(document).ready(function() {
    // Función para mostrar el feedback en el modal de phishing
    // Usamos jQuery para capturar los clics en los botones de la imagen
    
    $('#btnSeguro').on('click', function() {
        $('#phishingFeedback').hide()
            .html('<div class="alert alert-danger mt-3 animate__animated animate__shakeX">' +
                  '❌ <strong>¡Cuidado!</strong> Es un mensaje de fraude. El tono de urgencia y el link extraño son señales claras.' +
                  '</div>')
            .fadeIn();
    });

    $('#btnFraude').on('click', function() {
        $('#phishingFeedback').hide()
            .html('<div class="alert alert-success mt-3 animate__animated animate__backInUp">' +
                  '✅ <strong>¡Muy bien!</strong> Supiste identificar las señales. Nunca hagas clic en enlaces de remitentes desconocidos.' +
                  '</div>')
            .fadeIn();
    });
});

$(document).ready(function() {
    // 1. Validación en tiempo real (Cambia color mientras escribís)
    $('#emailFooter').on('input', function() {
        const email = $(this).val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica
        
        if (regex.test(email)) {
            $(this).addClass('is-valid').removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid').removeClass('is-valid');
        }
    });

    // 2. Sanitización al enviar (Evita que inyecten código malicioso)
    $('#formFooter').on('submit', function(e) {
        e.preventDefault();
        let emailSucio = $('#emailFooter').val();
        
        // REQUISITO: Sanitización (eliminamos etiquetas < > y comillas)
        let emailLimpio = emailSucio.replace(/[<>'"\/]/g, ""); 
        
        alert("¡Gracias! El correo " + emailLimpio + " fue registrado con éxito.");
        this.reset();
        $(this).find('.form-control').removeClass('is-valid');
    });
});
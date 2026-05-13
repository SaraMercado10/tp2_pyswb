const toggle = document.getElementById("darkModeToggle");
if(toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const icon = toggle.querySelector("i");
        if(document.body.classList.contains("dark")) {
            icon.classList.replace("bi-moon-stars", "bi-sun");
        } else {
            icon.classList.replace("bi-sun", "bi-moon-stars");
        }
    });
}

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

document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".filtro-btn");
    const destinos = document.querySelectorAll(".destino");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const filtro = boton.dataset.filter;

            botones.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            destinos.forEach(dest => {
                if (filtro === "all" || dest.classList.contains(filtro)) {
                    dest.classList.remove("d-none");
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
    $('.rating-stars i').on('click', function() {
        let value = $(this).data('value'); 
        let parent = $(this).parent(); 
        parent.find('i').removeClass('active bi-star-fill').addClass('bi-star');
        parent.find('i').each(function() {
            if ($(this).data('value') <= value) {
                $(this).addClass('active bi-star-fill').removeClass('bi-star');
            }
        });
    });

});

$(document).ready(function() {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

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
    AOS.init({
        duration: 800,
        once: true
    });

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

    $('.contactoo input, .contactoo textarea').each(function() {
        if ($(this).val().trim() === "") {
            $(this).addClass('is-invalid').removeClass('is-valid');
            valido = false;
        }
    });

    if (!valido) return;
    $('#spinner').removeClass('d-none');

    setTimeout(() => {
        $('#spinner').addClass('d-none');

        let modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
    }, 1500);
});

$('#cerrarModal').on('click', function() {
    $('#modal').fadeOut();
});

$(document).ready(function() {
    $('#emailFooter').on('input', function() {
        const email = $(this).val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (regex.test(email)) {
            $(this).addClass('is-valid').removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid').removeClass('is-valid');
        }
    });
    $('#formFooter').on('submit', function(e) {
        e.preventDefault();
        let emailRaw = $('#emailFooter').val();
        let emailLimpio = emailRaw.replace(/[<>]/g, ""); 
        
        alert("¡Gracias por suscribirte! Tu correo " + emailLimpio + " ha sido registrado.");
        this.reset();
        $('#emailFooter').removeClass('is-valid');
    });

});
$(document).ready(function() {
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
    $('#emailFooter').on('input', function() {
        const email = $(this).val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            $(this).addClass('is-valid').removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid').removeClass('is-valid');
        }
    });
    $('#formFooter').on('submit', function(e) {
        e.preventDefault();
        let emailSucio = $('#emailFooter').val();
        let emailLimpio = emailSucio.replace(/[<>'"\/]/g, ""); 
        alert("¡Gracias! El correo " + emailLimpio + " fue registrado con éxito.");
        this.reset();
        $(this).find('.form-control').removeClass('is-valid');
    });
});
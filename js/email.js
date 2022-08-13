const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_t14pr4o';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviando';
      Toastify({
        text: "Mensaje Enviado",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "green",
        },
        onClick: function(){} 
      }).showToast();
    }, (err) => {
      btn.value = 'Enviar mensaje';
      Toastify({
        text: "Error al Enviar",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "red",
        },
        onClick: function(){} 
      }).showToast();
    });
});

const pagina = document.body.dataset.page;

let intervaloTexto;

function SaberMas() {
    window.location.href = "#especialidad";
}

if (pagina === "aic"){
  intervaloTexto = textoBiblioCargando()

  const buttons1 = document.querySelectorAll(".tab-group button[data-tab]");
  const contents = document.querySelectorAll(".tab-panel");

  buttons1.forEach(button => {
    button.addEventListener("click", () => {
      buttons1.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      contents.forEach(c => c.classList.remove("active"));

      const tab = button.getAttribute("data-tab");

      document.getElementById(tab).classList.add("active");

      checkScroll();
      });
  });
}



//Animaciones Scroll


const elementos = document.querySelectorAll(".scroll");

function checkScroll() {
  elementos.forEach(e => {
    const posicion = e.getBoundingClientRect();

    if(posicion.top < window.innerHeight-100  && posicion.bottom > 0){
      e.classList.add("mostrar");
    }
  })
}

//ahora se ejecuta cuando vas a esa seccion desde un link tambien
window.addEventListener("scroll", checkScroll);
window.addEventListener("load", () => {
  checkScroll;
});

  



// navbar y que de desactive cuando apretes un link

document.addEventListener("click", (e) => {
    if (e.target.closest("#menuBtn")) {
        document.getElementById("nav").classList.toggle("active");
    }

    if (e.target.closest("#nav a")) {
        document.getElementById("nav").classList.remove("active");
    }
});


//Preguntas del FAQ

if (pagina === "index"){
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item =>{
    
    const btn = item.querySelector(".faq-btn");
    const body = item.querySelector(".faq-body");

    btn.addEventListener("click", () => {
      item.classList.toggle("active");

      if(item.classList.contains("active")){
        body.style.maxHeight = body.scrollHeight + "px";
      }
      else{
        body.style.maxHeight = 0;
      }
    })
  })
}

// cada vez que cambie la ventana de tamaño que se actualice

if (pagina !== "aic"){
  window.addEventListener('resize', () => {
    if (pagina === "especialidad"){
      igualarAlturasPorIndice();
      asignarAnimaciones();
    }

    if (pagina === "index"){
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach(item =>{
        const body = item.querySelector(".faq-body");
        if(item.classList.contains("active")){
            body.style.maxHeight = body.scrollHeight + "px";
          };
      })
    }
  });
}


//Next


function igualarFilas() {
  document.querySelectorAll('.tabla-grid').forEach(grid => {
    const categorias = grid.querySelectorAll('.categoria');
    let maxFilas = 0;

    // Encontrar el máximo de filas entre las categorías
    categorias.forEach(cat => {
      const cantidad = cat.querySelectorAll('.fila:not(.total)').length;
      if (cantidad > maxFilas) maxFilas = cantidad;
    });

    // Agregar filas vacías a las que tienen menos
    categorias.forEach(cat => {
      const filas = cat.querySelectorAll('.fila:not(.total)').length;
      const diferencia = maxFilas - filas;
      const filaTotal = cat.querySelector('.fila.total');

      for (let i = 0; i < diferencia; i++) {
        const filaVacia = document.createElement('div');
        filaVacia.classList.add('fila', 'vacia');
        filaVacia.innerHTML = '<div></div><div></div>';
        cat.insertBefore(filaVacia, filaTotal);
      }
    });
  });
}


function igualarAlturasPorIndice() {
  document.querySelectorAll('.tabla-grid').forEach(grid => {
    const categorias = Array.from(grid.querySelectorAll('.categoria'));

    // Resetear alturas
    categorias.forEach(cat => {
      Array.from(cat.children).forEach(el => {
        el.style.height = 'auto';
      });
    });

    // Convertir cada categoría en array de hijos
    const elementosPorCategoria = categorias.map(cat =>
      Array.from(cat.children)
    );

    const maxFilas = Math.max(...elementosPorCategoria.map(arr => arr.length));

    for (let i = 0; i < maxFilas; i++) {
      let maxAltura = 0;

      // Buscar altura máxima en esa "fila lógica"
      elementosPorCategoria.forEach(elementos => {
        if (!elementos[i]) return;
        const altura = elementos[i].getBoundingClientRect().height;
        if (altura > maxAltura) maxAltura = altura;
      });

      // Aplicar esa altura a todos los elementos en ese índice
      elementosPorCategoria.forEach(elementos => {
        if (!elementos[i]) return;
        elementos[i].style.height = maxAltura + 'px';
      });
    }
  });
}

// Llamarlo al cargar la página
if (pagina === "especialidad"){
  window.addEventListener('load', () => {
    igualarFilas();
    igualarAlturasPorIndice();
    asignarAnimaciones()
  });
}

if (pagina !== "especialidad"){
  ajustarUltimaFila();
  window.addEventListener('resize', ajustarUltimaFila);
}



if (pagina === "especialidad"){
  const buttons2 = document.querySelectorAll(".btn-container button[data-tab]");
  console.log(buttons2);
  const tablas = document.querySelectorAll(".tabla-grid");

  buttons2.forEach(button => {
    button.addEventListener("click", () =>{
      buttons2.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      
      tablas.forEach(t => t.classList.remove("active"));

      const tab = button.getAttribute("data-tab");

      document.getElementById(tab).classList.add("active")

      igualarAlturasPorIndice();
    });
  });
}


//carousel

if (pagina !== "aic"){
  function CrearCarrusel(section){

    const WrapperContainer = section.querySelector(".container")
    const wrappers = section.querySelectorAll(".wrapper-inner");

    const btnPrev = section.querySelector(".botones button:first-child");
    const btnNext = section.querySelector(".botones button:last-child");

    let index = Math.floor(wrappers.length/2);

    function updateCarousel(){
      wrappers.forEach(w => w.classList.remove("active"));
      wrappers[index].classList.add("active");

      const wrapper = wrappers[index];
      console.log(wrapper);

      const ContainerRect = WrapperContainer.getBoundingClientRect();
      const WrapperRect = wrapper.getBoundingClientRect();
      console.log(ContainerRect);
      console.log(WrapperRect);

      const offset = (WrapperRect.left + WrapperRect.width / 2) - (ContainerRect.left + ContainerRect.width / 2);

      WrapperContainer.style.transform = `translateX(${-offset}px)`;
    }

    btnNext.addEventListener("click", () =>{
      index ++;
      
      if(index > wrappers.length-1){
        index = 0;
      }
      
      updateCarousel();
    })

    btnPrev.addEventListener("click", () =>{
      index --;

      if(index < 0){
        index = wrappers.length-1;
      }
      
      updateCarousel();

    })

    updateCarousel();
    window.addEventListener('resize', () => {
      updateCarousel();
    });
  }

  const carruseles = document.querySelectorAll(".galeria-section");

  carruseles.forEach(section => {
    CrearCarrusel(section);
  })
}


function ajustarUltimaFila() {
    const container = document.querySelector('.tarjeta-container');
    const cards = document.querySelectorAll('.tarjeta');
    const gap = 40;
    let minCardWidth = 0;
    if (pagina === "index"){
      minCardWidth = 340;
    }
    else{
      minCardWidth = 250;
    }

    const columnas = Math.floor((container.offsetWidth + gap) / (minCardWidth + gap));
    const ultimaFila = cards.length % columnas;


    // resetear todas primero
    cards.forEach(c => c.style.maxWidth = '');

    if (ultimaFila !== 0) {
        const anchoCard = cards[0].offsetWidth; // ancho real actual
        cards.forEach(c => c.style.maxWidth = anchoCard + 'px');
    }
}


// para que el scale funcione en botones que tengan la animacion MostrarBtn
document.querySelectorAll('.btn-container button').forEach(btn => {
  btn.addEventListener('animationend', () => {
    btn.style.animation = 'none';
  })
})


function ocultarSpinnerBiblio(){
  setTimeout(() => {
    clearInterval(intervaloTexto);
    const spinnerBiblio = document.getElementById("spinner-biblio-cargando");
    spinnerBiblio.style.display = 'none';
  }, 3000);
}

function textoBiblioCargando() {
  const texto = document.getElementById("texto-biblio-cargando");
  let puntos = 0
  
  return setInterval(() => {
    puntos = (puntos + 1) % 3 ;
    texto.textContent = "Cargando Biblioteca Digital." + ".".repeat(puntos);
  }, 500);
}


/*function ocultarSpinner(){
  setTimeout(() => {
    const spinner = document.getElementById("spinner-cargando");
    spinner.style.display = 'none';
  }, 1000);
}


function textoCargando() {
  const texto2 = document.getElementById("texto-cargando");
  let puntos = 0;

  
  return setInterval(() => {
    puntos = (puntos + 1) % 3 ;
    texto2.textContent = "Cargando Mapa." + ".".repeat(puntos);
  }, 500);
} 
  
textoCargando();
*/



function asignarAnimaciones(){
  console.log("gkgkokk")
  const cards = document.querySelectorAll(".card");
  console.log(cards)

  if (!cards.length) return;

  const primeraFilaTop = cards[0].offsetTop;
  let cardsPorFila = 0;

  for (const card of cards) {
    if (card.offsetTop === primeraFilaTop){
      cardsPorFila++;
    }
    else{
      break;
    }
  }

  cards.forEach((card, index) => {
    card.style = "";

    const posicion = index % cardsPorFila;

    if (cardsPorFila >= 3){
      if (posicion === 0){
        card.style = "--animation:MoverDerecha; --delay:"+`${index+1}`+";";
      }
      else if (posicion === cardsPorFila - 1){
        card.style = "--animation:MoverIzquierda; --delay:"+`${index+1}`+";";
      }
      else if (index < cardsPorFila){
        card.style = "--animation:MoverAbajoPerfil; --delay:"+`${index+1}`+";";
      }
      else{
        card.style = "--animation:MoverArriba; --delay:"+`${index+1}`+";";
      }
    }
    else if (cardsPorFila === 2){
      if (posicion === 1){
        card.style = "--animation:MoverIzquierda; --delay:"+`${index+1}`+";";
      }
      else{
        card.style = "--animation:MoverDerecha; --delay:"+`${index+1}`+";";
      }
    }
    else{
      card.style = index % 2 === 0 ? "--animation:MoverIzquierda; --delay:"+`${index+1}`+";" : "--animation:MoverDerecha; --delay:"+`${index+1}`+";";
    }
  })
}

/* Intento de hacer que las cards tengan rotacion 3d, el card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY})deg`; no funciona bien
function cardRotacion3D(){
  const cards = document.querySelectorAll(".tarjeta-inner");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
      const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY})deg`;
      console.log(card.style)

    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    })
  })
}

cardRotacion3D();
*/
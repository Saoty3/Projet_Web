let animation = false
const nuage = document.querySelector(".nuage");
const vapeur = document.querySelector(".vapeur");

function fairePleuvoir() {
  const nuage = document.querySelector('.nuage');
  const svg = nuage.querySelector('svg');
  
  if (nuage.getAttribute('data-raining') === 'true') return;
  nuage.setAttribute('data-raining', 'true');

  function gouttes(){
    for(let i = 0; i < 10; i++) {
      const drop = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      drop.setAttribute("cx", (Math.random() * 200) - 60);
      drop.setAttribute("cy", 3);
      drop.setAttribute("rx", 3);
      drop.setAttribute("ry", 6);
      drop.classList.add("rain-drop");
      drop.style.animationDuration = (0.8 + Math.random() * 0.7) + "s";
      svg.appendChild(drop);

      drop.addEventListener('animationend', () => {
        drop.remove();
        if (!nuage.querySelector('.rain-drop')) {
          nuage.setAttribute('data-raining', 'false');
        }
      });
    }
  }
  const pluie = setInterval(gouttes,250);

  setTimeout(() => {clearInterval(pluie)}, 5000);
}

function deplacementNuage() {
  nuage.classList.remove("nuage-apparition");
  nuage.offsetWidth;
  nuage.classList.add("animate-nuage");
}


function faireMonterLaVapeur() {
  const vapeur = document.querySelector(".vapeur");
  vapeur.classList.remove("animate-monter");
  vapeur.offsetWidth;
  vapeur.classList.add("animate-monter");
}

  function cycledelEau() {
    if(animation) return;
    animation = true;

    const bouton = document.getElementById("cycle");
    bouton.disabled = true;

    nuage.style.left = "3%"; 
    nuage.style.display = "block";
    nuage.classList.remove("nuage-disparition");
    nuage.offsetWidth;
    nuage.classList.add("nuage-apparition");
    for (let i=0; i<2; i++){
      setTimeout(faireMonterLaVapeur,i * 2000);
    }
    setTimeout(deplacementNuage, 5000); // après 2 secondes, déplacer le nuage
    setTimeout(fairePleuvoir,7500);
    setTimeout(()=> {
      nuage.classList.remove("animate-nuage");
      nuage.classList.add("nuage-disparition");
      nuage.offsetWidth;
      nuage.style.left = "78%";},10500); 
    setTimeout(()=> {animation =  false;
      bouton.disabled = false}, 15000);
  }

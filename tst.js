// Sélectionner la carte originale  
const carteOriginale = document.querySelector('.img-parent');  

// Fonction pour cloner la carte et ajouter un événement listener  
function clonerCarte() {  
  // Créer un élément parent pour les cartes clonées  
  const parent = document.querySelector('.container.bg-primary');  

  // Cloner la carte 10 fois  
  for (let i = 0; i < 10; i++) {  
    const carteClonee = carteOriginale.cloneNode(true);  
    parent.appendChild(carteClonee);  

    // Sélectionner les éléments de la carte clonée  
    const picClonee = carteClonee.querySelector('#Pic1');  
    const downloadMenuClonee = carteClonee.querySelector('#DownloadMenu');  
    const downloadPicClonee = carteClonee.querySelector('#DownloadPic1');  

    // Ajouter un événement listener sur le bouton de téléchargement  
    downloadPicClonee.addEventListener('click', () => {  
      const link = document.createElement('a');  
      link.href = picClonee.src;  
      link.download = picClonee.src.split('/').pop();  
      document.body.appendChild(link);  
      link.click();  
      document.body.removeChild(link);  
    });  

    // Ajouter un événement listener sur le bouton d'ouverture du menu de téléchargement  
    const openDwnClonee = carteClonee.querySelector('#OpenDwn');  
    openDwnClonee.addEventListener('click', () => {  
      downloadMenuClonee.style.display == 'flex' ? downloadMenuClonee.style.display = 'none' : downloadMenuClonee.style.display = 'flex';  
    });  
  }  
}  

// Appeler la fonction pour cloner la carte  
clonerCarte();
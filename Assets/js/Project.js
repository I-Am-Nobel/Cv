const VoirMoins = (index, commiter) => {
    const Fermer = () => {
        const voirMoins = document.getElementById(`voirMoins${index}`);
        const voirtout = document.getElementById(`voirtout${index}`);
        const voirOpt = document.getElementById(`voirOpt${index}`);
        const voirPlus = document.getElementById(`voirPlus${index}`);

        voirtout.style.display = 'none';
        voirPlus.style.display = 'block';
        voirOpt.style.display = 'block';
        voirMoins.style.display = 'none';
    };

    if (commiter) {
        return Fermer();
    } else {
        const voirMoins = document.getElementById(`voirMoins${index}`);
        voirMoins.addEventListener('click', Fermer);
    }
};

const Mypic = [
    {
        Titre:'Plateforme de collecte des données',
        ImgSrc: './Assets/img/projets/Nobel_s_Project_Connected_Farm.png',
        Legend: 'Ce projet vise à créer une plateforme permettant de rendre une ferme complètement connectée. <br> <span class="fw-bold">Technologies utilisées</span> : Node.js, Express, React, MongoDB, Socket.io et d\'autres technologies.<br> <span class="fw-bold">Langages utilisés</span> : HTML, CSS, JAVASCRIPT, TYPESCRIPT et PYTHON',
        ShowLegend: function() {
            return this.Legend.length > 150 ? `${this.Legend.substring(0, 150)}...` : this.Legend;
        },
        VidSrc: './Assets/Videos/FermeConnecté.mp4',
        ZipVidSrc: './Assets/FichiersZip/ProjetFermeConnecté_By_Nobel.rar',
        PdfSrc: './Assets/Pdfs/Introduction TFC Nobel.pdf'
    },
    {
        Titre:'Blog',
        ImgSrc: './Assets/img/projets/blog.jpeg',
        Legend: 'Ceci est un petit blog interactif <br> <span class="fw-bold">Technologies utilisées</span> : Node.js, Express, Next.js, MongoDB, Socket.io et d\'autres technologies.<br> <span class="fw-bold">Langages utilisés</span> : HTML, CSS, JAVASCRIPT, TYPESCRIPT',
        ShowLegend: function() {
            return this.Legend.length > 150 ? `${this.Legend.substring(0, 150)}...` : this.Legend;
        },
        VidSrc: './Assets/Videos/blog.mp4',
        ZipVidSrc: './Assets/FichiersZip/blog.rar',
        PdfSrc: null
    }
];

Mypic.forEach((img, index) => {
    const imgBoucle = document.createElement("div");
    imgBoucle.className = "col-12 col-lg-6";
    imgBoucle.innerHTML = `
        <div id="Video${index}" class="project-card">
            <div class="project-header d-flex justify-content-between align-items-center">
                <h3 class="h5 text-black mb-0">${img.Titre}</h3>
                <i class="bi bi-three-dots menu-icon fs-4" data-bs-toggle="tooltip" title="Options de téléchargement"></i>
            </div>

            <div class="download-menu p-3" style="display: none;">
                <div class="download-item d-flex align-items-center" role="button">
                    <i class="bi bi-download me-2"></i>
                    <i class="bi bi-play-circle me-2"></i>
                    <span>Télécharger la vidéo</span>
                </div>
                <div class="download-item d-flex align-items-center" role="button">
                    <i class="bi bi-download me-2"></i>
                    <i class="bi bi-file-zip me-2"></i>
                    <span>Télécharger le ZIP</span>
                </div>
                ${img.PdfSrc ? `
                <div class="download-item d-flex align-items-center" role="button">
                    <i class="bi bi-download me-2"></i>
                    <i class="bi bi-file-pdf me-2"></i>
                    <span>Télécharger le PDF</span>
                </div>
                ` : ''}
            </div>

            <div class="p-3">
                <div class="video-container">
                    <video controls poster="${img.ImgSrc}">
                        <source src="${img.VidSrc}">
                    </video>
                </div>

                <div class="description">
                    <p id="voirOpt${index}" class="mb-0">
                        ${img.ShowLegend()}
                        ${img.Legend.length > 100 ? `
                        <span id="voirPlus${index}" class="toggle-btn">
                            <i class="bi bi-chevron-down ms-1"></i> Voir plus
                        </span>` : ''}
                    </p>
                    <div id="voirtout${index}" style="display: none;">
                        <p class="mb-0">${img.Legend}</p>
                        <span id="voirMoins${index}" class="toggle-btn">
                            <i class="bi bi-chevron-up ms-1"></i> Voir moins
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const imgParent = document.querySelector('.Videos');
    imgParent.appendChild(imgBoucle);

    const menuIcon = imgBoucle.querySelector('.menu-icon');
    const downloadMenu = imgBoucle.querySelector('.download-menu');
    
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        downloadMenu.style.display = downloadMenu.style.display === 'none' ? 'block' : 'none';
        VoirMoins(index, 1);
    });

    const downloadItems = imgBoucle.querySelectorAll('.download-item');
    downloadItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            const link = document.createElement('a');
            switch(idx) {
                case 0: link.href = img.VidSrc; break;
                case 1: link.href = img.ZipVidSrc; break;
                case 2: link.href = img.PdfSrc; break;
            }
            link.download = link.href.split('/').pop();
            link.click();
            menuIcon.click();
        });
    });

  
    const voirPlus = document.getElementById(`voirPlus${index}`);
if (voirPlus) {
voirPlus.addEventListener('click', () => {
    document.getElementById(`voirOpt${index}`).style.display = 'none';
    document.getElementById(`voirtout${index}`).style.display = 'block';
    document.getElementById(`voirMoins${index}`).style.display = 'inline';
    voirPlus.style.display = 'none';
});
}

VoirMoins(index);
})
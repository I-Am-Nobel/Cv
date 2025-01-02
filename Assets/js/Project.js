const VoirMoins=(index,commiter)=>{
    const Fermer=()=>{
        const voirMoins=document.getElementById(`${'voirMoins'+index}`)
        const voirtout=document.getElementById(`${'voirtout'+index}`)
        const voirOpt=document.getElementById(`${'voirOpt'+index}`)
        const voirPlus=document.getElementById(`${'voirPlus'+index}`)
    
        voirtout.style.display='none'
        voirPlus.style.display='block'
        voirOpt.style.display='block'
        voirMoins.style.display='none'
    }

    if(commiter){
        return Fermer()
    }
    else{
        const voirMoins=document.getElementById(`${'voirMoins'+index}`)
        voirMoins.addEventListener('click',()=>{
            Fermer()
        })
    }
}


const Mypic = [  
{  
ImgSrc: './Assets/img/projets/Nobel_s_Project_Connected_Farm.png',  
Legend: 'Ce projet vise a creer une plateforme permettant a rendre une ferme completement connecté. <br> <span style="font-weight:bold">Technologies utilisés</span> : Node.js,express,React,MongoDb,Socket.io et d\'autres technologies.<br> <span style="font-weight:bold">Langages utilisés</span> : HTML,CSS,JAVASCRIPT,TYPESCRIPT et PYTHON',
ShowLegend:()=>{return Mypic[0].Legend.length>100? ` ${Mypic[0].Legend.substring(0,100)} ...Voir Plus`:Mypic[0].Legend},
VidSrc: './Assets/Videos/FermeConnecté.mp4',  
ZipVidSrc:'./Assets/FichiersZip/ProjetFermeConnecté_By_Nobel.rar',
ViewVid:'./Video.html',
urlVid:"./Videos.html/'./Assets/Videos/FermeConnecté.mp4'",
PdfSrc:'./Assets/Pdfs/Introduction TFC Nobel.pdf'
},
];  
console.log(Mypic[0].ShowLegend())
Mypic.forEach((img, index) => {  
const imgBoucle = document.createElement("div");  
imgBoucle.innerHTML = `  

<div id=${'Video'+index}  class="vid-parent mb-2 w-100 rounded px-1 " 

style="width: 100%;background: linear-gradient(#fff,#05b105c4,#7e7e7e8e);">  
<div class="container d-flex flex-wrap justify-content-space-between rounded-top dwn">  
    <p>
    </p>
    <i style="cursor: pointer;" class="OpenDwn bi bi-list fs-2 text-dark"></i>  
</div>  

<div class="DownloadMenu container bg-dark mb-2 dlwn"  
    style="display: none;padding:'5px'">  
    <div  class="DownloadVid dlwdPic d-flex"> <i style='color:#fff;' class="bi bi-download"></i>  <i style='color:#fff;' class="bi bi-file-play"></i> <p style="color:#fff; margin-left: 10px;"> video</p></div>  
    <div class="DownloadZip dlwdPic d-flex"> <i style='color:#fff;' class="bi bi-download"></i>  <i style='color:#fff;' class="bi bi-file-zip"></i> <p style="color:#fff;margin-left: 10px;"> video compressé</p></div> 
    <div class="DownloadPdf dlwdPic d-flex"> <i style='color:#fff;' class="bi bi-download"></i>  <i style='color:#fff;' class="bi bi-file-pdf "></i> <p style="color:#fff;margin-left: 10px;"> projet en pdf</p></div> 
</div> 
<p>
L'Iot, l'IA et la
traçabilité pour une détection précoce des maladies bovines.
</p>
<div
class=' justify-content-center d-flex'
>  

        <video class='Video container'  
                controls='controls' poster=${img.ImgSrc} >
                  <source src=${img.VidSrc}>
        </video>  
</div> 
<div>  
        <div class="container d-flex flex-wrap text-dark mt-2">  
            
            <p id=${'voirOpt'+index} class="voirOpt msi-2" style="font-size: small;">
                ${(()=>{return img.Legend.length>100? ` ${img.Legend.substring(0,100)}
                     <p style='font-size: small;color:blue' id=${'voirPlus'+index} class='voirPlus'>Voir Plus</p>`:img.Legend})()}  

            </p>  
            <p class="voirtout msi-2" id=${'voirtout'+index}  style='display:none;font-size: small;' >
                ${img.Legend} <p class='voirMoins' id=${'voirMoins'+index} style='display:none;font-size: small;color:blue;'>Voir moins</p>
            </p>  
        </div>  
    </div>   
</div>  
`;  


const imgParent = document.querySelector('.Videos');  
imgParent.appendChild(imgBoucle);  



const openDwn = imgBoucle.querySelector('.OpenDwn');  
openDwn.addEventListener('click', () => { 
    console.log('Wesh wesh dwnload ! : '+`${'voirPlus'+index}`) 
const downloadMenu = imgBoucle.querySelector('.DownloadMenu');  
downloadMenu.style.display == 'block' ? downloadMenu.style.display = 'none' : downloadMenu.style.display = 'block';  
VoirMoins(index,1)
});  

const DownloadVid = imgBoucle.querySelector('.DownloadVid'); 

if (DownloadVid){
DownloadVid.addEventListener('click', () => {  
const link = document.createElement('a');    
link.href = img.VidSrc;  
link.download = img.VidSrc.split('/').pop();  
link.click(); 
const openDwn = imgBoucle.querySelector('.OpenDwn');
openDwn.click() 
}); 
} 
const downloadZip = imgBoucle.querySelector('.DownloadZip');

if (downloadZip){
        downloadZip.addEventListener('click', () => {  
        const link = document.createElement('a');  
        link.href =img.ZipVidSrc;  
        link.download = img.ZipVidSrc.split('/').pop();  
        link.click();  
        const openDwn = imgBoucle.querySelector('.OpenDwn');
        openDwn.click()
        }); 
} 
const downloadPdf = imgBoucle.querySelector('.DownloadPdf');

if (downloadPdf){
    downloadPdf.addEventListener('click', () => {  
    const link = document.createElement('a');  
    link.href =img.PdfSrc;  
    link.download = img.PdfSrc.split('/').pop();  
    link.click();  
    const openDwn = imgBoucle.querySelector('.OpenDwn');
    openDwn.click()
    }); 
}
// VOIR PLUS/MOINS

const VoirPlus=document.getElementById(`${'voirPlus'+index}`)

VoirPlus.addEventListener('click',()=>{
        const voirtout=document.getElementById(`${'voirtout'+index}`)
        const voirOpt=document.getElementById(`${'voirOpt'+index}`)
        const voirMoins=document.getElementById(`${'voirMoins'+index}`)
        const downloadMenu = imgBoucle.querySelector('.DownloadMenu');  
        downloadMenu.style.display == 'block' && (downloadMenu.style.display = 'none' )
        const Video = imgParent.querySelector('.vid-parent') 
        Video.style.maxWidth='auto'
        voirtout.style.display='block'
        voirMoins.style.display='block'
        voirOpt.style.display='none'
        VoirPlus.style.display='none'
})
VoirMoins(index)
});  

// telechargement de la photos

const OpenDwn=document.getElementById('OpenDwn')
OpenDwn.addEventListener('click',()=>{
    
    const DownloadMenu=document.getElementById('DownloadMenu')
    DownloadMenu.style.display==('flex')?
    DownloadMenu.style.display=('none'):
    DownloadMenu.style.display=('flex')
})
const DownloadPic1= document.getElementById('DownloadPic1')
DownloadPic1.addEventListener('click',()=>{
    const link = document.createElement('a')
    const Pic1 =document.getElementById('Pic1')
    link.href="C:/Nobel/Logiciel/Nobel/Nobel/Stage EvoluData/Git/GenieInfo/Assets/img/1729892320275-IMG-20240927-WA0237~2.jpg"
    link.download= '1729892320275-IMG-20240927-WA0237~2.jpg'
    console.log('Telechargement ...',Pic1)
    document.body.appendChild(link);
    link.click()
    document.removeChild(link)
  
    
    console.log('Telechargement effectue')
})
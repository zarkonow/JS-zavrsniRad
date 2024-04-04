const search = window.location.search 
const params = search.split('&') // prvo splitujes sa & jer ima dva parametra medjusobno odvojena sa & 
const adId = params[0].split('=')[1] // params[0] je prvi parametar (npr. id=3), pa iz njega isdvajas sve nakon = to je vrednost ida oglasa
const userId = params[1].split('=')[1] // params[1] je drugi parametar (npr. userId=2), pa iz njega isdvajas sve nakon = to je vrednost ida usera
console.log(adId, userId)


async function loadAd(NewRating) {
    const response = await fetch(`http://localhost:3000/ads/${adId}`);
    const ad = await response.json();
    console.log(ad);
    
    const displayAd = document.getElementById('displayAd')
        
    displayAd.innerHTML = `${ad.title}`
    const adImg = document.createElement('img')
    adImg.src = `${ad.image}`
    adImg.style.width = '50%'
    adImg.style.objectFit = 'contain';
    adImg.style.display = 'flex'
    displayAd.appendChild(adImg)
        
    const pDesc = document.createElement('p')
    pDesc.innerHTML = `Opis: ${ad.description}`
    pDesc.style.fontSize = '15px'
    pDesc.style.border = '1px solid gray'
    pDesc.style.width = '50%'
    displayAd.appendChild(pDesc)
        
    const pPrice = document.createElement('p')
    pPrice.innerHTML = `Cena: ${ad.price}e`
    pPrice.style.fontSize = '15px'
    pPrice.style.border = '1px solid gray'
    pPrice.style.width = '50%'
    displayAd.appendChild(pPrice)

    const pRev = document.createElement('p')
    pRev.innerHTML = `Pregledi: ${ad.reviews}`
    pRev.style.fontSize = '15px'
    pRev.style.border = '1px solid gray'
    pRev.style.width = '10%'
    pRev.style.display = 'flex'
    displayAd.appendChild(pRev)
        

    // const pLikes = document.createElement('p')
    // pLikes.innerHTML = `Likes: ${ad.likes}`
    // pLikes.style.fontSize = '15px'
    // pLikes.style.border = '1px solid gray'
    // pLikes.style.width = '10%'
        

    const likeBtn = document.getElementById('likeBtn');
    likeBtn.innerHTML = `Like ${ad.likes}`
    likeBtn.addEventListener('click', async function() {
        ad.likes++
        likeBtn.innerHTML = `Like ${ad.likes}`;
        await fetch(`http://localhost:3000/ads/${adId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ad)
        });
    });
    
          
    document.getElementById('rateBtn').addEventListener('click', async function (){
        const selectRate = Number(document.getElementById('select-rate').value)
        
            ad.rating.push(selectRate)
            console.log(ad.rating);
            await fetch(`http://localhost:3000/ads/${adId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ad)
                })
                refreshAverageRating()
    })
    
    rateBtn.innerHTML = `Oceni`
    refreshAverageRating();
 }
 loadAd()

async function refreshAverageRating() {
const response = await fetch(`http://localhost:3000/ads/${adId}`);
const ad = await response.json();
console.log(ad);

let suma = 0;
for (let i = 0; i < ad.rating.length; i++) {
    suma += ad.rating[i];
}
let averageRev;
if (ad.rating.length !== 0) {
    averageRev = suma / ad.rating.length;
    console.log(averageRev);
} else {
    averageRev = 0;
}

const pRate = document.createElement('p')
pRate.setAttribute('data-id', 'averageRating')
displayRate.appendChild(pRate)

document.querySelector('#displayRate p[data-id="averageRating"]').innerHTML = `Ocena Oglasa: ${averageRev.toFixed(1)}`

}


async function loadComment() {
    const response = await fetch(`http://localhost:3000/comments?adId=${adId}`);
    const comments = await response.json();
    console.log(comments);

    const divComments = document.getElementById('divComments')
    const h4 = document.createElement('h4')
        h4.innerHTML = `Komentari`
        divComments.appendChild(h4)
    for (let i = 0; i < comments.length; i++) {
        const p1 = document.createElement('p')
        p1.innerHTML = `-${comments[i].text}`
        divComments.appendChild(p1)
        
    }


    document.getElementById('commentBtn').addEventListener('click', async function(){

       const addCom = document.getElementById('comment').value
        console.log(addCom);
       const displayNewComment = await fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: addCom,
                adId: adId,
                userId: userId
            })
        });

        const pNewComment = document.createElement('p')
        pNewComment.innerHTML = 'Vas Komentar: ' + addCom
        divComments.appendChild(pNewComment)
   
    })



    
}
loadComment();























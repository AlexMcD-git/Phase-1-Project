const championsArray = []

document.addEventListener('DOMContentLoaded', fetchData)

function fetchData(){
  fetch(`http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json`)
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    championsObj = data['data']

    for (champions in championsObj) { 
      championsArray.push(championsObj[champions]) 
    }
    console.log(championsObj)
    console.log(championsArray)
    championsArray.forEach(renderChamp)
  })
}

const renderChamp = (champion)=>{
  const picURL = (champion.image.full)
  // console.log(champion)
  const champDiv = document.createElement('span')
  const pic = document.createElement('img')
  champDiv.appendChild(pic)
  pic.src = `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${picURL}`
  pic.alt = champion.id
  pic.title = champion.title
  pic.addEventListener('mouseover', mouseoverChampionFunction)
  pic.addEventListener('click', clickChampionFunction)
  document.getElementById('champs').appendChild(champDiv)
}

const mouseoverChampionFunction = (event)=>{

}

const clickChampionFunction = (event)=>{
  const featured = document.querySelector('#featuredChampion')
  featured.innerHTML = ''
  const nameFeatured = document.createElement('h2')
  const titleFeatured = document.createElement('h3')
  const picFeatured = document.createElement('img')
  
  const statsObj = {}//Reference the champion's stats object
  const statsListFeatured = document.createElement('ul')
  //for...in on statsObj, append li element to statsList
  console.log(championsObj[event.target.alt].title)
  nameFeatured.textContent = championsObj[event.target.alt].name
  titleFeatured.textContent = championsObj[event.target.alt].title
  picFeatured.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${event.target.alt}_0.jpg`
  featured.append(nameFeatured, titleFeatured, picFeatured, statsListFeatured)
}






//items stuff. maybe a further strech
//   fetch(`http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/item.json`)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//       let itemsObj = data['data']
//       console.log(itemsObj)
//       for (items in itemsObj){
//         if (itemsObj[`${items}`].gold.purchasable){
//           buyableItems.push(itemsObj[`${items}`])
//         }
//       }
//       console.log(buyableItems)
//   });

// const renderItems = (item)=>{
//   const picURL = (item[`${champion}`].image.full)
//   const itemDiv = document.createElement('div')
//   const pic = document.createElement('img')
//   picDiv.appendChild(pic)
//   pic.src = `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${picURL}`
//   document.getElementById('champs').appendChild(champDiv)


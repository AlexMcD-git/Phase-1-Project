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

const renderChamp = (champion) => {
  const picURL = (champion.image.full)
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
  const name = document.getElementById("name");
  const title = document.getElementById("title");
  const pic = document.getElementById("profpic");
  name.innerHTML = event.target.alt;
  title.innerHTML = event.target.title;
  pic.src = event.target.src;
}

const clickChampionFunction = (event)=>{
  const featured = document.querySelector('#featuredChampion')
  const featuredObject = championsObj[event.target.alt]
  featured.innerHTML = ''
  const nameFeatured = document.createElement('h2')
  const titleFeatured = document.createElement('h3')
  const picFeatured = document.createElement('img')

  const resource = featuredObject.partype
  const statsObj = {...featuredObject.stats}
  
  //split into base stats and scaling stats to make level slider easier to (implement if we get there) without adding any  real difficulty here
  const statsListFeatured = document.createElement('ul')
  statsListFeatured.className = `baseStats`
  const scalingStats = document.createElement('ul')
  scalingStats.className = `scalingStats`

  statsListFeatured.innerHTML = `
    <li>Health: ${statsObj.hp}</li>
    <li>${resource}: ${statsObj.mp}</li>
    <li>Attack Damage: ${statsObj.attackdamage}</li>
    <li>Attack Speed: ${statsObj.attackspeed}</li>
    <li>Armor: ${statsObj.armor}</li>
    <li>Magic Resist: ${statsObj.spellblock}</li>
    <li>Movement Speed: ${statsObj.movespeed}</li>
    <li>Health Regeneration: ${statsObj.hpregen}</li>
    ${statsObj.mpregen?`<li>${resource} Regeneration: ${statsObj.mpregen}</li>`:``}
  `
  scalingStats.innerHTML =`
    <li>Health per Level: ${statsObj.hpperlevel}</li>
    ${statsObj.mpperlevel?`<li>${resource} per Level: ${statsObj.mpperlevel}</li>`:``}
    <li>Attack Damage per Level: ${statsObj.attackdamageperlevel}</li>
    <li>Attack Speed per Level: ${statsObj.attackspeedperlevel}%</li>
    <li>Armor per Level: ${statsObj.armorperlevel}</li>
    <li>Magic Resist per Level: ${statsObj.spellblockperlevel}</li>
    <li>Health Regeneration per Level: ${statsObj.hpregenperlevel}</li>
    ${statsObj.mpregenperlevel?`<li>${resource} Regeneration per Level: ${statsObj.mpregenperlevel}</li>`:``}
  `

  nameFeatured.textContent = featuredObject.name
  titleFeatured.innerHTML = `<em>${featuredObject.title}</em>`

  picFeatured.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${event.target.alt}_0.jpg`
  featured.append(nameFeatured, titleFeatured, statsListFeatured,picFeatured, scalingStats)
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


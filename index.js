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
  const featuredObject = championsObj[event.target.alt];
  document.getElementById("name").innerHTML = featuredObject.name;
  document.getElementById("title").innerHTML = featuredObject.title
  document.getElementById("profpic").src = event.target.src;

  document.getElementById("attack").innerHTML = `Attack Damage: ${featuredObject.info.attack}`;
  document.getElementById("spell").innerHTML = `Spell Damage: ${featuredObject.info.defense}`;
  document.getElementById("defense").innerHTML = `Defense: ${featuredObject.info.defense}`;
  document.getElementById("difficulty").innerHTML = `Difficulty: ${featuredObject.info.difficulty}`;
  console.log(featuredObject)
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

  statsListFeatured.innerHTML = statsRender(featuredObject.stats, featuredObject.partype, 1)

  //this is not dynamic so there is no reason to give it the same treatment
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

  levelSlider = document.createElement('form')
  levelSlider.innerHTML = `<input type="range" min="1" max="18" value="1" class="slider" id="myRange">`
  levelSlider.obj = featuredObject
  levelSlider.addEventListener('input', updateValue)

  levelDisplay = document.createElement('p')
  levelDisplay.textContent = `Level: 1`

  featured.append(nameFeatured, titleFeatured, statsListFeatured, picFeatured, scalingStats, levelDisplay, levelSlider)
}

function updateValue(event){
  levelDisplay.textContent = `Level: ${event.target.value}`
  document.querySelector(`.baseStats`).innerHTML = statsRender(this.obj.stats, this.obj.partype, event.target.value)
}

function statsRender(statsObj, resource, level){
  console.log(statsObj)
  const htmlString = 
  `
    <li>Health: ${statsObj.hp+(statsObj.hpperlevel*(level-1))}</li>
    ${statsObj.mp?`<li>${resource}: ${statsObj.mp+(statsObj.mpperlevel*(level-1))}</li>`:``}
    <li>Attack Damage: ${(statsObj.attackdamage+(statsObj.attackdamageperlevel*(level-1))).toFixed(0)}</li>
    <li>Attack Speed: ${(statsObj.attackspeed+((statsObj.attackspeed*(statsObj.attackspeedperlevel/100))*(level-1))).toFixed(3)}</li>
    <li>Armor: ${(statsObj.armor+(statsObj.armorperlevel*(level-1))).toFixed(0)}</li>
    <li>Magic Resist: ${(statsObj.spellblock+(statsObj.spellblockperlevel*(level-1))).toFixed(0)}</li>
    <li>Movement Speed: ${statsObj.movespeed}</li>
    <li>Health Regeneration: ${(statsObj.hpregen+(statsObj.hpregenperlevel*(level-1))).toFixed(1)}</li>
    ${statsObj.mpregen?`<li>${resource} Regeneration: ${(statsObj.mpregen+(statsObj.mpregenperlevel*(level-1))).toFixed(1)}</li>`:``}
  `
  return htmlString
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


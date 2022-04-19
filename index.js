const buyableItems = []

// hi alex i hope this works
//it does


document.addEventListener('DOMContentLoaded', () => {
  fetch(`http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      championsObj = data['data']
      console.log(championsObj)
      for (champions in championsObj) { renderChamp(champions) }
    })

})

const renderChamp = (champion)=>{
  const picURL = (championsObj[`${champion}`].image.full)
  const champDiv = document.createElement('div')
  const pic = document.createElement('img')
  champDiv.appendChild(pic)
  pic.src = `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${picURL}`
  pic.alt = champion
  pic.addEventListener('mouseover', mouseoverChampionFunction)
  pic.addEventListener('click', clickChampionFunction)
  document.getElementById('champs').appendChild(champDiv)
}

const mouseoverFunction = (event)=>{
  
}

const clickChampionFunction = (event)=>{

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


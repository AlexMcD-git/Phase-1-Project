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
  console.log(champion)
  const champDiv = document.createElement('span')
  const pic = document.createElement('img')
  champDiv.appendChild(pic)
  pic.src = `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${picURL}`
  pic.title = champion.id;
  pic.id = champion.title;
  pic.addEventListener('mouseover', mouseoverChampionFunction)
  pic.addEventListener('click', clickChampionFunction)
  document.getElementById('champs').appendChild(champDiv)
}

const mouseoverChampionFunction = (event)=>{
  const name = document.getElementById("name");
  const title = document.getElementById("title");
  const pic = document.getElementById("profpic");
  name.innerHTML = event.target.title;
  title.innerHTML = event.target.id;
  pic.src = event.target.src;
}

const clickChampionFunction = (event)=>{
  console.log(event.target.alt)
  const main = document.querySelector('main')
  //main.innerHTML = ''
  const name = document.createElement('h2')
  const title = document.createElement('h3')
  const splashPic = document.createElement('img')
  
  const statsObj = {}//Reference the champion's stats object
  const statsList = document.createElement('ul')
  //for...in on statsObj, append li element to statsList

  main.append(name, title, splashPic, statsList)
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


// fetch('https://api.fbi.gov/wanted/v1/list')
//   .then((response) => {
//     if (response.status === 200) {
//       return response.json();
//     } else {
//       throw new Error("Something went wrong on API server!");
//     }
//   })
//   .then((response) => {
//     showInfo(response)
//     // …
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const showInfo = (data) => {
//     var foo = 7
//     console.log(data);


//     const photos = data['items'][foo]['images'];
//     photos.forEach(photo => {
//         console.log(photo['original']);

//         const img = document.createElement('img');
//         const imgBox = document.getElementById('images');

//         img.src = photo['original'];
//         imgBox.appendChild(img);
//     })

//     const crimeText = document.getElementById('crime-description');
//     crimeText.innerText = data['items'][foo]['title']
//}

const cheerio = require('cheerio');

fetch('https://api.fbi.gov/wanted/v1/list')
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    showInfo(response)
    // …
  })
  .catch((error) => {
    console.error(error);
  });


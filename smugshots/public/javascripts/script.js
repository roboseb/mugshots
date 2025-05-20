

const refDesc = document.querySelector('.card-description').getBoundingClientRect();
// console.log(refDesc.width, refDesc.height)




const descriptionCards = document.querySelectorAll(".crime-description-card");
descriptionCards.forEach(card => {
    card.style.width = refDesc.width + "px";
})


window.onload = () => {
    var drake = dragula({
        copy: false
    });
    const descContainers = document.querySelectorAll('.draggable');
    descContainers.forEach(container => {
        drake.containers.push(container);
    })

    drake.on('drop', (el, target) => {

        checkCards()
     });

     resizeImages();

}

const checkCards = (recent) => {
    let correctAnswers = 0;
    const cards = document.querySelectorAll('.crime-card');
    cards.forEach(card => {
        correct = card.dataset.crime;

        let test = card.querySelector('.crime-description-card')
        if (test !== null) {
            answer = test.innerText;
        } else {
            answer = null;
        }

        if (correct == answer) {
            correctAnswers += 1;
            console.log('correct!')
        }
        
    });

    const descBox = document.querySelector('#crime-description-container');
    if (descBox.children.length == 0) {
            console.log(correctAnswers);
    }
}

const resizeImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        if (img.getBoundingClientRect().width > img.getBoundingClientRect().height) {
            img.classList.add('wide');
        } else {
            img.classList.add('tall');
        }
    })
}




console.log("This is my index js file");

// Initialize the news api parameters
let apiKey = 'P7q5qZnuXZ52BOa1C2AW8gulvrsN9qz6'

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=P7q5qZnuXZ52BOa1C2AW8gulvrsN9qz6`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.results;
        console.log(articles);
        let newsHTML = "";
        articles.forEach((element, index) => {
            // console.log(articles[news])
            let newsAc = `<div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                        ${element["title"]}
                    </button>
                </h2>
                <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#newsAccordion">
                    <div class="accordion-body"> ${element["abstract"]} <div><small>Read more <a href="${element["url"]}">here</a></small></div></div>
                </div>
            </div>`
            newsHTML += newsAc;
        });
        newsAccordion.innerHTML = newsHTML;
    } else {
        console.log("Some error occured")
    }
}

xhr.send()


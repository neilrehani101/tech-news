document.getElementById('newsTopic').addEventListener('blur', () => {
    let newsTopic = document.getElementById('newsTopic');
    let topic = newsTopic.value;
    let topicFine = topic.replaceAll(" ", "%20")
    let apiKey = 'P7q5qZnuXZ52BOa1C2AW8gulvrsN9qz6'
    let newsAccordion = document.getElementById('newsAccordion');
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", `https://free-news.p.rapidapi.com/v1/search?q=${topicFine}&lang=en`, true);
    xhr.setRequestHeader("x-rapidapi-key", "23ff708fa5msh379bac8248fa7f3p1a13c3jsnfa084f189834");
    xhr.setRequestHeader("x-rapidapi-host", "free-news.p.rapidapi.com");
    xhr.onload = () => {
        if (this.status === 400) {
            document.getElementById('head').innerHTML = `Error`;
            newsAccordion.innerHTML = "<h3>We cannot search for a blank input. Please enter atleast 1 letter in the input field.<h3>";
        } else if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
            if (json.status === "No matches for your search.") {
                newsAccordion.innerHTML = "<h3>We have no matches for your search. Maybe you typed the topic wrong? Please check.<h3>";
                document.getElementById('head').innerHTML = `News for topic: "${topic}"`
            } else if (json.status = "ok") {
                document.getElementById('head').innerHTML = `News for topic: "${topic}"`
                let articles = json.articles;
                console.log(articles);
                let newsHTML = "";
                articles.forEach((element, index) => {
                    let newsAc = `<div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                        ${element["title"]}
                    </button>
                </h2>
                <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#newsAccordion">
                    <div class="accordion-body"> ${element["summary"]}... <div><small>Read more <a href="${element["link"]}" target="_blank">here</a></small></div></div>
                </div>
            </div>`
                    newsHTML += newsAc;
                });
                newsAccordion.innerHTML = newsHTML;
            } else {
                console.log("Some error occured")
            }
        }
    }

    xhr.send(data);
})

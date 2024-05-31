function loadNews() {
    fetch(`/api/v1/stats/`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('wrapper-news');


            data.forEach((news) => {

               var tags_string = "Tags: ";
               news.tags.forEach((tag) => {
                    tags_string += `${tag.name}, `;
               });


               const newsCard = document.createElement('div');
               newsCard.className = 'news-card border border-5 border-dark rounded text-center p-2 mb-5';

               const newsContent = document.createElement('div');
               newsContent.className = 'news-content';
               newsContent.innerHTML = `

               <div class="news-wrapper d-block text-left p-3">
                            <h3>${news.title}</h3>
                            <h4>Likes: ${news.likes}</h4>
                            <h4>Dislikes: ${news.dislikes}</h4>
                            <h4>Views: ${news.views}</h4>
                            <h4>${tags_string.slice(0, -2)}</h4>
                            <h4><a href="/${news.id}/">Read full</a></h4>
               </div>


               `;

                newsCard.appendChild(newsContent);
                newsContainer.appendChild(newsCard);
            });
        })
}

loadNews();

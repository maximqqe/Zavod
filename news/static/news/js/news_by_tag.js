let offset = 0;
const amount = 3;

const url = new URL(window.location.href);
const pathname = url.pathname;
const tag = pathname.slice(1, -1).split('/').pop();

function likeNews(newsId) {
    fetch(`/api/v1/like/${newsId}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'pk': newsId
        })
    })
    .then(response => response.json())
    .then(data => {
        updateLikesCount(newsId, data.likes);
    })
};

function updateLikesCount(newsId, likes) {
    const likesCountElement = document.getElementById(`news-${newsId}-likes`);
    likesCountElement.textContent = likes;
};


function dislikeNews(newsId) {
    fetch(`/api/v1/dislike/${newsId}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'pk': newsId
        })
    })
    .then(response => response.json())
    .then(data => {
        updateDislikesCount(newsId, data.dislikes);
    })
};

function updateDislikesCount(newsId, dislikes) {
    const dislikesCountElement = document.getElementById(`news-${newsId}-dislikes`);
    dislikesCountElement.textContent = dislikes;
}


function loadNews() {
    fetch(`/api/v1/tag/${tag}/?offset=${offset}&amount=${amount}`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('wrapper-news');

            data.forEach((news) => {
               const newsCard = document.createElement('div');
               newsCard.className = 'news-card border border-5 border-dark rounded text-center p-2 mb-5';

               const newsContent = document.createElement('div');
               newsContent.className = 'news-content';
               newsContent.innerHTML = `

               <div class="news-wrapper d-flex">
                    <div class="news-image m-3 border border-black border-4 rounded">
                            <img src=${news.image} alt="Photo" width="600" height="400">
                    </div>
                    <div>
                        <div class="news-title">
                            <h3>${news.title}</h3>
                            <p>${news.text}</p>
                        </div>
                        <div class="feedback m-3">
                            <a class='link m-2' style='font-size: 20px;' href="/${news.id}/">Read full</a>
                            <div>
                                <button onclick="likeNews('${news.id}')" class="btn btn-dark" style="width: 120px;">Like</button>
                                <button onclick="dislikeNews('${news.id}')" class="btn btn-dark ml-3" style="width: 120px;"> Dislike</button>
                            </div>
                            <div>
                                <span style="margin-right:50px;">Likes: <span id="news-${news.id}-likes" >${news.likes}</span></span>
                                <span style="width: 120px;">Dislikes: <span id="news-${news.id}-dislikes">${news.dislikes}</span></span>
                            </div>
                        </div>
                    </div>
               </div>


               `;

                newsCard.appendChild(newsContent);
                newsContainer.appendChild(newsCard);
            });
            offset += amount;
        })
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY+ 50 >= document.body.offsetHeight) {
        loadNews();
        offset += amount;
    }
});

const document_heading = document.getElementById('tag-name');
document_heading.innerHTML = tag

loadNews();
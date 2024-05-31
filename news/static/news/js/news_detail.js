const url = new URL(window.location.href);
const pathname = url.pathname;
const pk = pathname.slice(1, -1).split('/').pop();

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
    fetch(`/api/v1/news/${pk}`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('wrapper-news');
               const newsCard = document.createElement('div');
               newsCard.className = 'news-card border border-5 border-dark rounded text-center p-2 mb-5';

               const newsContent = document.createElement('div');
               newsContent.className = 'news-content';
               newsContent.innerHTML = `

               <div class="news-wrapper d-flex">
                    <div class="news-image m-3 border border-black border-4 rounded">
                            <img src=${data.image} alt="Photo" width="400" height="300">
                    </div>
                    <div>
                        <div class="news-title">
                            <h3>${data.title}</h3>
                            <p>${data.text}</p>
                        </div>
                        <div class="feedback m-3">
                            <div>
                                <button onclick="likeNews('${data.id}')" class="btn btn-dark" style="width: 120px;">Like</button>
                                <button onclick="dislikeNews('${data.id}')" class="btn btn-dark ml-3" style="width: 120px;">Dislike</button>
                            </div>
                            <div>
                                <span style="margin-right:50px;">Likes: <span id="news-${data.id}-likes" >${data.likes}</span></span>
                                <span style="width: 120px;">Dislikes: <span id="news-${data.id}-dislikes">${data.dislikes}</span></span>
                            </div>
                        </div>
                    </div>
               </div>


               `;

                newsCard.appendChild(newsContent);
                newsContainer.appendChild(newsCard);
        })
}

loadNews();
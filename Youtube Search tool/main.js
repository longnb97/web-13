var pageToken = '';
var isLoading = false;
var debounceTimeout;

$("#keyword").on("input", function() {
    var keyword = $("#keyword").val();
    pageToken = '';

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function() {
        $("#result-list").html('');
        if(keyword) {
            $(".lds-ring").css("opacity", "1");
            doSearch(keyword);
        } else $(".lds-ring").css("opacity", "0");
    }, 1000);
});

$(window).on("scroll", function() {
    if($(document).height() - ($(window).height() + $(window).scrollTop()) < 300) {
        if(pageToken && !isLoading) {
            isLoading = true;

            var keyword = $("#keyword").val();

            doSearch(keyword);
        }
    }
});

async function doSearch(keyword) {
    try {
        var response = await search(keyword, pageToken);

        pageToken = response.nextPageToken ? response.nextPageToken : null;

        var listItems = response.items
            .filter(item => item.id.kind == "youtube#video")
            .map(function(item) {
                return `
                    <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true" target="_blank">
                        <img src="${item.snippet.thumbnails.high.url}" alt="">
                        <div class="video_info">
                            <h2 class="title">${item.snippet.title}</h2>
                            <p class="description">${item.snippet.description}</p>
                            <span>View >></span>
                        </div>
                    </a>
                `;
        });

        $("#result-list").append(listItems);

        isLoading = false;
    } catch (error) {
        console.log(error);
    }
}

// function search(keyword) {
//     // pageToken = response.nextPageToken ? response.nextPageToken : null;
    
//     // // for(var i = 0; i < response.items.length; i++) {
//     // // }

//     // // response.items.forEach(function(item) {
//     // //     if(item.id.kind == "youtube#video") {
//     // //         $("#result-list").append(`
//     // //             <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true" target="_blank">
//     // //                 <img src="${item.snippet.thumbnails.high.url}" alt="">
//     // //                 <div class="video_info">
//     // //                     <h2 class="title">${item.snippet.title}</h2>
//     // //                     <p class="description">${item.snippet.description}</p>
//     // //                     <span>View >></span>
//     // //                 </div>
//     // //             </a>
//     // //         `);
//     // //     }
//     // // });

//     // // var videos = response.items.filter(function(item) {
//     // //     return item.id.kind == "youtube#video";
//     // // });

//     // var listItems = response.items
//     //     .filter(item => item.id.kind == "youtube#video")
//     //     .map(function(item) {
//     //         return `
//     //             <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true" target="_blank">
//     //                 <img src="${item.snippet.thumbnails.high.url}" alt="">
//     //                 <div class="video_info">
//     //                     <h2 class="title">${item.snippet.title}</h2>
//     //                     <p class="description">${item.snippet.description}</p>
//     //                     <span>View >></span>
//     //                 </div>
//     //             </a>
//     //         `;
//     // });

//     // $("#result-list").append(listItems);

//     // isLoading = false;
//     promiseFunction(keyword)
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

function search(keyword, pageToken) {
    return $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pageToken}`,
        type: "GET"
    });
}


window.addEventListener("load", fetchImageNameList);

document.addEventListener("keydown", function (event){
    const textIn = document.getElementById("search").value.toLowerCase();
    if (event.key === 'Enter'){
        window.location.href = "detail/detail.html?param="+ encodeURIComponent(textIn);

    }
});
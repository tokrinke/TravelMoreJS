const path = location.href.split("/").pop().split(".")[0];

if(path === "homepage"){
    const activeUser = sessionStorage.getItem("current_user_data");
    const userToken = sessionStorage.getItem("token");
    if(activeUser || userToken){
        location.href = "./homepage.html";
    }
}


function displayAlert(title, text, icon){
    Swal.fire({title, text, icon});
}
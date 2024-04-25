const baseUrl = "https://api.chrlund.com/wp-json/wp/v2/";
const recipeCategoryId = 1;

const containerEl = document.querySelector(".container");

// get token from backend
function getToken(){
  const loginInfo = {
    username: "api-user",
    password: "cYqm dOLp Y8d1 JAEa ioaZ EEEc"
  }
return fetch("https://api.chrlund.com/wp-json/jwt-auth/v1/token", {
  method: "POST", 
  headers: {
    "Content-Type" : "application/json"
  },
  body: JSON.stringify(loginInfo)
})
.then(res => res.json())
.then(data => {
  console.log(data)
  sessionStorage.setItem("myToken", data.data.token)
})
.catch(err => console.log("Fejl:", err))
}

getToken()
.then(() => getPrivateRecipes());


// get all recipes

function getPrivateRecipes(){
  fetch(baseUrl + `posts?status=private&categories=${recipeCategoryId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("myToken"),
    }
  })
  .then(res => res.json())
  .then(recipes => {/* noget her */ 
    console.log(recipes);
  })
  .catch(err => console.log("fejl!:", err))
}

// getAllRecipes();
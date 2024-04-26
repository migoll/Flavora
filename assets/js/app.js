const baseUrl = "https://api.chrlund.com/wp-json/wp/v2/";
const recipeCategoryId = 3;

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
  .then(recipes => {
    recipes.forEach(recipe => {
      //create div, h2 for each recipe
      const recipeEl = document.createElement("div");
      const titleEl = document.createElement("h2");
      const contentEl = document.createElement("div");
      const aboutEl = document.createElement("p");
      const ingredientEl = document.createElement("ul");
      const preperationEl = document.createElement("ol");
      const preperationLiEl = document.createElement("li")
      const ingredientLiEl = document.createElement("li")

      // add content to elements
      titleEl.textContent = recipe.acf.title
      aboutEl.textContent = recipe.acf.about
      ingredientLiEl.textContent = recipe.acf.ingredients
      preperationLiEl.textContent = recipe.acf.preperation
      
      recipeEl.classList.add(".recipeStyling")

      //append elements into containers
      recipeEl.appendChild(titleEl);
      recipeEl.appendChild(contentEl);
      contentEl.appendChild(aboutEl);
      contentEl.appendChild(ingredientEl);
      contentEl.appendChild(preperationEl);
      ingredientEl.appendChild(preperationLiEl);
      preperationEl.appendChild(ingredientLiEl);


      containerEl.appendChild(recipeEl)
    })
    console.log(recipes);
  })
  .catch(err => console.log("fejl!:", err))
}

// getAllRecipes();
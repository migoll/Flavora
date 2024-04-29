import { getToken, getPrivateRecipes, renderRecipes } from "./app.js";


// call the getToken function to create subsite specific containers, and render recipes into the containers

getToken()
.then(getPrivateRecipes)
.then(recipes => {
    const containerPopularRecipesEl = document.querySelector(".containerPopularRecipes");
    const containerQuickAndEasyEl = document.querySelector(".containerQuickAndEasy");
    const containerEasterAndPassoverEl = document.querySelector(".containerEasterAndPassover");
    const containerNewestArticlesEl = document.querySelector(".containerNewestArticles");

    // render our recipes into the different containers, and chose amount of recipes 
    renderRecipes(recipes, containerPopularRecipesEl, 4);
    renderRecipes(recipes, containerQuickAndEasyEl, 3);
    renderRecipes(recipes, containerEasterAndPassoverEl, 3);
    renderRecipes(recipes, containerNewestArticlesEl, 3);
})


























/* const baseUrl = "https://api.chrlund.com/wp-json/wp/v2/";
const recipeCategoryId = 3;
const quickAndEasyCategoryId = 7;
const easterAndPassoverCategoryId = 6;
const articlesCategoryId = 5;

const wrapperEl = document.querySelector(".wrapper");
const containerPopularRecipesEl = document.querySelector(".containerPopularRecipes");
const containerQuickAndEasyEl = document.querySelector(".containerQuickAndEasy");
const containerEasterAndPassoverEl = document.querySelector(".containerEasterAndPassover");
const containerNewestArticlesEl = document.querySelector(".containerNewestArticles");

// get token from backend

getToken()
.then(() => getPrivateRecipes());


// get all recipes

function getPrivateRecipes(){
  fetch(baseUrl + `posts?status=private&categories=${recipeCategoryId}&per_page=30`, {
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

*/
import { getToken, getPrivateRecipesByTags, renderRecipes } from "./app.js";

// Call the getToken function to create subsite specific containers, and render recipes into the containers
getToken().then(() => {
  const recipesEl = document.querySelector(".containerSeperateQuickAndEasy");

  // Render recipes from different categories into corresponding containers
  getPrivateRecipesByTags("11").then((recipes) => {
    renderRecipes(recipes, recipesEl, 5);
  });
});

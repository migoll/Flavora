import { getToken, getPrivateRecipesByCategory, renderRecipes } from "./app.js";

// Call the getToken function to create subsite specific containers, and render recipes into the containers
getToken().then(() => {
  const containerPopularRecipesEl = document.querySelector(
    ".containerPopularRecipes"
  );
  const containerQuickAndEasyEl = document.querySelector(
    ".containerQuickAndEasy"
  );
  const containerEasterAndPassoverEl = document.querySelector(
    ".containerEasterAndPassover"
  );
  const containerNewestArticlesEl = document.querySelector(
    ".containerNewestArticles"
  );

  // Render recipes from different categories into corresponding containers
  getPrivateRecipesByCategory(3).then((recipes) => {
    renderRecipes(recipes, containerPopularRecipesEl, 4, false);
  });

  getPrivateRecipesByCategory(7).then((recipes) => {
    renderRecipes(recipes, containerQuickAndEasyEl, 3, false);
  });

  getPrivateRecipesByCategory(6).then((recipes) => {
    renderRecipes(recipes, containerEasterAndPassoverEl, 3, false);
  });

  getPrivateRecipesByCategory(5).then((recipes) => {
    renderRecipes(recipes, containerNewestArticlesEl, 3, false);
  });
});

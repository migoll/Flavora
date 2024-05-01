import { getToken, getPrivateRecipesByCategory, renderRecipes } from "./app.js";

getToken().then(() => {
  const containerSeperateArticlesEl = document.querySelector(
    ".containerSeperateArticles"
  );

  getPrivateRecipesByCategory(5).then((recipes) => {
    renderRecipes(recipes, containerSeperateArticlesEl, 4, false);
  });
});

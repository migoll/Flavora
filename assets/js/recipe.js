import {
  getToken,
  getPrivateRecipesByTags,
  renderRecipes,
  getPrivateRecipeById,
} from "./app.js";

getToken().then(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  const recipesEl = document.querySelector(".containerSeperateQuickAndEasy");

  getPrivateRecipeById(recipeId).then((recipe) => {
    renderRecipes([recipe], recipesEl, 1, true);
  });
});

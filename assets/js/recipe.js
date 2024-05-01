import {
  getToken,
  getPrivateRecipesByTags,
  renderRecipes,
  getPrivateRecipeById,
} from "./app.js";

getToken().then(() => {
  const url = new URL(window.location.toString());

  const recipeId = url.searchParams.get("id");

  const recipesEl = document.querySelector(".containerSeperateQuickAndEasy");

  getPrivateRecipeById(recipeId).then((recipe) => {
    renderRecipes([recipe], recipesEl, 1, true);
  });
});

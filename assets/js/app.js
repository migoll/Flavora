const baseUrl = "https://api.chrlund.com/wp-json/wp/v2/";

// get token from backend
export function getToken() {
  const loginInfo = {
    username: "api-user",
    password: "cYqm dOLp Y8d1 JAEa ioaZ EEEc",
  };

  return fetch("https://api.chrlund.com/wp-json/jwt-auth/v1/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      sessionStorage.setItem("myToken", data.data.token);
    })
    .catch((err) => console.log("Fejl:", err));
}

// get all recipes
export function getPrivateRecipesByCategory(categoryId) {
  return fetch(
    baseUrl +
      `posts?acf_format=standard&status=private&categories=${categoryId}&per_page=30`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("myToken"),
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log("error has occured!:", err));
}

// render recipes
export function renderRecipes(recipes, containerEl, numToShow, includeContent) {
  containerEl.innerHTML = "";

  recipes.slice(0, numToShow).forEach((recipe) => {
    const recipeEl = document.createElement("div");
    const titleEl = document.createElement("h3");

    recipeEl.appendChild(titleEl);
    titleEl.textContent = recipe.acf.title;

    //tilføj styling til minimal content recipes
    recipeEl.classList.add("recipeStyling");

    // hvis includeContent er true, render alt
    if (includeContent) {
      const contentEl = document.createElement("div");
      const aboutEl = document.createElement("p");
      const ingredientEl = document.createElement("ul");
      const preperationEl = document.createElement("ol");
      const preperationLiEl = document.createElement("li");
      const ingredientLiEl = document.createElement("li");

      // add content to elements
      aboutEl.textContent = recipe.acf.about;
      ingredientLiEl.textContent = recipe.acf.ingredients;
      preperationLiEl.textContent = recipe.acf.preperation;

      //append elements into containers
      recipeEl.appendChild(contentEl);

      contentEl.appendChild(aboutEl);
      contentEl.appendChild(ingredientEl);
      contentEl.appendChild(preperationEl);

      ingredientEl.appendChild(preperationLiEl);
      preperationEl.appendChild(ingredientLiEl);
    }

    if (recipe.acf.image) {
      const imageEl = document.createElement("img");
      imageEl.src = recipe.acf.image.url;
      recipeEl.appendChild(imageEl);
    }

    containerEl.appendChild(recipeEl);
  });
}

export function getPrivateRecipesByTags(tagId) {
  return fetch(
    baseUrl +
      `posts?acf_format=standard&status=private&tags=${tagId}&per_page=30`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("myToken"),
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log("error has occured!:", err));
}

//Tilføj includeContent boolean i renderRecipes, der enten er true (indholder alt indhold på recipes) eller false der kun giver få indhold

// wrap en if omkring det indhold der skal være en del af includeContent

//tilføj true eller false som renderRecipe parameter

// hav default styling .recipeStyling til false (minimal content), men hav .includeContentRecipeStyling til true (includeContent), altså når man clicker ind på recipe

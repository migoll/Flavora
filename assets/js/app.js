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
export function renderRecipes(recipes, containerEl, numToShow) {
  containerEl.innerHTML = "";

  recipes.slice(0, numToShow).forEach((recipe) => {
    const recipeEl = document.createElement("div");
    const titleEl = document.createElement("h2");
    const contentEl = document.createElement("div");
    const aboutEl = document.createElement("p");

    const ingredientEl = document.createElement("ul");
    const preperationEl = document.createElement("ol");
    const preperationLiEl = document.createElement("li");
    const ingredientLiEl = document.createElement("li");

    const imageEl = document.createElement("img");

    // add content to elements
    titleEl.textContent = recipe.acf.title;
    aboutEl.textContent = recipe.acf.about;
    ingredientLiEl.textContent = recipe.acf.ingredients;
    preperationLiEl.textContent = recipe.acf.preperation;
    imageEl.src = recipe.acf.image.url;

    recipeEl.classList.add(".recipeStyling");

    //append elements into containers
    recipeEl.appendChild(titleEl);
    recipeEl.appendChild(contentEl);

    contentEl.appendChild(aboutEl);
    contentEl.appendChild(ingredientEl);
    contentEl.appendChild(preperationEl);

    ingredientEl.appendChild(preperationLiEl);
    preperationEl.appendChild(ingredientLiEl);
    contentEl.appendChild(imageEl);

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

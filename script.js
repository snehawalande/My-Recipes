const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


//function to fetch recepies
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>";
    try {
        
   
   const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);   //data fetch from this api return promise
   const response = await data.json();    //data fetched from fetch function will convert to json

   recipeContainer.innerHTML = "";
   response.meals.forEach(meal =>{
       const recipeDiv = document.createElement('div');   // create a html element like div
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">   
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>

       
       `
       const button = document.createElement('button');
       button.textContent = "View Recipe";
       recipeDiv.appendChild(button);
       recipeContainer.appendChild(recipeDiv);

    //    adding event listener to the recipe button
         button.addEventListener('click',()=>{
             openRecipePopup(meal);
         });

       //get image of meal from using  strmealthumb
   });
//    console.log(response.meals[0]);
      }
   catch (error) {
    recipeContainer.innerHTML = "<h2>Something went wrong...Type again</h2>";
    }
}
 const fetchIngredients = (meal) => {
    //console.log(meal);
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;

}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
      <h3 class="recipeName">${meal.strMeal}</h3>
      <h4>Ingredients:</h4>
      <ul class="ingridientList">${fetchIngredients(meal)}</ul>
      <div class="">
      <h4>Instruction: </h4>
      <p>${meal.strInstructions}</p>
      </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";

}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();  //
    const searchInput = searchBox.value.trim();   //whatever value user give store in this var
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the recipe you want to search...</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    console.log("Button clicked")
});
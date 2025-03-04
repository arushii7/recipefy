// DOM Elements
const addRecipeBtn = document.getElementById('add-recipe-btn');
const viewRecipesBtn = document.getElementById('view-recipes-btn');
const addRecipeModal = document.getElementById('add-recipe-modal');
const recipeForm = document.getElementById('recipe-form');
const mainContainer = document.getElementById('main-container');
const recipeListContainer = document.getElementById('recipe-list-container');
const recipeGrid = document.getElementById('recipe-grid');
const backBtn = document.getElementById('back-btn');

// Event Listeners
addRecipeBtn.addEventListener('click', () => {
    addRecipeModal.style.display = 'flex';
});

// Close modal when clicking outside of it
addRecipeModal.addEventListener('click', (e) => {
    if (e.target === addRecipeModal) {
        addRecipeModal.style.display = 'none';
    }
});

// Submit recipe form
recipeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const recipeName = document.getElementById('recipe-name').value.trim();
    const ingredients = document.getElementById('recipe-ingredients').value.trim();
    const instructions = document.getElementById('recipe-instructions').value.trim();
    const cookingTime = document.getElementById('recipe-time').value;
    
    if (!recipeName || !ingredients || !instructions || !cookingTime) {
        alert('Please fill out all fields');
        return;
    }
    
    // Create recipe object
    const recipe = {
        id: Date.now(), // Add unique ID for deletion purposes
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        time: cookingTime,
        date: new Date().toLocaleDateString()
    };
    
    // Save recipe to local storage
    saveRecipe(recipe);
    
    // Generate HTML file
    generateRecipeHTML(recipe);
    
    // Reset form and close modal
    recipeForm.reset();
    addRecipeModal.style.display = 'none';
    
    alert('Recipe added successfully!');
});

// View existing recipes
viewRecipesBtn.addEventListener('click', () => {
    displayRecipes();
    mainContainer.classList.add('hidden');
    recipeListContainer.classList.remove('hidden');
});

// Back button
backBtn.addEventListener('click', () => {
    mainContainer.classList.remove('hidden');
    recipeListContainer.classList.add('hidden');
});

// Save recipe to local storage
function saveRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Display recipes
function displayRecipes() {
    recipeGrid.innerHTML = '';
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    if (recipes.length === 0) {
        recipeGrid.innerHTML = '<p>No recipes added yet. Click "Add a Recipe" to get started!</p>';
        return;
    }
    
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Cooking Time: ${recipe.time} minutes</p>
            <p>Added on: ${recipe.date}</p>
            <div class="card-actions">
                <button class="view-btn">View Recipe</button>
                <button class="delete-btn" data-id="${recipe.id}">Delete</button>
            </div>
        `;
        
        // Add event listeners to buttons
        recipeCard.querySelector('.view-btn').addEventListener('click', () => {
            const fileName = recipe.name.toLowerCase().replace(/\s+/g, '-');
            openRecipe(fileName, recipe);
        });
        
        recipeCard.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            deleteRecipe(recipe.id);
        });
        
        recipeGrid.appendChild(recipeCard);
    });
}

// Delete recipe function
function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        
        // Refresh the recipe grid
        displayRecipes();
        
        alert('Recipe deleted successfully!');
    }
}

// Generate HTML file for a recipe
function generateRecipeHTML(recipe) {
    const fileName = recipe.name.toLowerCase().replace(/\s+/g, '-');
    
    // In a real environment with file system access, this function would 
    // create an actual HTML file. Since we can't do that in this environment,
    // we'll store the recipe data in localStorage and simulate file creation.
    console.log(`Recipe HTML file generated: ${fileName}.html`);
}

// Open recipe function (simulates opening an HTML file)
function openRecipe(fileName, recipe) {
    // Create a temporary HTML document and open it
    const recipeWindow = window.open('', '_blank');
    
    if (!recipeWindow) {
        alert('Pop-up blocked. Please allow pop-ups for this site.');
        return;
    }
    
    const ingredientsList = recipe.ingredients.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
    const instructionsList = recipe.instructions.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
    
    const recipeHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${recipe.name} - Recipefy</title>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
        <style>
            :root {
                --light-pink: #FFD1DC;
                --dark-pink: #FFB6C1;
                --peach: #FFDAB9;
                --dark-peach: #FFCBA4;
                --white: #FFFFFF;
            }

            body {
                font-family: 'Montserrat', sans-serif;
                background-color: var(--light-pink);
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
            }

            .container {
                max-width: 800px;
                width: 100%;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .logo {
                font-family: 'Dancing Script', cursive;
                font-size: 4rem;
                color: #FF6B8B;
                text-align: center;
                margin: 20px 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            }

            .recipe-card {
                background-color: var(--white);
                border-radius: 15px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                padding: 30px;
                margin-top: 20px;
            }

            .recipe-header {
                text-align: center;
                margin-bottom: 30px;
            }

            .recipe-title {
                color: #333;
                font-size: 2.5rem;
                margin-bottom: 10px;
            }

            .recipe-meta {
                color: #666;
                font-size: 1.1rem;
            }

            .recipe-section {
                margin-bottom: 30px;
            }

            .section-title {
                color: #333;
                font-size: 1.5rem;
                margin-bottom: 15px;
                padding-bottom: 8px;
                border-bottom: 2px solid var(--peach);
            }

            ul, ol {
                padding-left: 20px;
            }

            li {
                margin-bottom: 10px;
                line-height: 1.6;
            }

            .btn {
                background-color: var(--peach);
                color: #333;
                border: none;
                padding: 12px 25px;
                border-radius: 30px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
            }

            .btn:hover {
                background-color: var(--dark-peach);
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="logo">Recipefy</h1>
            <button class="btn" onclick="window.close()">Back to Recipes</button>
            
            <div class="recipe-card">
                <div class="recipe-header">
                    <h1 class="recipe-title">${recipe.name}</h1>
                    <p class="recipe-meta">Cooking Time: ${recipe.time} minutes | Added on: ${recipe.date}</p>
                </div>
                
                <div class="recipe-section">
                    <h2 class="section-title">Ingredients</h2>
                    <ul>
                        ${ingredientsList}
                    </ul>
                </div>
                
                <div class="recipe-section">
                    <h2 class="section-title">Instructions</h2>
                    <ol>
                        ${instructionsList}
                    </ol>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    
    recipeWindow.document.write(recipeHTML);
    recipeWindow.document.close();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports localStorage
    if (typeof(Storage) === "undefined") {
        alert("Your browser doesn't support local storage. This app may not work properly.");
    }
});
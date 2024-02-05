export default class Meal {
  constructor(data) {
    this.name = data["strMeal"];
    this.category = data["strCategory"];
    this.area = data["strArea"];
    this.instructions = data["strInstructions"];
    this.img = data["strMealThumb"];
    this.ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let strIng = `strIngredient${i}`;
      let strMeasure = `strMeasure${i}`;
      let ans = "";
      if (!data[strIng]) break;
      ans = `${data[strIng]} - ${data[strMeasure]}`;
      this.ingredients.push(ans);
    }
  }
  renderGallary() {
    return `
      <p class="meal-title">${this.name}</p>
      <div>
        <img
          src="${this.img}"
          alt="${this.name}" />
      </div>
      `;
  }
  rederAllInfo() {
    return `
    <div class="specific-meal-cnt">
      <h2>${this.name}</h2>
      <div class="img">
        <img
          src="${this.img}"
          alt="${this.name}" />
      </div>
      <div class="meal-type">
        <p>${this.category}</p>
        <p>${this.area}</p>
      </div>
      <div class="meal-info">
        <p>
          ${this.instructions}
        </p>
      </div>
      <div class="meal-ingerdients">
        <h3>Ingredients</h3>
        <ul class="ingerdients-list">  
          ${this.getAllIngrediant()}        
        </ul>
      </div>
    </div>`;
  }
  getAllIngrediant() {
    let html = ``;
    for (let i = 0; i < this.ingredients.length; i++) {
      html += `<li class="ingerdients-item">
        <p>${this.ingredients[i]}</p>
      </li>`;
    }
    return html;
  }
}

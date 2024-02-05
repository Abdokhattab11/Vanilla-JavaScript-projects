export default class Meal {
  constructor(data) {
    this.name = data["strMeal"];
    this.category = data["strCategory"];
    this.area = data["strArea"];
    this.instructions = data["strInstructions"];
    this.img = data["strMealThumb"];
    this.tags = data["strTags"] ? data["strTags"].split(/,/) : null;
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
}

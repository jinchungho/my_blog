import { Ingredient } from "./ingredient";

export class Recipe {
    constructor(
        private title: string, 
        public description:string,
        public difficulty: string,
        public ingredients: Ingredient[]){}
}
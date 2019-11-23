import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipe-book/recipe.service';
import { Recipe } from '../recipe-book/recipe-book.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipeData() {
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://ng-course-recipe-book-2765e.firebaseio.com/recipes.json', recipes)
        .subscribe((recipes)=> {
            console.log(recipes);
        });
    }

    fetchRecipeData() {
        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-2765e.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipe(recipes);
            })
        ); 
    }
}
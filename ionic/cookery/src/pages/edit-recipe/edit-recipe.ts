import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { NavParams, ActionSheetController , AlertController, ToastController} from 'ionic-angular';




@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController){

  }

  ngOnInit(){
   this.mode = this.navParams.get('mode'); 
   this.initializeForm();
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: '어떤 요리를 만들고 싶니?',
      buttons: [
        {
          text: '재료 추가',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: '모든 재료 삭제',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for(let i = len -1; i>= 0; i--){
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: '모든재료가 삭제되었습니다.',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: '취소',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAlert(){
    return this.alertCtrl.create({
      title: '재료 추가',
      inputs: [
        {
          name: 'name',
          placeholder: '이름'
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel'
        },
        {
          text: '추가',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              const toast = this.toastCtrl.create({
                message: '유효한 값들을 입력해주세요',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
              const toast = this.toastCtrl.create({
                message: '재료를 추가완료',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();  
          }
        }
      ]
    });
  }

  private initializeForm(){
    this.recipeForm =new FormGroup ({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }


}

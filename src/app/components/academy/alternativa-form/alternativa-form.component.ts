import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms/src/forms';
@Component({
  selector: 'app-alternativa-form',
  templateUrl: './alternativa-form.component.html',
  styleUrls: ['./alternativa-form.component.scss']
})
export class AlternativaFormComponent implements OnInit {
  card: any;

  constructor(

    public dialogRef: MatDialogRef<AlternativaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.card = {
      id: 12,
      name: 'Add alternative authentication pages',
      description: 'hola esta es de felix',
      idAttachmentCover: '',
      idMembers: [
        '36027j1930450d8bf7b10158'
      ],
      idLabels: [
        '6540635g19ad3s5dc31412b2',
        '56027e4119ad3a5dc28b36cd'
      ],
      attachments: [],
      subscribed: false,
      checklists: [
        {
          id: 2,
          name: 'Preguntas',
          checkItemsChecked: 1,
          checkItems: [
            {
              name: 'Login',
              checked: true
            },
            {
              name: 'Register',
              checked: true
            },
            {
              name: 'Lost Password',
              checked: false
            },
            {
              name: 'Recover Password',
              checked: false
            },
            {
              name: 'Activate Account',
              checked: false
            }
          ]
        }
      ],
      checkItems: 5,
      checkItemsChecked: 2,
      comments: [],
      activities: [],
      due: null
    }
  }

  ngOnInit() {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  addCheckItem(form: NgForm, checkList): void {
    const checkItemVal = form.value.checkItem;

    if (!checkItemVal || checkItemVal === '') {
      return;
    }

    const newCheckItem = {
      name: checkItemVal,
      checked: false
    };

    checkList.checkItems.push(newCheckItem);

    this.updateCheckedCount(checkList);

    form.setValue({ checkItem: '' });

    this.updateCard();
  }
  removeChecklistItem(checkItem, checklist): void {
    checklist.checkItems.splice(checklist.checkItems.indexOf(checkItem), 1);

    this.updateCheckedCount(checklist);

    this.updateCard();
  }
  updateCheckedCount(list): void {
    const checkItems = list.checkItems;
    let checkedItems = 0;
    let allCheckedItems = 0;
    let allCheckItems = 0;

    for (const checkItem of checkItems) {
      if (checkItem.checked) {
        checkedItems++;
      }
    }

    list.checkItemsChecked = checkedItems;

    for (const item of this.card.checklists) {
      allCheckItems += item.checkItems.length;
      allCheckedItems += item.checkItemsChecked;
    }

    this.card.checkItems = allCheckItems;
    this.card.checkItemsChecked = allCheckedItems;

    this.updateCard();
  }
  updateCard(): void {

  }
  removeChecklist(checklist): void {
    this.card.checklists.splice(this.card.checklists.indexOf(checklist), 1);

    this.updateCard();
  }
}

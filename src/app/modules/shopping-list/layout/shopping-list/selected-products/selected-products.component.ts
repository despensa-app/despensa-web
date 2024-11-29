import {Component, EventEmitter, input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {tap} from 'rxjs';

@Component({
  selector: 'app-selected-products',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './selected-products.component.html',
  styleUrl: './selected-products.component.css'
})
export class SelectedProductsComponent implements OnChanges {

  shoppingList = input.required<FindByIdShoppingListRes>();

  @Output() selectProductOption = new EventEmitter<string>();

  productOptionForm = this.formBuilder.nonNullable.group({
    productContentSelect: ''
  });

  constructor(private formBuilder: FormBuilder) {
    this.productOptionForm.valueChanges.pipe(
      tap(value => {
        this.selectProductOption.emit(value.productContentSelect);
      })
    )
        .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.shoppingList().id || this.productContentSelect.value !== '') {
      return;
    }

    this.productContentSelect.setValue(this.shoppingList()
                                           .selectProductOption
                                           .find(option => option.selected)?.value ?? '', {emitEvent: false});
  }

  get productContentSelect() {
    return this.productOptionForm.get('productContentSelect') as FormControl;
  }

}

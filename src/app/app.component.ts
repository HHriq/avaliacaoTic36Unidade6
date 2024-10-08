import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

enum ItemStatus {
  NAO_COMPRADO = 'nao_comprado',
  COMPRADO = 'comprado'
}

interface Item {
  nome: string;
  status: ItemStatus;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'AtividadeAngular';

  items: Item[] = [
    { nome: 'Açucar', status: ItemStatus.NAO_COMPRADO },
    { nome: '', status: ItemStatus.COMPRADO },
  ];

  formItem: FormGroup;
  editarItem: Item | null = null;

  constructor(private fb: FormBuilder) {
    this.formItem = this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  get itensNaoComprados() {
    return this.items.filter((item) => item.status === ItemStatus.NAO_COMPRADO);
  }

  get itensComprados() {
    return this.items.filter((item) => item.status === ItemStatus.COMPRADO);
  }

  addItem() {
    if (this.formItem.valid) {
      const itemName = this.formItem.get('itemName')?.value;

      if (this.editarItem) {
        this.editarItem.nome = itemName;
        this.editarItem = null;
      } else {
        this.items.push({ nome: itemName, status: ItemStatus.NAO_COMPRADO });
      }

      this.formItem.reset();
    }
  }

  startEditing(item: Item) {
    this.editarItem = item;
    this.formItem.setValue({ itemName: item.nome });
  }

  toggleItem(item: Item) {
    item.status = item.status === ItemStatus.NAO_COMPRADO ? ItemStatus.COMPRADO : ItemStatus.NAO_COMPRADO;
  }

  removeItem(item: Item) {
    if (confirm(`Você tem certeza que deseja remover "${item.nome}"?`)) {
      this.items = this.items.filter((i) => i !== item);
    }
  }
}
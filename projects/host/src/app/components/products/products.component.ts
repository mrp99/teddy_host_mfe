import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductListService } from '../../shared/services/product-list.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatExpansionModule],
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productListService: ProductListService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productListService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        console.log("Erro ao carregar os lista de produtos!", err);
      }
    });
  }

}

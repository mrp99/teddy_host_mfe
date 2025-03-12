import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private products: Product[] = [
    {
      title: 'Crédito Imobiliário e Home Equity',
      shortDescription: 'Linhas de crédito com garantia imobiliária.',
      longDescription: 'Oferece linhas de crédito com garantia imobiliária, permitindo que clientes utilizem seus imóveis para obter empréstimos com condições diferenciadas.',
    },
    {
      title: 'Financiamento de Veículos',
      shortDescription: 'Opções de financiamento para veículos.',
      longDescription: 'Disponibiliza opções de financiamento para aquisição de veículos, com taxas competitivas e prazos flexíveis.',
    },
    {
      title: 'Consórcio',
      shortDescription: 'Sistemas de consórcio para diversos bens.',
      longDescription: 'Disponibiliza consórcio de casa, carro, moto, outros bens ou serviços de forma prática e segura com vários bancos parceiros.',
    },
    {
      title: 'Seguros',
      shortDescription: 'Cotações em múltiplas seguradoras.',
      longDescription: 'Ofertamos cotações em mais de 15 companhias em tempo real, dentre eles: seguro de vida, empresa, veículos e outros.',
    },
    {
      title: 'Conta Digital',
      shortDescription: 'Soluções de contas digitais.',
      longDescription: 'Indicamos contas digitais, internacionais ou Escrow com uma plataforma e serviços exclusivos.',
    },
    {
      title: 'Operações de Câmbio',
      shortDescription: 'Serviços de câmbio para PF e PJ.',
      longDescription: 'Entregamos as melhores cotações com portfólios de produtos de importação e exportação.',
    },
  ];

  constructor() { }

  public getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}

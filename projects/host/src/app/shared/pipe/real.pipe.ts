import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real',
  standalone: true
})
export class RealPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) return '';  // Verifica se o valor é um número válido
    let valueStr = value.toFixed(2);  // Converte o número em uma string com 2 casas decimais
    let [integerPart, decimalPart] = valueStr.split('.');  // Divide em parte inteira e decimal
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');  // Formata a parte inteira com ponto
    return `R$ ${integerPart},${decimalPart}`;  // Retorna no formato desejado
  }

}

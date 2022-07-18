import { Component, OnInit } from '@angular/core';
import { somaObj } from '../objetos/somaObj';
import { apiService } from '../services/apiService';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  public numeros: Array<any>;
  public historico: Array<somaObj>;
  public inputNumbersAux: String;
  public inputNumbers: String;
  public f_numero: String;
  public s_numero: String;
  public add: boolean;

  constructor(private api: apiService, private objSoma: somaObj) {
    this.numeros = [
      { n: 7 },
      { n: 8 },
      { n: 9 },
      { n: 4 },
      { n: 5 },
      { n: 6 },
      { n: 1 },
      { n: 2 },
      { n: 3 },
      { n: 0 },
      { n: '00' },
      { n: 'BS' },
    ];
    this.historico = new Array<somaObj>();

    this.inputNumbers = '';
    this.inputNumbersAux = '';
    this.f_numero = '';
    this.s_numero = '';
    this.add = false;
  }

  clickBtn(ev: any) {
    if (ev.path[0].innerHTML.replace(/\s/g, '') === 'BS') {
      if (this.s_numero.length === 0 && this.inputNumbers.slice(-1) !== '+') {
        this.add === false;
        this.f_numero = this.f_numero.substring(0, this.f_numero.length - 1);
      }
      if (this.inputNumbers.slice(-1) !== '+') {
        this.s_numero = this.s_numero.substring(0, this.s_numero.length - 1);
      } else if (this.inputNumbers.slice(-1) === '+') {
        this.add = false;
      }
      this.inputNumbers = this.inputNumbers.substring(
        0,
        this.inputNumbers.length - 1
      );
    } else if (
      ev.path[0].innerHTML.replace(/\s/g, '') === '+' ||
      (this.add === true && ev.path[0].innerHTML.replace(/\s/g, '') !== 'C')
    ) {
      this.inputNumbersAux = '' + this.inputNumbers + ev.path[0].innerHTML;
      this.inputNumbers = this.inputNumbersAux.replace(/\s/g, '');

      if (ev.path[0].innerHTML.replace(/\s/g, '') !== '+') {
        this.s_numero = '' + this.s_numero + ev.path[0].innerHTML;
        this.s_numero = this.s_numero.replace(/\s/g, '');
      }
      this.add = true;
    } else if (ev.path[0].innerHTML.replace(/\s/g, '') === 'C') {
      this.inputNumbers = '';
      this.f_numero = '';
      this.s_numero = '';
      console.log('clear');
    } else if (this.add === false) {
      this.inputNumbersAux = '' + this.inputNumbers + ev.path[0].innerHTML;
      this.inputNumbers = this.inputNumbersAux.replace(/\s/g, '');
      this.f_numero = this.inputNumbers;
    }
  }

  async getResultado() {
    this.objSoma.f_numero = Number(this.f_numero);
    this.objSoma.s_numero = Number(this.s_numero);

    try {
      await this.api
        .getResultado(this.objSoma)
        .then(async (somaObj: somaObj) => {
          console.log('respos', somaObj);
          this.historico.push(somaObj);
          this.inputNumbers = '';
          this.f_numero = '';
          this.s_numero = '';
        });
    } catch (error) {
      console.log('error', error);
    }
  }

  ngOnInit(): void {
    try {
      this.api.getHistorico().then((historico: Array<somaObj>) => {
        console.log('hsiiis', historico);
        this.historico = historico;
        if (this.historico === null) {
          this.historico = new Array<somaObj>();
        }
      });
    } catch (error) {}
  }
}

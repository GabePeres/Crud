import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pessoa } from '../pessoa';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pessoa-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pessoa-create.component.html',
  styleUrl: './pessoa-create.component.scss'
})
export class PessoaCreateComponent {
  nomeAdicionar = '';
  sobreNomeAdicionar = '';
  idadeAdicionar = null;
  urlApi = 'http://localhost:5075';
  constructor(private http: HttpClient) { }


  adicionarPessoa() {
    if (!this.nomeAdicionar || !this.sobreNomeAdicionar || !this.idadeAdicionar) {
      return;
    }

    const pessoaCriar: Pessoa = {
      nome: this.nomeAdicionar,
      sobreNome: this.sobreNomeAdicionar,
      idade: this.idadeAdicionar
    }
    this.http.get<Pessoa[]>(`${this.urlApi}/api/pessoas`)
  }

  irParaLista(): void {
    window.location.href = '/api/pessoas'; // Navega para a URL diretamente
  }

  voltar(): void {
    window.location.href = '/api/pessoas' // Volta para a tela principal
  }

}

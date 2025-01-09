import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from './models/pessoa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FrontAngular';
  constructor(private http: HttpClient) { }
  urlApi = 'http://localhost:5075';
  pessoas$?: Observable<Pessoa[]>;
  exibeFormularioEditar = false;
  exibeFormularioCadastro = true;

  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas() {
    this.pessoas$ = this.http.get<Pessoa[]>(`${this.urlApi}/api/pessoas`)
  }


  //adicionar Pessoa
  nomeAdicionar = '';
  sobreNomeAdicionar = '';
  idadeAdicionar = null;

  adicionarPessoa() {
    if (!this.nomeAdicionar || !this.sobreNomeAdicionar || !this.idadeAdicionar) {
      return;
    }

    const pessoaCriar: Pessoa = {
      nome: this.nomeAdicionar,
      sobreNome: this.sobreNomeAdicionar,
      idade: this.idadeAdicionar
    }
    this.http.post<Pessoa[]>(`${this.urlApi}/api/pessoas`, pessoaCriar)
      .subscribe(_ => this.obterPessoas()); // recarrega a lista de pessoas

    this.limparCampos();
  }


  //editar Pessoa
  idAtualizar = -1;
  nomeAtualizar = '';
  sobreNomeAtualizar = '';
  idadeAtualizar? = 0;

  obterDados(pessoa: Pessoa) {
    console.log(pessoa);
    this.exibeFormularioEditar = true;
    this.exibeFormularioCadastro = false;

    this.idAtualizar = pessoa.id || -1;
    this.nomeAtualizar = pessoa.nome;
    this.sobreNomeAtualizar = pessoa.sobreNome;
    this.idadeAtualizar = pessoa.idade;
  }

  editarPessoa() {
    if (!this.idAtualizar || !this.nomeAtualizar || !this.sobreNomeAtualizar || !this.idadeAtualizar) {
      return;
    }

    const pessoaEditar: Pessoa = {//body do put
      id: this.idAtualizar,
      nome: this.nomeAtualizar,
      sobreNome: this.sobreNomeAtualizar,
      idade: this.idadeAtualizar
    }
    this.http.put<Pessoa[]>(`${this.urlApi}/api/pessoas/${this.idAtualizar}`, pessoaEditar)
      .subscribe(_ => this.obterPessoas()); // recarrega a lista de pessoas

    this.limparCamposEdit();
    this.exibeFormularioEditar = false;
    this.exibeFormularioCadastro = true;
  }



  cancelaEdit() {
    this.limparCampos();
    this.exibeFormularioEditar = false;
    this.exibeFormularioCadastro = true;

  }

  excluirPessoa(id: number | undefined) {
    this.http.delete<Pessoa[]>(`${this.urlApi}/api/pessoas/${id}`)
      .subscribe(_ => this.obterPessoas());    
  }

  limparCampos() {
    this.nomeAdicionar = '';
    this.sobreNomeAdicionar = '';
    this.idadeAdicionar = null;
  }

  limparCamposEdit() {
    this.idAtualizar = -1;
    this.nomeAtualizar = '';
    this.sobreNomeAtualizar = '';
    this.idadeAtualizar = undefined;
  }

  profileForm = new FormGroup({
    nome: new FormControl('', Validators.required),
  });
}

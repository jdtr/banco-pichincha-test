import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { IupdatePokemon, Ipokemon } from './helpers/pokemon.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pokemons!: Ipokemon[];
  public formCreate!: FormGroup;
  public saving: boolean = false;
  public showForm: boolean = false;
  public editable!: Ipokemon | null;
  private _initialPokemons!: Ipokemon[];
  

  constructor(private _pokemonService: PokemonService, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.getPokemons();
    this.createForm();
  }

  createForm() {
    this.formCreate = this._fb.group({
      name: ["", Validators.required],
      image: ["", [Validators.required]],
      attack: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      defense: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    })
  }

  editPokemon(id: number) {
    const editablePokemon = this.pokemons.filter(item => item.id === id)[0];
    this.showForm = true;
    this.editable = editablePokemon;
    this.formCreate.get("name")?.setValue(editablePokemon.name);
    this.formCreate.get("image")?.setValue(editablePokemon.image);
    this.formCreate.get("attack")?.setValue(editablePokemon.attack);
    this.formCreate.get("defense")?.setValue(editablePokemon.defense);
  }

  showPanel(){
    this.showForm = !this.showForm
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  resetForm() {
    this.formCreate.reset();
    this.saving = false;
    this.editable = null;
    this.showForm = false;
  }

  search(text: string) {
    const regex = new RegExp(text, "i");

    this.pokemons = this._initialPokemons.filter((item: Ipokemon) => item.name.match(regex));
  }

  getPokemons() {
    this._pokemonService.getPokemon("1").subscribe(val => {
      console.log(val)
      this._initialPokemons = val;
      this.pokemons = this._initialPokemons;
    })
  }

  saveProcess(data: IupdatePokemon) {
    this._pokemonService.postPokemon(data).subscribe({
      next: (val: any) => {
        console.log(val);
        this.pokemons.push(val)
        this.resetForm();
        this.saving = false;
      },
      error: (err) => {
        console.log(err)
        this.saving = false;
      }
    });
  }

  updateProcess(data: IupdatePokemon, index: number) {
    this._pokemonService.putPokemon(this.editable?.id!, data).subscribe({
      next: (val: any) => {
        console.log(val);
        this.pokemons.splice(index,1);
        this.pokemons.splice(index,0, val);
        this.resetForm();
      },
      error: (err) => {
        console.log(err)
        this.saving = false;
      }
    });
  }

  savePokemon() {
    this.saving = true;
    const data = this.formCreate.value;
    data.idAuthor = 1;
    if( this.editable ) {
      const indexEditable = this.pokemons.findIndex(pokemon => pokemon.id === this.editable?.id);
      data.id = this.editable?.id;
      this.updateProcess(data, indexEditable)
      return;
    }
    this.saveProcess(data);
    
  }

  deletePokemon(id: number) {
    this._pokemonService.deletePokemon(id).subscribe({
      next: (val) => {
        this.pokemons = this.pokemons.filter(item => item.id !== id);
      },
      error: (err) => console.log(err)
    });
  }
}

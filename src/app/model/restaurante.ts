export class Restaurante {
    // id:number;
    nome:string;
    descricao:string;
    categoria:string;
    bairro:String;
    cep:String;
    telefone:String;
    endereco:String;
    site:String;
    facebook:String;
    fotos:string[] = [];
    ativo:boolean = true;
    lat:number = 0;
    lng:number = 0;
}
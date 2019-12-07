export class Receita {
    nome: string;
    ingredientes:[{
        quant:number;
        unidade: string;
        produto:string;
    }];
    preparo: string;
    tags: string;
    foto: string[]
}
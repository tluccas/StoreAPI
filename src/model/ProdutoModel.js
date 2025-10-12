class Produto {
    constructor(id, nome, preco, estoque){
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._estoque = estoque;
    }

    get id(){
        return this._id;
    }

    get nome(){
        return this._nome;
    }
    set nome(novoNome){
        this._nome = novoNome;
    }

    get estoque(){
        return this._estoque;
    }
    set estoque(un){
        if (un < 0 || typeof un !== 'number'){
            throw new Error("O número de estoque deve ser positivo")
        }
        this._estoque = un;
    }

    get preco(){
        return this._preco;
    }
    set preco(novoPreco){
        if (novoPreco < 0 || typeof novoPreco !== 'number'){
            throw new Error("O preço deve ser positivo")
        }
        this._preco = novoPreco
    }
}
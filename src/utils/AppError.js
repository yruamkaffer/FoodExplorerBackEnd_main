class AppError {

    message;
    statusCode;


    constructor(message, statusCode = 400) {
        // O this transfere a message que chega pelo construtor para o message que faz parte do contexto global
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;






/* 
Comentários sobre a criação a padronização de erros com esta classe

message e statusCode são variáveis

Constructor é um método que toda classe possui e este método é carregado automaticamente quando a classe é instanciada.
O constructor irá receber 2 dados (message e statusCode), statusCode terá por default um valor pré definido como 400 para que não seja possível haver um erro sem código.

O this dentro do constructor irá transferir o dado obtido durante a instanciação do objeto para as variáveis de escopo global
*/
##### Seguindo esse code-challenge https://github.com/semantixlabs/backend-code-challenge
##### Obs: esqueci de fazer o fork e só lembrei quando ja tinha feito boa parte do projeto

1 - A aplicação deve ser capaz de listar, cadastrar, atualizar e deletar um produto, cliente e compra.(feito) <br />
2 - A aplicação deve ser capaz de filtrar as compras por cliente.(feito) <br />
3 - A aplicação deve ser capaz de listar as compras de um cliente por dia, mês e ano.(feito) <br />
4 - A aplicação deve ser capaz de listar de forma ordenada os produtos mais vendidos por dia, mês e an(feito) <br />
5 - A aplicação deve ser capaz de listar de forma ordenada os clientes que mais gastam por dia, mês e ano.(feito) <br />
6 - A quantidade em estoque de um produto deve ser subtraída na efetivação de uma compra.(feito) <br />
7 - O cliente deve ter no mínimo as seguintes propriedades: nome, telefone e email.(feito) <br />
8 - O produto deve conter as seguintes propriedades: nome, quantidade em estoque e preço.(feito) <br />
9 - Deve ser documentado as instruções de como construir, rodar e quais são funcionalidades contempladas e como funcionam. (...) <br />
10 - Pode ser utilizado qualquer framework que facilite o desenvolvimento.(ok) <br />
11 - Pode conter migrations para o gerenciamento das tabelas no banco de dados.(feito) <br />
12 - Pode conter testes unitários ou de integração.(...) <br />
13 - Podem ser inseridos mensagens de logs para a rastreabilida de de erros(...) <br />
14 - Pode ser implementado a captura de exceções para evitar comportamentos inesperados.(...) <br />


> geleia NOTA:
> last commit: problemas com datatype UUID nas migrations (https://github.com/sequelize/sequelize/issues/13224)
>
> Deu ruim em prodsContr e pedsContr
>
> verificar warning de data type do Postgres nas migrations e models
>
> add docker image (Dockerfile)
>
> fazer 12, 13, 14

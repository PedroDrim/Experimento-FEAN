# MyBuilder

[README in English](https://github.com/PedroDrim/MyBuilder/blob/master/README_ENGLISH.md)

# Descrição

MyBuilder é um projeto feito puramente visando o aprendizado das seguintes ferramentas:

| Nome | Detalhe |
|------|---------|
| Firebase | Acima de 4.3.0 |
| Express | Acima de 4.15.4 |
| Node | 4.2.6 |
| EJS | Acima de 2.5.6 |
| Materialize-CSS | 1.0.0 |
| Docker | 17.12.0-ce Build c97c6d6 |

MyBuilder é uma aplicação em que o usuário, quando logado, poderá gerenciar uma lista de **builds** de **imagens encriptadas**.

# Instalação

1. Clone o repositório com: 
```
git clone https://github.com/PedroDrim/MyBuilder-FEN.git
```
2. Dentro do diretório gerado monte o container com o Docker da aplicação com: 
```
docker build -t <nome do container> .
```
3. Execute o container do Docker com o comando:
```
sudo docker run -p <porta de saida>:5000 -d <nome do container>
```

# Funções Esperadas

1. Criar nova conta.
2. Resetar senha da conta.
3. Realizar Login.
4. Realizar Logout.
5. Gerar nova Build de arquivos.
6. Listar Builds existentes.
7. Atualizar Build existente.
8. Excluir Build existente.

# Observações obtidas

| Identificador | Descrição | Observação |
|---------------|-----------|------------|
| FAULT-1 | A dificuldade principal foi a geração de telas, tendo em vista que sou um desenvolvedor back-end | Precisarei realizar mais projetos com foco no front-end para melhorar essa falha |
| FAULT-2 | Uma leve inconsistência para a execução das funções de sistema (demora em excesso) | Precisarei estudar técnicas para otimização em Node |
| FAULT-3 | A necessidade de gerar um sistema mais otimizado para o tratamento de Url's inválidas | O tratamento de Url's foi realizado apenas para redirecionar o usuário |
| FAULT-4 | A falta de boas práticas de referência para o regenciamento de rotas | Na falta de referências deverei criar minhas próprias boas-práticas |

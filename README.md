# MyBuilder-FEN
Repositório para experimentação do STACK FEN (Firebase, Express e Node).

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

### Login
* Criar nova conta.
* Resetar senha da conta.
* Logar no sistema.

### Sistema
* Gerar nova Build de arquivos.
* Listar Builds existentes.
* Atualizar Build existente.
* Excluir Build existente.

# Observações obtidas

* A dificuldade principal foi a geração de telas, tendo em vista que sou um desenvolvedor back-end.
* Uma leve inconsistência para a execução das funções de sistema (demora em excesso).
* A necessidade de gerar um sistema mais otimizado para o tratamento de url's inválidas.
* A falta de boas práticas de referência para o regenciamento de rotas.

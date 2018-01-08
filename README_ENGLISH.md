# MyBuilder

[README em Portugues-BR](https://github.com/PedroDrim/MyBuilder/blob/master/README.md)

# Description

MyBuilder is a project made with the main goal is to learn the following tools:

| Name | Detail |
|------|---------|
| Firebase | Above of 4.3.0 |
| Express | Above of 4.15.4 |
| Node | 4.2.6 |
| EJS | Above of 2.5.6 |
| Materialize-CSS | 1.0.0 |
| Docker | 17.12.0-ce Build c97c6d6 |

MyBuilder is an application that the user can manage a list of **crypted images builds**.

# Instalation

1. Clone the repository with:
```
git clone https://github.com/PedroDrim/MyBuilder-FEN.git
```
2. Inside the cloned directory build the Docher container of the application with:
```
docker build -t <container name> .
```
3. Run the Docker container with:
```
sudo docker run -p <output port>:5000 -d <container name>
```

# Expected functions

1. Create new account.
2. Reset account password.
3. Login.
4. Logout.
5. Build a new file.
6. List all Build hash.
7. Update Build hash.
8. Remove Build hash.

# Observations

| Identificator | Description | Observation |
|---------------|-----------|------------|
| FAULT-1 | The main difficulty was make the screens, because I'm a back-end developer | I'll need to do more projects focused only on front-end to improve this fault |
| FAULT-2 | Some functions have their response time very high | I'll need to study some optimations techiniques to node development |
| FAULT-3 | Develop a optimized system to invalid Url's treatment | The Url's treatment was made only to redirect the user |
| FAULT-4 | The lack of good practices to routes management | At the lack of references I must to make my own good practices |

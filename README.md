# Preparación
Primero hay que instalar los modulos de Node.js.

    npm install

Una vez instalados, se puede correr el projecto.

    npm run dev

# Uso
#### Navegador
El servidor corre de forma local en el puerto 3000.
```
127.0.0.1:3000
```
En la dirección **/books** podemos ver el listado de libros.
```
127.0.0.1:3000/books
```
Al ingresar el *id* después de la dirección /books es posible ver un libro en especifico.
```
127.0.0.1:3000/books/1
```
#### requests.http
Usando el archivo **requests.http** se puede ejecutar un comando **GET** para obtener el listado de libros.
```http
GET http://localhost:3000/books HTTP/1.1
```
También podemos pedir especificamente un libro.
```http
GET http://localhost:3000/books/1 HTTP/1.1
```
Para añadir un libro, hay un comando **POST** de demostración.
```http
POST http://localhost:3000/books HTTP/1.1
Content-Type:  application/json

{
"autor":  "J. K. Rowling",
"isbn":  "9789878000107",
"editorial":  "Bloomsbury Salamandra Scholastic",
"paginas":  "256"
}
```
Y, luego, utilizando el comando **PUT** se puede actualizar la información de un libro con un *id* especifico.
```http
PUT http://localhost:3000/books/1 HTTP/1.1
Content-Type:  application/json

{
"autor":  "J. K. Rowling",
"isbn":  "9789878000107",
"editorial":  "Bloomsbury Salamandra Scholastic",
"paginas":  "256"
}
```
##### Autor: Lucas Rada
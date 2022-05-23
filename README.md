![Logo do projeto](https://uerita.vercel.app/images/logo_light.svg)
## Projeto Uerita
Este projeto é um MVP (Minimum Viable Product) de uma rede social de blog posts. O Projeto Uerita tem por objetivo mostrar os principais conhecimentos do autor ([@joaovitorcode](https://github.com/joaovitorcode)) e comprovar a sua experiencia em programação.

## Tecnologias utilizadas
- ReactJS
- NextJS
- Chakra UI
- React Markdown
- YUP
- React Hook Form
- ESLint
- Prettier

## Serviços utilizados
- Firebase (authentication, firestore, storage)
- Vercel
- GitHub

## Setup
- Para instalar o projeto:
```
git clone git@github.com:joaovitorcode/uerita-public-repo.git
npm i
```
- Crie um projeto no firebase
- Dentro desse projeto crie um app para a web
- Obtenha a Configuração do SDK do app para a web
- Cole essa configuração dentro do arquivo *firebaseClient.jsx* localizado na raíz do projeto
- Habilite o serviço *authentication* utilizando o provedor *E-mail/senha*
- Ainda em *authenticantion*, vá para aba *template* e altere a URL acionável para *http://localhost:3000/feedback*
- Habilite o serviço *storage* em modo de teste e crie as seguintes pastas: *post_covers* e *user_photos*
- Ainda em *storage*, vá para aba *rules* e insira o seguinte código no lugar:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
- Habilite o serviço *firestore* em modo de teste
- OBS: todas as coleções que utilizaremos no serviço *firestore* serão criadas implicitamente pelo firebase
- Execute no terminal o comando *npm run dev*

##  Como funciona
- Qualquer usuário poderar acessar os dados públicos (posts, comentários, perfis, etc.)
- Mas apenas usuários cadastrados e com o email verificado poderão criar, atualizar e excluír dados

## Observação
- O projeto pode apresentar pequenos bugs visuais, para contorná-los apenas recarregue a página

## Links
- [Projeto em funcionamento](https://uerita.vercel.app)

## Versão
0.1.0

## Autor
- **J Vitor F**: [@joaovitorcode](https://github.com/joaovitorcode)
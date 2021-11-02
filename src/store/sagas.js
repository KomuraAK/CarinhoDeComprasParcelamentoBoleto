import {all, put, select, takeLatest} from 'redux-saga/effects'  // importe de redux-saga/effects
import { addSuccess, cartAmountUpdateSuccess } from '../store/actions'; // importar de store/actions

/* ### métodos para redux saga que funcionam por trás dos panos na aplicação aos quais você queira ###
** ### que funcione junto aos componentes como Home, Cart e ShowCart ###
**/

// representa o BACK-END. Caso queira para a produção, desconsidere esse objeto booksjson caso queira um banco de dados real
const booksjson = [
    {id: 1, title: 'Bolsa Louis Vuitton', price: 2500.99, img: 'https://cdn.upcatalogo.com.br/img/sites/540/2021/02/1-10.jpg'},
    {id: 2, title: 'Camisa Supreme-LouisVuitton', price: 549.99, img: 'https://cdn.awsli.com.br/800x800/1081/1081393/produto/40933337/blusa-moletom-capuz-supreme-hype-swag-branco-peep-trap-rap-f75ccd99.jpg'},
    {id: 3, title: 'Pulma Edição Limitada', price: 365.85, img: 'https://t-static.dafiti.com.br/Lz-z1xUY_UReE9_SKLSHejKjHcY=/fit-in/427x620/static.dafiti.com.br/p/puma-t%25c3%25aanis-puma-anzarun-lite-bold-cinza-7334-1387147-1-product.jpg'}
];

// function saga responsável por executar em segundo plano
function* addToCart({id}) {
    // obtém um book através do ID
    const book = booksjson.map(book => (book.id === id) ? book : null);

    // faz dispatch através de put de redux-saga/effects, responsável pelos efeitos colaterais em redux no react.js
    yield put(addSuccess([book[id - 1]]));
    yield put(cartAmountUpdateSuccess(id));
}

/* ### exporta como padrão com all (que junta todos os sagas de redux) com takeLatest para cada ação de add (adicionar) 
** ### quando houver cliques no botão em Home, ou seja, takeLatest ouve os eventos de adiçao de livros e nos cliques no botão
   ### em scripts Home. Você poderá adiconar mais eventos se quiser além desse que está embaixo.
**/
export default all([
    takeLatest('add', addToCart),
]);
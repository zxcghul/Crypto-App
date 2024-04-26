import {cryptoAssets, cryptoData} from './data'


export function FetchCrypto () {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-API-KEY': 'rd2PHwNGUZYJ9o0ezD6jHI2uPFarg+rQ4kODjVhkyWk='
        }
    }
    
    return (
        fetch('https://openapiv1.coinstats.app/coins', options)
        .then(response => response.json())
        // .then(result => result.result)
    )
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(cryptoData)
    //     }, 1)
    // })
}


export function FetchAssets () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    })
}
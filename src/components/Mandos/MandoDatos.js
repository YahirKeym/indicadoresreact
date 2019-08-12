// Guardara los datos que debe de llevar cada mando, así para no definir uno por uno, se define uno general
// Y este se ocupara para todo lo que lleve mandos, haciendo que la arquitectura de cada uno sea igual y éste no genere errores.
function MandoDatos(variables){
    if(variables === undefined || variables.length === 0){
        variables = []
    }
    return {
        "variables":variables,
        "datos":{  
            "etapas":12,
            "tipoDeEtapa": "meses",
            "titulo":"",
            "unidadDeMedida":"",
            "AceptacionBuena":"94",
            "AceptacionMedia":"80",
            "minimaEscala":0,
            "maximaEscala":0,
            "personaResponsable": "",
            "tipoIndicador" :0,
            "formaDeIndicador":"incremento" ,
            "valorMinimo": 0
        },
        "objetivos":[],
        "objetivosData":{  
            "titulo":"",
            "descripcion":"",
            "id": 0
        },
        "subindicadores":[],
        "tipoDeIndicador":[
            {
                "id":0,
                "titulo" : "Resultados"
            },
            {
                "id":1,
                "titulo" : "Comportamental"
            }
            ,
            {
                "id":2,
                "titulo":"Personal"
            }
        ],
        "manejoDeIndicador":[
            {
                "id" : 0,
                "titulo":"incremento",
            },
            {
                "id" :1,
                "titulo":"decremento"
            },
            {
                "id" :1,
                "titulo":"acumulativo"
            }
        ],
        "usuarios": [],
        "acciones":[],
        "objetivoShow":true,
        "etapas":[]
    }
}
export default MandoDatos;
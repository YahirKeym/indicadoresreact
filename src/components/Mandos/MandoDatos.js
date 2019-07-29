// Guardara los datos que debe de llevar cada mando, así para no definir uno por uno, se define uno general
// Y este se ocupara para todo lo que lleve mandos, haciendo que la arquitectura de cada uno sea igual y éste no genere errores.
function MandoDatos(variables){
    if(variables === undefined || variables.length === 0){
        variables = []
    }
    return {
        "variables":variables,
        "datos":{  
            "formula":"",
            "etapas":12,
            "tipoDeEtapa": "meses",
            "titulo":"",
            "unidadDeMedida":"",
            "AceptacionBuena":"94",
            "AceptacionMedia":"80",
            "rangos":{  
                "datos":[],
                "global":false
            },
            "jerarquias":{  
                "datos":[],
                "global":true
            },
            "usuarios":{  
                "datos":[]
            },
            "minimaEscala":0,
            "maximaEscala":0,
            "personaResponsable": "",
            "tipoIndicador" :0,
            "formaDeIndicador":"incremento" ,
            "valorMinimo": 0,
        },
        "objetivos":[],
        "objetivosData":{  
            "titulo":"",
            "descripcion":""
        },
        "rangos":[],
        "jeraraquias":[],
        "users":[],
        "acciones":[],
        "objetivoShow":true,
        "allUsers":[],
        "etapas":[]
    }
}
export default MandoDatos;
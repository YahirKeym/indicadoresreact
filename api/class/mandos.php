<?php 
class Mandos
{
    /**
     * Guardara el objeto de conexión
     * @var Object
     */
    private $oConexion = null;
    /**
     * Nos ayudara a iniciar los requerimientos de los mandos.
     */
    function __construct()
    {
        $oConexion = new Conexion();
        $this->oConexion = $oConexion->oConexion;

    }
    public function add($aDatos = [])
    {
        $cQueryMandoObjetivo = "INSERT INTO 
        mandos_objetivos (idobjetivo,etapas,tipoDeEtapa,deleted) 
        VALUES ({$aDatos['objetivo']},{$aDatos['etapas']},'{$aDatos['tipoDeEtapa']}',0)";
        $oConsultaMandoObjetivo = $this->oConexion->query($cQueryMandoObjetivo);
        $aStatus = [
            'status' => false
        ];
        $oConsultaInsertFormula = false;
        $aDatos['formula'] = trim($aDatos['formula']);
        if($oConsultaMandoObjetivo != false){
            $cQuerySelectorDeMando = "SELECT * FROM mandos_objetivos ORDER BY id DESC LIMIT 1";
            $oConsultaSelectorMandos = $this->oConexion->query($cQuerySelectorDeMando);
            $aDatosDeMando = $oConsultaSelectorMandos->fetch(PDO::FETCH_ASSOC); 
            $cQueryFormula = "INSERT INTO mando_formula (formula,idmando) VALUES ('{$aDatos['formula']}',{$aDatosDeMando['id']})";
            $oConsultaInsertFormula = $this->oConexion->query($cQueryFormula);
        }
        $aStatus = $this->agregaDatos($aDatos, $oConsultaInsertFormula, $aDatosDeMando);
        return json_encode($aStatus);
    }
    /**
     * Nos ayudara a agregar los datos faltantes, variables, rangos, etc
     * @param array $aDatos
     * @param object $oConsultaInsertFormula
     * @param array $aDatosDeMando
     * @return array Regresara un array con el estado del funcionamiento
     */
    private function agregaDatos($aDatos = [],$oConsultaInsertFormula = null, $aDatosDeMando = [])
    {
        $aStatus = ['status' => false];
        if($oConsultaInsertFormula != false)
        {
            foreach($aDatos['variables'] as $aVariables){
                $cQueryVariables = "INSERT INTO variables (nombre) VALUES ('{$aVariables['nombre']}')";
                $this->oConexion->query($cQueryVariables);
            }
            foreach($aDatos['rangos'] as $aRangos)
            {
                $cQueryRangos = "INSERT INTO rangos_mando (idrango,idmando) VALUES ({$aRangos['id']},{$aDatosDeMando['id']})";
                $this->oConexion->query($cQueryRangos);
            }
            $iConteoDeVariables = count($aDatos['variables']);
            $cQuerySelectVariables = "SELECT * FROM variables ORDER BY id LIMIT {$iConteoDeVariables}";
            $oConsultaSelectVariables = $this->oConexion->query($cQuerySelectVariables);
            foreach($oConsultaSelectVariables as $aSelectVariables)
            {
                $cQueryVariablesMandos = "INSERT INTO variables_mandos (idVariable,idMando) VALUES ({$aSelectVariables['id']},{$aDatosDeMando['id']})";
                $oConsulta = $this->oConexion->query($cQueryVariablesMandos);
            }
            $aStatus['status'] = true;
        }
        return $aStatus;
    }
    private function unionDeTablas($iId = 0)
    {
        $cWhereId = "";
        if ($iId !=0) {
            $cWhereId = "WHERE id={$iId}";
        }
        $cQuery = "SELECT mando.id, mando.idobjetivo, mando.etapas, mando.tipoDeEtapa, formula.formula, rango.idrango, variables.idVariable
                    FROM mandos_objetivos mando
                    INNER JOIN mando_formula formula ON mando.id = formula.idmando
                    INNER JOIN rangos_mando rango ON mando.id = rango.idmando
                    INNER JOIN variables_mandos variables ON mando.id = variables.idMando
                    {$cWhereId}";
        $oConsulta = $this->oConexion->query($cQuery);

        echo '<pre>';
        var_dump($oConsulta);
        echo '</pre>';
        foreach($oConsulta as $aDatos)
        {
            echo '<pre>';
            var_dump($aDatos);
            echo '</pre>';
        }
    }
    public function view()
    {
        echo "hola";
        $this->unionDeTablas();
    }
}
?>
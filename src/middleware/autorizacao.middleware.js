class AutorizacaoMiddleware{

    static autorizar(papeisPermitidos){
        return(req, res, next) =>{
            const operador = req.operador;

            if(!operador || !papeisPermitidos.includes(operador.papel)){
                return res.status(403).json({msg: "Acesso não autorizado para este recurso."})
           }
           next();
        }          
    }
}

module.exports = AutorizacaoMiddleware;